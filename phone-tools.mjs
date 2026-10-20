// Optional reading, contact and message tools. All state belongs to the active account/chat.
export const PHONE_TOOLS_CSS = [
'#rp-phone #rp-screen #rp-lock-notifs{box-sizing:border-box;min-width:0;min-height:0;flex:1 1 auto;overflow-y:auto;overscroll-behavior:contain;padding-bottom:70px}',
'#rp-phone #rp-screen #rp-lock-notifs :is(.rp-ln-wrap,.rp-ln-type,.rp-ln-text){min-width:0;overflow-wrap:anywhere}',
'#rp-phone #rp-screen .rp-lock-body>#rp-lock-time{flex-shrink:0}',
'#rp-phone #rp-screen .rp-conv-field{display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin:9px 0;min-width:0}',
'#rp-phone #rp-screen .rp-conv-field>span{flex:0 0 4.8em;font-size:12px}',
'#rp-phone #rp-screen .rp-conv-field>input,#rp-phone #rp-screen .rp-conv-field>select{flex:1;min-width:0;width:100%;box-sizing:border-box}',
'#rp-phone #rp-screen .rp-conv-check{display:flex;align-items:flex-start;gap:8px;padding:9px 0;font-size:12px;min-width:0;overflow-wrap:anywhere;cursor:pointer}',
'#rp-phone #rp-screen .rp-conv-check input{flex:0 0 18px;width:18px;height:18px;margin:2px 0;accent-color:var(--rp-nav-btn,#9b647b)}',
'#rp-phone #rp-screen .rp-conv-check span{min-width:0;white-space:pre-wrap}',
'#rp-phone #rp-screen .rp-conv-source{font-size:11px;line-height:1.5;white-space:pre-wrap;overflow-wrap:anywhere;max-height:9em;overflow:auto;padding:8px;border-radius:9px;background:var(--rp-v-card,#f1ece9)}',
'#rp-phone #rp-screen .rp-search-navigation{display:flex;align-items:center;justify-content:center;flex-wrap:wrap;gap:4px;padding:4px 8px;flex-shrink:0;font-size:11px;background:var(--rp-v-card,#f1ece9);color:var(--rp-v-text,#44353d)}',
'#rp-phone #rp-screen .rp-search-navigation button{font-size:11px;padding:4px 7px;min-height:32px}',
'#rp-phone #rp-screen .rp-long-image-preview{display:block;width:100%;height:auto;border-radius:10px}',

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
const fields = ['threads','notifications','sync','moments','diary','xhsFeed','darkMode','themeSettings','nameAliases','avatars','wallpaper','bankData','blocklist','gameState','gomoku','sudoku','themeStudioMessages','composeDraft','themeStudioDraft','diaryDraft','xhsPostDraft','commentDrafts','readingPositions','deletedContacts','recovery','phoneTools'];
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

// Preserve damaged tool data before repairing its usable projection.
function validPhoneReminder(value) {
  if(!Number.isFinite(value))return false;
  const date=new Date(value),year=date.getUTCFullYear();
  return Number.isFinite(date.getTime())&&year>=1&&year<=9999;
}
function normalizePhoneToolData(value,recovery) {
  const preserve=(path,value)=>recovery.push({path,value:clone(value)});
  if(value!==undefined&&!object(value))preserve('phoneTools',value);
  const result=object(value)?clone(value):{};
  for(const field of ['bookmarks','agreements']) {
    if(!Array.isArray(result[field])){if(result[field]!==undefined)preserve('phoneTools.'+field,result[field]);result[field]=[];}
    result[field]=result[field].filter((entry,index)=>{
      const path='phoneTools.'+field+'['+index+']';
      if(!object(entry)||typeof entry.threadId!=='string'||typeof entry.messageId!=='string'||typeof entry.text!=='string'||(field==='agreements'&&(typeof entry.id!=='string'||typeof entry.title!=='string'))){preserve(path,entry);return false;}
      if(field==='agreements') {
        if(entry.dueAt!=null&&!validPhoneReminder(entry.dueAt)){preserve(path+'.dueAt',entry.dueAt);entry.dueAt=null;}
        for(const name of ['createdAt','updatedAt','remindedDue'])if(entry[name]!=null&&!validPhoneReminder(entry[name])){preserve(path+'.'+name,entry[name]);entry[name]=null;}
        if(entry.done!==undefined&&typeof entry.done!=='boolean'){preserve(path+'.done',entry.done);entry.done=false;}
      }
      return true;
    });
  }
  result.version=1;return result;
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
    for(const id of ['rp-phone-css','rp-custom-theme-style','rp-gomoku-css','rp-sudoku-css','rp-stickers-css','rp-shop-css'])scaleSheet(doc.getElementById(id));
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
          if(style?.matches?.('#rp-phone-css,#rp-custom-theme-style,#rp-gomoku-css,#rp-sudoku-css,#rp-stickers-css,#rp-shop-css'))sheets.add(style);
          for(const node of change.addedNodes)if(node.nodeType===1){
            if(node.matches('#rp-phone-css,#rp-custom-theme-style,#rp-gomoku-css,#rp-sudoku-css,#rp-stickers-css,#rp-shop-css'))sheets.add(node);
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
    const current=state();
    if(!object(current.phoneTools)||!Array.isArray(current.phoneTools.bookmarks)||!Array.isArray(current.phoneTools.agreements))current.phoneTools=normalizePhoneToolData(current.phoneTools,current.recovery ||= []);
    return state().phoneTools;
  };
  const info=text=>api.notify(text);
  const node=(tag,cls,text)=>$(doc.createElement(tag)).addClass(cls||'').text(text??'');
  const button=(text,fn)=>node('button','rp-tools-button',text).attr('type','button').on('click',fn);
  const safeImage=value=>typeof value==='string' && /^(?:https?:\/\/|data:image\/(?:png|jpe?g|gif|webp|avif);|blob:|\/(?!\/))/.test(value) ? value : '';
  function snapshot(thread,message) {
    const text=message.type==='sticker'?'[表情包] '+(message.sticker?.name||''):message.type==='image'?'[图片]':message.type==='pending_image'?'[待生成图片]':message.type==='location'?'[位置] '+(message.place||''):message.type==='hongbao'||message.type==='group_hongbao'?'[红包] '+(message.amount||'')+' '+(message.note||''):String(message.text||message.voiceText||'[信息]');
    return {threadId:thread.id,threadName:thread.name,messageId:String(message.id),name:message.from==='user'?'我':message.name||thread.name,text,time:String(message.time||''),type:message.type||'text',...(message.type==='sticker'&&api.stickerImage?.(message)?{src:api.stickerImage(message)}:message.type==='image'&&safeImage(message.src)?{src:message.src}:{})};
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
  const conversation=createConversationFeatures({...api,node,button,info,toolsState,snapshot,ensureId,jump,safeImage,fontScale:()=>prefs.scale/100});
  function openThreadMenu() {
    const thread=state().threads[state().currentThread];if(!thread)return;
    const content=node('div').append(node('p','',thread.name),node('p','rp-feature-note','免打扰只关闭该聊天的消息横幅，消息、未读数和来电照常保留。'));
    const live=()=>state().threads[thread.id]===thread;
    api.dialog('聊天设置',content,[
      {label:thread.phonePinned?'取消置顶':'置顶聊天',run:()=>{if(live()){thread.phonePinned=!thread.phonePinned;thread.phonePrefsAt=Date.now();api.renderThreads();api.save();}}},
      {label:thread.phoneMuted?'关闭免打扰':'开启免打扰',run:()=>{if(live()){thread.phoneMuted=!thread.phoneMuted;thread.phonePrefsAt=Date.now();api.hideBanner();api.renderThreads();api.save();}}},
      {label:'消息收藏',run:()=>{openBookmarks(thread.id);return false;}},
      {label:'自动翻译'+(thread.phoneAutoTranslate?.enabled?'（已开启）':''),run:()=>{conversation.openAuto(thread);return false;}},
      {label:'聊天长图',run:()=>{conversation.openExport(thread);return false;}},
      {label:'剧情约定',run:()=>{conversation.openAgreements(thread.id);return false;}},{label:'关闭'}
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
      {label:'加入约定',run:()=>{if(live())conversation.addAgreement(thread,message);return false;}},
      {label:'导出长图',run:()=>{if(live())conversation.openExport(thread,message);return false;}},
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
    conversation.refreshSearch();
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
    const recovery=state().recovery ||= [];
    state().phoneTools=normalizePhoneToolData(saved.phoneTools,recovery);
    for(const thread of Object.values(state().threads||{})){
      const auto=thread.phoneAutoTranslate;
      if(auto!==undefined&&(!object(auto)||typeof auto.enabled!=='boolean'||!Array.isArray(auto.known)||auto.known.some(k=>typeof k!=='string'))){recovery.push({path:'threads.'+thread.id+'.phoneAutoTranslate',value:clone(auto)});thread.phoneAutoTranslate={enabled:false,known:[],changedAt:Date.now()};}
      thread.pendingQuotes=quotes(thread);
      if(!object(thread.draftQuote))delete thread.draftQuote;
      else thread.draftQuote=clean(thread.draftQuote);
    }
    renderReply();
  }
  function mergeContacts(keep,drop) {
    conversation.mergeContacts(keep,drop);
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
    if(value.origin.account!==api.account()||!(value.origin.slot===state().chatId||api.compatibleSlot?.(value.origin.slot)))throw new Error('请切换到备份对应的账号和聊天后重试。');
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
    if(value.data.phoneTools?.agreements!==undefined&&(!Array.isArray(value.data.phoneTools.agreements)||value.data.phoneTools.agreements.some(e=>!object(e)||typeof e.id!=='string'||typeof e.threadId!=='string'||typeof e.messageId!=='string'||typeof e.text!=='string'||typeof e.title!=='string'||(e.dueAt!=null&&!validPhoneReminder(e.dueAt)))))throw new Error('备份约定清单格式不完整。');
    for(const t of Object.values(value.data.threads))if(t.phoneAutoTranslate!==undefined&&(!object(t.phoneAutoTranslate)||typeof t.phoneAutoTranslate.enabled!=='boolean'||!Array.isArray(t.phoneAutoTranslate.known)||t.phoneAutoTranslate.known.some(k=>typeof k!=='string')))throw new Error('备份自动翻译设置格式不完整。');
    if(value.data.sudoku!=null&&(!object(value.data.sudoku)||(value.data.sudoku.round!=null&&(!object(value.data.sudoku.round)||!['givens','values','notes','helped'].every(k=>Array.isArray(value.data.sudoku.round[k])&&value.data.sudoku.round[k].length===81)))))throw new Error('备份数独记录格式不完整。');
    if(value.data.gomoku!=null&&(!object(value.data.gomoku)||!Array.isArray(value.data.gomoku.log)||value.data.gomoku.log.some(m=>!object(m)||typeof m.text!=='string'||!['user','char','system'].includes(m.role))||(value.data.gomoku.round!=null&&(!object(value.data.gomoku.round)||!Array.isArray(value.data.gomoku.round.moves)))))throw new Error('备份五子棋记录格式不完整。');
    value.data=portable(value.data);return value;
  }
  function planMerge(backup, current=api.snapshot()) {
    if(backup.origin.account!==api.account()||!(backup.origin.slot===state().chatId||api.compatibleSlot?.(backup.origin.slot)))throw new Error('备份与当前账号或聊天不一致。');
    const result=clone(current),source=backup.data,stats={contacts:0,messages:0,moments:0,diary:0,xhs:0,comments:0,bookmarks:0,agreements:0,themeMessages:0,skipped:0};
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
    result.phoneTools.agreements ||= [];
    const agreementIds=new Set(result.phoneTools.agreements.map(e=>e.id));
    for(const e of source.phoneTools?.agreements||[])if(object(e)&&typeof e.id==='string'&&!agreementIds.has(e.id)){result.phoneTools.agreements.push(clone(e));agreementIds.add(e.id);stats.agreements++;}
    // Importing history must never start automatic translation requests.
    for(const t of Object.values(result.threads))if(t.phoneAutoTranslate){if(!current.threads?.[t.id])t.phoneAutoTranslate.enabled=false;else t.phoneAutoTranslate.known=[...new Set([...(t.phoneAutoTranslate.known||[]),...t.messages.map(m=>{if(m.id==null)m.id=uid();return String(m.id);})])];}
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
    if(object(source.sudoku)&&source.sudoku.round&&!result.sudoku?.round){
      result.sudoku=clone(source.sudoku);result.sudoku.screen='home';stats.sudokuRound=1;
    }
    if(object(source.gomoku)){
      result.gomoku ||= {version:1,level:'standard',screen:'home',round:null,log:[],draft:''};
      result.gomoku.log ||= [];stats.gomokuMessages=0;
      mergeList(result.gomoku.log,source.gomoku.log||[],stats,'gomokuMessages');
      if(!result.gomoku.round&&source.gomoku.round){result.gomoku.round=clone(source.gomoku.round);result.gomoku.screen='home';stats.gomokuRound=1;}
      if(!result.gomoku.draft&&typeof source.gomoku.draft==='string')result.gomoku.draft=source.gomoku.draft;
    }
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
    content.append(node('p','','将补充 '+s.contacts+' 个联系人、'+s.messages+' 条消息、'+s.moments+' 条朋友圈、'+s.diary+' 篇日记、'+s.xhs+' 条笔记、'+s.comments+' 条评论、'+s.bookmarks+' 条收藏、'+s.agreements+' 条约定及'+s.themeMessages+' 条主题对话'+(s.gomokuMessages?'、'+s.gomokuMessages+' 条五子棋对话':'')+(s.gomokuRound?'及缺失的五子棋棋局':'')+(s.sudokuRound?'及缺失的数独局面':'')+'。缺少的草稿一并补充。'),node('p','rp-feature-note','同一记录保留当前内容；现有主题、设置、点赞、阅读位置及游戏进度保持。已删除或拉黑的联系人保持原状。不会重发历史待同步操作。'),node('p','rp-feature-note','跳过不适合当前存档的记录：'+s.skipped+'。恢复前会先自动保存一份可下载备份。'),status);
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
    conversation.mount();
    mountedRuntime=api.runtime();const ns='.mochiPhoneTools'+uid();
    $(doc).on('keydown'+ns,event=>{if(event.key==='Escape'&&state().currentView==='thread'&&!doc.getElementById('rp-feature-layer')){const thread=state().threads[state().currentThread];if(thread?.draftQuote){delete thread.draftQuote;api.save();renderReply();}}});
    unbind=()=>{$(doc).off(ns);unbind=null;};mountedRuntime.own(unbind);renderReply();
  }
  return {conversation,mount,applyReading,openReading,refreshTypography,openThreadMenu,openBookmarks,openMessage,renderReply,decorateMessages,decorateThreads,isMuted,quotes,quoteText,normalizeSaved,mergeContacts,makeBackup,parseBackup,planMerge,restoreBackup,previewBackup,openBackup,exportBackup,portable,signature,prefs:()=>({...prefs}),snapshot,toolsState};
}


// Conversation helpers stay local to the current account/chat and never submit host messages.
export function createConversationFeatures(api) {
  const {$,document:doc,state,node,button,info}=api;
  const win=doc.defaultView;
  const supported=['source','cached','translate','translationBusy','avatar'].every(k=>typeof api[k]==='function');
  let activeSearch=null,searchJumping=false,autoBusy=false,mounted=null,exportCleanup=null;
  const key=m=>api.ensureId(m);
  const liveThread=t=>state().threads[t.id]===t;
  const typeOf=m=>/image|sticker/.test(m.type||'')?'image':/voice/.test(m.type||'')?'voice':/hongbao/.test(m.type||'')?'hongbao':m.type==='location'?'location':'text';
  const translated=m=>api.cached(m)?.text||'';
  const searchable=m=>[m.text,m.voiceText,m.note,m.place,m.amount,translated(m)].filter(v=>v!=null).join(' ');
  const sender=(t,m)=>m.from==='user'?'我':m.name||t.name;
  const sourceName=e=>typeof e.name==='string'&&e.name?e.name:'原消息';
  const sourceThread=e=>typeof e.threadName==='string'&&e.threadName?e.threadName:state().threads[e.threadId]?.name||'原会话';
  const senderId=(t,m)=>JSON.stringify(m.from==='user'?['user']:['person',String(m.name||t.name)]);
  const validEntry=e=>object(e)&&typeof e.id==='string'&&typeof e.threadId==='string'&&typeof e.messageId==='string'&&typeof e.text==='string'&&typeof e.title==='string';
  const agreements=()=>api.toolsState().agreements;
  const origin=e=>{const t=state().threads[e.threadId];return {thread:t,message:t?.messages?.find(m=>String(m.id)===e.messageId)};};
  const field=(label,control)=>node('label','rp-conv-field').append(node('span','',label),control);
  const note=text=>node('p','rp-feature-note',text);
  const checkbox=(id,label,checked=false)=>{const input=node('input').attr({type:'checkbox',id}).prop('checked',checked);return {input,label:node('label','rp-conv-check').append(input,node('span','',label))};};
  const sessionValid=token=>token.valid()&&doc.visibilityState!=='hidden';
  function isVisible(t) {
    const phone=doc.getElementById('rp-phone');
    return liveThread(t)&&state().currentView==='thread'&&state().currentThread===t.id&&doc.visibilityState!=='hidden'&&phone&&win.getComputedStyle(phone).display!=='none'&&!api.blocked(t,state());
  }
  function setAuto(t,enabled) {
    if(!liveThread(t))return;
    t.phoneAutoTranslate={enabled:!!enabled,known:(t.messages||[]).map(key),changedAt:Date.now()};
    api.save();
  }
  function openAuto(t=state().threads[state().currentThread]) {
    if(!supported){info('请刷新酒馆后使用此功能。');return;}
    if(!t||!liveThread(t))return;
    const content=node('div').append(node('strong','',t.name),note('仅在打开此会话时，逐条把开启后收到的新外语文字或语音文字翻成中文，中文消息会跳过。使用当前翻译 API，可能产生费用；已有历史不会批量翻译。失败可点消息上的翻译按钮重试。离开会话或关闭开关后停止排队。'));
    const enabled=checkbox('rp-auto-translate-enabled','此会话自动翻译',t.phoneAutoTranslate?.enabled===true);
    content.append(enabled.label,note('关闭后重新开启，只处理重新开启后收到的新消息。'));
    const token=api.runtime().task();
    api.dialog('自动翻译',content,[{label:'取消'},{label:'保存',primary:true,run:()=>{if(token.valid()&&content[0].isConnected&&liveThread(t)&&enabled.input.prop('checked')!==(t.phoneAutoTranslate?.enabled===true))setAuto(t,enabled.input.prop('checked'));}}]);
  }
  async function pumpAuto() {
    if(!supported||autoBusy)return false;
    const t=state().threads[state().currentThread],config=t?.phoneAutoTranslate;
    if(!t||config?.enabled!==true||!Array.isArray(config.known)||!isVisible(t)||api.translationBusy())return false;
    const known=new Set(config.known);
    const m=t.messages.find(m=>m.from!=='user'&&['text','default','group_msg','voice','group_voice',''].includes(m.type||'')&&!known.has(key(m)));
    if(!m)return false;
    const id=key(m),source=api.source(m),token=api.runtime().task();
    const valid=()=>token.valid()&&isVisible(t)&&t.phoneAutoTranslate===config&&config.enabled&&t.messages.includes(m)&&api.source(m)===source;
    if(!source||source.length>8000||api.cached(m)){config.known.push(id);api.save();return true;}
    autoBusy=true;
    try {
      await api.translate({kind:'message',threadId:t.id,item:m},valid);
      // Canceled/edited messages remain eligible; failed requests never loop automatically.
      if(valid()&&!config.known.includes(id)){config.known.push(id);api.save();}
    } finally { autoBusy=false; }
    return true;
  }
  function searchMessages({query='',threadId='',member='',memberKey='',kind=''}={}) {
    const q=query.trim().toLocaleLowerCase(),matches=[];
    for(const t of Object.values(state().threads||{})) {
      if(threadId&&t.id!==threadId)continue;
      if(q&&!member&&!memberKey&&!kind&&String(t.name||'').toLocaleLowerCase().includes(q))matches.push({thread:t,message:null,text:'联系人 · '+(t.messages||[]).length+' 条信息'});
      for(const m of t.messages||[]) {
        if(memberKey&&senderId(t,m)!==memberKey||member&&sender(t,m)!==member||kind&&typeOf(m)!==kind)continue;
        const text=searchable(m);
        if(!q||text.toLocaleLowerCase().includes(q))matches.push({thread:t,message:m,text});
      }
    }
    return matches;
  }
  const resultLive=r=>liveThread(r.thread)&&(!r.message||r.thread.messages.includes(r.message));
  function clearSearch() {activeSearch=null;$('#rp-search-navigation').remove();}
  function paintSearch() {
    $('#rp-search-navigation').remove();
    const s=activeSearch;if(!s||!s.token.valid()){clearSearch();return;}
    const available=s.results.map((r,i)=>resultLive(r)?i:-1).filter(i=>i>=0);
    if(!available.length){clearSearch();return;}
    const before=available.filter(i=>i<s.index).at(-1),after=available.find(i=>i>s.index),position=available.indexOf(s.index);
    const bar=node('div','rp-search-navigation').attr({id:'rp-search-navigation','aria-label':'搜索结果导航'});
    const step=index=>{if(index!==undefined&&activeSearch===s){if(resultLive(s.results[index]))jumpResult(s.results,index);else paintSearch();}};
    bar.append(button('上一处',()=>step(before)).prop('disabled',before===undefined),node('span','',position>=0?String(position+1)+' / '+available.length:'原结果已删除 · '+available.length+'条可跳转'),button('下一处',()=>step(after)).prop('disabled',after===undefined),button('×',clearSearch).attr('aria-label','关闭搜索结果导航'));
    bar.insertBefore('#rp-bubbles');
  }
  function jumpResult(results,index) {
    const r=results[index];if(!r||!resultLive(r)){info('该内容已有变化，请重新搜索。');return false;}
    activeSearch={results,index,token:api.runtime().task()};
    searchJumping=true;
    try {
      if(r.message)api.jump(api.snapshot(r.thread,r.message));else {api.closeDialog();api.openThread(r.thread.id);}
    } finally {searchJumping=false;}
    paintSearch();return true;
  }
  function openSearch(initialThread='') {
    clearSearch();const token=api.runtime().task();
    const input=node('input','rp-feature-input').attr({type:'search',id:'rp-search-query','aria-label':'搜索原文或译文',placeholder:'搜索原文、译文或联系人',autocomplete:'off'});
    const scope=node('select','rp-tools-select').attr({id:'rp-search-scope','aria-label':'搜索会话'}).append(node('option','','全部会话').val(''));
    for(const t of Object.values(state().threads||{}))scope.append(node('option','',t.name+(t.type==='group'?'（群聊）':'')).val(t.id));
    scope.val(state().threads[initialThread]?initialThread:'');
    const member=node('select','rp-tools-select').attr({id:'rp-search-member','aria-label':'搜索发言者'});
    const kind=node('select','rp-tools-select').attr({id:'rp-search-type','aria-label':'搜索内容类型'});
    for(const[v,label]of [['','全部类型'],['text','文字'],['image','图片'],['voice','语音'],['hongbao','红包'],['location','位置']])kind.append(node('option','',label).val(v));
    const status=note('输入关键词，或选择内容类型。'),list=node('div','rp-feature-results'),content=node('div').append(input,field('范围',scope),field('发言者',member),field('类型',kind),status,list);
    let page=0,lastResults=[];
    function members() {const old=member.val(),names=new Map();for(const t of Object.values(state().threads||{})){if(scope.val()&&scope.val()!==t.id)continue;for(const m of t.messages||[])names.set(senderId(t,m),sender(t,m)+(m.from!=='user'&&sender(t,m)==='我'?'（联系人）':''));}member.empty().append(node('option','','全部发言者').val(''));for(const[id,name]of names)member.append(node('option','',name).val(id));member.val(names.has(old)?old:'');}
    function render() {
      if(!token.valid()||!content[0].isConnected)return;
      list.empty();const query=String(input.val()||'').trim();
      if(!query&&!member.val()&&!kind.val()){status.text('输入关键词，或选择发言者、内容类型。');return;}
      lastResults=searchMessages({query,threadId:scope.val(),memberKey:member.val(),kind:kind.val()});
      page=Math.max(0,Math.min(page,Math.ceil(lastResults.length/40)-1));
      status.text('找到 '+lastResults.length+' 条'+(lastResults.length?' · 第 '+(page+1)+' 页':''));
      for(let i=page*40;i<Math.min(lastResults.length,(page+1)*40);i++) {
        const r=lastResults[i];if(r.message)key(r.message);
        const item=node('button','rp-feature-result').attr('type','button').append(node('strong','',r.thread.name+(r.message?' · '+sender(r.thread,r.message)+(r.message.time?' · '+r.message.time:''):'')),node('span','rp-feature-preview',r.text.slice(0,180)));
        item.on('click',()=>{if(token.valid())jumpResult(lastResults,i);});list.append(item);
      }
      if(lastResults.length>40)list.append(node('div','rp-tools-buttons').append(button('上一页',()=>{page--;render();}).prop('disabled',page===0),button('下一页',()=>{page++;render();}).prop('disabled',(page+1)*40>=lastResults.length)));
    }
    members();scope.on('change',()=>{page=0;members();render();});member.add(kind).on('change',()=>{page=0;render();});
    let searchTimer=null;
    input.on('input compositionend',event=>{if(event.originalEvent?.isComposing)return;page=0;if(searchTimer)api.runtime().clearTimer(searchTimer);searchTimer=api.runtime().timer(()=>{searchTimer=null;render();},120,false);});
    input.on('keydown',event=>{if(event.key==='Enter'&&!event.originalEvent?.isComposing&&event.keyCode!==229){event.preventDefault();if(searchTimer)api.runtime().clearTimer(searchTimer);render();}});
    api.dialog('搜索',content,[{label:'关闭'}]);render();
  }
  function addAgreement(t,m) {
    if(!liveThread(t)||!t.messages.includes(m))return;
    key(m);editAgreement(null,{...api.snapshot(t,m),id:uid(),title:api.snapshot(t,m).text.slice(0,100),createdAt:Date.now(),done:false,dueAt:null});
  }
  function editAgreement(entry,draft=entry) {
    const token=api.runtime().task(),content=node('div'),title=node('input','rp-feature-input').attr({id:'rp-agreement-title',maxlength:160,'aria-label':'约定内容'}).val(draft.title),due=node('input','rp-feature-input').attr({id:'rp-agreement-due',type:'datetime-local','aria-label':'提醒时间'}),status=note('');
    if(validPhoneReminder(draft.dueAt)){const d=new Date(draft.dueAt);due.val(new Date(d.getTime()-d.getTimezoneOffset()*60000).toISOString().slice(0,16));}
    content.append(field('约定',title),field('提醒时间（可选）',due),note('按设备本地时间设置；仅在酒馆页面打开、可见且处于当前聊天时提示。'),node('div','rp-conv-source',sourceName(draft)+'：'+draft.text),status);
    api.dialog(entry?'编辑约定':'加入剧情约定',content,[{label:'取消'},{label:'保存',primary:true,run:()=>{
      if(!token.valid()||!content[0].isConnected)return;
      const text=String(title.val()||'').trim(),value=String(due.val()||''),time=value?new Date(value).getTime():null;
      if(!text||text.length>160){status.text('请输入160字以内的约定。');return false;}
      if(value&&!validPhoneReminder(time)){status.text('请选择有效的提醒时间。');return false;}
      if(entry&&!agreements().includes(entry)){status.text('该约定已不存在，请重新打开清单。');return false;}
      const next={...draft,title:text,dueAt:time,updatedAt:Date.now(),remindedDue:entry?.dueAt===time?entry.remindedDue:null};
      if(entry)Object.assign(entry,next);else agreements().push(next);
      api.save();openAgreements(draft.threadId);return false;
    }}]);
  }
  function openAgreements(filter='') {
    const token=api.runtime().task(),scope=node('select','rp-tools-select').attr({'aria-label':'约定会话',id:'rp-agreement-scope'}).append(node('option','','全部会话').val('')),statusFilter=node('select','rp-tools-select').attr({'aria-label':'约定状态',id:'rp-agreement-status'}).append(node('option','','待完成').val('open'),node('option','','已完成').val('done'),node('option','','全部').val('all')),list=node('div'),content=node('div').append(field('范围',scope),field('状态',statusFilter),list);
    const names=new Map(agreements().filter(validEntry).map(e=>[e.threadId,sourceThread(e)]));for(const[id,name]of names)scope.append(node('option','',name).val(id));scope.val(names.has(filter)?filter:'');
    let limit=50;
    function render() {
      if(!token.valid())return;list.empty();
      const entries=agreements().filter(e=>validEntry(e)&&(!scope.val()||scope.val()===e.threadId)&&(statusFilter.val()==='all'||!!e.done===(statusFilter.val()==='done'))).slice().sort((a,b)=>(Number.isFinite(a.dueAt)?a.dueAt:Infinity)-(Number.isFinite(b.dueAt)?b.dueAt:Infinity)||b.createdAt-a.createdAt);
      if(!entries.length)list.append(note('暂无符合条件的约定。在消息“⋯”中选择“加入约定”。'));
      for(const entry of entries.slice(0,limit)) {
        const row=node('div','rp-saved-message rp-agreement'),live=origin(entry),complete=checkbox('rp-agreement-'+entry.id,entry.title,!!entry.done);
        complete.input.on('change',()=>{if(!token.valid()||!agreements().includes(entry))return;entry.done=complete.input.prop('checked');entry.updatedAt=Date.now();api.save();render();});
        row.append(complete.label,note(sourceThread(entry)+(Number.isFinite(entry.dueAt)?' · '+new Date(entry.dueAt).toLocaleString():'')),node('div','rp-conv-source',sourceName(entry)+'：'+entry.text));
        if(!live.message)row.append(note('原消息已删除，约定快照仍保留。'));
        row.append(node('div','rp-tools-buttons').append(button('原消息',()=>{if(token.valid()&&agreements().includes(entry))api.jump(entry);}).prop('disabled',!live.message),button('编辑',()=>{if(token.valid()&&agreements().includes(entry))editAgreement(entry);}),button('删除',()=>{
          api.dialog('删除约定',node('p','',entry.title),[{label:'取消',run:()=>{openAgreements(filter);return false;}},{label:'删除',danger:true,run:()=>{const items=agreements(),i=items.indexOf(entry);if(i>=0){items.splice(i,1);api.save();}openAgreements(filter);return false;}}]);
        })));list.append(row);
      }
      if(entries.length>limit)list.append(button('再显示50条',()=>{limit+=50;render();}));
    }
    scope.add(statusFilter).on('change',()=>{limit=50;render();});api.dialog('剧情约定',content,[{label:'关闭'}]);render();
  }
  function checkReminders(now=Date.now()) {
    if(doc.visibilityState==='hidden'||!state().chatId||!api.runtime().task().valid())return 0;
    const due=agreements().filter(e=>validEntry(e)&&!e.done&&Number.isFinite(e.dueAt)&&e.dueAt<=now&&e.remindedDue!==e.dueAt);
    if(!due.length)return 0;
    for(const e of due)e.remindedDue=e.dueAt;
    api.save();info('剧情约定到时：'+due.slice(0,3).map(e=>e.title).join('；')+(due.length>3?' 等 '+due.length+' 项':''));return due.length;
  }
  function exportRecords(t,messages,options={}) {
    if(!liveThread(t)||!messages.length||messages.length>30||messages.some(m=>!t.messages.includes(m)))throw Error('请选择1–30条仍存在的消息。');
    const aliases=new Map();let count=0;
    return messages.map(m=>{
      const real=sender(t,m),aliasKey=m.from==='user'?'user':'person:'+real;if(!aliases.has(aliasKey))aliases.set(aliasKey,m.from==='user'?'我':t.type==='group'?'成员'+(++count):'对方');
      const row=[...(doc.getElementById('rp-bubbles')?.children||[])].find(e=>Number(e.dataset.rpReadingIndex)===t.messages.indexOf(m)),bubble=row?.querySelector('.rp-bubble'),style=bubble?win.getComputedStyle(bubble):null;
      return {name:options.hideNames?aliases.get(aliasKey):real,from:m.from==='user'?'user':'incoming',text:api.snapshot(t,m).text,time:options.time===false?'':String(m.time||''),translation:options.translations===false?'':translated(m),imageExpected:['image','sticker'].includes(m.type),image:m.type==='sticker'?api.safeImage(api.snapshot(t,m).src):m.type==='image'?api.safeImage(m.src):'',avatar:options.hideNames?'':api.safeImage(api.avatar(m.from==='user'?'user':m.name||t.name)),background:style?.backgroundColor,color:style?.color};
    });
  }
  function loadImage(src,valid) {
    if(!src||!valid())return Promise.resolve(null);
    return new Promise(resolve=>{const image=new win.Image();let settled=false;const timer=win.setTimeout(()=>finish(null),6000);function finish(value){if(settled)return;settled=true;win.clearTimeout(timer);image.onload=image.onerror=null;resolve(valid()?value:null);}image.crossOrigin='anonymous';image.onload=()=>finish(image.naturalWidth?image:null);image.onerror=()=>finish(null);image.src=src;});
  }
  function wrapLines(ctx,text,width) {
    const lines=[];
    for(const paragraph of String(text||'').replace(/\r\n?/g,'\n').split('\n')) {
      let line='';
      for(const word of paragraph.match(/\s+|[^\s]+/gu)||[]) {
        if(ctx.measureText(line+word).width<=width){line+=word;continue;}
        if(word.trim()&&ctx.measureText(word).width<=width){if(line)lines.push(line);line=word;continue;}
        const chars=win.Intl?.Segmenter?Array.from(new win.Intl.Segmenter(undefined,{granularity:'grapheme'}).segment(word),s=>s.segment):Array.from(word);
        for(const char of chars){if(line&&ctx.measureText(line+char).width>width){lines.push(line);line=char;}else line+=char;}
      }
      lines.push(line);
    }
    return lines;
  }
  async function makeLongImage(records,options,valid) {
    if(!records.length||records.length>30)throw Error('请选择1–30条消息。');
    if(records.reduce((n,r)=>n+r.text.length+r.translation.length,0)>40000)throw Error('选中文字较多，请减少消息后导出。');
    const canvas=doc.createElement('canvas'),ctx=canvas.getContext('2d');if(!ctx)throw Error('当前浏览器不支持生成图片。');
    const phone=doc.getElementById('rp-phone'),style=win.getComputedStyle(phone),panel=doc.querySelector('#rp-feature-layer .rp-feature-panel'),surface=panel?win.getComputedStyle(panel).backgroundColor:'#fffaf8',textColor=panel?win.getComputedStyle(panel).color:'#493e46',font=Math.round(26*api.fontScale()),lineHeight=Math.round(font*1.5),fontFamily=style.fontFamily||'sans-serif',width=720,pad=28,avatarSize=44,bubbleWidth=548;
    ctx.font=font+'px '+fontFamily;
    const prepared=[];let height=108,missing=0;
    for(const r of records) {
      if(!valid())return null;
      const image=await loadImage(r.image,valid),avatar=await loadImage(r.avatar,valid);if(!valid())return null;
      if((r.imageExpected||r.image)&&!image)missing++;if(r.avatar&&!avatar)missing++;
      const lines=wrapLines(ctx,r.text,bubbleWidth-32),translation=r.translation?wrapLines(ctx,r.translation,bubbleWidth-32):[],imageScale=image?Math.min((bubbleWidth-32)/image.naturalWidth,420/image.naturalHeight):0,imageWidth=image?image.naturalWidth*imageScale:0,imageHeight=image?image.naturalHeight*imageScale:0;
      const body=lines.length*lineHeight+32+(imageHeight?imageHeight+12:0),tr=translation.length?translation.length*lineHeight+28:0,itemHeight=32+body+(tr?tr+6:0)+(r.time?28:0)+26;
      height+=itemHeight;prepared.push({r,image,avatar,lines,translation,imageWidth,imageHeight,body,tr,itemHeight});
    }
    if(height>16000)throw Error('长图超过16000像素，请减少选中消息后重试。');
    canvas.width=width;canvas.height=height+pad;ctx.fillStyle=surface;ctx.fillRect(0,0,width,canvas.height);ctx.textBaseline='top';
    const round=(x,y,w,h,color,radius=18)=>{ctx.fillStyle=color;ctx.beginPath();if(ctx.roundRect)ctx.roundRect(x,y,w,h,radius);else ctx.rect(x,y,w,h);ctx.fill();};
    const drawText=(lines,x,y,color)=>{ctx.fillStyle=color;ctx.font=font+'px '+fontFamily;for(const line of lines){ctx.fillText(line,x,y);y+=lineHeight;}};
    ctx.fillStyle=textColor;ctx.font='600 '+Math.round(font*1.15)+'px '+fontFamily;const title=wrapLines(ctx,options.hideNames?'聊天片段':String(options.title||'聊天片段'),width-pad*2);ctx.fillText(title[0]+(title.length>1?'…':''),pad,pad);ctx.font='20px '+fontFamily;ctx.fillText(records.length+' 条消息',pad,66);
    let y=108;
    for(const p of prepared) {
      const {r}=p,isUser=r.from==='user',x=isUser?width-pad-avatarSize-14-bubbleWidth:pad+avatarSize+14,ax=isUser?width-pad-avatarSize:pad;
      round(ax,y+30,avatarSize,avatarSize,'#ede8e6',22);
      if(p.avatar){ctx.save();ctx.beginPath();ctx.arc(ax+22,y+52,22,0,Math.PI*2);ctx.clip();ctx.drawImage(p.avatar,ax,y+30,avatarSize,avatarSize);ctx.restore();}else {ctx.fillStyle=textColor;ctx.font='20px '+fontFamily;ctx.fillText(Array.from(r.name).slice(0,2).join(''),ax+5,y+42);}
      ctx.fillStyle=textColor;ctx.font='20px '+fontFamily;const name=wrapLines(ctx,r.name,bubbleWidth)[0];ctx.fillText(name,x,y+2);
      const color=r.color&&r.color!=='rgba(0, 0, 0, 0)'?r.color:textColor,bg=r.background&&r.background!=='rgba(0, 0, 0, 0)'?r.background:surface;
      round(x,y+30,bubbleWidth,p.body,bg);drawText(p.lines,x+16,y+46,color);
      if(p.image)ctx.drawImage(p.image,x+16+(bubbleWidth-32-p.imageWidth)/2,y+46+p.lines.length*lineHeight,p.imageWidth,p.imageHeight);
      let bottom=y+30+p.body;
      if(p.tr){round(x,bottom+6,bubbleWidth,p.tr,bg,12);drawText(p.translation,x+16,bottom+20,color);bottom+=p.tr+6;}
      if(r.time){ctx.fillStyle=textColor;ctx.font='18px '+fontFamily;ctx.fillText(r.time,x,bottom+8);}
      y+=p.itemHeight;
    }
    if(!valid())return null;
    const blob=await new Promise(resolve=>canvas.toBlob(resolve,'image/png'));if(!valid())return null;if(!blob)throw Error('生成图片失败，请减少消息后重试。');
    return {blob,width:canvas.width,height:canvas.height,missing};
  }
  function openExport(t=state().threads[state().currentThread],first=null,restore=null) {
    if(!supported){info('请刷新酒馆后使用此功能。');return;}
    if(!t||!liveThread(t))return;
    const token=api.runtime().task(),selected=new Set((restore?.messages||(first?[first]:[])).filter(m=>t.messages.includes(m))),content=node('div'),list=node('div'),status=note('选择1–30条消息，按原顺序生成长图。'),query=node('input','rp-feature-input').attr({type:'search',id:'rp-export-search',placeholder:'筛选要选择的消息','aria-label':'筛选导出消息'}).val(restore?.query||''),hide=checkbox('rp-export-hide','隐藏姓名与头像（正文保留）',!!restore?.options?.hideNames),translations=checkbox('rp-export-translations','包含已有译文',restore?.options?.translations!==false),time=checkbox('rp-export-time','包含时间',restore?.options?.time!==false);
    let page=restore?.page||0,running=false;
    function render() {
      list.empty();const q=String(query.val()||'').trim().toLocaleLowerCase(),messages=t.messages.filter(m=>!q||searchable(m).toLocaleLowerCase().includes(q));page=Math.max(0,Math.min(page,Math.ceil(messages.length/30)-1));
      status.text('已选 '+selected.size+' / 30 条 · 第 '+(page+1)+' 页');
      for(const m of messages.slice(page*30,(page+1)*30)) {
        const choice=checkbox('rp-export-select-'+t.messages.indexOf(m),sender(t,m)+(m.time?' · '+m.time:'')+'：'+api.snapshot(t,m).text.slice(0,110),selected.has(m));
        choice.input.on('change',()=>{if(choice.input.prop('checked')){if(selected.size>=30){choice.input.prop('checked',false);status.text('最多选择30条，请先取消部分消息。');return;}selected.add(m);}else selected.delete(m);status.text('已选 '+selected.size+' / 30 条');});list.append(choice.label);
      }
      if(messages.length>30)list.append(node('div','rp-tools-buttons').append(button('上一页',()=>{page--;render();}).prop('disabled',page===0),button('下一页',()=>{page++;render();}).prop('disabled',(page+1)*30>=messages.length)));
    }
    content.append(note(t.name),node('div','rp-tools-buttons').append(button('选最近10条',()=>{selected.clear();for(const m of t.messages.slice(-10))selected.add(m);page=Math.floor(Math.max(0,t.messages.length-1)/30);query.val('');render();}),button('清空选择',()=>{selected.clear();render();})),hide.label,translations.label,time.label,query,status,list);
    query.on('input',()=>{page=0;render();});api.dialog('聊天长图',content,[{label:'关闭'},{label:'生成预览',primary:true,run:()=>{
      if(running)return false;if(!token.valid()||!liveThread(t))return;
      const messages=t.messages.filter(m=>selected.has(m)),options={hideNames:hide.input.prop('checked'),translations:translations.input.prop('checked'),time:time.input.prop('checked'),title:t.name};
      let records;try{records=exportRecords(t,messages,options);}catch(e){status.text(e.message);return false;}
      const signature=JSON.stringify(records),valid=()=>token.valid()&&content[0].isConnected&&liveThread(t)&&state().currentThread===t.id;
      running=true;content.find('input,select,button').prop('disabled',true);status.text('正在生成图片…');
      void makeLongImage(records,options,valid).then(result=>{
        if(!valid()||!result)return;
        if(JSON.stringify(exportRecords(t,messages,options))!==signature)throw Error('选中消息已有变化，请重新生成。');
        showExportPreview(result,options,t,()=>openExport(t,null,{messages,options,query:String(query.val()||''),page}));
      }).catch(e=>{if(valid())status.text(e.message||'生成失败，请重试。');}).finally(()=>{running=false;if(content[0].isConnected)content.find('input,select,button').prop('disabled',false);});return false;
    }}]);render();
  }
  function showExportPreview(result,options,t,back) {
    exportCleanup?.();const url=win.URL.createObjectURL(result.blob),content=node('div').append(node('img','rp-long-image-preview').attr({src:url,alt:'聊天长图预览'}),note(result.width+' × '+result.height+(result.missing?' · '+result.missing+' 张图片或头像无法读取，已保留文字或占位。':'')),note('手机浏览器也可长按预览图片保存。'));
    let released=false,downloaded=false;const cleanup=()=>{if(released)return;released=true;observer.disconnect();if(downloaded)win.setTimeout(()=>win.URL.revokeObjectURL(url),30000);else win.URL.revokeObjectURL(url);if(exportCleanup===cleanup)exportCleanup=null;};
    const observer=new win.MutationObserver(()=>{if(!content[0].isConnected)cleanup();});
    api.dialog('长图预览',content,[{label:'返回选择',run:()=>{back();return false;}},{label:'保存图片',primary:true,run:()=>{const a=doc.createElement('a');a.href=url;a.download='MochiPhone-chat-'+new Date().toISOString().replace(/[:.]/g,'-')+'.png';doc.body.append(a);try{downloaded=true;a.click();}catch(_){info('请长按预览图片，选择保存。');}finally{a.remove();}return false;}}]);observer.observe(doc.documentElement,{childList:true,subtree:true});exportCleanup=cleanup;
  }
  function mergeContacts(keep,drop) {
    for(const e of agreements())if(e.threadId===drop.id){e.threadId=keep.id;e.threadName=keep.name;}
    const a=keep.phoneAutoTranslate,b=drop.phoneAutoTranslate;
    if(a||b){const chosen=(b?.changedAt||0)>(a?.changedAt||0)?b:a;keep.phoneAutoTranslate={...chosen,known:[...new Set([...(a?.known||[]),...(b?.known||[]),...(keep.messages||[]).map(key),...(drop.messages||[]).map(key)])]};}
  }
  function onOpen(id) {if(!searchJumping&&activeSearch&&activeSearch.results[activeSearch.index]?.thread.id!==id)clearSearch();}
  function onNavigate(view) {if(view!=='thread')clearSearch();}
  function reset() {clearSearch();exportCleanup?.();}
  function mount() {
    if(mounted===api.runtime())return;mounted=api.runtime();
    const slot=$('#rp-settings-bookmark-slot');
    if(!doc.getElementById('rp-settings-agreements')){
      const copy=node('span','rp-settings-copy').append(node('span','rp-settings-label','剧情约定'),node('span','rp-settings-hint','手动记录约定、完成状态与提醒'));
      node('button','rp-settings-item').attr({id:'rp-settings-agreements',type:'button'}).append(copy,node('span','rp-settings-chevron','›').attr('aria-hidden','true')).on('click',()=>openAgreements()).appendTo(slot);
    }
    mounted.timer(()=>{void pumpAuto();checkReminders();},1200,true,[],'lifetime');mounted.own(reset);
  }
  return {mount,reset,onOpen,onNavigate,refreshSearch:paintSearch,setAuto,openAuto,pumpAuto,searchMessages,openSearch,clearSearch,addAgreement,editAgreement,openAgreements,checkReminders,agreements,exportRecords,wrapLines,makeLongImage,openExport,mergeContacts};
}
