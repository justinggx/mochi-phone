// Authenticated per-account file storage. Never included in prompts or backups.
export const API_SYNC_FILE='mochi-phone-api-sync-v1.json';
const LOCAL='mochi-phone-api-sync-journal-v1',object=x=>x&&typeof x==='object'&&!Array.isArray(x);
const plain=x=>JSON.parse(JSON.stringify(x)),equal=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
const compare=(a,b)=>(a?.time||0)-(b?.time||0)||String(a?.writer||'').localeCompare(String(b?.writer||''));
const safeKey=k=>typeof k==='string'&&k.length<180&&!['__proto__','constructor','prototype'].includes(k);
const fingerprint=text=>{let a=2166136261,b=5381;for(const c of text){a=Math.imul(a^c.codePointAt(0),16777619);b=Math.imul(b,33)^c.codePointAt(0);}return(a>>>0).toString(16)+(b>>>0).toString(16);};
function profiles(config){
 const list=(Array.isArray(config?.profiles)?config.profiles:[]).filter(p=>object(p)&&safeKey(p.id)&&typeof p.url==='string'&&typeof p.key==='string').map(p=>({id:/^legacy-current(?:-old)*$/.test(p.id)?'import-'+fingerprint(JSON.stringify([p.url,p.key,p.model||''])):p.id,name:String(p.name||'配置').slice(0,60),url:p.url,key:p.key,model:String(p.model||'')}));
 if(config?.url&&config?.key&&!list.some(p=>p.url===config.url&&p.key===config.key&&p.model===(config.model||'')))list.unshift({id:'import-'+fingerprint(JSON.stringify([config.url,config.key,config.model||''])),name:/deepseek/i.test(String(config.url))?'DeepSeek':'配置1',url:config.url,key:config.key,model:config.model||''});
 return list;
}
export function validateApiSync(value){
 if(!object(value)||value.version!==1||!object(value.rows)||Object.keys(value.rows).length>1000)throw Error('Invalid cloud configuration');
 const rows=Object.create(null);for(const[k,row]of Object.entries(value.rows)){
  if(!safeKey(k)||!object(row)||!Number.isSafeInteger(row.time)||row.time<0||row.time>=Number.MAX_SAFE_INTEGER||typeof row.writer!=='string'||row.writer.length>120)throw Error('Invalid cloud record');
  if(row.deleted===true){rows[k]={time:row.time,writer:row.writer,deleted:true};continue;}
  const p=row.value;if(!object(p))throw Error('Invalid cloud value');
  if(k==='selection'){if(!['st','custom'].includes(p.mode)||typeof p.profileId!=='string')throw Error('Invalid selection');rows[k]={time:row.time,writer:row.writer,value:{mode:p.mode,profileId:p.profileId}};}
  else{if(!k.startsWith('profile:')||p.id!==k.slice(8)||!safeKey(p.id)||typeof p.name!=='string'||p.name.length>60||typeof p.url!=='string'||p.url.length>2000||typeof p.key!=='string'||p.key.length>10000||typeof p.model!=='string'||p.model.length>300)throw Error('Invalid profile');rows[k]={time:row.time,writer:row.writer,value:{id:p.id,name:p.name,url:p.url,key:p.key,model:p.model}};}
 }return{version:1,rows};
}
export function mergeApiSync(left,right){const rows=Object.create(null);for(const source of[left,right])for(const[k,row]of Object.entries(validateApiSync(source).rows))if(!rows[k]||compare(row,rows[k])>0)rows[k]=plain(row);return{version:1,rows:Object.fromEntries(Object.entries(rows).sort(([a],[b])=>a.localeCompare(b)))};}
export function createApiSync(api){
 let owner=null,journal=null,flight=null,closed=false,clock=0;const controllers=new Set();
 const valid=who=>!closed&&api.account()===who&&api.alive();
 function identity(){const next=api.account();if(!next)throw Error('Account unavailable');if(owner!==next){owner=next;journal=null;flight=null;clock=0;}if(!journal){let stored;try{stored=JSON.parse(api.storage.getItem(LOCAL)||'null');}catch{}const writer=stored?.writer||api.uuid();let envelope={version:1,rows:{}};try{if(stored?.data)envelope=validateApiSync(stored.data);}catch{throw Error('Local synchronization journal invalid');}journal={writer,data:envelope};}return owner;}
 function persist(){api.storage.setItem(LOCAL,JSON.stringify(journal));}
 function stamp(){clock=Math.max(Date.now(),clock+1,...Object.values(journal.data.rows).map(v=>v.time+1));return{time:clock,writer:journal.writer};}
 function put(k,value,initial=false){journal.data.rows[k]={...(initial?{time:1,writer:journal.writer}:stamp()),...(value?{value:plain(value)}:{deleted:true})};}
 function selection(config,list){const p=list.find(p=>p.id===config?.profileId)||list.find(p=>p.url===config?.url&&p.key===config?.key&&p.model===(config?.model||''));return{mode:config?.mode==='custom'?'custom':'st',profileId:p?.id||''};}
 function importLocal(){const cfg=api.read(),list=profiles(cfg);for(const p of list)if(!journal.data.rows['profile:'+p.id])put('profile:'+p.id,p,true);if(!journal.data.rows.selection&&(cfg.mode||list.length))put('selection',selection(cfg,list),true);persist();}
 function record(config,previous){identity();const before=profiles(previous),after=profiles(config);for(const p of after){const prior=before.find(v=>v.id===p.id),row=journal.data.rows['profile:'+p.id];if(!equal(p,prior)||!row)put('profile:'+p.id,p);}for(const p of before)if(!after.some(v=>v.id===p.id))put('profile:'+p.id,null);put('selection',selection(config,after));persist();void sync();}
 function apply(){
  const rows=journal.data.rows,list=Object.entries(rows).filter(([k,v])=>k.startsWith('profile:')&&!v.deleted).map(([,v])=>plain(v.value));
  if(!list.length&&!rows.selection)return;
  const names=new Set();for(const p of list){const base=p.name||'配置';let name=base,n=2;while(names.has(name))name=base.slice(0,54)+' · '+n++;p.name=name;names.add(name);}
  const selected=rows.selection?.value||{mode:'st',profileId:''},active=list.find(p=>p.id===selected.profileId),previous=api.read();
  const next={...previous,profilesVersion:1,profiles:list,profileId:active?.id||'',mode:selected.mode==='custom'&&active?'custom':'st'};
  if(active)Object.assign(next,{url:active.url,key:active.key,model:active.model});else{delete next.url;delete next.key;delete next.model;}
  if(!equal(previous,next)){api.storage.setItem('rp_ludo_api',JSON.stringify(next));api.changed?.();}
 }
 async function request(path,body,who){
  if(!valid(who))throw Error('Account changed');const c=new api.AbortController(),timer=api.setTimer(()=>c.abort(),8000);controllers.add(c);
  try{const r=await api.fetch(path,{method:body===undefined?'GET':'POST',credentials:'same-origin',cache:'no-store',headers:{...api.headers(),'Cache-Control':'no-cache'},signal:c.signal,...(body===undefined?{}:{body:JSON.stringify(body)})});if(!valid(who))throw Error('Account changed');if(body===undefined&&r.status===404)return{version:1,rows:{}};if(!r.ok)throw Error('Cloud unavailable');const text=await r.text();if(!valid(who)||text.length>2*1024*1024)throw Error('Cloud reply invalid');return JSON.parse(text);}finally{api.clearTimer(timer);controllers.delete(c);}
 }
 async function sync(){
  let who;try{who=identity();if(flight)return flight;importLocal();}catch{api.status?.('已保留本机配置，云端同步暂不可用。');return false;}
  const current=journal;
  const run=(async()=>{try{
   for(let attempt=0;attempt<4;attempt++){
    const remote=validateApiSync(await request('/user/files/'+API_SYNC_FILE,undefined,who));if(!valid(who)||journal!==current)return false;
    journal.data=mergeApiSync(remote,journal.data);persist();apply();
    if(equal(mergeApiSync(remote,remote),journal.data)){api.status?.('配置已同步');return true;}
    const snapshot=plain(journal.data),encoded=api.base64(new TextEncoder().encode(JSON.stringify(snapshot))),upload=await request('/api/files/upload',{name:API_SYNC_FILE,data:encoded},who);
    if('/'+String(upload.path||'').replace(/^\//,'')!=='/user/files/'+API_SYNC_FILE)throw Error('Cloud save not confirmed');
    const check=validateApiSync(await request('/user/files/'+API_SYNC_FILE,undefined,who));if(!valid(who)||journal!==current)return false;
    journal.data=mergeApiSync(journal.data,check);persist();apply();
    if(equal(mergeApiSync(check,check),journal.data)&&equal(snapshot,journal.data)){api.status?.('已保存并同步');return true;}
   }throw Error('Concurrent changes');
  }catch{if(valid(who))api.status?.('已存本机，云端同步未完成；打开设置会重试。');return false;}finally{if(journal===current)flight=null;}})();flight=run;return run;
 }
 function close(){closed=true;for(const c of controllers)c.abort();controllers.clear();}
 return{sync,record,close};
}
