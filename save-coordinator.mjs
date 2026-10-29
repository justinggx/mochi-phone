// Extracted from the existing entry; dependencies stay live through host getters.
export function createPhoneSaveCoordinator(phoneHost) {
const rpPhoneSaveBases = new Map(), rpPhoneSaveWarnings = new Set(), rpPhonePendingCommits = new Set(), rpPhonePendingPayloads = new Map();

const RP_PHONE_SAVE_WRITER = phoneHost.window.__rpPhoneSaveWriter ||= 'page-'+(phoneHost.window.crypto?.randomUUID?.()||Date.now().toString(36)+'-'+Math.random().toString(36).slice(2));

function rpPhoneSaveClock(payload) {
  const result=Object.create(null),raw=payload?.__saveClock;
  if(raw&&typeof raw==='object'&&!Array.isArray(raw))for(const[key,value]of Object.entries(raw))if(Number.isSafeInteger(value)&&value>0)Object.defineProperty(result,key,{value,enumerable:true,writable:true,configurable:true});
  return result;
}

function rpPhoneStateRevision(payload) {
  return !payload?'empty':typeof payload.__revision==='string'&&payload.__revision?payload.__revision:'legacy:'+JSON.stringify(payload);
}

function rpPhoneRememberSaveBase(slot,payload) {
  rpPhoneSaveBases.set(slot,{revision:rpPhoneStateRevision(payload),clock:rpPhoneSaveClock(payload)});
}

function rpPhoneReadPersisted(slot, owner=null) {
  const es=(0,phoneHost._extSettings)()?.[phoneHost.EXT_KEY]?.[slot],local=(0,phoneHost.readLocalPhoneState)('rp-phone-v1-'+slot,'save verification'),archived=phoneHost.rpPhoneArchive.get(slot);
  return [es,local,archived].filter(p=>(0,phoneHost.isPhoneStatePayload)(p)&&(!owner||(0,phoneHost.rpPhoneStateOwnedBy)(p,owner))).reduce((a,b)=>(0,phoneHost.choosePhoneStateCopy)(a,b),null);
}

function rpPhoneSaveCopyPrefix(slot) { return 'rp-phone-save-copy-v1:'+encodeURIComponent(slot)+':'; }

function rpPhoneSaveConflictCopies(slot=phoneHost.STATE.chatId) {
  if(!phoneHost.rpArchiveAccountHandle||!slot)return [];
  const prefix=rpPhoneSaveCopyPrefix(slot),records=new Map(),add=(key,value)=>{
    if(key.startsWith(prefix)&&value?.version===1&&value.account===phoneHost.rpArchiveAccountHandle&&value.slot===slot&&(0,phoneHost.isPhoneStatePayload)(value.payload))records.set(key,value);
  };
  for(const[key,value]of phoneHost.rpPhoneArchive.entries())add(key,value);
  try{const accountPrefix=(0,phoneHost.rpAccountStoragePrefix)();for(let i=0;i<phoneHost.window.localStorage.length;i++){
    const key=phoneHost.window.localStorage.key(i);if(key?.startsWith(accountPrefix+prefix))try{add(key.slice(accountPrefix.length),JSON.parse(phoneHost.window.localStorage.getItem(key)));}catch{}
  }}catch{}
  const current=rpPhoneSaveClock(rpPhoneReadPersisted(slot));
  return [...records].filter(([,r])=>(rpPhoneSaveClock(r.payload)[r.writer]||0)>(current[r.writer]||0))
    .sort((a,b)=>Number(b[1].at)-Number(a[1].at)).map(([key,value])=>({key,...value}));
}

function rpPhoneWarnSaveConflict(slot) {
  if(rpPhoneSaveWarnings.has(slot))return;
  rpPhoneSaveWarnings.add(slot);
  phoneHost.toastr.warning('另一页面已更新此聊天，本页修改已保留为恢复副本，已暂停覆盖保存。请到设置「备份与恢复」导出副本，再重新打开聊天。','存档更新冲突',{timeOut:0,extendedTimeOut:0});
}

function rpPhoneCommitPayload(slot,input,expected=rpPhoneSaveBases.get(slot),completed=()=>{}) {
  if(!phoneHost.rpArchiveAccountHandle||phoneHost.PHONE_STATE_BLOCKED_SLOTS.has(slot)||phoneHost.PHONE_STATE_PROTECTED_KEYS.has('rp-phone-v1-'+slot))return false;
  const account=phoneHost.rpArchiveAccountHandle,base=expected||{revision:'empty',clock:Object.create(null)},payload=JSON.parse(JSON.stringify(input));
  const sequence=(Number(phoneHost.window.__rpPhoneSaveSequence)||0)+1;phoneHost.window.__rpPhoneSaveSequence=sequence;
  payload.__revision=RP_PHONE_SAVE_WRITER+':'+sequence;payload.__saveClock={...base.clock,[RP_PHONE_SAVE_WRITER]:sequence};
  const key=rpPhoneSaveCopyPrefix(slot)+RP_PHONE_SAVE_WRITER,record={version:1,account,slot,writer:RP_PHONE_SAVE_WRITER,at:Date.now(),payload};
  const pendingCopy={account,payload};rpPhonePendingPayloads.set(slot,pendingCopy);let settled=false;
  const finish=ok=>{if(settled)return;settled=true;if(rpPhonePendingPayloads.get(slot)===pendingCopy)rpPhonePendingPayloads.delete(slot);completed(ok);};
  let staged=false;try{phoneHost.localStorage.setItem(key,JSON.stringify(record));staged=true;}catch{}
  const archiveStage=phoneHost.rpPhoneArchive.put(key,record);
  const commit=()=>{
    if(account!==phoneHost.rpArchiveAccountHandle){finish(false);return false;}
    const current=rpPhoneReadPersisted(slot),clock=rpPhoneSaveClock(current);
    const onlyOwnAdvance=typeof current?.__revision==='string'&&current.__revision.startsWith(RP_PHONE_SAVE_WRITER+':')&&Object.entries(clock).every(([writer,n])=>writer===RP_PHONE_SAVE_WRITER||n<=(base.clock[writer]||0));
    if(rpPhoneStateRevision(current)!==base.revision&&!onlyOwnAdvance){delete phoneHost.CHAT_STORE[slot];rpPhoneWarnSaveConflict(slot);finish(false);return false;}
    payload.__savedAt=Math.max(Date.now(),Number(current?.__savedAt||0)+1);
    const es=(0,phoneHost._extSettings)();let localSaved=false;
    if(es){es[phoneHost.EXT_KEY] ||= {};es[phoneHost.EXT_KEY][slot]=payload;(0,phoneHost._saveSettings)();}
    try{phoneHost.localStorage.setItem('rp-phone-v1-'+slot,JSON.stringify(payload));localSaved=true;}catch{}
    rpPhoneRememberSaveBase(slot,payload);delete phoneHost.CHAT_STORE[slot];rpPhoneSaveWarnings.delete(slot);
    phoneHost.rpPhoneArchive.put(slot,payload).then(ok=>{if(!localSaved&&!ok)(0,phoneHost.warnPhoneStorageFailure)();if(!localSaved)finish(ok&&account===phoneHost.rpArchiveAccountHandle);});
    if(localSaved)finish(true);return true;
  };
  const schedule=()=>{
    if(account!==phoneHost.rpArchiveAccountHandle){finish(false);return false;}
    const locks=phoneHost.window.navigator?.locks;
    if(!locks?.request){try{return commit();}catch{finish(false);(0,phoneHost.warnPhoneStorageFailure)();return false;}}
    const job=Promise.resolve().then(()=>locks.request('mochi-phone-save:'+encodeURIComponent(account)+':'+slot,{mode:'exclusive'},commit));
    rpPhonePendingCommits.add(job);
    job.catch(()=>{if(account===phoneHost.rpArchiveAccountHandle){rpPhoneWarnSaveConflict(slot);finish(false);}}).finally(()=>rpPhonePendingCommits.delete(job));
    return true;
  };
  if(staged){void archiveStage;return schedule();}
  const pending=Promise.resolve(archiveStage).then(ok=>{if(!ok){(0,phoneHost.warnPhoneStorageFailure)();finish(false);return false;}return schedule();});
  rpPhonePendingCommits.add(pending);pending.catch(()=>{(0,phoneHost.warnPhoneStorageFailure)();finish(false);}).finally(()=>rpPhonePendingCommits.delete(pending));
  return true;
}

return { rpPhoneSaveBases, rpPhoneSaveWarnings, rpPhonePendingCommits, rpPhonePendingPayloads, RP_PHONE_SAVE_WRITER, rpPhoneSaveClock, rpPhoneStateRevision, rpPhoneRememberSaveBase, rpPhoneReadPersisted, rpPhoneSaveCopyPrefix, rpPhoneSaveConflictCopies, rpPhoneWarnSaveConflict, rpPhoneCommitPayload };
}
