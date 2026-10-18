import {readFileSync,realpathSync,statSync} from 'node:fs';
import {basename,resolve,sep} from 'node:path';
import {createHash} from 'node:crypto';
import {inflateSync} from 'node:zlib';
import {ShopError} from './shop-store.mjs';
const bad=(msg,status=400)=>{throw new ShopError('profile',msg,status);};
const clean=(v,max)=>typeof v==='string'?v.slice(0,max):'';
function within(root,file){const base=realpathSync(root),path=realpathSync(resolve(base,file));if(!path.startsWith(base+sep))bad('角色或世界书路径不合法。');return path;}
export function readCharacterCard(directories,avatar){
 if(typeof avatar!=='string'||!avatar||avatar.length>200||basename(avatar)!==avatar||/[\\/\0]/.test(avatar)||!avatar.toLowerCase().endsWith('.png'))bad('请选择当前账户中的有效角色卡。');
 let bytes;try{const file=within(directories.characters,avatar);if(statSync(file).size>30000000)bad('角色卡图片过大，请先整理后重试。');bytes=readFileSync(file);}catch(e){if(e.shopCode)throw e;bad('角色卡暂时不可读取，原店铺不会改变。',404);}
 if(bytes.length<8||bytes.subarray(0,8).toString('hex')!=='89504e470d0a1a0a')bad('角色卡不是有效PNG。');
 const fields={};for(let at=8;at+12<=bytes.length;){const length=bytes.readUInt32BE(at),type=bytes.toString('ascii',at+4,at+8);if(length>bytes.length-at-12)bad('角色卡数据损坏。');const data=bytes.subarray(at+8,at+8+length);if(type==='tEXt'){const split=data.indexOf(0);if(split>0){const name=data.toString('latin1',0,split);if(['chara','ccv3'].includes(name))fields[name]=data.subarray(split+1).toString('utf8');}}at+=length+12;}
 let card;for(const key of ['ccv3','chara'])if(fields[key])try{if(fields[key].length>3000000)bad('角色资料过大。');const parsed=JSON.parse(Buffer.from(fields[key],'base64').toString('utf8'));if(parsed&&typeof parsed==='object'){card=parsed;break;}}catch(e){if(e.shopCode)throw e;}
 if(!card)bad('角色卡中没有可读取的人设资料。');const d=card.data&&typeof card.data==='object'?card.data:card;
 if(typeof d.name!=='string'||!d.name.trim())bad('角色名称不完整。');
 const profile={ref:'card:'+avatar,name:d.name.trim().slice(0,100),avatar,description:clean(d.description,120000),personality:clean(d.personality,30000),scenario:clean(d.scenario,30000),examples:clean(d.mes_example,30000),greeting:clean(d.first_mes,20000),worldEntries:[],worldName:'',version:createHash('sha256').update(JSON.stringify(d)).digest('hex')};
 let entries=[];if(Array.isArray(d.character_book?.entries))entries.push(...d.character_book.entries);
 const world=d.extensions?.world;if(typeof world==='string'&&world.trim()){
  const name=world.trim();if(name.length<=200&&!/[\\/\0]/.test(name)&&name!=='.'&&name!=='..'){
   try{const file=within(directories.worlds,name.endsWith('.json')?name:name+'.json');if(statSync(file).size<=10000000){const raw=readFileSync(file,'utf8'),book=JSON.parse(raw);profile.worldName=name;entries.push(...(Array.isArray(book.entries)?book.entries:Object.values(book.entries||{})));profile.version=createHash('sha256').update(profile.version+'\n'+raw).digest('hex');}}catch{profile.worldUnavailable=true;}
  }
 }
 // Preserve only the selected card's own bindings; never inspect current chat lore.
 profile.worldEntries=entries.filter(e=>e&&typeof e==='object'&&!e.disable&&e.enabled!==false&&typeof e.content==='string').slice(0,500).map((e,i)=>({id:String(e.uid??e.id??i),constant:!!e.constant,keys:(Array.isArray(e.key)?e.key:Array.isArray(e.keys)?e.keys:[]).filter(x=>typeof x==='string').slice(0,30),secondary:(Array.isArray(e.keysecondary)?e.keysecondary:Array.isArray(e.secondary_keys)?e.secondary_keys:[]).filter(x=>typeof x==='string').slice(0,30),selective:!!e.selective,logic:Number(e.selectiveLogic)||0,order:Number(e.order??e.insertion_order)||100,content:e.content.slice(0,12000)}));
 if(JSON.stringify(profile).length>1200000)bad('角色世界书较大，当前无法安全创建资料快照，请先整理。');return profile;
}
