// Optional reading, contact and message tools. All state belongs to the active account/chat.
export const PHONE_TOOLS_CSS = [
'#rp-phone #rp-screen .rp-tools-buttons{display:flex;flex-wrap:wrap;gap:6px;padding:10px 0}',
'#rp-phone #rp-screen #rp-view-settings .rp-settings-body{min-height:0;padding:4px 12px 18px;box-sizing:border-box;overscroll-behavior:contain}',
'#rp-phone #rp-screen #rp-view-settings .rp-settings-group{margin:0 0 10px;min-width:0}',
'#rp-phone #rp-screen #rp-view-settings .rp-settings-group>.rp-set-section-title{font-size:11px;line-height:1.5;letter-spacing:.04em;margin:10px 4px 6px;padding:0;color:var(--rp-v-muted,#756772)}',
'#rp-phone #rp-screen #rp-view-settings .rp-settings-group>.rp-set-section{margin:0;padding:0 12px!important;border-radius:14px;min-width:0}',
'#rp-phone #rp-screen #rp-view-settings .rp-settings-item{display:flex;align-items:center;gap:10px;width:100%;min-height:56px;box-sizing:border-box;padding:11px 0!important;margin:0!important;border:0!important;border-radius:0!important;background:transparent!important;box-shadow:none!important;color:var(--rp-v-text,#44353d);font:inherit;text-align:left;cursor:pointer;list-style:none}',
'#rp-phone #rp-screen #rp-view-settings .rp-settings-item::-webkit-details-marker{display:none}',
'#rp-phone #rp-screen #rp-view-settings .rp-settings-item:focus-visible{outline:2px solid var(--rp-nav-btn,#9b647b);outline-offset:-2px;border-radius:6px!important}',
'#rp-phone #rp-screen #rp-view-settings .rp-settings-copy{display:flex;flex-direction:column;gap:3px;flex:1;min-width:0;overflow-wrap:anywhere}',
'#rp-phone #rp-screen #rp-view-settings .rp-settings-label{color:var(--rp-v-text,#44353d)!important;font-size:14px;font-weight:600;line-height:1.4}',
'#rp-phone #rp-screen #rp-view-settings .rp-settings-hint{font-size:10px;line-height:1.5;color:var(--rp-v-muted,#756772)!important}',
'#rp-phone #rp-screen #rp-view-settings .rp-settings-chevron{font-size:20px;line-height:1.4;flex:0 0 1.4em;text-align:center;overflow:hidden;opacity:.55;transition:transform .15s}',
'#rp-phone #rp-screen #rp-view-settings .rp-settings-detail[open]>.rp-settings-item>.rp-settings-chevron{transform:rotate(90deg)}',
'#rp-phone #rp-screen #rp-view-settings .rp-settings-detail+.rp-settings-detail,.rp-settings-group #rp-phone-tools-settings+.rp-settings-detail,#rp-phone #rp-screen #rp-view-settings #rp-settings-bookmark-slot+.rp-settings-detail{border-top:1px solid var(--rp-v-border,rgba(128,110,120,.15))}',
'#rp-phone #rp-screen #rp-view-settings .rp-settings-panel{padding:0 0 8px;min-width:0}',
'#rp-phone #rp-screen #rp-view-settings .rp-settings-panel .rp-set-row{gap:8px;min-width:0}',
'#rp-phone #rp-screen #rp-view-settings .rp-settings-panel .rp-set-key{font-size:12px;min-width:0}',
'#rp-phone #rp-screen #rp-view-settings .rp-settings-panel .rp-set-hint{font-size:10px;line-height:1.5;overflow-wrap:anywhere}',
'#rp-phone #rp-screen #rp-view-settings .rp-settings-panel .rp-set-select{font-size:12px;min-width:0;max-width:60%}',
'#rp-phone #rp-screen #rp-view-settings .rp-settings-panel .rp-set-upload-btn,.rp-settings-panel .rp-avatar-upload-btn{font-size:11px;min-height:36px;white-space:normal;overflow-wrap:anywhere}',
'#rp-phone #rp-screen #rp-view-settings #rp-desktop-size-value{font-size:13px;white-space:nowrap}',
'#rp-phone #rp-screen #rp-view-settings #rp-settings-avatar .rp-set-row{flex-wrap:wrap} #rp-phone #rp-screen #rp-view-settings #rp-settings-avatar .rp-set-row:nth-child(2)>.rp-set-hint{flex-basis:80px}',
'#rp-phone #rp-screen #rp-view-settings #rp-settings-wallpaper .rp-set-row>div{flex-wrap:wrap}',
'#rp-phone #rp-screen #rp-view-settings #rp-settings-blocklist .rp-blocklist-tag{max-width:100%;overflow-wrap:anywhere}',
'#rp-phone #rp-screen #rp-view-settings #rp-settings-blocklist .rp-block-x{flex-shrink:0}',
'#rp-phone #rp-screen .rp-tools-button{border:0;border-radius:10px;padding:8px 10px;min-height:36px;background:var(--rp-v-card,#f1ece9);color:var(--rp-v-text,#44353d);font:inherit;font-size:12px;cursor:pointer}',
'#rp-phone.rp-dark #rp-screen .rp-tools-button{background:var(--rp-v-card,#2c2735);color:var(--rp-v-text,#ebe7f0)}',
'#rp-phone #rp-screen #rp-view-thread>.rp-nav-bar{grid-template-columns:76px minmax(0,1fr) 76px}',
'#rp-phone #rp-screen .rp-thread-tools-actions{display:flex;align-items:center;justify-content:flex-end;gap:2px;min-width:0}',
'#rp-phone #rp-screen #rp-thread-menu{width:max(32px,calc(23px * var(--mochi-phone-font-scale,1)));min-width:32px;flex-shrink:0;height:40px;font-size:23px;padding:0;border:0;background:transparent;color:inherit;cursor:pointer}',
'#rp-phone #rp-screen .rp-game-resume button{font-size:13.333333px}',
'#rp-phone[data-font-enlarged=true] #rp-screen #rp-view-g2048{overflow-y:auto!important;overscroll-behavior:contain}',
'#rp-phone #rp-screen .rp-message-more{border:0;background:transparent;color:var(--rp-v-muted,#756772);font:inherit;font-size:16px;min-width:24px;min-height:28px;padding:0 4px;cursor:pointer}',
'#rp-phone #rp-screen #rp-view-thread .rp-voice-txt{font-size:var(--rp-reading-message-size,11.5px)!important}',
'#rp-phone.rp-dark #rp-screen .rp-message-more{color:var(--rp-v-muted,#c5bdce)}',
'#rp-phone #rp-screen .rp-tools-flags{font-size:9px;color:var(--rp-v-muted,#756772);white-space:nowrap}',
'#rp-phone #rp-screen #rp-reply-preview{display:flex;align-items:center;gap:6px;padding:5px 12px;flex-shrink:0;background:var(--rp-v-card,#f1ece9);color:var(--rp-v-text,#44353d);font-size:11px;min-width:0}',
'#rp-phone.rp-dark #rp-screen #rp-reply-preview{background:var(--rp-v-card,#2c2735);color:var(--rp-v-text,#ebe7f0)}',
'#rp-phone #rp-screen #rp-reply-preview span{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}',
'#rp-phone #rp-screen #rp-reply-cancel{flex:0 0 32px;min-height:32px;border:0;background:transparent;color:inherit;font-size:18px;cursor:pointer}',
'#rp-phone #rp-screen .rp-message-quote{font-size:10px;margin:0 0 5px;padding:4px 7px;border-left:2px solid currentColor;opacity:.8;white-space:pre-wrap;overflow-wrap:anywhere}',
'#rp-phone #rp-screen .rp-tools-field{display:flex;align-items:center;gap:8px;margin:12px 0;min-width:0}',
'#rp-phone #rp-screen .rp-tools-field input[type=range]{flex:1;min-width:0}',
'#rp-phone #rp-screen .rp-tools-field output{min-width:44px;text-align:right}',
'#rp-phone #rp-screen .rp-tools-select{max-width:100%;min-height:36px;border-radius:8px;background:var(--rp-v-card,#f1ece9);color:var(--rp-v-text,#44353d);border:1px solid var(--rp-v-border,#ded5d9);font:inherit;font-size:12px;padding:5px}',
'#rp-phone.rp-dark #rp-screen .rp-tools-select{background:var(--rp-v-card,#2c2735);color:var(--rp-v-text,#ebe7f0)}',
'#rp-phone #rp-screen .rp-saved-message{padding:10px 0;border-bottom:1px solid var(--rp-v-border,#ded5d9);overflow-wrap:anywhere}',
'#rp-phone #rp-screen .rp-saved-message img{display:block;max-width:100%;max-height:180px;object-fit:contain;margin:6px 0}',
'#rp-phone #rp-screen .rp-saved-message-text{white-space:pre-wrap;margin:6px 0}',
'#rp-phone #rp-screen .rp-saved-message-actions{display:flex;gap:4px;flex-wrap:wrap}',
'#rp-phone[data-reading-density=compact] #rp-screen #rp-view-thread .rp-bwrap{margin-bottom:8px!important}',
'#rp-phone[data-reading-density=compact] #rp-screen #rp-view-thread .rp-bubble{padding:7px 10px!important}',
'#rp-phone[data-reading-density=compact] #rp-screen #rp-view-moments .rp-moment{padding-top:8px!important;padding-bottom:8px!important}',
'#rp-phone[data-reading-density=compact] #rp-screen #rp-view-moments .rp-moment-comments-wrap{padding:7px 9px!important}',
"#rp-phone #rp-screen .rp-nav-bar{--rp-nav-control-top:46px;--rp-nav-control-center:66px;position:sticky!important;top:0!important;z-index:40;box-sizing:border-box!important;height:92px!important;min-height:92px!important;padding:46px 6px 6px!important;flex-shrink:0}",
"#rp-phone #rp-screen .rp-nav-bar>.rp-back{position:absolute!important;left:6px!important;right:auto!important;top:var(--rp-nav-control-top)!important;bottom:auto!important;width:40px!important;min-width:40px!important;max-width:40px!important;height:40px!important;min-height:40px!important;max-height:40px!important;box-sizing:border-box!important;margin:0!important;padding:0!important;transform:none!important;align-items:center!important;justify-content:center!important;line-height:40px!important;z-index:4}",
"#rp-phone #rp-screen .rp-nav-bar>.rp-nav-title{position:absolute!important;left:50%!important;right:auto!important;top:var(--rp-nav-control-center)!important;bottom:auto!important;transform:translate(-50%,-50%)!important;width:max-content;max-width:calc(100% - 120px);margin:0!important;line-height:1.3;text-align:center;overflow-wrap:anywhere;pointer-events:none!important}",
"#rp-phone #rp-screen .rp-nav-bar>:last-child:not(.rp-back):not(.rp-nav-title):not(.rp-thread-hd){position:absolute!important;right:6px!important;left:auto!important;top:var(--rp-nav-control-top)!important;bottom:auto!important;margin:0!important;transform:none!important;height:40px!important;min-height:40px!important;box-sizing:border-box!important;display:flex;align-items:center;justify-content:flex-end;z-index:4}",
"#rp-phone #rp-screen .rp-nav-bar>button:not(.rp-back){width:64px!important;min-width:64px!important;padding:0 4px!important;white-space:nowrap;line-height:1.2}",
"#rp-phone #rp-screen .rp-nav-bar :is(.rp-nav-add,#rp-gen-diary,#rp-gen-moments,#rp-bank-refresh){width:40px!important;min-width:40px!important;max-width:40px!important;height:40px!important;min-height:40px!important;max-height:40px!important;box-sizing:border-box!important;margin:0!important;padding:0!important;display:inline-flex!important;align-items:center!important;justify-content:center!important;flex:0 0 40px!important;line-height:40px!important}",
"#rp-phone #rp-screen #rp-view-thread>.rp-nav-bar{height:auto!important;min-height:116px!important;padding:46px 12px 14px!important;grid-template-columns:88px minmax(0,1fr) 88px;align-items:start}",
"#rp-phone #rp-screen #rp-view-thread .rp-thread-hd{grid-column:2;grid-row:1;align-self:start;justify-self:stretch}",
"#rp-phone #rp-screen #rp-view-thread .rp-thread-tools-actions{width:82px;gap:2px;flex-wrap:nowrap}",
"#rp-phone #rp-screen #rp-view-thread :is(#rp-thread-search,#rp-thread-menu){flex:0 0 40px;width:40px;min-width:40px;max-width:40px;height:40px;min-height:40px;max-height:40px;box-sizing:border-box;padding:0;display:inline-flex;align-items:center;justify-content:center;white-space:nowrap;line-height:40px}",
"#rp-phone #rp-screen :is(#rp-view-messages,#rp-view-moments)>.rp-nav-bar>.rp-nav-title{max-width:calc(100% - 184px)}",
"#rp-phone #rp-screen #rp-view-xhs>.rp-nav-bar>.rp-nav-title{max-width:calc(100% - 224px)}",
"#rp-phone #rp-screen #rp-view-xhs-compose .rp-nav-bar>.rp-nav-title{font-size:0!important}",
"#rp-phone #rp-screen :is(#rp-compose-modal,#rp-del-picker)>.rp-nav-bar{--rp-nav-control-top:2px;--rp-nav-control-center:22px;height:44px!important;min-height:44px!important;padding:0 6px!important}",
"#rp-phone #rp-screen .rp-nav-bar>:is(#rp-compose-cancel,#rp-del-cancel){width:64px!important;min-width:64px!important;max-width:64px!important}",
"#rp-phone #rp-screen :is(#rp-compose-modal,#rp-del-picker)>.rp-nav-bar>.rp-nav-title{max-width:calc(100% - 152px)}",
"#rp-phone #rp-screen .rp-feature-header{align-items:flex-start}",
"#rp-phone #rp-screen .rp-feature-header>strong{flex:1;min-width:0;overflow-wrap:anywhere}",
"#rp-phone #rp-screen .rp-feature-close{flex:0 0 40px;width:40px;min-width:40px;max-width:40px;height:40px;min-height:40px;max-height:40px;padding:0;line-height:40px;box-sizing:border-box}",
].join('\n');

