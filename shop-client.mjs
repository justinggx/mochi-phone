const uid=()=>globalThis.crypto?.randomUUID?.()||'shop_'+Date.now()+'_'+Math.random().toString(36).slice(2);
export function createShopClient(api){
  let account=null,device=null,token=null,leaseId=null,current=null,pending=null,busy=null,backupAvailable=true,epoch=0,readSerial=0,recovering=null;
  const storage=api.storage;
  const key=()=> 'mochi-shop-v1:'+encodeURIComponent(account)+':';
  function scope(){
    const next=api.account();if(!next)throw new Error('请先登录酒馆账户，再打开小店。');
    if(next!==account){epoch++;readSerial++;account=next;token=null;leaseId=null;current=null;pending=null;busy=null;recovering=null;backupAvailable=true;try{device=storage.getItem(key()+'device')||uid();storage.setItem(key()+'device',device);pending=JSON.parse(storage.getItem(key()+'pending')||'null');}catch{device=uid();}}
    return account;
  }
  function keepPending(value){pending=value;try{if(value)storage.setItem(key()+'pending',JSON.stringify(value));else storage.removeItem(key()+'pending');}catch{}}
  async function request(route,body={}){
    const owner=scope(),revision=epoch,controller=new AbortController(),timer=setTimeout(()=>controller.abort(),20000);
    try{
      const response=await api.fetch('/api/plugins/mochi-shop/v1',{method:'POST',credentials:'same-origin',headers:{'Content-Type':'application/json',...api.headers()},body:JSON.stringify({...body,route}),signal:controller.signal});
      let out;try{out=await response.json();}catch{throw new Error('小店云存档服务尚未就绪，请联系管理员安装配套服务，或稍后重试。');}
      if(owner!==api.account()||revision!==epoch)throw Object.assign(new Error('账户已改变，请重新打开小店。'),{code:'account'});
      if(!response.ok||!out.ok)throw Object.assign(new Error(out.error||'云存档服务暂时不可用。'),{code:out.code,status:response.status});
      return out;
    }finally{clearTimeout(timer);}
  }
  async function settle(result,route,body){
    if(route==='trash'){if(body.deleted&&current?.state.id===body.id){current=null;token=null;leaseId=null;}}
    else if(result.id)await load(result.id);
    // Keep the operation journal until the authoritative state has also been read.
    keepPending(null);return result;
  }
  async function recoverPending(){
    scope();const command=pending;if(!command)return null;const revision=epoch,out=await request('operation-status',{op:command.op});
    if(out.result)return settle(out.result,command.route,command.body||{id:command.id,deleted:out.result.deleted});
    // The same operation ID is reused. A timeout is never permission to issue it anew.
    if(!command.body)throw new Error('上次导入尚未确认。请重新选择同一备份文件后重试，不要另建空档。');
    try{const result=await request(command.route,{...command.body,op:command.op});return await settle(result,command.route,command.body);}catch(e){if(revision===epoch&&e.code!=='account'&&e.status&&e.status<500){keepPending(null);token=null;leaseId=null;throw new Error('上次操作未被服务器接受，原进度保留。请刷新进度并在本机接续。');}throw e;}
  }
  async function recover(){scope();if(recovering)return recovering;const job=recoverPending();recovering=job;try{return await job;}finally{if(recovering===job)recovering=null;}}
  async function load(id){scope();const serial=++readSerial,result=await request('read',{id});if(serial!==readSerial)throw Object.assign(new Error('已切换档案，忽略旧的读取结果。'),{code:'stale'});current=result;if(leaseId!==id){token=null;leaseId=null;}return current;}
  async function mutate(route,body,{needsLease=false}={}){
    scope();if(busy)throw new Error('正在保存，请稍等。');const owner={},revision=epoch;busy=owner;
    try{
      if(pending){await recover();throw new Error('已确认上次操作，请查看最新进度后再操作。');}
      if(needsLease&&(!token||leaseId!==body.id))throw Object.assign(new Error('请先点击“在本机继续”，取得经营权。'),{status:423});
      const op=uid(),data={...body,op,...(needsLease?{device,token,rev:current?.rev}:{})};
      keepPending({op,route,id:body.id,body:JSON.stringify(data).length<30000?data:null});
      let result;
      try{result=await request(route,data);}catch(e){
        if(e.code==='account'||revision!==epoch)throw e;
        if(e.status&&e.status<500){keepPending(null);if(e.status===423){token=null;leaseId=null;}throw e;}
        try{const check=await request('operation-status',{op});if(check.result)result=check.result;}catch{}
        if(!result)throw new Error('尚未确认服务器是否保存。请保留页面，点击“核对进度”；原操作不会被重复扣款。');
      }
      return await settle(result,route,data);
    }finally{if(busy===owner)busy=null;}
  }
  return{
    scope,request,recover,load,mutate,
    get current(){scope();return current;},get busy(){return !!busy||!!recovering;},get writable(){scope();return !!token&&leaseId===current?.state.id;},get uncertain(){scope();return !!pending;},get backupAvailable(){return backupAvailable;},
    async list(){const out=await request('list');backupAvailable=out.backupAvailable;return out.campaigns;},
    async claim(id,force=false){scope();const out=await request('claim',{id,device,deviceLabel:api.deviceLabel(),force}),held=out.token;token=held;leaseId=id;try{return await load(id);}catch(e){if(token===held){token=null;leaseId=null;}throw e;}},
    async renew(){scope();if(!current||!token||leaseId!==current.state.id)return;const held=token;try{await request('renew',{id:leaseId,device,token:held});}catch(e){if(token===held){token=null;leaseId=null;throw e;}}},
    async release(){scope();if(!leaseId||!token)return;const t=token,id=leaseId;token=null;leaseId=null;try{await request('release',{id,device,token:t});}catch{}},
    action(action){return mutate('action',{id:current?.state.id,action},{needsLease:true});},
    save(label){return mutate('snapshot',{id:current?.state.id,label},{needsLease:true});},
    trash(id,deleted){return mutate('trash',{id,deleted},{needsLease:deleted});},
    async importBackup(backup){scope();if(pending?.route==='import'&&!pending.body){if(busy||recovering)throw new Error('正在核对保存，请稍等。');const owner={};busy=owner;try{const command=pending,status=await request('operation-status',{op:command.op});if(status.result)return await settle(status.result,'import',{});const result=await request('import',{op:command.op,backup});return await settle(result,'import',{});}finally{if(busy===owner)busy=null;}}return mutate('import',{backup});},
    reset(){epoch++;readSerial++;account=null;token=null;leaseId=null;current=null;pending=null;busy=null;recovering=null;}
  };
}
