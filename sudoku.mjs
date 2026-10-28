// Sudoku answers are calculated locally; roleplay never supplies puzzle answers.
export const SUDOKU_LEVELS=['easy','standard','challenge'];
const N=81,FULL=511,uid=()=>globalThis.crypto?.randomUUID?.()||'sdk_'+Date.now()+'_'+Math.random().toString(36).slice(2,10);
const array=(a,max)=>Array.isArray(a)&&a.length===N&&Array.from({length:N},(_,i)=>Number.isInteger(a[i])&&a[i]>=0&&a[i]<=max).every(Boolean);
const box=i=>Math.floor(i/27)*3+Math.floor(i%9/3),same=(a,b)=>Math.floor(a/9)===Math.floor(b/9)||a%9===b%9||box(a)===box(b);
const pop=n=>{let count=0;while(n){n&=n-1;count++;}return count;};
export function sudokuConflicts(values){
 if(!array(values,9))return [];
 const out=new Set();for(let i=0;i<N;i++)if(values[i])for(let j=0;j<i;j++)if(values[j]===values[i]&&same(i,j)){out.add(i);out.add(j);}return [...out];
}
export function sudokuCandidates(values,index){
 if(!array(values,9)||!Number.isInteger(index)||index<0||index>=N||values[index])return [];
 let mask=FULL;for(let i=0;i<N;i++)if(values[i]&&same(i,index))mask&=~(1<<(values[i]-1));
 return Array.from({length:9},(_,i)=>i+1).filter(n=>mask&(1<<(n-1)));
}
export function solveSudoku(input,{limit=2,nodeLimit=50000}={}){
 const result={count:0,solution:null,nodes:0,exhausted:false};if(!array(input,9))return result;
 const board=input.slice(),rows=Array(9).fill(0),cols=Array(9).fill(0),boxes=Array(9).fill(0);
 for(let i=0;i<N;i++)if(board[i]){const r=Math.floor(i/9),c=i%9,b=box(i),bit=1<<(board[i]-1);if((rows[r]|cols[c]|boxes[b])&bit)return result;rows[r]|=bit;cols[c]|=bit;boxes[b]|=bit;}
 function visit(){
  if(result.count>=limit||result.exhausted)return;if(++result.nodes>nodeLimit){result.exhausted=true;return;}
  let target=-1,mask=0,size=10;
  for(let i=0;i<N;i++)if(!board[i]){const bits=FULL&~(rows[Math.floor(i/9)]|cols[i%9]|boxes[box(i)]),n=pop(bits);if(!n)return;if(n<size){target=i;mask=bits;size=n;if(n===1)break;}}
  if(target<0){result.count++;if(!result.solution)result.solution=board.slice();return;}
  const r=Math.floor(target/9),c=target%9,b=box(target);
  while(mask&&result.count<limit&&!result.exhausted){const bit=mask&-mask;mask^=bit;board[target]=Math.log2(bit)+1;rows[r]|=bit;cols[c]|=bit;boxes[b]|=bit;visit();rows[r]^=bit;cols[c]^=bit;boxes[b]^=bit;}board[target]=0;
 }
 visit();return result;
}
function shuffled(list,random){const out=list.slice();for(let i=out.length-1;i>0;i--){const raw=Number(random()),j=Math.min(i,Math.max(0,Math.floor((Number.isFinite(raw)?raw:0)*(i+1))));[out[i],out[j]]=[out[j],out[i]];}return out;}
export async function createSudokuRound(level='standard',{random=Math.random,yieldControl=async()=>{},valid=()=>true,partner={name:'搭子'}}={}){
 if(!SUDOKU_LEVELS.includes(level))throw new Error('请选择有效的题目档位。');
 const order=()=>shuffled([0,1,2],random).flatMap(b=>shuffled([0,1,2],random).map(r=>b*3+r)),rows=order(),cols=order(),numbers=shuffled([1,2,3,4,5,6,7,8,9],random);
 const solution=rows.flatMap(r=>cols.map(c=>numbers[(r*3+Math.floor(r/3)+c)%9])),givens=solution.slice(),target={easy:44,standard:36,challenge:30}[level];let filled=N,step=0;
 for(const i of shuffled(Array.from({length:N},(_,n)=>n),random)){
  if(!valid())throw new DOMException('题目生成已取消','AbortError');
  if(++step%6===0){await yieldControl();if(!valid())throw new DOMException('题目生成已取消','AbortError');}
  const old=givens[i];givens[i]=0;const test=solveSudoku(givens);if(test.count!==1||test.exhausted)givens[i]=old;else filled--;if(filled<=target)break;
 }
 return{id:uid(),level,givens,values:givens.slice(),notes:Array(N).fill(0),helped:Array(N).fill(0),undo:[],helps:0,partner:String(partner.name||'搭子').slice(0,100),note:String(partner.note||'').slice(0,600),startedAt:Date.now(),lastHelp:null};
}
function validPosition(r,p){return p&&array(p.values,9)&&array(p.notes,511)&&array(p.helped,1)&&r.givens.every((v,i)=>(!v||p.values[i]===v)&&(!p.values[i]||p.notes[i]===0)&&(!p.helped[i]||!v&&p.values[i]>0));}
export function normalizeSudoku(raw){
 const data={version:1,level:'standard',screen:'home',round:null},issues=[];
 if(raw==null)return{data,issues};if(!raw||typeof raw!=='object'||Array.isArray(raw)){issues.push({path:'sudoku',value:raw});return{data,issues};}
 if(SUDOKU_LEVELS.includes(raw.level))data.level=raw.level;const r=raw.round;
 if(r!=null){
  if(!r||!array(r.givens,9)||r.givens.filter(Boolean).length<17||typeof r.id!=='string'||!r.id||r.id.length>100||!SUDOKU_LEVELS.includes(r.level)||typeof r.partner!=='string'||!r.partner.trim()||r.partner.length>100||!validPosition(r,r)){issues.push({path:'sudoku.round',value:r});return{data,issues};}
  const solved=solveSudoku(r.givens);if(solved.count!==1||solved.exhausted){issues.push({path:'sudoku.round',value:r});return{data,issues};}
  data.round={id:r.id,level:r.level,givens:r.givens.slice(),values:r.values.slice(),notes:r.notes.slice(),helped:r.helped.slice(),undo:[],helps:Number.isSafeInteger(r.helps)&&r.helps>=0?r.helps:0,partner:r.partner,note:typeof r.note==='string'?r.note.slice(0,600):'',startedAt:Number.isFinite(r.startedAt)?r.startedAt:Date.now(),lastHelp:null};
  if(Array.isArray(r.undo))for(const p of r.undo.slice(-100)){if(validPosition(r,p))data.round.undo.push({values:p.values.slice(),notes:p.notes.slice(),helped:p.helped.slice()});else issues.push({path:'sudoku.undo',value:p});}
  if(r.lastHelp&&Number.isInteger(r.lastHelp.index)&&r.lastHelp.index>=0&&r.lastHelp.index<N&&r.lastHelp.value===solved.solution[r.lastHelp.index]&&r.values[r.lastHelp.index]===r.lastHelp.value)data.round.lastHelp={index:r.lastHelp.index,value:r.lastHelp.value,replaced:Number.isInteger(r.lastHelp.replaced)?r.lastHelp.replaced:0};
 }
 return{data,issues};
}
function pushUndo(r){r.undo.push({values:r.values.slice(),notes:r.notes.slice(),helped:r.helped.slice()});if(r.undo.length>100)r.undo.shift();r.lastHelp=null;}
export function sudokuEnter(r,index,value,{notes=false}={}){
 if(!r||!Number.isInteger(index)||index<0||index>=N||!Number.isInteger(value)||value<0||value>9||r.givens[index])return false;
 if(notes&&r.values[index])return false;if(!notes&&r.values[index]===value&&!r.notes[index])return false;
 if(!notes&&value===0&&!r.values[index]&&!r.notes[index])return false;pushUndo(r);
 if(notes){if(value)r.notes[index]^=1<<(value-1);else r.notes[index]=0;}else{r.values[index]=value;r.notes[index]=0;r.helped[index]=0;}return true;
}
export function sudokuUndo(r){const previous=r?.undo.pop();if(!previous)return false;r.values=previous.values;r.notes=previous.notes;r.helped=previous.helped;r.lastHelp=null;return true;}
export function sudokuProgress(r){if(!r)return{filled:0,complete:false,wrong:[]};const p=solveSudoku(r.givens,{limit:1}),wrong=p.solution?r.values.flatMap((v,i)=>v&&v!==p.solution[i]?[i]:[]):[];return{filled:r.values.filter(Boolean).length,complete:!!p.solution&&!wrong.length&&r.values.every(Boolean),wrong};}
export function sudokuHelp(r,selected=null){
 const solved=solveSudoku(r.givens);if(solved.count!==1||solved.exhausted)return null;const solution=solved.solution,editable=i=>Number.isInteger(i)&&i>=0&&i<N&&!r.givens[i]&&r.values[i]!==solution[i];let index=null;
 if(editable(selected)&&r.values[selected])index=selected;if(index==null)index=r.values.findIndex((v,i)=>v&&!r.givens[i]&&v!==solution[i]);
 if(index<0||index==null){if(editable(selected))index=selected;else{const blanks=r.values.flatMap((v,i)=>v?[]:[{i,count:sudokuCandidates(r.values,i).length}]).sort((a,b)=>a.count-b.count||a.i-b.i);index=blanks[0]?.i;}}
 if(index==null||index<0)return null;const replaced=r.values[index],value=solution[index];pushUndo(r);r.values[index]=value;r.notes[index]=0;r.helped[index]=1;r.helps++;r.lastHelp={index,value,replaced};return r.lastHelp;
}


