const cancelled = () => Object.assign(new Error('头像操作已取消'), { name: 'AbortError' });
const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
const finite = (value, fallback) => Number.isFinite(Number(value)) ? Number(value) : fallback;
export const AVATAR_EXTENSION_LINK = 'https://discord.com/channels/1134557553011998840/1215675312721887272';
function waitForEntry(promise, signal, timeout = 6000) {
  return new Promise((resolve, reject) => {
    let done = false;
    const finish = (fn, value) => { if (done) return; done = true; clearTimeout(timer); signal?.removeEventListener('abort', abort); fn(value); };
    const abort = () => finish(reject, cancelled());
    const timer = setTimeout(() => finish(reject, new Error('扩展检查超时，请重试')), timeout);
    signal?.addEventListener('abort', abort, { once: true });
    Promise.resolve(promise).then(value => finish(resolve, value), error => finish(reject, error));
    if (signal?.aborted) abort();
  });
}
const avatarBridgeReady = value => value?.capabilities?.avatar === 1 && typeof value.prepareAvatar === 'function' && typeof value.generateAvatar === 'function';
export function avatarCropRect(width, height, crop = {}) {
  if (!(width > 0 && height > 0) || !Number.isFinite(width + height)) throw new Error('图片尺寸无效');
  const zoom = clamp(finite(crop?.zoom, 1), 1, 4), size = Math.min(width, height) / zoom;
  const cx = clamp(finite(crop?.x, .5) * width, size / 2, width - size / 2);
  const cy = clamp(finite(crop?.y, .5) * height, size / 2, height - size / 2);
  return { x: cx - size / 2, y: cy - size / 2, size, zoom, centerX: cx / width, centerY: cy / height };
}
export function avatarCropView(width, height, crop = {}) {
  const rotation = ((Math.round(finite(crop.rotation, 0) / 90) % 4) + 4) % 4 * 90, mirror = crop.mirror === true;
  const orientedWidth = rotation % 180 ? height : width, orientedHeight = rotation % 180 ? width : height;
  let matrix = rotation === 90 ? [0, 1, -1, 0, height, 0] : rotation === 180 ? [-1, 0, 0, -1, width, height] : rotation === 270 ? [0, -1, 1, 0, 0, width] : [1, 0, 0, 1, 0, 0];
  if (mirror) matrix = [-matrix[0], matrix[1], -matrix[2], matrix[3], orientedWidth - matrix[4], matrix[5]];
  return { ...avatarCropRect(orientedWidth, orientedHeight, crop), width: orientedWidth, height: orientedHeight, rotation, mirror, matrix };
}
export function squareAvatar(src, { document: doc, signal, crop } = {}) {
  return new Promise((resolve, reject) => {
    if (typeof src !== 'string' || !/^(?:data:image\/|blob:|https?:\/\/|\/?(?:user\/)?images\/|\/)/i.test(src)) { reject(new Error('图片地址无效')); return; }
    const img = new doc.defaultView.Image(); let settled = false;
    const finish = (fn, value) => { if (settled) return; settled = true; clearTimeout(timer); signal?.removeEventListener('abort', abort); img.onload = img.onerror = null; fn(value); };
    const abort = () => finish(reject, cancelled());
    const timer = setTimeout(() => finish(reject, new Error('头像图片读取超时，请重试')), 45000);
    signal?.addEventListener('abort', abort, { once: true });
    if (signal?.aborted) { abort(); return; }
    img.crossOrigin = 'anonymous';
    img.onerror = () => finish(reject, new Error('图片无法读取，请重试或上传本地图片'));
    img.onload = () => {
      if (signal?.aborted) { abort(); return; }
      try {
        const w = img.naturalWidth || img.width, h = img.naturalHeight || img.height;
        if (!(w > 0 && h > 0) || w * h > 32000000) throw new Error('图片尺寸无效或过大');
        const canvas = doc.createElement('canvas'); canvas.width = canvas.height = 128;
        const ctx = canvas.getContext('2d'); if (!ctx) throw new Error('浏览器无法处理头像图片');
        const rect = avatarCropView(w, h, crop), scale = 128 / rect.size, [a, b, c, d, e, f] = rect.matrix;
        ctx.setTransform(a * scale, b * scale, c * scale, d * scale, (e - rect.x) * scale, (f - rect.y) * scale); ctx.drawImage(img, 0, 0);
        const data = canvas.toDataURL('image/png');
        if (!data.startsWith('data:image/') || data.length > 1000000) throw new Error('头像压缩失败');
        finish(resolve, data);
      } catch (error) { finish(reject, new Error(error?.message || '头像图片处理失败')); }
    };
    img.src = src;
  });
}

