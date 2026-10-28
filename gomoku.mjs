// Moonlit Gomoku: deterministic rules/strategy are independent of roleplay generation.
export const GOMOKU_SIZE = 15;
const TOTAL = GOMOKU_SIZE * GOMOKU_SIZE;
const LEVELS = ['easy','standard','challenge'];
const DIRS = [[1,0],[0,1],[1,1],[1,-1]];
const inside = (x,y) => x>=0 && y>=0 && x<15 && y<15;
const copy = value => JSON.parse(JSON.stringify(value));
const uid = () => 'gmk_'+Date.now()+'_'+Math.random().toString(36).slice(2,10);
const label = index => String.fromCharCode(65+index%15)+(Math.floor(index/15)+1);
export function gomokuWin(board,index) {
  const side=board[index];if(!side)return [];
  const x=index%15,y=Math.floor(index/15);
  for(const[dx,dy]of DIRS){const line=[index];for(const sign of [-1,1])for(let n=1;n<15;n++){const a=x+dx*n*sign,b=y+dy*n*sign;if(!inside(a,b)||board[b*15+a]!==side)break;line.push(b*15+a);}if(line.length>=5)return line;}
  return [];
}
export function gomokuPosition(moves) {
  if(!Array.isArray(moves)||moves.length>TOTAL)return null;
  const board=Array(TOTAL).fill(0);let winner=0,line=[];
  for(let n=0;n<moves.length;n++){
    const m=moves[n];if(winner||!m||!Number.isInteger(m.index)||m.index<0||m.index>=TOTAL||m.side!==n%2+1||board[m.index])return null;
    board[m.index]=m.side;line=gomokuWin(board,m.index);if(line.length)winner=m.side;
  }
  return {board,winner,line,turn:moves.length%2+1,status:winner?'won':moves.length===TOTAL?'draw':'playing'};
}
function candidates(board) {
  const stones=board.flatMap((v,i)=>v?[i]:[]);if(!stones.length)return [112];
  const out=new Set();for(const i of stones){const x=i%15,y=Math.floor(i/15);for(let dy=-2;dy<=2;dy++)for(let dx=-2;dx<=2;dx++){const a=x+dx,b=y+dy;if(inside(a,b)&&!board[b*15+a])out.add(b*15+a);}}
  return [...out].sort((a,b)=>Math.abs(a%15-7)+Math.abs(Math.floor(a/15)-7)-Math.abs(b%15-7)-Math.abs(Math.floor(b/15)-7)||a-b);
}
function pointScore(board,index,side) {
  board[index]=side;const win=gomokuWin(board,index).length;if(win){board[index]=0;return 1e8;}
  const x=index%15,y=Math.floor(index/15);let score=0;
  for(const[dx,dy]of DIRS){let pattern='';for(let n=-4;n<=4;n++){const a=x+dx*n,b=y+dy*n;pattern+=!inside(a,b)?'2':board[b*15+a]===side?'1':board[b*15+a]===0?'0':'2';}
    if(/011110/.test(pattern))score+=240000;
    else if(/11110|01111|11101|11011|10111/.test(pattern))score+=40000;
    if(/01110|010110|011010/.test(pattern))score+=7000;
    if(/001100|0010100|01010/.test(pattern))score+=600;
    if(/0110|01010/.test(pattern))score+=100;
  }
  board[index]=0;return score+14-Math.abs(x-7)-Math.abs(y-7);
}
function ranked(board,side) {return candidates(board).map(index=>({index,attack:pointScore(board,index,side),defense:pointScore(board,index,3-side)})).map(r=>({...r,score:r.attack+r.defense*1.08})).sort((a,b)=>b.score-a.score||a.index-b.index);}
export function gomokuChooseMove(source,side=2,difficulty='standard',random=Math.random) {
  if(!Array.isArray(source)||source.length!==TOTAL||source.some(v=>![0,1,2].includes(v))||![1,2].includes(side))return null;
  const board=source.slice(),list=ranked(board,side);if(!list.length)return null;
  const win=list.find(r=>r.attack>=1e8);if(win)return win.index;
  const block=list.filter(r=>r.defense>=1e8);if(block.length)return block[0].index;
  if(difficulty==='easy'){const count=Math.min(4,list.length),n=Math.max(0,Math.min(count-1,Math.floor(Number(random())*count)||0));return list[n].index;}
  if(difficulty!=='challenge')return list[0].index;
  let best=list[0].index,bestScore=-Infinity;const began=Date.now();
  // Two-ply, bounded branching. Never scans an unbounded tree on the UI thread.
  for(const candidate of list.slice(0,8)){
    if(bestScore!==-Infinity&&Date.now()-began>60)break;
    board[candidate.index]=side;const replies=ranked(board,3-side).slice(0,6);let worst=Infinity;
    for(const reply of replies){if(reply.attack>=1e8){worst=-1e9;break;}board[reply.index]=3-side;const next=ranked(board,side)[0];const value=(next?.attack||0)*.6-(reply.attack||0)*.9;worst=Math.min(worst,value);board[reply.index]=0;}
    board[candidate.index]=0;const value=candidate.score+(worst===Infinity?0:worst);if(value>bestScore){bestScore=value;best=candidate.index;}
  }
  return best;
}
export function normalizeGomoku(raw) {
  const out={version:1,level:'standard',screen:'home',round:null,log:[],draft:''},issues=[];
  if(raw==null)return {data:out,issues};
  if(typeof raw!=='object'||Array.isArray(raw)){issues.push({path:'gomoku',value:raw});return {data:out,issues};}
  if(LEVELS.includes(raw.level))out.level=raw.level;
  if(typeof raw.draft==='string')out.draft=raw.draft;
  if(Array.isArray(raw.log))raw.log.forEach((m,i)=>{
    if(!m||typeof m!=='object'||!['user','char','system'].includes(m.role)||typeof m.text!=='string'){issues.push({path:'gomoku.log['+i+']',value:m});return;}
    const item=copy(m);if(!item.id)item.id=uid();if(item.replyState==='pending'){item.replyState='failed';item.replyError='interrupted';}out.log.push(item);
  });else if(raw.log!==undefined)issues.push({path:'gomoku.log',value:raw.log});
  if(raw.round!=null){const r=raw.round,p=gomokuPosition(r?.moves);if(p&&typeof r.id==='string'&&typeof r.partner==='string'&&r.partner&&LEVELS.includes(r.level))out.round={id:r.id,partner:r.partner,note:typeof r.note==='string'?r.note:'',level:r.level,moves:copy(r.moves),startedAt:Number(r.startedAt)||Date.now(),abandoned:!!r.abandoned};else issues.push({path:'gomoku.round',value:r});}
  if(out.round)out.round.speech=normalizeSpeech(raw.round.speech,out.round.moves.length);
  // Reload always requires an explicit Continue, never an automatic move/request.
  return {data:out,issues};
}

