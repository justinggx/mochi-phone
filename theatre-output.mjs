// Data-only preset output filters. Never call host macro/script evaluators.
const object=x=>x&&typeof x==='object'&&!Array.isArray(x);
const visual=/<\/?[a-z][\w:-]*(?:\s|\/?>)|<!doctype|```(?:html|css|javascript)|\b(?:document|window)\s*\./i;
const isVisual=value=>visual.test(value.replace(/\$<[^>]+>/g,''));
export function theatreOutputProfile(manager,settings={},identity={}){
 const apiId=String(identity.apiId||manager?.apiId||''),name=String(identity.name||manager?.getSelectedPresetName?.()||'');
 const result={version:1,apiId,name,user:String(identity.user||''),char:String(identity.char||''),scripts:[],skipped:0};
 if(settings.disabledExtensions?.includes('regex')||!apiId||!name||!settings.preset_allowed_regex?.[apiId]?.includes(name))return result;
 const scripts=manager?.readPresetExtensionField?.({name,path:'regex_scripts'});
 if(!Array.isArray(scripts))return result;
 for(const script of scripts){
  if(!object(script)||script.disabled||!Array.isArray(script.placement)||!script.placement.includes(2))continue;
  if(script.promptOnly&&!script.markdownOnly)continue;
  if(Number(script.minDepth)>0)continue; // A standalone newest output has host depth 0.
  const find=script.findRegex,replace=script.replaceString??'';
  if(typeof find!=='string'||typeof replace!=='string'||!find||isVisual(replace)){result.skipped++;continue;}
  result.scripts.push({find,replace,trim:Array.isArray(script.trimStrings)?script.trimStrings.filter(x=>typeof x==='string'):[],substitute:Number(script.substituteRegex)||0,display:!!script.markdownOnly});
 }
 return result;
}
function macro(text,profile,escape=false){
 const values={user:profile.user,char:profile.char,newline:'\n',space:' ',noop:'',trim:''};
 return String(text).replace(/{{\s*(user|char|newline|space|noop|trim)\s*}}/gi,(_,name)=>{const value=String(values[name.toLowerCase()]||'');return escape?value.replace(/[\n\r\t\v\f\0.^$*+?{}[\]\\/|()]/g,c=>({'\n':'\\n','\r':'\\r','\t':'\\t','\v':'\\v','\f':'\\f','\0':'\\0'}[c]||'\\'+c)):value;});
}
// Same parsing/flag behavior as this host's regexFromString.
export function theatreRegexFromString(input){try{const m=input.match(/(\/?)(.+)\1([a-z]*)/i);if(m[3]&&!/^(?!.*?(.).*?\1)[gmixXsuUAJ]+$/.test(m[3]))return RegExp(input);return new RegExp(m[2],m[3]);}catch{return null;}}
export function theatrePlainOutput(raw){
 const text=String(raw||''),tags=/<(\/?)(think(?:ing)?|analysis|reasoning)\b[^>]*>/gi,stack=[];let out='',cursor=0,match;
 while((match=tags.exec(text))){if(!stack.length)out+=text.slice(cursor,match.index);const tag=match[2].toLowerCase();if(!match[1]){if(!match[0].endsWith('/>'))stack.push(tag);}else{const index=stack.lastIndexOf(tag);if(index>=0)stack.length=index;}cursor=tags.lastIndex;}
 if(!stack.length)out+=text.slice(cursor);return out.trim();
}
export function applyTheatreOutput(raw,profile={}){
 let text=theatrePlainOutput(raw),skipped=0,applied=0;const base=text;
 if(!text&&String(raw||'').trim())return{text:'',skipped,applied,warning:'reasoningOnly'};
 if(!Array.isArray(profile.scripts))return{text,skipped:0,applied:0};
 for(const display of[false,true])for(const script of profile.scripts){
  if(!object(script)||!!script.display!==display||typeof script.find!=='string'||typeof script.replace!=='string'||isVisual(script.replace))continue;
  const find=script.substitute?macro(script.find,profile,script.substitute===2):script.find;
  if(script.substitute&&/{{|<%/.test(find)){skipped++;continue;}
  const regex=theatreRegexFromString(find);if(!regex){skipped++;continue;}
  const trim=Array.isArray(script.trim)?script.trim:[];
  text=text.replace(regex,(...args)=>{
   const template=script.replace.replace(/{{match}}/gi,'$0').replace(/\$(\d+)|\$<([^>]+)>/g,(_,number,name)=>{
    const groups=args.at(-1),value=number?args[Number(number)]:object(groups)?groups[name]:'';
    if(typeof value!=='string')return '';
    return trim.reduce((s,t)=>typeof t==='string'?s.replaceAll(macro(t,profile),''):s,value);
   });
   return macro(template,profile);
  });applied++;
 }
 // A cleanup rule must never turn a paid response into a lost/blank work.
 if(!text.trim()&&base)return{text:base,skipped,applied,warning:'empty'};
 return{text:text.trim(),skipped,applied};
}
export function createTheatreOutputProcessor({worker,setTimer=globalThis.setTimeout,clearTimer=globalThis.clearTimeout,timeout=3000}={}){
 const pending=new Set(),cache=new Map();
 function process(text,profile,signal){
  if(signal?.aborted)return Promise.reject(Object.assign(new Error('Cancelled'),{name:'AbortError'}));
  const fallback=applyTheatreOutput(text);
  if(!profile?.scripts?.length||fallback.warning==='reasoningOnly')return fallback;
  const key=JSON.stringify([text,profile]);if(cache.has(key))return cache.get(key);
  return new Promise((resolve,reject)=>{
   let w,timer,done=false;
   const record={cancel:()=>finish(null,Object.assign(new Error('Cancelled'),{name:'AbortError'}))};
   const finish=(result,error)=>{if(done)return;done=true;clearTimer(timer);signal?.removeEventListener('abort',record.cancel);pending.delete(record);w?.terminate();if(error){if(error.name!=='AbortError')error.outputFallback=fallback;reject(error);return;}cache.set(key,result);while(cache.size>4)cache.delete(cache.keys().next().value);resolve(result);};
   pending.add(record);signal?.addEventListener('abort',record.cancel,{once:true});
   try{w=worker();timer=setTimer(()=>finish(null,new Error('regexTimeout')),timeout);w.onmessage=e=>{const result=e.data;if(typeof result?.text!=='string')finish(null,new Error('regexResult'));else finish(result);};w.onerror=()=>finish(null,new Error('regexWorker'));w.postMessage({text,profile});}catch{finish(null,new Error('regexWorker'));}
  });
 }
 return{process,reset(){for(const record of[...pending])record.cancel();cache.clear();}};
}
