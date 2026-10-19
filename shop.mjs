import {INGREDIENTS,RECIPES,EQUIPMENT,DECOR,REGULARS,capacity,stockLimit,money,profit,priceRange} from './shop-engine.mjs?v=20261019-shop-multicard-68';
import {createShopClient} from './shop-client.mjs?v=20261019-shop-multicard-68';
import {shopPrompt} from './shop-dialogue.mjs?v=20261019-shop-multicard-68';

const P='#rp-phone #rp-screen #rp-view-shop';
export const SHOP_CSS=`
${P},#rp-phone.rp-art-icons.rp-shop-open #rp-frame #rp-screen #rp-view-shop.rp-view{display:none;flex-direction:column;overflow:hidden!important;background:#f8f5ee!important;color:#44372f!important;isolation:isolate;font-family:inherit;font-weight:400;font-style:normal;--shop-muted:#82756a;--shop-line:#ded6c9;}
${P} *{box-sizing:border-box;}
${P} [hidden]{display:none!important;}
${P} button,${P} input,${P} textarea,${P} select{font-family:inherit;font-style:normal;font-weight:400;color:inherit;box-shadow:none;}
${P} button{touch-action:manipulation;cursor:pointer;background:transparent!important;border:0!important;padding:8px;min-height:40px;font-size:14px;line-height:1.5;white-space:normal;word-break:break-word;}
${P} button:disabled{opacity:.45;cursor:default;}
${P} .shop-nav{position:relative;flex:0 0 82px;min-height:82px;padding:42px 12px 0;display:flex;align-items:center;gap:4px;z-index:3;}
${P} .shop-back{flex:0 0 36px;width:36px;padding:0;font-size:28px;}
${P} .shop-nav-title{flex:1;min-width:0;text-align:center;font-size:16px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
${P} .shop-nav-save{flex:0 0 auto;max-width:84px;}
${P} .shop-nav-tools{display:flex;align-items:center;gap:8px;margin-left:auto;}
${P} .shop-nav .shop-sync{gap:4px;font-size:10px;padding:0;max-width:78px;}
${P} .shop-sync .shop-icon{width:17px;height:17px;flex-shrink:0;}
${P} .shop-nav button{height:40px;min-height:40px;padding:0 6px;line-height:1;display:flex;align-items:center;justify-content:center;}
${P} .shop-body{flex:1;min-height:0;overflow:auto;overscroll-behavior:contain;padding:8px 22px 24px;scrollbar-width:thin;}
${P} .shop-foot{display:flex;flex:0 0 auto;justify-content:space-around;gap:4px;border-top:1px solid var(--shop-line);padding:4px 12px 14px;background:#f8f5ee!important;}
${P} .shop-foot button{position:relative;flex:1;min-width:0;font-size:12px;display:flex;align-items:center;justify-content:center;gap:7px;color:#85786b;}
${P} .shop-foot button[aria-current="page"]{color:#302a24;}
${P} .shop-foot button[aria-current="page"]:after{content:'';position:absolute;bottom:0;left:23%;right:23%;height:2px;background:currentColor;border-radius:2px;}
${P} .shop-icon{width:18px;height:18px;display:block;flex:0 0 auto;}
${P} .shop-kicker{font-size:11px;letter-spacing:2px;color:var(--shop-muted);margin:8px 0 18px;}
${P} .shop-body-home{padding:0;display:flex;flex-direction:column;}
${P} .shop-body-home>.shop-status:not(:empty),${P} .shop-body-home>.shop-muted,${P} .shop-body-home>.shop-link,${P} .shop-body-home>.shop-primary{margin:4px 18px;}
${P} .shop-body-home>.shop-status:empty{display:none;}
${P} .shop-front{position:relative;isolation:isolate;display:flex;flex-direction:column;flex:1;min-height:380px;padding:7px 18px 13px;background:radial-gradient(ellipse at 12% 50%,#fffdf655,transparent 64%);}
${P} .shop-masthead{position:relative;display:grid;grid-template-columns:minmax(0,1.45fr) minmax(0,1fr);gap:12px;align-items:start;z-index:1;}
${P} .shop-front-title{font-family:'Noto Serif SC','Songti SC',SimSun,serif;font-weight:400;font-size:38px;line-height:1.08;letter-spacing:1px;color:#2e2922;margin:0;overflow-wrap:anywhere;}
${P} .shop-front-title span{display:block;}
${P} .shop-front-type{font-family:'Songti SC',SimSun,serif;font-size:11px;color:#8b6042;letter-spacing:5px;margin:10px 0 0;}
${P} .shop-front-flourish{position:absolute;left:73px;bottom:9px;width:63px;height:28px;border-bottom:1px solid #936442;border-radius:0 0 60% 0;transform:rotate(-28deg);pointer-events:none;}
${P} .shop-front-facts{border-left:1px solid #a68a72;padding:4px 0 2px 12px;min-width:0;color:#42362b;}
${P} .shop-front-phase{font-family:'Songti SC',SimSun,serif;font-size:11px;line-height:1.7;}
${P} .shop-front-phase:after{content:'';display:block;width:20px;height:1px;background:#996945;margin:8px 0;}
${P} .shop-front-funds-label{font-family:'Songti SC',SimSun,serif;font-size:11px;line-height:1.6;}
${P} .shop-front-money{font-family:Georgia,'Times New Roman',serif;font-size:30px;line-height:1.16;color:#8a6447;letter-spacing:-1px;overflow-wrap:anywhere;}
${P} .shop-front-shopname{font-size:9px;line-height:1.5;color:#897b6d;margin-top:5px;overflow-wrap:anywhere;}
${P} .shop-scene{position:relative;flex:1 0 208px;min-height:180px;margin:3px -18px 0;overflow:hidden;}
${P} .shop-front-empty .shop-scene{flex-basis:238px;min-height:238px;}
${P} .shop-scene .shop-art{position:absolute;right:0;bottom:0;width:100%;height:100%;object-fit:contain;object-position:right bottom;pointer-events:none;opacity:1;}
${P} .shop-front-note{position:absolute;left:18px;bottom:24px;z-index:1;width:43%;margin:0;border-left:1px solid #95765b;padding:0 6px 0 9px;background:linear-gradient(90deg,#f8f5eef0,#f8f5ee99 75%,transparent);}
${P} .shop-front-note-label{font-family:'Songti SC',SimSun,serif;font-size:10px;letter-spacing:2px;color:#986a48;line-height:1.6;}
${P} .shop-front-avatar{display:grid;place-items:center;width:23px;height:23px;border-radius:50%;background:#906b4c;color:#fff7e8;font-family:Georgia,'Songti SC',serif;font-size:12px;margin:8px 0;}
${P} .shop-front-quote{font-family:'Songti SC',SimSun,serif;font-size:12px;line-height:1.8;white-space:pre-wrap;overflow-wrap:anywhere;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden;}
${P} .shop-front-note button{font-size:10px;min-height:28px;padding:4px 0;color:#8a6447;}
${P} .shop-front-actions{position:relative;display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr) minmax(0,1.7fr);gap:9px;align-items:center;margin:10px 0 0;z-index:2;}
${P} .shop-front-actions .shop-front-link{font-family:'Songti SC',SimSun,serif;font-size:11px;padding:5px 0;text-align:left;line-height:1.6;}
${P} .shop-front-link span{display:block;color:#9b714f;margin-top:6px;font-size:17px;line-height:1;}
${P} .shop-front-actions .shop-primary{width:100%;min-height:41px;border-radius:28px;background:#302923!important;border-color:#302923!important;color:#fff8e9!important;font-family:'Songti SC',SimSun,serif;font-size:12px;line-height:1.6;margin:0;padding:9px 10px;}
${P} .shop-front-tools{display:flex;flex-wrap:wrap;gap:3px 18px;padding:0;margin-top:4px;}
${P} .shop-front-tools button{font-size:10px;min-height:24px;padding:0;color:#8a7865;}
${P} .shop-create-intro{font-family:'Songti SC',SimSun,serif;font-size:21px;line-height:1.45;font-weight:400;white-space:pre-line;margin:6px 0 12px;}
${P} .shop-body-create label{font-size:12px;margin:8px 0;}
${P} .shop-body-create input{min-height:38px;margin:4px 0;}
${P} .shop-body-create>.shop-muted{font-size:11px;margin:6px 0;}
${P} .shop-create-kicker{font-size:10px;letter-spacing:2px;color:#9a7b60;margin:4px 0;}
${P} .shop-partners{display:flex;flex-direction:column;gap:0;margin-top:10px;}
${P} .shop-partners .shop-partner{display:flex;align-items:center;gap:12px;width:100%;min-width:0;min-height:55px;border-bottom:1px solid #ded6c9!important;padding:10px 0;text-align:left;text-decoration:none;}
${P} .shop-partner .shop-front-avatar{width:30px;height:30px;flex:0 0 30px;margin:0;background:#eee6d9;color:#876448;}
${P} .shop-partner-name{flex:1;min-width:0;font-size:14px;line-height:1.6;overflow-wrap:anywhere;}
${P} .shop-partner-check{flex:0 0 18px;font-size:16px;color:#94704e;opacity:0;}
${P} .shop-partner[aria-pressed=true] .shop-partner-check{opacity:1;}
${P} .shop-partner[aria-pressed=true] .shop-front-avatar{background:#8d6b4d;color:#fff8ec;}
${P} .shop-card-choice{margin:14px 0 10px;border-top:1px solid var(--shop-line);padding-top:10px;}
${P} .shop-card-heading{display:flex;align-items:center;gap:8px;justify-content:space-between;}
${P} .shop-card-heading strong{font-size:14px;overflow-wrap:anywhere;min-width:0;}
${P} .shop-card-heading button{flex-shrink:0;font-size:11px;color:#8a6447;}
${P} .shop-read-status{font-size:12px;line-height:1.8;color:#80634b;margin:8px 0;overflow-wrap:anywhere;}
${P} .shop-read-status:empty{display:none;}
${P} .shop-create-footer{flex:0 0 auto;border-top:1px solid #ded6c9;padding:9px 22px 21px;background:#f8f5ee;}
${P} .shop-create-footer .shop-primary{margin:6px 0 0;border-radius:26px;font-size:14px;min-height:42px;}
${P} .shop-create-selection{font-size:11px;color:#8a725d;line-height:1.5;overflow-wrap:anywhere;}
${P} .shop-save-help{font-size:12px;line-height:1.8;color:#82756a;margin:22px 0;}
${P} .shop-save-help summary{cursor:pointer;color:#78624f;padding:8px 0;}
${P} .shop-muted{font-size:12px;color:var(--shop-muted);line-height:1.8;overflow-wrap:anywhere;}
${P} .shop-note{border-left:2px solid #bba98f;padding:8px 0 8px 14px;margin:18px 4% 14px 8%;font-size:14px;line-height:1.85;white-space:pre-wrap;overflow-wrap:anywhere;}
${P} .shop-caption{font-size:12px;margin-top:10px;color:var(--shop-muted);}
${P} .shop-note.shop-preview{display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden;max-height:6em;}
${P} .shop-pair{display:flex;justify-content:space-between;align-items:baseline;flex-wrap:wrap;gap:6px 14px;margin:8px 0;}
${P} .shop-link{padding:8px 0!important;text-align:left;text-decoration:underline;text-underline-offset:5px;}
${P} .shop-primary{display:block;width:100%;border:1px solid #655548!important;background:#655548!important;color:#fffaf0!important;border-radius:2px;margin:14px 0;padding:11px 16px;font-size:15px;}
${P} .shop-section{font-family:Georgia,'Noto Serif SC',serif;font-size:20px;font-weight:400;margin:20px 0 12px;}
${P} .shop-rule{border-top:1px solid var(--shop-line);margin:16px 0;}
${P} .shop-row{padding:14px 0;border-bottom:1px solid var(--shop-line);font-size:14px;line-height:1.7;overflow-wrap:anywhere;}
${P} .shop-row h3{font-size:16px;font-weight:500;margin:0 0 8px;}
${P} .shop-actions{display:flex;flex-wrap:wrap;gap:2px 12px;align-items:center;}
${P} .shop-actions button{padding:8px 0;text-align:left;}
${P} .shop-actions .shop-danger{color:#a04040!important;}
${P} label{display:block;margin:12px 0;font-size:14px;line-height:1.8;}
${P} input:not([type="checkbox"]),${P} select,${P} textarea{display:block;width:100%;min-width:0;min-height:42px;background:#fffcf6!important;border:1px solid var(--shop-line)!important;border-radius:3px;padding:8px;font-size:14px;line-height:1.6;margin:6px 0;}
${P} input[type="checkbox"]{width:18px;height:18px;vertical-align:middle;accent-color:#796652;margin:0 9px 0 0;}
${P} textarea{resize:vertical;min-height:84px;}
${P} .shop-recipe{display:flex;align-items:center;flex-wrap:wrap;gap:8px;}
${P} .shop-recipe label{flex:1;min-width:110px;}
${P} .shop-recipe input[type="number"]{width:74px;flex:0 0 74px;}
${P} .shop-status{font-size:12px;line-height:1.8;padding:6px 0;color:#716047;overflow-wrap:anywhere;}
${P} .shop-status:empty{display:none;}
${P} .shop-chat-user{margin-left:9%;border-left-color:#665345;}
${P} .shop-compose{position:sticky;bottom:-24px;background:#f8f5ee!important;padding:10px 0 8px;border-top:1px solid var(--shop-line);}
${P} .shop-compose textarea{margin:0;max-height:180px;}
${P} .shop-badge{font-size:11px;letter-spacing:1px;color:var(--shop-muted);}
${P} .shop-empty{padding:28px 0;font-size:14px;line-height:1.9;}
#rp-phone.rp-shop-open #rp-frame #rp-screen #rp-sbar{color:#796652!important;}
#rp-phone.rp-shop-open #rp-frame #rp-screen #rp-sbar *{color:inherit!important;}
#rp-phone.rp-shop-open #rp-home-ind{background:#a59a8c!important;}
#rp-phone #rp-screen #rp-folder-modal [data-folder-app="shop"] .rp-shop-folder-icon{display:block;position:static;width:100%;height:100%;max-width:100%;max-height:100%;object-fit:contain;flex:0 0 auto;}
#rp-phone #rp-screen #rp-folder-modal [data-folder-app="shop"] .rp-shop-folder-fallback{display:grid;place-items:center;width:100%;height:100%;font-size:32px;line-height:1;overflow:hidden;}
`;
const uid=()=>globalThis.crypto?.randomUUID?.()||'shop_'+Date.now()+'_'+Math.random().toString(36).slice(2);
const PHASE={prepare:'开门之前',service:'营业中',closing:'准备打烊',rest:'今天辛苦了'};
export function createShop(api){
  const doc=api.document,client=createShopClient(api);let root,body,foot,status,mountedRuntime,screen='home',lastScreen='',campaigns=[],snapshots=[],profile=null,cards=[],filter='',card=null,memberFilter='',selection=null,selectionSerial=0,notice='',loading=false,active=false,account=null,entryLoaded=false;
  let heartbeat=null,controller=null,generation=0,aiBusy=false,lastSpeech=0,manualAt=0,draft='',draftVersion=0,importFile=null,bookTab='memory',bookPage=1;
  const node=(tag,cls,text)=>{const n=doc.createElement(tag);if(cls)n.className=cls;if(text!==undefined)n.textContent=String(text);return n;};
  const btn=(text,action,cls='',disabled=false)=>{const b=node('button',cls,text);b.type='button';b.dataset.action=action;b.disabled=disabled;return b;};
  function icon(kind){const svg=doc.createElementNS('http://www.w3.org/2000/svg','svg');svg.setAttribute('viewBox','0 0 24 24');svg.setAttribute('class','shop-icon');svg.setAttribute('fill','none');svg.setAttribute('stroke','currentColor');svg.setAttribute('stroke-width','1.5');svg.setAttribute('stroke-linecap','round');svg.setAttribute('stroke-linejoin','round');svg.setAttribute('aria-hidden','true');const path=doc.createElementNS(svg.namespaceURI,'path');path.setAttribute('d',({home:'M3 10 12 3l9 7v11h-6v-8H9v8H3Z',chat:'M21 11.5a9 9 0 0 1-9 9 10 10 0 0 1-4-.8L3 21l1.3-5a9 9 0 1 1 16.7-4.5Z',book:'M12 5v16M12 5C8 2 4 3 2 4v15c3-1 6-1 10 2 4-3 7-3 10-2V4c-2-1-6-2-10 1Z',cloud:'M7 19a5 5 0 0 1-1-10 6.5 6.5 0 0 1 12-2 6 6 0 0 1-1 12ZM8 12l3 3 5-6'}[kind]||''));svg.append(path);return svg;}
  const desc=(text,parent=body)=>parent.append(node('p','shop-muted',text));
  const heading=(text)=>body.append(node('h2','shop-section',text));
  const state=()=>client.current?.state;
  const disabled=()=>loading||client.busy||!client.writable||client.uncertain;
  function setNotice(text){notice=text;status&&(status.textContent=text);const inline=root?.querySelector('.shop-read-status');if(inline&&!selection)inline.textContent=text;}
  function cancel(){generation++;controller?.abort();controller=null;aiBusy=false;}
  function asset(theme,hero=false,local=false){const file='mochi-phone-shop-'+(hero?'hero':['candy','star','misty'].includes(theme)?theme:'misty')+'-20261018.png';return local?new URL('scripts/extensions/third-party/mochi-phone/shop-art-20261018/'+file,doc.baseURI).href:'https://preview.taliatang1.xyz/assets/'+file;}
  function image(hero=false){
    const theme=api.iconTheme(),img=node('img',hero?'shop-art':'rp-shop-folder-icon');img.alt='';img.decoding='async';img.referrerPolicy='no-referrer';
    if(!hero){img.width=58;img.height=58;img.loading='lazy';img.style.cssText='display:block;position:static;width:100%;height:100%;max-width:100%;max-height:100%;object-fit:contain;flex:0 0 auto';}
    let local=false;img.onerror=()=>{if(!img.isConnected)return;if(!local){local=true;img.src=asset(theme,hero,true);}else{img.onerror=null;if(hero)img.hidden=true;else img.replaceWith(node('span','rp-shop-folder-fallback','☕'));}};
    img.src=asset(theme,hero);return img;
  }
  function refreshIcon(){const target=doc.querySelector('#rp-folder-modal [data-folder-app="shop"] .rp-folder-item-ico');if(!target)return;target.replaceChildren(image());}
  function mount(){
    if(root?.isConnected)return;
    let css=doc.getElementById('rp-shop-css');if(!css){css=node('style');css.id='rp-shop-css';doc.head.append(css);}css.textContent=SHOP_CSS;
    if(api.runtime?.()!==mountedRuntime){mountedRuntime=api.runtime?.();mountedRuntime?.own(pause);}
    root=node('div','rp-view');root.id='rp-view-shop';root.style.display='none';doc.getElementById('rp-screen')?.append(root);
    root.addEventListener('click',e=>{const b=e.target.closest('button[data-action]');if(b&&!b.disabled){e.preventDefault();void dispatch(b.dataset.action,b);}});
    root.addEventListener('input',e=>{if(e.target.id==='shop-draft'){draft=e.target.value;draftVersion++;manualAt=Date.now();if(aiBusy&&state()?.commentJob?.status==='pending'){cancel();setNotice('已优先保留你的输入；可发送消息。');}}if(e.target.id==='shop-partner-search'){filter=e.target.value;renderPartnerList();}if(e.target.id==='shop-member-search'){memberFilter=e.target.value;renderMemberList();}});
    root.addEventListener('keydown',e=>{if(e.target.id==='shop-draft'&&e.key==='Enter'&&(e.ctrlKey||e.metaKey)&&!e.isComposing){e.preventDefault();void dispatch('send');}});
    if(!doc.querySelector('[data-folder-app="shop"]')){const item=node('div','rp-folder-item');item.dataset.folderApp='shop';item.append(node('div','rp-folder-item-ico'),node('div','rp-folder-item-lbl','你的小店'));doc.querySelector('#rp-folder-modal .rp-folder-popup')?.append(item);}
    refreshIcon();render();
  }
  function input(label,id,value,type='text',max=null,parent=body){const l=node('label','',label),i=node(type==='textarea'?'textarea':'input');i.id=id;if(type!=='textarea')i.type=type;i.value=value??'';if(max)i.maxLength=max;l.append(i);parent.append(l);return i;}
  function actions(parent,...buttons){const a=node('div','shop-actions');a.append(...buttons);parent.append(a);}
  function row(title,text){const r=node('section','shop-row');if(title)r.append(node('h3','',title));if(text)r.append(node('div','shop-muted',text));body.append(r);return r;}
  function render(preserve=true){
    if(!root)return;let values=[],focus=null,selection=null,scroll=0;
    if(preserve&&lastScreen===screen){scroll=body?.scrollTop||0;values=[...root.querySelectorAll('input[id],textarea[id],select[id]')].map(n=>[n.id,n.value,n.checked]);if(root.contains(doc.activeElement)){focus=doc.activeElement.id;selection=[doc.activeElement.selectionStart,doc.activeElement.selectionEnd];}}
    const s=state();root.replaceChildren();root.dataset.shopPage=screen;const nav=node('header','shop-nav');nav.append(btn('‹','back','shop-back'));if(screen==='home'){const tools=node('div','shop-nav-tools');if(s){const sync=btn(loading||client.busy?'保存中':client.uncertain?'待核对':client.writable?'已同步':'只读',client.uncertain?'recover':client.writable?'refresh':'takeover','shop-sync',loading);sync.prepend(icon('cloud'));tools.append(sync);}tools.append(btn('存档','archives','shop-nav-save',loading));nav.append(tools);}else nav.append(node('div','shop-nav-title',({archives:'小店与存档',create:'一起开一家店',plan:'今日菜单',stock:'备货',service:'店内营业',closing:'打烊账页',upgrades:'小店成长',book:'共同店册',chat:'和搭子商量',points:'存档点',profile:'搭子资料'}[screen]||'你的小店')),btn('存档','archives','shop-nav-save',loading));root.append(nav);
    body=node('main','shop-body shop-body-'+screen);root.append(body);status=node('div','shop-status');status.setAttribute('role','status');status.setAttribute('aria-live','polite');status.textContent=notice;body.append(status);
    if(loading)body.append(node('p','shop-muted','正在核对云端进度…'));if(aiBusy)body.append(btn('暂停搭子回应，继续经营','stop','shop-link'));
    if(client.uncertain)body.append(btn('核对上次保存结果','recover','shop-primary',loading));
    if(s&&!['home','archives','create','points','profile'].includes(screen)){const line=node('div','shop-pair');line.append(node('span','shop-badge','第 '+s.day+' 日 · '+PHASE[s.phase]),btn(client.writable?'已云存档 · 刷新':'在本机继续',client.writable?'refresh':'takeover','shop-link',loading));body.append(line);}
    if(!client.backupAvailable)desc('自动备份暂时异常，云端主档仍保留。请先导出一份备份并联系管理员。');
    if(screen==='home')renderHome(s);else if(screen==='archives')renderArchives();else if(screen==='create')renderCreate();else if(!s){desc('请先选择一份小店档案。');body.append(btn('选择小店','archives','shop-primary'));}else if(screen==='plan')renderPlan(s);else if(screen==='stock')renderStock(s);else if(screen==='service')renderService(s);else if(screen==='closing')renderClosing(s);else if(screen==='upgrades')renderUpgrades(s);else if(screen==='book')renderBook(s);else if(screen==='chat')renderChat(s);else if(screen==='points')renderPoints(s);else if(screen==='profile')renderProfile(s);
    if(screen==='create'){foot=node('div','shop-create-footer');foot.append(node('div','shop-create-selection',profile?'和 '+profile.name+' 一起，经营属于你们的小店。':'先选一位搭子，再为小店写下名字。'),btn('一起开店 →','create','shop-primary',loading||!!selection||!profile||client.uncertain));root.append(foot);}else if((s||screen==='home')&&!['archives','points','profile'].includes(screen)){foot=node('nav','shop-foot');for(const [label,a]of [['营业','home'],['商量','chat'],['店册','book']]){const b=btn(label,'view:'+a,'',!s&&a!=='home');b.prepend(icon(a));if(screen===a)b.setAttribute('aria-current','page');foot.append(b);}root.append(foot);}
    lastScreen=screen;for(const[id,value,checked]of values){const e=doc.getElementById(id);if(e){e.value=value;e.checked=checked;}}body.scrollTop=scroll;if(focus){const e=doc.getElementById(focus);e?.focus({preventScroll:true});try{e?.setSelectionRange(...selection);}catch{}}
  }
  function renderHome(s){
    if(s)try{api.storage.setItem('mochi-shop-last:'+encodeURIComponent(api.account()),s.id);}catch{}
    const front=node('section','shop-front'+(s?'':' shop-front-empty')),mast=node('div','shop-masthead'),title=node('div');const h=node('h1','shop-front-title');h.append(node('span','','与你的'),node('span','','小店'));title.append(h,node('p','shop-front-type','咖 | 啡 | 店'),node('i','shop-front-flourish'));const facts=node('div','shop-front-facts');facts.append(node('div','shop-front-phase',s?'第'+s.day+'天 · '+({prepare:'开门前',service:'营业中',closing:'待打烊',rest:'已打烊'}[s.phase]):'等你开门'),node('div','shop-front-funds-label',s?'店内资金':'尚未开店'),node('div','shop-front-money',s?money(s.cash):'—'));if(s)facts.append(node('div','shop-front-shopname',s.name));mast.append(title,facts);front.append(mast);
    const scene=node('div','shop-scene');scene.append(image(true));const last=s?.chat.filter(m=>m.role==='char').at(-1),note=node('aside','shop-front-note');note.append(node('div','shop-front-note-label',s?'搭子留言':'等一个搭子'),node('div','shop-front-avatar',s?Array.from(s.partner.name)[0]:'你'),node('div','shop-front-quote',s?(last?.text||'杯子已经摆好了。\n今天，从这里开始。'):'一家小店，\n两个人的日常。'));if(s)note.append(btn(last?'读完整留言 ↗':'和搭子商量 ↗','view:chat'));scene.append(note);front.append(scene);
    const links=node('div','shop-front-actions');for(const [label,a]of [['今日菜单','plan'],['备货清单','stock']]){const b=btn(label,'view:'+a,'shop-front-link',!s||loading);b.append(node('span','','—  ↗'));links.append(b);}const text=s?({prepare:'一起准备开店 →',service:'回到店内 →',closing:'一起对一对账 →',rest:'开启新一天 →'}[s.phase]):entryLoaded?'一起开一家店 →':'重新连接 →';links.append(btn(text,s?'primary':entryLoaded?'new':'entry','shop-primary',loading||client.uncertain||(!!s&&(disabled()||aiBusy))));front.append(links);
    if(s){const tools=node('div','shop-front-tools');tools.append(btn('小店成长 ↗','view:upgrades'),btn('搭子资料 ↗','view:profile'));if(!client.writable)tools.append(btn('在本机继续','takeover','shop-link',loading||client.uncertain));if(s.commentJob&&['failed','pending'].includes(s.commentJob.status)&&!aiBusy)tools.append(btn('继续搭子留言 ↗','retry-comment','',disabled()));front.append(tools);}body.append(front);
  }
  function renderPlan(s){heading('把今天慢慢安排好');desc('选择1至6款已解锁商品。价格过高会减少需求；营业期间菜单固定。');
    for(const r of RECIPES){const p=node('div','shop-recipe'),l=node('label'),check=node('input');check.type='checkbox';check.id='shop-menu-'+r.id;check.checked=s.menu.includes(r.id);check.disabled=r.level>s.level||!['prepare','rest'].includes(s.phase);l.append(check,doc.createTextNode(r.name+(r.level>s.level?' · 第'+r.level+'阶段解锁':'')));const price=node('input');price.type='number';price.id='shop-price-'+r.id;price.value=s.prices[r.id]/100;const[min,max]=priceRange(r);price.min=min/100;price.max=max/100;price.step=1;price.setAttribute('aria-label',r.name+'价格');price.disabled=check.disabled;p.append(l,price);body.append(p);}
    const l=node('label','','今日分工'),select=node('select');select.id='shop-role';for(const[v,t]of [['reception','我接待，搭子制作'],['making','我制作，搭子接待']]){const o=node('option','',t);o.value=v;select.append(o);}select.value=s.role;l.append(select);body.append(l,btn('记好菜单与分工','plan-save','shop-primary',disabled()||aiBusy||!['prepare','rest'].includes(s.phase)));desc('两种分工没有隐藏数值优劣，会提供给搭子的对话与当日手记。');
  }
  function renderStock(s){heading('柜台后的小小储藏');desc('按配方消耗材料，每项最多'+stockLimit(s)+'份。采购从可用资金中扣除。');for(const[id,x]of Object.entries(INGREDIENTS)){const r=row(x.name+' · '+s.stock[id]+'份','每份 '+money(x.cost));actions(r,btn('进货5份','buy:'+id+':5','',disabled()||aiBusy||!['prepare','rest'].includes(s.phase)),btn('进货20份','buy:'+id+':20','',disabled()||aiBusy||!['prepare','rest'].includes(s.phase)));}
    heading('配方用料');for(const r of RECIPES.filter(r=>s.menu.includes(r.id)))desc(r.name+'：'+Object.entries(r.items).map(([id,n])=>INGREDIENTS[id].name+'×'+n).join('、'));body.append(btn('申请周转补给','rescue','shop-link',disabled()||aiBusy||!['prepare','rest'].includes(s.phase)));desc('仅在资金不足80，且不能制作任一已解锁商品时开放；每3个游戏日最多一次，补给200。');
  }
  function renderService(s){if(s.phase!=='service'){desc('当前没有正在接待的订单。');body.append(btn('回到店里','view:home','shop-primary'));return;}heading('第 '+(s.wave+1)+' 批客人');desc(s.role==='reception'?'你负责接待，搭子在操作台准备出品。':'你负责制作，搭子在柜台接待客人。');for(const o of s.orders.filter(o=>o.wave===s.wave)){const r=RECIPES.find(r=>r.id===o.recipe),section=row(o.customer,r.name+' ×'+o.qty+' · '+money(o.price*o.qty));if(o.status==='pending')actions(section,btn('制作并交付','serve:'+o.id,'',disabled()||aiBusy),btn('婉拒','decline:'+o.id,'shop-danger',disabled()||aiBusy));else desc(o.status==='served'?'已完成':'已婉拒',section);}
    if(s.wave===1&&s.event){heading(s.event.title);desc(s.event.text);if(!s.event.choice){for(const c of s.event.choices)body.append(btn(c.label+(c.cost?' · '+money(c.cost):' · 无支出'),'event:'+c.id,'shop-link',disabled()||aiBusy));}else desc('已处理：'+s.event.choices.find(c=>c.id===s.event.choice).label);}
    body.append(btn(s.wave===2?'营业结束，整理账页 →':'迎接下一批 →','wave','shop-primary',disabled()||aiBusy||s.orders.some(o=>o.wave===s.wave&&o.status==='pending')||(s.wave===1&&!s.event?.choice)));
  }
  function renderClosing(s){heading('今天，留下了这些');for(const[t,n]of [['营业额',s.stats.revenue],['已消耗材料成本',-s.stats.materialCost],['小插曲支出',-s.stats.eventCost],['日常营业支出',-(s.phase==='closing'?Math.min(s.cash,4000+(s.level-1)*2000):s.stats.overhead)]]){const r=node('div','shop-pair');r.append(node('span','',t),node('span','',money(n)));body.append(r);}desc('今日采购支付 '+money(s.stats.purchases)+'，库存尚未消耗的部分不重复计入经营成本。升级和陈列另列账本。');const estimate=profit(s)-(s.phase==='closing'?Math.min(s.cash,4000+(s.level-1)*2000):0);heading('经营净收益 '+money(estimate));desc('完成 '+s.stats.sold+' 份商品 · 可用资金 '+money(s.cash));if(s.phase==='closing')body.append(btn('确认打烊 · 保存今日','close','shop-primary',disabled()||aiBusy));else body.append(btn('回到店里','view:home','shop-primary'));}
  function renderUpgrades(s){heading('让这里慢慢变成喜欢的样子');const off=disabled()||aiBusy||!['prepare','rest'].includes(s.phase);body.append(btn('小店成长 · 当前第'+s.level+'阶段','expand','shop-primary',off||s.level>=5));desc('成长条件：第4/10/20/35日、累计售出30/100/250/500份；费用600/1400/2600/4200。最高5阶段，不无限叠乘。');for(const[id,e]of Object.entries(EQUIPMENT)){const level=s.equipment[id],r=row(e.name+' · '+level+' / 3',e.hint);actions(r,btn(level===3?'已满级':'升级 · '+money(e.prices[level]),'equipment:'+id,'shop-link',off||level===3));}heading('留下生活的痕迹');for(const d of DECOR){const r=row(d.glyph+' '+d.name,'陈列只改变店内记录与对话氛围，不增加收入倍率。');actions(r,btn(s.decor.includes(d.id)?'已添置':'添置 · '+money(d.cost),'decor:'+d.id,'shop-link',off||s.decor.includes(d.id)));}}
  function renderBook(s){actions(body,btn('回忆','book:memory'),btn('账本','book:ledger'),btn('熟客','book:regular'));if(bookTab==='regular'){for(const r of REGULARS){const v=s.regulars[r.id];row(r.name,'来访 '+v.visits+' 次 · 熟悉 '+v.affinity+' / 100'+(v.visits>=3?'\n'+r.story:'\n故事会随来访慢慢展开。'));}return;}const all=bookTab==='memory'?[...s.memories].sort((a,b)=>Number(b.pinned)-Number(a.pinned)||b.day-a.day):[...s.ledger].reverse(),end=bookPage*30;for(const x of all.slice(0,end)){const r=row(bookTab==='memory'?x.title:x.label,'第'+x.day+'日 · '+(bookTab==='memory'?x.detail:(x.amount>=0?'+':'')+money(x.amount)));if(bookTab==='memory')actions(r,btn(x.pinned?'取消珍藏':'珍藏','pin:'+x.id,'shop-link',disabled()));}if(all.length>end)body.append(btn('再看30条','book-more','shop-link'));}
  function renderChat(s){desc('和 '+s.partner.name+' 商量经营，或聊聊别的。对话只使用本档资料；人物回应消耗API，经营按钮不消耗。');for(const m of s.chat.slice(-100*bookPage)){const r=node('article','shop-note'+(m.role==='user'?' shop-chat-user':''));r.append(node('div','shop-badge',(m.role==='user'?s.user.name:s.partner.name)+' · 第'+m.day+'日'),node('div','',m.text));if(m.role==='user'&&['pending','failed'].includes(m.replyState)&&!aiBusy)actions(r,btn('回复未完成 · 重试','retry:'+m.id,'shop-link',disabled()));body.append(r);}if(s.chat.length>100*bookPage)body.prepend(btn('查看更早对话','chat-more','shop-link'));if(aiBusy)desc('搭子正在想怎么说…');if(s.commentJob&&['failed','pending'].includes(s.commentJob.status)&&!aiBusy)body.append(btn('继续未完成的搭子发言','retry-comment','shop-link',disabled()));const form=node('div','shop-compose');input('想对搭子说什么','shop-draft',draft,'textarea',8000,form);actions(form,btn('发送','send','shop-link',disabled()),btn('暂停回应','stop','shop-link',!aiBusy));desc('Ctrl / ⌘ + Enter 发送；输入法回车不会误发。',form);body.append(form);}
  function renderArchives(){heading('每一家，都好好留下');desc('每间小店独立保存。换设备后，登录同一酒馆账户即可接续。');actions(body,btn('开一家新店','new','shop-link',loading||client.uncertain),btn('刷新列表','archives','shop-link',loading),btn('导入备份','import','shop-link',loading));if(state())actions(body,btn('回到当前小店','view:home','shop-link'),btn('保存一个存档点','save-point','shop-link',disabled()),btn('查看当前存档点','points','shop-link',loading),btn('导出当前小店','export','shop-link',loading),btn('修改店名','rename','shop-link',disabled()));let group='';for(const c of [...campaigns].sort((a,b)=>a.partnerRef.localeCompare(b.partnerRef)||b.updated-a.updated)){if(c.partnerRef!==group){group=c.partnerRef;heading(c.partner);}const r=row(c.name,'第'+c.day+'日 · '+(PHASE[c.phase]||c.phase)+(c.deleted?' · 回收区':'')+' · '+new Date(c.updated).toLocaleString());if(c.deleted)actions(r,btn('恢复到列表','restore:'+c.id,'shop-link',loading));else actions(r,btn('打开','open:'+c.id,'shop-link',loading||client.uncertain),btn('移入回收区','trash:'+c.id,'shop-danger',loading||client.uncertain));}if(!campaigns.length)desc('还没有小店。选一位搭子，开启你们的第一家店。');const help=node('details','shop-save-help');help.append(node('summary','','关于同步与备份'));desc('主存档和自动备份保存在你所在酒馆的个人账户目录。同一服务器、同一账户可换设备接续；两台设备不会同时写入同一档案。',help);desc('每档保留最近30个自动节点；手动存档点最多500个，不自动删除。回看旧点会另开新档，原档继续保留。',help);desc('导出包含当前进度、本档对话和角色资料，不含API密钥。下载后可存到自己的设备或个人网盘。历史存档点保留在服务器，导出旧点前请先从该点另开新档。',help);body.append(help);}
  function renderCreate(){
    body.append(node('p','shop-create-kicker','OUR LITTLE CAFÉ'),node('h1','shop-create-intro','和谁一起，\n经营日常？'));
    input('为小店取个名字','shop-name','转角咖啡馆','text',36);
    if(!card){input('第一步 · 搜索并选择角色卡','shop-partner-search',filter,'text',100);desc('多人卡请先选卡名，再选卡里的搭子。');body.append(node('div','shop-partners'));renderPartnerList();return;}
    status.hidden=true;const panel=node('section','shop-card-choice'),title=node('div','shop-card-heading');title.append(node('strong','','角色卡 · '+card.name),btn('换一张卡','change-card','shop-link'));panel.append(title);
    const progress=node('div','shop-read-status',selection?(selection.phase==='card'?'正在读取卡内人物…':'正在核对搭子资料…'):notice);progress.setAttribute('role','status');progress.setAttribute('aria-live','polite');panel.append(progress);
    if(selection)panel.append(btn('取消读取','cancel-selection','shop-link'));
    else if(!Array.isArray(card.members)||(!profile&&!card.members.length))panel.append(btn('重新读取','retry-card','shop-link'));
    if(Array.isArray(card.members)&&card.members.length){desc('第二步 · 选择这张卡里的开店搭子',panel);input('按卡内角色姓名查找','shop-member-search',memberFilter,'text',100,panel);panel.append(node('div','shop-partners shop-members'));body.append(panel);renderMemberList();}
    else{if(profile)desc('开店搭子 · '+profile.name,panel);body.append(panel);}
    desc('每家新店独立保存。搭子的来源卡、具体人物与资料快照会随存档一起保存。');
    if(profile?.worldUnavailable)desc('绑定世界书暂不可读，当前只读到了卡内资料；可换卡或稍后重试。');
  }
  function renderPartnerList(){
    const host=root?.querySelector('.shop-partners');if(!host||card)return;host.replaceChildren();
    const matches=cards.filter(c=>c.name.toLowerCase().includes(filter.toLowerCase()));
    for(const c of matches.slice(0,60)){const b=btn('','partner','shop-partner',loading);b.dataset.avatar=c.avatar;b.append(node('span','shop-front-avatar',Array.from(c.name)[0]||'·'),node('span','shop-partner-name',c.name));host.append(b);}
    if(matches.length>60)desc('还有更多角色卡，请继续输入卡名筛选。',host);
    if(!matches.length)desc(cards.length?'没有找到这张卡；多人卡请按卡名搜索，再到卡内选人。':'请先在酒馆导入角色卡，再来选择。',host);
  }
  function renderMemberList(){
    const host=root?.querySelector('.shop-members');if(!host||!card)return;host.replaceChildren();
    const query=memberFilter.normalize('NFKC').trim().toLowerCase(),matches=card.members.filter(m=>[m.name,m.id,...(m.aliases||[])].some(x=>String(x).normalize('NFKC').toLowerCase().includes(query)));
    for(const m of matches.slice(0,60)){const b=btn('','member','shop-partner',loading);b.dataset.member=m.id;b.setAttribute('aria-pressed',String(profile?.member===m.id));b.append(node('span','shop-front-avatar',Array.from(m.name)[0]||'·'),node('span','shop-partner-name',m.name),node('span','shop-partner-check','✓'));host.append(b);}
    if(matches.length>60)desc('还有更多人物，请继续输入姓名筛选。',host);
    if(!matches.length){desc('未找到匹配的人物。请核对卡内姓名；不会将自由输入直接当成人设。',host);if(query)host.append(btn('在本卡核对这个姓名','member-lookup','shop-link',loading));}
  }
  function cancelSelection(){selectionSerial++;selection?.controller.abort();selection=null;}
  async function choose(avatar,member=null){
    cancelSelection();profile=null;const serial=selectionSerial,owner=api.account(),controller=new AbortController();selection={controller,phase:member===null?'card':'profile'};
    const valid=()=>serial===selectionSerial&&owner===api.account()&&active&&screen==='create';
    notice='';
    try{
      render();
      if(member===null){
        const out=await client.request('card',{avatar},{signal:controller.signal});if(!valid())return;
        if(!out.card||!Array.isArray(out.card.members)||out.card.avatar!==avatar)throw new Error('卡内人物列表未能读取，请重新选择角色卡。');
        card=out.card;memberFilter='';
        if(card.members.length)return;
        selection.phase='profile';render();
      }
      const out=await client.request('profile',{avatar,member:member||''},{signal:controller.signal});if(!valid())return;
      if(!out.profile?.ref||!out.profile.name||out.profile.avatar!==avatar||(member&&!out.profile.member))throw new Error('搭子资料不完整，请重新核对。');
      profile=out.profile;notice='已选 '+profile.name+'，可以一起开店了。';
    }catch(e){if(valid()&&e.code!=='cancelled'){notice=e.message||'读取未完成，请重试或换一张卡。';}}
    finally{if(serial===selectionSerial){selection=null;if(active&&screen==='create')render();}}
  }
  function renderPoints(s){heading(s.name+'的存档点');desc('打开旧点会建立一份新档，当前进度继续保留。');body.append(btn('新建手动存档点','save-point','shop-link',disabled()));for(const x of snapshots){const r=row(x.label,'第'+x.day+'日 · '+(x.kind==='auto'?'自动':'手动')+' · '+new Date(x.at).toLocaleString());const b=btn('从此处另开新档','fork','shop-link',loading);b.dataset.snapshot=x.id;b.dataset.label=x.label;actions(r,b);}}
  function renderProfile(s){heading(s.partner.name);desc('本档固定使用选中角色的资料快照，不随主楼切换。'+(s.partner.member?'来源卡：'+s.partner.cardName+'；卡内人物：'+s.partner.name+'。':'来源：'+s.partner.avatar+'。')+'角色卡删除后仍可凭快照经营。');desc('更新资料前会保留旧版本存档点；不会更换搭子或带入主楼历史。世界书采用该卡绑定条目的常驻/文字关键词匹配；不执行正则和递归宏。');body.append(btn('检查角色资料更新','profile-update','shop-primary',disabled()||aiBusy));desc('当前版本 '+String(s.partner.version||'').slice(0,12));}
  async function busy(fn,{draw=true}={}){if(loading)return;loading=true;try{if(draw)render();return await fn();}catch(e){setNotice(e.message||'操作未完成，请稍后重试。');api.notify?.(e.message||'操作未完成');}finally{loading=false;if(draw)render();}}
  async function archives(){cancelSelection();cancel();await busy(async()=>{campaigns=await client.list();screen='archives';setNotice('');});}
  async function loadCampaign(id){await client.load(id);if(!client.uncertain)try{await client.claim(id);}catch(e){if(e.status!==423)throw e;setNotice('这家店正在另一设备营业，可先查看，或点“在本机继续”。');}screen='home';draft='';bookPage=1;}
  async function open(id){if(client.uncertain){setNotice('请先核对上次保存结果，再切换小店。');render();return;}cancel();await busy(async()=>{await client.release();setNotice('');await loadCampaign(id);entryLoaded=true;});}
  async function enterHome(){await busy(async()=>{campaigns=await client.list();if(!state()&&!client.uncertain){let last;try{last=api.storage.getItem('mochi-shop-last:'+encodeURIComponent(api.account()));}catch{}const available=campaigns.filter(c=>!c.deleted),latest=available.find(c=>c.id===last)||available.sort((a,b)=>b.updated-a.updated)[0];if(latest)await loadCampaign(latest.id);}entryLoaded=true;screen='home';});}
  async function act(action,event=null){cancel();let saved=false;await busy(async()=>{await client.action(action);saved=true;setNotice('已保存到服务器。');if(action.type==='wave'&&state().phase==='closing')screen='closing';if(['close','next','open'].includes(action.type))screen=action.type==='open'?'service':'home';});if(saved&&event&&active&&client.writable&&!client.uncertain&&Date.now()-lastSpeech>10000&&Date.now()-manualAt>15000&&!draft.trim())void speak({event});}
  async function speak({messageId=null,event=null,retry=false}={}){
    if(!active||disabled()||aiBusy)return;cancel();const mine=generation,owner=api.account(),id=state()?.id;controller=new AbortController();const task={signal:controller.signal,valid:()=>mine===generation&&active&&owner===api.account()&&state()?.id===id};aiBusy=true;lastSpeech=Date.now();
    try{
      let key;
      if(messageId){if(retry)await client.action({type:'chat-retry',id:messageId});}
      else{key=event?state().day+':'+state().phase+':'+state().wave+':'+state().serial:state().commentJob?.key;event=event||state().commentJob?.event;if(!key||!event)throw new Error('当前没有可继续的发言。');await client.action({type:'comment-start',eventKey:key,event,retry});}
      if(!task.valid())return;render();const rev=client.current.rev,s=state(),message=messageId?s.chat.find(m=>m.id===messageId):null,request=shopPrompt(s,{message,event,retry});
      const raw=await api.call(request.prompt,request.maxTokens,request.system,task);if(!task.valid()||client.current.rev!==rev)return;const text=api.clean(raw,s.partner.name);if(!text||!text.trim())throw new Error('搭子的回复为空，请手动重试。');
      await client.action(messageId?{type:'chat-result',replyTo:messageId,id:uid(),text}:{type:'comment-result',eventKey:key,id:uid(),text});setNotice(screen==='home'?'':'搭子的回应已保存。');
    }catch(e){if(task.valid()){try{await client.action(messageId?{type:'chat-result',replyTo:messageId,error:api.classify?.(e)||'request'}:{type:'comment-result',eventKey:state()?.commentJob?.key,error:api.classify?.(e)||'request'});}catch{}setNotice('回应未完成：'+(api.errorText?.(e)||e.message)+' 可以手动重试；经营进度已保留。');}}
    finally{if(mine===generation){aiBusy=false;controller=null;render();}}
  }
  function dialog(title,message,field=null){return new Promise(resolve=>{const content=node('div');if(message)content.append(node('p','',message));let control;if(field){control=input(title,'shop-dialog-value',field.value,'text',field.maxLength,content);}let settled=false,observer;const finish=x=>{if(!settled){settled=true;observer?.disconnect();resolve(x);}};const panel=api.dialog(title,content,[{label:'取消',run:()=>finish(null)},{label:field?'确定':'继续',primary:true,run:()=>{if(field&&!control.value.trim()){control.focus();return false;}finish(field?{value:control.value.trim()}:true);}}]);const element=panel?.[0]||panel;observer=new doc.defaultView.MutationObserver(()=>{if(element&&!element.isConnected)finish(null);});observer.observe(doc.getElementById('rp-screen'),{childList:true,subtree:true});});}
  async function ask(text,value='',maxLength=80){return dialog(text,'',{value,maxLength});}
  async function confirm(title,message){return !!await dialog(title,message);}
  async function dispatch(action,b){
    if(!active)return;if(action.startsWith('view:')){cancelSelection();screen=action.slice(5);notice='';bookPage=1;render(false);return;}
    if(action==='back'){cancelSelection();if(screen==='home'){pause();api.navigate('home');}else{screen='home';notice='';render(false);}return;}
    if(action==='entry'){await enterHome();return;}
    if(action==='archives'){await archives();return;}
    if(action==='recover'){await busy(async()=>{await client.recover();if(!state()){campaigns=await client.list();screen='archives';}setNotice('已核对上次操作，请查看进度再继续。');});return;}
    if(action==='new'){if(loading||client.uncertain)return;cancel();cancelSelection();profile=null;card=null;memberFilter='';cards=(api.characters()||[]).filter(c=>typeof c?.name==='string'&&typeof c?.avatar==='string').map(c=>({name:c.name,avatar:c.avatar}));filter='';screen='create';notice='';render(false);return;}
    if(action==='partner'){if(loading||screen!=='create')return;const picked=cards.find(c=>c.avatar===b?.dataset?.avatar);if(!picked)return;card={...picked,members:null};memberFilter='';await choose(picked.avatar);return;}
    if(action==='change-card'){cancelSelection();profile=null;card=null;memberFilter='';notice='';render();return;}
    if(action==='cancel-selection'){cancelSelection();notice='读取已取消，可以重试或换卡。';render();return;}
    if(action==='retry-card'){if(card)await choose(card.avatar);return;}
    if(action==='member'||action==='member-lookup'){if(loading||screen!=='create'||!card)return;const member=action==='member'?b?.dataset?.member:memberFilter.trim();if(member)await choose(card.avatar,member);return;}
    if(action==='create'){if(loading||selection||screen!=='create')return;const name=doc.getElementById('shop-name')?.value?.trim();if(!profile||!name){setNotice('请填写店名并选择搭子。');return;}let created=false;await busy(async()=>{await client.release();const r=await client.mutate('create',{name,avatar:profile.avatar,member:profile.member||'',user:api.user()});screen='home';draft='';entryLoaded=true;created=true;setNotice('');await client.claim(r.id);});if(created&&active&&!loading)void speak({event:'你们一起确定了店名，正站在第一次开门前的小店里。'});return;}
    if(action.startsWith('open:')){await open(action.slice(5));return;}
    if(action==='refresh'){await busy(async()=>{await client.load(state().id);setNotice('');});return;}
    if(action==='takeover'){if(await confirm('在本机继续经营','会暂停另一设备的写入，另一设备未保存的操作不会覆盖本机。'))await busy(async()=>{await client.claim(state().id,true);setNotice('已在本机接续。');});return;}
    if(action==='primary'){const s=state();if(s.phase==='prepare'){if(await confirm('开门营业','菜单与进货将在今天固定；请确认材料准备充足。'))await act({type:'open'},'今天开门了，看看天气、菜单和分工，自然和用户说句话。');}else if(s.phase==='rest')await act({type:'next'},'你们开始了新一个经营日，回顾昨天，商量今天。');else{screen=s.phase==='closing'?'closing':'service';render(false);}return;}
    if(action==='plan-save'){const menu=RECIPES.filter(r=>doc.getElementById('shop-menu-'+r.id)?.checked).map(r=>r.id),prices=Object.fromEntries(menu.map(id=>[id,Number(doc.getElementById('shop-price-'+id)?.value)*100])),role=doc.getElementById('shop-role').value;await act({type:'plan',menu,prices,role});return;}
    const parts=action.split(':');if(['buy','serve','decline','event','equipment','decor','pin'].includes(parts[0])){const[type,id,num]=parts;const a=type==='buy'?{type,item:id,quantity:Number(num)}:['serve','decline'].includes(type)?{type,orderId:id}:type==='event'?{type,choice:id}:type==='pin'?{type,memoryId:id}:{type,item:id};if(['equipment','decor','decline'].includes(type)&&!await confirm('确认这次安排','请确认页面所列内容与费用。服务器确认后才会生效。'))return;await act(a,type==='event'?'你们处理了今天的小插曲，回应这个具体决定。':null);return;}
    if(['wave','close','expand','rescue'].includes(action)){if(['expand','rescue'].includes(action)&&!await confirm('确认安排','请确认页面说明与资金条件，操作会写入本档。'))return;await act({type:action},['wave','close'].includes(action)?'营业进度刚刚变化，请结合当前批次、订单或结算，与用户自然交流。':null);return;}
    if(action.startsWith('book:')){bookTab=parts[1];bookPage=1;render(false);return;}
    if(action==='book-more'||action==='chat-more'){bookPage++;render();return;}
    if(action==='send'){const text=(doc.getElementById('shop-draft')?.value||draft).trim();if(!text){setNotice('先写下想说的话。');return;}cancel();manualAt=Date.now();const id=uid(),sentVersion=draftVersion;let saved=false;await busy(async()=>{await client.action({type:'chat-user',id,text});saved=true;if(sentVersion===draftVersion)draft='';screen='chat';render(false);});if(saved)void speak({messageId:id});return;}
    if(action.startsWith('retry:')){void speak({messageId:action.slice(6),retry:true});return;}
    if(action==='retry-comment'){void speak({retry:true});return;}
    if(action==='stop'){cancel();setNotice('已暂停，未完成的提问可以手动重试。');render();return;}
    if(action==='save-point'){const r=await ask('存档点名称','第'+state().day+'日 · '+PHASE[state().phase]);if(r)await busy(async()=>{await client.save(r.value);snapshots=(await client.request('snapshots',{id:state().id})).snapshots;setNotice('手动存档点已保存在服务器。');});return;}
    if(action==='points'){await busy(async()=>{snapshots=(await client.request('snapshots',{id:state().id})).snapshots;screen='points';});return;}
    if(action==='fork'){const r=await ask('接续后的新店名',state().name+' · 接续',36);if(!r)return;cancel();await busy(async()=>{await client.release();const out=await client.mutate('fork',{id:state().id,snapshot:b.dataset.snapshot,name:r.value});await client.claim(out.id);screen='home';draft='';setNotice('已从存档点另开新档，原进度保留。');});return;}
    if(action==='rename'){const r=await ask('修改店名',state().name,36);if(r)await act({type:'rename',name:r.value});return;}
    if(action.startsWith('trash:')){const id=action.slice(6);if(!await confirm('移入回收区','档案保留，可在存档列表恢复。'))return;cancel();await busy(async()=>{await client.release();await client.claim(id);await client.trash(id,true);campaigns=await client.list();screen='archives';setNotice('已移入回收区，原始数据保留。');});return;}
    if(action.startsWith('restore:')){await busy(async()=>{await client.trash(action.slice(8),false);campaigns=await client.list();setNotice('档案已恢复。');});return;}
    if(action==='export'){await busy(async()=>{const out=await client.request('export',{id:state().id});api.download(JSON.stringify(out.backup,null,2),'mochi-shop-'+state().id+'-day'+state().day+'.json');setNotice('完整当前进度已导出（含对话和人设）；历史存档点保留在服务器。请妥善保管。');});return;}
    if(action==='import'){const i=node('input');i.type='file';i.accept='.json,application/json';i.onchange=()=>void busy(async()=>{const file=i.files?.[0];if(!file)return;if(file.size>12000000)throw new Error('备份超过12MB，请使用服务器完整备份恢复。');importFile=JSON.parse(await file.text());if(importFile.format!=='mochi-shop-backup')throw new Error('请选择小店导出的备份文件。');if(!await confirm('导入为独立新档','店名：'+String(importFile.state?.name||'未知')+'；搭子：'+String(importFile.state?.partner?.name||'未知')+'；第'+String(importFile.state?.day||'?')+'日。会校验完整性，现有档案保留。'))return;const r=await client.importBackup(importFile);await client.claim(r.id);screen='home';draft='';importFile=null;setNotice('备份已校验并恢复为新档。');});i.click();return;}
    if(action==='profile-update'){await busy(async()=>{const next=(await client.request('profile',{avatar:state().partner.avatar,member:state().partner.member||''})).profile;if(next.version===state().partner.version){setNotice('角色资料没有变化。');return;}if(!await confirm('更新 '+next.name+' 的资料','会保留旧版本存档点，再更新本档资料。'+(next.worldUnavailable?'绑定世界书当前不可读。':'')))return;await client.save('更新角色资料前');await client.action({type:'profile',avatar:next.avatar,member:next.member||''});setNotice('资料快照已更新，旧版本保留在存档点。');});return;}
  }
  function pause(){active=false;cancelSelection();cancel();if(heartbeat)doc.defaultView.clearInterval(heartbeat);heartbeat=null;}
  function resume(){if(!api.visible()||doc.hidden)return;active=true;if(!heartbeat)heartbeat=doc.defaultView.setInterval(()=>{if(active&&client.writable&&!client.busy)void client.renew().catch(e=>{cancel();setNotice(e.message||'经营权已暂停，请在本机接续。');render();});},20000);}
  async function onNavigate(view){doc.getElementById('rp-phone')?.classList.toggle('rp-shop-open',view==='shop');if(view!=='shop'){pause();return;}mount();const next=api.account();if(next!==account){pause();client.reset();account=next;screen='home';entryLoaded=false;campaigns=[];profile=null;card=null;memberFilter='';draft='';notice='';}resume();if(!entryLoaded&&!loading)await enterHome();else if(screen==='archives'&&!loading)await archives();else render();}
  return{mount,refreshIcon,onNavigate,pause,resume,cancel:pause,busy:()=>loading||!!selection||aiBusy||client.busy,render,
    // Exposed for isolated synthetic integration tests, never contains credentials.
    client,dispatch,get screen(){return screen;}
  };
}