const object = value => value && typeof value === 'object' && !Array.isArray(value);
const forbidden = new Set(['__proto__','prototype','constructor']);
const secret = /^(?:api[_-]?key|access[_-]?token|authorization|cookie|password|rp_ludo_api)$/i;
const fields = ['threads','notifications','sync','moments','diary','xhsFeed','darkMode','themeSettings','nameAliases','avatars','wallpaper','bankData','blocklist','gameState','themeStudioMessages','composeDraft','themeStudioDraft','diaryDraft','xhsPostDraft','commentDrafts','readingPositions','deletedContacts','recovery','phoneTools'];
const clone = value => JSON.parse(JSON.stringify(value));
const uid = () => 'pt_' + Date.now() + '_' + Math.random().toString(36).slice(2,11);
function clean(value, depth = 0) {
  if (depth > 64) throw new Error('备份内容层级过深。');
  if (Array.isArray(value)) return value.map(v => clean(v,depth+1));
  if (!object(value)) return value;
  const result = {};
  for (const [key,item] of Object.entries(value)) {
    if (forbidden.has(key)) throw new Error('备份包含不支持的字段。');
    if (!secret.test(key)) result[key] = clean(item,depth+1);
  }
  return result;
}
function portable(value) {
  const result = {};
  for (const field of fields) if (value[field] !== undefined) result[field] = clean(value[field]);
  for (const thread of Object.values(result.threads || {})) {
    delete thread.pendingHostActions; // A restored file must never replay host submissions.
  }
  delete result.recovery; // Recovery can contain arbitrary historical configuration fragments.
  return result;
}
function normalizePrefs(value) {
  const number = (key,fallback) => typeof value?.[key] === 'number' && Number.isFinite(value[key]) ? Math.max(9,Math.min(18,Math.round(value[key]*2)/2)) : fallback;
  const scale=typeof value?.scale==='number'&&Number.isFinite(value.scale)?Math.max(75,Math.min(150,Math.round(value.scale/5)*5)):100;
  return {message:number('message',11.5),moments:number('moments',12),scale,density:value?.density==='compact'?'compact':'standard'};
}
function identity(item) {
  if (item.phoneSource?.key) return 'source:' + item.phoneSource.key;
  if (item.id != null && String(item.id)) return 'id:' + String(item.id);
  return 'legacy:' + JSON.stringify(['from','name','user','author','role','type','text','title','body','time','date','hostIndex','amount','note','place','src','duration','voiceText'].map(k=>item[k]??null));
}
// Multiset matching keeps legitimate identical legacy messages; existing records always win.
function mergeList(target, source, stats, field, nested = false) {
  const available = new Map(), matches = new Map(), pending = [];
  target.forEach(item => {const key=identity(item);if(!available.has(key))available.set(key,[]);available.get(key).push(item);});
  source.forEach((item,index) => {
    if (!object(item)) throw new Error('备份记录格式不完整。');
    const list=available.get(identity(item)), found=list?.shift();
    if (found) {
      matches.set(index,found);
      if(nested && Array.isArray(found.comments) && Array.isArray(item.comments))mergeComments(found.comments,item.comments,stats);
    } else pending.push({item:clone(item),index});
  });
  const anchors=new Map(),before=new Map(),tail=[];let next=null;
  for(let i=source.length-1;i>=0;i--){anchors.set(i,next);if(matches.has(i))next=matches.get(i);}
  for(const entry of pending){
    const anchor=anchors.get(entry.index);if(anchor){if(!before.has(anchor))before.set(anchor,[]);before.get(anchor).push(entry.item);}else tail.push(entry.item);
    matches.set(entry.index,entry.item);stats[field]=(stats[field]||0)+1;
  }
  if(pending.length){
    const original=target.slice();target.length=0;
    for(const item of original){for(const inserted of before.get(item)||[])target.push(inserted);target.push(item);}
    for(const item of tail)target.push(item);
  }
  return matches;
}
function mergeComments(target, source, stats) {
  const original=target.slice(), links=new Map(original.map(item=>[item,Number.isInteger(item.replyTo)?original[item.replyTo]:null]));
  const before=new Set(target), map=mergeList(target,source,stats,'comments');
  const positions=new Map(target.map((item,index)=>[item,index]));
  for(const item of original)if(Number.isInteger(item.replyTo))item.replyTo=positions.get(links.get(item))??null;
  source.forEach((item,index) => {
    const result=map.get(index);
    if(result&&!before.has(result))result.replyTo=Number.isInteger(item.replyTo)&&map.has(item.replyTo)?positions.get(map.get(item.replyTo)):null;
  });
}

