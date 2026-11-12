// Current-slot people only. Discovery never registers people or retains source text.
export const PEOPLE_LIMITS = Object.freeze({entities:512,name:80,note:600,aliases:32,id:128,scope:2048,bankBytes:262144,bankTotalBytes:4194304,depth:24,nodes:50000});
const own=(value,key)=>Object.prototype.hasOwnProperty.call(value,key);
const plain=value=>!!value&&typeof value==='object'&&!Array.isArray(value)&&(Object.getPrototypeOf(value)===Object.prototype||Object.getPrototypeOf(value)===null);
const forbidden=key=>['__proto__','prototype','constructor'].includes(key);
const validId=id=>typeof id==='string'&&id.length<=PEOPLE_LIMITS.id&&/^[A-Za-z0-9][A-Za-z0-9_.:-]*$/.test(id)&&!forbidden(id);
const validEntityId=id=>validId(id)&&id!=='legacy-card';
const keyOf=value=>String(value||'').normalize('NFKC').trim().replace(/\s+/g,' ').toLowerCase();
const SINGLE=['diaryAuthor','diaryReply','bank','theatre'],MULTI=['xhs','moments'];
const fail=message=>{throw new Error('人物资料格式不完整：'+message);};
const check=(valid,message,strict)=>{if(!valid&&strict)fail(message);return valid;};
const put=(target,key,value)=>Object.defineProperty(target,key,{value,writable:true,enumerable:true,configurable:true});
function nameValue(value,strict=false){
 if(!check(typeof value==='string','姓名必须为文字',strict))return'';
 if(!check(!/[\r\n\u0000-\u001f\u007f]/.test(value),'姓名包含控制符',strict))return'';
 const text=value.trim().replace(/[\u200B-\u200D\uFEFF]/g,'').replace(/\s+/g,' ');
 if(!check(!!text&&text.length<=PEOPLE_LIMITS.name&&!/[<>{}\u0000-\u001f\u007f]/.test(text),'姓名为空、过长或包含控制符',strict))return'';
 return text;
}
function noteValue(value,strict=false){
 if(value===undefined)return'';
 if(!check(typeof value==='string'&&value.length<=PEOPLE_LIMITS.note&&!/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/.test(value),'人物补充过长或不是文字',strict))return'';
 return value.trim();
}
function aliasesValue(value,name,strict=false){
 if(value===undefined)return[];
 if(!check(Array.isArray(value)&&value.length<=PEOPLE_LIMITS.aliases,'别名列表格式或数量无效',strict))return[];
 const result=[],seen=new Set([keyOf(name)]);
 for(const raw of value){const alias=nameValue(raw,strict),key=keyOf(alias);if(alias&&!seen.has(key)){seen.add(key);result.push(alias);}}
 return result;
}
function personValue(value,id,strict=false){
 if(!check(plain(value)&&validId(id),'人物对象或ID无效',strict))return null;
 if(!check(!Object.keys(value).some(forbidden),'人物对象含保留字段',strict))return null;
 if(strict&&Object.keys(value).some(key=>!['id','name','note','aliases'].includes(key)))fail('人物对象含不支持字段');
 if(!check(value.id===id||!strict&&value.id===undefined,'人物ID与字典键不一致',strict))return null;
 const name=nameValue(value.name,strict);if(!name)return null;
 return{id,name,note:noteValue(value.note,strict),aliases:aliasesValue(value.aliases,name,strict)};
}
const empty=()=>({version:1,mode:'auto',entities:{},selections:{diaryAuthor:null,diaryReply:null,bank:null,xhs:[],moments:[],theatre:null}});
export function normalizePeople(value,{strict=false}={}){
 const out=empty();
 if(value==null&&!strict)return out;
 if(!check(plain(value),'名单不是普通对象',strict))return out;
 if(!check(!Object.keys(value).some(forbidden),'名单含保留字段',strict))return out;
 if(strict&&Object.keys(value).some(key=>!['version','mode','entities','selections'].includes(key)))fail('名单含不支持字段');
 if(!check(value.version===1,'不支持的名单版本',strict))return out;
 if(check(value.mode==='auto'||value.mode==='multi','多人模式无效',strict))out.mode=value.mode;
 const entities=value.entities;
 if(check(plain(entities),'人物字典无效',strict)){
  const entries=Object.entries(entities);
  if(check(entries.length<=PEOPLE_LIMITS.entities,'人物数量超过上限',strict))for(const[id,raw]of entries){if(!check(validEntityId(id),'人物ID无效或为旧卡保留ID',strict))continue;const person=personValue(raw,id,strict);if(person)put(out.entities,id,person);}
 }
 const selections=value.selections;
 if(!check(plain(selections),'选择记录无效',strict))return out;
 if(!check(!Object.keys(selections).some(forbidden),'选择记录含保留字段',strict))return out;
 if(strict&&Object.keys(selections).some(key=>![...SINGLE,...MULTI].includes(key)))fail('选择记录含不支持字段');
 for(const field of SINGLE){
  const id=selections[field];
  if(id==null||id==='')continue;
  if(check(validEntityId(id)&&own(out.entities,id),'选择引用了不存在的人物',strict))out.selections[field]=id;
 }
 for(const field of MULTI){
  const ids=selections[field];if(ids===undefined)continue;
  if(!check(Array.isArray(ids)&&ids.length<=PEOPLE_LIMITS.entities,'多人选择格式或数量无效',strict))continue;
  const seen=new Set();for(const id of ids)if(check(validEntityId(id)&&own(out.entities,id),'多人选择引用了不存在的人物',strict)&&!seen.has(id)){seen.add(id);out.selections[field].push(id);}
 }
 return out;
}
function fingerprint(person){return JSON.stringify([person.name,person.note,[...person.aliases].sort()]);}
function hash(text){let h=2166136261;for(const c of text)h=Math.imul(h^c.codePointAt(0),16777619);return(h>>>0).toString(36);}
// remap always refers to incoming IDs; consumers must apply it to imported records.
export function mergePeople(keep,incoming){
 const people=normalizePeople(keep),added=normalizePeople(incoming),remap={};
 if(!Object.keys(people.entities).length&&!SINGLE.some(field=>people.selections[field])&&!MULTI.some(field=>people.selections[field].length))people.mode=added.mode;
 for(const[id,person]of Object.entries(added.entities)){
  let target=id;
  if(own(people.entities,target)&&fingerprint(people.entities[target])!==fingerprint(person)){
   const base=id.slice(0,96)+'_import_'+hash(fingerprint(person));target=base;let n=1;
   while(own(people.entities,target)&&fingerprint(people.entities[target])!==fingerprint(person))target=base+'_'+n++;
  }
  if(!own(people.entities,target)){
   if(Object.keys(people.entities).length>=PEOPLE_LIMITS.entities)fail('合并后人物数量超过上限，原名单未变');
   put(people.entities,target,{...person,id:target,aliases:[...person.aliases]});
  }
  put(remap,id,target);
 }
 for(const field of SINGLE)if(!people.selections[field]&&added.selections[field])people.selections[field]=remap[added.selections[field]];
 for(const field of MULTI)if(!people.selections[field].length)people.selections[field]=added.selections[field].map(id=>remap[id]);
 // An existing explicit mode is never changed by an imported preference.
 return{people,remap};
}
function cloneJSON(value,strict,state,depth=0){
 if(++state.nodes>PEOPLE_LIMITS.nodes||depth>PEOPLE_LIMITS.depth){if(strict)fail('资产资料嵌套或数量过大');return undefined;}
 if(value===null||typeof value==='string'||typeof value==='boolean')return value;
 if(typeof value==='number'&&Number.isFinite(value))return value;
 if(Array.isArray(value)){
  const out=[];for(const item of value){const cloned=cloneJSON(item,strict,state,depth+1);if(cloned===undefined){if(strict)fail('资产列表包含非JSON资料');return undefined;}out.push(cloned);}return out;
 }
 if(plain(value)){
  const out={};for(const[key,item]of Object.entries(value)){
   if(forbidden(key)){if(strict)fail('资产资料包含保留字段');continue;}
   const cloned=cloneJSON(item,strict,state,depth+1);if(cloned===undefined){if(strict)fail('资产资料包含非JSON资料');return undefined;}put(out,key,cloned);
  }return out;
 }
 if(strict)fail('资产资料包含非JSON对象');return undefined;
}
export function normalizeBankByPerson(value,{strict=false,people}={}){
 const out={};if(value==null&&!strict)return out;
 if(!check(plain(value),'资产字典无效',strict))return out;
 const entries=Object.entries(value);if(!check(entries.length<=PEOPLE_LIMITS.entities,'资产人物数量超过上限',strict))return out;
 const allowed=people===undefined?null:normalizePeople(people,{strict}).entities;let bytes=0;
 for(const[id,report]of entries){
  if(!check(validEntityId(id)&&(!allowed||own(allowed,id))&&plain(report),'资产主体引用或报告无效',strict))continue;
  const copy=cloneJSON(report,strict,{nodes:0});if(copy===undefined)continue;
  const size=new TextEncoder().encode(JSON.stringify(copy)).length;
  if(!check(size<=PEOPLE_LIMITS.bankBytes&&bytes+size<=PEOPLE_LIMITS.bankTotalBytes,'资产报告超过大小上限',strict))continue;
  bytes+=size;put(out,id,copy);
 }return out;
}
export function mergeBankByPerson(keep,incoming,remap={}){
 const out=normalizeBankByPerson(keep),added=normalizeBankByPerson(incoming);
 for(const[id,report]of Object.entries(added)){
  const target=plain(remap)&&own(remap,id)?remap[id]:id;
  if(!validEntityId(target))fail('资产合并人物映射无效');
  if(!own(out,target))put(out,target,report);
 }
 return normalizeBankByPerson(out,{strict:true});
}
export function subjectSnapshot(person,{cardKey,slotKey}={}){
 if(!plain(person)||!validId(person.id))return null;
 if([cardKey,slotKey].some(value=>value!==undefined&&(typeof value!=='string'||value.length>PEOPLE_LIMITS.scope)))return null;
 const clean=personValue(person,person.id);if(!clean)return null;
 const snapshot={id:clean.id,name:clean.name,note:clean.note,aliases:Object.freeze([...clean.aliases])};
 if(typeof cardKey==='string')snapshot.cardKey=cardKey;
 if(typeof slotKey==='string')snapshot.slotKey=slotKey;
 return Object.freeze(snapshot);
}
export function remapSubjectSnapshot(value,remap={}){
 if(!plain(value))return null;
 const id=plain(remap)&&own(remap,value.id)?remap[value.id]:value.id;
 return subjectSnapshot({...value,id},{cardKey:value.cardKey,slotKey:value.slotKey});
}
const on=value=>[true,1,'true','1'].includes(value),off=value=>[false,0,'false','0'].includes(value);
const peopleContainer=/^(?:characters?|people|persons?|npcs?|人物|角色)$/i;
const nonPeopleContainer=/^(?:compan(?:y|ies)|organizations?|organisations?|corporations?|groups?|business|locations?|places?|rules?|rulesets?|objects?|items?|inventory|公司|企业|集团|组织|机构|地点|地区|规则|物品|道具)$/i;
const identityContainer=/^(?:identity|个人信息|身份信息|基本信息)$/i;
const personFieldKey=/^(?:age|gender|sex|species|occupation|profession|personality|disposition|relations|relationships?|性别|年龄|职业|身份|性格|关系|种族)$/i;
const personFields=text=>[...String(text).matchAll(/^[ \t]*(?:[-*][ \t]+)?(age|gender|sex|species|occupation|profession|personality|disposition|relations|relationships?|性别|年龄|职业|身份|性格|关系|种族)[ \t]*[:：][ \t]*\S+/gmi)];
const fieldIndent=line=>line.match(/^[ \t]*/)[0].length+(/^[ \t]*[-*][ \t]+/.test(line)?2:0);
const cleanDeclaredName=value=>String(value||'').replace(/\s+#.*$/,'').trim().replace(/^["'“‘]|["'”’]$/g,'').split(/[(（【\[,，]/)[0].trim();
function declaredPeople(text){
 const result=[],source=String(text||'').replace(/^([ \t]*(?:[-*][ \t]+)?)\*\*([^*\r\n]+)\*\*([ \t]*[:：])?/gm,(line,prefix,label,colon)=>{
  const key=label.replace(/[:：][ \t]*$/,'').trim();
  if(!colon&&!/[:：][ \t]*$/.test(label))return line;
  return /^(?:name|full_name|full name|姓名|名字|aliases?|别名|又名|英文名|profile|position)$/i.test(key)||personFieldKey.test(key)||peopleContainer.test(key)||identityContainer.test(key)||nonPeopleContainer.test(key)?prefix+key+':':line;
 });
 const remember=(name,body,identity=false)=>{
  name=nameValue(cleanDeclaredName(name));if(!name)return;
  const aliases=[];
  for(const match of String(body).matchAll(/^[ \t]*(?:[-*][ \t]+)?(?:aliases|alias|别名|又名|英文名)[ \t]*[:：][ \t]*([^\r\n]+)/gmi))for(const part of match[1].replace(/^\[|\]$/g,'').split(/[,，/|、]/)){const alias=nameValue(part.trim().replace(/^["']|["']$/g,''));if(alias)aliases.push(alias);}
  result.push({name,aliases:aliasesValue(aliases.slice(0,PEOPLE_LIMITS.aliases),name),evidence:'declared',...(identity?{identityDeclared:true}:{})});
 };
 // Valid JSON is parsed as data; an object's name alone still is not a person.
 if(/^\s*[{[]/.test(source))try{
  const walk=(value,character=false,depth=0,container='',blocked=false,recordIdentity=false)=>{
   if(depth>PEOPLE_LIMITS.depth)return;
   if(Array.isArray(value)){for(const item of value)walk(item,character,depth+1,container,blocked);return;}
   if(!plain(value))return;
   const fields=Object.entries(value),field=key=>fields.find(([name])=>name.toLowerCase()===key)?.[1];
   const name=['name','full_name','full name','姓名','名字'].map(field).find(raw=>typeof raw==='string');
   const meaningful=raw=>raw!=null&&(typeof raw==='string'?!!raw.trim():plain(raw)?Object.keys(raw).length>0:Array.isArray(raw)?raw.length>0:typeof raw==='boolean'||typeof raw==='number'&&Number.isFinite(raw));
   const identity=identityContainer.test(container)&&(recordIdentity||meaningful(field('profile'))&&meaningful(field('position')));
   if(name&&!blocked&&(character||fields.some(([key])=>personFieldKey.test(key))||identity)){
    const rawAliases=field('aliases')||field('alias')||field('别名')||[],aliases=Array.isArray(rawAliases)?rawAliases:typeof rawAliases==='string'?rawAliases.split(/[,，/|、]/):[];
    const clean=nameValue(cleanDeclaredName(name));if(clean)result.push({name:clean,aliases:aliasesValue(aliases.slice(0,PEOPLE_LIMITS.aliases),clean),evidence:'declared',...(identity?{identityDeclared:true}:{})});
   }
   for(const[key,item]of fields)if(!forbidden(key)&&item&&typeof item==='object')walk(item,peopleContainer.test(key),depth+1,key,peopleContainer.test(key)?false:blocked||nonPeopleContainer.test(key),identityContainer.test(key)&&plain(item)&&meaningful(field('profile'))&&meaningful(field('position')));
  };
  walk(JSON.parse(source));
 }catch{/* Non-JSON sources continue through declaration-only text parsing. */}
 const identityPair=(body,indent)=>{
  const lines=body.split('\n'),fields=new Set();
  lines.forEach((line,i)=>{const m=line.match(/^[ \t]*(?:[-*][ \t]+)?(profile|position)[ \t]*[:：][ \t]*([^\r\n]*)$/i);if(!m||fieldIndent(line)!==indent)return;const value=m[2].trim(),next=lines.slice(i+1).find(item=>item.trim());if(value&&!/^(?:null|~|\[\]|\{\}|["']{2})$/i.test(value)||!value&&next&&fieldIndent(next)>indent)fields.add(m[1].toLowerCase());});
  return fields.has('profile')&&fields.has('position');
 };
 const scan=(body,isCharacter=false)=>{
  const fields=[...body.matchAll(/^[ \t]*(?:[-*][ \t]+)?(?:name|full_name|full name|姓名|名字)[ \t]*[:：][ \t]*([^\r\n]+)/gmi)];
  fields.forEach((field,i)=>{
   const indent=fieldIndent(field[0]),lines=body.slice(field.index,fields[i+1]?.index??body.length).split('\n');
   const end=lines.findIndex((line,i)=>i>0&&line.trim()&&(fieldIndent(line)<indent||/^[ \t]*#{1,6}[ \t]/.test(line)));
   const part=(end<0?lines:lines.slice(0,end)).join('\n');
   let parent=false,identity=false,blocked=false,parentIndent=indent,closest=true,identityScope=null,offset=field.index;
   for(const line of body.slice(0,field.index).split('\n').reverse()){
    offset-=line.length+1;
    if(/^\s*(?:#{1,6}\s|<\/|[-*_]{3,}\s*$)/.test(line))break;
    const m=line.match(/^([ \t]*)([^:\n]+?)[ \t]*[:：][ \t]*$/);
    if(m&&fieldIndent(line)<parentIndent){
     const key=m[2].trim().replace(/^[-*][ \t]+/,'');if(closest){parent=peopleContainer.test(key);identity=identityContainer.test(key);if(identity)identityScope={index:offset+1,indent:fieldIndent(line)};closest=false;}
     blocked ||= nonPeopleContainer.test(key);parentIndent=fieldIndent(line);
    }
   }
   let recordIdentity=false;
   if(identityScope){
    const recordLines=body.slice(identityScope.index,fields[i+1]?.index??body.length).split('\n');
    const recordEnd=recordLines.findIndex((line,j)=>j>0&&line.trim()&&(fieldIndent(line)<identityScope.indent||/^[ \t]*#{1,6}[ \t]/.test(line)||fieldIndent(line)===identityScope.indent&&identityContainer.test(line.replace(/^[ \t]*(?:[-*][ \t]+)?/,'').replace(/[ \t]*[:：][ \t]*$/,''))));
    recordIdentity=identityPair((recordEnd<0?recordLines:recordLines.slice(0,recordEnd)).join('\n'),identityScope.indent);
   }
   const explicitIdentity=identity&&(identityPair(part,indent)||recordIdentity);
   if(!blocked&&(isCharacter||parent||personFields(part).some(m=>fieldIndent(m[0])===indent)||explicitIdentity))remember(field[1],part,explicitIdentity);
  });
 };
 const rest=source.replace(/<character(?:[_-][^>\s]*)?\b([^>]*)>([\s\S]*?)<\/character(?:[_-][^>\s]*)?\s*>/gi,(_block,attrs,body)=>{
  scan(body,true);const name=attrs.match(/\bname\s*=\s*["']([^"']+)["']/i);if(name)remember(name[1],body);return'\n';
 });
 scan(rest);
 const headings=[...rest.matchAll(/^[ \t]*(?:#{1,6}[ \t]+([^\r\n]+)|\[([^\]\r\n]+)\])[ \t]*$/gm)];
 headings.forEach((heading,i)=>{
  const body=rest.slice(heading.index,headings[i+1]?.index??rest.length),title=String(heading[1]||heading[2]).replace(/[*_`]/g,'').replace(/[ \t]+#+[ \t]*$/,'').trim();
  const traits=personFields(body),traitIndent=traits.length?Math.min(...traits.map(m=>fieldIndent(m[0]))):0;
  if(!nonPeopleContainer.test(title)&&!/^[ \t]*(?:[-*][ \t]+)?(?:name|full_name|full name|姓名|名字)[ \t]*[:：]/mi.test(body)&&new Set(traits.filter(m=>fieldIndent(m[0])===traitIndent).map(m=>m[1].toLowerCase())).size>=2)remember(title.split(/\s+[—–-]\s+|[|／/]/)[0],body);
 });
 return result;
}
function excludedName(name,ctx,state){
 const key=keyOf(name);
 if(!key||key===keyOf(ctx?.name1)||/^(?:sillytavern|tavern|system|assistant|ai|user|me|self|myself|我|自己)$/i.test(name))return true;
 return(Array.isArray(state?.blocklist)?state.blocklist:[]).some(item=>keyOf(typeof item==='string'?item:item?.name)===key);
}
function groupMemberCards(ctx){
 if(ctx?.groupId==null)return[];
 const group=(Array.isArray(ctx.groups)?ctx.groups:[]).find(item=>item&&String(item.id)===String(ctx.groupId));
 const members=new Set(Array.isArray(group?.members)?group.members:[]),loaded=Array.isArray(ctx.characters)?ctx.characters:Object.values(ctx.characters||{});
 return loaded.filter(card=>card&&typeof card==='object'&&typeof card.avatar==='string'&&members.has(card.avatar));
}
// Membership can require an explicit choice without treating a group/card title as a person.
export function hasMultipleGroupMembers(ctx={}){return new Set(groupMemberCards(ctx).map(card=>card.avatar)).size>=2;}
// guard is (promise) => guardedPromise; rejection is propagated, never hidden as no people.
export async function discoverPeople(ctx={},state={},{guard=promise=>promise}={}){
 const found=new Map(),add=(candidate,source)=>{
  const name=nameValue(candidate.name);if(!name||excludedName(name,ctx,state))return;
  const key=keyOf(name),old=found.get(key),order={declared:3,contact:2,speaker:1};
  const sources=[...new Set([...(old?.sources||[]),source])],identityDeclared=!!old?.identityDeclared||!!candidate.identityDeclared;
  if(!old||order[candidate.evidence]>order[old.evidence])found.set(key,{name,aliases:aliasesValue(candidate.aliases||[],name),evidence:candidate.evidence,sources,...(identityDeclared?{identityDeclared:true}:{})});
  else{old.sources=sources;if(identityDeclared)old.identityDeclared=true;if(candidate.evidence==='declared'&&old.evidence==='declared')old.aliases=aliasesValue([...old.aliases,...(candidate.aliases||[])].slice(0,PEOPLE_LIMITS.aliases),name);}
 };
 const nativeGroup=ctx.groupId!=null;
 // A native group does not authorize a stale selected card or ctx.char. Its
 // explicit avatar membership is the only source-card allowlist.
 const cards=nativeGroup?groupMemberCards(ctx):[ctx.characters?.[ctx.characterId]||ctx.char].filter(card=>card&&typeof card==='object');
 for(const card of cards){
  for(const field of ['description','personality','scenario','mes_example','first_mes']){
   const text=card[field]||card.data?.[field];if(typeof text==='string')for(const person of declaredPeople(text))add(person,'card');
  }
 }
 const binding=card=>card?.data?.extensions?.world||card?.extensions?.world,chatBound=ctx.chatMetadata?.world_info;
 const books=[...new Set([...cards.map(binding),chatBound].filter(value=>typeof value==='string'&&value.trim()))];
 const scanBook=book=>{
  const entries=book?.entries;if(!entries||typeof entries!=='object')return;
  for(const raw of Object.values(entries)){
   if(!raw||typeof raw!=='object')continue;const entry={...raw.extensions,...raw};
   if(on(entry.disable)||on(entry.disabled)||off(entry.enabled))continue;
   const text=entry.content||entry.text;if(typeof text==='string')for(const person of declaredPeople(text))add(person,'book');
  }
 };
 for(const book of books){
  if(typeof ctx.loadWorldInfo!=='function')throw new Error('当前绑定世界书暂时无法读取，请稍后重试。');
  const data=await guard(Promise.resolve().then(()=>ctx.loadWorldInfo(book)));
  if(!data||typeof data.entries!=='object')throw new Error('当前绑定世界书读取失败，请稍后重试。');
  scanBook(data);
 }
 for(const card of cards)if(nativeGroup||!binding(card))scanBook(card?.data?.character_book||card?.character_book);
 for(const thread of Object.values(state.threads||{})){
  if(!thread||thread.type==='group'||String(thread.id||'').startsWith('grp_')||thread.members?.length>1)continue;
  add({name:thread.name,evidence:'contact'},'contact');
 }
 const group=nativeGroup?(Array.isArray(ctx.groups)?ctx.groups:[]).find(item=>item&&String(item.id)===String(ctx.groupId)):null;
 const memberNames=new Set(cards.map(card=>keyOf(card.name||card.data?.name)).filter(Boolean));
 const groupTitle=keyOf(group?.name);
 const cardTitles=nativeGroup?new Set(groupTitle&&!memberNames.has(groupTitle)?[groupTitle]:[]):new Set([ctx.name2,...cards.map(card=>card.name||card.data?.name)].map(keyOf).filter(Boolean));
 for(const message of(Array.isArray(ctx.chat)?ctx.chat:[]).slice(-80))if(message&&!message.is_user&&!message.is_system){
  const key=keyOf(message.name),known=found.get(key);
  if(cardTitles.has(key)&&!['declared','contact'].includes(known?.evidence))continue;
  add({name:message.name,evidence:'speaker'},'speaker');
 }
 return[...found.values()];
}
export function requiresPersonChoice(candidates,cardName){
 const declared=new Map();for(const candidate of Array.isArray(candidates)?candidates:[])if(candidate?.evidence==='declared'){
  const name=nameValue(candidate.name);if(name)declared.set(keyOf(name),{...candidate,name});
 }
 if(declared.size<2)return false;
 const card=keyOf(cardName);if(!card)return true;
 return![...declared.values()].some(person=>[person.name,...(Array.isArray(person.aliases)?person.aliases:[])].some(name=>keyOf(name)===card));
}
