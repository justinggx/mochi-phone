import {join,resolve} from 'node:path';
import {ShopStore,ShopError} from './shop-store.mjs';
import {readCharacterCard,readCardChoices} from './shop-persona.mjs';
export const info={id:'mochi-shop',name:'MochiPhone shop saves',description:'Private account-scoped transactional shop saves and resumable games'};
const stores=new Map();let timer=null;
export function getStoreForUser(user){
 if(!user?.profile?.handle||!user.directories?.root||!user.directories?.characters||!user.directories?.worlds)throw new ShopError('auth','请先登录酒馆账户。',401);
 const root=resolve(user.directories.root),key=join(root,'mochi-shop');if(!stores.has(key)){if(stores.size>=32){const oldest=stores.keys().next().value;stores.get(oldest).close();stores.delete(oldest);}stores.set(key,new ShopStore(key));}const store=stores.get(key);stores.delete(key);stores.set(key,store);return store;
}
export async function init(router){
 router.use((req,res,next)=>{res.setHeader('Cache-Control','no-store');if(!req.user?.profile?.handle)return res.status(401).json({error:'请先登录酒馆账户。',code:'auth'});next();});
 router.get('/health',(_req,res)=>res.json({ok:true,version:1,schema:1,rules:1,storage:'sqlite',serverSaves:true,cardMembers:true}));
 router.post('/v1',async(req,res)=>{
  try{
   const b=req.body;if(!b||typeof b!=='object'||Array.isArray(b)||typeof b.route!=='string'||JSON.stringify(b).length>12000000)throw new ShopError('input','存档请求格式不合法或过大。',413);
   const store=getStoreForUser(req.user);let out;
   switch(b.route){
   case 'list':out={campaigns:store.list(),backupAvailable:!store.backupError};break;
   case 'read':out=store.read(b.id);break;
   case 'operation-status':out={result:store.operationStatus(b.op)};break;
   case 'card':out={card:readCardChoices(req.user.directories,b.avatar)};break;
   case 'profile':out={profile:readCharacterCard(req.user.directories,b.avatar,b.member)};break;
   case 'create':out=store.create(b,readCharacterCard(req.user.directories,b.avatar,b.member,{requireMember:true}));break;
   case 'claim':out=store.claim(b.id,b.device,b.deviceLabel,b.force===true);break;
   case 'renew':out=store.renew(b.id,b.device,b.token);break;
   case 'release':out=store.release(b.id,b.device,b.token);break;
   case 'action':{
    const body=structuredClone(b);if(body.action?.type==='profile')body.action.profile=readCharacterCard(req.user.directories,body.action.avatar,body.action.member);
    out=store.action(body);break;
   }
   case 'snapshot':out=store.manual(b);break;
   case 'snapshots':out={snapshots:store.snapshots(b.id)};break;
   case 'snapshot-read':out=store.snapshot(b.id,b.snapshot);break;
   case 'fork':out=store.fork(b);break;
   case 'trash':out=store.trash(b);break;
   case 'export':out={backup:store.export(b.id)};break;
   case 'import':out=store.import(b);break;
   default:throw new ShopError('route','不支持的存档操作。',404);
   }
   res.json({ok:true,...out});
  }catch(e){const known=e.shopCode;res.status(known?(e.status||400):503).json({code:known||'storage',error:known?e.message:'服务器未能完成存档操作。请保留页面，重试前先刷新确认进度。'});}
 });
 timer=setInterval(()=>{for(const s of stores.values())try{s.backup();}catch{s.backupError=true;}},60000);timer.unref?.();
 console.info('[MochiShop] cloud save routes ready (schema 1; rules 1; member selection v68).');
}
export async function exit(){if(timer)clearInterval(timer);timer=null;for(const s of stores.values())try{s.backup(true);}catch{}finally{try{s.close();}catch{}}stores.clear();}
