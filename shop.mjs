import {INGREDIENTS,RECIPES,EQUIPMENT,DECOR,REGULARS,capacity,stockLimit,money,profit,priceRange} from './shop-engine.mjs?v=20261018-shop-60';
import {createShopClient} from './shop-client.mjs?v=20261018-shop-60';
import {shopPrompt} from './shop-dialogue.mjs?v=20261018-shop-60';

const P='#rp-phone #rp-screen #rp-view-shop';
export const SHOP_CSS=`
${P},#rp-phone.rp-art-icons.rp-shop-open #rp-frame #rp-screen #rp-view-shop.rp-view{display:none;flex-direction:column;overflow:hidden!important;background:#f8f5ee!important;color:#44372f!important;isolation:isolate;font-family:inherit;font-weight:400;font-style:normal;--shop-muted:#82756a;--shop-line:#ded6c9;}
${P} *{box-sizing:border-box;}
${P} [hidden]{display:none!important;}
${P} button,${P} input,${P} textarea,${P} select{font-family:inherit;font-style:normal;font-weight:400;color:inherit;box-shadow:none;}
${P} button{touch-action:manipulation;cursor:pointer;background:transparent!important;border:0!important;padding:8px;min-height:40px;font-size:14px;line-height:1.5;white-space:normal;word-break:break-word;}
${P} button:disabled{opacity:.45;cursor:default;}
${P} .shop-nav{position:relative;flex:0 0 88px;min-height:88px;padding:44px 12px 0;display:flex;align-items:center;gap:4px;z-index:3;}
${P} .shop-back{flex:0 0 36px;width:36px;padding:0;font-size:28px;}
${P} .shop-nav-title{flex:1;min-width:0;text-align:center;font-size:16px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
${P} .shop-nav-save{flex:0 0 auto;max-width:84px;}
${P} .shop-nav button{height:40px;min-height:40px;padding:0 6px;line-height:1;display:flex;align-items:center;justify-content:center;}
${P} .shop-body{flex:1;min-height:0;overflow:auto;overscroll-behavior:contain;padding:8px 22px 24px;scrollbar-width:thin;}
${P} .shop-foot{display:flex;flex:0 0 auto;justify-content:space-around;gap:4px;border-top:1px solid var(--shop-line);padding:3px 12px 22px;background:#f8f5ee!important;}
${P} .shop-foot button{flex:1;min-width:0;font-size:13px;}
${P} .shop-foot button[aria-current="page"]{font-weight:700;text-decoration:underline;text-underline-offset:6px;}
${P} .shop-kicker{font-size:11px;letter-spacing:2px;color:var(--shop-muted);margin:8px 0 18px;}
${P} .shop-title{font-family:Georgia,'Noto Serif SC','Songti SC',serif;font-size:30px;font-weight:400;line-height:1.3;margin:0 15% 0 0;overflow-wrap:anywhere;position:relative;z-index:1;}
${P} .shop-hero{position:relative;min-height:200px;padding:8px 0 10px;margin:0 -10px 0 0;}
${P} .shop-art{position:absolute;right:0;bottom:0;width:84%;height:190px;object-fit:contain;object-position:right bottom;pointer-events:none;opacity:.72;}
${P} .shop-day{position:relative;z-index:1;margin:22px 0 0;font-size:13px;max-width:50%;line-height:1.8;}
${P} .shop-money{font-family:Georgia,serif;font-size:29px;margin:4px 0 8px;}
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
  const doc=api.document,client=createShopClient(api);let root,body,foot,status,mountedRuntime,screen='archives',lastScreen='',campaigns=[],snapshots=[],profile=null,cards=[],filter='',notice='',loading=false,active=false,account=null;
  let heartbeat=null,controller=null,generation=0,aiBusy=false,lastSpeech=0,manualAt=0,draft='',importFile=null,bookTab='memory',bookPage=1;
  const node=(tag,cls,text)=>{const n=doc.createElement(tag);if(cls)n.className=cls;if(text!==undefined)n.textContent=String(text);return n;};
  const btn=(text,action,cls='',disabled=false)=>{const b=node('button',cls,text);b.type='button';b.dataset.action=action;b.disabled=disabled;return b;};
  const desc=(text,parent=body)=>parent.append(node('p','shop-muted',text));
  const heading=(text)=>body.append(node('h2','shop-section',text));
  const state=()=>client.current?.state;
  const disabled=()=>loading||client.busy||!client.writable||client.uncertain;
  function setNotice(text){notice=text;status&&(status.textContent=text);}
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
    root.addEventListener('input',e=>{if(e.target.id==='shop-draft'){draft=e.target.value;manualAt=Date.now();if(aiBusy&&state()?.commentJob?.status==='pending'){cancel();setNotice('已优先保留你的输入；可发送消息。');}}if(e.target.id==='shop-partner-search'){filter=e.target.value;renderPartnerList();}});
    root.addEventListener('keydown',e=>{if(e.target.id==='shop-draft'&&e.key==='Enter'&&(e.ctrlKey||e.metaKey)&&!e.isComposing){e.preventDefault();void dispatch('send');}});
    if(!doc.querySelector('[data-folder-app="shop"]')){const item=node('div','rp-folder-item');item.dataset.folderApp='shop';item.append(node('div','rp-folder-item-ico'),node('div','rp-folder-item-lbl','小店'));doc.querySelector('#rp-folder-modal .rp-folder-popup')?.append(item);}
    refreshIcon();render();
  }
  function input(label,id,value,type='text',max=null,parent=body){const l=node('label','',label),i=node(type==='textarea'?'textarea':'input');i.id=id;if(type!=='textarea')i.type=type;i.value=value??'';if(max)i.maxLength=max;l.append(i);parent.append(l);return i;}
  function actions(parent,...buttons){const a=node('div','shop-actions');a.append(...buttons);parent.append(a);}
  function row(title,text){const r=node('section','shop-row');if(title)r.append(node('h3','',title));if(text)r.append(node('div','shop-muted',text));body.append(r);return r;}
  function render(preserve=true){
    if(!root)return;let values=[],focus=null,selection=null,scroll=0;
    if(preserve&&lastScreen===screen){scroll=body?.scrollTop||0;values=[...root.querySelectorAll('input[id],textarea[id],select[id]')].map(n=>[n.id,n.value,n.checked]);if(root.contains(doc.activeElement)){focus=doc.activeElement.id;selection=[doc.activeElement.selectionStart,doc.activeElement.selectionEnd];}}
    root.replaceChildren();const nav=node('header','shop-nav');nav.append(btn('‹','back','shop-back'),node('div','shop-nav-title',screen==='home'?'双人小店':({archives:'存档与小店',create:'与你开店',plan:'今日菜单',stock:'备货',service:'店内营业',closing:'打烊账页',upgrades:'小店成长',book:'共同店册',chat:'和搭子商量',points:'存档点',profile:'搭子资料'}[screen]||'双人小店')),btn('存档','archives','shop-nav-save'));root.append(nav);
    body=node('main','shop-body');root.append(body);status=node('div','shop-status');status.setAttribute('role','status');status.setAttribute('aria-live','polite');status.textContent=notice;body.append(status);
    if(loading)body.append(node('p','shop-muted','正在核对云端进度…'));if(aiBusy)body.append(btn('暂停搭子回应，继续经营','stop','shop-link'));
    if(client.uncertain)body.append(btn('核对上次保存结果','recover','shop-primary',loading));
    const s=state();if(s&&!['archives','create','points','profile'].includes(screen)){const line=node('div','shop-pair');line.append(node('span','shop-badge','第 '+s.day+' 日 · '+PHASE[s.phase]),btn(client.writable?'已云存档 · 刷新':'在本机继续',client.writable?'refresh':'takeover','shop-link',loading));body.append(line);}
    if(!client.backupAvailable)desc('自动备份暂时异常，云端主档仍保留。请先导出一份备份并联系管理员。');
    if(screen==='archives')renderArchives();else if(screen==='create')renderCreate();else if(!s){desc('请先选择一份小店档案。');body.append(btn('选择小店','archives','shop-primary'));}else if(screen==='home')renderHome(s);else if(screen==='plan')renderPlan(s);else if(screen==='stock')renderStock(s);else if(screen==='service')renderService(s);else if(screen==='closing')renderClosing(s);else if(screen==='upgrades')renderUpgrades(s);else if(screen==='book')renderBook(s);else if(screen==='chat')renderChat(s);else if(screen==='points')renderPoints(s);else if(screen==='profile')renderProfile(s);
    if(s&&!['archives','create','points','profile'].includes(screen)){foot=node('nav','shop-foot');for(const [label,a]of [['营业','home'],['商量','chat'],['店册','book']]){const b=btn(label,'view:'+a);if(screen===a)b.setAttribute('aria-current','page');foot.append(b);}root.append(foot);}
    lastScreen=screen;for(const[id,value,checked]of values){const e=doc.getElementById(id);if(e){e.value=value;e.checked=checked;}}body.scrollTop=scroll;if(focus){const e=doc.getElementById(focus);e?.focus({preventScroll:true});try{e?.setSelectionRange(...selection);}catch{}}
  }
  function renderHome(s){
    body.append(node('p','shop-kicker','OUR LITTLE ATELIER'));const hero=node('section','shop-hero');hero.append(node('h1','shop-title',s.name),image(true));const day=node('div','shop-day',s.weather+' / '+s.partner.name);day.append(node('div','shop-money',money(s.cash)),node('span','shop-muted','可用资金'));hero.append(day);body.append(hero);
    const last=s.chat.filter(m=>m.role==='char').at(-1),note=node('blockquote','shop-note shop-preview',last?last.text:'门还未打开，杯子已经摆好了。今天想从哪里开始？');body.append(note,node('p','shop-caption','— '+s.partner.name+' · '+(last?'店内留言':'开店手记')));if(last)body.append(btn('继续聊 ↗','view:chat','shop-link'));
    if(s.commentJob&&['failed','pending'].includes(s.commentJob.status)&&!aiBusy)actions(body,btn('搭子发言未完成 · 重试','retry-comment','shop-link',disabled()));
    const links=node('div','shop-pair');links.append(btn('今日菜单 ↗','view:plan','shop-link'),btn('材料与进货 ↗','view:stock','shop-link'));body.append(links);
    const text={prepare:'一起打开店门 →',service:'回到店内 · 第'+(s.wave+1)+'批 →',closing:'一起对一对账 →',rest:'开始第 '+(s.day+1)+' 日 →'}[s.phase];body.append(btn(text,'primary','shop-primary',disabled()||aiBusy));
    actions(body,btn('小店成长','view:upgrades'),btn('搭子资料','view:profile'));desc('第'+s.level+'阶段 · 今日接待上限'+capacity(s)+'份 · 口碑'+s.reputation+' / 100。游戏日由你推进，离开不扣钱。');
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
  function renderArchives(){heading('每一家，都好好留下');desc('主存档与自动备份保存在你所在酒馆的个人账户目录；同一服务器、同一账户换设备即可接续。下载的副本可保存在自己的设备或个人网盘。手动存档点用于回看或另开分支，原档保留。');actions(body,btn('开一家新店','new','shop-link',loading),btn('刷新列表','archives','shop-link',loading),btn('导入备份','import','shop-link',loading));if(state())actions(body,btn('回到当前小店','view:home','shop-link'),btn('保存一个存档点','save-point','shop-link',disabled()),btn('查看当前存档点','points','shop-link',loading),btn('导出当前小店','export','shop-link',loading),btn('修改店名','rename','shop-link',disabled()));let group='';for(const c of [...campaigns].sort((a,b)=>a.partnerRef.localeCompare(b.partnerRef)||b.updated-a.updated)){if(c.partnerRef!==group){group=c.partnerRef;heading(c.partner);}const r=row(c.name,'第'+c.day+'日 · '+(PHASE[c.phase]||c.phase)+(c.deleted?' · 回收区':'')+' · '+new Date(c.updated).toLocaleString());if(c.deleted)actions(r,btn('恢复到列表','restore:'+c.id,'shop-link',loading));else actions(r,btn('打开','open:'+c.id,'shop-link',loading),btn('移入回收区','trash:'+c.id,'shop-danger',loading));}if(!campaigns.length)desc('还没有小店。创建时选择搭子，即使从另一位角色的聊天打开，也会读取你所选搭子的资料。');desc('自动保留每档最近30个重要节点；手动点最多500个，不自动删除。下载导出包含完整当前进度及本档全部对话/回忆；历史存档点保留在服务器。需要导出旧点时先另开新档。备份不包含API密钥。');}
  function renderCreate(){heading('选一个，与你一起开店的人');input('店名','shop-name','转角咖啡馆','text',36);input('搜索账户中的角色','shop-partner-search',filter,'text',100);body.append(node('div','shop-partners'));renderPartnerList();if(profile){heading(profile.name);desc('已读取该角色资料'+(profile.worldName?'与绑定世界书「'+profile.worldName+'」':'')+'，不会读取当前主楼的其他角色。');if(profile.worldUnavailable)desc('绑定世界书暂不可读，将只使用角色卡资料。可以取消并稍后再建。');body.append(btn('和 '+profile.name+' 开始新店','create','shop-primary',loading));}desc('每次新建都是独立进度；不会替换同一搭子的旧店。');}
  function renderPartnerList(){const host=root?.querySelector('.shop-partners');if(!host)return;host.replaceChildren();const matches=cards.filter(c=>c.name.toLowerCase().includes(filter.toLowerCase()));for(const c of matches.slice(0,60)){const b=btn(c.name,'partner','shop-link',loading);b.dataset.avatar=c.avatar;host.append(b);}if(matches.length>60)desc('还有更多角色，请继续输入名字筛选。',host);if(!matches.length)desc('没有找到角色，请先在酒馆导入角色卡。',host);}
  function renderPoints(s){heading(s.name+'的存档点');desc('打开旧点会建立一份新档，当前进度继续保留。');body.append(btn('新建手动存档点','save-point','shop-link',disabled()));for(const x of snapshots){const r=row(x.label,'第'+x.day+'日 · '+(x.kind==='auto'?'自动':'手动')+' · '+new Date(x.at).toLocaleString());const b=btn('从此处另开新档','fork','shop-link',loading);b.dataset.snapshot=x.id;b.dataset.label=x.label;actions(r,b);}}
  function renderProfile(s){heading(s.partner.name);desc('本档固定使用选中角色的资料快照，不随主楼切换。来源：'+s.partner.avatar+'。角色卡删除后仍可凭快照经营。');desc('更新资料前会保留旧版本存档点；不会更换搭子或带入主楼历史。世界书采用该卡绑定条目的常驻/文字关键词匹配；不执行正则和递归宏。');body.append(btn('检查角色资料更新','profile-update','shop-primary',disabled()||aiBusy));desc('当前版本 '+String(s.partner.version||'').slice(0,12));}
  async function busy(fn,{draw=true}={}){if(loading)return;loading=true;if(draw)render();try{return await fn();}catch(e){setNotice(e.message||'操作未完成，请稍后重试。');api.notify?.(e.message||'操作未完成');}finally{loading=false;if(draw)render();}}
  async function archives(){cancel();await busy(async()=>{campaigns=await client.list();screen='archives';setNotice('列表已与服务器核对。');});}
  async function open(id){cancel();await busy(async()=>{await client.release();await client.load(id);try{await client.claim(id);}catch(e){if(e.status!==423)throw e;setNotice(e.message);}screen='home';draft='';bookPage=1;});}
  async function act(action,event=null){cancel();let saved=false;await busy(async()=>{await client.action(action);saved=true;setNotice('已保存到服务器。');if(action.type==='wave'&&state().phase==='closing')screen='closing';if(['close','next','open'].includes(action.type))screen=action.type==='open'?'service':'home';});if(saved&&event&&active&&client.writable&&!client.uncertain&&Date.now()-lastSpeech>10000&&Date.now()-manualAt>15000&&!draft.trim())void speak({event});}
  async function speak({messageId=null,event=null,retry=false}={}){
    if(!active||disabled()||aiBusy)return;cancel();const mine=generation,owner=api.account(),id=state()?.id;controller=new AbortController();const task={signal:controller.signal,valid:()=>mine===generation&&active&&owner===api.account()&&state()?.id===id};aiBusy=true;lastSpeech=Date.now();
    try{
      let key;
      if(messageId){if(retry)await client.action({type:'chat-retry',id:messageId});}
      else{key=event?state().day+':'+state().phase+':'+state().wave+':'+state().serial:state().commentJob?.key;event=event||state().commentJob?.event;if(!key||!event)throw new Error('当前没有可继续的发言。');await client.action({type:'comment-start',eventKey:key,event,retry});}
      if(!task.valid())return;render();const rev=client.current.rev,s=state(),message=messageId?s.chat.find(m=>m.id===messageId):null,request=shopPrompt(s,{message,event,retry});
      const raw=await api.call(request.prompt,request.maxTokens,request.system,task);if(!task.valid()||client.current.rev!==rev)return;const text=api.clean(raw,s.partner.name);if(!text||!text.trim())throw new Error('搭子的回复为空，请手动重试。');
      await client.action(messageId?{type:'chat-result',replyTo:messageId,id:uid(),text}:{type:'comment-result',eventKey:key,id:uid(),text});setNotice('搭子的回应已保存。');
    }catch(e){if(task.valid()){try{await client.action(messageId?{type:'chat-result',replyTo:messageId,error:api.classify?.(e)||'request'}:{type:'comment-result',eventKey:state()?.commentJob?.key,error:api.classify?.(e)||'request'});}catch{}setNotice('回应未完成：'+(api.errorText?.(e)||e.message)+' 可以手动重试；经营进度已保留。');}}
    finally{if(mine===generation){aiBusy=false;controller=null;render();}}
  }
  function dialog(title,message,field=null){return new Promise(resolve=>{const content=node('div');if(message)content.append(node('p','',message));let control;if(field){control=input(title,'shop-dialog-value',field.value,'text',field.maxLength,content);}let settled=false,observer;const finish=x=>{if(!settled){settled=true;observer?.disconnect();resolve(x);}};const panel=api.dialog(title,content,[{label:'取消',run:()=>finish(null)},{label:field?'确定':'继续',primary:true,run:()=>{if(field&&!control.value.trim()){control.focus();return false;}finish(field?{value:control.value.trim()}:true);}}]);const element=panel?.[0]||panel;observer=new doc.defaultView.MutationObserver(()=>{if(element&&!element.isConnected)finish(null);});observer.observe(doc.getElementById('rp-screen'),{childList:true,subtree:true});});}
  async function ask(text,value='',maxLength=80){return dialog(text,'',{value,maxLength});}
  async function confirm(title,message){return !!await dialog(title,message);}
  async function dispatch(action,b){
    if(!active)return;if(action.startsWith('view:')){screen=action.slice(5);notice='';bookPage=1;render(false);return;}
    if(action==='back'){if(screen==='home'||screen==='archives'){pause();api.navigate('home');}else{screen=state()?'home':'archives';render(false);}return;}
    if(action==='archives'){await archives();return;}
    if(action==='recover'){await busy(async()=>{const r=await client.recover();if(r?.id)await client.load(r.id);setNotice('已核对上次操作，请查看进度再继续。');});return;}
    if(action==='new'){cancel();profile=null;cards=api.characters();filter='';screen='create';render(false);return;}
    if(action==='partner'){await busy(async()=>{profile=(await client.request('profile',{avatar:b.dataset.avatar})).profile;});return;}
    if(action==='create'){const name=doc.getElementById('shop-name')?.value?.trim();if(!profile||!name){setNotice('请填写店名并选择搭子。');return;}await busy(async()=>{await client.release();const r=await client.mutate('create',{name,avatar:profile.avatar,user:api.user()});await client.claim(r.id);screen='home';draft='';setNotice('新店已建立并保存到云端。');});if(screen==='home'&&!loading)void speak({event:'你们一起确定了店名，正站在第一次开门前的小店里。'});return;}
    if(action.startsWith('open:')){await open(action.slice(5));return;}
    if(action==='refresh'){await busy(async()=>{await client.load(state().id);setNotice('已核对服务器最新进度。');});return;}
    if(action==='takeover'){if(await confirm('在本机继续经营','会暂停另一设备的写入，另一设备未保存的操作不会覆盖本机。'))await busy(async()=>{await client.claim(state().id,true);setNotice('已在本机接续。');});return;}
    if(action==='primary'){const s=state();if(s.phase==='prepare'){if(await confirm('开门营业','菜单与进货将在今天固定；请确认材料准备充足。'))await act({type:'open'},'今天开门了，看看天气、菜单和分工，自然和用户说句话。');}else if(s.phase==='rest')await act({type:'next'},'你们开始了新一个经营日，回顾昨天，商量今天。');else{screen=s.phase==='closing'?'closing':'service';render(false);}return;}
    if(action==='plan-save'){const menu=RECIPES.filter(r=>doc.getElementById('shop-menu-'+r.id)?.checked).map(r=>r.id),prices=Object.fromEntries(menu.map(id=>[id,Number(doc.getElementById('shop-price-'+id)?.value)*100])),role=doc.getElementById('shop-role').value;await act({type:'plan',menu,prices,role});return;}
    const parts=action.split(':');if(['buy','serve','decline','event','equipment','decor','pin'].includes(parts[0])){const[type,id,num]=parts;const a=type==='buy'?{type,item:id,quantity:Number(num)}:['serve','decline'].includes(type)?{type,orderId:id}:type==='event'?{type,choice:id}:type==='pin'?{type,memoryId:id}:{type,item:id};if(['equipment','decor','decline'].includes(type)&&!await confirm('确认这次安排','请确认页面所列内容与费用。服务器确认后才会生效。'))return;await act(a,type==='event'?'你们处理了今天的小插曲，回应这个具体决定。':null);return;}
    if(['wave','close','expand','rescue'].includes(action)){if(['expand','rescue'].includes(action)&&!await confirm('确认安排','请确认页面说明与资金条件，操作会写入本档。'))return;await act({type:action},['wave','close'].includes(action)?'营业进度刚刚变化，请结合当前批次、订单或结算，与用户自然交流。':null);return;}
    if(action.startsWith('book:')){bookTab=parts[1];bookPage=1;render(false);return;}
    if(action==='book-more'||action==='chat-more'){bookPage++;render();return;}
    if(action==='send'){const text=(doc.getElementById('shop-draft')?.value||draft).trim();if(!text){setNotice('先写下想说的话。');return;}cancel();manualAt=Date.now();const id=uid();let saved=false;await busy(async()=>{await client.action({type:'chat-user',id,text});saved=true;draft='';screen='chat';render(false);});if(saved)void speak({messageId:id});return;}
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
    if(action==='profile-update'){await busy(async()=>{const next=(await client.request('profile',{avatar:state().partner.avatar})).profile;if(next.version===state().partner.version){setNotice('角色资料没有变化。');return;}if(!await confirm('更新 '+next.name+' 的资料','会保留旧版本存档点，再更新本档资料。'+(next.worldUnavailable?'绑定世界书当前不可读。':'')))return;await client.save('更新角色资料前');await client.action({type:'profile',avatar:next.avatar});setNotice('资料快照已更新，旧版本保留在存档点。');});return;}
  }
  function pause(){active=false;cancel();if(heartbeat)doc.defaultView.clearInterval(heartbeat);heartbeat=null;}
  function resume(){if(!api.visible()||doc.hidden)return;active=true;if(!heartbeat)heartbeat=doc.defaultView.setInterval(()=>{if(active&&client.writable&&!client.busy)void client.renew().catch(e=>{cancel();setNotice(e.message||'经营权已暂停，请在本机接续。');render();});},20000);}
  async function onNavigate(view){doc.getElementById('rp-phone')?.classList.toggle('rp-shop-open',view==='shop');if(view!=='shop'){pause();return;}mount();const next=api.account();if(next!==account){pause();client.reset();account=next;screen='archives';campaigns=[];profile=null;draft='';notice='';}resume();if(screen==='archives'&&!loading)await archives();else render();}
  return{mount,refreshIcon,onNavigate,pause,resume,cancel:pause,busy:()=>loading||aiBusy||client.busy,render,
    // Exposed for isolated synthetic integration tests, never contains credentials.
    client,dispatch,get screen(){return screen;}
  };
}
