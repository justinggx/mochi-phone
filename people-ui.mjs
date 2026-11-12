import { normalizePeople, discoverPeople, requiresPersonChoice, hasMultipleGroupMembers, subjectSnapshot } from './people.mjs?v=20261112-people-diary-235';

export const PEOPLE_CSS = `
#rp-phone .rp-people-bar{display:flex;flex-wrap:wrap;align-items:center;gap:6px;padding:6px 12px;flex-shrink:0;box-sizing:border-box;border-bottom:1px solid var(--rp-v-border,rgba(128,110,120,.18));color:var(--rp-v-text);background:var(--rp-v-surface,#faf8f5)}
#rp-phone .rp-people-bar button{min-height:34px;max-width:100%;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;border:1px solid var(--rp-v-border,rgba(128,110,120,.25));border-radius:10px;background:var(--rp-v-card,transparent);color:inherit;font:inherit;font-size:calc(11px * var(--mochi-phone-font-scale,1));padding:6px 9px;cursor:pointer}
#rp-phone #rp-view-theatre .rp-people-bar{--rp-v-card:var(--rp-theatre-soft);--rp-v-border:var(--rp-theatre-rule)}
#rp-phone .rp-people-bar button:focus-visible,#rp-phone .rp-people-picker :is(button,input,textarea):focus-visible{outline:2px solid var(--rp-nav-btn,#9b647b);outline-offset:2px}
#rp-phone .rp-people-picker{position:absolute;inset:56px 8px 12px;z-index:180;display:flex;flex-direction:column;box-sizing:border-box;min-height:0;border:1px solid var(--rp-v-border,rgba(128,110,120,.3));border-radius:16px;background:var(--rp-v-surface,#faf8f5);color:var(--rp-v-text,#493b44);box-shadow:0 8px 35px rgba(0,0,0,.2);padding:12px;font-size:calc(12px * var(--mochi-phone-font-scale,1));line-height:1.5}
#rp-phone.rp-theme-custom .rp-people-picker{background:var(--rp-v-card,var(--rp-v-surface,#faf8f5))}
#rp-phone .rp-people-head{display:flex;align-items:center;gap:8px;flex-shrink:0}#rp-phone .rp-people-head strong{flex:1;min-width:0;overflow-wrap:anywhere}
#rp-phone .rp-people-picker button{font:inherit;color:inherit;background:var(--rp-v-card,transparent);border:1px solid var(--rp-v-border,rgba(128,110,120,.25));border-radius:9px;min-height:36px;padding:6px 10px;cursor:pointer}
#rp-phone .rp-people-scroll{overflow:auto;min-height:0;flex:1;padding:6px 2px;overscroll-behavior:contain}
#rp-phone .rp-people-row{display:flex;align-items:center;gap:7px;border-bottom:1px solid var(--rp-v-border,rgba(128,110,120,.15));padding:7px 0;min-width:0}
#rp-phone .rp-people-row label{display:flex;align-items:center;gap:8px;flex:1;min-width:0;overflow-wrap:anywhere;cursor:pointer}
#rp-phone .rp-people-row input{width:18px;height:18px;flex:0 0 18px;accent-color:var(--rp-nav-btn,#9b647b)}
#rp-phone .rp-people-picker :is(input[type=text],textarea){box-sizing:border-box;width:100%;min-width:0;background:var(--rp-v-card,transparent);color:inherit;border:1px solid var(--rp-v-border,rgba(128,110,120,.25));border-radius:8px;padding:8px;font:inherit}
#rp-phone #rp-screen .rp-people-picker :is(input[type=text],textarea)::placeholder{color:inherit!important;opacity:1!important}
#rp-phone .rp-people-picker textarea{resize:vertical;min-height:60px;max-height:130px}#rp-phone .rp-people-form{display:grid;gap:6px;margin-top:10px}#rp-phone .rp-people-foot{display:flex;gap:8px;justify-content:flex-end;padding-top:8px;flex-shrink:0}#rp-phone .rp-people-hint{font-size:calc(10px * var(--mochi-phone-font-scale,1));color:inherit;margin:5px 0;overflow-wrap:anywhere}#rp-phone .rp-people-error{color:var(--rp-v-text);font-size:calc(11px * var(--mochi-phone-font-scale,1));min-height:1.5em;margin:4px 0}
`;
const kinds={diaryAuthor:['diary','日记人物'],bank:['bank','资产主人'],xhs:['xhs','吃瓜范围'],moments:['moments','朋友圈人物'],theatre:['theatre','创作人物'],gamePartner:['','游戏搭子'],avatarSubject:['','头像人物'],momentActor:['','动态人物']};
const transientKinds=new Set(['gamePartner','avatarSubject','momentActor']);
const canonicalKind=kind=>kind==='diaryReply'?'diaryAuthor':kind;
const selectionFor=(people,kind)=>kind==='diaryAuthor'?people.selections.diaryAuthor||people.selections.diaryReply:people.selections[kind];
const norm=s=>String(s||'').normalize('NFKC').toLowerCase().trim();
const copy=v=>JSON.parse(JSON.stringify(v));
const uid=()=> 'person_'+Date.now().toString(36)+'_'+Math.random().toString(36).slice(2,11);
export function createPeopleUI({document,state,context,scope,cardKey,save,onChange=()=>{},guard=async p=>p}={}){
 let cache=null,pending=null,closed=false,epoch=0;const discoveryWaiters=new Set(),cancelled=Symbol('people-discovery-cancelled');
 const model=()=>normalizePeople(state().people);
 const legacy=()=>Object.freeze({id:'legacy-card',name:String(context()?.name2||context()?.characters?.[context()?.characterId]?.name||'TA').trim(),note:'',aliases:Object.freeze([]),cardKey:cardKey(),slotKey:state().chatId});
 function subjects(kind){kind=canonicalKind(kind);const m=model(),selection=selectionFor(m,kind),ids=Array.isArray(selection)?selection:selection?[selection]:[];return ids.map(id=>m.entities[id]).filter(Boolean).map(p=>subjectSnapshot(p,{cardKey:cardKey(),slotKey:state().chatId}));}
 async function candidates(){const own=scope();if(cache?.scope===own)return cache.promise;const promise=discoverPeople(context(),state(),{guard}).then(items=>scope()===own?items:[]);cache={scope:own,promise};try{return await promise;}catch(e){if(cache?.promise===promise)cache=null;throw e;}}
 async function isNarrativeTitle(name,freshCandidates){
  const own=scope(),ctx=context()||{},key=norm(name);if(!key)return false;
  let title=legacy().name,nativeMultiple=false;
  if(ctx.groupId!=null){
   const group=(Array.isArray(ctx.groups)?ctx.groups:[]).find(item=>String(item?.id)===String(ctx.groupId));
   const members=new Set(Array.isArray(group?.members)?group.members:[]),cards=Array.isArray(ctx.characters)?ctx.characters:Object.values(ctx.characters||{});
   title=String(group?.name||'');
   if(cards.some(card=>members.has(card?.avatar)&&norm(card.name||card.data?.name)===norm(title)))return false;
   nativeMultiple=hasMultipleGroupMembers(ctx);
  }
  if(key!==norm(title))return false;
  const list=Array.isArray(freshCandidates)?freshCandidates:await candidates();if(closed||scope()!==own)return false;
  if(list.some(person=>person.evidence==='declared'&&[person.name,...(person.aliases||[])].some(alias=>norm(alias)===key)))return false;
  return nativeMultiple||requiresPersonChoice(list.filter(person=>person.evidence==='declared'&&person.sources?.includes('card')),title)||requiresPersonChoice(list.filter(person=>person.evidence==='declared'&&person.identityDeclared===true),title);
 }
 async function ensure(kind){
  kind=canonicalKind(kind);
  if(closed||!kinds[kind])return null;
  const own=scope(),serial=epoch,saved=subjects(kind);if(saved.length)return saved;
  if(kind==='xhs')return [];
  let interrupt,list;const interruption=new Promise(resolve=>{interrupt=()=>resolve(cancelled);discoveryWaiters.add(interrupt);});
  try{list=await Promise.race([candidates(),interruption]);}
  catch(error){if(scope()!==own||closed||epoch!==serial)return null;return request(kind);}
  finally{discoveryWaiters.delete(interrupt);}
  if(list===cancelled||scope()!==own||closed||epoch!==serial)return null;
  const cardDeclared=list.filter(person=>person.evidence==='declared'&&person.sources?.includes('card')),identityDeclared=list.filter(person=>person.evidence==='declared'&&person.identityDeclared===true);
  if(model().mode==='multi'||hasMultipleGroupMembers(context())||requiresPersonChoice(cardDeclared,legacy().name)||requiresPersonChoice(identityDeclared,legacy().name))return request(kind);
  return [legacy()];
 }
 function close(result=null){if(!pending)return;const p=pending;pending=null;p.panel.remove();document.removeEventListener('keydown',p.keydown,true);p.resolve(result);if(p.focus?.isConnected)p.focus.focus();}
 async function request(kind){
  kind=canonicalKind(kind);
  if(closed||!kinds[kind])return null;
  epoch++;for(const interrupt of discoveryWaiters)interrupt();discoveryWaiters.clear();
  close();const own=scope(),focus=document.activeElement,phone=document.getElementById('rp-screen');if(!phone)return null;
  const panel=document.createElement('section');panel.className='rp-people-picker';panel.setAttribute('role','dialog');panel.setAttribute('aria-modal','true');panel.setAttribute('aria-label',kinds[kind][1]);
  panel.innerHTML='<div class="rp-people-head"><strong></strong><button type="button" aria-label="关闭人物选择">关闭</button></div><p class="rp-people-hint"></p><div class="rp-people-scroll"><div class="rp-people-list"></div><div class="rp-people-form"><button type="button" data-use-card-name>单人卡：用卡名填写</button><p class="rp-people-hint" data-card-name-hint>仅在卡名就是人物姓名时使用；多人卡请在上方选择具体人物。</p><label>姓名<input type="text" maxlength="80" aria-label="人物姓名"></label><label>补充说明（可选）<textarea maxlength="600" aria-label="人物补充说明" placeholder="用于区分同名人物，或补充此人的设定"></textarea></label><button type="button" data-add>保存人物</button></div></div><p class="rp-people-error" role="status" aria-live="polite"></p><div class="rp-people-foot"><button type="button" data-cancel>取消</button><button type="button" data-apply>使用所选人物</button></div>';
  panel.querySelector('strong').textContent=kinds[kind][1];panel.querySelector('.rp-people-hint').textContent=kind==='xhs'?'可多选；不选人物时按本卡近期剧情吃瓜。每篇帖子会记住自己的讨论人物。':kind==='diaryAuthor'?'新日记和回复使用同一人物；其他板块的选择保持。可以填写名单中遗漏的人。':'选择本次人物，本板块会记住；其他板块的选择保持。可以填写名单中遗漏的人。';
  phone.append(panel);let draft=model(),selection=selectionFor(draft,kind),selected=new Set(Array.isArray(selection)?selection:selection?[selection]:[]),editId=null,discovered=[];
  panel.dataset.peopleTaskKind=kind;if(kind==='avatarSubject')panel.style.zIndex='210';
  if(transientKinds.has(kind))panel.querySelector('.rp-people-hint').textContent='选择本次操作的人物；其他板块的选择保持。可以填写名单中遗漏的人。';
  const multi=['xhs','moments'].includes(kind),list=panel.querySelector('.rp-people-list'),nameInput=panel.querySelector('input[type=text]'),noteInput=panel.querySelector('textarea'),error=panel.querySelector('.rp-people-error');
  panel.querySelector('[data-use-card-name]').addEventListener('click',()=>{if(scope()!==own){close();return;}nameInput.value=legacy().name;nameInput.focus();});
  const rows=()=>{
   const active=document.activeElement,focused=list.contains(active)?{id:active.dataset.peopleRowId,action:active.dataset.peopleRowAction}:null;
   list.replaceChildren();
   if(kind==='xhs'){const b=document.createElement('button');b.type='button';b.dataset.peopleRowId='story';b.dataset.peopleRowAction='story';b.textContent='按本卡近期剧情（不限定人物）';b.addEventListener('click',()=>{selected.clear();rows();});list.append(b);}
   const entries=[...Object.values(draft.entities).map(p=>({id:p.id,name:p.name,note:p.note,existing:true})),...discovered.map((p,i)=>({...p,id:'candidate_'+i})).filter(p=>!Object.values(draft.entities).some(e=>norm(e.name)===norm(p.name)))];
   for(const e of entries){const row=document.createElement('div');row.className='rp-people-row';const label=document.createElement('label'),input=document.createElement('input'),text=document.createElement('span');input.type=multi?'checkbox':'radio';input.name='rp-person-choice';input.dataset.peopleRowId=e.id;input.dataset.peopleRowAction='select';input.checked=selected.has(e.id);text.textContent=e.name+(e.note?' · '+e.note.slice(0,55):'');label.append(input,text);row.append(label);input.addEventListener('change',()=>{if(!multi)selected.clear();if(input.checked)selected.add(e.id);else selected.delete(e.id);});
    if(e.existing){const edit=document.createElement('button');edit.type='button';edit.dataset.peopleRowId=e.id;edit.dataset.peopleRowAction='edit';edit.textContent='编辑';edit.setAttribute('aria-label','编辑 '+e.name);edit.addEventListener('click',()=>{editId=e.id;nameInput.value=e.name;noteInput.value=e.note||'';nameInput.focus();});row.append(edit);}list.append(row);
   }
   if(focused)[...list.querySelectorAll('[data-people-row-id]')].find(element=>element.dataset.peopleRowId===focused.id&&element.dataset.peopleRowAction===focused.action)?.focus();
  };
  panel.querySelector('[data-add]').addEventListener('click',()=>{const name=nameInput.value.trim(),note=noteInput.value.trim();if(!name||name.length>80||/[<>{}\r\n\u0000-\u001f]/.test(name)){error.textContent='请填写有效的人物姓名。';nameInput.focus();return;}const id=editId||uid(),old=draft.entities[id];draft.entities[id]={id,name,note,aliases:old?Array.from(new Set([...(old.aliases||[]),...(old.name!==name?[old.name]:[])])):[]};if(!multi)selected.clear();selected.add(id);editId=null;nameInput.value='';noteInput.value='';error.textContent='';rows();});
  const result=new Promise(resolve=>{
   const keydown=e=>{if(e.key==='Escape'){e.preventDefault();e.stopPropagation();close();}if(e.key==='Tab'){const els=[...panel.querySelectorAll('button,input,textarea')].filter(n=>!n.disabled&&!n.hidden);const first=els[0],last=els[els.length-1];if(!panel.contains(document.activeElement)){e.preventDefault();first?.focus();}else if(e.shiftKey&&document.activeElement===first){e.preventDefault();last?.focus();}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first?.focus();}}};
   pending={panel,resolve,focus,keydown};document.addEventListener('keydown',keydown,true);
   panel.querySelector('.rp-people-head button').onclick=()=>close();panel.querySelector('[data-cancel]').onclick=()=>close();
   panel.querySelector('[data-apply]').onclick=()=>{
    if(scope()!==own){close();return;}if(!multi&&selected.size!==1||kind==='moments'&&!selected.size){error.textContent='请选择人物，或填写一个姓名。';return;}
    const ids=[];for(const id of selected){if(draft.entities[id]){ids.push(id);continue;}const c=discovered[Number(id.slice('candidate_'.length))];if(c){const fresh=uid();draft.entities[fresh]={id:fresh,name:c.name,note:c.note||'',aliases:c.aliases||[]};ids.push(fresh);}}
    if(!transientKinds.has(kind)){draft.selections[kind]=multi?ids:ids[0]||null;if(kind==='diaryAuthor')draft.selections.diaryReply=draft.selections.diaryAuthor;}if(ids.some(id=>norm(draft.entities[id]?.name)!==norm(legacy().name))||ids.length>1)draft.mode='multi';state().people=normalizePeople(draft);save();const value=transientKinds.has(kind)?ids.map(id=>subjectSnapshot(state().people.entities[id],{cardKey:cardKey(),slotKey:state().chatId})).filter(Boolean):subjects(kind);close(value);mount();onChange(kind);if(focus?.isConnected)focus.focus();else document.querySelector('[data-people-kind="'+kind+'"]')?.focus();
   };
  });
  rows();panel.querySelector('.rp-people-head button').focus();
  void candidates().then(items=>{if(scope()!==own||pending?.panel!==panel){if(pending?.panel===panel)close();return;}discovered=items;rows();},()=>{if(pending?.panel===panel){if(scope()!==own)close();else error.textContent='暂时未能读取人物候选，可以直接填写姓名。';}});
  return result;
 }
 async function confirmAction(message){
  if(closed)return false;
  epoch++;for(const interrupt of discoveryWaiters)interrupt();discoveryWaiters.clear();
  close();const own=scope(),focus=document.activeElement,phone=document.getElementById('rp-screen');if(!phone)return false;
  const panel=document.createElement('section');panel.className='rp-people-picker rp-people-confirm';panel.setAttribute('role','alertdialog');panel.setAttribute('aria-modal','true');panel.setAttribute('aria-label','确认关联');panel.setAttribute('aria-labelledby','rp-people-confirm-title');panel.setAttribute('aria-describedby','rp-people-confirm-message');
  const head=document.createElement('div');head.className='rp-people-head';const title=document.createElement('strong');title.id='rp-people-confirm-title';title.textContent='确认关联';head.append(title);
  const body=document.createElement('div');body.className='rp-people-scroll';const text=document.createElement('p');text.id='rp-people-confirm-message';text.style.whiteSpace='pre-wrap';text.style.overflowWrap='anywhere';text.textContent=String(message??'');body.append(text);
  const foot=document.createElement('div');foot.className='rp-people-foot';const no=document.createElement('button'),yes=document.createElement('button');no.type=yes.type='button';no.setAttribute('data-confirm-no','');yes.setAttribute('data-confirm-yes','');no.textContent='取消';yes.textContent='确认';foot.append(no,yes);panel.append(head,body,foot);phone.append(panel);
  const result=new Promise(resolve=>{
   const keydown=event=>{
    if(closed||scope()!==own){event.preventDefault();event.stopPropagation();close(false);return;}
    if(event.key==='Escape'){event.preventDefault();event.stopPropagation();close(false);return;}
    if(event.key==='Tab'){
     if(!panel.contains(document.activeElement)){event.preventDefault();no.focus();}
     else if(event.shiftKey&&document.activeElement===no){event.preventDefault();yes.focus();}
     else if(!event.shiftKey&&document.activeElement===yes){event.preventDefault();no.focus();}
    }
   };
   pending={panel,focus,keydown,resolve:value=>resolve(value===true)};document.addEventListener('keydown',keydown,true);
   no.onclick=()=>close(false);yes.onclick=()=>close(!closed&&scope()===own);
  });
  no.focus();return result;
 }
 function mount(){
  closed=false;
  document.getElementById('rp-view-moments')?.querySelectorAll(':scope > .rp-people-bar').forEach(bar=>bar.remove());
  for(const view of ['diary','bank','xhs','theatre']){const root=document.getElementById('rp-view-'+view);if(!root)continue;let bar=root.querySelector(':scope > .rp-people-bar');if(!bar){bar=document.createElement('div');bar.className='rp-people-bar';const nav=root.querySelector('.rp-nav-bar');if(nav)nav.after(bar);else root.prepend(bar);}bar.replaceChildren();
   for(const [kind,[target,label]]of Object.entries(kinds)){if(target!==view)continue;const b=document.createElement('button');b.type='button';b.dataset.peopleKind=kind;const names=subjects(kind).map(s=>s.name);b.textContent=label+'：'+(names.join('、')||(kind==='xhs'?'本卡剧情':'选择人物'))+' ▾';b.title=b.textContent;b.addEventListener('click',()=>{request(kind).catch(()=>{});});bar.append(b);}
   if(view==='bank'&&state().bankData){const b=document.createElement('button');b.type='button';b.id='rp-bank-legacy';b.textContent='查看旧版报告';b.addEventListener('click',()=>onChange('bankLegacy'));bar.append(b);const bind=document.createElement('button');bind.type='button';bind.id='rp-bank-bind-legacy';bind.textContent='关联旧报告';bind.addEventListener('click',()=>onChange('bankBindLegacy'));bar.append(bind);}
  }
 }
 function reset(){closed=true;epoch++;cache=null;for(const interrupt of discoveryWaiters)interrupt();discoveryWaiters.clear();close();}
 return {mount,subjects,ensure,request,confirm:confirmAction,reset,candidates,isNarrativeTitle,legacy};
}