const P='#rp-phone #rp-screen #rp-view-sudoku';
export const SUDOKU_CSS=`
${P}{display:none;flex-direction:column;overflow:hidden!important;background:var(--rp-v-surface,#fbf8f3)!important;color:var(--rp-v-text,#51434b);font-family:inherit;isolation:isolate;--sdk-accent:var(--rp-nav-btn,#a66e83);--sdk-line:var(--rp-v-border,#dfd2d7);--sdk-soft:var(--rp-v-card,#f1e9ed);--sdk-error:var(--rp-v-danger,#b43c51);--sdk-help:color-mix(in srgb,var(--rp-v-text,#51434b) 75%,#31a4ad);}
${P} *{box-sizing:border-box;}
${P} button{font-family:inherit;font-style:normal;color:inherit;cursor:pointer;touch-action:manipulation;box-shadow:none;min-width:0;margin:0;}
${P} button:disabled{cursor:default;opacity:.45;}
${P} .sdk-nav{display:flex;align-items:center;flex:0 0 82px;min-height:82px;padding:42px 12px 0;gap:4px;}
${P} .sdk-back{display:grid;place-items:center;flex:0 0 36px;height:40px;max-height:40px;line-height:1;min-height:40px;background:transparent;border:0;padding:0;font-size:28px;}
${P} .sdk-nav-title{flex:1;text-align:center;font-size:16px;}
${P} .sdk-rules{height:40px;max-height:40px;line-height:1;flex:0 0 42px;min-height:40px;padding:0;font-size:12px;background:transparent;border:0;}
${P} .sdk-body{flex:1;min-height:0;overflow:auto;overscroll-behavior:contain;padding:10px 14px 20px;}
${P} .sdk-home{padding:18px 10px;min-height:100%;display:flex;flex-direction:column;justify-content:center;gap:14px;}
${P} .sdk-eyebrow{font-size:10px;letter-spacing:3px;opacity:.6;}
${P} .sdk-title{font-family:'Songti SC',SimSun,serif;font-size:38px;font-weight:400;letter-spacing:6px;margin:0;}
${P} .sdk-subtitle{font-size:12px;line-height:1.9;margin:0;opacity:.75;white-space:pre-line;}
${P} .sdk-home-grid{display:grid;grid-template-columns:repeat(3,1fr);width:96px;transform:rotate(-9deg);align-self:flex-end;border:1px solid var(--sdk-accent);color:var(--sdk-accent);margin:0 12px 0 0;}
${P} .sdk-home-grid span{display:grid;place-items:center;aspect-ratio:1;border:1px solid var(--sdk-line);font-size:19px;}
${P} .sdk-partner{overflow-wrap:anywhere;display:flex;align-items:center;gap:7px;font-size:12px;line-height:1.7;flex-wrap:wrap;}
${P} .sdk-link{border:0;background:transparent;padding:7px 2px;min-height:32px;color:var(--sdk-accent);font-size:11px;}
${P} .sdk-levels{display:flex;gap:8px;flex-wrap:wrap;}
${P} .sdk-levels button{flex:1;border:1px solid var(--sdk-line);background:transparent;border-radius:16px;min-height:36px;font-size:12px;padding:6px;}
${P} .sdk-levels button[aria-checked=true]{background:var(--sdk-soft);border-color:var(--sdk-accent);color:var(--sdk-accent);}
${P} .sdk-primary{background:var(--sdk-accent);color:var(--rp-v-surface,#fff);border:0;border-radius:24px;min-height:42px;font-size:13px;padding:10px 18px;}
${P} .sdk-info{display:flex;justify-content:space-between;gap:8px;align-items:center;flex-wrap:wrap;font-size:11px;line-height:1.7;margin:0 0 8px;}
${P} .sdk-status{font-size:11px;line-height:1.8;white-space:pre-wrap;overflow-wrap:anywhere;min-height:22px;margin:6px 0;}
${P} .sdk-status:empty{display:none;}
${P} .sdk-board{display:grid;grid-template-columns:repeat(9,minmax(0,1fr));grid-template-rows:repeat(9,minmax(0,1fr));aspect-ratio:1;width:100%;max-width:420px;margin:0 auto;border:2px solid var(--sdk-accent);border-radius:3px;overflow:hidden;background:var(--rp-v-surface,#fff);}
${P} .sdk-cell{position:relative;display:grid;place-items:center;aspect-ratio:1;width:100%;height:100%;min-height:0!important;min-width:0!important;padding:0!important;background:transparent!important;border:0!important;border-right:1px solid var(--sdk-line)!important;border-bottom:1px solid var(--sdk-line)!important;border-radius:0!important;font-size:17px;line-height:1!important;font-weight:400;outline:0;opacity:1!important;}
${P} .sdk-cell[data-col="2"],${P} .sdk-cell[data-col="5"]{border-right:2px solid var(--sdk-accent)!important;}
${P} .sdk-cell[data-row="2"],${P} .sdk-cell[data-row="5"]{border-bottom:2px solid var(--sdk-accent)!important;}
${P} .sdk-cell[data-col="8"]{border-right:0!important;}${P} .sdk-cell[data-row="8"]{border-bottom:0!important;}
${P} .sdk-cell.peer{background:var(--sdk-soft)!important;}${P} .sdk-cell.equal{color:var(--sdk-accent);font-weight:600;}${P} .sdk-cell.given{font-weight:600;}
${P} .sdk-cell.entered{color:var(--sdk-accent);}${P} .sdk-cell.helped{color:var(--sdk-help);}
${P} .sdk-cell.helped:after{content:'';position:absolute;bottom:3px;right:3px;width:3px;height:3px;border-radius:50%;background:currentColor;}
${P} .sdk-cell.error{color:var(--sdk-error)!important;}${P} .sdk-cell.selected{box-shadow:inset 0 0 0 2px var(--sdk-accent)!important;background:var(--sdk-soft)!important;z-index:1;}
${P} .sdk-cell:focus-visible{outline:2px solid var(--sdk-accent);outline-offset:-3px;}
${P} .sdk-notes{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));grid-template-rows:repeat(3,minmax(0,1fr));width:100%;height:100%;padding:1px;}
${P} .sdk-notes span{font-size:8px;line-height:1;display:grid;place-items:center;color:var(--sdk-accent);}
${P} .sdk-tools{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:4px;margin:9px 0;}
${P} .sdk-tools button{min-height:34px;font-size:11px;border:0;border-radius:6px;background:var(--sdk-soft);padding:5px 2px;}
${P} .sdk-tools button[aria-pressed=true]{background:var(--sdk-accent);color:var(--rp-v-surface,#fff);}
${P} .sdk-pad{display:grid;grid-template-columns:repeat(9,minmax(0,1fr));gap:3px;}
${P} .sdk-pad button{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:3px;min-height:43px;font-size:19px;line-height:1.1;padding:6px 0;border:1px solid var(--sdk-line);border-radius:5px;background:transparent;}
${P} .sdk-pad small{font-size:8px;line-height:1;opacity:.6;}
${P} .sdk-help{overflow-wrap:anywhere;display:flex;align-items:center;justify-content:space-between;width:100%;gap:7px;margin:12px 0 0;min-height:42px;background:var(--sdk-accent);border:0;border-radius:21px;padding:9px 13px;color:var(--rp-v-surface,#fff);font-size:12px;}
${P} .sdk-help-action{font-size:11px;line-height:1.85;margin:10px 2px;overflow-wrap:anywhere;color:var(--sdk-help);}
${P} .sdk-complete{padding:8px 0;color:var(--sdk-accent);font-size:13px;line-height:1.8;}
`;


