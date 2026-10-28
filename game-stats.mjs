export const GAME_STAT_NAMES = Object.freeze({ludo:'飞行棋',g2048:'2048',gm:'黄金矿工',gword:'你说我猜',gomoku:'五子棋',sudoku:'数独'});
const own=(o,k)=>Object.hasOwn(o||{},k),terminal=new Set(['win','loss','draw','abandoned','done']);
export function normalizeGameStats(raw){
  const records=Object.create(null);if(!raw||typeof raw!=='object'||Array.isArray(raw)||raw.version!==1||!raw.records||typeof raw.records!=='object'||Array.isArray(raw.records))return{version:1,records};
  for(const [id,r]of Object.entries(raw.records)){
    if(!id||id.length>1000||!r||!own(GAME_STAT_NAMES,r.game)||typeof r.partner!=='string'||!r.partner.trim()||r.partner.length>100||!Number.isSafeInteger(r.started)||r.started<0||!(r.outcome===null||terminal.has(r.outcome)))continue;
    if(r.game==='gm'&&!['vs','coop'].includes(r.mode))continue;
    const ended=r.outcome===null?null:Number.isSafeInteger(r.ended)&&r.ended>=r.started?r.ended:null;if(r.outcome!==null&&ended===null)continue;
    Object.defineProperty(records,id,{value:{game:r.game,partner:r.partner,mode:r.game==='gm'?r.mode:'',started:r.started,outcome:r.outcome,ended},enumerable:true,writable:true,configurable:true});
  }return{version:1,records};
}
export function mergeGameStats(...sources){
  const out=normalizeGameStats(null);
  for(const source of sources)for(const[id,r]of Object.entries(normalizeGameStats(source).records)){
    const old=out.records[id];
    // A completed receipt cannot be downgraded by a stale tab or a restored running board.
    if(!old||(old.outcome===null&&r.outcome!==null)||(old.outcome===null&&r.outcome===null&&JSON.stringify(r)<JSON.stringify(old))||(old.outcome!==null&&r.outcome!==null&&(r.ended<old.ended||(r.ended===old.ended&&JSON.stringify(r)<JSON.stringify(old)))))Object.defineProperty(out.records,id,{value:r,enumerable:true,writable:true,configurable:true});
  }return out;
}
export function startGameStat(raw,{id,game,partner,mode='',time=Date.now()}){
  const bank=normalizeGameStats(raw);if(own(bank.records,id))return bank;
  return mergeGameStats(bank,{version:1,records:{[id]:{game,partner,mode,started:time,outcome:null,ended:null}}});
}
export function finishGameStat(raw,id,outcome,time=Date.now()){
  const bank=normalizeGameStats(raw),old=bank.records[id];if(!old||old.outcome!==null||!terminal.has(outcome))return bank;
  bank.records[id]={...old,outcome,ended:Math.max(old.started,time)};return bank;
}
export const gameStatRated=r=>r.game!=='gword'&&(r.game!=='gm'||r.mode==='vs');
export function summarizeGameStats(raw,game){
  const result={played:0,finished:0,pending:0,wins:0,rated:0,partners:[]},byName=new Map();
  for(const r of Object.values(normalizeGameStats(raw).records)){
    if(r.game!==game)continue;let row=byName.get(r.partner);if(!row){row={name:r.partner,played:0,finished:0,pending:0,wins:0,rated:0};byName.set(r.partner,row);}
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
  return body;
}
export const GAME_STATS_CSS=`
#rp-phone #rp-screen .rp-stat-button{font:inherit!important;font-size:11px!important;min-height:28px!important;padding:4px 7px!important;border:0!important;border-radius:8px!important;background:var(--rp-v-card,#ffffff18)!important;color:inherit!important;cursor:pointer;flex-shrink:0;white-space:nowrap;}
#rp-phone #rp-screen .rp-stat-body{font-size:12px;color:var(--rp-v-text,inherit);overflow-wrap:anywhere;}
#rp-phone #rp-screen .rp-stat-total{font-size:17px;font-weight:700;margin:8px 0;}
#rp-phone #rp-screen .rp-stat-wins{font-size:13px;font-weight:600;margin:10px 0 4px;}
#rp-phone #rp-screen .rp-stat-muted{font-size:11px;line-height:1.65;opacity:.72;margin:6px 0 12px;}
#rp-phone #rp-screen .rp-stat-table{width:100%;border-collapse:collapse;table-layout:fixed;font-size:11px;margin:10px 0;}
#rp-phone #rp-screen .rp-stat-table th,#rp-phone #rp-screen .rp-stat-table td{padding:9px 4px;border-bottom:1px solid var(--rp-v-border,#9994);text-align:right;vertical-align:top;overflow-wrap:anywhere;}
#rp-phone #rp-screen .rp-stat-table th:first-child{width:44%;text-align:left;font-weight:500;}
`;
