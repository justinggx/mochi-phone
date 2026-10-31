import {THEME_FIELDS,THEME_GROUPS,THEME_GROUP_NAMES,THEME_BASES,themePreset,normalizeThemeDesign,cloneTheme,validThemeHex,compileThemeDesign,THEME_CONTRACT_CSS,LEGACY_THEME_NIGHT_CSS,needsLegacyNight,checkThemeContrast,fixThemeContrast,themePrompt,parseThemeSuggestions,exportThemeScheme,parseThemeScheme} from './theme-design.mjs?v=20261030-theme-result-shape-188';

const parse=(text,fallback)=>{try{return JSON.parse(text)||fallback;}catch{return fallback;}};
const array=text=>{const value=parse(text,[]);return Array.isArray(value)?value:[];};
const esc=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const groupLabels={colors:'配色',shape:'风格',assets:'图标与壁纸',advanced:'高级CSS'};
const previewSheets=new WeakMap(),previewObservers=new WeakMap();
export const THEME_EDITOR_CSS=`
#rp-phone #rp-view-theme-studio #rp-ts-bubbles{padding:0;overflow:auto;min-height:0;}
#rp-phone .rp-theme-editor{padding:10px 12px 18px;font-size:12px;line-height:1.5;}
#rp-phone #rp-screen .rp-theme-editor{--rp-v-surface:#fcfaf8;--rp-v-card:#f2edf0;--rp-v-text:#403a40;--rp-v-muted:#706670;--rp-v-border:#d9cfd6;--rp-v-accent:#83566e;--rp-nav-btn:#83566e;color:var(--rp-v-text)!important;background:var(--rp-v-surface);}
#rp-phone.rp-dark #rp-screen .rp-theme-editor{--rp-v-surface:#24232a;--rp-v-card:#302e37;--rp-v-text:#eee8ed;--rp-v-muted:#c5b8c2;--rp-v-border:#5a4d58;--rp-v-accent:#d9b2c7;--rp-nav-btn:#986b83;}
#rp-phone .rp-theme-editor *{box-sizing:border-box;}
#rp-phone .rp-theme-editor [hidden]{display:none!important;}
#rp-phone .rp-theme-editor button{cursor:pointer;font:inherit;}
#rp-phone .rp-te-tabs{position:sticky;top:0;z-index:3;display:flex;gap:3px;padding:5px 0;background:var(--rp-v-surface,#fffaf8);}
#rp-phone .rp-te-tabs button{flex:1;border:0;border-radius:9px;background:transparent;color:inherit;min-height:32px;font-size:11px;padding:5px 2px;}
#rp-phone .rp-theme-editor [aria-selected="true"],#rp-phone .rp-theme-editor [aria-pressed="true"]{outline:1px solid var(--rp-v-accent,#95677e);background:var(--rp-v-card,#eee8eb);}
#rp-phone .rp-te-row{display:flex;align-items:center;gap:7px;margin:9px 0;flex-wrap:wrap;}
#rp-phone .rp-theme-editor :is(select,input[type="text"],textarea){min-width:0;border:1px solid var(--rp-v-border,#d9cdd4);border-radius:8px;padding:7px;background:var(--rp-v-card,#fff);color:inherit;font:inherit;}
#rp-phone .rp-te-row select{flex:1;max-width:100%;}
#rp-phone .rp-theme-editor .rp-te-help{margin:7px 0;color:var(--rp-v-muted,#786b74);font-size:11px;line-height:1.6;}
#rp-phone .rp-te-button{min-height:32px;border:1px solid var(--rp-v-border,#d9cdd4);border-radius:9px;padding:5px 9px;background:transparent;color:inherit;}
#rp-phone .rp-te-actions{position:sticky;bottom:-18px;z-index:4;display:flex;gap:7px;padding:10px 0 4px;background:var(--rp-v-surface,#fffaf8);}
#rp-phone .rp-te-actions button{flex:1;}
#rp-phone .rp-te-apply{background:var(--rp-nav-btn,#916179);color:#fff;border-color:transparent;}
#rp-phone .rp-te-preview{display:block;width:100%;height:190px;border:1px solid var(--rp-v-border,#d9cdd4);border-radius:18px;overflow:hidden;contain:layout style paint;}
#rp-phone .rp-te-field{display:grid;grid-template-columns:minmax(54px,1fr) 26px 70px 24px 24px;align-items:center;gap:4px;margin:10px 0;}
#rp-phone .rp-te-field input[type="color"]{width:26px;height:29px;padding:0;border:0;background:transparent;}
#rp-phone .rp-te-field input[type="text"]{width:70px;font-size:11px;padding:6px 4px;}
#rp-phone .rp-te-field button{height:28px;padding:0;border:0;border-radius:6px;background:transparent;color:inherit;}
#rp-phone .rp-te-field label{font-size:11px;}
#rp-phone .rp-te-field input[aria-invalid="true"]{outline:2px solid #b33d48;}
#rp-phone .rp-te-candidates{display:grid;gap:8px;margin-top:10px;}
#rp-phone .rp-te-candidate{display:flex;gap:9px;align-items:center;text-align:left;padding:8px;border:1px solid var(--rp-v-border,#d9cdd4);border-radius:12px;background:transparent;color:inherit;}
#rp-phone .rp-te-swatches{display:flex;gap:3px;}
#rp-phone .rp-te-swatches i{display:block;width:15px;height:24px;border-radius:5px;}
#rp-phone .rp-te-legacy{width:100%;min-height:150px;resize:vertical;font:11px/1.5 ui-monospace,monospace!important;}
#rp-phone .rp-te-shape-row{display:grid;grid-template-columns:64px 1fr 30px;gap:8px;align-items:center;margin:10px 0;}
#rp-phone .rp-te-file{display:none;}
#rp-phone .rp-te-palette{display:flex;gap:7px;flex-wrap:wrap;}
#rp-phone .rp-te-palette button{width:32px;height:32px;border:2px solid #fff8;border-radius:50%;}
#rp-phone .rp-te-note{white-space:pre-wrap;font-size:11px;color:var(--rp-v-muted,#786b74);}
#rp-phone .rp-saved-card-preview.rp-te-thumbnail{height:104px;overflow:hidden;}
#rp-phone #rp-view-themes .rp-saved-card-actions{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:4px;}
#rp-phone #rp-view-themes .rp-saved-card-act-btn:is([data-te-copy],[data-te-export]){background:var(--rp-tc-bg,rgba(150,120,140,.08))!important;color:var(--rp-nav-btn,#95677d)!important;border:1px solid rgba(150,120,140,.2)!important;}
#rp-phone #rp-view-themes .rp-te-library-tools{display:flex;align-items:center;justify-content:center;gap:6px;margin:8px 0 12px;flex-wrap:wrap;}
#rp-phone #rp-view-themes .rp-te-library-tools .rp-te-button{appearance:none;box-sizing:border-box;display:inline-flex;align-items:center;justify-content:center;flex:0 1 auto;width:auto;min-width:0;max-width:100%;height:auto;min-height:28px;padding:5px 10px;border:1px solid rgba(150,120,140,.22);border-radius:9px;box-shadow:none;background:var(--rp-tc-bg,rgba(150,120,140,.06));color:var(--rp-nav-btn,#95677d);font-family:inherit;font-size:11px;font-weight:600;line-height:1.3;letter-spacing:0;white-space:nowrap;cursor:pointer;}
#rp-phone #rp-view-themes .rp-te-library-tools .rp-te-button:active{opacity:.72;}
#rp-phone #rp-screen #rp-view-theme-studio{--rp-v-surface:#fcfaf8;--rp-v-card:#f2edf0;--rp-v-text:#403a40;--rp-v-muted:#706670;--rp-v-border:#d9cfd6;--rp-v-accent:#83566e;background:var(--rp-v-surface)!important;color:var(--rp-v-text)!important;}
#rp-phone.rp-dark #rp-screen #rp-view-theme-studio{--rp-v-surface:#24232a;--rp-v-card:#302e37;--rp-v-text:#eee8ed;--rp-v-muted:#c5b8c2;--rp-v-border:#5a4d58;--rp-v-accent:#d9b2c7;}
#rp-phone #rp-screen #rp-view-theme-studio #rp-ts-bubbles{display:block;flex:1;min-height:0;overflow:auto;padding:0!important;}
#rp-phone #rp-screen #rp-view-theme-studio .rp-ts-conversation{padding:15px 12px 11px;border-bottom:1px solid var(--rp-v-border);background:var(--rp-v-surface);}
#rp-phone #rp-screen #rp-view-theme-studio .rp-ts-conversation h2{font-family:inherit;font-size:15px;font-weight:600;line-height:1.45;margin:0 0 6px;color:var(--rp-v-text);}
#rp-phone #rp-screen #rp-view-theme-studio .rp-ts-intro{font-size:11px;line-height:1.65;color:var(--rp-v-muted);margin:0 0 11px;}
#rp-phone #rp-screen #rp-view-theme-studio #rp-ts-composer{display:block!important;padding:0!important;border:0!important;background:transparent!important;backdrop-filter:none!important;}
#rp-phone #rp-screen #rp-view-theme-studio #rp-ts-input{width:100%!important;min-height:80px!important;max-height:150px!important;padding:10px!important;border-radius:12px!important;font-size:12px!important;line-height:1.6!important;background:var(--rp-v-card)!important;color:var(--rp-v-text)!important;border:1px solid var(--rp-v-border)!important;}
#rp-phone #rp-screen #rp-view-theme-studio #rp-ts-input::placeholder{color:var(--rp-v-muted)!important;opacity:.85;}
#rp-phone #rp-screen #rp-view-theme-studio .rp-ts-compose-actions{display:flex;align-items:center;justify-content:space-between;gap:8px;margin:8px 0;}
#rp-phone #rp-screen #rp-view-theme-studio .rp-ts-compose-actions>span{font-size:10px;color:var(--rp-v-muted);}
#rp-phone #rp-screen #rp-view-theme-studio #rp-ts-send{width:auto!important;min-width:68px!important;height:30px!important;padding:0 11px!important;border-radius:10px!important;font-size:11px!important;line-height:1.3!important;background:var(--rp-v-accent)!important;color:#fff!important;}
#rp-phone #rp-screen #rp-view-theme-studio .rp-ts-examples{display:flex;flex-wrap:wrap;gap:5px;}
#rp-phone #rp-screen #rp-view-theme-studio .rp-ts-examples .rp-ts-tpl-btn{width:auto;min-height:25px;padding:4px 7px;border:1px solid var(--rp-v-border)!important;border-radius:8px;font-family:inherit;font-weight:500;font-size:10px;line-height:1.3;box-shadow:none!important;background:transparent!important;color:var(--rp-v-muted)!important;}
#rp-phone #rp-screen #rp-view-theme-studio #rp-ts-jump-preview{font-family:inherit;font-size:11px;line-height:1.3;min-height:28px;padding:5px 9px;border-radius:9px;color:var(--rp-v-accent);border:1px solid var(--rp-v-border);background:transparent;}
#rp-phone #rp-screen #rp-view-theme-studio #rp-ts-chat-status{font-size:11px;line-height:1.6;color:var(--rp-v-muted);margin:8px 0 0;white-space:pre-wrap;}
#rp-phone #rp-screen #rp-view-theme-studio #rp-ts-chat-status:empty{display:none;}
#rp-phone #rp-screen #rp-view-theme-studio #rp-ts-chat-log{max-height:156px;overflow:auto;display:flex;flex-direction:column;gap:7px;margin:10px 0;padding:3px 0;}
#rp-phone #rp-screen #rp-view-theme-studio #rp-ts-chat-log[hidden]{display:none;}
#rp-phone #rp-screen #rp-view-theme-studio .rp-ts-chat-message{max-width:92%;padding:7px 9px;border-radius:10px;background:var(--rp-v-card);color:var(--rp-v-text);font-size:11px;line-height:1.6;white-space:pre-wrap;overflow-wrap:anywhere;box-sizing:border-box;}
#rp-phone #rp-screen #rp-view-theme-studio .rp-ts-chat-message[data-role="user"]{align-self:flex-end;border:1px solid var(--rp-v-border);background:transparent;}
#rp-phone #rp-screen #rp-view-theme-studio .rp-ts-chat-message strong{display:block;font-size:10px;color:var(--rp-v-muted);margin-bottom:2px;}
#rp-phone #rp-screen #rp-view-theme-studio .rp-theme-editor{padding:12px;}
#rp-phone .rp-te-result-title{display:flex;align-items:center;justify-content:space-between;gap:8px;margin:0 0 8px;}
#rp-phone .rp-te-result-title strong{font-size:13px;}
#rp-phone .rp-te-result-title button{font-size:10px;padding:4px 7px;min-height:26px;}
#rp-phone .rp-te-preview{height:174px;}
#rp-phone .rp-te-manual{margin:12px 0;padding:9px;border:1px solid var(--rp-v-border);border-radius:12px;}
#rp-phone .rp-te-manual>summary{cursor:pointer;font-size:12px;font-weight:600;line-height:1.5;}
#rp-phone .rp-te-manual>summary span{display:block;font-size:10px;font-weight:400;color:var(--rp-v-muted);margin:3px 0 0 13px;}
#rp-phone .rp-te-manual .rp-te-tabs{position:static;margin-top:7px;}
#rp-phone .rp-te-manual .rp-te-tabs button{min-width:0;font-size:10px;}
#rp-phone .rp-te-manual .rp-te-row label{font-size:11px;}
#rp-phone .rp-te-manual .rp-te-field{grid-template-columns:minmax(40px,1fr) 24px 60px 22px 22px;gap:3px;}
#rp-phone .rp-te-manual .rp-te-field input[type="text"]{width:100%;min-width:0;}
#rp-phone .rp-te-manual .rp-te-field input[type="color"]{width:24px;}
#rp-phone .rp-te-manual .rp-te-field label{font-size:10px;}
#rp-phone .rp-te-manual .rp-te-shape-row button{min-height:28px;padding:3px;}
#rp-phone .rp-te-alternatives{margin:9px 0;font-size:11px;color:var(--rp-v-muted);}
#rp-phone .rp-te-alternatives summary{cursor:pointer;}
#rp-phone .rp-te-actions{position:static;padding:3px 0;}
#rp-phone #rp-screen #rp-view-theme-studio .rp-ts-history{margin:0 12px 18px;border-top:1px solid var(--rp-v-border);padding-top:10px;font-size:11px;color:var(--rp-v-muted);}
#rp-phone #rp-screen #rp-view-theme-studio .rp-ts-history summary{cursor:pointer;}
#rp-phone #rp-screen #rp-view-theme-studio #rp-ts-action-bar{gap:7px!important;padding:9px 0 0!important;}
#rp-phone #rp-screen #rp-view-theme-studio .rp-ts-action-btn{min-height:29px!important;padding:5px 8px!important;font-size:11px!important;line-height:1.3!important;border-radius:9px!important;box-shadow:none!important;}
#rp-phone #rp-screen #rp-view-theme-studio #rp-ts-tip{font-size:10px!important;line-height:1.5;padding:7px 0 0!important;text-align:left;animation:none;text-shadow:none!important;color:var(--rp-v-muted)!important;background:transparent!important;}

#rp-phone #rp-screen #rp-view-theme-studio{position:absolute!important;inset:0!important;flex-direction:column!important;min-height:0;overflow:hidden;}
#rp-phone #rp-screen #rp-view-theme-studio #rp-ts-composer{flex:0 0 auto!important;margin:0!important;padding:8px 12px 5px!important;border-top:1px solid var(--rp-v-border)!important;background:var(--rp-v-surface)!important;}
#rp-phone #rp-screen #rp-view-theme-studio #rp-ts-input{min-height:48px!important;max-height:92px!important;height:auto;font-size:12px!important;line-height:1.5!important;}
#rp-phone #rp-screen #rp-view-theme-studio #rp-ts-chat-status{flex:0 0 auto;min-height:0;max-height:42px;overflow:auto;margin:0;padding:0 12px 5px;font-size:10px;line-height:1.4;color:var(--rp-v-muted);background:var(--rp-v-surface);}
#rp-phone #rp-screen #rp-view-theme-studio #rp-ts-chat-status:empty{display:none;}
#rp-phone #rp-screen #rp-view-theme-studio .rp-ts-conversation{padding:12px 12px 0;}
#rp-phone #rp-screen #rp-view-theme-studio #rp-ts-chat-log{max-height:none;overflow:visible;}
#rp-phone #rp-screen #rp-view-theme-studio #rp-ts-bubbles{position:static!important;flex:1 1 0!important;min-height:0!important;}
#rp-phone #rp-screen #rp-view-theme-studio .rp-theme-editor{position:static!important;}
#rp-phone #rp-screen #rp-view-theme-studio .rp-te-manual{position:absolute!important;inset:0!important;top:56px!important;z-index:50;overflow:auto!important;overscroll-behavior:contain;margin:0!important;padding:0 12px!important;border:0!important;border-radius:0!important;background:var(--rp-v-surface)!important;}
#rp-phone #rp-screen #rp-view-theme-studio .rp-te-manual[hidden]{display:none!important;}
#rp-phone #rp-screen #rp-view-theme-studio .rp-te-manual-head{display:flex;align-items:center;gap:10px;position:sticky;top:0;z-index:2;min-height:44px;padding:6px 0;background:var(--rp-v-surface);border-bottom:1px solid var(--rp-v-border);}
#rp-phone #rp-screen #rp-view-theme-studio .rp-te-manual-head strong{font-size:14px;}
#rp-phone #rp-screen #rp-view-theme-studio .rp-te-manual-done{position:sticky;bottom:0;padding:10px 0;background:var(--rp-v-surface);}
#rp-phone #rp-screen #rp-view-theme-studio .rp-te-manual-done button{width:100%;}
#rp-phone #rp-screen #rp-view-theme-studio .rp-te-manual .rp-te-tabs{position:sticky;top:45px;z-index:1;background:var(--rp-v-surface);}

#rp-phone #rp-screen #rp-view-theme-studio.rp-te-adjusting :is(.rp-ts-conversation,.rp-ts-history,.rp-te-result,.rp-te-actions,#rp-ts-composer,#rp-ts-chat-status),#rp-phone #rp-screen #rp-view-theme-studio.rp-te-adjusting>.rp-nav-bar{display:none!important;}
#rp-phone .rp-te-color-warning{font-size:10px;line-height:1.5;margin-top:8px;padding-left:8px;border-left:2px solid var(--rp-v-accent);}
#rp-phone .rp-te-color-warning[hidden]{display:none!important;}
#rp-phone .rp-te-color-warning p{margin:0 0 4px;}
#rp-phone .rp-te-color-warning ul{margin:4px 0;padding-left:16px;}
#rp-phone #rp-screen #rp-view-theme-studio .rp-te-preview-controls{display:flex;align-items:center;gap:7px;margin:9px 0;}
#rp-phone #rp-screen #rp-view-theme-studio .rp-te-preview-views{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));flex:1;min-width:0;gap:3px;padding:3px;border:1px solid var(--rp-v-border);border-radius:11px;background:var(--rp-v-card);}
#rp-phone #rp-screen #rp-view-theme-studio .rp-te-preview-views button{appearance:none;min-width:0;min-height:30px;padding:4px 2px;border:0;border-radius:8px;background:transparent;color:var(--rp-v-text);font-family:inherit;font-size:11px;line-height:1.4;cursor:pointer;}
#rp-phone #rp-screen #rp-view-theme-studio .rp-te-preview-views button[aria-pressed=true]{background:var(--rp-v-surface);font-weight:600;}
#rp-phone #rp-screen #rp-view-theme-studio #rp-ts-chat-sheet{position:relative;display:flex;flex-direction:column;flex:0 0 auto;min-height:0;max-height:calc(100% - 56px);z-index:10;box-sizing:border-box;border-top:1px solid var(--rp-v-border);border-radius:15px 15px 0 0;background:var(--rp-v-surface);color:var(--rp-v-text);overflow:hidden;}
#rp-phone #rp-screen #rp-view-theme-studio.rp-ts-chat-open #rp-ts-chat-sheet{position:absolute;inset:auto 0 0;height:84%;z-index:60;box-shadow:0 -5px 18px rgba(0,0,0,.08);}
#rp-phone #rp-screen #rp-view-theme-studio.rp-ts-chat-open #rp-ts-bubbles{pointer-events:none;}
#rp-phone #rp-screen #rp-view-theme-studio #rp-ts-sheet-toggle{appearance:none;display:flex;align-items:center;justify-content:center;gap:7px;flex:0 0 auto;width:100%;min-height:30px;margin:0;padding:3px 12px;border:0;border-radius:0;background:transparent;color:var(--rp-v-muted);font:inherit;cursor:pointer;touch-action:none;}
#rp-phone #rp-screen #rp-view-theme-studio #rp-ts-sheet-toggle:focus-visible{outline:2px solid var(--rp-v-accent);outline-offset:-3px;}
#rp-phone #rp-screen #rp-view-theme-studio .rp-ts-sheet-grip{width:28px;height:3px;border-radius:3px;background:var(--rp-v-border);}
#rp-phone #rp-screen #rp-view-theme-studio .rp-ts-sheet-arrow{display:block;width:18px;height:18px;flex:0 0 auto;transform:rotate(0deg);transition:transform 180ms ease;}
#rp-phone #rp-screen #rp-view-theme-studio.rp-ts-chat-open .rp-ts-sheet-arrow{transform:rotate(180deg);}
#rp-phone #rp-screen #rp-view-theme-studio.rp-ts-sheet-moving #rp-ts-chat-sheet{position:absolute;left:0;right:0;bottom:0;z-index:60;contain:layout paint;will-change:height;}
@media(prefers-reduced-motion:reduce){#rp-phone #rp-screen #rp-view-theme-studio .rp-ts-sheet-arrow{transition:none;}}
#rp-phone #rp-screen #rp-view-theme-studio #rp-ts-chat-content{display:block;flex:1 1 0;min-height:0;overflow:auto;overscroll-behavior:contain;}
#rp-phone #rp-screen #rp-view-theme-studio #rp-ts-chat-content[hidden]{display:none!important;}
#rp-phone #rp-screen #rp-view-theme-studio #rp-ts-chat-content .rp-ts-conversation{padding:6px 12px 12px;}
#rp-phone #rp-screen #rp-view-theme-studio #rp-ts-chat-sheet #rp-ts-composer{border-top:0!important;min-height:0;}
#rp-phone #rp-screen #rp-view-theme-studio.rp-ts-chat-open #rp-ts-input{min-height:64px!important;max-height:112px!important;}
#rp-phone #rp-screen #rp-view-theme-studio.rp-te-adjusting #rp-ts-chat-sheet{display:none!important;}

`;

