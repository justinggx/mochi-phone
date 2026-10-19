import {readFileSync,realpathSync,statSync} from 'node:fs';
import {basename,resolve,sep} from 'node:path';
import {createHash} from 'node:crypto';
import {ShopError} from './shop-store.mjs';
const bad=(msg,status=400)=>{throw new ShopError('profile',msg,status);};
const clean=(v,max)=>typeof v==='string'?v.slice(0,Math.max(0,max)):'';
const hash=v=>createHash('sha256').update(v).digest('hex');
const norm=v=>String(v||'').normalize('NFKC').trim().toLowerCase();
const keys=e=>(Array.isArray(e.key)?e.key:Array.isArray(e.keys)?e.keys:[]).filter(x=>typeof x==='string');
function within(root,file){const base=realpathSync(root),path=realpathSync(resolve(base,file));if(!path.startsWith(base+sep))bad('角色或世界书路径不合法。');return path;}
function sourceCard(directories,avatar){
 if(typeof avatar!=='string'||!avatar||avatar.length>200||basename(avatar)!==avatar||/[\\/\0]/.test(avatar)||!avatar.toLowerCase().endsWith('.png'))bad('请选择当前账户中的有效角色卡。');
 let bytes;try{const file=within(directories.characters,avatar);if(statSync(file).size>30000000)bad('角色卡图片过大，请先整理后重试。');bytes=readFileSync(file);}catch(e){if(e.shopCode)throw e;bad('角色卡暂时不可读取，原店铺不会改变。',404);}
 if(bytes.length<8||bytes.subarray(0,8).toString('hex')!=='89504e470d0a1a0a')bad('角色卡不是有效PNG。');
 const fields={};for(let at=8;at+12<=bytes.length;){const length=bytes.readUInt32BE(at),type=bytes.toString('ascii',at+4,at+8);if(length>bytes.length-at-12)bad('角色卡数据损坏。');const data=bytes.subarray(at+8,at+8+length);if(type==='tEXt'){const split=data.indexOf(0);if(split>0){const name=data.toString('latin1',0,split).toLowerCase();if(['chara','ccv3'].includes(name))fields[name]=data.subarray(split+1).toString('utf8');}}at+=length+12;}
 let card;for(const key of ['ccv3','chara'])if(fields[key])try{if(fields[key].length>3000000)bad('角色资料过大。');const parsed=JSON.parse(Buffer.from(fields[key],'base64').toString('utf8'));if(parsed&&typeof parsed==='object'){card=parsed;break;}}catch(e){if(e.shopCode)throw e;}
 if(!card)bad('角色卡中没有可读取的人设资料。');const d=card.data&&typeof card.data==='object'?card.data:card;
 if(typeof d.name!=='string'||!d.name.trim())bad('角色名称不完整。');
 let version=hash(JSON.stringify(d)),worldName='',worldUnavailable=false,entries=[];
 if(Array.isArray(d.character_book?.entries))entries.push(...d.character_book.entries);
 const world=d.extensions?.world;if(typeof world==='string'&&world.trim()){
  const name=world.trim();if(name.length<=200&&!/[\\/\0]/.test(name)&&name!=='.'&&name!=='..'){
   try{const file=within(directories.worlds,name.endsWith('.json')?name:name+'.json');if(statSync(file).size>10000000)throw new Error('world size');const raw=readFileSync(file,'utf8'),book=JSON.parse(raw);worldName=name;entries.push(...(Array.isArray(book.entries)?book.entries:Object.values(book.entries||{})));version=hash(version+'\n'+raw);}catch{worldUnavailable=true;}
  }
 }
 // Cards often embed a copy of their bound worldbook. Identical entries are one source.
 const seen=new Set();entries=entries.filter(e=>{if(!e||typeof e!=='object'||e.disable===true||e.disable==='true'||e.enabled===false||typeof e.content!=='string')return false;const k=hash(JSON.stringify([e.content,keys(e),e.keysecondary||e.secondary_keys||[],!!e.constant,!!e.selective,Number(e.selectiveLogic)||0,Number(e.order??e.insertion_order)||100]));if(seen.has(k))return false;seen.add(k);return true;});
 return{d,avatar,entries,version,worldName,worldUnavailable};
}
function nameValue(value){return clean(value,100).trim().replace(/^["']|["']$/g,'').trim();}
// A person must have a named profile section, not merely be mentioned in dialogue.
function castOf(source){
 const members=[],byAlias=new Map();
 function add(id,name,aliases,content,entry=null){
  id=nameValue(id);name=nameValue(name)||id;if(!id||!name||/[<>\n\r{}]/.test(id+name))return;
  const key=norm(id),existing=members.find(m=>norm(m.id)===key);
  const member=existing||{id,name,aliases:[],blocks:[],entries:new Set()};if(!existing)members.push(member);
  for(const alias of [id,name,...aliases]){const a=nameValue(alias);if(a&&!member.aliases.some(x=>norm(x)===norm(a)))member.aliases.push(a);}
  if(content&&!member.blocks.includes(content))member.blocks.push(content);if(entry)member.entries.add(entry);
 }
 const pieces=[{content:clean(source.d.description,120000),title:''},...source.entries.map(entry=>({content:entry.content,title:entry.comment||entry.name||'',entry}))];
 for(const piece of pieces){
  const {content,title,entry}=piece;
  const xml=/<(character(?:_([^\s<>/]+))?)(?:\s+name=["']([^"']+)["'])?\s*>([\s\S]*?)<\/\1\s*>/gi;let match;
  while((match=xml.exec(content))){const id=match[2]||match[3];if(!id||/_(?:family|growth|history|background)$/i.test(id))continue;const full=match[4].match(/^\s*(?:full_name|姓名|全名|name)\s*[:：]\s*([^\r\n]+)/im)?.[1];add(id,nameValue(full)||id,[],match[0],entry);}
  const titleName=String(title).match(/^\s*(.+?)(?:[·\s_-]*(?:人设|设定|人物档案|角色资料|profile|character sheet))\s*$/i)?.[1];
  if(titleName&&!/世界|全局|格式|输出|剧情|故事|游戏|规则|系统|通用/.test(titleName)){const full=content.match(/^\s*(?:full_name|姓名|全名|name)\s*[:：]\s*([^\r\n]+)/im)?.[1];add(titleName,nameValue(full)||titleName,[],content,entry);}
  const heading=/^(#{1,4})\s+(?:角色[:：]\s*)?([^\r\n]+)\r?\n/gm;const headers=[...content.matchAll(heading)];
  for(let i=0;i<headers.length;i++){const h=headers[i],end=headers.slice(i+1).find(n=>n[1].length<=h[1].length)?.index??content.length,section=content.slice(h.index,end),full=section.match(/^\s*(?:full_name|姓名|全名|name)\s*[:：]\s*([^\r\n]+)/im)?.[1];if(full)add(nameValue(full),nameValue(full),[h[2]],section,entry);}
 }
 for(const member of members)for(const alias of member.aliases){const key=norm(alias),list=byAlias.get(key)||[];if(!list.includes(member))list.push(member);byAlias.set(key,list);}
 return{members,byAlias};
}
// Manual identity comes from the user. Source matching supplies context, not a closed roster.
function mentions(text,name){
 const hay=norm(text),needle=norm(name);if(!needle)return false;let at=hay.indexOf(needle);
 while(at>=0){const before=hay[at-1]||'',after=hay[at+needle.length]||'',word=/[\p{Script=Latin}\p{N}_]/u;if(!word.test(needle[0])||!word.test(before)){if(!word.test(needle.at(-1))||!word.test(after))return true;}at=hay.indexOf(needle,at+1);}return false;
}
function manualMember(source,name){
 const id=name.normalize('NFKC').trim(),strong=source.entries.filter(e=>mentions(e.comment||e.name||'',id)||keys(e).some(k=>norm(k)===norm(id)));
 const raw=[source.d.description,source.d.personality,source.d.scenario,source.d.mes_example].filter(x=>typeof x==='string').join('\n\n');
 const paragraphs=raw.split(/\n\s*\n/).filter(block=>mentions(block,id)),weak=source.entries.filter(e=>mentions(e.content,id));
 const entries=strong.length?strong:weak;
 if(Array.from(id).length<2&&!source.entries.some(e=>keys(e).some(k=>norm(k)===norm(id))))bad('请填写完整的卡内人物姓名。');
 if(!entries.length&&!paragraphs.length)bad('在所选角色卡和绑定世界书中没有找到这个姓名，请检查姓名或别名。');
 // Explicitly selected sections come first; the chosen spelling remains stable in the save.
 const blocks=strong.length?strong.map(e=>e.content):[...paragraphs,...weak.map(e=>e.content)];
 return{id,name:id,aliases:[id],blocks:[...new Set(blocks)],entries:new Set(entries),manual:true};
}
export function readCardChoices(directories,avatar){
 const source=sourceCard(directories,avatar),{members}=castOf(source),name=source.d.name.trim().slice(0,100);
 return{avatar,name,members:members.map(({id,name,aliases})=>({id,name,aliases})),worldUnavailable:source.worldUnavailable};
}
export function readCharacterCard(directories,avatar,member='',{requireMember=false}={}){
 const source=sourceCard(directories,avatar),{d}=source,cast=castOf(source);let selected=null;
 if(typeof member!=='string'||member.length>100)bad('请选择卡内有效的角色姓名。');
 if(member.trim()){if(/[{}<>\\/\u0000-\u001f]/.test(member))bad('请填写人物姓名，不要输入标签或指令。');const matches=cast.byAlias.get(norm(member))||[];if(matches.length>1)bad('这个别名对应多个资料段，请使用更明确的完整姓名。');selected=matches[0]||(norm(member)===norm(d.name)?null:manualMember(source,member));}
 else if(requireMember&&cast.members.length>1)bad('这是一张多人卡，请先选择卡内的开店搭子。');
 const profile={ref:selected?'member:'+hash(avatar+'\0'+norm(selected.id)).slice(0,48):'card:'+avatar,name:selected?.name||d.name.trim().slice(0,100),avatar,description:clean(d.description,120000),personality:clean(d.personality,30000),scenario:clean(d.scenario,30000),examples:clean(d.mes_example,30000),greeting:clean(d.first_mes,20000),worldEntries:[],worldName:source.worldName,version:source.version};
 if(source.worldUnavailable)profile.worldUnavailable=true;
 let entries=source.entries;
 if(selected){
  profile.member=selected.id;profile.cardName=d.name.trim().slice(0,100);profile.version=hash(source.version+'\nshop-member-v1\n'+norm(selected.id));
  const own=selected.blocks.join('\n\n');if(own.length>96000)bad('该角色的人物资料较大，无法安全建立快照，请先整理。');
  let shared=clean(d.description,120000);for(const m of cast.members)for(const block of m.blocks)shared=shared.replaceAll(block,'');
  profile.description=own+'\n\n【来源卡的共享背景】\n'+clean(shared,120000-own.length-30);
  const belongs=(e,m)=>m.entries.has(e)||[...keys(e),String(e.comment||e.name||'')].some(x=>m.aliases.some(a=>norm(x)===norm(a)||norm(x).startsWith(norm(a))&&/^(?:设定|家庭|成长|经历|背景|人设|\s)/.test(norm(x).slice(norm(a).length))));
  const related=e=>belongs(e,selected);
  entries=entries.filter(e=>related(e)||!cast.members.some(m=>m!==selected&&belongs(e,m)));
  entries=[...entries.filter(related),...entries.filter(e=>!related(e))];
  if(entries.length>500)bad('该角色关联的世界书条目较多，请先整理后重试。');
  profile.worldEntries=entries.map((e,i)=>worldEntry(e,i,related(e)));
 }else profile.worldEntries=entries.slice(0,500).map((e,i)=>worldEntry(e,i,false));
 if(JSON.stringify(profile).length>1200000)bad('角色世界书较大，当前无法安全创建资料快照，请先整理。');return profile;
}
function worldEntry(e,i,memberRelated){return{id:String(e.uid??e.id??i),constant:!!e.constant,keys:keys(e).slice(0,30),secondary:(Array.isArray(e.keysecondary)?e.keysecondary:Array.isArray(e.secondary_keys)?e.secondary_keys:[]).filter(x=>typeof x==='string').slice(0,30),selective:!!e.selective,logic:Number(e.selectiveLogic)||0,order:Number(e.order??e.insertion_order)||100,content:e.content.slice(0,12000),...(memberRelated?{memberRelated:true}:{})};}
