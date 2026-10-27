const cancelled = () => Object.assign(new Error('头像操作已取消'), { name: 'AbortError' });
export function squareAvatar(src, { document: doc, signal } = {}) {
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
        const side = Math.min(w, h); ctx.drawImage(img, (w - side) / 2, (h - side) / 2, side, side, 0, 0, 128, 128);
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
#rp-phone #rp-screen #rp-avatar-studio .rp-as-panel{background:var(--rp-v-surface,#faf7f3);border:1px solid var(--rp-v-border,#ded5d7);border-radius:18px;padding:14px;width:100%;max-height:100%;overflow:auto;box-shadow:0 12px 36px #0002;}
#rp-phone #rp-screen #rp-avatar-studio h3{font-size:16px;font-weight:700;margin:0 0 4px;color:inherit;}
#rp-phone #rp-screen #rp-avatar-studio p{margin:4px 0 10px;font-size:12px;line-height:1.6;color:inherit;}
#rp-phone #rp-screen #rp-avatar-studio button{font:inherit!important;line-height:1.4!important;cursor:pointer!important;min-height:34px!important;padding:8px 10px!important;border-radius:10px!important;border:1px solid var(--rp-v-border,#ded5d7)!important;background:var(--rp-v-card,#fff)!important;color:inherit!important;box-shadow:none!important;text-shadow:none!important;white-space:normal!important;}
#rp-phone #rp-screen #rp-avatar-studio button:disabled{opacity:.5!important;cursor:default!important;}
#rp-phone #rp-screen #rp-avatar-studio button:focus-visible,#rp-phone #rp-screen #rp-avatar-studio textarea:focus-visible{outline:2px solid var(--rp-r-accent,#9a647b)!important;outline-offset:2px;}
#rp-phone #rp-screen #rp-avatar-studio .rp-as-primary{background:var(--rp-r-accent,#9a647b)!important;color:var(--rp-r-on-accent,#fff)!important;border-color:transparent!important;}
#rp-phone #rp-screen #rp-avatar-studio .rp-as-options{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;margin:18px 0 8px;}
#rp-phone #rp-screen #rp-avatar-studio .rp-as-options button{min-width:0!important;width:100%!important;min-height:42px!important;padding:10px 6px!important;white-space:nowrap!important;}
#rp-phone #rp-screen #rp-avatar-studio .rp-as-options button:hover{border-color:var(--rp-r-accent,#9a647b)!important;color:var(--rp-r-accent,#9a647b)!important;}
#rp-phone #rp-screen #rp-avatar-studio #rp-as-dismiss{display:block!important;width:auto!important;min-width:64px!important;min-height:34px!important;margin:0 auto!important;padding:5px 12px!important;border-color:transparent!important;background:transparent!important;color:var(--rp-v-muted,#756772)!important;}
#rp-phone #rp-screen #rp-avatar-studio #rp-as-dismiss:hover{color:var(--rp-v-text,#45383d)!important;}
#rp-phone #rp-screen #rp-avatar-studio #rp-as-status:empty{display:none;}
#rp-phone #rp-screen #rp-avatar-studio label{display:block;margin:10px 0 4px;font-size:12px;font-weight:600;}
#rp-phone #rp-screen #rp-avatar-studio textarea{display:block!important;width:100%!important;min-height:64px!important;max-height:180px!important;resize:vertical!important;padding:8px!important;border:1px solid var(--rp-v-border,#ded5d7)!important;border-radius:10px!important;background:var(--rp-v-card,#fff)!important;color:inherit!important;font-family:inherit!important;font-size:12px!important;line-height:1.5!important;box-shadow:none!important;}
#rp-phone #rp-screen #rp-avatar-studio label[for="rp-as-extra"]{display:flex;align-items:baseline;justify-content:space-between;gap:4px 6px;flex-wrap:wrap;}
#rp-phone #rp-screen #rp-avatar-studio #rp-as-extra-hint{font-size:11px;font-weight:400;color:var(--rp-r-accent,#9a647b);}
#rp-phone #rp-screen #rp-avatar-studio #rp-as-extra{min-height:88px!important;padding:10px 12px!important;border:1.5px solid var(--rp-r-accent,#9a647b)!important;background:var(--rp-v-surface,#fff)!important;cursor:text!important;caret-color:var(--rp-r-accent,#9a647b);box-shadow:inset 0 1px 2px #0000000a!important;}
#rp-phone #rp-screen #rp-avatar-studio #rp-as-extra::placeholder{color:var(--rp-v-muted,#756772)!important;opacity:1!important;}
#rp-phone #rp-screen #rp-avatar-studio #rp-as-extra:focus{border-color:var(--rp-r-accent,#9a647b)!important;outline:2px solid var(--rp-r-accent,#9a647b)!important;outline-offset:2px;}
#rp-phone #rp-screen #rp-avatar-studio #rp-as-extra:disabled{cursor:wait!important;opacity:.65;}
#rp-phone #rp-screen #rp-avatar-studio #rp-as-tag{min-height:80px!important;}
#rp-phone #rp-screen #rp-avatar-studio details{margin:8px 0;border-bottom:1px solid var(--rp-v-border,#ded5d7);padding-bottom:6px;}
#rp-phone #rp-screen #rp-avatar-studio summary{cursor:pointer;font-size:11px;}
#rp-phone #rp-screen #rp-avatar-studio pre{font-family:inherit;font-size:11px;line-height:1.5;white-space:pre-wrap;word-break:break-word;max-height:150px;overflow:auto;margin:6px 0;}
#rp-phone #rp-screen #rp-avatar-studio .rp-as-preview{width:144px;height:144px;border-radius:50%;overflow:hidden;margin:12px auto;background:var(--rp-v-card,#fff);border:1px solid var(--rp-v-border,#ded5d7);display:flex;align-items:center;justify-content:center;}
#rp-phone #rp-screen #rp-avatar-studio .rp-as-preview img{width:100%!important;height:100%!important;object-fit:cover!important;display:block!important;}
#rp-phone #rp-screen #rp-avatar-studio .rp-as-history{display:flex;gap:6px;overflow:auto;min-height:0;margin:6px 0;}
#rp-phone #rp-screen #rp-avatar-studio .rp-as-history button{padding:3px!important;flex:0 0 44px;min-height:44px!important;}
#rp-phone #rp-screen #rp-avatar-studio .rp-as-history button[aria-pressed="true"]{border-color:var(--rp-r-accent,#9a647b)!important;}
#rp-phone #rp-screen #rp-avatar-studio .rp-as-history img{width:36px!important;height:36px!important;object-fit:cover!important;display:block;}
#rp-phone #rp-screen #rp-avatar-studio .rp-as-actions{display:flex;gap:6px;flex-wrap:wrap;margin:9px 0;}
#rp-phone #rp-screen #rp-avatar-studio .rp-as-actions button{flex:1;}
#rp-phone #rp-screen #rp-avatar-studio .rp-as-footer{display:flex;gap:7px;position:sticky;bottom:-14px;padding:10px 0 2px;background:var(--rp-v-surface,#faf7f3);margin-top:8px;}
#rp-phone #rp-screen #rp-avatar-studio .rp-as-footer button{flex:1;}
#rp-phone #rp-screen #rp-avatar-studio [hidden][hidden]{display:none!important;}
`;

export function openAvatarStudio(deps) {
  const { host, target, scope, signal } = deps, doc = host.ownerDocument;
  const previousFocus = doc.activeElement;
  let closed = false, busy = false, job = null, profile = null, selected = null, sequence = 0;
  const candidates = [];
  const root = doc.createElement('div'); root.id = 'rp-avatar-studio'; root.setAttribute('role', 'dialog'); root.setAttribute('aria-modal', 'true'); root.setAttribute('aria-labelledby', 'rp-as-title');
  root.innerHTML = `<div class="rp-as-panel"><h3 id="rp-as-title"></h3><p id="rp-as-scope"></p>
    <div id="rp-as-choice"><div class="rp-as-options"><button id="rp-as-upload">上传图片</button><button id="rp-as-ai">智绘姬生图</button></div><button id="rp-as-dismiss">取消</button></div>
    <div id="rp-as-editor" hidden><details><summary>查看已读取的人物资料</summary><pre id="rp-as-profile"></pre></details>
      <button id="rp-as-reload" hidden>重读人物资料</button><label for="rp-as-extra">补充人设／头像要求<span id="rp-as-extra-hint">选填 · 点击输入</span></label><textarea id="rp-as-extra" aria-describedby="rp-as-extra-hint" maxlength="4000" placeholder="点击这里输入补充要求…&#10;例如：银色短发、绿色眼睛、白衬衫。"></textarea>
      <div class="rp-as-preview"><span id="rp-as-placeholder">头像预览</span><img id="rp-as-image" alt="头像候选预览" hidden></div><div class="rp-as-history" id="rp-as-history" aria-label="本轮头像候选"></div>
      <div id="rp-as-tag-area" hidden><label for="rp-as-tag">绘图 tag（可以修改）</label><textarea id="rp-as-tag" maxlength="20000"></textarea><p>修改 tag 后，点击重新生图才会生效。</p></div>
      <div class="rp-as-actions"><button id="rp-as-generate" class="rp-as-primary">生成头像</button><button id="rp-as-rewrite" hidden>按人设重写 tag</button></div>
      <div class="rp-as-footer"><button id="rp-as-back">取消返回</button><button id="rp-as-confirm" class="rp-as-primary" disabled>用作头像</button></div>
    </div><p id="rp-as-status" role="status" aria-live="polite"></p></div>`;
  const $ = id => root.querySelector('#rp-as-' + id);
  root.querySelectorAll('button').forEach(button => { button.type = 'button'; });
  $('title').textContent = '更换' + target.name + '的头像';
  $('scope').textContent = scope === 'local' ? '应用范围：仅当前聊天' : '应用范围：共用头像';
  host.appendChild(root);
  const valid = () => !closed && !signal?.aborted && deps.isCurrent() !== false;
  const check = () => { if (!valid()) throw cancelled(); };
  const status = text => { if (!closed) $('status').textContent = text; };
  const paint = () => {
    for (const id of ['generate', 'rewrite', 'reload']) $(id).disabled = busy || !profile;
    $('reload').disabled = busy;
    $('confirm').disabled = busy || !selected;
    $('extra').disabled = $('tag').disabled = busy;
    $('generate').textContent = $('tag').value.trim() ? '按 tag 重新生图' : '生成头像';
    for (const button of $('history').children) button.disabled = busy;
  };
  function close() {
    if (closed) return; closed = true; job?.abort(); signal?.removeEventListener('abort', close); root.remove(); deps.onClose?.();
    if (previousFocus?.isConnected) previousFocus.focus?.();
  }
  signal?.addEventListener('abort', close, { once: true });
  function show(candidate) {
    selected = candidate; $('image').src = candidate.src; $('image').hidden = false; $('placeholder').hidden = true; $('tag').value = candidate.prompt;
    for (const button of $('history').children) button.setAttribute('aria-pressed', String(Number(button.dataset.candidate) === candidate.id)); paint();
  }
  function history() {
    $('history').replaceChildren();
    candidates.forEach((candidate, index) => {
      const button = doc.createElement('button'); button.type = 'button'; button.dataset.candidate = String(candidate.id); button.setAttribute('aria-label', '选择候选 ' + (index + 1)); button.setAttribute('aria-pressed', String(candidate === selected));
      const image = doc.createElement('img'); image.src = candidate.src; image.alt = ''; button.appendChild(image); button.onclick = () => { if (!busy && valid()) show(candidate); }; $('history').appendChild(button);
    });
  }
  async function bridge() {
    const value = await deps.bridge(); check();
    if (value?.capabilities?.avatar !== 1 || typeof value.prepareAvatar !== 'function' || typeof value.generateAvatar !== 'function') throw new Error('智绘姬头像入口未加载，请刷新酒馆后重试');
    return value;
  }
  async function operation(fn) {
    if (busy || !valid()) return;
    busy = true; job = new doc.defaultView.AbortController(); paint();
    try { await fn(job.signal); check(); } catch (error) { if (valid() && error?.name !== 'AbortError') status(error?.message || '操作未完成，原头像已保留'); }
    finally { busy = false; if (valid()) paint(); }
  }
  async function read() {
    if (busy || !valid()) return;
    profile = null; await operation(async () => {
      status('正在读取人物资料…'); profile = await deps.readProfile(check); check();
      $('profile').textContent = (profile.sources.length ? '来源：' + profile.sources.join('；') + '\n\n' : '') + (profile.body || '暂无明确资料');
      $('extra-hint').textContent = profile.requiresSupplement ? '必填 · 请补充外貌' : '选填 · 点击输入';
      $('reload').hidden = true; status(profile.warnings.join(' ') || '资料已读取，可补充外貌和画风后生成。');
    });
    if (valid() && !profile) $('reload').hidden = false;
  }
  const profileInput = () => ['头像目标：' + target.name + '（' + ({ char: 'Char', user: 'User', npc: 'NPC' }[target.kind]) + '）', profile?.body || '', '用户补充：' + $('extra').value.trim()].join('\n\n');
  async function prepare(client, requestSignal) {
    if (profile?.requiresSupplement && !$('extra').value.trim()) throw new Error('请先补充这个人物的外貌，再生成头像');
    const body = profileInput();
    const result = await client.prepareAvatar({ texts: [body], avatarProfile: body, signal: requestSignal, isCurrent: valid,
      demand: '为上述唯一指定人物设计一张头像。仅使用目标人物资料及用户补充确定长相、性别、年龄和服装，不移植其他人物或当前聊天主角的特征。方形1:1，单人头肩近景，脸部清晰，头顶和头发留出裁切空间，背景简洁，不画文字、聊天界面或拼图。直接写出完整外貌与服装 tag，不依赖人物名或人物变量代替外貌。未明确的外貌用用户补充为准；只输出一个符合当前绘图预设格式的有效image块。' });
    check(); if (typeof result?.prompt !== 'string' || !result.prompt.trim()) throw new Error('没有得到有效的绘图 tag');
    $('tag').value = result.prompt; $('tag-area').hidden = false; $('rewrite').hidden = false;
  }
  $('generate').onclick = () => operation(async requestSignal => {
    const client = await bridge();
    if (!$('tag').value.trim()) { status('智绘姬正在整理头像 tag…'); await prepare(client, requestSignal); }
    check(); status('正在生成头像…');
    const prompt = $('tag').value.trim(); const result = await client.generateAvatar({ prompt, signal: requestSignal, isCurrent: valid }); check();
    if (typeof result?.src !== 'string') throw new Error('智绘姬未返回有效图片');
    const candidate = { id: ++sequence, src: result.src, prompt };
    candidates.push(candidate); if (candidates.length > 4) candidates.shift(); history(); show(candidate); status('可以使用这张头像，也可以改 tag 再生一张。');
  });
  $('rewrite').onclick = () => operation(async requestSignal => { status('智绘姬正在重新整理 tag…'); await prepare(await bridge(), requestSignal); status('tag 已更新，点击重新生图后查看新效果。'); });
  $('confirm').onclick = () => operation(async requestSignal => {
    if (!selected) return; const candidate = selected; status('正在保存头像…');
    const data = await (deps.prepareImage || squareAvatar)(candidate.src, { document: doc, signal: requestSignal }); check();
    const saved = await deps.commit(data); check(); if (!saved) throw new Error('头像未能保存，原头像已保留'); close();
  });
  $('tag').oninput = paint;
  $('ai').onclick = () => { $('choice').hidden = true; $('editor').hidden = false; void read(); };
  $('reload').onclick = () => { void read(); };
  $('upload').onclick = () => { if (!valid()) return; close(); deps.upload(); };
  $('dismiss').onclick = $('back').onclick = close;
  root.onkeydown = event => {
    if (event.key === 'Escape') { event.preventDefault(); event.stopPropagation(); close(); return; }
    if (event.key !== 'Tab') return;
    const controls = [...root.querySelectorAll('button, textarea, summary')].filter(el => !el.disabled && !el.closest('[hidden]'));
    const first = controls[0], last = controls.at(-1);
    if (event.shiftKey && doc.activeElement === first) { event.preventDefault(); last?.focus(); }
    else if (!event.shiftKey && doc.activeElement === last) { event.preventDefault(); first?.focus(); }
  };
  $('upload').focus(); if (signal?.aborted) close();
  return { close, root };
}
