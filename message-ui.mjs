const ART='attachment-art-20261030/mochi-phone-attachments-20261030-v182.webp';
const HOST='https://preview.taliatang1.xyz/assets/mochi-phone-attachments-20261030-v182.webp';
const paths={gift:'<rect x="6" y="5" width="20" height="23" rx="4"/><path d="m7 10 9 7 9-7M14 19h4m-2-2v5"/>',image:'<rect x="4" y="5" width="24" height="22" rx="4"/><circle cx="21" cy="12" r="2"/><path d="m5 23 8-9 7 8 3-4 5 5"/>',location:'<path d="M16 29S6 18 6 12a10 10 0 0 1 20 0c0 6-10 17-10 17Z"/><circle cx="16" cy="12" r="3"/>',sticker:'<path d="M26 20a12 12 0 1 0-6 6l7-7-7 1v6"/><path d="M11 12h.1M21 12h.1M11 18q5 5 10 0"/>'};
export const MESSAGE_UI_CSS=`
#rp-phone #rp-screen .rp-attach-row{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:3px;padding:4px 8px;}
#rp-phone #rp-screen .rp-attach-item{appearance:none;box-sizing:border-box;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;min-width:0;width:100%;min-height:60px;padding:6px 2px;border:0;border-radius:10px;background:transparent;color:var(--rp-v-text,#51434c);font-family:inherit;font-size:10px;line-height:1.4;font-weight:500;box-shadow:none;cursor:pointer;}
#rp-phone #rp-screen .rp-attach-ico{width:32px;height:32px;min-width:32px;border-radius:9px;background:transparent;position:relative;display:block;overflow:hidden;}
#rp-phone #rp-screen .rp-message-card-icon{width:32px;height:32px;position:relative;flex-shrink:0;}
#rp-phone #rp-screen .rp-attachment-art{position:absolute;inset:0;display:block;overflow:hidden;}
#rp-phone #rp-screen .rp-attachment-art>img{display:none;position:absolute;top:0;height:100%;width:400%;max-width:none;object-fit:fill;left:calc(var(--rp-attachment-cell)*-100%);}
#rp-phone #rp-screen .rp-attachment-art>svg{position:absolute;inset:3px;width:26px;height:26px;fill:none;stroke:var(--rp-v-accent,#99677d);stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round;}
#rp-phone #rp-screen .rp-attachment-art[data-ready]>img{display:block;}
#rp-phone #rp-screen .rp-attachment-art[data-ready]>svg{display:none;}
#rp-phone #rp-screen #rp-host-outbox{display:flex;align-items:center;gap:8px;box-sizing:border-box;margin:5px 12px;padding:7px 9px;border:1px solid var(--rp-v-border,#e3d8df);border-radius:10px;background:var(--rp-v-card,#f4eef1);color:var(--rp-v-text,#51434c);font-family:inherit;flex-shrink:0;}
#rp-phone #rp-screen .rp-outbox-copy{flex:1;min-width:0;}
#rp-phone #rp-screen .rp-outbox-title{display:block;font-size:10px;line-height:1.5;font-weight:600;}
#rp-phone #rp-screen .rp-outbox-note{display:block;font-size:10px;line-height:1.5;color:var(--rp-v-muted,#81737c);overflow-wrap:anywhere;}
#rp-phone #rp-screen .rp-outbox-retry{appearance:none;box-sizing:border-box;flex:0 0 auto;min-width:44px;min-height:27px;width:auto;height:auto;padding:4px 7px;border:1px solid var(--rp-v-border,#d8c9d2);border-radius:8px;background:transparent;color:var(--rp-nav-btn,#96677c);font-family:inherit;font-size:10px;line-height:1.3;font-weight:500;box-shadow:none;cursor:pointer;}
#rp-phone #rp-screen .rp-outbox-retry:disabled{opacity:.5;cursor:default;}
`;
export function createMessageUI({document:doc,runtime,baseURI}){
 let installed=false;
 const names=['gift','image','location','sticker'];
 function icon(name){const n=Math.max(0,names.indexOf(name));return '<span class="rp-attachment-art" style="--rp-attachment-cell:'+n+'"><svg viewBox="0 0 32 32" aria-hidden="true">'+paths[names[n]]+'</svg><img data-rp-attachment-art data-local="'+new URL('scripts/extensions/third-party/mochi-phone/'+ART,baseURI()).href+'" src="'+HOST+'" alt="" aria-hidden="true"></span>';}
 function install(){if(installed)return;installed=true;const style=doc.createElement('style');style.id='rp-message-ui-css';style.textContent=MESSAGE_UI_CSS;doc.head.append(style);const rt=runtime();rt.own(()=>style.remove());rt.listenDOM(doc.getElementById('rp-phone'),'load',event=>{const img=event.target;if(img.matches?.('[data-rp-attachment-art]')&&img.naturalWidth)img.parentElement.setAttribute('data-ready','');},true);rt.listenDOM(doc.getElementById('rp-phone'),'error',event=>{const img=event.target;if(!img.matches?.('[data-rp-attachment-art]'))return;img.parentElement.removeAttribute('data-ready');if(!img.dataset.retried){img.dataset.retried='1';img.src=img.dataset.local;}},true);}
 function attachments(row){install();[...row.querySelectorAll('.rp-attach-ico')].forEach((el,i)=>{el.innerHTML=icon(names[i]);const img=el.querySelector('img');if(img.complete&&img.naturalWidth)img.parentElement.setAttribute('data-ready','');});}
 function outbox(count,{note='内容已保留，核对后可重试',busy=false,retry}={}){install();const box=doc.createElement('div');box.id='rp-host-outbox';box.setAttribute('role','status');const copy=doc.createElement('div');copy.className='rp-outbox-copy';const title=doc.createElement('span');title.className='rp-outbox-title';title.textContent=busy?'正在确认发送…':'待确认 · '+count+' 项';const detail=doc.createElement('span');detail.className='rp-outbox-note';detail.textContent=note;copy.append(title,detail);const button=doc.createElement('button');button.type='button';button.className='rp-outbox-retry';button.textContent=busy?'确认中':'重试';button.disabled=busy;button.onclick=retry;box.append(copy,button);return box;}
 return{install,attachments,icon,outbox};
}
