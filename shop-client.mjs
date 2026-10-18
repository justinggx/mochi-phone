const uid=()=>globalThis.crypto?.randomUUID?.()||'shop_'+Date.now()+'_'+Math.random().toString(36).slice(2);
export function createShopClient(api){
  let account=null,device=null,token=null,current=null,pending=null,busy=false,backupAvailable=true;
  const storage=api.storage;
  const key=()=> 'mochi-shop-v1:'+encodeURIComponent(account)+':';
  function scope(){
    const next=api.account();if(!next)throw new Error('请先登录酒馆账户，再打开小店。');
    if(next!==account){account=next;token=null;current=null;pending=null;try{device=storage.getItem(key()+'device')||uid();storage.setItem(key()+'device',device);pending=JSON.parse(storage.getItem(key()+'pending')||'null');}catch{device=uid();}}
    return account;
  }
  function keepPending(value){pending=value;try{if(value)storage.setItem(key()+'pending',JSON.stringify(value));else storage.removeItem(key()+'pending');}catch{}}
  async function request(route,body={}){
    const owner=scope(),controller=new AbortController(),timer=setTimeout(()=>controller.abort(),20000);
    try{
      const response=await api.fetch('/api/plugins/mochi-shop/v1',{method:'POST',credentials:'same-origin',headers:{'Content-Type':'application/json',...api.headers()},body:JSON.stringify({...body,route}),signal:controller.signal});
      let out;try{out=await response.json();}catch{throw new Error('小店云存档服务尚未就绪，请联系管理员安装配套服务，或稍后重试。');}
      if(owner!==api.account())throw Object.assign(new Error('账户已改变，请重新打开小店。'),{code:'account'});
      if(!response.ok||!out.ok)throw Object.assign(new Error(out.error||'云存档服务暂时不可用。'),{code:out.code,status:response.status});
      return out;
    }finally{clearTimeout(timer);}
  }
  async function recover(){
    scope();if(!pending)return null;const out=await request('operation-status',{op:pending.op});
    if(out.result){keepPending(null);return out.result;}
    // The same operation ID is reused. A timeout is never permission to issue it anew.
    if(!pending.body)throw new Error('上次导入尚未确认。请重新选择同一备份文件后重试，不要另建空档。');
    try{const result=await request(pending.route,{...pending.body,op:pending.op});keepPending(null);return result;}catch(e){if(e.status&&e.status<500){keepPending(null);token=null;throw new Error('上次操作未被服务器接受，原进度保留。请刷新进度并在本机接续。');}throw e;}
  }
  async function load(id){const result=await request('read',{id});current=result;return current;}
  async function mutate(route,body,{needsLease=false}={}){
    scope();if(busy)throw new Error('正在保存，请稍等。');busy=true;
    try{
      if(pending){const old=await recover();if(old?.id)await load(old.id);throw new Error('已确认上次操作，请查看最新进度后再操作。');}
      if(needsLease&&!token)throw Object.assign(new Error('请先点击“在本机继续”，取得经营权。'),{status:423});
      const op=uid(),data={...body,op,...(needsLease?{device,token,rev:current?.rev}:{})};
      keepPending({op,route,id:body.id,body:JSON.stringify(data).length<30000?data:null});
      let result;
      try{result=await request(route,data);}catch(e){
        if(e.status&&e.status<500){keepPending(null);if(e.status===423)token=null;throw e;}
        try{const check=await request('operation-status',{op});if(check.result)result=check.result;}catch{}
        if(!result)throw new Error('尚未确认服务器是否保存。请保留页面，点击“核对进度”；原操作不会被重复扣款。');
      }
      keepPending(null);if(route==='trash'&&body.deleted){if(current?.state.id===body.id)current=null;token=null;}else if(result.id)await load(result.id);return result;
    }finally{busy=false;}
  }
  return{
    scope,request,recover,load,mutate,
    get current(){scope();return current;},get busy(){return busy;},get writable(){scope();return !!token;},get uncertain(){scope();return !!pending;},get backupAvailable(){return backupAvailable;},
    async list(){const out=await request('list');backupAvailable=out.backupAvailable;return out.campaigns;},
    async claim(id,force=false){scope();const out=await request('claim',{id,device,deviceLabel:api.deviceLabel(),force});token=out.token;try{return await load(id);}catch(e){token=null;throw e;}},
    async renew(){if(!current||!token)return;try{await request('renew',{id:current.state.id,device,token});}catch(e){token=null;throw e;}},
    async release(){if(!current||!token)return;const t=token;token=null;try{await request('release',{id:current.state.id,device,token:t});}catch{}},
    action(action){return mutate('action',{id:current?.state.id,action},{needsLease:true});},
    save(label){return mutate('snapshot',{id:current?.state.id,label},{needsLease:true});},
    trash(id,deleted){return mutate('trash',{id,deleted},{needsLease:deleted});},
    async importBackup(backup){scope();if(pending?.route==='import'&&!pending.body){const status=await request('operation-status',{op:pending.op});if(status.result){keepPending(null);await load(status.result.id);return status.result;}const result=await request('import',{op:pending.op,backup});keepPending(null);await load(result.id);return result;}return mutate('import',{backup});},
    reset(){account=null;token=null;current=null;pending=null;}
  };
}
