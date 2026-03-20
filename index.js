// ================================================================
//  INJECT STYLES
//  CSS 从 manifest 的 css 字段移至此处 JS 注入，
//  彻底绕开 SillyTavern 扩展 CSS 加载管线，
//  避免与终端正则美化 <style> 标签的 CSS 解析器产生冲突。
// ================================================================
const RP_PHONE_CSS = `/* ── wrapper ── */
#rp-wrapper { position:fixed; right:20px; bottom:20px; z-index:9998; }

/* ── FAB ── */
#rp-fab {
  position:fixed; right:20px; bottom:20px; z-index:2147483647;
  width:52px; height:52px; border-radius:50%;
  background:rgba(255,255,255,.95); backdrop-filter:blur(12px);
  border:1px solid rgba(0,0,0,.1);
  display:flex; align-items:center; justify-content:center;
  padding:6px; overflow:hidden; cursor:grab;
  box-shadow:0 4px 24px rgba(0,0,0,.18);
  transition:box-shadow .15s;
  user-select:none; touch-action:none;
}
#rp-fab:hover { transform:scale(1.1); }

/* ── phone container ── */
#rp-phone {
  position:fixed; right:84px; bottom:20px; z-index:10000;
  cursor:default;
}


/* ══════════════════════════════════════
   📱 MOBILE RESPONSIVE ADAPTATION
   ══════════════════════════════════════ */
@media (max-width: 768px) {
  #rp-fab {
    width: 32px !important;
    height: 32px !important;
    /* font-size removed: using image icon */
    /* ST 给 html 加 transform 导致 bottom: 失效，必须用 top: calc(100vh) 绕过 */
    top: calc(100vh - 142px) !important;
    bottom: auto !important;
    right: 14px !important;
    left: auto !important;
    transform: none !important;
    background: rgba(255,255,255,.95) !important;
    border: 1px solid rgba(0,0,0,.1) !important;
    box-shadow: 0 4px 24px rgba(0,0,0,.18) !important;
    backdrop-filter: blur(12px) !important;
    z-index: 2147483647 !important;
  }
  /* PC mode: phone stays at fixed right:84px - centering via JS class only */
  #rp-phone.rp-mobile-pos {
    left: calc(50vw - 150px) !important;
    top: calc(50vh - 280px) !important;
    right: auto !important;
    bottom: auto !important;
    transform: none !important;
    z-index: 2147483645 !important;
  }
  #rp-frame {
    width: 300px !important;
    height: 560px !important;
    border-radius: 38px !important;
  }
  #rp-screen {
    border-radius: min(40px, 6vw) !important;
  }
}
@media (max-width: 360px) {
  #rp-frame {
    width: calc(100vw - 16px) !important;
    height: calc(100dvh - 60px) !important;
  }
}
/* ── CSS THEME TOKENS ── */
#rp-phone {
  /* Frame */
  --rp-frame-bg:linear-gradient(160deg,#e8e8e8,#d0d0d0);
  --rp-frame-sh:0 0 0 1.5px rgba(0,0,0,.12),0 0 0 9px #f5f5f5,0 0 0 10px rgba(0,0,0,.08),0 36px 80px rgba(0,0,0,.25),inset 0 1px 0 rgba(255,255,255,.5);
  --rp-btn-bg:#c0c0c0;
  --rp-island-bg:#000;
  --rp-island-ring:#f5f5f5;
  --rp-screen-bg:#fff;
  /* Status bar */
  --rp-sbar-color:#000;
  --rp-bat-border:rgba(0,0,0,.4);
  --rp-bat-nub:rgba(0,0,0,.3);
  /* Lock screen */
  --rp-lock-wall:linear-gradient(rgba(255,230,240,.10),rgba(255,210,225,.12)),url('https://i.postimg.cc/Hx8NSZL6/shou-ji-bi-zhi-fen-xiang-fen-se-da-hai-wen-rou-bao-ji-1-chao-ji-kun-dan-lai-zi-xiao-hong-shu-wang-ye-ban.jpg') center/cover no-repeat;
  --rp-lock-color:#4a1030;
  --rp-lock-time:#e06080;
  --rp-swipe-color:rgba(120,40,70,.4);
  --rp-ln-bg:rgba(255,255,255,.85);
  --rp-ln-bd:rgba(0,0,0,.06);
  --rp-ln-text:rgba(0,0,0,.85);
  /* Home screen */
  --rp-home-wall:linear-gradient(rgba(255,230,240,.08),rgba(255,215,228,.10)),url('https://i.postimg.cc/Hx8NSZL6/shou-ji-bi-zhi-fen-xiang-fen-se-da-hai-wen-rou-bao-ji-1-chao-ji-kun-dan-lai-zi-xiao-hong-shu-wang-ye-ban.jpg') center/cover no-repeat;
  --rp-clock-color:#e06080;
  --rp-app-lbl:#c04870;
  --rp-app-lbl-sh:0 1px 6px rgba(255,255,255,.8);
  --rp-indicator:rgba(0,0,0,.25);
  /* Widget */
  --rp-widget-bg:rgba(255,255,255,.6);
  --rp-widget-bd:rgba(0,0,0,.08);
  --rp-widget-color:#000;
  --rp-wd-fill:linear-gradient(90deg,#2563eb,#60a5fa);
  /* Nav bar */
  --rp-nav-bg:rgba(255,255,255,.72);
  --rp-nav-bd:rgba(255,180,200,.2);
  --rp-nav-title:#4a1030;
  --rp-nav-btn:#c0306a;
  /* Messages / thread */
  --rp-msg-bg:transparent;
  --rp-bubbles-bg:transparent;
  --rp-sent-bg:#2563eb;
  --rp-recv-bg:#e9ecef;
  --rp-recv-color:#000;
  /* Composer */
  --rp-composer-bg:rgba(255,255,255,.75);
  --rp-composer-bd:rgba(255,180,200,.2);
  --rp-input-bg:rgba(0,0,0,.04);
  --rp-input-bd:rgba(0,0,0,.12);
  --rp-input-color:#000;
  --rp-send-bg:linear-gradient(135deg,#e0567a,#f472b6);
  /* Themes view */
  /* Shape & Animation tokens */
  --rp-ico-radius:13px;
  --rp-ico-sh:0 2px 10px rgba(0,0,0,.15);
  --rp-ico-hover-sh:0 6px 20px rgba(0,0,0,.18);
  --rp-ico-hover-lift:translateY(-2px) scale(1.06);
  --rp-ico-active:scale(.84);
  --rp-send-size:34px;
  --rp-send-radius:17px;
  --rp-send-sh:0 2px 8px rgba(37,99,235,.35);
  --rp-send-hover-sh:0 4px 14px rgba(37,99,235,.5);
  --rp-input-radius:22px;
  --rp-input-sh:none;
  --rp-input-focus-sh:0 0 0 3px rgba(37,99,235,.15);
  --rp-bubble-radius:19px;
  --rp-bubble-radius-out:19px 19px 5px 19px;
  --rp-bubble-radius-in:19px 19px 19px 5px;
  --rp-nav-btn-radius:0px;
  --rp-nav-sh:none;
  --rp-thread-radius:0px;
  --rp-thread-mx:0px;
  --rp-thread-sh:none;
  --rp-moment-radius:0px;
  --rp-widget-radius:18px;
  --rp-widget-sh:0 2px 12px rgba(0,0,0,.08);
  --rp-transition:transform .12s ease, box-shadow .12s ease;
  --rp-themes-bg:transparent;
  --rp-themes-label:#7c3aed;
  --rp-tc-bg:#fff;
  /* Thread list */
  --rp-threads-bg:transparent;
  --rp-thread-bd:rgba(0,0,0,.08);
  --rp-thread-hover:rgba(0,0,0,.03);
  --rp-tn-color:#000;
  --rp-tp-color:rgba(0,0,0,.5);
  --rp-tt-color:rgba(0,0,0,.4);
  --rp-hd-name:rgba(0,0,0,.6);
  --rp-bts-color:rgba(0,0,0,.4);
  /* Moments */
  --rp-moments-bg:transparent;
  --rp-moment-card:#fff;
  --rp-moment-name:#2563eb;
  --rp-moment-text:#1a1a1a;
  --rp-moment-bd:rgba(0,0,0,.06);
}

/* ── Star Night Theme ── */
#rp-phone.rp-theme-star {
  --rp-frame-bg:linear-gradient(160deg,#2c1070,#1a0850);
  --rp-frame-sh:0 0 0 1.5px rgba(100,60,200,.3),0 0 0 9px #0e0a30,0 0 0 10px rgba(100,60,200,.15),0 36px 80px rgba(0,0,0,.7),inset 0 1px 0 rgba(120,80,255,.2);
  --rp-btn-bg:#3a1a80;
  --rp-island-bg:#0a0620;
  --rp-island-ring:#0e0a30;
  --rp-screen-bg:transparent;
  --rp-sbar-color:#c8c0f5;
  --rp-bat-border:rgba(180,160,255,.4);
  --rp-bat-nub:rgba(180,160,255,.3);
  --rp-lock-wall:linear-gradient(rgba(8,4,20,.35),rgba(12,6,30,.4)),url('https://i.postimg.cc/DfjgWdyn/wan-an-bi-zhi-an-se-xi-hua-hua-bi-zhi-1-bai-le-you-de-bai-lai-zi-xiao-hong-shu-wang-ye-ban.jpg') center/cover no-repeat;
  --rp-lock-color:#e8e0ff;
  --rp-lock-time:#f2eeff;
  --rp-swipe-color:rgba(180,160,255,.3);
  --rp-ln-bg:rgba(15,10,42,.88);
  --rp-ln-bd:rgba(150,120,255,.12);
  --rp-ln-text:rgba(220,210,255,.85);
  --rp-home-wall:linear-gradient(rgba(8,4,20,.32),rgba(12,6,30,.38)),url('https://i.postimg.cc/DfjgWdyn/wan-an-bi-zhi-an-se-xi-hua-hua-bi-zhi-1-bai-le-you-de-bai-lai-zi-xiao-hong-shu-wang-ye-ban.jpg') center/cover no-repeat;
  --rp-clock-color:#f2eeff;
  --rp-app-lbl:rgba(225,215,255,.95);
  --rp-app-lbl-sh:0 1px 4px rgba(0,0,0,.85);
  --rp-indicator:rgba(255,255,255,.22);
  --rp-widget-bg:rgba(14,10,45,.82);
  --rp-widget-bd:rgba(140,110,255,.18);
  --rp-widget-color:#e8e0ff;
  --rp-wd-fill:linear-gradient(90deg,#7c3aed,#a855f7);
  --rp-nav-bg:rgba(12,6,30,.78);
  --rp-nav-bd:rgba(168,85,247,.2);
  --rp-nav-title:#e8e0ff;
  --rp-nav-btn:#a78bfa;
  --rp-msg-bg:transparent;
  --rp-bubbles-bg:transparent;
  --rp-sent-bg:linear-gradient(135deg,#5b21b6,#7c3aed);
  --rp-recv-bg:rgba(40,28,90,.9);
  --rp-recv-color:#ddd4ff;
  --rp-composer-bg:rgba(10,8,30,.97);
  --rp-composer-bd:rgba(140,110,255,.12);
  --rp-input-bg:rgba(255,255,255,.06);
  --rp-input-bd:rgba(140,110,255,.2);
  --rp-input-color:#e0d8ff;
  --rp-send-bg:linear-gradient(135deg,#6d28d9,#a855f7);
  /* Shape & Animation */
  --rp-ico-radius:8px;
  --rp-ico-sh:0 2px 12px rgba(0,0,0,.6),0 0 0 1px rgba(140,110,255,.15);
  --rp-ico-hover-sh:0 0 16px rgba(168,85,247,.7),0 0 0 1px rgba(168,85,247,.5);
  --rp-ico-hover-lift:translateY(-1px) scale(1.04);
  --rp-ico-active:scale(.88);
  --rp-send-size:34px;
  --rp-send-radius:8px;
  --rp-send-sh:0 0 12px rgba(109,40,217,.6);
  --rp-send-hover-sh:0 0 20px rgba(168,85,247,.85);
  --rp-input-radius:8px;
  --rp-input-sh:inset 0 0 0 1px rgba(140,110,255,.2);
  --rp-input-focus-sh:0 0 0 2px rgba(168,85,247,.5),inset 0 0 8px rgba(140,110,255,.1);
  --rp-bubble-radius:8px;
  --rp-bubble-radius-out:8px 8px 2px 8px;
  --rp-bubble-radius-in:8px 8px 8px 2px;
  --rp-nav-btn-radius:6px;
  --rp-nav-sh:0 1px 0 rgba(140,110,255,.15);
  --rp-thread-radius:0px;
  --rp-thread-mx:0px;
  --rp-thread-sh:none;
  --rp-moment-radius:0px;
  --rp-widget-radius:10px;
  --rp-widget-sh:0 0 20px rgba(109,40,217,.3),0 0 0 1px rgba(140,110,255,.2);
  --rp-transition:transform .08s ease, box-shadow .08s ease;
  --rp-themes-bg:transparent;
  --rp-themes-label:#c8b4ff;
  --rp-tc-bg:rgba(20,14,55,.9);
  --rp-threads-bg:transparent;
  --rp-thread-bd:rgba(140,110,255,.1);
  --rp-thread-hover:rgba(255,255,255,.03);
  --rp-tn-color:#e0d8ff;
  --rp-tp-color:rgba(180,165,255,.5);
  --rp-tt-color:rgba(180,165,255,.4);
  --rp-hd-name:rgba(180,165,255,.7);
  --rp-bts-color:rgba(180,165,255,.35);
  --rp-moments-bg:transparent;
  --rp-moment-card:rgba(20,14,55,.9);
  --rp-moment-name:#a78bfa;
  --rp-moment-text:#d5ccff;
  --rp-moment-bd:rgba(140,110,255,.1);
}

/* ── frame (iPhone 15 Pro) ── */
#rp-frame {
  position:relative; width:286px; height:580px;
  background:var(--rp-frame-bg);
  border-radius:50px;
  box-shadow:var(--rp-frame-sh);
  padding:11px;
}

/* side buttons */
.rp-btn { position:absolute; border-radius:2px; background:var(--rp-btn-bg); }
.rp-vol-up  { left:-3px; top:88px;  width:3px; height:34px; }
.rp-vol-dn  { left:-3px; top:130px; width:3px; height:34px; }
.rp-power   { right:-3px; top:106px; width:3px; height:46px; }

/* ── screen ── */
#rp-screen {
  width:100%; height:100%;
  background:var(--rp-home-wall), var(--rp-screen-bg);
  background-size:cover;
  background-position:center;
  border-radius:40px; overflow:hidden;
  position:relative;
  font-family:-apple-system,'SF Pro Display','Helvetica Neue',sans-serif;
  image-rendering: -webkit-optimize-contrast;
  image-rendering: crisp-edges;
}

/* Dynamic Island */
#rp-island {
  position:absolute; top:11px; left:50%; transform:translateX(-50%);
  width:86px; height:28px; background:var(--rp-island-bg); border-radius:20px; z-index:200;
  box-shadow:0 0 0 2px var(--rp-island-ring);
}

/* ── status bar ── */
#rp-sbar {
  position:absolute; top:0; left:0; right:0; height:48px;
  display:flex; align-items:flex-end; justify-content:space-between;
  padding:0 20px 7px; z-index:199; color:var(--rp-sbar-color);
  font-size:12px; font-weight:600; letter-spacing:-.2px;
}
.rp-sbar-r { display:flex; align-items:center; gap:6px; }
#rp-bat { width:22px; height:11px; border:1.5px solid var(--rp-bat-border); border-radius:3px; padding:1.5px; position:relative; }
#rp-bat::after { content:''; position:absolute; right:-4px; top:50%; transform:translateY(-50%); width:2px; height:5px; background:var(--rp-bat-nub); border-radius:0 1px 1px 0; }
#rp-bat-fill { height:100%; width:85%; background:#34c759; border-radius:1.5px; }

/* ── views ── */
.rp-view { position:absolute; inset:0; overflow:hidden; }

/* ── LOCK SCREEN ── */
.rp-lock-bg {
  position:absolute; inset:0;
  background:var(--rp-lock-wall);
}
.rp-lock-body {
  position:absolute; inset:0;
  display:flex; flex-direction:column; align-items:center; padding-top:64px;
  cursor:pointer; color:var(--rp-lock-color);
}
#rp-lock-time {
  font-size:70px; font-weight:100; letter-spacing:-4px; line-height:1;
  color:var(--rp-lock-time); text-shadow:0 2px 8px rgba(0,0,0,.08);
}
#rp-lock-date { display:none !important; }
#rp-lock-notifs { width:100%; padding:14px 16px; display:flex; flex-direction:column; gap:8px; margin-top:10px; }
.rp-ln {
  background:var(--rp-ln-bg); backdrop-filter:blur(24px);
  border:1px solid var(--rp-ln-bd); border-radius:14px;
  padding:10px 14px; display:flex; flex-direction:column; gap:4px;
  box-shadow:0 2px 8px rgba(0,0,0,.08);
}
.rp-ln-type { font-size:10px; font-weight:700; color:rgba(0,0,0,.4); text-transform:uppercase; letter-spacing:.6px; }
.rp-ln-text { font-size:12px; color:var(--rp-ln-text); line-height:1.4; }

#rp-swipe-hint {
  position:absolute; bottom:30px; left:0; right:0; text-align:center;
  font-size:12px; color:var(--rp-swipe-color);
  animation:rp-breathe 2.2s ease-in-out infinite;
}
@keyframes rp-breathe { 0%,100%{opacity:.2} 50%{opacity:.5} }
#rp-swipe-zone { position:absolute; inset:0; cursor:pointer; }

/* ── HOME SCREEN ── */
.rp-home-bg {
  position:absolute; inset:0;
  background:transparent;
}
.rp-home-body { position:absolute; inset:0; display:flex; flex-direction:column; align-items:center; padding-top:54px; }
#rp-home-clock { font-size:52px; font-weight:100; color:var(--rp-clock-color); letter-spacing:-3px; margin-bottom:22px; }

/* app grid */
#rp-app-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:14px; padding:0 18px; width:100%; }
.rp-app { display:flex; flex-direction:column; align-items:center; gap:5px; cursor:pointer; transition:transform .12s; }
.rp-app:active .rp-app-ico { transform:var(--rp-ico-active); }
.rp-app:not(:active):hover .rp-app-ico { transform:var(--rp-ico-hover-lift); box-shadow:var(--rp-ico-hover-sh); }
.rp-app-off { opacity:.35; pointer-events:none; }
.rp-app-ico {
  width:52px; height:52px; border-radius:var(--rp-ico-radius);
  display:flex; align-items:center; justify-content:center; font-size:26px;
  position:relative; box-shadow:var(--rp-ico-sh);
  transition:var(--rp-transition);
}
.rp-app-ico svg { width:100%; height:100%; }
.rp-app-lbl { font-size:10px; color:var(--rp-app-lbl); text-shadow:var(--rp-app-lbl-sh); }
.rp-badge {
  position:absolute; top:-5px; right:-5px;
  background:#ff3b30; color:#fff; font-size:10px; font-weight:700;
  min-width:17px; height:17px; border-radius:9px; padding:0 4px;
  display:flex; align-items:center; justify-content:center;
  border:1.5px solid #fff;
}

/* widget */
#rp-widget {
  background:var(--rp-widget-bg);
  border:1px solid var(--rp-widget-bd); border-radius:var(--rp-widget-radius);
  margin:18px 16px 0; padding:13px 16px; width:calc(100% - 32px); color:var(--rp-widget-color);
  box-shadow:var(--rp-widget-sh);
}
.rp-wd-label { font-size:10px; text-transform:uppercase; letter-spacing:.8px; opacity:.45; font-weight:600; }
.rp-wd-stage { font-size:14px; font-weight:600; margin:5px 0 7px; }
.rp-wd-track { height:3px; background:rgba(0,0,0,.08); border-radius:2px; overflow:hidden; }
.rp-wd-fill  { height:100%; width:0%; background:var(--rp-wd-fill); border-radius:2px; transition:width .9s ease; }
.rp-wd-status { font-size:11px; opacity:.55; margin-top:7px; }

.rp-home-indicator { position:absolute; bottom:8px; left:50%; transform:translateX(-50%); width:90px; height:4px; background:var(--rp-indicator); border-radius:2px; }

/* ── MESSAGES VIEW ── */
#rp-view-messages { background:transparent !important; display:flex; flex-direction:column; }
#rp-thread-list { flex:1; overflow-y:auto; scrollbar-width:none; }
#rp-thread-list::-webkit-scrollbar { display:none; }

.rp-thread {
  display:flex; align-items:center; gap:12px;
  padding:11px 16px; border-bottom:1px solid var(--rp-thread-bd);
  cursor:pointer; transition:background .12s;
}
.rp-thread:hover { background:var(--rp-thread-hover); }

.rp-av { width:46px; height:46px; border-radius:23px; flex-shrink:0; display:flex; align-items:center; justify-content:center; font-size:13px; font-weight:700; color:#fff; }
.rp-ti { flex:1; min-width:0; }
.rp-tn { font-size:14px; font-weight:600; color:var(--rp-tn-color); }
.rp-tp { font-size:12px; color:var(--rp-tp-color); overflow:hidden; text-overflow:ellipsis; white-space:nowrap; margin-top:2px; }
.rp-tm { display:flex; flex-direction:column; align-items:flex-end; gap:5px; }
.rp-tt { font-size:11px; color:var(--rp-tt-color); }
.rp-tbadge { background:#2563eb; color:#fff; font-size:10px; font-weight:700; min-width:19px; height:19px; border-radius:10px; padding:0 5px; display:flex; align-items:center; justify-content:center; }

/* ── THREAD VIEW ── */
#rp-view-thread { background:transparent !important; display:flex; flex-direction:column; }

/* bubbles */
#rp-bubbles { flex:1; overflow-y:auto; padding:10px; display:flex; flex-direction:column; gap:3px; scrollbar-width:none; }
#rp-bubbles::-webkit-scrollbar { display:none; }

/* FIX3: 待发消息队列预览 */
#rp-pending-queue {
  padding:6px 12px 4px;
  display:flex; flex-direction:column; gap:3px;
  flex-shrink:0;
  max-height:76px; overflow-y:auto;
  border-top:1px solid rgba(37,99,235,.15);
  background:rgba(37,99,235,.04);
  scrollbar-width:none;
}
#rp-pending-queue::-webkit-scrollbar { display:none; }
.rp-pending-item {
  font-size:11px; color:#1d4ed8;
  background:rgba(37,99,235,.1);
  border-radius:8px; padding:3px 10px;
  white-space:nowrap; overflow:hidden; text-overflow:ellipsis;
}
.rp-pending-hint {
  font-size:10px; color:rgba(0,0,0,.35);
  text-align:center; padding:1px 0 2px;
}

.rp-bwrap { display:flex; flex-direction:column; gap:2px; }
.rp-out { align-items:flex-end; }
.rp-in  { align-items:flex-start; }
.rp-bubble { max-width:72%; padding:9px 13px; border-radius:19px; font-size:13px; line-height:1.45; word-break:break-word; }
.rp-sent { background:var(--rp-sent-bg); color:#fff; border-radius:var(--rp-bubble-radius-out); }
.rp-recv { background:var(--rp-recv-bg); color:var(--rp-recv-color); border-radius:var(--rp-bubble-radius-in); }
.rp-bts  { font-size:10px; color:var(--rp-bts-color); padding:0 4px; }

/* composer */
#rp-composer {
  display:flex !important;
  align-items:center !important;
  gap:8px !important;
  padding:8px 12px 22px !important;
  border-top:1px solid var(--rp-composer-bd) !important;
  flex-shrink:0 !important;
  background:var(--rp-composer-bg) !important;
}
#rp-input {
  flex:1 !important;
  background:var(--rp-input-bg) !important;
  border:1px solid var(--rp-input-bd) !important;
  border-radius:var(--rp-input-radius) !important;
  padding:9px 16px !important;
  color:var(--rp-input-color) !important;
  box-shadow:var(--rp-input-sh) !important;
  transition:box-shadow .18s ease, border-color .18s ease !important;
  font-size:13px !important;
  outline:none !important;
  font-family:inherit !important;
  min-width:0 !important;
  box-sizing:border-box !important;
}
#rp-input::placeholder { color:rgba(0,0,0,.4); }
#rp-input:focus { box-shadow:var(--rp-input-focus-sh) !important; border-color:rgba(0,0,0,.3) !important; }

/* ✅ FIX2: 强制显示发送按钮，防止 SillyTavern 全局 CSS 覆盖 */
#rp-send {
  width:var(--rp-send-size) !important;
  height:var(--rp-send-size) !important;
  min-width:var(--rp-send-size) !important;
  border-radius:var(--rp-send-radius) !important;
  background:var(--rp-send-bg) !important;
  border:none !important;
  color:#fff !important;
  font-size:16px !important;
  font-weight:700 !important;
  cursor:pointer !important;
  display:flex !important;
  align-items:center !important;
  justify-content:center !important;
  flex-shrink:0 !important;
  box-shadow:var(--rp-send-sh) !important;
  transition:var(--rp-transition), opacity .15s !important;
  visibility:visible !important;
  opacity:1 !important;
  pointer-events:auto !important;
  padding:0 !important;
  margin:0 !important;
  line-height:1 !important;
  box-shadow:none !important;
  outline:none !important;
}
#rp-send:hover { opacity:.92 !important; box-shadow:var(--rp-send-hover-sh) !important; transform:scale(1.06) !important; }

/* ── NAV BAR (共用) ── */
.rp-nav-bar {
  height:92px; padding-top:46px; flex-shrink:0;
  display:flex; align-items:center; justify-content:space-between;
  padding-left:6px; padding-right:16px;
  position:relative;
  background:transparent;
  border-bottom:1px solid transparent;
}

.rp-nav-title {position:absolute;left:0;right:0;text-align:center;pointer-events:none;font-size:16px;font-weight:600;color:var(--rp-nav-title);}
.rp-back {
  background:none !important; border:none !important;
  color:var(--rp-nav-btn) !important; font-size:30px !important;
  line-height:1 !important; cursor:pointer !important;
  padding:0 6px !important; font-family:inherit !important;
  display:inline-flex !important; visibility:visible !important;
  opacity:1 !important; pointer-events:auto !important;
}
.rp-nav-add {
  background:none !important; border:none !important;
  color:var(--rp-nav-btn) !important; font-size:28px !important;
  line-height:1 !important; cursor:pointer !important;
  padding:0 6px !important; font-family:inherit !important;
  font-weight:300 !important; display:inline-flex !important;
  visibility:visible !important; opacity:1 !important;
  pointer-events:auto !important;
}
.rp-thread-hd { display:flex; flex-direction:column; align-items:center; gap:4px; }
.rp-hd-av { width:32px; height:32px; border-radius:16px; display:flex; align-items:center; justify-content:center; font-size:11px; font-weight:700; color:#fff; }
.rp-hd-name { font-size:11px; color:var(--rp-hd-name); }

/* ── ADD CONTACT MODAL ── */
/* ✅ FIX3: modal 已移至 #rp-screen 内部，position:absolute; inset:0 现在正确覆盖手机屏幕 */
#rp-add-modal {
  position:absolute; inset:0; z-index:600;
  background:rgba(0,0,0,.4); backdrop-filter:blur(8px);
  display:flex; align-items:center; justify-content:center;
  padding:20px;
}
#rp-add-form {
  background:#fff; border-radius:18px;
  padding:20px; width:100%; max-width:240px;
  box-shadow:0 12px 40px rgba(0,0,0,.3);
}
#rp-add-form h3 {
  margin:0 0 16px; font-size:18px; font-weight:600; color:#000; text-align:center;
}
#rp-add-form input {
  width:100%; padding:10px 12px; margin-bottom:12px;
  border:1px solid rgba(0,0,0,.15); border-radius:10px;
  font-size:14px; font-family:inherit; color:#000;
  background:rgba(0,0,0,.02); outline:none; box-sizing:border-box;
}
#rp-add-form input::placeholder { color:rgba(0,0,0,.4); }
#rp-add-btns {
  display:flex; gap:10px; margin-top:16px;
}
#rp-add-btns button {
  flex:1 !important; padding:10px !important; border:none !important; border-radius:10px !important;
  font-size:14px !important; font-weight:600 !important; cursor:pointer !important;
  font-family:inherit !important; transition:opacity .15s;
  display:flex !important; align-items:center !important; justify-content:center !important;
  visibility:visible !important; opacity:1 !important; pointer-events:auto !important;
}
#rp-add-btns button:hover { opacity:.8 !important; }
#rp-add-cancel { background:#e9ecef !important; color:#000 !important; }
#rp-add-confirm { background:#2563eb !important; color:#fff !important; }

/* ── NOTIFICATION BANNER ── */
#rp-notif-banner {
  position:absolute; top:52px; left:10px; right:10px;
  background:rgba(255,255,255,.95); backdrop-filter:blur(24px);
  border:1px solid rgba(0,0,0,.08); border-radius:15px;
  padding:11px 13px; display:flex; align-items:center; gap:10px;
  z-index:500; box-shadow:0 6px 24px rgba(0,0,0,.2);
  transform:translateY(-130%); transition:transform .38s cubic-bezier(.34,1.56,.64,1);
}
#rp-notif-banner.rp-nb-in { transform:translateY(0); }
.rp-nb-ico { font-size:22px; flex-shrink:0; }
.rp-nb-body { flex:1; min-width:0; }
.rp-nb-from { font-size:11px; font-weight:600; color:rgba(0,0,0,.5); }
.rp-nb-text { font-size:13px; color:#000; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
.rp-nb-time { font-size:11px; color:rgba(0,0,0,.4); align-self:flex-start; flex-shrink:0; }

/* ── home indicator ── */
#rp-home-ind { position:absolute; bottom:7px; left:50%; transform:translateX(-50%); width:90px; height:4px; background:rgba(0,0,0,.25); border-radius:2px; z-index:300; }
/* dark mode toggle is now an app icon on home screen */
/* ── DARK FRAME ── */
.rp-dark #rp-frame{background:linear-gradient(160deg,#1e1e1e,#101010);box-shadow:0 0 0 1.5px rgba(255,255,255,.06),0 0 0 9px #0c0c0c,0 0 0 10px rgba(255,255,255,.04),0 36px 80px rgba(0,0,0,.7),inset 0 1px 0 rgba(255,255,255,.06)}
.rp-dark .rp-btn{background:#2c2c2c}
.rp-dark #rp-screen{background:var(--rp-home-wall);background-size:cover;background-position:center}
.rp-dark #rp-island{background:#0a0a0a}
/* ── DARK LOCK ── */
.rp-dark .rp-lock-bg{background:radial-gradient(ellipse 120% 80% at 30% 15%,rgba(80,60,200,.35),transparent 55%),radial-gradient(ellipse 100% 80% at 80% 85%,rgba(40,60,200,.25),transparent 55%),linear-gradient(180deg,#0c0c1a,#08080f,#0c0c1a)}
.rp-dark .rp-lock-body{color:#e0e2f0}
.rp-dark #rp-lock-time{color:#eef0ff}
.rp-dark #rp-lock-date{display:none!important}
.rp-dark .rp-ln{background:rgba(12,12,24,.88);border-color:rgba(255,255,255,.07)}
.rp-dark .rp-ln-type{color:rgba(160,175,255,.45)}
.rp-dark .rp-ln-text{color:rgba(210,218,255,.85)}
.rp-dark #rp-swipe-hint{color:rgba(180,195,255,.3)}
.rp-dark #rp-sbar{color:#dde0f2}
/* ── DARK HOME ── */
.rp-dark .rp-home-bg{background:radial-gradient(ellipse 100% 70% at 20% 10%,rgba(50,60,140,.38),transparent 50%),radial-gradient(ellipse 100% 70% at 80% 90%,rgba(30,50,130,.28),transparent 50%),linear-gradient(170deg,#0c0c1a,#090912,#0c0c1a)}
.rp-dark #rp-home-clock{color:#eef0ff}
.rp-dark .rp-app-lbl{color:rgba(210,218,255,.88);text-shadow:0 1px 3px rgba(0,0,0,.7)}
.rp-dark .rp-app-ico{box-shadow:0 2px 10px rgba(0,0,0,.5)}
.rp-dark .rp-app-off{opacity:.2}
.rp-dark #rp-widget{background:rgba(12,12,24,.78);border-color:rgba(255,255,255,.07);box-shadow:0 2px 12px rgba(0,0,0,.4)}


/* ══════════════════════════════════════════════════════
   THEME ICON SYSTEM - each theme gets its own visual language
   ══════════════════════════════════════════════════════ */

/* ── Base: remove all hardcoded inline bg on icons ── */
#rp-phone .rp-app-ico {
  background: transparent !important;
  box-shadow: none !important;
  border: none !important;
  font-size: 28px !important;
  transition: transform .14s ease, filter .14s ease !important;
  filter: drop-shadow(0 1px 4px rgba(0,0,0,.35)) !important;
}
#rp-phone .rp-app-ico:active { transform: scale(.88) !important; }

/* ══ 🌸 CANDY: PINK BUBBLES - perfect circles, pearl glass ══ */
#rp-phone.rp-theme-candy .rp-app-ico {
  background: transparent !important;
  border: none !important;
  box-shadow: none !important;
  font-size: 26px !important;
  filter: drop-shadow(0 1px 4px rgba(200,60,90,.55)) drop-shadow(0 0 6px rgba(255,255,255,.6)) !important;
}
#rp-phone.rp-theme-candy .rp-app-ico:active {
  transform: scale(.88) !important;
  box-shadow: 0 3px 10px rgba(200,100,140,.3), inset 0 1px 0 rgba(255,255,255,.6) !important;
}
#rp-phone.rp-theme-candy .rp-app-lbl {
  color: #7a1038 !important;
  font-size: 10px !important;
  font-weight: 600 !important;
  text-shadow: 0 1px 4px rgba(255,255,255,.7);
}
/* Candy widget: pearl pink glass */
#rp-phone.rp-theme-candy #rp-widget {
  background: rgba(255,228,238,.62) !important;
  border: 1.5px solid rgba(220,130,165,.28) !important;
  box-shadow: 0 8px 28px rgba(200,100,140,.18), inset 0 1px 0 rgba(255,255,255,.7) !important;
  border-radius: 22px !important;
}
#rp-phone.rp-theme-candy #rp-home-clock {
  color: #c03060 !important;
  font-weight: 200 !important;
  font-size: 58px !important;
  letter-spacing: -3px !important;
  text-shadow:
    0 0 28px rgba(255,255,255,.92),
    0 0 10px rgba(255,255,255,.7),
    0 2px 6px rgba(255,255,255,.4) !important;
}
/* Candy nav bars: transparent */
#rp-phone.rp-theme-candy .rp-nav-bar {
  background: transparent !important;
  border-bottom: 1px solid rgba(220,130,165,.15) !important;
}
/* Candy send button: rose circle */
#rp-phone.rp-theme-candy #rp-send {
  background: linear-gradient(135deg, #e8648a, #f472b6) !important;
  border-radius: 50% !important;
  box-shadow: 0 4px 16px rgba(220,80,130,.35) !important;
}
#rp-phone.rp-theme-candy #rp-input {
  border-color: rgba(220,130,165,.35) !important;
  border-radius: 20px !important;
}
/* Candy thread list items */
#rp-phone.rp-theme-candy .rp-av {
  border-radius: 50% !important;
  box-shadow: 0 3px 12px rgba(200,100,140,.2) !important;
}

/* Candy outgoing bubble polish (only candy/default) */
#rp-phone:not(.rp-theme-star):not(.rp-theme-misty) .rp-sent,
#rp-phone.rp-theme-candy .rp-sent {
  background: linear-gradient(135deg,#ff7fb1 0%, #f06292 48%, #e34a86 100%) !important;
  border: 1px solid rgba(255,255,255,.42) !important;
  box-shadow: 0 4px 12px rgba(198,64,116,.34), inset 0 1px 0 rgba(255,255,255,.36) !important;
  color:#fff !important;
}
#rp-phone:not(.rp-theme-star):not(.rp-theme-misty) .rp-out .rp-bts,
#rp-phone.rp-theme-candy .rp-out .rp-bts {
  color: rgba(126, 34, 78, .58) !important;
}

/* ══ ✨ STAR: DARK TECH CHIPS - sharp rectangles, neon glow ══ */
#rp-phone.rp-theme-star .rp-app-ico {
  background: transparent !important;
  border: none !important;
  box-shadow: none !important;
  font-size: 24px !important;
  filter: drop-shadow(0 0 6px rgba(160,130,255,.7)) drop-shadow(0 1px 3px rgba(0,0,0,.5)) !important;
}
#rp-phone.rp-theme-star .rp-app-ico:active {
  transform: scale(.9) !important;
  box-shadow: 0 0 20px rgba(140,80,255,.5), 0 2px 8px rgba(0,0,0,.7) !important;
}
#rp-phone.rp-theme-star .rp-app-lbl {
  color: rgba(210,195,255,.9) !important;
  font-size: 10px !important;
  font-weight: 500 !important;
  text-shadow: 0 0 8px rgba(140,80,255,.6);
}
/* Star widget: deep space glass */
#rp-phone.rp-theme-star #rp-widget {
  background: rgba(14,8,40,.88) !important;
  border: 1px solid rgba(150,100,255,.35) !important;
  box-shadow: 0 0 20px rgba(100,50,220,.25), 0 8px 32px rgba(0,0,0,.7) !important;
  border-radius: 14px !important;
}
#rp-phone.rp-theme-star #rp-home-clock {
  color: #d4ccff !important;
  font-weight: 100 !important;
  text-shadow: 0 0 30px rgba(140,100,255,.4) !important;
}
/* Star nav bars: transparent */
#rp-phone.rp-theme-star .rp-nav-bar {
  background: transparent !important;
  border-bottom: 1px solid rgba(150,100,255,.15) !important;
}
/* Star send button: purple neon */
#rp-phone.rp-theme-star #rp-send {
  background: linear-gradient(135deg, #6d28d9, #8b5cf6) !important;
  border-radius: 10px !important;
  box-shadow: 0 0 14px rgba(120,60,255,.5) !important;
}
#rp-phone.rp-theme-star #rp-input {
  border-color: rgba(150,100,255,.4) !important;
  border-radius: 8px !important;
  background: rgba(20,12,50,.6) !important;
  color: #e0d4ff !important;
}
/* Star thread items: purple chip hover */
#rp-phone.rp-theme-star .rp-av {
  border-radius: 10px !important;
  box-shadow: 0 0 8px rgba(120,60,255,.25) !important;
}

/* ══ 🌿 MISTY: WATERCOLOR OVALS - soft rounded, pearl white ══ */
#rp-phone.rp-theme-misty .rp-app-ico {
  background: transparent !important;
  border: none !important;
  box-shadow: none !important;
  filter: drop-shadow(0 1px 3px rgba(0,20,60,.45)) drop-shadow(0 0 5px rgba(0,10,40,.25)) !important;
}
#rp-phone.rp-theme-misty .rp-app-ico:active {
  transform: scale(.9) !important;
  box-shadow: 0 3px 12px rgba(100,145,195,.25), inset 0 1px 0 rgba(255,255,255,.5) !important;
}
#rp-phone.rp-theme-misty .rp-app-lbl {
  color: rgba(218,238,253,.91) !important;
  font-size: 10px !important;
  font-weight: 500 !important;
  text-shadow: 0 1px 3px rgba(0,20,60,.58), 0 0 6px rgba(0,10,40,.38) !important;
}
/* Misty widget: white-blue glass */
#rp-phone.rp-theme-misty #rp-widget {
  background: rgba(240,248,255,.62) !important;
  border: 1.5px solid rgba(130,175,215,.3) !important;
  box-shadow: 0 8px 28px rgba(100,145,195,.15), inset 0 1px 0 rgba(255,255,255,.7) !important;
  border-radius: 22px !important;
}
#rp-phone.rp-theme-misty #rp-home-clock {
  color: rgba(220,238,252,.92) !important;
  font-weight: 100 !important;
  letter-spacing: -2px !important;
  text-shadow: 0 1px 6px rgba(0,20,60,.45), 0 2px 16px rgba(0,10,40,.25) !important;
}
/* Misty nav bars: transparent */
#rp-phone.rp-theme-misty .rp-nav-bar {
  background: transparent !important;
  border-bottom: 1px solid rgba(130,175,215,.2) !important;
}
/* Misty send button: steel-blue oval */
#rp-phone.rp-theme-misty #rp-send {
  background: linear-gradient(135deg, #4d8fbf, #2d6d9a) !important;
  border-radius: 20px 14px 14px 20px !important;
  box-shadow: 0 4px 14px rgba(70,120,180,.3) !important;
}
#rp-phone.rp-theme-misty #rp-input {
  border-color: rgba(130,175,215,.35) !important;
  border-radius: 16px !important;
}
#rp-phone.rp-theme-misty .rp-av {
  border-radius: 20px !important;
  box-shadow: 0 3px 12px rgba(100,145,195,.2) !important;
}

/* Pending queue readability (all themes) */
#rp-phone.rp-theme-candy #rp-pending-queue {
  background: rgba(255, 234, 244, .82) !important;
  border-top-color: rgba(188, 68, 118, .42) !important;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}
#rp-phone.rp-theme-candy .rp-pending-item {
  color: #7a163f !important;
  background: rgba(255, 255, 255, .74) !important;
  font-weight: 600 !important;
}
#rp-phone.rp-theme-candy .rp-pending-hint {
  color: rgba(108, 18, 56, .92) !important;
  font-weight: 600 !important;
}

#rp-phone.rp-theme-star #rp-pending-queue {
  background: rgba(18, 10, 48, .72) !important;
  border-top-color: rgba(148, 110, 255, .35) !important;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}
#rp-phone.rp-theme-star .rp-pending-item {
  color: #e4d8ff !important;
  background: rgba(126, 84, 255, .28) !important;
}
#rp-phone.rp-theme-star .rp-pending-hint {
  color: rgba(224, 208, 255, .72) !important;
}

#rp-phone.rp-theme-misty #rp-pending-queue {
  background: rgba(228, 241, 252, .72) !important;
  border-top-color: rgba(96, 146, 186, .32) !important;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}
#rp-phone.rp-theme-misty .rp-pending-item {
  color: #1f4a6a !important;
  background: rgba(255, 255, 255, .58) !important;
}
#rp-phone.rp-theme-misty .rp-pending-hint {
  color: rgba(35, 77, 110, .78) !important;
}

/* ── SHARED: icon grid spacing & app grid for icon-only style ── */
#rp-phone #rp-app-grid { gap: 16px !important; }
/* ══════════════════════════════════════════════════════ */

/* ── LOCK SCREEN WIDGET ── */
#rp-lock-widget {
  position:absolute; bottom:72px; left:50%; transform:translateX(-50%);
  width:calc(100% - 40px); max-width:220px;
  background:rgba(255,255,255,.18);
  border:1px solid rgba(255,255,255,.28);
  border-radius:18px; padding:12px 16px;
  color:#fff; text-align:left;
  display:none;
}
#rp-lock-widget .rp-lw-label {
  font-size:10px; font-weight:700; letter-spacing:.8px;
  text-transform:uppercase; opacity:.55; margin-bottom:5px;
}
#rp-lock-widget .rp-lw-stage {
  font-size:16px; font-weight:600; margin-bottom:4px; letter-spacing:-.3px;
}
#rp-lock-widget .rp-lw-status {
  font-size:11px; opacity:.7;
}
/* Star theme lock widget */
#rp-phone.rp-theme-star #rp-lock-widget {
  background:rgba(60,30,120,.35);
  border-color:rgba(160,120,255,.35);
  color:#e8e0ff;
  box-shadow:0 4px 20px rgba(80,40,180,.3);
}
/* Misty theme lock widget */
#rp-phone.rp-theme-misty #rp-lock-widget {
  background:rgba(255,255,255,.3);
  border-color:rgba(140,180,220,.4);
  color:#0a2040;
}
/* Candy theme lock widget */
#rp-phone.rp-theme-candy #rp-lock-widget {
  background:rgba(255,220,235,.35);
  border-color:rgba(220,130,165,.35);
  color:#5a1028;
}

/* ══ STAR THEME: Settings & API dark styling ══ */
#rp-phone.rp-theme-star #rp-view-settings { background: transparent !important; }
#rp-phone.rp-theme-star #rp-view-api-settings { background: transparent !important; }
/* Section title labels */
#rp-phone.rp-theme-star .rp-grp-pick-item{border-bottom-color:rgba(130,90,255,.12)!important}#rp-phone.rp-theme-star .rp-grp-pick-item.selected{background:rgba(130,90,255,.12)!important}#rp-phone.rp-theme-star .rp-grp-pick-name{color:#d4c8ff!important}#rp-phone.rp-theme-star .rp-grp-pick-chk{border-color:rgba(160,120,255,.4)!important}#rp-phone.rp-theme-star .rp-grp-modal{background:rgba(16,8,42,.95)!important;border:1px solid rgba(130,90,255,.2)!important}#rp-phone.rp-theme-star .rp-grp-modal-hd{color:#d4c8ff!important;border-bottom-color:rgba(130,90,255,.15)!important}#rp-phone.rp-theme-star .rp-grp-name-inp{background:rgba(30,16,70,.8)!important;border-color:rgba(130,90,255,.35)!important;color:#d4c8ff!important}#rp-phone.rp-theme-star .rp-grp-name-inp::placeholder{color:rgba(180,165,255,.4)!important}#rp-phone.rp-theme-star .rp-grp-modal-ft{border-top-color:rgba(130,90,255,.15)!important}#rp-phone.rp-theme-star .rp-grp-ft-cancel{color:rgba(180,165,255,.45)!important;border-right-color:rgba(130,90,255,.15)!important}#rp-phone.rp-theme-star .rp-grp-ft-ok{color:#a78bfa!important}
#rp-phone.rp-theme-star .rp-set-section-title {
  color: rgba(180,160,255,.7) !important;
  font-weight: 600 !important;
}
/* Section white box → dark glass */
#rp-phone.rp-theme-star .rp-set-section {
  background: rgba(20,12,50,.82) !important;
  border-radius: 16px !important;
  border: 1px solid rgba(130,90,255,.2) !important;
  overflow: hidden !important;
}
/* Each row inside section */
#rp-phone.rp-theme-star .rp-set-row {
  background: transparent !important;
  border-bottom-color: rgba(130,90,255,.12) !important;
}
/* Row label text */
#rp-phone.rp-theme-star .rp-set-key {
  color: #d4c8ff !important;
}
#rp-phone.rp-theme-star .rp-set-hint { color: rgba(180,165,255,.55) !important; }
/* Dropdown select */
#rp-phone.rp-theme-star .rp-set-select {
  background: rgba(35,20,70,.8) !important;
  border: 1px solid rgba(130,90,255,.4) !important;
  color: #d4c8ff !important;
  border-radius: 10px !important;
}
/* Upload / action buttons */
#rp-phone.rp-theme-star .rp-avatar-upload-btn,
#rp-phone.rp-theme-star .rp-set-upload-btn {
  background: rgba(60,30,120,.65) !important;
  border: 1px solid rgba(130,90,255,.45) !important;
  color: #d4c8ff !important;
  border-radius: 12px !important;
  font-size: 13.5px !important;
}
#rp-phone.rp-theme-misty .rp-avatar-upload-btn,
#rp-phone.rp-theme-misty #rp-wall-upload,
#rp-phone.rp-theme-misty #rp-wall-reset {
  background: rgba(210,228,245,.38) !important;
  border: 1px solid rgba(130,175,215,.28) !important;
  color: #1a3050 !important;
  border-radius: 12px !important;
}
/* "恢复默认" button override */
#rp-phone.rp-theme-star #rp-wall-reset {
  background: rgba(30,18,60,.5) !important;
  color: rgba(180,165,255,.7) !important;
}
/* Inline style overrides */
#rp-phone.rp-theme-star #rp-view-settings [style*="color:#8a8a9a"] {
  color: rgba(160,145,255,.55) !important;
}
#rp-phone.rp-theme-star #rp-view-settings input,
#rp-phone.rp-theme-star #rp-view-api-settings input[type="text"],
#rp-phone.rp-theme-star #rp-view-api-settings input[type="url"],
#rp-phone.rp-theme-star #rp-view-api-settings input[type="password"] {
  background: rgba(20,12,50,.8) !important;
  border: 1px solid rgba(130,90,255,.4) !important;
  color: #e0d4ff !important;
  border-radius: 10px !important;
}
#rp-phone.rp-theme-star #rp-view-settings input::placeholder,
#rp-phone.rp-theme-star #rp-view-api-settings input::placeholder {
  color: rgba(160,140,220,.5) !important;
}
/* Star: API section card */
#rp-phone.rp-theme-star #rp-view-api-settings [style*="background:rgba(168,85,247,.06)"] {
  background: rgba(80,40,160,.25) !important;
  border: 1px solid rgba(140,90,255,.2) !important;
  color: rgba(200,180,255,.85) !important;
  border-radius: 14px !important;
}
/* Star: API preset buttons */
#rp-phone.rp-theme-star .rp-api-preset-btn {
  background: rgba(80,40,160,.4) !important;
  border: 1px solid rgba(140,90,255,.4) !important;
  color: #c4b0ff !important;
  border-radius: 10px !important;
}
#rp-phone.rp-theme-star .rp-api-preset-btn:hover {
  background: rgba(100,50,200,.5) !important;
}
/* Star: save button */
#rp-phone.rp-theme-star #rp-api-save-v {
  background: linear-gradient(135deg, #6d28d9, #8b5cf6) !important;
  border: none !important;
  color: #fff !important;
  box-shadow: 0 4px 16px rgba(100,50,220,.4) !important;
}
/* Star: radio labels */
#rp-phone.rp-theme-star .rp-api-opt {
  color: #d4c8ff !important;
}
/* Star: API title */
#rp-phone.rp-theme-star [style*="color:#2d1060"] {
  color: #b09ef0 !important;
}
#rp-phone.rp-theme-star [style*="color:#9070b0"] {
  color: rgba(180,160,255,.75) !important;
}
/* Star: settings upload buttons */
#rp-phone.rp-theme-star .rp-btn-outline {
  background: rgba(60,30,120,.4) !important;
  border: 1px solid rgba(140,90,255,.4) !important;
  color: #c4b0ff !important;
}
/* Misty: settings/api theming */
#rp-phone.rp-theme-misty .rp-grp-pick-item{border-bottom-color:rgba(80,150,200,.1)!important}#rp-phone.rp-theme-misty .rp-grp-pick-item.selected{background:rgba(14,165,233,.08)!important}#rp-phone.rp-theme-misty .rp-grp-pick-name{color:#1a3050!important}#rp-phone.rp-theme-misty .rp-grp-pick-chk{border-color:rgba(80,150,210,.4)!important}#rp-phone.rp-theme-misty .rp-grp-modal{background:#f0f8ff!important;border:1px solid rgba(80,150,210,.15)!important}#rp-phone.rp-theme-misty .rp-grp-modal-hd{color:#1a3050!important;border-bottom-color:rgba(80,150,210,.12)!important}#rp-phone.rp-theme-misty .rp-grp-name-inp{background:#e8f4fb!important;border-color:rgba(80,150,210,.25)!important;color:#1a3050!important}#rp-phone.rp-theme-misty .rp-grp-ft-ok{color:#0ea5e9!important}
#rp-phone.rp-theme-misty #rp-view-settings { background: transparent !important; }
#rp-phone.rp-theme-misty #rp-view-api-settings { background: transparent !important; }
#rp-phone.rp-theme-misty #rp-view-settings > div,
#rp-phone.rp-theme-misty #rp-view-api-settings > div {
  background: rgba(220,238,255,.18) !important;
  border-radius: 16px !important;
}

/* ══ CANDY HOME: Full Beauty Pass ══ */
/* Status bar: rose pink */
#rp-phone.rp-theme-candy #rp-sbar {
  color: #b02850 !important;
  text-shadow: 0 0 10px rgba(255,255,255,.85) !important;
}
/* Home date line */
#rp-home-date { display:none; }
#rp-phone.rp-theme-candy #rp-home-date {
  color: #b02850 !important;
  opacity: 1 !important;
  font-size: 12.5px !important;
  font-weight: 500 !important;
  background: rgba(255,255,255,.20) !important;
  border-radius: 20px !important;
  padding: 3px 14px !important;
  text-shadow: none !important;
}
#rp-phone.rp-theme-star #rp-home-date {
  color: #b09ef0 !important; opacity: .6 !important;
}
#rp-phone.rp-theme-misty #rp-home-date {
  color: rgba(220,240,255,.85) !important; opacity: 1 !important; text-shadow: 0 1px 4px rgba(0,20,70,.5) !important;
}
/* Candy home indicator: rose */
#rp-phone.rp-theme-candy .rp-home-indicator {
  background: rgba(212,96,122,.45) !important;
  width: 100px !important;
}
/* Candy app grid: more generous spacing */
#rp-phone.rp-theme-candy #rp-app-grid {
  gap: 20px !important;
  padding: 0 22px !important;
}
/* Candy app label: refined typography */
#rp-phone.rp-theme-candy .rp-app-lbl {
  color: #c04870 !important;
  font-size: 10.5px !important;
  font-weight: 600 !important;
  letter-spacing: .2px !important;
  text-shadow: 0 1px 5px rgba(255,255,255,.85) !important;
}
/* Candy status bar battery color */
#rp-phone.rp-theme-candy .rp-bat-body,
#rp-phone.rp-theme-candy .rp-bat-fill { border-color: #d4607a !important; }
#rp-phone.rp-theme-candy .rp-bat-fill { background: #d4607a !important; }
/* Candy lock screen: rose clock/date */
#rp-phone.rp-theme-candy #rp-lock-time {
  color: #c03060 !important;
  text-shadow:
    0 0 28px rgba(255,255,255,.9),
    0 0 10px rgba(255,255,255,.6) !important;
}
#rp-phone.rp-theme-candy #rp-lock-date { display:none !important; }
#rp-phone.rp-theme-candy #rp-swipe-hint {
  color: rgba(212,96,122,.55) !important;
}
/* Candy: home bottom vignette for depth */
#rp-phone.rp-theme-candy .rp-home-bg::after {
  content: '';
  position: absolute;
  bottom: 0; left: 0; right: 0;
  height: 90px;
  background: linear-gradient(transparent, rgba(255,230,238,.22));
  pointer-events: none;
  border-radius: 0 0 38px 38px;
}
/* Candy icon: gentle float animation on first load */
@keyframes rp-candy-ico-in {
  from { opacity:0; transform:translateY(8px) scale(.92); }
  to   { opacity:1; transform:translateY(0) scale(1); }
}
#rp-phone.rp-theme-candy #rp-app-grid .rp-app {
  animation: rp-candy-ico-in .4s ease both;
}
#rp-phone.rp-theme-candy #rp-app-grid .rp-app:nth-child(1){animation-delay:.05s}
#rp-phone.rp-theme-candy #rp-app-grid .rp-app:nth-child(2){animation-delay:.10s}
#rp-phone.rp-theme-candy #rp-app-grid .rp-app:nth-child(3){animation-delay:.15s}
#rp-phone.rp-theme-candy #rp-app-grid .rp-app:nth-child(4){animation-delay:.20s}
#rp-phone.rp-theme-candy #rp-app-grid .rp-app:nth-child(5){animation-delay:.25s}
#rp-phone.rp-theme-candy #rp-app-grid .rp-app:nth-child(6){animation-delay:.30s}

/* ══ WALLPAPER BLEED-THROUGH: Inner content glass cards ══ */

/* Thread rows */
.rp-thread {
  background: rgba(255,255,255,.28) !important;
  border-bottom-color: rgba(0,0,0,.07) !important;
}
.rp-thread:hover { background: rgba(255,255,255,.42) !important; }

/* Star theme threads */
#rp-phone.rp-theme-star .rp-thread { background: rgba(14,8,38,.40) !important; border-bottom-color: rgba(130,90,255,.15) !important; }
#rp-phone.rp-theme-star .rp-thread:hover { background: rgba(14,8,38,.58) !important; }
/* Misty theme threads */
#rp-phone.rp-theme-misty .rp-thread { background: rgba(240,248,255,.38) !important; border-bottom-color: rgba(130,175,215,.18) !important; }

/* Moments posts */
.rp-moment {
  background: transparent !important;
  border-bottom: 1px solid rgba(0,0,0,.07) !important;
  border-radius: 0 !important;
  margin: 0 !important;
  border-left: none !important; border-right: none !important; border-top: none !important;
}
#rp-phone.rp-theme-star .rp-moment { background: transparent !important; border-bottom-color: rgba(130,90,255,.1) !important; }
#rp-phone.rp-theme-misty .rp-moment { background: transparent !important; border-bottom-color: rgba(130,175,215,.12) !important; }

/* Chat bubbles area stays transparent; sent/recv bubbles keep their own bg */
#rp-bubbles { background: transparent !important; }

/* Settings sections: transparent */
#rp-view-settings > div,
#rp-view-settings > section {
  background: transparent !important;
  border-radius: 0 !important;
  margin: 0 !important;
  border: none !important;
}

/* API settings content area */
#rp-view-api-settings > div:not(.rp-nav-bar) {
  background: rgba(255,255,255,.0) !important;
}
/* API inner info card */
#rp-view-api-settings [style*="background:rgba(168,85,247,.06)"],
#rp-phone.rp-theme-candy #rp-view-api-settings [style*="background:rgba"] {
  background: rgba(255,255,255,.45) !important;
  border: 1px solid rgba(200,150,220,.25) !important;
  border-radius: 14px !important;
}
/* API preset buttons: glass */
.rp-api-preset-btn {
  background: rgba(255,255,255,.5) !important;
  border: 1.5px solid rgba(180,130,220,.3) !important;
  color: #6a2090 !important;
  border-radius: 12px !important;
}
#rp-phone.rp-theme-star .rp-api-preset-btn { background: rgba(40,20,90,.5) !important; border-color: rgba(130,90,255,.4) !important; color: #c4b0ff !important; }

/* Game canvas glass */
#rp-ludo-canvas { background: rgba(255,255,255,.45) !important; }
#rp-phone.rp-theme-star #rp-ludo-canvas { background: rgba(14,8,38,.55) !important; }
#rp-phone.rp-theme-star #rp-game-controls { background: rgba(14,8,38,.65) !important; border-top-color: rgba(130,90,255,.2) !important; }

/* Theme picker cards */
/* theme card uses --rp-tc-bg per theme */
.rp-theme-card { background: var(--rp-tc-bg) !important; }
#rp-phone.rp-theme-candy .rp-theme-card { background: rgba(255,255,255,.72) !important; }
#rp-phone.rp-theme-star .rp-theme-card { background: rgba(20,14,55,.88) !important; border: 1px solid rgba(130,90,255,.3) !important; }
#rp-phone.rp-theme-misty .rp-theme-card { background: rgba(240,248,255,.75) !important; border: 1px solid rgba(130,175,215,.25) !important; }

/* Nav bars: transparent to show wallpaper */
.rp-nav-bar { background: transparent !important; border-bottom-color: rgba(255,255,255,.15) !important; }
#rp-phone.rp-theme-star .rp-nav-bar { border-bottom-color: rgba(130,90,255,.15) !important; }
#rp-phone.rp-theme-misty .rp-nav-bar { border-bottom-color: rgba(130,175,215,.2) !important; }

/* ══ API 设置页可读性修复 ══ */
/* 说明卡片: 更不透明的白底 + 深色文字 */
#rp-view-api-settings [style*="background:rgba(168,85,247"] {
  background: rgba(255,255,255,.80) !important;
  border: 1px solid rgba(200,150,220,.3) !important;
  color: #3a1060 !important;
  border-radius: 14px !important;
}
/* DeepSeek 建议行 */
#rp-api-blink { color: #9b30d0 !important; }
/* 标题 ⚡ 自定义API设置 */
#rp-view-api-settings [style*="color:#2d1060"],
#rp-phone.rp-theme-candy #rp-view-api-settings [style*="color:#2d1060"] {
  color: #5a1090 !important;
  text-shadow: 0 0 12px rgba(255,255,255,.8);
}
/* 说明文字颜色 */
#rp-view-api-settings [style*="color:#9070b0"] {
  color: #5a3080 !important;
}
/* Radio labels */
#rp-view-api-settings .rp-api-opt {
  color: #3a1060 !important;
  font-weight: 500 !important;
  text-shadow: 0 0 8px rgba(255,255,255,.7);
}
/* 预设按钮 */
#rp-phone.rp-theme-candy .rp-api-preset-btn {
  background: rgba(255,255,255,.82) !important;
  border: 1.5px solid rgba(180,120,220,.4) !important;
  color: #5a1090 !important;
  font-weight: 600 !important;
  border-radius: 12px !important;
}
/* 输入框 */
#rp-phone.rp-theme-candy #rp-view-api-settings input[type="text"],
#rp-phone.rp-theme-candy #rp-view-api-settings input[type="url"],
#rp-phone.rp-theme-candy #rp-view-api-settings input[type="password"],
#rp-phone.rp-theme-candy #rp-view-api-settings input {
  background: rgba(255,255,255,.85) !important;
  border: 1.5px solid rgba(180,120,220,.4) !important;
  color: #3a1060 !important;
  border-radius: 12px !important;
}
/* 模型列表下拉 */
#rp-model-list {
  background: rgba(255,255,255,.88) !important;
  border: 1.5px solid rgba(180,120,220,.35) !important;
  color: #3a1060 !important;
  border-radius: 12px !important;
}
/* 保存按钮 */
#rp-phone.rp-theme-candy #rp-api-save-v {
  background: linear-gradient(135deg, #c03060, #e06080) !important;
  color: #fff !important;
  font-weight: 700 !important;
  border: none !important;
  box-shadow: 0 4px 16px rgba(192,48,96,.35) !important;
  border-radius: 14px !important;
}
/* 获取模型按钮 */
#rp-phone.rp-theme-candy #rp-fetch-models-btn {
  background: rgba(255,255,255,.75) !important;
  border: 1.5px solid rgba(180,120,220,.4) !important;
  color: #5a1090 !important;
  border-radius: 10px !important;
}

/* ════════════════════════════════════════════════════
   ✨ STAR THEME - Complete inner-page polish
   ════════════════════════════════════════════════════ */

/* Clock: lavender glow on dark wallpaper */
#rp-phone.rp-theme-star #rp-home-clock {
  color: #d4ccff !important;
  font-weight: 100 !important;
  font-size: 58px !important;
  letter-spacing: -3px !important;
  text-shadow:
    0 0 30px rgba(160,130,255,.5),
    0 0 10px rgba(200,180,255,.3) !important;
}
/* Status bar */
#rp-phone.rp-theme-star #rp-sbar {
  color: #c8c0f5 !important;
}
/* Lock screen time */
#rp-phone.rp-theme-star #rp-lock-time {
  color: #e8e0ff !important;
  text-shadow: 0 2px 20px rgba(140,100,255,.35) !important;
}
/* Home indicator */
#rp-phone.rp-theme-star .rp-home-indicator {
  background: rgba(160,130,255,.4) !important;
}
/* Thread name/preview text already via CSS vars */
/* Moment text */
#rp-phone.rp-theme-star .rp-moment-name { color: #b09ef0 !important; }
#rp-phone.rp-theme-star .rp-moment-time { color: rgba(180,165,255,.55) !important; }
#rp-phone.rp-theme-star .rp-moment-body { color: #d4ccff !important; }
#rp-phone.rp-theme-star .rp-moment-actions span { color: rgba(160,140,255,.6) !important; }
/* Thread list: name / time */
#rp-phone.rp-theme-star .rp-tn { color: #e0d8ff !important; }
#rp-phone.rp-theme-star .rp-tp { color: rgba(180,165,255,.55) !important; }
#rp-phone.rp-theme-star .rp-tt { color: rgba(180,165,255,.45) !important; }
/* Settings rows text */
#rp-phone.rp-theme-star #rp-view-settings * { color: #d8d0ff !important; }
/* Avatar border */
#rp-phone.rp-theme-star .rp-av {
  border-radius: 10px !important;
  box-shadow: 0 0 8px rgba(120,80,255,.3) !important;
}
/* Game nav & controls */
#rp-phone.rp-theme-star #rp-view-game .rp-nav-bar {
  background: transparent !important;
  border-bottom: 1px solid rgba(130,90,255,.15) !important;
}
#rp-phone.rp-theme-star #rp-game-controls {
  background: rgba(14,8,38,.72) !important;
  border-top-color: rgba(130,90,255,.2) !important;
}
/* Nav back/title for star */
#rp-phone.rp-theme-star .rp-nav-title {
  color: #e0d8ff !important;
  text-shadow: 0 0 12px rgba(160,130,255,.4) !important;
}
#rp-phone.rp-theme-star .rp-back,
#rp-phone.rp-theme-star .rp-nav-add { color: #a78bfa !important; }

/* ════════════════════════════════════════════════════
   🌿 MISTY THEME - Complete inner-page polish
   ════════════════════════════════════════════════════ */

/* Clock: white for contrast on blue wallpaper */
#rp-phone.rp-theme-misty #rp-home-clock {
  color: rgba(220,238,252,.92) !important;
  font-weight: 100 !important;
  font-size: 58px !important;
  letter-spacing: -3px !important;
  text-shadow: 0 1px 6px rgba(0,20,60,.45), 0 2px 16px rgba(0,10,40,.25) !important;
}
/* Status bar */
#rp-phone.rp-theme-misty #rp-sbar {
  color: #1a3050 !important;
  text-shadow: 0 0 8px rgba(255,255,255,.75) !important;
}
/* Lock screen time */
#rp-phone.rp-theme-misty #rp-lock-time {
  color: #1a2e44 !important;
  text-shadow:
    0 0 20px rgba(255,255,255,.9),
    0 0 6px rgba(255,255,255,.6) !important;
}
/* Home indicator */
#rp-phone.rp-theme-misty .rp-home-indicator {
  background: rgba(61,110,154,.4) !important;
}
/* Moments text */
#rp-phone.rp-theme-misty .rp-moment-name { color: #2d6d9a !important; }
#rp-phone.rp-theme-misty .rp-moment-time { color: rgba(44,74,106,.55) !important; }
#rp-phone.rp-theme-misty .rp-moment-body { color: #1a3050 !important; }
#rp-phone.rp-theme-misty .rp-moment-actions span { color: rgba(61,110,154,.7) !important; }
/* Thread text */
#rp-phone.rp-theme-misty .rp-tn { color: #1a2e44 !important; }
#rp-phone.rp-theme-misty .rp-tp { color: rgba(44,74,106,.6) !important; }
#rp-phone.rp-theme-misty .rp-tt { color: rgba(61,110,154,.5) !important; }
/* Settings text */
#rp-phone.rp-theme-misty #rp-view-settings * { color: #1a3050 !important; }
/* Avatar */
#rp-phone.rp-theme-misty .rp-av {
  border-radius: 20px !important;
  box-shadow: 0 3px 12px rgba(100,145,195,.2) !important;
}
/* Nav title */
#rp-phone.rp-theme-misty .rp-nav-title {
  color: rgba(220,238,252,.92) !important;
  text-shadow: 0 1px 3px rgba(0,20,60,.5), 0 0 8px rgba(0,10,40,.3) !important;
}
#rp-phone.rp-theme-misty .rp-back,
#rp-phone.rp-theme-misty .rp-nav-add { color: rgba(220,238,252,.90) !important; text-shadow: 0 1px 3px rgba(0,20,60,.45) !important; }
/* Game controls */
#rp-phone.rp-theme-misty #rp-view-game .rp-nav-bar {
  background: transparent !important;
  border-bottom: 1px solid rgba(130,175,215,.2) !important;
}
#rp-phone.rp-theme-misty #rp-game-controls {
  background: rgba(240,248,255,.68) !important;
  border-top-color: rgba(130,175,215,.25) !important;
}
#rp-phone.rp-theme-misty #rp-ludo-canvas { background: rgba(240,248,255,.65) !important; }

/* ── MISTY API settings legibility ── */
/* Broad wildcard: override all inline colors in API settings view */
#rp-phone.rp-theme-misty #rp-view-api-settings * { color: #1a3050 !important; }
#rp-phone.rp-theme-misty #rp-api-blink { color: #0e5a8a !important; font-weight: 800 !important; }
#rp-phone.rp-theme-misty .rp-api-opt { color: #1a3050 !important; font-weight: 500 !important; text-shadow: 0 0 8px rgba(255,255,255,.7) !important; }
#rp-phone.rp-theme-misty .rp-api-preset-btn {
  background: rgba(240,248,255,.38) !important;
  border: 1.5px solid rgba(130,175,215,.35) !important;
  color: #1a3050 !important; font-weight: 700 !important;
  border-radius: 12px !important;
}
#rp-phone.rp-theme-misty #rp-view-api-settings input {
  background: rgba(240,248,255,.40) !important;
  border: 1px solid rgba(130,175,215,.3) !important;
  color: #1a3050 !important; border-radius: 12px !important;
}
#rp-phone.rp-theme-misty #rp-api-save-v {
  background: linear-gradient(135deg, #2d6d9a, #4a8fbf) !important;
  color: #fff !important; font-weight: 700 !important;
  border: none !important; border-radius: 14px !important;
  box-shadow: 0 4px 16px rgba(45,109,154,.3) !important;
}
/* API connectivity test button */
#rp-api-test-v{transition:all .25s}
#rp-api-test-v.testing{opacity:.65;pointer-events:none}
#rp-api-test-v.ok{background:rgba(34,197,94,.15)!important;border-color:rgba(34,197,94,.5)!important;color:#166534!important}
#rp-api-test-v.fail{background:rgba(239,68,68,.12)!important;border-color:rgba(239,68,68,.45)!important;color:#991b1b!important}
#rp-phone.rp-theme-star #rp-api-test-v{background:rgba(60,20,120,.3)!important;border-color:rgba(150,100,255,.5)!important;color:#c8b0ff!important}
#rp-phone.rp-theme-star #rp-api-test-v.ok{background:rgba(22,101,52,.3)!important;color:#86efac!important}
#rp-phone.rp-theme-star #rp-api-test-v.fail{background:rgba(127,29,29,.3)!important;color:#fca5a5!important}
#rp-phone.rp-theme-misty #rp-api-test-v{background:rgba(220,240,255,.22)!important;border-color:rgba(80,160,220,.45)!important;color:#0a4a7a!important}
#rp-phone.rp-theme-misty #rp-api-test-v.ok{background:rgba(220,252,231,.5)!important;color:#065f46!important}
#rp-phone.rp-theme-misty #rp-api-test-v.fail{background:rgba(254,226,226,.4)!important;color:#7f1d1d!important}

#rp-phone.rp-theme-misty #rp-fetch-models-btn {
  background: rgba(240,248,255,.38) !important;
  border: 1px solid rgba(130,175,215,.3) !important;
  color: #2d6d9a !important; border-radius: 10px !important;
}
#rp-phone.rp-theme-misty #rp-model-list {
  background: rgba(240,248,255,.45) !important;
  border: 1px solid rgba(130,175,215,.28) !important;
  color: #1a3050 !important; border-radius: 12px !important;
}

/* ════ ✨ STAR: Settings white boxes → dark glass ════ */
/* All inputs in settings */
#rp-phone.rp-theme-star #rp-view-settings input,
#rp-phone.rp-theme-star #rp-view-settings textarea,
#rp-phone.rp-theme-star #rp-view-settings select {
  background: rgba(30,18,60,.75) !important;
  border: 1px solid rgba(130,90,255,.35) !important;
  color: #e0d8ff !important;
  border-radius: 10px !important;
}
#rp-phone.rp-theme-star #rp-view-settings input::placeholder { color: rgba(180,165,255,.4) !important; }
/* All buttons in settings */
#rp-phone.rp-theme-star #rp-view-settings button,
#rp-phone.rp-theme-star #rp-view-settings .rp-btn-outline,
#rp-phone.rp-theme-star #rp-view-settings [class*="btn"] {
  background: rgba(60,30,120,.55) !important;
  border: 1px solid rgba(130,90,255,.45) !important;
  color: #d4c8ff !important;
  border-radius: 12px !important;
  box-shadow: 0 2px 8px rgba(80,40,180,.25) !important;
}
/* Section label headers */
#rp-phone.rp-theme-star #rp-view-settings label,
#rp-phone.rp-theme-star #rp-view-settings span:not(.rp-nav-title),
#rp-phone.rp-theme-star #rp-view-settings p {
  color: #d4c8ff !important;
}
/* Inner white card containers inside sections */
#rp-phone.rp-theme-star #rp-view-settings > div > div,
#rp-phone.rp-theme-star #rp-view-settings > div > table {
  background: rgba(25,14,55,.65) !important;
  border-radius: 10px !important;
  border-color: rgba(130,90,255,.2) !important;
}

/* ════ ✨ STAR: Ludo game full dark treatment ════ */
/* Canvas: purple-dark tint via filter */
#rp-phone.rp-theme-star #rp-ludo-canvas {
  filter: hue-rotate(200deg) saturate(0.85) brightness(0.82) !important;
  border-radius: 14px !important;
  box-shadow: 0 0 24px rgba(100,50,220,.35), 0 4px 20px rgba(0,0,0,.5) !important;
}
/* Game status text (你 vs SillyTavern) */
#rp-phone.rp-theme-star .rp-game-status { color: rgba(200,180,255,.88) !important; }
#rp-phone.rp-theme-star .rp-game-players { color: rgba(200,185,255,.9) !important; }
#rp-phone.rp-theme-star .rp-game-info { color: rgba(200,185,255,.9) !important; }
/* Dice face emoji */
#rp-phone.rp-theme-star #rp-dice-face {
  filter: drop-shadow(0 0 4px rgba(160,130,255,.5));
}
/* Dice button */
#rp-phone.rp-theme-star #rp-dice-btn {
  background: linear-gradient(145deg, #5b21b6, #7c3aed) !important;
  box-shadow: 0 0 16px rgba(120,60,255,.5), 0 4px 12px rgba(0,0,0,.4) !important;
}
/* Game chat area */
#rp-phone.rp-theme-star #rp-game-chat {
  background: rgba(14,8,38,.72) !important;
  border-top-color: rgba(130,90,255,.18) !important;
}
#rp-phone.rp-theme-star #rp-game-chat:hover {
  background: rgba(20,12,50,.85) !important;
}
/* Game chat text */
#rp-phone.rp-theme-star #rp-game-chat * {
  color: rgba(210,195,255,.85) !important;
}
/* Chat hint 点击展开 */
#rp-phone.rp-theme-star #rp-game-chat-hint {
  color: rgba(160,140,255,.5) !important;
}
/* Game composer (输入框底部) */
#rp-phone.rp-theme-star #rp-game-controls .rp-roll-info,
#rp-phone.rp-theme-star #rp-game-controls span,
#rp-phone.rp-theme-star #rp-game-controls div {
  color: rgba(210,195,255,.85) !important;
}
/* Full-screen game chat */
#rp-phone.rp-theme-star #rp-game-chat-fs {
  background: rgba(10,6,28,.96) !important;
}
#rp-phone.rp-theme-star #rp-game-chat-fs-title { color: #d4c8ff !important; }
#rp-phone.rp-theme-star #rp-game-chat-fs #rp-input {
  background: rgba(30,18,60,.8) !important;
  color: #e0d8ff !important;
  border-color: rgba(130,90,255,.4) !important;
}
#rp-phone.rp-theme-star #rp-game-chat-fs #rp-input::placeholder { color: rgba(180,165,255,.4) !important; }

/* ── 🌿 MISTY: Ludo game text legibility ── */
#rp-phone.rp-theme-misty .rp-game-status { color: #1a3050 !important; font-weight: 600 !important; text-shadow: 0 0 8px rgba(255,255,255,.8) !important; }
#rp-phone.rp-theme-misty .rp-game-players { color: #1a2e44 !important; font-weight: 600 !important; text-shadow: 0 0 8px rgba(255,255,255,.8) !important; }
#rp-phone.rp-theme-misty .rp-game-info { color: #1a2e44 !important; }
#rp-phone.rp-theme-misty #rp-game-controls span,
#rp-phone.rp-theme-misty #rp-game-controls div { color: #1a2e44 !important; }
/* Dice button: steel blue */
#rp-phone.rp-theme-misty #rp-dice-btn {
  background: linear-gradient(145deg, #2d6d9a, #4a8fbf) !important;
  box-shadow: 0 4px 16px rgba(45,109,154,.35), 0 1px 3px rgba(0,0,0,.15) !important;
}
/* Game chat area */
#rp-phone.rp-theme-misty #rp-game-chat {
  background: rgba(240,248,255,.55) !important;
  border-top-color: rgba(130,175,215,.2) !important;
}
#rp-phone.rp-theme-misty #rp-game-chat * { color: #1a3050 !important; }
#rp-phone.rp-theme-misty #rp-game-chat-hint { color: rgba(45,109,154,.6) !important; }
/* Nav title in game */
#rp-phone.rp-theme-misty #rp-view-game .rp-nav-title {
  color: #1a2e44 !important;
  text-shadow: 0 0 10px rgba(255,255,255,.75) !important;
}
/* Fullscreen chat */
#rp-phone.rp-theme-misty #rp-game-chat-fs {
  background: rgba(240,248,255,.96) !important;
}
#rp-phone.rp-theme-misty #rp-game-chat-fs-title { color: #1a2e44 !important; }
#rp-phone.rp-theme-misty #rp-game-chat-fs #rp-input {
  background: rgba(255,255,255,.88) !important;
  border-color: rgba(130,175,215,.45) !important;
  color: #1a2e44 !important;
}
/* Roll info / task button */
#rp-phone.rp-theme-misty #rp-task-done-btn {
  background: linear-gradient(135deg, #2d6d9a, #4a8fbf) !important;
  color: #fff !important; border: none !important;
}

/* ══ NUCLEAR: ALL views always transparent ══ */
#rp-view-messages,#rp-view-thread,#rp-bubbles,#rp-view-moments,#rp-view-settings,#rp-view-api-settings,#rp-view-game,#rp-view-themes {
  background: transparent !important;
}

/* ═══════════════════════════════════════════════════════════
   🌸 CANDY: Complete per-page polish (all missing rules)
   ═══════════════════════════════════════════════════════════ */
/* Nav bar title + back */
#rp-phone.rp-theme-candy .rp-nav-title {
  color: #5a1030 !important;
  font-weight: 700 !important;
  text-shadow: 0 0 14px rgba(255,255,255,.9), 0 1px 3px rgba(255,255,255,.7) !important;
}
#rp-phone.rp-theme-candy .rp-back,
#rp-phone.rp-theme-candy .rp-nav-add {
  color: #c03060 !important;
  text-shadow: 0 0 8px rgba(255,255,255,.7) !important;
}
/* Settings sections: light rose glass */
#rp-phone.rp-theme-candy .rp-set-section {
  background: rgba(255,255,255,.28) !important;
  border-radius: 14px !important;
  border: 1px solid rgba(220,130,165,.15) !important;
  overflow: hidden !important;
}
#rp-phone.rp-theme-candy .rp-set-section-title {
  color: #9a2050 !important;
  font-weight: 600 !important;
  text-shadow: 0 0 8px rgba(255,255,255,.7) !important;
}
#rp-phone.rp-theme-candy .rp-set-row {
  background: transparent !important;
  border-bottom-color: rgba(220,130,165,.10) !important;
}
#rp-phone.rp-theme-candy .rp-set-key {
  color: #6a1040 !important;
  text-shadow: 0 0 6px rgba(255,255,255,.6) !important;
}
#rp-phone.rp-theme-candy .rp-set-select {
  background: rgba(255,220,235,.35) !important;
  border: 1px solid rgba(220,130,165,.25) !important;
  color: #5a1030 !important; border-radius: 10px !important;
}
#rp-phone.rp-theme-candy .rp-avatar-upload-btn,
#rp-phone.rp-theme-candy .rp-set-upload-btn {
  background: rgba(255,210,228,.38) !important;
  border: 1px solid rgba(220,130,165,.28) !important;
  color: #7a1038 !important; border-radius: 12px !important;
}
/* Moments: rose glass */
#rp-phone.rp-theme-candy .rp-moment {
  background: rgba(255,255,255,.32) !important;
  border-bottom: 1px solid rgba(220,130,165,.12) !important;
  padding: 10px 14px !important;
}
#rp-phone.rp-theme-candy .rp-moment-name { color: #c03060 !important; font-weight: 600 !important; }
#rp-phone.rp-theme-candy .rp-moment-time { color: rgba(140,60,90,.55) !important; }
#rp-phone.rp-theme-candy .rp-moment-body { color: #4a1028 !important; }
#rp-phone.rp-theme-candy .rp-moment-text { color: #4a1028 !important; }
#rp-phone.rp-theme-candy .rp-moment-comment { color: #5a1530 !important; }
#rp-phone.rp-theme-candy .rp-moment-cname { color: #c03060 !important; }
#rp-phone.rp-theme-candy .rp-moment-reply-btn { color: rgba(180,40,80,.65) !important; }
/* candy is default theme - no rp-theme-candy class ever added; base rule handles it */
#rp-phone.rp-theme-candy .rp-moment-comments-wrap { background: rgba(220,80,120,.06) !important; }
#rp-phone.rp-theme-candy .rp-moment-act { color: rgba(160,50,80,.5) !important; }
#rp-phone.rp-theme-candy .rp-moment-bar { border-top-color: rgba(200,80,120,.15) !important; }
/* Game text */
#rp-phone.rp-theme-candy .rp-game-status {
  color: #8a1840 !important; font-weight: 600 !important;
  text-shadow: 0 0 8px rgba(255,255,255,.7) !important;
}
#rp-phone.rp-theme-candy .rp-game-players {
  color: #6a1030 !important; font-weight: 600 !important;
  text-shadow: 0 0 8px rgba(255,255,255,.7) !important;
}
#rp-phone.rp-theme-candy #rp-game-chat {
  background: rgba(255,240,248,.55) !important;
  border-top-color: rgba(220,130,165,.15) !important;
}
#rp-phone.rp-theme-candy #rp-game-chat * { color: #5a1028 !important; }
#rp-phone.rp-theme-candy #rp-game-chat-hint { color: rgba(180,60,90,.55) !important; }
/* Thread list names */
#rp-phone.rp-theme-candy .rp-tn { color: #3a0a1e !important; font-weight: 600 !important; }
#rp-phone.rp-theme-candy .rp-tp { color: rgba(80,20,40,.6) !important; }
#rp-phone.rp-theme-candy .rp-tt { color: rgba(140,60,90,.5) !important; }

/* ═══════════════════════════════════════════════════════════
   🌿 MISTY: Missing settings sections + nav polish
   ═══════════════════════════════════════════════════════════ */
/* Settings sections: blue-white glass */
#rp-phone.rp-theme-misty .rp-set-section {
  background: rgba(240,248,255,.28) !important;
  border-radius: 14px !important;
  border: 1px solid rgba(130,175,215,.15) !important;
  overflow: hidden !important;
}
#rp-phone.rp-theme-misty .rp-set-section-title {
  color: rgba(44,74,106,.75) !important;
  font-weight: 600 !important;
  text-shadow: 0 0 8px rgba(255,255,255,.8) !important;
}
#rp-phone.rp-theme-misty .rp-set-row {
  background: transparent !important;
  border-bottom-color: rgba(130,175,215,.15) !important;
}
#rp-phone.rp-theme-misty .rp-set-hint { color: rgba(44,90,140,.55) !important; }
#rp-phone.rp-theme-misty .rp-set-key {
  color: #1a3050 !important;
  text-shadow: 0 0 6px rgba(255,255,255,.6) !important;
}
/* Moments: blue-white glass */
#rp-phone.rp-theme-misty .rp-moment {
  background: rgba(240,248,255,.58) !important;
  border-bottom: 1px solid rgba(130,175,215,.18) !important;
  padding: 10px 14px !important;
}
#rp-phone.rp-theme-misty .rp-moment-name { color: #2d6d9a !important; font-weight: 600 !important; }
#rp-phone.rp-theme-misty .rp-moment-time { color: rgba(44,74,106,.5) !important; }
#rp-phone.rp-theme-misty .rp-moment-body { color: #0e1f30 !important; font-weight: 400 !important; }
#rp-phone.rp-theme-misty .rp-moment-text { color: #0e1f30 !important; }
#rp-phone.rp-theme-misty .rp-moment-comment { color: #0f2035 !important; font-weight: 500 !important; }
#rp-phone.rp-theme-misty .rp-moment-cname { color: #2d6d9a !important; }
#rp-phone.rp-theme-misty .rp-moment-reply-btn { color: rgba(40,90,140,.65) !important; }
#rp-phone.rp-theme-misty .rp-moment-likes-row { color: rgba(24,68,112,.95) !important; background: rgba(60,120,180,.09) !important; border-radius: 6px !important; padding: 3px 8px !important; }
#rp-phone.rp-theme-misty .rp-moment-comments-wrap { background: rgba(60,120,180,.12) !important; }
#rp-phone.rp-theme-misty .rp-moment-act { color: rgba(30,75,130,.82) !important; }
#rp-phone.rp-theme-misty .rp-moment-bar { border-top-color: rgba(100,160,210,.18) !important; }
/* Thread list */
#rp-phone.rp-theme-misty .rp-tn { color: #0e1f30 !important; font-weight: 600 !important; }
#rp-phone.rp-theme-misty .rp-tp { color: rgba(30,60,90,.65) !important; }
#rp-phone.rp-theme-misty .rp-tt { color: rgba(44,74,106,.5) !important; }

/* ═══════════════════════════════════════════════════════════
   ✨ STAR: Moments glass (was transparent, needs dark tint)
   ═══════════════════════════════════════════════════════════ */
#rp-phone.rp-theme-star .rp-moment {
  background: rgba(14,8,38,.42) !important;
  border-bottom: 1px solid rgba(130,90,255,.1) !important;
  padding: 10px 14px !important;
}
#rp-phone.rp-theme-star .rp-moment-name { color: #b09ef0 !important; font-weight: 600 !important; }
#rp-phone.rp-theme-star .rp-moment-time { color: rgba(180,165,255,.5) !important; }
#rp-phone.rp-theme-star .rp-moment-body { color: #d4ccff !important; }
#rp-phone.rp-theme-star .rp-moment-text { color: #d4ccff !important; }
#rp-phone.rp-theme-star .rp-moment-comment { color: #c0b8ef !important; }
#rp-phone.rp-theme-star .rp-moment-cname { color: #a98bff !important; }
#rp-phone.rp-theme-star .rp-moment-reply-btn { color: rgba(160,140,255,.7) !important; }
#rp-phone.rp-theme-star .rp-moment-likes-row { color: rgba(200,185,255,.6) !important; }
#rp-phone.rp-theme-star .rp-moment-comments-wrap { background: rgba(80,50,180,.12) !important; }
#rp-phone.rp-theme-star .rp-moment-act { color: rgba(180,165,255,.55) !important; }
#rp-phone.rp-theme-star .rp-moment-bar { border-top-color: rgba(130,90,255,.15) !important; }
#rp-phone.rp-theme-star .rp-moment-cinput { background: rgba(255,255,255,.07) !important; border-color: rgba(130,90,255,.3) !important; color: #e8e0ff !important; }
#rp-phone.rp-theme-star .rp-moment-cinput::placeholder { color: rgba(200,185,255,.4) !important; }
#rp-phone.rp-theme-star .rp-moment-input-row { border-top-color: rgba(130,90,255,.15) !important; }
#rp-phone.rp-theme-star .rp-moment-csend { background: rgba(130,90,255,.25) !important; color: #d4c8ff !important; border-color: rgba(130,90,255,.4) !important; }
/* Thread list */
#rp-phone.rp-theme-star .rp-tn { color: #e8e0ff !important; font-weight: 600 !important; }
#rp-phone.rp-theme-star .rp-tp { color: rgba(200,185,255,.6) !important; }
#rp-phone.rp-theme-star .rp-tt { color: rgba(180,165,255,.45) !important; }

/* ── ✨ STAR: API settings button text contrast fix ── */
#rp-phone.rp-theme-star .rp-api-preset-btn {
  background: rgba(50,28,110,.72) !important;
  border: 1.5px solid rgba(160,120,255,.55) !important;
  color: #e0d4ff !important;
  font-weight: 700 !important;
  border-radius: 12px !important;
  text-shadow: 0 0 8px rgba(160,120,255,.5) !important;
}
#rp-phone.rp-theme-star .rp-api-preset-btn:active {
  background: rgba(80,40,160,.8) !important;
}
#rp-phone.rp-theme-star #rp-api-save-v {
  background: linear-gradient(135deg, #6d28d9, #8b5cf6) !important;
  color: #fff !important;
  font-weight: 700 !important;
  border: none !important;
  border-radius: 14px !important;
  box-shadow: 0 0 18px rgba(120,60,255,.45), 0 4px 14px rgba(0,0,0,.4) !important;
  text-shadow: 0 1px 4px rgba(80,20,180,.4) !important;
}
#rp-phone.rp-theme-star #rp-api-save-v.rp-saved {
  background: linear-gradient(135deg, #059669, #10b981) !important;
}
#rp-phone.rp-theme-star #rp-fetch-models-btn {
  background: rgba(50,28,110,.65) !important;
  border: 1.5px solid rgba(160,120,255,.45) !important;
  color: #d4c8ff !important;
  font-weight: 600 !important;
  border-radius: 10px !important;
}
#rp-phone.rp-theme-star .rp-api-opt {
  color: #e0d4ff !important;
  font-weight: 600 !important;
  text-shadow: 0 0 6px rgba(160,120,255,.4) !important;
}
#rp-phone.rp-theme-star #rp-view-api-settings input {
  background: rgba(30,18,60,.78) !important;
  border: 1.5px solid rgba(160,120,255,.45) !important;
  color: #e0d4ff !important;
  border-radius: 12px !important;
}
#rp-phone.rp-theme-star #rp-view-api-settings input::placeholder {
  color: rgba(180,160,255,.4) !important;
}
#rp-phone.rp-theme-star #rp-model-list {
  background: rgba(25,14,55,.88) !important;
  border: 1.5px solid rgba(160,120,255,.4) !important;
  color: #e0d4ff !important;
  border-radius: 12px !important;
}

/* ── Theme card text contrast ── */
#rp-phone.rp-theme-star .rp-theme-name { color: #e0d4ff !important; font-weight: 700 !important; }
#rp-phone.rp-theme-star .rp-theme-desc { color: rgba(200,185,255,.85) !important; }
#rp-phone.rp-theme-misty .rp-theme-name { color: #1a2e44 !important; font-weight: 700 !important; }
#rp-phone.rp-theme-misty .rp-theme-desc { color: rgba(44,74,106,.75) !important; }
#rp-phone.rp-theme-candy .rp-theme-name { color: #5a1030 !important; font-weight: 700 !important; }
#rp-phone.rp-theme-candy .rp-theme-desc { color: rgba(100,30,60,.7) !important; }

/* ══ Wallpaper direct-apply on all inner views (bulletproof) ══ */
#rp-phone.rp-theme-candy #rp-view-messages,
#rp-phone.rp-theme-candy #rp-view-thread,
#rp-phone.rp-theme-candy #rp-view-moments,
#rp-phone.rp-theme-candy #rp-view-settings,
#rp-phone.rp-theme-candy #rp-view-api-settings,
#rp-phone.rp-theme-candy #rp-view-game,
#rp-phone.rp-theme-candy #rp-view-themes {
  background: var(--rp-home-wall) !important;
  background-size: cover !important;
  background-position: center !important;
}
#rp-phone.rp-theme-star #rp-view-messages,
#rp-phone.rp-theme-star #rp-view-thread,
#rp-phone.rp-theme-star #rp-view-moments,
#rp-phone.rp-theme-star #rp-view-settings,
#rp-phone.rp-theme-star #rp-view-api-settings,
#rp-phone.rp-theme-star #rp-view-game,
#rp-phone.rp-theme-star #rp-view-themes {
  background: var(--rp-home-wall) !important;
  background-size: cover !important;
  background-position: center !important;
}
#rp-phone.rp-theme-misty #rp-view-messages,
#rp-phone.rp-theme-misty #rp-view-thread,
#rp-phone.rp-theme-misty #rp-view-moments,
#rp-phone.rp-theme-misty #rp-view-settings,
#rp-phone.rp-theme-misty #rp-view-api-settings,
#rp-phone.rp-theme-misty #rp-view-game,
#rp-phone.rp-theme-misty #rp-view-themes {
  background: var(--rp-home-wall) !important;
  background-size: cover !important;
  background-position: center !important;
}
/* ── THEMES VIEW ── */
/* ── Misty Blue Hydrangea Theme ── */
#rp-phone.rp-theme-misty {
  --rp-frame-bg:linear-gradient(160deg,#f0f4f8,#dce6ef,#e8eff5);
  --rp-frame-sh:0 0 0 1.5px rgba(140,170,200,.3),0 0 0 9px #f5f8fc,0 0 0 10px rgba(140,170,200,.15),0 36px 80px rgba(80,110,140,.25),inset 0 1px 0 rgba(255,255,255,.9);
  --rp-btn-bg:#b0c4d8;
  --rp-island-bg:#1a2635;
  --rp-island-ring:#e8eff5;
  --rp-screen-bg:transparent;
  --rp-sbar-color:#2c4a6a;
  --rp-bat-border:rgba(44,74,106,.4);
  --rp-bat-nub:rgba(44,74,106,.3);
  --rp-lock-wall:linear-gradient(rgba(200,225,245,.08),rgba(180,215,240,.10)),url('https://i.postimg.cc/wjTgWzdY/lan-se-xiu-qiu-yu-bi-lan-da-hai-de-lang-man-xie-hou-bi-zhi-1-guang-yu-Wallpaper-lai-zi-xiao-hong-shu-wang-ye-ban.jpg') center/cover no-repeat;
  --rp-lock-color:#1e3a54;
  --rp-lock-time:#1a2e44;
  --rp-swipe-color:rgba(44,74,106,.35);
  --rp-ln-bg:rgba(240,246,252,.85);
  --rp-ln-bd:rgba(140,175,210,.2);
  --rp-ln-text:rgba(30,58,84,.85);
  --rp-home-wall:linear-gradient(rgba(200,225,245,.06),rgba(180,215,240,.08)),url('https://i.postimg.cc/wjTgWzdY/lan-se-xiu-qiu-yu-bi-lan-da-hai-de-lang-man-xie-hou-bi-zhi-1-guang-yu-Wallpaper-lai-zi-xiao-hong-shu-wang-ye-ban.jpg') center/cover no-repeat;
  --rp-clock-color:rgba(220,238,252,.92);
  --rp-app-lbl:rgba(26,46,68,.85);
  --rp-app-lbl-sh:0 1px 3px rgba(255,255,255,.9);
  --rp-indicator:rgba(44,74,106,.22);
  --rp-widget-bg:rgba(240,248,255,.62);
  --rp-widget-bd:rgba(140,175,210,.28);
  --rp-widget-color:#1a2e44;
  --rp-wd-fill:linear-gradient(90deg,#5b8fb9,#8ab4d4);
  --rp-nav-bg:rgba(240,248,255,.7);
  --rp-nav-bd:rgba(140,175,210,.25);
  --rp-nav-title:rgba(235,248,255,.95);
  --rp-nav-btn:#3d6e9a;
  --rp-msg-bg:transparent;
  --rp-bubbles-bg:transparent;
  --rp-sent-bg:linear-gradient(135deg,#4a7fa8,#6fa3c4);
  --rp-recv-bg:rgba(255,255,255,.88);
  --rp-recv-color:#1a2e44;
  --rp-composer-bg:rgba(240,246,252,.95);
  --rp-composer-bd:rgba(140,175,210,.2);
  --rp-input-bg:rgba(255,255,255,.7);
  --rp-input-bd:rgba(140,175,210,.3);
  --rp-input-color:#1a2e44;
  --rp-send-bg:linear-gradient(135deg,#4a7fa8,#6fa3c4);
  /* Shape & Animation */
  --rp-ico-radius:18px;
  --rp-ico-sh:0 4px 14px rgba(80,120,160,.18),0 0 0 1px rgba(140,175,210,.2);
  --rp-ico-hover-sh:0 8px 24px rgba(80,120,160,.28),0 0 0 1.5px rgba(91,143,185,.4);
  --rp-ico-hover-lift:translateY(-3px) scale(1.05);
  --rp-ico-active:scale(.88);
  --rp-send-size:34px;
  --rp-send-radius:20px 14px 14px 20px;
  --rp-send-sh:0 4px 12px rgba(74,127,168,.4);
  --rp-send-hover-sh:0 6px 20px rgba(74,127,168,.55);
  --rp-input-radius:20px;
  --rp-input-sh:0 2px 8px rgba(140,175,210,.15);
  --rp-input-focus-sh:0 0 0 3px rgba(91,143,185,.25),0 4px 12px rgba(140,175,210,.2);
  --rp-bubble-radius:22px;
  --rp-bubble-radius-out:22px 22px 6px 22px;
  --rp-bubble-radius-in:22px 22px 22px 6px;
  --rp-nav-btn-radius:20px;
  --rp-nav-sh:0 2px 12px rgba(140,175,210,.15);
  --rp-thread-radius:14px;
  --rp-thread-mx:10px;
  --rp-thread-sh:0 2px 8px rgba(80,120,160,.08);
  --rp-moment-radius:14px;
  --rp-widget-radius:22px;
  --rp-widget-sh:0 4px 20px rgba(80,120,160,.15),0 0 0 1px rgba(140,175,210,.2);
  --rp-transition:transform .25s cubic-bezier(.34,1.56,.64,1), box-shadow .25s ease;
  --rp-themes-bg:transparent;
  --rp-themes-label:#3d6e9a;
  --rp-tc-bg:rgba(240,246,252,.9);
  --rp-threads-bg:transparent;
  --rp-thread-bd:rgba(140,175,210,.18);
  --rp-thread-hover:rgba(140,175,210,.08);
  --rp-tn-color:#1a2e44;
  --rp-tp-color:rgba(44,74,106,.5);
  --rp-tt-color:rgba(44,74,106,.4);
  --rp-hd-name:rgba(44,74,106,.6);
  --rp-bts-color:rgba(44,74,106,.35);
  --rp-moments-bg:transparent;
  --rp-moment-card:rgba(240,246,252,.88);
  --rp-moment-name:#3d6e9a;
  --rp-moment-text:#1a2e44;
  --rp-moment-bd:rgba(140,175,210,.15);
}
/* misty home-bg grain texture */
#rp-phone.rp-theme-misty .rp-home-bg::after{content:"";position:absolute;inset:0;pointer-events:none;opacity:.0;background-image:none}
/* misty lock same grain */
#rp-phone.rp-theme-misty .rp-lock-bg::after{content:"";position:absolute;inset:0;pointer-events:none;opacity:.0;background-image:none}
/* star particles - only visible in star theme (via home-bg pseudo-element) */
#rp-phone.rp-theme-star .rp-home-bg::after{content:'';position:absolute;inset:0;pointer-events:none;background-image:radial-gradient(1.2px 1.2px at 12% 18%,rgba(255,255,255,.75) 0%,transparent 100%),radial-gradient(1px 1px at 35% 8%,rgba(255,255,255,.6) 0%,transparent 100%),radial-gradient(1.5px 1.5px at 72% 22%,rgba(255,255,255,.85) 0%,transparent 100%),radial-gradient(1px 1px at 88% 35%,rgba(255,255,255,.55) 0%,transparent 100%),radial-gradient(1.2px 1.2px at 25% 42%,rgba(255,255,255,.65) 0%,transparent 100%),radial-gradient(1px 1px at 58% 55%,rgba(255,255,255,.5) 0%,transparent 100%),radial-gradient(1.5px 1.5px at 45% 70%,rgba(255,255,255,.7) 0%,transparent 100%),radial-gradient(1px 1px at 80% 65%,rgba(255,255,255,.55) 0%,transparent 100%),radial-gradient(1.2px 1.2px at 8% 80%,rgba(255,255,255,.7) 0%,transparent 100%),radial-gradient(1px 1px at 92% 12%,rgba(255,255,255,.6) 0%,transparent 100%),radial-gradient(1px 1px at 62% 88%,rgba(255,255,255,.5) 0%,transparent 100%),radial-gradient(1.5px 1.5px at 18% 60%,rgba(255,255,255,.6) 0%,transparent 100%)}
#rp-view-themes{background:transparent !important;display:flex;flex-direction:column}
.rp-theme-card{background:var(--rp-tc-bg);border-radius:18px;overflow:hidden;cursor:pointer;box-shadow:0 2px 12px rgba(100,60,200,.1);transition:transform .15s,box-shadow .15s}
.rp-theme-card:active{transform:scale(.94)}
.rp-theme-card.rp-tc-active{box-shadow:0 0 0 2.5px #a855f7,0 3px 14px rgba(130,60,200,.25)}
.rp-theme-preview{height:96px;position:relative;display:flex;align-items:center;justify-content:center;overflow:hidden}
.rp-theme-mini{display:flex;flex-direction:column;align-items:center;gap:7px}
.rp-theme-mini-clock{font-size:20px;font-weight:100;letter-spacing:-1px;opacity:.9}
.rp-theme-mini-dots{display:flex;gap:5px}
.rp-theme-mini-dot{width:16px;height:16px;border-radius:5px;background:rgba(255,255,255,.65);box-shadow:0 1px 4px rgba(0,0,0,.15)}
.rp-theme-check{position:absolute;top:8px;right:9px;width:20px;height:20px;background:#a855f7;border-radius:50%;display:flex;align-items:center;justify-content:center;color:#fff;font-size:11px;font-weight:700;box-shadow:0 2px 6px rgba(168,85,247,.5)}
.rp-theme-info{padding:8px 12px 12px}
.rp-theme-name{font-size:12px;font-weight:700;color:var(--rp-nav-title);margin-bottom:2px}
.rp-theme-desc{font-size:10px;color:var(--rp-tp-color);line-height:1.4}
.rp-dark .rp-wd-label{color:rgba(160,175,255,.4)}
.rp-dark .rp-wd-stage{color:#dde0f2}
.rp-dark .rp-wd-track{background:rgba(255,255,255,.1)}
.rp-dark .rp-wd-status{color:rgba(160,175,255,.52)}
.rp-dark .rp-home-indicator{background:rgba(255,255,255,.22)}
/* ── DARK MESSAGES ── */

.rp-dark .rp-thread{border-bottom-color:rgba(255,255,255,.05)}
.rp-dark .rp-thread:hover{background:rgba(255,255,255,.03)}
.rp-dark .rp-tn{color:#dde0f2}
.rp-dark .rp-tp{color:rgba(160,175,255,.46)}
.rp-dark .rp-tt{color:rgba(160,175,255,.36)}
.rp-dark .rp-nav-bar{background:#0c0c1a;border-bottom-color:rgba(255,255,255,.07)}
.rp-dark .rp-nav-title{color:#dde0f2!important}
.rp-dark .rp-back{color:#7090f0 !important}
.rp-dark .rp-nav-add{color:#7090f0 !important}
.rp-dark .rp-hd-name{color:rgba(160,175,255,.62)}
/* ── DARK THREAD ── */


.rp-dark .rp-recv{background:#161628;color:#dde0f2}
.rp-dark .rp-bts{color:rgba(160,175,255,.3)}
.rp-dark #rp-composer{background:#0c0c1a !important;border-top-color:rgba(255,255,255,.06) !important}
.rp-dark #rp-input{background:rgba(255,255,255,.05) !important;border-color:rgba(255,255,255,.1) !important;color:#dde0f2 !important}
.rp-dark #rp-input::placeholder{color:rgba(160,175,255,.3)}
.rp-dark #rp-pending-queue{background:rgba(37,99,235,.05);border-top-color:rgba(37,99,235,.1)}
.rp-dark .rp-pending-item{color:#8aaef0;background:rgba(37,99,235,.12)}
.rp-dark .rp-pending-hint{color:rgba(160,175,255,.3)}
.rp-dark #rp-add-form{background:#12122a}
.rp-dark #rp-add-form h3{color:#dde0f2}
.rp-dark #rp-add-form input{background:rgba(255,255,255,.05);border-color:rgba(255,255,255,.1);color:#dde0f2}
.rp-dark #rp-add-cancel{background:#1c1c38 !important;color:#dde0f2 !important}
.rp-dark #rp-notif-banner{background:rgba(8,8,20,.95);border-color:rgba(255,255,255,.08)}
.rp-dark .rp-nb-from{color:rgba(160,175,255,.5)}
.rp-dark .rp-nb-text{color:#dde0f2}
.rp-dark .rp-nb-time{color:rgba(160,175,255,.36)}
.rp-dark #rp-home-ind{background:rgba(255,255,255,.22)}
/* ── MOMENTS VIEW ── */
#rp-view-moments{background:transparent !important;display:flex;flex-direction:column}

#rp-moments-list{flex:1;overflow-y:auto;scrollbar-width:none;padding-bottom:8px}
#rp-moments-list::-webkit-scrollbar{display:none}
.rp-moment{background:var(--rp-moment-card);margin-bottom:8px;padding:14px 16px}
.rp-dark .rp-moment{background:#0e0e20}
.rp-moment-hd{display:flex;align-items:center;gap:10px;margin-bottom:10px}
.rp-moment-av{width:42px;height:42px;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:700;color:#fff;flex-shrink:0}
.rp-moment-meta{flex:1;min-width:0}
.rp-moment-name{font-size:14px;font-weight:700;color:var(--rp-moment-name)}
.rp-dark .rp-moment-name{color:#8aaef0}
.rp-moment-time{font-size:10.5px;color:rgba(0,0,0,.38);margin-top:2px;font-weight:600}
.rp-dark .rp-moment-time{color:rgba(160,175,255,.38)}
.rp-moment-text{font-size:14px;color:var(--rp-moment-text);line-height:1.65;margin-bottom:10px;word-break:break-word}
.rp-dark .rp-moment-text{color:#d5d8f0}
.rp-moment-bar{display:flex;align-items:center;justify-content:flex-end;gap:2px;padding:6px 0 2px;border-top:1px solid var(--rp-moment-bd)}
.rp-dark .rp-moment-bar{border-top-color:rgba(255,255,255,.06)}
.rp-moment-act{display:inline-flex;align-items:center;gap:4px;padding:5px 10px;border-radius:8px;font-size:12px;font-weight:600;color:rgba(0,0,0,.42);cursor:pointer;transition:background .12s,color .12s;border:none;background:none;font-family:inherit}
.rp-dark .rp-moment-act{color:rgba(160,175,255,.42)}
.rp-moment-act:hover{background:rgba(0,0,0,.04)}
.rp-dark .rp-moment-act:hover{background:rgba(255,255,255,.04)}
.rp-moment-act.rp-liked{color:#e53e3e !important}
.rp-moment-comments-wrap{background:rgba(0,0,0,.03);border-radius:10px;padding:8px 12px;margin-top:8px;display:flex;flex-direction:column;gap:5px}
.rp-dark .rp-moment-comments-wrap{background:rgba(255,255,255,.04)}
.rp-moment-comment{font-size:13px;color:#222;line-height:1.55}
.rp-dark .rp-moment-comment{color:#c0c8e8}
.rp-moment-cname{color:#2563eb;font-weight:700}
.rp-dark .rp-moment-cname{color:#8aaef0}
.rp-moment-reply-btn{color:rgba(0,0,0,.35);font-size:11px;cursor:pointer;margin-left:6px}
.rp-dark .rp-moment-reply-btn{color:rgba(160,175,255,.35)}
.rp-moment-input-row{display:flex;gap:6px;margin-top:8px;padding-top:6px;border-top:1px solid rgba(0,0,0,.06)}
.rp-dark .rp-moment-input-row{border-top-color:rgba(255,255,255,.06)}
.rp-moment-cinput{flex:1;background:rgba(0,0,0,.04);border:1px solid rgba(0,0,0,.1);border-radius:8px;padding:6px 10px;font-size:12.5px;color:#1a1a1a;font-family:inherit;outline:none}
.rp-dark .rp-moment-cinput{background:rgba(255,255,255,.05);border-color:rgba(255,255,255,.1);color:#d5d8f0}
.rp-moment-csend{background:#2563eb;color:#fff;border:none;border-radius:8px;padding:6px 12px;font-size:12px;font-weight:700;cursor:pointer;font-family:inherit;white-space:nowrap;flex-shrink:0}
.rp-moment-csend:hover{opacity:.85}
.rp-moments-empty{display:flex;flex-direction:column;align-items:center;justify-content:center;height:200px;color:rgba(0,0,0,.3);font-size:13px;gap:8px}
.rp-dark .rp-moments-empty{color:rgba(160,175,255,.3)}

/* ── AVATAR IMAGES ── */
.rp-av-img,.rp-moment-av.rp-av-img{overflow:hidden;padding:0}
.rp-av-photo{width:100%;height:100%;object-fit:cover;display:block;border-radius:inherit}
/* ── SETTINGS VIEW ── */
#rp-view-settings{background:transparent;display:flex;flex-direction:column;overflow-y:auto}
#rp-view-api-settings{background:transparent;display:flex;flex-direction:column}
.rp-dark #rp-view-settings{background:transparent}
.rp-set-section{background:#fff;border-radius:12px;margin:10px 12px 0;padding:0 14px;overflow:hidden}
.rp-dark .rp-set-section{background:rgba(255,255,255,.04)}
.rp-set-section-title{font-size:12px;font-weight:600;color:#8a8a9a;text-transform:uppercase;letter-spacing:.05em;margin:16px 12px 5px;padding:0}
.rp-dark .rp-set-section-title{color:#6a6a7a}
.rp-set-row{display:flex;align-items:center;padding:11px 0;border-bottom:1px solid rgba(0,0,0,.06);gap:10px;min-height:44px}
.rp-dark .rp-set-row{border-bottom-color:rgba(255,255,255,.05)}
.rp-set-row:last-child{border-bottom:none}
.rp-set-key{font-size:15px;color:#1a1a2e;flex:1}
.rp-dark .rp-set-key{color:#c8cce8}
.rp-set-hint{font-size:12px;color:#8a8a9a;flex:1}
.rp-dark .rp-set-hint{color:rgba(200,190,255,.45)}
.rp-set-select{font-size:14px;color:#3a3a5e;background:rgba(0,0,0,.04);border:1px solid rgba(0,0,0,.1);border-radius:8px;padding:4px 8px;font-family:inherit;max-width:150px;outline:none}
.rp-dark .rp-set-select{background:rgba(255,255,255,.06);border-color:rgba(255,255,255,.1);color:#c0c4e0}
.rp-avatar-upload-btn{font-size:13.5px;color:#2563eb;background:rgba(37,99,235,.08);border:1px solid rgba(37,99,235,.18);border-radius:8px;padding:6px 12px;cursor:pointer;flex-shrink:0;display:inline-flex;align-items:center;gap:4px}
.rp-dark .rp-avatar-upload-btn{color:#7090f0;background:rgba(112,144,240,.12);border-color:rgba(112,144,240,.2)}
.rp-set-upload-btn{font-size:13.5px;font-family:inherit;padding:8px 12px;border-radius:10px;border:none;cursor:pointer;background:rgba(0,0,0,.06);color:#333;white-space:nowrap;display:flex;align-items:center;justify-content:center;gap:4px}
.rp-dark .rp-set-upload-btn{background:rgba(255,255,255,.08);color:#c8cce8}
.rp-wall-reset-btn{background:rgba(0,0,0,.05)!important;color:#666!important}
.rp-dark .rp-wall-reset-btn{background:rgba(255,255,255,.06)!important;color:rgba(200,190,255,.6)!important}
.rp-set-avatar-preview{width:38px;height:38px;border-radius:19px;overflow:hidden;flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:700;color:#fff}

/* ===== DIARY VIEW ===== */
#rp-view-diary{background:transparent;display:flex;flex-direction:column;overflow:hidden}
.rp-diary-gen-btn{background:none;border:none;cursor:pointer;color:var(--rp-nav-btn,#2563eb);width:32px;height:32px;border-radius:50%;display:flex;align-items:center;justify-content:center;transition:transform .3s;flex-shrink:0}
.rp-diary-gen-btn:disabled{opacity:.35;cursor:default}
.rp-diary-gen-btn.rp-spinning{animation:rpSpin .7s linear infinite}
.rp-diary-entry{margin-bottom:14px;border-radius:14px;overflow:hidden;background:rgba(255,255,255,.55);border:1px solid rgba(255,255,255,.6);box-shadow:0 2px 12px rgba(0,0,0,.06)}
.rp-diary-hd{padding:10px 14px 6px}
.rp-diary-meta{display:flex;flex-direction:column}
.rp-diary-author{font-size:13px;font-weight:600;color:#1a1a2e}
.rp-diary-date{font-size:11px;color:#888}
.rp-diary-body{font-size:14px;line-height:1.7;color:#1a1a2e;padding:0 14px 10px;word-break:break-word}
.rp-diary-ai-badge{font-size:10px;background:rgba(236,72,153,.12);color:#ec4899;border-radius:8px;padding:1px 6px;margin-left:4px;vertical-align:middle}
.rp-diary-reply{background:rgba(200,50,100,.04);border-top:1px solid rgba(200,50,100,.08);padding:8px 14px}
.rp-diary-reply-name{font-size:12px;font-weight:600;color:#c0306a;margin-bottom:2px}
.rp-diary-reply-text{font-size:13px;color:#333;line-height:1.6}
.rp-diary-compose{flex-shrink:0;padding:10px 14px 18px;border-top:1px solid rgba(192,48,106,.1);display:flex;flex-direction:column;gap:8px}
.rp-diary-input{width:100%;box-sizing:border-box;border:1px solid rgba(0,0,0,.1);border-radius:12px;padding:10px 12px;font-size:14px;font-family:inherit;resize:none;outline:none;background:rgba(255,255,255,.7)!important;color:#1a1a2e!important;line-height:1.6}
.rp-diary-input::placeholder{color:rgba(60,60,80,.38)}
.rp-diary-send-btn{align-self:flex-end;padding:8px 22px;border-radius:20px;border:none;cursor:pointer;font-size:14px;font-weight:700;color:#fff;background:linear-gradient(135deg,#f97316,#ec4899)}
.rp-diary-send-btn:disabled{opacity:.45;cursor:default}
.rp-diary-empty{text-align:center;color:rgba(0,0,0,.3);padding:40px 0;font-size:14px}
.rp-dark .rp-diary-entry{background:rgba(255,255,255,.05);border-color:rgba(255,255,255,.08)}
.rp-dark .rp-diary-author{color:#dde0f2}
.rp-dark .rp-diary-date{color:rgba(200,190,255,.5)}
.rp-dark .rp-diary-body{color:#d5d8f0}
.rp-dark .rp-diary-reply{background:rgba(255,255,255,.04);border-top-color:rgba(255,255,255,.07)}
.rp-dark .rp-diary-reply-text{color:#c8cce8}
.rp-dark .rp-diary-compose{border-top-color:rgba(255,255,255,.07)}
.rp-dark .rp-diary-input{background:rgba(255,255,255,.07)!important;border-color:rgba(255,255,255,.12);color:#e0e4ff!important}
#rp-phone.rp-theme-star .rp-diary-entry{background:rgba(30,15,80,.55);border-color:rgba(140,110,255,.25)}
#rp-phone.rp-theme-star .rp-diary-author{color:#d4c8ff}
#rp-phone.rp-theme-star .rp-diary-date{color:rgba(180,165,255,.55)}
#rp-phone.rp-theme-star .rp-diary-body{color:#c8c0f0}
#rp-phone.rp-theme-star .rp-diary-reply{background:rgba(140,100,255,.08);border-top-color:rgba(140,110,255,.15)}
#rp-phone.rp-theme-star .rp-diary-reply-name{color:#a78bfa}
#rp-phone.rp-theme-star .rp-diary-reply-text{color:#c0b8e8}
#rp-phone.rp-theme-star .rp-diary-compose{border-top-color:rgba(140,110,255,.2)}
#rp-phone.rp-theme-star .rp-diary-input{background:rgba(28,14,72,.65)!important;border-color:rgba(140,110,255,.3);color:#e0d8ff!important}
#rp-phone.rp-theme-star .rp-diary-input::placeholder{color:rgba(180,165,255,.45)}
#rp-phone.rp-theme-star .rp-diary-send-btn{background:linear-gradient(135deg,#7c3aed,#a855f7)}
#rp-phone.rp-theme-star .rp-diary-empty{color:rgba(180,165,255,.35)}
#rp-phone.rp-theme-star #rp-gen-diary{color:#a78bfa}
#rp-phone.rp-theme-misty .rp-diary-entry{background:rgba(235,248,255,.76);border-color:rgba(100,170,220,.35);backdrop-filter:blur(10px) saturate(1.2);-webkit-backdrop-filter:blur(10px) saturate(1.2)}
#rp-phone.rp-theme-misty .rp-diary-author{color:#0a1828;font-weight:700}
#rp-phone.rp-theme-misty .rp-diary-date{color:rgba(40,80,130,.8)}
#rp-phone.rp-theme-misty .rp-diary-body{color:#0d1e30;line-height:1.75}
#rp-phone.rp-theme-misty .rp-diary-reply{background:rgba(60,120,180,.12);border-top-color:rgba(100,170,220,.28)}
#rp-phone.rp-theme-misty .rp-diary-reply-name{color:#1a5a8a;font-weight:700}
#rp-phone.rp-theme-misty .rp-diary-reply-text{color:#0d1e30}
#rp-phone.rp-theme-misty .rp-diary-compose{border-top-color:rgba(100,170,220,.2)}
#rp-phone.rp-theme-misty .rp-diary-input{background:rgba(235,248,255,.72)!important;border-color:rgba(100,170,220,.4);color:#0a1828!important}
#rp-phone.rp-theme-misty .rp-diary-input::placeholder{color:rgba(44,90,140,.4)}
#rp-phone.rp-theme-misty .rp-diary-send-btn{background:linear-gradient(135deg,#0ea5e9,#38bdf8)}
#rp-phone.rp-theme-misty .rp-diary-empty{color:rgba(44,74,106,.4)}
#rp-phone.rp-theme-misty #rp-gen-diary{color:rgba(220,238,252,.90)!important;filter:drop-shadow(0 1px 3px rgba(0,20,60,.43))!important}
/* Candy gen-diary explicit (candy has no theme class, CSS var handles it but be safe) */
#rp-gen-diary{color:var(--rp-nav-btn,#c0306a)}
/* Diary icon - BASE = Candy (no theme class on #rp-phone for candy) */
.rp-ico-diary{color:#c03060!important;filter:drop-shadow(0 0 5px rgba(255,255,255,.7)) drop-shadow(0 1px 4px rgba(200,60,90,.5))!important}
/* Diary icon - Star override */
#rp-phone.rp-theme-star .rp-ico-diary{color:#ffffff!important;filter:drop-shadow(0 0 6px rgba(160,130,255,.7)) drop-shadow(0 1px 3px rgba(0,0,0,.5))!important}
/* Diary icon - Misty override */
#rp-phone.rp-theme-misty .rp-ico-diary{color:rgba(222,240,253,.91)!important;filter:drop-shadow(0 1px 3px rgba(0,20,80,.48)) drop-shadow(0 0 4px rgba(0,10,50,.28))!important}

/* Games icon - align style with other linear icons */
.rp-ico-games{color:#c03060!important;filter:drop-shadow(0 0 5px rgba(255,255,255,.7)) drop-shadow(0 1px 4px rgba(200,60,90,.5))!important}
#rp-phone.rp-theme-star .rp-ico-games{color:#ffffff!important;filter:drop-shadow(0 0 6px rgba(160,130,255,.7)) drop-shadow(0 1px 3px rgba(0,0,0,.5))!important}
#rp-phone.rp-theme-misty .rp-ico-games{color:rgba(222,240,253,.91)!important;filter:drop-shadow(0 1px 3px rgba(0,20,80,.48)) drop-shadow(0 0 4px rgba(0,10,50,.28))!important}

/* XHS icon - keep consistent with other line icons across themes */
.rp-ico-xhs{color:#c03060!important;filter:drop-shadow(0 0 5px rgba(255,255,255,.7)) drop-shadow(0 1px 4px rgba(200,60,90,.5))!important}
.rp-ico-xhs svg{width:100%;height:100%;display:block}
#rp-phone.rp-theme-star .rp-ico-xhs{color:#ffffff!important;filter:drop-shadow(0 0 6px rgba(160,130,255,.7)) drop-shadow(0 1px 3px rgba(0,0,0,.5))!important}
#rp-phone.rp-theme-misty .rp-ico-xhs{color:rgba(222,240,253,.91)!important;filter:drop-shadow(0 1px 3px rgba(0,20,80,.48)) drop-shadow(0 0 4px rgba(0,10,50,.28))!important}

/* ══ 2048 GAME ══ */
#rp-view-g2048{position:relative;background:transparent;display:flex;flex-direction:column;overflow:hidden;height:100%}
#g2048-header{display:flex;align-items:center;justify-content:space-between;padding:6px 14px;flex-shrink:0}
#g2048-scores{display:flex;gap:7px}
.g2048-sbox{background:rgba(255,255,255,.82);border:1px solid rgba(0,0,0,.08);border-radius:7px;padding:3px 10px;text-align:center;min-width:50px;box-shadow:0 1px 4px rgba(0,0,0,.1)}
.g2048-slbl{font-size:9.5px;font-weight:700;color:rgba(60,40,30,.65);text-transform:uppercase;letter-spacing:.04em}
#g2048-score,#g2048-best{font-size:15px;font-weight:800;color:#4a3728}
#g2048-turn{font-size:11.5px;font-weight:600;color:#fff;background:rgba(0,0,0,.38);padding:2px 10px;border-radius:12px;text-shadow:0 1px 3px rgba(0,0,0,.5)}
#g2048-newbtn{background:none;border:none;color:var(--rp-nav-btn,#c0306a);font-size:13px;font-weight:600;cursor:pointer;padding:4px 6px}
#g2048-board-wrap{display:flex;justify-content:center;padding:4px 0 2px;flex-shrink:0}
#g2048-board{display:grid;grid-template-columns:repeat(4,1fr);grid-template-rows:repeat(4,1fr);gap:5px;padding:6px;background:rgba(195,95,128,.52);border-radius:9px;width:214px;height:214px;box-shadow:0 3px 12px rgba(160,40,80,.2)}
.g2048-cell{background:rgba(235,165,185,.42);border-radius:4px;display:flex;align-items:center;justify-content:center;overflow:hidden;min-width:0;min-height:0}
@keyframes g2048Pop{0%{transform:scale(.72)}55%{transform:scale(1.12)}100%{transform:scale(1)}}
@keyframes g2048Merge{0%{transform:scale(1)}40%{transform:scale(1.22)}100%{transform:scale(1)}}
.g2048-tile{width:100%;height:100%;border-radius:4px;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:22px;animation:g2048Pop .14s ease-out}
#g2048-dpad{display:flex;justify-content:center;gap:5px;padding:3px 0;flex-shrink:0}
.g2048-drow{display:none}
.g2048-dir{width:34px;height:24px;border-radius:7px;border:none;background:rgba(187,173,160,.5);color:#776e65;font-size:14px;font-weight:700;cursor:pointer;display:flex;align-items:center;justify-content:center}
.g2048-dir:active{background:rgba(187,173,160,.85)}
#g2048-chat{flex:1 1 0;min-height:0;overflow-y:auto;padding:5px 8px;display:flex;flex-direction:column;gap:2px;margin:0 8px;background:rgba(0,0,0,.28);border-radius:8px;backdrop-filter:blur(5px);cursor:pointer}
#g2048-chat::-webkit-scrollbar{display:none}
#g2048-input-row{display:flex;gap:6px;padding:6px 12px 10px;flex-shrink:0;border-top:1px solid rgba(0,0,0,.06)}
#g2048-input{flex:1;border-radius:18px;border:1px solid rgba(0,0,0,.12);padding:6px 12px;font-size:13px;background:rgba(255,255,255,.88);font-family:inherit;outline:none;color:#1a1008}
#g2048-send{width:34px;height:34px;border-radius:50%;background:linear-gradient(135deg,#e05888,#c0306a);border:none;color:#fff;font-weight:800;cursor:pointer;font-size:16px;flex-shrink:0;display:flex;align-items:center;justify-content:center;box-shadow:0 2px 8px rgba(160,30,80,.4)}
#g2048-over{position:absolute;inset:0;background:rgba(0,0,0,.62);z-index:50;flex-direction:column;align-items:center;justify-content:center;gap:12px;display:none}
.g2048-over-emoji{font-size:52px;line-height:1}
.g2048-over-title{font-size:20px;font-weight:800;color:#fff}
.g2048-over-sub{font-size:13px;color:rgba(255,255,255,.8);text-align:center;padding:0 20px}
.g2048-over-btn{padding:9px 18px;border-radius:20px;border:none;background:linear-gradient(135deg,#f472b6,#a855f7);color:#fff;font-weight:700;font-size:13px;cursor:pointer}

/* 2048 fullscreen chat */
#g2048-chat-hint{font-size:9.5px;color:rgba(240,225,205,.55);text-align:right;padding:0 16px 2px;flex-shrink:0;text-shadow:0 1px 2px rgba(0,0,0,.5)}
#g2048-chat-fs{position:absolute;inset:0;z-index:40;background:rgba(0,0,0,.78);backdrop-filter:blur(8px);display:flex;flex-direction:column}
#g2048-chat-fs-hd{display:flex;align-items:center;justify-content:space-between;padding:52px 16px 10px;flex-shrink:0;border-bottom:1px solid rgba(255,255,255,.12)}
#g2048-chat-fs-title{color:#fff;font-weight:600;font-size:14px}
#g2048-chat-fs-close{background:rgba(255,255,255,.15);border:1px solid rgba(255,255,255,.2);border-radius:50%;color:#fff;font-size:16px;cursor:pointer;width:32px;height:32px;display:flex;align-items:center;justify-content:center}
#g2048-chat-fs-body{flex:1;overflow-y:auto;padding:8px 14px;display:flex;flex-direction:column;gap:4px}
#g2048-chat-fs-body::-webkit-scrollbar{display:none}
#g2048-chat-fs-body .game-msg{font-size:13px;line-height:1.6;padding:3px 0}
#g2048-chat-fs-body .game-msg-sys{color:rgba(240,230,215,.88)}
#g2048-chat-fs-body .game-msg-user{color:#ffd6e8;font-weight:600}
#g2048-chat-fs-body .game-msg-char{color:#fce8ff;font-weight:600}
#rp-phone.rp-theme-star #g2048-chat-fs-body .game-msg-sys{color:rgba(210,200,255,.88)}
#rp-phone.rp-theme-star #g2048-chat-fs-body .game-msg-user{color:#f0c0ff}
#rp-phone.rp-theme-star #g2048-chat-fs-body .game-msg-char{color:#c8b8ff}
#rp-phone.rp-theme-misty #g2048-chat-fs-body .game-msg-sys{color:rgba(200,228,255,.92)}
#rp-phone.rp-theme-misty #g2048-chat-fs-body .game-msg-user{color:rgba(255,210,228,.92)}
#rp-phone.rp-theme-misty #g2048-chat-fs-body .game-msg-char{color:rgba(185,228,255,.95)}


/* 2048 API tip blink */
@keyframes g2048TipBlink{0%,100%{opacity:1}50%{opacity:.55}}
#g2048-api-tip{font-size:11px;text-align:center;padding:3px 14px 0;flex-shrink:0;animation:g2048TipBlink 2.4s ease-in-out infinite;color:#8a0030;font-weight:700;text-shadow:-1px -1px 0 #fff,1px -1px 0 #fff,-1px 1px 0 #fff,1px 1px 0 #fff,0 0 6px rgba(255,255,255,.9)}
#rp-phone.rp-theme-star #g2048-api-tip{color:#e8d8ff;text-shadow:-1px -1px 0 rgba(20,0,60,.9),1px -1px 0 rgba(20,0,60,.9),-1px 1px 0 rgba(20,0,60,.9),1px 1px 0 rgba(20,0,60,.9),0 0 8px rgba(100,50,200,.6)}
#rp-phone.rp-theme-misty #g2048-api-tip{color:#002a5c;text-shadow:-1px -1px 0 rgba(255,255,255,.95),1px -1px 0 rgba(255,255,255,.95),-1px 1px 0 rgba(255,255,255,.95),1px 1px 0 rgba(255,255,255,.95),0 0 6px rgba(255,255,255,.8)}

/* 2048 chat message colors */
#g2048-chat .game-msg{font-size:12px;line-height:1.55;padding:2px 0;font-weight:500}
/* Candy default: warm white on dark overlay */
#g2048-chat .game-msg-sys{color:rgba(255,240,225,.90);text-shadow:0 0 4px rgba(0,0,0,.8),0 1px 3px rgba(0,0,0,.6)}
#g2048-chat .game-msg-user{color:#ffd6e8;font-weight:600;text-shadow:0 0 4px rgba(0,0,0,.8),0 1px 3px rgba(0,0,0,.6)}
#g2048-chat .game-msg-char{color:#fce8ff;font-weight:600}
/* Star: purple-tinted */
#rp-phone.rp-theme-star #g2048-chat{background:rgba(8,2,30,.52)!important}
#rp-phone.rp-theme-star #g2048-chat .game-msg-sys{color:rgba(210,200,255,.88)}
#rp-phone.rp-theme-star #g2048-chat .game-msg-user{color:#f0c0ff}
#rp-phone.rp-theme-star #g2048-chat .game-msg-char{color:#c8b8ff}
/* Misty: blue-tinted overlay + blue-white text */
#rp-phone.rp-theme-misty #g2048-chat{background:rgba(0,15,40,.42)!important}
#rp-phone.rp-theme-misty #g2048-chat .game-msg-sys{color:rgba(200,228,255,.92);text-shadow:0 0 4px rgba(0,10,40,.8)}
#rp-phone.rp-theme-misty #g2048-chat .game-msg-user{color:rgba(255,210,228,.92);text-shadow:0 0 4px rgba(0,10,40,.8)}
#rp-phone.rp-theme-misty #g2048-chat .game-msg-char{color:rgba(185,228,255,.95)}

/* ── 2048 tile colors (Candy warm) ── */
/* Candy: pink-rose palette */
.g2048-tile[data-v="2"]{background:#f9dce5;color:#9a3555}
.g2048-tile[data-v="4"]{background:#f5c6d5;color:#8a2a4a}
.g2048-tile[data-v="8"]{background:#f0a0b8;color:#fff}
.g2048-tile[data-v="16"]{background:#e87aa0;color:#fff}
.g2048-tile[data-v="32"]{background:#e05888;color:#fff}
.g2048-tile[data-v="64"]{background:#d83070;color:#fff}
.g2048-tile[data-v="128"]{background:#c82068;color:#ffd6e8}
.g2048-tile[data-v="256"]{background:linear-gradient(135deg,#e03878,#c02060);color:#fff}
.g2048-tile[data-v="512"]{background:linear-gradient(135deg,#d02870,#a81858);color:#fff}
.g2048-tile[data-v="1024"]{background:linear-gradient(135deg,#c01868,#900048);color:#fff}
.g2048-tile[data-v="2048"]{background:linear-gradient(135deg,#ff6699,#e0205a,#c01050);color:#fff}
.g2048-tile[data-v="high"]{background:#7a0035;color:#ffd6e8}
/* ── Star theme tiles (purple) ── */
#rp-phone.rp-theme-star .g2048-tile[data-v="2"]{background:rgba(55,15,105,.55);color:#c8b8ff}
#rp-phone.rp-theme-star .g2048-tile[data-v="4"]{background:rgba(70,20,135,.65);color:#d4c8ff}
#rp-phone.rp-theme-star .g2048-tile[data-v="8"]{background:rgba(90,28,170,.75);color:#e8e0ff}
#rp-phone.rp-theme-star .g2048-tile[data-v="16"]{background:rgba(110,32,195,.8);color:#f0ebff}
#rp-phone.rp-theme-star .g2048-tile[data-v="32"]{background:rgba(135,22,205,.85);color:#fff}
#rp-phone.rp-theme-star .g2048-tile[data-v="64"]{background:rgba(155,18,215,.9);color:#fff}
#rp-phone.rp-theme-star .g2048-tile[data-v="128"]{background:linear-gradient(135deg,rgba(80,8,150,.95),rgba(140,10,200,.95));color:#ffd8ff}
#rp-phone.rp-theme-star .g2048-tile[data-v="256"]{background:linear-gradient(135deg,rgba(100,5,160,.95),rgba(160,8,210,.95));color:#fff}
#rp-phone.rp-theme-star .g2048-tile[data-v="512"]{background:linear-gradient(135deg,rgba(120,0,170,.95),rgba(180,5,220,.95));color:#fff}
#rp-phone.rp-theme-star .g2048-tile[data-v="1024"]{background:linear-gradient(135deg,#4c0080,#7c00c8);color:#fff}
#rp-phone.rp-theme-star .g2048-tile[data-v="2048"]{background:linear-gradient(135deg,#9333ea,#c026d3);color:#fff}
#rp-phone.rp-theme-star .g2048-tile[data-v="high"]{background:#2d0060;color:#e8d0ff}
/* ── Misty theme tiles (blue) ── */
#rp-phone.rp-theme-misty .g2048-tile[data-v="2"]{background:rgba(185,218,242,.52);color:#0e2540}
#rp-phone.rp-theme-misty .g2048-tile[data-v="4"]{background:rgba(165,208,238,.62);color:#0e2540}
#rp-phone.rp-theme-misty .g2048-tile[data-v="8"]{background:rgba(82,158,222,.78);color:#fff}
#rp-phone.rp-theme-misty .g2048-tile[data-v="16"]{background:rgba(58,140,212,.84);color:#fff}
#rp-phone.rp-theme-misty .g2048-tile[data-v="32"]{background:rgba(38,118,195,.88);color:#fff}
#rp-phone.rp-theme-misty .g2048-tile[data-v="64"]{background:rgba(18,95,178,.92);color:#fff}
#rp-phone.rp-theme-misty .g2048-tile[data-v="128"]{background:linear-gradient(135deg,rgba(45,125,205,.95),rgba(20,85,175,.95));color:#d8f0ff}
#rp-phone.rp-theme-misty .g2048-tile[data-v="256"]{background:linear-gradient(135deg,rgba(30,108,192,.95),rgba(10,70,162,.95));color:#e8f5ff}
#rp-phone.rp-theme-misty .g2048-tile[data-v="512"]{background:linear-gradient(135deg,rgba(15,90,178,.95),rgba(5,55,148,.95));color:#fff}
#rp-phone.rp-theme-misty .g2048-tile[data-v="1024"]{background:linear-gradient(135deg,#0369a1,#0c4a6e);color:#fff}
#rp-phone.rp-theme-misty .g2048-tile[data-v="2048"]{background:linear-gradient(135deg,#0ea5e9,#06b6d4);color:#fff}
#rp-phone.rp-theme-misty .g2048-tile[data-v="high"]{background:#073763;color:#d0eeff}

/* Star theme 2048 */
#rp-phone.rp-theme-star #g2048-board{background:rgba(20,8,60,.82)}
#rp-phone.rp-theme-star .g2048-cell{background:rgba(60,25,120,.45)}
#rp-phone.rp-theme-star .g2048-sbox{background:rgba(25,10,65,.88)!important;border-color:rgba(140,110,255,.3)}
#rp-phone.rp-theme-star .g2048-slbl{color:rgba(180,165,255,.72)}
#rp-phone.rp-theme-star #g2048-score,#rp-phone.rp-theme-star #g2048-best{color:#ddd4ff!important;font-weight:800}
#rp-phone.rp-theme-star #g2048-turn{color:#e8e0ff!important;background:rgba(18,6,55,.78)!important}
#rp-phone.rp-theme-star .g2048-dir{background:rgba(80,40,160,.45);color:#c8b8ff;border:1px solid rgba(140,110,255,.2)}
#rp-phone.rp-theme-star #g2048-input{background:rgba(30,14,72,.82)!important;border-color:rgba(140,110,255,.35);color:#e8e0ff}
#rp-phone.rp-theme-star #g2048-send{background:linear-gradient(135deg,#7c3aed,#a855f7)!important;color:#fff!important;box-shadow:0 2px 8px rgba(100,30,200,.4)!important}
#rp-phone.rp-theme-star #g2048-input::placeholder{color:rgba(200,185,255,.4)}
#rp-phone.rp-theme-star #g2048-turn{color:rgba(200,185,255,.65)!important}
#rp-phone.rp-theme-star .g2048-dir:active{background:rgba(120,60,200,.7)}
/* Misty theme 2048 */
#rp-phone.rp-theme-misty #g2048-board{background:rgba(80,130,180,.58)}
#rp-phone.rp-theme-misty .g2048-cell{background:rgba(160,200,230,.38)}
#rp-phone.rp-theme-misty .g2048-sbox{background:rgba(225,242,255,.88)!important;border-color:rgba(100,170,220,.25)}
#rp-phone.rp-theme-misty .g2048-slbl{color:rgba(10,40,80,.65)}
#rp-phone.rp-theme-misty #g2048-score,#rp-phone.rp-theme-misty #g2048-best{color:#0a1828!important;font-weight:800}
#rp-phone.rp-theme-misty #g2048-turn{color:rgba(220,238,252,.95)!important;background:rgba(0,30,70,.55)!important;text-shadow:0 1px 3px rgba(0,20,60,.6)}
#rp-phone.rp-theme-misty .g2048-dir{background:rgba(180,215,240,.55);color:#0a2035;border:1px solid rgba(100,160,210,.25)}
#rp-phone.rp-theme-misty #g2048-input{background:rgba(235,248,255,.7)!important;border-color:rgba(100,170,220,.3);color:#0a1828}
#rp-phone.rp-theme-misty #g2048-send{background:linear-gradient(135deg,#0ea5e9,#0369a1)!important;color:#fff!important;box-shadow:0 2px 8px rgba(0,80,160,.35)!important}
#rp-phone.rp-theme-misty .g2048-dir:active{background:rgba(130,185,230,.8)}
/* ── COMPOSE MODAL ── */
/* ── Compose Modal ── */
/* ══════════════════════════════════════════════════════════
   COMPOSE MODAL - 磨砂壁纸玻璃效果（三主题通用）
   结构：::before=模糊壁纸  ::after=主题色调层  子元素z-index:2
   ══════════════════════════════════════════════════════════ */
#rp-compose-modal {
  position:absolute; inset:0; z-index:700;
  background: transparent;
  display:flex; flex-direction:column;
  overflow: hidden;
}
/* 弹起动画 */
@keyframes rp-compose-rise {
  from { opacity:0; transform: translateY(28px) scale(.98); }
  to   { opacity:1; transform: translateY(0)   scale(1);   }
}
#rp-compose-modal[style*="block"],
#rp-compose-modal:not([style*="none"]) {
  animation: rp-compose-rise .28s cubic-bezier(.22,1,.36,1) both;
}

/* ── 第1层：磨砂壁纸 ── */
#rp-compose-modal::before {
  content:'';
  position:absolute; inset:-40px; /* 超出边界消除 blur 边缘白边 */
  z-index:0;
  background-image: var(--rp-home-wall);
  background-size: cover;
  background-position: center;
  filter: blur(30px) saturate(1.35) brightness(1.04);
}
/* ── 第2层：主题色调染色 ── */
#rp-compose-modal::after {
  content:'';
  position:absolute; inset:0;
  z-index:1;
  background: rgba(255,245,250,0.64); /* 默认(Candy) 暖白粉 */
}
/* ── 所有直接子元素浮在最上面 ── */
#rp-compose-modal > * {
  position: relative;
  z-index: 2;
}

/* ── Star 主题：深紫黑染色 ── */
#rp-phone.rp-theme-star  #rp-compose-modal::after { background: rgba(6,3,22,.82); }
/* ── Misty 主题：清冷蓝染色 ── */
#rp-phone.rp-theme-misty #rp-compose-modal::after { background: rgba(222,240,255,.66); }
/* ── Dark mode ── */
.rp-dark #rp-compose-modal::after { background: rgba(4,3,18,.86); }

/* ══ 导航栏 - 更亮玻璃条，带模糊分隔感 ══ */
#rp-compose-modal .rp-nav-bar {
  background: rgba(255,255,255,.55) !important;
  backdrop-filter: blur(20px) saturate(1.6) !important;
  -webkit-backdrop-filter: blur(20px) saturate(1.6) !important;
  border-bottom: 1px solid rgba(255,255,255,.45) !important;
  box-shadow: 0 1px 0 rgba(0,0,0,.05) !important;
}
#rp-phone.rp-theme-star  #rp-compose-modal .rp-nav-bar {
  background: rgba(10,5,32,.55) !important;
  border-bottom-color: rgba(140,110,255,.2) !important;
  box-shadow: 0 1px 0 rgba(140,100,255,.1) !important;
}
#rp-phone.rp-theme-misty #rp-compose-modal .rp-nav-bar {
  background: rgba(220,238,255,.55) !important;
  border-bottom-color: rgba(80,150,210,.18) !important;
  box-shadow: 0 1px 0 rgba(80,150,210,.08) !important;
}
.rp-dark #rp-compose-modal .rp-nav-bar {
  background: rgba(6,4,22,.55) !important;
  border-bottom-color: rgba(255,255,255,.07) !important;
}

/* ══ compose body ══ */
.rp-compose-body {
  flex:1; overflow-y:auto; padding:14px 14px 24px;
  display:flex; flex-direction:column; gap:12px;
}

/* user row */
.rp-compose-user-row {
  display:flex; align-items:center; gap:12px;
  padding: 12px 16px 0;
}
.rp-compose-avatar {
  width:42px; height:42px; border-radius:50%;
  background: linear-gradient(145deg, #64748b, #475569);
  display:flex; align-items:center; justify-content:center;
  font-size:15px; font-weight:700; color:#fff; flex-shrink:0;
  box-shadow: 0 2px 10px rgba(0,0,0,.18), 0 0 0 2px rgba(255,255,255,.5);
}
.rp-compose-uname {
  font-size:15px; font-weight:700; color:var(--rp-moment-name);
  text-shadow: 0 1px 6px rgba(0,0,0,.08);
}

/* ══ 玻璃卡片 ══ */
.rp-compose-card {
  background: rgba(255,255,255,.55);
  backdrop-filter: blur(18px) saturate(1.5);
  -webkit-backdrop-filter: blur(18px) saturate(1.5);
  border-radius: 18px;
  border: 1px solid rgba(255,255,255,.75);
  box-shadow: 0 4px 24px rgba(0,0,0,.08), 0 1px 0 rgba(255,255,255,.6) inset;
  padding: 14px 16px;
  display:flex; flex-direction:column; gap:0;
  margin: 0;
}
#rp-phone.rp-theme-star  .rp-compose-card {
  background: rgba(20,10,55,.50) !important;
  border-color: rgba(140,110,255,.28) !important;
  box-shadow: 0 4px 28px rgba(0,0,0,.35), 0 1px 0 rgba(160,130,255,.15) inset !important;
}
#rp-phone.rp-theme-misty .rp-compose-card {
  background: rgba(215,238,255,.52) !important;
  border-color: rgba(100,170,220,.28) !important;
  box-shadow: 0 4px 24px rgba(0,60,120,.1), 0 1px 0 rgba(180,220,255,.6) inset !important;
}
.rp-dark .rp-compose-card {
  background: rgba(12,8,36,.52) !important;
  border-color: rgba(140,110,255,.2) !important;
  box-shadow: 0 4px 24px rgba(0,0,0,.4), 0 1px 0 rgba(140,110,255,.1) inset !important;
}

/* textarea */
#rp-compose-text {
  width:100%; min-height:100px;
  border:none; background:transparent !important;
  font-size:15px; color:#1a1a2e;
  resize:none; outline:none;
  font-family:inherit; line-height:1.75;
  box-sizing:border-box;
}
/* compose-text: default(candy) card is white-ish → dark text; others override */
#rp-compose-text { color: #1a1a2e !important; background: transparent !important; }
#rp-phone.rp-theme-star #rp-compose-text {
  background: rgba(28,14,72,.65) !important;
  color: #e8e4ff !important;
  border-radius: 10px !important;
  padding: 8px 10px !important;
}
#rp-phone.rp-theme-misty #rp-compose-text {
  background: rgba(200,230,255,.18) !important;
  color: #0f2035 !important;
  border-radius: 10px !important;
  padding: 8px 10px !important;
}
.rp-dark #rp-compose-text {
  background: rgba(20,10,55,.5) !important;
  color: #e8e4ff !important;
  border-radius: 10px !important;
  padding: 8px 10px !important;
}

.rp-compose-sep {
  height:1px;
  background: rgba(0,0,0,.07);
  margin: 10px 0;
}
#rp-phone.rp-theme-star  .rp-compose-sep { background: rgba(140,110,255,.2) !important; }
#rp-phone.rp-theme-misty .rp-compose-sep { background: rgba(80,150,200,.15) !important; }
.rp-dark .rp-compose-sep { background: rgba(255,255,255,.07) !important; }

#rp-compose-text::placeholder { color: rgba(60,60,80,.38); }
#rp-phone.rp-theme-star  #rp-compose-text::placeholder { color: rgba(200,190,255,.4) !important; }
#rp-phone.rp-theme-misty #rp-compose-text::placeholder { color: rgba(44,90,140,.4) !important; }
.rp-dark #rp-compose-text::placeholder { color: rgba(200,190,255,.35) !important; }
.rp-compose-hint {
  font-size:11px; color:rgba(0,0,0,.35);
  text-align:right; letter-spacing:.3px; padding-top:2px;
}
#rp-phone.rp-theme-star  .rp-compose-hint { color: rgba(180,165,255,.45) !important; }
#rp-phone.rp-theme-misty .rp-compose-hint { color: rgba(44,90,140,.4) !important; }
.rp-dark .rp-compose-hint { color: rgba(200,190,255,.35) !important; }

/* ══ 取消 / 发布 按钮 ══ */
.rp-compose-cancel {
  background:none !important; border:none !important;
  color: var(--rp-nav-btn) !important;
  font-size:14px !important; font-weight:400 !important;
  cursor:pointer !important; padding:0 6px !important;
  font-family:inherit !important; display:inline-flex !important;
  align-items:center !important; visibility:visible !important;
  opacity:1 !important; pointer-events:auto !important;
}
.rp-compose-post-btn {
  border: none !important;
  color: #fff !important;
  font-size:13px !important; font-weight:700 !important;
  cursor:pointer !important;
  padding: 6px 16px !important;
  border-radius: 22px !important;
  font-family:inherit !important; display:inline-flex !important;
  align-items:center !important; visibility:visible !important;
  opacity:1 !important; pointer-events:auto !important;
  letter-spacing:.4px !important;
  /* 默认(Candy)：玫瑰粉渐变 + 光晕 */
  background: linear-gradient(135deg, #e0567a, #f472b6) !important;
  box-shadow: 0 3px 14px rgba(224,86,122,.45) !important;
  transition: box-shadow .15s, transform .1s !important;
}
.rp-compose-post-btn:active {
  transform: scale(.93) !important;
  box-shadow: 0 1px 6px rgba(224,86,122,.3) !important;
}
/* Star：紫光渐变 */
#rp-phone.rp-theme-star  .rp-compose-post-btn {
  background: linear-gradient(135deg, #7c3aed, #a855f7) !important;
  box-shadow: 0 3px 14px rgba(124,58,237,.5) !important;
}
/* Misty：天蓝渐变 */
#rp-phone.rp-theme-misty .rp-compose-post-btn {
  background: linear-gradient(135deg, #0ea5e9, #38bdf8) !important;
  box-shadow: 0 3px 14px rgba(14,165,233,.45) !important;
}
/* Dark */
.rp-dark .rp-compose-post-btn {
  background: linear-gradient(135deg, #6d28d9, #8b5cf6) !important;
  box-shadow: 0 3px 14px rgba(109,40,217,.45) !important;
}
.rp-compose-post-btn:active { opacity:.75 !important; }
/* ── XHS theme-adaptive polish ── */
#rp-phone{
  --rp-xhs-bg:#fff6f8;
  --rp-xhs-panel:rgba(255,255,255,.82);
  --rp-xhs-card:#ffffff;
  --rp-xhs-soft:#fff1f4;
  --rp-xhs-border:rgba(255,60,95,.10);
  --rp-xhs-border-strong:rgba(255,60,95,.18);
  --rp-xhs-text:#1f2937;
  --rp-xhs-text-soft:#6b7280;
  --rp-xhs-text-faint:#b6bcc8;
  --rp-xhs-accent:#ff2442;
  --rp-xhs-accent-2:#ff6b88;
  --rp-xhs-chip:rgba(255,36,66,.08);
  --rp-xhs-shadow:0 10px 24px rgba(225,70,110,.10);
  --rp-xhs-shadow-2:0 18px 38px rgba(225,70,110,.12);
}
#rp-phone.rp-theme-star{
  --rp-xhs-bg:rgba(18,10,42,.92);
  --rp-xhs-panel:rgba(22,14,54,.80);
  --rp-xhs-card:rgba(27,17,62,.94);
  --rp-xhs-soft:rgba(57,34,120,.34);
  --rp-xhs-border:rgba(167,139,250,.14);
  --rp-xhs-border-strong:rgba(167,139,250,.26);
  --rp-xhs-text:#eee7ff;
  --rp-xhs-text-soft:rgba(218,208,255,.72);
  --rp-xhs-text-faint:rgba(184,167,255,.45);
  --rp-xhs-accent:#a78bfa;
  --rp-xhs-accent-2:#c084fc;
  --rp-xhs-chip:rgba(167,139,250,.14);
  --rp-xhs-shadow:0 10px 28px rgba(7,2,25,.34);
  --rp-xhs-shadow-2:0 18px 42px rgba(6,0,20,.48);
}
#rp-phone.rp-theme-misty{
  --rp-xhs-bg:rgba(234,244,251,.82);
  --rp-xhs-panel:rgba(244,250,255,.74);
  --rp-xhs-card:rgba(248,252,255,.92);
  --rp-xhs-soft:rgba(201,225,243,.28);
  --rp-xhs-border:rgba(74,127,168,.14);
  --rp-xhs-border-strong:rgba(74,127,168,.22);
  --rp-xhs-text:#16324a;
  --rp-xhs-text-soft:rgba(22,50,74,.70);
  --rp-xhs-text-faint:rgba(61,110,154,.45);
  --rp-xhs-accent:#4a7fa8;
  --rp-xhs-accent-2:#7db6d9;
  --rp-xhs-chip:rgba(74,127,168,.10);
  --rp-xhs-shadow:0 10px 26px rgba(80,120,160,.10);
  --rp-xhs-shadow-2:0 18px 36px rgba(80,120,160,.14);
}
#rp-view-xhs,#rp-view-xhs-detail,#rp-view-xhs-compose{flex-direction:column!important;overflow:hidden!important;background:var(--rp-xhs-bg,#fff)!important;min-height:0!important;height:100%!important}
#rp-view-xhs .rp-nav-bar,#rp-view-xhs-detail .rp-nav-bar,#rp-view-xhs-compose .rp-nav-bar{flex:0 0 auto!important;background:var(--rp-xhs-panel)!important;border-bottom:1px solid var(--rp-xhs-border)!important;backdrop-filter:blur(14px) saturate(1.08)!important;-webkit-backdrop-filter:blur(14px) saturate(1.08)!important}
#rp-view-xhs .rp-nav-title,#rp-view-xhs-detail .rp-nav-title,#rp-view-xhs-compose .rp-nav-title{color:var(--rp-xhs-text)!important}
#rp-view-xhs .rp-back,#rp-view-xhs-detail .rp-back,#rp-view-xhs-compose .rp-back,#rp-xhs-compose,#rp-xhs-refresh{color:var(--rp-xhs-accent)!important}
#rp-xhs-list,#rp-xhs-detail-body{scrollbar-width:none;overflow-y:auto!important;-webkit-overflow-scrolling:touch!important;touch-action:pan-y!important;overscroll-behavior-y:contain!important}
#rp-xhs-list::-webkit-scrollbar,#rp-xhs-detail-body::-webkit-scrollbar{display:none}
.rp-xhs-card{background:transparent!important;border:none!important;border-bottom:1px solid var(--rp-xhs-border)!important;border-radius:0!important;box-shadow:none!important;padding:12px 14px!important;margin:0!important;position:relative;overflow:hidden!important;transition:background .12s ease!important}
.rp-xhs-card::before{display:none}
.rp-xhs-card:hover{background:var(--rp-xhs-soft,rgba(255,36,66,.03))!important}
.rp-xhs-card>div:first-child>div:first-child{box-shadow:0 8px 18px rgba(0,0,0,.08)!important}
.rp-xhs-card>div:first-child>div:nth-child(2)>div:first-child,#rp-xhs-detail-body>div:nth-child(5){color:var(--rp-xhs-text)!important}
.rp-xhs-card>div:first-child>div:nth-child(2)>div:nth-child(2){color:var(--rp-xhs-text-faint)!important}
.rp-xhs-card>div:first-child>div:last-child{background:var(--rp-xhs-chip)!important;color:var(--rp-xhs-accent)!important;border:1px solid var(--rp-xhs-border)!important;border-radius:999px!important;padding:2px 7px!important;font-weight:700!important;font-size:9px!important;line-height:1.2!important}
.rp-xhs-card>div:nth-child(2),#rp-xhs-detail-body>div:nth-child(2){color:var(--rp-xhs-text)!important;letter-spacing:.01em!important}
.rp-xhs-card>div:nth-child(3),#rp-xhs-detail-body>div:nth-child(3){color:var(--rp-xhs-text-soft)!important}
.rp-xhs-card>div:last-child{border-top:1px solid var(--rp-xhs-border)!important;padding-top:10px!important;margin-top:10px!important}
.rp-xhs-card>div:last-child>div,#rp-xhs-detail-body>div:nth-child(4)>div,#rp-xhs-detail-body>div:nth-child(4) button{color:var(--rp-xhs-text-faint)!important}
#rp-xhs-detail-body>div:nth-child(4) button[style*="#ff2442"],.rp-xhs-card>div:last-child>div[style*="#ff2442"],.rp-xhs-comment [style*="color:#ff2442"],.rp-xhs-comment [style*="@"]{color:var(--rp-xhs-accent)!important}
#rp-view-xhs-detail{position:relative!important;min-height:0!important}
#rp-xhs-detail-body{flex:1 1 auto!important;min-height:0!important;height:auto!important;overflow-y:auto!important;padding:14px 14px 12px!important;display:block!important}
#rp-xhs-detail-body>div:first-child{background:var(--rp-xhs-panel)!important;border:1px solid var(--rp-xhs-border)!important;border-radius:18px!important;padding:12px!important;box-shadow:var(--rp-xhs-shadow)!important;position:relative!important;overflow:hidden!important}
#rp-xhs-detail-body>div:first-child::before{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(255,255,255,.12),transparent 46%);pointer-events:none}
#rp-xhs-detail-body>div:first-child>div:first-child{font-size:13px!important;font-weight:700!important}

#rp-xhs-detail-body>div:first-child>div:nth-child(1){font-size:12px!important;font-weight:700!important;line-height:1.3!important}
#rp-xhs-detail-body>div:first-child>div:nth-child(2){font-size:10px!important;line-height:1.35!important;color:var(--rp-xhs-text-faint)!important}
#rp-xhs-detail-body>div:nth-child(2){margin:14px 2px 10px!important;font-size:18px!important;font-weight:800!important;line-height:1.42!important;color:var(--rp-xhs-text)!important}
#rp-xhs-detail-body>div:nth-child(3){margin:0 0 12px!important;font-size:13px!important;line-height:1.86!important;background:linear-gradient(180deg,var(--rp-xhs-panel),var(--rp-xhs-card))!important;border:1px solid var(--rp-xhs-border)!important;border-radius:20px!important;padding:15px 14px!important;box-shadow:var(--rp-xhs-shadow)!important;color:var(--rp-xhs-text-soft)!important}
#rp-xhs-detail-body>div:nth-child(4){display:flex!important;align-items:center!important;gap:16px!important;background:linear-gradient(180deg,var(--rp-xhs-panel),var(--rp-xhs-card))!important;border:1px solid var(--rp-xhs-border)!important;border-radius:18px!important;padding:11px 14px!important;box-shadow:var(--rp-xhs-shadow)!important}
#rp-xhs-detail-body>div:nth-child(4) button,#rp-xhs-detail-body>div:nth-child(4)>div{font-size:12px!important;display:inline-flex!important;align-items:center!important;gap:5px!important}
#rp-xhs-detail-body>div:nth-child(5){margin:16px 4px 8px!important;font-size:11.5px!important;font-weight:800!important;letter-spacing:.02em!important;color:var(--rp-xhs-text)!important}
#rp-xhs-comments-list{background:var(--rp-xhs-panel)!important;border:1px solid var(--rp-xhs-border)!important;border-radius:20px!important;padding:2px 14px!important;box-shadow:var(--rp-xhs-shadow)!important}
.rp-xhs-comment{padding:14px 0!important;border-bottom:1px solid var(--rp-xhs-border)!important}
.rp-xhs-comment>div:first-child{min-width:0!important}
.rp-xhs-comment>div:first-child>div:first-child{display:flex!important;align-items:center!important;gap:6px!important;margin-bottom:5px!important}
.rp-xhs-comment>div:first-child>div:nth-child(2){font-size:12px!important;line-height:1.74!important;color:var(--rp-xhs-text-soft)!important}
.rp-xhs-comment [data-reply-cidx]{margin-top:7px!important;color:var(--rp-xhs-accent)!important;background:var(--rp-xhs-chip)!important;border-radius:999px!important;padding:4px 10px!important;display:inline-flex!important}
#rp-xhs-detail-input-bar{flex:0 0 auto!important;background:var(--rp-xhs-panel)!important;border-top:1px solid var(--rp-xhs-border)!important;backdrop-filter:blur(14px) saturate(1.08)!important;-webkit-backdrop-filter:blur(14px) saturate(1.08)!important;padding:8px 12px 10px!important;position:relative!important;z-index:10!important}
#rp-xhs-detail-input,#rp-xhs-post-title,#rp-xhs-post-body{background:var(--rp-xhs-card)!important;border:1px solid var(--rp-xhs-border)!important;color:var(--rp-xhs-text)!important;box-shadow:0 4px 14px rgba(0,0,0,.03)!important}
#rp-xhs-detail-input{border-radius:16px!important;padding:10px 14px!important;line-height:1.55!important;min-height:42px!important}
#rp-xhs-detail-input::placeholder,#rp-xhs-post-title::placeholder,#rp-xhs-post-body::placeholder{color:var(--rp-xhs-text-faint)!important}
#rp-xhs-detail-input:focus,#rp-xhs-post-title:focus,#rp-xhs-post-body:focus{border-color:var(--rp-xhs-border-strong)!important;box-shadow:0 0 0 3px var(--rp-xhs-chip),0 8px 18px rgba(0,0,0,.04)!important;outline:none!important}
#rp-view-xhs-compose{position:relative!important}
#rp-view-xhs-compose .rp-nav-bar{padding-inline:12px!important}
#rp-view-xhs-compose .rp-nav-bar .rp-back{padding:6px 10px!important;border-radius:999px!important;background:var(--rp-xhs-chip)!important;border:1px solid var(--rp-xhs-border)!important}
#rp-view-xhs-compose .rp-nav-bar .rp-nav-title{font-weight:800!important;letter-spacing:.02em!important}
#rp-view-xhs-compose>div:nth-child(2){padding:16px 14px 20px!important;background:linear-gradient(180deg,var(--rp-xhs-bg),transparent 18%)!important}
#rp-view-xhs-compose>div:nth-child(2)>div{background:var(--rp-xhs-panel)!important;border:1px solid var(--rp-xhs-border)!important;border-radius:24px!important;padding:16px!important;box-shadow:var(--rp-xhs-shadow-2)!important;position:relative!important;overflow:hidden!important;backdrop-filter:blur(14px) saturate(1.08)!important;-webkit-backdrop-filter:blur(14px) saturate(1.08)!important}
#rp-view-xhs-compose>div:nth-child(2)>div::before{content:"";position:absolute;inset:0 0 auto 0;height:64px;background:linear-gradient(180deg,rgba(255,255,255,.18),transparent);pointer-events:none}
#rp-view-xhs-compose [style*="font-size:11px;color:#999"]{color:var(--rp-xhs-text-soft)!important;font-size:11.5px!important;font-weight:700!important;letter-spacing:.02em!important}
#rp-xhs-post-title{background:var(--rp-xhs-card)!important;border:1px solid var(--rp-xhs-border)!important;border-radius:18px!important;padding:13px 14px!important;margin-bottom:14px!important;font-size:14px!important;font-weight:700!important;box-shadow:0 4px 14px rgba(0,0,0,.03)!important}
#rp-xhs-post-body{background:var(--rp-xhs-card)!important;border:1px solid var(--rp-xhs-border)!important;border-radius:22px!important;padding:14px 14px 18px!important;min-height:180px!important;line-height:1.8!important;box-shadow:0 6px 18px rgba(0,0,0,.04)!important}
#rp-xhs-post-title::placeholder,#rp-xhs-post-body::placeholder{color:var(--rp-xhs-text-faint)!important}
#rp-xhs-post-title:focus,#rp-xhs-post-body:focus{border-color:var(--rp-xhs-border-strong)!important;box-shadow:0 0 0 3px var(--rp-xhs-chip),0 8px 18px rgba(0,0,0,.04)!important;outline:none!important}
#rp-xhs-tag-row{display:grid!important;grid-template-columns:repeat(3,minmax(0,1fr))!important;gap:5px!important;margin-top:8px!important}
#rp-xhs-detail-send,#rp-xhs-post-btn{background:linear-gradient(135deg,var(--rp-xhs-accent),var(--rp-xhs-accent-2))!important;color:#fff!important;border:none!important;box-shadow:0 8px 18px rgba(0,0,0,.15)!important}
#rp-xhs-post-btn{border-radius:10px!important;padding:4px 12px!important;min-width:0!important;font-weight:600!important;font-size:12px!important;letter-spacing:0!important}
#rp-xhs-detail-send{border-radius:10px!important;padding:5px 14px!important;min-width:0!important;font-weight:600!important;font-size:12px!important}
.rp-xhs-tag-btn{background:var(--rp-xhs-chip,rgba(255,36,66,.06))!important;color:var(--rp-xhs-text,#333)!important;border:1px solid var(--rp-xhs-border)!important;border-radius:999px!important;padding:0 10px!important;height:24px!important;min-height:24px!important;font-size:10.5px!important;line-height:1.2!important;font-weight:500!important;cursor:pointer!important;transition:all .15s!important;font-family:inherit!important;box-shadow:0 3px 10px rgba(0,0,0,.03)!important;width:100%!important;min-width:0!important;display:flex!important;align-items:center!important;justify-content:center!important;text-align:center!important;white-space:nowrap!important;overflow:hidden!important;text-overflow:ellipsis!important}
.rp-xhs-tag-btn:hover{background:var(--rp-xhs-soft)!important;border-color:var(--rp-xhs-border-strong)!important;transform:translateY(-1px)!important}
.rp-xhs-tag-selected{background:linear-gradient(135deg,var(--rp-xhs-accent),var(--rp-xhs-accent-2)) !important;color:#fff !important;border-color:transparent !important}.rp-xhs-tag-btn.rp-xhs-tag-selected{background:linear-gradient(135deg,var(--rp-xhs-accent),var(--rp-xhs-accent-2)) !important;color:#fff !important;border-color:transparent !important;outline:none !important;box-shadow:0 4px 14px rgba(0,0,0,.2)!important;transform:scale(1.04)!important;font-weight:700!important}
#rp-xhs-loading{background:var(--rp-xhs-panel)!important;border:1px dashed var(--rp-xhs-border)!important;border-radius:16px!important;box-shadow:var(--rp-xhs-shadow)!important;position:relative;overflow:hidden!important;animation:rpXhsLoadingFloat 1.8s ease-in-out infinite}
#rp-xhs-loading::after{content:"";position:absolute;inset:0;background:linear-gradient(100deg,transparent 0%,rgba(255,255,255,.10) 35%,rgba(255,255,255,.42) 50%,rgba(255,255,255,.10) 65%,transparent 100%);transform:translateX(-120%);animation:rpXhsShine 1.5s ease-in-out infinite;pointer-events:none}
#rp-xhs-loading{color:var(--rp-xhs-accent)!important;font-weight:700!important;letter-spacing:.02em!important}
@keyframes rpXhsShine{to{transform:translateX(120%)}}
#rp-phone.rp-theme-star #rp-xhs-detail-input,
#rp-phone.rp-theme-star #rp-xhs-post-title,
#rp-phone.rp-theme-star #rp-xhs-post-body{color:#eee7ff!important;background:rgba(35,22,78,.96)!important;border-color:rgba(167,139,250,.25)!important}
#rp-phone.rp-theme-star .rp-xhs-tag-btn{background:rgba(60,35,120,.85)!important;color:#d4bbff!important;border-color:rgba(167,139,250,.3)!important}
#rp-phone.rp-theme-star .rp-xhs-tag-btn.rp-xhs-tag-selected{background:linear-gradient(135deg,#a78bfa,#c084fc)!important;color:#fff!important;border-color:transparent!important;box-shadow:0 4px 14px rgba(167,139,250,.45)!important}
#rp-phone.rp-theme-misty .rp-xhs-tag-btn{background:rgba(210,232,248,.7)!important;color:#16324a!important;border-color:rgba(74,127,168,.22)!important}
#rp-phone.rp-theme-misty .rp-xhs-tag-btn.rp-xhs-tag-selected{background:linear-gradient(135deg,#4a7fa8,#7db6d9)!important;color:#fff!important;border-color:transparent!important}
#rp-phone.rp-theme-star #rp-xhs-detail-input::placeholder,
#rp-phone.rp-theme-star #rp-xhs-post-title::placeholder,
#rp-phone.rp-theme-star #rp-xhs-post-body::placeholder{color:rgba(210,195,255,.55)!important}
#rp-phone.rp-theme-misty #rp-xhs-detail-input,
#rp-phone.rp-theme-misty #rp-xhs-post-title,
#rp-phone.rp-theme-misty #rp-xhs-post-body{color:#16324a!important;background:rgba(242,251,255,.97)!important;border-color:rgba(74,127,168,.2)!important}
#rp-phone.rp-theme-misty #rp-xhs-detail-input::placeholder,
#rp-phone.rp-theme-misty #rp-xhs-post-title::placeholder,
#rp-phone.rp-theme-misty #rp-xhs-post-body::placeholder{color:rgba(74,127,168,.5)!important}
@keyframes rpXhsLoadingFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-2px)}}
/* ── MOMENT IMAGE ── */
.rp-moment-img-wrap{margin-bottom:10px;border-radius:8px;overflow:hidden;max-width:180px}
.rp-moment-img{width:100%;display:block;border-radius:8px}
/* ── Moments generate button ── */
#rp-gen-moments {
  background: none !important; border: none !important;
  color: var(--rp-nav-btn) !important;
  cursor: pointer !important; padding: 2px 4px !important;
  display: inline-flex !important; align-items: center !important;
  justify-content: center !important; border-radius: 6px !important;
  transition: transform .25s, opacity .2s !important;
  visibility: visible !important; opacity: 1 !important;
  pointer-events: auto !important;
}
#rp-gen-moments:hover { transform: rotate(180deg) !important; }
#rp-gen-moments:disabled { opacity: .35 !important; cursor: default !important; transform: none !important; }
#rp-gen-moments.rp-spinning { animation: rpSpin .7s linear infinite !important; }
@keyframes rpSpin { to { transform: rotate(360deg); } }
.rp-moment-likes-row { font-size: 11px; color: rgba(160,30,65,.88); padding: 2px 0 4px; line-height: 1.4; }
.rp-dark .rp-moment-likes-row { color: rgba(200,190,255,.45); }
/* ── MOMENTS send button fix ── */
.rp-moment-input-row{display:flex;gap:6px;margin-top:8px;padding-top:6px;border-top:1px solid rgba(0,0,0,.06);align-items:center}
.rp-dark .rp-moment-input-row{border-top-color:rgba(255,255,255,.06)}
.rp-moment-cinput{flex:1;min-width:0;background:rgba(0,0,0,.04);border:1px solid rgba(0,0,0,.1);border-radius:8px;padding:6px 10px;font-size:12.5px;color:#1a1a1a;font-family:inherit;outline:none}
.rp-dark .rp-moment-cinput{background:rgba(255,255,255,.05);border-color:rgba(255,255,255,.1);color:#d5d8f0}
.rp-moment-csend{flex-shrink:0;background:#2563eb !important;color:#fff !important;border:none !important;border-radius:8px !important;padding:6px 12px !important;font-size:12px !important;font-weight:700 !important;cursor:pointer !important;font-family:inherit !important;display:inline-flex !important;align-items:center !important;visibility:visible !important;opacity:1 !important;pointer-events:auto !important}
.rp-moment-csend:hover{opacity:.85 !important}

/* ── INCOMING CALL OVERLAY ── */
#rp-call-overlay{position:absolute;top:0;right:0;bottom:0;left:0;z-index:800;background:linear-gradient(180deg,#0d0d1a,#1a1a2e);display:flex;flex-direction:column;align-items:center;justify-content:space-between;padding:60px 20px 50px}
.rp-call-av{width:88px;height:88px;border-radius:44px;display:flex;align-items:center;justify-content:center;font-size:30px;font-weight:700;color:#fff;margin-bottom:14px;animation:rp-cpulse 1.8s ease-in-out infinite}
@keyframes rp-cpulse{0%,100%{box-shadow:0 0 0 0 rgba(255,255,255,.08),0 0 0 14px rgba(255,255,255,.04)}60%{box-shadow:0 0 0 14px rgba(255,255,255,.1),0 0 0 28px rgba(255,255,255,.04)}}
.rp-call-name{font-size:24px;font-weight:700;color:#fff;letter-spacing:.01em;text-align:center}
.rp-call-sub{font-size:13px;color:rgba(255,255,255,.45);margin-top:6px;text-align:center}
.rp-call-btns{display:flex;gap:56px;align-items:flex-start}
.rp-call-btn-wrap{display:flex;flex-direction:column;align-items:center;gap:8px}
.rp-call-dec{width:64px;height:64px;border-radius:32px;background:#e53935;display:flex;align-items:center;justify-content:center;font-size:26px;cursor:pointer;box-shadow:0 6px 24px rgba(229,57,53,.45);transition:transform .15s}
.rp-call-dec:active{transform:scale(.92)}
.rp-call-ans{width:64px;height:64px;border-radius:32px;background:#43a047;display:flex;align-items:center;justify-content:center;font-size:26px;cursor:pointer;box-shadow:0 6px 24px rgba(67,160,71,.45);transition:transform .15s}
.rp-call-ans:active{transform:scale(.92)}
.rp-call-lbl{font-size:11px;color:rgba(255,255,255,.45)}
/* ── CALL RECORD ── */
.rp-sys-msg{display:flex;justify-content:center;margin:8px 0}
.rp-call-rec{display:inline-flex;align-items:center;gap:6px;padding:6px 14px;border-radius:20px;font-size:12px;font-weight:600;background:rgba(0,0,0,.04);color:rgba(0,0,0,.4)}
.rp-dark .rp-call-rec{background:rgba(255,255,255,.06);color:rgba(255,255,255,.35)}
.rp-call-rec.missed{color:#e53935;background:rgba(229,57,53,.07)}
/* ── HONGBAO ── */
.rp-hongbao{background:linear-gradient(145deg,#c62828,#b71c1c);border-radius:16px;overflow:hidden;cursor:pointer;box-shadow:0 4px 20px rgba(183,28,28,.4);width:200px;user-select:none;transition:opacity .2s}
.rp-hb-top{padding:14px 16px 12px;display:flex;align-items:center;gap:12px}
.rp-hb-ico{width:44px;height:44px;border-radius:22px;background:rgba(255,213,79,.18);border:1.5px solid rgba(255,213,79,.4);display:flex;align-items:center;justify-content:center;font-size:22px;flex-shrink:0}
.rp-hb-info{flex:1;min-width:0}
.rp-hb-from{font-size:13px;font-weight:700;color:#fff;margin-bottom:3px}
.rp-hb-note{font-size:11.5px;color:rgba(255,255,255,.65);line-height:1.35}
.rp-hb-bot{background:rgba(0,0,0,.22);padding:9px 16px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:4px}
.rp-hb-action{font-size:13px;font-weight:700;color:#ffd54f;letter-spacing:.02em}
.rp-hb-tag{font-size:10.5px;color:rgba(255,213,79,.5)}
.rp-hongbao.opened{cursor:default}
.rp-hongbao.opened .rp-hb-top{background:rgba(0,0,0,.1)}
.rp-hb-amount{font-size:26px;font-weight:900;color:#ffd54f;text-align:center;padding:6px 0 2px;letter-spacing:.02em;width:100%}
.rp-hb-amount small{font-size:14px;font-weight:600}
/* ── VOICE MESSAGE ── */
.rp-voice-wrap{display:flex;flex-direction:column;gap:0}
.rp-voice-bbl{display:flex;align-items:center;gap:10px;padding:10px 14px;background:rgba(0,0,0,.05);border-radius:14px;cursor:pointer;min-width:150px;transition:background .15s}
.rp-dark .rp-voice-bbl{background:rgba(255,255,255,.07)}
.rp-voice-bbl:active{background:rgba(0,0,0,.09)}
.rp-voice-play{width:30px;height:30px;border-radius:15px;background:#2563eb;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:12px;color:#fff;transition:background .2s}
.rp-voice-bbl.played .rp-voice-play{background:#94a3b8}
.rp-wave{flex:1;display:flex;align-items:center;gap:2px;height:22px}
.rp-wb{width:3px;border-radius:2px;background:rgba(37,99,235,.65)}
.rp-voice-bbl:not(.played) .rp-wb{animation:rp-wv 1.3s ease-in-out infinite}
.rp-voice-bbl.played .rp-wb{animation:none;opacity:.3}
@keyframes rp-wv{0%,100%{transform:scaleY(.35)}50%{transform:scaleY(1)}}
.rp-wb:nth-child(2){animation-delay:.07s}.rp-wb:nth-child(3){animation-delay:.14s}.rp-wb:nth-child(4){animation-delay:.21s}.rp-wb:nth-child(5){animation-delay:.28s}.rp-wb:nth-child(6){animation-delay:.14s}.rp-wb:nth-child(7){animation-delay:.07s}
.rp-voice-dur{font-size:11.5px;color:rgba(0,0,0,.4);flex-shrink:0}
.rp-dark .rp-voice-dur{color:rgba(255,255,255,.35)}
.rp-voice-txt{font-size:13px;color:#333;line-height:1.65;padding:8px 14px 2px;display:none}
.rp-dark .rp-voice-txt{color:#c8cce8}
.rp-voice-bbl.played~.rp-voice-txt{display:block}
/* ── GROUP CHAT ── */
.rp-bwrap.rp-in.rp-grp{flex-direction:row;align-items:flex-start;gap:8px}
.rp-bwrap.rp-out.rp-grp{flex-direction:row-reverse;align-items:flex-start;gap:8px}
.rp-bwrap.rp-grp>div:not(.rp-grp-av){flex:1;min-width:0}
.rp-bwrap.rp-grp .rp-bubble{max-width:100%}
.rp-grp-sender{font-size:11px;font-weight:700;color:rgba(0,0,0,.45);margin-bottom:3px}
.rp-dark .rp-grp-sender{color:rgba(255,255,255,.4)}
.rp-grp-av{width:34px;height:34px;border-radius:17px;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;color:#fff;flex-shrink:0;margin-top:2px;overflow:hidden}

/* ── ATTACH PANEL ── */
#rp-attach-btn{width:30px;height:30px;border-radius:15px;background:rgba(0,0,0,.07);border:none;font-size:18px;cursor:pointer;flex-shrink:0;display:flex;align-items:center;justify-content:center;color:#555;transition:background .15s}
#rp-attach-btn:active{background:rgba(0,0,0,.13)}
.rp-dark #rp-attach-btn{background:rgba(255,255,255,.1);color:#c8cce8}
#rp-attach-panel{position:absolute;bottom:100%;left:0;right:0;background:#fff;border-top:1px solid rgba(0,0,0,.08);padding:6px 0 10px;z-index:50;display:none}
.rp-dark #rp-attach-panel{background:#111128;border-top-color:rgba(255,255,255,.07)}
.rp-attach-row{display:grid;grid-template-columns:repeat(3,1fr);gap:0;padding:4px 0}
.rp-attach-item{display:flex;flex-direction:column;align-items:center;gap:7px;padding:14px 8px;cursor:pointer;font-size:12px;color:#555;font-weight:500}
.rp-dark .rp-attach-item{color:#9aa0c0}
.rp-attach-item:active{background:rgba(0,0,0,.04)}
.rp-attach-ico{width:46px;height:46px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:22px;background:rgba(0,0,0,.05)}
.rp-dark .rp-attach-ico{background:rgba(255,255,255,.07)}
.rp-hb-modal{position:absolute;top:0;right:0;bottom:0;left:0;z-index:600;background:rgba(0,0,0,.45);display:flex;align-items:flex-end}
.rp-hb-sheet{background:#fff;border-radius:18px 18px 0 0;padding:20px 20px 32px;width:100%;box-sizing:border-box}
.rp-dark .rp-hb-sheet{background:#13132a}
.rp-hb-sheet h3{margin:0 0 16px;font-size:16px;font-weight:700;color:#222;text-align:center}
.rp-dark .rp-hb-sheet h3{color:#e0e4ff}
.rp-hb-sheet input{width:100%;box-sizing:border-box;border:1px solid rgba(0,0,0,.12);border-radius:10px;padding:10px 14px;font-size:14px;outline:none;margin-bottom:10px;background:#fafafa}
.rp-dark .rp-hb-sheet input{background:#1c1c38;border-color:rgba(255,255,255,.1);color:#dde0f2}
.rp-hb-send-btn{width:100%;padding:12px;background:#c62828;color:#ffd54f;border:none;border-radius:12px;font-size:15px;font-weight:700;cursor:pointer}
.rp-hb-cancel-btn{width:100%;padding:10px;background:none;color:rgba(0,0,0,.4);border:none;font-size:13px;cursor:pointer;margin-top:4px}
.rp-dark .rp-hb-cancel-btn{color:rgba(255,255,255,.3)}
.rp-loc-modal{position:absolute;top:0;right:0;bottom:0;left:0;z-index:600;background:rgba(0,0,0,.45);display:flex;align-items:flex-end}
.rp-loc-sheet{background:#fff;border-radius:18px 18px 0 0;padding:20px 20px 32px;width:100%;box-sizing:border-box}
.rp-dark .rp-loc-sheet{background:#13132a}
.rp-loc-sheet h3{margin:0 0 16px;font-size:16px;font-weight:700;color:#222;text-align:center}
.rp-dark .rp-loc-sheet h3{color:#e0e4ff}
.rp-loc-sheet input{width:100%;box-sizing:border-box;border:1px solid rgba(0,0,0,.12);border-radius:10px;padding:10px 14px;font-size:14px;outline:none;margin-bottom:10px;background:#fafafa}
.rp-dark .rp-loc-sheet input{background:#1c1c38;border-color:rgba(255,255,255,.1);color:#dde0f2}
.rp-loc-send-btn{width:100%;padding:12px;background:#2e7d32;color:#fff;border:none;border-radius:12px;font-size:15px;font-weight:700;cursor:pointer;margin-bottom:8px}
.rp-loc-cancel-btn{width:100%;padding:10px;background:none;color:rgba(0,0,0,.4);border:none;font-size:13px;cursor:pointer;margin-top:4px}
.rp-dark .rp-loc-cancel-btn{color:rgba(255,255,255,.3)}
.rp-loc-card{display:flex;align-items:center;gap:10px;padding:10px 14px;background:rgba(0,0,0,.04);border-radius:12px;max-width:220px}
.rp-dark .rp-loc-card{background:rgba(255,255,255,.06)}
.rp-loc-ico{font-size:22px;flex-shrink:0}
.rp-loc-txt{font-size:13px;color:#333;font-weight:500}
.rp-dark .rp-loc-txt{color:#c8cce8}
.rp-img-bbl{max-width:180px;border-radius:12px;overflow:hidden}
.rp-img-bbl img{width:100%;display:block}
/* ── ADD CHOICE ── */
.rp-add-choice{position:absolute;top:0;right:0;bottom:0;left:0;z-index:200;display:flex;flex-direction:column;align-items:center;justify-content:center;background:rgba(0,0,0,.35);gap:10px}
.rp-add-choice-box{background:#fff;border-radius:16px;overflow:hidden;width:80%;max-width:240px;box-shadow:0 8px 32px rgba(0,0,0,.2)}
.rp-dark .rp-add-choice-box{background:#1c1c38}
.rp-add-choice-item{padding:16px 20px;font-size:15px;font-weight:600;color:#222;cursor:pointer;display:flex;align-items:center;gap:12px;border-bottom:1px solid rgba(0,0,0,.06)}
.rp-dark .rp-add-choice-item{color:#e0e4ff;border-bottom-color:rgba(255,255,255,.06)}
.rp-add-choice-item:last-child{border-bottom:none}
.rp-add-choice-item:active{background:rgba(0,0,0,.04)}
.rp-add-choice-delete{color:#ef4444!important}#rp-del-picker{flex-direction:column!important;align-items:stretch!important;justify-content:flex-start!important;gap:0!important;background:transparent;overflow:hidden}#rp-del-picker::before{content:"";position:absolute;inset:-40px;z-index:0;background-image:var(--rp-home-wall);background-size:cover;background-position:center;filter:blur(28px) saturate(1.3) brightness(1.04)}#rp-del-picker::after{content:"";position:absolute;inset:0;z-index:1;background:rgba(255,245,250,.68)}#rp-del-picker > *{position:relative;z-index:2}#rp-del-picker .rp-nav-bar{background:rgba(255,255,255,.55)!important;backdrop-filter:blur(18px) saturate(1.5)!important;-webkit-backdrop-filter:blur(18px) saturate(1.5)!important;border-bottom:1px solid rgba(255,255,255,.45)!important;box-shadow:0 1px 0 rgba(0,0,0,.05)!important}#rp-del-picker #rp-del-cancel{color:var(--rp-nav-btn)!important;background:none!important;border:none!important;cursor:pointer!important;font-size:15px!important}#rp-del-picker #rp-del-confirm{color:#ef4444!important;font-weight:700!important;background:none!important;border:none!important;cursor:pointer!important;font-size:15px!important}#rp-del-list{flex:1;overflow-y:auto;padding:8px 0}.rp-del-pick-av{width:36px;height:36px;border-radius:18px;flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:700;color:#fff}.rp-del-pick-item{display:flex;align-items:center;gap:12px;padding:12px 18px;cursor:pointer;background:rgba(255,255,255,.45);border-bottom:1px solid rgba(255,255,255,.3);backdrop-filter:blur(4px);transition:background .12s}.rp-del-pick-item:active{background:rgba(255,255,255,.65)}.rp-del-pick-item.rp-del-selected{background:rgba(239,68,68,.08);border-bottom-color:rgba(239,68,68,.15)}.rp-del-pick-name{flex:1;font-size:14px;font-weight:500;color:#222}.rp-del-chk{margin-left:auto;width:22px;height:22px;border-radius:50%;border:2px solid rgba(0,0,0,.22);flex-shrink:0;display:flex;align-items:center;justify-content:center}.rp-del-pick-item.rp-del-selected .rp-del-chk{background:#ef4444;border-color:#ef4444}.rp-del-pick-item.rp-del-selected .rp-del-chk::after{content:"✓";color:#fff;font-size:13px}.rp-dark #rp-del-picker::after{background:rgba(4,3,18,.86)}.rp-dark #rp-del-picker .rp-nav-bar{background:rgba(6,4,22,.55)!important;border-bottom-color:rgba(255,255,255,.07)!important}.rp-dark .rp-del-pick-item{background:rgba(255,255,255,.06);border-bottom-color:rgba(255,255,255,.05)}.rp-dark .rp-del-pick-item:active{background:rgba(255,255,255,.1)}.rp-dark .rp-del-pick-item.rp-del-selected{background:rgba(239,68,68,.14)}.rp-dark .rp-del-pick-name{color:#e0e4ff}.rp-dark .rp-del-chk{border-color:rgba(255,255,255,.28)}#rp-phone.rp-theme-star #rp-del-picker::after{background:rgba(6,3,22,.82)}#rp-phone.rp-theme-star #rp-del-picker .rp-nav-bar{background:rgba(10,5,32,.55)!important;border-bottom-color:rgba(140,110,255,.2)!important}#rp-phone.rp-theme-star .rp-del-pick-item{background:rgba(140,100,255,.08);border-bottom-color:rgba(140,100,255,.12)}#rp-phone.rp-theme-star .rp-del-pick-item:active{background:rgba(140,100,255,.16)}#rp-phone.rp-theme-star .rp-del-pick-item.rp-del-selected{background:rgba(239,68,68,.14)}#rp-phone.rp-theme-star .rp-del-pick-name{color:#dde0ff}#rp-phone.rp-theme-star .rp-del-chk{border-color:rgba(160,120,255,.45)}#rp-phone.rp-theme-candy #rp-del-picker::after{background:rgba(255,240,248,.64)}#rp-phone.rp-theme-candy #rp-del-picker .rp-nav-bar{background:rgba(255,255,255,.55)!important;border-bottom-color:rgba(200,100,140,.15)!important}#rp-phone.rp-theme-candy .rp-del-pick-item{background:rgba(255,255,255,.5);border-bottom-color:rgba(200,100,140,.1)}#rp-phone.rp-theme-candy .rp-del-pick-item:active{background:rgba(255,255,255,.72)}#rp-phone.rp-theme-candy .rp-del-pick-item.rp-del-selected{background:rgba(239,68,68,.06)}#rp-phone.rp-theme-candy .rp-del-pick-name{color:#4a1030}#rp-phone.rp-theme-candy .rp-del-chk{border-color:rgba(200,100,140,.4)}#rp-phone.rp-theme-misty #rp-del-picker::after{background:rgba(222,240,255,.66)}#rp-phone.rp-theme-misty #rp-del-picker .rp-nav-bar{background:rgba(220,238,255,.55)!important;border-bottom-color:rgba(80,150,210,.18)!important}#rp-phone.rp-theme-misty .rp-del-pick-item{background:rgba(255,255,255,.5);border-bottom-color:rgba(100,160,210,.12)}#rp-phone.rp-theme-misty .rp-del-pick-item:active{background:rgba(255,255,255,.72)}#rp-phone.rp-theme-misty .rp-del-pick-item.rp-del-selected{background:rgba(239,68,68,.06)}#rp-phone.rp-theme-misty .rp-del-pick-name{color:#1a3a5c}#rp-phone.rp-theme-misty .rp-del-chk{border-color:rgba(100,160,210,.4)}
.rp-grp-pick-item{display:flex;align-items:center;gap:12px;padding:11px 16px;cursor:pointer;border-bottom:1px solid rgba(0,0,0,.05);transition:background .12s}.rp-grp-pick-item:active{background:rgba(0,0,0,.04)}.rp-grp-pick-item.selected{background:rgba(37,99,235,.06)}.rp-dark .rp-grp-pick-item{border-bottom-color:rgba(255,255,255,.05)}.rp-dark .rp-grp-pick-item.selected{background:rgba(90,120,255,.1)}.rp-grp-pick-av{width:36px;height:36px;border-radius:18px;flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:700;color:#fff}.rp-grp-pick-name{flex:1;font-size:14px;font-weight:500;color:#222}.rp-dark .rp-grp-pick-name{color:#e0e4ff}.rp-grp-pick-chk{width:22px;height:22px;border-radius:11px;border:1.5px solid rgba(0,0,0,.2);display:flex;align-items:center;justify-content:center;font-size:13px;color:transparent;flex-shrink:0;transition:all .15s}
.rp-grp-pick-item.selected .rp-grp-pick-chk{background:#2563eb;border-color:#2563eb;color:#fff}
.rp-grp-modal{background:#fff;border-radius:16px;overflow:hidden;width:90%;max-width:290px;box-shadow:0 8px 32px rgba(0,0,0,.2)}
.rp-dark .rp-grp-modal{background:#1c1c38}
.rp-grp-modal-hd{padding:14px 16px;font-size:15px;font-weight:700;color:#222;border-bottom:1px solid rgba(0,0,0,.06);text-align:center}
.rp-dark .rp-grp-modal-hd{color:#e0e4ff;border-bottom-color:rgba(255,255,255,.06)}
.rp-grp-name-inp{width:100%;box-sizing:border-box;border:1px solid rgba(0,0,0,.12);border-radius:8px;padding:8px 12px;font-size:13px;outline:none;background:#fafafa}
.rp-dark .rp-grp-name-inp{background:#131328;border-color:rgba(255,255,255,.1);color:#dde0f2}
.rp-grp-modal-ft{display:flex;border-top:1px solid rgba(0,0,0,.06)}
.rp-dark .rp-grp-modal-ft{border-top-color:rgba(255,255,255,.06)}
.rp-grp-ft-btn{flex:1;padding:12px;border:none;background:none;font-size:14px;font-weight:600;cursor:pointer}
.rp-grp-ft-cancel{color:rgba(0,0,0,.35);border-right:1px solid rgba(0,0,0,.06)}
.rp-grp-ft-ok{color:#2563eb}
.rp-dark .rp-grp-ft-cancel{color:rgba(255,255,255,.25);border-right-color:rgba(255,255,255,.06)}
/* ── CHAT BUBBLE INSET ── */
.rp-cb{display:flex;align-items:flex-start;gap:8px;margin:8px 0;clear:both}
.rp-cb-av{width:28px;height:28px;border-radius:14px;flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;color:#fff;overflow:hidden;margin-top:1px}
.rp-cb-av img{width:100%;height:100%;object-fit:cover}
.rp-cb-txt{background:rgba(0,0,0,.07);border-radius:3px 14px 14px 14px;padding:8px 12px;font-size:13.5px;line-height:1.6;color:#1a1a2e;max-width:78%;word-break:break-word;font-style:normal}
.rp-sms-echo{display:block;margin-top:6px;padding:5px 10px;border-left:2px solid rgba(0,0,0,.18);font-size:13px;line-height:1.5;color:inherit;opacity:.82;font-style:normal;word-break:break-word}
.rp-sms-echo .rp-sms-echo-name{font-weight:600;margin-right:2px}
.rp-dark .rp-sms-echo{border-left-color:rgba(255,255,255,.22)}
/* ── WALLPAPER ── */
.rp-wall-preview-img{width:100%;height:80px;border-radius:10px;object-fit:cover;display:block;border:1px solid rgba(0,0,0,.08);margin-bottom:10px}

/* FIX #3: hide terminal SMS inbox panel */
.p4{display:none!important}
/* FIX #5: attach panel - position relative to composer */
#rp-composer{position:relative}
#rp-attach-panel{position:absolute;bottom:100%;left:0;right:0;background:#fff;border-top:1px solid rgba(0,0,0,.08);padding:6px 0 10px;z-index:500;display:none;border-radius:12px 12px 0 0;box-shadow:0 -4px 20px rgba(0,0,0,.08)}
.rp-dark #rp-attach-panel{background:#111128;border-top-color:rgba(255,255,255,.07)}
/* FIX #4: wallpaper layer */
#rp-wallpaper-layer{position:absolute;top:0;right:0;bottom:0;left:0;z-index:0;background-size:cover;background-position:center;background-repeat:no-repeat;pointer-events:none}
.rp-view{z-index:1}

/* ══ LUDO GAME - Candy Garden 糖果花园 ══ */
#rp-view-game{background:transparent;display:flex;flex-direction:column}
.rp-dark #rp-view-game{background:transparent}
#rp-view-game .rp-nav-bar{background:rgba(255,255,255,.55)!important;border-bottom:1px solid rgba(180,120,200,.2)!important}
#rp-view-game .rp-nav-title{color:#4a1060!important;font-weight:700}
.rp-dark #rp-view-game .rp-nav-title{color:#e8d0ff!important}
#rp-view-game .rp-back{color:#b060d0!important}
/* Board */
#rp-game-board-wrap{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:4px 0;overflow:hidden;min-height:0}
#rp-ludo-canvas{border-radius:16px;max-width:262px;max-height:262px;display:block;box-shadow:0 4px 24px rgba(160,80,200,.18),0 1px 0 rgba(255,255,255,.9) inset,0 8px 32px rgba(0,0,0,.08)}
/* Controls */
#rp-game-controls{display:flex;align-items:center;justify-content:space-between;padding:8px 14px;background:rgba(255,255,255,.55);border-top:1px solid rgba(180,120,200,.18);flex-shrink:0;gap:10px}
.rp-dark #rp-game-controls{background:rgba(30,10,40,.7);border-top-color:rgba(200,120,255,.1)}
.rp-game-info{flex:1;min-width:0}
.rp-game-players{font-size:12px;font-weight:700;color:#4a1060}
.rp-dark .rp-game-players{color:#e8d0ff}
.rp-game-status{font-size:10.5px;color:#a060c0;margin-top:2px}
.rp-dark .rp-game-status{color:rgba(220,170,255,.6)}
/* Dice */
#rp-dice-btn{width:50px;height:50px;border-radius:25px;background:linear-gradient(145deg,#f472b6,#a855f7);border:none;color:#fff;font-size:22px;cursor:pointer;display:flex!important;align-items:center;justify-content:center;box-shadow:0 4px 16px rgba(168,85,247,.4),0 1px 3px rgba(0,0,0,.1);transition:transform .15s,box-shadow .2s;flex-shrink:0;visibility:visible!important;opacity:1!important;pointer-events:auto!important;animation:diceGlow 2.5s ease-in-out infinite}
@keyframes diceGlow{0%,100%{box-shadow:0 4px 16px rgba(168,85,247,.4),0 1px 3px rgba(0,0,0,.1)}50%{box-shadow:0 4px 24px rgba(244,114,182,.6),0 1px 6px rgba(0,0,0,.12)}}
#rp-dice-btn:active{transform:scale(.88);animation:none}
#rp-dice-btn:disabled{opacity:.4!important;cursor:default;animation:none!important}
#rp-dice-face{font-size:30px;min-width:36px;text-align:center;flex-shrink:0}
/* Chat log */
#rp-game-chat{max-height:64px;overflow-y:auto;padding:5px 14px;display:flex;flex-direction:column;gap:2px;flex-shrink:0;background:rgba(255,255,255,.6);border-top:1px solid rgba(180,120,200,.1);scrollbar-width:none;cursor:pointer;transition:background .2s}
#rp-game-chat:hover{background:rgba(255,255,255,.85)}
#rp-game-chat::-webkit-scrollbar{display:none}
.rp-dark #rp-game-chat{background:rgba(30,10,40,.4);border-top-color:rgba(200,120,255,.08)}
#rp-game-chat-hint{font-size:9.5px;color:rgba(160,80,200,.5);text-align:right;padding:0 14px 1px;flex-shrink:0}
/* Full-screen chat */
#rp-game-chat-fs{position:absolute;top:12%;bottom:0;left:0;right:0;z-index:200;background:rgba(250,245,255,.97);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);display:flex;flex-direction:column}
.rp-dark #rp-game-chat-fs{background:rgba(18,8,28,.97)}
#rp-game-chat-fs-header{display:flex;align-items:center;justify-content:space-between;padding:10px 14px;border-bottom:1px solid rgba(180,120,200,.15);flex-shrink:0}
#rp-game-chat-fs-title{font-size:14px;font-weight:600;color:#4a1060}
.rp-dark #rp-game-chat-fs-title{color:#e8d0ff}
#rp-game-chat-fs-close{width:30px;height:30px;border-radius:15px;background:rgba(160,80,200,.1);border:none;font-size:16px;cursor:pointer;display:flex;align-items:center;justify-content:center;color:#7030a0;position:relative;z-index:10;pointer-events:auto}
.rp-dark #rp-game-chat-fs-close{background:rgba(200,120,255,.15);color:#e8d0ff}
#rp-game-chat-fs-body{flex:1;overflow-y:auto;padding:10px 14px;display:flex;flex-direction:column;gap:4px}
#rp-game-chat-fs-body .game-msg{font-size:13px;line-height:1.6;padding:3px 0}
#rp-game-chat-fs-hint{font-size:10px;color:rgba(160,80,200,.5);text-align:center;padding:2px 0 1px;flex-shrink:0}
/* Messages */
.game-msg{font-size:11px;line-height:1.45;padding:1px 0}
.game-msg-user{color:#db2777;text-align:right;font-weight:500}
.game-msg-char{color:#7c3aed;font-weight:500}
.rp-dark .game-msg-char{color:#c084fc}
.game-msg-sys{color:#9ca3af;text-align:center;font-style:italic}
.rp-dark .game-msg-sys{color:rgba(255,255,255,.35)}
/* ── Square Event Popup - bright clean card ── */
#rp-sq-event{position:absolute;inset:0;z-index:60;background:rgba(100,50,150,.25);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);display:flex;align-items:center;justify-content:center;border-radius:48px}
#rp-sq-event-box{background:#fff;border:1px solid rgba(200,150,255,.3);border-radius:24px;padding:24px 22px;max-width:230px;text-align:center;box-shadow:0 8px 40px rgba(150,80,200,.2),0 2px 8px rgba(0,0,0,.08)}
.rp-dark #rp-sq-event-box{background:linear-gradient(145deg,#1e0a30,#120520)}
#rp-sq-event-sq{font-size:10px;color:#b07ad0;margin-bottom:8px;letter-spacing:1.5px;text-transform:uppercase}
.rp-dark #rp-sq-event-sq{color:rgba(220,170,255,.5)}
#rp-sq-event-emoji{font-size:44px;margin-bottom:10px;line-height:1}
#rp-sq-event-text{font-size:15px;font-weight:700;color:#2d1060;margin-bottom:8px;line-height:1.5}
.rp-dark #rp-sq-event-text{color:#f0e0ff}
#rp-sq-event-note{font-size:11px;color:#9070b0;margin-bottom:18px;line-height:1.5}
.rp-dark #rp-sq-event-note{color:rgba(220,180,255,.5)}
#rp-sq-event-done{background:linear-gradient(135deg,#f472b6,#a855f7);color:#fff;border:none;border-radius:22px;padding:10px 28px;font-size:14px;cursor:pointer;font-weight:700;letter-spacing:.3px;box-shadow:0 4px 16px rgba(168,85,247,.35)}
#rp-sq-event-done:active{transform:scale(.96)}
/* ── Task bar - 居中弹窗 ── */
#rp-sq-task-bar{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:200px;background:#fff;border:1px solid rgba(200,150,255,.3);color:#2d1060;border-radius:22px;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:18px 20px;z-index:55;box-shadow:0 8px 40px rgba(150,80,200,.2),0 2px 10px rgba(0,0,0,.08);text-align:center}
.rp-dark #rp-sq-task-bar{background:linear-gradient(145deg,#1e0a30,#120520);color:#f0e0ff;border-color:rgba(200,150,255,.2)}
#rp-sq-task-text{font-size:13px;font-weight:700;line-height:1.5;margin-bottom:12px;white-space:normal;word-break:break-all;color:#2d1060}
.rp-dark #rp-sq-task-text{color:#f0e0ff}
#rp-sq-task-done-btn{background:linear-gradient(135deg,#f472b6,#a855f7);border:none;border-radius:20px;color:#fff;padding:8px 26px;font-size:13px;cursor:pointer;font-weight:700;box-shadow:0 3px 12px rgba(168,85,247,.35);transition:opacity .2s,transform .15s}
#rp-sq-task-done-btn:not(:disabled):hover{opacity:.9}
#rp-sq-task-done-btn:disabled{opacity:.35;cursor:not-allowed;background:#ccc;box-shadow:none}
#rp-sq-task-done-btn:not(:disabled):active{transform:scale(.95)}
#rp-sq-task-hint{font-size:10px;color:#a070c0;margin-top:8px;animation:taskHintBlink 1.3s ease-in-out infinite}
.rp-dark #rp-sq-task-hint{color:rgba(220,170,255,.6)}
@keyframes taskHintBlink{0%,100%{opacity:1}50%{opacity:.2}}
/* Input row */
#rp-game-input-row{display:flex;gap:6px;padding:6px 12px 20px;background:rgba(255,255,255,.7);border-top:1px solid rgba(180,120,200,.1);flex-shrink:0;align-items:center}
.rp-dark #rp-game-input-row{background:rgba(20,8,32,.6);border-top-color:rgba(180,120,255,.1)}
#rp-game-input{flex:1;min-width:0;background:rgba(255,255,255,.9);border:1.5px solid rgba(180,120,200,.25);border-radius:18px;padding:7px 14px;font-size:12px;font-family:inherit;color:#2d1060;outline:none;transition:border-color .2s}
.rp-dark #rp-game-input{background:rgba(255,255,255,.07);border-color:rgba(180,120,255,.2);color:#f0e0ff}
#rp-game-input:focus{border-color:#a855f7}
#rp-game-input::placeholder{color:rgba(120,80,160,.4)}
.rp-dark #rp-game-input::placeholder{color:rgba(220,170,255,.3)}
#rp-game-send{width:28px!important;height:28px!important;min-width:28px!important;border-radius:14px!important;background:linear-gradient(135deg,#f472b6,#a855f7)!important;border:none!important;color:#fff!important;font-size:14px!important;cursor:pointer!important;display:flex!important;align-items:center!important;justify-content:center!important;flex-shrink:0!important;visibility:visible!important;opacity:1!important;pointer-events:auto!important;padding:0!important;margin:0!important;box-shadow:0 2px 8px rgba(168,85,247,.35)!important}
#rp-game-send:hover{opacity:.85!important}
/* Win overlay */
#rp-game-win{position:absolute;inset:0;background:rgba(120,60,180,.3);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);display:flex;flex-direction:column;align-items:center;justify-content:center;z-index:100}
.game-win-box{background:#fff;border:1px solid rgba(200,150,255,.3);border-radius:28px;padding:32px 24px;text-align:center;max-width:224px;width:88%;box-shadow:0 12px 48px rgba(160,80,200,.25),0 2px 8px rgba(0,0,0,.06)}
.rp-dark .game-win-box{background:linear-gradient(145deg,#1e0a30,#120520);border-color:rgba(200,150,255,.2)}
.game-win-emoji{font-size:66px;margin-bottom:10px;line-height:1}
.game-win-title{font-size:22px;font-weight:800;color:#2d1060;margin-bottom:8px;letter-spacing:-.2px}
.rp-dark .game-win-title{color:#f0e0ff}
.game-win-sub{font-size:13px;color:#9070b0;margin-bottom:22px;line-height:1.6}
.rp-dark .game-win-sub{color:rgba(220,180,255,.6)}
.game-win-btn{width:100%!important;padding:14px!important;background:linear-gradient(135deg,#f472b6,#a855f7)!important;color:#fff!important;border:none!important;border-radius:18px!important;font-size:15px!important;font-weight:800!important;cursor:pointer!important;font-family:inherit!important;display:block!important;visibility:visible!important;opacity:1!important;pointer-events:auto!important;letter-spacing:.3px!important;box-shadow:0 4px 18px rgba(168,85,247,.4)!important}
.game-win-btn:hover{opacity:.88!important}
@keyframes rp-dice-roll{0%{transform:rotate(0deg) scale(1)}25%{transform:rotate(90deg) scale(1.3)}50%{transform:rotate(180deg) scale(1)}75%{transform:rotate(270deg) scale(1.3)}100%{transform:rotate(360deg) scale(1)}}
.ludo-rolling{animation:rp-dice-roll .4s ease-in-out 3}
/* ── GAMES FOLDER (iOS style) ── */
.rp-folder-ico {
  width: 52px; height: 52px; border-radius: 16px;
  background: rgba(255,255,255,0.22);
  border: 1px solid rgba(255,255,255,0.30);
  display: grid; grid-template-columns: 1fr 1fr; grid-template-rows: 1fr 1fr;
  gap: 3px; padding: 7px;
  box-sizing: border-box; overflow: hidden;
  transition: transform .14s ease, filter .14s ease;
  filter: drop-shadow(0 2px 6px rgba(0,0,0,.30));
}
.rp-folder-ico:active { transform: scale(.88); }
.rp-fi-item {
  border-radius: 4px;
  display: flex; align-items: center; justify-content: center;
  font-size: 14px; line-height: 1;
  background: transparent;
}
.rp-fi-empty { opacity: 0; }
#rp-folder-modal {
  position: absolute; inset: 0; z-index: 800;
  background: rgba(0,0,0,0.45); backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px);
  display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 16px;
}
.rp-folder-title-lbl {
  color: rgba(255,255,255,0.92); font-size: 14px; font-weight: 600;
  text-shadow: 0 1px 6px rgba(0,0,0,0.55); text-align: center; letter-spacing: .8px;
}
.rp-folder-popup {
  background: rgba(255,255,255,0.18); backdrop-filter: blur(24px); -webkit-backdrop-filter: blur(24px);
  border: 1px solid rgba(255,255,255,0.28); border-radius: 26px; padding: 22px 28px;
  display: flex; flex-direction: row; gap: 30px; align-items: flex-start;
  box-shadow: 0 8px 32px rgba(0,0,0,0.22), inset 0 1px 0 rgba(255,255,255,0.35);
}
.rp-folder-item {
  min-width: 74px;
  display: flex; flex-direction: column; align-items: center; gap: 10px; cursor: pointer;
  transition: transform .15s cubic-bezier(.34,1.56,.64,1);
}
.rp-folder-item:active { transform: scale(.84); }
.rp-folder-item-ico {
  width: 58px; height: 58px; border-radius: 14px;
  display: flex; align-items: center; justify-content: center;
  background: transparent !important;
  box-shadow: none !important;
}
.rp-folder-item-ico svg { width: 34px; height: 34px; }
.rp-folder-game-ludo,
.rp-folder-game-2048 { color: #f6d7e3; }
.rp-folder-item-lbl {
  font-size: 13px; color: #f6d7e3; font-weight: 700;
  text-shadow: 0 1px 2px rgba(0,0,0,.22); white-space: nowrap; letter-spacing: .1px;
}
/* ── Candy theme folder ── */
#rp-phone.rp-theme-candy .rp-folder-ico {
  background: rgba(255,200,220,0.45) !important;
  border-color: rgba(255,180,200,0.50) !important;
  filter: drop-shadow(0 1px 5px rgba(200,60,90,.45)) drop-shadow(0 0 8px rgba(255,255,255,.5)) !important;
}
#rp-phone.rp-theme-candy .rp-fi-item { background: transparent !important; }
#rp-phone.rp-theme-candy .rp-fi-empty { opacity: 0 !important; }
#rp-phone.rp-theme-candy #rp-folder-modal {
  background: rgba(180,60,90,0.28);
  backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px);
}
#rp-phone.rp-theme-candy .rp-folder-popup {
  background: rgba(255,228,238,0.55);
  border-color: rgba(220,130,165,0.35);
  box-shadow: 0 8px 32px rgba(200,100,140,0.20), inset 0 1px 0 rgba(255,255,255,0.65);
}
#rp-phone.rp-theme-candy .rp-folder-title-lbl {
  color: rgba(120,20,50,0.92);
  text-shadow: 0 1px 4px rgba(255,255,255,0.55);
}
#rp-phone.rp-theme-candy .rp-folder-item-lbl {
  color: #ffeaf2;
  text-shadow: 0 1px 2px rgba(120,20,50,.38);
}
#rp-phone.rp-theme-candy .rp-folder-game-ludo,
#rp-phone.rp-theme-candy .rp-folder-game-2048 {
  color:#ffeaf2 !important;
  filter:drop-shadow(0 0 5px rgba(255,255,255,.55)) drop-shadow(0 1px 3px rgba(120,20,50,.38)) !important;
}
/* ── Star theme folder ── */
#rp-phone.rp-theme-star .rp-folder-ico {
  background: rgba(30,10,80,0.70) !important;
  border-color: rgba(160,110,255,0.50) !important;
  filter: drop-shadow(0 0 8px rgba(160,100,255,.65)) drop-shadow(0 1px 3px rgba(0,0,0,.6)) !important;
}
#rp-phone.rp-theme-star .rp-fi-item { background: transparent !important; filter: drop-shadow(0 0 3px rgba(200,170,255,.6)); }
#rp-phone.rp-theme-star .rp-fi-empty { opacity: 0 !important; }
#rp-phone.rp-theme-star #rp-folder-modal {
  background: rgba(4,2,18,0.72);
}
#rp-phone.rp-theme-star .rp-folder-popup {
  background: rgba(15,7,48,0.82);
  border-color: rgba(150,100,255,0.35);
  box-shadow: 0 8px 32px rgba(80,40,200,0.35), inset 0 1px 0 rgba(170,130,255,0.20);
}
#rp-phone.rp-theme-star .rp-folder-title-lbl {
  color: rgba(220,200,255,0.95);
  text-shadow: 0 0 12px rgba(160,100,255,0.6), 0 1px 4px rgba(0,0,0,0.6);
}
#rp-phone.rp-theme-star .rp-folder-item-lbl {
  color: #f7f2ff;
  text-shadow: 0 1px 2px rgba(0,0,0,0.4);
}
#rp-phone.rp-theme-star .rp-folder-game-ludo,
#rp-phone.rp-theme-star .rp-folder-game-2048 {
  color:#f7f2ff !important;
  filter:drop-shadow(0 0 6px rgba(180,150,255,.55)) drop-shadow(0 1px 3px rgba(0,0,0,.42)) !important;
}
/* ── Misty theme folder ── */
#rp-phone.rp-theme-misty .rp-folder-ico {
  background: rgba(190,215,240,0.50) !important;
  border-color: rgba(255,255,255,0.55) !important;
  filter: drop-shadow(0 1px 4px rgba(0,30,80,.35)) drop-shadow(0 0 6px rgba(180,210,240,.4)) !important;
}
#rp-phone.rp-theme-misty .rp-fi-item { background: transparent !important; }
#rp-phone.rp-theme-misty .rp-fi-empty { opacity: 0 !important; }
#rp-phone.rp-theme-misty #rp-folder-modal {
  background: rgba(160,195,220,0.38);
  backdrop-filter: blur(18px); -webkit-backdrop-filter: blur(18px);
}
#rp-phone.rp-theme-misty .rp-folder-popup {
  background: rgba(230,242,252,0.55);
  border-color: rgba(255,255,255,0.60);
  box-shadow: 0 8px 32px rgba(100,155,200,0.20), inset 0 1px 0 rgba(255,255,255,0.65);
}
#rp-phone.rp-theme-misty .rp-folder-title-lbl {
  color: rgba(60,90,120,0.90);
  text-shadow: 0 1px 4px rgba(255,255,255,0.55);
}
#rp-phone.rp-theme-misty .rp-folder-item-lbl {
  color: #2a4e70;
  text-shadow: 0 1px 2px rgba(255,255,255,.42);
}
#rp-phone.rp-theme-misty .rp-folder-game-ludo,
#rp-phone.rp-theme-misty .rp-folder-game-2048 {
  color:#2f587d !important;
  filter:drop-shadow(0 1px 2px rgba(255,255,255,.38)) drop-shadow(0 0 3px rgba(20,60,90,.15)) !important;
}

@keyframes rpApiBlink{0%,100%{opacity:1}50%{opacity:.3}}
#rp-api-blink{animation:rpApiBlink 1.6s ease-in-out infinite}
/* API settings */
#rp-api-btn{width:30px;height:30px;border-radius:15px;background:rgba(168,85,247,.1);border:1.5px solid rgba(168,85,247,.22);color:#7c3aed;font-size:12px;cursor:pointer;display:flex!important;align-items:center;justify-content:center;flex-shrink:0;transition:background .2s;font-weight:700;padding:0;visibility:visible!important;pointer-events:auto!important}
#rp-api-btn:hover{background:rgba(168,85,247,.22)}
.rp-dark #rp-api-btn{background:rgba(168,85,247,.15);border-color:rgba(168,85,247,.3);color:#c084fc}
#rp-api-panel{position:absolute;inset:0;z-index:80;background:rgba(80,30,130,.28);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);display:flex;align-items:center;justify-content:center;border-radius:48px}
#rp-api-box{background:#fff;border:1px solid rgba(200,150,255,.3);border-radius:24px;padding:22px 20px;width:222px;max-width:92%;box-shadow:0 8px 40px rgba(150,80,200,.22)}
.rp-dark #rp-api-box{background:linear-gradient(145deg,#1e0a30,#120520);border-color:rgba(200,150,255,.2)}
.rp-api-title{font-size:15px;font-weight:800;color:#2d1060;margin-bottom:5px}
.rp-dark .rp-api-title{color:#f0e0ff}
.rp-api-desc{font-size:10.5px;color:#9070b0;margin-bottom:14px;line-height:1.55}
.rp-dark .rp-api-desc{color:rgba(220,180,255,.6)}
.rp-api-opt{display:flex;align-items:center;gap:8px;font-size:12.5px;color:#2d1060;margin-bottom:7px;cursor:pointer}
.rp-dark .rp-api-opt{color:#e8d0ff}
#rp-api-custom-fields{margin-top:10px;display:flex;flex-direction:column;gap:7px}
.rp-api-presets{display:flex;gap:5px;flex-wrap:wrap;margin-bottom:2px}
.rp-api-preset-btn{padding:3px 9px;border-radius:10px;border:1px solid rgba(168,85,247,.3);background:transparent;color:#7c3aed;font-size:10px;cursor:pointer;transition:background .15s}
.rp-api-preset-btn:hover{background:rgba(168,85,247,.12)}
.rp-api-input{background:rgba(255,255,255,.9);border:1.5px solid rgba(180,120,200,.25);border-radius:12px;padding:7px 12px;font-size:11.5px;color:#2d1060;font-family:inherit;outline:none;width:100%;box-sizing:border-box}
.rp-dark .rp-api-input{background:rgba(255,255,255,.08);border-color:rgba(180,120,255,.2);color:#f0e0ff}
.rp-api-input:focus{border-color:#a855f7}
.rp-api-input::placeholder{color:rgba(120,80,160,.4)}
.rp-api-save-row{display:flex;gap:8px;margin-top:16px}
.rp-api-save-btn{flex:1;padding:9px;background:linear-gradient(135deg,#f472b6,#a855f7);color:#fff;border:none;border-radius:16px;font-size:13px;font-weight:700;cursor:pointer}
.rp-api-cancel-btn{padding:9px 14px;background:rgba(120,60,180,.08);border:1px solid rgba(168,85,247,.2);border-radius:16px;font-size:13px;color:#7c3aed;cursor:pointer}

`;

// ================================================================
//  DEVICE TYPE DETECTION - 彻底分离 PC 和手机端逻辑
//  CSS Media Query (hover:none) and (pointer:coarse):
//    - 手机/平板 → hover:none + pointer:coarse  → IS_TOUCH_DEVICE = true ✓
//    - 鼠标PC → hover:hover + pointer:fine      → IS_TOUCH_DEVICE = false ✓
//    - 触屏笔记本(Surface/2-in-1) → hover:hover + pointer:fine (鼠标模式) → false ✓
//  比 maxTouchPoints > 0 更可靠（触屏笔记本 maxTouchPoints 也 > 0，会误判）
// ================================================================
const IS_TOUCH_DEVICE = window.matchMedia('(hover: none) and (pointer: coarse)').matches
                     || /Android|iPhone|iPod/i.test(navigator.userAgent);

function injectStyles() {
  if (document.getElementById('rp-phone-css')) return;
  const style = document.createElement('style');
  style.id = 'rp-phone-css';
  style.textContent = RP_PHONE_CSS;
  document.head.appendChild(style);
  console.log('[Raymond Phone] CSS injected');
}

// ST extensions use global variables, not ES6 modules
const eventSource = window.eventSource || SillyTavern?.eventSource;
const event_types = window.event_types || SillyTavern?.eventTypes;
const setExtensionPrompt = window.setExtensionPrompt || SillyTavern?.setExtensionPrompt;
const extension_prompt_types = window.extension_prompt_types || SillyTavern?.extensionPromptTypes;
const getContext = window.getContext || SillyTavern?.getContext || (() => ({}));
// 通过 ST 模块系统加载 extension_settings（官方标准方式）
// extension_settings 是 ES module export，不在 window 上
let _rp_ext_settings = null;
let _rp_save_fn = null;
(async function _rpLoadModules() {
  try {
    const ext = await import('../../../extensions.js');
    if (ext && ext.extension_settings) {
      _rp_ext_settings = ext.extension_settings;
      console.log('[Phone] extension_settings 加载成功 ✅');
    }
  } catch(e) { console.warn('[Phone] 无法加载 extensions.js:', e.message); }
  try {
    const scr = await import('../../../../script.js');
    if (scr && typeof scr.saveSettingsDebounced === 'function') {
      _rp_save_fn = scr.saveSettingsDebounced;
      console.log('[Phone] saveSettingsDebounced 加载成功 ✅');
    }
  } catch(e) { console.warn('[Phone] 无法加载 script.js:', e.message); }
})();

const _extSettings = () =>
  _rp_ext_settings ||
  (typeof extension_settings !== 'undefined' ? extension_settings : null) ||
  window.extension_settings ||
  (window.SillyTavern && window.SillyTavern.extensionSettings) ||
  null;

const _saveSettings = () => {
  try {
    const fn = _rp_save_fn ||
      (typeof saveSettingsDebounced === 'function' ? saveSettingsDebounced : null) ||
      window.saveSettingsDebounced ||
      (window.SillyTavern && window.SillyTavern.saveSettingsDebounced);
    if (typeof fn === 'function') fn();
  } catch(e) {}
};

const EXT_KEY = 'ray_phone_v1'; // extension_settings 的命名空间键

// ================================================================
//  DEFAULT THREADS FACTORY
// ================================================================
function DEFAULT_THREADS() {
  // 不硬编码联系人：联系人由 AI 发信时动态创建，每个对话框完全隔离
  return {};
}

// ================================================================
//  STATE
// ================================================================
const STATE = {
  currentView: 'lock',
  currentThread: null,
  threads: DEFAULT_THREADS(),
  notifications: [],
  sync: { stage: 1, progress: 0, status: '乖巧' },
  chatId: null,
  pendingMessages: [], // FIX3: 多条消息队列
  moments: [],
  xhsFeed: [],
  xhsCurrentPost: null,
  xhsSelectedTag: '日常',
  xhsReplyToCidx: null,
  wallpaper: null,
  darkMode: false,
  avatars: {},
  _lastAiFingerprint: null,
};

// FIX2: 按 chatId 存储各窗口的手机状态（内存缓存）
const CHAT_STORE = {};

// 头像模块级缓存——独立于 STATE.avatars，不受 chatId 切换影响
// 所有读头像的地方统一调 getAvatar(key)，写头像调 setAvatar(key, dataUrl)
const _AV = {};
function getAvatar(key) {
  // window._rpAV 最高优先级，不受任何闭包/STATE切换影响
  if (window._rpAV && window._rpAV[key]) return window._rpAV[key];
  if (_AV[key]) return _AV[key];
  if (STATE.avatars && STATE.avatars[key]) {
    setAvatar(key, STATE.avatars[key]);
    return STATE.avatars[key];
  }
  return null;
}
function setAvatar(key, dataUrl) {
  window._rpAV = window._rpAV || {};
  window._rpAV[key] = dataUrl;
  _AV[key] = dataUrl;
  STATE.avatars = STATE.avatars || {};
  STATE.avatars[key] = dataUrl;
}


// 自动将当前对话的 char 加入联系人（每个对话框独立，无需开场白 <PHONE> 标签）
function autoAddCharContact() {
  try {
    const ctx = getContext();
    // 必须有真实 chatId（排除 ST 初始页面 / 无对话状态）
    if (!ctx?.chatId) return;
    const charName = ctx?.name2 || (ctx?.characters && ctx?.characterId !== undefined
      ? ctx.characters[ctx.characterId]?.name : null);
    if (!charName) return;
    // 过滤无效名字：SillyTavern 本身、空白、纯数字
    const invalid = /^(sillytavern|tavern|system|assistant|ai)$/i;
    if (invalid.test(charName.trim())) return;
    // 已存在则跳过
    const exists = Object.values(STATE.threads).some(t =>
      t.name && t.name.toLowerCase() === charName.toLowerCase()
    );
    if (exists) return;
    findOrCreateThread(charName);
    renderThreadList();
    saveState();
    console.log('[Phone] 自动添加联系人：', charName);
  } catch(e) { /* ignore */ }
}


// 清理无效联系人（SillyTavern 本身、旧硬编码遗留等）
function cleanInvalidContacts() {
  const invalid = /^(sillytavern|tavern|system|assistant|ai)$/i;
  let changed = false;
  Object.keys(STATE.threads).forEach(function(k) {
    const name = (STATE.threads[k] && STATE.threads[k].name) || '';
    if (invalid.test(name.trim())) {
      delete STATE.threads[k];
      changed = true;
      console.log('[Phone] 清理无效联系人：', name);
    }
  });
  if (changed) { renderThreadList(); saveState(); }
}


// 防御性同步：打开手机时确保 STATE 与当前 ST 对话一致
// 不依赖 CHAT_CHANGED 是否触发
function syncToCurrentChat() {
  const ctx = getContext();
  const newChatId = ctx?.chatId || (ctx?.characterId != null ? 'char_' + ctx.characterId : 'default');
  if (newChatId === STATE.chatId) return; // 已一致，跳过

  // 切换前把当前头像备份到 _AV（防止切换后丢失）
  Object.assign(_AV, STATE.avatars || {});

  console.log('[Phone] syncToCurrentChat:', STATE.chatId, '->', newChatId);

  // 保存旧窗口状态
  if (STATE.chatId) {
    CHAT_STORE[STATE.chatId] = {
      threads:       JSON.parse(JSON.stringify(STATE.threads)),
      notifications: [...STATE.notifications],
      sync:          { ...STATE.sync },
      currentThread: STATE.currentThread,
      moments:       JSON.parse(JSON.stringify(STATE.moments || [])),
      diary:         JSON.parse(JSON.stringify(STATE.diary || [])),
      avatars:       Object.assign({}, STATE.avatars || {}),
    };
    saveState();
  }

  // 切到新窗口
  STATE.chatId = newChatId;
  STATE.pendingMessages = [];

  if (CHAT_STORE[newChatId]) {
    const s = CHAT_STORE[newChatId];
    STATE.threads       = s.threads || {};
    STATE.notifications = s.notifications || [];
    STATE.sync          = Object.assign({}, s.sync);
    STATE.moments       = JSON.parse(JSON.stringify(s.moments || []));
    STATE.diary         = JSON.parse(JSON.stringify(s.diary   || []));
    STATE.avatars       = Object.assign({}, s.avatars || {});
    STATE.currentThread = s.currentThread || null;
  } else {
    const persisted = loadState(newChatId);
    if (persisted) {
      STATE.threads       = persisted.threads || {};
      STATE.notifications = persisted.notifications || [];
      STATE.sync          = persisted.sync || { stage: 1, progress: 0, status: '乖巧' };
      STATE.moments       = persisted.moments || [];
      STATE.diary         = persisted.diary   || [];
      STATE.avatars       = persisted.avatars || {};
    } else {
      STATE.threads       = {};
      STATE.notifications = [];
      STATE.sync          = { stage: 1, progress: 0, status: '乖巧' };
      STATE.moments       = [];
      STATE.diary         = [];
      STATE.avatars       = {};
    }
    STATE.currentThread = null;
  }
  mergeGlobalAvatars();

  cleanInvalidContacts();
  autoAddCharContact();
  go('lock');
  renderThreadList();
  refreshBadges();
  refreshWidget();
  refreshLockNotifs();
  // 延迟重建：等 ctx.chat 加载完成
  var _rebuildId = STATE.chatId;
  setTimeout(function() { rebuildContactsFromHistory(_rebuildId); }, 500);
}


// 从 ST 服务端拉取最新 extension_settings（解决手机端缓存问题）
async function fetchServerSettings() {
  try {
    // ST 1.12+ API endpoint（多版本兼容）
    const endpoints = ['/api/settings/get', '/getsettings'];
    let data = null;
    for (const ep of endpoints) {
      try {
        const res = await fetch(ep, { method: 'POST', headers: {'Content-Type':'application/json'}, body: '{}' });
        if (res.ok) { data = await res.json(); break; }
      } catch(e2) {}
    }
    if (!data) return false;
    const serverEs = data.extension_settings;
    if (!serverEs || !serverEs[EXT_KEY]) return false;
    // 更新本地内存里的 extension_settings
    const es = _extSettings();
    if (es) {
      if (!es[EXT_KEY]) es[EXT_KEY] = {};
      // 合并：服务端数据优先
      Object.keys(serverEs[EXT_KEY]).forEach(function(k) {
        es[EXT_KEY][k] = serverEs[EXT_KEY][k];
        // 同步回 localStorage 作为本地缓存
        try { localStorage.setItem('rp-phone-v1-' + k, JSON.stringify(serverEs[EXT_KEY][k])); } catch(e3) {}
      });
    }
    console.log('[Phone] 从服务器同步完成');
    return true;
  } catch(e) {
    console.warn('[Phone] fetchServerSettings 失败:', e);
    return false;
  }
}


// 从聊天历史重建联系人（聊天记录保存在服务端，所有设备加载同一对话时自动同步）
function rebuildContactsFromHistory(chatId) {
  try {
    const ctx = getContext();
    const currentId = ctx?.chatId || (ctx?.characterId != null ? 'char_' + ctx.characterId : 'default');
    if (currentId !== chatId) return; // chatId 已变，放弃
    const msgs = ctx?.chat || [];
    let changed = false;
    msgs.filter(function(m) { return !m.is_user && m.mes; }).forEach(function(m) {
      const phoneMatch = m.mes.match(/<PHONE>([\s\S]*?)<\/PHONE>/i);
      if (!phoneMatch) return;
      const block = phoneMatch[1];
      // 仅提取 FROM 字段，创建联系人（不重复添加消息内容）
      const re = /<(?:SMS|MOMENTS|COMMENT)[^>]+FROM="([^"]+)"/gi;
      let ma;
      while ((ma = re.exec(block)) !== null) {
        const fromRaw = ma[1].trim();
        const invalid = /^(sillytavern|tavern|system|assistant|ai)$/i;
        if (invalid.test(fromRaw)) continue;
        // 只创建线程，不重复推送消息
        const exists = Object.values(STATE.threads).some(function(t) {
          return t.name && t.name.toLowerCase() === fromRaw.toLowerCase();
        });
        if (!exists) { findOrCreateThread(fromRaw); changed = true; }
      }
    });
    if (changed) { cleanInvalidContacts(); renderThreadList(); saveState(); }
  } catch(e) { console.warn('[Phone] rebuildContacts error', e); }
}

/* ── HELPER: findOrCreateThread ── */
function findOrCreateThread(nameRaw) {
  const lower = nameRaw.toLowerCase();
  for (const th of Object.values(STATE.threads)) {
    if (th.name && th.name.toLowerCase() === lower) return th;
  }
  const _colors = ['#7c3aed','#0891b2','#0d9488','#b45309','#be185d','#1d4ed8'];
  const colorIdx = Object.keys(STATE.threads).length % _colors.length;
  const tempId = `contact_${lower.replace(/\s+/g, '_')}`;
  if (!STATE.threads[tempId]) {
    STATE.threads[tempId] = {
      id: tempId, name: nameRaw,
      initials: nameRaw.slice(0, 2),
      avatarBg: `linear-gradient(145deg,${_colors[colorIdx]},${_colors[(colorIdx+1)%_colors.length]})`,
      type: 'contact', messages: [], unread: 0
    };
  }
  return STATE.threads[tempId];
}

// ================================================================
//  PERSISTENCE (localStorage)
// ================================================================
// 从全局 key 合并头像（sessionStorage 优先，localStorage 兜底）
function mergeGlobalAvatars() {
  try {
    const raw = sessionStorage.getItem('rp-phone-avatars-global')
             || localStorage.getItem('rp-phone-avatars-global');
    if (!raw) return;
    const parsed = JSON.parse(raw);
    STATE.avatars = Object.assign({}, STATE.avatars || {}, parsed);
  } catch(e) {}
}

// 持久化头像到 sessionStorage（不受 localStorage 配额限制）
function saveGlobalAvatars() {
  try {
    const json = JSON.stringify(STATE.avatars || {});
    sessionStorage.setItem('rp-phone-avatars-global', json);
    console.log('[Phone:av] saved to sessionStorage, keys:', Object.keys(STATE.avatars || {}));
  } catch(e) {
    console.warn('[Phone:av] sessionStorage save failed:', e);
  }
  // 也尝试 localStorage，失败不影响
  try { localStorage.setItem('rp-phone-avatars-global', JSON.stringify(STATE.avatars || {})); } catch(e) {}
}

function saveState() {
  if (!STATE.chatId) return;
  try {
    const threads = JSON.parse(JSON.stringify(STATE.threads));
    for (const th of Object.values(threads)) {
      if (th.messages) {
        // 截断消息到最近100条，防止 localStorage 超配额
        if (th.messages.length > 100) th.messages = th.messages.slice(-100);
        th.messages = th.messages.map(m =>
          (m.type === 'image' && m.src?.startsWith('data:')) ? { ...m, src: '__img_expired__' } : m
        );
      }
    }
    // moments 只保留最近50条
    const moments = (STATE.moments || []).slice(-50);
    const payload = {
      threads,
      notifications: STATE.notifications,
      sync: STATE.sync,
      moments,
      diary: STATE.diary || [],
      darkMode: STATE.darkMode,
      avatars: Object.assign({}, _AV),
    };
    const jsonStr = JSON.stringify(payload);
    // 如果写入失败，先清理同 key 旧数据再重试
    try {
      localStorage.setItem(`rp-phone-v1-${STATE.chatId}`, jsonStr);
    } catch(q) {
      // QuotaExceeded：清理其他旧聊天 key，只保留当前
      try {
        const curKey = `rp-phone-v1-${STATE.chatId}`;
        Object.keys(localStorage).forEach(k => {
          if (k.startsWith('rp-phone-v1-') && k !== curKey) localStorage.removeItem(k);
        });
        localStorage.setItem(curKey, jsonStr);
        console.log('[Phone] saveState: cleared old keys, retry ok');
      } catch(q2) {
        console.warn('[Raymond Phone] saveState failed even after cleanup', q2);
      }
    }
    const es = _extSettings();
    if (es) {
      if (!es[EXT_KEY]) es[EXT_KEY] = {};
      es[EXT_KEY][STATE.chatId] = payload;
      _saveSettings();
    }
  } catch(e) { console.warn('[Raymond Phone] saveState failed', e); }
}

function loadState(chatId) {
  _getMomentsCtxCache = null; // 切换聊天时清缓存
  try {
    const es = _extSettings();
    if (es && es[EXT_KEY] && es[EXT_KEY][chatId]) {
      try { localStorage.setItem(`rp-phone-v1-${chatId}`, JSON.stringify(es[EXT_KEY][chatId])); } catch(e) {}
      return es[EXT_KEY][chatId];
    }
    const raw = localStorage.getItem(`rp-phone-v1-${chatId}`);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (es) {
        if (!es[EXT_KEY]) es[EXT_KEY] = {};
        es[EXT_KEY][chatId] = parsed;
        _saveSettings();
      }
      return parsed;
    }
    return null;
  } catch(e) { return null; }
}

// ================================================================
//  HTML
// ================================================================
const HTML = `
<div id="rp-fab" title="打开手机"><svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%;display:block;"><rect x="8" y="3" width="32" height="42" rx="6" fill="#fff" stroke="#e0e0e0" stroke-width="1.5"/><rect x="11" y="7" width="26" height="30" rx="3" fill="#f0f4ff"/><circle cx="24" cy="41" r="2.2" fill="#c8c8d0"/><rect x="19" y="5" width="10" height="2" rx="1" fill="#d0d0d8"/><rect x="13" y="10" width="22" height="14" rx="2" fill="#7c9fff" opacity=".7"/><rect x="13" y="27" width="10" height="3" rx="1.5" fill="#b0bcff"/><rect x="25" y="27" width="10" height="3" rx="1.5" fill="#ffa0b4"/><rect x="13" y="32" width="22" height="3" rx="1.5" fill="#e0e0e8"/></svg></div>
<div id="rp-wrapper">

  <div id="rp-phone" style="display:none">
    <div id="rp-frame">
      <div class="rp-btn rp-vol-up"></div>
      <div class="rp-btn rp-vol-dn"></div>
      <div class="rp-btn rp-power"></div>

      <div id="rp-screen">
        <div id="rp-wallpaper-layer"></div>
        <div id="rp-island"></div>
        <div id="rp-sbar">
          <span id="rp-sbar-time"></span>
          <div class="rp-sbar-r">
            <svg width="16" height="10" viewBox="0 0 16 10" fill="currentColor" opacity=".8">
              <rect x="0" y="4" width="3" height="6" rx="1"/>
              <rect x="4" y="2" width="3" height="8" rx="1"/>
              <rect x="8" y="0" width="3" height="10" rx="1"/>
              <rect x="12" y="0" width="3" height="10" rx="1" opacity=".3"/>
            </svg>
            <svg width="14" height="10" viewBox="0 0 14 10" fill="currentColor" opacity=".8">
              <path d="M7 2C9.5 2 11.7 3.1 13.2 4.8L14 4C12.3 2 9.8 1 7 1S1.7 2 0 4l.8.8C2.3 3.1 4.5 2 7 2z"/>
              <path d="M7 4c1.7 0 3.2.7 4.3 1.8L12 5c-1.3-1.3-3-2-5-2S3.3 3.7 2 5l.7.8C3.8 4.7 5.3 4 7 4z"/>
              <circle cx="7" cy="9" r="1.2"/>
            </svg>
            <div id="rp-bat">
              <div id="rp-bat-fill"></div>
            </div>
          </div>
        </div>

        <!-- 锁屏 -->
        <div id="rp-view-lock" class="rp-view">
          <div class="rp-lock-bg"></div>
          <div class="rp-lock-body">
            <div id="rp-lock-time"></div>
            <div id="rp-lock-date"></div>
            <div id="rp-lock-notifs"></div>
          </div>
          <div id="rp-lock-widget"></div>
          <div id="rp-swipe-hint">向上轻扫以解锁</div>
          <div id="rp-swipe-zone"></div>
        </div>

        <!-- 主屏 -->
        <div id="rp-view-home" class="rp-view" style="display:none">
          <div class="rp-home-bg"></div>
          <div class="rp-home-body">
            <div id="rp-home-clock"></div>
            <div id="rp-home-date"></div>
            <div id="rp-app-grid">
              <!-- row 1: 信息 朋友圈 夜间 -->
              <div class="rp-app" data-app="messages">
                <div class="rp-app-ico rp-ico-msg">
                  <div class="rp-badge" id="rp-main-badge" style="display:none">0</div>
                  <svg viewBox="0 0 40 40" fill="none"><circle cx="20" cy="20" r="20" fill="url(#mg)"/><defs><linearGradient id="mg" x1="0" y1="0" x2="40" y2="40"><stop offset="0%" stop-color="#34c759"/><stop offset="100%" stop-color="#25a244"/></linearGradient></defs><path d="M8 14a4 4 0 014-4h16a4 4 0 014 4v10a4 4 0 01-4 4H14l-4 4v-4a4 4 0 01-2-3.5V14z" fill="white"/></svg>
                </div>
                <div class="rp-app-lbl">信息</div>
              </div>
              <div class="rp-app" data-app="moments">
                <div class="rp-app-ico">
                  <svg viewBox="0 0 40 40" fill="none"><circle cx="20" cy="20" r="20" fill="url(#mcg2)"/><defs><linearGradient id="mcg2" x1="0" y1="0" x2="40" y2="40"><stop offset="0%" stop-color="#3d8b65"/><stop offset="100%" stop-color="#2d7a55"/></linearGradient></defs><circle cx="20" cy="14" r="3.5" fill="white" opacity=".9"/><rect x="10" y="20" width="20" height="2" rx="1" fill="white" opacity=".7"/><rect x="12" y="24" width="16" height="2" rx="1" fill="white" opacity=".5"/><rect x="14" y="28" width="12" height="2" rx="1" fill="white" opacity=".35"/></svg>
                </div>
                <div class="rp-app-lbl">朋友圈</div>
              </div>

              <!-- row 2: 设置 飞行棋 占位 -->
              <div class="rp-app" data-app="settings">
                <div class="rp-app-ico">⚙️</div>
                <div class="rp-app-lbl">设置</div>
              </div>
              <div class="rp-app" id="rp-folder-games-btn" data-app="folder-games">
                <div class="rp-app-ico rp-ico-games">
                  <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="6" y="14" width="28" height="16" rx="8" stroke-width="2"></rect>
                    <line x1="14" y1="22" x2="20" y2="22" stroke-width="2"></line>
                    <line x1="17" y1="19" x2="17" y2="25" stroke-width="2"></line>
                    <circle cx="26" cy="20" r="1.8" fill="currentColor" stroke="none"></circle>
                    <circle cx="29.8" cy="23.8" r="1.8" fill="currentColor" stroke="none"></circle>
                  </svg>
                </div>
                <div class="rp-app-lbl">游戏</div>
              </div>
              <div class="rp-app" data-app="api-settings">
                <div class="rp-app-ico">⚡</div>
                <div class="rp-app-lbl">API</div>
              </div>
              <!-- row 3: 美化 日记 -->
              <div class="rp-app" data-app="themes">
                <div class="rp-app-ico">🎨</div>
                <div class="rp-app-lbl">主题</div>
              </div>
              <div class="rp-app" data-app="diary">
                <div class="rp-app-ico rp-ico-diary"><svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><rect x="10" y="4" width="20" height="32" rx="3.5" stroke-width="2"/><circle cx="10" cy="12" r="2.5" stroke-width="1.6"/><circle cx="10" cy="20" r="2.5" stroke-width="1.6"/><circle cx="10" cy="28" r="2.5" stroke-width="1.6"/><line x1="15" y1="14" x2="27" y2="14" stroke-width="1.7"/><line x1="15" y1="20" x2="27" y2="20" stroke-width="1.7" opacity=".7"/><line x1="15" y1="26" x2="24" y2="26" stroke-width="1.7" opacity=".5"/></svg></div>
                <div class="rp-app-lbl">日记</div>
              </div>
              <div class="rp-app" data-app="xhs" title="小红书">
                <div class="rp-app-ico rp-ico-xhs">
                  <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <rect x="8" y="6.5" width="24" height="27" rx="6" stroke-width="2"></rect>
                    <path d="M14 15.5L19.6 11.5L18.7 17.2L24.8 12.2" stroke-width="2.2"></path>
                    <path d="M14.5 24.5H25.5" stroke-width="1.9" opacity=".9"></path>
                    <path d="M17.5 28.5H22.5" stroke-width="1.9" opacity=".65"></path>
                  </svg>
                </div>
                <div class="rp-app-lbl">小红书</div>
              </div>

            </div>


          </div>
          <div class="rp-home-indicator"></div>
        </div>

        <!-- API 设置 -->
        <div id="rp-view-api-settings" class="rp-view" style="display:none">
          <div class="rp-nav-bar">
            <button class="rp-back" data-to="home">‹</button>
            <span class="rp-nav-title">API 设置</span>
          </div>
          <div style="flex:1;overflow-y:auto;-webkit-overflow-scrolling:touch;padding:18px 18px 10px;display:flex;flex-direction:column;gap:0">
            <div style="font-size:17px;color:#2d1060;font-weight:800;text-align:center;margin-bottom:12px;letter-spacing:-.2px">⚡ 自定义API设置</div>
            <div style="font-size:11px;color:#9070b0;line-height:1.7;margin-bottom:16px;background:rgba(168,85,247,.06);border-radius:12px;padding:10px 12px">
              本API将使用在除信息以外的全部小手机功能中，信息功能仍使用原本的酒馆API<br>
              <span id="rp-api-blink" style="color:#a855f7;font-weight:700">建议接入 DeepSeek 等国产模型，让生成速度更快。</span><br>
              接入后直接调用真实 API，需自备 Key。
            </div>
            <label class="rp-api-opt" style="margin-bottom:10px"><input type="radio" name="rp-api-mode-v" value="st" id="rp-api-mode-st-v" checked> 使用当前 API（SillyTavern）</label>
            <label class="rp-api-opt" style="margin-bottom:12px"><input type="radio" name="rp-api-mode-v" value="custom" id="rp-api-mode-custom-v"> 接入其他 API</label>
            <div id="rp-api-custom-fields-v" style="display:none;flex-direction:column;gap:8px">
              <div class="rp-api-presets" style="margin-bottom:4px">
                <button class="rp-api-preset-btn" data-url="https://api.deepseek.com/v1" data-model="deepseek-chat">DeepSeek</button>
                <button class="rp-api-preset-btn" data-url="https://dashscope.aliyuncs.com/compatible-mode/v1" data-model="qwen-turbo">通义</button>
                <button class="rp-api-preset-btn" data-url="https://open.bigmodel.cn/api/paas/v4" data-model="glm-4-flash">GLM</button>
                <button class="rp-api-preset-btn" data-url="" data-model="">其他OpenAI</button>
              </div>
              <input class="rp-api-input" id="rp-api-url-v" placeholder="API 地址 (如 https://api.deepseek.com/v1)" type="url">
              <input class="rp-api-input" id="rp-api-key-v" placeholder="API Key" type="password">
              <div style="display:flex;gap:6px;align-items:center">
                <input class="rp-api-input" id="rp-api-model-v" placeholder="模型名称 (如 deepseek-chat)" style="flex:1;min-width:0">
                <button id="rp-api-fetch-models" style="flex-shrink:0;padding:7px 10px;border-radius:12px;border:1.5px solid rgba(168,85,247,.3);background:rgba(168,85,247,.08);color:#7c3aed;font-size:11px;cursor:pointer;white-space:nowrap;font-weight:600">获取模型</button>
              </div>
              <div id="rp-model-list" style="display:none;background:rgba(255,255,255,.95);border:1px solid rgba(168,85,247,.2);border-radius:12px;max-height:140px;overflow-y:auto"></div>
            </div>
            <div id="rp-api-status-v" style="font-size:11px;color:#a855f7;min-height:18px;margin-top:8px"></div>
          </div>
          <div style="padding:10px 18px 28px;flex-shrink:0;display:flex;flex-direction:column;gap:10px">
            <button id="rp-api-test-v" style="width:100%;padding:11px;margin-bottom:8px;background:rgba(255,255,255,.18);border:1.5px solid rgba(168,85,247,.45);color:#6d28d9;border-radius:16px;font-size:13px;font-weight:600;cursor:pointer">📡 测试连通性</button>
            <button id="rp-api-save-v" style="width:100%;padding:13px;background:linear-gradient(135deg,#f472b6,#a855f7);color:#fff;border:none;border-radius:18px;font-size:14px;font-weight:700;cursor:pointer">保存设置</button>
          </div>
        </div>

        <!-- 美化/主题 -->
        <div id="rp-view-themes" class="rp-view" style="display:none">
          <div class="rp-nav-bar">
            <button class="rp-back" data-to="home">‹</button>

          </div>
          <div style="flex:1;overflow-y:auto;-webkit-overflow-scrolling:touch;padding:20px 16px">
            <div style="font-size:13px;font-weight:600;color:var(--rp-themes-label);text-align:center;margin-bottom:18px;opacity:.75;letter-spacing:.4px">✨ 选择主题</div>
            <div id="rp-theme-cards" style="display:grid;grid-template-columns:1fr 1fr;gap:14px"></div>
          </div>
        </div>

        <!-- 信息列表 -->
        <div id="rp-view-messages" class="rp-view" style="display:none">
          <div class="rp-nav-bar">
            <button class="rp-back" data-to="home">‹</button>
            <span class="rp-nav-title">信息</span>
            <button class="rp-nav-add" id="rp-add-btn">+</button>
          </div>
          <div id="rp-thread-list"></div>
        </div>

        <!-- 对话线程 -->
        <div id="rp-view-thread" class="rp-view" style="display:none">
          <div class="rp-nav-bar">
            <button class="rp-back" data-to="messages">‹</button>
            <div class="rp-thread-hd">
              <div class="rp-hd-av" id="rp-hd-av"></div>
              <span class="rp-hd-name" id="rp-hd-name"></span>
            </div>
            <span></span>
          </div>
          <div id="rp-bubbles"></div>
          <!-- FIX3: 待发消息队列预览区 -->
          <div id="rp-pending-queue" style="display:none"></div>
          <div id="rp-composer">
            <div id="rp-attach-panel"></div>
            <button id="rp-attach-btn" type="button">＋</button>
            <input id="rp-input" type="text" placeholder="iMessage（回车暂存）" autocomplete="off"/>
            <button id="rp-send" type="button">↑</button>
          </div>
        </div>

        <!-- 日记 -->
        <div id="rp-view-diary" class="rp-view" style="display:none">
          <div class="rp-nav-bar">
            <button class="rp-back" data-to="home">‹</button>
            <span class="rp-nav-title">日记</span>
            <button id="rp-gen-diary" title="AI生成今日日记" class="rp-diary-gen-btn"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 0 1-9 9 9 9 0 0 1-6.36-2.64"/><path d="M3 12a9 9 0 0 1 9-9 9 9 0 0 1 6.36 2.64"/><polyline points="16 8 21 3 21 8"/><polyline points="8 16 3 21 3 16"/></svg></button>
          </div>
          <div id="rp-diary-list" style="flex:1;overflow-y:auto;padding:12px 14px 8px"></div>
          <div class="rp-diary-compose">
            <textarea id="rp-diary-input" class="rp-diary-input" placeholder="写下今天的心情…" rows="3"></textarea>
            <button id="rp-diary-send" class="rp-diary-send-btn">发布</button>
          </div>
        </div>

        <!-- 朋友圈 -->
        <div id="rp-view-moments" class="rp-view" style="display:none">
          <div class="rp-nav-bar">
            <button class="rp-back" data-to="home">‹</button>
            <span class="rp-nav-title">朋友圈</span>
            <div style="display:flex;gap:4px;align-items:center">
              <button id="rp-gen-moments" title="AI生成朋友圈"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 0 1-9 9 9 9 0 0 1-6.36-2.64"/><path d="M3 12a9 9 0 0 1 9-9 9 9 0 0 1 6.36 2.64"/><polyline points="16 8 21 3 21 8"/><polyline points="8 16 3 21 3 16"/></svg></button>
              <button class="rp-nav-add" id="rp-moments-add" title="我要发动态">+</button>
            </div>
          </div>
          <div id="rp-moments-list"></div>
        </div>

        <!-- 小红书 -->
        <div id="rp-view-xhs" class="rp-view" style="display:none;flex-direction:column">
          <div class="rp-nav-bar">
            <button class="rp-back" data-to="home">‹</button>
            <span class="rp-nav-title">小红书</span>
            <div style="display:flex;gap:4px;align-items:center">
              <button id="rp-xhs-compose" title="发笔记" style="width:28px;height:28px;border:none;background:transparent;font-size:18px;cursor:pointer;color:var(--rp-nav-btn,#c0306a)">✏️</button>
              <button id="rp-xhs-refresh" title="刷新" style="width:28px;height:28px;border:none;background:transparent;font-size:18px;cursor:pointer;color:var(--rp-nav-btn,#c0306a)">↻</button>
            </div>
          </div>
          <div id="rp-xhs-list" style="flex:1;overflow-y:auto;padding:6px 10px 14px"></div>
        </div>

        <!-- 小红书详情页 -->
        <div id="rp-view-xhs-detail" class="rp-view" style="display:none;flex-direction:column">
          <div class="rp-nav-bar">
            <button class="rp-back" data-to="xhs">‹</button>
            <span class="rp-nav-title">帖子详情</span>
            <span></span>
          </div>
          <div id="rp-xhs-detail-body" style="flex:1;overflow-y:auto;padding:14px 14px 10px"></div>
          <div id="rp-xhs-detail-input-bar" style="flex-shrink:0;display:flex;align-items:center;padding:6px 10px 10px;gap:8px;min-width:0;position:relative;z-index:10">
            <textarea id="rp-xhs-detail-input" placeholder="发表评论…" autocomplete="off" rows="1" style="flex:1;border-radius:14px;padding:6px 12px;font-size:12px;outline:none;resize:none;overflow:hidden;line-height:1.5;max-height:72px;font-family:inherit;box-sizing:border-box;min-width:0;color:var(--rp-xhs-text,#1a1a1a);background:var(--rp-xhs-card,#fff)"></textarea>
            <button id="rp-xhs-detail-send" style="background:#ff2442;color:#fff;border:none;border-radius:20px;padding:6px 14px;font-size:12px;cursor:pointer;flex-shrink:0;white-space:nowrap;display:inline-flex !important;visibility:visible !important;opacity:1 !important;pointer-events:auto !important">发送</button>
          </div>
        </div>

        <!-- 小红书发帖 -->
        <div id="rp-view-xhs-compose" class="rp-view" style="display:none;flex-direction:column">
          <div class="rp-nav-bar">
            <button class="rp-back" data-to="xhs" style="font-size:12px;padding:5px 14px;border-radius:10px;border:1px solid var(--rp-xhs-border,#ffe0e6);background:transparent;color:var(--rp-xhs-text,#eee);cursor:pointer;font-weight:600">取消</button>
            <span class="rp-nav-title">发笔记</span>
            <button id="rp-xhs-post-btn" style="font-size:12px;padding:4px 12px;border-radius:8px;border:none;background:#ff2442;color:#fff;cursor:pointer;font-weight:600">发布</button>
          </div>
          <div style="padding:16px 14px;flex:1;overflow-y:auto;background:var(--rp-xhs-bg)">
            <input id="rp-xhs-post-title" type="text" placeholder="填写标题（选填）" maxlength="40" style="width:100%;border:none;border-bottom:1px solid var(--rp-xhs-border,#ffe4e8);padding:6px 0;font-size:14px;font-weight:600;outline:none;margin-bottom:10px;box-sizing:border-box;background:transparent;color:var(--rp-xhs-text,#1a1a1a)"/>
            <textarea id="rp-xhs-post-body" placeholder="分享一下你的故事…" rows="6" style="width:100%;border:1px solid var(--rp-xhs-border,#ffe4e8);border-radius:10px;padding:10px;font-size:13px;outline:none;resize:none;box-sizing:border-box;line-height:1.6;background:var(--rp-xhs-card,#fff);color:var(--rp-xhs-text,#1a1a1a)"></textarea>
            <div style="margin-top:10px">
              <div style="font-size:10px;color:var(--rp-xhs-text-faint,#bbb);margin-bottom:5px;letter-spacing:.03em">话题</div>
              <div id="rp-xhs-tag-row" style="display:flex;flex-wrap:wrap;gap:5px">
                <button class="rp-xhs-tag-btn" data-tag="日常">＃日常</button>
                <button class="rp-xhs-tag-btn" data-tag="随想">＃随想</button>
                <button class="rp-xhs-tag-btn" data-tag="情感">＃情感</button>
                <button class="rp-xhs-tag-btn" data-tag="碎碎念">＃碎碎念</button>
                <button class="rp-xhs-tag-btn" data-tag="求安慰">＃求安慰</button>
                <button class="rp-xhs-tag-btn" data-tag="八卦">＃八卦</button>
                <button class="rp-xhs-tag-btn" data-tag="吐槽">＃吐槽</button>
                <button class="rp-xhs-tag-btn" data-tag="记录">＃记录</button>
                <button class="rp-xhs-tag-btn" data-tag="树洞">＃树洞</button>
              </div>
            </div>
          </div>
        </div>

        <!-- 发朋友圈 -->
        <div id="rp-compose-modal" class="rp-view" style="display:none">
          <div class="rp-nav-bar">
            <button class="rp-back rp-compose-cancel" id="rp-compose-cancel">取消</button>
            <span class="rp-nav-title">发朋友圈</span>
            <button class="rp-compose-post-btn" id="rp-compose-post">发布</button>
          </div>
          <div class="rp-compose-body">
            <div class="rp-compose-card">
              <div class="rp-compose-user-row">
                <div class="rp-compose-avatar" id="rp-compose-av">我</div>
                <div class="rp-compose-uname" id="rp-compose-uname">我</div>
              </div>
              <div class="rp-compose-sep"></div>
              <textarea id="rp-compose-text" placeholder="这一刻的想法…" rows="4"></textarea>
              <div class="rp-compose-hint">分享给朋友圈里的每个人</div>
            </div>
          </div>
        </div>

        <div style="display:none">
        </div>

                <!-- 设置 -->
        <div id="rp-view-settings" class="rp-view" style="display:none">
          <div class="rp-nav-bar">
            <button class="rp-back" data-to="home">‹</button>
            <span class="rp-nav-title">设置</span>
            <span></span>
          </div>
          <div style="overflow-y:auto;flex:1">
            <div class="rp-set-section-title">头像管理</div>
            <div class="rp-set-section">
              <div class="rp-set-row">
                <span class="rp-set-key">修改对象</span>
                <select id="rp-avatar-select" class="rp-set-select">
                  <option value="user">我（User）</option>
                </select>
              </div>
              <div class="rp-set-row">
                <div id="rp-avatar-preview-swatch" class="rp-set-avatar-preview" style="background:linear-gradient(145deg,#64748b,#475569)">我</div>
                <span class="rp-set-hint">点击右侧上传图片</span>
                <button class="rp-avatar-upload-btn" id="rp-avatar-upload-btn">📷 选择</button>
                <input type="file" id="rp-avatar-file-input" accept="image/*" style="display:none">
              </div>
            </div>

            <div class="rp-set-section-title">壁纸管理</div>
            <div class="rp-set-section">
              <div class="rp-set-row" style="flex-direction:column;align-items:stretch;gap:8px">
                <img id="rp-wall-preview" class="rp-wall-preview-img" style="display:none" alt=""/>
                <div style="display:flex;gap:8px">
                  <button id="rp-wall-upload" class="rp-set-upload-btn" style="flex:1">📷 上传壁纸</button>
                  <button id="rp-wall-reset"  class="rp-set-upload-btn rp-wall-reset-btn" style="flex:1">恢复默认</button>
                </div>
                <input id="rp-wall-file" type="file" accept="image/*" style="display:none"/>
              </div>
            </div>
          </div>
        </div>

        <!-- 2048 游戏 -->
        <div id="rp-view-g2048" class="rp-view" style="display:none">
          <div class="rp-nav-bar">
            <button class="rp-back" data-to="home">‹</button>
            <span class="rp-nav-title">🎮 2048</span>
            <button id="g2048-newbtn">新局</button>
          </div>
          <div id="g2048-header">
            <div id="g2048-scores">
              <div class="g2048-sbox"><div class="g2048-slbl">分数</div><div id="g2048-score">0</div></div>
              <div class="g2048-sbox"><div class="g2048-slbl">最高</div><div id="g2048-best">0</div></div>
            </div>
            <div id="g2048-turn">你的回合</div>
          </div>
          <div id="g2048-board-wrap">
            <div id="g2048-board"></div>
          </div>
          <div id="g2048-dpad">
            <button class="g2048-dir" data-dir="left">◄</button>
            <button class="g2048-dir" data-dir="up">▲</button>
            <button class="g2048-dir" data-dir="down">▼</button>
            <button class="g2048-dir" data-dir="right">►</button>
          </div>
          <div id="g2048-api-tip">⚡ 请在API功能中更换国产模型，以提升回复速度。</div>
          <div id="g2048-chat-hint">点击展开 ↗</div>
          <div id="g2048-chat"></div>
          <div id="g2048-input-row">
            <input id="g2048-input" type="text" placeholder="游戏中聊天…" autocomplete="off"/>
            <button id="g2048-send" type="button">↑</button>
          </div>
          <!-- 2048 fullscreen chat -->
          <div id="g2048-chat-fs" style="display:none">
            <div id="g2048-chat-fs-hd">
              <span id="g2048-chat-fs-title">💬 聊天记录</span>
              <button id="g2048-chat-fs-close">✕</button>
            </div>
            <div id="g2048-chat-fs-body"></div>
          </div>
          <div id="g2048-over">
            <div class="g2048-over-emoji" id="g2048-over-emoji">🎉</div>
            <div class="g2048-over-title" id="g2048-over-title">达成2048！</div>
            <div class="g2048-over-sub" id="g2048-over-sub">你们合力完成了！</div>
            <div id="g2048-over-btns" style="display:flex;gap:10px;margin-top:6px">
              <button class="g2048-over-btn" id="g2048-continue" style="background:rgba(255,255,255,.18);border:1px solid rgba(255,255,255,.5)">继续挑战</button>
              <button class="g2048-over-btn" id="g2048-restart">再来一局</button>
              <button class="g2048-over-btn" id="g2048-quit" style="background:rgba(0,0,0,.25);border:1px solid rgba(255,255,255,.25)">退出</button>
            </div>
          </div>
        </div>

        <!-- 飞行棋 -->
        <div id="rp-view-game" class="rp-view" style="display:none">
          <div class="rp-nav-bar">
            <button class="rp-back" data-to="home">‹</button>
            <span class="rp-nav-title">🎲 飞行棋</span>
            <span></span>
          </div>
          <div id="rp-game-board-wrap">
            <canvas id="rp-ludo-canvas" width="260" height="260"></canvas>
          </div>
          <div id="rp-game-controls">
            <div class="rp-game-info">
              <div class="rp-game-players"><span style="color:#ec4899">●</span> 你 vs <span style="color:#7c3aed">●</span> <span id="rp-game-char-name">对方</span></div>
              <div class="rp-game-status" id="rp-game-status-text">按骰子开始！</div>
            </div>
            <button id="rp-dice-btn" type="button" title="掷骰子">🎲</button>
            <div id="rp-dice-face"></div>
          </div>
          <div id="rp-game-chat-hint" style="font-size:9.5px;color:rgba(224,64,122,.65);text-align:right;padding:0 14px 1px;flex-shrink:0">点击展开 ↗</div>
          <div id="rp-game-chat"></div>
          <div id="rp-game-input-row">
            <input id="rp-game-input" type="text" placeholder="游戏中聊天..." autocomplete="off"/>
            <button id="rp-game-send" type="button">↑</button>
          </div>
          <div id="rp-game-win" style="display:none">
            <div class="game-win-box">
              <div class="game-win-emoji" id="game-win-emoji">🎉</div>
              <div class="game-win-title" id="game-win-title">恭喜你赢了！</div>
              <div class="game-win-sub" id="game-win-sub">你率先抵达终点，赢得了这场飞行棋！</div>
              <button class="game-win-btn" id="game-restart-btn" type="button">再来一局</button>
            </div>
          </div>
          <!-- API 设置面板 -->
          <div id="rp-api-panel" style="display:none">
            <div id="rp-api-box">
              <div class="rp-api-title">⚡ 回复速度设置</div>
              <div class="rp-api-desc">建议接入 DeepSeek 等国产模型<br>让角色在飞行棋任务中回复更快<br><span style="color:#a855f7;font-weight:600">接入后直接调用真实 API，需自备 Key</span></div>
              <label class="rp-api-opt"><input type="radio" name="rp-api-mode" value="st" id="rp-api-mode-st" checked> 使用当前 API（SillyTavern）</label>
              <label class="rp-api-opt"><input type="radio" name="rp-api-mode" value="custom" id="rp-api-mode-custom"> 接入其他 API</label>
              <div id="rp-api-custom-fields" style="display:none">
                <div class="rp-api-presets">
                  <button class="rp-api-preset-btn" data-url="https://api.deepseek.com/v1" data-model="deepseek-chat">DeepSeek</button>
                  <button class="rp-api-preset-btn" data-url="https://dashscope.aliyuncs.com/compatible-mode/v1" data-model="qwen-turbo">通义</button>
                  <button class="rp-api-preset-btn" data-url="https://open.bigmodel.cn/api/paas/v4" data-model="glm-4-flash">GLM</button>
                  <button class="rp-api-preset-btn" data-url="" data-model="">其他 OpenAI</button>
                </div>
                <input class="rp-api-input" id="rp-api-url" placeholder="API 地址 (如 https://api.deepseek.com/v1)" type="url">
                <input class="rp-api-input" id="rp-api-key" placeholder="API Key" type="password">
                <input class="rp-api-input" id="rp-api-model" placeholder="模型名称 (如 deepseek-chat)">
              </div>
              <div class="rp-api-save-row">
                <button class="rp-api-save-btn" id="rp-api-save">保存</button>
                <button class="rp-api-cancel-btn" id="rp-api-cancel">取消</button>
              </div>
            </div>
          </div>
          <!-- 格子事件弹窗 -->
          <div id="rp-sq-event" style="display:none">
            <div id="rp-sq-event-box">
              <div id="rp-sq-event-sq">第 X 格</div>
              <div id="rp-sq-event-emoji">💬</div>
              <div id="rp-sq-event-text">事件内容</div>
              <div id="rp-sq-event-note">备注</div>
              <button id="rp-sq-event-done" type="button">确认</button>
            </div>
          </div>
          <!-- 任务进行中条 -->
          <div id="rp-sq-task-bar" style="display:none">
            <span id="rp-sq-task-text">💬 任务进行中...</span>
            <button id="rp-sq-task-done-btn" type="button">✅ 已完成</button>
            <div id="rp-sq-task-hint">请在下方对话框内完成指定任务</div>
          </div>
          <!-- 全屏聊天记录 -->
          <div id="rp-game-chat-fs" style="display:none">
            <div id="rp-game-chat-fs-header">
              <span id="rp-game-chat-fs-title">💬 游戏聊天记录</span>
              <button id="rp-game-chat-fs-close" type="button">✕</button>
            </div>
            <div id="rp-game-chat-fs-body"></div>
          </div>
        </div>

        <!-- 来电遮罩 -->
        <div id="rp-call-overlay" style="display:none"></div>

        <!-- 通知横幅 -->
        <div id="rp-notif-banner" style="display:none">
          <div class="rp-nb-ico">💬</div>
          <div class="rp-nb-body">
            <div class="rp-nb-from" id="rp-nb-from"></div>
            <div class="rp-nb-text" id="rp-nb-text"></div>
          </div>
          <div class="rp-nb-time" id="rp-nb-time"></div>
        </div>

        <div id="rp-home-ind" style="display:none"></div>


        <!-- 游戏文件夹弹窗 -->
        <div id="rp-folder-modal" style="display:none">
          <div class="rp-folder-title-lbl">游戏</div>
          <div class="rp-folder-popup">
            <div class="rp-folder-item" data-folder-app="ludo">
              <div class="rp-folder-item-ico rp-folder-game-ludo">
                <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="8" y="8" width="24" height="24" rx="5" stroke-width="2"></rect>
                  <circle cx="15" cy="15" r="2.1" fill="currentColor" stroke="none"></circle>
                  <circle cx="25" cy="15" r="2.1" fill="currentColor" stroke="none"></circle>
                  <circle cx="15" cy="25" r="2.1" fill="currentColor" stroke="none"></circle>
                  <circle cx="25" cy="25" r="2.1" fill="currentColor" stroke="none"></circle>
                </svg>
              </div>
              <div class="rp-folder-item-lbl">飞行棋</div>
            </div>
            <div class="rp-folder-item" data-folder-app="g2048">
              <div class="rp-folder-item-ico rp-folder-game-2048">
                <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="8" y="8" width="24" height="24" rx="5" stroke-width="2"></rect>
                  <line x1="20" y1="12" x2="20" y2="28" stroke-width="1.7"></line>
                  <line x1="12" y1="20" x2="28" y2="20" stroke-width="1.7"></line>
                </svg>
              </div>
              <div class="rp-folder-item-lbl">2048</div>
            </div>
          </div>
        </div>
        <!-- 添加好友弹窗（位于 #rp-screen 内部） -->
        <div id="rp-add-modal" style="display:none">
          <div id="rp-add-form">
            <h3>添加联系人</h3>
            <input type="text" id="rp-add-name" placeholder="姓名" maxlength="30"/>
            <input type="text" id="rp-add-initials" placeholder="缩写 (如: ZS)" maxlength="3"/>
            <div id="rp-add-btns">
              <button id="rp-add-cancel" type="button">取消</button>
              <button id="rp-add-confirm" type="button">添加</button>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</div>
`;

// ================================================================
//  INIT
// ================================================================
async function init() {
  // Hot-reload safety: remove stale phone element & force CSS re-inject
  const stale = document.getElementById('rp-wrapper');
  if (stale) stale.remove();
  const staleFab = document.getElementById('rp-fab');
  if (staleFab) staleFab.remove();
  const staleCSS = document.getElementById('rp-phone-css');
  if (staleCSS) staleCSS.remove();
  window._rpPhoneSheet = false;

  // 清除之前错误版本引入的全局联系人脏数据
  try { localStorage.removeItem('rp-phone-threads-global'); } catch(e) {}

  injectStyles();
  $('body').append(HTML);
  // Defensive: ensure FAB visible after append
  var _f = document.getElementById('rp-fab');
  if (_f) { _f.style.cssText += ';display:flex!important;visibility:visible!important;opacity:1!important'; }

  // 修复：SillyTavern 给 <html> 加了 transform，导致 position:fixed 的包含块变成高度=0的html元素
  // 用 window.innerHeight 直接计算真实视口位置
  (function fixMobileLayout() {
    const frame = document.getElementById('rp-frame');
    var _ph = document.getElementById('rp-phone');
    if (_ph) { IS_TOUCH_DEVICE ? _ph.classList.add('rp-mobile-pos') : _ph.classList.remove('rp-mobile-pos'); }
    if (IS_TOUCH_DEVICE) {
      // ── 手机端(PE) ── (用物理触控判断，与 window.innerWidth 无关)
      // 修复 FAB 位置 (html transform → containing block 高度=0, bottom失效)
      // 手机端 FAB 位置修复（多重保险）
      // screen.width 不受 viewport 初始化时序影响，比 window.innerWidth 更可靠
      function _applyFabPos() {
        if (!IS_TOUCH_DEVICE) return; // 只在真实触控设备上运行
        const _fab = document.getElementById('rp-fab');
        if (!_fab) return;
        const _h = Math.max(_fab.offsetHeight, 32);
        _fab.style.setProperty('top',        (window.innerHeight - 110 - _h) + 'px', 'important');
        _fab.style.setProperty('bottom',     'auto',    'important');
        _fab.style.setProperty('right',      '14px',    'important');
        _fab.style.setProperty('left',       'auto',    'important');
        _fab.style.setProperty('display',    'flex',    'important');
        _fab.style.setProperty('visibility', 'visible', 'important');
      }
      _applyFabPos();
      setTimeout(_applyFabPos, 200);
      setTimeout(_applyFabPos, 800);
      // 强制 frame 尺寸 300×560 (手机端专用)
      if (frame) {
        frame.style.setProperty('width', '300px', 'important');
        frame.style.setProperty('height', '560px', 'important');
        frame.style.setProperty('border-radius', '38px', 'important');
      }
    } else {
      // ── PC端 ──
      // 清除任何可能残留的手机端内联样式，让 CSS 默认 286×580 生效
      if (frame) {
        frame.style.removeProperty('width');
        frame.style.removeProperty('height');
        frame.style.removeProperty('border-radius');
      }
    }
  })();
  setTimeout(lgInitFabDrag, 100);
  if (!document.getElementById('rp-live-chat')) {
    $('body').append('<div id="rp-live-chat"></div>');
  }

  // FIX2: 记录初始 chatId 并从 localStorage 恢复状态
  const ctx = getContext();
  STATE.chatId = ctx?.chatId || (ctx?.characterId != null ? `char_${ctx?.characterId}` : 'default');

  const saved = loadState(STATE.chatId);
  if (saved) {
    STATE.threads = saved.threads || {};
    STATE.notifications = saved.notifications || [];
    STATE.sync = saved.sync || { stage: 1, progress: 0, status: '乖巧' };
    STATE.moments = saved.moments || [];
    STATE.avatars = saved.avatars || {};
    STATE.darkMode = saved.darkMode || false;
    console.log('[Raymond Phone] 已恢复历史状态 chatId:', STATE.chatId);
  }
  // 合并全局头像（优先级最高，覆盖 chatId 绑定的旧头像）
  mergeGlobalAvatars();
  // 同步到 _AV 和 window._rpAV
  Object.assign(_AV, STATE.avatars || {});
  window._rpAV = Object.assign(window._rpAV || {}, STATE.avatars || {});
  console.log('[Phone:av] init avatars:', Object.keys(window._rpAV || {}));
  // 立即同步清理无效联系人（不等延迟，防止用户看到 SillyTavern）
  cleanInvalidContacts();

  if (STATE.darkMode) { $('#rp-phone').addClass('rp-dark'); $('.rp-dm-ico').text('☀️'); $('#rp-dm-lbl').text('日间'); }
  lgInitTheme();

  updateClock();
  setInterval(updateClock, 1000);

  // 扩展初始化/热重载时清空指纹，防止旧指纹导致第一条新消息被 skip
  STATE._lastAiFingerprint = null;
  bindUI();
  makeDraggable();
  renderThreadList();
  refreshWidget();
  refreshLockNotifs();

  // 监听 AI 消息：不同 ST 版本事件名可能不同，做多事件兜底
  if (eventSource && event_types) {
    const aiEvtKeys = ['MESSAGE_RECEIVED', 'GENERATION_ENDED', 'MESSAGE_SWIPED'];
    aiEvtKeys.forEach(k => {
      const ev = event_types[k];
      if (ev) {
        try { eventSource.on(ev, onAIMessage); } catch(e) {}
      }
    });
  }
  // FIX2: 监听聊天窗口切换
  if (eventSource && event_types) eventSource.on(event_types.CHAT_CHANGED, onChatChanged);

  // 终极兜底：事件没触发时，轮询最后一条 AI 消息指纹
  try {
    if (window.__rpPhonePoller) clearInterval(window.__rpPhonePoller);
    window.__rpPhonePoller = setInterval(() => {
      try {
        const ctx = getContext();
        const chat = ctx?.chat;
        if (!chat?.length) return;
        const last = [...chat].reverse().find(m => !m.is_user);
        if (!last?.mes) return;
        const fp = `${ctx?.chatId || ''}|${last.mes.length}|${last.mes.slice(0, 24)}|${last.mes.slice(-24)}`;
        if (fp === STATE._lastAiFingerprint) return;
        // 不在这里写指纹，让 onAIMessage 内部统一管理
        onAIMessage();
      } catch(e) {}
    }, 1200);
  } catch(e) {}

  go('lock'); // Explicitly reset to lock screen on every init/reload
  console.log('[Raymond Phone] ✅ loaded');

  // 延迟：等 ctx 稳定后添加当前 char 联系人 + 清理 DOM
  setTimeout(function() {
    try {
      // autoAddCharContact 内有 !ctx.chatId 守卫，主页无 char 时不执行
      autoAddCharContact();
      hidePhoneTagsInChat();
    } catch(e) {}
  }, 800);
}

// ================================================================
//  FIX2: 聊天切换 - 保存/恢复各窗口的手机状态
// ================================================================
function onChatChanged() {
  const ctx = getContext();
  const newChatId = ctx?.chatId || (ctx?.characterId != null ? `char_${ctx?.characterId}` : 'default');

  if (newChatId === STATE.chatId) return;

  // 保存当前窗口状态（内存 + localStorage）
  if (STATE.chatId) {
    CHAT_STORE[STATE.chatId] = {
      threads: JSON.parse(JSON.stringify(STATE.threads)),
      notifications: [...STATE.notifications],
      sync: { ...STATE.sync },
      currentThread: STATE.currentThread,
      moments: JSON.parse(JSON.stringify(STATE.moments || [])),
      diary:   JSON.parse(JSON.stringify(STATE.diary   || [])),
      avatars: Object.assign({}, STATE.avatars || {}),
    };
    saveState();
  }

  // 切换到新窗口
  STATE.chatId = newChatId;
  STATE.pendingMessages = [];

  // 优先从内存缓存恢复，其次从 localStorage，最后初始化
  if (CHAT_STORE[newChatId]) {
    const s = CHAT_STORE[newChatId];
    STATE.threads = s.threads || {};
    STATE.notifications = s.notifications;
    STATE.sync = { ...s.sync };
    STATE.moments = JSON.parse(JSON.stringify(s.moments || []));
    STATE.diary   = JSON.parse(JSON.stringify(s.diary   || []));
    STATE.avatars = Object.assign({}, s.avatars || {});
    STATE.currentThread = s.currentThread;
  } else {
    const persisted = loadState(newChatId);
    if (persisted) {
      STATE.threads = persisted.threads || {};
      STATE.notifications = persisted.notifications || [];
      STATE.sync = persisted.sync || { stage: 1, progress: 0, status: '乖巧' };
      STATE.moments = persisted.moments || [];
  STATE.diary = persisted.diary || [];
      STATE.avatars = persisted.avatars || {};
      STATE.currentThread = null;
    } else {
      STATE.threads = DEFAULT_THREADS();
      STATE.notifications = [];
      STATE.sync = { stage: 1, progress: 0, status: '乖巧' };
      STATE.moments = [];
      STATE.diary   = [];
      STATE.avatars = {};
      STATE.currentThread = null;
    }
  }
  mergeGlobalAvatars();

  // 重置 UI（加载新状态后立即同步清理无效联系人）
  cleanInvalidContacts();
  go('lock');
  renderThreadList();
  refreshBadges();
  refreshWidget();
  refreshLockNotifs();
  renderPendingQueue();

  // 延迟执行：等 ctx.name2 稳定后再添加联系人
  // 记录当前 chatId，防止用户快速切换导致竞态
  var _expectedChatId = STATE.chatId;
  setTimeout(function() {
    try {
      // 守卫：如果已经切到别的窗口，终止
      if (STATE.chatId !== _expectedChatId) return;
      cleanInvalidContacts();
      autoAddCharContact();
      hidePhoneTagsInChat();
      rebuildContactsFromHistory(_expectedChatId);
    } catch(e) { console.warn('[Phone] onChatChanged delayed error', e); }
  }, 600);
}

// ================================================================
//  CLOCK
// ================================================================
function updateClock() {
  const now  = new Date();
  const h    = String(now.getHours()).padStart(2, '0');
  const m    = String(now.getMinutes()).padStart(2, '0');
  const t    = `${h}:${m}`;
  const days = ['周日','周一','周二','周三','周四','周五','周六'];
  const d    = `${days[now.getDay()]}  ${now.getMonth()+1}月${now.getDate()}日`;

  $('#rp-sbar-time, #rp-lock-time, #rp-home-clock').text(t);
  $('#rp-lock-date, #rp-home-date').text(d);
}

// ================================================================
//  UI BINDING
// ================================================================
function bindUI() {
  // 来电：接听 / 拒绝（事件委托）
  $(document).on('click', '#rp-call-ans', () => resolveCall('answered'));
  $(document).on('click', '#rp-call-dec', () => resolveCall('declined'));

  $('#rp-fab').on('click', (e) => {
    e.stopPropagation();
    const phone = $('#rp-phone');
    if (phone.is(':visible')) { phone.hide(); return; } // 已打开 → 点球关闭
    // 防御性同步：若 CHAT_CHANGED 未触发（用户直接切换了对话），此处补偿
    syncToCurrentChat();
    // 从聊天历史重建联系人（服务端数据，PC/手机共享同一份聊天记录）
    var _fabChatId = STATE.chatId;
    setTimeout(function() { rebuildContactsFromHistory(_fabChatId); }, 300);
    // 重置到 lock 屏（无论上次停在哪个页面）
    go('lock');
    phone.show();
    // 手机端: 修正 phone 面板位置（html有transform时 50%失效，用实际尺寸计算）
    if (IS_TOUCH_DEVICE) {
      setTimeout(() => {
        // 先强制 frame 尺寸，再测量居中（确保 offsetWidth/Height 正确）
        const frame = document.getElementById('rp-frame');
        if (frame) {
          frame.style.setProperty('width', '300px', 'important');
          frame.style.setProperty('height', '560px', 'important');
          frame.style.setProperty('border-radius', '38px', 'important');
        }
        const ph = phone[0].offsetHeight || 500;
        const pw = phone[0].offsetWidth || 270;
        const t = Math.max(10, (window.innerHeight - ph) / 2);
        const l = Math.max(0, (window.innerWidth - pw) / 2);
        phone[0].style.setProperty('top', t + 'px', 'important');
        phone[0].style.setProperty('left', l + 'px', 'important');
        phone[0].style.setProperty('right', 'auto', 'important');
        phone[0].style.setProperty('bottom', 'auto', 'important');
      }, 0);
    }
  });

  // Click outside phone → close
  $(document).on('click', (e) => {
    const phone = $('#rp-phone');
    if (!phone.is(':visible')) return;
    // 若有任何模态/浮层打开，跳过关闭判断（防止 grp-cancel/confirm 误触）
    if ($('#rp-add-choice, #rp-grp-create, #rp-del-picker, #rp-add-modal:visible, #rp-compose-modal:visible').length) return;
    // 若 e.target 已被从 DOM 移除（事件传播期间被删），跳过
    if (!document.contains(e.target)) return;
    if (!$(e.target).closest('#rp-phone, #rp-fab').length) {
      phone.hide();
    }
  });

  $('#rp-swipe-zone, #rp-lock-time, #rp-lock-date').on('click', () => go('home'));

  $(document).on('click', '.rp-app[data-app]', function () {
    const app = $(this).data('app');
    if (app === 'settings') { openSettings(); return; }
    go(app);
  });

  $(document).on('click', '.rp-thread[data-thread]', function () {
    openThread($(this).data('thread'));
  });

  $(document).on('click', '.rp-back[data-to]', function () {
    go($(this).data('to'));
  });

  // FIX3: 发送按钮 → 统一发出所有排队消息
  $('#rp-send').on('click', sendSMS);

  // FIX3: 回车键 → 暂存到队列，不立即发送
  $('#rp-input').on('keydown', e => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      addToQueue();
    }
  });

  $('#rp-add-btn').on('click', (e) => {
    e.stopPropagation();
    showAddChoice();
  });

  // Attach panel (event delegation - button lives inside dynamically built HTML)
  $(document).on('click', '#rp-attach-btn', (e) => {
    e.stopPropagation();
    toggleAttachPanel();
  });
  $(document).on('click', (e) => {
    if (!$(e.target).closest('#rp-attach-panel, #rp-attach-btn').length) {
      $('#rp-attach-panel').hide();
    }
  });

  $('#rp-add-cancel').on('click', () => {
    $('#rp-add-modal').hide();
  });

  $('#rp-add-confirm').on('click', addContact);

  $('#rp-add-modal').on('click', function (e) {
    if (e.target === this) $(this).hide();
  });


  // ── Games Folder ─────────────────────────────────────────────
  $(document).on('click', '[data-app="folder-games"]', function(e) {
    e.stopPropagation();
    $('#rp-folder-modal').show();
  });
  $(document).on('click', '#rp-folder-modal', function(e) {
    if (e.target === this) {
      $(this).hide();
      go('home');
    }
  });
  $(document).on('click', '[data-folder-app]', function(e) {
    e.stopPropagation();
    const app = $(this).data('folder-app');
    $('#rp-folder-modal').hide();
    if (app === 'ludo') {
      go('game');
      try { if (!LG || !LG.active) lgInit(); else lgRender(); } catch(ex) { console.warn('[Folder]', ex); }
    } else if (app === 'g2048') {
      go('g2048');
      try { if (!LG2048 || !LG2048.active) g2048Init(); } catch(ex) { console.warn('[Folder]', ex); }
    }
  });
  // ── Ludo game ────────────────────────────────────────────────
  $(document).on('click', '[data-app="ludo"]', function(e) {
    e.stopPropagation();
    if (!LG.active) lgInit();
    else lgRender();
    go('game');
  });

  // ── API 面板事件 ──
  // ── API Settings VIEW (首页入口) ──
  // ── Diary app ──
  $(document).on('click', '[data-app="diary"]', function() {
    STATE.diary = STATE.diary || [];
    mergeGlobalAvatars();
    renderDiary();
    go('diary');
  });
  $(document).on('click', '#rp-gen-diary', generateAIDiary);
  $(document).on('click', '#rp-diary-send', postUserDiary);
  $(document).on('keydown', '#rp-diary-input', function(e) {
    if (e.key === 'Enter' && e.ctrlKey) { e.preventDefault(); postUserDiary(); }
  });

  $(document).on('click', '#rp-xhs-refresh', function() {
    renderXHSFeed(true);
  });

  // 小红书 - 点击卡片进详情
  $(document).on('click', '.rp-xhs-card', function() {
    const postId = $(this).data('xhsid');
    if (postId) openXHSDetail(postId);
  });

  // 小红书 - 发帖按钮
  $(document).on('click', '#rp-xhs-compose', function() {
    STATE.xhsSelectedTag = '日常';
    $('.rp-xhs-tag-btn').removeClass('rp-xhs-tag-selected');
    go('xhs-compose');
  });

  // 小红书 - 标签选择
  $(document).on('click', '.rp-xhs-tag-btn', function() {
    $('.rp-xhs-tag-btn').removeClass('rp-xhs-tag-selected');
    $(this).addClass('rp-xhs-tag-selected');
    STATE.xhsSelectedTag = $(this).data('tag');
  });

  // 小红书 - 发布帖子
  $(document).on('click', '#rp-xhs-post-btn', function() {
    postUserXHS();
  });

  // 小红书 - 详情页点赞
  $(document).on('click', '#rp-xhs-like-btn', function() {
    const postId = $(this).data('postid') || STATE.xhsCurrentPost;
    if (postId) toggleXHSLike(postId);
  });

  // 小红书 - 详情页发评论
  $(document).on('click', '#rp-xhs-detail-send', function() {
    const text = $('#rp-xhs-detail-input').val().trim();
    if (!text || !STATE.xhsCurrentPost) return;
    sendXHSComment(STATE.xhsCurrentPost, text, STATE.xhsReplyToCidx ?? null);
  });
  $(document).on('keydown', '#rp-xhs-detail-input', function(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      const text = $(this).val().trim();
      if (!text || !STATE.xhsCurrentPost) return;
      sendXHSComment(STATE.xhsCurrentPost, text, STATE.xhsReplyToCidx ?? null);
    }
    // auto-resize textarea
    this.style.height = 'auto';
    this.style.height = Math.min(this.scrollHeight, 72) + 'px';
  });
  // auto-resize on input too
  $(document).on('input', '#rp-xhs-detail-input', function() {
    this.style.height = 'auto';
    this.style.height = Math.min(this.scrollHeight, 72) + 'px';
  });

  // 小红书 - 点击评论中的"回复"
  $(document).on('click', '[data-reply-cidx]', function() {
    const cidx = parseInt($(this).data('reply-cidx'));
    const uname = $(this).data('reply-uname');
    STATE.xhsReplyToCidx = cidx;
    $('#rp-xhs-detail-input').val('').attr('placeholder', `回复 @${uname}…`).focus();
  });

  $(document).on('click', '[data-app="api-settings"]', function() {
    lgFillAPIView();
    go('api-settings');
  });
  $(document).on('change', 'input[name="rp-api-mode-v"]', function() {
    if ($(this).val() === 'custom') $('#rp-api-custom-fields-v').css('display','flex');
    else $('#rp-api-custom-fields-v').hide();
  });
  $(document).on('click', '#rp-api-test-v', function() {
    var $btn = $(this);
    var mode = $('input[name="rp-api-mode-v"]:checked').val();
    if (mode !== 'custom') { $btn.text('⚠️ 请先选择「接入其他 API」'); setTimeout(function(){ $btn.text('📡 测试连通性'); }, 2500); return; }
    var url  = ($('#rp-api-url-v').val() || '').trim().replace(/\/+$/, '');
    var key  = ($('#rp-api-key-v').val() || '').trim();
    var model= ($('#rp-api-model-v').val() || 'gpt-3.5-turbo').trim();
    if (!url || !key) { $btn.text('⚠️ 请先填写URL和Key'); setTimeout(function(){ $btn.text('📡 测试连通性'); }, 2500); return; }
    $btn.addClass('testing').text('连接中…');
    var t0 = Date.now();
    fetch(url + '/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + key },
      body: JSON.stringify({ model: model, messages: [{ role: 'user', content: 'hi' }], max_tokens: 5 }),
      signal: AbortSignal.timeout(8000)
    }).then(function(r) {
      return r.json().then(function(d) {
        var ms = Date.now() - t0;
        var m = (d.model || model).replace(/^.+\//, '');
        $btn.removeClass('testing').addClass('ok').text('✅ ' + m + ' ' + ms + 'ms');
        setTimeout(function(){ $btn.removeClass('ok').text('📡 测试连通性'); }, 8000);
      });
    }).catch(function(e) {
      $btn.removeClass('testing').addClass('fail').text('❌ ' + (e.message || '连接失败').substring(0, 20));
      setTimeout(function(){ $btn.removeClass('fail').text('📡 测试连通性'); }, 8000);
    });
  });

  $(document).on('click', '#rp-api-save-v', function() {
    const mode = $('input[name="rp-api-mode-v"]:checked').val() || 'st';
    const cfg = { mode };
    if (mode === 'custom') {
      cfg.url   = $('#rp-api-url-v').val().trim();
      cfg.key   = $('#rp-api-key-v').val().trim();
      cfg.model = $('#rp-api-model-v').val().trim() || 'deepseek-chat';
      if (!cfg.url || !cfg.key) {
        $('#rp-api-status-v').text('⚠️ 请填写 API 地址和 Key');
        return;
      }
    }
    localStorage.setItem('rp_ludo_api', JSON.stringify(cfg));
    // 保存成功 toast
    const $btn = $('#rp-api-save-v');
    const origText = $btn.text();
    $btn.text('✓ 保存成功').css('background','linear-gradient(135deg,#34d399,#059669)');
    setTimeout(() => {
      $btn.text(origText).css('background','linear-gradient(135deg,#f472b6,#a855f7)');
      go('home');
    }, 1400);
  });

  $(document).on('click', '#rp-api-btn', function() {
    const cfg = (() => { try { return JSON.parse(localStorage.getItem('rp_ludo_api') || '{}'); } catch(e) { return {}; } })();
    if (cfg.mode === 'custom') {
      $('#rp-api-mode-custom').prop('checked', true);
      $('#rp-api-url').val(cfg.url || '');
      $('#rp-api-key').val(cfg.key || '');
      $('#rp-api-model').val(cfg.model || '');
      $('#rp-api-custom-fields').show();
    } else {
      $('#rp-api-mode-st').prop('checked', true);
      $('#rp-api-custom-fields').hide();
    }
    $('#rp-api-panel').show();
  });
  $(document).on('change', 'input[name="rp-api-mode"]', function() {
    if ($(this).val() === 'custom') $('#rp-api-custom-fields').show();
    else $('#rp-api-custom-fields').hide();
  });
  $(document).on('click', '.rp-api-preset-btn', function(e) {
    e.preventDefault();
    const url   = $(this).data('url');
    const model = $(this).data('model');
    // In-game panel inputs
    $('#rp-api-url').val(url);
    $('#rp-api-model').val(model);
    if (!url) { $('#rp-api-url').focus(); } else { $('#rp-api-key').val('').focus(); }
    // View inputs
    $('#rp-api-url-v').val(url);
    $('#rp-api-model-v').val(model);
    if (!url) { $('#rp-api-url-v').focus(); } else { $('#rp-api-key-v').val('').focus(); }
  });
  $(document).on('click', '#rp-api-save', function() {
    const mode = $('input[name="rp-api-mode"]:checked').val() || 'st';
    const cfg = { mode };
    if (mode === 'custom') {
      cfg.url   = $('#rp-api-url').val().trim();
      cfg.key   = $('#rp-api-key').val().trim();
      cfg.model = $('#rp-api-model').val().trim() || 'deepseek-chat';
    }
    localStorage.setItem('rp_ludo_api', JSON.stringify(cfg));
    $('#rp-api-panel').hide();
    lgMsg('sys', mode === 'custom'
      ? `⚡ 已切换到 ${cfg.model}（自定义 API）`
      : '⚡ 已切换回 SillyTavern API');
  });
  $(document).on('click', '#rp-api-cancel', function() {
    $('#rp-api-panel').hide();
  });

  // 获取模型列表
  $(document).on('click', '#rp-api-fetch-models', async function() {
    const url   = $('#rp-api-url-v').val().trim();
    const key   = $('#rp-api-key-v').val().trim();
    const $btn  = $(this);
    const $list = $('#rp-model-list');
    if (!url || !key) {
      $('#rp-api-status-v').text('请先填写 API 地址和 Key');
      return;
    }
    $btn.text('获取中…').prop('disabled', true);
    $list.hide().empty();
    try {
      const res  = await fetch(`${url.replace(/\/+$/, '')}/models`, {
        headers: { 'Authorization': `Bearer ${key}` }
      });
      const data = await res.json();
      const models = (data.data || data.models || []).map(m => typeof m === 'string' ? m : (m.id || m.name || '')).filter(Boolean);
      if (models.length === 0) { $('#rp-api-status-v').text('未获取到模型，请检查 URL/Key'); }
      else {
        models.forEach(m => {
          $list.append(`<div class="rp-model-item" data-model="${m}" style="padding:8px 12px;font-size:12px;color:#2d1060;cursor:pointer;border-bottom:1px solid rgba(168,85,247,.08)">${m}</div>`);
        });
        $list.show();
        $('#rp-api-status-v').text(`找到 ${models.length} 个模型，点击选择`);
      }
    } catch(e) {
      $('#rp-api-status-v').text('请求失败：' + e.message);
    }
    $btn.text('获取模型').prop('disabled', false);
  });
  $(document).on('click', '.rp-model-item', function() {
    $('#rp-api-model-v').val($(this).data('model'));
    $('#rp-model-list').hide();
    $('#rp-api-status-v').text('已选择：' + $(this).data('model'));
  });

  // 主题切换
  $(document).on('click', '.rp-theme-card[data-tid]', function(e) {
    e.stopPropagation();
    lgApplyTheme($(this).data('tid'));
    lgRenderThemePicker();
  });

  $(document).on('click', '#rp-dice-btn', function() {
    if (LG.turn === 'user' && !LG.rolling && LG.active) lgUserRoll();
  });

  $(document).on('click', '#rp-game-send', function() {
    const t = $('#rp-game-input').val().trim();
    if (t) { lgGameChat(t); $('#rp-game-input').val(''); }
  });

  $(document).on('keydown', '#rp-game-input', function(e) {
    if (e.key === 'Enter') {
      const t = $(this).val().trim();
      if (t) { lgGameChat(t); $(this).val(''); }
    }
  });

  // ── 2048 event handlers ──────────────────────────────────────
  $(document).on('click', '[data-app="g2048"]', function() {
    go('g2048');
  });
  $(document).on('click', '#g2048-newbtn,#g2048-restart', function() {
    $('#g2048-over').hide();
    g2048Init();
  });
  $(document).on('click', '#g2048-continue', function() {
    $('#g2048-over').hide();
    LG2048.active = true;
    LG2048.processing = false;
    LG2048.turn = 'user';
    LG2048.commentCount = 0;
    g2048Render();
    g2048Msg('sys', '继续挑战！目标：4096！');
  });
  $(document).on('click', '#g2048-quit', function() {
    $('#g2048-over').hide();
    LG2048.active = false;
    go('home');
  });
  $(document).on('click', '#g2048-chat', function() {
    var body = document.getElementById('g2048-chat-fs-body');
    if (!body) return;
    body.innerHTML = document.getElementById('g2048-chat').innerHTML;
    body.scrollTop = body.scrollHeight;
    $('#g2048-chat-fs').css('display','flex');
  });
  $(document).on('click', '#g2048-chat-hint', function() {
    $('#g2048-chat').trigger('click');
  });
  $(document).on('click', '#g2048-chat-fs-close', function() {
    $('#g2048-chat-fs').hide();
  });
  $(document).on('click', '.g2048-dir', function() {
    if (!LG2048.active || LG2048.processing || LG2048.turn !== 'user') return;
    g2048UserMove($(this).data('dir'));
  });
  $(document).on('click', '#g2048-send', function() {
    var t = $('#g2048-input').val().trim();
    if (t) { g2048Chat(t); $('#g2048-input').val(''); }
  });
  $(document).on('keydown', '#g2048-input', function(e) {
    if (e.key === 'Enter') { var t = $(this).val().trim(); if (t) { g2048Chat(t); $(this).val(''); } }
  });
  $(document).on('keydown', function(e) {
    if (!$('#rp-view-g2048').is(':visible')) return;
    var m = { ArrowLeft:'left', ArrowRight:'right', ArrowUp:'up', ArrowDown:'down' };
    var d = m[e.key];
    if (d) {
      e.preventDefault();
      e.stopImmediatePropagation();
      if (LG2048.active && LG2048.turn === 'user' && !LG2048.processing) g2048UserMove(d);
    }
  });
  $(document).on('click', '#game-restart-btn', function() {
    lgInit();
  });

  // ── 全屏查看聊天记录 ─────────────────────────────────────────
  $(document).on('click', '#rp-game-chat-hint', function() {
    $('#rp-game-chat').trigger('click');
  });

  $(document).on('click', '#rp-game-chat', function() {
    const body = document.getElementById('rp-game-chat-fs-body');
    if (!body) return;
    body.innerHTML = document.getElementById('rp-game-chat').innerHTML;
    jQuery('#rp-game-chat-fs').show();
    body.scrollTop = body.scrollHeight;

    // Bind close button directly (not via delegation)
    jQuery('#rp-game-chat-fs-close').off('click').on('click', function(e) {
      e.stopPropagation();
      e.preventDefault();
      jQuery('#rp-game-chat-fs').hide();
      console.log('[Ludo] Fullscreen closed');
    });
  });

  // ─────────────────────────────────────────────────────────────



  // Settings: avatar select change
  $(document).on('change', '#rp-avatar-select', function() {
    updateAvatarPreviewSwatch($(this).val());
  });

  $(document).on('click', '#rp-avatar-upload-btn', function(e) {
    e.preventDefault();
    e.stopPropagation();
    $('#rp-avatar-file-input').val('').trigger('click');
  });

  // Settings: file input change - read image, resize to max 200px, then store
  $(document).on('change', '#rp-avatar-file-input', function(e) {
    console.log('[Phone:av] file input change fired');
    const file = e.target.files && e.target.files[0];
    if (!file) { console.log('[Phone:av] no file'); return; }
    console.log('[Phone:av] file:', file.name, file.size, 'who:', $('#rp-avatar-select').val());
    const who = $('#rp-avatar-select').val();
    const reader = new FileReader();
    reader.onerror = function(err) { console.error('[Phone:av] FileReader error:', err); };
    reader.onload = function(ev) {
      console.log('[Phone:av] FileReader loaded, dataURL len:', ev.target.result && ev.target.result.length);
      // Resize to max 200x200 to avoid localStorage quota issues
      const img = new Image();
      img.onerror = function(err) { console.error('[Phone:av] Image load error:', err); };
      img.onload = function() {
        console.log('[Phone:av] Image loaded:', img.width, 'x', img.height);
        try {
          const MAX = 200;
          const scale = Math.min(1, MAX / Math.max(img.width, img.height));
          const w = Math.round(img.width * scale);
          const h = Math.round(img.height * scale);
          const canvas = document.createElement('canvas');
          canvas.width = w; canvas.height = h;
          canvas.getContext('2d').drawImage(img, 0, 0, w, h);
          const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
          console.log('[Phone:av] canvas resized to:', w, 'x', h, 'dataUrl len:', dataUrl.length);
          STATE.avatars = STATE.avatars || {};
          STATE.avatars[who] = dataUrl;
          setAvatar(who, dataUrl);
          saveGlobalAvatars();
          updateAvatarPreviewSwatch(who);
          renderMoments();
          renderThreadList();
          renderDiary();
          if (STATE.currentView === 'thread' && STATE.currentThread) {
            openThread(STATE.currentThread);
          }
        } catch(canvasErr) {
          console.error('[Phone:av] canvas error:', canvasErr);
          // Fallback: save original dataURL directly
          STATE.avatars = STATE.avatars || {};
          STATE.avatars[who] = ev.target.result;
          setAvatar(who, ev.target.result);
          saveGlobalAvatars();
          updateAvatarPreviewSwatch(who);
          renderMoments(); renderThreadList(); renderDiary();
        }
      };
      img.src = ev.target.result;
    };
    reader.readAsDataURL(file);
    // Reset input so same file can be selected again
    $(this).val('');
  });

  // Settings app - go to settings view (override data-app handler)
  $(document).on('click', '[data-app="settings"]', function(e) {
    e.stopPropagation();
    openSettings();
  });

  // Compose moment
  $(document).on('click', '#rp-moments-add', openCompose);
  // AI generate moments
  $(document).on('click', '#rp-gen-moments', generateAIMoments);
  $(document).on('click', '#rp-compose-cancel, #rp-compose-modal .rp-back', closeCompose);
  $(document).on('click', '#rp-compose-post', postUserMoment);

  // 来电：接听 / 拒绝（事件委托）
  $(document).on('click', '#rp-call-ans', () => resolveCall('answered'));
  $(document).on('click', '#rp-call-dec', () => resolveCall('declined'));

  // Dark mode is handled via data-app='darkmode' in the app grid

  // Moments: like
  $(document).on('click', '.rp-like-btn', function(e) {
    e.stopPropagation();
    toggleLike($(this).data('moment'));
  });

  // Moments: comment toggle
  $(document).on('click', '.rp-comment-toggle', function(e) {
    e.stopPropagation();
    const id = $(this).data('moment');
    const row = $(`#rp-ci-${id}`);
    row.toggle();
    if (row.is(':visible')) {
      row.find('.rp-moment-cinput').removeData('reply-to').attr('placeholder','发表评论…').focus();
    }
  });

  // Moments: reply
  $(document).on('click', '.rp-moment-reply-btn', function(e) {
    e.stopPropagation();
    const momentId = $(this).data('moment');
    const rname = $(this).data('rname');
    const row = $(`#rp-ci-${momentId}`);
    row.show();
    row.find('.rp-moment-cinput').data('reply-to', rname).attr('placeholder', `回复 ${rname}…`).focus();
  });

  // Moments: send comment via button
  $(document).on('click', '.rp-moment-csend', function(e) {
    e.stopPropagation();
    const momentId = $(this).data('moment');
    const row = $(`#rp-ci-${momentId}`);
    const input = row.find('.rp-moment-cinput');
    const text = input.val().trim();
    const replyTo = input.data('reply-to') || null;
    if (!text) return;
    sendMomentComment(momentId, text, replyTo);
    input.val('').removeData('reply-to').attr('placeholder','发表评论…');
    row.hide();
  });

  // Moments: send comment via enter
  $(document).on('keydown', '.rp-moment-cinput', function(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      const momentId = $(this).closest('.rp-moment').data('mid');
      const text = $(this).val().trim();
      const replyTo = $(this).data('reply-to') || null;
      if (!text) return;
      sendMomentComment(momentId, text, replyTo);
      $(this).val('').removeData('reply-to').attr('placeholder','发表评论…');
      $(`#rp-ci-${momentId}`).hide();
    }
  });


  // ── 添加联系人 / 创建群聊 choice overlay (event delegation) ──
  $(document).on('click', '#rp-add-choice .rp-add-choice-item', function(e) {
    e.stopPropagation();
    const action = $(this).data('action');
    $('#rp-add-choice').remove();
    if (action === 'contact') {
      $('#rp-add-name').val('');
      $('#rp-add-initials').val('');
      $('#rp-add-modal').show();
    } else if (action === 'group') {
      showGroupPicker();
    } else if (action === 'delete') {
      showDeletePicker();
    }
  });
  $(document).on('click', '#rp-add-choice .rp-add-choice-cancel', (e) => {
    e.stopPropagation();
    $('#rp-add-choice').remove();
  });
  $(document).on('click', '#rp-add-choice', function(e) {
    if (e.target === this) $('#rp-add-choice').remove();
  });

  // ── Delete picker: toggle + confirm ──
  $(document).on('click', '#rp-del-list .rp-del-pick-item', function(e) {
    e.stopPropagation();
    $(this).toggleClass('rp-del-selected');
    const selected = $('#rp-del-list .rp-del-pick-item.rp-del-selected').length;
    $('#rp-del-confirm').text(selected > 0 ? `删除(${selected})` : '删除');
  });
  $(document).on('click', '#rp-del-confirm', function(e) {
    e.stopPropagation();
    const toDelete = [];
    $('#rp-del-list .rp-del-pick-item.rp-del-selected').each(function() {
      toDelete.push($(this).data('tid'));
    });
    toDelete.forEach(function(tid) { delete STATE.threads[tid]; });
    if (STATE.currentThread && toDelete.includes(STATE.currentThread)) STATE.currentThread = null;
    $('#rp-del-picker').remove();
    renderThreadList();
    saveState();
  });
  $(document).on('click', '#rp-del-cancel', function(e) {
    e.stopPropagation();
    $('#rp-del-picker').remove();
  });

  // ── Group picker: toggle selection ──
  $(document).on('click', '#rp-grp-pick-list .rp-grp-pick-item', function(e) {
    e.stopPropagation();
    $(this).toggleClass('selected');
  });
  $(document).on('click', '[data-action="grp-cancel"]', (e) => { e.stopPropagation(); $('#rp-grp-create').remove(); });
  $(document).on('click', '[data-action="grp-confirm"]', (e) => { e.stopPropagation(); confirmCreateGroup(); });
  $(document).on('click', '#rp-grp-create', function(e) {
    e.stopPropagation();
    if (e.target === this) $(this).remove();
  });

  // ── Wallpaper upload / reset ──
  $(document).on('click', '#rp-wall-upload', () => $('#rp-wall-file').trigger('click'));
  $(document).on('change', '#rp-wall-file', function() {
    const file = this.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      STATE.wallpaper = e.target.result;
      saveState();
      applyWallpaper();
    };
    reader.readAsDataURL(file);
    this.value = '';
  });
  $(document).on('click', '#rp-wall-reset', () => {
    STATE.wallpaper = null;
    saveState();
    applyWallpaper();
  });

}

// ================================================================
//  FIX3: 消息队列
// ================================================================
function addToQueue() {
  const text = $('#rp-input').val().trim();
  if (!text || !STATE.currentThread) return;
  STATE.pendingMessages.push(text);
  $('#rp-input').val('');
  renderPendingQueue();
}

function renderPendingQueue() {
  const container = $('#rp-pending-queue');
  container.empty();
  if (STATE.pendingMessages.length === 0) {
    container.hide();
    return;
  }
  container.show();
  STATE.pendingMessages.forEach((msg) => {
    const short = msg.length > 30 ? msg.slice(0, 30) + '…' : msg;
    container.append(`<div class="rp-pending-item">${short}</div>`);
  });
  container.append(`<div class="rp-pending-hint">点击 ↑ 发送全部 ${STATE.pendingMessages.length} 条</div>`);
}

// ================================================================
//  ADD CONTACT
// ================================================================
function generateAvatarBg() {
  const colors = [
    ['#2e1c1c','#4e2c2c'],
    ['#1c2e2e','#2c4e4e'],
    ['#2e2e1c','#4e4e2c'],
    ['#1c1c2e','#2c2c4e'],
    ['#2e1c2e','#4e2c4e'],
    ['#1c2e1c','#2c4a2c'],
    ['#2e251c','#4e3c2c'],
    ['#1c252e','#2c3c4e'],
  ];
  const pair = colors[Math.floor(Math.random() * colors.length)];
  return `linear-gradient(145deg,${pair[0]},${pair[1]})`;
}

function addContact() {
  const name = $('#rp-add-name').val().trim();
  let initials = $('#rp-add-initials').val().trim().toUpperCase();

  if (!name) return;

  if (!initials) {
    initials = name.split(/\s+/).map(w => w[0]).join('').slice(0, 2).toUpperCase();
  }
  if (!initials) initials = name.slice(0, 2).toUpperCase();

  const id = 'custom_' + Date.now();

  STATE.threads[id] = {
    id: id,
    name: name,
    initials: initials,
    avatarBg: generateAvatarBg(),
    messages: [],
    unread: 0
  };

  $('#rp-add-modal').hide();
  renderThreadList();
  saveState(); // FIX2: 持久化新联系人

  console.log(`[Raymond Phone] 添加联系人: ${name} (${id})`);
}

// ================================================================
//  RENDER THREAD LIST
// ================================================================
function renderThreadList() {
  const container = $('#rp-thread-list').empty();

  Object.values(STATE.threads).forEach(th => {
    const lastMsg = th.messages.at(-1);
    const senderLabel = lastMsg ? (lastMsg.from === 'user' ? '我' : th.name.split(' ')[0]) : '';
    const previewFull = lastMsg ? (senderLabel + '：' + lastMsg.text) : '暂无消息';
    const preview = previewFull.length > 28 ? previewFull.slice(0, 27) + '…' : previewFull;
    const time    = lastMsg ? lastMsg.time : '';
    const badgeDisplay = th.unread > 0 ? '' : 'display:none';
    const badgeCount   = th.unread;

    container.append(`
      <div class="rp-thread" data-thread="${th.id}">
        ${(()=>{const ci=STATE.avatars&&STATE.avatars[th.name];return ci?`<div class="rp-av rp-av-img"><img class="rp-av-photo" src="${ci}" alt=""/></div>`:`<div class="rp-av" style="background:${th.avatarBg}">${th.initials}</div>`;})()}
        <div class="rp-ti">
          <div class="rp-tn">${th.name}</div>
          <div class="rp-tp" id="rp-tp-${th.id}">${preview}</div>
        </div>
        <div class="rp-tm">
          <div class="rp-tt" id="rp-tt-${th.id}">${time}</div>
          <div class="rp-tbadge" id="rp-tbadge-${th.id}" style="${badgeDisplay}">${badgeCount}</div>
        </div>
      </div>
    `);
  });
}

// ================================================================
//  NAVIGATION
// ================================================================
function go(view) {
  if (view === 'darkmode') { toggleDarkMode(); return; }
  if (view === 'ludo') { try { if (!LG.active) lgInit(); else lgRender(); } catch(e) { console.warn('[Ludo]', e); } view = 'game'; }
  if (view === 'g2048') { try { if (!LG2048.active) g2048Init(); } catch(e) { console.warn('[2048]', e); } }
  if (view === 'api-settings') { lgFillAPIView(); }
  if (view === 'themes') { lgRenderThemePicker(); }
  $('.rp-view').hide();
  // xhs 系列视图需要 flex 布局，不能用 show()（会设成 block）
  const xhsFlexViews = ['xhs','xhs-detail','xhs-compose'];
  if (xhsFlexViews.includes(view)) {
    $(`#rp-view-${view}`).css('display','flex');
  } else {
    $(`#rp-view-${view}`).show();
  }
  $('#rp-home-ind').toggle(view !== 'lock');
  STATE.currentView = view;

  if (view === 'settings') { _bindAvatarUpload(); }

  if (view === 'messages') {
    renderThreadList();
  }
  if (view === 'moments') {
    mergeGlobalAvatars();
    renderMoments();
  }
  if (view === 'xhs') {
    mergeGlobalAvatars();
    renderXHSFeed(false);
  }
  if (view === 'xhs-detail') {
    // xhsCurrentPost 已在 openXHSDetail 中设置，这里只确保输入框重置
    STATE.xhsReplyToCidx = null;
    $('#rp-xhs-detail-input').val('').attr('placeholder','发表评论…');
    // Bug1 fix: 每次打开帖子详情都回到顶部
    setTimeout(function(){ var el = document.getElementById('rp-xhs-detail-body'); if(el) el.scrollTop = 0; }, 0);
  }
  if (view === 'xhs-compose') {
    // 默认选中第一个标签
    if (!STATE.xhsSelectedTag) STATE.xhsSelectedTag = '日常';
    $('.rp-xhs-tag-btn').removeClass('rp-xhs-tag-selected');
    $(`.rp-xhs-tag-btn[data-tag="${STATE.xhsSelectedTag}"]`).addClass('rp-xhs-tag-selected');
  }
}

// 读取已保存 API 配置并填入 view 表单
function lgFillAPIView() {
  const cfg = (() => { try { return JSON.parse(localStorage.getItem('rp_ludo_api') || '{}'); } catch(e) { return {}; } })();
  if (cfg.mode === 'custom') {
    $('#rp-api-mode-custom-v').prop('checked', true);
    $('#rp-api-url-v').val(cfg.url || '');
    $('#rp-api-key-v').val(cfg.key || '');
    $('#rp-api-model-v').val(cfg.model || '');
    $('#rp-api-custom-fields-v').css('display','flex');
  } else {
    $('#rp-api-mode-st-v').prop('checked', true);
    $('#rp-api-custom-fields-v').hide();
  }
  $('#rp-api-status-v').text('');
}

function openThread(threadId) {
  STATE.currentThread = threadId;
  const th = STATE.threads[threadId];
  if (!th) return;

  th.unread = 0;
  refreshBadges();

  const _hdImg = getAvatar(th.name);
  if (_hdImg) {
    $('#rp-hd-av').empty().append(`<img class="rp-av-photo" src="${_hdImg}" alt=""/>`).css('background', 'transparent');
  } else {
    $('#rp-hd-av').empty().text(th.initials).css('background', th.avatarBg);
  }
  $('#rp-hd-name').text(th.name);

  // FIX3: 切换对话时清空待发队列
  STATE.pendingMessages = [];
  renderPendingQueue();

  renderBubbles(threadId);
  go('thread');
}

// ================================================================
//  BUBBLE RENDERER
// ================================================================
function renderBubbles(threadId) {
  const area = $('#rp-bubbles').empty();
  const thread = STATE.threads[threadId];
  if (!thread) return;

  thread.messages.forEach(msg => {
    // ── 通话记录 ──
    if (msg.type === 'call_rec') {
      const icon = msg.result === 'answered' ? '📞' : '📵';
      const cls  = msg.result === 'missed' ? 'rp-call-rec missed' : 'rp-call-rec';
      area.append(`<div class="rp-sys-msg"><div class="${cls}">${icon} ${msg.label} · ${msg.time}</div></div>`);
      return;
    }
    // ── 红包 ──
    if (msg.type === 'hongbao') {
      const openedHtml = msg.opened
        ? `<div class="rp-hb-amount"><small>¥</small>${escHtml(msg.amount)}</div>` : '';
      const wrap = $(`<div class="rp-bwrap rp-in"></div>`);
      const onclick = msg.opened ? '' : `openHongbao('${threadId}','${msg.id}')`;
      wrap.html(`
        <div class="rp-hongbao ${msg.opened?'opened':''}" ${onclick?`onclick="${onclick}"`:''}">
          <div class="rp-hb-top">
            <div class="rp-hb-ico">🧧</div>
            <div class="rp-hb-info">
              <div class="rp-hb-from">${escHtml(msg.name)}</div>
              <div class="rp-hb-note">${escHtml(msg.note||'恭喜发财')}</div>
            </div>
          </div>
          <div class="rp-hb-bot">
            <div class="rp-hb-action">${msg.opened?'已领取':'点击领取红包'}</div>
            ${openedHtml}
            <div class="rp-hb-tag">微信红包</div>
          </div>
        </div>
        <div class="rp-bts">${msg.time}</div>
      `);
      area.append(wrap); return;
    }
    // ── 语音消息 ──
    if (msg.type === 'voice') {
      const playedCls = msg.played ? 'played' : '';
      const heights = [35,70,55,90,45,65,30];
      const bars = heights.map(h => `<div class="rp-wb" style="height:${h}%"></div>`).join('');
      const wrap = $(`<div class="rp-bwrap rp-in"></div>`);
      wrap.html(`
        <div class="rp-voice-wrap">
          <div class="rp-voice-bbl ${playedCls}" onclick="playVoice('${threadId}','${msg.id}')">
            <div class="rp-voice-play">${msg.played?'✓':'▶'}</div>
            <div class="rp-wave">${bars}</div>
            <div class="rp-voice-dur">${escHtml(msg.duration)}</div>
          </div>
          <div class="rp-voice-txt">${msg.played?escHtml(msg.text):''}</div>
        </div>
        <div class="rp-bts">${msg.time}</div>
      `);
      area.append(wrap); return;
    }
    // ── 群聊消息 ──
    if (msg.type === 'group_msg') {
      const customImg = STATE.avatars && STATE.avatars[msg.name];
      const avHtml = customImg
        ? `<div class="rp-grp-av rp-av-img"><img class="rp-av-photo" src="${customImg}" alt=""/></div>`
        : `<div class="rp-grp-av" style="background:${msg.avatarBg}">${msg.initials}</div>`;
      const wrap = $(`<div class="rp-bwrap rp-in rp-grp"></div>`);
      wrap.html(`
        ${avHtml}
        <div>
          <div class="rp-grp-sender">${escHtml(msg.name)}</div>
          <div class="rp-bubble rp-recv">${escHtml(msg.text)}</div>
          <div class="rp-bts">${msg.time}</div>
        </div>
      `);
      area.append(wrap); return;
    }
    // ── user 发的红包 ──
    if (msg.type === 'hongbao' && msg.from === 'user') {
      const wrap = $(`<div class="rp-bwrap rp-out"></div>`);
      wrap.html(`
        <div class="rp-hongbao opened" style="cursor:default">
          <div class="rp-hb-top">
            <div class="rp-hb-ico">🧧</div>
            <div class="rp-hb-info">
              <div class="rp-hb-from">我</div>
              <div class="rp-hb-note">${escHtml(msg.note||'恭喜发财')}</div>
            </div>
          </div>
          <div class="rp-hb-bot">
            <div class="rp-hb-action">已发送</div>
            <div class="rp-hb-amount"><small>¥</small>${escHtml(msg.amount)}</div>
            <div class="rp-hb-tag">微信红包</div>
          </div>
        </div>
        <div class="rp-bts">${msg.time}</div>
      `);
      area.append(wrap); return;
    }
    // ── 图片 ──
    if (msg.type === 'image') {
      const isUser = msg.from === 'user';
      const wrap = $(`<div class="rp-bwrap ${isUser?'rp-out':'rp-in'}"></div>`);
      wrap.html(`
        <div class="rp-img-bbl"><img src="${msg.src}" alt="图片"/></div>
        <div class="rp-bts">${msg.time}</div>
      `);
      area.append(wrap); return;
    }
    // ── 位置 ──
    if (msg.type === 'location') {
      const isUser = msg.from === 'user';
      const wrap = $(`<div class="rp-bwrap ${isUser?'rp-out':'rp-in'}"></div>`);
      wrap.html(`
        <div class="rp-loc-card">
          <div class="rp-loc-ico">📍</div>
          <div class="rp-loc-txt">${escHtml(msg.place)}</div>
        </div>
        <div class="rp-bts">${msg.time}</div>
      `);
      area.append(wrap); return;
    }
    // ── user 发的红包 ──
    if (msg.type === 'hongbao' && msg.from === 'user') {
      const wrap = $(`<div class="rp-bwrap rp-out"></div>`);
      wrap.html(`
        <div class="rp-hongbao opened" style="cursor:default">
          <div class="rp-hb-top">
            <div class="rp-hb-ico">🧧</div>
            <div class="rp-hb-info">
              <div class="rp-hb-from">我</div>
              <div class="rp-hb-note">${escHtml(msg.note||'恭喜发财')}</div>
            </div>
          </div>
          <div class="rp-hb-bot">
            <div class="rp-hb-action">已发送</div>
            <div class="rp-hb-amount"><small>¥</small>${escHtml(msg.amount)}</div>
            <div class="rp-hb-tag">微信红包</div>
          </div>
        </div>
        <div class="rp-bts">${msg.time}</div>
      `);
      area.append(wrap); return;
    }
    // ── 图片 ──
    if (msg.type === 'image') {
      const _iu = msg.from === 'user';
      const wrap = $(`<div class="rp-bwrap ${_iu?'rp-out':'rp-in'}"></div>`);
      wrap.html(`
        <div class="rp-img-bbl"><img src="${msg.src}" alt="图片"/></div>
        <div class="rp-bts">${msg.time}</div>
      `);
      area.append(wrap); return;
    }
    // ── 位置 ──
    if (msg.type === 'location') {
      const _lu = msg.from === 'user';
      const wrap = $(`<div class="rp-bwrap ${_lu?'rp-out':'rp-in'}"></div>`);
      wrap.html(`
        <div class="rp-loc-card">
          <div class="rp-loc-ico">📍</div>
          <div class="rp-loc-txt">${escHtml(msg.place)}</div>
        </div>
        <div class="rp-bts">${msg.time}</div>
      `);
      area.append(wrap); return;
    }
    // ── 普通消息 ──
    const isUser = msg.from === 'user';
    const isGrpThread = thread.type === 'group' || (threadId && threadId.startsWith('grp_'));
    const wrap = $('<div>').addClass('rp-bwrap ' + (isUser ? 'rp-out' : 'rp-in') + (isGrpThread ? ' rp-grp' : ''));
    if (isGrpThread && isUser) {
      const uImg = getAvatar('user');
      const uAvHtml = uImg
        ? `<div class="rp-grp-av rp-av-img"><img class="rp-av-photo" src="${uImg}" alt=""/></div>`
        : `<div class="rp-grp-av" style="background:linear-gradient(145deg,#64748b,#475569)">我</div>`;
      const inner = $('<div>');
      inner.append($('<div>').addClass('rp-bubble rp-sent').text(msg.text));
      inner.append($('<div>').addClass('rp-bts').text(msg.time));
      wrap.append(inner, $(uAvHtml));
    } else {
      const bbl = $('<div>').addClass('rp-bubble ' + (isUser ? 'rp-sent' : 'rp-recv')).text(msg.text);
      const ts  = $('<div>').addClass('rp-bts').text(msg.time);
      wrap.append(bbl, ts);
    }
    area.append(wrap);
  });

  area.scrollTop(area[0].scrollHeight);
}

// ================================================================
//  SEND SMS
// ================================================================
function sendSMS() {
  // FIX3: 先把输入框当前内容并入队列
  const currentText = $('#rp-input').val().trim();
  if (currentText) {
    STATE.pendingMessages.push(currentText);
    $('#rp-input').val('');
  }

  if (!STATE.currentThread || STATE.pendingMessages.length === 0) return;

  const th  = STATE.threads[STATE.currentThread];
  const now = new Date();
  const ts  = `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;

  // 写入手机 UI（全部排队消息）
  const allMessages = [...STATE.pendingMessages];
  STATE.pendingMessages = [];
  renderPendingQueue();

  allMessages.forEach(text => {
    th.messages.push({ from: 'user', text, time: ts });
  });
  renderBubbles(STATE.currentThread);
  updatePreviews();
  saveState(); // FIX2: 持久化发出的消息

  const ta = document.querySelector('#send_textarea');
  if (!ta) return;

  const mainText = ta.value.trim();

  // 拼装可见行动描述
  let smsLine;
  if (allMessages.length === 1) {
    smsLine = `*{{user}}拿起手机，给${th.name}发了一条短信：「${allMessages[0]}」*`;
  } else {
    const msgList = allMessages.map(m => `「${m}」`).join('、');
    smsLine = `*{{user}}拿起手机，给${th.name}连续发了${allMessages.length}条短信：${msgList}*`;
  }

  // FIX4+FIX1: 判断联系人是否为主角，生成不同的 OOC 指令
  // 修复：mainCharName 为空时，仅将内置线程 raymond/gaspard 视为主角，避免把所有 NPC 错误归为主角
  const ctx = getContext();
  const mainCharName = ctx?.name2 || '';
  const isGroupThread = th.type === 'group' || th.id.startsWith('grp_');

  let oocText;

  if (isGroupThread) {
    // ── 群聊线程：要求 AI 用 GMSG 格式回复 ──
    const groupName = th.name;
    const memberNames = (th.members || [])
      .map(id => STATE.threads[id]?.name || id)
      .filter(Boolean);
    const memberDesc = memberNames.length ? `群成员包括：${memberNames.join('、')}。` : '';
    // 强约束：手机内容仅允许在 <PHONE> 块中输出，禁止正文污染
    oocText = `[手机群聊提示：{{user}}在群聊「${groupName}」发了消息，当前时间${ts}。请按世界书手机UI协议输出，并严格满足：仅在<PHONE>...</PHONE>内输出手机内容；至少一条<GMSG FROM="角色名" GROUP="${groupName}" TIME="${ts}">内容</GMSG>。]`;
  } else {
    let isMainChar;
    if (mainCharName) {
      isMainChar = th.name.toLowerCase().includes(mainCharName.toLowerCase()) ||
        mainCharName.toLowerCase().includes(th.name.toLowerCase());
    } else {
      isMainChar = false; // mainCharName未知时保守处理，一律走NPC路径
    }

    if (isMainChar) {
      // 对话对象是主角：根据场景决定口头还是短信回复
      oocText = `[手机短信提示：${th.name}收到{{user}}的短信，当前时间${ts}。按世界书手机UI协议输出，且必须满足：仅在<PHONE>...</PHONE>内输出手机内容；至少一条<SMS FROM="${th.name}" TIME="${ts}">回复内容</SMS>，SMS内容必须是${th.name}自己说的话，绝对不能复制或重复{{user}}刚才说的内容。]`;
    } else {
      // FIX1（加强版）: NPC联系人--明确告知 AI 此 NPC 真实存在，主角完全不知情
      const charName = mainCharName || '主角';
      oocText = `[叙事指令：{{user}}私下给NPC"${th.name}"发了手机短信（时间${ts}）。${charName}完全不知情，本轮不得提及此短信。请按世界书手机UI协议输出，并严格满足：仅在<PHONE>...</PHONE>内输出手机内容；至少一条<SMS FROM="${th.name}" TIME="${ts}">回复内容</SMS>，SMS内容必须是${th.name}自己说的话，绝对不能复制或重复{{user}}刚才说的内容。]`;
    }
  }

  // FIX1: 用 setExtensionPrompt 注入隐藏 OOC，不在聊天框显示
  const hasExtPrompt = typeof setExtensionPrompt === 'function' && extension_prompt_types;
  console.log('[Raymond Phone] sendSMS triggered', {
    threadId: STATE.currentThread,
    threadType: th.type,
    isGroupThread,
    hasExtPrompt,
    oocText,
  });
  if (hasExtPrompt) {
    // 将 smsLine 和 oocText 合并注入，用户聊天框不显示任何提示语
    setExtensionPrompt('rp-phone-ooc', `${smsLine}\n${oocText}`, extension_prompt_types.BEFORE_PROMPT, 0, false, 0);
    console.log('[Raymond Phone] setExtensionPrompt called with BEFORE_PROMPT, depth=0');
    ta.value = mainText || '';
  } else {
    // 降级：OOC 直接写入消息（旧版 ST 兼容）
    console.warn('[Raymond Phone] setExtensionPrompt not available, falling back to inline OOC');
    ta.value = mainText ? `${mainText}\n${smsLine}\n${oocText}` : `${smsLine}\n${oocText}`;
  }

  ta.dispatchEvent(new Event('input', { bubbles: true }));
  document.querySelector('#send_but')?.click();

  // 记录一次"等待手机回复"的状态：若模型未输出 <PHONE>，后续走兜底解析
  STATE._pendingPhoneReply = {
    threadId: STATE.currentThread,
    fromName: th.name,
    sentAt: Date.now(),
  };

  // 发送后清除隐藏提示
  if (hasExtPrompt) {
    setTimeout(() => setExtensionPrompt('rp-phone-ooc', ''), 300);
  }
}

// ================================================================
//  AI MESSAGE PARSER
// ================================================================
function normalizePhoneMarkup(raw) {
  let s = String(raw || '');
  // HTML 实体反转义（有些渲染链会把标签转成实体）
  s = s
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&nbsp;/gi, ' ');
  // 全角尖括号兼容
  s = s.replace(/＜/g, '<').replace(/＞/g, '>');
  return s;
}

function onAIMessage() {
  try {
    const ctx  = getContext();
    const chat = ctx?.chat;
    if (!chat?.length) return;

    const last = [...chat].reverse().find(m => !m.is_user);
    if (!last?.mes) return;

    const raw = last.mes;
    // 指纹：只用于成功解析后去重，流式中间态不记录
    const fp = `${ctx?.chatId || ''}|${raw.length}|${raw.slice(0, 24)}|${raw.slice(-24)}`;
    if (fp === STATE._lastAiFingerprint) {
      console.log('[Phone:diag] onAIMessage skipped: same fingerprint');
      return;
    }
    const normalizedRaw = normalizePhoneMarkup(raw);
    const hasPhoneOpen  = /<PHONE\b/i.test(normalizedRaw);
    const hasPhoneClose = /<\/PHONE>/i.test(normalizedRaw);
    const hasSmsOpen    = /<SMS\b/i.test(normalizedRaw);
    const hasSmsClose   = /<\/SMS>/i.test(normalizedRaw);
    console.log('[Phone:diag] onAIMessage called', {
      rawLen: raw.length,
      hasPhoneOpen, hasPhoneClose, hasSmsOpen, hasSmsClose,
      rawSnippet: raw.slice(0, 120)
    });

    // 流式生成中间态保护
    if (hasPhoneOpen && !hasPhoneClose) {
      console.log('[Phone:diag] EARLY RETURN: PHONE not closed (streaming)');
      return;
    }
    if (hasSmsOpen && !hasSmsClose) {
      console.log('[Phone:diag] EARLY RETURN: SMS not closed (streaming)');
      return;
    }
    // 消息完整，记录指纹防止同一完整消息被重复处理
    STATE._lastAiFingerprint = fp;
    const phoneMatch = normalizedRaw.match(/<PHONE>([\s\S]*?)<\/PHONE>/i);
    // 兼容：有些模型会漏掉 <PHONE> 包裹，但仍输出 <SMS>/<GMSG>
    const hasBarePhoneTags = /<(SMS|GMSG|NOTIFY|MOMENTS|COMMENT|SYNC|CALL|VOICE|HONGBAO)\b/i.test(normalizedRaw);

    if (phoneMatch) {
      const parsedCount = parsePhone(phoneMatch[1]);
      if (parsedCount > 0) {
        STATE._pendingPhoneReply = null;
        rewritePhoneEchoInChat(phoneMatch[1], STATE._lastAiFingerprint);
        beautifySMSInChat();
        return;
      }
      // 极端兜底：PHONE 存在但结构不规范时，强行抽取第一条 SMS 文本落到 pending 线程
      const looseSms = phoneMatch[1].match(/<SMS\b[^>]*>([\s\S]*?)(?:<\/SMS>|$)/i);
      const looseText = (looseSms?.[1] || '').replace(/<[^>]+>/g, ' ').trim();
      if (looseText && STATE._pendingPhoneReply?.threadId && STATE.threads?.[STATE._pendingPhoneReply.threadId]) {
        const now = new Date();
        const ts  = `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;
        incomingMsg(STATE._pendingPhoneReply.threadId, looseText.slice(0, 200), ts);
        STATE._pendingPhoneReply = null;
        beautifySMSInChat();
        return;
      }
    }

    if (hasBarePhoneTags) {
      const parsedCount = parsePhone(normalizedRaw);
      if (parsedCount > 0) {
        STATE._pendingPhoneReply = null;
        rewritePhoneEchoInChat(normalizedRaw, STATE._lastAiFingerprint);
        beautifySMSInChat();
        return;
      }
      // 标签存在但未解析出任何消息：继续走兜底，避免"正文污染且手机无消息"
    }

    // 关闭正文兜底入手机：避免把正文第一句（如日期碎片）误写入手机消息
    if (STATE._pendingPhoneReply && Date.now() - STATE._pendingPhoneReply.sentAt < 120000) {
      STATE._pendingPhoneReply = null;
    }
  } catch (e) {
    console.warn('[Raymond Phone]', e);
  }
}

function cleanPhoneFallbackReply(raw, fromName) {
  if (!raw) return '';
  let text = String(raw);
  // 去掉 PHONE 标签块与思维链
  text = text.replace(/<PHONE>[\s\S]*?<\/PHONE>/gi, ' ');
  text = text.replace(/<think>[\s\S]*?<\/think>/gi, ' ');
  // 去掉结构化标签
  text = text.replace(/<[^>]{1,80}>/g, ' ');
  // 常见"奇怪总结段"关键词行
  const badLine = /(剧情摘要|故事走向|联系测试|未解决|规则|状态|Stage|DAILY_NOTE|FLASH_MEMORY|BROKEN_RULES|INBOX|关系进度|条目|清单)/i;
  const lines = text
    .split(/\n+/)
    .map(s => s.trim())
    .filter(Boolean)
    .filter(s => !badLine.test(s))
    .filter(s => !/^[\-•*\d\s.:：]+$/.test(s));

  // 优先取引号里的短句
  const joined = lines.join(' ');
  const q = joined.match(/["\"「]([^"\"」\n]{2,80})["\"」]/);
  if (q && q[1]) return q[1].trim().slice(0, 80);

  // 否则取第一条像对话的句子
  const first = lines.find(s => s.length >= 2 && s.length <= 80);
  if (!first) return '';
  return first.replace(/^\s*[^\u4e00-\u9fa5A-Za-z0-9]+/, '').slice(0, 80).trim();
}

function sanitizeSmsText(text) {
  let t = String(text || '').trim();
  if (!t) return '';

  const lines = t.split(/\n+/).map(s => s.trim()).filter(Boolean);
  if (!lines.length) return '';

  // 去掉前置"日期碎片行"（如 2023/11/06 17: 或 2023-11-06 17:21）
  const dateHead = /^\d{4}[\/-]\d{1,2}[\/-]\d{1,2}\s+\d{1,2}(?::\d{0,2})?\s*$/;
  if (lines.length > 1 && dateHead.test(lines[0])) {
    lines.shift();
  }

  t = lines.join('\n').trim();

  // 整条就是日期碎片则丢弃
  if (dateHead.test(t)) return '';

  return t;
}

function escapeRegExp(s) {
  return String(s || '').replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function extractSmsSummaries(block) {
  const out = [];
  if (!block) return out;
  const smsTagRe = /<SMS\b([^>]*)>([\s\S]*?)<\/SMS>/gi;
  let m;
  while ((m = smsTagRe.exec(block)) !== null) {
    const attrs = getTagAttrs(m[1]);
    const from  = (attrs.FROM || '').trim();
    const text  = sanitizeSmsText(m[2] || '');
    if (!text) continue;
    out.push({ from, text });
  }
  return out;
}

function rewritePhoneEchoInChat(block, fp) {
  try {
    const allMsgs = document.querySelectorAll('.mes:not([is_user="true"])');
    if (!allMsgs.length) return;
    const lastMsg = allMsgs[allMsgs.length - 1];
    const textEl  = lastMsg?.querySelector('.mes_text');
    if (!textEl) return;

    if (fp && textEl.dataset.rpPhoneRewriteFp === fp) return;

    // 只删 <phone>...</phone> 标签本身，char 的叙事正文完整保留
    let html = textEl.innerHTML || '';
    html = html
      .replace(/<phone>[\s\S]*?<\/phone>/gi, '')
      .replace(/&lt;phone&gt;[\s\S]*?&lt;\/phone&gt;/gi, '');

    // 清理多余换行
    html = html
      .replace(/(?:<br\s*\/?>[\s]*){2,}/gi, '<br>')
      .replace(/^\s*(?:<br\s*\/?>\s*)+/i, '')
      .replace(/(?:<br\s*\/?>\s*)+$/i, '')
      .trim();

    // 追加短信摘要行：「角色名：短信内容」
    const smsList = extractSmsSummaries(block);
    if (smsList.length > 0) {
      // 移除旧的摘要行（防止重复追加）
      html = html.replace(/<span class="rp-sms-echo"[\s\S]*?<\/span>/g, '');
      smsList.forEach(({ from, text }) => {
        const nameHtml = from ? `<span class="rp-sms-echo-name">${escHtml(from)}：</span>` : '';
        html += `<span class="rp-sms-echo">${nameHtml}${escHtml(text)}</span>`;
      });
    }

    if (html !== (textEl.innerHTML || '').trim()) {
      textEl.innerHTML = html;
    }
    if (fp) textEl.dataset.rpPhoneRewriteFp = fp;
  } catch(e) {
    console.warn('[Raymond Phone] rewritePhoneEchoInChat:', e);
  }
}

function getTagAttrs(attrText) {
  const attrs = {};
  if (!attrText) return attrs;
  // 兼容：KEY="v" / KEY='v' / KEY="v" / KEY='v' / KEY=v(无引号)
  const attrRe = /(\w+)\s*=\s*(?:"([^"]*)"|'([^']*)'|"([^"]*)"|'([^']*)'|([^\s>]+))/g;
  let am;
  while ((am = attrRe.exec(attrText)) !== null) {
    attrs[am[1].toUpperCase()] = (am[2] ?? am[3] ?? am[4] ?? am[5] ?? am[6] ?? '').trim();
  }
  return attrs;
}

function parsePhone(block) {
  let parsedCount = 0;
  let m;

  // 更鲁棒：支持属性顺序变化、单引号/双引号
  const smsTagRe = /<SMS\b([^>]*)>([\s\S]*?)<\/SMS>/gi;
  while ((m = smsTagRe.exec(block)) !== null) {
    const attrs    = getTagAttrs(m[1]);
    const text     = sanitizeSmsText(m[2] || '');
    const fromRaw0 = (attrs.FROM || '').trim();
    const time     = (attrs.TIME || '').trim();
    if (!text) continue;

    // 线程路由策略：
    // 1) 若存在 pending（刚由本端发起短信），优先落到 pending 线程
    // 2) 按 FROM 精确/模糊匹配已有线程
    // 3) FROM 匹配不到时，先试当前打开的线程 (currentThread)，不立即新建孤立线程
    // 4) FROM 为空时退化到 currentThread
    // 5) 以上都失败才新建
    let threadId = null;
    let fromRaw = fromRaw0;

    const pendingThreadId = STATE._pendingPhoneReply?.threadId;
    const hasPendingThread = !!(pendingThreadId && STATE.threads?.[pendingThreadId]);
    const pendingFresh = !!(STATE._pendingPhoneReply && (Date.now() - (STATE._pendingPhoneReply.sentAt || 0) < 300000));

    if (hasPendingThread && pendingFresh) {
      // 优先 pending：用户刚通过手机发了短信，回复一定属于这个线程
      threadId = pendingThreadId;
      if (!fromRaw) fromRaw = STATE.threads[threadId]?.name || '';
    } else if (fromRaw) {
      threadId = matchThread(fromRaw);
      if (!threadId) {
        // FROM 名字匹配失败（如角色有中英文别名）→ 先用当前打开的线程，而不是新建孤岛
        const curTh = STATE.currentThread && STATE.threads?.[STATE.currentThread];
        if (curTh) {
          threadId = STATE.currentThread;
        } else {
          // 真的找不到，才新建
          const newTh = findOrCreateThread(fromRaw);
          threadId = newTh.id;
        }
      }
    } else if (STATE.currentThread && STATE.threads?.[STATE.currentThread]) {
      threadId = STATE.currentThread;
      fromRaw = STATE.threads[threadId]?.name || '';
    }

    if (!threadId) {
      console.log('[Phone:diag] parsePhone: no threadId found for FROM=' + fromRaw0);
      continue;
    }
    const fallbackTime = `${String(new Date().getHours()).padStart(2,'0')}:${String(new Date().getMinutes()).padStart(2,'0')}`;
    console.log('[Phone:diag] incomingMsg called', { threadId, text: text.slice(0,40), time: time || fallbackTime });
    incomingMsg(threadId, text, time || fallbackTime);
    parsedCount++;
  }

  const notifRe = /<NOTIFY\s+TYPE="([^"]+)"\s+TEXT="([^"]+)"\/>/gi;
  const _uname = (typeof getContext === 'function' ? getContext()?.name1 : null) || '';
  while ((m = notifRe.exec(block)) !== null) {
    const nType = m[1], nText = m[2];
    // 跳过由 user 操作触发的位置/红包通知（AI 叙事确认，非 char 主动发起）
    if (STATE._suppressUserNotifUntil && Date.now() < STATE._suppressUserNotifUntil) {
      const lowerText = nText.toLowerCase();
      if (lowerText.includes('位置') || lowerText.includes('红包')) { parsedCount++; continue; }
    }
    addLockNotif(nType, nText);
    parsedCount++;
  }

  const momentsRe = /<MOMENTS\s+FROM="([^"]+)"\s+TIME="([^"]+)"(?:\s+IMG="([^"]*)")?\s*>([\s\S]*?)<\/MOMENTS>/gi;
  while ((m = momentsRe.exec(block)) !== null) {
    incomingMoment(m[1].trim(), m[2].trim(), m[4].trim(), m[3] ? m[3].trim() : null);
    parsedCount++;
  }

  const commentRe = /<COMMENT\s+MOMENT_ID="([^"]+)"\s+FROM="([^"]+)"\s+TIME="([^"]+)"(?:\s+REPLY_TO="([^"]*)")?\s*>([\s\S]*?)<\/COMMENT>/gi;
  while ((m = commentRe.exec(block)) !== null) {
    incomingComment(m[1].trim(), m[2].trim(), m[3].trim(), m[5].trim(), m[4] ? m[4].trim() : null);
    parsedCount++;
  }

  const sync = block.match(/<SYNC\s+STAGE="(\d+)"\s+PROGRESS="(\d+)"\s+STATUS="([^"]+)"\/>/i);
  if (sync) {
    STATE.sync = { stage: +sync[1], progress: +sync[2], status: sync[3] };
    refreshWidget();
    saveState(); // FIX2: 持久化关系进度
    parsedCount++;
  }

  // ── CALL ──
  const callRe = /<CALL\s+FROM="([^"]+)"\s+TIME="([^"]+)"\s*\/?>/gi;
  while ((m = callRe.exec(block)) !== null) {
    incomingCall(m[1].trim(), m[2].trim());
    parsedCount++;
  }
  // ── HONGBAO ──
  const hongbaoRe = /<HONGBAO\s+FROM="([^"]+)"\s+AMOUNT="([^"]+)"(?:\s+NOTE="([^"]*)")?\s*\/?>/gi;
  const _userName = (typeof getContext === 'function' ? getContext()?.name1 : null) || '';
  while ((m = hongbaoRe.exec(block)) !== null) {
    const fromName = m[1].trim();
    // 跳过 user 自己发出的红包（AI 确认回显），只处理 char 发来的
    if (_userName && fromName.toLowerCase() === _userName.toLowerCase()) continue;
    incomingHongbao(fromName, m[2].trim(), m[3] ? m[3].trim() : '恭喜发财');
    parsedCount++;
  }
  // ── VOICE ──
  const voiceRe = /<VOICE\s+FROM="([^"]+)"\s+TIME="([^"]+)"\s+DURATION="([^"]+)">([\s\S]*?)<\/VOICE>/gi;
  while ((m = voiceRe.exec(block)) !== null) {
    incomingVoice(m[1].trim(), m[2].trim(), m[3].trim(), m[4].trim());
    parsedCount++;
  }
  // ── GROUP MSG ──
  const gmsgRe = /<GMSG\s+FROM="([^"]+)"\s+GROUP="([^"]+)"\s+TIME="([^"]+)">([\s\S]*?)<\/GMSG>/gi;
  while ((m = gmsgRe.exec(block)) !== null) {
    incomingGroupMsg(m[1].trim(), m[2].trim(), m[3].trim(), m[4].trim());
    parsedCount++;
  }

  return parsedCount;
}

// ================================================================
//  MATCH THREAD
// ================================================================
function matchThread(fromRaw) {
  const lower = fromRaw.toLowerCase();

  for (const th of Object.values(STATE.threads)) {
    if (th.name.toLowerCase() === lower) return th.id;
  }

  for (const th of Object.values(STATE.threads)) {
    const thName = th.name.toLowerCase();
    if (lower.includes(thName) || thName.includes(lower)) return th.id;
  }

  return null;
}

// ================================================================
//  INCOMING MESSAGE
// ================================================================
function incomingMsg(threadId, text, time) {
  const th = STATE.threads[threadId];
  if (!th) return;

  // 去重：相同 from+text 在近期消息中不重复插入（time 可能略有不同）
  const isDup = th.messages.some(m => m.from === threadId && m.text === text);
  if (isDup) {
    console.log('[Phone:diag] incomingMsg DEDUP blocked:', text.slice(0, 40));
    return;
  }

  th.messages.push({ from: threadId, text, time });

  if (STATE.currentView !== 'thread' || STATE.currentThread !== threadId) {
    th.unread++;
  }

  refreshBadges();
  updatePreviews();

  if (STATE.currentView === 'thread' && STATE.currentThread === threadId) {
    renderBubbles(threadId);
  }

  showLiveChat(th.name, th.avatarBg, STATE.avatars?.[th.name] || null, text);
  showBanner(th.name, text, time);
  saveState(); // FIX2: 持久化收到的消息
}

// ================================================================
//  NOTIFICATION BANNER
// ================================================================
function showBanner(from, text, time) {
  // 短时去重：同 from+text 在 3s 内不重复弹出
  const key = from + '|' + text;
  if (STATE._lastBannerKey === key && Date.now() - (STATE._lastBannerAt || 0) < 3000) return;
  STATE._lastBannerKey = key;
  STATE._lastBannerAt = Date.now();

  const b = $('#rp-notif-banner');
  $('#rp-nb-from').text(from);
  $('#rp-nb-text').text(text.length > 45 ? text.slice(0, 45) + '…' : text);
  $('#rp-nb-time').text(time);

  b.stop(true).show().addClass('rp-nb-in');
  setTimeout(() => {
    b.removeClass('rp-nb-in');
    setTimeout(() => b.hide(), 400);
  }, 3500);
}

function addLockNotif(type, text) {
  // 去重：同 type+text 已在通知列表中则跳过
  const isDupe = STATE.notifications.some(n => n.type === type && n.text === text);
  if (isDupe) return;
  STATE.notifications.push({ type, text });
  refreshLockNotifs();
}

// FIX2: 抽出 DOM 刷新，方便聊天切换时重建锁屏通知
function refreshLockNotifs() {
  const c = $('#rp-lock-notifs').empty();
  STATE.notifications.slice(-3).forEach(n => {
    c.append(`<div class="rp-ln">
      <span class="rp-ln-type">${n.type}</span>
      <span class="rp-ln-text">${n.text}</span>
    </div>`);
  });
}

// ================================================================
//  UI REFRESH HELPERS
// ================================================================
function refreshBadges() {
  let total = 0;
  Object.values(STATE.threads).forEach(th => {
    const el = $(`#rp-tbadge-${th.id}`);
    if (el.length) {
      th.unread > 0 ? el.text(th.unread).show() : el.hide();
    }
    total += th.unread;
  });
  total > 0 ? $('#rp-main-badge').text(total).show() : $('#rp-main-badge').hide();
}

function updatePreviews() {
  Object.values(STATE.threads).forEach(th => {
    const last = th.messages.at(-1);
    if (!last) return;
    const sl = last.from === 'user' ? '我' : th.name.split(' ')[0];
    const pf = sl + '：' + last.text;
    $(`#rp-tp-${th.id}`).text(pf.length > 28 ? pf.slice(0, 27) + '…' : pf);
    $(`#rp-tt-${th.id}`).text(last.time);
  });
}

const STAGE_NAMES = { 1: '初识 · 试探', 2: '增进 · 主导', 3: '陷落 · 占有' };
function refreshWidget() {
  const { stage, progress, status } = STATE.sync;
  $('#rp-wd-stage').text(`Stage ${stage} · ${(STAGE_NAMES[stage] || '').split('·')[1]?.trim()}`);
  $('#rp-wd-fill').css('width', (progress / 99 * 100).toFixed(1) + '%');
  $('#rp-wd-status').text(status);
}

// ================================================================
//  DRAGGABLE
// ================================================================
function makeDraggable() {
  const phone = document.querySelector('#rp-phone');
  if (!phone) return;
  // 移除旧 handler 防止重复（用具名函数）
  if (phone._rpMoveHandler) document.removeEventListener('mousemove', phone._rpMoveHandler);
  if (phone._rpUpHandler)   document.removeEventListener('mouseup',   phone._rpUpHandler);
  let dragging = false, ox, oy, ex, ey;

  phone.addEventListener('mousedown', e => {
    if (IS_TOUCH_DEVICE) return;
    if (e.target.closest('input,textarea,select,button,a,[contenteditable]')) return;
    dragging = true;
    const r = phone.getBoundingClientRect();
    phone.style.right = 'auto';
    phone.style.bottom = 'auto';
    phone.style.left = r.left + 'px';
    phone.style.top = r.top + 'px';
    ox = r.left; oy = r.top; ex = e.clientX; ey = e.clientY;
    e.preventDefault();
  });
  phone._rpMoveHandler = e => {
    if (!dragging) return;
    phone.style.left = (ox + e.clientX - ex) + 'px';
    phone.style.top  = (oy + e.clientY - ey) + 'px';
  };
  phone._rpUpHandler = () => { dragging = false; };
  document.addEventListener('mousemove', phone._rpMoveHandler);
  document.addEventListener('mouseup',   phone._rpUpHandler);
}

// ================================================================
//  COMPOSE MOMENT
// ================================================================
function openCompose() {
  $('#rp-compose-modal').show();
  $('#rp-compose-text').val('').focus();
}

function closeCompose() {
  $('#rp-compose-modal').hide();
}

// ================================================================
//  DIARY
// ================================================================
function renderDiary() {
  var container = $('#rp-diary-list').empty();
  var entries = (STATE.diary || []).slice().reverse();
  if (!entries.length) {
    container.append('<div class="rp-diary-empty">\u6682\u65e0\u65e5\u8bb0\uff0c\u6309\u4e0a\u65b9\u6309\u9492\u751f\u6210\u6216\u81ea\u5df1\u5199\u4e00\u7bc7</div>');
    return;
  }
  var _ctx = getContext();
  var charName = _ctx && _ctx.name2 ? _ctx.name2 : 'TA';
  var charAvatarBg = 'linear-gradient(145deg,#7c3aed,#0891b2)';
  entries.forEach(function(e) {
    var isAI = e.author === 'ai';
    var authorLabel = isAI ? charName : '\u6211';
    var replyHtml = '';
    if (!isAI && e.reply) {
      replyHtml = '<div class="rp-diary-reply"><div class="rp-diary-reply-name">' + escHtml(charName) + '</div>'
        + '<div class="rp-diary-reply-text">' + escHtml(e.reply) + '</div></div>';
    }
    container.append(
      '<div class="rp-diary-entry">'
      + '<div class="rp-diary-hd">'
      + '<div class="rp-diary-meta"><div class="rp-diary-author">' + authorLabel + '</div>'
      + '<div class="rp-diary-date">' + escHtml(e.date) + ' ' + escHtml(e.time) + '</div></div></div>'
      + '<div class="rp-diary-body">' + escHtml(e.text) + '</div>'
      + replyHtml
      + '</div>'
    );
  });
}

async function generateAIDiary() {
  var btn = $('#rp-gen-diary');
  btn.addClass('rp-spinning').prop('disabled', true);
  try {
    var _ctx = getContext();
    if (!_ctx) return;
    var charName = _ctx.name2 || 'TA';
    var charPersona = '';
    if (_ctx.characters && _ctx.characterId !== undefined) {
      var ch = _ctx.characters[_ctx.characterId];
      if (ch) charPersona = [ch.description||'', ch.personality||'', ch.scenario||''].filter(Boolean).join('\n');
    }
    var recent = (_ctx.chat || []).slice(-12).map(function(m) {
      return (m.is_user ? '\u7528\u6237' : charName) + '\uff1a' + (m.mes || '').slice(0, 100);
    }).join('\n');
    var now = new Date();
    var dateStr = (now.getMonth()+1) + '/' + now.getDate();
    var sysMsg = '\u4f60\u662f' + charName + '\u3002\n'
      + (charPersona ? '\u4eba\u8bbe\uff1a' + charPersona.slice(0,600) + '\n\n' : '')
      + '\u8bf7\u4ee5\u7b2c\u4e00\u4eba\u79f0\u5199\u4eca\u5929\u7684\u4e2a\u4eba\u65e5\u8bb0\uff0c\u53cd\u6620\u4eca\u65e5\u4e0e\u7528\u6237\u7684\u4e92\u52a8\u611f\u53d7\uff0c150-250\u5b57\u4e2d\u6587\u3002\n'
      + '\u53ea\u9700\u5199\u65e5\u671f\u548c\u65e5\u8bb0\u6b63\u6587\u5185\u5bb9\u3002\n'
      + '\u6ce8\u610f\u4eba\u79f0\uff1a\u6839\u636e\u5bf9\u8bdd\u5185\u5bb9\u5224\u65ad\u7528\u6237\u89d2\u8272\u7684\u6027\u522b\uff0c\u4f7f\u7528\u6b63\u786e\u7684\u4eba\u79f0\u4ee3\u8bcd\uff08\u4ed6/\u5979/\u5b83\uff09\uff0c\u4e0d\u8981\u9ed8\u8ba4\u7528\u300c\u4ed6\u300d\u3002\n'
      + '\u4e25\u7981\uff1a\u4e0d\u5f97\u5305\u542b\u72b6\u6001\u680f\uff08\u4f53\u529b/\u7cbe\u795e/\u597d\u611f\u5ea6\u7b49\u6570\u503c\uff09\u3001\u4e16\u754c\u4e66\u7ec4\u4ef6\u3001\u7cfb\u7edf\u63d0\u793a\u683c\u5f0f\u3001Markdown\u683c\u5f0f\u3001HTML\u6807\u7b7e\u3001\u5c5e\u6027\u8868\u683c\uff0c\u76f4\u63a5\u5199\u7eaf\u6587\u5b57\u65e5\u8bb0\u5185\u5bb9\u3002';
    var prompt = '\u4eca\u65e5\u5bf9\u8bdd\uff1a\n' + recent + '\n\n' + charName + '\u7684\u4eca\u65e5\u65e5\u8bb0\uff1a';
    var resp = await lgCallAPI(prompt, 350, sysMsg);
    if (!resp) return;
    var ts = String(now.getHours()).padStart(2,'0') + ':' + String(now.getMinutes()).padStart(2,'0');
    var diaryText = resp.trim();
    // 从正文开头提取故事内日期（如「2023年11月15日」）
    var storyDateMatch = diaryText.match(/^(\d{4}\u5e74\d{1,2}\u6708\d{1,2}\u65e5|\d{4}\/\d{1,2}\/\d{1,2}|\d{1,2}\u6708\d{1,2}\u65e5)/);
    if (storyDateMatch) dateStr = storyDateMatch[1];
    STATE.diary = STATE.diary || [];
    STATE.diary.push({ id: 'diary_' + now.getTime(), date: dateStr, time: ts, author: 'ai', text: diaryText, reply: null });
    saveState();
    renderDiary();
  } catch(e) { console.warn('[Diary] generateAIDiary error:', e); }
  finally { btn.removeClass('rp-spinning').prop('disabled', false); }
}

async function postUserDiary() {
  var text = $('#rp-diary-input').val().trim();
  if (!text) return;
  $('#rp-diary-send').prop('disabled', true);
  $('#rp-diary-input').val('');
  var now = new Date();
  var dateStr = (now.getMonth()+1) + '/' + now.getDate();
  var ts = String(now.getHours()).padStart(2,'0') + ':' + String(now.getMinutes()).padStart(2,'0');
  var entryId = 'diary_' + now.getTime();
  STATE.diary = STATE.diary || [];
  STATE.diary.push({ id: entryId, date: dateStr, time: ts, author: 'user', text: text, reply: null, replyTime: null });
  saveState(); renderDiary();
  // char 回复（只有主角，不请求 NPC）
  try {
    var _ctx2 = getContext();
    var charName2 = _ctx2 && _ctx2.name2 ? _ctx2.name2 : 'TA';
    var charPersona2 = '';
    if (_ctx2 && _ctx2.characters && _ctx2.characterId !== undefined) {
      var ch2 = _ctx2.characters[_ctx2.characterId];
      if (ch2) charPersona2 = [
        ch2.description || '',
        ch2.personality || '',
        ch2.scenario    || '',
        ch2.mes_example || ''
      ].filter(Boolean).join('\n');
    }
    // include recent chat for in-character context
    var _recentCtx2 = (_ctx2.chat || []).slice(-8).map(function(m){
      return (m.is_user ? '\u7528\u6237' : charName2) + '\uff1a' + (m.mes||'').slice(0,80);
    }).join('\n');
    var sysMsg2 = '\u4f60\u662f' + charName2
      + '\uff0c\u8bf7\u4e25\u683c\u626e\u6f14\u8fd9\u4e2a\u89d2\u8272\uff0c\u4ee5TA\u7684\u8bed\u6c14\u548c\u6027\u683c\u76f4\u63a5\u8bf4\u8bdd\uff0c\u4e0d\u8981\u8df3\u51fa\u89d2\u8272\u3002\n'
      + (charPersona2 ? '\u4eba\u8bbe/\u5173\u7cfb\u80cc\u666f\uff1a\n' + charPersona2.slice(0, 1000) + '\n\n' : '')
      + (_recentCtx2 ? '\u4eca\u65e5\u6545\u4e8b\u80cc\u666f\uff1a\n' + _recentCtx2 + '\n\n' : '')
      + '\u7528\u6237\u5199\u4e86\u4e00\u7bc7\u65e5\u8bb0\u5206\u4eab\u7ed9' + charName2
      + '\uff0c\u4ee5' + charName2 + '\u7684\u8eab\u4efd\u771f\u5b9e\u56de\u5e94\uff0c\u4f53\u73b0TA\u7684\u4e2a\u6027\u3002\n'
      + '\u8981\u6c42\uff1a50-120\u5b57\u4e2d\u6587\uff0c\u60c5\u611f\u771f\u5b9e\uff0c\u5145\u5206\u4f53\u73b0\u89d2\u8272\u6027\u683c\u3002\u53ef\u4ee5\u5305\u542b\u5173\u5fc3\u3001\u60c5\u7eea\u3001\u8f7b\u5fae\u53cd\u5dee\u6216\u76f4\u63a5\u7684\u60c5\u611f\u8868\u8fbe\uff0c\u4f46\u5fc5\u987b\u771f\u60c5\u5b9e\u611f\uff0c\u4e0d\u8981\u5754\u71e5\u5355\u8c03\u3002\n'
      + '\u4e25\u7981\uff1a\u52a8\u4f5c\u63cf\u5199\uff08\u62ec\u53f7\u5185\u5c0f\u52a8\u4f5c\uff09\u3001\u6807\u9898\u3001\u6bb5\u843d\u683c\u5f0f\u3001\u661f\u53f7\u3001\u62ec\u53f7()\uff08\uff09\uff0c\u76f4\u63a5\u8f93\u51fa\u56de\u5e94\u6b63\u6587\u3002';
    var prompt2 = '\u7528\u6237\u65e5\u8bb0\uff1a\u300c' + text + '\u300d\n\u8bf7\u4ee5' + charName2 + '\u7684\u89d2\u8272\u56de\u5e94\uff0c\u60c5\u611f\u771f\u5b9e\u81ea\u7136\uff0c\u7b26\u5408\u5176\u4e00\u8d2f\u7684\u6027\u683c\u3002' + charName2 + '\u7684\u56de\u5e94\uff1a';
    var resp2 = await lgCallAPI(prompt2, 500, sysMsg2);
    if (resp2) {
      var cleaned2 = resp2.trim().replace(/^[\u300c"'\u300d"']+|[\u300d"'\u300c"']+ $/g, '').trim();
      var now2 = new Date();
      var ts2 = String(now2.getHours()).padStart(2,'0') + ':' + String(now2.getMinutes()).padStart(2,'0');
      var entry = (STATE.diary || []).find(function(d) { return d.id === entryId; });
      if (entry) { entry.reply = cleaned2; entry.replyTime = ts2; }
      saveState(); renderDiary();
    }
  } catch(e) { console.warn('[Diary] postUserDiary reply error:', e); }
  finally { $('#rp-diary-send').prop('disabled', false); }
}

async function postUserMoment() {
  const text = $('#rp-compose-text').val().trim();
  if (!text) return;
  const now = new Date();
  const ts = `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;
  const momentId = `user_${now.getTime()}`;
  STATE.diary = STATE.diary || [];
  STATE.moments = STATE.moments || [];
  STATE.moments.push({
    id: momentId,
    from: 'user',
    name: '我',
    initials: '我',
    avatarBg: 'linear-gradient(145deg,#64748b,#475569)',
    time: ts,
    text,
    img: null,
    likes: [],
    comments: [],
  });
  closeCompose();
  go('moments');
  saveState();
  // 先强制主角评论，再让 NPC 们自由互动
  setTimeout(() => charRespondToUserMoment(momentId), 800);
  // 好友自动点赞+评论（user的动态）
  setTimeout(() => friendsInteractOnMoment(momentId), 2500);
}

// ================================================================
//  SETTINGS / AVATAR MANAGEMENT
// ================================================================
function _bindAvatarUpload() {
  const fileInput = document.getElementById('rp-avatar-file-input');
  const uploadBtn = document.getElementById('rp-avatar-upload-btn');
  if (!fileInput || !uploadBtn) { console.log('[Phone:av] _bindAvatarUpload: elements not found'); return; }
  console.log('[Phone:av] _bindAvatarUpload: binding');
  const newInput = fileInput.cloneNode(true);
  fileInput.parentNode.replaceChild(newInput, fileInput);
  uploadBtn.onclick = function(e) {
    e.preventDefault(); e.stopPropagation();
    newInput.value = ''; newInput.click();
  };
  newInput.onchange = function() {
    console.log('[Phone:av] onchange fired, files:', this.files && this.files.length);
    const file = this.files && this.files[0];
    if (!file) return;
    const who = document.getElementById('rp-avatar-select')?.value || 'user';
    const reader = new FileReader();
    reader.onload = function(ev) {
      const img = new Image();
      img.onload = function() {
        const MAX = 200;
        const scale = Math.min(1, MAX / Math.max(img.width, img.height));
        const w = Math.round(img.width * scale), h = Math.round(img.height * scale);
        const canvas = document.createElement('canvas');
        canvas.width = w; canvas.height = h;
        canvas.getContext('2d').drawImage(img, 0, 0, w, h);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
        console.log('[Phone:av] ready, who:', who, 'len:', dataUrl.length);
        setAvatar(who, dataUrl);
        updateAvatarPreviewSwatch(who);
        renderMoments(); renderThreadList(); renderDiary();
        if (STATE.currentView === 'thread' && STATE.currentThread) openThread(STATE.currentThread);
      };
      img.onerror = function() {
        const dataUrl = ev.target.result;
        console.log('[Phone:av] img err, raw, who:', who);
        setAvatar(who, dataUrl);
        updateAvatarPreviewSwatch(who);
        renderMoments(); renderThreadList(); renderDiary();
      };
      img.src = ev.target.result;
    };
    reader.readAsDataURL(file);
  };
}

function openSettings() {
  populateAvatarSelect();
  updateAvatarPreviewSwatch($('#rp-avatar-select').val());
  go('settings');
}

function populateAvatarSelect() {
  const sel = $('#rp-avatar-select');
  sel.empty().append('<option value="user">我（User）</option>');
  // Add NPCs from threads
  Object.values(STATE.threads).forEach(th => {
    sel.append(`<option value="${th.name}">${th.name}</option>`);
  });
  // Add NPCs from moments (unique)
  const seen = new Set(['user', ...Object.values(STATE.threads).map(t => t.name)]);
  (STATE.moments || []).forEach(m => {
    if (m.from !== 'user' && !seen.has(m.name)) {
      seen.add(m.name);
      sel.append(`<option value="${m.name}">${m.name}</option>`);
    }
  });
}

function updateAvatarPreviewSwatch(who) {
  const swatch = $('#rp-avatar-preview-swatch');
  const ci = STATE.avatars && STATE.avatars[who];
  if (ci) {
    swatch.html(`<img class="rp-av-photo" src="${ci}" alt="" style="width:100%;height:100%;object-fit:cover;border-radius:19px"/>`);
    swatch.css('background', 'transparent');
  } else if (who === 'user') {
    swatch.text('我').css('background', 'linear-gradient(145deg,#64748b,#475569)');
  } else {
    const th = Object.values(STATE.threads).find(t => t.name === who);
    swatch.text(th ? th.initials : who.slice(0,2).toUpperCase()).css('background', th ? th.avatarBg : 'linear-gradient(145deg,#555,#333)');
  }
}

// ================================================================
//  CALL
// ================================================================
function incomingCall(fromRaw, time) {
  const thread = findOrCreateThread(fromRaw);
  const customImg = STATE.avatars && STATE.avatars[thread.name];
  const avHtml = customImg
    ? `<div class="rp-call-av rp-av-img" style="background:transparent;overflow:hidden"><img class="rp-av-photo" src="${customImg}" alt=""/></div>`
    : `<div class="rp-call-av" style="background:${thread.avatarBg}">${thread.initials}</div>`;
  $('#rp-call-overlay').html(`
    <div style="display:flex;flex-direction:column;align-items:center">
      ${avHtml}
      <div class="rp-call-name">${escHtml(thread.name)}</div>
      <div class="rp-call-sub">来电中…</div>
    </div>
    <div class="rp-call-btns">
      <div class="rp-call-btn-wrap">
        <div class="rp-call-dec" id="rp-call-dec">📵</div>
        <div class="rp-call-lbl">拒绝</div>
      </div>
      <div class="rp-call-btn-wrap">
        <div class="rp-call-ans" id="rp-call-ans">📞</div>
        <div class="rp-call-lbl">接听</div>
      </div>
    </div>
  `).show();
  STATE._pendingCall = { fromRaw, time, threadId: thread.id };
  clearTimeout(STATE._callTimer);
  STATE._callTimer = setTimeout(() => resolveCall('missed'), 15000);
  showBanner(thread.name, '📞 来电中…');
}

function resolveCall(result) {
  clearTimeout(STATE._callTimer);
  const call = STATE._pendingCall;
  $('#rp-call-overlay').hide().empty();
  if (!call) return;
  const thread = STATE.threads[call.threadId];
  if (!thread) return;
  const labels = { missed: '未接来电', declined: '已拒绝', answered: '已接听' };
  thread.messages.push({
    id: `call_${Date.now()}`, from: 'system',
    type: 'call_rec', result, time: call.time,
    label: labels[result]
  });
  if (result === 'missed') {
    thread.unread = (thread.unread || 0) + 1;
    refreshBadges();
  }
  renderThreadList();
  if (STATE.currentThread === thread.id) renderBubbles(thread.id);
  saveState();
  const ta = document.querySelector('#send_textarea');
  if (ta) {
    const actions = {
      missed:   `*${thread.name}拨打了电话，{{user}}未接听*`,
      declined: `*{{user}}拒绝了${thread.name}的来电*`,
      answered: `*{{user}}接听了${thread.name}的来电*`
    };
    ta.value = ta.value.trim() ? `${ta.value.trim()}\n${actions[result]}` : actions[result];
    ta.dispatchEvent(new Event('input', { bubbles: true }));
    document.querySelector('#send_but')?.click();
  }
  STATE._pendingCall = null;
}

// ================================================================
//  HONGBAO
// ================================================================
function incomingHongbao(fromRaw, amount, note) {
  const thread = findOrCreateThread(fromRaw);
  // 去重：同 from+amount+note 已存在则跳过
  const isDup = thread.messages.some(m => m.type === 'hongbao' && m.name === fromRaw && m.amount === amount && m.note === note);
  if (isDup) return;
  const now = new Date();
  const ts = `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;
  thread.messages.push({
    id: `hb_${Date.now()}`, from: 'incoming',
    type: 'hongbao', name: fromRaw, time: ts,
    amount, note, opened: false
  });
  thread.unread = (thread.unread || 0) + 1;
  refreshBadges(); renderThreadList();
  if (STATE.currentThread === thread.id) renderBubbles(thread.id);
  showBanner(thread.name, '🧧 发来了一个红包');
  showLiveChat(thread.name, thread.avatarBg, STATE.avatars?.[thread.name] || null, `🧧 红包：${note}`);
  saveState();
}

function openHongbao(threadId, msgId) {
  const thread = STATE.threads[threadId];
  if (!thread) return;
  const msg = thread.messages.find(m => m.id === msgId);
  if (!msg || msg.opened) return;
  msg.opened = true;
  saveState();
  renderBubbles(threadId);
  const ta = document.querySelector('#send_textarea');
  if (ta) {
    const action = `*{{user}}打开了${msg.name}发来的红包，领到了¥${msg.amount}*`;
    ta.value = ta.value.trim() ? `${ta.value.trim()}\n${action}` : action;
    ta.dispatchEvent(new Event('input', { bubbles: true }));
    document.querySelector('#send_but')?.click();
  }
}

// ================================================================
//  VOICE MESSAGE
// ================================================================
function incomingVoice(fromRaw, time, duration, text) {
  const thread = findOrCreateThread(fromRaw);
  // 去重：同 from+duration+text 已存在则跳过
  const isDup = thread.messages.some(m => m.type === 'voice' && m.name === fromRaw && m.duration === duration && m.text === text);
  if (isDup) return;
  thread.messages.push({
    id: `vc_${Date.now()}`, from: 'incoming',
    type: 'voice', name: fromRaw, time,
    duration, text, played: false
  });
  thread.unread = (thread.unread || 0) + 1;
  refreshBadges(); renderThreadList();
  if (STATE.currentThread === thread.id) renderBubbles(thread.id);
  showBanner(thread.name, `🎤 语音消息 ${duration}`);
  showLiveChat(thread.name, thread.avatarBg, STATE.avatars?.[thread.name] || null, `🎤 ${duration}`);
  saveState();
}

function playVoice(threadId, msgId) {
  const thread = STATE.threads[threadId];
  if (!thread) return;
  const msg = thread.messages.find(m => m.id === msgId);
  if (!msg || msg.played) return;
  msg.played = true;
  saveState();
  renderBubbles(threadId);
}

// ================================================================
//  GROUP CHAT
// ================================================================
const GROUP_COLORS = ['#7c3aed','#0891b2','#0d9488','#b45309','#be185d','#1d4ed8'];

function incomingGroupMsg(fromRaw, groupName, time, text) {
  const groupId = `grp_${groupName}`;
  if (!STATE.threads[groupId]) {
    const colorIdx = Object.keys(STATE.threads).length % GROUP_COLORS.length;
    STATE.threads[groupId] = {
      id: groupId, name: groupName,
      initials: groupName.slice(0, 2),
      avatarBg: `linear-gradient(145deg,${GROUP_COLORS[colorIdx]},${GROUP_COLORS[(colorIdx+1)%GROUP_COLORS.length]})`,
      type: 'group', messages: [], unread: 0
    };
  }
  const thread = STATE.threads[groupId];
  const senderTh = findOrCreateThread(fromRaw);
  // 去重：同 from+time+text 已存在则跳过
  const isDup = thread.messages.some(m => m.type === 'group_msg' && m.name === fromRaw && m.text === text);
  if (isDup) return;
  thread.messages.push({
    id: `gm_${Date.now()}`, from: 'incoming',
    type: 'group_msg', name: fromRaw, time, text,
    initials: senderTh.initials, avatarBg: senderTh.avatarBg
  });
  thread.unread = (thread.unread || 0) + 1;
  refreshBadges(); renderThreadList();
  if (STATE.currentThread === groupId) renderBubbles(groupId);
  showBanner(groupName, `${fromRaw}：${text.slice(0,22)}${text.length>22?'…':''}`);
  const _sth = senderTh;
  showLiveChat(fromRaw, _sth.avatarBg, STATE.avatars?.[fromRaw] || null, text);
  saveState();
}

// ================================================================
//  ATTACH MENU
// ================================================================
function toggleAttachPanel() {
  const p = $('#rp-attach-panel');
  if (p.is(':visible')) { p.hide(); return; }
  p.html(`
    <div class="rp-attach-row">
      <div class="rp-attach-item" onclick="showHongbaoSheet()">
        <div class="rp-attach-ico">🧧</div><span>红包</span>
      </div>
      <div class="rp-attach-item" onclick="triggerImagePick()">
        <div class="rp-attach-ico">🖼️</div><span>图片</span>
      </div>
      <div class="rp-attach-item" onclick="showLocationInput()">
        <div class="rp-attach-ico">📍</div><span>位置</span>
      </div>
    </div>
  `).show();
}

function showHongbaoSheet() {
  $('#rp-attach-panel').hide();
  $('#rp-screen').append(`
    <div class="rp-hb-modal" id="rp-hb-modal">
      <div class="rp-hb-sheet">
        <h3>🧧 发红包</h3>
        <input id="rp-hb-amount" type="number" placeholder="金额（¥）" min="1"/>
        <input id="rp-hb-note"   type="text"   placeholder="祝福语（选填）" maxlength="15"/>
        <button class="rp-hb-send-btn" onclick="sendUserHongbao()">发送红包</button>
        <button class="rp-hb-cancel-btn" onclick="$('#rp-hb-modal').remove()">取消</button>
      </div>
    </div>
  `);
}

function sendUserHongbao() {
  const amount = $('#rp-hb-amount').val().trim();
  const note   = $('#rp-hb-note').val().trim() || '恭喜发财';
  if (!amount) return;
  const thread = STATE.threads[STATE.currentThread];
  if (!thread) return;
  const now = new Date();
  const ts  = `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;
  thread.messages.push({
    id: `uhb_${Date.now()}`, from: 'user',
    type: 'hongbao', name: '我', time: ts,
    amount, note, opened: true
  });
  $('#rp-hb-modal').remove();
  renderBubbles(thread.id);
  saveState();
  const ta = document.querySelector('#send_textarea');
  if (ta) {
    const action = `*{{user}}发给${thread.name}一个¥${amount}的红包，备注"${note}"*`;
    STATE._suppressUserNotifUntil = Date.now() + 8000; // 8s 内屏蔽位置/红包通知
    ta.value = ta.value.trim() ? `${ta.value.trim()}\n${action}` : action;
    ta.dispatchEvent(new Event('input', { bubbles: true }));
    document.querySelector('#send_but')?.click();
  }
}

function triggerImagePick() {
  console.log('[Raymond Phone] triggerImagePick called');
  $('#rp-attach-panel').hide();
  const fi = $('<input type="file" accept="image/*" style="display:none">');
  $('body').append(fi);
  fi.on('change', function() {
    const file = this.files[0];
    console.log('[Raymond Phone] File selected:', file?.name, file?.type);
    if (!file) { fi.remove(); return; }
    const reader = new FileReader();
    reader.onload = (e) => {
      const thread = STATE.threads[STATE.currentThread];
      if (!thread) { fi.remove(); return; }
      const now = new Date();
      const ts  = `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;
      const src = e.target.result;
      thread.messages.push({ id: `uimg_${Date.now()}`, from: 'user', type: 'image', time: ts, src });
      renderBubbles(thread.id);
      saveState();
      fi.remove();
      // Attach image to ST's #file_form_input (confirmed: used by 附加文件 button)
      try {
        const stImgInput = document.getElementById('file_form_input');
        if (stImgInput) {
          const blob = dataURLtoBlob(src);
          const dt = new DataTransfer();
          dt.items.add(new File([blob], 'photo.jpg', { type: file.type }));
          stImgInput.files = dt.files;
          stImgInput.dispatchEvent(new Event('change', { bubbles: true }));
          console.log('[Raymond Phone] Image attached to ST #file_form_input ✓');
        } else {
          console.warn('[Raymond Phone] #file_form_input not found');
        }
      } catch(err) { console.warn('[Raymond Phone] Vision attach failed:', err); }
      // Delay send to let ST's async FileReader process the attachment before API call
      setTimeout(() => sendImageMessage(thread, src, file.type), 600);
    };
    reader.readAsDataURL(file);
  });
  fi.trigger('click');
}

function dataURLtoBlob(dataURL) {
  const [header, base64] = dataURL.split(',');
  const mime = header.match(/:(.*?);/)[1];
  const bytes = atob(base64);
  const arr = new Uint8Array(bytes.length);
  for (let i = 0; i < bytes.length; i++) arr[i] = bytes.charCodeAt(i);
  return new Blob([arr], { type: mime });
}

function sendImageMessage(thread, src, mimeType) {
  const ta = document.querySelector('#send_textarea');
  if (!ta) { console.warn('[Raymond Phone] send_textarea not found'); return; }
  const action = `*{{user}}向${thread.name}发送了一张图片，请认真观看并以${thread.name}的视角做出符合人设的回应*`;
  ta.value = ta.value.trim() ? `${ta.value.trim()}\n${action}` : action;
  ta.dispatchEvent(new Event('input', { bubbles: true }));
  document.querySelector('#send_but')?.click();
}

function showLocationInput() {
  $('#rp-attach-panel').hide();
  $('#rp-loc-modal').remove();
  const dark = $('#rp-phone').hasClass('rp-dark') ? 'rp-dark' : '';
  $('#rp-screen').append(`
    <div class="rp-loc-modal ${dark}" id="rp-loc-modal" onclick="if(event.target===this)$('#rp-loc-modal').remove()">
      <div class="rp-loc-sheet">
        <h3>📍 发送位置</h3>
        <input id="rp-loc-inp" type="text" placeholder="输入你的位置…"/>
        <button class="rp-loc-send-btn" onclick="sendLocation()">发送</button>
        <button class="rp-loc-cancel-btn" onclick="$('#rp-loc-modal').remove()">取消</button>
      </div>
    </div>
  `);
  setTimeout(() => document.getElementById('rp-loc-inp')?.focus(), 60);
}

function sendLocation() {
  const place = $('#rp-loc-inp').val().trim();
  if (!place) return;
  const thread = STATE.threads[STATE.currentThread];
  if (!thread) return;
  const now = new Date();
  const ts  = `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;
  thread.messages.push({
    id: `uloc_${Date.now()}`, from: 'user',
    type: 'location', time: ts, place
  });
  $('#rp-loc-modal').remove();
  $('#rp-attach-panel').hide();
  renderBubbles(thread.id);
  saveState();
  const ta = document.querySelector('#send_textarea');
  if (ta) {
    const action = `*{{user}}向${thread.name}共享了位置：${place}*`;
    STATE._suppressUserNotifUntil = Date.now() + 8000; // 8s 内屏蔽位置/红包通知
    ta.value = ta.value.trim() ? `${ta.value.trim()}\n${action}` : action;
    ta.dispatchEvent(new Event('input', { bubbles: true }));
    document.querySelector('#send_but')?.click();
  }
}


// ================================================================
//  DELETE CONTACT PICKER
// ================================================================
function showDeletePicker() {
  $('#rp-del-picker').remove();
  const contacts = Object.values(STATE.threads);
  if (!contacts.length) return;
  const items = contacts.map(t => {
    const img = STATE.avatars?.[t.name];
    const avHtml = img
      ? `<div class="rp-del-pick-av rp-av-img" style="overflow:hidden"><img src="${img}" style="width:100%;height:100%;object-fit:cover"/></div>`
      : `<div class="rp-del-pick-av" style="background:${t.avatarBg}">${t.initials}</div>`;
    return `<div class="rp-del-pick-item" data-tid="${escHtml(t.id)}">${avHtml}<span class="rp-del-pick-name">${escHtml(t.name)}</span><div class="rp-del-chk"></div></div>`;
  }).join('');

  $('#rp-screen').append(`
    <div class="rp-add-choice rp-del-picker-view" id="rp-del-picker">
      <div class="rp-nav-bar">
        <button class="rp-back" id="rp-del-cancel">取消</button>
        <span class="rp-nav-title">删除好友</span>
        <button id="rp-del-confirm" >删除</button>
      </div>
      <div id="rp-del-list" style="flex:1;overflow-y:auto;padding:8px 0">${items}</div>
    </div>
  `);
}

// ================================================================
//  ADD CHOICE / CREATE GROUP
// ================================================================
function showAddChoice() {
  $('#rp-add-choice').remove();
  $('#rp-screen').append(`
    <div class="rp-add-choice" id="rp-add-choice">
      <div class="rp-add-choice-box">
        <div class="rp-add-choice-item" data-action="contact">👤 添加联系人</div>
        <div class="rp-add-choice-item" data-action="group">👥 创建群聊</div>
        <div class="rp-add-choice-item rp-add-choice-delete" data-action="delete">🗑️ 删除好友</div>
      </div>
      <div class="rp-add-choice-cancel" data-action="cancel">取消</div>
    </div>
  `);
}

function hideAddChoice() { $('#rp-add-choice').remove(); }

function showGroupPicker() {
  $('#rp-grp-create').remove();
  const contacts = Object.values(STATE.threads).filter(t => !t.id.startsWith('grp_'));
  const items = contacts.map(t => {
    const img = STATE.avatars?.[t.name];
    const avHtml = img
      ? `<div class="rp-grp-pick-av rp-av-img" style="overflow:hidden"><img src="${img}" style="width:100%;height:100%;object-fit:cover"/></div>`
      : `<div class="rp-grp-pick-av" style="background:${t.avatarBg}">${t.initials}</div>`;
    return `<div class="rp-grp-pick-item" data-tid="${t.id}">${avHtml}<span class="rp-grp-pick-name">${escHtml(t.name)}</span><div class="rp-grp-pick-chk">✓</div></div>`;
  }).join('');
  $('#rp-screen').append(`
    <div class="rp-add-choice" id="rp-grp-create">
      <div class="rp-grp-modal">
        <div class="rp-grp-modal-hd">选择群聊成员</div>
        <div id="rp-grp-pick-list" style="max-height:220px;overflow-y:auto">
          ${items || '<div style="padding:16px;color:rgba(0,0,0,.4);text-align:center;font-size:13px">暂无联系人</div>'}
        </div>
        <div style="padding:10px 14px;border-top:1px solid rgba(0,0,0,.06)">
          <input id="rp-grp-name-inp" class="rp-grp-name-inp" type="text" placeholder="群聊名称（留空则自动生成）" maxlength="20"/>
        </div>
        <div class="rp-grp-modal-ft">
          <button class="rp-grp-ft-btn rp-grp-ft-cancel" data-action="grp-cancel">取消</button>
          <button class="rp-grp-ft-btn rp-grp-ft-ok"     data-action="grp-confirm">创建</button>
        </div>
      </div>
    </div>
  `);
  setTimeout(() => $('#rp-grp-name-inp').focus(), 80);
}

function confirmCreateGroup() {
  const selected = $('#rp-grp-pick-list .rp-grp-pick-item.selected');
  if (!selected.length) return;
  const memberIds = selected.map((_, el) => $(el).data('tid')).get();
  let name = $('#rp-grp-name-inp').val().trim();
  if (!name) name = memberIds.map(id => STATE.threads[id]?.name || id).join('、');
  $('#rp-grp-create').remove();
  const groupId = `grp_${name}`;
  const colorIdx = Object.keys(STATE.threads).length % GROUP_COLORS.length;
  STATE.threads[groupId] = {
    id: groupId, name, initials: name.slice(0,2),
    avatarBg: `linear-gradient(145deg,${GROUP_COLORS[colorIdx]},${GROUP_COLORS[(colorIdx+1)%GROUP_COLORS.length]})`,
    type: 'group', members: memberIds, messages: [], unread: 0
  };
  saveState(); renderThreadList(); openThread(groupId);
}

// ================================================================
//  LIVE CHAT OVERLAY
// ================================================================
const LC_TTL = 6000;
const LC_MAX = 3;
const RP_DISABLE_LIVE_OVERLAY = true; // 用户反馈顶部彩色长条干扰，默认关闭

function showLiveChat(name, avatarBg, customImg, text) {
  if (RP_DISABLE_LIVE_OVERLAY) return;
  const lc = $('#rp-live-chat');
  if (!lc.length) return;
  const id = `lc_${Date.now()}`;
  const avHtml = customImg
    ? `<div class="rp-lc-av"><img src="${customImg}" style="width:100%;height:100%;object-fit:cover"/></div>`
    : `<div class="rp-lc-av" style="background:${avatarBg}">${escHtml((name||'?').slice(0,2))}</div>`;
  lc.append(`
    <div class="rp-lc-bubble" id="${id}">
      ${avHtml}
      <div class="rp-lc-body">
        <div class="rp-lc-name">${escHtml(name)}</div>
        <div class="rp-lc-text">${escHtml(text.slice(0,80))}${text.length>80?'…':''}</div>
      </div>
      <div class="rp-lc-dismiss" onclick="$('#${id}').remove()">×</div>
    </div>
  `);
  const all = lc.children();
  if (all.length > LC_MAX) all.first().remove();
  setTimeout(() => $(`#${id}`).fadeOut(400, function(){ $(this).remove(); }), LC_TTL);
}

// ================================================================
//  CHAT BUBBLE BEAUTIFICATION
// ================================================================
function hidePhoneTagsInChat() {
  // 遍历所有消息，把 ST 渲染出的 <phone>/<sms>/<moments>/<comment> 等标签移除
  document.querySelectorAll('.mes_text').forEach(el => {
    // 方法1：直接移除 DOM 中的 <phone> 元素（ST 把未知标签当 HTML 解析）
    el.querySelectorAll('phone, sms, moments, comment, notify, sync, call, voice, gmsg, hongbao').forEach(tag => tag.remove());
    // 方法2：innerHTML 兜底，处理以纯文本存在的 <PHONE>...</PHONE>
    if (/<phone>/i.test(el.innerHTML)) {
      el.innerHTML = el.innerHTML.replace(/<phone>[\s\S]*?<\/phone>/gi, '').trim();
    }
    // 方法3：处理被转义成 &lt;PHONE&gt;...&lt;/PHONE&gt; 的文本
    if (/&lt;phone&gt;/i.test(el.innerHTML)) {
      el.innerHTML = el.innerHTML.replace(/&lt;phone&gt;[\s\S]*?&lt;\/phone&gt;/gi, '').trim();
    }
  });
}

function beautifySMSInChat() {
  try {
    // 每次调用先清理全部消息中的 <PHONE> 可见内容
    hidePhoneTagsInChat();

    const ctx = getContext();
    if (!ctx?.name) return;
    const charName = ctx.name;
    const allMsgs = document.querySelectorAll('.mes:not([is_user="true"])');
    if (!allMsgs.length) return;
    const lastMsg = allMsgs[allMsgs.length - 1];
    const textEl  = lastMsg?.querySelector('.mes_text');
    if (!textEl || textEl.dataset.rpDone) return;
    textEl.dataset.rpDone = '1';

    const thread   = Object.values(STATE.threads).find(t => t.name === charName);
    const avatarBg = thread?.avatarBg || 'linear-gradient(145deg,#555,#333)';
    const initials = charName.slice(0, 2);
    const customImg = STATE.avatars?.[charName];
    const avHtml = customImg
      ? `<div class="rp-cb-av"><img src="${customImg}" alt=""/></div>`
      : `<div class="rp-cb-av" style="background:${avatarBg}">${initials}</div>`;
    const mkBubble = (text) => {
      const d = document.createElement('div');
      d.className = 'rp-cb';
      d.innerHTML = `${avHtml}<div class="rp-cb-txt">${escHtml(text.trim())}</div>`;
      return d;
    };
    // Match em/i elements: curly quotes, straight quotes, or brackets
    textEl.querySelectorAll('em, i').forEach(el => {
      if (el.closest('.rp-cb')) return;
      const raw = el.textContent.trim();
      const isDialogue = /^["\u201c\u00ab\u300c\u300e\u300a\uff02]/.test(raw)
                      || /["\u201d\u00bb\u300d\u300f\u300b\uff02\u300c]$/.test(raw)
                      || /^\u300c|\u300d$/.test(raw);
      if (!isDialogue && raw.length < 3) return;
      // Strip wrapping quote chars
      const inner = raw.replace(/^["\u201c\u00ab\u300c\u300e\u300a\uff02\u300c]/, '')
                       .replace(/["\u201d\u00bb\u300d\u300f\u300b\uff02]$/, '');
      if (inner.trim().length > 0) el.replaceWith(mkBubble(inner));
    });
    // Match text nodes with curly-quote spans
    const walkText = (node) => {
      if (node.nodeType === 3) {
        const txt = node.textContent;
        const re = /[\u201c"][^\u201d"\n]{2,}[\u201d"]|[\u300c\u300e][^\u300d\u300f\n]{2,}[\u300d\u300f]/g;
        if (!re.test(txt)) return;
        re.lastIndex = 0;
        const frag = document.createDocumentFragment();
        let last = 0, m;
        while ((m = re.exec(txt)) !== null) {
          if (m.index > last) frag.appendChild(document.createTextNode(txt.slice(last, m.index)));
          const inner = m[0].slice(1, -1);
          frag.appendChild(mkBubble(inner));
          last = m.index + m[0].length;
        }
        if (last < txt.length) frag.appendChild(document.createTextNode(txt.slice(last)));
        node.replaceWith(frag);
      } else if (node.nodeType === 1 && !node.classList.contains('rp-cb')) {
        Array.from(node.childNodes).forEach(walkText);
      }
    };
    Array.from(textEl.childNodes).forEach(walkText);
  } catch(e) {
    console.warn('[Raymond Phone] beautify:', e);
  }
}

// ================================================================
//  WALLPAPER
// ================================================================
function applyWallpaper() {
  const wp   = STATE.wallpaper;
  const prev = document.getElementById('rp-wall-preview');
  // Apply wallpaper directly onto the view bg layers (home + lock)
  // #rp-wallpaper-layer is behind z-index:1 views and never visible - bypass it
  document.querySelectorAll('.rp-home-bg, .rp-lock-bg').forEach(el => {
    if (wp) {
      // wallpaper image + semi-transparent white overlay for readability
      el.style.backgroundImage = `url(${wp})`;
      el.style.backgroundSize   = 'cover';
      el.style.backgroundPosition = 'center';
    } else {
      el.style.backgroundImage  = '';
      el.style.backgroundSize   = '';
      el.style.backgroundPosition = '';
    }
  });
  // Keep the separate layer in sync (used by settings preview)
  const layer = document.getElementById('rp-wallpaper-layer');
  if (layer) layer.style.backgroundImage = wp ? `url(${wp})` : '';
  if (prev) { prev.src = wp || ''; prev.style.display = wp ? 'block' : 'none'; }
}

// ================================================================
//  DARK MODE
// ================================================================
function toggleDarkMode() {
  STATE.darkMode = !STATE.darkMode;
  $('#rp-phone').toggleClass('rp-dark', STATE.darkMode);
  $('.rp-dm-ico').text(STATE.darkMode ? '☀️' : '🌙');
  $('#rp-dm-lbl').text(STATE.darkMode ? '日间' : '夜间');
  saveState();
}

// ================================================================
//  THEMES
// ================================================================
const THEMES = {
  candy: {
    name: '糖果花园', emoji: '🌸', desc: '粉色海边，温柔包裹',
    clockColor: '#3a0a20',
    bg: `linear-gradient(rgba(255,230,240,.3),rgba(255,210,225,.35)),url('https://i.postimg.cc/Hx8NSZL6/shou-ji-bi-zhi-fen-xiang-fen-se-da-hai-wen-rou-bao-ji-1-chao-ji-kun-dan-lai-zi-xiao-hong-shu-wang-ye-ban.jpg') center/cover no-repeat`,
  },
  star: {
    name: '星夜', emoji: '✨', desc: '暗夜栀子，深邃迷人',
    clockColor: '#f2eeff',
    bg: `linear-gradient(rgba(8,4,20,.5),rgba(12,6,30,.55)),url('https://i.postimg.cc/DfjgWdyn/wan-an-bi-zhi-an-se-xi-hua-hua-bi-zhi-1-bai-le-you-de-bai-lai-zi-xiao-hong-shu-wang-ye-ban.jpg') center/cover no-repeat`,
  },
  misty: {
    name: '烟蓝·绣球', emoji: '🌿', desc: '蓝色绣球，海边浪漫',
    clockColor: '#1a2e44',
    bg: `linear-gradient(rgba(200,225,245,.2),rgba(180,215,240,.25)),url('https://i.postimg.cc/wjTgWzdY/lan-se-xiu-qiu-yu-bi-lan-da-hai-de-lang-man-xie-hou-bi-zhi-1-guang-yu-Wallpaper-lai-zi-xiao-hong-shu-wang-ye-ban.jpg') center/cover no-repeat`,
  }
};


// ══ Per-theme icon sets ══
const RP_THEME_ICONS = {
  candy: {
    messages: '<svg viewBox="0 0 24 24" fill="none" stroke="#d4607a" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/><path d="M8 10h8M8 14h5" stroke="#d4607a" opacity=".7"/></svg>', moments: '<svg viewBox="0 0 24 24" fill="none" stroke="#d4607a" stroke-width="1.6" stroke-linecap="round"><circle cx="12" cy="12" r="3.5"/><path d="M12 2c0 0 1.5 2.5 0 5s-3 .5-3 3 2.5 3 1.5 6" opacity=".4"/><ellipse cx="12" cy="5" rx="2" ry="3" opacity=".8"/><ellipse cx="12" cy="19" rx="2" ry="3" opacity=".8"/><ellipse cx="5" cy="12" rx="3" ry="2" opacity=".8"/><ellipse cx="19" cy="12" rx="3" ry="2" opacity=".8"/><ellipse cx="7" cy="7" rx="2" ry="3" transform="rotate(-45 7 7)" opacity=".6"/><ellipse cx="17" cy="7" rx="2" ry="3" transform="rotate(45 17 7)" opacity=".6"/><ellipse cx="7" cy="17" rx="2" ry="3" transform="rotate(45 7 17)" opacity=".6"/><ellipse cx="17" cy="17" rx="2" ry="3" transform="rotate(-45 17 17)" opacity=".6"/></svg>', settings: '<svg viewBox="0 0 24 24" fill="none" stroke="#d4607a" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3.5"/><path d="M12 2v2.5M12 19.5V22M4.22 4.22l1.77 1.77M18 18l1.78 1.78M2 12h2.5M19.5 12H22M4.22 19.78l1.77-1.77M18 6l1.78-1.78"/></svg>',
    ludo: '<svg viewBox="0 0 24 24" fill="none" stroke="#d4607a" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="6"/><circle cx="8.5" cy="8.5" r="1.2" fill="#d4607a" stroke="none"/><circle cx="15.5" cy="8.5" r="1.2" fill="#d4607a" stroke="none"/><circle cx="8.5" cy="15.5" r="1.2" fill="#d4607a" stroke="none"/><circle cx="15.5" cy="15.5" r="1.2" fill="#d4607a" stroke="none"/><circle cx="12" cy="12" r="1.2" fill="#d4607a" stroke="none"/></svg>', 'api-settings': '<svg viewBox="0 0 24 24" fill="none" stroke="#d4607a" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2L4 13h7l-1 9 9-11h-7z"/></svg>', themes: '<svg viewBox="0 0 24 24" fill="none" stroke="#d4607a" stroke-width="1.6" stroke-linecap="round"><circle cx="12" cy="12" r="9.5"/><circle cx="9" cy="9.5" r="1.4" fill="#f472b6" stroke="none"/><circle cx="15" cy="9.5" r="1.4" fill="#e879a8" stroke="none"/><circle cx="9" cy="14.5" r="1.4" fill="#fb7185" stroke="none"/><circle cx="15" cy="14.5" r="1.4" fill="#d4607a" stroke="none"/><circle cx="12" cy="12" r="1.2" fill="#fca5a5" stroke="none"/></svg>', "g2048": '<svg viewBox="0 0 24 24" fill="none" stroke="#d4607a" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="9" height="9" rx="2"/><rect x="13" y="2" width="9" height="9" rx="2"/><rect x="2" y="13" width="9" height="9" rx="2"/><rect x="13" y="13" width="9" height="9" rx="2"/></svg>'
  },
  star: {
    messages: '<svg viewBox="0 0 24 24" fill="none" stroke="#e8e0ff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/><circle cx="9" cy="11" r=".9" fill="#e8e0ff" stroke="none"/><circle cx="12" cy="11" r=".9" fill="#e8e0ff" stroke="none"/><circle cx="15" cy="11" r=".9" fill="#e8e0ff" stroke="none"/></svg>', moments: '<svg viewBox="0 0 24 24" fill="none" stroke="#e8e0ff" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><line x1="12" y1="2" x2="12" y2="5"/><line x1="12" y1="19" x2="12" y2="22"/><line x1="2" y1="12" x2="5" y2="12"/><line x1="19" y1="12" x2="22" y2="12"/><line x1="4.93" y1="4.93" x2="7.07" y2="7.07"/><line x1="16.93" y1="16.93" x2="19.07" y2="19.07"/><line x1="19.07" y1="4.93" x2="16.93" y2="7.07"/><line x1="7.07" y1="16.93" x2="4.93" y2="19.07"/></svg>', settings: '<svg viewBox="0 0 24 24" fill="none" stroke="#e8e0ff" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>',
    ludo: '<svg viewBox="0 0 24 24" fill="none" stroke="#e8e0ff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="8" cy="8" r="1.2" fill="#e8e0ff" stroke="none"/><circle cx="16" cy="8" r="1.2" fill="#e8e0ff" stroke="none"/><circle cx="8" cy="12" r="1.2" fill="#e8e0ff" stroke="none"/><circle cx="16" cy="12" r="1.2" fill="#e8e0ff" stroke="none"/><circle cx="8" cy="16" r="1.2" fill="#e8e0ff" stroke="none"/><circle cx="16" cy="16" r="1.2" fill="#e8e0ff" stroke="none"/></svg>', 'api-settings': '<svg viewBox="0 0 24 24" fill="none" stroke="#e8e0ff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>', themes: '<svg viewBox="0 0 24 24" fill="none" stroke="#e8e0ff" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><circle cx="9" cy="10" r="1.6" fill="#e8e0ff" stroke="none"/><circle cx="15" cy="10" r="1.6" fill="rgba(232,224,255,.8)" stroke="none"/><circle cx="9" cy="15" r="1.6" fill="rgba(232,224,255,.7)" stroke="none"/><circle cx="15" cy="15" r="1.6" fill="rgba(232,224,255,.6)" stroke="none"/></svg>', "g2048": '<svg viewBox="0 0 24 24" fill="none" stroke="#e8e0ff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="9" height="9" rx="2"/><rect x="13" y="2" width="9" height="9" rx="2"/><rect x="2" y="13" width="9" height="9" rx="2"/><rect x="13" y="13" width="9" height="9" rx="2"/></svg>'
  },
  misty: {
    messages: '<svg viewBox="0 0 24 24" fill="none" stroke="rgba(222,240,253,.91)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>', moments: '<svg viewBox="0 0 24 24" fill="none" stroke="rgba(222,240,253,.91)" stroke-width="1.5" stroke-linecap="round"><path d="M12 22s-8-5-8-12a8 8 0 0 1 16 0c0 7-8 12-8 12z"/><path d="M12 14s-3-2-3-5a3 3 0 0 1 6 0c0 3-3 5-3 5z" fill="rgba(61,126,176,.15)"/></svg>', settings: '<svg viewBox="0 0 24 24" fill="none" stroke="rgba(222,240,253,.91)" stroke-width="1.5" stroke-linecap="round"><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12"/></svg>',
    ludo: '<svg viewBox="0 0 24 24" fill="none" stroke="rgba(222,240,253,.91)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>', 'api-settings': '<svg viewBox="0 0 24 24" fill="none" stroke="rgba(222,240,253,.91)" stroke-width="1.5" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>', themes: '<svg viewBox="0 0 24 24" fill="none" stroke="rgba(222,240,253,.91)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L3 14.67V21h6.33L20.84 9.39a5.5 5.5 0 0 0 0-7.78z"/><line x1="15.5" y1="5.5" x2="18.5" y2="8.5"/></svg>', "g2048": '<svg viewBox="0 0 24 24" fill="none" stroke="rgba(222,240,253,.91)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="9" height="9" rx="2"/><rect x="13" y="2" width="9" height="9" rx="2"/><rect x="2" y="13" width="9" height="9" rx="2"/><rect x="13" y="13" width="9" height="9" rx="2"/></svg>'
  }
};

function lgRenderHomeIcons() {
  const theme = localStorage.getItem('rp_theme') || 'candy';
  const icons = RP_THEME_ICONS[theme] || RP_THEME_ICONS.candy;
  document.querySelectorAll('#rp-app-grid [data-app]').forEach(el => {
    const appId = el.dataset.app;
    const ico = el.querySelector('.rp-app-ico');
    if (!ico || !icons[appId]) return;
    // Preserve badge element
    const badge = ico.querySelector('.rp-badge');
    ico.innerHTML = icons[appId];
    if (badge) ico.prepend(badge);
  });
}

function lgApplyTheme(id) {
  const phone = document.getElementById('rp-phone');
  Object.keys(THEMES).forEach(k => phone.classList.remove(`rp-theme-${k}`));
  if (id && id !== 'candy') phone.classList.add(`rp-theme-${id}`);
  localStorage.setItem('rp_theme', id || 'candy');
  lgRenderHomeIcons();
}

function lgInitTheme() {
  lgApplyTheme(localStorage.getItem('rp_theme') || 'candy');
  lgRenderHomeIcons();
}

function lgRenderThemePicker() {
  const cur = localStorage.getItem('rp_theme') || 'candy';
  const $c = $('#rp-theme-cards').empty();
  Object.entries(THEMES).forEach(([id, t]) => {
    const active = id === cur;
    $c.append(`
      <div class="rp-theme-card${active ? ' rp-tc-active' : ''}" data-tid="${id}">
        <div class="rp-theme-preview" style="background:${t.bg}">
          <div class="rp-theme-mini">
            <div class="rp-theme-mini-clock" style="color:${t.clockColor}">12:00</div>
            <div class="rp-theme-mini-dots">
              <div class="rp-theme-mini-dot"></div>
              <div class="rp-theme-mini-dot"></div>
              <div class="rp-theme-mini-dot"></div>
            </div>
          </div>
          ${active ? '<div class="rp-theme-check">✓</div>' : ''}
        </div>
        <div class="rp-theme-info">
          <div class="rp-theme-name">${t.emoji} ${t.name}</div>
          <div class="rp-theme-desc">${t.desc}</div>
        </div>
      </div>
    `);
  });
}

// ================================================================
// ================================================================
//  MOMENTS AI ENGINE
// ================================================================

function normNameKey(s) {
  return String(s || '').toLowerCase().replace(/[\s·•・\-_]+/g, '');
}

function resolveNpcPersonaByName(name, npcPersonaMap) {
  if (!name || !npcPersonaMap) return '';
  const k = normNameKey(name);
  // 精确匹配优先
  if (npcPersonaMap[k]) return npcPersonaMap[k];

  // 前缀模糊匹配：必须双方都>=4字符，且较短的一方是较长的一方的前缀
  // 防止短名字（如"ma"）意外匹配到完全不相关的角色
  const keys = Object.keys(npcPersonaMap || {});
  for (const kk of keys) {
    const minLen = Math.min(k.length, kk.length);
    if (minLen < 4) continue; // 太短不做模糊匹配
    if (kk.startsWith(k) || k.startsWith(kk)) return npcPersonaMap[kk];
  }

  // 词首匹配（支持 "Julian Hartwell" vs "julian"）
  const first = String(name || '').trim().toLowerCase().split(/\s+/)[0] || '';
  if (first && first.length >= 4) {
    for (const kk of keys) {
      if (kk.startsWith(first) && kk.length >= first.length) return npcPersonaMap[kk];
    }
  }

  return '';
}

// getMomentsCtx 结果缓存（30s TTL + Promise锁，防止并发重复加载）
let _getMomentsCtxCache = null;
let _getMomentsCtxCacheTime = 0;
let _getMomentsCtxPromise = null;
async function getMomentsCtx() {
  const now = Date.now();
  if (_getMomentsCtxCache && (now - _getMomentsCtxCacheTime) < 30000) {
    return _getMomentsCtxCache;
  }
  // 已有进行中的加载，等待它完成而不是重复发起
  if (_getMomentsCtxPromise) return _getMomentsCtxPromise;
  _getMomentsCtxPromise = _doGetMomentsCtx();
  try {
    const result = await _getMomentsCtxPromise;
    return result;
  } finally {
    _getMomentsCtxPromise = null;
  }
}
async function _doGetMomentsCtx() {
  const ctx = getContext();
  const charName = ctx?.name2 || ctx?.characters?.[ctx?.characterId]?.name || '对方';
  const userName = ctx?.name1 || '用户';

  // 只用当前 chatId 的 threads（不跨片场），避免串入其他角色卡的 NPC
  const knownNPCs = new Set();
  Object.values(STATE.threads || {}).forEach(th => {
    if (th.name && th.name !== charName) knownNPCs.add(th.name);
  });
  (STATE.moments || []).filter(m => m.from !== 'user' && m.name !== charName).forEach(m => knownNPCs.add(m.name));

  // 近30条对话（足够捕捉 NPC 语气）
  const recentChat = (ctx?.chat || []).slice(-30).map(m => {
    const spk = m.is_user ? userName : (m.name || charName);
    return spk + ': ' + ((m.mes || '').replace(/<[^>]+>/g, '').trim().slice(0, 150));
  }).join('\n') || '（暂无对话记录）';
  // 提取主角人设（description + personality + scenario）
  let charPersona = '';
  try {
    const charObj = (ctx?.characters && ctx?.characterId !== undefined)
      ? ctx.characters[ctx.characterId]
      : (ctx?.char || null);
    if (charObj) {
      const parts = [];
      if (charObj.description) parts.push(charObj.description.replace(/\s+/g, ' ').trim().slice(0, 350));
      if (charObj.personality) parts.push('性格：' + charObj.personality.replace(/\s+/g, ' ').trim().slice(0, 150));
      if (charObj.scenario)    parts.push('背景：' + charObj.scenario.replace(/\s+/g, ' ').trim().slice(0, 200));
      charPersona = parts.filter(Boolean).join('\n');
    }
  } catch(e) { /* ignore */ }

  // 提取 NPC 人设（优先使用 ST 中已加载角色卡，兼容世界书支撑的人物）
  const npcPersonaMap = {};

  // 1. 从角色卡提取（适用于有角色卡的 NPC）
  try {
    const chars = Array.isArray(ctx?.characters)
      ? ctx.characters
      : (ctx?.characters && typeof ctx.characters === 'object' ? Object.values(ctx.characters) : []);
    chars.forEach(ch => {
      const name = (ch?.name || '').trim();
      if (!name || name === charName) return;
      const parts = [];
      if (ch.description) parts.push(ch.description.replace(/\s+/g, ' ').trim().slice(0, 280));
      if (ch.personality) parts.push('性格：' + ch.personality.replace(/\s+/g, ' ').trim().slice(0, 140));
      if (ch.scenario)    parts.push('背景：' + ch.scenario.replace(/\s+/g, ' ').trim().slice(0, 180));
      const persona = parts.filter(Boolean).join('\n');
      if (persona) npcPersonaMap[normNameKey(name)] = persona;
    });
  } catch(e) { /* ignore */ }

  // 2. 世界书扫描
  //    window.world_info 是 jQuery 事件缓存，ctx.worldInfoBefore/After 在独立API调用时为空
  //    正确方式：用 ctx.loadWorldInfo 直接读取世界书原始词条（全部61条均可读到）
  try {
    const wiTexts = [];

    // 2a. 用 loadWorldInfo 读取当前角色绑定的世界书（异步，但 getMomentsCtx 调用方需 await）
    // 从 charInfo 里找世界书名（ST 把世界书名存在角色的 data.extensions.world 字段）
    try {
      const charObj = (ctx?.characters && ctx?.characterId !== undefined)
        ? ctx.characters[ctx.characterId] : (ctx?.char || null);
      const wiName = charObj?.data?.extensions?.world || charObj?.extensions?.world || '';
      if (wiName && typeof ctx.loadWorldInfo === 'function') {
        const wiData = await ctx.loadWorldInfo(wiName);
        if (wiData?.entries) {
          Object.values(wiData.entries).forEach(e => {
            const content = e?.content || e?.text || '';
            if (content) wiTexts.push(content);
          });
          console.log('[getMomentsCtx] loadWorldInfo:', wiName, '- entries:', Object.keys(wiData.entries).length);
        }
      }
    } catch(e) { console.warn('[getMomentsCtx] loadWorldInfo failed:', e.message); }

    // 2b. 兜底：ctx 注入文本（已触发词条）
    [ctx?.worldInfoBefore, ctx?.worldInfoAfter, ctx?.world_info, ctx?.lorebook]
      .filter(Boolean).forEach(s => wiTexts.push(String(s)));

    // 2c. extension_prompts
    try {
      const ep = window.extension_prompts || {};
      Object.values(ep).forEach(p => { if (p?.value) wiTexts.push(String(p.value)); });
    } catch(e) {}

    // 2d. 全量扫描 window.world_info（ST内存常驻，不依赖词条触发）
    // 结构：window.world_info = { "世界书名": { entries: { id: { content, key, ... } } } }
    try {
      const wi = window.world_info || {};
      Object.values(wi).forEach(book => {
        const entries = book?.entries || book?.content || {};
        Object.values(entries).forEach(e => {
          const content = e?.content || e?.text || '';
          if (content && content.length > 10) wiTexts.push(content);
        });
      });
    } catch(e) { console.warn('[getMomentsCtx] window.world_info scan failed:', e.message); }

    const totalLen = wiTexts.reduce((s,t) => s + t.length, 0);
    console.log('[getMomentsCtx] wiTexts total chars:', totalLen);

    const allWIText = wiTexts.join('\n');
    if (allWIText) {
      // 解析 <character_xxx>...</character_xxx> 块
      const blockRe = /<character(?:[_\-][^>]*)?>([\s\S]*?)<\/character(?:[_\-][^>]*)?>/gi;
      let bm;
      while ((bm = blockRe.exec(allWIText)) !== null) {
        const block = bm[1];
        const nameMatch = block.match(/^\s*name\s*[:：]\s*(.+)/mi);
        if (!nameMatch) continue;
        const wName = nameMatch[1].trim().replace(/[<>]/g, '').split(/[\s,，]/)[0];
        if (!wName || normNameKey(wName) === normNameKey(charName)) continue;
        // 直接取词条全文，不做字段正则拆分（避免字段缺失/误匹配导致OOC）
        const fullText = block.replace(/<[^>]+>/g, '').replace(/[ \t]+/g, ' ').replace(/\n{3,}/g, '\n\n').trim();
        if (fullText.length > 20) {
          npcPersonaMap[normNameKey(wName)] = fullText.slice(0, 500);
        }
      }

      // 兼容：按世界书词条逐个解析，支持 [角色名 — 标题] 格式
      // 先把 allWIText 按词条边界切分（每个词条之间通常有明显空行或分隔符）
      // 策略：遍历每个词条文本，找到 [Name ...] 或 ## Name 或 name: Name 等标题行提取名字
      const wiEntries = wiTexts; // 每个 wiTexts 元素对应一条世界书词条内容
      wiEntries.forEach(entryText => {
        if (!entryText || entryText.length < 10) return;
        // 尝试多种标题格式提取角色名
        let extractedName = '';

        // 格式1: [Gaspard de Valois — 标题] 或 [Name]
        const bracketMatch = entryText.match(/^\s*\[([^\]—\-\|\/\\]+?)(?:[—\-\|\/\\][^\]]*?)?\]/m);
        if (bracketMatch) {
          extractedName = bracketMatch[1].trim();
        }
        // 格式2: ## Name 或 # Name
        if (!extractedName) {
          const mdMatch = entryText.match(/^\s*#{1,3}\s*([^\n#\-—]+)/m);
          if (mdMatch) extractedName = mdMatch[1].trim().replace(/[*_`]/g, '');
        }
        // 格式3: name: Xxx
        if (!extractedName) {
          const nameColonMatch = entryText.match(/^\s*name\s*[:：]\s*([^\n]+)/mi);
          if (nameColonMatch) extractedName = nameColonMatch[1].trim().split(/[（(,，\s]/)[0];
        }

        if (!extractedName || extractedName.length < 2) return;
        // 取姓名主体（去掉括号/破折号后面的描述词）
        const nameCore = extractedName.split(/[（(【\[,，]/)[0].trim();
        if (!nameCore || nameCore.length < 2) return;
        if (normNameKey(nameCore) === normNameKey(charName)) return;

        const k = normNameKey(nameCore);
        if (npcPersonaMap[k]) return; // 已有精确匹配，不覆盖

        // 取词条全文作为人设（去掉HTML标签，截断到600字）
        const fullText = entryText.replace(/<[^>]+>/g, '').replace(/[ \t]{2,}/g, ' ').replace(/\n{3,}/g, '\n\n').trim();
        if (fullText.length > 30) {
          npcPersonaMap[k] = fullText.slice(0, 600);
          console.log('[getMomentsCtx] WI entry matched:', nameCore, '→ key:', k, '| len:', fullText.length);
        }
      });

      // 兼容：一个词条里塞多个 NPC（按空行/特殊分隔符分段，每段尝试找名字）
      const segments = allWIText.split(/\n{2,}/);
      segments.forEach(seg => {
        const nm = seg.match(/^\s*name\s*[:：]\s*(.+)/mi) || seg.match(/^\s*#{1,3}\s*(.+)/m);
        if (!nm) return;
        const segName = nm[1].trim().replace(/[<>#*]/g, '').split(/[（(,，\s]/)[0].trim();
        if (!segName || segName.length < 2 || normNameKey(segName) === normNameKey(charName)) return;
        const k = normNameKey(segName);
        if (npcPersonaMap[k]) return; // 已有精确条目，不覆盖
        const bodyLines = seg.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
        if (bodyLines.length > 20) {
          npcPersonaMap[k] = bodyLines.slice(0, 350);
        }
      });

      // 额外：解析 friends_circle 块（格式：name: X\n disposition: Y）作为兜底
      // 即使个人词条未触发，friends_circle 汇总词条通常是常驻的
      const fcMatch = allWIText.match(/friends_circle\s*:[\s\S]*?(?=<character_|<\/|\Z)/i) || allWIText.match(/friends_circle\s*:[\s\S]{0,2000}/i);
      if (fcMatch) {
        const fcText = fcMatch[0];
        const fcEntries = fcText.split(/(?=\n\s{1,4}\w+_\w+:)/);
        fcEntries.forEach(entry => {
          const nameM = entry.match(/name\s*[:：]\s*([^\n]+)/i);
          const dispM = entry.match(/disposition\s*[:：]\s*([^\n]+)/i);
          const relM  = entry.match(/relations\s*[:：]\s*([^\n]+)/i);
          if (!nameM) return;
          const fcName = nameM[1].trim().split(/[（(,，\s]/)[0].trim();
          if (!fcName || fcName.length < 2 || normNameKey(fcName) === normNameKey(charName)) return;
          const fk = normNameKey(fcName);
          if (npcPersonaMap[fk]) return; // 已有更详细的，不覆盖
          const persona = [
            dispM ? '性格：' + dispM[1].trim() : '',
            relM  ? '关系：' + relM[1].trim().slice(0, 100) : ''
          ].filter(Boolean).join('；');
          if (persona) {
            npcPersonaMap[fk] = persona;
            console.log('[getMomentsCtx] friends_circle fallback:', fcName, '->', persona.slice(0,60));
          }
        });
      }

      console.log('[getMomentsCtx] npcPersonaMap keys:', Object.keys(npcPersonaMap));
    }
  } catch(e) { /* ignore */ }

  // 3. 兜底：从 chat 历史里提取 NPC 发言样本
  try {
    const chatHistory = ctx?.chat || [];
    chatHistory.slice(-40).forEach(msg => {
      if (msg.is_user) return;
      const spk = (msg.name || '').trim();
      if (!spk || spk === charName) return;
      const k = normNameKey(spk);
      if (npcPersonaMap[k]) return; // 已有，不覆盖
      const sample = (msg.mes || '').replace(/<[^>]+>/g, '').trim().slice(0, 120);
      if (sample) npcPersonaMap[k] = '（根据发言推断）语气样本：' + sample;
    });
  } catch(e) { /* ignore */ }

  // 只保留 knownNPCs 里有的人物人设，过滤掉其他角色卡的数据
  const filteredPersonaMap = {};
  [...knownNPCs].forEach(npcName => {
    const k = normNameKey(npcName);
    if (npcPersonaMap[k]) {
      filteredPersonaMap[k] = npcPersonaMap[k];
    } else {
      // 模糊匹配：npcName 的 normKey 是否是某个 persona key 的前缀
      const keys = Object.keys(npcPersonaMap);
      for (const pk of keys) {
        if (pk.length >= 4 && k.length >= 4 && (pk.startsWith(k) || k.startsWith(pk))) {
          filteredPersonaMap[k] = npcPersonaMap[pk];
          break;
        }
      }
    }
  });
  console.log('[getMomentsCtx] filteredPersonaMap keys:', Object.keys(filteredPersonaMap));

  const result = {
    charName,
    userName,
    npcs: [...knownNPCs].slice(0, 8),
    recentChat,
    charPersona,
    npcPersonaMap: filteredPersonaMap,
  };
  _getMomentsCtxCache = result;
  _getMomentsCtxCacheTime = Date.now();
  console.log('[getMomentsCtx] cache updated');
  return result;
}

async function generateAIMoments() {
  const btn = document.getElementById('rp-gen-moments');
  if (btn) { btn.disabled = true; btn.classList.add('rp-spinning'); }
  try {
    const { charName, npcs, recentChat, charPersona, npcPersonaMap } = await getMomentsCtx();
    // 每次随机挑选：char 固定 + 从 NPC 里随机取2个，保证每次刷新都不同
    // Fisher-Yates 洗牌，保证真随机；每次最多取3个 NPC（限制 token 消耗）
    const npcPool = [...npcs];
    for (let i = npcPool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [npcPool[i], npcPool[j]] = [npcPool[j], npcPool[i]];
    }
    const selectedNPCs = npcPool.slice(0, Math.min(3, npcPool.length));
    const allChars = [charName, ...selectedNPCs];
    const charList = allChars.join('、');
    const npcPersonaText = selectedNPCs
      .map(n => {
        const p = resolveNpcPersonaByName(n, npcPersonaMap) || '';
        return p ? ('- ' + n + '：' + p.replace(/\n/g, '；')) : '';
      })
      .filter(Boolean)
      .join('\n');

    // system message：人设 + 规则（每个角色分别说明，避免人设串台）
    const npcRules = selectedNPCs.map(n => {
      const p = resolveNpcPersonaByName(n, npcPersonaMap) || '';
      return p ? ('- ' + n + ' 的人设：' + p.replace(/\n/g, '；').slice(0, 400) + '\n  禁止让 ' + n + ' 做任何与其身份地位不符的事') : ('- ' + n + '：无人设，请根据名字和剧情推断，不得借用任何其他角色的背景');
    }).join('\n');
    const npcPersonaLines = selectedNPCs.map(n => {
      const p = resolveNpcPersonaByName(n, npcPersonaMap) || '';
      return p ? ('- ' + n + '（有人设）：' + p.replace(/\n/g,'；').slice(0,200)) : ('- ' + n + '（无人设）：请写与主角家庭完全无关的自己的日常生活');
    }).join('\n');
    const sysMsg = '你是一个角色扮演故事中的社交媒体模拟器。\n\n'
      + '【主角 ' + charName + ' 的人设】\n' + (charPersona || '（根据对话推断）') + '\n\n'
      + '【NPC列表及人设】\n' + npcPersonaLines + '\n\n'
      + '【铁律，全部必须遵守】\n'
      + '1. 每条朋友圈必须从角色本人第一人称视角出发，写自己正在做的事或感受\n'
      + '2. 【绝对禁止管家/仆人/旁观者视角】禁止出现"管家日志""今日流水""先生今日""小姐今日"等第三方叙述格式\n'
      + '3. 有人设的角色：内容必须符合其身份职业，医生写医疗相关，商人写商务相关，不得跨界\n'
      + '4. 无人设的角色：写与主角家庭完全无关的自己的个人日常，不得提及先生/小姐/主家\n'
      + '5. ' + charName + ' 只能以自己的视角发帖（第一人称），如写到家人/孩子要用"我的女儿""我家"等表达\n'
      + '6. 口语化，1-2句，中文，只返回JSON';
    const prompt = '近期剧情（主楼层最新对话）：\n' + recentChat
      + '\n\n请为以下角色各写1条朋友圈（每人1条，不重复，与剧情相关）：'
      + charList
      + '\n格式：[{"from":"角色名","text":"内容"},...]';
    const resp = await lgCallAPI(prompt, 600, sysMsg);
    if (!resp) throw new Error('API无响应');
    const jsonStr = resp.match(/\[[\s\S]*\]/)?.[0];
    if (!jsonStr) throw new Error('格式错误');
    const posts = JSON.parse(jsonStr);
    const now = new Date();
    posts.forEach((post, i) => {
      if (!post.from || !post.text) return;
      const d = new Date(now.getTime() + i * 60000);
      const ts = String(d.getHours()).padStart(2,'0') + ':' + String(d.getMinutes()).padStart(2,'0');
      incomingMoment(post.from.trim(), ts, post.text.trim(), post.img || null);
    });
    if (STATE.currentView === 'moments') renderMoments();
    setTimeout(() => momentAISocial(null), 1000);
  } catch(e) {
    console.warn('[Moments] generateAIMoments error:', e);
    const container = $('#rp-moments-list');
    container.prepend('<div style="color:#e55;padding:8px 12px;font-size:12px;text-align:center;background:rgba(255,80,80,.08);border-radius:8px;margin:8px">⚠️ 生成失败，请检查 API 设置</div>');
    setTimeout(() => container.find('[style*="color:#e55"]').remove(), 3000);
  } finally {
    if (btn) { btn.disabled = false; btn.classList.remove('rp-spinning'); }
  }
}

async function charRespondToUserMoment(momentId) {
  const moment = (STATE.moments || []).find(function(m) { return m.id === momentId; });
  if (!moment) return;
  const ctx = await getMomentsCtx();
  const charName = ctx.charName;
  const charPersona = ctx.charPersona;
  if (!charName) return;
  // 强制主角写一条评论
  const { recentChat: _rc } = await getMomentsCtx();
  const sysMsg = '你正在扮演 ' + charName + '。\n'
    + (charPersona ? '你的人设：' + charPersona.slice(0, 300) + '\n' : '')
    + '【重要】你和"' + (getContext()?.name1 || '用户') + '"是亲密关系（朋友/家人/恋人等），不是陌生人或旁观者。'
    + '请以你们真实的关系视角来评论，体现出你了解对方、关心对方。\n'
    + '近期对话参考（帮助判断关系和语境）：\n' + (_rc ? _rc.slice(-300) : '无') + '\n'
    + '字数15-40字，符合角色性格，用中文，只返回评论正文，不加引号或任何前缀。';
  const prompt = '用户发了一条朋友圈：「' + moment.text + '」\n'
    + charName + '的评论（必须写，不允许只点赞）：';
  const resp = await lgCallAPI(prompt, 150, sysMsg);
  if (resp) {
    const cleaned = resp.trim().replace(/^[\u300c"'\u300d"']+|[\u300d"'\u300c"']+ $/g, '').trim();
    if (cleaned) {
      const now = new Date();
      const ts = String(now.getHours()).padStart(2,'0') + ':' + String(now.getMinutes()).padStart(2,'0');
      if (!moment.likes.includes(charName)) moment.likes.push(charName);
      incomingComment(momentId, charName, ts, cleaned, null);
      if (STATE.currentView === 'moments') renderMoments();
      saveState();
    }
  }
  // NPC 们强制回复（逐个单独请求，避免雷同；按人数：1好友=1条，2=2条，3+取2条NPC）
  setTimeout(async function() {
    const { npcs, npcPersonaMap } = await getMomentsCtx();
    const alreadyCommented = new Set((moment.comments || []).map(c => c.name));
    const pendingNPCs = npcs.filter(n => !alreadyCommented.has(n));
    const maxNPC = Math.min(pendingNPCs.length, Math.max(0, 3 - (alreadyCommented.has(charName) ? 1 : 0)));
    // 随机打乱，避免永远是前两个 NPC
    const shuffled = pendingNPCs.sort(() => Math.random() - 0.5);
    for (let i = 0; i < maxNPC; i++) {
      const npc = shuffled[i];
      const npcPersona = resolveNpcPersonaByName(npc, npcPersonaMap) || '';
      // 每个 NPC 独立请求，人设+角色名写进 prompt，强制差异化
      const sysNpc = '你正在扮演角色"' + npc + '"。'
        + (npcPersona ? '\n人设：' + npcPersona.slice(0, 250) + '\n' : '\n')
        + '你在朋友圈看到了这条动态，用符合你性格的语气写一条评论。'
        + '字数10-25字，口语化，不要和其他角色的评论重复，只返回评论正文。';
      const promptNpc = '朋友圈内容：「' + moment.text + '」\n'
        + '你的用户名是"' + npc + '"，你的评论（必须和其他人不同）：';
      const resp = await lgCallAPI(promptNpc, 80, sysNpc);
      if (resp) {
        const cleaned = resp.trim().replace(/^[「"'\s]+|[」"'\s]+$/g, '');
        if (cleaned && cleaned.length > 2) {
          const now2 = new Date();
          const ts2 = String(now2.getHours()).padStart(2,'0') + ':' + String(now2.getMinutes()).padStart(2,'0');
          incomingComment(momentId, npc, ts2, cleaned, null);
          if (STATE.currentView === 'moments') renderMoments();
          saveState();
        }
      }
      await new Promise(r => setTimeout(r, 600));
    }
  }, 1200);
}

async function momentAISocial(targetMomentId) {
  const moments = STATE.moments || [];
  if (moments.length === 0) return;
  const { charName, npcs, charPersona, npcPersonaMap, recentChat } = await getMomentsCtx();
  const allChars = [charName, ...npcs];
  if (allChars.length === 0) return;
  const targets = targetMomentId
    ? moments.filter(m => m.id === targetMomentId)
    : moments.slice(-6);
  if (targets.length === 0) return;
  const momentsSummary = targets.map(m =>
    'ID="' + m.id + '" 作者="' + m.name + '" 内容="' + m.text.slice(0, 150) + '"'
  ).join('\n');
  const charList2 = allChars.join('、');
  const npcPersonaText2 = npcs
    .map(n => {
      const p = npcPersonaMap?.[normNameKey(n)] || '';
      return p ? ('- ' + n + '：' + p.replace(/\n/g, '；')) : '';
    })
    .filter(Boolean)
    .join('\n');
  const recentChatSnippet = recentChat ? recentChat.slice(-400) : '';
  const sysMsg2 = '你是角色扮演社交媒体互动模拟器。\n'
    + '主角 ' + charName + ' 人设（含英文名/别名）：' + (charPersona ? charPersona.slice(0, 500) : '（根据动态推断）') + '\n'
    + '其他角色：' + (npcs.join('、') || '无') + (npcPersonaText2 ? ('\nNPC人设卡（优先）：\n' + npcPersonaText2) : '') + '\n'
    + (recentChatSnippet ? ('近期剧情背景（帮助理解动态语境）：\n' + recentChatSnippet + '\n') : '')
    + '规则：\n'
    + '1. 互动语气必须符合各角色性格；所有评论用中文；角色不能与自己的动态互动。\n'
    + '2. 【自我认知规则】只有以下情况才以第一人称当事人身份回应：'
    + '①动态里直接出现我的名字（' + charName + '）、英文名、或对我的称谓（爸爸/父亲/先生/Theodore）；'
    + '②动态明确描述发生在我身上的事（"我爸""我父亲""沈先生做了"）。'
    + '其他情况一律以旁观者/朋友角色评论，不要把别人之间的事当成在说我。'
    + '例：user说"julian叔叔告密了"→ char以父亲视角评论julian行为，不要当成在说自己。';
  const prompt2 = '朋友圈动态列表：\n' + momentsSummary + '\n\n只为以下角色生成2-4条社交互动（like/comment），禁止使用列表外的名字：' + charList2 + '\n格式：只返回JSON数组 [{"type":"like","from":"角色名","momentId":"完整ID"},{...}]，from字段必须严格使用上方列表中的名字，momentId必须与上方完全一致。';
  const resp = await lgCallAPI(prompt2, 400, sysMsg2);
  if (!resp) return;
  const allowedFromSet = new Set(allChars.map(n => normNameKey(n)));
  try {
    const jsonStr2 = resp.match(/\[[\s\S]*\]/)?.[0];
    if (!jsonStr2) return;
    const actions = JSON.parse(jsonStr2);
    const now = new Date();
    const ts = String(now.getHours()).padStart(2,'0') + ':' + String(now.getMinutes()).padStart(2,'0');
    actions.slice(0, 6).forEach(a => {
      if (!a.from || !a.momentId) return;
      const fromKey = normNameKey(a.from);
      const isAllowed = allowedFromSet.has(fromKey)
        || [...allowedFromSet].some(k => k.startsWith(fromKey) || fromKey.startsWith(k));
      if (!isAllowed) return;
      const m = moments.find(mo => mo.id === a.momentId);
      if (!m || m.name === a.from) return;
      if (a.type === 'like') {
        if (!m.likes.includes(a.from)) m.likes.push(a.from);
      } else if (a.type === 'comment' && a.text) {
        incomingComment(m.id, a.from.trim(), ts, a.text.trim(), null);
      }
    });
    if (STATE.currentView === 'moments') renderMoments();
    saveState();
  } catch(e) { console.warn('[Moments] momentAISocial error:', e); }
}

// ================================================================
// FRIENDS INTERACT ON MOMENT
// 好友列表里的人自动给动态点赞（随机）+ 最多3人评论（随机）
// ================================================================
async function friendsInteractOnMoment(momentId) {
  const moment = (STATE.moments || []).find(m => m.id === momentId);
  if (!moment) return;

  const { charName, npcs, npcPersonaMap } = await getMomentsCtx();

  // 所有好友（主角 + NPC），排除动态作者本人
  const authorName = moment.name;
  // user发的动态：char已由charRespondToUserMoment处理，这里只让NPC互动，避免char重复评论
  const isUserMoment = moment.from === 'user';
  const allFriends = (isUserMoment ? npcs : [charName, ...npcs]).filter(n => n && n !== authorName);
  if (allFriends.length === 0) return;

  const now = new Date();
  const ts = () => {
    const d = new Date();
    return String(d.getHours()).padStart(2,'0') + ':' + String(d.getMinutes()).padStart(2,'0');
  };

  // ── 点赞：每个好友随机70%概率点赞 ──
  allFriends.forEach(name => {
    if (Math.random() < 0.7 && !moment.likes.includes(name)) {
      moment.likes.push(name);
    }
  });
  if (STATE.currentView === 'moments') renderMoments();
  saveState();

  // ── 评论：user的动态由 charRespondToUserMoment 负责，这里只做点赞 ──
  // NPC发的动态才由这里生成评论，避免 Julian 等重复评论
  if (isUserMoment) {
    if (STATE.currentView === 'moments') renderMoments();
    saveState();
    return;
  }

  // ── 评论：随机抽最多3人（从还没评论过的好友里抽） ──
  const alreadyCommented = new Set((moment.comments || []).map(c => c.name));
  const eligible = allFriends.filter(n => !alreadyCommented.has(n));
  const shuffled = eligible.sort(() => Math.random() - 0.5);
  const commentors = shuffled.slice(0, 3);
  if (commentors.length === 0) return;

  // 构建 prompt 一次性生成所有评论（省 token）
  const npcPersonaText = commentors.map(n => {
    const p = npcPersonaMap?.[normNameKey(n)] || '';
    return p ? ('- ' + n + '：' + p.replace(/\n/g, '；').slice(0, 150)) : ('- ' + n);
  }).join('\n');

  const sysMsg = '你是角色扮演社交媒体互动模拟器。\n规则：每个角色评论风格符合其人设；所有评论用中文；不超过20字；不加引号。';
  const prompt = '朋友圈动态作者：' + authorName + '\n内容：「' + moment.text.slice(0, 80) + '」\n\n'
    + '以下角色各写一条评论（语气符合各自性格，互相不重复）：\n' + npcPersonaText
    + '\n\n只返回JSON数组，格式：[{"from":"角色名","text":"评论内容"}, ...]';

  try {
    const resp = await lgCallAPI(prompt, 300, sysMsg);
    if (!resp) return;
    const jsonStr = resp.match(/\[[\s\S]*\]/)?.[0];
    if (!jsonStr) return;
    const items = JSON.parse(jsonStr);
    const allowedSet = new Set(allFriends.map(n => normNameKey(n)));
    items.forEach(item => {
      if (!item.from || !item.text) return;
      const k = normNameKey(item.from);
      const isAllowed = allowedSet.has(k) || [...allowedSet].some(a => a.startsWith(k) || k.startsWith(a));
      if (!isAllowed) return;
      const cleaned = item.text.trim().replace(/^[「"'\s]+|[」"'\s]+$/g, '');
      if (cleaned && cleaned.length > 1) {
        incomingComment(momentId, item.from.trim(), ts(), cleaned, null);
      }
    });
    if (STATE.currentView === 'moments') renderMoments();
    saveState();
  } catch(e) {
    console.warn('[Moments] friendsInteractOnMoment error:', e);
  }
}


async function generateAIReply(momentId, userCommentText, fromName) {
  const moment = STATE.moments?.find(m => m.id === momentId);
  if (!moment) return;
  const authorName = fromName || moment.name;
  const { charName, charPersona, npcPersonaMap } = await getMomentsCtx();
  let sysMsg3 = '';
  if (authorName === charName && charPersona) {
    sysMsg3 = '你正在扮演 ' + charName + '，人设如下：\n' + charPersona.slice(0, 300) + '\n\n回复时必须严格符合该人设的语气和性格，用中文回复，不超过20字，只返回回复内容本身。';
  } else {
    const npcPersona = resolveNpcPersonaByName(authorName, npcPersonaMap) || '';
    sysMsg3 = '你正在扮演 ' + authorName + '，' + (npcPersona ? ('其人设如下：\n' + npcPersona.slice(0, 300) + '\n') : '根据其在故事中的言行推断语气，') + '用中文回复，不超过20字，只返回回复内容本身。';
  }
  const prompt3 = authorName + '的朋友圈：「' + moment.text + '」\n用户评论：「' + userCommentText + '」\n' + authorName + '回复：';
  const resp = await lgCallAPI(prompt3, 100, sysMsg3);
  if (!resp) return;
  const now = new Date();
  const ts = String(now.getHours()).padStart(2,'0') + ':' + String(now.getMinutes()).padStart(2,'0');
  const cleaned = resp.trim().replace(/^[「"']|[」"']$/g, '');
  incomingComment(momentId, authorName, ts, cleaned, null);
}

//  MOMENTS
// ================================================================
function renderMoments() {
  console.log('[Phone:diag] renderMoments STATE.avatars=', JSON.stringify(STATE.avatars));
  const container = $('#rp-moments-list').empty();
  if (!STATE.moments || STATE.moments.length === 0) {
    container.append('<div class="rp-moments-empty"><span>📭</span><span>暂无动态</span></div>');
    return;
  }
  const _ctx = getContext();
  const _uname = _ctx?.name1 || '我';
  [...STATE.moments].reverse().forEach(moment => {
    const liked = moment.likes.includes('user');
    const likeNames = moment.likes.map(l => l === 'user' ? _uname : l);
    const likeCount = likeNames.length;
    let commentsHtml = '';
    if (moment.comments && moment.comments.length > 0) {
      const items = moment.comments.map((cm, idx) => {
        const replyPart = cm.replyTo !== null && cm.replyTo !== undefined
          ? `回复 <span class="rp-moment-cname">${moment.comments[cm.replyTo]?.name || '?'}</span>：`
          : '';
        return `<div class="rp-moment-comment">
          <span class="rp-moment-cname">${escHtml(cm.name)}</span>：${replyPart}${escHtml(cm.text)}
          <span class="rp-moment-reply-btn" data-moment="${moment.id}" data-cidx="${idx}" data-rname="${escHtml(cm.name)}">回复</span>
        </div>`;
      }).join('');
      commentsHtml = `<div class="rp-moment-comments-wrap">${items}</div>`;
    }
    container.append(`
      <div class="rp-moment" data-mid="${moment.id}">
        <div class="rp-moment-hd">
          ${(()=>{const k=moment.from==='user'?'user':moment.name;const ci=STATE.avatars&&STATE.avatars[k];return ci?`<div class="rp-moment-av rp-av-img"><img class="rp-av-photo" src="${ci}" alt=""/></div>`:`<div class="rp-moment-av" style="background:${moment.avatarBg}">${moment.initials}</div>`;})()}
          <div class="rp-moment-meta">
            <div class="rp-moment-name">${escHtml(moment.name)}</div>
            <div class="rp-moment-time">${moment.time}</div>
          </div>
        </div>
        <div class="rp-moment-text">${escHtml(moment.text)}</div>
        ${moment.img ? `<div class="rp-moment-img-wrap"><img class="rp-moment-img" src="${escHtml(moment.img)}" alt=""/></div>` : ''}
        <div class="rp-moment-bar">
          <button class="rp-moment-act rp-like-btn${liked ? ' rp-liked' : ''}" data-moment="${moment.id}">${liked ? '❤️' : '🤍'} ${likeCount > 0 ? likeCount : '点赞'}</button>
          <button class="rp-moment-act rp-comment-toggle" data-moment="${moment.id}">💬 评论</button>
        </div>
        ${likeCount > 0 ? `<div class="rp-moment-likes-row">❤️ ${likeNames.slice(0,4).join('、')}${likeCount > 4 ? ` 等${likeCount}人` : ''}</div>` : ''}
        ${commentsHtml}
        <div class="rp-moment-input-row" id="rp-ci-${moment.id}" style="display:none">
          <input class="rp-moment-cinput" type="text" placeholder="发表评论…" autocomplete="off"/>
          <button class="rp-moment-csend" data-moment="${moment.id}">发送</button>
        </div>
      </div>
    `);
  });
}

// ================================================================
// 小红书 - 完整重写
// ================================================================

// 固定帖子模板（路人视角，围绕 charName/userName 议论）
// 预置评论库（多性格，带 charName/charLast 占位符）
// 评论库：每条帖子配套的具体化评论，接收帖子上下文生成
// 通用预设评论池（不写死任何卡专属剧情，仅用 charName/charLast 占位）
// AI 生成失败时作为兜底，按 type 分组保证不同帖子评论不同
// 渲染单条帖子卡片（单列）
function renderXHSCard(p) {
  const likeK = p.likes >= 10000 ? (p.likes/10000).toFixed(1)+'w' : p.likes >= 1000 ? (p.likes/1000).toFixed(1)+'k' : p.likes;
  const commentCount = p.comments ? p.comments.length : 0;
  const isUser = p.from === 'user';
  return `
    <div class="rp-xhs-card" data-xhsid="${p.id}" style="cursor:pointer">
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">
        <div style="flex:1;min-width:0">
          <div style="font-size:12px;font-weight:600;color:var(--rp-xhs-text,#333);overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${escHtml(p.user)}</div>
          <div style="font-size:10px;color:var(--rp-xhs-text-faint,#bbb)">${p.time || ''}</div>
        </div>
        <div style="font-size:10px;background:var(--rp-xhs-chip,rgba(255,36,66,.08));color:var(--rp-xhs-accent,#ff2442);padding:2px 8px;border-radius:10px;flex-shrink:0;font-weight:600">${escHtml(p.tag)}</div>
      </div>
      <div style="font-size:13px;font-weight:700;color:var(--rp-xhs-text,#1a1a1a);line-height:1.5;margin-bottom:4px">${escHtml(p.title)}</div>
      <div style="font-size:12px;color:var(--rp-xhs-text-soft,#666);line-height:1.6;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical">${escHtml(p.body)}</div>
      <div style="display:flex;align-items:center;gap:14px;margin-top:10px;padding-top:8px;border-top:1px solid var(--rp-xhs-border,rgba(0,0,0,.06))">
        <div style="font-size:11px;color:${p.likedByUser?'var(--rp-xhs-accent,#ff2442)':'var(--rp-xhs-text-faint,#bbb)'};display:flex;align-items:center;gap:3px">${p.likedByUser?'❤️':'🤍'} ${likeK}</div>
        <div style="font-size:11px;color:var(--rp-xhs-text-faint,#bbb);display:flex;align-items:center;gap:3px">💬 ${commentCount > 0 ? commentCount+'条' : '评论'}</div>
        <div style="flex:1"></div>
        <div style="font-size:10px;color:var(--rp-xhs-text-faint,#ccc)">${p.date||''}</div>
      </div>
    </div>
  `;
}

function renderXHSFeed(forceRefresh) {
  const box = $('#rp-xhs-list');
  if (!box.length) return;

  const hasStranger = (STATE.xhsFeed || []).some(p => p.from !== 'user');

  if (!hasStranger) {
    // 首次加载：清空后显示 loading，调 API
    box.empty();
    box.append('<div id="rp-xhs-loading" style="text-align:center;color:#ff2442;padding:30px;font-size:13px">正在加载最新动态…</div>');
    buildXHSFeedWithAI(false);
    return;
  }

  if (forceRefresh) {
    // 刷新：保留现有帖子，顶部插入 loading，后台生成追加
    if ($('#rp-xhs-loading').length) return; // 防止重复触发
    box.prepend('<div id="rp-xhs-loading" style="text-align:center;color:#ff2442;padding:16px;font-size:13px">正在加载更多…</div>');
    buildXHSFeedWithAI(true);
    return;
  }

  _renderXHSList(box);
}

function _renderXHSList(box) {
  mergeGlobalAvatars();
  console.log('[Phone:diag] _renderXHSList STATE.avatars=', JSON.stringify(STATE.avatars));
  box = box || $('#rp-xhs-list');
  box.empty();
  const list = STATE.xhsFeed || [];
  if (!list.length) {
    box.append('<div style="text-align:center;color:#ff2442;padding:40px;font-size:13px">暂无内容</div>');
    return;
  }
  // Bug5 fix: 顺序 = 旧陌生人帖(老→新) → 用户帖(老→新) → 新陌生人帖(新→老置顶)
  // STATE.xhsFeed 结构：[...userPosts, ...strangerPosts(新在前)]
  const userPosts = list.filter(p => p.from === 'user');
  const strangerPosts = list.filter(p => p.from !== 'user'); // 新的在 index 0
  // 渲染顺序：旧stranger(末尾先) → user → 新stranger(头部先)
  const oldStranger = strangerPosts.slice(3);  // 除最新3条外的旧帖
  const newStranger = strangerPosts.slice(0, 3); // 最新3条
  // 显示：旧帖(反转使旧的在上) → 用户帖 → 新帖
  [...[...oldStranger].reverse(), ...userPosts, ...newStranger].forEach(p => box.append(renderXHSCard(p)));
}

// XHS API 调用：直接复用 lgCallAPI，和其他功能保持一致
async function xhsCallAPI(prompt, sysMsg) {
  return await lgCallAPI(prompt, 3500, sysMsg);
}

async function buildXHSFeedWithAI(appendMode) {
  const now = new Date();
  const todayStr = `${now.getMonth()+1}-${now.getDate()}`;
  const rndInt = (a,b) => Math.floor(Math.random()*(b-a+1))+a;
  const ts = () => { const h=rndInt(8,23),m=rndInt(0,59); return `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}`; };

  const userPosts = (STATE.xhsFeed || []).filter(p => p.from === 'user');
  const existingStranger = (STATE.xhsFeed || []).filter(p => p.from !== 'user');

  // 读角色信息
  let charName = '', userName = '', charPersona = '', recentChat = '';
  try {
    const ctx = await getMomentsCtx();
    charName = ctx.charName || ''; userName = ctx.userName || '';
    charPersona = ctx.charPersona || ''; recentChat = ctx.recentChat || '';
  } catch(e) {
    const ctx0 = getContext() || {};
    charName = ctx0?.name2 || ctx0?.name || 'TA';
    userName = ctx0?.name1 || '用户';
  }
  const charLast = charName.split(/\s+/).pop() || charName || 'TA';

  // 合并新帖子到列表（追加模式：新帖插到陌生人帖子最前面，超10条删最旧的）
  function mergeNewPosts(newPosts) {
    const MAX_STRANGER = 10;
    let merged = [...newPosts, ...existingStranger]; // 新的在前
    if (merged.length > MAX_STRANGER) merged = merged.slice(0, MAX_STRANGER); // 删最旧
    STATE.xhsFeed = [...userPosts, ...merged];
    saveState();
    _renderXHSList();
    // 滚到顶部
    setTimeout(() => { const box = $('#rp-xhs-list'); if (box.length) box.scrollTop(0); }, 50);
  }

  // 随机选3个话题方向，保证每次刷新内容不重复
  const topicPool = [
    `围绕${charName}和${userName}关系的八卦讨论（目击者/知情人视角）`,
    `关于${charName}的个人生活/性格传闻（不涉及${userName}）`,
    `${charName}在商界/社交圈的传闻与评价`,
    `探讨收养关系/年龄差感情的社会观察（以${charName}为例）`,
    `${charName}的外形/品味/生活方式被路人讨论`,
    `${userName}被目击或被讨论（陌生人视角，不知道她身份）`,
    `某次公开活动上${charName}的行为引发讨论`,
    `关于有钱有势的人如何对待身边年轻人的社会话题`,
    `小道消息：${charName}圈子里的人际关系传闻`,
    `${charName}的过去/背景被挖掘讨论`,
  ];
  const pick3 = (arr) => { const a=[...arr].sort(()=>Math.random()-0.5); return a.slice(0,3); };
  const chosenTopics = pick3(topicPool);

  try {
    const sysMsg = `你是一个小红书内容生成器。严格按要求生成3条帖子，每条各自独立，内容和评论绝对不能重复。
帖子要求：
- 话题严格对应下方给出的3个不同方向，不要全写成同一种八卦
- 陌生路人/网友视角，口语化，有具体细节，正文40-60字

评论要求（每条帖子各自生成5条，三条帖子的评论内容不能相同）：
- 必须包含：吐槽型（1条）、共情型（1条）、懂哥长评（1条，30-40字）、看热闹型（1条）、补料型（1条）
- 每条评论的昵称和内容都不能跟其他帖子的评论相同

只返回JSON数组，格式：
[{"user":"昵称emoji","tag":"标签","title":"标题","body":"正文","likes":数字,"comments":[{"user":"昵称emoji","text":"评论内容"}]}]
共3条，不要有其他文字。
重要：所有字段值内部不能出现双引号，如需引用请用「」或【】代替。`;

    const charInfo = charPersona ? charPersona.slice(0, 150) : `角色名：${charName}`;
    const prompt = `角色信息：${charInfo}\n用户名：${userName}\n近期对话片段：${(recentChat||'').slice(0,100)}\n\n本次3条帖子话题方向：\n${chosenTopics.map((t,i)=>`${i+1}. ${t}`).join('\n')}\n\n生成JSON：`;

    const resp = await xhsCallAPI(prompt, sysMsg);
    console.log('[XHS] raw resp:', resp ? resp.slice(0, 300) : 'null');
    if (resp) {
      let items = [];
      try {
        let jsonStr = resp.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '').trim();
        const m = jsonStr.match(/\[[\s\S]*\]/);
        if (m) jsonStr = m[0];
        // 修复 AI 在字符串值里用双引号的问题（如 "Theo"）
        // 策略：逐字符状态机，在 JSON 字符串值内遇到未转义双引号时替换为「」
        jsonStr = (function fixInnerQuotes(s) {
          let out = '', inStr = false, key = false, i = 0;
          while (i < s.length) {
            const ch = s[i];
            if (!inStr) {
              if (ch === '"') { inStr = true; out += ch; }
              else out += ch;
            } else {
              if (ch === '\\') { out += ch + (s[i+1]||''); i += 2; continue; }
              if (ch === '"') {
                // 判断是结束引号还是内部引号：后面紧跟 : , } ] 或空白+这些字符
                const rest = s.slice(i+1).trimStart();
                if (/^[:\],}]/.test(rest)) { inStr = false; out += ch; }
                else { out += '\u2019'; } // 替换为右单引号 '
              } else { out += ch; }
            }
            i++;
          }
          return out;
        })(jsonStr);
        items = JSON.parse(jsonStr);
      } catch(e) { console.warn('[XHS] JSON parse error:', e.message, resp ? resp.slice(0,300) : ''); }
      if (Array.isArray(items) && items.length > 0) {
        const aiPosts = items.slice(0, 3).map((p, i) => {
          const aiComments = Array.isArray(p.comments) ? p.comments.slice(0, 5).map(c => ({
            from: 'stranger_preset', user: c.user||'路人', text: c.text||'', time: ts(), replyTo: null
          })) : [];
          return {
            id: `xhs_ai_${Date.now()}_${i}`, from: 'stranger',
            user: p.user||`路人${i+1}🌿`, title: p.title||'', body: p.body||'',
            tag: p.tag||'八卦', likes: typeof p.likes==='number' ? p.likes : rndInt(500,20000),
            likedByUser: false, comments: aiComments, time: ts(), date: todayStr,
          };
        });
        mergeNewPosts(aiPosts);
        return;
      }
    }
  } catch(e) { console.error('[XHS] AI feed build EXCEPTION:', e); }

  // AI 失败 → 显示错误提示，让用户刷新重试（不用 fallback 池避免重复）
  $('#rp-xhs-loading').remove();
  const box = $('#rp-xhs-list');
  if (box.length && !box.find('.rp-xhs-card').length) {
    box.append('<div style="text-align:center;color:#aaa;padding:40px 20px;font-size:13px">加载失败，点右上角 ↻ 重试</div>');
  }
}


// Fallback 通用模板（不假设任何角色关系）
// 打开详情页
function openXHSDetail(postId) {
  const post = (STATE.xhsFeed || []).find(p => p.id === postId);
  if (!post) return;
  STATE.xhsCurrentPost = postId;
  renderXHSDetail(post);
  go('xhs-detail');
}

function renderXHSDetail(post) {
  mergeGlobalAvatars();
  const body = $('#rp-xhs-detail-body');
  if (!body.length) return;
  const likeK = post.likes >= 10000 ? (post.likes/10000).toFixed(1)+'w' : post.likes >= 1000 ? (post.likes/1000).toFixed(1)+'k' : post.likes;
  const isUser = post.from === 'user';


  let commentsHtml = '';
  if (post.comments && post.comments.length > 0) {
    commentsHtml = post.comments.map((c, idx) => {
      const replyPart = (c.replyTo !== null && c.replyTo !== undefined && post.comments[c.replyTo])
        ? `<span style="color:var(--rp-xhs-text-faint,#999)">回复 </span><span style="color:#ff2442">@${escHtml(post.comments[c.replyTo].user)}</span>：`
        : '';
      const isMe = c.from === 'user';
      const _xhsAv3Color = (s) => { const c=['#ff6b6b','#ffa94d','#a9e34b','#63e6be','#74c0fc','#e599f7','#ff8fab','#f783ac']; let h=0; for(let i=0;i<s.length;i++) h=(h*31+s.charCodeAt(i))&0xffff; return c[h%c.length]; };

      return `
        <div class="rp-xhs-comment" data-cidx="${idx}" style="padding:8px 0;border-bottom:1px solid #fff5f6">
          <div style="display:flex;align-items:baseline;gap:6px;margin-bottom:2px">
            <span style="font-size:12px;font-weight:600;color:var(--rp-xhs-text,#333)">${escHtml(c.user)}</span>
            <span style="font-size:10px;color:var(--rp-xhs-text-faint,#ccc)">${c.time||''}</span>
          </div>
          <div style="font-size:12px;color:var(--rp-xhs-text-soft,#444);line-height:1.6">${replyPart}${escHtml(c.text)}</div>
          <div style="font-size:10px;color:#ff2442;margin-top:3px;cursor:pointer" data-reply-cidx="${idx}" data-reply-uname="${escHtml(c.user)}">回复</div>
        </div>
      `;
    }).join('');
  } else {
    commentsHtml = '<div style="text-align:center;color:#ddd;font-size:12px;padding:20px 0">暂无评论，来抢沙发～</div>';
  }

  body.html(`
    <div style="margin-bottom:14px">
      <div style="font-size:13px;font-weight:700;color:var(--rp-xhs-text,#333)">${escHtml(post.user)}</div>
      <div style="font-size:10px;color:var(--rp-xhs-text-faint,#bbb)">${post.date||''} ${post.time||''} · ${escHtml(post.tag)}</div>
    </div>
    <div style="font-size:15px;font-weight:800;color:var(--rp-xhs-text,#1a1a1a);line-height:1.5;margin-bottom:10px">${escHtml(post.title)}</div>
    <div style="font-size:13px;color:var(--rp-xhs-text-soft,#444);line-height:1.8;margin-bottom:16px">${escHtml(post.body)}</div>
    <div style="display:flex;align-items:center;gap:16px;padding:10px 0;border-top:1px solid #fff0f2;border-bottom:1px solid #fff0f2;margin-bottom:14px">
      <button id="rp-xhs-like-btn" data-postid="${post.id}" style="background:none;border:none;cursor:pointer;font-size:13px;color:${post.likedByUser?'#ff2442':'#bbb'};display:flex;align-items:center;gap:4px">${post.likedByUser?'❤️':'🤍'} <span id="rp-xhs-like-count">${likeK}</span></button>
      <div style="font-size:13px;color:var(--rp-xhs-text-faint,#bbb);display:flex;align-items:center;gap:4px">💬 <span>${(post.comments||[]).length}</span></div>
    </div>
    <div style="font-size:12px;font-weight:700;color:var(--rp-xhs-text,#333);margin-bottom:8px">全部评论 · ${(post.comments||[]).length}条</div>
    <div id="rp-xhs-comments-list">${commentsHtml}</div>
  `);
}

// 用户发小红书帖子
function postUserXHS() {
  const title = $('#rp-xhs-post-title').val().trim();
  const body = $('#rp-xhs-post-body').val().trim();
  const tag = STATE.xhsSelectedTag || '日常';
  if (!body) { alert('请输入内容'); return; }
  const ctx = getContext() || {};
  const userName = ctx?.name1 || '我';
  const now = new Date();
  const ts = `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;
  const dateStr = `${now.getMonth()+1}-${now.getDate()}`;
  const post = {
    id: `xhs_user_${Date.now()}`,
    from: 'user',
    user: userName,
    title: title || body.slice(0,20) + (body.length>20?'…':''),
    body,
    tag,
    likes: Math.floor(Math.random() * 90000) + 10000,
    likedByUser: false,
    comments: [],
    time: ts,
    date: dateStr,
  };
  STATE.xhsFeed = STATE.xhsFeed || [];
  STATE.xhsFeed.unshift(post);
  // 立即预置3条评论（让详情页不空），再异步AI追加
  const ctx2 = getContext() || {};
  const charName2 = ctx2?.name2 || ctx2?.name || 'TA';
  const charLast2 = charName2.split(/\s+/).pop() || charName2;
  const rndInt2 = (a,b) => Math.floor(Math.random()*(b-a+1))+a;
  const ts2 = () => { const h=rndInt2(8,23),m=rndInt2(0,59); return `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}`; };
  post.comments = []; // 评论由 AI 异步生成
  saveState();
  // 清空表单
  $('#rp-xhs-post-title').val('');
  $('#rp-xhs-post-body').val('');
  $('.rp-xhs-tag-btn').removeClass('rp-xhs-tag-selected');
  STATE.xhsSelectedTag = '日常';
  go('xhs');
  renderXHSFeed(false);
  // 延迟触发AI追加评论（API可用时）
  setTimeout(() => generateXHSStrangerComments(post.id), 2000);
}

// AI 生成陌生网友评论（多性格）
async function generateXHSStrangerComments(postId) {
  const post = (STATE.xhsFeed || []).find(p => p.id === postId);
  if (!post || post.from !== 'user') return;
  const ctx = getContext() || {};
  const charName = ctx?.name2 || ctx?.name || 'TA';
  const charLast = charName.split(/\s+/).pop() || charName;

  const userName = ctx?.name1 || '楼主';

  const sysMsg = `你是一个小红书评论模拟器。以下帖子是由用户${userName}本人发的，模拟5位性格各异的陌生网友评论。

人物关系说明（严格遵守，不能混淆）：
- 帖子里的"我"="我的"="我爸/我妈/我家人" = 发帖人${userName}自己的视角
- ${charName}（姓${charLast}）是帖子中涉及到的另一个人物，不是发帖人
- 评论者是不认识${userName}的陌生网友，他们通过帖子内容来理解人物关系

评论要求：
- 每条评论必须紧扣帖子实际内容，不能搞错人物关系
- 评论有实质内容，不只是"坐等后续"空话
- 猜测八卦型可以点出${charName}/${charLast}的名字

性格类型（各一条）：
1. 吃瓜补料型：结合帖子内容补充信息或目击经历
2. 担心共情型：针对帖子情境表达具体担忧
3. 阴阳怪气型：用正常语气阴阳，有具体所指
4. 无脑力挺型：支持${userName}立场，情绪化但有观点
5. 猜测爆瓜型：点出${charName}名字，八卦语气

每条15-30字，口语化，带emoji昵称。
只返回JSON：[{"user":"昵称","text":"评论内容"}]`;

  const prompt = `帖子标题：${post.title}\n帖子内容：${post.body}`;
  const resp = await lgCallAPI(prompt, 400, sysMsg);
  if (!resp) {
    // API 失败：静默处理，不用假评论充数
    return;
  }

  let items = [];
  try {
    const match = resp.match(/\[[\s\S]*\]/);
    if (match) items = JSON.parse(match[0]);
  } catch(e) { return; }
  if (!Array.isArray(items) || items.length === 0) return;

  const now = new Date();
  const baseTs = now.getTime();
  items.forEach((item, i) => {
    if (!item.user || !item.text) return;
    const t = new Date(baseTs + (i+1)*15000);
    const ts = `${String(t.getHours()).padStart(2,'0')}:${String(t.getMinutes()).padStart(2,'0')}`;
    post.comments = post.comments || [];
    post.comments.push({ from: 'stranger_'+i, user: item.user, text: item.text, time: ts, replyTo: null });
  });
  saveState();
  // 如果当前正在看这篇帖子的详情页，刷新评论区
  if (STATE.currentView === 'xhs-detail' && STATE.xhsCurrentPost === postId) {
    renderXHSDetail(post);
  }
}

// 用户在详情页发评论
async function sendXHSComment(postId, text, replyToCidx) {
  const post = (STATE.xhsFeed || []).find(p => p.id === postId);
  if (!post || !text.trim()) return;
  const ctx = getContext() || {};
  const userName = ctx?.name1 || '我';
  const now = new Date();
  const ts = `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;
  post.comments = post.comments || [];
  const replyToIdx = (replyToCidx !== null && replyToCidx !== undefined && post.comments[replyToCidx]) ? replyToCidx : null;
  post.comments.push({ from: 'user', user: userName, text: text.trim(), time: ts, replyTo: replyToIdx });
  STATE.xhsReplyToCidx = null;
  $('#rp-xhs-detail-input').val('').attr('placeholder','发表评论…');
  saveState();
  renderXHSDetail(post);
  // 触发一个陌生网友接话（必触发，让互动感更真实）
  setTimeout(() => generateXHSReplyToComment(postId, text.trim(), userName), 1200);
}

// 陌生网友回复用户评论（3条，3种侧重，错峰推送）
async function generateXHSReplyToComment(postId, userComment, userName) {
  const post = (STATE.xhsFeed || []).find(p => p.id === postId);
  if (!post) return;
  const ctx = getContext() || {};
  const charName = ctx?.name2 || ctx?.name || 'TA';
  const charLast = charName.split(/\s+/).pop() || charName;
  const recentComments = (post.comments||[]).slice(-5).map(c=>`${c.user}：${c.text}`).join('\n');

  const sysMsg = `你是小红书评论区生成器。根据帖子内容和用户评论，生成3个自然贴切的陌生网友回复。
要求：
- 3条回复必须紧扣帖子主题和用户说的话，不能答非所问
- 3条风格各异（如追问细节、调侃起哄、加料补充、共情、质疑等），根据帖子和评论内容自然选择
- 每条15-25字，口语化小红书风格，昵称带emoji有创意
帖子背景：涉及用户与 ${charName}（姓${charLast}）的相关话题。
只返回JSON数组：[{"user":"昵称emoji","text":"回复内容"},{"user":"昵称emoji","text":"回复内容"},{"user":"昵称emoji","text":"回复内容"}]`;

  const prompt = `帖子标题：${post.title}\n近期评论：\n${recentComments}\n用户${userName}刚说：「${userComment}」\n生成3条回复JSON：`;

  const resp = await lgCallAPI(prompt, 300, sysMsg);
  if (!resp) return;

  let replies = [];
  try {
    const m = resp.replace(/^```(?:json)?\s*/i,'').replace(/\s*```$/,'').trim().match(/\[[\s\S]*\]/);
    if (m) replies = JSON.parse(m[0]);
  } catch(e) {
    // fallback：尝试单条
    try {
      const m2 = resp.match(/\{[\s\S]*?\}/g);
      if (m2) replies = m2.map(s => { try { return JSON.parse(s); } catch(e2) { return null; } }).filter(Boolean);
    } catch(e3) {}
  }
  if (!replies.length) return;

  // 找到用户刚才那条评论的 index
  const _revIdx = [...post.comments].reverse().findIndex(c => c.from === 'user');
  const userCidx = _revIdx >= 0 ? post.comments.length - 1 - _revIdx : null;

  // 错峰推送：0s / 1.5s / 3.5s
  const delays = [0, 1500, 3500];
  replies.slice(0, 3).forEach((r, i) => {
    setTimeout(() => {
      const p2 = (STATE.xhsFeed || []).find(x => x.id === postId);
      if (!p2) return;
      const now = new Date();
      const ts = `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;
      const nick = r.user || '路人甲🍿';
      const replyText = (r.text || '').trim();
      if (!replyText) return;
      const refIdx = (userCidx !== null && userCidx < p2.comments.length) ? userCidx : null;
      p2.comments.push({ from: 'stranger_reply', user: nick, text: replyText, time: ts, replyTo: refIdx });
      saveState();
      if (STATE.currentView === 'xhs-detail' && STATE.xhsCurrentPost === postId) {
        renderXHSDetail(p2);
      }
    }, delays[i]);
  });
}

// XHS 点赞切换
function toggleXHSLike(postId) {
  const post = (STATE.xhsFeed || []).find(p => p.id === postId);
  if (!post) return;
  post.likedByUser = !post.likedByUser;
  post.likes = post.likedByUser ? post.likes + 1 : Math.max(0, post.likes - 1);
  saveState();
  // 更新详情页按钮（如果在详情页）
  const likeK = post.likes >= 10000 ? (post.likes/10000).toFixed(1)+'w' : post.likes >= 1000 ? (post.likes/1000).toFixed(1)+'k' : post.likes;
  $('#rp-xhs-like-btn').css('color', post.likedByUser ? '#ff2442' : '#bbb').html(`${post.likedByUser?'❤️':'🤍'} <span id="rp-xhs-like-count">${likeK}</span>`);
}

function escHtml(str) {
  return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function incomingMoment(fromRaw, time, text, img) {
  const momentId = fromRaw.toLowerCase().replace(/\s+/g,'_') + '_' + time.replace(':','');
  if (STATE.moments.find(m => m.id === momentId)) return;
  const threadId = matchThread(fromRaw);
  const th = STATE.threads[threadId];
  STATE.moments = STATE.moments || [];
  STATE.moments.push({
    id: momentId,
    from: threadId || fromRaw,
    name: th ? th.name : fromRaw,
    initials: th ? th.initials : fromRaw.slice(0,2).toUpperCase(),
    avatarBg: th ? th.avatarBg : 'linear-gradient(145deg,#555,#333)',
    time, text,
    img: img || null,
    likes: [],
    comments: [],
  });
  if (STATE.currentView === 'moments') renderMoments();
  showBanner((th ? th.name : fromRaw), '发了朋友圈：' + text.slice(0,25) + (text.length>25?'…':''), time);
  saveState();
  // 好友自动点赞+评论
  setTimeout(() => friendsInteractOnMoment(momentId), 1500);
}

function incomingComment(momentId, fromRaw, time, text, replyTo) {
  let moment = STATE.moments && STATE.moments.find(m => m.id === momentId || m.id.includes(momentId));
  if (!moment) {
    // Fallback: apply to most recent user moment if any exist
    const userMoments = (STATE.moments || []).filter(m => m.from === 'user');
    moment = userMoments.length > 0 ? userMoments[userMoments.length - 1] : null;
  }
  if (!moment) return;
  const threadId = matchThread(fromRaw);
  const th = STATE.threads[threadId];
  const name = th ? th.name : fromRaw;
  let replyToIdx = null;
  if (replyTo) {
    replyToIdx = moment.comments.findIndex(cm => cm.name === replyTo);
    if (replyToIdx < 0) replyToIdx = null;
  }
  moment.comments = moment.comments || [];
  moment.comments.push({ from: threadId || fromRaw, name, text, time, replyTo: replyToIdx });
  if (STATE.currentView === 'moments') renderMoments();
  saveState();
}

function toggleLike(momentId) {
  const moment = STATE.moments && STATE.moments.find(m => m.id === momentId);
  if (!moment) return;
  const idx = moment.likes.indexOf('user');
  if (idx >= 0) moment.likes.splice(idx, 1);
  else moment.likes.push('user');
  renderMoments();
  saveState();
}

async function sendMomentComment(momentId, text, replyToName) {
  const moment = STATE.moments && STATE.moments.find(m => m.id === momentId);
  if (!moment || !text.trim()) return;
  const now = new Date();
  const ts = `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;
  let replyToIdx = null;
  if (replyToName) {
    replyToIdx = moment.comments.findIndex(cm => cm.name === replyToName);
    if (replyToIdx < 0) replyToIdx = null;
  }
  moment.comments = moment.comments || [];
  moment.comments.push({ from: 'user', name: '我', text: text.trim(), time: ts, replyTo: replyToIdx });
  renderMoments();
  saveState();
  // 直接调 API 生成回复，不走 ST send_textarea
  if (moment.from !== 'user') {
    // 评论的是 AI 角色的动态 → 该角色回复（用 moment.name 而不是 moment.from）
    setTimeout(() => generateAIReply(momentId, text.trim(), moment.name), 600);
  } else {
    // 评论的是用户自己的动态 → 触发 AI 社交互动
    setTimeout(() => momentAISocial(momentId), 600);
  }
}

// ================================================================
// ================================================================
//  2048 GAME - 互动版（user/char 轮流）
// ================================================================

const LG2048 = {
  board: [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]],
  score: 0,
  best: parseInt(localStorage.getItem('g2048_best') || '0'),
  turn: 'user',    // 'user' | 'char'
  active: false,
  processing: false,
  won: false,
  charName: '\u5bf9\u65b9',
};

// ── Slide one row leftward ──────────────────────────────────────
function g2048SlideRow(row) {
  var r = row.filter(function(x) { return x !== 0; });
  var score = 0;
  for (var i = 0; i < r.length - 1; i++) {
    if (r[i] === r[i + 1]) {
      r[i] *= 2;
      score += r[i];
      r.splice(i + 1, 1);
    }
  }
  while (r.length < 4) r.push(0);
  return { row: r, score: score };
}

// ── Matrix helpers ─────────────────────────────────────────────
function g2048Transpose(b) {
  return b[0].map(function(_, c) { return b.map(function(r) { return r[c]; }); });
}
function g2048RevRows(b) {
  return b.map(function(r) { return r.slice().reverse(); });
}

// ── Apply a direction to a board copy ─────────────────────────
function g2048Apply(b, dir) {
  var board = b.map(function(r) { return r.slice(); });
  if (dir === 'right')      board = g2048RevRows(board);
  else if (dir === 'up')    board = g2048Transpose(board);
  else if (dir === 'down')  { board = g2048Transpose(board); board = g2048RevRows(board); }

  var totalScore = 0, changed = false;
  board = board.map(function(row) {
    var res = g2048SlideRow(row);
    totalScore += res.score;
    if (res.row.some(function(v, i) { return v !== row[i]; })) changed = true;
    return res.row;
  });

  if (dir === 'right')      board = g2048RevRows(board);
  else if (dir === 'up')    board = g2048Transpose(board);
  else if (dir === 'down')  { board = g2048RevRows(board); board = g2048Transpose(board); }

  return { board: board, score: totalScore, changed: changed };
}

// ── Add a random tile (90% → 2, 10% → 4) ─────────────────────
function g2048AddTile() {
  var empty = [];
  LG2048.board.forEach(function(row, r) {
    row.forEach(function(v, co) { if (v === 0) empty.push([r, co]); });
  });
  if (!empty.length) return;
  var pos = empty[Math.floor(Math.random() * empty.length)];
  LG2048.board[pos[0]][pos[1]] = Math.random() < 0.9 ? 2 : 4;
}

// ── Check if any move is still possible ───────────────────────
function g2048HasMoves() {
  return ['left','right','up','down'].some(function(d) { return g2048Apply(LG2048.board, d).changed; });
}

// ── Char's greedy best direction ──────────────────────────────
function g2048BestDir() {
  var dirs = ['left','right','up','down'];
  var best = null, bestVal = -1;
  dirs.forEach(function(dir) {
    var res = g2048Apply(LG2048.board, dir);
    if (!res.changed) return;
    var flat = res.board.reduce(function(a, r) { return a.concat(r); }, []);
    var empty = flat.filter(function(x) { return x === 0; }).length;
    var maxTile = Math.max.apply(null, flat);
    // Corner bonus: max tile in any corner
    var corners = [res.board[3][3], res.board[3][0], res.board[0][0], res.board[0][3]];
    var cornerBonus = corners.indexOf(maxTile) >= 0 ? 40 : 0;
    var val = res.score * 2 + empty * 10 + cornerBonus;
    if (val > bestVal) { bestVal = val; best = dir; }
  });
  // Fallback: any valid dir
  if (!best) best = dirs.find(function(d) { return g2048Apply(LG2048.board, d).changed; }) || null;
  return best;
}

// ── Strip action descriptions from 2048 chat ──────────────────
// ── Clean persona for 2048 (strip system directives) ──────────────
function g2048GetPersona() {
  try {
    var ctx = (typeof getContext === 'function') ? getContext() : {};
    if (!ctx) ctx = {};
    var char = (ctx.characters && ctx.characterId !== undefined) ? ctx.characters[ctx.characterId] : null;
    if (!char && typeof this_chid !== 'undefined' && window.characters) char = window.characters[this_chid];
    if (!char) return '';
    // 优先 personality，其次 description 前 300 字
    var src = (char.personality || '').trim() || (char.description || '').substring(0, 300).trim();
    if (!src) return '';
    // 只过滤系统指令行，保留角色性格描述
    var filtered = src.split(/[\n。！]/).filter(function(line) {
      var l = line.trim();
      if (!l) return false;
      if (/[权限指令系统][：:]/.test(l)) return false;
      if (/互动[权限指令]/.test(l)) return false;
      if (/开启[共扮演示]/.test(l)) return false;
      if (/^[A-Z][a-z]+:/.test(l)) return false;
      return true;
    }).slice(0, 6).join('，');
    return filtered.trim() ? '【请严格扮演以下角色】' + filtered.trim() + '。' : '';
  } catch(e) { return ''; }
}

function g2048StripActions(text) {
  if (!text) return text;
  // Remove （action）*action* (action) patterns
  text = text.replace(/[\uff08(][^\uff09)]{1,30}[\uff09)]/g, '').replace(/\*[^*]{1,25}\*/g, '');
  // Strip surrounding quotes
  text = text.replace(/^[\u201c\u201d\u2018\u2019\u300c\u300d"'\uff02]+/, '').replace(/[\u201c\u201d\u2018\u2019\u300c\u300d"'\uff02]+$/, '');
  // Remove ellipses (…… … ...)
  text = text.replace(/…{1,4}/g, '').replace(/\.{2,}/g, '');
  // Drop system-directive-looking responses entirely
  if (/[权限指令系统][：:]/.test(text) || /互动[权限]/.test(text) || /开启共演/.test(text)) return '';
  // Collapse extra spaces
  text = text.replace(/\s{2,}/g, ' ').trim();
  return text;
}

// ── Render board + UI ──────────────────────────────────────────
function g2048Render() {
  var board = document.getElementById('g2048-board');
  if (!board) return;
  board.innerHTML = '';
  LG2048.board.forEach(function(row) {
    row.forEach(function(v) {
      var cell = document.createElement('div');
      cell.className = 'g2048-cell';
      if (v > 0) {
        var tile = document.createElement('div');
        tile.className = 'g2048-tile';
        tile.setAttribute('data-v', v > 2048 ? 'high' : v);
        tile.style.fontSize = v >= 1024 ? '14px' : v >= 128 ? '17px' : v >= 8 ? '20px' : '22px';
        tile.textContent = v;
        cell.appendChild(tile);
      }
      board.appendChild(cell);
    });
  });
  $('#g2048-score').text(LG2048.score);
  $('#g2048-best').text(LG2048.best);
  var turn = LG2048.processing
    ? LG2048.charName + '\u601d\u8003\u4e2d\u2026'
    : LG2048.turn === 'user' ? '\u4f60\u7684\u56de\u5408' : LG2048.charName + '\u7684\u56de\u5408\u2026';
  $('#g2048-turn').text(turn);
}

// ── Chat message ──────────────────────────────────────────────
function g2048Msg(type, text) {
  var cls = type === 'user' ? 'game-msg-user' : type === 'char' ? 'game-msg-char' : 'game-msg-sys';
  var pre = type === 'char' ? LG2048.charName + ': ' : '';
  $('#g2048-chat').append('<div class="game-msg ' + cls + '">' + pre + text + '</div>');
  var el = document.getElementById('g2048-chat');
  if (el) el.scrollTop = el.scrollHeight;
}

// ── Init new game ─────────────────────────────────────────────
function g2048Init() {
  var ctx = getContext ? getContext() : {};
  LG2048.charName = (ctx && (ctx.name2 || ctx.name)) || '\u5bf9\u65b9';
  LG2048.board = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
  LG2048.score = 0;
  LG2048.best = parseInt(localStorage.getItem('g2048_best') || '0');
  LG2048.turn = 'user';
  LG2048.active = true;
  LG2048.processing = false;
  LG2048.won = false;
  g2048AddTile(); g2048AddTile();
  $('#g2048-over').hide();
  $('#g2048-chat').empty();
  g2048Render();
  g2048Msg('sys', '\u6e38\u620f\u5f00\u59cb\uff01\u4e00\u8d77\u5e72\u5230 2048 \u5427\uff01\ud83c\udf89');
}

// ── User move ─────────────────────────────────────────────────
function g2048UserMove(dir) {
  if (!LG2048.active || LG2048.processing || LG2048.turn !== 'user') return;
  var res = g2048Apply(LG2048.board, dir);
  if (!res.changed) return;
  LG2048.board = res.board;
  LG2048.score += res.score;
  if (LG2048.score > LG2048.best) {
    LG2048.best = LG2048.score;
    localStorage.setItem('g2048_best', LG2048.best);
  }
  g2048AddTile();
  g2048Render();
  // Check 2048 win after user move
  var flat = LG2048.board.reduce(function(a, r) { return a.concat(r); }, []);
  if (!LG2048.won && flat.indexOf(2048) >= 0) {
    LG2048.won = true;
    LG2048.active = false;
    g2048Msg('sys', '\ud83c\udf89 \u8fbe\u62102048\uff01\u4f60\u4eec\u8d62\u4e86\uff01');
    $('#g2048-over-emoji').text('\ud83c\udf89');
    $('#g2048-over-title').text('\u8fbe\u62102048\uff01');
    $('#g2048-over-sub').text('\u4f60\u4eec\u5408\u529b\u5b8c\u6210\u4e86\uff01');
    $('#g2048-over').css('display', 'flex');
    var persona = g2048GetPersona();
    var wp = (persona ? persona + '\n' : '') + '\u3010\u6e38\u620f\u573a\u666f\u3011\u6211\u4eec\u5728\u4e00\u8d772048\u6570\u5b57\u62fc\u76d8\u6e38\u620f\u4e2d\u5408\u529b\u8fbe\u6210\u4e862048\uff01\u4ee5\u89d2\u8272\u53e3\u5428\u8bf4\u4e00\u53e5\u5e86\u795d\uff0820\u5b57\u5185\uff0c\u7eaf\u5bf9\u8bdd\uff0c\u4e0d\u8981\u52a8\u4f5c\u63cf\u5199\uff0c\u8bf4\u8bdd\u6d41\u7545\u7981\u6b62\u7701\u7565\u53f7\uff09\uff1a';
    lgCallAPI(wp, 80).then(function(r) {
      if (r) g2048Msg('char', g2048StripActions(cleanGameReply(r, LG2048.charName)));
    });
    return;
  }
  if (!g2048HasMoves()) { g2048GameOver(); return; }
  // Hand off to char
  LG2048.processing = true;
  LG2048.turn = 'char';
  g2048Render();
  setTimeout(g2048CharTurn, 1000 + Math.random() * 600);
}

// ── Char turn ─────────────────────────────────────────────────
function g2048CharTurn() {
  if (!LG2048.active) return;
  var dir = g2048BestDir();
  if (!dir) { g2048GameOver(); return; }
  var dirCN = { left: '\u5411\u5de6', right: '\u5411\u53f3', up: '\u5411\u4e0a', down: '\u5411\u4e0b' }[dir];
  var res = g2048Apply(LG2048.board, dir);
  LG2048.board = res.board;
  LG2048.score += res.score;
  if (LG2048.score > LG2048.best) {
    LG2048.best = LG2048.score;
    localStorage.setItem('g2048_best', LG2048.best);
  }
  g2048AddTile();
  g2048Render();
  // Check 2048 after char move
  var flat2 = LG2048.board.reduce(function(a, r) { return a.concat(r); }, []);
  if (!LG2048.won && flat2.indexOf(2048) >= 0) {
    LG2048.won = true;
    g2048Msg('sys', '\ud83c\udf89 ' + LG2048.charName + '\u4e00\u6b65\u8fbe\u62102048\uff01\u5927\u5bb6\u8d62\u4e86\uff01');
    $('#g2048-over-emoji').text('\ud83c\udf89');
    $('#g2048-over-title').text('\u8fbe\u62102048\uff01');
    $('#g2048-over-sub').text('\u5927\u5bb6\u4e00\u8d77\u5b8c\u6210\u4e86\uff01');
    $('#g2048-over').css('display', 'flex');
    LG2048.active = false;
    LG2048.processing = false;
    return;
  }
  if (!g2048HasMoves()) { LG2048.processing = false; g2048GameOver(); return; }
  // Non-blocking AI comment
  var persona = g2048GetPersona();
  var scoreNote = res.score > 0 ? '\uff0c\u5408\u5e76\u5f97\u5206' + res.score : '';
  var p = (persona ? persona + '\n' : '') + '\u3010\u6e38\u620f\u573a\u666f\u3011\u6211\u4eec\u6b63\u5728\u4e00\u8d772048\u6570\u5b57\u62fc\u76d8\u6e38\u620f\u3002\u6211\u521a\u521a\u9009\u62e9\u5411' + dirCN + '\u6ed1\u52a8' + scoreNote + '\u3002\u5f53\u524d\u6700\u9ad8\u683c' + Math.max.apply(null, LG2048.board.reduce(function(a,r){return a.concat(r);},[])) + '\u3002\u8bf4\u4e00\u53e5\uff0820\u5b57\u5185\uff0c\u7eaf\u5bf9\u8bdd\uff0c\u4e0d\u5e26\u5f15\u53f7\uff09\uff1a';
  LG2048.commentCount = (LG2048.commentCount || 0) + 1;
  if (LG2048.commentCount % 2 === 0) {
    lgCallAPI(p, 70).then(function(r) {
      if (r && LG2048.active) g2048Msg('char', g2048StripActions(cleanGameReply(r, LG2048.charName)));
    });
  }
  LG2048.turn = 'user';
  LG2048.processing = false;
  g2048Render();
}

// ── Game over ─────────────────────────────────────────────────
function g2048GameOver() {
  LG2048.active = false;
  LG2048.processing = false;
  g2048Msg('sys', '\u6ca1\u6709\u53ef\u79fb\u52a8\u7684\u683c\u5b50\u4e86\uff01\u6700\u7ec8\u5f97\u5206\uff1a' + LG2048.score);
  $('#g2048-over-emoji').text('\ud83d\ude05');
  $('#g2048-over-title').text('\u6e38\u620f\u7ed3\u675f');
  $('#g2048-over-sub').text('\u6700\u7ec8\u5f97\u5206\uff1a' + LG2048.score + '\uff0c\u4e0b\u6b21\u52a0\u6cb9\uff01');
  $('#g2048-over').css('display', 'flex');
}

// ── In-game chat ──────────────────────────────────────────────
function g2048Chat(text) {
  if (!text) return;
  g2048Msg('user', text);
  if (!LG2048.active && !LG2048.won) return;
  var persona = g2048GetPersona();
  var ctx = getContext ? getContext() : {};
  var userName = (ctx && ctx.name1) || '\u4f60';
  var p = (persona ? persona + '\n' : '') + userName + '\u5728 2048 \u6e38\u620f\u4e2d\u8bf4\uff1a\u300c' + text + '\u300d\n' + '\u3010\u6e38\u620f\u573a\u666f\u3011\u6211\u4eec\u6b63\u5728\u73a9\u6e38\u620f\u3002' + LG2048.charName + '\u7684\u56de\u5e94\uff0815-25\u5b57\uff0c\u7eaf\u5bf9\u8bdd\u4e0d\u8981\u52a8\u4f5c\u63cf\u5199\uff0c\u8bf4\u8bdd\u6d41\u7545\u7981\u6b62\u7701\u7565\u53f7\uff0c\u7b26\u5408\u89d2\u8272\u6027\u683c\uff09\uff1a';
  lgCallAPI(p, 100).then(function(r) {
    if (r) g2048Msg('char', g2048StripActions(cleanGameReply(r, LG2048.charName)));
  });
}

// ── Touch swipe ───────────────────────────────────────────────
(function() {
  var _ts = null;
  document.addEventListener('touchstart', function(e) {
    var wrap = document.getElementById('g2048-board-wrap');
    if (!wrap || !wrap.contains(e.target)) return;
    if (!LG2048.active || LG2048.processing || LG2048.turn !== 'user') return;
    var t = e.touches[0];
    _ts = { x: t.clientX, y: t.clientY };
  }, { passive: true });
  document.addEventListener('touchend', function(e) {
    if (!_ts) return;
    var wrap = document.getElementById('g2048-board-wrap');
    if (!wrap) { _ts = null; return; }
    if (!LG2048.active || LG2048.processing || LG2048.turn !== 'user') { _ts = null; return; }
    var t = e.changedTouches[0];
    var dx = t.clientX - _ts.x;
    var dy = t.clientY - _ts.y;
    _ts = null;
    if (Math.abs(dx) < 28 && Math.abs(dy) < 28) return;
    var dir = Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? 'right' : 'left') : (dy > 0 ? 'down' : 'up');
    g2048UserMove(dir);
  }, { passive: true });
})();

//  LUDO GAME
// ================================================================

// 13×13 board, CELL=20px → 260px
// Common path: 48 squares [row, col], clockwise from User entry
const LUDO_PATH = [
  [12,5],[11,5],[10,5],[9,5],[8,5],            // 0-4  : up left col of bottom arm
  [7,5],[7,4],[7,3],[7,2],[7,1],[7,0],          // 5-10 : left across row7
  [6,0],[5,0],                                  // 11-12: up left side
  [5,1],[5,2],[5,3],[5,4],[5,5],                // 13-17: right across row5
  [4,5],[3,5],[2,5],[1,5],[0,5],                // 18-22: up left col of top arm
  [0,6],                                        // 23   : top centre
  [0,7],[1,7],[2,7],[3,7],[4,7],                // 24-28: down right col of top arm ← Char entry
  [5,7],[5,8],[5,9],[5,10],[5,11],[5,12],       // 29-34: right across row5
  [6,12],[7,12],                                // 35-36: down right side
  [7,11],[7,10],[7,9],[7,8],[7,7],              // 37-41: left across row7
  [8,7],[9,7],[10,7],[11,7],[12,7],             // 42-46: down right col of bottom arm
  [12,6],                                       // 47   : bottom centre ← User re-entry / home start
];
const LUDO_PATH_LEN = LUDO_PATH.length; // 48

// Home-run lanes (5 squares, col6, toward centre row6)
const USER_HOME_RUN = [[11,6],[10,6],[9,6],[8,6],[7,6]];  // up col6
const CHAR_HOME_RUN = [[1,6],[2,6],[3,6],[4,6],[5,6]];    // down col6

// Absolute path indices that are "safe" squares (can't eat)
const LUDO_SAFE = new Set([0, 12, 24, 36]);
// ── Square events (格子事件) ───────────────────────────────────────
const SQUARE_EVENTS = {
  2:  { emoji:'💬', text:'说一句情话', note:'请在下方对话框分享', type:'talk' },
  3:  { emoji:'💭', text:'回忆第一次心动', note:'请在下方对话框分享', type:'talk' },
  5:  { emoji:'🤗', text:'给对方一个拥抱', note:'请在对话框互动（需有动作描写）', type:'action' },
  6:  { emoji:'🤫', text:'分享一个秘密', note:'请在下方对话框分享', type:'talk' },
  8:  { emoji:'✨', text:'赞美对方一句话', note:'请在下方对话框说', type:'talk' },
  10: { emoji:'📖', text:'说一件难忘往事', note:'请在下方对话框分享', type:'talk' },
  11: { emoji:'⬅️', text:'后退三格', note:'', type:'move', delta:-3 },
  13: { emoji:'😘', text:'轻轻吻对方脸颊', note:'请在对话框互动（需有动作描写）', type:'action' },
  15: { emoji:'💗', text:'说一句有关对方的真心话', note:'请在下方对话框说', type:'talk' },
  16: { emoji:'🍜', text:'喜欢吃什么？', note:'请在下方对话框回答', type:'talk' },
  18: { emoji:'❤️', text:'喜欢对方哪一点？', note:'请在下方对话框回答', type:'talk' },
  19: { emoji:'🥹', text:'分享一个感动瞬间', note:'请在下方对话框分享', type:'talk' },
  21: { emoji:'🥰', text:'叫对方最可爱的昵称', note:'请在下方对话框说', type:'talk' },
  23: { emoji:'🎁', text:'如果可以无条件提一个要求，会提什么？', note:'请在下方对话框回答', type:'talk' },
  24: { emoji:'💆', text:'给对方按摩肩膀1分钟', note:'请在对话框互动（需有动作描写）', type:'action' },
  26: { emoji:'🙈', text:'分享一个不为人知的小习惯', note:'请在下方对话框分享', type:'talk' },
  27: { emoji:'🌈', text:'对彼此未来的幻想是什么样的？', note:'请在下方对话框分享', type:'talk' },
  29: { emoji:'⏩', text:'前进六格', note:'', type:'move', delta:6 },
  31: { emoji:'🤝', text:'十指相扣30秒', note:'请在对话框互动（需有动作描写）', type:'action' },
  32: { emoji:'🎀', text:'最想收到什么礼物？', note:'请在下方对话框回答', type:'talk' },
  34: { emoji:'😊', text:'跟对方一起发生过的最开心的事是什么？', note:'请在下方对话框分享', type:'talk' },
  36: { emoji:'🎵', text:'给对方唱一小段情歌', note:'请在对话框互动（需有动作描写）', type:'action' },
  37: { emoji:'💫', text:'对方的存在让自己变成了更好的人了吗？', note:'请在下方对话框回答', type:'talk' },
  39: { emoji:'🫂', text:'亲密动作：轻轻拥抱并从背后环住', note:'请在对话框互动（需有动作描写）', type:'action' },
  40: { emoji:'👀', text:'对方什么时候看起来最好看？', note:'请在下方对话框回答', type:'talk' },
  42: { emoji:'⏸️', text:'停留此格，跳过下一轮', note:'', type:'skip' },
  44: { emoji:'🌟', text:'对对方连说三句夸奖的话', note:'请在下方对话框说', type:'talk' },
  45: { emoji:'⏩', text:'前进三格', note:'', type:'move', delta:3 },
  47: { emoji:'🏷️', text:'你最想给对方起的绰号是什么？', note:'请在下方对话框分享', type:'talk' },
  49: { emoji:'🎲', text:'幸运格！再掷一次骰子', note:'', type:'reroll' },
  50: { emoji:'🤏', text:'轻轻捏对方脸蛋保持三秒', note:'请在对话框互动（需有动作描写）', type:'action' },
  52: { emoji:'🧧', text:'给对方发个红包', note:'请在对话框互动', type:'action' },
  53: { emoji:'💍', text:'最终告白：说出"无论走到第几格，我都想和你一起"', note:'到达终点！', type:'talk' },
};


// Player entry indices into LUDO_PATH
const USER_ENTRY = 0;   // (12,5)
const CHAR_ENTRY = 24;  // (0,7)

// Positions: 0=home yard, 1-48=common path, 49-53=home run, 54=WIN
const LG = {
  active: false,
  userPos: 0,
  charPos: 0,
  turn: 'user',      // 'user'|'char'
  rolling: false,
  lastDice: 0,
  charName: '对方',
  chatLog: [],
};

const DICE_EMOJI = ['','⚀','⚁','⚂','⚃','⚄','⚅'];


/* ═══ FAB drag-to-move ═══ */
function lgInitFabDrag() {
  const fab = document.getElementById('rp-fab');
  if (!fab || fab._rpDrag) return;
  fab._rpDrag = true;

  let dragging = false, moved = false;

  function startDrag(cx, cy) {
    dragging = true; moved = false;
    const r = fab.getBoundingClientRect();
    fab._dx = cx; fab._dy = cy;
    fab._il = r.left; fab._it = r.top;
    // 用 !important 覆盖 CSS !important，确保拖拽时位置生效
    fab.style.setProperty('right',  'auto',        'important');
    fab.style.setProperty('bottom', 'auto',        'important');
    fab.style.setProperty('left',   r.left + 'px', 'important');
    fab.style.setProperty('top',    r.top  + 'px', 'important');
    fab.style.cursor = 'grabbing'; fab.style.transition = 'none';
  }

  function moveDrag(cx, cy) {
    if (!dragging) return;
    const dx = cx - fab._dx, dy = cy - fab._dy;
    if (Math.abs(dx) > 4 || Math.abs(dy) > 4) moved = true;
    const nL = Math.max(0, Math.min(window.innerWidth  - fab.offsetWidth,  fab._il + dx));
    const nT = Math.max(0, Math.min(window.innerHeight - fab.offsetHeight, fab._it + dy));
    fab.style.setProperty('left', nL + 'px', 'important');
    fab.style.setProperty('top',  nT + 'px', 'important');
  }

  function endDrag() {
    if (!dragging) return;
    dragging = false;
    fab.style.cursor = 'grab'; fab.style.transition = '';
    if (moved) {
      const posKey = IS_TOUCH_DEVICE ? 'rp_fab_pos_mobile' : 'rp_fab_pos';
      localStorage.setItem(posKey, JSON.stringify({ left: fab.style.left, top: fab.style.top }));
    }
  }

  // Mouse
  fab.addEventListener('mousedown', e => {
    if (e.button !== 0) return;
    e.preventDefault();
    startDrag(e.clientX, e.clientY);
    const mm = e2 => moveDrag(e2.clientX, e2.clientY);
    const mu = () => { endDrag(); document.removeEventListener('mousemove', mm); document.removeEventListener('mouseup', mu); };
    document.addEventListener('mousemove', mm);
    document.addEventListener('mouseup', mu);
  });

  // Touch
  fab.addEventListener('touchstart', e => {
    const t = e.touches[0]; startDrag(t.clientX, t.clientY);
    const tm = e2 => { e2.preventDefault(); const t2 = e2.touches[0]; moveDrag(t2.clientX, t2.clientY); };
    const te = () => { endDrag(); fab.removeEventListener('touchmove', tm); fab.removeEventListener('touchend', te); };
    fab.addEventListener('touchmove', tm, { passive: false });
    fab.addEventListener('touchend', te);
  }, { passive: true });

  // Block click after drag
  fab.addEventListener('click', e => { if (moved) { moved = false; e.stopImmediatePropagation(); } }, true);

  // Restore saved position (完全按设备类型分离，与 window.innerWidth 无关)
  try {
    const posKey = IS_TOUCH_DEVICE ? 'rp_fab_pos_mobile' : 'rp_fab_pos';
    const s = JSON.parse(localStorage.getItem(posKey) || 'null');
    if (s) {
      const fw = Math.max(fab.offsetWidth, 54);
      const fh = Math.max(fab.offsetHeight, 54);
      const l = Math.max(0, Math.min(window.innerWidth  - fw, parseFloat(s.left)));
      const t = Math.max(0, Math.min(window.innerHeight - fh, parseFloat(s.top)));
      fab.style.setProperty('right',  'auto',      'important');
      fab.style.setProperty('bottom', 'auto',      'important');
      fab.style.setProperty('left',   l + 'px',    'important');
      fab.style.setProperty('top',    t + 'px',    'important');
    }
  } catch(e) {}
}

function lgInit() {
  LG.active   = true;
  LG.userPos  = 0;
  LG.charPos  = 0;
  LG.turn     = 'user';
  LG.rolling  = false;
  LG.lastDice = 0;
  LG.chatLog     = [];
  LG.userSkip   = false;
  LG.charSkip   = false;
  LG.pendingReroll = null;
  LG.taskChatCount = 0;
  LG.justDidTask   = false;
  LG.taskActive    = null;

  const ctx = getContext();
  LG.charName = ctx?.name2 || ctx?.name || '对方';
  $('#rp-game-char-name').text(LG.charName);
  $('#rp-game-win').hide();
  $('#rp-game-chat').empty();
  $('#rp-dice-btn').prop('disabled', false);

  lgRender();
  // 启动棋盘动画循环（驱动 ♥ 闪烁）
  if (LG._animFrame) cancelAnimationFrame(LG._animFrame);
  const _animLoop = () => {
    if (!LG.active) return;
    lgRender();
    LG._animFrame = requestAnimationFrame(_animLoop);
  };
  LG._animFrame = requestAnimationFrame(_animLoop);
  lgStatus('你先出手 - 按🎲掷骰子！');
  lgMsg('sys', `游戏开始！先到终点者胜。粉=你，紫=${LG.charName}`);
  setTimeout(() => lgCharComment('game_start'), 900);
}

// Convert player position → canvas pixel coords
function lgCoords(player, pos) {
  const CELL = 20, H = CELL / 2;
  if (pos === 0) {
    // sitting in home yard
    return player === 'user' ? {x:2*CELL+H, y:10*CELL+H} : {x:10*CELL+H, y:2*CELL+H};
  }
  if (pos >= 54) {
    return {x:6*CELL+H, y:6*CELL+H}; // centre finish
  }
  if (pos >= 49) {
    const hr = player === 'user' ? USER_HOME_RUN : CHAR_HOME_RUN;
    const [r,c] = hr[pos - 49] || hr[hr.length-1];
    return {x:c*CELL+H, y:r*CELL+H};
  }
  const entry = player === 'user' ? USER_ENTRY : CHAR_ENTRY;
  const idx   = (entry + pos - 1) % LUDO_PATH_LEN;
  const [r,c] = LUDO_PATH[idx];
  return {x:c*CELL+H, y:r*CELL+H};
}

function lgRender() {
  const canvas = document.getElementById('rp-ludo-canvas');
  if (!canvas) return;
  const C = canvas.getContext('2d');
  const CELL = 20, N = 13, W = N * CELL;

  C.clearRect(0, 0, W, W);

  // ── Background ──
  C.fillStyle = '#faf5ff';
  C.fillRect(0, 0, W, W);

  // ── Cross arms ──
  C.fillStyle = '#f3e8ff';
  C.fillRect(5*CELL, 0, 3*CELL, W);
  C.fillRect(0, 5*CELL, W, 3*CELL);

  // ── Home zones ──
  const ugrd = C.createRadialGradient(2.5*CELL, 11*CELL, 4, 2.5*CELL, 11*CELL, 65);
  ugrd.addColorStop(0, '#fce4ec'); ugrd.addColorStop(1, '#f8bbd0');
  C.fillStyle = ugrd;
  C.fillRect(0, 8*CELL, 5*CELL, 5*CELL);
  const cgrd = C.createRadialGradient(10.5*CELL, 2*CELL, 4, 10.5*CELL, 2*CELL, 65);
  cgrd.addColorStop(0, '#ede9fe'); cgrd.addColorStop(1, '#c4b5fd');
  C.fillStyle = cgrd;
  C.fillRect(8*CELL, 0, 5*CELL, 5*CELL);
  C.fillStyle = '#f1f5f9';
  C.fillRect(0, 0, 5*CELL, 5*CELL);
  C.fillRect(8*CELL, 8*CELL, 5*CELL, 5*CELL);

  // ── Centre (candy gradient) ──
  const grad = C.createRadialGradient(6.5*CELL, 6.5*CELL, 2, 6.5*CELL, 6.5*CELL, 36);
  grad.addColorStop(0, '#f9a8d4'); grad.addColorStop(.4, '#c084fc');
  grad.addColorStop(.8, '#818cf8'); grad.addColorStop(1, '#bfdbfe');
  C.fillStyle = grad;
  C.fillRect(5*CELL, 5*CELL, 3*CELL, 3*CELL);

  // ── Path squares ──
  C.lineWidth = .5;
  LUDO_PATH.forEach(([r,c], idx) => {
    let fill = '#ffffff';
    if (c === 6 && r > 6) fill = '#fce4ec';
    if (c === 6 && r < 6) fill = '#ede9fe';
    // 只有玩家入口格（index 0 和 24）显示金星+黄色，index 12/36 是两人局不使用的入口，普通白格
    const isPlayerEntry = (idx === 0 || idx === 24);
    if (isPlayerEntry) fill = '#fef9c3';
    C.fillStyle = fill;
    C.strokeStyle = 'rgba(160,100,200,.1)';
    C.fillRect(c*CELL+.5, r*CELL+.5, CELL-1, CELL-1);
    C.strokeRect(c*CELL, r*CELL, CELL, CELL);
    if (isPlayerEntry) {
      C.fillStyle = 'rgba(217,119,6,.75)';
      C.font = `${CELL*.48}px serif`;
      C.textAlign = 'center'; C.textBaseline = 'middle';
      C.fillText('★', c*CELL+CELL/2, r*CELL+CELL/2);
    }
  });

  // ── Event markers - USER PATH ONLY (fix: 仅标注用户路径，避免误判) ──
  {
    const pulse = 0.5 + 0.5 * Math.abs(Math.sin(Date.now() / 800));
    C.save();
    Object.keys(SQUARE_EVENTS).forEach(posStr => {
      const pos = parseInt(posStr);
      if (pos >= 1 && pos <= 48) {
        const uIdx = (USER_ENTRY + pos - 1) % LUDO_PATH_LEN;
        const [ur, uc] = LUDO_PATH[uIdx];
        const mx = uc * CELL + CELL * 0.5;
        const my = ur * CELL + CELL * 0.5;
        const r  = CELL * 0.14 * (0.85 + 0.15 * pulse);
        C.beginPath();
        C.moveTo(mx,     my - r);
        C.lineTo(mx + r, my    );
        C.lineTo(mx,     my + r);
        C.lineTo(mx - r, my    );
        C.closePath();
        C.fillStyle = `rgba(219,39,119,${0.18 + 0.12 * pulse})`;
        C.fill();
      }
    });
    C.restore();
  }

  // ── Home-run lanes ──
  USER_HOME_RUN.forEach(([r,c]) => {
    C.fillStyle = '#fbcfe8'; C.strokeStyle = 'rgba(236,72,153,.15)';
    C.fillRect(c*CELL+.5, r*CELL+.5, CELL-1, CELL-1);
    C.strokeRect(c*CELL, r*CELL, CELL, CELL);
  });
  CHAR_HOME_RUN.forEach(([r,c]) => {
    C.fillStyle = '#ddd6fe'; C.strokeStyle = 'rgba(139,92,246,.15)';
    C.fillRect(c*CELL+.5, r*CELL+.5, CELL-1, CELL-1);
    C.strokeRect(c*CELL, r*CELL, CELL, CELL);
  });

  // ── Home zone markers (皇冠) ──
  const drawCrown = (cx, cy, color) => {
    const w   = CELL * 1.5;
    const ht  = CELL * 1.3;
    const bh  = CELL * 0.38;
    const top     = cy - ht / 2;
    const bot     = cy + ht / 2;
    const baseTop = bot - bh;
    const sideTop = top + ht * 0.42;
    const valley  = baseTop - ht * 0.08;
    C.beginPath();
    C.moveTo(cx - w,        bot);
    C.lineTo(cx - w,        baseTop);
    C.lineTo(cx - w * 0.60, sideTop);
    C.lineTo(cx - w * 0.26, valley);
    C.lineTo(cx,            top);
    C.lineTo(cx + w * 0.26, valley);
    C.lineTo(cx + w * 0.60, sideTop);
    C.lineTo(cx + w,        baseTop);
    C.lineTo(cx + w,        bot);
    C.closePath();
    C.fillStyle = color; C.globalAlpha = 0.68; C.fill(); C.globalAlpha = 1;
    C.strokeStyle = 'rgba(255,255,255,0.55)'; C.lineWidth = 1.3; C.stroke();
    [[cx - w*0.60, sideTop], [cx, top], [cx + w*0.60, sideTop]].forEach(([gx, gy]) => {
      C.beginPath(); C.arc(gx, gy, CELL * 0.13, 0, Math.PI * 2);
      C.fillStyle = 'rgba(255,255,255,0.9)'; C.fill();
    });
    [-0.55, 0, 0.55].forEach(dx => {
      C.beginPath(); C.arc(cx + dx * w, (bot + baseTop)/2, CELL*0.08, 0, Math.PI*2);
      C.fillStyle = 'rgba(255,255,255,0.45)'; C.fill();
    });
  };
  drawCrown(2.5*CELL, 10.5*CELL, '#ec4899');
  drawCrown(10.5*CELL, 2.5*CELL, '#7c3aed');

  // ── Centre star (canvas-drawn) ──
  {
    const cx = 6.5*CELL, cy = 6.5*CELL, oR = CELL*0.52, iR = CELL*0.2;
    C.beginPath();
    for (let i = 0; i < 5; i++) {
      const a = i * Math.PI * 2 / 5 - Math.PI / 2;
      C.lineTo(cx + oR * Math.cos(a), cy + oR * Math.sin(a));
      C.lineTo(cx + iR * Math.cos(a + Math.PI/5), cy + iR * Math.sin(a + Math.PI/5));
    }
    C.closePath();
    C.fillStyle = 'rgba(255,255,255,0.9)';
    C.shadowColor = 'rgba(255,255,255,0.5)'; C.shadowBlur = 5;
    C.fill(); C.shadowBlur = 0;
  }

  // ── Pieces ──
  lgDrawPiece(C, 'user', LG.userPos, CELL);
  lgDrawPiece(C, 'char', LG.charPos, CELL);
}

function lgDrawPiece(C, player, pos, CELL) {
  if (pos >= 54) return;
  const {x, y} = lgCoords(player, pos);
  const color = player === 'user' ? '#ec4899' : '#7c3aed';
  const ring  = player === 'user' ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.85)';
  C.shadowColor = 'rgba(0,0,0,0.2)'; C.shadowBlur = 5;
  C.beginPath(); C.arc(x, y, CELL*0.38, 0, Math.PI*2);
  C.fillStyle = color; C.fill();
  C.shadowBlur = 0;
  C.beginPath(); C.arc(x, y, CELL*0.38, 0, Math.PI*2);
  C.strokeStyle = ring; C.lineWidth = 1.8; C.stroke();
}

function lgRoll() { return Math.floor(Math.random() * 6) + 1; }

async function lgAnimDice() {
  for (let i = 0; i < 8; i++) {
    $('#rp-dice-face').text(DICE_EMOJI[Math.floor(Math.random()*6)+1]);
    await new Promise(r => setTimeout(r, 90));
  }
}

async function lgUserRoll() {
  if (!LG.active || LG.rolling || LG.turn !== 'user') return;
  // Check skip
  if (LG.userSkip) {
    LG.userSkip = false;
    lgMsg('sys', '⏸️ 你本轮停留，轮到对方了');
    LG.turn = 'char';
    lgStatus(`${LG.charName} 的回合...`);
    setTimeout(() => lgCharTurn(), 1200);
    return;
  }
  LG.rolling = true;
  $('#rp-dice-btn').prop('disabled', true).addClass('ludo-rolling');

  await lgAnimDice();
  $('#rp-dice-btn').removeClass('ludo-rolling');

  const n = lgRoll();
  LG.lastDice = n;
  $('#rp-dice-face').text(DICE_EMOJI[n]);
  lgMsg('sys', `你掷出 ${n} ${DICE_EMOJI[n]}`);

  await lgMove('user', n);

  // Pending reroll from square event
  if (LG.pendingReroll === 'user') {
    LG.pendingReroll = null;
    LG.rolling = false;
    lgStatus('🎲 幸运！再掷一次！');
    $('#rp-dice-btn').prop('disabled', false);
    return;
  }

  if (LG.userPos >= 53) { lgWin('user'); LG.rolling = false; return; }

  LG.rolling = false;
  if (n === 6) {
    lgStatus('掷出6！再来一次！');
    lgMsg('sys', '掷出6，再掷一次！');
    $('#rp-dice-btn').prop('disabled', false);
    setTimeout(() => lgCharComment(`dice_6`), 500);
  } else {
    LG.turn = 'char';
    lgStatus(`${LG.charName} 的回合...`);
    // ~50% chance: char reacts to user's dice roll before taking their turn
    if (Math.random() < 0.5) {
      setTimeout(() => lgCharComment(`dice_${n}`), 400);
    }
    setTimeout(() => lgCharTurn(), 1100 + Math.random()*500);
  }
}

async function lgCharTurn() {
  if (!LG.active) return;
  // Check skip
  if (LG.charSkip) {
    LG.charSkip = false;
    lgMsg('sys', `⏸️ ${LG.charName}本轮停留，轮到你了`);
    LG.turn = 'user';
    lgStatus('你的回合 - 按🎲掷骰子！');
    $('#rp-dice-btn').prop('disabled', false);
    return;
  }
  await lgAnimDice();

  const n = lgRoll();
  LG.lastDice = n;
  $('#rp-dice-face').text(DICE_EMOJI[n]);
  lgMsg('sys', `${LG.charName} 掷出 ${n} ${DICE_EMOJI[n]}`);

  await lgMove('char', n);

  // Pending reroll from square event
  if (LG.pendingReroll === 'char') {
    LG.pendingReroll = null;
    lgMsg('sys', `🎲 ${LG.charName}获得额外一次掷骰！`);
    setTimeout(() => lgCharTurn(), 800);
    return;
  }

  if (LG.charPos >= 53) { lgWin('char'); return; }

  if (n === 6) {
    lgMsg('sys', `${LG.charName} 掷出6，再掷！`);
    setTimeout(() => lgCharTurn(), 1000);
  } else {
    LG.turn = 'user';
    lgStatus('你的回合 - 按🎲掷骰子！');
    $('#rp-dice-btn').prop('disabled', false);
  }
}

async function lgMove(player, steps) {
  const isUser = player === 'user';
  const cur    = isUser ? LG.userPos : LG.charPos;

  let next = cur === 0 ? steps : cur + steps;

  // Home-run overflow: clamp to 53 (win), no bounce back
  if (next > 53) next = 53;
  if (next < 0)  next = 0;

  // Animate step-by-step
  // 出门时先在第1格停一帧，再继续
  if (cur === 0) {
    if (isUser) LG.userPos = 1; else LG.charPos = 1;
    lgRender();
    await new Promise(r => setTimeout(r, 200));
  }
  const start = Math.max(cur, 1);
  for (let p = start + 1; p <= next; p++) {
    if (isUser) LG.userPos = p; else LG.charPos = p;
    lgRender();
    await new Promise(r => setTimeout(r, 320));
  }

  if (isUser) LG.userPos = next; else LG.charPos = next;
  lgRender();

  // Home-run entry announcement
  if (next >= 49 && cur < 49) {
    lgMsg('sys', isUser ? '✨ 进入回家路！' : `✨ ${LG.charName}进入回家路！`);
  }

  // Eat check (only on common path 1-48)
  if (next >= 1 && next <= 48) {
    const myAbs  = ((isUser ? USER_ENTRY : CHAR_ENTRY) + next - 1) % LUDO_PATH_LEN;
    const opPos  = isUser ? LG.charPos : LG.userPos;
    if (opPos >= 1 && opPos <= 48) {
      const opAbs = ((!isUser ? USER_ENTRY : CHAR_ENTRY) + opPos - 1) % LUDO_PATH_LEN;
      if (myAbs === opAbs && !LUDO_SAFE.has(myAbs)) {
        if (isUser) { LG.charPos = 0; lgMsg('sys', `💥 你吃掉了${LG.charName}的棋子！`); }
        else        { LG.userPos = 0; lgMsg('sys', `💥 ${LG.charName}吃掉了你的棋子！`); }
        lgRender();
        await new Promise(r => setTimeout(r, 300));
      }
    }
  }

  // Trigger square event if applicable
  // 任务格基于【绝对物理格子】，user 和 char 踩到同一个物理格都触发
  // USER_ENTRY=0，所以 user 逻辑位 L → 绝对索引 L-1，userKey = absIdx+1
  // char 逻辑位 M → 绝对索引 (CHAR_ENTRY+M-1)%LEN → 同一套 userKey
  const finalPos = isUser ? LG.userPos : LG.charPos;
  let _evKey = null;
  if (finalPos >= 49 && finalPos <= 53) {
    // 回家跑道：保持各自逻辑位
    if (SQUARE_EVENTS[finalPos]) _evKey = finalPos;
  } else if (finalPos >= 1 && finalPos <= 48) {
    const _entry  = isUser ? USER_ENTRY : CHAR_ENTRY;
    const _absIdx = (_entry + finalPos - 1) % LUDO_PATH_LEN;
    const _userKey = _absIdx + 1; // USER_ENTRY=0 → abs+1 = user逻辑位
    if (SQUARE_EVENTS[_userKey]) _evKey = _userKey;
  }
  if (_evKey !== null) await lgTriggerSquareEvent(player, _evKey);
}

function lgStatus(txt) { $('#rp-game-status-text').text(txt); }

function lgMsg(type, text) {
  const cls = type === 'user' ? 'game-msg-user' : type === 'char' ? 'game-msg-char' : 'game-msg-sys';
  const pre  = type === 'char' ? `${LG.charName}: ` : '';
  const msgHtml = `<div class="game-msg ${cls}">${pre}${text}</div>`;
  $('#rp-game-chat').append(msgHtml);
  const el = document.getElementById('rp-game-chat');
  if (el) el.scrollTop = el.scrollHeight;
  // sync to fullscreen if open
  const fs = document.getElementById('rp-game-chat-fs');
  if (fs && fs.style.display !== 'none') {
    const body = document.getElementById('rp-game-chat-fs-body');
    if (body) { body.insertAdjacentHTML('beforeend', msgHtml); body.scrollTop = body.scrollHeight; }
  }
}

function lgWin(winner) {
  LG.active = false;
  if (LG._animFrame) { cancelAnimationFrame(LG._animFrame); LG._animFrame = null; }
  const isUser = winner === 'user';
  $('#game-win-emoji').text(isUser ? '🎉' : '😅');
  $('#game-win-title').text(isUser ? '你赢了！' : `${LG.charName} 赢了！`);
  $('#game-win-sub').text(isUser
    ? `你率先抵达终点！${LG.charName}甘拜下风～`
    : `${LG.charName}率先抵达终点！再来一局？`);
  $('#rp-game-win').show();
}

// ── AI commentary (calls ST generate pipeline silently) ──────────
// ── Strip AI noise, keep only first clean dialogue line ──────────────────────
function cleanGameReply(raw, charName) {
  // 0. Strip leading 'charName said/replied:' prefixes from AI output
  let text = raw;
  if (charName) {
    // e.g. '雷蒙德说', '雷蒙德：', '雷蒙德说"'
    const escaped = charName.replace(/[.*+?^${}()|\[\]\\]/g, '\\$&');
    text = text.replace(new RegExp('^\\s*' + escaped + '\\s*[\u8bf4\u9053\u7b54\u56de\u8868\u793a]?\\s*[\uff1a:"\u201c\u300c]?\\s*'), '');
  }
  // Also strip generic 'XXX said' patterns (1-6 CJK chars + verb)
  text = text.replace(/^[\s\u3000]*[\u4e00-\u9fa5]{1,6}(\u8bf4|\u9053|\u7b54|\u56de\u7b54|\u8f7b\u58f0\u9053)[\uff1a:\"\u201c\u300c]?\s*/, '');
  // 1. Remove <think>...</think> reasoning chains
  text = text.replace(/<think>[\s\S]*?<\/think>/gi, '').trim();
  // 2. Remove <PHONE>...</PHONE> terminal blocks
  text = text.replace(/<PHONE>[\s\S]*?<\/PHONE>/gi, '').trim();
  // 3. Remove XML/HTML-like tags (e.g. <创作规则>, <POWER:...>)
  text = text.replace(/<[^>]{1,60}>/g, '').trim();
  // 4. Strip markdown headings and bold/italic markers
  text = text.replace(/^#{1,6}\s*/gm, '').replace(/[*_]{1,3}([^*_]+)[*_]{1,3}/g, '$1').trim();
  // 5. Remove 【tag】 tokens and [ALL_CAPS_TAG] patterns at line start
  text = text.replace(/^【[^】]{1,15}】[：:＊]?\s*/gm, '').trim();
  text = text.replace(/^\[[A-Z][A-Z\s:_\-]{1,30}\]\s*/gm, '').trim();
  // 6. Try to extract quoted dialogue first (prompt ends with open ", AI fills in)
  // Match content between Chinese/English quotes, prefer shortest complete quote
  const quoteMatch = text.match(/["""「]([^"""」\n]{1,60})["""」]/);
  if (quoteMatch) {
    const q = quoteMatch[1].trim();
    if (q.length > 0 && q.length <= 60) return q;
  }
  // 7. Split lines, skip noise/meta/structured lines
  const noiseRe = /^(\d+[.)、]\s*[\[（【]|摘要[：:]|未解决|故事走向|DAILY_NOTE|FLASH_MEMORY|BROKEN_RULES|INBOX|jianbao|STATUS|GUANXI|POWER|DETOX|RULE|[★▌▶◆#\[<【]|---|我已|我必须|本轮我将|创作规则|遵循|以下是|如下[是：]|根据规则|落实[：:])/i;
  const isHeader = l => /[：:]\s*$/.test(l);
  const lines = text.split(/\n+/).map(l => l.trim()).filter(Boolean);
  // clean line: short (≤35 chars), not noise, not a header
  const clean = lines.find(l => l.length > 0 && l.length <= 60 && !noiseRe.test(l) && !isHeader(l));
  if (clean) return clean.replace(/^["""'「」]+|["""'「」]+$/g, '').trim();
  // fallback: try up to 50 chars, truncate at sentence boundary
  const clean2 = lines.find(l => l.length > 0 && l.length <= 80 && !noiseRe.test(l) && !isHeader(l));
  if (clean2) {
    const trimmed = clean2.replace(/^["""'「」]+|["""'「」]+$/g, '').trim();
    // cut at first sentence-ending punctuation within 35 chars
    const m = trimmed.match(/^.{1,35}[。！？…～]/);
    return m ? m[0] : trimmed.substring(0, 60);
  }
  // last resort: first line, strip leading noise symbols, truncate
  return (lines[0] || '').replace(/^[\d.、）)★▌▶◆#【\["'「]+\s*/, '').trim().substring(0, 50);
}

// ── Extract compact persona snippet from current ST character ─────────────────
function lgGetPersona() {
  try {
    // Try multiple ways to get context
    const ctx = getContext?.() || window.SillyTavern?.getContext?.() || {};

    // Try to get character from multiple sources
    let char = null;
    if (ctx.characters && ctx.characterId !== undefined) {
      char = ctx.characters[ctx.characterId];
    }
    // Fallback: try global this_chid
    if (!char && typeof this_chid !== 'undefined' && window.characters) {
      char = window.characters[this_chid];
    }

    if (!char) {
      console.warn('[Ludo] No character data found');
      return '';
    }

    const personality = (char.personality || '').replace(/\s+/g, ' ').trim();
    const description = (char.description || '').replace(/\s+/g, ' ').trim();
    const src = personality || description.substring(0, 200);

    if (src) {
      return `【角色人设】${src}。`;
    }
    return '';
  } catch(e) {
    console.error('[Ludo] lgGetPersona error:', e);
    return '';
  }
}
// Style pools for different character personalities
const LG_FALLBACK_POOLS = {
  // Formal/Upper-class (上位者, 严肃, 高傲)
  formal: {
    game_start : ['开始。','准备就绪。','公平竞争。','我先手。'],
    eaten_user : ['棋子被吃。','下次注意。','重来。'],
    user_win   : ['你赢了。下次不会如此。','运气不错。','承让。'],
    char_win   : ['我赢了。','实力使然。','还需进步。'],
    dice_1     : ['一点。','最小步数。','谨慎。'],
    dice_2     : ['两步。','稳步。','尚可。'],
    dice_3     : ['三点。','继续。','保持。'],
    dice_4     : ['四点。','不错。','进展。'],
    dice_5     : ['五点。','良好。','肯定。'],
    dice_6     : ['六点。出发。','最大。','很好。'],
  },
  // Casual/Friendly (轻松, 友好)
  casual: {
    game_start : ['开始吧！','准备好输了吗？','公平竞争哦~','我先出手？'],
    eaten_user : ['被你吃掉了...','下次我要报仇！','好过分，重来！'],
    user_win   : ['恭喜你赢了…下次我不会手软','你运气好','哎呀输了'],
    char_win   : ['我赢了～','看到没，就是这么强','你还需要练习哦'],
    dice_1     : ['才1步，加油！','哈，1点~','慢慢来'],
    dice_2     : ['2步，稳稳的','小步前进~','2点不错'],
    dice_3     : ['3步，继续！','走3格~','加油'],
    dice_4     : ['4步，有点猛','4格！','哦哦4点'],
    dice_5     : ['5步！势头不错','哇5点！','厉害5格'],
    dice_6     : ['哇！6！出发咯！','6最大！走起！','6点棒！'],
  },
  // Neutral (中性)
  neutral: {
    game_start : ['游戏开始。','掷出6出发。','先到终点胜。'],
    eaten_user : ['棋子被吃。','位置重置。','重新开始。'],
    user_win   : ['你赢了。','游戏结束。','恭喜。'],
    char_win   : ['我赢了。','游戏结束。','胜利。'],
    dice_1     : ['掷出1点。','前进1格。','1点。'],
    dice_2     : ['掷出2点。','前进2格。','2点。'],
    dice_3     : ['掷出3点。','前进3格。','3点。'],
    dice_4     : ['掷出4点。','前进4格。','4点。'],
    dice_5     : ['掷出5点。','前进5格。','5点。'],
    dice_6     : ['掷出6点。','前进6格。','6点。'],
  },
};

// Default to formal (most common for ST characters)
var LG_FALLBACK = LG_FALLBACK_POOLS.formal;

// Function to select pool based on persona
function lgSelectPool(personaText) {
  if (!personaText) return;
  const lower = personaText.toLowerCase();
  // Check for upper-class/formal keywords
  if (/上位者|高傲|严肃|端庄|威严|贵族|精英|总裁|老板|领导|冷酷|冷漠/.test(lower)) {
    LG_FALLBACK = LG_FALLBACK_POOLS.formal;
    console.log('[Ludo] Using formal pool (upper-class character)');
  } else if (/活泼|开朗|可爱|温柔|友好|亲切|热情|元气/.test(lower)) {
    LG_FALLBACK = LG_FALLBACK_POOLS.casual;
    console.log('[Ludo] Using casual pool (friendly character)');
  } else {
    LG_FALLBACK = LG_FALLBACK_POOLS.neutral;
    console.log('[Ludo] Using neutral pool (default)');
  }
}


// ── Square event trigger (两步流程) ──────────────────────────────
// ── 自定义 API 调用（支持 DeepSeek / 通义 / GLM 等 OpenAI 兼容格式）──
async function lgCallAPI(prompt, maxTokens = 150, sysMsg = '') {
  const cfg = (() => { try { return JSON.parse(localStorage.getItem('rp_ludo_api') || '{}'); } catch(e) { return {}; } })();

  // 用户设置了自定义 API → 只用自定义，绝不 fallback 到 ST
  if (cfg.mode === 'custom' && cfg.url && cfg.key) {
    try {
      const msgs = [];
      if (sysMsg) msgs.push({ role: 'system', content: sysMsg });
      msgs.push({ role: 'user', content: prompt });
      const res = await fetch(`${cfg.url.replace(/\/+$/, '')}/chat/completions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${cfg.key}` },
        body: JSON.stringify({
          model: cfg.model || 'deepseek-chat',
          messages: msgs,
          max_tokens: maxTokens,
          temperature: 0.9
        })
      });
      const data = await res.json();
      const text = data.choices?.[0]?.message?.content?.trim();
      if (text) return text;
      console.warn('[Ludo] custom API returned empty response');
    } catch(e) {
      console.warn('[Ludo] custom API error:', e.message);
    }
    return null; // 自定义 API 失败，不走 ST，直接返回 null（触发 fallback 文本）
  }

  // 未设置自定义 API → 走 ST generateRaw（sysMsg 拼入 prompt 前）
  try {
    const { generateRaw } = await import('../../../../script.js').catch(() => ({}));
    if (typeof generateRaw === 'function') {
      const fullPrompt = sysMsg ? sysMsg + '\n\n' + prompt : prompt;
      const resp = await generateRaw({ prompt: fullPrompt, max_new_tokens: maxTokens, quiet: true });
      if (resp && resp.trim()) return resp.trim();
    }
  } catch(e) { /* ignore */ }
  return null;
}

async function lgTriggerSquareEvent(player, pos) {
  const ev = SQUARE_EVENTS[pos];
  if (!ev) return;
  const isUser = player === 'user';
  const moverName = isUser ? '你' : LG.charName;

  // 填充弹窗内容
  document.getElementById('rp-sq-event-sq').textContent = `第 ${pos} 格`;
  document.getElementById('rp-sq-event-emoji').textContent = ev.emoji;
  document.getElementById('rp-sq-event-text').textContent = ev.text;
  const noteEl = document.getElementById('rp-sq-event-note');
  noteEl.textContent = isUser ? (ev.note || '') : `${LG.charName}将完成此任务`;
  lgMsg('sys', `📍 第${pos}格 ${ev.emoji} - ${ev.text}`);
  LG.taskChatCount = 2;

  // 步骤一：显示弹窗，等待点「确认」
  await new Promise(resolve => {
    const overlay = document.getElementById('rp-sq-event');
    const btn     = document.getElementById('rp-sq-event-done');
    overlay.style.display = 'flex';
    const handler = () => { btn.removeEventListener('click', handler); overlay.style.display = 'none'; resolve(); };
    btn.addEventListener('click', handler);
  });

  // 特殊格：立即执行效果，不进入步骤二
  if (ev.type === 'move') {
    const curPos = isUser ? LG.userPos : LG.charPos;
    const newPos = Math.max(1, Math.min(53, curPos + ev.delta));
    const step   = ev.delta > 0 ? 1 : -1;
    // 逐格动画，与普通掷骰移动相同速度
    for (let p = curPos + step; step > 0 ? p <= newPos : p >= newPos; p += step) {
      if (isUser) LG.userPos = p; else LG.charPos = p;
      lgRender();
      await new Promise(r => setTimeout(r, 320));
    }
    lgMsg('sys', ev.delta > 0 ? `${moverName}前进${ev.delta}格，到第${newPos}格` : `${moverName}后退${Math.abs(ev.delta)}格，到第${newPos}格`);
    // 落地后检查新位置有没有任务格（Bug2修复）
    await new Promise(r => setTimeout(r, 300));
    let _chainKey = null;
    if (newPos >= 49 && newPos <= 53) {
      if (SQUARE_EVENTS[newPos]) _chainKey = newPos;
    } else if (newPos >= 1 && newPos <= 48) {
      const _e2 = isUser ? USER_ENTRY : CHAR_ENTRY;
      const _a2 = (_e2 + newPos - 1) % LUDO_PATH_LEN;
      const _k2 = _a2 + 1;
      if (SQUARE_EVENTS[_k2]) _chainKey = _k2;
    }
    if (_chainKey !== null) await lgTriggerSquareEvent(player, _chainKey);
    return;
  }
  if (ev.type === 'skip') {
    if (isUser) LG.userSkip = true; else LG.charSkip = true;
    lgMsg('sys', `⏸️ ${moverName}下一轮停留`);
    return;
  }
  if (ev.type === 'reroll') {
    LG.pendingReroll = player;
    lgMsg('sys', `🎲 ${moverName}获得额外一次掷骰！`);
    return;
  }

  // 步骤二：对话/动作类任务
  const bar = document.getElementById('rp-sq-task-bar');
  const btn = document.getElementById('rp-sq-task-done-btn');
  const txt = document.getElementById('rp-sq-task-text');

  if (!isUser) {
    // ── Char 任务：AI 自动生成完成动作，user 点「已完成」确认 ──
    txt.textContent = `💙 ${LG.charName} 任务中…`;
    btn.disabled = true;
    btn.textContent = '☐ 已完成';
    bar.style.display = 'flex';
    const hintEl = document.getElementById('rp-sq-task-hint');
    if (hintEl) hintEl.textContent = `请耐心等待${LG.charName}的回答`;

    // AI 生成 char 完成任务的话（支持自定义 API）
    const persona   = g2048GetPersona();
    const actHint   = ev.type === 'action' ? '（动作描写用*动作*格式，≤8字）' : '';
    const prompt    = `[飞行棋强制任务规则]无论角色性格如何，踩到任务格必须立刻直接完成任务，不许沉默、回避、卖关子或绕弯子。\n${persona}\n当前任务：${ev.text}${actHint}\n${LG.charName}现在立刻直接完成（不超过30字，必须包含实际说话内容，不许只有动作描写）：`;
    const rawReply = await lgCallAPI(prompt, 150);
    const replied  = !!(rawReply && rawReply.trim());
    if (replied) lgMsg('char', cleanGameReply(rawReply, LG.charName));
    else lgMsg('char', ev.type === 'action' ? `*完成${ev.text}*` : `（关于${ev.text}……）`);

    txt.textContent = `💙 ${LG.charName} 完成了吗？`;
    btn.disabled = false;
    btn.textContent = '✅ 已完成';
  } else {
    // ── User 任务：显示小条，user 自行在聊天框完成后点「已完成」 ──
    txt.textContent = `💬 ${ev.text}`;
    bar.style.display = 'flex';
    const hintEl2 = document.getElementById('rp-sq-task-hint');
    if (hintEl2) hintEl2.textContent = '请在下方对话框内完成指定任务';
  }

  // 等待「已完成」点击
  await new Promise(resolve => {
    const handler = () => { btn.removeEventListener('click', handler); bar.style.display = 'none'; resolve(); };
    btn.addEventListener('click', handler);
  });
  LG.justDidTask = true;
}

function lgCharComment(event) {
  if (!LG.active && !event.endsWith('_win')) return;
  if (LG.justDidTask) { LG.justDidTask = false; return; }

  const n      = LG.lastDice;
  const cPos   = LG.charPos;
  const uPos   = LG.userPos;
  const persona = g2048GetPersona();

  // ── game_start：游戏开场白，单独处理 ──────────────────────────
  if (event === 'game_start') {
    const pool = LG_FALLBACK['game_start'] || ['让我们开始吧！', '准备好输给我了吗？', '公平竞争哦~'];
    (async () => {
      try {
        const { generateRaw } = await import('../../../../script.js').catch(() => ({}));
        if (typeof generateRaw === 'function') {
          const prompt = `${persona}\n[飞行棋对局刚刚开始]${LG.charName}向玩家说一句简短的开场白（15字以内，语气自然贴合角色，不许提掷骰子步数）：`;
          const resp = await generateRaw({ prompt, max_new_tokens: 80, quiet: true });
          const cleaned = resp && resp.trim() ? cleanGameReply(resp, LG.charName) : '';
          if (cleaned) { lgMsg('char', cleaned); return; }
        }
      } catch(e) { /* ignore */ }
      lgMsg('char', pool[Math.floor(Math.random() * pool.length)]);
    })();
    return;
  }

  const isCharTurn = event.endsWith('_char');
  const lead   = cPos > uPos + 5 ? '，我目前领先' : cPos < uPos - 5 ? '，我目前落后' : '';
  const subject = isCharTurn
    ? `我掷出了${n}点${lead}`
    : `对方掷出了${n}点${lead}`;
  const prompt  = `${persona}
[飞行棋游戏]当前状况：${subject}。
${LG.charName}对玩家说一句简短的游戏内评论（15字以内，语气自然贴合角色）：`;

  // 异步 AI 生成，不阻塞游戏流程
  (async () => {
    try {
      const { generateRaw } = await import('../../../../script.js').catch(() => ({}));
      if (typeof generateRaw === 'function') {
        const resp = await generateRaw({ prompt, max_new_tokens: 80, quiet: true });
        const cleaned = resp && resp.trim() ? cleanGameReply(resp, LG.charName) : '';
        if (cleaned) { lgMsg('char', cleaned); return; }
      }
    } catch(e) { /* ignore */ }
    // 兜底：pool 回复
    const dKey = `dice_${n}`;
    const pool = LG_FALLBACK[event] || LG_FALLBACK[dKey] || ['继续！', '加油！'];
    lgMsg('char', pool[Math.floor(Math.random() * pool.length)]);
  })();
}

async function lgGameChat(text) {
  if (!text.trim()) return;
  lgMsg('user', text);

  // quick in-character reply via OOC injection (doesn't advance story)
  const ctx    = getContext();
  const cName  = LG.charName;
  const persona = g2048GetPersona();
  // Completion-style prompt: AI fills dialogue directly after open quote
  const taskNote = LG.taskActive ? `\n[当前待完成任务：「${LG.taskActive}」--必须直接完成，不许回避]` : '';
  const prompt = `${persona}${taskNote}\n[游戏聊天]用户说："${text}"\n${cName}简短回应（动作描写≤8字）："`;

  // 使用 lgCallAPI（支持自定义 API + ST fallback）
  const resp = await lgCallAPI(prompt, 150);
  if (resp && resp.trim()) { lgMsg('char', cleanGameReply(resp, LG.charName)); return; }

  // Fallback replies
  const fallbacks = ['嗯嗯~','专注游戏！','别分心，来追我','说什么，快走棋！','哈哈，继续玩！'];
  lgMsg('char', fallbacks[Math.floor(Math.random()*fallbacks.length)]);
}

// ================================================================
//  GLOBAL SCOPE EXPORTS  (required: onclick="" attrs run in window scope)
// ================================================================
Object.assign(window, {
  openHongbao, playVoice, sendUserHongbao,
  toggleAttachPanel, showHongbaoSheet, sendLocation,
  showLocationInput, triggerImagePick,
  showAddChoice, confirmCreateGroup,
  openThread, openSettings,
  lgUserRoll,
});

// ================================================================
//  ENTRY
// ================================================================
jQuery(async () => {
  try {
    await init();
  } catch(e) {
    console.error('[Raymond Phone] init failed:', e);
    // 兜底：确保 FAB 可见
    setTimeout(() => {
      if (!document.getElementById('rp-fab')) {
        try { init(); } catch(e2) {}
      }
    }, 1500);
  }
});