export function createSudoku(api){
 const doc=api.document,win=doc.defaultView;let root,mounted,selected=null,noteMode=false,checked=false,status='',pending=null,epoch=0;
 const data=()=>api.state().sudoku ||= normalizeSudoku(null).data;
 const node=(tag,cls='',text='')=>{const e=doc.createElement(tag);e.className=cls;if(text)e.textContent=text;return e;};
 const button=(text,cls,run)=>{const b=node('button',cls,text);b.type='button';b.dataset.sdkFocus=cls+'|'+text;b.addEventListener('click',run);return b;};
 const visible=()=>api.visible()&&!doc.hidden;
 function pause(){epoch++;if(pending)status="已取消出题，可以重新开始。";pending=null;}
 function restore(raw){pause();const n=normalizeSudoku(raw);api.state().sudoku=n.data;if(n.issues.length)(api.state().recovery ||= []).push(...n.issues);selected=null;noteMode=false;checked=false;status='';return n.data;}
 function mount(){
  if(mounted===api.runtime()&&root?.isConnected)return;
  mounted=api.runtime();doc.getElementById('rp-view-sudoku')?.remove();let style=doc.getElementById('rp-sudoku-css');if(!style){style=node('style');style.id='rp-sudoku-css';doc.head.append(style);}style.textContent=SUDOKU_CSS;
  root=node('div','rp-view');root.id='rp-view-sudoku';root.style.display='none';doc.getElementById('rp-screen')?.append(root);
  if(!doc.querySelector('[data-folder-app=sudoku]')){const item=node('div','rp-folder-item');item.dataset.folderApp='sudoku';item.append(node('div','rp-folder-item-ico'),node('div','rp-folder-item-lbl','数独'));doc.querySelector('#rp-folder-modal .rp-folder-popup')?.append(item);}refreshIcon();
  mounted.listenDOM(root,'keydown',key);mounted.listenDOM(doc,'visibilitychange',()=>{if(doc.hidden)pause();});mounted.own(()=>{pause();style.remove();});render();
 }
 function refreshIcon(theme=api.iconTheme?.()){
  const icon=doc.querySelector('#rp-folder-modal [data-folder-app="sudoku"] .rp-folder-item-ico');if(!icon||!api.iconSource)return;
  const src=api.iconSource(theme,false),local=api.iconSource(theme,true);if(icon.dataset.sdkIconUrl===src&&icon.querySelector('img'))return;
  const img=node('img','sdk-folder-image');img.alt='';img.setAttribute('aria-hidden','true');img.loading='lazy';img.decoding='async';img.referrerPolicy='no-referrer';img.style.cssText='width:100%;height:100%;object-fit:contain';let usingLocal=false;
  icon.dataset.sdkIconUrl=src;icon.dataset.sdkIconTheme=['candy','star','misty'].includes(theme)?theme:'custom';
  img.onerror=()=>{if(!img.isConnected||icon.dataset.sdkIconUrl!==src)return;if(!usingLocal){usingLocal=true;img.src=local;}else{icon.textContent='▦';delete icon.dataset.sdkIconUrl;}};
  icon.replaceChildren(img);img.src=src;
 }
 function save(){const r=data().round;if(r&&sudokuProgress(r).complete)api.endStats?.('win',r);api.save();}
 function rules(){const body=node('div');for(const t of ['所有格子都由你填写。每行、每列、每个3×3宫都应包含1至9，不能重复。题目有且只有一个解。','点格子，再用下方数字键填写；电脑可按1至9，方向键移动，退格/Delete擦除。原有题目数字不能改。笔记模式可记录候选数字；撤销保留最近100步。','求助会由本地解题程序填对一格，不消耗API。若已有填错格，优先修正所选错误格或第一处错误；否则优先所选空格。搭子不会轮流落笔，求助不会替你填完整盘。','三个档位按题面保留的数字数量区分，不是严格的解题技巧评级。点击检查会标出与唯一解不符的已填数字。','局面随当前聊天的小手机存档保存。换聊天各自保留，刷新后可继续；备份恢复只补充缺失的数独局面，不覆盖当前题目。'])body.append(node('p','',t));api.dialog('数独玩法',body,[{label:'知道了'}]);}
 function newGame(){if(data().round)api.dialog('换一道题？',node('p','','当前这道题会被新题替换。'),[{label:'取消'},{label:'换题',run:()=>{api.endStats?.('abandoned',data().round);pause();data().round=null;data().screen='home';selected=null;checked=false;status='选好档位和搭子，再开始新题。';save();render();}}]);else void start(true);}
 async function start(fresh=false){
  if(pending)return;if(data().round&&!fresh){if(!sudokuProgress(data().round).complete)api.startStats?.(data().round);data().screen='play';status='';save();render();return;}
  const serial=++epoch,origin=data(),token=api.runtime().task(),owner={};pending=owner;status='正在准备唯一解题目…';
  try{render();const round=await createSudokuRound(origin.level,{partner:api.partner(),valid:()=>serial===epoch&&data()===origin&&token.valid()&&visible(),yieldControl:()=>new Promise(r=>win.setTimeout(r,0))});if(serial!==epoch||data()!==origin||!token.valid()||!visible())return;origin.round=round;api.startStats?.(round);origin.screen='play';selected=null;checked=false;noteMode=false;status='选一格，慢慢填。';save();}
  catch(e){if(serial===epoch&&e.name!=='AbortError')status='题目准备未完成，请重试。';}
  finally{if(pending===owner){pending=null;render();}}
 }
 function select(i){if(!data().round||!Number.isInteger(i)||i<0||i>=N)return;selected=i;status=data().round.givens[i]?'这是题目给出的数字，可以选空格填写。':'';render();}
 function enter(n){const r=data().round;if(pending||!r||selected==null){status='先点选一个格子。';render();return;}if(sudokuProgress(r).complete)return;if(r.givens[selected]){status='题目给出的数字不能修改。';render();return;}if(sudokuEnter(r,selected,n,{notes:noteMode&&n!==0})){status='';save();render();}}
 function help(){const r=data().round;if(!r||pending||sudokuProgress(r).complete)return;const h=sudokuHelp(r,selected);if(!h)return;selected=h.index;status='';save();render();}
 function undo(){if(pending||!data().round)return;if(sudokuUndo(data().round)){status='已撤销一步。';save();render();}}
 function key(e){
  if(data().screen!=='play'||!visible()||e.ctrlKey||e.metaKey||e.altKey||e.isComposing||/INPUT|TEXTAREA|SELECT/.test(e.target.tagName))return;
  if(e.target.closest('button')&&!e.target.matches('.sdk-cell')&&['Enter',' '].includes(e.key))return;
  let handled=true;if(/^[1-9]$/.test(e.key))enter(Number(e.key));else if(['Backspace','Delete','0'].includes(e.key))enter(0);else if(['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(e.key)){const i=selected??0,r=Math.floor(i/9),c=i%9;select(e.key==='ArrowLeft'?r*9+Math.max(0,c-1):e.key==='ArrowRight'?r*9+Math.min(8,c+1):e.key==='ArrowUp'?Math.max(0,r-1)*9+c:Math.min(8,r+1)*9+c);root.querySelector('[data-sdk-cell="'+selected+'"]')?.focus({preventScroll:true});}else handled=false;if(handled)e.preventDefault();
 }
 function statisticsButton(){const b=button('统计','rp-stat-button',()=>api.statistics?.());b.disabled=!!pending;return b;}
 function nav(){const n=node('header','sdk-nav'),b=button('‹','sdk-back',()=>{pause();if(data().screen==='play'){data().screen='home';save();render();}else api.navigate('home');});b.setAttribute('aria-label','返回');n.append(b,node('div','sdk-nav-title','数独'),statisticsButton(),button('玩法','sdk-rules',rules));return n;}
 function home(body){
  const home=node('div','sdk-home'),decor=node('div','sdk-home-grid');decor.setAttribute('aria-hidden','true');for(const v of ['1','','3','','5','','7','','9'])decor.append(node('span','',v));
  const r=data().round,p=r?{name:r.partner}:api.partner(),line=node('div','sdk-partner');line.append(node('span','',p.name+' 陪你解题'),button('更换','sdk-link',()=>{if(r){status='本题搭子已固定，换题后可以更换。';render();return;}api.changePartner();}));
  home.append(node('div','sdk-eyebrow','A QUIET LITTLE PUZZLE'),decor,node('h1','sdk-title','数独'),node('p','sdk-subtitle','这一页，由你慢慢填满。\n遇到难处，就向搭子求助。'),line);
  const levels=node('div','sdk-levels');levels.setAttribute('role','radiogroup');levels.setAttribute('aria-label','题目档位');
  SUDOKU_LEVELS.forEach((level,i)=>{const b=button(['入门','标准','挑战'][i],'',()=>{if(pending)return;data().level=level;save();render();});b.setAttribute('role','radio');b.setAttribute('aria-checked',String(data().level===level));b.disabled=!!pending;levels.append(b);});home.append(levels,node('div','sdk-status',status));
  if(r){const progress=sudokuProgress(r);home.append(node('p','sdk-subtitle','当前题目 · '+['入门','标准','挑战'][SUDOKU_LEVELS.indexOf(r.level)]+' · 已填 '+progress.filled+'/81'+(progress.complete?' · 已完成':'')),button(progress.complete?'查看完成的题目':'继续这道题','sdk-primary',()=>{void start();}),button('换一道题','sdk-link',newGame));}
  else home.append(button(pending?'正在出题…':'开始填数独 →','sdk-primary',()=>{void start(true);}));
  for(const b of home.querySelectorAll('button'))if(pending)b.disabled=true;body.append(home);
 }
 function play(body){
  const r=data().round;if(!r){data().screen='home';home(body);return;}
  const progress=sudokuProgress(r),conflicts=new Set(sudokuConflicts(r.values)),errors=new Set(checked?progress.wrong:[]),info=node('div','sdk-info');info.append(node('span','',['入门','标准','挑战'][SUDOKU_LEVELS.indexOf(r.level)]+' · 已填 '+progress.filled+'/81'),node('span','','求助 '+r.helps+' 次'));body.append(info);
  const grid=node('div','sdk-board');grid.setAttribute('role','group');grid.setAttribute('aria-label','九行九列数独棋盘');
  for(let i=0;i<N;i++){
   const value=r.values[i],peer=selected!=null&&same(i,selected),equal=value&&selected!=null&&value===r.values[selected],classes=['sdk-cell',r.givens[i]?'given':value?'entered':'',peer?'peer':'',equal?'equal':'',selected===i?'selected':'',r.helped[i]?'helped':'',conflicts.has(i)||errors.has(i)?'error':''].filter(Boolean).join(' '),cell=button(value?String(value):'',classes,()=>select(i));cell.dataset.sdkCell=String(i);cell.dataset.row=String(Math.floor(i/9));cell.dataset.col=String(i%9);cell.setAttribute('aria-pressed',String(selected===i));cell.setAttribute('aria-label','第'+(Math.floor(i/9)+1)+'行第'+(i%9+1)+'列，'+(value?value:'空格')+(r.givens[i]?'，题目数字':r.helped[i]?'，搭子填入':''));if(r.givens[i])cell.setAttribute('aria-readonly','true');if(conflicts.has(i)||errors.has(i))cell.setAttribute('aria-invalid','true');
   if(!value&&r.notes[i]){const notes=node('span','sdk-notes');for(let n=1;n<=9;n++)notes.append(node('span','',r.notes[i]&(1<<(n-1))?String(n):''));cell.append(notes);cell.setAttribute('aria-label',cell.getAttribute('aria-label')+'，笔记 '+Array.from({length:9},(_,n)=>n+1).filter(n=>r.notes[i]&(1<<(n-1))).join('、'));}grid.append(cell);
  }body.append(grid);
  if(progress.complete)body.append(node('div','sdk-complete','填完了，答案全部正确。'+(r.helps?'这道题，你和'+r.partner+'一起完成。':'这一盘由你独立完成。')));
  const live=node('div','sdk-status',status);live.setAttribute('role','status');live.setAttribute('aria-live','polite');body.append(live);
  const tools=node('div','sdk-tools'),notes=button('笔记','',()=>{noteMode=!noteMode;status=noteMode?'笔记模式：点数字可添加或取消候选。':'填写模式';render();}),erase=button('擦除','',()=>enter(0)),back=button('撤销','',undo),check=button('检查','',()=>{checked=true;status=progress.wrong.length?'还有 '+progress.wrong.length+' 格需要调整，已标出。':progress.complete?'答案全部正确。':'已填数字都正确，继续吧。';render();});
  notes.setAttribute('aria-pressed',String(noteMode));notes.disabled=progress.complete;erase.disabled=selected==null||!!r.givens[selected]||progress.complete;back.disabled=!r.undo.length;tools.append(notes,erase,back,check);body.append(tools);
  const pad=node('div','sdk-pad');for(let n=1;n<=9;n++){const b=button(String(n),'',()=>enter(n));b.setAttribute('aria-label',(noteMode?'笔记':'填写')+n);b.disabled=progress.complete||selected==null||!!r.givens[selected];b.append(node('small','','余'+Math.max(0,9-r.values.filter(v=>v===n).length)));pad.append(b);}body.append(pad);
  const assist=button('','sdk-help',help);assist.id='sdk-help';assist.append(node('span','','向 '+r.partner+' 求助'),node('span','','填对一格 ↗'));assist.disabled=progress.complete||!!pending;body.append(assist);
  if(r.lastHelp){const h=r.lastHelp;body.append(node('p','sdk-help-action',r.partner+' '+(h.replaced?'把':'在')+'第'+(Math.floor(h.index/9)+1)+'行、第'+(h.index%9+1)+'列'+(h.replaced?'的 '+h.replaced+' 改成了 ':'填入了 ')+h.value+'。'));}
  body.append(button('换一道题','sdk-link',newGame));
 }
 function render(){
  if(!root?.isConnected)return;const old=root.querySelector('.sdk-body'),scroll=old?.scrollTop||0,active=root.contains(doc.activeElement)?doc.activeElement:null,focus=active?.dataset?.sdkCell,control=active?.dataset?.sdkFocus;
  const body=node('main','sdk-body');root.replaceChildren(nav(),body);if(data().screen==='play')play(body);else home(body);body.scrollTop=scroll;if(focus!=null)root.querySelector('[data-sdk-cell="'+focus+'"]')?.focus({preventScroll:true});else if(control!=null)Array.from(root.querySelectorAll('button')).find(b=>!b.disabled&&b.dataset.sdkFocus===control)?.focus({preventScroll:true});
 }
 function onNavigate(view){if(view==='sudoku'){mount();render();}else pause();}
 return{mount,refreshIcon,restore,pause,cancel:pause,resume:()=>{},onNavigate,render,start,select,enter,help,undo,data,busy:()=>!!pending};
}