export const AVATAR_STUDIO_CSS = `
#rp-phone #rp-screen #rp-avatar-studio{position:absolute!important;inset:0!important;z-index:300!important;display:flex!important;align-items:center!important;justify-content:center!important;padding:10px!important;background:rgba(30,25,30,.32)!important;color:var(--rp-v-text,#45383d)!important;font-family:inherit;font-size:12px;line-height:1.55;box-sizing:border-box!important;}
#rp-phone #rp-screen #rp-avatar-studio *{box-sizing:border-box;}
#rp-phone #rp-screen #rp-avatar-studio .rp-as-panel{display:flex;flex-direction:column;background:var(--rp-v-surface,#faf7f3);border:1px solid var(--rp-v-border,#ded5d7);border-radius:18px;padding:14px;width:100%;max-height:100%;overflow:hidden;box-shadow:0 12px 36px #0002;}
#rp-phone #rp-screen #rp-avatar-studio .rp-as-heading{flex:0 0 auto;}
#rp-phone #rp-screen #rp-avatar-studio .rp-as-body{flex:1 1 auto;min-height:0;overflow:auto;overscroll-behavior:contain;padding:4px;margin:0 -4px;}
#rp-phone #rp-screen #rp-avatar-studio h3{font-size:16px;font-weight:700;margin:0 0 4px;color:inherit;}
#rp-phone #rp-screen #rp-avatar-studio p{margin:4px 0 10px;font-size:12px;line-height:1.6;color:inherit;}
#rp-phone #rp-screen #rp-avatar-studio button{font:inherit!important;line-height:1.4!important;cursor:pointer!important;min-height:34px!important;padding:8px 10px!important;border-radius:10px!important;border:1px solid var(--rp-v-border,#ded5d7)!important;background:var(--rp-v-card,#fff)!important;color:inherit!important;box-shadow:none!important;text-shadow:none!important;white-space:normal!important;}
#rp-phone #rp-screen #rp-avatar-studio button:disabled{opacity:.5!important;cursor:default!important;}
#rp-phone #rp-screen #rp-avatar-studio button:focus-visible,#rp-phone #rp-screen #rp-avatar-studio textarea:focus-visible{outline:2px solid var(--rp-r-accent,#9a647b)!important;outline-offset:2px;}
#rp-phone #rp-screen #rp-avatar-studio .rp-as-primary{background:var(--rp-r-accent,#9a647b)!important;color:var(--rp-r-on-accent,#fff)!important;border-color:transparent!important;}
#rp-phone #rp-screen #rp-avatar-studio .rp-as-options{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px 10px;margin:12px 0 6px;}
#rp-phone #rp-screen #rp-avatar-studio .rp-as-options button{min-width:0!important;width:100%!important;min-height:42px!important;padding:10px 6px!important;white-space:nowrap!important;}
#rp-phone #rp-screen #rp-avatar-studio #rp-as-view-large{grid-column:1/-1;min-height:36px!important;padding:7px 10px!important;}
#rp-phone #rp-screen #rp-avatar-studio .rp-as-large-frame{position:relative;flex:1 1 auto;min-height:0;margin:10px 0;overflow:hidden;}
#rp-phone #rp-screen #rp-avatar-studio #rp-as-large-image{position:absolute!important;inset:auto!important;top:50%!important;left:50%!important;transform:translate(-50%,-50%)!important;max-width:100%!important;max-height:100%!important;object-fit:contain!important;border:1px solid var(--rp-v-border,#ded5d7)!important;border-radius:12px!important;}
#rp-phone #rp-screen #rp-avatar-studio #rp-as-large-status{flex:0 0 auto;font-size:11px;margin:0 0 8px;overflow-wrap:anywhere;}
#rp-phone #rp-screen #rp-avatar-studio #rp-as-large-back{flex:0 0 auto;width:100%!important;min-height:40px!important;}
#rp-phone #rp-screen #rp-avatar-studio .rp-as-options button:hover{border-color:var(--rp-r-accent,#9a647b)!important;color:var(--rp-r-accent,#9a647b)!important;}
#rp-phone #rp-screen #rp-avatar-studio #rp-as-dismiss{display:block!important;width:auto!important;min-width:64px!important;min-height:34px!important;margin:0 auto!important;padding:5px 12px!important;border-color:transparent!important;background:transparent!important;color:var(--rp-v-muted,#756772)!important;}
#rp-phone #rp-screen #rp-avatar-studio #rp-as-dismiss:hover{color:var(--rp-v-text,#45383d)!important;}
#rp-phone #rp-screen #rp-avatar-studio .rp-as-install{padding:12px;margin:10px 0;border:1px solid var(--rp-v-border,#ded5d7);border-radius:12px;background:var(--rp-v-card,#fff);}
#rp-phone #rp-screen #rp-avatar-studio .rp-as-install a{color:var(--rp-r-accent,#9a647b);text-decoration:underline;}
#rp-phone #rp-screen #rp-avatar-studio #rp-as-install-url{min-height:76px!important;max-height:96px!important;resize:none!important;cursor:text!important;font-size:11px!important;background:var(--rp-v-surface,#fff)!important;}
#rp-phone #rp-screen #rp-avatar-studio #rp-as-copy-link{width:100%!important;margin-top:8px!important;}
#rp-phone #rp-screen #rp-avatar-studio #rp-as-copy-status{font-size:11px;margin:6px 0 0;}
#rp-phone #rp-screen #rp-avatar-studio #rp-as-copy-status:empty{display:none;}
#rp-phone #rp-screen #rp-avatar-studio #rp-as-status:empty{display:none;}
#rp-phone #rp-screen #rp-avatar-studio #rp-as-generation-status{flex:0 0 auto;margin:6px 0 8px;padding:8px 10px;border:1px solid var(--rp-v-border,#ded5d7);border-radius:10px;background:var(--rp-v-card,#fff);font-size:11px;line-height:1.5;white-space:pre-wrap;overflow-wrap:anywhere;max-height:100px;overflow:auto;overscroll-behavior:contain;}
#rp-phone #rp-screen #rp-avatar-studio #rp-as-generation-status[data-state="error"]{border-color:var(--rp-r-accent,#9a647b);}
#rp-phone #rp-screen #rp-avatar-studio label{display:block;margin:10px 0 4px;font-size:12px;font-weight:600;}
#rp-phone #rp-screen #rp-avatar-studio .rp-as-field-heading{display:flex;align-items:center;justify-content:space-between;gap:8px;margin:10px 0 4px;}
#rp-phone #rp-screen #rp-avatar-studio .rp-as-field-heading label{margin:0;min-width:0;}
#rp-phone #rp-screen #rp-avatar-studio .rp-as-field-heading button{flex:0 0 auto;min-height:28px!important;padding:4px 7px!important;font-size:11px!important;color:var(--rp-r-accent,#9a647b)!important;}
#rp-phone #rp-screen #rp-avatar-studio .rp-as-expanded{display:flex;flex-direction:column;width:100%;height:100%;min-height:0;max-height:100%;padding:14px;border:1px solid var(--rp-v-border,#ded5d7);border-radius:18px;background:var(--rp-v-surface,#faf7f3);overflow:hidden;}
#rp-phone #rp-screen #rp-avatar-studio .rp-as-expanded h3,#rp-phone #rp-screen #rp-avatar-studio .rp-as-expanded p{flex:0 0 auto;}
#rp-phone #rp-screen #rp-avatar-studio #rp-as-expanded-note{font-size:11px;color:var(--rp-v-muted,#756772);margin:4px 0 10px;}
#rp-phone #rp-screen #rp-avatar-studio #rp-as-expanded-text{flex:1 1 auto!important;min-height:0!important;height:0!important;max-height:none!important;padding:10px 12px!important;resize:none!important;font-size:13px!important;line-height:1.7!important;background:var(--rp-v-surface,#fff)!important;border-color:var(--rp-r-accent,#9a647b)!important;overflow:auto!important;overscroll-behavior:contain;}
#rp-phone #rp-screen #rp-avatar-studio #rp-as-expanded-error:empty{display:none;}
#rp-phone #rp-screen #rp-avatar-studio #rp-as-expanded-error{font-size:11px;margin:6px 0 0;}
#rp-phone #rp-screen #rp-avatar-studio textarea{display:block!important;width:100%!important;min-height:64px!important;max-height:180px!important;resize:vertical!important;padding:8px!important;border:1px solid var(--rp-v-border,#ded5d7)!important;border-radius:10px!important;background:var(--rp-v-card,#fff)!important;color:inherit!important;font-family:inherit!important;font-size:12px!important;line-height:1.5!important;box-shadow:none!important;}
#rp-phone #rp-screen #rp-avatar-studio label[for="rp-as-extra"]{display:flex;align-items:baseline;justify-content:space-between;gap:4px 6px;flex-wrap:wrap;}
#rp-phone #rp-screen #rp-avatar-studio #rp-as-extra-hint{font-size:11px;font-weight:400;color:var(--rp-r-accent,#9a647b);}
#rp-phone #rp-screen #rp-avatar-studio #rp-as-extra{min-height:88px!important;padding:10px 12px!important;border:1.5px solid var(--rp-r-accent,#9a647b)!important;background:var(--rp-v-surface,#fff)!important;cursor:text!important;caret-color:var(--rp-r-accent,#9a647b);box-shadow:inset 0 1px 2px #0000000a!important;}
#rp-phone #rp-screen #rp-avatar-studio #rp-as-extra::placeholder{color:var(--rp-v-muted,#756772)!important;opacity:1!important;}
#rp-phone #rp-screen #rp-avatar-studio #rp-as-extra:focus{border-color:var(--rp-r-accent,#9a647b)!important;outline:2px solid var(--rp-r-accent,#9a647b)!important;outline-offset:2px;}
#rp-phone #rp-screen #rp-avatar-studio #rp-as-extra:disabled{cursor:wait!important;opacity:.65;}
#rp-phone #rp-screen #rp-avatar-studio #rp-as-regenerate-tag{width:100%!important;min-height:34px!important;color:var(--rp-r-accent,#9a647b)!important;}
#rp-phone #rp-screen #rp-avatar-studio #rp-as-regenerate-note{font-size:11px;color:var(--rp-v-muted,#756772);margin:4px 0 0;text-align:center;}
#rp-phone #rp-screen #rp-avatar-studio #rp-as-profile{min-height:160px!important;max-height:260px!important;padding:10px!important;border-color:var(--rp-r-accent,#9a647b)!important;background:var(--rp-v-surface,#fff)!important;cursor:text!important;}
#rp-phone #rp-screen #rp-avatar-studio #rp-as-profile:focus{outline:2px solid var(--rp-r-accent,#9a647b)!important;outline-offset:2px;}
#rp-phone #rp-screen #rp-avatar-studio #rp-as-profile-note,#rp-phone #rp-screen #rp-avatar-studio #rp-as-sources{font-size:11px;color:var(--rp-v-muted,#756772);margin:5px 0;overflow-wrap:anywhere;}
#rp-phone #rp-screen #rp-avatar-studio #rp-as-sources{max-height:70px;overflow:auto;}
#rp-phone #rp-screen #rp-avatar-studio #rp-as-restore{display:block;width:auto;margin:6px 0 2px;padding:5px 9px!important;font-size:11px!important;}
#rp-phone #rp-screen #rp-avatar-studio #rp-as-tag{min-height:80px!important;}
#rp-phone #rp-screen #rp-avatar-studio details{margin:8px 0;border-bottom:1px solid var(--rp-v-border,#ded5d7);padding-bottom:6px;}
#rp-phone #rp-screen #rp-avatar-studio summary{cursor:pointer;font-size:11px;}
#rp-phone #rp-screen #rp-avatar-studio pre{font-family:inherit;font-size:11px;line-height:1.5;white-space:pre-wrap;word-break:break-word;max-height:150px;overflow:auto;margin:6px 0;}
#rp-phone #rp-screen #rp-avatar-studio .rp-as-preview{position:relative;width:160px;max-width:100%;height:auto;aspect-ratio:1;border-radius:50%;overflow:hidden;margin:12px auto 8px;background:var(--rp-v-card,#fff);border:1px solid var(--rp-v-border,#ded5d7);display:flex;align-items:center;justify-content:center;touch-action:none;user-select:none;}
#rp-phone #rp-screen #rp-avatar-studio .rp-as-preview.rp-as-crop-ready{cursor:grab;}
#rp-phone #rp-screen #rp-avatar-studio .rp-as-preview.rp-as-dragging{cursor:grabbing;}
#rp-phone #rp-screen #rp-avatar-studio .rp-as-preview:focus-visible{outline:2px solid var(--rp-r-accent,#9a647b);outline-offset:2px;}
#rp-phone #rp-screen #rp-avatar-studio .rp-as-preview img{position:absolute!important;max-width:none!important;max-height:none!important;object-fit:fill!important;display:block!important;pointer-events:none!important;user-select:none!important;-webkit-user-drag:none!important;transform:none!important;}
#rp-phone #rp-screen #rp-avatar-studio .rp-as-crop-row{display:flex;align-items:center;gap:8px;}
#rp-phone #rp-screen #rp-avatar-studio .rp-as-crop-row button{flex:0 0 34px;padding:4px!important;font-size:17px!important;}
#rp-phone #rp-screen #rp-avatar-studio #rp-as-zoom{display:block!important;flex:1!important;min-width:0!important;width:100%!important;height:28px!important;margin:0!important;padding:0!important;accent-color:var(--rp-r-accent,#9a647b);cursor:ew-resize;}
#rp-phone #rp-screen #rp-avatar-studio .rp-as-crop-caption{display:flex;align-items:center;justify-content:space-between;margin:4px 0;font-size:11px;color:var(--rp-v-muted,#756772);}
#rp-phone #rp-screen #rp-avatar-studio #rp-as-crop-reset{display:block;margin:4px auto 8px;min-height:30px!important;padding:4px 10px!important;font-size:11px!important;background:transparent!important;border-color:transparent!important;color:var(--rp-v-muted,#756772)!important;}
#rp-phone #rp-screen #rp-avatar-studio .rp-as-history{display:flex;gap:6px;overflow:auto;min-height:0;margin:6px 0;}
#rp-phone #rp-screen #rp-avatar-studio .rp-as-history button{padding:3px!important;flex:0 0 44px;min-height:44px!important;}
#rp-phone #rp-screen #rp-avatar-studio .rp-as-history button[aria-pressed="true"]{border-color:var(--rp-r-accent,#9a647b)!important;}
#rp-phone #rp-screen #rp-avatar-studio .rp-as-history img{width:36px!important;height:36px!important;object-fit:cover!important;display:block;}
#rp-phone #rp-screen #rp-avatar-studio .rp-as-actions{display:flex;margin:12px 0 4px;}
#rp-phone #rp-screen #rp-avatar-studio .rp-as-actions button{flex:1;min-height:38px!important;}
#rp-phone #rp-screen #rp-avatar-studio .rp-as-footer{display:grid;grid-template-columns:minmax(64px,.7fr) minmax(0,1.3fr);gap:10px;flex:0 0 auto;padding:10px 0 0;background:var(--rp-v-surface,#faf7f3);margin-top:10px;border-top:1px solid var(--rp-v-border,#ded5d7);}
#rp-phone #rp-screen #rp-avatar-studio .rp-as-footer button{width:100%!important;min-height:40px!important;margin:0!important;padding:10px 8px!important;}

#rp-phone #rp-screen #rp-avatar-studio .rp-as-editing{height:100%;padding:12px;}
#rp-phone #rp-screen #rp-avatar-studio .rp-as-heading p{font-size:11px;margin:0 0 4px;color:var(--rp-v-muted,#756772);}
#rp-phone #rp-screen #rp-avatar-studio .rp-as-tabs{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:4px;flex:0 0 auto;margin:8px 0;padding:3px;background:var(--rp-v-card,#fff);border-radius:11px;}
#rp-phone #rp-screen #rp-avatar-studio .rp-as-tabs button{min-width:0!important;min-height:34px!important;padding:6px 2px!important;border:0!important;background:transparent!important;font-size:11px!important;}
#rp-phone #rp-screen #rp-avatar-studio .rp-as-tabs button[aria-selected="true"]{background:var(--rp-r-accent,#9a647b)!important;color:var(--rp-r-on-accent,#fff)!important;}
#rp-phone #rp-screen #rp-avatar-studio .rp-as-guide{font-size:11px;color:var(--rp-v-muted,#756772);margin:6px 0 10px;}
#rp-phone #rp-screen #rp-avatar-studio #rp-as-status{font-size:11px;color:var(--rp-v-muted,#756772);margin:8px 0 0;}
#rp-phone #rp-screen #rp-avatar-studio #rp-as-generation-status{max-height:72px;margin:4px 0;padding:6px 8px;}
#rp-phone #rp-screen #rp-avatar-studio .rp-as-preview{width:168px;margin:6px auto 8px;}
#rp-phone #rp-screen #rp-avatar-studio .rp-as-transform-row{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:6px;margin:6px 0;}
#rp-phone #rp-screen #rp-avatar-studio .rp-as-transform-row button{min-width:0!important;padding:6px 3px!important;font-size:11px!important;}
#rp-phone #rp-screen #rp-avatar-studio #rp-as-mirror[aria-pressed="true"]{border-color:var(--rp-r-accent,#9a647b)!important;color:var(--rp-r-accent,#9a647b)!important;}
#rp-phone #rp-screen #rp-avatar-studio .rp-as-transform-caption{display:flex;align-items:center;justify-content:space-between;gap:6px;}
#rp-phone #rp-screen #rp-avatar-studio #rp-as-crop-reset{margin:0;min-height:28px!important;}
#rp-phone #rp-screen #rp-avatar-studio #rp-as-orientation{font-size:11px;color:var(--rp-v-muted,#756772);}
#rp-phone #rp-screen #rp-avatar-studio #rp-as-regenerate-tag{color:var(--rp-r-on-accent,#fff)!important;}
#rp-phone #rp-screen #rp-avatar-studio #rp-as-tag{min-height:160px!important;max-height:280px!important;}
#rp-phone #rp-screen #rp-avatar-studio .rp-as-footer{margin-top:8px;padding-top:8px;}
#rp-phone #rp-screen #rp-avatar-studio .rp-as-footer button{font-size:11px!important;}
#rp-phone #rp-screen #rp-avatar-studio [hidden][hidden]{display:none!important;}
`;