export function createPhoneTools(api) {
  const $=api.$, doc=api.document, state=api.state;
  const prefsKey=()=> 'mochi-phone-reading-v1-' + (api.touch()?'mobile':'desktop');
  let prefs=normalizePrefs(null), mountedRuntime=null, unbind=null, fontObserver=null;
  const fontVariable='--mochi-phone-font-scale',fontOwners='#rp-phone,#rp-wrapper,#rp-fab,#rp-live-chat';
  function fontValue(value, root = false) {
    const v=String(value||'').trim();
    if(!v||v.includes(fontVariable)||/^(?:inherit|unset|revert(?:-layer)?|smaller|larger)$/i.test(v))return v;
    // Relative descendants inherit their already-scaled parent; wrapping them again would compound.
    if(!root&&/(?:[0-9.]em\b|%)/i.test(v))return v;
    const keywords={'xx-small':'9px','x-small':'10px',small:'13px',medium:'16px',large:'18px','x-large':'24px','xx-large':'32px','xxx-large':'48px',initial:'16px'};
    return 'calc(('+ (keywords[v]||v) +') * var('+fontVariable+',1))';
  }
  function scaleDeclaration(style, root = false) {
    const original=style.getPropertyValue('font-size'),next=fontValue(original,root);
    if(next&&next!==original)style.setProperty('font-size',next,style.getPropertyPriority('font-size'));
  }
  function scaleSheet(owner) {
    if(!owner?.sheet)return;
    const phone=doc.getElementById('rp-phone');
    const visit=rules=>{for(const rule of rules||[]){
      if(rule.style){let root=false;try{root=!!phone?.matches(rule.selectorText||':not(*)');}catch(_){}scaleDeclaration(rule.style,root);}
      if(rule.cssRules)visit(rule.cssRules);
    }};
    try{visit(owner.sheet.cssRules);}catch(_){}
  }
  function scaleInline(root) {
    if(root?.nodeType!==1)return;
    const candidates=[root,...root.querySelectorAll('[style]')];
    for(const el of candidates)if(el.closest(fontOwners)&&el.style)scaleDeclaration(el.style,el.id==='rp-phone');
  }
  function refreshTypography() {
    for(const id of ['rp-phone-css','rp-custom-theme-style'])scaleSheet(doc.getElementById(id));
    for(const root of doc.querySelectorAll(fontOwners))scaleInline(root);
  }
  function installTypography() {
    fontObserver?.disconnect();
    let base=doc.getElementById('rp-global-font-base');
    if(!base){
      base=doc.createElement('style');base.id='rp-global-font-base';
      // The phone's parent is outside its scaled text tree; 1em tracks the host's base font.
      base.textContent='#rp-phone{font-size:calc(1em * var('+fontVariable+',1))}';
      doc.head.insertBefore(base,doc.getElementById('rp-phone-css'));
    }
    refreshTypography();
    const Observer=doc.defaultView.MutationObserver;
    const observer=new Observer(records=>{
      const sheets=new Set(),nodes=new Set();
      for(const change of records){
        if(change.type==='attributes'){
          const el=change.target,value=el.style?.getPropertyValue('font-size');
          if(value&&!value.includes(fontVariable)&&el.closest(fontOwners))nodes.add(el);
        }else{
          const style=change.target.nodeType===1?change.target:change.target.parentElement;
          if(style?.matches?.('#rp-phone-css,#rp-custom-theme-style'))sheets.add(style);
          for(const node of change.addedNodes)if(node.nodeType===1){
            if(node.matches('#rp-phone-css,#rp-custom-theme-style'))sheets.add(node);
            if(node.matches(fontOwners)||node.closest(fontOwners))nodes.add(node);
          }
        }
      }
      for(const sheet of sheets)scaleSheet(sheet);
      for(const node of nodes)scaleInline(node);
    });
    observer.observe(doc.documentElement,{subtree:true,childList:true,attributes:true,attributeFilter:['style'],characterData:true});
    fontObserver=observer;api.runtime().own(()=>{observer.disconnect();if(fontObserver===observer)fontObserver=null;base.remove();});
  }
  const toolsState=()=> {
    if(!object(state().phoneTools))state().phoneTools={};
    if(!Array.isArray(state().phoneTools.bookmarks))state().phoneTools.bookmarks=[];
    return state().phoneTools;
  };
  const info=text=>api.notify(text);
  const node=(tag,cls,text)=>$(doc.createElement(tag)).addClass(cls||'').text(text??'');
  const button=(text,fn)=>node('button','rp-tools-button',text).attr('type','button').on('click',fn);
  const safeImage=value=>typeof value==='string' && /^(?:https?:\/\/|data:image\/(?:png|jpe?g|gif|webp|avif);|blob:|\/(?!\/))/.test(value) ? value : '';
  function snapshot(thread,message) {
    const text=message.type==='image'?'[图片]':message.type==='pending_image'?'[待生成图片]':message.type==='location'?'[位置] '+(message.place||''):message.type==='hongbao'||message.type==='group_hongbao'?'[红包] '+(message.amount||'')+' '+(message.note||''):String(message.text||message.voiceText||'[信息]');
    return {threadId:thread.id,threadName:thread.name,messageId:String(message.id),name:message.from==='user'?'我':message.name||thread.name,text,time:String(message.time||''),type:message.type||'text',...(message.type==='image'&&safeImage(message.src)?{src:message.src}:{})};
  }
  function ensureId(message) { if(!message.id)message.id=uid();return String(message.id); }
  function isMuted(id,name) {
    const threads=state().threads||{};
    if(id)return !!threads[id]?.phoneMuted;
    const found=Object.values(threads).filter(t=>t.name===name);
    return found.length===1 && !!found[0].phoneMuted;
  }
  function applyReading(value, persist = false) {
    const next=normalizePrefs(value);
    if(persist)try{api.storage.setItem(prefsKey(),JSON.stringify(next));}catch(_){info('显示设置未保存，请检查本机存储后重试。');return false;}
    prefs=next;
    const phone=doc.getElementById('rp-phone');if(!phone)return true;
    phone.style.setProperty('--rp-reading-message-size',next.message+'px');
    phone.style.setProperty('--rp-reading-moment-size',next.moments+'px');
    for(const root of doc.querySelectorAll(fontOwners))root.style.setProperty(fontVariable,String(next.scale/100));
    phone.dataset.readingDensity=next.density;
    phone.dataset.fontEnlarged=next.scale>100?'true':'false';
    api.reflow?.();
    return true;
  }
  function openReading() {
    const content=node('div'), status=node('p','rp-feature-note','统一调整所有功能与界面的文字，保留标题和正文的大小层次。更改立即保存，仅用于当前账号的'+(api.touch()?'手机端':'电脑端')+'。');
    const output=node('output','',prefs.scale+'%'),input=node('input').attr({type:'range',min:75,max:150,step:5,id:'rp-global-font-size','aria-label':'整体字号'}).val(prefs.scale);
    input.on('input',()=>{api.rememberReading();if(applyReading({...prefs,scale:Number(input.val())},true)){output.text(prefs.scale+'%');api.restoreReading();}else input.val(prefs.scale);});
    content.append(node('label','rp-tools-field').append(node('span','','整体字号'),input,output));
    const density=node('select','rp-tools-select').attr('aria-label','显示密度').append(node('option','','标准').val('standard'),node('option','','紧凑').val('compact')).val(prefs.density);
    density.on('change',()=>{api.rememberReading();if(applyReading({...prefs,density:density.val()},true))api.restoreReading();else density.val(prefs.density);});
    content.append(node('label','rp-tools-field').append(node('span','','显示密度'),density),status);
    api.dialog('调整字号大小',content,[{label:'恢复默认',run:()=>{api.rememberReading();if(applyReading(null,true)){input.val(prefs.scale);output.text(prefs.scale+'%');density.val(prefs.density);api.restoreReading();}return false;}},{label:'完成'}]);
  }
  function openThreadMenu() {
    const thread=state().threads[state().currentThread];if(!thread)return;
    const content=node('div').append(node('p','',thread.name),node('p','rp-feature-note','免打扰只关闭该聊天的消息横幅，消息、未读数和来电照常保留。'));
    const live=()=>state().threads[thread.id]===thread;
    api.dialog('聊天设置',content,[
      {label:thread.phonePinned?'取消置顶':'置顶聊天',run:()=>{if(live()){thread.phonePinned=!thread.phonePinned;thread.phonePrefsAt=Date.now();api.renderThreads();api.save();}}},
      {label:thread.phoneMuted?'关闭免打扰':'开启免打扰',run:()=>{if(live()){thread.phoneMuted=!thread.phoneMuted;thread.phonePrefsAt=Date.now();api.hideBanner();api.renderThreads();api.save();}}},
      {label:'消息收藏',run:()=>{openBookmarks(thread.id);return false;}},{label:'关闭'}
    ]);
  }
  function sourceOf(entry) {
    const thread=state().threads[entry.threadId],message=thread?.messages.find(m=>String(m.id||'')===String(entry.messageId));
    return {thread,message};
  }
  function jump(entry) {
    const {thread,message}=sourceOf(entry);if(!thread||!message){info('原消息已删除，收藏快照仍保留。');return;}
    api.closeDialog();api.openThread(thread.id);
    const area=doc.getElementById('rp-bubbles'),index=thread.messages.indexOf(message),row=[...area.children].find(e=>Number(e.dataset.rpReadingIndex)===index);
    if(row){area.scrollTop+=(row.getBoundingClientRect().top-area.getBoundingClientRect().top)/api.scrollScale(area)-12;row.classList.add('rp-search-match');api.runtime().timer(()=>row.classList.remove('rp-search-match'),2000,false);api.rememberReading();}
  }
  function openBookmarks(filter = '') {
    let limit=100;
    const content=node('div'),select=node('select','rp-tools-select').attr('aria-label','收藏联系人'),search=node('input','rp-feature-input').attr({type:'search','aria-label':'搜索收藏',placeholder:'搜索收藏内容'}),list=node('div');
    const names=new Map();for(const e of toolsState().bookmarks)names.set(e.threadId,e.threadName);
    select.append(node('option','','全部联系人').val(''));for(const[id,name]of names)select.append(node('option','',name).val(id));
    select.val(names.has(filter)?filter:'');content.append(select,search,list);
    const render=()=>{
      list.empty();const query=String(search.val()||'').trim().toLocaleLowerCase();
      const entries=toolsState().bookmarks.filter(e=>(!select.val()||e.threadId===select.val())&&(!query||(e.text+' '+e.threadName+' '+e.name).toLocaleLowerCase().includes(query))).slice().reverse();
      if(!entries.length){list.append(node('p','rp-feature-note','暂无符合条件的消息收藏。'));return;}
      for(const entry of entries.slice(0,limit)){
        const row=node('div','rp-saved-message'),live=sourceOf(entry),label=entry.threadName+' · '+entry.name+(entry.time?' · '+entry.time:'');
        row.append(node('strong','',label),node('div','rp-saved-message-text',entry.text));
        if(safeImage(entry.src))row.append(node('img').attr({src:entry.src,alt:'收藏图片'}).on('error',function(){$(this).replaceWith(node('p','rp-feature-note','原图片当前无法加载。'));}));
        row.append(node('p','rp-feature-note',live.message?'收藏时的内容':'原消息已删除，已保留收藏快照'));
        row.append(node('div','rp-saved-message-actions').append(button('回到原消息',()=>jump(entry)).prop('disabled',!live.message),button('取消收藏',()=>{const items=toolsState().bookmarks;const i=items.indexOf(entry);if(i>=0)items.splice(i,1);api.save();render();})));
        list.append(row);
      }
      if(entries.length>limit)list.append(button('再显示100条（共'+entries.length+'条）',()=>{limit+=100;render();}));
    };
    const reset=()=>{limit=100;render();};select.on('change',reset);search.on('input',reset);render();api.dialog('消息收藏',content,[{label:'关闭'}]);
  }
  function openMessage(thread,message) {
    if(state().threads[thread.id]!==thread||!thread.messages.includes(message))return;
    const token=api.runtime().task(),live=()=>token.valid()&&state().threads[thread.id]===thread&&thread.messages.includes(message);
    const id=ensureId(message), saved=toolsState().bookmarks.find(e=>e.threadId===thread.id&&e.messageId===id);
    api.dialog('信息操作',node('div').append(node('p','rp-feature-preview',snapshot(thread,message).text.slice(0,240))),[
      {label:'引用回复',run:()=>{if(!live())return;thread.draftQuote=snapshot(thread,message);api.save();api.closeDialog();renderReply();$('#rp-input').trigger('focus');return false;}},
      {label:saved?'取消收藏':'收藏消息',run:()=>{if(!live())return;const items=toolsState().bookmarks;if(saved){const i=items.indexOf(saved);if(i>=0)items.splice(i,1);}else items.push({...snapshot(thread,message),savedAt:Date.now(),id:uid()});api.save();}},
      {label:'关闭'}
    ]);
  }
  function renderReply() {
    const thread=state().threads[state().currentThread],quote=thread?.draftQuote,box=$('#rp-reply-preview').empty();
    if(!quote){box.hide();return;}
    box.css('display','flex').append(node('span','','回复 '+quote.name+'：'+quote.text),node('button','','×').attr({id:'rp-reply-cancel',type:'button','aria-label':'取消引用'}).on('click',()=>{delete thread.draftQuote;api.save();renderReply();}));
  }
  function decorateMessages(area,thread) {
    for(const row of area.children){
      const index=Number(row.dataset.rpReadingIndex),message=thread.messages[index];if(!message||!row.classList.contains('rp-bwrap'))continue;
      const meta=$(row).find('.rp-btn-row').first();if(meta.length&&!meta.find('.rp-message-more').length)meta.append(node('button','rp-message-more','⋯').attr({type:'button','aria-label':'信息更多操作：引用或收藏'}).on('click',event=>{event.stopPropagation();openMessage(thread,message);}));
      if(object(message.phoneQuote)){
        const inner=$(row).children('.rp-private-body,.rp-grp-body').first(),body=inner.length?inner:$(row);
        body.prepend(node('div','rp-message-quote',message.phoneQuote.name+'：'+message.phoneQuote.text));
      }
    }
  }
  function decorateThreads() {
    for(const row of doc.querySelectorAll('#rp-thread-list .rp-thread')){
      const thread=state().threads[row.dataset.thread];if(!thread)continue;
      const flags=[thread.phonePinned?'置顶':'',thread.phoneMuted?'免打扰':''].filter(Boolean).join(' · ');
      if(flags)$(row).find('.rp-tm').prepend(node('div','rp-tools-flags',flags));
    }
  }
  function quotes(thread) {
    const count=Array.isArray(thread.pendingMessages)?thread.pendingMessages.length:0;
    return Array.from({length:count},(_,i)=>object(thread.pendingQuotes?.[i])?thread.pendingQuotes[i]:null);
  }
  function quoteText(quote) {return quote?'回复 '+String(quote.name||'对方').replace(/[<>]/g,'')+' 的「'+String(quote.text||'').replace(/[<>]/g,'').slice(0,800)+'」：':'';}
  function normalizeSaved(saved) {
    const raw=object(saved.phoneTools)?saved.phoneTools:{},bookmarks=Array.isArray(raw.bookmarks)?raw.bookmarks.filter(e=>object(e)&&typeof e.threadId==='string'&&typeof e.messageId==='string'&&typeof e.text==='string'): [];
    state().phoneTools={version:1,bookmarks:clone(bookmarks)};
    for(const thread of Object.values(state().threads||{})){
      thread.pendingQuotes=quotes(thread);
      if(!object(thread.draftQuote))delete thread.draftQuote;
      else thread.draftQuote=clean(thread.draftQuote);
    }
    renderReply();
  }
  function mergeContacts(keep,drop) {
    // Called before the existing queue/draft concatenation.
    keep.pendingQuotes=[...quotes(keep),...quotes(drop)];
    if(drop.draft){if(!keep.draft)keep.draftQuote=drop.draftQuote||null;else keep.pendingQuotes.push(drop.draftQuote||null);}
    if((drop.phonePrefsAt||0)>(keep.phonePrefsAt||0)){keep.phonePinned=!!drop.phonePinned;keep.phoneMuted=!!drop.phoneMuted;keep.phonePrefsAt=drop.phonePrefsAt;}
    for(const entry of toolsState().bookmarks)if(entry.threadId===drop.id){entry.threadId=keep.id;entry.threadName=keep.name;}
  }
  function makeBackup(payload=api.snapshot()) {
    const account=api.account(),slot=state().chatId;
    if(!account||!slot)throw new Error('账号或聊天尚未就绪。');
    return {format:'mochi-phone-backup',version:1,exportedAt:new Date().toISOString(),origin:{account,slot},data:portable(payload)};
  }
  function parseBackup(text) {
    if(typeof text!=='string'||text.length>64*1024*1024)throw new Error('请选择64MB以内的JSON备份。');
    let value;try{value=JSON.parse(text);}catch(_){throw new Error('无法读取JSON备份，当前数据未改变。');}
    if(!object(value)||value.format!=='mochi-phone-backup'||value.version!==1||!object(value.origin)||!object(value.data)||!object(value.data.threads))throw new Error('文件不是受支持的小手机备份。');
    if(value.origin.account!==api.account()||value.origin.slot!==state().chatId)throw new Error('请切换到备份对应的账号和聊天后重试。');
    for(const field of ['moments','diary','xhsFeed','themeStudioMessages'])if(value.data[field]!==undefined&&!Array.isArray(value.data[field]))throw new Error('备份记录格式不完整。');
    if(value.data.bankData!=null&&!object(value.data.bankData))throw new Error('备份银行卡记录格式不完整。');
    for(const field of ['diary','themeStudioMessages'])if((value.data[field]||[]).some(item=>!object(item)))throw new Error('备份记录格式不完整。');
    for(const field of ['avatars','nameAliases'])if(value.data[field]!==undefined&&(!object(value.data[field])||Object.values(value.data[field]).some(item=>typeof item!=='string')))throw new Error('备份联系人设置格式不完整。');
    if(value.data.phoneTools!==undefined&&(!object(value.data.phoneTools)||(value.data.phoneTools.bookmarks!==undefined&&!Array.isArray(value.data.phoneTools.bookmarks))))throw new Error('备份收藏格式不完整。');
    for(const field of ['moments','xhsFeed'])for(const post of value.data[field]||[])if(!object(post)||(post.comments!==undefined&&(!Array.isArray(post.comments)||post.comments.some(c=>!object(c)))))throw new Error('备份评论格式不完整。');
    for(const[id,thread]of Object.entries(value.data.threads))if(!object(thread)||thread.id!==id||typeof thread.name!=='string'||!Array.isArray(thread.messages)||thread.messages.some(m=>!object(m)))throw new Error('备份联系人或消息格式不完整。');
    for(const thread of Object.values(value.data.threads)){
      if(thread.pendingMessages!==undefined&&(!Array.isArray(thread.pendingMessages)||thread.pendingMessages.some(v=>typeof v!=='string')))throw new Error('备份暂存消息格式不完整。');
      if(thread.pendingQuotes!==undefined&&(!Array.isArray(thread.pendingQuotes)||thread.pendingQuotes.some(v=>v!==null&&!object(v))))throw new Error('备份引用格式不完整。');
      if(thread.draft!==undefined&&typeof thread.draft!=='string')throw new Error('备份草稿格式不完整。');
      for(const m of thread.messages)for(const key of ['text','name','from','type','time','src','voiceText','place'])if(m[key]!==undefined&&typeof m[key]!=='string')throw new Error('备份消息字段格式不完整。');
    }
    value.data=portable(value.data);return value;
  }
  function planMerge(backup, current=api.snapshot()) {
    if(backup.origin.account!==api.account()||backup.origin.slot!==state().chatId)throw new Error('备份与当前账号或聊天不一致。');
    const result=clone(current),source=backup.data,stats={contacts:0,messages:0,moments:0,diary:0,xhs:0,comments:0,bookmarks:0,themeMessages:0,skipped:0};
    result.threads ||= {};
    for(const[id,thread]of Object.entries(source.threads)){
      if(api.blocked(thread,current)){stats.skipped++;continue;}
      const existing=Object.hasOwn(result.threads,id)?result.threads[id]:null;
      if(existing){
        if(existing.name!==thread.name||String(existing.type||'private')!==String(thread.type||'private')){stats.skipped++;continue;}
        mergeList(existing.messages,thread.messages,stats,'messages');
        if(!existing.draft&&thread.draft){existing.draft=thread.draft;existing.draftQuote=thread.draftQuote||null;}
        if(!existing.pendingMessages?.length&&thread.pendingMessages?.length){existing.pendingMessages=clone(thread.pendingMessages);existing.pendingQuotes=clone(thread.pendingQuotes||[]);}
      }else{result.threads[id]=clone(thread);delete result.threads[id].pendingHostActions;stats.contacts++;stats.messages+=thread.messages.length;}
    }
    for(const[field,key]of [['moments','moments'],['diary','diary'],['xhsFeed','xhs']]){
      result[field] ||= [];const records=(source[field]||[]).filter(item=>!api.blockedPost(item,current)).map(item=>{
        if(field==='diary')return item;
        const post=clone(item),original=post.comments||[],kept=original.filter(c=>!api.blockedPost(c,current));
        stats.skipped+=original.length-kept.length;
        for(const c of kept)if(Number.isInteger(c.replyTo))c.replyTo=kept.indexOf(original[c.replyTo])>=0?kept.indexOf(original[c.replyTo]):null;
        post.comments=kept;
        if(Array.isArray(post.likes))post.likes=post.likes.filter(name=>typeof name==='string'&&!api.blocked({name},current));
        return post;
      });stats.skipped+=(source[field]||[]).length-records.length;mergeList(result[field],records,stats,key,field!=='diary');
    }
    result.phoneTools ||= {version:1,bookmarks:[]};result.phoneTools.bookmarks ||= [];
    const bookmarks=source.phoneTools?.bookmarks||[];const known=new Set(result.phoneTools.bookmarks.map(e=>JSON.stringify([e.threadId,e.messageId])));
    for(const entry of bookmarks)if(object(entry)&&typeof entry.threadId==='string'&&typeof entry.messageId==='string'&&typeof entry.text==='string'){const key=JSON.stringify([entry.threadId,entry.messageId]);if(!known.has(key)){result.phoneTools.bookmarks.push(clone(entry));known.add(key);stats.bookmarks++;}}
    for(const field of ['avatars','nameAliases']){result[field] ||= {};for(const[key,value]of Object.entries(source[field]||{}))if(!Object.hasOwn(result[field],key))result[field][key]=clone(value);}
    for(const field of ['composeDraft','diaryDraft','themeStudioDraft'])if(!result[field]&&typeof source[field]==='string')result[field]=source[field];
    result.themeStudioMessages ||= [];mergeList(result.themeStudioMessages,source.themeStudioMessages||[],stats,'themeMessages');
    result.commentDrafts ||= {};
    for(const kind of ['moments','xhs']){
      const records=kind==='moments'?result.moments:result.xhsFeed,existing=result.commentDrafts[kind] ||= {};
      for(const[id,draft]of Object.entries(source.commentDrafts?.[kind]||{}))if(!existing[id]?.text&&object(draft)&&typeof draft.text==='string'&&records.some(post=>String(post.id)===id))existing[id]=clone(draft);
    }
    if(!result.xhsPostDraft?.title&&!result.xhsPostDraft?.body&&source.xhsPostDraft)result.xhsPostDraft=clone(source.xhsPostDraft);
    if(!result.bankData&&object(source.bankData))result.bankData=clone(source.bankData);
    return {data:result,stats};
  }
  function download(value,name) {
    try{api.download(JSON.stringify(value,null,2),name);return true;}catch(_){info('无法下载文件，请检查浏览器下载权限后重试。');return false;}
  }
  function exportBackup() {try{return download(makeBackup(),'MochiPhone-'+new Date().toISOString().replace(/[:.]/g,'-')+'.json');}catch(error){info(error.message);return false;}}
  async function writeVerified(key,value) {
    const text=JSON.stringify(value);
    try{api.storage.setItem(key,text);if(api.storage.getItem(key)===text)return true;}catch(_){}
    try{if(await api.archive().put(key,value)){const read=await api.archive().get(key);return JSON.stringify(read)===text;}}catch(_){}
    return false;
  }
  async function readVerified(key) {
    let local=null,archived=null;
    try{const raw=api.storage.getItem(key);if(raw)local=JSON.parse(raw);}catch(_){}
    try{archived=await api.archive().get(key);}catch(_){}
    if(local?.key&&archived?.key)return Number(archived.at||0)>Number(local.at||0)?archived:local;
    return local||archived;
  }
  const signature=()=>JSON.stringify(portable(api.snapshot()));
  async function restoreBackup(backup,expectedSignature,token) {
    if(!token.valid())return false;
    if(!api.canRestore()){info('请等当前发送、生成或生图完成后再恢复。');return false;}
    if(signature()!==expectedSignature){info('当前内容已有更新，请重新预览后恢复。');return false;}
    const current=api.snapshot(),plan=planMerge(backup,current),key='mochi-phone-import-before-v1:'+state().chatId+':'+uid(),before=makeBackup(current);
    if(!await writeVerified(key,before)){info('恢复前自动备份失败，当前数据未改变。请检查本机存储空间。');return false;}
    if(!token.valid())return false;
    if(!api.canRestore()||signature()!==expectedSignature){info('当前内容已有更新，自动备份已保留，请重新预览。');return false;}
    const stageKey=key+':merged';
    if(!await writeVerified(stageKey,makeBackup(plan.data))){info('合并结果无法安全保存，当前数据未改变，恢复前备份已保留。');return false;}
    if(!token.valid())return false;
    if(!api.canRestore()||signature()!==expectedSignature){info('当前内容已有更新，请重新预览。');return false;}
    const pointerKey='mochi-phone-last-import-backup-v1:'+state().chatId,previous=await readVerified(pointerKey);
    if(!token.valid()||!api.canRestore()||signature()!==expectedSignature)return false;
    if(!await writeVerified(pointerKey,{key,at:Math.max(Date.now(),Number(previous?.at||0)+1)})){info('无法记录恢复前备份的位置，请检查存储空间后重试。');return false;}
    if(!token.valid()||!api.canRestore()||signature()!==expectedSignature)return false;
    api.applyMerged(plan.data);
    info('已合并缺少的记录，恢复前备份已保留。');
    return true;
  }
  function previewBackup(backup) {
    const task=api.runtime().task(),origin=signature(),plan=planMerge(backup),s=plan.stats,content=node('div'),status=node('p','rp-feature-note');
    const token={valid:()=>task.valid()&&!!content[0]?.isConnected};
    content.append(node('p','','将补充 '+s.contacts+' 个联系人、'+s.messages+' 条消息、'+s.moments+' 条朋友圈、'+s.diary+' 篇日记、'+s.xhs+' 条笔记、'+s.comments+' 条评论、'+s.bookmarks+' 条收藏及'+s.themeMessages+' 条主题对话。缺少的草稿一并补充。'),node('p','rp-feature-note','同一记录保留当前内容；现有主题、设置、点赞、阅读位置及游戏进度保持。已删除或拉黑的联系人保持原状。不会重发历史待同步操作。'),node('p','rp-feature-note','跳过不适合当前存档的记录：'+s.skipped+'。恢复前会先自动保存一份可下载备份。'),status);
    let running=false;
    api.dialog('恢复预览',content,[{label:'取消'},{label:'合并恢复',primary:true,run:()=>{if(running)return false;running=true;status.text('正在备份并校验…');void restoreBackup(backup,origin,token).then(ok=>{if(ok)api.closeDialog();else if(token.valid()){running=false;status.text('未合并，请检查提示或重新选择备份。');}}).catch(()=>{if(token.valid()){running=false;status.text('恢复未完成，原存档与自动备份仍保留。');}});return false;}}]);
  }
  function openBackup() {
    const task=api.runtime().task(),content=node('div'),status=node('p','rp-feature-note','仅当前账号、当前聊天的小手机记录；不包含API密钥，不修改酒馆主楼。导入上限64MB。');
    const token={valid:()=>task.valid()&&!!content[0]?.isConnected};
    const file=node('input').attr({type:'file',accept:'.json,application/json',id:'rp-phone-backup-file'}).hide();
    file.on('change',async()=>{const selected=file[0].files?.[0];if(!selected)return;try{if(selected.size>64*1024*1024)throw new Error('请选择64MB以内的JSON备份。');const text=await selected.text();if(!token.valid())return;previewBackup(parseBackup(text));}catch(error){if(token.valid())status.text(error.message||'备份读取失败，当前数据未改变。');}finally{file.val('');}});
    const previous=button('下载上次恢复前备份',async()=>{try{const pointer=await readVerified('mochi-phone-last-import-backup-v1:'+state().chatId);if(!token.valid())return;const key=pointer?.key;if(!key){status.text('当前聊天尚无恢复前备份。');return;}const value=await readVerified(key);if(!token.valid())return;if(!value){status.text('备份暂不可读取，请重试。');return;}download(value,'MochiPhone-before-restore.json');}catch(_){if(token.valid())status.text('备份暂不可读取，请重试。');}});
    content.append(status,node('div','rp-tools-buttons').append(button('导出当前聊天',exportBackup),button('选择备份并预览',()=>file.trigger('click')),previous),file);
    api.dialog('备份与恢复',content,[{label:'关闭'}]);
  }
  function mount() {
    if(unbind)unbind();
    try{prefs=normalizePrefs(JSON.parse(api.storage.getItem(prefsKey())||'null'));}catch(_){prefs=normalizePrefs(null);}
    applyReading(prefs);
    installTypography();
    const settingsLink=(slot,id,title,hint,action)=>{
      if(doc.getElementById(id))return;
      const copy=node('span','rp-settings-copy').append(node('span','rp-settings-label',title),node('span','rp-settings-hint',hint));
      const arrow=node('span','rp-settings-chevron','›').attr('aria-hidden','true');
      node('button','rp-settings-item').attr({id,type:'button'}).append(copy,arrow).on('click',action).appendTo(slot);
    };
    settingsLink('#rp-phone-tools-settings','rp-settings-font','调整字号大小','所有界面字号与消息间距',openReading);
    settingsLink('#rp-settings-bookmark-slot','rp-settings-bookmarks','消息收藏','查看已收藏的消息快照',()=>openBookmarks());
    settingsLink('#rp-settings-backup-slot','rp-settings-backup','备份与恢复','导出当前聊天，或预览并合并备份',openBackup);
    if(!doc.getElementById('rp-thread-menu'))$('#rp-thread-search').wrap('<div class="rp-thread-tools-actions"></div>').parent().append(node('button','','⋯').attr({id:'rp-thread-menu',type:'button','aria-label':'聊天设置与收藏'}).on('click',openThreadMenu));
    if(!doc.getElementById('rp-reply-preview'))node('div').attr('id','rp-reply-preview').hide().insertBefore('#rp-pending-queue');
    mountedRuntime=api.runtime();const ns='.mochiPhoneTools'+uid();
    $(doc).on('keydown'+ns,event=>{if(event.key==='Escape'&&state().currentView==='thread'&&!doc.getElementById('rp-feature-layer')){const thread=state().threads[state().currentThread];if(thread?.draftQuote){delete thread.draftQuote;api.save();renderReply();}}});
    unbind=()=>{$(doc).off(ns);unbind=null;};mountedRuntime.own(unbind);renderReply();
  }
  return {mount,applyReading,openReading,refreshTypography,openThreadMenu,openBookmarks,openMessage,renderReply,decorateMessages,decorateThreads,isMuted,quotes,quoteText,normalizeSaved,mergeContacts,makeBackup,parseBackup,planMerge,restoreBackup,previewBackup,openBackup,exportBackup,portable,signature,prefs:()=>({...prefs}),snapshot,toolsState};
}