// Speech bookkeeping prevents reissuing a billed request after reload or navigation.
function normalizeSpeech(raw,moves=0) {
  const r=raw&&typeof raw==='object'?raw:{},now=Date.now();
  const revision=Number.isSafeInteger(r.revision)&&r.revision>=moves?r.revision:moves;
  const seen=Array.isArray(r.seen)?[...new Set(r.seen.filter(x=>typeof x==='string'&&/^\d+:(opening|resume|move|threat|end)$/.test(x)))].slice(-256):[];
  const event=e=>e&&e.revision===revision&&typeof e.key==='string'&&seen.includes(e.key)&&['opening','resume','move','threat','end'].includes(e.kind)&&e.key===revision+':'+e.kind?{key:e.key,revision,kind:e.kind}:null;
  const interrupted=event(r.pending),failed=event(r.failed);
  return {revision,seen,lastAt:Number.isFinite(r.lastAt)?Math.max(0,Math.min(now,r.lastAt)):0,pending:null,failed:interrupted?{...interrupted,error:'interrupted'}:failed?{...failed,error:typeof r.failed.error==='string'?r.failed.error:'interrupted'}:null};
}

const P='#rp-phone #rp-screen #rp-view-gomoku';
export const GOMOKU_CSS=`
${P}{--gmk-ink:#e4edf7;--gmk-muted:#94adc8;--gmk-line:rgba(173,201,229,.25);display:none;flex-direction:column;isolation:isolate;background:#0b182b!important;color:var(--gmk-ink)!important;font-family:inherit;overflow:hidden!important;}
${P} *{box-sizing:border-box;}
${P} button,${P} input{font-family:inherit;}
${P} button{touch-action:manipulation;cursor:pointer;}
${P} button:disabled{cursor:default;opacity:.48;}
${P} [hidden]{display:none!important;}
${P} .gmk-nav{position:relative;z-index:4;flex:0 0 90px;height:90px;padding:44px 12px 0;display:flex;align-items:center;justify-content:space-between;background:transparent;}
${P} .gmk-nav button{background:transparent!important;color:#c7d9ed!important;border:0!important;min-width:36px;height:40px;padding:0 8px;font-size:13px;}
${P} .gmk-nav .gmk-back{font-size:28px;line-height:1;text-align:left;}
${P} .gmk-nav-title{font-size:14px;color:#e1ebf5;position:absolute;left:50%;transform:translateX(-50%);pointer-events:none;max-width:45%;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
${P} .gmk-home{position:relative;isolation:isolate;flex:1;min-height:0;overflow:auto;padding:8px 0 24px 24px;background:radial-gradient(ellipse at 89% 38%,rgba(73,112,158,.44),transparent 58%);}
${P} .gmk-home-inner{position:relative;min-height:max(410px,100%);height:auto;padding-right:24px;isolation:isolate;overflow:hidden;display:flex;flex-direction:column;}
${P} .gmk-hero-title{position:relative;z-index:1;flex:0 0 auto;margin:14px 0 24px;font:400 42px/1.3 'Noto Serif CJK SC','Songti SC',SimSun,serif;letter-spacing:3px;color:#edf1f5;}
${P} .gmk-hero-title:after{content:'';display:block;width:30px;height:1px;margin-top:10px;background:linear-gradient(90deg,#e5eaf0,transparent);}
${P} .gmk-partner{position:relative;z-index:2;flex:0 0 auto;display:flex;align-items:baseline;gap:8px;flex-wrap:wrap;max-width:100%;font-size:12px;line-height:1.8;color:var(--gmk-muted);}
${P} .gmk-partner-name{color:#e7edf6;max-width:145px;overflow-wrap:anywhere;}
${P} .gmk-partner button{font:inherit;color:#b6cee6;background:transparent;border:0;border-left:1px solid #7896b5;padding:0 0 0 8px;min-height:30px;}
${P} .gmk-decor{position:absolute;z-index:-1;inset:120px -50px 65px 60px;overflow:hidden;pointer-events:none;mask-image:linear-gradient(to bottom,#000 0,#000 40%,transparent 99%);}
${P} .gmk-moon{position:absolute;right:-90px;top:5px;width:330px;height:330px;border-radius:50%;background:radial-gradient(circle at 27% 8%,#d0e8f7 0,#789ec3 16%,rgba(71,107,148,.25) 60%,rgba(71,107,148,0) 76%);box-shadow:0 -4px 25px rgba(166,210,249,.12);}
${P} .gmk-decor-grid{position:absolute;right:0;top:70px;width:210px;height:245px;background-image:linear-gradient(to right,rgba(196,218,240,.34) 1px,transparent 1px),linear-gradient(to bottom,rgba(196,218,240,.34) 1px,transparent 1px);background-size:35px 35px;mask-image:radial-gradient(ellipse,black 15%,transparent 72%);}
${P} .gmk-decor-stone{position:absolute;width:24px;height:24px;margin:-12px;border-radius:50%;box-shadow:0 4px 5px #06132488;background:radial-gradient(circle at 30% 20%,#56616b,#151b25 54%,#071019);}
${P} .gmk-decor-stone.white{background:radial-gradient(circle at 30% 20%,#fffef7,#e6e5df 58%,#b5c2ca);}
${P} .gmk-arc{position:absolute;width:470px;height:220px;border:1px solid #aac5e32b;border-radius:50%;left:-155px;top:135px;transform:rotate(-24deg);}
${P} .gmk-levels{position:relative;z-index:2;flex:0 0 auto;display:flex;justify-content:space-between;gap:5px;border:0;padding:0;margin:auto 0 0;}
${P} .gmk-levels button{position:relative;background:transparent;border:0;padding:12px 4px 15px;color:#94adc8;font:400 17px/1.4 'Noto Serif CJK SC','Songti SC',SimSun,serif;min-height:44px;}
${P} .gmk-levels button[aria-checked=true]{color:#f0f1ec;}
${P} .gmk-levels button[aria-checked=true]:after{content:'';position:absolute;width:27px;height:2px;bottom:5px;left:50%;transform:translateX(-50%);background:#dfebf5;box-shadow:0 1px 7px #acd5f799;}
${P} .gmk-primary{border:1px solid #c5e3fa!important;border-radius:28px;background:linear-gradient(112deg,#83acd2,#c9e0f0)!important;color:#16344f!important;box-shadow:inset 0 1px 3px #e5f5ff,0 0 15px #8cc9ff25;font-size:17px;line-height:1.4;min-height:45px;padding:10px 22px;}
${P} .gmk-home-actions{position:relative;z-index:2;flex:0 0 auto;display:flex;align-items:center;justify-content:flex-end;flex-wrap:wrap;gap:8px;margin:26px 0 7px;}
${P} .gmk-home-start{position:relative;min-width:148px;max-width:100%;}
${P} .gmk-home-new{position:relative;margin-right:auto;border:0;background:transparent;color:#b8cde0;padding:8px 0;font-size:11px;}
${P} .gmk-play{flex:1;min-height:0;overflow-y:auto;overscroll-behavior:contain;padding:0 14px 22px;}
${P} .gmk-match-name{font-size:12px;color:#adc4db;overflow-wrap:anywhere;line-height:1.6;margin:2px 0 7px;}
${P} .gmk-status{font-size:12px;line-height:1.6;min-height:22px;color:#dbe8f5;margin-bottom:9px;}
${P} .gmk-board{position:relative;display:grid;grid-template-columns:repeat(15,minmax(0,1fr));grid-template-rows:repeat(15,minmax(0,1fr));aspect-ratio:1;width:100%;max-width:420px;margin:0 auto;border-radius:9px;background:linear-gradient(140deg,#20354e,#13243b);border:1px solid #849db642;box-shadow:inset 0 0 22px #9abfe512;touch-action:manipulation;}
${P} .gmk-lines{position:absolute;inset:0;width:100%;height:100%;pointer-events:none;overflow:visible;}
${P} .gmk-lines line{stroke:#9eb7d35c;stroke-width:1;vector-effect:non-scaling-stroke;}
${P} .gmk-cell{position:relative;z-index:1;aspect-ratio:1;display:grid;place-items:center;width:auto!important;min-width:0!important;height:auto!important;min-height:0!important;border:0!important;padding:0!important;margin:0!important;box-shadow:none!important;background:transparent!important;border-radius:0;}
${P} .gmk-cell:disabled{opacity:1;}
${P} .gmk-cell:focus-visible{outline:1px solid #e4f1ff!important;outline-offset:-1px;}
${P} .gmk-cell .gmk-stone{width:87%;height:87%;border-radius:50%;background:radial-gradient(circle at 32% 23%,#596572,#161d26 50%,#070e17);box-shadow:0 2px 3px #020710aa;}
${P} .gmk-cell.white .gmk-stone{background:radial-gradient(circle at 32% 23%,#fffef9,#e9e7e2 56%,#afbdc8);}
${P} .gmk-cell.ghost .gmk-stone{opacity:.5;outline:1px solid #b7daff;outline-offset:1px;}
${P} .gmk-cell.last .gmk-stone:after{content:'';display:block;margin:36%;width:28%;height:28%;border-radius:50%;background:#83b6e5;}
${P} .gmk-cell.won .gmk-stone{outline:2px solid #9fd1f8;outline-offset:1px;}
${P} .gmk-play-actions{display:flex;gap:7px;align-items:center;flex-wrap:wrap;margin:12px 0 8px;}
${P} .gmk-play-actions button:not(.gmk-primary),${P} .gmk-text-button{font-size:11px;color:#b5cde4;background:transparent;border:0;padding:8px 5px;min-height:34px;}
${P} .gmk-confirm{font-size:13px;padding:8px 15px;min-height:38px;margin-left:auto;}
${P} .gmk-note{font-size:10px;line-height:1.65;color:#95adc6;margin:0 0 10px;}
${P} .gmk-chat-open{width:100%;text-align:left;display:flex;align-items:center;justify-content:space-between;gap:8px;min-height:42px;background:transparent;border:0;border-top:1px solid #9bb9d126;color:#c2d9ed;font-size:12px;padding:12px 0;}
${P} .gmk-chat-preview{font-size:11px;line-height:1.6;color:#9db6d0;white-space:pre-wrap;overflow-wrap:anywhere;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden;}
${P} .gmk-chat{flex:1;min-height:0;display:flex;flex-direction:column;padding:0 13px 15px;}
${P} .gmk-chat-log{flex:1;min-height:0;overflow-y:auto;overscroll-behavior:contain;padding:5px 0;}
${P} .gmk-message{font-size:12px;line-height:1.6;white-space:pre-wrap;overflow-wrap:anywhere;margin:9px 0;color:#dce8f5;}
${P} .gmk-message.user{margin-left:20px;color:#accce8;}
${P} .gmk-message.system{font-size:10px;color:#91a8bf;text-align:center;}
${P} .gmk-message-name{display:block;font-size:10px;color:#91a8bf;margin-bottom:2px;}
${P} .gmk-message-status{display:block;font-size:10px;color:#c2b7bc;}
${P} .gmk-message-status button{font:inherit;color:#b5d9fa;background:transparent;border:0;text-decoration:underline;min-height:30px;padding:2px 5px;}
${P} .gmk-compose{display:flex;gap:7px;align-items:end;padding-top:8px;border-top:1px solid #9bb9d126;}
${P} .gmk-compose textarea{resize:vertical;min-height:38px;max-height:120px;flex:1;min-width:0;border:1px solid #7a9db64d;border-radius:15px;background:#14263c;color:#e8eff6;font-family:inherit;font-size:12px;line-height:1.5;padding:8px 11px;}
${P} .gmk-compose button{font-size:12px;padding:9px 12px;min-height:38px;}
${P} .gmk-speech-status{font-size:10px;line-height:1.6;color:#95adc6;margin:4px 0;}
${P} .gmk-speech-status button{font:inherit;color:#b5d9fa;background:transparent;border:0;text-decoration:underline;padding:3px 6px;min-height:30px;}
#rp-phone.rp-gomoku-open #rp-sbar,#rp-phone.rp-gomoku-open #rp-sbar *{color:#c0d6ec!important;}
#rp-phone.rp-gomoku-open #rp-island{background:#03070d!important;}
#rp-phone.rp-gomoku-open #rp-home-ind{background:#d3dfeb!important;}
#rp-phone #rp-screen #rp-folder-modal .rp-folder-popup{max-height:calc(100% - 100px);overflow-y:auto;overscroll-behavior:contain;}
@media(prefers-reduced-motion:reduce){${P} *{transition:none!important;animation:none!important;}}
`;

