// Extracted from the existing entry; dependencies stay live through host getters.
export function createPhoneApiConfig(phoneHost) {
function rpReadApiSettingsStore() {
  try {
    const cfg=JSON.parse(phoneHost.localStorage.getItem('rp_ludo_api')||'{}');
    return cfg&&typeof cfg==='object'&&!Array.isArray(cfg)?cfg:{};
  } catch { return {}; }
}

function readCustomApiConfig() {
  // Consumers and request snapshots receive the active connection only.
  // The saved profile library must never be sent to a provider or chat backup.
  const cfg=rpReadApiSettingsStore();
  if(cfg.mode!=='custom')return cfg.mode?{mode:'st'}:{};
  return {mode:'custom',url:typeof cfg.url==='string'?cfg.url:'',key:typeof cfg.key==='string'?cfg.key:'',model:typeof cfg.model==='string'?cfg.model:''};
}

function rpReadApiProfiles() {
  const store=rpReadApiSettingsStore(),ids=new Set(),profiles=[];
  for(const entry of Array.isArray(store.profiles)?store.profiles:[]){
    if(!entry||typeof entry.id!=='string'||!entry.id||ids.has(entry.id)||typeof entry.url!=='string'||typeof entry.key!=='string')continue;
    ids.add(entry.id);profiles.push({id:entry.id,name:typeof entry.name==='string'&&entry.name.trim()?entry.name.trim():'配置'+(profiles.length+1),url:entry.url,key:entry.key,model:typeof entry.model==='string'?entry.model:''});
  }
  // Reading does not write or replace an existing user's connection. A legacy
  // single connection becomes a saved entry on the next explicit save only.
  if(typeof store.url==='string'&&store.url.trim()&&typeof store.key==='string'&&store.key.trim()&&!profiles.some(p=>p.url===store.url&&p.key===store.key&&p.model===(store.model||''))){
    let id='legacy-current';while(ids.has(id))id+='-old';
    profiles.unshift({id,name:(0,phoneHost.rpCustomApiProvider)(store.url)?.label||'配置1',url:store.url,key:store.key,model:typeof store.model==='string'?store.model:''});
  }
  const active=profiles.find(p=>p.id===store.profileId)||profiles.find(p=>p.url===store.url&&p.key===store.key&&p.model===(store.model||''));
  return {store,profiles,activeId:active?.id||''};
}

function rpReadSavedCustomApiConnection() {
  // Explicit consumers reuse one selected saved connection while general apps use ST.
  const {store,profiles,activeId}=rpReadApiProfiles();
  const selected=profiles.find(p=>p.id===activeId)||store;
  return {mode:store.mode==='custom'?'custom':'st',url:typeof selected.url==='string'?selected.url:'',key:typeof selected.key==='string'?selected.key:'',model:typeof selected.model==='string'?selected.model:''};
}

function rpNextApiProfileName(profiles) {
  let n=1;while(profiles.some(p=>p.name==='配置'+n))n++;return '配置'+n;
}

function rpApiProfileNotice(message, suffix) {
  (0,phoneHost.$)(suffix===undefined?'#rp-api-status,#rp-api-status-v':'#rp-api-status'+suffix).text(message);
  if(suffix===undefined)(0,phoneHost.$)('#rp-api-profile-status,#rp-api-profile-status-v').text(message);
  else (0,phoneHost.$)('#rp-api-profile-status'+suffix).text(message);
}

function rpWriteApiSettingsStore(cfg) {
  try { phoneHost.localStorage.setItem('rp_ludo_api',JSON.stringify(cfg));return true; }
  catch {
    rpApiProfileNotice('设置未保存：本机存储不可用，输入已保留，请检查空间后重试。');
    phoneHost.toastr.warning('API设置保存失败，输入已保留，请检查浏览器存储后重试。');return false;
  }
}

function rpSaveCustomApiConfig(cfg) {
  const {store,profiles,activeId}=rpReadApiProfiles();
  const next={...store,mode:cfg.mode==='custom'?'custom':'st',profiles,profilesVersion:1};
  if(next.mode==='custom'){
    const connection={url:String(cfg.url||'').trim(),key:String(cfg.key||'').trim(),model:String(cfg.model||'').trim()};
    if(!connection.url||!connection.key){rpApiProfileNotice('请填写 API 地址和 Key');return false;}
    try{(0,phoneHost.buildCustomApiEndpoint)(connection.url,'chat/completions');connection.model=(0,phoneHost.rpResolveCustomApiModel)(connection);}catch(e){rpApiProfileNotice(e.message);return false;}
    const explicit=Object.prototype.hasOwnProperty.call(cfg,'profileId');
    let profile=explicit?profiles.find(p=>p.id===cfg.profileId):profiles.find(p=>p.url===connection.url&&p.key===connection.key&&p.model===connection.model);
    if(explicit&&cfg.profileId&&!profile){rpApiProfileNotice('该配置已变化，请重新选择后保存。');return false;}
    const name=String(cfg.profileName||'').trim()||profile?.name||rpNextApiProfileName(profiles);
    if(name.length>60){rpApiProfileNotice('配置名称请控制在60字以内。');return false;}
    if(profiles.some(p=>p!==profile&&p.name===name)){rpApiProfileNotice('已有同名配置，请使用其他名称。');return false;}
    if(!profile){profile={id:'api-'+(phoneHost.window.crypto?.randomUUID?.()||Date.now().toString(36)+'-'+Math.random().toString(36).slice(2))};profiles.push(profile);}
    Object.assign(profile,connection,{name});Object.assign(next,connection,{profileId:profile.id});
  }else next.profileId=activeId||store.profileId||'';
  return rpWriteApiSettingsStore(next);
}

return { rpReadApiSettingsStore, readCustomApiConfig, rpReadApiProfiles, rpReadSavedCustomApiConnection, rpNextApiProfileName, rpApiProfileNotice, rpWriteApiSettingsStore, rpSaveCustomApiConfig };
}
