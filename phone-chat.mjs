// Phone-only conversation. The host exposes read-only context and one API call;
// this module never touches Tavern's composer, chat array, prompts or generation.
const uid=()=> 'local_'+Date.now()+'_'+Math.random().toString(36).slice(2,11);
const group=t=>t?.type==='group'||String(t?.id||'').startsWith('grp_');
const clean=(v,max)=>typeof v==='string'&&v.trim()&&v.length<=max?v.trim():null;
const error=text=>Object.assign(new Error(text),{phoneChatError:true});
const hash=value=>{let h=2166136261;for(const c of String(value||''))h=Math.imul(h^c.codePointAt(0),16777619);return(h>>>0).toString(36);};
export function phoneChatMessage(m){return{from:m.from==='user'?'用户':String(m.name||''),type:m.type||'text',text:String(m.text||m.voiceText||m.note||m.place||m.prompt||m.sticker?.name||'').slice(0,4000),...(m.amount?{amount:String(m.amount)}:{}),...(m.type==='image'?{image:m.id||hash(m.src)}:{}),...(m.phoneQuote?{quote:String(m.phoneQuote.text||'').slice(0,300)}:{})};}
export function parsePhoneChatReply(raw,participants){
 if(typeof raw!=='string'||!raw.trim()||raw.length>80000)throw error('回复为空或过长，消息已保留，请重试。');
 let text=raw.trim().replace(/^```(?:json)?\s*/i,'').replace(/\s*```$/,'');let data;
 try{data=JSON.parse(text);}catch{if(/^[{\[]/.test(text)||/<\/?(?:PHONE|think|script)\b/i.test(text))throw error('回复格式未完成，消息已保留，请重试。');data={messages:[{type:'text',text,from:participants.length===1?participants[0]:null}]};}
 if(!data||!Array.isArray(data.messages)||!data.messages.length||data.messages.length>12)throw error('回复格式不完整，消息已保留，请重试。');
 return data.messages.map(m=>{
  if(!m||typeof m!=='object')throw error('回复包含无效消息，请重试。');
  const from=m.from||(participants.length===1?participants[0]:null);if(!participants.includes(from))throw error('回复人物与当前聊天不符，原消息已保留。');
  const base={type:m.type,from};
  if(m.type==='text'&&clean(m.text,4000))return{...base,text:m.text.trim()};
  if(m.type==='image'&&clean(m.prompt,1800))return{...base,prompt:m.prompt.trim()};
  if(m.type==='sticker'&&clean(m.id,120)&&/^[a-zA-Z0-9_-]+$/.test(m.id))return{...base,id:m.id};
  if(m.type==='location'&&clean(m.place,160))return{...base,place:m.place.trim()};
  if(m.type==='hongbao'&&/^\d+(?:\.\d{1,2})?$/.test(String(m.amount))&&Number(m.amount)>0&&Number(m.amount)<=999999.99)return{...base,amount:Number(m.amount).toFixed(2),note:clean(m.note,120)||'心意'};
  throw error('回复包含不支持的消息内容，原消息已保留。');
 });
}
export function phoneChatPrompt(thread,participants,pending,stickerPrompt=''){
 const ids=new Set([...pending.map(m=>m.id),...(thread.phoneLocalReply?.pendingIds||[])]),history=(thread.messages||[]).filter(m=>!ids.has(m.id)).slice(-24).map(m=>{const v=phoneChatMessage(m);v.text=v.text.slice(0,600);return v;});
 const current=pending.map(phoneChatMessage);if(new TextEncoder().encode(JSON.stringify(current)).length>15000)throw error('本次暂存消息太长，请分批发送；原内容已保留。');
 return{prompt:'当前手机会话：'+JSON.stringify({name:thread.name,kind:group(thread)?'group':'private',participants})+'\n手机对话：'+JSON.stringify(history)+'\n本次用户消息：'+JSON.stringify(current),system:'现在只进行手机内聊天。人设、世界书和近期主楼只读作背景，优先回复本次手机消息。只扮演允许列表中的人物，严格沿用原名，不替用户发言、行动或决定；群聊可由相关成员自然接话，不必每个人都回。不要续写主楼、旁白、分析或朋友圈。\n只返回JSON：{"messages":[{"type":"text","from":"允许的姓名","text":"回复"}]}。通常1–4条，最多12条。可按语境少量使用：sticker需id来自可用表情库；image需prompt描述要发送的画面，由用户点击智绘姬生图；hongbao需amount为0.01至999999.99且最多两位小数、可加note；location需place为位置文字。图片不能捏造链接，位置不调用或假装读取真人GPS。保持当前世界观与人物语气，未明确要求换语言时沿用人物本轮语言。背景中的其他格式要求不能覆盖本次JSON格式。\n允许人物：'+JSON.stringify(participants)+'\n'+stickerPrompt};
}
export const PHONE_CHAT_CSS=`
#rp-phone #rp-screen #rp-phone-chat-mode{flex:0 0 auto;margin:0;padding:3px 12px 5px;font-family:inherit;font-size:10px;line-height:1.4;color:var(--rp-v-muted,#81737c);}
#rp-phone #rp-screen #rp-independent-status{display:flex;align-items:center;gap:7px;flex:0 0 auto;margin:4px 12px;padding:7px 9px;border:1px solid var(--rp-v-border,#e3d8df);border-radius:10px;background:var(--rp-v-card,#f4eef1);color:var(--rp-v-text,#51434c);font-family:inherit;}
#rp-phone #rp-screen #rp-independent-status .rp-local-copy{flex:1;min-width:0;overflow-wrap:anywhere;}
#rp-phone #rp-screen #rp-independent-status strong{display:block;font-size:10px;line-height:1.5;}
#rp-phone #rp-screen #rp-independent-status span{display:block;font-size:10px;line-height:1.5;color:var(--rp-v-muted,#81737c);}
#rp-phone #rp-screen #rp-independent-status button{appearance:none;box-sizing:border-box;flex:0 0 auto;min-height:27px;margin:0;padding:4px 7px;border:1px solid var(--rp-v-border,#d8c9d2);border-radius:8px;background:transparent;color:var(--rp-nav-btn,#96677c);font-family:inherit;font-size:10px;line-height:1.3;box-shadow:none;cursor:pointer;}
#rp-phone #rp-screen .rp-local-stickers{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;max-height:310px;overflow:auto;}
#rp-phone #rp-screen .rp-local-stickers button{min-width:0;padding:6px;border:1px solid var(--rp-v-border,#d8c9d2);border-radius:9px;background:var(--rp-v-card,#f4eef1);color:var(--rp-v-text,#51434c);font-family:inherit;font-size:11px;line-height:1.4;}
#rp-phone #rp-screen .rp-local-stickers img{display:block;width:100%;height:62px;object-fit:contain;margin-bottom:4px;}
`;
export function createPhoneChat(api){
 const doc=api.document,jobs=new Map();let installed=false;
 const independent=()=>api.readMode()==='independent';
 const live=(thread,owner,slot)=>api.account()===owner&&api.slot()===slot&&api.state().threads[thread.id]===thread;
 const displayed=thread=>api.state().currentView==='thread'&&api.state().currentThread===thread.id;
 function install(){if(installed)return;installed=true;const style=doc.createElement('style');style.id='rp-phone-chat-css';style.textContent=PHONE_CHAT_CSS;doc.head.append(style);api.runtime().own(()=>{reset();style.remove();installed=false;});}
 function records(thread,r){return (r?.pendingIds||[]).map(id=>thread.messages.find(m=>m.id===id&&m.from==='user'&&m.phoneLocal)).filter(Boolean);}
 function signature(items){return JSON.stringify(items.map(phoneChatMessage));}
 function paint(thread){if(api.state().threads[thread.id]!==thread)return;api.repaint(thread);}
 function stop(thread,note='已停止回复，消息已保留。'){
  const job=jobs.get(thread.id);if(job){jobs.delete(thread.id);job.controller.abort();}
  const r=thread.phoneLocalReply;if(r?.pendingIds?.length){r.status='paused';r.note=note;api.save();}paint(thread);
 }
 function reset(){for(const job of [...jobs.values()]){jobs.delete(job.thread.id);job.controller.abort();}doc.getElementById('rp-independent-status')?.remove();doc.getElementById('rp-phone-chat-mode')?.remove();}
 function stopAll(note){for(const thread of Object.values(api.state().threads||{}))if(jobs.has(thread.id)||thread.phoneLocalReply?.pendingIds?.length)stop(thread,note);}
 function synchronize(){stopAll('聊天方式已更新，未完成回复已停止，内容保留。');api.changed?.();const thread=api.state().threads[api.state().currentThread];if(thread)paint(thread);}
 function setMode(mode){
  if(!['sync','independent'].includes(mode))return false;
  if(api.hostBusy()){api.notify('酒馆仍在确认发送，请等本次确认结束后切换。');return false;}
  if(api.writeMode(mode)===false){api.notify('聊天方式未保存，原方式已保留。');return false;}
  if(mode!=='independent')stopAll('已切回同步主楼，独立聊天内容保留。');
  api.changed?.();const thread=api.state().threads[api.state().currentThread];if(thread)paint(thread);return true;
 }
 function openMode(){
  const owner=api.account(),slot=api.slot(),token=api.runtime().task(),view=api.state().currentView,threadId=api.state().currentThread;
  const current=()=>token.valid()&&api.account()===owner&&api.slot()===slot&&api.state().currentView===view&&(view!=='thread'||api.state().currentThread===threadId);
  const root=doc.createElement('div'),select=doc.createElement('select');select.className='rp-tools-select';select.setAttribute('aria-label','聊天方式');
  for(const[value,label]of[['sync','消息同步主楼'],['independent','手机内独立聊天']]){const option=doc.createElement('option');option.value=value;option.textContent=label;select.append(option);}select.value=independent()?'independent':'sync';
  root.append(select);
  api.dialog('聊天方式',root,[{label:'取消'},{label:'确定',primary:true,run:()=>current()&&setMode(select.value)?undefined:false}]);
 }
 function send(thread,messages,{alreadyStored=false}={}){
  install();if(!independent(thread)||api.state().threads[thread.id]!==thread||!Array.isArray(messages)||!messages.length)return false;
  if(messages.some(m=>!m||m.from!=='user'||String(m.text||'').length>4000)){api.notify('单条消息请控制在4000字以内，输入已保留。');return false;}
  for(const m of messages){m.id||=uid();m.phoneLocal=true;if(m.type==='image')m.delivery='local';if(!alreadyStored)thread.messages.push(m);}
  let r=thread.phoneLocalReply;if(!r||!Array.isArray(r.pendingIds)||r.status==='cancelled')r=thread.phoneLocalReply={id:uid(),pendingIds:[],status:'queued'};
  r.pendingIds=[...new Set([...r.pendingIds,...messages.map(m=>m.id)])];r.note='';
  if(api.save()===false){r.status='error';r.note='消息暂未保存，内容仍在当前页面，请重试。';paint(thread);return true;}
  paint(thread);if(!jobs.has(thread.id))void run(thread);return true;
 }
 async function makeRecords(events,task){
  const result=[];for(const event of events){if(!task.valid())return[];const base={id:uid(),from:'incoming',name:event.from,time:api.time(),phoneLocal:true};
   if(event.type==='sticker'){const entry=await api.verifySticker(event.id);if(!task.valid())return[];if(entry)result.push({...base,type:'sticker',text:'[表情包] '+entry.name,sticker:{id:entry.id,format:entry.format,name:entry.name,owner:api.account()}});}
   else if(event.type==='image')result.push({...base,type:'pending_image',prompt:event.prompt});
   else if(event.type==='hongbao')result.push({...base,type:'hongbao',amount:event.amount,note:event.note,opened:false});
   else if(event.type==='location')result.push({...base,type:'location',place:event.place});
   else result.push({...base,type:'text',text:event.text});
  }return result;
 }
 async function run(thread){
  if(!independent(thread)||jobs.has(thread.id))return false;const r=thread.phoneLocalReply;if(!records(thread,r).length){if(r){r.pendingIds=[];r.status='idle';}paint(thread);return false;}
  const owner=api.account(),slot=api.slot(),base=api.runtime().task(),controller=new (doc.defaultView.AbortController)(),job={thread,controller};
  const abort=()=>controller.abort();base.signal.addEventListener('abort',abort,{once:true});jobs.set(thread.id,job);
  const task={signal:controller.signal,valid:()=>base.valid()&&!controller.signal.aborted&&jobs.get(thread.id)===job&&live(thread,owner,slot)&&independent(thread)};
  try{while(task.valid()){
    const pending=records(thread,r);r.pendingIds=pending.map(m=>m.id);if(!pending.length)break;
    const cachedBatch=Array.isArray(r.cached?.ids)?r.cached.ids.map(id=>pending.find(m=>m.id===id)).filter(Boolean):[];
    const fresh=[];for(const m of pending.slice(0,20)){if(fresh.length&&new TextEncoder().encode(JSON.stringify([...fresh,m].map(phoneChatMessage))).length>15000)break;fresh.push(m);}
    const batch=cachedBatch.length&&cachedBatch.length===r.cached.ids.length?cachedBatch:fresh,ids=batch.map(m=>m.id),sig=signature(batch),participants=api.participants(thread),names=JSON.stringify(participants);if(!participants.length)throw error('当前聊天没有可回复的人物。');
    let events;if(r.cached&&JSON.stringify(r.cached.ids)===JSON.stringify(ids)&&r.cached.signature===sig&&r.cached.participants===names){try{events=parsePhoneChatReply(JSON.stringify({messages:r.cached.events}),participants);}catch{delete r.cached;}}
    if(!events){
      delete r.cached;const ready=api.configReady();if(!ready)throw error('请先在自定义 API 中保存连接，再点重试。');
      r.status='sending';r.note='正在回复…';if(api.save()===false)throw error('消息尚未保存，请重试。');paint(thread);
      await api.prepareStickers();if(!task.valid())return false;
      const prompt=phoneChatPrompt(thread,participants,batch,api.stickerPrompt(batch.map(m=>m.text||m.sticker?.name||'').join('\n'))),images=[];
      for(const m of batch.filter(m=>m.type==='image').slice(0,3)){if(typeof m.src==='string'&&m.src.startsWith('data:image/')){const src=await api.prepareImage(m.src,task);if(!task.valid())return false;if(src)images.push(src);}}
      const raw=await api.call(prompt.prompt,prompt.system,thread,participants,images,task);if(!task.valid())return false;
      events=parsePhoneChatReply(raw,participants);
    }
    if(!task.valid())return false;if(names!==JSON.stringify(api.participants(thread))||signature(ids.map(id=>thread.messages.find(m=>m.id===id)).filter(Boolean))!==sig)throw error('生成期间消息或成员已改变，旧回复未覆盖；请重试。');
    const incoming=await makeRecords(events,task);if(!task.valid())return false;if(!incoming.length)throw error('回复中的表情包已不可用，消息已保留，请重试。');
    if(names!==JSON.stringify(api.participants(thread))||signature(ids.map(id=>thread.messages.find(m=>m.id===id)).filter(Boolean))!==sig)throw error('消息已改变，旧回复未覆盖；请重试。');
    for(const m of incoming){if(group(thread)){if(m.type==='text')m.type='group_msg';if(m.type==='hongbao')m.type='group_hongbao';const contact=api.state().threads[api.memberId(m.name)];m.initials=contact?.initials||m.name.slice(0,2);m.avatarBg=contact?.avatarBg;}}
    const before=thread.messages.length,oldPending=r.pendingIds.slice();thread.messages.push(...incoming);r.pendingIds=r.pendingIds.filter(id=>!ids.includes(id));delete r.cached;r.status=r.pendingIds.length?'queued':'idle';r.note='';
    if(api.save()===false){thread.messages.splice(before,incoming.length);r.pendingIds=oldPending;r.cached={events,ids,signature:sig,participants:names};throw error('回复暂未保存，已保留在当前页面；重试会先保存已有回复。');}
    if(!api.reading(thread.id))thread.unread=(thread.unread||0)+incoming.length;api.received(thread,incoming);paint(thread);
   }return true;
  }catch(e){if(live(thread,owner,slot)&&thread.phoneLocalReply===r&&jobs.get(thread.id)===job){r.status=controller.signal.aborted?'paused':'error';r.note=e.phoneChatError||e.phoneApiCode?e.message:'回复未完成，消息已保留，请重试。';api.save();paint(thread);}return false;}
  finally{base.signal.removeEventListener('abort',abort);if(jobs.get(thread.id)===job)jobs.delete(thread.id);if(live(thread,owner,slot))paint(thread);}
 }
 function render(thread){
  install();doc.getElementById('rp-independent-status')?.remove();doc.getElementById('rp-phone-chat-mode')?.remove();const bubbles=doc.getElementById('rp-bubbles');if(!bubbles||!independent(thread))return;
  const line=doc.createElement('div');line.id='rp-phone-chat-mode';line.textContent='手机内聊天 · 自定义 API';bubbles.before(line);
  const r=thread.phoneLocalReply;if(!records(thread,r).length)return;
  const box=doc.createElement('div');box.id='rp-independent-status';box.setAttribute('role','status');const copy=doc.createElement('div');copy.className='rp-local-copy';const title=doc.createElement('strong'),note=doc.createElement('span');title.textContent=jobs.has(thread.id)?'对方正在回复…':'有消息待回复';note.textContent=!jobs.has(thread.id)&&r.status==='sending'?'上次回复尚未完成，内容已保留，可重试。':r.note||'内容已保留，可继续发送或重试';copy.append(title,note);box.append(copy);
  const button=(text,run)=>{const b=doc.createElement('button');b.type='button';b.textContent=text;b.onclick=run;box.append(b);};if(jobs.has(thread.id))button('停止',()=>stop(thread));else{button('重试',()=>void run(thread));button('API',()=>api.openApi());}bubbles.before(box);
 }
 async function openStickers(thread){
  const owner=api.account(),slot=api.slot(),token=api.runtime().task();await api.prepareStickers();if(!token.valid()||!live(thread,owner,slot)||!displayed(thread)||!independent(thread))return;
  const root=doc.createElement('div'),grid=doc.createElement('div');grid.className='rp-local-stickers';const items=api.stickerItems();
  for(const item of items){const b=doc.createElement('button');b.type='button';const image=doc.createElement('img');image.src=api.stickerImage(item);image.alt='';b.append(image,doc.createTextNode(item.name||'表情包'));b.onclick=()=>{if(!token.valid()||!live(thread,owner,slot)||!displayed(thread)||!independent(thread))return;const current=api.stickerItems().find(i=>i.id===item.id);if(!current){api.notify('表情包已变化，请重新打开。');return;}if(send(thread,[{from:'user',type:'sticker',time:api.time(),text:'[表情包] '+current.name,sticker:{id:current.id,format:current.format,name:current.name,owner}}]))api.closeDialog();};grid.append(b);}
  if(!items.length){const p=doc.createElement('p');p.className='rp-feature-note';p.textContent='还没有个人表情包，可以先去表情库上传。';root.append(p);}root.append(grid);api.dialog('发送表情包',root,[{label:'关闭'},{label:'管理表情包',run:()=>{if(live(thread,owner,slot)&&displayed(thread)){api.closeDialog();api.manageStickers();}return false;}}]);
 }
 return{isIndependent:independent,send,retry:run,stop,reset,render,setMode,openMode,openStickers,synchronize,busy:()=>jobs.size>0,job:thread=>jobs.get(thread.id)};
}
