// Presentation only: no message text, settings, storage, network or image sampling.
const ROOT='.rp-phone-echo-container',INK='.rp-phone-echo-name,.rp-phone-echo-moment-tag';
const NAME='--rp-echo-name',TAG='--rp-echo-tag';
export function parseEchoColor(value){
  if(typeof value!=='string')return null;const s=value.trim().toLowerCase();if(s==='transparent')return[0,0,0,0];
  const hex=s.match(/^#([\da-f]{3,4}|[\da-f]{6}|[\da-f]{8})$/);if(hex){let v=hex[1];if(v.length<5)v=[...v].map(c=>c+c).join('');return[0,2,4].map(i=>parseInt(v.slice(i,i+2),16)).concat(v.length===8?parseInt(v.slice(6),16)/255:1);}
  const match=s.match(/^rgba?\(([^)]+)\)$/);if(!match)return null;
  const parts=match[1].trim().split(/[\s,\/]+/);if(parts.length<3||parts.length>4)return null;
  const nums=parts.map((v,i)=>{if(!/^[+-]?(?:\d*\.)?\d+%?$/.test(v))return NaN;const n=parseFloat(v);return v.endsWith('%')?n*(i===3?.01:2.55):n;});
  if(nums.some(n=>!Number.isFinite(n)))return null;return nums.slice(0,3).map(n=>Math.min(255,Math.max(0,n))).concat(Math.min(1,Math.max(0,nums[3]??1)));
}
const linearEchoChannel=v=>{const n=v/255;return n<=.04045?n/12.92:((n+.055)/1.055)**2.4;};
const echoLuminance=c=>c.slice(0,3).map(linearEchoChannel).reduce((n,v,i)=>n+v*[.2126,.7152,.0722][i],0);
export function echoContrast(a,b){
  const x=echoLuminance(a),y=echoLuminance(b);return(Math.max(x,y)+.05)/(Math.min(x,y)+.05);
}
const palettes={name:[[104,76,153],[211,188,246],[8,0,16],[253,249,255]],tag:[[158,52,102],[245,182,210],[16,0,6],[255,249,252]]};
export function chooseEchoAccent(background,kind,minimum=4.6){
  const p=palettes[kind];if(!p||!background)return null;
  const contrast=color=>{if(!background.bounds)return echoContrast(color,background);const [low,high]=background.bounds,a=echoContrast(color,low),b=echoContrast(color,high);const l=echoContrast(color,[0,0,0]),lo=echoContrast(low,[0,0,0]),hi=echoContrast(high,[0,0,0]);return l>=lo&&l<=hi?1:Math.min(a,b);};
  const branches=[[p[0],p[2]],[p[1],p[3]]].sort((a,b)=>contrast(b[0])-contrast(a[0]));
  for(const[base,end]of branches)for(let i=0;i<=24;i++){const color=base.map((v,j)=>Math.round(v+(end[j]-v)*i/24));if(contrast(color)>=minimum)return'rgb('+color.join(', ')+')';}return null;
}
// When the surface cannot be resolved, preserve the surrounding text's
// luminance while tinting its hue. Never infer the host theme from phone mode.
// Opaque text keeps its contrast; translucent text keeps its source alpha.
export function tintEchoAccent(foreground,kind){
  const p=palettes[kind];if(!p||!foreground||foreground.length<3||foreground.some(n=>!Number.isFinite(n))||(foreground[3]??1)<=0)return null;
  const target=echoLuminance(foreground),base=p[1].map(linearEchoChannel),level=echoLuminance(p[1]);
  const value=base.map(v=>target<=level?v*target/level:v+(1-v)*(target-level)/(1-level));
  const rgb=value.map(v=>Math.round(255*(v<=.0031308?12.92*v:1.055*v**(1/2.4)-.055)*100)/100);
  return (foreground[3]??1)>=1?'rgb('+rgb.join(', ')+')':'rgba('+rgb.join(', ')+', '+foreground[3]+')';
}
const active=value=>value&&value!=='none'&&value!=='normal';
function pseudoPaint(style){
  if(!style||!style.content||['none','normal'].includes(style.content)||style.display==='none'||style.visibility==='hidden'||Number(style.opacity||1)===0)return false;
  return active(style.backgroundImage)||(parseEchoColor(style.backgroundColor)?.[3]||0)>0||active(style.boxShadow);
}
// Compose foreground background layers outward. Opaque local surfaces shield
// lower wallpapers; group effects or possible overlays make the result unknown.
export function resolveEchoBackground(element,readStyle,globalBackdrop=()=>false){
  const sum=[0,0,0];let alpha=0,opaqueAt=null,unknown=false;
  const uncertain=()=>{if(alpha<=0)return null;const low=sum.slice(),high=sum.map(v=>v+255*(1-alpha)),mid=low.map((v,i)=>(v+high[i])/2);mid.bounds=[low,high];return mid;};
  for(let el=element;el?.nodeType===1;el=el.parentElement){
    const style=readStyle(el);if(!style)return null;
    const opacity=Number(style.opacity||1);if(!Number.isFinite(opacity)||opacity<.999||active(style.filter)||active(style.mixBlendMode))return null;
    for(const pseudo of['::before','::after']){const ps=readStyle(el,pseudo);if(!ps)return null;if(pseudoPaint(ps)&&(!opaqueAt||!Number.isFinite(Number(ps.zIndex))||Number(ps.zIndex)>=0))return null;}
    if(alpha>=.999||unknown)continue;
    if(active(style.backgroundImage)||(['BODY','HTML'].includes(el.tagName)&&globalBackdrop())){unknown=true;continue;}
    const bg=parseEchoColor(style.backgroundColor);if(!bg)return null;
    const weight=bg[3]*(1-alpha);for(let i=0;i<3;i++)sum[i]+=bg[i]*weight;alpha+=weight;
    if(alpha<.999&&(active(style.backdropFilter)||active(style.webkitBackdropFilter)))unknown=true;
    if(alpha>=.999)opaqueAt=el;
  }
  return alpha>=.999?sum.map(v=>v/alpha):uncertain();
}
export function createEchoAccent({document:doc,window:win,runtime,enabled=()=>true,readStyle=null}){
  const roots=new Set(),pending=new Set(),writes=new WeakMap(),listeners=[];let installed=false,owner=null,observer=null,frame=null,globalDirty=false,disposed=false,updates=0;
  // CSS.supports is required for reliable pseudo-element computed styles.
  // Limited pseudo inspection uses a luminance-matched surrounding-text tint.
  const read=readStyle||((el,pseudo)=>{if(pseudo&&!win.CSS?.supports?.('color','rgb(0,0,0)'))return null;try{return win.getComputedStyle(el,pseudo);}catch{return null;}});
  function write(el,key,value){if(value){if(el.style.getPropertyValue(key)!==value)el.style.setProperty(key,value);}else if(el.style.getPropertyValue(key))el.style.removeProperty(key);writes.set(el,el.getAttribute('style')||'');}
  function clear(root){for(const el of root.querySelectorAll(INK)){write(el,NAME,null);write(el,TAG,null);}}
  function prune(){for(const root of roots)if(!root.isConnected){clear(root);roots.delete(root);pending.delete(root);}}
  function collect(scope){if(!scope||scope.nodeType!==1)return;const parent=scope.closest(ROOT);if(parent){roots.add(parent);pending.add(parent);}for(const root of scope.querySelectorAll(ROOT)){roots.add(root);pending.add(root);}}
  function backdrop(cache){for(const el of doc.querySelectorAll('#bg1,#bg2,#bg_custom')){const s=cache(el);if(s&&s.display!=='none'&&s.visibility!=='hidden'&&Number(s.opacity||1)>0&&(active(s.backgroundImage)||(parseEchoColor(s.backgroundColor)?.[3]||0)>0))return true;}return false;}
  function paint(root,cache){if(!root.isConnected)return;if(!enabled()){clear(root);return;}updates++;
    for(const el of root.querySelectorAll(INK)){
      const kind=el.classList.contains('rp-phone-echo-name')?'name':'tag',key=kind==='name'?NAME:TAG;
      const bg=resolveEchoBackground(el,cache,()=>backdrop(cache));
      // Read the unmodified surrounding text, never our own accent (which
      // would drift on every refresh). WebKit fill can differ from color.
      const host=cache(el.parentElement),fill=parseEchoColor(host?.webkitTextFillColor),ink=fill||parseEchoColor(host?.color);
      write(el,key,chooseEchoAccent(bg,kind)||tintEchoAccent(ink,kind));
    }
  }
  function cacheReader(){const cache=new WeakMap();return(el,pseudo)=>{let record=cache.get(el);if(!record){record=new Map();cache.set(el,record);}const key=pseudo||'';if(!record.has(key))record.set(key,read(el,pseudo));return record.get(key);};}
  function request(){if(!installed||disposed||frame!==null)return;frame=win.requestAnimationFrame(flush);}
  function flush(){frame=null;if(!installed||disposed)return;prune();if(globalDirty){globalDirty=false;collect(doc.getElementById('chat'));}const cache=cacheReader();let n=0;for(const root of pending){pending.delete(root);paint(root,cache);if(++n>=8)break;}if(pending.size)request();}
  function refresh(){globalDirty=true;request();}
  function update(scope){if(!installed||disposed)return;prune();collect(scope);const cache=cacheReader();for(const root of [...pending])if(root===scope||scope?.contains?.(root)||root.contains(scope)){pending.delete(root);paint(root,cache);}if(pending.size)request();}
  function mutations(list){const chat=doc.getElementById('chat');for(const m of list){const el=m.target.nodeType===1?m.target:m.target.parentElement;if(!el)continue;
      if(m.type==='attributes'&&m.attributeName==='style'&&writes.get(el)===(el.getAttribute('style')||''))continue;
      if(el.matches('#bg1,#bg2,#bg_custom')||el===doc.documentElement||el===doc.body||el.closest('head')||el.closest('style')||(el!==chat&&el.contains(chat))){globalDirty=true;continue;}
      if(el.closest('#chat')){if(m.type==='childList'){collect(el.closest(ROOT));for(const node of m.addedNodes)if(node.nodeType===1)collect(node);if(m.removedNodes.length)prune();}else collect(el);}
      if(m.type==='childList')for(const node of m.addedNodes)if(node.nodeType===1&&(node.id==='chat'||node.querySelector('#chat')))globalDirty=true;
    }if(globalDirty||pending.size)request();}
  function dispose(){if(!installed)return;installed=false;disposed=true;observer?.disconnect();observer=null;for(const off of listeners.splice(0))off?.();if(frame!==null)win.cancelAnimationFrame(frame);frame=null;for(const root of roots)clear(root);roots.clear();pending.clear();globalDirty=false;}
  function install(){const next=runtime();if(installed&&owner===next)return;if(installed)dispose();if(next.stats().destroyed)return;owner=next;disposed=false;installed=true;
    observer=new win.MutationObserver(mutations);observer.observe(doc.documentElement,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:['style','class','href','media','disabled','hidden']});next.own(dispose);
    const listen=(...args)=>listeners.push(next.listenDOM(...args));
    listen(win,'resize',refresh);listen(win,'pageshow',refresh);listen(doc,'visibilitychange',refresh);listen(doc,'mochi-phone-launch-settings',refresh);
    listen(doc,'load',event=>{if(event.target?.tagName==='LINK')refresh();},true);listen(doc,'transitionend',event=>{if(/^(?:background|color|opacity|filter)/.test(event.propertyName||''))refresh();},true);
    const media=win.matchMedia?.('(prefers-color-scheme: dark)');if(media?.addEventListener)listen(media,'change',refresh);refresh();
  }
  return{install,update,refresh,dispose,stats:()=>({installed,roots:roots.size,queued:pending.size,updates,framePending:frame!==null})};
}
