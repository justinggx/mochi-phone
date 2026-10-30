import { avatarCropView, squareAvatar } from './avatar-studio.mjs?v=20261028-refine-160';

const imageSource = src => typeof src === 'string' && src.length <= 1000000 && /^(?:data:image\/(?:png|jpe?g|webp|gif);base64,|https?:\/\/|\/(?!\/))/i.test(src);
export function normalizeGroupAvatar(value) {
  if (!value || typeof value !== 'object' || value.version !== 1) return null;
  if (value.mode === 'auto') return {version:1,mode:'auto'};
  if (value.mode === 'image' && imageSource(value.src)) return {version:1,mode:'image',src:value.src};
  if (value.mode === 'symbol' && typeof value.symbol === 'string' && value.symbol.trim() && value.symbol.length <= 16 && !/[\x00-\x1f\x7f]/.test(value.symbol) && /^#[\da-f]{6}$/i.test(value.color)) return {version:1,mode:'symbol',symbol:value.symbol.trim(),color:value.color};
  return null;
}
const person = '<svg viewBox="0 0 32 32" aria-hidden="true"><circle cx="16" cy="11" r="5"/><path d="M6 28v-3a10 10 0 0 1 20 0v3Z"/></svg>';
const people = '<svg viewBox="0 0 32 32" aria-hidden="true"><circle cx="12" cy="11" r="4.5"/><circle cx="23" cy="12" r="3.5"/><path d="M3 27v-2a9 9 0 0 1 18 0v2Zm20-1v-1a12 12 0 0 0-3-8 7.5 7.5 0 0 1 9 7v2Z"/></svg>';
const palette = ['#eadce3','#dce7e5','#e4e0ee','#e8e2d7','#dce4ef','#eeded7'];
const symbols = ['🌷','☕','🌙','🍀','🐾','🎮','📚','🎵'];
export const GROUP_AVATAR_CSS = `
#rp-phone .rp-group-face{display:grid!important;position:relative;isolation:isolate;overflow:hidden;padding:3px!important;gap:2px;border-radius:28%;background:var(--rp-v-border,#e7dfe5)!important;box-sizing:border-box;flex-shrink:0;color:#685c70;}
#rp-phone .rp-group-face[data-rp-group-layout="2"]{grid-template-columns:1fr 1fr;}
#rp-phone .rp-group-face[data-rp-group-layout="3"],#rp-phone .rp-group-face[data-rp-group-layout="4"]{grid-template-columns:1fr 1fr;grid-template-rows:1fr 1fr;}
#rp-phone .rp-group-face[data-rp-group-layout="3"]>:first-child{grid-row:span 2;}
#rp-phone .rp-group-tile,#rp-phone .rp-group-person{position:relative;display:flex;align-items:center;justify-content:center;min-width:0;min-height:0;overflow:hidden;border-radius:18%;background:#eadce3;color:#756778;}
#rp-phone.rp-art-icons #rp-screen :is(.rp-grp-av,.rp-gm-av).rp-group-person{background:#eadce3!important;color:#756778!important;}
#rp-phone .rp-group-tile img,#rp-phone .rp-group-person img{position:absolute;inset:0;width:100%;height:100%;max-width:none;object-fit:cover;border-radius:inherit;}
#rp-phone .rp-group-tile svg,#rp-phone .rp-group-person svg{display:block;width:70%;height:70%;fill:currentColor;flex-shrink:0;}
#rp-phone .rp-group-tile img+svg,#rp-phone .rp-group-person img+svg{display:none;}
#rp-phone .rp-group-face[data-rp-group-mode="symbol"],#rp-phone .rp-group-face[data-rp-group-mode="image"]{padding:0!important;}
#rp-phone .rp-group-face[data-rp-group-mode="symbol"] .rp-group-tile{font-size:1.45em;border-radius:inherit;}
#rp-phone .rp-gm-cover{width:58px;height:58px;font-size:27px;}
#rp-phone .rp-gm-identity{display:flex;align-items:center;gap:12px;min-width:0;}
#rp-phone .rp-gm-identity .rp-gm-title{min-width:0;overflow-wrap:anywhere;}
#rp-phone .rp-gm-change{margin:5px 0 0;padding:4px 0!important;min-height:28px;border:0;background:transparent;color:var(--rp-v-accent,#91647a);font-size:12px;cursor:pointer;}
#rp-phone .rp-group-editor{display:flex;flex-direction:column;gap:12px;color:var(--rp-v-text,#44333c);}
#rp-phone .rp-group-editor button{cursor:pointer;}
#rp-phone .rp-group-editor .rp-ga-modes,#rp-phone .rp-ga-swatches,#rp-phone .rp-ga-symbols,#rp-phone .rp-ga-transform{display:flex;flex-wrap:wrap;gap:6px;}
#rp-phone .rp-ga-modes button{flex:1;min-height:36px;padding:7px 5px;border-radius:12px;border:1px solid var(--rp-v-border,#e1d5de);background:transparent;color:inherit;font-size:12px;}
#rp-phone .rp-group-editor [aria-pressed="true"]{outline:2px solid var(--rp-v-accent,#91647a);outline-offset:1px;}
#rp-phone .rp-ga-preview{position:relative;align-self:center;width:168px;height:168px;overflow:hidden;flex-shrink:0;border-radius:30px;background:#eadce3;}
#rp-phone .rp-ga-preview>.rp-group-face{width:100%;height:100%;font-size:64px;}
#rp-phone .rp-ga-preview>.rp-ga-crop-photo{position:absolute;left:0;top:0;max-width:none!important;max-height:none!important;transform-origin:0 0;}
#rp-phone .rp-group-editor [hidden]{display:none!important;}
#rp-phone .rp-ga-symbols button{width:36px;height:36px;border:0;border-radius:10px;background:var(--rp-v-card,#f5eff3);font-size:21px;}
#rp-phone .rp-ga-swatches button{width:30px;height:30px;border:2px solid #fff8;border-radius:50%;}
#rp-phone .rp-ga-field{display:grid;grid-template-columns:45px 1fr 34px;align-items:center;gap:8px;margin:8px 0;font-size:12px;}
#rp-phone .rp-ga-field input{min-width:0;width:100%;accent-color:var(--rp-v-accent,#91647a);}
#rp-phone .rp-ga-symbol-input{width:100%;box-sizing:border-box;border-radius:10px;padding:9px;border:1px solid var(--rp-v-border,#e1d5de);background:var(--rp-v-card,#fff);color:inherit;}
#rp-phone .rp-ga-note{font-size:12px;line-height:1.6;margin:0;color:var(--rp-v-muted,#80717b);}
#rp-phone .rp-ga-transform button,#rp-phone .rp-ga-upload{min-height:34px;border:1px solid var(--rp-v-border,#e1d5de);border-radius:10px;padding:6px 10px;background:transparent;color:inherit;}
#rp-phone.rp-dark .rp-group-editor{color:var(--rp-v-text,#ece3e9);}
`;

export function createGroupAvatars(api) {
  const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const group = th => !!th && (th.type === 'group' || String(th.id || '').startsWith('grp_'));
  const nameKey = name => api.normalizeName(String(name || '').trim());
  const doc = () => api.document;
  let cancelEditor = null;
  function members(thread) {
    if (!group(thread)) return [];
    const entries=[],seen=new Set(),all=Object.values(api.state().threads || {}).filter(th=>th&&!group(th));
    function add(key,name,role='成员') {
      const identity=key==='user'?'user':nameKey(name);
      if (!identity || seen.has(identity)) return;
      seen.add(identity);entries.push({id:key,name,role,key:key==='user'?'user':name});
    }
    add('user','我','我');
    for (const id of Array.isArray(thread.members)?thread.members:[]) {
      if(id==='user'){add('user','我','我');continue;}
      if(typeof id!=='string')continue;
      const threads=api.state().threads||{},th=(Object.hasOwn(threads,id)?threads[id]:null) || all.find(t=>nameKey(t.name)===nameKey(id));
      if(th&&!group(th))add(th.id,th.name);
    }
    for (const msg of Array.isArray(thread.messages)?thread.messages:[]) {
      if(!msg?.name||msg.from==='user')continue;
      const th=all.find(t=>nameKey(t.name)===nameKey(msg.name));
      add(th?.id||'name:'+nameKey(msg.name),th?.name||msg.name);
    }
    return entries;
  }
  function memberHtml(key,label,className='rp-grp-av',attrs='',source=api.getAvatar(key)) {
    return '<div class="'+className+' rp-group-person"'+attrs+'>'+(source?'<img class="rp-av-photo" data-rp-group-photo src="'+esc(source)+'" alt="">':'')+person+'</div>';
  }
  function legacyImage(thread) {
    // Old group images used the group name; never borrow a same-name contact.
    if(Object.values(api.state().threads||{}).some(th=>th&&!group(th)&&nameKey(th.name)===nameKey(thread.name)))return null;
    const src=api.state().avatars?.[thread.name];return api.validImage(src,Infinity)?src:null;
  }
  function face(thread,override) {
    const record=normalizeGroupAvatar(override===undefined?thread?.groupAvatar:override);
    if(record?.mode==='symbol')return {layout:1,mode:'symbol',body:'<span class="rp-group-tile" style="background:'+record.color+'">'+esc(record.symbol)+'</span>'};
    const src=record?.mode==='image'?record.src:!record?legacyImage(thread):null;
    if(src)return {layout:1,mode:'image',body:'<span class="rp-group-tile"><img class="rp-av-photo" data-rp-group-photo src="'+esc(src)+'" alt="">'+people+'</span>'};
    const list=members(thread).slice(0,4).map(m=>({...m,src:api.getAvatar(m.key)}));
    if(!list.some(m=>m.src))return {layout:1,mode:'auto',body:'<span class="rp-group-tile">'+people+'</span>'};
    return {layout:list.length,mode:'auto',body:list.map((m,i)=>'<span class="rp-group-tile" style="background:'+palette[i%palette.length]+'">'+(m.src?'<img class="rp-av-photo" data-rp-group-photo src="'+esc(m.src)+'" alt="">':'')+person+'</span>').join('')};
  }
  function html(thread,className='rp-av',override) {
    const f=face(thread,override);return '<div class="'+className+' rp-group-face" data-rp-group-avatar="'+esc(thread.id)+'" data-rp-group-layout="'+f.layout+'" data-rp-group-mode="'+f.mode+'">'+f.body+'</div>';
  }
  function paint(node,thread) {
    const f=face(thread);node.classList.add('rp-group-face');node.dataset.rpGroupAvatar=thread.id;node.dataset.rpGroupLayout=f.layout;node.dataset.rpGroupMode=f.mode;node.style.removeProperty('background');node.innerHTML=f.body;
  }
  function clear(node) {node.classList.remove('rp-group-face');for(const k of ['rpGroupAvatar','rpGroupLayout','rpGroupMode'])delete node.dataset[k];}
  function refresh() {for(const node of doc().querySelectorAll('#rp-phone [data-rp-group-avatar]')){if(node.closest('.rp-group-editor'))continue;const th=api.state().threads?.[node.dataset.rpGroupAvatar];if(group(th))paint(node,th);}}
  function install() {
    if(doc().getElementById('rp-group-avatar-css'))return;
    const style=doc().createElement('style');style.id='rp-group-avatar-css';style.textContent=GROUP_AVATAR_CSS;doc().head.append(style);
    api.runtime().listenDOM(doc().getElementById('rp-phone'),'error',event=>{const img=event.target;if(!img?.matches?.('[data-rp-group-photo],.rp-group-person img'))return;const parent=img.parentElement;img.remove();if(!parent.querySelector('svg'))parent.insertAdjacentHTML('beforeend',parent.classList.contains('rp-group-person')?person:people);},true);
    api.runtime().own(()=>{cancelEditor?.();style.remove();});
  }
  function open(threadId) {
    const thread=api.state().threads?.[threadId];if(!group(thread))return;
    cancelEditor?.();const task=api.runtime().task(),slot=api.state().chatId,account=api.account(),original=thread.groupAvatar,controller=new (doc().defaultView.AbortController)();
    const root=doc().createElement('div');root.className='rp-group-editor';
    let draft=normalizeGroupAvatar(original)||{version:1,mode:'auto'},source=draft.mode==='image'?draft.src:null,dimensions=null,busy=false,sequence=0;
    let crop={zoom:1,x:.5,y:.5,rotation:0,mirror:false},cancelLoad=()=>{},observer=null;
    root.innerHTML='<div class="rp-ga-modes" role="group" aria-label="群头像样式"><button type="button" data-mode="auto">成员拼图</button><button type="button" data-mode="image">上传图片</button><button type="button" data-mode="symbol">符号头像</button></div><div class="rp-ga-preview"></div><div data-pane="auto"><p class="rp-ga-note">自动组合成员头像，随个人头像更新。</p></div><div data-pane="image" hidden><button type="button" class="rp-ga-upload">选择图片</button><input class="rp-ga-file" type="file" accept="image/*" hidden><div class="rp-ga-crop-controls" hidden>'+[['zoom','缩放',100,400,100],['x','左右',0,100,50],['y','上下',0,100,50]].map(([key,label,min,max,value])=>'<label class="rp-ga-field">'+label+'<input type="range" data-crop="'+key+'" min="'+min+'" max="'+max+'" value="'+value+'"><output>'+value+(key==='zoom'?'%':'')+'</output></label>').join('')+'<div class="rp-ga-transform"><button type="button" data-turn="-1">↶ 1°</button><button type="button" data-turn="1">↷ 1°</button><button type="button" data-mirror aria-pressed="false">镜像</button><button type="button" data-reset>重置</button></div></div></div><div data-pane="symbol" hidden><div class="rp-ga-symbols">'+symbols.map(s=>'<button type="button" data-symbol="'+s+'" aria-label="使用'+s+'">'+s+'</button>').join('')+'</div><label class="rp-ga-note">表情或符号<input class="rp-ga-symbol-input" maxlength="16" aria-label="群头像表情或符号"></label><div class="rp-ga-swatches" role="group" aria-label="头像底色">'+palette.map((c,i)=>'<button type="button" data-color="'+c+'" style="background:'+c+'" aria-label="底色'+(i+1)+'"></button>').join('')+'</div></div><p class="rp-ga-note rp-ga-status" role="status" aria-live="polite"></p>';
    const q=s=>root.querySelector(s),status=text=>{q('.rp-ga-status').textContent=text;};
    const valid=()=>task.valid()&&!controller.signal.aborted&&root.isConnected&&!root.closest('[data-rp-surface-closing]')&&api.account()===account&&api.state().chatId===slot&&api.currentSlot()===slot&&api.state().threads?.[threadId]===thread&&thread.groupAvatar===original;
    const cancel=()=>{cancelLoad();observer?.disconnect();controller.abort();task.signal.removeEventListener('abort',cancel);if(cancelEditor===cancel)cancelEditor=null;};cancelEditor=cancel;task.signal.addEventListener('abort',cancel,{once:true});
    const update=()=>{
      const preview=q('.rp-ga-preview');root.querySelectorAll('[data-mode]').forEach(b=>{b.setAttribute('aria-pressed',String(b.dataset.mode===draft.mode));b.disabled=busy;});root.querySelectorAll('[data-pane]').forEach(p=>p.hidden=p.dataset.pane!==draft.mode);
      root.querySelectorAll('[data-color]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.color===draft.color)));root.querySelectorAll('[data-symbol]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.symbol===draft.symbol)));const symbolValue=draft.symbol??'🌷';if(q('.rp-ga-symbol-input').value!==symbolValue)q('.rp-ga-symbol-input').value=symbolValue;q('.rp-ga-crop-controls').hidden=!dimensions;
      if(draft.mode==='image'&&source&&dimensions){const v=avatarCropView(dimensions.w,dimensions.h,crop),scale=(preview.clientWidth||168)/v.size;preview.innerHTML='<img class="rp-ga-crop-photo" alt="群头像裁切预览">';const img=preview.firstChild;img.src=source;img.style.width=dimensions.w*scale+'px';img.style.height=dimensions.h*scale+'px';const[a,b,c,d,e,f]=v.matrix;img.style.transform='matrix('+[a,b,c,d,(e-v.x)*scale,(f-v.y)*scale].join(',')+')';}
      else preview.innerHTML=html(thread,'',draft.mode==='image'&&source?{version:1,mode:'image',src:source}:draft.mode==='image'?{version:1,mode:'auto'}:draft);
      root.querySelectorAll('[data-crop]').forEach(input=>{input.value=Math.round(crop[input.dataset.crop]*100);input.nextElementSibling.textContent=input.value+(input.dataset.crop==='zoom'?'%':'');});q('[data-mirror]').setAttribute('aria-pressed',String(crop.mirror));
    };
    root.addEventListener('click',event=>{
      const button=event.target.closest('button');if(!button||busy||!valid())return;
      if(button.dataset.mode){cancelLoad();sequence++;draft=button.dataset.mode==='symbol'?{version:1,mode:'symbol',symbol:draft.symbol||'🌷',color:draft.color||palette[0]}:{version:1,mode:button.dataset.mode};status('');}
      if(button.dataset.symbol)draft.symbol=button.dataset.symbol;
      if(button.dataset.color)draft.color=button.dataset.color;
      if(button.classList.contains('rp-ga-upload'))q('.rp-ga-file').click();
      if(button.dataset.turn)crop.rotation+=Number(button.dataset.turn);
      if(button.hasAttribute('data-mirror'))crop.mirror=!crop.mirror;
      if(button.hasAttribute('data-reset'))crop={zoom:1,x:.5,y:.5,rotation:0,mirror:false};update();
    });
    root.addEventListener('input',event=>{if(busy||!valid())return;const el=event.target;if(el.dataset.crop)crop[el.dataset.crop]=Number(el.value)/100;if(el.classList.contains('rp-ga-symbol-input'))draft.symbol=el.value;update();});
    q('.rp-ga-file').onchange=()=>{
      const file=q('.rp-ga-file').files?.[0];q('.rp-ga-file').value='';if(!file||!valid())return;
      if(!file.type.startsWith('image/')||file.size>16*1024*1024){status('请选择16MB以内的图片。');return;}
      cancelLoad();const id=++sequence,reader=new (doc().defaultView.FileReader)();let image=null,timer=null;status('正在读取图片…');
      cancelLoad=()=>{clearTimeout(timer);reader.onload=reader.onerror=null;if(reader.readyState===1)reader.abort();if(image)image.onload=image.onerror=null;cancelLoad=()=>{};};
      reader.onerror=()=>{cancelLoad();if(valid()&&id===sequence)status('图片读取失败，原群头像已保留。');};
      reader.onload=()=>{if(!valid()||id!==sequence)return;image=new (doc().defaultView.Image)();timer=setTimeout(()=>{cancelLoad();if(valid()&&id===sequence)status('图片读取超时，请重试。');},15000);
        image.onerror=()=>{cancelLoad();if(valid()&&id===sequence)status('图片无法读取，原群头像已保留。');};
        image.onload=()=>{if(!valid()||id!==sequence)return;source=String(reader.result);dimensions={w:image.naturalWidth,h:image.naturalHeight};cancelLoad();crop={zoom:1,x:.5,y:.5,rotation:0,mirror:false};draft={version:1,mode:'image'};status('调整取景后，点击保存。');update();};image.src=reader.result;
      };reader.readAsDataURL(file);
    };
    api.dialog('更换群头像',root,[{label:'取消',run:cancel},{label:'保存',primary:true,run:()=>{
      if(busy||!valid())return false;const snapshot={...draft},selectedSource=source,selectedCrop={...crop};busy=true;status('正在保存…');update();
      void(async()=>{try{if(snapshot.mode==='image'){if(!selectedSource)throw new Error('请先选择图片。');snapshot.src=dimensions?await (api.prepareImage||squareAvatar)(selectedSource,{document:doc(),signal:controller.signal,crop:selectedCrop,outputSize:256}):selectedSource;}if(!valid())return;const record=normalizeGroupAvatar(snapshot);if(!record)throw new Error('请选择有效的图片、符号和底色。');thread.groupAvatar=record;try{if(api.save()===false)throw new Error('群头像未能保存，请重试。');}catch(error){if(thread.groupAvatar===record){if(original===undefined)delete thread.groupAvatar;else thread.groupAvatar=original;}throw error;}cancel();api.closeDialog();refresh();}catch(error){if(valid()){busy=false;status(error?.name==='AbortError'?'操作已取消，原群头像已保留。':String(error.message||'群头像保存失败，请重试。'));update();}}})();return false;
    }}]);const owner=root.closest('#rp-screen');if(owner){observer=new (doc().defaultView.MutationObserver)(()=>{if(!root.isConnected||root.closest('[data-rp-surface-closing]'))cancel();});observer.observe(owner,{childList:true});const layer=root.closest('.rp-feature-layer');if(layer)observer.observe(layer,{attributes:true,attributeFilter:['data-rp-surface-closing']});}update();
  }
  return {members,memberHtml,html,paint,clear,refresh,install,open,cancel:()=>cancelEditor?.()};
}