export function openAvatarStudio(deps) {
  const { host, target, scope, signal } = deps, doc = host.ownerDocument;
  const previousFocus = doc.activeElement;
  let closed = false, busy = false, job = null, profile = null, selected = null, sequence = 0, promptPrepared = false, drag = null, previewSequence = 0, copying = false, copyJob = null, expandedField = null, viewingLarge = false, largeTicket = 0, largeTimer = null, pane = 'requirements', focusPaneAfterOperation = false;
  const candidates = [];
  const root = doc.createElement('div'); root.id = 'rp-avatar-studio'; root.setAttribute('role', 'dialog'); root.setAttribute('aria-modal', 'true'); root.setAttribute('aria-labelledby', 'rp-as-title');
  root.innerHTML = `<div class="rp-as-panel" id="rp-as-main"><div class="rp-as-heading"><h3 id="rp-as-title"></h3><p id="rp-as-scope"></p></div><p id="rp-as-generation-status" role="status" aria-live="polite" hidden></p><div id="rp-as-tabs" class="rp-as-tabs" role="tablist" aria-label="头像制作步骤" hidden><button id="rp-as-tab-requirements" role="tab" aria-controls="rp-as-requirements" aria-selected="true">人设与要求</button><button id="rp-as-tab-adjust" role="tab" aria-controls="rp-as-adjust" aria-selected="false" tabindex="-1" disabled>头像调整</button><button id="rp-as-tab-tags" role="tab" aria-controls="rp-as-tag-area" aria-selected="false" tabindex="-1" disabled>绘图 tag</button></div><div class="rp-as-body">
    <div id="rp-as-choice"><div class="rp-as-options"><button id="rp-as-upload">上传图片</button><button id="rp-as-ai">智绘姬生图</button><button id="rp-as-view-large" aria-controls="rp-as-large">查看大图</button></div><div id="rp-as-install" class="rp-as-install" hidden><p id="rp-as-install-message" role="status" aria-live="polite"></p><p><a id="rp-as-install-link" target="_blank" rel="noopener noreferrer">dc社区类脑 · 智绘姬扩展</a></p><textarea id="rp-as-install-url" readonly aria-label="智绘姬扩展社区地址"></textarea><button id="rp-as-copy-link" class="rp-as-primary">复制链接</button><p id="rp-as-copy-status" role="status" aria-live="polite"></p></div><button id="rp-as-dismiss">取消</button></div>
    <div id="rp-as-editor" hidden>
      <section id="rp-as-requirements" role="tabpanel" aria-labelledby="rp-as-tab-requirements"><p class="rp-as-guide">先确认人设并补充要求，生成后再调整头像。</p><label for="rp-as-extra">补充人设／头像要求<span id="rp-as-extra-hint">选填 · 点击输入</span></label><textarea id="rp-as-extra" aria-describedby="rp-as-extra-hint" maxlength="4000" placeholder="点击这里输入补充要求…&#10;例如：银色短发、绿色眼睛、白衬衫。"></textarea>
        <details><summary>查看／修改人物资料</summary><p id="rp-as-sources" hidden></p><div class="rp-as-field-heading"><label for="rp-as-profile">人物资料（可直接修改）</label><button id="rp-as-profile-expand" aria-label="放大编辑人物资料" aria-controls="rp-as-expanded" disabled>放大编辑</button></div><textarea id="rp-as-profile" maxlength="15500" aria-describedby="rp-as-profile-note" placeholder="点击这里修改读错的资料，或补充缺少的人设。"></textarea><p id="rp-as-profile-note">仅用于本次头像生成，不修改角色卡或世界书。</p><button id="rp-as-restore" disabled>恢复读取原文</button></details><button id="rp-as-reload" hidden>重读人物资料</button><p id="rp-as-regenerate-note" class="rp-as-guide">首次生成会先编写 tag，再生成头像。</p>
      </section>
      <section id="rp-as-adjust" role="tabpanel" aria-labelledby="rp-as-tab-adjust" hidden><div class="rp-as-preview" id="rp-as-crop" data-no-swipe-back tabindex="-1" role="group" aria-label="头像取景框，拖动图片或用方向键调整位置"><span id="rp-as-placeholder">头像预览</span><img id="rp-as-image" alt="头像候选预览" draggable="false" hidden></div>
        <div id="rp-as-crop-controls" hidden><div class="rp-as-crop-caption"><span>拖动取景 · 滑杆缩放</span><output id="rp-as-zoom-value" for="rp-as-zoom">100%</output></div><div class="rp-as-crop-row"><button id="rp-as-zoom-out" aria-label="缩小头像">−</button><input id="rp-as-zoom" type="range" min="100" max="400" step="1" value="100" aria-label="头像缩放比例"><button id="rp-as-zoom-in" aria-label="放大头像">+</button></div><div class="rp-as-transform-row"><button id="rp-as-rotate-left" aria-label="逆时针旋转90度">↶ 90°</button><button id="rp-as-rotate-right" aria-label="顺时针旋转90度">↷ 90°</button><button id="rp-as-mirror" aria-label="左右镜像翻转头像" aria-pressed="false">左右镜像</button></div><div class="rp-as-transform-caption"><output id="rp-as-orientation" aria-live="polite">0°</output><button id="rp-as-crop-reset">重置构图</button></div></div>
        <div class="rp-as-history" id="rp-as-history" aria-label="本轮头像候选"></div><p class="rp-as-guide">满意后点“用作头像”。想重画，可切换到人设或 tag。</p>
      </section>
      <section id="rp-as-tag-area" role="tabpanel" aria-labelledby="rp-as-tab-tags" hidden><div class="rp-as-field-heading"><label for="rp-as-tag">绘图 tag（可以修改）</label><button id="rp-as-tag-expand" aria-label="放大编辑绘图 tag" aria-controls="rp-as-expanded" disabled>放大编辑</button></div><textarea id="rp-as-tag" maxlength="20000"></textarea><p class="rp-as-guide">直接修改 tag 后点下方“按 tag 重新生图”。若要让 AI 按新要求重写，请回“人设与要求”。</p></section>
    </div><p id="rp-as-status" role="status" aria-live="polite"></p></div>
    <div class="rp-as-footer" id="rp-as-footer" hidden><button id="rp-as-back">取消</button><button id="rp-as-generate" class="rp-as-primary">生成头像</button><button id="rp-as-regenerate-tag" class="rp-as-primary" aria-describedby="rp-as-regenerate-note" hidden disabled>重新生成tag并重新生图</button><button id="rp-as-tag-generate" class="rp-as-primary" hidden disabled>按 tag 重新生图</button><button id="rp-as-confirm" class="rp-as-primary" hidden disabled>用作头像</button></div></div>
    <section id="rp-as-expanded" class="rp-as-expanded" data-no-swipe-back hidden><h3 id="rp-as-expanded-title" tabindex="-1"></h3><p id="rp-as-expanded-note"></p><textarea id="rp-as-expanded-text" aria-labelledby="rp-as-expanded-title" aria-describedby="rp-as-expanded-note rp-as-expanded-error"></textarea><p id="rp-as-expanded-error" role="status" aria-live="polite"></p><div class="rp-as-footer"><button id="rp-as-expanded-cancel">取消</button><button id="rp-as-expanded-done" class="rp-as-primary">完成</button></div></section>
    <section id="rp-as-large" class="rp-as-expanded" data-no-swipe-back hidden><h3 id="rp-as-large-title"></h3><div class="rp-as-large-frame"><img id="rp-as-large-image" alt="" hidden></div><p id="rp-as-large-status" role="status" aria-live="polite"></p><button id="rp-as-large-back">返回</button></section>`;
  const $ = id => root.querySelector('#rp-as-' + id);
  root.querySelectorAll('button').forEach(button => { button.type = 'button'; });
  $('title').textContent = '更换' + target.name + '的头像';
  $('scope').textContent = scope === 'local' ? '应用范围：仅当前聊天' : '应用范围：共用头像';
  $('install-link').href = AVATAR_EXTENSION_LINK; $('install-url').value = AVATAR_EXTENSION_LINK;
  host.appendChild(root);
  const valid = () => !closed && !signal?.aborted && deps.isCurrent() !== false;
  const check = () => { if (!valid()) throw cancelled(); };
  function fitLargeImage() {
    const image = $('large-image'), frame = image.parentElement;
    if (!valid() || !viewingLarge || image.hidden || !(image.naturalWidth > 0 && image.naturalHeight > 0)) return;
    const scale = Math.min((frame.clientWidth - 2) / image.naturalWidth, (frame.clientHeight - 2) / image.naturalHeight);
    if (!(scale > 0)) return;
    // Size the image box itself, so its border follows the full image without letterboxing.
    image.style.setProperty('width', image.naturalWidth * scale + 2 + 'px', 'important');
    image.style.setProperty('height', image.naturalHeight * scale + 2 + 'px', 'important');
  }
  function clearLargeImage() {
    largeTicket++; doc.defaultView.clearTimeout(largeTimer); largeTimer = null;
    const image = $('large-image'); image.onload = image.onerror = null; image.hidden = true; image.removeAttribute('src');
  }
  function returnFromLarge() {
    if (!valid() || !viewingLarge) return;
    viewingLarge = false; clearLargeImage(); $('large').hidden = true; $('main').hidden = false;
    root.setAttribute('aria-labelledby', 'rp-as-title'); $('view-large').focus({ preventScroll: true });
  }
  $('view-large').onclick = () => {
    if (!valid() || busy || copying || viewingLarge || expandedField || $('choice').hidden) return;
    viewingLarge = true; clearLargeImage(); const ticket = largeTicket;
    $('large-title').textContent = target.name + '的头像'; $('large-image').alt = target.name + '的当前头像';
    $('main').hidden = true; $('large').hidden = false; root.setAttribute('aria-labelledby', 'rp-as-large-title'); $('large-back').focus({ preventScroll: true });
    let src;
    try { src = deps.currentAvatar?.(); } catch { $('large-status').textContent = '头像暂时无法读取，请返回后重试。'; return; }
    if (typeof src !== 'string' || !/^(?:data:image\/|https?:\/\/|\/(?!\/))/i.test(src)) { $('large-status').textContent = '还没有设置图片头像，可返回后上传图片或使用智绘姬生图。'; return; }
    $('large-status').textContent = '正在加载头像…';
    const image = $('large-image'), current = () => valid() && viewingLarge && ticket === largeTicket;
    const failed = () => { if (current()) { doc.defaultView.clearTimeout(largeTimer); image.hidden = true; $('large-status').textContent = '头像图片加载失败，请返回后重试。'; } };
    image.onload = () => {
      if (!current()) return; doc.defaultView.clearTimeout(largeTimer);
      if (!(image.naturalWidth > 0 && image.naturalHeight > 0)) { failed(); return; }
      image.hidden = false; $('large-status').textContent = '当前头像'; fitLargeImage();
    };
    image.onerror = failed; largeTimer = doc.defaultView.setTimeout(failed, 15000); image.src = src;
  };
  $('large-back').onclick = returnFromLarge;
  const status = text => { if (!closed) $('status').textContent = text; };
  function generationStatus(text, state = 'pending') {
    if (!valid()) return;
    const message = $('generation-status'); message.textContent = text; message.dataset.state = state; message.hidden = false;
  }
  const updateExtraHint = () => { $('extra-hint').textContent = $('profile').value.trim() ? '选填 · 点击输入' : '必填 · 请补充外貌'; };
  const body = root.querySelector('.rp-as-body');
  const paneIds = { requirements: 'requirements', adjust: 'adjust', tags: 'tag-area' }, paneScroll = {};
  function syncPanes() {
    for (const id of Object.keys(paneIds)) {
      const active = pane === id, button = $('tab-' + id);
      $(paneIds[id]).hidden = !active; button.setAttribute('aria-selected', String(active)); button.tabIndex = active ? 0 : -1;
      button.disabled = busy || (id === 'adjust' && !selected) || (id === 'tags' && !promptPrepared);
    }
    $('generate').hidden = pane !== 'requirements' || promptPrepared;
    $('regenerate-tag').hidden = pane !== 'requirements' || !promptPrepared;
    $('tag-generate').hidden = pane !== 'tags'; $('confirm').hidden = pane !== 'adjust';
    $('regenerate-note').textContent = promptPrepared ? '更新补充要求后，点击下方按钮重写 tag 并重新生图。' : '首次生成会先编写 tag，再生成头像。';
  }
  function setPane(id, focus = false) {
    if (!valid() || !(id in paneIds) || (id === 'adjust' && !selected) || (id === 'tags' && !promptPrepared)) return;
    endDrag(); paneScroll[pane] = body.scrollTop; pane = id; syncPanes(); body.scrollTop = paneScroll[id] || 0; renderCrop();
    if (focus) $('tab-' + id).focus({ preventScroll: true });
  }
  for (const id of Object.keys(paneIds)) {
    $('tab-' + id).onclick = () => { if (!busy && !expandedField) setPane(id); };
    $('tab-' + id).onkeydown = event => {
      if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key) || busy) return;
      event.preventDefault(); event.stopPropagation(); const enabled = Object.keys(paneIds).filter(key => !$('tab-' + key).disabled), at = enabled.indexOf(pane);
      setPane(event.key === 'Home' ? enabled[0] : event.key === 'End' ? enabled.at(-1) : enabled[(at + (event.key === 'ArrowRight' ? 1 : -1) + enabled.length) % enabled.length], true);
    };
  }
  const updateLayout = () => { fitLargeImage(); };
  const tagObserver = typeof doc.defaultView.ResizeObserver === 'function' ? new doc.defaultView.ResizeObserver(updateLayout) : null;
  tagObserver?.observe($('large-image').parentElement); doc.defaultView.addEventListener('resize', updateLayout);
  function expandField(id) {
    const source = $(id);
    if (!valid() || busy || expandedField || source.disabled || source.closest('[hidden]')) return;
    expandedField = { id, scrollTop: body.scrollTop };
    $('expanded-title').textContent = id === 'profile' ? '编辑人物资料' : '编辑绘图 tag';
    $('expanded-note').textContent = id === 'profile' ? '仅用于本次头像生成，不会修改角色卡或世界书。' : '完成后返回，可按修改后的 tag 重新生图。';
    const text = $('expanded-text'); text.value = source.value; text.maxLength = source.maxLength; text.placeholder = source.placeholder;
    text.setSelectionRange(source.selectionStart, source.selectionEnd, source.selectionDirection); text.scrollTop = 0;
    $('expanded-error').textContent = ''; $('main').hidden = true; $('expanded').hidden = false;
    root.setAttribute('aria-labelledby', 'rp-as-expanded-title'); $('expanded-title').focus({ preventScroll: true });
  }
  function finishExpanded(apply) {
    if (!valid() || !expandedField) return;
    const { id, scrollTop } = expandedField, source = $(id), text = $('expanded-text');
    if (apply) {
      if (busy || source.disabled) return;
      if (text.value !== source.value && text.value.length > source.maxLength) { $('expanded-error').textContent = '内容过长，请控制在 ' + source.maxLength + ' 个字符以内。'; return; }
      if (source.value !== text.value) { source.value = text.value; source.dispatchEvent(new doc.defaultView.Event('input', { bubbles: true })); }
      source.setSelectionRange(text.selectionStart, text.selectionEnd, text.selectionDirection);
    }
    expandedField = null; $('expanded').hidden = true; $('expanded-text').value = ''; $('main').hidden = false;
    root.setAttribute('aria-labelledby', 'rp-as-title'); body.scrollTop = scrollTop; $(id + '-expand').focus({ preventScroll: true });
  }
  $('profile-expand').onclick = () => expandField('profile');
  $('tag-expand').onclick = () => expandField('tag');
  $('expanded-cancel').onclick = () => finishExpanded(false);
  $('expanded-done').onclick = () => finishExpanded(true);
  const paint = () => {
    $('ai').disabled = busy;
    $('view-large').disabled = busy || copying;
    for (const id of ['generate', 'reload']) $(id).disabled = busy || !profile;
    $('reload').disabled = busy;
    $('confirm').disabled = busy || !selected;
    $('extra').disabled = $('tag').disabled = busy;
    $('profile').disabled = busy || !profile;
    $('profile-expand').disabled = busy || !profile;
    $('tag-expand').disabled = busy || !promptPrepared;
    $('restore').disabled = busy || !profile || $('profile').value === profile.body;
    $('generate').textContent = promptPrepared ? '按 tag 重新生图' : '生成头像';
    $('generate').classList.toggle('rp-as-primary', !promptPrepared);
    syncPanes();
    $('regenerate-tag').disabled = busy || !profile || !promptPrepared; $('tag-generate').disabled = busy || !promptPrepared;
    for (const id of ['zoom', 'zoom-in', 'zoom-out', 'crop-reset', 'rotate-left', 'rotate-right', 'mirror']) $(id).disabled = busy || !selected?.dimensions;
    $('crop').tabIndex = !busy && selected?.dimensions ? 0 : -1;
    if (busy) endDrag();
    for (const button of $('history').children) button.disabled = busy;

  };
  function close() {
    if (closed) return; closed = true; clearLargeImage(); endDrag(); observer?.disconnect(); tagObserver?.disconnect(); doc.defaultView.removeEventListener('resize', updateLayout); previewSequence++; $('image').onload = $('image').onerror = null; job?.abort(); copyJob?.abort(); signal?.removeEventListener('abort', close); root.remove(); deps.onClose?.();
    if (previousFocus?.isConnected) previousFocus.focus?.();
  }
  signal?.addEventListener('abort', close, { once: true });
  function show(candidate) {
    endDrag(); selected = candidate; candidate.crop ||= { zoom: 1, x: .5, y: .5 };
    const image = $('image'), ticket = ++previewSequence;
    image.onload = () => {
      if (!valid() || selected !== candidate || ticket !== previewSequence) return;
      const width = image.naturalWidth, height = image.naturalHeight;
      if (!(width > 0 && height > 0) || width * height > 32000000) { status('图片尺寸无效或过大，请重新生成'); generationStatus('图片已返回，但尺寸无效或过大。已有头像未更改，请重试生图。', 'error'); return; }
      candidate.dimensions = { width, height }; renderCrop(); paint();
    };
    image.onerror = () => { if (valid() && ticket === previewSequence) { status('预览图片无法读取，请重试或选择其他候选'); generationStatus('图片已返回，但预览无法读取。已有头像未更改，可重试生图或选择其他候选。', 'error'); } };
    image.src = candidate.src; image.hidden = false; $('placeholder').hidden = true; $('crop-controls').hidden = false;
    $('tag').value = candidate.prompt; if (pane !== 'adjust') focusPaneAfterOperation = true; setPane('adjust'); renderCrop();
    for (const button of $('history').children) button.setAttribute('aria-pressed', String(Number(button.dataset.candidate) === candidate.id)); paint();
  }
  function endDrag() {
    if (!drag) return;
    const id = drag.id; drag = null; $('crop').classList.remove('rp-as-dragging');
    try { if ($('crop').hasPointerCapture?.(id)) $('crop').releasePointerCapture(id); } catch {}
  }
  function viewport() {
    const el = $('crop'), rect = el.getBoundingClientRect(), size = el.clientWidth || rect.width || 160;
    return { size, screenSize: rect.width > 0 ? rect.width * size / (el.offsetWidth || size) : size };
  }
  function renderCrop() {
    const candidate = selected, image = $('image');
    $('crop').classList.toggle('rp-as-crop-ready', !!candidate?.dimensions);
    const size = viewport().size;
    if (!candidate?.dimensions) {
      for (const [key, value] of Object.entries({ left: '0', top: '0', width: '100%', height: '100%', 'object-fit': 'cover', transform: 'none' })) image.style.setProperty(key, value, 'important');
      $('zoom').value = '100'; $('zoom-value').value = '100%'; return;
    }
    const { width, height } = candidate.dimensions, rect = avatarCropView(width, height, candidate.crop);
    candidate.crop = { ...candidate.crop, zoom: rect.zoom, x: rect.centerX, y: rect.centerY };
    const scale = size / rect.size;
    for (const [key, value] of Object.entries({ left: -rect.x * scale + 'px', top: -rect.y * scale + 'px', width: width * scale + 'px', height: height * scale + 'px', 'object-fit': 'fill', 'transform-origin': '0 0', transform: 'matrix(' + [...rect.matrix.slice(0, 4), rect.matrix[4] * scale, rect.matrix[5] * scale].join(',') + ')' })) image.style.setProperty(key, value, 'important');
    $('zoom').value = String(Math.round(rect.zoom * 100)); $('zoom-value').value = Math.round(rect.zoom * 100) + '%'; $('mirror').setAttribute('aria-pressed', String(rect.mirror)); $('orientation').value = rect.rotation + '°' + (rect.mirror ? ' · 已镜像' : '');
  }
  function setZoom(zoom) {
    if (busy || !valid() || !selected?.dimensions) return;
    endDrag(); selected.crop.zoom = zoom; renderCrop();
  }
  function moveCrop(dx, dy, crop = selected?.crop, size = viewport().screenSize) {
    if (!selected?.dimensions || !crop) return;
    const { width, height } = selected.dimensions, rect = avatarCropView(width, height, crop);
    selected.crop = { ...crop, zoom: rect.zoom, x: rect.centerX - dx / size * rect.size / rect.width, y: rect.centerY - dy / size * rect.size / rect.height }; renderCrop();
  }
  $('crop').onpointerdown = event => {
    if (busy || !valid() || !selected?.dimensions || drag || event.button !== 0) return;
    event.preventDefault(); event.stopPropagation(); $('crop').focus();
    drag = { id: event.pointerId, x: event.clientX, y: event.clientY, crop: { ...selected.crop }, candidate: selected, size: viewport().screenSize };
    try { $('crop').setPointerCapture?.(event.pointerId); } catch {}
    $('crop').classList.add('rp-as-dragging');
  };
  $('crop').onpointermove = event => {
    if (!drag || event.pointerId !== drag.id) return;
    event.preventDefault(); event.stopPropagation();
    if (busy || !valid() || drag.candidate !== selected) { endDrag(); return; }
    moveCrop(event.clientX - drag.x, event.clientY - drag.y, drag.crop, drag.size);
  };
  const pointerEnd = event => { if (drag?.id === event.pointerId) { event.stopPropagation(); endDrag(); } };
  $('crop').onpointerup = $('crop').onpointercancel = $('crop').onlostpointercapture = pointerEnd;
  $('crop').onkeydown = event => {
    const directions = { ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, -1], ArrowDown: [0, 1] };
    const direction = directions[event.key];
    if (!direction || busy || !valid() || !selected?.dimensions) return;
    event.preventDefault(); event.stopPropagation(); const step = viewport().screenSize * (event.shiftKey ? .1 : .025); moveCrop(direction[0] * step, direction[1] * step);
  };
  $('zoom').oninput = () => setZoom(Number($('zoom').value) / 100);
  $('zoom-in').onclick = () => setZoom((selected?.crop.zoom || 1) + .1);
  $('zoom-out').onclick = () => setZoom((selected?.crop.zoom || 1) - .1);
  function transformCrop(delta, flip = false) {
    if (busy || !valid() || !selected?.dimensions) return;
    endDrag(); const crop = selected.crop, { width, height } = selected.dimensions, view = avatarCropView(width, height, crop);
    selected.crop = { ...crop, rotation: (view.rotation + (view.mirror ? -delta : delta) + 360) % 360, mirror: flip ? !view.mirror : view.mirror,
      x: flip ? 1 - view.centerX : delta === 90 ? 1 - view.centerY : view.centerY,
      y: flip ? view.centerY : delta === 90 ? view.centerX : 1 - view.centerX }; renderCrop();
  }
  $('rotate-left').onclick = () => transformCrop(-90); $('rotate-right').onclick = () => transformCrop(90); $('mirror').onclick = () => transformCrop(0, true);
  $('crop-reset').onclick = () => { if (!busy && valid() && selected?.dimensions) { endDrag(); selected.crop = { zoom: 1, x: .5, y: .5 }; renderCrop(); } };
  const observer = typeof doc.defaultView.ResizeObserver === 'function' ? new doc.defaultView.ResizeObserver(() => { if (valid()) { endDrag(); renderCrop(); } }) : null;
  observer?.observe($('crop'));
  function history() {
    $('history').replaceChildren();
    candidates.forEach((candidate, index) => {
      const button = doc.createElement('button'); button.type = 'button'; button.dataset.candidate = String(candidate.id); button.setAttribute('aria-label', '选择候选 ' + (index + 1)); button.setAttribute('aria-pressed', String(candidate === selected));
      const image = doc.createElement('img'); image.src = candidate.src; image.alt = ''; button.appendChild(image); button.onclick = () => { if (!busy && valid()) show(candidate); }; $('history').appendChild(button);
    });
  }
  async function bridge() {
    const value = await deps.bridge(); check();
    if (!avatarBridgeReady(value)) throw new Error('智绘姬头像入口未加载，请刷新酒馆后重试');
    return value;
  }
  async function operation(fn) {
    if (busy || !valid()) return;
    busy = true; job = new doc.defaultView.AbortController(); paint();
    try { await fn(job.signal); check(); } catch (error) { if (valid() && error?.name !== 'AbortError') status(error?.message || '操作未完成，原头像已保留'); }
    finally { busy = false; if (valid()) { paint(); if (focusPaneAfterOperation || doc.activeElement?.closest('[hidden]')) $('tab-' + pane).focus({ preventScroll: true }); focusPaneAfterOperation = false; } }
  }
  async function read() {
    if (busy || !valid()) return;
    profile = null; await operation(async () => {
      status('正在读取人物资料…'); profile = await deps.readProfile(check); check();
      $('profile').value = profile.body || '';
      $('sources').textContent = profile.sources.length ? '来源：' + profile.sources.join('；') : '';
      $('sources').hidden = !profile.sources.length;
      updateExtraHint();
      $('reload').hidden = true; status(profile.warnings.join(' ') || '资料已读取，可补充外貌和画风后生成。');
    });
    if (valid() && !profile) $('reload').hidden = false;
  }
  const profileInput = () => ['头像目标：' + target.name + '（' + ({ char: 'Char', user: 'User', npc: 'NPC' }[target.kind]) + '）', $('profile').value.trim(), '用户补充：' + $('extra').value.trim()].join('\n\n');
  async function prepare(client, requestSignal) {
    if (!$('profile').value.trim() && !$('extra').value.trim()) throw new Error('请先填写人物资料或补充外貌，再生成头像');
    const body = profileInput();
    const result = await client.prepareAvatar({ texts: [body], avatarProfile: body, signal: requestSignal, isCurrent: valid,
      demand: '为上述唯一指定人物设计一张头像。仅使用目标人物资料及用户补充确定长相、性别、年龄和服装，不移植其他人物或当前聊天主角的特征。方形1:1，单人头肩近景，脸部清晰，头顶和头发留出裁切空间，背景简洁，不画文字、聊天界面或拼图。直接写出完整外貌与服装 tag，不依赖人物名或人物变量代替外貌。外貌、服装、表情、画风等以用户补充要求为最高优先级；与人物资料冲突时采用用户补充后的版本，没有补充的细节才参考人物资料。只输出一个符合当前绘图预设格式的有效image块。' });
    check(); if (typeof result?.prompt !== 'string' || !result.prompt.trim()) throw new Error('没有得到有效的绘图 tag');
    $('tag').value = result.prompt; promptPrepared = true; paint();
  }
  function generateAvatar(rewrite = false) {
    if (expandedField) return;
    return operation(async requestSignal => {
      let stage = rewrite || !promptPrepared ? 'tag' : 'image', tagGenerated = false;
      try {
        generationStatus(stage === 'tag' ? (rewrite ? '正在重新生成 tag…（1/2）' : '正在生成头像 tag…（1/2）') : '正在按当前 tag 生成头像…');
        const client = await bridge();
        if (stage === 'tag') {
          status(rewrite ? '智绘姬正在按当前人物资料和补充要求重新生成 tag…' : '智绘姬正在整理头像 tag…');
          await prepare(client, requestSignal); check(); tagGenerated = true;
        }
        if (!$('tag').value.trim()) { stage = 'input'; throw new Error('请先填写绘图 tag，再重新生图'); }
        stage = 'image'; generationStatus(tagGenerated ? '新 tag 已生成，正在按新 tag 生图…（2/2）' : '正在按当前 tag 生成头像…'); status('正在生成头像…');
        const prompt = $('tag').value.trim(), result = await client.generateAvatar({ prompt, signal: requestSignal, isCurrent: valid }); check();
        if (typeof result?.src !== 'string' || !result.src.trim()) throw new Error('智绘姬未返回有效图片');
        const candidate = { id: ++sequence, src: result.src, prompt };
        candidates.push(candidate); if (candidates.length > 4) candidates.shift(); history(); show(candidate);
        generationStatus('头像已生成，可调整裁切后点击“用作头像”。', 'success'); status('可以使用这张头像，也可以改 tag 再生一张。');
      } catch (error) {
        if (valid() && !requestSignal.aborted) {
          const message = stage === 'tag' ? 'tag 生成失败，未开始生图。已有 tag 和头像已保留。'
            : stage === 'input' ? '未开始生图，请先填写绘图 tag。'
            : tagGenerated ? '新 tag 已生成，但头像生成失败。新 tag 已保留，可点“按 tag 重新生图”重试。'
            : '头像生成失败。当前 tag 和已有头像已保留，可点“按 tag 重新生图”重试。';
          generationStatus(message + '\n原因：' + (error?.message || '请求未完成'), 'error');
        }
        throw error;
      }
    });
  }
  $('regenerate-tag').onclick = () => { if (promptPrepared) void generateAvatar(true); };
  $('generate').onclick = $('tag-generate').onclick = () => { void generateAvatar(); };
  $('confirm').onclick = () => operation(async requestSignal => {
    if (!selected) return; const candidate = selected; status('正在保存头像…');
    const data = await (deps.prepareImage || squareAvatar)(candidate.src, { document: doc, signal: requestSignal, crop: { ...candidate.crop } }); check();
    const saved = await deps.commit(data); check(); if (!saved) throw new Error('头像未能保存，原头像已保留'); close();
  });
  const referenceChanged = (message = '人物资料或补充要求已修改。') => {
    updateExtraHint(); paint();
    status(promptPrepared ? '资料已修改，已有 tag 保留。可点“重新生成 tag”应用新要求，也可切换到“绘图 tag”直接修改。' : message + '仅用于本次头像生成。');
  };
  $('profile').oninput = $('extra').oninput = () => referenceChanged();
  $('restore').onclick = () => { if (busy || !profile) return; $('profile').value = profile.body || ''; referenceChanged('已恢复读取原文。'); };
  $('tag').oninput = () => { status('将直接使用你填写的 tag 生图。'); paint(); };
  $('ai').onclick = async () => {
    if (busy || !valid()) return;
    let ready = false;
    await operation(async requestSignal => {
      status('正在检查智绘姬扩展…');
      let client = null;
      try { client = await waitForEntry(Promise.resolve().then(() => deps.bridge()), requestSignal); } catch (error) { if (error?.name === 'AbortError') throw error; }
      check();
      if (avatarBridgeReady(client)) { ready = true; return; }
      let info = { installed: null };
      try { info = await waitForEntry(Promise.resolve().then(() => deps.inspectExtension?.()), requestSignal) || info; } catch (error) { if (error?.name === 'AbortError') throw error; }
      check();
      $('install-message').textContent = info.installed === false ? '暂未安装智绘姬扩展。安装后即可使用头像生图。'
        : info.enabled === false ? '智绘姬扩展已安装但未启用。请在扩展管理中启用，再刷新酒馆。'
        : info.installed === true || client ? '智绘姬扩展已安装，但头像生图入口未加载。请刷新酒馆，仍不可用时更新配套扩展。'
        : '暂时无法确认智绘姬是否就绪，请刷新酒馆后重试。';
      $('install').hidden = false; status('');
    });
    if (ready && valid()) { copyJob?.abort(); $('install').hidden = true; $('choice').hidden = true; $('editor').hidden = false; $('footer').hidden = false; $('tabs').hidden = false; $('main').classList.add('rp-as-editing'); setPane('requirements'); void read(); }
  };
  $('copy-link').onclick = async () => {
    if (copying || !valid()) return;
    copying = true; copyJob = new doc.defaultView.AbortController(); $('copy-link').disabled = true; $('copy-link').textContent = '复制中…'; $('copy-status').textContent = '';
    const previous = doc.activeElement; let copied = false;
    try {
      try {
        const clipboard = doc.defaultView.navigator.clipboard;
        if (typeof clipboard?.writeText === 'function') { await waitForEntry(clipboard.writeText(AVATAR_EXTENSION_LINK), copyJob.signal, 3000); copied = true; }
      } catch (error) { if (error?.name === 'AbortError') return; }
      if (!valid()) return;
      if (!copied) { $('install-url').focus(); $('install-url').select(); $('install-url').setSelectionRange(0, AVATAR_EXTENSION_LINK.length); try { copied = doc.execCommand?.('copy') === true; } catch {} }
      if (!valid()) return;
      if (copied) { $('copy-link').textContent = '已复制'; $('copy-status').textContent = '链接已复制'; if (previous?.isConnected) previous.focus?.(); }
      else { $('copy-link').textContent = '复制链接'; $('copy-status').textContent = '自动复制未成功，地址已选中，可长按复制或按 Ctrl+C。'; }
    } finally { copying = false; if (valid()) $('copy-link').disabled = false; }
  };
  $('reload').onclick = () => { void read(); };
  $('upload').onclick = () => { if (!valid()) return; close(); deps.upload(); };
  $('dismiss').onclick = $('back').onclick = close;
  root.onkeydown = event => {
    if (event.key === 'Escape') { event.preventDefault(); event.stopPropagation(); if (viewingLarge) returnFromLarge(); else if (expandedField) finishExpanded(false); else close(); return; }
    if (event.key !== 'Tab') return;
    const controls = [...root.querySelectorAll('button, textarea, summary, input, [tabindex="0"]')].filter(el => !el.disabled && el.tabIndex !== -1 && !el.closest('[hidden]'));
    const first = controls[0], last = controls.at(-1);
    if (expandedField && doc.activeElement === $('expanded-title')) { event.preventDefault(); (event.shiftKey ? last : first)?.focus(); }
    else if (event.shiftKey && doc.activeElement === first) { event.preventDefault(); last?.focus(); }
    else if (!event.shiftKey && doc.activeElement === last) { event.preventDefault(); first?.focus(); }
  };
  $('upload').focus(); if (signal?.aborted) close();
  return { close, root };
}