// A single shared stylesheet is adopted by previews when supported. It never
// modifies the live phone, and no preview uses srcdoc, scripts or host content.
export function makeThemePreview(doc,host,{css='',baseCss='',design=null,mode='day',view='chat',wallpaper=null,icons=[]}={}) {
  const shadow=host.shadowRoot||host.attachShadow({mode:'open'});
  const base=baseCss+'\n'+THEME_CONTRACT_CSS+'\n'+LEGACY_THEME_NIGHT_CSS;
  let shared=previewSheets.get(doc);
  if(!shared||shared.text!==base){shared={text:base,sheet:null};try{if('adoptedStyleSheets'in shadow&&doc.defaultView.CSSStyleSheet?.prototype.replaceSync){shared.sheet=new doc.defaultView.CSSStyleSheet();shared.sheet.replaceSync(base);}}catch{shared.sheet=null;}previewSheets.set(doc,shared);}
  if(shared.sheet){shadow.adoptedStyleSheets=[shared.sheet];shadow.querySelector('style[data-rp-preview-base]')?.remove();}
  else{let node=shadow.querySelector('style[data-rp-preview-base]');if(!node){node=doc.createElement('style');node.dataset.rpPreviewBase='';shadow.append(node);}if(node.textContent!==base)node.textContent=base;}
  shadow.querySelector('#rp-wrapper')?.remove();shadow.querySelector('style[data-rp-preview-current]')?.remove();
  const style=doc.createElement('style');style.dataset.rpPreviewCurrent='';style.textContent=css+`\n:host{display:block;overflow:hidden;}#rp-wrapper{position:relative!important;inset:auto!important;transform:none!important;width:100%!important;height:100%!important;min-width:0!important;display:block!important;pointer-events:none;}#rp-wrapper #rp-phone#rp-phone#rp-phone{position:relative!important;inset:auto!important;transform:none!important;width:100%!important;height:100%!important;min-width:0!important;display:block!important;margin:0!important;box-shadow:none!important;}#rp-wrapper #rp-phone#rp-phone#rp-phone #rp-screen{position:relative!important;width:100%!important;height:100%!important;border-radius:0!important;overflow:hidden!important;display:flex!important;flex-direction:column!important;}#rp-wrapper #rp-phone#rp-phone#rp-phone #rp-screen .rp-view{position:relative!important;inset:auto!important;display:flex!important;flex-direction:column!important;flex:1!important;min-height:0!important;overflow:hidden!important;}#rp-wrapper #rp-phone#rp-phone#rp-phone #rp-screen .rp-nav-bar{height:34px!important;max-height:34px!important;min-height:34px!important;display:flex!important;align-items:center!important;justify-content:center!important;padding:7px 12px!important;flex-shrink:0!important;}#rp-wrapper #rp-phone#rp-phone#rp-phone #rp-screen #rp-bubbles{padding:9px 12px!important;gap:5px!important;overflow:hidden!important;flex:1!important;}#rp-wrapper #rp-phone#rp-phone#rp-phone #rp-screen #rp-composer{padding:8px!important;flex-shrink:0!important;display:flex!important;gap:5px!important;}#rp-wrapper #rp-phone#rp-phone#rp-phone #rp-screen #rp-input{width:75%!important;min-height:29px!important;}#rp-wrapper #rp-phone#rp-phone#rp-phone #rp-screen #rp-send{width:29px!important;height:29px!important;}#rp-wrapper #rp-phone#rp-phone#rp-phone #rp-screen .rp-bubble{font-size:12px!important;max-width:85%!important;margin:4px 0!important;padding:8px 10px!important;}#rp-wrapper #rp-phone#rp-phone#rp-phone #rp-screen #rp-home-clock{position:relative!important;z-index:1!important;font-size:36px!important;margin:22px 0 4px!important;text-align:center!important;}#rp-wrapper #rp-phone#rp-phone#rp-phone #rp-screen #rp-app-grid{position:relative!important;display:grid!important;grid-template-columns:repeat(4,1fr)!important;gap:8px!important;padding:18px!important;}#rp-wrapper #rp-phone#rp-phone#rp-phone #rp-screen .rp-app-ico{width:40px!important;height:40px!important;border-radius:12px!important;margin:auto!important;}#rp-wrapper #rp-phone#rp-phone#rp-phone #rp-screen .rp-app-ico svg{width:32px!important;height:32px!important;}#rp-wrapper #rp-phone#rp-phone#rp-phone #rp-screen .rp-app-lbl{font-size:10px!important;text-align:center!important;}#rp-wrapper #rp-phone#rp-phone#rp-phone #rp-screen .rp-moment-card{margin:12px!important;padding:13px!important;border-radius:13px!important;font-size:12px!important;}#rp-wrapper #rp-phone#rp-phone#rp-phone #rp-screen .rp-moment-name{font-weight:700!important;}#rp-wrapper #rp-phone#rp-phone#rp-phone #rp-screen .rp-moment-time{font-size:10px!important;margin-top:12px!important;}`;
  style.textContent+='#rp-wrapper #rp-phone#rp-phone#rp-phone #rp-screen .rp-nav-title{position:static!important;inset:auto!important;transform:none!important;grid-column:1/-1!important;text-align:center!important;width:100%!important;font-size:13px!important;}#rp-wrapper #rp-phone#rp-phone#rp-phone #rp-screen #rp-composer{height:40px!important;min-height:40px!important;max-height:40px!important;box-sizing:border-box!important;padding:5px 8px!important;}';
  style.textContent+=`
#rp-wrapper,#rp-wrapper *{box-sizing:border-box!important;}
#rp-wrapper #rp-phone#rp-phone#rp-phone #rp-screen #rp-app-grid{width:100%!important;max-width:100%!important;min-width:0!important;grid-template-columns:repeat(4,minmax(0,1fr))!important;padding:12px!important;gap:6px!important;flex-shrink:0!important;}
#rp-wrapper #rp-phone#rp-phone#rp-phone #rp-screen .rp-app{width:auto!important;min-width:0!important;max-width:100%!important;overflow:hidden!important;}
#rp-wrapper #rp-phone#rp-phone#rp-phone #rp-screen .rp-app-ico{width:min(40px,100%)!important;height:auto!important;aspect-ratio:1!important;flex-shrink:0!important;}
#rp-wrapper #rp-phone#rp-phone#rp-phone #rp-screen .rp-app-lbl{width:100%!important;min-width:0!important;max-width:100%!important;white-space:nowrap!important;overflow:hidden!important;text-overflow:ellipsis!important;}
#rp-wrapper #rp-phone#rp-phone#rp-phone #rp-screen #rp-home-clock{font-size:32px!important;line-height:1.1!important;margin:15px 0 3px!important;flex-shrink:0!important;}
`;
  shadow.append(style);const wrapper=doc.createElement('div');wrapper.id='rp-wrapper';wrapper.style.height='100%';
  const phone=doc.createElement('div');phone.id='rp-phone';phone.className='rp-theme-custom'+(mode==='night'?' rp-dark':'');if(!design&&needsLegacyNight(css))phone.dataset.rpThemeLegacyNight='';if(design){phone.dataset.rpThemeDesign='2';if(['candy','star','misty'].includes(design.icons)){phone.classList.add('rp-art-pack');phone.dataset.rpArtTheme=design.icons;}}wrapper.append(phone);const screen=doc.createElement('div');screen.id='rp-screen';phone.append(screen);
  const pane=doc.createElement('div');pane.className='rp-view';pane.id='rp-view-'+(view==='home'?'home':view==='moments'?'moments':'thread');
  if(view==='home'){
    pane.innerHTML='<div id="rp-home-clock">12:00</div><div style="text-align:center;color:var(--rp-app-lbl)">星期五 · 好好生活</div><div id="rp-app-grid"></div>';
    const names=['信息','朋友圈','设置','游戏'];for(let i=0;i<4;i++){const el=doc.createElement('div');el.className='rp-app';const icon=doc.createElement('div');icon.className='rp-app-ico';if(icons[i]){icon.className=icons[i].className;icon.style.cssText=icons[i].style.cssText;for(const child of icons[i].childNodes)icon.append(child.cloneNode(true));}else icon.textContent=['☏','◎','▤','◇'][i];const label=doc.createElement('div');label.className='rp-app-lbl';label.textContent=names[i];el.append(icon,label);pane.querySelector('#rp-app-grid').append(el);}
    const background=doc.createElement('div');background.className='rp-home-bg';background.style.cssText='position:absolute;inset:0;background:var(--rp-home-wall);z-index:0';if(wallpaper&&(!design||design.keepWallpaper)){background.style.backgroundImage='url('+JSON.stringify(wallpaper)+')';background.style.backgroundSize='cover';background.style.backgroundPosition='center';}pane.prepend(background);
  }else if(view==='moments')pane.innerHTML='<div class="rp-nav-bar"><span class="rp-nav-title">朋友圈</span></div><div class="rp-moment rp-moment-card"><div class="rp-moment-name">朋友</div><p class="rp-moment-text">阳光很好，想把这份轻松分享给你。</p><div class="rp-moment-time">刚刚 · 2人喜欢</div><div class="rp-moment-comment">我：晚点一起散步。</div></div>';
  else pane.innerHTML='<div class="rp-nav-bar"><span class="rp-nav-title">聊天预览</span></div><div id="rp-bubbles"><div class="rp-bubble rp-recv"><span class="rp-bubble-text">今天也想和你聊聊天。</span></div><div class="rp-bubble rp-sent" style="align-self:flex-end"><span class="rp-bubble-text">晚点一起散步吧。</span></div></div><div id="rp-composer"><input id="rp-input" placeholder="发送消息…" tabindex="-1"><button id="rp-send" tabindex="-1">↑</button></div>';
  screen.append(pane);shadow.append(wrapper);
  if(host.matches('.rp-te-thumbnail,.rp-theme-preview')){
    host.style.setProperty('display','block','important');
    wrapper.style.setProperty('flex','none','important');
    wrapper.style.setProperty('width','250px','important');wrapper.style.setProperty('height','240px','important');
    wrapper.style.setProperty('transform-origin','top left','important');
    const fit=()=>{if(!host.isConnected)return;const width=host.clientWidth||110;wrapper.style.setProperty('transform','scale('+(width/250)+')','important');};fit();
    // Cards can be mounted while their view is hidden. Refit after navigation.
    if(doc.defaultView.ResizeObserver){const observer=new doc.defaultView.ResizeObserver(()=>{if(!wrapper.isConnected){observer.disconnect();return;}fit();});observer.observe(host);previewObservers.get(host)?.disconnect();previewObservers.set(host,observer);}
  }return {shadow,phone};
}

