// Read only the active in-memory writing preset. Never run host variable/script macros.
const object=x=>x&&typeof x==='object'&&!Array.isArray(x);
const on=x=>x===true||x===1||x==='true';
const roles=new Set(['system','user','assistant']);
const fail=(code='preset')=>Object.assign(new Error(code==='contextLimit'?'本次预设与创作资料超过可用上下文，请精简预设或提高模型上下文。':'当前酒馆预设读取失败，请刷新酒馆后重试。'),{phoneApiCode:code});
const text=x=>typeof x==='string'?x:x==null?'':typeof x==='number'||typeof x==='boolean'?String(x):object(x)||Array.isArray(x)?JSON.stringify(x):'';
function truth(value){return !['','0','false','no','off','null','undefined'].includes(String(value).trim().toLowerCase());}
function condition(raw){
 const match=String(raw).match(/^\s*(.*?)\s*(===|!==|==|!=|>=|<=|>|<)\s*(.*?)\s*$/);
 if(!match)return raw.trim().startsWith('!')?!truth(raw.trim().slice(1)):truth(raw);
 const clean=v=>v.replace(/^(['"])([\s\S]*)\1$/,'$2'),a=clean(match[1]),b=clean(match[3]),numeric=a!==''&&b!==''&&Number.isFinite(Number(a))&&Number.isFinite(Number(b)),x=numeric?Number(a):a,y=numeric?Number(b):b;
 return({'==':()=>x===y,'===':()=>x===y,'!=':()=>x!==y,'!==':()=>x!==y,'>':()=>x>y,'<':()=>x<y,'>=':()=>x>=y,'<=':()=>x<=y})[match[2]]();
}
function tokenize(raw){
 const out=[];let pos=0;
 while(pos<raw.length){
  const open=raw.indexOf('{{',pos);if(open<0){out.push({plain:raw.slice(pos)});break;}
  if(open>pos)out.push({plain:raw.slice(pos,open)});
  let level=1,end=open+2;
  while(level&&end<raw.length){if(raw.startsWith('{{',end)){level++;end+=2;}else if(raw.startsWith('}}',end)){level--;if(level)end+=2;}else end++;}
  if(level){out.push({broken:raw.slice(open)});break;}
  out.push({body:raw.slice(open+2,end),raw:raw.slice(open,end+2)});pos=end+2;
 }
 return out;
}
function argsOf(body){
 const out=[];let start=0,depth=0;
 for(let i=0;i<body.length;i++){if(body.startsWith('{{',i)){depth++;i++;}else if(body.startsWith('}}',i)){depth--;i++;}else if(!depth&&body.startsWith('::',i)){out.push(body.slice(start,i));start=i+2;i++;}}
 out.push(body.slice(start));return out;
}
// Only data-valued macros may be excerpted; preset instructions stay intact.
export function theatreDataExcerpt(raw,budget,query='',tail=false){
 const value=String(raw||''),size=s=>new TextEncoder().encode(s).length;
 if(!Number.isFinite(budget)||size(value)<=budget)return value;
 const marker='\n[背景节选；未展示部分已省略]\n',room=Math.max(0,Math.floor(budget)-size(marker));
 if(!room)return '';
 const terms=[...new Set((String(query).toLowerCase().match(/[a-z0-9_]{3,}|[\u3400-\u9fff]{2}/g)||[]))].slice(0,160);
 const chunks=[];let pos=0;
 for(const paragraph of value.split(/(?<=[。！？.!?\n])\s*/u)){
  const points=Array.from(paragraph);for(let i=0;i<points.length;i+=180){const text=points.slice(i,i+180).join('');chunks.push({text,index:pos++,score:terms.reduce((n,w)=>n+(text.toLowerCase().includes(w)?1:0),0)});}
 }
 const keep=[],pick=(v,limit)=>{if(!v||keep.includes(v))return;const remaining=Math.min(limit,room-keep.reduce((n,x)=>n+size(x.text+'\n'),0));if(size(v.text+'\n')<=remaining)keep.push(v);};
 pick(chunks[0],Math.floor(room*.3));pick(chunks.at(-1),Math.floor(room*.3));
 const ranked=chunks.slice().sort((a,b)=>tail?b.index-a.index:b.score-a.score||a.index-b.index);
 for(const v of ranked)pick(v,room);
 if(!keep.length){const points=Array.from(value);let text='',used=0;for(const c of tail?points.reverse():points){const n=size(c);if(used+n>room)break;text+=c;used+=n;}return marker+(tail?Array.from(text).reverse().join(''):text);}
 return marker+keep.sort((a,b)=>a.index-b.index).map(x=>x.text).join('\n');
}
function compiler(ctx,{au=false,random=Math.random,dataBudget=Infinity,query=''}={}){
 const local=new Map(Object.entries(object(ctx.chatMetadata?.variables)?ctx.chatMetadata.variables:{})),global=new Map(Object.entries(object(ctx.extensionSettings?.variables?.global)?ctx.extensionSettings.variables.global:{}));
 const char=ctx.characters?.[ctx.characterId]||ctx.char||{},field=k=>text(char[k]??char.data?.[k]),chat=au?[]:(ctx.chat||[]).filter(m=>m&&!m.is_system).slice(-12);
 const user=text(ctx.name1)||'用户',name=text(ctx.name2)||text(char.name)||'角色',unknown={count:0};let steps=0;
 const inert=raw=>{unknown.count++;return raw.replaceAll('{{','｛｛').replaceAll('}}','｝｝').replaceAll('<%','‹%').replaceAll('%>','%›');};
 const pure={user,char:name,persona:text(ctx.powerUserSettings?.persona_description),description:field('description'),personality:field('personality'),scenario:field('scenario'),mesexamples:field('mes_example'),mesexamplesraw:field('mes_example'),charprompt:field('system_prompt'),charinstruction:field('post_history_instructions'),lastmessage:text(chat.at(-1)?.mes),lastusermessage:text(chat.filter(m=>m.is_user).at(-1)?.mes),lastcharmessage:text(chat.filter(m=>!m.is_user).at(-1)?.mes),history:chat.map(m=>(m.is_user?user:text(m.name)||name)+'：'+text(m.mes)).join('\n'),newline:'\n',space:' ',noop:'',trim:'',original:''};
 function expand(raw,depth=0){
  raw=String(raw||'');if(depth>32||raw.length>500000||++steps>50000)throw fail('contextLimit');
  const tokens=tokenize(raw);let index=0;
  function render(active=true,nested=false){
   let result='';
   while(index<tokens.length){
    const token=tokens[index++];if(token.plain!==undefined){if(active)result+=token.plain;continue;}
    if(token.broken){if(active)result+=inert(token.broken);continue;}
    const body=token.body.trim(),parts=argsOf(body),head=parts[0].trim(),nameLower=head.toLowerCase();
    if(/^(?:else|\/if)$/i.test(head)){if(nested)return{result,stop:nameLower};if(active)result+=inert(token.raw);continue;}
    if(/^(?:#?if)(?:::|\s)/i.test(body)||/^(?:#?if)$/i.test(head)){
     const argument=parts.length>1?parts[1]:head.replace(/^#?if\s*/i,'');
     if(parts.length>2){if(active)result+=expand(condition(expand(argument,depth+1))?parts[2]:parts[3]||'',depth+1);continue;}
     const yes=active&&condition(expand(argument,depth+1)),first=render(yes,true);let second={result:'',stop:first.stop};
     if(first.stop==='else')second=render(active&&!yes,true);
     if(active)result+=first.result+second.result;
     if(second.stop!=='/if'){if(active)result+=inert(token.raw);break;}continue;
    }
    if(!active)continue;
    if(/^(?:\/\/|!--)/.test(body))continue;
    const op=nameLower,scope=op.includes('global')?global:local;
    if(/^(?:set|get|add|inc|dec|delete|unset)(?:global)?var$/.test(op)){
     const key=expand(parts[1]||'',depth+1),old=text(scope.get(key));
     if(op.startsWith('get')){result+=expand(old,depth+1);continue;}
     if(op.startsWith('delete')||op.startsWith('unset')){scope.delete(key);continue;}
     let value=parts.slice(2).join('::');value=expand(value,depth+1);
     if(op.startsWith('inc')||op.startsWith('dec')){const next=(Number(old)||0)+(op.startsWith('inc')?1:-1);scope.set(key,String(next));result+=String(next);continue;}
     if(op.startsWith('add'))value=Number.isFinite(Number(old))&&Number.isFinite(Number(value))?String(Number(old)+Number(value)):old+value;
     scope.set(key,value);continue;
    }
    if(op==='random'||op==='pick'){const choices=(parts.length>2?parts.slice(1):String(parts[1]||'').split(',')).filter(x=>x.trim());if(choices.length)result+=expand(choices[Math.min(choices.length-1,Math.floor(random()*choices.length))],depth+1);continue;}
    if(op==='date'||op==='time'||op==='weekday'){const now=new Date();result+=op==='date'?now.toLocaleDateString('zh-CN'):op==='time'?now.toLocaleTimeString('zh-CN',{hour:'2-digit',minute:'2-digit'}):now.toLocaleDateString('zh-CN',{weekday:'long'});continue;}
    if(Object.hasOwn(pure,op)&&parts.length===1){const value=text(pure[op]);result+=['persona','description','personality','scenario','mesexamples','mesexamplesraw','lastmessage','lastusermessage','lastcharmessage','history'].includes(op)?theatreDataExcerpt(value,dataBudget,query,op==='history'||op.startsWith('last')):value;continue;}
    result+=inert(token.raw);
   }
   return{result,stop:null};
  }
  const value=render().result;if(value.length>500000)throw fail('contextLimit');return value;
 }
 return{expand:raw=>{let s=expand(raw);if(s.includes('{{')||s.includes('}}')||s.includes('<%')||s.includes('%>'))s=inert(s);return s;},unknown};
}
function samplingOf(settings,chat=true){
 const out={},map=chat?{temperature:'temp_openai',top_p:'top_p_openai',frequency_penalty:'freq_pen_openai',presence_penalty:'pres_pen_openai'}:{temperature:'temperature',top_p:'top_p',frequency_penalty:'frequency_penalty',presence_penalty:'presence_penalty'};
 for(const[k,key]of Object.entries(map)){const v=settings?.[key];if(typeof v!=='number'||!Number.isFinite(v))continue;if(k==='temperature'?v>=0&&v<=2:k==='top_p'?v>0&&v<=1:v>=-2&&v<=2)out[k]=v;}return out;
}
export function readTheatrePreset(ctx,{manager=null,au=false,random=Math.random,dataBudget=Infinity,query=''}={}){
 let prompts=[],name='',sampling={},source='';const api=String(ctx.mainApi||'openai');
 if(api==='openai'){
  const settings=ctx.chatCompletionSettings||manager?.serviceSettings;if(!object(settings)||!Array.isArray(settings.prompts)||!Array.isArray(settings.prompt_order))throw fail();
  name=text(settings.preset_settings_openai)||'当前聊天补全预设';source='chat-completion';sampling=samplingOf(settings);
  let order;if(manager?.serviceSettings===settings&&manager.activeCharacter&&typeof manager.getPromptOrderForCharacter==='function')order=manager.getPromptOrderForCharacter(manager.activeCharacter);
  else{const orders=settings.prompt_order;order=(orders.find(x=>String(x.character_id)==='100001')||orders.find(x=>ctx.characterId!=null&&String(x.character_id)===String(ctx.characterId))||(orders.length===1?orders[0]:null))?.order;}
  if(!Array.isArray(order)){if(settings.prompts.length)throw fail();order=[];}
  for(const entry of order){if(!on(entry?.enabled))continue;const p=settings.prompts.find(x=>x?.identifier===entry.identifier);if(!p||on(p.marker)||!text(p.content).trim())continue;
   if(Array.isArray(p.injection_trigger)&&p.injection_trigger.length&&!p.injection_trigger.includes('normal'))continue;
   prompts.push({role:roles.has(p.role)?p.role:'system',content:text(p.content)});
  }
 }else{
  const settings=ctx.powerUserSettings?.sysprompt;if(!object(settings))throw fail();source='text-completion';name=text(settings.name||settings.preset)||'当前文本补全系统预设';sampling=samplingOf(ctx.textCompletionSettings,false);
  if(on(settings.enabled)){if(text(settings.content).trim())prompts.push({role:'system',content:text(settings.content)});if(text(settings.post_history).trim())prompts.push({role:'system',content:text(settings.post_history)});}
 }
 const compile=compiler(ctx,{au,random,dataBudget,query}),messages=prompts.map(p=>({role:p.role,content:compile.expand(p.content)})).filter(p=>p.content.trim());
 const result={name,source,messages,sampling,unresolvedMacros:compile.unknown.count};validateTheatrePreset(result);return result;
}
export function validateTheatrePreset(preset){
 if(!object(preset)||typeof preset.name!=='string'||typeof preset.source!=='string'||!Array.isArray(preset.messages)||preset.messages.some(p=>!object(p)||!roles.has(p.role)||typeof p.content!=='string')||preset.sampling!==undefined&&(!object(preset.sampling)||Object.entries(preset.sampling).some(([k,v])=>!['temperature','top_p','frequency_penalty','presence_penalty'].includes(k)||typeof v!=='number'||!Number.isFinite(v)||(k==='temperature'?v<0||v>2:k==='top_p'?v<=0||v>1:v<-2||v>2)))||!Number.isSafeInteger(preset.unresolvedMacros)||preset.unresolvedMacros<0)throw fail();
}
export function theatrePresetSnapshot(preset){
 validateTheatrePreset(preset);return{name:preset.name,source:preset.source,messages:preset.messages.map(p=>({role:p.role,content:p.content.replaceAll('{{','｛｛').replaceAll('}}','｝｝').replaceAll('<%','‹%').replaceAll('%>','%›')})),sampling:samplingOf({temp_openai:preset.sampling?.temperature,top_p_openai:preset.sampling?.top_p,freq_pen_openai:preset.sampling?.frequency_penalty,pres_pen_openai:preset.sampling?.presence_penalty}),unresolvedMacros:preset.unresolvedMacros};
}
export function theatreRequestMessages(prompt,system,preset){
 const literal=value=>String(value||'').replaceAll('{{','｛｛').replaceAll('}}','｝｝').replaceAll('<%','‹%').replaceAll('%>','%›');
 const messages=preset?theatrePresetSnapshot(preset).messages:[];if(system)messages.push({role:'system',content:literal(system)});messages.push({role:'user',content:literal(prompt)});return messages;
}
