// Shared deterministic rules. The server owns every committed economic change.
export const SHOP_SCHEMA=1;
export const SHOP_RULES=1;
export const INGREDIENTS={beans:{name:'咖啡豆',cost:700},milk:{name:'牛奶',cost:400},cream:{name:'奶油',cost:500},chocolate:{name:'巧克力',cost:500},tea:{name:'茶叶',cost:400},lemon:{name:'柠檬',cost:300},flour:{name:'面粉',cost:400},butter:{name:'黄油',cost:500},sugar:{name:'糖',cost:200},berry:{name:'莓果',cost:500}};
export const RECIPES=[
 {id:'espresso',name:'浓缩咖啡',price:1800,level:1,items:{beans:1}},
 {id:'americano',name:'美式咖啡',price:2200,level:1,items:{beans:1}},
 {id:'latte',name:'拿铁',price:2800,level:1,items:{beans:1,milk:2}},
 {id:'cappuccino',name:'卡布奇诺',price:3000,level:2,items:{beans:1,milk:1,cream:1}},
 {id:'mocha',name:'摩卡',price:3400,level:2,items:{beans:1,milk:1,chocolate:1}},
 {id:'tea',name:'柠檬红茶',price:2200,level:1,items:{tea:1,lemon:1}},
 {id:'berry',name:'莓果牛奶',price:3000,level:3,items:{milk:2,berry:1}},
 {id:'flatwhite',name:'馥芮白',price:3200,level:4,items:{beans:2,milk:1}},
 {id:'cookie',name:'黄油曲奇',price:1600,level:1,items:{flour:1,butter:1,sugar:1}},
 {id:'cake',name:'莓果小蛋糕',price:3200,level:3,items:{flour:1,butter:1,cream:1,berry:1}},
];
export const EQUIPMENT={machine:{name:'咖啡机',prices:[12000,28000,50000],hint:'改善雨天和低口碑时的客流，每级5个百分点，合计最高15个百分点'},grinder:{name:'磨豆设备',prices:[35000,80000,150000],hint:'每级增加3份日接待能力，最高48份'},shelf:{name:'储物架',prices:[30000,65000,120000],hint:'每级增加40份单项材料容量'}};
export const DECOR=[{id:'plant',name:'窗边绿植',cost:18000,glyph:'♧'},{id:'flowers',name:'一束鲜花',cost:22000,glyph:'❀'},{id:'painting',name:'墙上小画',cost:35000,glyph:'▧'},{id:'lamp',name:'暖光台灯',cost:45000,glyph:'◒'}];
export const EVENTS=[
 ['rain','突然落雨','门外有几位没有带伞的客人。','准备热茶',2500,'先请进来避雨',0],
 ['book','书店的邀请','隔壁书店想交换一张手写推荐卡。','一起准备卡片',1500,'留下下次合作的约定',0],
 ['flowers','柜台的小花','花店送来今天最后几枝花，正在犹豫放在哪里。','买下装点柜台',2000,'用旧花瓶重新布置',0],
 ['cup','缺了一只杯子','一只杯沿裂了，搭子发现得很及时。','补一只新杯',3000,'换用备用杯',0],
 ['gather','临时的小聚会','几位朋友想坐在一起，店里需要重新安排。','准备一份小心意',2000,'重新安排座位',0],
 ['recipe','新品的灵感','搭子提出试一小份新的配方比例。','拿出材料试做',2500,'先记在店册里',0],
 ['music','午后的音乐','有人推荐了一张适合店里的旧唱片。','添一张唱片',1500,'用现有歌单慢慢选',0],
 ['sign','招牌上的字','风把门口的小牌吹歪了。','换一块新牌',2000,'一起重新扶好',0],
 ['neighbor','邻居来访','楼上的邻居带来一张附近的手绘地图。','准备谢礼',1500,'在地图上写下店名',0],
 ['delivery','送货时间变了','今天的送货员绕了远路，需要安排取货。','请人帮忙搬运',2000,'分工慢慢搬',0],
 ['quiet','安静的一刻','客人散去后，窗边留下了一本书。','准备招领书签',1000,'写一张招领便条',0],
 ['cookie','曲奇的香气','有位客人想知道曲奇是什么味道。','准备小份试吃',1800,'认真介绍配方',0],
 ['weekend','周末的邀约','街区下次活动想邀请小店参加。','预留准备预算',2500,'先收下活动消息',0],
 ['photo','一张店内照片','熟客想拍下这个午后，问能否借窗边的位置。','重新布置窗台',1200,'保留今天原本的模样',0],
 ['thanks','留在桌上的纸条','有客人留下一句很认真的感谢。','做一张小小回信',1000,'把纸条收进店册',0],
].map(([id,title,text,a,cost,b])=>({id,title,text,choices:[{id:'care',label:a,cost,reputation:3},{id:'simple',label:b,cost:0,reputation:1}]}));
export const REGULARS=[{id:'reader',name:'隔壁书店店员',favorite:'americano',story:'已经记得他总会在杯子旁放一本书。'},{id:'runner',name:'晨跑的客人',favorite:'espresso',story:'晨跑的路线里，多了小店门前这一段。'},{id:'artist',name:'带画夹的熟客',favorite:'latte',story:'画夹里留着一张窗边的速写。'},{id:'neighbor',name:'楼上的邻居',favorite:'tea',story:'邻居开始习惯在下楼时打声招呼。'},{id:'student',name:'复习的学生',favorite:'mocha',story:'那张靠墙的小桌成了熟悉的位置。'},{id:'florist',name:'花店的朋友',favorite:'berry',story:'偶尔会带来一小枝当天的花。'}];
const MAX_MONEY=100000000000,clone=x=>JSON.parse(JSON.stringify(x));
const fail=(message,code='rule')=>{throw Object.assign(new Error(message),{shopCode:code,status:400});};
const integer=(v,min,max)=>Number.isSafeInteger(v)&&v>=min&&v<=max;
const text=(v,max=200)=>typeof v==='string'&&v.trim()&&v.length<=max;
export const money=n=>(n/100).toLocaleString('zh-CN',{minimumFractionDigits:n%100?2:0,maximumFractionDigits:2});
export function recipeCost(recipe){return Object.entries(recipe.items).reduce((n,[id,q])=>n+INGREDIENTS[id].cost*q,0);}
export function priceRange(recipe){return [Math.ceil(recipe.price*.8/100)*100,Math.min(4000,Math.floor(recipe.price*1.3/100)*100)];}
export function capacity(s){return Math.min(48,[0,16,22,28,36,42][s.level]+s.equipment.grinder*3);}
export function stockLimit(s){return 80+s.equipment.shelf*40;}
export function profit(s){return s.stats.revenue-s.stats.materialCost-s.stats.overhead-s.stats.eventCost;}
function random(s){s.seed=(Math.imul(s.seed,1664525)+1013904223)>>>0;return s.seed/4294967296;}
function addRecord(s,kind,label,amount=0){s.serial++;s.ledger.push({id:'r'+s.serial,day:s.day,kind,label,amount});}
function remember(s,id,title,detail){if(s.memories.some(m=>m.id===id))return;s.memories.push({id,day:s.day,title,detail,pinned:false});}
function freshStats(){return{sold:0,orders:0,revenue:0,materialCost:0,purchases:0,overhead:0,eventCost:0};}
export function createShop({id,name,partner,user,seed=1}){
 if(!text(id,100)||!text(name,36)||!partner||!text(partner.name,100)||!text(partner.ref,200)||!user||!text(user.name,100))fail('店铺或角色资料不完整。');
 const s={schema:SHOP_SCHEMA,rules:SHOP_RULES,id,name:name.trim(),partner:clone(partner),user:clone(user),seed:seed>>>0,serial:0,day:1,phase:'prepare',level:1,cash:100000,reputation:15,totalSold:0,daysClosed:0,equipment:{machine:0,grinder:0,shelf:0},decor:[],stock:{beans:14,milk:16,cream:4,chocolate:4,tea:5,lemon:5,flour:6,butter:5,sugar:5,berry:4},menu:['americano','latte','tea','cookie'],prices:Object.fromEntries(RECIPES.map(r=>[r.id,r.price])),role:'reception',weather:'晴天',wave:0,orders:[],event:null,stats:freshStats(),regulars:Object.fromEntries(REGULARS.map(r=>[r.id,{visits:0,affinity:0}])),memories:[],ledger:[],milestones:[],chat:[],draft:'',lastRescue:-10};
 remember(s,'opening','属于你们的小店','一起决定了店名：'+s.name+'。');addRecord(s,'opening','开店资金',100000);validateShop(s);return s;
}
export function validateShop(s){
 if(!s||s.schema!==SHOP_SCHEMA||s.rules!==SHOP_RULES)fail('存档版本不受支持，请更新插件；原档不会被覆盖。','version');
 if(!text(s.id,100)||!text(s.name,36)||!s.partner||!text(s.partner.ref,200)||!text(s.partner.name,100)||!s.user||!text(s.user.name,100))fail('存档身份信息损坏。','corrupt');
 for(const[k,max]of [['description',120000],['personality',30000],['scenario',30000],['examples',30000],['greeting',20000]])if(s.partner[k]!==undefined&&(typeof s.partner[k]!=='string'||s.partner[k].length>max))fail('角色资料快照损坏。','corrupt');
 for(const k of ['member','cardName'])if(s.partner[k]!==undefined&&!text(s.partner[k],100))fail('角色来源信息损坏。','corrupt');
 if(s.user.description!==undefined&&(typeof s.user.description!=='string'||s.user.description.length>12000))fail('用户资料快照损坏。','corrupt');
 if(s.partner.worldEntries!==undefined){if(!Array.isArray(s.partner.worldEntries)||s.partner.worldEntries.length>500)fail('角色世界书快照损坏。','corrupt');for(const e of s.partner.worldEntries){if(!e||typeof e.content!=='string'||e.content.length>12000||!Array.isArray(e.keys)||e.keys.length>30||e.keys.some(k=>typeof k!=='string'||k.length>500)||(e.secondary!==undefined&&(!Array.isArray(e.secondary)||e.secondary.length>30||e.secondary.some(k=>typeof k!=='string'||k.length>500))))fail('角色世界书条目损坏。','corrupt');}}
 if(!integer(s.day,1,1000000)||!integer(s.cash,0,MAX_MONEY)||!integer(s.level,1,5)||!integer(s.reputation,0,100)||!integer(s.seed,0,4294967295)||!integer(s.serial,0,10000000)||!integer(s.totalSold,0,48000000)||!integer(s.daysClosed,0,s.day)||!['prepare','service','closing','rest'].includes(s.phase))fail('经营数值不合法，原档已保留。','corrupt');
 for(const k of Object.keys(INGREDIENTS))if(!integer(s.stock?.[k],0,200))fail('材料库存损坏。','corrupt');
 for(const k of Object.keys(EQUIPMENT))if(!integer(s.equipment?.[k],0,3))fail('设备资料损坏。','corrupt');
 if(!Array.isArray(s.menu)||!s.menu.length||s.menu.length>6||new Set(s.menu).size!==s.menu.length||s.menu.some(id=>!RECIPES.some(r=>r.id===id&&r.level<=s.level)))fail('菜单不合法。','corrupt');
 for(const r of RECIPES){const [min,max]=priceRange(r);if(!integer(s.prices?.[r.id],min,max)||s.prices[r.id]%100)fail('菜单价格损坏。','corrupt');}
 if(!['reception','making'].includes(s.role)||!integer(s.wave,0,2)||!Array.isArray(s.orders)||s.orders.length>12||s.orders.some(o=>!o||typeof o!=='object')||new Set(s.orders.map(o=>o.id)).size!==s.orders.length)fail('营业阶段损坏。','corrupt');
 for(const o of s.orders)if(!o||!text(o.id,100)||!RECIPES.some(r=>r.id===o.recipe)||!integer(o.qty,1,8)||!integer(o.wave,0,2)||!['pending','served','declined'].includes(o.status)||!integer(o.price,100,4000)||!REGULARS.some(r=>r.id===o.regular)||!text(o.customer,100))fail('订单数据损坏。','corrupt');
 if(s.orders.reduce((n,o)=>n+(o.status==='served'?o.qty:0),0)>48)fail('订单超过日接待上限。','corrupt');
 for(const k of Object.keys(freshStats()))if(!integer(s.stats?.[k],0,MAX_MONEY))fail('当日账目损坏。','corrupt');
 if(s.stats.sold>48||s.stats.revenue>192000||!Array.isArray(s.ledger)||!Array.isArray(s.memories)||!Array.isArray(s.chat)||!Array.isArray(s.decor)||s.decor.some(id=>!DECOR.some(d=>d.id===id))||new Set(s.decor).size!==s.decor.length)fail('存档集合或收入范围损坏。','corrupt');
 for(const r of REGULARS)if(!integer(s.regulars?.[r.id]?.visits,0,10000000)||!integer(s.regulars?.[r.id]?.affinity,0,100))fail('熟客资料损坏。','corrupt');
 if(!integer(s.lastRescue,-10,s.day)||!Array.isArray(s.milestones)||s.milestones.some(n=>![7,30,100].includes(n))||new Set(s.milestones).size!==s.milestones.length)fail('经营纪念数据损坏。','corrupt');
 if(s.event){const original=EVENTS.find(e=>e.id===s.event.id);if(!original||JSON.stringify(s.event.choices)!==JSON.stringify(original.choices)||!['care','simple',null].includes(s.event.choice))fail('营业事件损坏。','corrupt');}
 if(s.orders.reduce((n,o)=>n+o.qty,0)>capacity(s))fail('订单数量超过容量。','corrupt');
 const served=s.orders.filter(o=>o.status==='served');if(s.stats.sold!==served.reduce((n,o)=>n+o.qty,0)||s.stats.orders!==served.length||s.stats.revenue!==served.reduce((n,o)=>n+o.qty*o.price,0)||s.stats.materialCost!==served.reduce((n,o)=>n+o.qty*recipeCost(RECIPES.find(r=>r.id===o.recipe)),0))fail('营业账目与订单不一致。','corrupt');
 for(const m of s.memories)if(!m||!text(m.id,100)||!integer(m.day,1,s.day)||!text(m.title,200)||!text(m.detail,2000)||typeof m.pinned!=='boolean')fail('共同回忆损坏。','corrupt');
 for(const r of s.ledger)if(!r||!text(r.id,100)||!integer(r.day,1,s.day)||!text(r.kind,60)||!text(r.label,200)||!integer(r.amount,-MAX_MONEY,MAX_MONEY))fail('账本记录损坏。','corrupt');
 for(const m of s.chat)if(!m||!text(m.id,100)||!['user','char'].includes(m.role)||typeof m.text!=='string'||m.text.length>200000||!integer(m.day,1,s.day)||(m.role==='user'&&!['pending','done','failed','superseded'].includes(m.replyState)))fail('店内对话损坏。','corrupt');
 if(new Set(s.chat.map(m=>m.id)).size!==s.chat.length||new Set(s.memories.map(m=>m.id)).size!==s.memories.length)fail('存档含有重复记录。','corrupt');
 if(s.commentJob&&(!text(s.commentJob.key,160)||!text(s.commentJob.event,2000)||!['pending','done','failed','superseded'].includes(s.commentJob.status)))fail('搭子发言状态损坏。','corrupt');
 if(new TextEncoder().encode(JSON.stringify(s)).byteLength>6000000)fail('档案已较大，请先导出并联系维护者；原档不会被截断。','quota');return true;
}
function phase(s,...allowed){if(!allowed.includes(s.phase))fail('当前阶段不能进行这个操作，请先完成眼前的营业。');}
function spend(s,n,label,kind='expense'){if(!integer(n,0,MAX_MONEY)||s.cash<n)fail('可用资金不足，尚未扣款。');s.cash-=n;addRecord(s,kind,label,-n);}
export function applyShopAction(source,action){
 validateShop(source);if(!action||typeof action.type!=='string')fail('缺少操作。');const s=clone(source),a=action;
 if(!['comment-result','comment-start','chat-result'].includes(a.type)&&s.commentJob?.status==='pending')s.commentJob.status='superseded';
 switch(a.type){
 case 'plan':{
  phase(s,'prepare','rest');if(!Array.isArray(a.menu)||!a.menu.length||a.menu.length>6||new Set(a.menu).size!==a.menu.length||a.menu.some(id=>!RECIPES.some(r=>r.id===id&&r.level<=s.level)))fail('请选择1至6款已解锁的商品。');
  if(!['reception','making'].includes(a.role))fail('请选择分工。');const prices={...s.prices};for(const id of a.menu){const r=RECIPES.find(r=>r.id===id),[min,max]=priceRange(r),p=a.prices?.[id];if(!integer(p,min,max)||p%100)fail(r.name+'的价格超出允许范围。');prices[id]=p;}s.menu=[...a.menu];s.prices=prices;s.role=a.role;addRecord(s,'plan','商量好今天的菜单与分工');break;
 }
 case 'buy':{phase(s,'prepare','rest');if(!Object.hasOwn(INGREDIENTS,a.item)||!integer(a.quantity,1,100))fail('进货数量不合法。');if(s.stock[a.item]+a.quantity>stockLimit(s))fail('超过储物容量，请减少数量或升级储物架。');const cost=INGREDIENTS[a.item].cost*a.quantity;spend(s,cost,'购入'+INGREDIENTS[a.item].name+' ×'+a.quantity,'purchase');s.stock[a.item]+=a.quantity;s.stats.purchases+=cost;break;}
 case 'open':{
  phase(s,'prepare');s.orders=[];s.wave=0;s.weather=['晴天','微雨','多云'][Math.floor(random(s)*3)];s.event={...clone(EVENTS[Math.floor(random(s)*EVENTS.length)]),choice:null};
  const cap=capacity(s),factor=(s.weather==='微雨'?.75:.90)+(s.reputation/100)*.10+s.equipment.machine*.05;let remaining=Math.min(cap,Math.max(6,Math.floor(cap*factor)));
  const perWave=[Math.ceil(remaining/3),Math.ceil(remaining/3)];perWave.push(remaining-perWave[0]-perWave[1]);
  for(let wave=0;wave<3;wave++){let need=perWave[wave];for(let n=0;n<3&&need>0;n++){const chosen=s.menu[Math.floor(random(s)*s.menu.length)],recipe=RECIPES.find(r=>r.id===chosen),elasticity=Math.max(.2,Math.min(1.2,1-(s.prices[recipe.id]/recipe.price-1)*1.8));const qty=Math.min(8,need,Math.max(1,Math.floor((n===2?need:Math.ceil(need/(3-n)))*elasticity)));need-=qty;const regular=REGULARS[Math.floor(random(s)*REGULARS.length)];s.orders.push({id:'d'+s.day+'w'+wave+'o'+n,wave,recipe:recipe.id,qty,price:s.prices[recipe.id],customer:regular.name,regular:regular.id,status:'pending'});}}
  s.phase='service';remember(s,'first-open','第一次开门','你和'+s.partner.name+'一起迎来了第一批客人。');addRecord(s,'open','第'+s.day+'日开门，'+s.weather);break;
 }
 case 'serve':case 'decline':{
  phase(s,'service');const o=s.orders.find(o=>o.id===a.orderId);if(!o||o.wave!==s.wave||o.status!=='pending')fail('这张订单已处理或尚未开始。');const recipe=RECIPES.find(r=>r.id===o.recipe);
  if(a.type==='serve'){if(s.stats.sold+o.qty>capacity(s))fail('已达到今日接待能力。');for(const[id,q]of Object.entries(recipe.items))if(s.stock[id]<q*o.qty)fail(INGREDIENTS[id].name+'不足，可先婉拒这张订单，下一日再补货。');for(const[id,q]of Object.entries(recipe.items))s.stock[id]-=q*o.qty;const revenue=o.price*o.qty;s.cash+=revenue;s.stats.revenue+=revenue;s.stats.materialCost+=recipeCost(recipe)*o.qty;s.stats.sold+=o.qty;s.stats.orders++;s.totalSold+=o.qty;s.reputation=Math.min(100,s.reputation+1);o.status='served';const r=s.regulars[o.regular];r.visits++;r.affinity=Math.min(100,r.affinity+(REGULARS.find(r=>r.id===o.regular).favorite===o.recipe?5:2));if(r.visits===3)remember(s,'regular-'+o.regular,'慢慢熟悉的客人',REGULARS.find(r=>r.id===o.regular).story);addRecord(s,'sale',o.customer+' · '+recipe.name+' ×'+o.qty,revenue);
  }else{o.status='declined';s.reputation=Math.max(0,s.reputation-1);addRecord(s,'decline','婉拒订单：'+recipe.name);}
  break;
 }
 case 'event':{phase(s,'service');if(s.wave!==1||!s.event||s.event.choice)fail('这件事已经处理或尚未发生。');const choice=s.event.choices.find(c=>c.id===a.choice);if(!choice)fail('请选择有效的处理方式。');spend(s,choice.cost,s.event.title+'：'+choice.label,'event');s.stats.eventCost+=choice.cost;s.reputation=Math.min(100,s.reputation+choice.reputation);s.event.choice=choice.id;remember(s,'event-'+s.day,s.event.title,choice.label+'。');break;}
 case 'wave':{phase(s,'service');if(s.orders.some(o=>o.wave===s.wave&&o.status==='pending'))fail('请先处理本批订单。');if(s.wave===1&&!s.event?.choice)fail('请先和搭子处理今天的小插曲。');if(s.wave<2)s.wave++;else s.phase='closing';break;}
 case 'close':{
  phase(s,'closing');const fee=Math.min(s.cash,4000+(s.level-1)*2000);spend(s,fee,'当日营业支出','overhead');s.stats.overhead=fee;s.daysClosed++;s.phase='rest';remember(s,'closing-'+s.day,'第'+s.day+'日打烊','完成'+s.stats.sold+'份商品，经营净收益'+money(profit(s))+'。');
  for(const [day,reward]of [[7,10000],[30,20000],[100,20000]])if(s.daysClosed>=day&&!s.milestones.includes(day)){s.milestones.push(day);s.cash+=reward;addRecord(s,'milestone',day+'日共同纪念',reward);remember(s,'milestone-'+day,'一起经营的第'+day+'天','留下一个属于这家店的小小纪念。');}break;
 }
 case 'next':{phase(s,'rest');s.day++;s.phase='prepare';s.orders=[];s.event=null;s.wave=0;s.stats=freshStats();break;}
 case 'equipment':{phase(s,'prepare','rest');if(!Object.hasOwn(EQUIPMENT,a.item))fail('设备不存在。');const e=EQUIPMENT[a.item],level=s.equipment[a.item];if(!integer(level,0,2))fail('设备已满级。');spend(s,e.prices[level],'升级'+e.name+'至'+(level+1)+'级','upgrade');s.equipment[a.item]++;remember(s,'equipment-'+a.item+'-'+(level+1),'新的'+e.name,'一起把'+e.name+'升级到了'+(level+1)+'级。');break;}
 case 'expand':{phase(s,'prepare','rest');const row=[null,{cost:60000,day:4,sold:30},{cost:140000,day:10,sold:100},{cost:260000,day:20,sold:250},{cost:420000,day:35,sold:500}][s.level];if(!row)fail('小店已达到当前最高成长阶段。');if(s.day<row.day||s.totalSold<row.sold)fail('还需要经营到第'+row.day+'日，并累计售出'+row.sold+'份商品。');spend(s,row.cost,'小店成长至第'+(s.level+1)+'阶段','upgrade');s.level++;remember(s,'level-'+s.level,'小店的新阶段','和'+s.partner.name+'一起走到了第'+s.level+'阶段。');break;}
 case 'decor':{phase(s,'prepare','rest');const d=DECOR.find(d=>d.id===a.item);if(!d||s.decor.includes(d.id))fail('这件陈列已拥有或不存在。');spend(s,d.cost,'添置'+d.name,'decor');s.decor.push(d.id);remember(s,'decor-'+d.id,'店里的'+d.name,'为店里添置了'+d.name+'。');break;}
 case 'rescue':{phase(s,'prepare','rest');const usable=RECIPES.some(r=>r.level<=s.level&&Object.entries(r.items).every(([id,q])=>s.stock[id]>=q));if(s.cash>=8000||usable||s.day-s.lastRescue<3)fail('周转补给仅在资金不足80且不能制作任一已解锁商品时开放，每3个游戏日一次。');s.cash+=20000;s.lastRescue=s.day;addRecord(s,'rescue','街区的周转补给',20000);break;}
 case 'pin':{const m=s.memories.find(m=>m.id===a.memoryId);if(!m)fail('没有找到这段回忆。');m.pinned=!m.pinned;break;}
 case 'rename':{if(!text(a.name,36))fail('店名需要1至36个字。');s.name=a.name.trim();addRecord(s,'rename','店铺更名为'+s.name);break;}
 case 'profile':{if(!a.profile||a.profile.ref!==s.partner.ref||!text(a.profile.name,100))fail('角色来源不同，不能替换当前搭子。');s.partner=clone(a.profile);addRecord(s,'profile','更新了搭子资料，旧版本保留在存档点中');break;}
 case 'chat-user':{if(!text(a.text,8000)||!text(a.id,100)||s.chat.some(m=>m.id===a.id))fail('消息为空、过长或已存在。');for(const m of s.chat)if(m.role==='user'&&['pending','failed'].includes(m.replyState))m.replyState='superseded';s.chat.push({id:a.id,role:'user',text:a.text.trim(),day:s.day,phase:s.phase,replyState:'pending'});break;}
 case 'chat-retry':{const m=s.chat.find(m=>m.id===a.id&&m.role==='user');if(!m||!['failed','pending'].includes(m.replyState))fail('这条消息不能重试。');m.replyState='pending';delete m.replyError;break;}
 case 'chat-result':{if(!text(a.replyTo,100))fail('缺少回复来源。');const m=s.chat.find(m=>m.id===a.replyTo&&m.role==='user');if(!m||m.replyState!=='pending')fail('提问状态已改变，请刷新记录。');if(a.error){m.replyState='failed';m.replyError=String(a.error).slice(0,60);}else{if(!text(a.text,200000)||!text(a.id,100))fail('回复为空或过长。');m.replyState='done';s.chat.push({id:a.id,role:'char',text:a.text,day:s.day,phase:s.phase,replyTo:m.id});}break;}
 case 'comment':{if(!text(a.text,200000)||!text(a.id,100)||!text(a.eventKey,160)||s.chat.some(m=>m.eventKey===a.eventKey||m.id===a.id))fail('发言为空或已经保存。');s.chat.push({id:a.id,role:'char',text:a.text,day:s.day,phase:s.phase,eventKey:a.eventKey,kind:'event-comment'});break;}
 case 'comment-start':{if(!text(a.eventKey,160)||!text(a.event,2000)||s.chat.some(m=>m.eventKey===a.eventKey)||s.chat.some(m=>m.role==='user'&&['pending','failed'].includes(m.replyState)))fail('请先处理尚未回复的提问，或此事件已经发言。');if(s.commentJob?.key===a.eventKey&&s.commentJob.status!=='failed'&&a.retry!==true)fail('这个事件已经请求过发言。');s.commentJob={key:a.eventKey,event:a.event,status:'pending'};break;}
 case 'comment-result':{if(s.commentJob?.key!==a.eventKey||s.commentJob.status!=='pending')fail('局面已改变，过期发言不再保存。');if(a.error){s.commentJob.status='failed';s.commentJob.error=String(a.error).slice(0,60);}else{if(!text(a.text,200000)||!text(a.id,100)||s.chat.some(m=>m.id===a.id))fail('回复为空、过长或已经保存。');s.commentJob.status='done';s.chat.push({id:a.id,role:'char',text:a.text,day:s.day,phase:s.phase,eventKey:a.eventKey,kind:'event-comment'});}break;}
 default:fail('未知的经营操作。');
 }
 validateShop(s);return s;
}