export function createThemeStudio(api) {
  const doc=api.document,designKey='rp_theme_design_v2',legacyKey='rp_theme_legacy_css_v2',undoKey='rp_theme_undo_v2';
  let session=null,revision=0,installed=false;
  const readDesign=()=>normalizeThemeDesign(parse(api.read(designKey),null));
  const snapshot=()=>({theme:api.read('rp_theme')||'candy',css:api.read('rp_custom_css')||'',design:readDesign(),legacyCss:api.read(legacyKey),wallpaper:api.wallpaper()||null,darkMode:!!api.dark()});
  const signature=()=>JSON.stringify([api.account(),api.slot(),snapshot()]);
  function install(){if(installed)return;installed=true;for(const[id,css]of[['rp-theme-editor-css',THEME_EDITOR_CSS],['rp-theme-contract-css',THEME_CONTRACT_CSS+'\n'+LEGACY_THEME_NIGHT_CSS]]){const style=doc.createElement('style');style.id=id;style.textContent=css;doc.head.append(style);api.runtime().own(()=>style.remove());}api.runtime().own(()=>leave());}
  function invalidate(){revision++;if(session)session.selectionChanged=true;}
  function sync(){install();const phone=doc.getElementById('rp-phone');if(!phone)return;const custom=api.read('rp_theme')==='custom',design=readDesign();phone.classList.toggle('rp-theme-custom',custom);if(custom&&design)phone.dataset.rpThemeDesign='2';else delete phone.dataset.rpThemeDesign;if(custom&&!design&&needsLegacyNight(api.read('rp_custom_css')))phone.dataset.rpThemeLegacyNight='';else delete phone.dataset.rpThemeLegacyNight;}
  function undoList(){return array(api.read(undoKey)).filter(v=>v&&typeof v.css==='string'&&['candy','star','misty','custom'].includes(v.theme)).slice(-5);}
  function writeSnapshot(value){api.write('rp_custom_css',value.css);api.write(designKey,JSON.stringify(normalizeThemeDesign(value.design)));api.write(legacyKey,value.legacyCss??'');api.setWallpaper(value.wallpaper||null);if(typeof value.darkMode==='boolean')api.setDark(value.darkMode);api.apply(value.theme,{skipSave:true});api.save();api.refresh();}
  function commit(value){const previous=snapshot();if(previous.theme===value.theme&&previous.css===value.css&&JSON.stringify(previous.design)===JSON.stringify(normalizeThemeDesign(value.design))&&(previous.legacyCss||'')===(value.legacyCss||'')&&previous.wallpaper===value.wallpaper&&previous.darkMode===value.darkMode)return false;const undo=undoList();undo.push(previous);api.write(undoKey,JSON.stringify(undo.slice(-5)));writeSnapshot(value);return true;}
  function undo(){const list=undoList();if(list.length){const previous=list.pop();api.write(undoKey,JSON.stringify(list));writeSnapshot(previous);if(session?.valid())render();api.notify('已完整还原上一版主题和壁纸。');return true;}const legacy=array(api.read('rp_custom_css_history'));if(!legacy.length)return false;const previous=legacy.pop();if(typeof previous!=='string')return false;api.write('rp_custom_css_history',JSON.stringify(legacy));writeSnapshot({...snapshot(),theme:'custom',css:previous,design:null,legacyCss:previous});if(session?.valid())render();return true;}
  const canUndo=()=>undoList().length>0||array(api.read('rp_custom_css_history')).length>0;
  function applyLegacy(css){if(typeof css!=='string')return;commit({...snapshot(),theme:'custom',css,design:null,legacyCss:css});}
  function saved(){return array(api.read('rp_saved_themes'));}
  function persistLibrary(list){const raw=api.read('rp_saved_themes');if(raw&&!Array.isArray(parse(raw,null))){api.notify('方案库记录格式异常，原记录已保留，请先检查备份。');return false;}api.write('rp_saved_themes',JSON.stringify(list));api.save();api.refreshLibrary();return true;}
  function saveCopy(index){const list=saved(),current=snapshot(),src=Number.isInteger(index)?list[index]:{css:current.css,design:current.design,legacyCss:current.legacyCss};if(typeof src?.css!=='string'||!src.css.trim()){api.notify('先预览并应用一套主题，再另存。');return false;}const entry={...cloneTheme(src),label:(src.label?src.label+' 副本':'方案 '+(list.length+1)).slice(0,40),timeStr:new Date().toLocaleString('zh-CN',{month:'numeric',day:'numeric',hour:'2-digit',minute:'2-digit'})};list.push(entry);if(!persistLibrary(list))return false;api.notify('已另存为「'+entry.label+'」。');return entry;}
  function exportOne(index){const entry=saved()[index];if(typeof entry?.css!=='string')return;api.download(exportThemeScheme(entry),'MochiPhone-theme.json');}
  function importText(text){const entry=parseThemeScheme(text,api.sanitizeCSS),list=saved();entry.timeStr='导入';list.push(entry);if(!persistLibrary(list))throw new Error('方案库记录格式异常，原记录已保留。');return entry;}
  function thumbnail(host,scheme,mode='day'){
    const design=normalizeThemeDesign(scheme?.design);return makeThemePreview(doc,host,{css:scheme?.css||'',baseCss:api.baseCss(),design,mode,view:api.wallpaper()&&(!design||design.keepWallpaper)?'home':'chat',wallpaper:api.wallpaper(),icons:api.previewIcons?.(design?.icons)||[]});
  }
  function renderLibrary(){
    const section=doc.getElementById('rp-saved-section'),cards=doc.getElementById('rp-saved-cards');if(!section||!cards)return;section.style.display='block';cards.replaceChildren();
    let tools=section.querySelector('.rp-te-library-tools');if(!tools){tools=doc.createElement('div');tools.className='rp-te-library-tools';tools.innerHTML='<button class="rp-te-button" type="button" data-te-library="copy">另存当前副本</button><button class="rp-te-button" type="button" data-te-library="import">导入主题</button><input class="rp-te-file" type="file" accept="application/json,.json">';section.insertBefore(tools,cards);tools.querySelector('[data-te-library="copy"]').onclick=()=>saveCopy();tools.querySelector('[data-te-library="import"]').onclick=()=>tools.querySelector('input').click();}
    // Rebind to the current account/slot on every render, before opening a picker.
    tools.querySelector('input').onchange=async event=>{const file=event.target.files?.[0];event.target.value='';const ticket=signature(),task=api.runtime().task();if(!file)return;try{if(file.size>400000)throw new Error('请选择400KB以内的单主题JSON。');const text=await file.text();if(!task.valid()||ticket!==signature())return;importText(text);api.notify('主题已导入方案库，点击方案可先预览。');}catch(error){if(task.valid()&&ticket===signature())api.notify(error.message);}};
    const current=api.read('rp_custom_css')||'';saved().forEach((entry,index)=>{if(!entry||typeof entry.css!=='string')return;
      const card=doc.createElement('div');card.className='rp-saved-card'+(api.read('rp_theme')==='custom'&&entry.css===current?' rp-tc-active':'');card.dataset.idx=index;
      card.innerHTML='<div class="rp-saved-card-preview rp-te-thumbnail"></div><div class="rp-saved-card-info"><div class="rp-saved-card-name">'+esc(entry.label)+'</div><div class="rp-saved-card-time">'+esc(entry.timeStr||'')+'</div></div><div class="rp-saved-card-actions"><button class="rp-saved-card-act-btn rp-saved-card-rename-btn" data-idx="'+index+'">改名</button><button class="rp-saved-card-act-btn" data-te-copy="'+index+'">副本</button><button class="rp-saved-card-act-btn" data-te-export="'+index+'">导出</button><button class="rp-saved-card-act-btn rp-saved-card-delete-btn" data-idx="'+index+'">删除</button></div>';
      card.querySelector('[data-te-copy]').onclick=e=>{e.stopPropagation();saveCopy(index);};card.querySelector('[data-te-export]').onclick=e=>{e.stopPropagation();exportOne(index);};cards.append(card);thumbnail(card.firstChild,entry,api.dark()?'night':'day');
    });
  }
  function resetChatSheet(){
    const view=doc.getElementById('rp-view-theme-studio'),main=doc.getElementById('rp-ts-bubbles'),toggle=doc.getElementById('rp-ts-sheet-toggle'),content=doc.getElementById('rp-ts-chat-content');
    view?.classList.remove('rp-ts-chat-open','rp-ts-sheet-moving');if(main){main.inert=false;main.removeAttribute('inert');main.removeAttribute('aria-hidden');}
    if(content)content.hidden=true;if(toggle){toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','展开AI对话');}
  }
  function bindChatSheet(s,valid){
    const view=doc.getElementById('rp-view-theme-studio'),main=doc.getElementById('rp-ts-bubbles'),toggle=doc.getElementById('rp-ts-sheet-toggle'),content=doc.getElementById('rp-ts-chat-content');
    if(!view||!main||!toggle||!content)return()=>{};
    const sheet=doc.getElementById('rp-ts-chat-sheet');let drag=null,suppressUntil=0,motion=null;
    function stopMotion(){const old=motion;motion=null;if(old){old.onfinish=old.oncancel=null;old.cancel();}view.classList.remove('rp-ts-sheet-moving');}
    function settle(){stopMotion();content.hidden=!s.chatExpanded;}
    function expand(value,{animate=true}={}){
      if(!valid())return;const next=!!value;if(s.chatExpanded===next){if(!animate)settle();return;}
      const from=sheet?.offsetHeight||0;stopMotion();s.chatExpanded=next;
      view.classList.toggle('rp-ts-chat-open',next);content.hidden=!next;toggle.setAttribute('aria-expanded',String(next));toggle.setAttribute('aria-label',next?'收起AI对话':'展开AI对话');
      main.inert=next;main.toggleAttribute('inert',next);if(next)main.setAttribute('aria-hidden','true');else main.removeAttribute('aria-hidden');
      const to=sheet?.offsetHeight||0;
      if(!animate||!sheet?.animate||!from||!to||Math.abs(from-to)<1||doc.hidden||doc.defaultView.matchMedia?.('(prefers-reduced-motion: reduce)').matches)return;
      // Isolate the small sheet for a single native 220ms height animation;
      // neither the underlying preview nor the full phone reflows per frame.
      content.hidden=false;view.classList.add('rp-ts-sheet-moving');
      try{const job=sheet.animate([{height:from+'px'},{height:to+'px'}],{duration:220,easing:'cubic-bezier(.22,.61,.36,1)',fill:'both'});motion=job;
        job.onfinish=job.oncancel=()=>{if(motion!==job)return;settle();};
      }catch{settle();}
    }
    s.controller.signal.addEventListener('abort',stopMotion,{once:true});
    doc.defaultView.addEventListener('resize',settle,{signal:s.controller.signal});
    const listen=(type,fn,options={})=>toggle.addEventListener(type,fn,{...options,signal:s.controller.signal});
    const start=e=>{if(!valid()||(e.button!==undefined&&e.button!==0))return;drag={x:e.clientX,y:e.clientY,id:e.pointerId};try{if(e.pointerId!==undefined)toggle.setPointerCapture?.(e.pointerId);}catch{}};
    const end=e=>{const from=drag;drag=null;if(!from||!valid()||(from.id!==undefined&&e.pointerId!==from.id))return;const dx=e.clientX-from.x,dy=e.clientY-from.y;if(Math.abs(dy)>=30&&Math.abs(dy)>Math.abs(dx)*1.3){expand(dy<0);suppressUntil=Date.now()+450;e.preventDefault?.();}};
    listen('click',()=>{if(Date.now()>=suppressUntil)expand(!s.chatExpanded);});listen('pointerdown',start);listen('pointerup',end);listen('pointercancel',()=>{drag=null;});
    if(!doc.defaultView.PointerEvent){listen('touchstart',e=>{if(e.touches.length!==1){drag=null;return;}start(e.touches[0]);e.preventDefault();},{passive:false});listen('touchend',e=>{if(e.changedTouches.length)end({clientX:e.changedTouches[0].clientX,clientY:e.changedTouches[0].clientY,preventDefault:()=>e.preventDefault()});},{passive:false});listen('touchcancel',()=>{drag=null;});}
    expand(!s.hasResult,{animate:false});return expand;
  }

  function leave(){resetChatSheet();doc.getElementById('rp-view-theme-studio')?.classList.remove('rp-te-adjusting');if(session){session.controller.abort();session=null;api.setGenerating(false);}}
  function validateCss(css){if(typeof css!=='string'||css.length>160000)throw new Error('高级CSS请控制在160KB以内。');let depth=0,quote='',comment=false;for(let i=0;i<css.length;i++){const c=css[i],n=css[i+1];if(comment){if(c==='*'&&n==='/'){comment=false;i++;}continue;}if(quote){if(c==='\\'){i++;continue;}if(c===quote)quote='';continue;}if(c==='/'&&n==='*'){comment=true;i++;continue;}if(c==='"'||c==="'"){quote=c;continue;}if(c==='{')depth++;if(c==='}'&&--depth<0)throw new Error('CSS括号不完整。');}if(depth||quote||comment)throw new Error('CSS尚未完整，请补齐后预览。');const safe=api.sanitizeCSS(css);if(css.trim()&&!safe.trim())throw new Error('CSS未通过安全检查。');return safe;}
  function currentDraft(source=snapshot()){
    const legacy=source.design?(source.legacyCss||''):source.css;
    return {design:source.design?cloneTheme(source.design):themePreset(),legacyCss:legacy,legacyOriginal:legacy,wallpaper:source.wallpaper,legacyOnly:!source.design&&!!source.css};
  }
  function scrollContentTo(element){const area=element?.closest('#rp-ts-chat-content')||doc.getElementById('rp-ts-bubbles');if(!area||!element)return;const top=area.scrollTop+element.getBoundingClientRect().top-area.getBoundingClientRect().top-10;if(area.scrollTo)area.scrollTo({top:Math.max(0,top),behavior:'smooth'});else area.scrollTop=Math.max(0,top);}
  function renderConversation(){const log=doc.getElementById('rp-ts-chat-log');if(!log)return;const messages=(api.history()||[]).slice(-8);log.replaceChildren();for(const message of messages){const bubble=doc.createElement('div');bubble.className='rp-ts-chat-message';bubble.dataset.role=message.role==='user'?'user':'ai';const label=doc.createElement('strong');label.textContent=message.role==='user'?'你':'AI';bubble.append(label,doc.createTextNode(String(message.text||'')));log.append(bubble);}log.hidden=!messages.length;log.scrollTop=log.scrollHeight;if(log.lastElementChild)scrollContentTo(log.lastElementChild);}
  function render(){
    install();leave();const parent=doc.getElementById('rp-ts-draft')||doc.getElementById('rp-ts-bubbles');if(!parent)return;
    const task=api.runtime().task(),root=doc.createElement('div');root.className='rp-theme-editor';const initial=snapshot();
    session={root,task,controller:new (doc.defaultView.AbortController)(),account:api.account(),slot:api.slot(),baseline:signature(),draft:currentDraft(initial),locks:{},mode:api.dark()?'night':'day',view:'home',tab:'colors',hasResult:!!initial.design||!!initial.css,group:'bubbles',candidates:[],busy:false,editRevision:0,legacyEnabled:!initial.design&&!!initial.css};const s=session;
    root.innerHTML=`<section class="rp-te-result" data-te-result><div class="rp-te-result-title"><strong>预览与确认</strong></div><section data-te-pane="preview"><div class="rp-te-preview-controls"><div class="rp-te-preview-views" role="group" aria-label="预览页面"><button type="button" data-te-preview-view="home" aria-pressed="true">主屏</button><button type="button" data-te-preview-view="chat" aria-pressed="false">聊天</button><button type="button" data-te-preview-view="moments" aria-pressed="false">朋友圈</button></div><button class="rp-te-button" type="button" data-te-show-colors>微调</button></div><div class="rp-te-preview" aria-label="主题效果预览"></div><p class="rp-te-help">修改只在预览中，确认后再应用。壁纸可在主屏预览查看。</p><details class="rp-te-alternatives" hidden><summary>其他配色方案</summary><div class="rp-te-candidates"></div></details></section></section>
<section class="rp-te-manual" aria-label="手动微调" hidden><div class="rp-te-manual-head"><button class="rp-te-button" type="button" data-te-return>‹ 返回</button><strong>手动微调</strong></div><div class="rp-te-tabs" role="tablist" aria-label="主题编辑分组">${Object.entries(groupLabels).map(([key,label])=>'<button type="button" role="tab" data-te-tab="'+key+'" aria-selected="'+(key==='colors')+'">'+label+'</button>').join('')}</div><div class="rp-te-row"><label>设计起点</label><select data-te-base aria-label="设计骨架">${Object.entries(THEME_BASES).map(([key,v])=>'<option value="'+key+'">'+v.name+'</option>').join('')}</select></div>
<label class="rp-te-row">编辑配色<select data-te-edit-mode aria-label="微调日夜配色"><option value="day">日间</option><option value="night">夜间</option></select></label><section data-te-pane="colors"><select data-te-group aria-label="配色分组">${Object.entries(THEME_GROUP_NAMES).map(([key,label])=>'<option value="'+key+'">'+label+'</option>').join('')}</select><p class="rp-te-help">可用取色器或HEX微调。锁住的项目不随AI修改，↺恢复当前起点的颜色。</p><div class="rp-te-fields"></div><div class="rp-te-color-warning" hidden></div></section>
<section data-te-pane="shape" hidden><div class="rp-te-shapes"></div><label class="rp-te-row">应用时显示<select data-te-apply-mode aria-label="应用时显示模式"><option value="keep">跟随当前手机模式</option><option value="day">日间</option><option value="night">夜间</option></select></label><p class="rp-te-help">字号沿用设置中的阅读大小。</p></section>
<section data-te-pane="assets" hidden><label>图标风格 <select data-te-icons><option value="line">简洁线条</option><option value="candy">糖果图标</option><option value="misty">雾蓝图标</option><option value="star">星夜图标</option></select></label><div class="rp-te-row"><label><input type="checkbox" data-te-keep-wallpaper>保留当前聊天壁纸</label></div><div class="rp-te-row"><button class="rp-te-button" type="button" data-te-wallpaper>选择壁纸</button><button class="rp-te-button" type="button" data-te-extract>从壁纸取色</button><button class="rp-te-button" type="button" data-te-remove-wallpaper>预览移除壁纸</button><input class="rp-te-file" type="file" accept="image/*" data-te-wall-file></div><div class="rp-te-palette"></div><p class="rp-te-help">图片在本浏览器取色，不传给AI。选择色块可设为当前模式的强调色。</p></section>
<section data-te-pane="advanced" hidden><label><input type="checkbox" data-te-legacy-only>仅使用原CSS（高级兼容）</label><p class="rp-te-help">旧CSS原文保留。取消或回到上一版可完整恢复。</p><textarea class="rp-te-legacy" spellcheck="false" aria-label="高级自定义CSS"></textarea><button class="rp-te-button" type="button" data-te-validate-css>检查CSS</button></section>
<div class="rp-te-row"><label>AI修改范围</label><select data-te-scope aria-label="AI修改范围"><option value="all">整套未锁定设计</option>${Object.entries(THEME_GROUP_NAMES).map(([k,v])=>'<option value="'+k+'">只改'+v+'</option>').join('')}</select></div><p class="rp-te-manual-status" role="status"></p><div class="rp-te-manual-done"><button class="rp-te-button rp-te-apply" type="button" data-te-return>完成微调，查看效果</button></div></section><p class="rp-te-note" role="status" aria-live="polite"></p><div class="rp-te-actions"><button class="rp-te-button" type="button" data-te-cancel>重置草稿</button><button class="rp-te-button rp-te-apply" type="button" data-te-apply>应用到小手机</button></div>`;
    parent.replaceChildren(root);const q=selector=>root.querySelector(selector);q('[data-te-base]').value=s.draft.design.base;q('[data-te-edit-mode]').value=s.mode;q('[data-te-group]').value=s.group;q('.rp-te-legacy').value=s.draft.legacyCss;q('[data-te-legacy-only]').checked=s.draft.legacyOnly;
    const valid=()=>session===s&&s.task.valid()&&!s.controller.signal.aborted&&api.account()===s.account&&api.slot()===s.slot&&root.isConnected;
    s.valid=valid;s.setChatExpanded=bindChatSheet(s,valid);s.status=text=>{q('.rp-te-note').textContent=text;q('.rp-te-manual-status').textContent=text;const status=doc.getElementById('rp-ts-chat-status');if(status)status.textContent=text;};s.q=q;q('.rp-te-note').hidden=!!doc.getElementById('rp-ts-chat-status');renderConversation();const jump=doc.getElementById('rp-ts-jump-preview');if(jump)jump.onclick=()=>{if(valid()){s.setChatExpanded(false);scrollContentTo(q('[data-te-result]'));}};
    function edit(){s.editRevision++;s.hasResult=true;s.draft.legacyOnly=false;q('[data-te-legacy-only]').checked=false;}
    function pane(tab){if(tab==='preview'){q('.rp-te-manual').hidden=true;doc.getElementById('rp-view-theme-studio')?.classList.remove('rp-te-adjusting');return;}s.setChatExpanded(false,{animate:false});s.tab=tab;q('.rp-te-manual').hidden=false;doc.getElementById('rp-view-theme-studio')?.classList.add('rp-te-adjusting');q('[data-te-return]').focus({preventScroll:true});root.querySelectorAll('[data-te-pane]').forEach(el=>{if(el.dataset.tePane!=='preview')el.hidden=el.dataset.tePane!==tab;});root.querySelectorAll('[data-te-tab]').forEach(el=>el.setAttribute('aria-selected',String(el.dataset.teTab===tab)));}
    function fields(){q('.rp-te-fields').innerHTML=THEME_GROUPS[s.group].map(field=>{const path=s.mode+'.'+field,color=s.draft.design[s.mode][field];return '<div class="rp-te-field"><label for="rp-te-'+field+'">'+THEME_FIELDS[field]+'</label><input type="color" data-te-color="'+field+'" value="'+color+'" aria-label="'+THEME_FIELDS[field]+'取色器"><input id="rp-te-'+field+'" type="text" data-te-hex="'+field+'" value="'+color+'" maxlength="7" aria-label="'+THEME_FIELDS[field]+'HEX"><button type="button" data-te-lock="'+path+'" aria-pressed="'+!!s.locks[path]+'" aria-label="锁定'+THEME_FIELDS[field]+'">'+(s.locks[path]?'🔒':'🔓')+'</button><button type="button" data-te-reset="'+field+'" aria-label="重置'+THEME_FIELDS[field]+'">↺</button></div>';}).join('');}
    const shapes={radius:{label:'圆角',values:[[8,'小'],[16,'适中'],[24,'圆润']]},spacing:{label:'留白',values:[['compact','紧凑'],['normal','标准'],['airy','宽松']]},shadow:{label:'阴影',values:[['none','无'],['soft','轻柔']]},border:{label:'边线',values:[['none','无'],['subtle','细线']]},opacity:{label:'气泡透明',values:[[100,'不透明'],[90,'90%'],[80,'80%']]},wallStyle:{label:'背景样式',values:[['solid','纯色'],['soft','柔和渐变']]}};
    function shapeFields(){q('.rp-te-shapes').innerHTML=Object.entries(shapes).map(([key,def])=>'<div class="rp-te-shape-row"><label>'+def.label+'</label><select data-te-shape="'+key+'">'+def.values.map(([v,label])=>'<option value="'+v+'"'+(s.draft.design.shape[key]===v?' selected':'')+'>'+label+'</option>').join('')+'</select><button class="rp-te-button" type="button" data-te-lock="shape.'+key+'" aria-pressed="'+!!s.locks['shape.'+key]+'" aria-label="锁定'+def.label+'">'+(s.locks['shape.'+key]?'🔒':'🔓')+'</button></div>').join('');}
    function cssForDraft(){const old=s.draft.legacyCss===s.draft.legacyOriginal?s.draft.legacyCss:validateCss(s.draft.legacyCss);return s.draft.legacyOnly?old:old+'\n'+compileThemeDesign(s.draft.design);}
    function refresh(){if(!valid())return;root.querySelectorAll('[data-te-preview-view]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.tePreviewView===s.view)));q('[data-te-result]').hidden=!s.hasResult;const jump=doc.getElementById('rp-ts-jump-preview');if(jump)jump.hidden=!s.hasResult;q('.rp-te-actions').hidden=!s.hasResult;const legacy=s.draft.legacyOnly;try{const design=legacy?null:s.draft.design;makeThemePreview(doc,q('.rp-te-preview'),{css:cssForDraft(),baseCss:api.baseCss(),design,mode:api.dark()?'night':'day',view:s.view,wallpaper:s.draft.wallpaper,icons:api.previewIcons?.(s.draft.design.icons)||[]});}catch(error){s.status(error.message);}
      q('[data-te-icons]').value=s.draft.design.icons;q('[data-te-keep-wallpaper]').checked=s.draft.design.keepWallpaper;
      const failures=legacy?[]:checkThemeContrast(s.draft.design).failures.filter(pair=>pair.mode===s.mode&&THEME_GROUPS[s.group].includes(pair.foreground));
      const warning=q('.rp-te-color-warning');warning.hidden=!failures.length;
      warning.innerHTML=failures.length?'<p>这些文字与背景较接近，可调整颜色：</p><ul>'+failures.map(pair=>'<li>'+THEME_FIELDS[pair.foreground]+' / '+THEME_FIELDS[pair.background]+'</li>').join('')+'</ul><button class="rp-te-button" type="button" data-te-fix>改善未锁定文字</button>':'';
    }
    s.refresh=refresh;s.fields=fields;s.shapes=shapeFields;s.pane=pane;s.css=cssForDraft;s.edit=edit;
    s.choose=index=>{
        const choice=s.candidates[index],incoming=normalizeThemeDesign(choice?.design);
        if(incoming){
          edit();const scope=choice.scope||'all',next=cloneTheme(s.draft.design),allowed=scope==='all'?Object.keys(THEME_FIELDS):(THEME_GROUPS[scope]||[]);
          for(const mode of ['day','night'])for(const field of allowed)if(!s.locks[mode+'.'+field])next[mode][field]=incoming[mode][field];
          if(scope==='all'){next.base=incoming.base;for(const key of Object.keys(incoming.shape))if(!s.locks['shape.'+key])next.shape[key]=incoming.shape[key];}
          s.draft.design=next;q('[data-te-base]').value=next.base;fields();shapeFields();pane('preview');refresh();s.status('已选择「'+choice.name+'」，保留当前锁定与范围之外的内容，确认预览后应用。');
        }
      s.selectedCandidate=index;root.querySelectorAll('[data-te-candidate]').forEach(button=>button.setAttribute('aria-pressed',String(Number(button.dataset.teCandidate)===index)));
    };
    root.addEventListener('click',event=>{const b=event.target.closest('button');if(!b||!valid())return;
      if(b.hasAttribute('data-te-return')){pane('preview');refresh();scrollContentTo(q('[data-te-result]'));q('[data-te-show-colors]').focus({preventScroll:true});}if(['home','chat','moments'].includes(b.dataset.tePreviewView)){s.view=b.dataset.tePreviewView;refresh();}if(b.dataset.teTab)pane(b.dataset.teTab);if(b.hasAttribute('data-te-show-colors'))pane('colors');
      if(b.dataset.teLock){s.locks[b.dataset.teLock]=!s.locks[b.dataset.teLock];s.editRevision++;fields();shapeFields();}
      if(b.dataset.teReset){edit();s.draft.design[s.mode][b.dataset.teReset]=themePreset(s.draft.design.base)[s.mode][b.dataset.teReset];fields();refresh();}
      if(b.hasAttribute('data-te-fix')){edit();s.draft.design=fixThemeContrast(s.draft.design,s.locks);fields();refresh();}
      if(b.hasAttribute('data-te-cancel')){leave();render();session?.status('已取消未应用的修改，当前主题保持。');}
      if(b.hasAttribute('data-te-apply'))applySession(s);
      if(b.dataset.teCandidate!==undefined)s.choose(Number(b.dataset.teCandidate));
      if(b.hasAttribute('data-te-wallpaper'))q('[data-te-wall-file]').click();
      if(b.hasAttribute('data-te-remove-wallpaper')){edit();const pending=s.pendingWallpaper;s.pendingWallpaper=null;pending?.cancel?.();q('[data-te-apply]').disabled=false;s.draft.wallpaper=null;refresh();s.status('已从预览移除壁纸，应用后才保存。');}
      if(b.hasAttribute('data-te-extract'))void extractWallpaper(s);
      if(b.dataset.teSample){edit();s.draft.design[s.mode].accent=b.dataset.teSample;fields();refresh();s.status('已将取样色设为强调色，可在配色页继续调整。');}
      if(b.hasAttribute('data-te-validate-css')){try{validateCss(q('.rp-te-legacy').value);s.status('CSS结构与安全检查通过，仍需预览可读性。');}catch(error){s.status(error.message);}}
    });
    root.addEventListener('change',event=>{if(!valid())return;const el=event.target;
      if(el.hasAttribute('data-te-apply-mode'))s.editRevision++;
      if(el.hasAttribute('data-te-edit-mode')){s.mode=el.value;q('[data-te-edit-mode]').value=s.mode;fields();refresh();}
      if(el.hasAttribute('data-te-scope'))s.editRevision++;
      if(el.hasAttribute('data-te-group')){s.group=el.value;fields();refresh();}
      if(el.hasAttribute('data-te-base')){edit();const preset=themePreset(el.value),old=s.draft.design;for(const mode of ['day','night'])for(const key of Object.keys(THEME_FIELDS))if(s.locks[mode+'.'+key])preset[mode][key]=old[mode][key];for(const key of Object.keys(old.shape))if(s.locks['shape.'+key])preset.shape[key]=old.shape[key];preset.icons=old.icons;preset.keepWallpaper=old.keepWallpaper;s.draft.design=preset;fields();shapeFields();refresh();}
      if(el.dataset.teShape){edit();s.draft.design.shape[el.dataset.teShape]=['radius','opacity'].includes(el.dataset.teShape)?Number(el.value):el.value;refresh();}
      if(el.hasAttribute('data-te-icons')){edit();s.draft.design.icons=el.value;refresh();}
      if(el.hasAttribute('data-te-keep-wallpaper')){edit();s.draft.design.keepWallpaper=el.checked;refresh();}
      if(el.hasAttribute('data-te-legacy-only')){s.editRevision++;s.draft.legacyOnly=el.checked;refresh();}
      if(el.hasAttribute('data-te-wall-file'))void readWallpaper(el.files?.[0],s).finally(()=>el.value='');
    });
    root.addEventListener('input',event=>{if(!valid())return;const el=event.target,field=el.dataset.teColor||el.dataset.teHex;if(field){const value=el.value;el.setAttribute('aria-invalid',String(!validThemeHex(value)));if(!validThemeHex(value))return;edit();s.draft.design[s.mode][field]=value.toLowerCase();const sibling=q(el.dataset.teHex?'[data-te-color="'+field+'"]':'[data-te-hex="'+field+'"]');sibling.value=value;sibling.removeAttribute('aria-invalid');refresh();}if(el.classList.contains('rp-te-legacy')){s.hasResult=true;s.editRevision++;s.draft.legacyCss=el.value;refresh();}});
    pane('preview');fields();shapeFields();refresh();const area=doc.getElementById('rp-ts-bubbles');if(area)area.scrollTop=0;api.updateActions();return s;
  }
  function applySession(s=session){if(!s?.valid())return false;if(s.pendingWallpaper){s.status('壁纸正在读取和处理，完成后再应用。');return false;}if(s.baseline!==signature()){s.status('当前主题或壁纸已改变，请重新打开工作室后应用，原主题保持。');return false;}if(s.root.querySelector('[aria-invalid="true"]')){s.status('请先修正HEX颜色。');return false;}
    try{const css=s.css();if(!css.trim())throw new Error('请填写有效样式或使用配色编辑器。');commit({theme:'custom',css,design:s.draft.legacyOnly?null:s.draft.design,legacyCss:s.draft.legacyCss,wallpaper:s.draft.wallpaper,darkMode:s.q('[data-te-apply-mode]').value==='keep'?!!api.dark():s.q('[data-te-apply-mode]').value==='night'});s.baseline=signature();s.selectionChanged=false;s.status('预览已应用。可另存副本，或完整回到上一版。');return true;}catch(error){s.status(error.message);return false;}
  }
  async function generate(description){const s=session||render();if(!s?.valid()||s.busy)return false;
    let request;try{request=themePrompt(s.draft.design,s.locks,s.q('[data-te-scope]').value,description,api.history());}catch(error){s.status(error.message);return false;}
    const startSignature=signature(),edit=s.editRevision,rev=revision,task=api.runtime().task();s.busy=true;s.status('正在按你的想法调整配色和样式…');api.setGenerating(true);api.addMessage('user',description.trim());renderConversation();
    try{const result=await api.call(request.prompt,request.maxTokens,request.system);if(!s.valid()||!task.valid())return false;if(startSignature!==signature()||rev!==revision||edit!==s.editRevision){s.status('生成期间有新的选择或编辑，旧结果未覆盖当前内容。');return false;}const choices=parseThemeSuggestions(result,s.draft.design,s.locks,s.q('[data-te-scope]').value);s.candidates=choices.map(choice=>({...choice,scope:s.q('[data-te-scope]').value}));s.q('.rp-te-candidates').innerHTML=choices.map((c,i)=>'<button class="rp-te-candidate" type="button" data-te-candidate="'+i+'"><span class="rp-te-swatches">'+[c.design.day.wall,c.design.day.sent,c.design.day.received,c.design.day.text].map(v=>'<i style="background:'+v+'"></i>').join('')+'</span><span>'+esc(c.name)+'<br><small>选择后预览</small></span></button>').join('');s.q('.rp-te-alternatives').hidden=choices.length<2;s.choose(0);const layoutNote=choices[0].layoutAdapted?'布局已适配为可用样式。':'';s.status('预览已更新，'+layoutNote+'确认应用后才替换当前主题。');api.addMessage('ai','已生成「'+choices[0].name+'」，配色和样式已填入预览。'+layoutNote+'你可以接着说想改哪里，或手动微调。');renderConversation();return true;
    }catch(error){if(s.valid()&&task.valid()){s.status(error.message||'生成未完成，原主题已保留。');api.addMessage('ai','生成未完成：'+(error.message||'请重试'));renderConversation();}return false;}finally{s.busy=false;if(session===s)api.setGenerating(false);}
  }
  function previewSaved(index){const entry=saved()[index];if(typeof entry?.css!=='string')return;api.navigate();const s=session||render();if(!s)return;s.draft=currentDraft({theme:'custom',css:entry.css,design:normalizeThemeDesign(entry.design),legacyCss:entry.legacyCss??null,wallpaper:api.wallpaper()});s.q('.rp-te-legacy').value=s.draft.legacyCss;s.q('[data-te-legacy-only]').checked=s.draft.legacyOnly;s.q('[data-te-base]').value=s.draft.design.base;s.editRevision++;s.hasResult=true;s.fields();s.shapes();s.setChatExpanded(false);s.pane('preview');s.refresh();scrollContentTo(s.q('[data-te-result]'));s.status('正在预览「'+entry.label+'」，应用后才替换当前主题。');}
  function decodeWallpaper(data,s){
    return new Promise((resolve,reject)=>{
      if(typeof data!=='string'||!data.startsWith('data:image/')){reject(new Error('壁纸图片数据无效。'));return;}
      const image=new (doc.defaultView.Image)();let settled=false;
      const finish=(fn,value)=>{if(settled)return;settled=true;clearTimeout(timer);s.controller.signal.removeEventListener('abort',cancel);image.onload=image.onerror=null;image.removeAttribute?.('src');fn(value);};
      const cancel=()=>finish(reject,new Error('操作已取消。'));
      const timer=setTimeout(()=>finish(reject,new Error('壁纸图片读取超时，请重试。')),15000);
      s.controller.signal.addEventListener('abort',cancel,{once:true});
      image.onload=()=>image.naturalWidth>0&&image.naturalHeight>0?finish(resolve,true):finish(reject,new Error('壁纸图片尺寸无效。'));
      image.onerror=()=>finish(reject,new Error('壁纸图片无法读取，原壁纸已保留。'));image.src=data;
      if(s.controller.signal.aborted)cancel();
    });
  }
  async function readWallpaper(file,s){
    if(!file||!s.valid())return;
    const previous=s.pendingWallpaper,ticket={cancel:null};s.pendingWallpaper=ticket;previous?.cancel?.();s.editRevision++;
    s.q('[data-te-apply]').disabled=true;s.status('正在读取和处理壁纸，完成后可应用。');
    try{
      if(!file.type.startsWith('image/')||file.size>16*1024*1024)throw new Error('请选择16MB以内的图片。');
      const data=await new Promise((resolve,reject)=>{
        const reader=new (doc.defaultView.FileReader)();let settled=false;
        const finish=(fn,value)=>{if(settled)return;settled=true;reader.onload=reader.onerror=null;s.controller.signal.removeEventListener('abort',cancel);ticket.cancel=null;fn(value);};
        const cancel=()=>{if(reader.readyState===1)reader.abort();finish(reject,new Error('操作已取消。'));};ticket.cancel=cancel;
        s.controller.signal.addEventListener('abort',cancel,{once:true});
        reader.onload=()=>finish(resolve,reader.result);reader.onerror=()=>finish(reject,new Error('壁纸无法读取。'));reader.readAsDataURL(file);
        if(s.controller.signal.aborted)cancel();
      });
      await decodeWallpaper(data,s);if(!s.valid()||s.pendingWallpaper!==ticket)return;
      const image=await api.prepareWallpaper(data);
      if(typeof image!=='string'||!image.startsWith('data:image/'))throw new Error('壁纸处理失败，原壁纸已保留。');
      if(!s.valid()||s.pendingWallpaper!==ticket)return;
      s.editRevision++;s.draft.wallpaper=image;s.draft.design.keepWallpaper=true;s.draft.legacyOnly=false;s.view='home';s.refresh();s.status('壁纸已进入预览，应用后才保存。');
    }catch(error){if(s.valid()&&s.pendingWallpaper===ticket)s.status(error.message);}
    finally{if(s.pendingWallpaper===ticket){s.pendingWallpaper=null;if(s.valid())s.q('[data-te-apply]').disabled=false;}}
  }
  async function extractWallpaper(s){if(!s.valid()||!s.draft.wallpaper){s.status('先选择一张壁纸，再本地取色。');return;}const sequence=s.editRevision;try{const palette=await new Promise((resolve,reject)=>{const image=new (doc.defaultView.Image)(),timer=setTimeout(()=>finish(reject,new Error('壁纸读取超时。')),8000);function finish(fn,value){clearTimeout(timer);s.controller.signal.removeEventListener('abort',cancel);image.onload=image.onerror=null;fn(value);}const cancel=()=>finish(reject,new Error('操作已取消。'));s.controller.signal.addEventListener('abort',cancel,{once:true});image.crossOrigin='anonymous';image.onerror=()=>finish(reject,new Error('图片不允许本地取色，请选择本地上传的图片。'));image.onload=()=>{try{const canvas=doc.createElement('canvas');canvas.width=canvas.height=32;const ctx=canvas.getContext('2d',{willReadFrequently:true});ctx.drawImage(image,0,0,32,32);const data=ctx.getImageData(0,0,32,32).data,bins=new Map();for(let i=0;i<data.length;i+=4){if(data[i+3]<200)continue;const values=[data[i],data[i+1],data[i+2]].map(v=>Math.min(255,Math.round(v/32)*32)),color='#'+values.map(v=>v.toString(16).padStart(2,'0')).join('');bins.set(color,(bins.get(color)||0)+1);}finish(resolve,[...bins.entries()].sort((a,b)=>b[1]-a[1]).slice(0,5).map(([color])=>color));}catch{finish(reject,new Error('图片取色受浏览器限制，原壁纸保持。'));}};image.src=s.draft.wallpaper;});if(!s.valid()||s.editRevision!==sequence)return;s.q('.rp-te-palette').innerHTML=palette.map(color=>'<button type="button" data-te-sample="'+color+'" style="background:'+color+'" aria-label="使用颜色'+color+'"></button>').join('');s.status('颜色只在本浏览器提取，未发送图片给AI。');}catch(error){if(s.valid())s.status(error.message);}}
  function iconPack(){return api.read('rp_theme')==='custom'?readDesign()?.icons||'line':null;}
  return {install,sync,invalidate,snapshot,readDesign,undo,canUndo,applyLegacy,saveCopy,exportOne,importText,renderLibrary,thumbnail,render,leave,generate,previewSaved,iconPack,applySession,get session(){return session;},validateCss};
}
