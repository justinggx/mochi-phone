export const GAME_STAT_NAMES = Object.freeze({ludo:'飞行棋',g2048:'2048',gm:'黄金矿工',gword:'你说我猜',gomoku:'五子棋',sudoku:'数独'});
const own=(o,k)=>Object.hasOwn(o||{},k),terminal=new Set(['win','loss','draw','abandoned','done']);
const period=(bank,game)=>bank.resets[game]?JSON.stringify([bank.resets[game].sequence,bank.resets[game].id]):'';
export function normalizeGameStats(raw){
  const records=Object.create(null),resets=Object.create(null);if(!raw||typeof raw!=='object'||Array.isArray(raw)||raw.version!==1||!raw.records||typeof raw.records!=='object'||Array.isArray(raw.records))return{version:1,records,resets};
  for(const [game,r]of Object.entries(raw.resets&&typeof raw.resets==='object'&&!Array.isArray(raw.resets)?raw.resets:{}))if(own(GAME_STAT_NAMES,game)&&Number.isSafeInteger(r?.sequence)&&r.sequence>0&&typeof r.id==='string'&&r.id.length>0&&r.id.length<=100)resets[game]={sequence:r.sequence,id:r.id};
  for(const [id,r]of Object.entries(raw.records)){
    if(!id||id.length>1000||!r||!own(GAME_STAT_NAMES,r.game)||typeof r.partner!=='string'||!r.partner.trim()||r.partner.length>100||!Number.isSafeInteger(r.started)||r.started<0||!(r.outcome===null||terminal.has(r.outcome)))continue;
    if(r.game==='gm'&&!['vs','coop'].includes(r.mode))continue;
    if(r.epoch!==undefined&&(typeof r.epoch!=='string'||r.epoch.length>250))continue;
    const ended=r.outcome===null?null:Number.isSafeInteger(r.ended)&&r.ended>=r.started?r.ended:null;if(r.outcome!==null&&ended===null)continue;
    Object.defineProperty(records,id,{value:{game:r.game,partner:r.partner,mode:r.game==='gm'?r.mode:'',started:r.started,outcome:r.outcome,ended,epoch:r.epoch||''},enumerable:true,writable:true,configurable:true});
  }return{version:1,records,resets};
}
export function mergeGameStats(...sources){
  const out=normalizeGameStats(null);
  for(const source of sources){const bank=normalizeGameStats(source);for(const[game,r]of Object.entries(bank.resets)){const old=out.resets[game];if(!old||r.sequence>old.sequence||(r.sequence===old.sequence&&r.id>old.id))out.resets[game]=r;}for(const[id,r]of Object.entries(bank.records)){
    const old=out.records[id];
    // A completed receipt cannot be downgraded by a stale tab or a restored running board.
    if(!old||(old.outcome===null&&r.outcome!==null)||(old.outcome===null&&r.outcome===null&&JSON.stringify(r)<JSON.stringify(old))||(old.outcome!==null&&r.outcome!==null&&(r.ended<old.ended||(r.ended===old.ended&&JSON.stringify(r)<JSON.stringify(old)))))Object.defineProperty(out.records,id,{value:r,enumerable:true,writable:true,configurable:true});
  }}return out;
}
export function startGameStat(raw,{id,game,partner,mode='',time=Date.now()}){
  const bank=normalizeGameStats(raw);if(own(bank.records,id))return bank;
  return mergeGameStats(bank,{version:1,records:{[id]:{game,partner,mode,started:time,outcome:null,ended:null,epoch:period(bank,game)}}});
}
// Retain prior receipts for deduplication, while counting only the current reset period.
export function resetGameStats(raw,game,id=globalThis.crypto?.randomUUID?.()||'reset_'+Date.now()+'_'+Math.random().toString(36).slice(2)){
  const bank=normalizeGameStats(raw);if(!own(GAME_STAT_NAMES,game)||typeof id!=='string'||!id||id.length>100)return bank;
  const sequence=(bank.resets[game]?.sequence||0)+1;if(!Number.isSafeInteger(sequence))return bank;
  bank.resets[game]={sequence,id};return bank;
}
export function finishGameStat(raw,id,outcome,time=Date.now()){
  const bank=normalizeGameStats(raw),old=bank.records[id];if(!old||old.outcome!==null||!terminal.has(outcome))return bank;
  bank.records[id]={...old,outcome,ended:Math.max(old.started,time)};return bank;
}
export const gameStatRated=r=>r.game!=='gword'&&(r.game!=='gm'||r.mode==='vs');
export function summarizeGameStats(raw,game){
  const result={played:0,finished:0,pending:0,wins:0,rated:0,partners:[]},byName=new Map(),bank=normalizeGameStats(raw),epoch=period(bank,game);
  for(const r of Object.values(bank.records)){
    if(r.game!==game||r.epoch!==epoch)continue;let row=byName.get(r.partner);if(!row){row={name:r.partner,played:0,finished:0,pending:0,wins:0,rated:0};byName.set(r.partner,row);}
    for(const target of[result,row]){target.played++;if(r.outcome===null)target.pending++;else{target.finished++;if(gameStatRated(r)){target.rated++;if(r.outcome==='win')target.wins++;}}}
  }result.partners=[...byName.values()].sort((a,b)=>b.played-a.played||a.name.localeCompare(b.name,'zh-CN'));return result;
}
export const gameStatRate=(wins,rated)=>rated?(wins/rated*100).toFixed(1).replace(/\.0$/,'')+'%':'—';
export function gameStatsPanel(doc,bank,game){
  const summary=summarizeGameStats(bank,game),node=(tag,cls,text)=>{const el=doc.createElement(tag);el.className=cls;if(text!=null)el.textContent=text;return el;},body=node('div','rp-stat-body');body.id='rp-game-stats-dialog-marker';
  body.append(node('p','rp-stat-total','共进行 '+summary.played+' 局'),node('p','rp-stat-muted','已结束 '+summary.finished+' 局 · 进行中 '+summary.pending+' 局'));
  if(game!=='gword')body.append(node('p','rp-stat-wins',(game==='gm'?'对战模式 · ':'')+'累计胜利 '+summary.wins+' 局 · 胜率 '+gameStatRate(summary.wins,summary.rated)),node('p','rp-stat-muted','胜率按 '+summary.rated+' 局已结算对局计算'));
  if(!summary.partners.length)body.append(node('p','','还没有游戏记录，开始一局试试。'));
  else{const table=node('table','rp-stat-table'),head=node('tr','','');for(const title of['搭子','游戏局数',...(game!=='gword'?['胜场 / 胜率']:[])])head.append(node('th','',title));const thead=doc.createElement('thead');thead.append(head);table.append(thead);const tbody=doc.createElement('tbody');for(const row of summary.partners){const tr=doc.createElement('tr');tr.append(node('th','','与 '+row.name),node('td','',String(row.played)));if(game!=='gword')tr.append(node('td','',row.wins+' / '+gameStatRate(row.wins,row.rated)));tbody.append(tr);}table.append(tbody);body.append(table);}
  body.append(node('p','rp-stat-muted','场次按实际开局累计；进行中不计入胜率，主动重开计为放弃。同一局只结算一次，悔棋或复盘不重复计数。'+(game==='gm'?'合作爬塔计入场次，不计对战胜率。':'')+'同名搭子合并显示。统计从本次更新开始，旧历史不猜测补算。'));
  body.append(node('p','rp-stat-muted','清空统计只重置本游戏的计数，不影响存档或其他游戏；清空前已开的局不再计入，新开一局后重新累计。'));
  return body;
}
export const GAME_STATS_CSS=`
/* One header layout for all six games; palette follows the game surface. */
#rp-phone #rp-screen :is(#rp-view-game,#rp-view-g2048,#rp-view-ggold,#rp-view-gword,#rp-view-gomoku,#rp-view-sudoku) .rp-game-nav{--rp-game-nav-ink:var(--rp-v-text,var(--rp-nav-title,#443b43));--rp-game-stat-bg:var(--rp-v-card,rgba(255,255,255,.12));--rp-game-stat-border:var(--rp-v-border,rgba(128,128,128,.22));display:grid!important;grid-template-columns:32px minmax(0,1fr) auto!important;column-gap:6px!important;align-items:center!important;justify-content:normal!important;height:88px!important;min-height:88px!important;flex:0 0 88px!important;padding:44px 12px 4px!important;box-sizing:border-box!important;}
#rp-phone #rp-screen #rp-view-gomoku .rp-game-nav{--rp-game-nav-ink:#dce7f4;--rp-game-stat-bg:rgba(173,201,229,.12);--rp-game-stat-border:rgba(173,201,229,.28);}
#rp-phone #rp-screen :is(#rp-view-game,#rp-view-g2048,#rp-view-ggold,#rp-view-gword,#rp-view-gomoku,#rp-view-sudoku) .rp-game-nav>:is(.rp-nav-title,.gmk-nav-title,.sdk-nav-title){position:static!important;left:auto!important;right:auto!important;transform:none!important;min-width:0;max-width:none!important;margin:0!important;text-align:center!important;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-size:14px!important;line-height:20px!important;font-weight:600;color:var(--rp-game-nav-ink)!important;pointer-events:none;}
#rp-phone #rp-screen :is(#rp-view-game,#rp-view-g2048,#rp-view-ggold,#rp-view-gword,#rp-view-gomoku,#rp-view-sudoku) .rp-game-nav>:is(.rp-back,.gmk-back,.sdk-back){width:32px!important;min-width:32px!important;min-height:36px!important;height:36px!important;max-height:36px!important;padding:0!important;margin:0!important;justify-content:center!important;text-align:center!important;font-size:26px!important;line-height:1!important;color:var(--rp-game-nav-ink)!important;}
#rp-phone #rp-screen :is(#rp-view-game,#rp-view-g2048,#rp-view-ggold,#rp-view-gword,#rp-view-gomoku,#rp-view-sudoku) .rp-game-nav-actions{display:flex;align-items:center;justify-content:flex-end;gap:4px;min-width:80px;}
#rp-phone #rp-screen :is(#rp-view-game,#rp-view-g2048,#rp-view-ggold,#rp-view-gword,#rp-view-gomoku,#rp-view-sudoku) .rp-game-nav .rp-game-nav-actions>button{box-sizing:border-box!important;flex:0 0 auto!important;min-width:32px!important;max-height:32px!important;height:32px!important;min-height:32px!important;margin:0!important;padding:0 4px!important;border:0!important;border-radius:9px!important;box-shadow:none!important;background:transparent!important;color:var(--rp-game-nav-ink)!important;font-family:inherit!important;font-size:12px!important;font-weight:500!important;line-height:1!important;white-space:nowrap;cursor:pointer;}
#rp-phone #rp-screen :is(#rp-view-game,#rp-view-g2048,#rp-view-ggold,#rp-view-gword,#rp-view-gomoku,#rp-view-sudoku) .rp-game-nav .rp-game-nav-actions>.rp-stat-button{display:inline-flex!important;align-items:center;justify-content:center;min-width:44px!important;padding:0 9px!important;border:1px solid var(--rp-game-stat-border)!important;background:var(--rp-game-stat-bg)!important;font-weight:600!important;}
#rp-phone #rp-screen :is(#rp-view-game,#rp-view-g2048,#rp-view-ggold,#rp-view-gword,#rp-view-gomoku,#rp-view-sudoku) .rp-game-nav .rp-game-nav-actions>button:focus-visible{outline:2px solid var(--rp-game-nav-ink);outline-offset:2px;}
#rp-phone #rp-screen :is(#rp-view-game,#rp-view-g2048,#rp-view-ggold,#rp-view-gword,#rp-view-gomoku,#rp-view-sudoku) .rp-game-nav .rp-game-nav-actions>button:disabled{opacity:.45;cursor:default;}
#rp-phone.rp-compact #rp-screen :is(#rp-view-game,#rp-view-g2048,#rp-view-ggold,#rp-view-gword,#rp-view-gomoku,#rp-view-sudoku) .rp-game-nav{height:80px!important;min-height:80px!important;flex-basis:80px!important;padding-top:36px!important;}
#rp-phone #rp-screen .rp-stat-body{font-size:12px;color:var(--rp-v-text,inherit);overflow-wrap:anywhere;}
#rp-phone #rp-screen .rp-stat-total{font-size:17px;font-weight:700;margin:8px 0;}
#rp-phone #rp-screen .rp-stat-wins{font-size:13px;font-weight:600;margin:10px 0 4px;}
#rp-phone #rp-screen .rp-stat-muted{font-size:11px;line-height:1.65;opacity:.72;margin:6px 0 12px;}
#rp-phone #rp-screen .rp-stat-table{width:100%;border-collapse:collapse;table-layout:fixed;font-size:11px;margin:10px 0;}
#rp-phone #rp-screen .rp-stat-table th,#rp-phone #rp-screen .rp-stat-table td{padding:9px 4px;border-bottom:1px solid var(--rp-v-border,#9994);text-align:right;vertical-align:top;overflow-wrap:anywhere;}
#rp-phone #rp-screen .rp-stat-table th:first-child{width:44%;text-align:left;font-weight:500;}
`;
