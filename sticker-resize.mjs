const MAX_DIMENSION=1024,MAX_BYTES=5*1024*1024,MAX_PIXELS=32000000;
export function stickerTargetSize(width,height,limit=MAX_DIMENSION){const ratio=Math.min(1,limit/width,limit/height);return{width:Math.max(1,Math.floor(width*ratio)),height:Math.max(1,Math.floor(height*ratio))};}
export function stickerIsAnimated(bytes,format){
 const v=new DataView(bytes.buffer,bytes.byteOffset,bytes.byteLength),text=(i,n)=>String.fromCharCode(...bytes.subarray(i,i+n));
 if(format==='gif')return true;
 if(format==='webp'){for(let i=12;i+8<=bytes.length;){const size=v.getUint32(i+4,true);if(i+8+size>bytes.length)throw Error('WebP图片数据不完整。');if(text(i,4)==='ANIM')return true;i+=8+size+(size%2);}return false;}
 if(format==='png'){for(let i=8;i+12<=bytes.length;){const size=v.getUint32(i);if(i+12+size>bytes.length)throw Error('PNG图片数据不完整。');if(text(i+4,4)==='acTL')return true;i+=12+size;}return false;}
 return false;
}
export async function resizeStickerBytes(bytes,info,env={}){
 const valid=env.valid||(()=>true),check=()=>{if(!valid())throw Error('账号或页面已改变，请重新选择图片。');};check();
 if(info.width<=MAX_DIMENSION&&info.height<=MAX_DIMENSION)return bytes;
 if(info.width*info.height>MAX_PIXELS)throw Error('原图像素过大，无法在当前设备安全压缩，请换一张较小的图片。');
 const win=env.window||globalThis,doc=env.document||win.document;
 const canvas=(w,h)=>{const c=env.canvas?env.canvas(w,h):doc.createElement('canvas');c.width=w;c.height=h;if(!c.getContext('2d'))throw Error('当前浏览器不能压缩图片，请换用支持Canvas的浏览器。');return c;};
 const load=env.loadImage||((data,type)=>new Promise((resolve,reject)=>{const url=win.URL.createObjectURL(new win.Blob([data],{type})),img=new win.Image();let settled=false;const finish=(error)=>{if(settled)return;settled=true;win.clearTimeout(timer);win.URL.revokeObjectURL(url);img.onload=img.onerror=null;error?reject(error):resolve(img);};const timer=win.setTimeout(()=>finish(Error('图片解码超时，请换一张。')),15000);img.onload=()=>finish();img.onerror=()=>finish(Error('图片不能正常解码，请换一张。'));img.src=url;}));
 const blobBytes=async c=>{const blob=await new Promise((resolve,reject)=>c.toBlob(b=>b?resolve(b):reject(Error('图片压缩失败，请重新选择。')),'image/png'));return new Uint8Array(await blob.arrayBuffer());};
 if(!stickerIsAnimated(bytes,info.format)){
  const image=await load(bytes,'image/'+(info.format==='jpg'?'jpeg':info.format));check();
  const w=image.naturalWidth||image.width,h=image.naturalHeight||image.height;if(!w||!h||w*h>MAX_PIXELS)throw Error('图片尺寸无效或过大。');
  const size=stickerTargetSize(w,h),c=canvas(size.width,size.height);const ctx=c.getContext('2d');ctx.imageSmoothingEnabled=true;ctx.imageSmoothingQuality='high';ctx.drawImage(image,0,0,size.width,size.height);
  try{const result=await blobBytes(c);check();if(result.length>MAX_BYTES)throw Error('压缩后图片仍超过5MB，请换一张。');return result;}finally{c.width=c.height=1;image.close?.();}
 }
 const {parseGIF,decompressFrame,GIFEncoder,quantize,applyPalette}=await import('./sticker-gif-codec.mjs?v=20261026-138');check();
 const size=stickerTargetSize(info.width,info.height),output=canvas(size.width,size.height),out=output.getContext('2d');out.imageSmoothingEnabled=true;out.imageSmoothingQuality='high';
 let source,decoder,gif,frames,repeat=-1;
 try{
  if(info.format==='gif'){
   gif=parseGIF(bytes.buffer.slice(bytes.byteOffset,bytes.byteOffset+bytes.byteLength));frames=gif.frames.filter(f=>f.image);if(!frames.length)throw Error('GIF没有有效画面。');
   for(const f of gif.frames){const app=f.application;if(app&&/^(?:NETSCAPE2\.0|ANIMEXTS1\.0)$/.test(app.id)&&app.blocks?.length>=3)repeat=app.blocks[1]|app.blocks[2]<<8;}
   source=canvas(info.width,info.height);
   for(const f of frames){const p=f.image.descriptor;if(!p.width||!p.height||p.left+p.width>info.width||p.top+p.height>info.height)throw Error('GIF画面尺寸无效。');}
  }else{
   const Decoder=env.ImageDecoder||win.ImageDecoder;if(!Decoder)throw Error('当前浏览器暂不支持这种动图压缩；已保留原图，不会转成静态图。');
   decoder=new Decoder({data:bytes.slice(),type:'image/'+info.format,preferAnimation:true});await decoder.tracks.ready;await decoder.completed;check();const track=decoder.tracks.selectedTrack;
   if(!track||!Number.isInteger(track.frameCount)||track.frameCount<1)throw Error('动图没有有效画面。');if(track.frameCount>180)throw Error('动图帧数过多，请选择较短的动图。');frames=Array.from({length:track.frameCount});repeat=track.repetitionCount===Infinity?0:track.repetitionCount||-1;
  }
  if(frames.length>180||frames.length*info.width*info.height>240000000||frames.length*size.width*size.height>64000000)throw Error('动图帧数或像素过多，当前设备无法安全压缩，请选择较短或较小的动图。');
  const encoded=GIFEncoder();let ctx=source?.getContext('2d'),previous=null,saved=null;
  const background=(x,y,w,h,transparent)=>{if(transparent)ctx.clearRect(x,y,w,h);else{const color=gif.gct?.[gif.lsd.backgroundColorIndex]||[0,0,0];ctx.fillStyle='rgb('+color.join(',')+')';ctx.fillRect(x,y,w,h);}};
  if(gif)background(0,0,info.width,info.height,!!frames[0].gce?.extras.transparentColorGiven);
  for(let index=0;index<frames.length;index++){
   check();let duration=100,frame;
   if(gif){
    if(previous?.disposalType===2)background(previous.dims.left,previous.dims.top,previous.dims.width,previous.dims.height,previous.transparentIndex!==undefined);
    else if(previous?.disposalType===3&&saved)ctx.putImageData(saved,0,0);
    const raw=frames[index],f=decompressFrame(raw,gif.gct,true);duration=raw.gce?raw.gce.delay*10:100;
    saved=f.disposalType===3?ctx.getImageData(0,0,info.width,info.height):null;
    const patch=canvas(f.dims.width,f.dims.height),patchCtx=patch.getContext('2d'),pixels=patchCtx.createImageData(f.dims.width,f.dims.height);pixels.data.set(f.patch);patchCtx.putImageData(pixels,0,0);ctx.drawImage(patch,f.dims.left,f.dims.top);patch.width=patch.height=1;previous=f;
   }else{frame=(await decoder.decode({frameIndex:index})).image;duration=(frame.duration??100000)/1000;}
   out.clearRect(0,0,size.width,size.height);out.drawImage(source||frame,0,0,size.width,size.height);frame?.close();
   const rgba=out.getImageData(0,0,size.width,size.height).data,palette=quantize(rgba,256,{format:'rgba4444',oneBitAlpha:true}),transparentIndex=palette.findIndex(c=>c[3]===0),indexed=applyPalette(rgba,palette,'rgba4444');
   encoded.writeFrame(indexed,size.width,size.height,{palette,delay:duration,repeat,dispose:2,transparent:transparentIndex>=0,transparentIndex:Math.max(0,transparentIndex)});
   if(encoded.bytesView().length>MAX_BYTES)throw Error('缩小后的动图仍超过5MB，请选择较短的动图。');
   await new Promise(resolve=>setTimeout(resolve,0));
  }
  encoded.finish();check();return encoded.bytes();
 }finally{decoder?.close();if(source)source.width=source.height=1;output.width=output.height=1;}
}