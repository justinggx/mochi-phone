import {DatabaseSync} from 'node:sqlite';
import {mkdirSync,chmodSync,existsSync,renameSync,unlinkSync,readdirSync,realpathSync,lstatSync,statSync} from 'node:fs';
import {join,resolve,dirname} from 'node:path';
import {createHash,randomUUID,randomBytes} from 'node:crypto';
import {gzipSync,gunzipSync} from 'node:zlib';
import {validateShop,createShop,applyShopAction,SHOP_SCHEMA,SHOP_RULES} from '../shop-engine.mjs';
export class ShopError extends Error{constructor(code,message,status=400){super(message);this.shopCode=code;this.status=status;}}
const err=(code,message,status=400)=>{throw new ShopError(code,message,status);};
const digest=x=>createHash('sha256').update(x).digest('hex');
const plain=x=>x&&typeof x==='object'&&!Array.isArray(x);
const key=x=>typeof x==='string'&&/^[A-Za-z0-9_-]{8,100}$/.test(x);
function canonical(x){if(Array.isArray(x))return '['+x.map(canonical).join(',')+']';if(plain(x))return '{'+Object.keys(x).sort().map(k=>JSON.stringify(k)+':'+canonical(x[k])).join(',')+'}';return JSON.stringify(x);}
function pack(s){validateShop(s);const raw=JSON.stringify(s);return{data:gzipSync(raw),hash:digest(raw)};}
function unpack(row){if(!row)err('missing','没有找到这个档案；不会自动创建空档覆盖。',404);let raw;try{raw=gunzipSync(row.data,{maxOutputLength:6500000}).toString('utf8');}catch{err('corrupt','存档压缩数据损坏，请使用备份恢复。',422);}if(digest(raw)!==row.hash)err('corrupt','存档校验未通过，原数据已保留。',422);let s;try{s=JSON.parse(raw);validateShop(s);}catch(e){err(e.shopCode||'corrupt',e.message,422);}return s;}
const label=x=>typeof x==='string'&&x.trim().length>0&&x.trim().length<=80;
export class ShopStore{
 constructor(root,{now=()=>Date.now(),id=()=>randomUUID(),leaseMs=60000}={}){
  this.now=now;this.id=id;this.leaseMs=leaseMs;this.root=resolve(root);mkdirSync(this.root,{recursive:true,mode:0o700});if(lstatSync(this.root).isSymbolicLink())err('storage','存档目录不允许符号链接。',503);
  this.root=realpathSync(this.root);this.path=join(this.root,'shop.sqlite');if(existsSync(this.path)&&lstatSync(this.path).isSymbolicLink())err('storage','存档文件不允许符号链接。',503);
  this.db=new DatabaseSync(this.path);chmodSync(this.path,0o600);this.db.exec('PRAGMA journal_mode=WAL;PRAGMA synchronous=FULL;PRAGMA foreign_keys=ON;PRAGMA busy_timeout=5000;');
  const version=this.db.prepare('PRAGMA user_version').get().user_version;if(version!==0&&version!==1){this.db.close();err('version','服务器存档版本不受支持，禁止降级覆盖。',503);}
  this.db.exec(`CREATE TABLE IF NOT EXISTS campaigns(id TEXT PRIMARY KEY,name TEXT NOT NULL,partner TEXT NOT NULL,partner_ref TEXT NOT NULL,day INTEGER NOT NULL,phase TEXT NOT NULL,rev INTEGER NOT NULL,data BLOB NOT NULL,hash TEXT NOT NULL,created INTEGER NOT NULL,updated INTEGER NOT NULL,deleted INTEGER NOT NULL DEFAULT 0,parent TEXT);
   CREATE TABLE IF NOT EXISTS commands(id TEXT PRIMARY KEY,hash TEXT NOT NULL,campaign TEXT NOT NULL,result TEXT NOT NULL,at INTEGER NOT NULL);
   CREATE TABLE IF NOT EXISTS leases(campaign TEXT PRIMARY KEY,owner TEXT NOT NULL,label TEXT NOT NULL,token TEXT NOT NULL,expires INTEGER NOT NULL,fence INTEGER NOT NULL);
   CREATE TABLE IF NOT EXISTS snapshots(id TEXT PRIMARY KEY,campaign TEXT NOT NULL,label TEXT NOT NULL,kind TEXT NOT NULL,rev INTEGER NOT NULL,day INTEGER NOT NULL,data BLOB NOT NULL,hash TEXT NOT NULL,at INTEGER NOT NULL);
   CREATE INDEX IF NOT EXISTS snapshots_campaign ON snapshots(campaign,at);PRAGMA user_version=1;`);
  this.backupAt=0;this.backup();
 }
 close(){this.db.close();}
 tx(fn){this.db.exec('BEGIN IMMEDIATE');try{const out=fn();this.db.exec('COMMIT');return out;}catch(e){this.db.exec('ROLLBACK');throw e;}}
 row(id,deleted=false){if(!key(id))err('input','档案编号不合法。');const row=this.db.prepare('SELECT * FROM campaigns WHERE id=?').get(id);if(!row||(!deleted&&row.deleted))err('missing','没有找到这个档案，或它已移入回收区。',404);return row;}
 list(){return this.db.prepare('SELECT id,name,partner,partner_ref AS partnerRef,day,phase,rev,created,updated,deleted,parent FROM campaigns ORDER BY updated DESC').all();}
 read(id){const row=this.row(id);return{state:unpack(row),rev:row.rev,updated:row.updated,lease:this.leaseInfo(id)};}
 leaseInfo(id){const l=this.db.prepare('SELECT label,expires,fence FROM leases WHERE campaign=?').get(id);return l&&l.expires>this.now()?l:null;}
 claim(id,device,name,force=false){if(!key(device)||!label(name))err('input','设备信息不完整。');return this.tx(()=>{this.row(id);const old=this.db.prepare('SELECT * FROM leases WHERE campaign=?').get(id);if(old&&old.expires>this.now()&&old.owner!==device&&!force)err('leased','另一台设备正在经营，可点击“在本机继续”。',423);const token=randomBytes(24).toString('hex'),fence=(old?.fence||0)+1,expires=this.now()+this.leaseMs;this.db.prepare('INSERT OR REPLACE INTO leases VALUES(?,?,?,?,?,?)').run(id,device,name.slice(0,80),token,expires,fence);return{token,fence,expires};});}
 checkLease(id,device,token){const l=this.db.prepare('SELECT * FROM leases WHERE campaign=?').get(id);if(!l||l.owner!==device||l.token!==token)err('leased','经营权已转移，请刷新或在本机接续。',423);this.db.prepare('UPDATE leases SET expires=? WHERE campaign=?').run(this.now()+this.leaseMs,id);}
 renew(id,device,token){return this.tx(()=>{this.row(id);this.checkLease(id,device,token);return{expires:this.now()+this.leaseMs};});}
 release(id,device,token){return this.tx(()=>{this.db.prepare('DELETE FROM leases WHERE campaign=? AND owner=? AND token=?').run(id,device,token);return{ok:true};});}
 previous(op,hash){const p=this.db.prepare('SELECT * FROM commands WHERE id=?').get(op);if(!p)return null;if(p.hash!==hash)err('operation','重复操作编号对应不同内容，已拒绝。',409);return JSON.parse(p.result);}
 logOp(op,hash,campaign,result){this.db.prepare('INSERT INTO commands VALUES(?,?,?,?,?)').run(op,hash,campaign,JSON.stringify(result),this.now());}
 operationStatus(op){if(!key(op))err('input','操作编号不合法。');const p=this.db.prepare('SELECT result FROM commands WHERE id=?').get(op);return p?JSON.parse(p.result):null;}
 operation(body,fn){if(!plain(body)||!key(body.op))err('input','缺少有效操作编号。');const hash=digest(canonical(body));const out=this.tx(()=>this.previous(body.op,hash)||fn(hash));this.backup();return out;}
 quota(){const size=this.db.prepare('PRAGMA page_count').get().page_count*this.db.prepare('PRAGMA page_size').get().page_size;if(size>268435456)err('quota','云存档空间已满，请导出并整理；现有档案保持不变。',507);}
 insertState(s,parent=null){const p=pack(s),at=this.now();this.db.prepare('INSERT INTO campaigns VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)').run(s.id,s.name,s.partner.name,s.partner.ref,s.day,s.phase,1,p.data,p.hash,at,at,0,parent);}
 create(body,partner){return this.operation(body,hash=>{this.quota();if(this.list().filter(x=>!x.deleted).length>=100)err('quota','当前已有100份经营档案，请先整理或导出。',507);const id=this.id(),s=createShop({id,name:body.name,partner,user:body.user,seed:randomBytes(4).readUInt32BE()});this.insertState(s);this.snapshotRow(this.row(id),'开店时的样子','auto');const out={id};this.logOp(body.op,hash,id,out);return out;});}
 snapshotRow(row,name,kind){const id=this.id();this.db.prepare('INSERT INTO snapshots VALUES(?,?,?,?,?,?,?,?,?)').run(id,row.id,name,kind,row.rev,row.day,row.data,row.hash,this.now());if(kind==='auto')this.db.prepare("DELETE FROM snapshots WHERE campaign=? AND kind='auto' AND id NOT IN(SELECT id FROM snapshots WHERE campaign=? AND kind='auto' ORDER BY at DESC,rowid DESC LIMIT 30)").run(row.id,row.id);return id;}
 action(body){return this.operation(body,hash=>{this.quota();const r=this.row(body.id);this.checkLease(r.id,body.device,body.token);if(body.rev!==r.rev)err('conflict','进度已在其他操作中更新，请重新查看后再决定。',409);if(!plain(body.action))err('input','缺少经营操作。');const s=applyShopAction(unpack(r),body.action),p=pack(s),rev=r.rev+1;this.db.prepare('UPDATE campaigns SET name=?,partner=?,partner_ref=?,day=?,phase=?,rev=?,data=?,hash=?,updated=? WHERE id=?').run(s.name,s.partner.name,s.partner.ref,s.day,s.phase,rev,p.data,p.hash,this.now(),r.id);if(['close','equipment','expand','decor','profile'].includes(body.action.type))this.snapshotRow(this.row(r.id),s.day+'日 · '+({close:'打烊',equipment:'设备升级',expand:'成长',decor:'陈列',profile:'资料更新'}[body.action.type]),'auto');const out={id:r.id,rev};this.logOp(body.op,hash,r.id,out);return out;});}
 snapshots(id){this.row(id,true);return this.db.prepare('SELECT id,campaign,label,kind,rev,day,at FROM snapshots WHERE campaign=? ORDER BY at DESC,rowid DESC').all(id);}
 manual(body){return this.operation(body,hash=>{this.quota();const r=this.row(body.id);this.checkLease(r.id,body.device,body.token);if(body.rev!==r.rev)err('conflict','进度已更新，请刷新后保存。',409);if(!label(body.label))err('input','请为存档点填写1至80字的名字。');if(this.snapshots(r.id).filter(x=>x.kind==='manual').length>=500)err('quota','本档已有500个手动存档点，请先导出并整理。',507);const id=this.snapshotRow(r,body.label.trim(),'manual'),out={id:r.id,snapshot:id};this.logOp(body.op,hash,r.id,out);return out;});}
 snapshot(id,snapshot){this.row(id,true);if(!key(snapshot))err('input','存档点编号不合法。');const row=this.db.prepare('SELECT * FROM snapshots WHERE id=? AND campaign=?').get(snapshot,id);if(!row)err('missing','没有找到这个存档点。',404);return{state:unpack(row),rev:row.rev,label:row.label};}
 fork(body){return this.operation(body,hash=>{this.quota();if(this.list().filter(x=>!x.deleted).length>=100)err('quota','当前档案数量已满，请先整理。',507);if(!label(body.name)||body.name.trim().length>36)err('input','新档名需要1至36字。');const base=this.snapshot(body.id,body.snapshot),s=base.state,id=this.id();s.id=id;s.name=body.name.trim();for(const m of s.chat)if(m.replyState==='pending'){m.replyState='failed';m.replyError='interrupted';}this.insertState(s,body.id);this.snapshotRow(this.row(id),'从“'+base.label+'”接续','manual');const out={id};this.logOp(body.op,hash,id,out);return out;});}
 trash(body){return this.operation(body,hash=>{const r=this.row(body.id,true);if(body.deleted!==true&&body.deleted!==false)err('input','缺少明确的删除或恢复选择。');if(!r.deleted)this.checkLease(r.id,body.device,body.token);this.db.prepare('UPDATE campaigns SET deleted=?,updated=? WHERE id=?').run(body.deleted?this.now()||1:0,this.now(),r.id);this.db.prepare('DELETE FROM leases WHERE campaign=?').run(r.id);const out={id:r.id,deleted:body.deleted};this.logOp(body.op,hash,r.id,out);return out;});}
 export(id){const r=this.row(id,true),state=unpack(r);const data={format:'mochi-shop-backup',version:1,rules:SHOP_RULES,exportedAt:this.now(),state,snapshots:[],snapshotPolicy:'current-only',serverSnapshotCount:this.snapshots(id).length};return{...data,checksum:digest(canonical(data))};}
 import(body){return this.operation(body,hash=>{this.quota();const b=body.backup;if(!plain(b)||b.format!=='mochi-shop-backup'||b.version!==1||!Array.isArray(b.snapshots)||b.snapshots.length>530)err('backup','不是受支持的小店备份。');const {checksum,...data}=b;if(typeof checksum!=='string'||digest(canonical(data))!==checksum)err('backup','备份完整性校验未通过。');validateShop(b.state);for(const snap of b.snapshots){validateShop(snap.state);if(snap.state.id!==b.state.id||!label(snap.label)||!['manual','auto'].includes(snap.kind))err('backup','备份中的存档点不属于同一档案。');}if(this.list().filter(x=>!x.deleted).length>=100)err('quota','档案数量已满，请先整理。',507);const s=JSON.parse(JSON.stringify(b.state)),id=this.id();s.id=id;s.name=(s.name.slice(0,28)+' · 导入');for(const m of s.chat)if(m.replyState==='pending'){m.replyState='failed';m.replyError='interrupted';}this.insertState(s);for(const snap of b.snapshots){const state=JSON.parse(JSON.stringify(snap.state));state.id=id;const p=pack(state);this.snapshotRow({id,rev:snap.rev||1,day:state.day,...p},snap.label,snap.kind);}this.snapshotRow(this.row(id),'导入时的进度','auto');const out={id};this.logOp(body.op,hash,id,out);return out;});}
 backup(force=false){
  if(!force&&this.backupAt&&this.now()-this.backupAt<900000)return;
  let tmp;
  try{
   const dir=join(this.root,'backups');mkdirSync(dir,{recursive:true,mode:0o700});if(lstatSync(dir).isSymbolicLink())err('storage','备份目录不允许符号链接。',503);
   const stamp=new Date(this.now()).toISOString().replace(/[:.]/g,'-'),target=join(dir,'shop-'+stamp+'-'+randomBytes(3).toString('hex')+'.sqlite');tmp=target+'.partial';
   this.db.exec("VACUUM INTO '"+tmp.replace(/'/g,"''")+"'");chmodSync(tmp,0o600);renameSync(tmp,target);tmp=null;this.backupAt=this.now();this.backupError=false;
   const files=readdirSync(dir).filter(n=>/^shop-[0-9TZ-]+(?:-[a-f0-9]{6})?\.sqlite$/.test(n)).sort().reverse(),days=new Set(),keep=new Set(files.slice(0,96));
   for(const f of files){const day=f.slice(5,15);if(days.size<30&&!days.has(day)){days.add(day);keep.add(f);}}
   let used=0,count=0;for(const f of files){if(keep.has(f)){const size=statSync(join(dir,f)).size;if(count<2||used+size<=536870912){used+=size;count++;continue;}}unlinkSync(join(dir,f));}
  }catch(e){if(tmp&&existsSync(tmp))try{unlinkSync(tmp);}catch{}this.backupError=true;if(force)throw e;}
 }

}