export function createGomoku(api) {
  const doc=api.document,win=doc.defaultView;
  let root=null,mounted=null,controller=new win.AbortController(),epoch=0,moveTimer=null,selected=null,focusIndex=112,chatJob=null,visibleCount=100,showHistory=false,needsResume=false,composing=false,deferredRender=false;
  let autoJob=null,autoTimer=null,queuedEvent=null,dialogueSerial=0,lastManualAt=0;
  const data=()=>{if(!api.state().gomoku)api.state().gomoku=normalizeGomoku(null).data;return api.state().gomoku;};
  const node=(tag,cls='',text='')=>{const e=doc.createElement(tag);if(cls)e.className=cls;if(text)e.textContent=text;return e;};
  const task=()=>{const parent=api.runtime().task(),serial=epoch,signal=controller.signal,origin=data();return{signal,valid:()=>parent.valid()&&!signal.aborted&&serial===epoch&&data()===origin};};
  function cancel(){stopSpeech(true);dialogueSerial++;if(moveTimer!=null)win.clearTimeout(moveTimer);moveTimer=null;controller.abort();controller=new win.AbortController();epoch++;chatJob=null;selected=null;for(const m of api.state().gomoku?.log||[])if(m.replyState==='pending'){m.replyState='failed';m.replyError='interrupted';}}
  function restore(raw){cancel();const result=normalizeGomoku(raw);api.state().gomoku=result.data;if(result.issues.length)(api.state().recovery ||= []).push(...result.issues);needsResume=!!result.data.round;showHistory=false;visibleCount=100;return result.data;}
  function save(){const r=data().round,p=r&&gomokuPosition(r.moves);if(r&&!r.abandoned&&p&&p.status!=='playing')api.endStats?.(p.winner===1?'win':p.winner===2?'loss':'draw',r);api.save();}
  function button(text,cls,run){const b=node('button',cls,text);b.type='button';b.addEventListener('click',run);return b;}
  function running(){const r=data().round;return !!r&&!r.abandoned&&gomokuPosition(r.moves)?.status==='playing';}
  function partner(){const r=data().round;return running()?{name:r.partner,note:r.note}:api.partner();}
  function message(role,text,extra={}){const r=data().round,m={id:uid(),role,text,roundId:r?.id||'',name:role==='char'?r?.partner||partner().name:undefined,...extra};data().log.push(m);save();return m;}
  function rules(){const body=node('div');for(const text of ['休闲五子棋：15×15棋盘，你执黑先手，搭子执白。横、竖或斜线连成五枚及以上获胜；无禁手，棋盘下满且无人获胜为和棋。','先点选交叉点，再按“确认落子”，避免小屏误触。键盘方向键可移动选择，回车/空格选中后确认。','轻松、标准、挑战使用不同本地策略。角色会在开局、关键落子和结束时依据人设与实际棋局主动说话；也可以随时进入闲聊。发言优先使用已填写地址和密钥的自定义API，否则使用酒馆主API，可能产生费用。','返回或关闭手机会暂停搭子落子；刷新后需点“继续对局”。本局搭子与难度固定，开始新局后可更换。悔棋会撤回最近一轮落子，保留聊天记录。'])body.append(node('p','',text));api.dialog('五子棋规则',body,[{label:'知道了'}]);}
  function confirmNew(){if(data().round?.moves.length){api.dialog('重新开始？',node('p','','当前棋盘将结束，已有聊天记录保留。'),[{label:'取消'},{label:'重新开始',run:()=>{newHome();}}]);}else newHome();}
  function newHome(){cancel();if(data().round){api.endStats?.('abandoned',data().round);data().round.abandoned=true;}data().screen='home';needsResume=false;save();render();}
  function start(){cancel();const d=data();if(!running()){const p=api.partner();d.round={id:uid(),partner:p.name||'对方',note:p.note||'',level:d.level,moves:[],startedAt:Date.now(),abandoned:false,speech:normalizeSpeech(null)};}api.startStats?.(d.round);needsResume=false;d.screen='play';showHistory=false;save();render();queueSpeech(d.round.moves.length?'resume':'opening');resume();}
  function mount(){
    if(mounted===api.runtime()&&root?.isConnected)return;
    mounted=api.runtime();root=doc.getElementById('rp-view-gomoku');if(root)root.remove();
    let style=doc.getElementById('rp-gomoku-css');if(!style){style=node('style');style.id='rp-gomoku-css';doc.head.append(style);}style.textContent=GOMOKU_CSS;
    root=node('div','rp-view');root.id='rp-view-gomoku';root.style.display='none';root.style.setProperty('background','#0b182b','important');root.style.fontWeight='400';root.style.fontStyle='normal';doc.getElementById('rp-screen').append(root);
    doc.querySelector('#rp-folder-modal [data-folder-app="gomoku"]')?.remove();
    const item=node('div','rp-folder-item');item.dataset.folderApp='gomoku';item.append(node('div','rp-folder-item-ico'),node('div','rp-folder-item-lbl','五子棋'));doc.querySelector('#rp-folder-modal .rp-folder-popup')?.append(item);refreshIcon();
    mounted.listenDOM(doc,'visibilitychange',()=>{if(doc.hidden)pause();else resume();});
    mounted.own(()=>{cancel();style.remove();});render();
  }
  function refreshIcon(theme=api.iconTheme?.()) {
    const icon=doc.querySelector('#rp-folder-modal [data-folder-app="gomoku"] .rp-folder-item-ico');if(!icon)return;
    const src=api.iconSource?.(theme,false)||api.iconURL,local=api.iconSource?.(theme,true)||api.iconLocalURL;
    if(icon.dataset.gmkIconUrl===src&&icon.querySelector('img'))return;
    const img=node('img');img.alt='';img.loading='lazy';img.decoding='async';img.referrerPolicy='no-referrer';img.style.cssText='width:100%;height:100%;object-fit:contain';let usingLocal=false;
    icon.dataset.gmkIconUrl=src;icon.dataset.gmkIconTheme=['candy','star','misty'].includes(theme)?theme:'custom';
    img.onerror=()=>{if(!img.isConnected||icon.dataset.gmkIconUrl!==src)return;if(!usingLocal){usingLocal=true;img.src=local;}else{icon.textContent='●○';delete icon.dataset.gmkIconUrl;}};
    icon.replaceChildren(img);img.src=src;
  }
  function nav(){const n=node('div','gmk-nav'),back=button('‹','gmk-back',()=>{if(data().screen==='chat'){data().screen='play';render();resume();}else if(data().screen==='play'){pause();data().screen='home';save();render();}else api.navigate('home');});back.setAttribute('aria-label','返回');back.id='gmk-back';n.append(back,node('span','gmk-nav-title',data().screen==='home'?'':data().screen==='chat'?'对弈闲聊':'五子棋'),button('统计','rp-stat-button',()=>api.statistics?.()),button('规则','gmk-rules',rules));return n;}
  function home(){const h=node('div','gmk-home'),inner=node('div','gmk-home-inner'),decor=node('div','gmk-decor');decor.setAttribute('aria-hidden','true');decor.append(node('div','gmk-moon'),node('div','gmk-decor-grid'),node('div','gmk-arc'));for(const[x,y,white]of [[95,105,0],[165,140,1],[130,175,0],[60,210,1],[25,245,1],[165,245,0]]){const s=node('i','gmk-decor-stone'+(white?' white':''));s.style.left=x+'px';s.style.top=y+'px';decor.append(s);}
    const p=partner(),line=node('div','gmk-partner');line.append(node('span','',running()?'本局搭子':'当前搭子'),node('span','gmk-partner-name',p.name));const change=button('更换 ›','',()=>{if(running()){api.notify('本局搭子已固定；点“重新开始”后可更换。');return;}api.changePartner();});line.append(change);
    const levels=node('div','gmk-levels');levels.setAttribute('role','radiogroup');levels.setAttribute('aria-label','对弈难度');LEVELS.forEach((level,i)=>{const b=button(['轻松','标准','挑战'][i],'',()=>{if(running())return;data().level=level;save();render();});b.setAttribute('role','radio');b.setAttribute('aria-checked',String((running()?data().round.level:data().level)===level));b.disabled=running();b.dataset.gmkLevel=level;levels.append(b);});
    const begin=button(running()?'继续对局　›':'开始对弈　›','gmk-primary gmk-home-start',start);begin.id='gmk-start';const actions=node('div','gmk-home-actions');inner.append(decor,node('h1','gmk-hero-title','五子棋'),line,levels,actions);if(running()||data().round?.moves.length){const restart=button('重新开始','gmk-home-new',confirmNew);restart.id='gmk-home-new';actions.append(restart);}actions.append(begin);h.append(inner);return h;
  }
  function status(){const r=data().round,p=r&&gomokuPosition(r.moves);if(!p)return '开始新对局';if(r.abandoned)return '这局已经结束';if(p.winner)return p.winner===1?'你赢了 · 黑棋连成五子':r.partner+'获胜 · 白棋连成五子';if(p.status==='draw')return '和棋 · 棋盘已下满';if(needsResume)return '对局已暂停，返回首页继续';if(p.turn===2)return r.partner+'正在思考…';return selected==null?'你的回合 · 点选交叉点后确认落子':'准备落在 '+label(selected)+' · 请确认';}
  function play(){const r=data().round;if(!r){data().screen='home';return home();}const p=gomokuPosition(r.moves),wrap=node('div','gmk-play');wrap.append(node('div','gmk-match-name','你执黑　·　'+r.partner+'执白　·　第'+r.moves.length+'手'),node('div','gmk-status',status()));const board=node('div','gmk-board');board.id='gmk-board';board.setAttribute('role','grid');board.setAttribute('aria-label','十五路五子棋棋盘');board.setAttribute('aria-rowcount','15');board.setAttribute('aria-colcount','15');const lines=doc.createElementNS('http://www.w3.org/2000/svg','svg');lines.classList.add('gmk-lines');lines.setAttribute('viewBox','0 0 30 30');lines.setAttribute('preserveAspectRatio','none');lines.setAttribute('aria-hidden','true');lines.setAttribute('focusable','false');
    for(let n=0;n<GOMOKU_SIZE;n++)for(const axis of ['x','y']){const line=doc.createElementNS('http://www.w3.org/2000/svg','line'),at=n*2+1;line.dataset.gmkAxis=axis;line.setAttribute('x1',axis==='x'?at:1);line.setAttribute('y1',axis==='x'?1:at);line.setAttribute('x2',axis==='x'?at:29);line.setAttribute('y2',axis==='x'?29:at);lines.append(line);}board.append(lines);const last=r.moves.at(-1)?.index;
    for(let index=0;index<TOTAL;index++){const side=p.board[index],ghost=selected===index&&!side;const cell=button('','gmk-cell'+(side===2?' white':'')+(ghost?' ghost':'')+(last===index?' last':'')+(p.line.includes(index)?' won':''),()=>select(index));cell.dataset.gmkCell=String(index);cell.setAttribute('role','gridcell');cell.setAttribute('aria-label',label(index)+'，'+(side===1?'黑棋':side===2?'白棋':ghost?'待确认':'空位'));cell.setAttribute('aria-rowindex',String(Math.floor(index/15)+1));cell.setAttribute('aria-colindex',String(index%15+1));cell.setAttribute('aria-selected',String(ghost));cell.tabIndex=index===focusIndex?0:-1;cell.setAttribute('aria-disabled',String(side!==0||p.status!=='playing'||p.turn!==1||needsResume));
      if(side||ghost)cell.append(node('span','gmk-stone'));cell.addEventListener('keydown',event=>{const dirs={ArrowLeft:-1,ArrowRight:1,ArrowUp:-15,ArrowDown:15};if(!Object.hasOwn(dirs,event.key))return;event.preventDefault();let next=index+dirs[event.key];if(next<0||next>=TOTAL||((event.key==='ArrowLeft'||event.key==='ArrowRight')&&Math.floor(next/15)!==Math.floor(index/15)))return;focusIndex=next;cell.tabIndex=-1;const target=board.querySelector('[data-gmk-cell="'+next+'"]');target.tabIndex=0;target.focus();});board.append(cell);}
    wrap.append(board);const actions=node('div','gmk-play-actions');const undo=button('悔棋','gmk-undo',takeback);undo.id='gmk-undo';undo.disabled=!r.moves.length;const fresh=button('新局','gmk-new',confirmNew);fresh.id='gmk-new';const confirm=button('确认落子','gmk-primary gmk-confirm',commit);confirm.id='gmk-confirm';confirm.disabled=selected==null||p.turn!==1||p.status!=='playing'||needsResume;actions.append(undo,fresh,confirm);wrap.append(actions,node('p','gmk-note','点选棋盘，再确认落子。搭子的话会显示在下方。'));
    const chat=button('和 '+r.partner+' 聊聊　›','gmk-chat-open',()=>{pauseMoves();data().screen='chat';save();render();resume();});chat.id='gmk-chat-open';const lastChat=data().log.filter(m=>m.roundId===r.id&&m.role==='char').at(-1);wrap.append(chat);if(lastChat)wrap.append(node('div','gmk-chat-preview',lastChat.text));appendSpeechStatus(wrap);return wrap;
  }
  function select(index){const r=data().round,p=r&&gomokuPosition(r.moves);if(!p||p.status!=='playing'||p.turn!==1||p.board[index]||needsResume)return;selected=index;focusIndex=index;const scroll=root.querySelector('.gmk-play')?.scrollTop||0;render();root.querySelector('.gmk-play').scrollTop=scroll;}
  function commit(){const r=data().round,p=r&&gomokuPosition(r.moves);if(!p||p.status!=='playing'||p.turn!==1||selected==null||p.board[selected]||needsResume)return false;stopSpeech(true);r.moves.push({index:selected,side:1});advanceSpeech();selected=null;save();render();if(gomokuPosition(r.moves).status!=='playing')queueSpeech('end');resume();return true;}
  function pauseMoves(){if(moveTimer!=null)win.clearTimeout(moveTimer);moveTimer=null;}
  function pause(){pauseMoves();stopSpeech(false);}
  function resume(){flushSpeech();if(!root?.isConnected||!api.visible()||data().screen!=='play'||needsResume||moveTimer!=null)return;const r=data().round,p=r&&gomokuPosition(r.moves);if(!r||r.abandoned||p.status!=='playing'||p.turn!==2)return;const token=task();moveTimer=win.setTimeout(()=>{moveTimer=null;if(!token.valid()||!api.visible()||data().round!==r||data().screen!=='play')return;const before=gomokuPosition(r.moves);if(before.status!=='playing'||before.turn!==2)return;const index=gomokuChooseMove(before.board,2,r.level);if(index==null||before.board[index])return;stopSpeech(true);r.moves.push({index,side:2});advanceSpeech();save();render();const after=gomokuPosition(r.moves),facts=boardFacts();if(after.status!=='playing')queueSpeech('end');else if(facts.userWinningPoints.length||facts.partnerWinningPoints.length||facts.longest.user>=3||facts.longest.char>=3||winningPoints(before.board,1).includes(index))queueSpeech('threat');else if(r.moves.length===2||r.moves.length%6===0)queueSpeech('move');},650);}
  function takeback(){const r=data().round;if(!r?.moves.length)return;cancel();const n=r.moves.length%2===0?2:1;r.moves.splice(Math.max(0,r.moves.length-n));advanceSpeech();needsResume=false;message('system','已悔棋，棋盘回到第'+r.moves.length+'手。');save();render();}
  function chat(){const r=data().round,wrap=node('div','gmk-chat');const log=node('div','gmk-chat-log');log.id='gmk-chat-log';const items=data().log.filter(m=>showHistory||m.roundId===r?.id);if(!showHistory&&data().log.some(m=>m.roundId!==r?.id))log.append(button('查看往局对话','gmk-text-button',()=>{showHistory=true;visibleCount=100;render();}));if(showHistory)log.append(button('仅看本局','gmk-text-button',()=>{showHistory=false;visibleCount=100;render();}));if(items.length>visibleCount)log.append(button('显示更早对话','gmk-text-button',()=>{const top=log.scrollTop,height=log.scrollHeight;visibleCount+=100;render();const updated=root.querySelector('#gmk-chat-log');updated.scrollTop=top+updated.scrollHeight-height;}));if(!items.length)log.append(node('p','gmk-note','可以聊刚才的一手棋，也可以自然聊其他话题。'));
    for(const m of items.slice(-visibleCount)){const row=node('div','gmk-message '+m.role);row.dataset.gmkMessage=m.id;if(m.role!=='system')row.append(node('span','gmk-message-name',m.role==='user'?api.userName():m.name||r?.partner||'对方'));row.append(doc.createTextNode(m.text));if(['pending','failed','superseded'].includes(m.replyState)){const feedback=node('span','gmk-message-status');feedback.textContent=m.replyState==='pending'?'正在回复…':m.replyState==='superseded'?'已有更新的提问':api.errorText(m.replyError);if(m.replyState==='failed'&&m.roundId===r?.id){const retry=button('重试','',()=>sendChat(m.id));retry.disabled=!!chatJob;feedback.append(retry);}row.append(feedback);}log.append(row);}appendSpeechStatus(log);wrap.append(log);const composer=node('div','gmk-compose'),input=node('textarea');input.id='gmk-input';input.rows=1;input.maxLength=8000;input.placeholder='和搭子聊聊…';input.setAttribute('aria-label','和五子棋搭子聊天');input.value=data().draft;input.addEventListener('compositionstart',()=>{composing=true;stopSpeech(true);});input.addEventListener('compositionend',()=>{composing=false;data().draft=input.value;save();if(deferredRender){deferredRender=false;render();}});input.addEventListener('input',()=>{data().draft=input.value;if(input.value.trim())stopSpeech(true);save();});input.addEventListener('keydown',event=>{if(event.key==='Enter'&&!event.shiftKey&&!event.isComposing&&event.keyCode!==229){event.preventDefault();void sendChat();}});const send=button('发送','gmk-primary',()=>sendChat());send.id='gmk-send';send.disabled=!!chatJob;composer.append(input,send);wrap.append(composer);return wrap;
  }
  async function sendChat(retryId=''){
    if(chatJob)return false;const r=data().round;if(!r)return false;const input=root?.querySelector('#gmk-input');let m;if(retryId){m=data().log.find(x=>x.id===retryId&&x.roundId===r.id&&x.role==='user');if(!m||m.replyState!=='failed')return false;}else{const text=(input?.value??data().draft).trim();if(!text||text.length>8000)return false;for(const old of data().log)if(old.replyState==='failed')old.replyState='superseded';m=message('user',text);data().draft='';}
    stopSpeech(true);dialogueSerial++;lastManualAt=Date.now();const token=task(),owner={};chatJob=owner;const prior=m.replyError;m.replyState='pending';delete m.replyError;save();render();
    try{
      const bounded=recentDialogue(m.id);
      const prompt='[GomokuDialogue/v1]\n棋局事实（不能改写）：'+JSON.stringify(boardFacts())+'\n本局近期完整对话：'+JSON.stringify(bounded)+'\n最新用户消息：'+JSON.stringify({name:api.userName(),text:m.text})+'\n先理解并回应最新消息，允许自然闲聊。只输出当前搭子的完整回复；不代替用户发言，不擅自声明已经落下未出现的棋子。聊天不执行落子、改难度或悔棋；这些操作由界面按钮完成。不要报坐标代替回答，也不要突然转移话题。';
      const raw=await api.call(prompt,retryId&&prior==='truncated'?8192:4096,api.persona(r.partner)+(r.note?'\n本局搭子补充资料：'+r.note:''),token);if(!token.valid()||data().round!==r)return false;const reply=api.clean(raw,r.partner);if(!reply)throw Object.assign(new Error('Empty game reply'),{phoneApiCode:'empty'});message('char',reply,{replyTo:m.id});m.replyState='done';
    }catch(error){if(!token.valid())return false;m.replyState='failed';m.replyError=api.classify(error);}
    finally{if(token.valid()&&chatJob===owner){chatJob=null;lastManualAt=Date.now();save();render();resume();}}
    return true;
  }
  function speech(){const r=data().round;return r?(r.speech ||= normalizeSpeech(null,r.moves.length)):null;}
  function advanceSpeech(){const meta=speech();meta.revision++;meta.failed=null;}
  function stopSpeech(clearQueue){
    if(autoTimer!=null)win.clearTimeout(autoTimer);autoTimer=null;
    if(clearQueue)queuedEvent=null;
    if(autoJob){const owner=autoJob;autoJob=null;owner.controller.abort();root?.querySelectorAll('.gmk-speech-status').forEach(e=>e.remove());if(owner.round===data().round&&speech()?.pending?.key===owner.event.key){speech().pending=null;save();}}
  }
  function winningPoints(board,side){const out=[];for(let i=0;i<TOTAL;i++)if(!board[i]){board[i]=side;if(gomokuWin(board,i).length)out.push(i);board[i]=0;}return out;}
  function boardFacts(){
    const r=data().round,p=gomokuPosition(r.moves),longest={user:0,char:0};
    for(let i=0;i<TOTAL;i++)if(p.board[i])for(const[dx,dy]of DIRS){let count=1,x=i%15+dx,y=Math.floor(i/15)+dy;while(inside(x,y)&&p.board[y*15+x]===p.board[i]){count++;x+=dx;y+=dy;}const who=p.board[i]===1?'user':'char';longest[who]=Math.max(longest[who],count);}
    return {game:'五子棋',partner:r.partner,userStone:'黑棋',partnerStone:'白棋',level:r.level,moves:r.moves.map(x=>({at:label(x.index),side:x.side===1?'user':'char'})),lastMove:r.moves.length?{at:label(r.moves.at(-1).index),side:r.moves.at(-1).side===1?'user':'char'}:null,status:p.status,winner:p.winner===1?'user':p.winner===2?'char':null,next:p.status==='playing'?(p.turn===1?'user':'char'):null,longest,userWinningPoints:p.status==='playing'?winningPoints(p.board,1).map(label):[],partnerWinningPoints:p.status==='playing'?winningPoints(p.board,2).map(label):[]};
  }
  function recentDialogue(exclude=''){
    const history=data().log.filter(x=>x.roundId===data().round.id&&x.id!==exclude&&x.role!=='system'&&(x.role!=='user'||!x.replyState||x.replyState==='done')).slice(-20),bounded=[];let size=0;
    for(let i=history.length-1;i>=0;i--){const item={role:history[i].role,name:history[i].name,text:history[i].text},length=JSON.stringify(item).length;if(size+length>16000)break;bounded.unshift(item);size+=length;}return bounded;
  }
  function speechVisible(){return root?.isConnected&&api.visible()&&!doc.hidden&&!needsResume&&['play','chat'].includes(data().screen);}
  function eventValid(event){const r=data().round;return r&&!r.abandoned&&event?.roundId===r.id&&event.revision===speech().revision;}
  function queueSpeech(kind){
    const r=data().round;if(!r||r.abandoned)return;const meta=speech(),event={roundId:r.id,revision:meta.revision,kind,key:meta.revision+':'+kind};
    if(meta.seen.includes(event.key))return;queuedEvent=event;flushSpeech();
  }
  function flushSpeech(){
    if(!queuedEvent||autoJob||autoTimer!=null||!speechVisible())return;
    if(!eventValid(queuedEvent)){queuedEvent=null;return;}
    if(chatJob||composing||data().draft.trim()||data().log.some(m=>m.roundId===data().round.id&&m.role==='user'&&['pending','failed'].includes(m.replyState)))return;
    const wait=Math.max(0,lastManualAt?lastManualAt+15000-Date.now():0,queuedEvent.kind==='end'?0:speech().lastAt? speech().lastAt+10000-Date.now():0);
    if(wait>0){autoTimer=win.setTimeout(()=>{autoTimer=null;flushSpeech();},wait);return;}
    const event=queuedEvent;queuedEvent=null;void speak(event);
  }
  async function speak(event,retry=false){
    if(!eventValid(event)||!speechVisible()||chatJob||autoJob||composing||data().draft.trim()||data().log.some(m=>m.roundId===data().round.id&&m.role==='user'&&['pending','failed'].includes(m.replyState)))return false;
    const r=data().round,meta=speech(),base=task(),serial=dialogueSerial,child=new win.AbortController(),owner={round:r,event,controller:child};
    const token={signal:child.signal,valid:()=>base.valid()&&!child.signal.aborted&&autoJob===owner&&dialogueSerial===serial&&eventValid(event)&&speechVisible()};
    const prior=meta.failed?.error;autoJob=owner;meta.failed=null;meta.pending={key:event.key,revision:event.revision,kind:event.kind};meta.seen=[...new Set([...meta.seen,event.key])].slice(-256);meta.lastAt=Date.now();save();render();
    try{
      const names={opening:'开始新局，你执白，用户执黑先手',resume:'用户主动继续这局棋',move:'你刚完成了一次真实落子',threat:'刚才的落子涉及连子、攻防或拦截',end:'本局已经分出胜负或和棋'};
      const prompt='[GomokuEventComment/v1]\n本次事件：'+names[event.kind]+'\n当前棋局事实（唯一依据，不能改写）：'+JSON.stringify(boardFacts())+'\n本局近期完整对话：'+JSON.stringify(recentDialogue())+'\n请以当前搭子的身份主动对用户说一两句简短、自然、完整的话。结合你的人设、关系、最新落子与胜负状态，延续最近的话题，不机械报棋谱，不强行亲昵，不每次提问，不重复上一句。不替用户发言、描写用户动作或感受，不编造落子、胜负或线下行为，不输出分析、舞台动作、规则说明或标签。落子由本地规则执行，聊天不能改变棋盘；这是你主动开口，不是用户发来了一条新消息。';
      const raw=await api.call(prompt,retry&&prior==='truncated'?8192:2048,api.persona(r.partner)+(r.note?'\n本局搭子补充资料：'+r.note:''),token);
      if(!token.valid())return false;const reply=api.clean(raw,r.partner);if(!reply)throw Object.assign(new Error('Empty game comment'),{phoneApiCode:'empty'});
      if(!data().log.filter(m=>m.roundId===r.id&&m.role==='char').slice(-6).some(m=>m.text===reply))message('char',reply,{kind:'event-comment',eventKey:event.key});
    }catch(error){if(!token.valid())return false;meta.failed={key:event.key,revision:event.revision,kind:event.kind,error:api.classify(error)};}
    finally{if(autoJob===owner){autoJob=null;meta.pending=null;save();render();flushSpeech();}}
    return true;
  }
  function appendSpeechStatus(wrap){
    const meta=speech();if(!meta)return;
    if(autoJob)wrap.append(node('p','gmk-speech-status',data().round.partner+'正在说话…'));
    else if(meta.failed){const line=node('div','gmk-speech-status',data().round.partner+'的发言：'+api.errorText(meta.failed.error)),event={...meta.failed,roundId:data().round.id};const retry=button('重试','',()=>{void speak(event,true);});retry.disabled=!!chatJob||!speechVisible()||data().log.some(m=>m.roundId===data().round.id&&m.role==='user'&&['pending','failed'].includes(m.replyState));line.append(retry);wrap.append(line);}
  }
  function render(){
    if(!root?.isConnected)return;
    if(composing&&data().screen==='chat'){deferredRender=true;return;}
    composing=false;deferredRender=false;
    const active=doc.activeElement,typing=root.contains(active)&&active?.id==='gmk-input',selection=typing?[active.selectionStart,active.selectionEnd]:null;
    const cellFocus=root.contains(active)?active?.dataset?.gmkCell:undefined;
    const oldPlay=root.querySelector('.gmk-play')?.scrollTop||0,oldLog=root.querySelector('#gmk-chat-log'),oldTop=oldLog?.scrollTop||0,atBottom=!oldLog||oldLog.scrollHeight-oldTop-oldLog.clientHeight<30;
    root.replaceChildren(nav(),data().screen==='chat'?chat():data().screen==='play'?play():home());
    if(data().screen==='chat'){
      const log=root.querySelector('#gmk-chat-log');log.scrollTop=atBottom?log.scrollHeight:oldTop;
      if(typing){const input=root.querySelector('#gmk-input');input.focus({preventScroll:true});input.setSelectionRange(...selection);}
    }else if(data().screen==='play'){
      root.querySelector('.gmk-play').scrollTop=oldPlay;
      if(cellFocus!==undefined)root.querySelector('[data-gmk-cell="'+cellFocus+'"]')?.focus({preventScroll:true});
    }
  }
  function onNavigate(view){doc.getElementById('rp-phone')?.classList.toggle('rp-gomoku-open',view==='gomoku');if(view==='gomoku'){mount();render();resume();}else pause();}
  return {mount,refreshIcon,restore,cancel,pause,resume,onNavigate,render,start,select,commit,takeback,sendChat,data,rules,confirmNew,busy:()=>!!chatJob||!!autoJob,position:()=>gomokuPosition(data().round?.moves||[])};
}
