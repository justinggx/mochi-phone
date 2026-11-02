import { XHS_COVER_CSS } from './xhs-cover.mjs?v=20261011-header1';
import { PHONE_TOOLS_CSS } from './phone-tools.mjs?v=20261102-moments-208';
import { THEATRE_CSS } from './theatre.mjs?v=20261029-optimization-173';

export const RP_ART_CSS = `
#rp-phone {--rp-art-metal:linear-gradient(120deg,#fffaf1,#cdbdaf 18%,#fbf6ed 38%,#e2d5c8 60%,#ad9e94 83%,#ede3d6);--rp-art-edge:rgba(255,255,255,.85);--rp-art-screen-edge:rgba(92,68,52,.23);--rp-art-button:#a79689;--rp-art-shadow:rgba(82,53,37,.2);}
#rp-phone[data-rp-frame-theme="star"] {--rp-art-metal:linear-gradient(120deg,#716d7d,#292835 20%,#585566 40%,#343340 62%,#171923 82%,#575262);--rp-art-edge:rgba(203,197,222,.37);--rp-art-screen-edge:rgba(0,0,0,.9);--rp-art-button:#585362;--rp-art-shadow:rgba(12,10,24,.45);}
#rp-phone[data-rp-frame-theme="misty"] {--rp-art-metal:linear-gradient(120deg,#fbfdff,#afbdc9 20%,#eff4f7 39%,#c6d1da 60%,#8e9ca8 82%,#e0e7ed);--rp-art-edge:rgba(255,255,255,.88);--rp-art-screen-edge:rgba(45,70,90,.23);--rp-art-button:#8a9ca9;--rp-art-shadow:rgba(35,57,76,.22);}
#rp-phone #rp-frame {padding:7px!important;border-radius:38px!important;background:var(--rp-art-metal)!important;box-shadow:0 1px 2px rgba(0,0,0,.12),0 18px 32px var(--rp-art-shadow),inset 0 1px 0 rgba(255,255,255,.65),inset 0 -1px 0 rgba(0,0,0,.18)!important;}
#rp-phone #rp-frame::after {content:'';position:absolute;inset:1px;border:1px solid var(--rp-art-edge);border-radius:37px;pointer-events:none;}
#rp-phone #rp-screen {border-radius:31px!important;box-shadow:0 0 0 1px var(--rp-art-screen-edge);}
#rp-phone #rp-frame .rp-btn {background:var(--rp-art-button);box-shadow:inset 0 0 0 1px rgba(255,255,255,.18);}
#rp-phone:is(.rp-art-icons,.rp-art-pack) #rp-screen #rp-app-grid .rp-app-ico {width:60px;height:60px;}
#rp-phone.rp-art-icons #rp-screen #rp-app-grid .rp-app-lbl {font-weight:500!important;text-shadow:none!important;letter-spacing:.15px;}
#rp-phone.rp-art-icons #rp-screen #rp-home-clock {font-weight:300!important;letter-spacing:-2px!important;text-shadow:none!important;}
#rp-phone.rp-art-icons.rp-theme-misty #rp-screen .rp-home-dot {background:rgba(44,77,104,.28)!important;}
#rp-phone.rp-art-icons.rp-theme-misty #rp-screen .rp-home-dot-active {background:#527893!important;}
#rp-phone:is(.rp-art-icons,.rp-art-pack) #rp-screen :is(.rp-app-ico,.rp-folder-item-ico).rp-art-ready {position:relative;background:transparent!important;border:0!important;border-radius:0!important;box-shadow:none!important;filter:none!important;overflow:visible;}
#rp-phone .rp-art-clip {position:absolute;inset:0;overflow:hidden;clip-path:inset(4%);pointer-events:none;}
#rp-phone .rp-art-atlas {position:absolute;display:block;max-width:none!important;max-height:none!important;image-rendering:auto!important;pointer-events:none;}
/* Align visible artwork, rather than the unequal transparent margins in each source image. */
#rp-phone:is(.rp-art-icons,.rp-art-pack) #rp-folder-modal .rp-game-art-tile {position:absolute;inset:0;overflow:hidden;}
#rp-phone:is(.rp-art-icons,.rp-art-pack) #rp-folder-modal .rp-folder-item-ico > img,
#rp-phone:is(.rp-art-icons,.rp-art-pack) #rp-folder-modal .rp-game-art-tile {transform-origin:0 0;transform:translate(var(--rp-game-art-x,0%),var(--rp-game-art-y,0%)) scale(var(--rp-game-art-scale,1));pointer-events:none;}
#rp-phone:is(.rp-art-icons,.rp-art-pack)[data-rp-art-theme="candy"] #rp-folder-modal [data-folder-app="ludo"] .rp-folder-item-ico {--rp-game-art-scale:1.15843;--rp-game-art-x:-15.311778%;--rp-game-art-y:-20.484988%;}
#rp-phone:is(.rp-art-icons,.rp-art-pack)[data-rp-art-theme="candy"] #rp-folder-modal [data-folder-app="g2048"] .rp-folder-item-ico {--rp-game-art-scale:1.142597;--rp-game-art-x:-3.485194%;--rp-game-art-y:-21.526196%;}
#rp-phone:is(.rp-art-icons,.rp-art-pack)[data-rp-art-theme="candy"] #rp-folder-modal [data-folder-app="ggold"] .rp-folder-item-ico {--rp-game-art-scale:1.145205;--rp-game-art-x:-16.849315%;--rp-game-art-y:-1.689498%;}
#rp-phone:is(.rp-art-icons,.rp-art-pack)[data-rp-art-theme="candy"] #rp-folder-modal [data-folder-app="gword"] .rp-folder-item-ico {--rp-game-art-scale:1.174707;--rp-game-art-x:-6.112412%;--rp-game-art-y:-4.145199%;}
#rp-phone:is(.rp-art-icons,.rp-art-pack)[data-rp-art-theme="candy"] #rp-folder-modal [data-folder-app="gomoku"] .rp-folder-item-ico {--rp-game-art-scale:1.038509;--rp-game-art-x:-2.42236%;--rp-game-art-y:-1.925466%;}
#rp-phone:is(.rp-art-icons,.rp-art-pack)[data-rp-art-theme="candy"] #rp-folder-modal [data-folder-app="sudoku"] .rp-folder-item-ico {--rp-game-art-scale:0.999203;--rp-game-art-x:-1.87251%;--rp-game-art-y:0%;}
#rp-phone:is(.rp-art-icons,.rp-art-pack)[data-rp-art-theme="star"] #rp-folder-modal [data-folder-app="ludo"] .rp-folder-item-ico {--rp-game-art-scale:1.185816;--rp-game-art-x:-20.638298%;--rp-game-art-y:-25.555556%;}
#rp-phone:is(.rp-art-icons,.rp-art-pack)[data-rp-art-theme="star"] #rp-folder-modal [data-folder-app="g2048"] .rp-folder-item-ico {--rp-game-art-scale:1.282864;--rp-game-art-x:-9.641944%;--rp-game-art-y:-30.204604%;}
#rp-phone:is(.rp-art-icons,.rp-art-pack)[data-rp-art-theme="star"] #rp-folder-modal [data-folder-app="ggold"] .rp-folder-item-ico {--rp-game-art-scale:1.197136;--rp-game-art-x:-24.081146%;--rp-game-art-y:-4.892601%;}
#rp-phone:is(.rp-art-icons,.rp-art-pack)[data-rp-art-theme="star"] #rp-folder-modal [data-folder-app="gword"] .rp-folder-item-ico {--rp-game-art-scale:1.226406;--rp-game-art-x:-9.559902%;--rp-game-art-y:-7.408313%;}
#rp-phone:is(.rp-art-icons,.rp-art-pack)[data-rp-art-theme="star"] #rp-folder-modal [data-folder-app="gomoku"] .rp-folder-item-ico {--rp-game-art-scale:1.038509;--rp-game-art-x:-2.505176%;--rp-game-art-y:-1.966874%;}
#rp-phone:is(.rp-art-icons,.rp-art-pack)[data-rp-art-theme="star"] #rp-folder-modal [data-folder-app="sudoku"] .rp-folder-item-ico {--rp-game-art-scale:0.996226;--rp-game-art-x:-1.678252%;--rp-game-art-y:-0.049652%;}
#rp-phone:is(.rp-art-icons,.rp-art-pack)[data-rp-art-theme="misty"] #rp-folder-modal [data-folder-app="ludo"] .rp-folder-item-ico {--rp-game-art-scale:1.202878;--rp-game-art-x:-23.764988%;--rp-game-art-y:-23.764988%;}
#rp-phone:is(.rp-art-icons,.rp-art-pack)[data-rp-art-theme="misty"] #rp-folder-modal [data-folder-app="g2048"] .rp-folder-item-ico {--rp-game-art-scale:1.282864;--rp-game-art-x:-9.846547%;--rp-game-art-y:-24.680307%;}
#rp-phone:is(.rp-art-icons,.rp-art-pack)[data-rp-art-theme="misty"] #rp-folder-modal [data-folder-app="ggold"] .rp-folder-item-ico {--rp-game-art-scale:1.174707;--rp-game-art-x:-24.285714%;--rp-game-art-y:-1.053864%;}
#rp-phone:is(.rp-art-icons,.rp-art-pack)[data-rp-art-theme="misty"] #rp-folder-modal [data-folder-app="gword"] .rp-folder-item-ico {--rp-game-art-scale:1.185816;--rp-game-art-x:-6.643026%;--rp-game-art-y:-3.617021%;}
#rp-phone:is(.rp-art-icons,.rp-art-pack)[data-rp-art-theme="misty"] #rp-folder-modal [data-folder-app="gomoku"] .rp-folder-item-ico {--rp-game-art-scale:1.032099;--rp-game-art-x:-2.098765%;--rp-game-art-y:-1.646091%;}
#rp-phone:is(.rp-art-icons,.rp-art-pack)[data-rp-art-theme="misty"] #rp-folder-modal [data-folder-app="sudoku"] .rp-folder-item-ico {--rp-game-art-scale:0.994252;--rp-game-art-x:-1.575818%;--rp-game-art-y:0.168484%;}
`;

export const RP_VISUAL_CSS = `
#rp-phone {
  --rp-v-text:var(--rp-input-color,#4a1030);
  --rp-v-muted:color-mix(in srgb,var(--rp-v-text) 76%,transparent);
  --rp-v-surface:#fff7fa;
  --rp-v-card:color-mix(in srgb,var(--rp-v-surface) 94%,var(--rp-nav-btn));
  --rp-v-border:color-mix(in srgb,var(--rp-v-text) 20%,transparent);
  --rp-v-danger:#b9384b;
}
#rp-phone.rp-theme-star {--rp-v-surface:#211638;--rp-v-danger:#ff9aab;}
#rp-phone.rp-theme-misty {--rp-v-surface:#f0f7fc;}
#rp-phone:where(:not(.rp-theme-custom)).rp-dark {--rp-v-text:#e7e0f4;--rp-v-surface:#211d2f;--rp-v-danger:#ff9aab;}
/* Navigation: retain the safe top inset and centered titles. */
#rp-phone #rp-screen .rp-nav-bar .rp-back,#rp-phone #rp-screen .rp-nav-bar .rp-nav-add,
#rp-phone #rp-screen .rp-diary-gen-btn {min-width:40px;min-height:40px;align-items:center;justify-content:center;touch-action:manipulation;}
#rp-phone #rp-screen #rp-gen-diary {background:transparent!important;border:0!important;border-image:none!important;box-shadow:none!important;}
#rp-phone #rp-screen #rp-gen-diary::before,#rp-phone #rp-screen #rp-gen-diary::after {content:none!important;}
#rp-phone #rp-screen #rp-gen-diary:not(:focus-visible) {outline:none!important;}
#rp-phone #rp-screen #rp-gen-diary:focus-visible {outline:2px solid var(--rp-v-text,var(--rp-nav-btn))!important;outline-offset:2px;}
#rp-phone #rp-screen .rp-nav-bar .rp-nav-title {text-shadow:none!important;}
#rp-phone.rp-theme-misty #rp-screen .rp-nav-bar .rp-nav-title,
#rp-phone.rp-theme-misty #rp-screen .rp-nav-bar .rp-back,
#rp-phone.rp-theme-misty #rp-screen .rp-nav-bar .rp-nav-add {color:var(--rp-v-text)!important;text-shadow:none!important;}
#rp-phone #rp-screen .rp-hd-name {font-size:12px;color:var(--rp-v-muted);}
/* Thread identity stays inside its own header, away from scrolling messages. */
#rp-phone #rp-screen #rp-view-thread>.rp-nav-bar {height:auto;min-height:116px;padding:46px 12px 14px;box-sizing:border-box;display:grid;grid-template-columns:40px minmax(0,1fr) 40px;gap:8px;align-items:center;flex-shrink:0;position:relative;z-index:2;}
#rp-phone #rp-screen #rp-view-thread>.rp-nav-bar .rp-thread-hd {grid-column:1 / -1;min-width:0;max-width:100%;gap:10px;}
#rp-phone #rp-screen #rp-view-thread .rp-hd-av {flex-shrink:0;}
#rp-phone #rp-screen #rp-view-thread .rp-hd-name {display:block;min-width:0;max-width:100%;line-height:1.4;text-align:center;white-space:nowrap;word-break:normal;overflow-wrap:normal;overflow:hidden;text-overflow:ellipsis;}
#rp-phone #rp-screen #rp-view-thread>#rp-bubbles {min-height:0;padding:14px 12px 16px;}
#rp-phone #rp-screen #rp-view-thread .rp-grp-sender {line-height:1.4;margin:0 0 8px 3px;}
#rp-phone #rp-screen .rp-translation-control {color:var(--rp-v-muted);}
#rp-phone #rp-screen .rp-translation-btn {opacity:1;min-width:30px;min-height:30px;padding:3px 7px;border-color:var(--rp-v-border);border-radius:8px;}
#rp-phone #rp-screen .rp-translation-text {color:var(--rp-v-text);font-size:13px;line-height:1.6;background:var(--rp-v-card);border-color:var(--rp-nav-btn);}
/* Reading first: time and existing tools share one row. No hidden/long-press actions. */
#rp-phone #rp-screen .rp-message-meta {display:flex;flex-wrap:wrap;align-items:center;gap:0 4px;max-width:100%;min-width:0;}
#rp-phone #rp-screen .rp-out>.rp-message-meta {justify-content:flex-end;}
#rp-phone #rp-screen .rp-message-meta .rp-bts {padding:0 2px;}
#rp-phone #rp-screen .rp-message-meta .rp-translation-control {margin:0;}
#rp-phone #rp-screen .rp-message-meta.rp-has-expanded-translation>.rp-translation-control {flex-basis:100%;max-width:100%;}
#rp-phone #rp-screen .rp-out .rp-message-meta>.rp-translation-control {text-align:right;}
#rp-phone #rp-screen .rp-translation-text {text-align:left;}
#rp-phone #rp-screen .rp-bts {font-size:11px;color:var(--rp-v-muted);}
#rp-phone #rp-screen .rp-bwrap .rp-edit-btn,#rp-phone #rp-screen .rp-bwrap .rp-del-btn {width:30px;height:30px;min-width:30px;min-height:30px;opacity:1;pointer-events:auto;border:none;background:transparent;color:var(--rp-v-muted);box-shadow:none;touch-action:manipulation;}
#rp-phone #rp-screen .rp-bwrap .rp-del-btn {color:var(--rp-v-danger);}
#rp-phone #rp-screen .rp-bwrap .rp-edit-btn:hover,#rp-phone #rp-screen .rp-bwrap .rp-del-btn:hover {background:var(--rp-v-card);}
#rp-phone #rp-screen .rp-moment .rp-moment-time,#rp-phone #rp-screen .rp-diary-date {font-size:12px;color:var(--rp-v-muted)!important;}
#rp-phone #rp-screen .rp-moment .rp-moment-act {min-height:34px;padding:5px 9px;font-size:12px;color:var(--rp-v-muted)!important;border-radius:10px;}
#rp-phone #rp-screen .rp-moment .rp-moment-del-btn,#rp-phone #rp-screen .rp-moment .rp-moment-comment-del-btn {color:var(--rp-v-danger)!important;}
#rp-phone #rp-screen .rp-moment .rp-moment-act.rp-liked {color:var(--rp-v-danger)!important;}
#rp-phone #rp-screen .rp-moment-reply-btn,#rp-phone #rp-screen .rp-moment-comment-del-btn {display:inline-flex;align-items:center;min-height:28px;padding:0 4px;font-size:12px;touch-action:manipulation;}
#rp-phone #rp-screen .rp-moment .rp-moment-reply-btn {color:var(--rp-v-muted)!important;}
#rp-phone #rp-screen .rp-moment .rp-moment-comments-wrap {background:var(--rp-v-card)!important;line-height:1.6;}
/* Social reading hierarchy: continuous post, quiet inset comments, no nested frame. */
#rp-phone #rp-screen #rp-moments-list .rp-moment-text {font-size:15px!important;font-weight:400!important;line-height:1.75!important;color:var(--rp-v-text)!important;opacity:1!important;margin-bottom:12px;}
#rp-phone #rp-screen #rp-moments-list .rp-moment-comments-wrap {background:color-mix(in srgb,var(--rp-v-text) 6%,var(--rp-v-surface))!important;color:var(--rp-v-text)!important;border:0!important;box-shadow:none!important;padding:10px 12px!important;margin:12px 0 0 8px!important;border-radius:10px!important;gap:6px;min-width:0;}
#rp-phone #rp-screen #rp-moments-list .rp-moment-comment {font-size:13px!important;font-weight:400!important;line-height:1.65!important;color:var(--rp-v-text)!important;opacity:1!important;padding:4px 0!important;overflow-wrap:anywhere;}
#rp-phone #rp-screen #rp-moments-list .rp-moment-cname {font-size:inherit!important;font-weight:600!important;color:var(--rp-v-text)!important;margin-right:3px;}
#rp-phone #rp-screen #rp-moments-list .rp-moment-comments-wrap .rp-translation-text {background:transparent!important;border:0!important;box-shadow:none!important;padding:4px 0!important;font-size:13px!important;line-height:1.65;}
#rp-phone #rp-screen #rp-moments-list .rp-moment-comment :is(.rp-moment-reply-btn,.rp-moment-comment-del-btn) {font-size:12px!important;min-height:32px;}
#rp-phone #rp-screen .rp-diary-empty {color:var(--rp-v-muted);line-height:1.7;padding:32px 10px;}
#rp-phone #rp-screen .rp-diary-compose {padding-top:8px;gap:6px;}
#rp-phone #rp-screen .rp-diary-input {height:80px;min-height:64px;}
#rp-phone #rp-screen .rp-diary-send-btn {min-height:38px;background:var(--rp-send-bg);}
#rp-phone #rp-screen .rp-diary-edit-btn {min-width:28px;min-height:28px;opacity:1;pointer-events:auto;}
/* A new task must not show readable content from the previous page through it. */
#rp-phone #rp-screen #rp-compose-modal,#rp-phone #rp-screen #rp-del-picker {top:48px;background:var(--rp-v-surface)!important;color:var(--rp-v-text);}
#rp-phone #rp-screen :is(#rp-compose-modal,#rp-del-picker) .rp-nav-bar {height:44px;padding-top:0;}
#rp-phone #rp-screen #rp-compose-modal::before,#rp-phone #rp-screen #rp-compose-modal::after,
#rp-phone #rp-screen #rp-del-picker::before,#rp-phone #rp-screen #rp-del-picker::after {display:none;}
#rp-phone #rp-screen .rp-add-choice-box,#rp-phone #rp-screen .rp-add-choice-cancel,
#rp-phone #rp-screen .rp-hb-sheet,#rp-phone #rp-screen .rp-loc-sheet,#rp-phone #rp-screen .rp-game-partner-sheet {background:var(--rp-v-surface)!important;color:var(--rp-v-text);border-color:var(--rp-v-border);}
#rp-phone #rp-screen .rp-add-choice-item:not(.rp-add-choice-delete),#rp-phone #rp-screen .rp-add-choice-cancel,
#rp-phone #rp-screen .rp-hb-cancel-btn,#rp-phone #rp-screen .rp-loc-cancel-btn {color:var(--rp-v-text)!important;min-height:38px;}
#rp-phone #rp-screen .rp-add-choice-delete,#rp-phone #rp-screen #rp-del-confirm {color:var(--rp-v-danger)!important;}
/* Forms: explicit, named regions instead of brittle inline-style matching. */
#rp-phone #rp-screen .rp-api-heading {font-size:13px!important;text-align:left!important;margin-bottom:8px!important;color:var(--rp-v-text)!important;text-shadow:none!important;}
#rp-phone #rp-screen .rp-api-explanation {font-size:12px!important;line-height:1.55!important;margin-bottom:12px!important;color:var(--rp-v-muted)!important;background:var(--rp-v-card)!important;}
#rp-phone #rp-screen .rp-api-privacy {font-size:12px!important;line-height:1.55!important;color:var(--rp-v-muted)!important;}
#rp-phone #rp-screen .rp-api-footer {gap:8px!important;padding:8px 18px 20px!important;border-top:1px solid var(--rp-v-border);}
#rp-phone #rp-screen #rp-api-test-v {margin-bottom:0!important;min-height:40px;color:var(--rp-v-text)!important;}
#rp-phone #rp-screen #rp-api-save-v {min-height:42px;}
#rp-phone #rp-screen .rp-api-preset-btn,#rp-phone #rp-screen #rp-api-fetch-models {min-height:30px;}
#rp-phone #rp-screen #rp-view-api-settings .rp-api-opt {color:var(--rp-v-text)!important;text-shadow:none!important;}
#rp-phone #rp-screen #rp-api-test-v.fail {color:var(--rp-v-danger)!important;}
#rp-phone #rp-screen #rp-api-test-v.ok {color:#176b49!important;}
#rp-phone:where(:not(.rp-theme-custom)).rp-dark #rp-screen #rp-api-test-v.ok,#rp-phone:where(:not(.rp-theme-custom)).rp-theme-star #rp-screen #rp-api-test-v.ok {color:#9ae6b4!important;}
#rp-phone #rp-screen .rp-set-section .rp-set-hint {color:var(--rp-v-muted)!important;line-height:1.55;}
#rp-phone #rp-screen .rp-set-select {min-height:32px;}
#rp-phone input:not([type=radio]):not([type=checkbox]):not([type=range]) {min-width:0;}
#rp-phone #rp-screen :is(.rp-api-input,.rp-diary-input,#rp-compose-text,#rp-loc-inp,#rp-hb-amount,#rp-hb-note,#rp-game-partner-name-input,#rp-game-partner-note-input) {color:var(--rp-v-text)!important;background:var(--rp-v-surface)!important;border-color:var(--rp-v-border)!important;}
#rp-phone #rp-screen :is(.rp-api-input,.rp-diary-input,#rp-compose-text,#rp-loc-inp,#rp-hb-amount,#rp-hb-note)::placeholder {color:var(--rp-v-muted)!important;opacity:1;}
#rp-phone #rp-screen :is(button,input,textarea,select):focus-visible {outline:2px solid var(--rp-nav-btn);outline-offset:2px;}
#rp-phone #rp-screen #rp-ts-tip {font-size:11px;line-height:1.5;animation:none;}
#rp-phone #rp-screen .rp-ts-welcome-hint {font-size:12px;line-height:1.5;}
/* Game typography/surfaces only. Canvas size, paths, timers and rules are untouched. */
#rp-phone #rp-screen :is(#g2048-chat,#ggold-chat,#gword-chat,#rp-game-chat) {background:var(--rp-v-card)!important;border:1px solid var(--rp-v-border);}
#rp-phone #rp-screen :is(#g2048-chat-fs,#ggold-chat-fs,#gword-chat-fs,#rp-game-chat-fs) {background:var(--rp-v-surface)!important;color:var(--rp-v-text);}
#rp-phone #rp-screen :is(#g2048-chat-fs-title,#gword-chat-fs-title,#rp-game-chat-fs-title) {color:var(--rp-v-text)!important;}
#rp-phone #rp-screen .rp-game-chat-header,#rp-phone #rp-screen .rp-game-chat-header>span {color:var(--rp-v-text);}
#rp-phone #rp-screen :is(#g2048-chat,#ggold-chat,#gword-chat,#rp-game-chat,#g2048-chat-fs-body,#ggold-chat-fs-body,#gword-chat-fs-body,#rp-game-chat-fs-body) .game-msg {text-shadow:none!important;line-height:1.6;}
#rp-phone #rp-screen :is(#g2048-chat,#ggold-chat,#gword-chat,#rp-game-chat,#g2048-chat-fs-body,#ggold-chat-fs-body,#gword-chat-fs-body,#rp-game-chat-fs-body) .game-msg-sys {color:var(--rp-v-muted)!important;}
#rp-phone #rp-screen :is(#g2048-chat,#ggold-chat,#gword-chat,#rp-game-chat,#g2048-chat-fs-body,#ggold-chat-fs-body,#gword-chat-fs-body,#rp-game-chat-fs-body) :is(.game-msg-char,.game-msg-user) {color:var(--rp-v-text)!important;}
#rp-phone #rp-screen .rp-game-chat-close {color:var(--rp-v-text)!important;background:var(--rp-v-card)!important;border-color:var(--rp-v-border);}
#rp-phone #rp-screen :is(.ggold-score-lbl,.g2048-slbl,#ggold-chat-hint,#gword-chat-hint,#g2048-chat-hint,#rp-game-chat-hint) {font-size:11px;color:var(--rp-v-muted)!important;text-shadow:none;}
#rp-phone #rp-screen :is(.ggold-score-box,.g2048-sbox) {background:var(--rp-v-surface)!important;border-color:var(--rp-v-border);box-shadow:none;}
#rp-phone #rp-screen :is(.ggold-score-val,#g2048-score,#g2048-best) {color:var(--rp-v-text)!important;font-variant-numeric:tabular-nums;}
#rp-phone #rp-screen :is(#ggold-newbtn,#g2048-newbtn,#gword-newbtn) {min-height:30px;border:1px solid var(--rp-v-border);border-radius:10px;background:var(--rp-v-surface);color:var(--rp-v-text);font-size:12px;font-weight:600;font-family:inherit;padding:4px 10px;}
#rp-phone #rp-screen :is(#gword-status,#gword-category-badge,#gword-round-info,#g2048-turn,#ggold-round-info,#ggold-turn-badge) {color:var(--rp-v-text)!important;background:var(--rp-v-card)!important;text-shadow:none!important;overflow-wrap:anywhere;}
#rp-phone #rp-screen .game-edit-btn {min-width:28px;min-height:28px;color:var(--rp-v-muted);}
#rp-phone #rp-screen .g2048-dir {min-height:30px;}
#rp-phone #rp-screen #g2048-board-wrap {flex:0 1 220px;min-height:132px;}
#rp-phone #rp-screen #g2048-board {height:100%;width:auto;aspect-ratio:1;max-height:214px;max-width:214px;}
#rp-phone #rp-screen .g2048-cell {background:color-mix(in srgb,var(--rp-v-surface) 88%,var(--rp-nav-btn));outline:1px solid var(--rp-v-border);}
#rp-phone #rp-screen #g2048-chat {min-height:36px;}
#rp-phone #rp-screen .rp-game-partner-change {min-height:28px;}
#rp-phone #rp-screen :is(#g2048-api-tip,#rp-api-blink) {animation:none!important;text-shadow:none!important;color:var(--rp-v-muted)!important;}
/* Refinements without changing cover selection, grid or detail interactions. */
#rp-phone:where(:not(.rp-theme-custom)).rp-theme-misty:not(.rp-dark) #rp-screen :is(#rp-home-clock,.rp-app-lbl,.rp-app-ico) {color:#294c69!important;text-shadow:none!important;}
#rp-phone #rp-screen .rp-app-lbl {font-size:12px;}
#rp-phone #rp-screen .rp-ln-type {font-size:11px;color:var(--rp-v-muted);}
#rp-phone #rp-screen .rp-xhs-card-meta {line-height:1.5;}
#rp-phone #rp-screen .rp-xhs-card-author {font-size:11px;}
#rp-phone #rp-screen :is(.rp-asset-desc,.rp-bank-hero-stat-lbl,.rp-bank-txn-date) {font-size:11px;line-height:1.55;}
#rp-phone #rp-screen :is(.rp-bank-hero-amount,.rp-bank-hero-stat-val,.rp-asset-amount,.rp-bank-txn-amt) {font-variant-numeric:tabular-nums;}
/* Complete theme colors for media, input hints and accessory controls. */
#rp-phone #rp-screen :is(.rp-grp-sender,.rp-voice-dur) {color:var(--rp-v-muted);font-size:12px;overflow-wrap:anywhere;}
#rp-phone #rp-screen .rp-voice-txt {color:var(--rp-v-text);}
#rp-phone #rp-screen .rp-voice-bbl {background:var(--rp-v-card);border:1px solid var(--rp-v-border);min-width:0;}
#rp-phone #rp-screen .rp-wb {background:var(--rp-v-muted);}
#rp-phone #rp-screen .rp-voice-bbl.played .rp-wb {opacity:.65;}
#rp-phone #rp-screen #rp-input::placeholder {color:var(--rp-v-muted)!important;opacity:1;}
#rp-phone #rp-screen #rp-attach-btn {color:var(--rp-v-text);background:var(--rp-v-card);border:1px solid var(--rp-v-border);}
#rp-phone #rp-screen #rp-attach-panel {background:var(--rp-v-surface);border-color:var(--rp-v-border);}
#rp-phone #rp-screen .rp-attach-item {color:var(--rp-v-text);}
#rp-phone #rp-screen #rp-gen-diary {color:var(--rp-nav-btn)!important;filter:none!important;}
#rp-phone #rp-screen .rp-out .rp-message-meta {justify-content:flex-end;}
#rp-phone #rp-screen .rp-add-choice-cancel {width:min(220px,calc(100% - 36px));display:flex;align-items:center;justify-content:center;min-height:42px;border-radius:14px;border:1px solid var(--rp-v-border);font-size:14px;cursor:pointer;}
/* Calm shadows, readable hint, same shell and home arrangement. */
#rp-phone #rp-screen .rp-app-ico {filter:drop-shadow(0 1px 2px rgba(0,0,0,.18))!important;}
#rp-phone #rp-screen #rp-swipe-hint {color:var(--rp-lock-color);animation:rp-readable-breathe 2.2s ease-in-out infinite;font-size:12px;}
@keyframes rp-readable-breathe {0%,100%{opacity:.72}50%{opacity:1}}
/* A fixed synthetic miniature; no model calls or saved CSS execution. */
#rp-phone #rp-screen .rp-theme-preview {height:112px;}
#rp-phone #rp-screen .rp-saved-card-preview {height:112px;display:flex;align-items:center;justify-content:center;}
#rp-phone #rp-screen .rp-theme-info {min-height:70px;}
#rp-phone #rp-screen .rp-theme-card[data-tid="candy"] .rp-theme-preview {background-color:#fff1f7!important;}
#rp-phone #rp-screen .rp-theme-card[data-tid="star"] .rp-theme-preview {background-color:#1b1233!important;}
#rp-phone #rp-screen .rp-theme-card[data-tid="misty"] .rp-theme-preview {background-color:#e9f3fa!important;}
#rp-phone #rp-screen .rp-theme-mini-scene {--rp-mini-text:#633149;--rp-mini-panel:rgba(255,247,250,.94);--rp-mini-sent:#d9407a;--rp-mini-recv:#fff;display:flex;flex-direction:column;gap:5px;width:calc(100% - 16px);padding:8px;border-radius:12px;background:var(--rp-mini-panel);color:var(--rp-mini-text);box-sizing:border-box;}
#rp-phone #rp-screen .rp-theme-mini-scene[data-preview-theme="star"] {--rp-mini-text:#e0d8ff;--rp-mini-panel:rgba(33,22,56,.94);--rp-mini-sent:#7534d4;--rp-mini-recv:#372452;}
#rp-phone #rp-screen .rp-theme-mini-scene[data-preview-theme="misty"] {--rp-mini-text:#294c69;--rp-mini-panel:rgba(240,247,252,.94);--rp-mini-sent:#477fa5;--rp-mini-recv:#fff;}
#rp-phone #rp-screen .rp-theme-mini-top {display:flex;justify-content:space-between;gap:4px;font-size:10px;font-weight:600;}
#rp-phone #rp-screen .rp-theme-select-title {font-size:13px;font-weight:600;color:var(--rp-v-text,var(--rp-input-color))!important;text-align:center;margin-bottom:18px;opacity:1!important;letter-spacing:.4px;}
#rp-phone #rp-screen .rp-theme-mini-recv,#rp-phone #rp-screen .rp-theme-mini-sent {max-width:90%;padding:4px 6px;font-size:10px;line-height:1.3;border-radius:7px;background:var(--rp-mini-recv);color:var(--rp-mini-text);}
#rp-phone #rp-screen .rp-theme-mini-sent {align-self:flex-end;background:var(--rp-mini-sent);color:#fff;}
#rp-phone #rp-screen .rp-theme-desc {font-size:11px;line-height:1.5;}
#rp-phone #rp-screen .rp-theme-custom-status {font-size:11px;color:var(--rp-v-muted);margin-top:3px;}
#rp-phone #rp-screen .rp-api-scroll {padding-top:12px!important;min-height:0;overscroll-behavior:contain;}
#rp-phone #rp-screen .rp-api-field-label {font-size:12px;font-weight:600;color:var(--rp-v-text)!important;line-height:1.4;}
#rp-phone #rp-screen #rp-api-fetch-models {background:var(--rp-v-card)!important;color:var(--rp-v-text)!important;border-color:var(--rp-v-border)!important;}
#rp-phone #rp-screen .rp-api-input {min-height:36px;font-size:12px;}
#rp-phone #rp-screen .rp-api-privacy {padding:8px 10px;border:1px solid var(--rp-v-border);border-radius:12px;background:var(--rp-v-card);margin-top:4px;}
#rp-phone #rp-screen .rp-api-explanation {padding:8px 10px!important;margin:10px 0 4px!important;font-size:11px!important;}
@media(prefers-reduced-motion:reduce) {#rp-phone #rp-screen :is(#rp-compose-modal,.rp-nav-add,.rp-back) {animation:none!important;transition:none!important;}}
@media(prefers-reduced-motion:reduce) {#rp-phone #rp-screen #rp-swipe-hint {animation:none!important;opacity:1;}}
`;

export const RP_REFINED_CSS = `
#rp-phone.rp-art-icons {--rp-v-text:#44353d;--rp-v-muted:#756772;--rp-v-surface:#faf8f5;--rp-v-card:#f1ece9;--rp-v-border:#ded5d9;--rp-r-accent:#956174;--rp-r-on-accent:#fff;--rp-send-bg:var(--rp-r-accent);--rp-nav-btn:var(--rp-r-accent);}
#rp-phone.rp-art-icons.rp-theme-star {--rp-v-text:#ece6f3;--rp-v-muted:#c2b7d0;--rp-v-surface:#211e2b;--rp-v-card:#2c2738;--rp-v-border:#4a405b;--rp-r-accent:#bca9d0;--rp-r-on-accent:#251f30;}
#rp-phone.rp-art-icons.rp-theme-misty {--rp-v-text:#344953;--rp-v-muted:#627782;--rp-v-surface:#f5f8f9;--rp-v-card:#eaf0f3;--rp-v-border:#cedae0;--rp-r-accent:#52758b;--rp-r-on-accent:#fff;}
#rp-phone:where(:not(.rp-theme-custom)).rp-art-icons.rp-dark {--rp-v-text:#ebe7f0;--rp-v-muted:#c5bdce;--rp-v-surface:#211e29;--rp-v-card:#2c2735;--rp-v-border:#4c4258;--rp-r-accent:#b6a4c7;--rp-r-on-accent:#251f30;}
/* Wallpaper belongs to the home/lock experience; reading pages have a stable surface. */
#rp-phone.rp-art-icons #rp-screen .rp-view:not(#rp-view-home):not(#rp-view-lock) {background:var(--rp-v-surface)!important;color:var(--rp-v-text);}
#rp-phone.rp-art-icons #rp-screen .rp-view:not(#rp-view-home):not(#rp-view-lock)::before,#rp-phone.rp-art-icons #rp-screen .rp-view:not(#rp-view-home):not(#rp-view-lock)::after {display:none!important;}
#rp-phone.rp-art-icons #rp-screen .rp-nav-bar {background:var(--rp-v-surface)!important;border-bottom:1px solid var(--rp-v-border)!important;box-shadow:none!important;}
#rp-phone.rp-art-icons #rp-screen .rp-nav-bar :is(.rp-nav-title,.rp-back,.rp-nav-add),#rp-phone.rp-art-icons #rp-screen .rp-hd-name {color:var(--rp-v-text)!important;text-shadow:none!important;}
#rp-phone.rp-art-icons #rp-screen .rp-nav-title {font-size:17px;font-weight:600;}
#rp-phone:where(:not(.rp-theme-custom)).rp-art-icons.rp-dark #rp-screen #rp-swipe-hint {color:var(--rp-v-text)!important;}
/* Shared paper, typography and secondary actions. Do not hide existing tools. */
#rp-phone.rp-art-icons #rp-screen :is(#rp-add-form,.rp-gm-sheet,.rp-grp-modal,.rp-set-section,.rp-ts-welcome,.rp-diary-entry,.rp-bank-card,.rp-theme-info,.rp-saved-card,.rp-hb-sheet,.rp-loc-sheet,.rp-game-partner-sheet) {background:var(--rp-v-surface)!important;border:none!important;border-radius:16px;box-shadow:none!important;color:var(--rp-v-text)!important;}
#rp-phone.rp-art-icons #rp-screen :is(#rp-add-form input,.rp-grp-name-inp,.rp-set-select,#rp-block-input,.rp-api-input,.rp-moment-cinput,#rp-ts-input,#rp-game-input,#g2048-input,#ggold-input,#gword-input) {background:var(--rp-v-surface)!important;color:var(--rp-v-text)!important;border-color:var(--rp-v-border)!important;box-shadow:none!important;font-family:inherit;}
#rp-phone.rp-art-icons #rp-screen #rp-add-form h3 {color:var(--rp-v-text)!important;font-size:17px;}
#rp-phone.rp-art-icons #rp-screen :is(input,textarea)::placeholder {color:var(--rp-v-muted)!important;opacity:1;}
#rp-phone.rp-art-icons #rp-screen :is(.rp-set-key,.rp-tn,.rp-tp,.rp-gm-title,.rp-gm-name,.rp-grp-pick-name,.rp-grp-modal-hd,.rp-diary-author,.rp-diary-body,.rp-diary-reply-text,.rp-moment-text,.rp-moment-comment,.rp-call-rec,.rp-ts-welcome-title,.rp-ts-bubble-ai) {color:var(--rp-v-text)!important;text-shadow:none!important;}
#rp-phone.rp-art-icons #rp-screen :is(.rp-tt,.rp-gm-sub,.rp-gm-role,.rp-set-hint,.rp-set-section-title,.rp-game-partner-sub,.rp-game-partner-hint,.rp-ts-welcome-hint,.rp-theme-desc,.rp-saved-card-time,.rp-game-status,.rp-diary-date) {color:var(--rp-v-muted)!important;opacity:1;text-shadow:none!important;}
#rp-phone.rp-art-icons #rp-screen :is(.rp-moment-name,.rp-moment-cname,.rp-diary-reply-name,.rp-game-partner-title,.rp-game-partner-label,.rp-theme-name,.rp-saved-card-name) {color:var(--rp-v-text)!important;font-weight:600;text-shadow:none!important;}
#rp-phone.rp-art-icons #rp-screen :is(.rp-set-upload-btn,.rp-avatar-upload-btn,.rp-api-preset-btn,#rp-api-fetch-models,#rp-ts-undo-v2,.rp-grp-ft-cancel,#rp-add-cancel,.rp-saved-card-act-btn,#rp-newboard-btn,#rp-game-partner-cancel) {min-height:34px;font-size:12px;background:var(--rp-v-card)!important;color:var(--rp-v-text)!important;border:1px solid var(--rp-v-border)!important;border-radius:10px;box-shadow:none!important;}
#rp-phone.rp-art-icons #rp-screen :is(#rp-send,.rp-diary-send-btn,.rp-compose-post-btn,.rp-moment-csend,#rp-api-save-v,#rp-add-confirm,#rp-block-add-btn,#rp-game-partner-save,#rp-ts-save-v2,#rp-ts-send,#rp-game-send,#g2048-send,#ggold-send,#gword-send,#rp-dice-btn,#ggold-launch-btn,.game-win-btn,#rp-sq-event-done) {background:var(--rp-r-accent)!important;color:var(--rp-r-on-accent)!important;border:none!important;box-shadow:none!important;text-shadow:none!important;}
#rp-phone.rp-art-icons #rp-screen button:disabled {cursor:default;opacity:.5;}
#rp-phone.rp-art-icons #rp-screen :is(.rp-saved-card-delete-btn,.rp-moment-del-btn,.rp-moment-comment-del-btn,.rp-call-rec.missed) {color:var(--rp-v-danger)!important;}
#rp-phone.rp-art-icons #rp-screen :is(.rp-api-preset-btn,.rp-set-section-title,.rp-game-partner-name,.rp-game-status,.ggold-score-lbl,.g2048-slbl,#ggold-chat-hint,#gword-chat-hint,#g2048-chat-hint,#rp-game-chat-hint) {font-size:12px!important;line-height:1.45;}
/* Message reading and existing translation/metadata structure. */
#rp-phone.rp-art-icons #rp-screen .rp-bubble {font-size:14px!important;line-height:1.6;box-shadow:none!important;text-shadow:none!important;}
#rp-phone.rp-art-icons #rp-screen .rp-recv {background:var(--rp-v-card)!important;color:var(--rp-v-text)!important;border:1px solid var(--rp-v-border)!important;}
#rp-phone.rp-art-icons #rp-screen .rp-sent {background:var(--rp-r-accent)!important;color:var(--rp-r-on-accent)!important;border:none!important;}
#rp-phone.rp-art-icons #rp-screen :is(.rp-bts,.rp-out .rp-bts) {color:var(--rp-v-muted)!important;}
#rp-phone.rp-art-icons #rp-screen .rp-bwrap :is(.rp-edit-btn,.rp-del-btn) {width:34px;height:34px;min-width:34px;min-height:34px;font-size:12px;}
#rp-phone.rp-art-icons #rp-screen .rp-bwrap .rp-translation-btn {width:auto;height:auto;min-width:34px;min-height:34px;font-size:12px;white-space:nowrap;}
#rp-phone.rp-art-icons #rp-screen .rp-grp-ft-ok {color:var(--rp-r-accent)!important;min-height:36px;}
#rp-phone.rp-art-icons #rp-screen :is(#rp-composer,.rp-diary-compose,#rp-game-input-row,#g2048-input-row,#ggold-input-row,#gword-input-row,#rp-ts-composer,.rp-api-footer) {background:var(--rp-v-surface)!important;border-color:var(--rp-v-border)!important;}
#rp-phone.rp-art-icons #rp-screen :is(.rp-translation-text,.rp-moment-comments-wrap,.rp-diary-reply,.rp-ts-typing) {background:var(--rp-v-card)!important;color:var(--rp-v-text)!important;border-color:var(--rp-v-border)!important;border-radius:12px;box-shadow:none!important;}
#rp-phone.rp-art-icons #rp-screen :is(.rp-img-bbl,.rp-pending-img,.rp-loc-card) {color:var(--rp-v-text);}
#rp-phone.rp-art-icons #rp-screen .rp-hb-send-btn {background:#a33d46;color:#fff;box-shadow:none;}
#rp-phone.rp-art-icons #rp-screen .rp-loc-send-btn {background:#49755a;box-shadow:none;}
/* Moments and diary: subtle cards, author before metadata, no content folding. */
#rp-phone.rp-art-icons #rp-screen .rp-moment {margin:10px 12px;padding:14px;background:var(--rp-v-surface)!important;border:1px solid var(--rp-v-border)!important;border-radius:16px;box-shadow:none!important;}
#rp-phone.rp-art-icons #rp-screen .rp-moment-bar {justify-content:flex-start;border-color:var(--rp-v-border);}
#rp-phone.rp-art-icons #rp-screen .rp-moment-likes-row {color:var(--rp-v-muted);font-size:12px;}
#rp-phone.rp-art-icons #rp-screen .rp-diary-entry {margin-bottom:12px;}
#rp-phone.rp-art-icons #rp-screen .rp-diary-body {padding:4px 16px 14px;line-height:1.7;}
#rp-phone.rp-art-icons #rp-screen :is(.rp-diary-empty,.rp-moments-empty,.rp-bank-empty,.rp-xhs-empty) {color:var(--rp-v-muted)!important;line-height:1.65;background:var(--rp-v-card)!important;border-color:var(--rp-v-border)!important;box-shadow:none!important;}
#rp-phone.rp-art-icons #rp-screen #rp-diary-status:not(:empty) {padding:10px 12px;margin:8px 14px;background:var(--rp-v-card);border:1px solid var(--rp-v-border);border-radius:12px;color:var(--rp-v-danger);}
/* Theme management and forms keep their fields, prompts and complete privacy text. */
#rp-phone.rp-art-icons #rp-screen .rp-theme-card.rp-tc-active,#rp-phone.rp-art-icons #rp-screen .rp-saved-card.rp-tc-active {border-color:var(--rp-r-accent)!important;box-shadow:0 0 0 1px var(--rp-r-accent)!important;}
#rp-phone.rp-art-icons #rp-screen .rp-theme-check {background:var(--rp-r-accent)!important;color:var(--rp-r-on-accent)!important;}
#rp-phone.rp-art-icons #rp-screen .rp-ts-welcome {padding:14px;}
#rp-phone.rp-art-icons #rp-screen .rp-ts-tpl-btn {background:var(--rp-v-card)!important;border-color:var(--rp-v-border)!important;color:var(--rp-v-text)!important;box-shadow:none!important;font-weight:500;}
#rp-phone.rp-art-icons #rp-screen .rp-ts-bubble-user {background:var(--rp-r-accent)!important;color:var(--rp-r-on-accent)!important;box-shadow:none!important;}
#rp-phone.rp-art-icons #rp-screen .rp-ts-bubble-ai {background:var(--rp-v-card)!important;border:1px solid var(--rp-v-border);box-shadow:none!important;}
#rp-phone.rp-art-icons #rp-screen #rp-ts-tip {color:var(--rp-v-muted)!important;background:var(--rp-v-surface);padding:8px 12px;border-top:1px solid var(--rp-v-border);font-size:12px;font-weight:400;text-shadow:none!important;}
#rp-phone.rp-art-icons #rp-screen .rp-xhs-idea-card {box-shadow:none!important;border-radius:16px!important;}
#rp-phone.rp-art-icons #rp-screen #rp-view-xhs-detail {background:var(--rp-xhs-card,var(--rp-v-surface))!important;}
#rp-phone.rp-art-icons #rp-screen .rp-bank-card {padding:14px;}
#rp-phone.rp-art-icons #rp-screen .rp-asset-item {background:var(--rp-v-card)!important;border-color:var(--rp-v-border)!important;box-shadow:none!important;}
/* Games share surfaces and hierarchy; canvas artwork, modes and rules are unchanged. */
#rp-phone.rp-art-icons #rp-screen :is(#rp-ludo-spicy,.game-win-box,#rp-sq-event-box,#gword-mode-select) {background:var(--rp-v-surface)!important;color:var(--rp-v-text)!important;border-color:var(--rp-v-border)!important;box-shadow:none!important;}
#rp-phone.rp-art-icons #rp-screen :is(#rp-ludo-spicy>div,.game-win-title,.game-win-sub,#rp-sq-event-text,#rp-sq-event-note,#gword-mode-select>div,#ggold-mode-select>div) {color:var(--rp-v-text)!important;text-shadow:none!important;}
#rp-phone.rp-art-icons #rp-screen :is(.rp-spicy-btn,.gword-mode-btn,.ggold-mode-btn) {background:var(--rp-v-card)!important;color:var(--rp-v-text)!important;border:1px solid var(--rp-v-border)!important;border-radius:14px!important;box-shadow:none!important;}
#rp-phone.rp-art-icons #rp-screen :is(.game-win-emoji,.ggold-over-emoji,.gword-over-emoji) {font-size:32px;}
#rp-phone.rp-art-icons #rp-screen :is(#g2048-over,#ggold-over,#gword-over,#ggold-mode-select) {background:color-mix(in srgb,var(--rp-v-surface) 97%,transparent)!important;color:var(--rp-v-text)!important;}
#rp-phone.rp-art-icons #rp-screen :is(.g2048-over-title,.ggold-over-title,.gword-over-title,.g2048-over-sub,.ggold-over-sub,.gword-over-sub) {color:var(--rp-v-text)!important;text-shadow:none!important;}
#rp-phone.rp-art-icons #rp-screen :is(.g2048-over-btn,.ggold-over-btn,.gword-over-btn) {background:var(--rp-r-accent)!important;color:var(--rp-r-on-accent)!important;border-color:var(--rp-v-border)!important;box-shadow:none!important;}
#rp-phone.rp-art-icons #rp-screen :is(.rp-call-av,.rp-call-dec,.rp-call-ans) {box-shadow:none;animation:none;}
#rp-phone.rp-art-icons #rp-screen :is(.rp-call-sub,.rp-call-lbl) {color:#d0cbd9;font-size:12px;}
/* Stable named controls, including the legacy inline-styled task dialog. */
#rp-phone.rp-art-icons #rp-screen :is(#rp-sq-event-box,#rp-sq-task-bar) {background:var(--rp-v-surface)!important;color:var(--rp-v-text)!important;border-color:var(--rp-v-border)!important;border-radius:16px;box-shadow:none!important;}
#rp-phone.rp-art-icons #rp-screen :is(#rp-sq-event-text,#rp-sq-event-note,#rp-sq-event-sq,.rp-game-partner-help) {color:var(--rp-v-muted)!important;font-size:12px;}
#rp-phone.rp-art-icons #rp-screen #rp-sq-event-text {color:var(--rp-v-text)!important;font-size:15px;}
#rp-phone.rp-art-icons #rp-screen :is(#rp-sq-event-done,#rp-game-partner-save) {background:var(--rp-r-accent)!important;color:var(--rp-r-on-accent)!important;box-shadow:none!important;}
#rp-phone.rp-art-icons #rp-screen #rp-game-partner-cancel {background:var(--rp-v-card)!important;color:var(--rp-v-text)!important;box-shadow:none!important;}
#rp-phone.rp-art-icons #rp-screen #rp-ts-composer {background:var(--rp-v-surface)!important;border-color:var(--rp-v-border)!important;}
#rp-phone.rp-art-icons #rp-screen :is(.gword-mode-btn span,.ggold-mode-btn span) {color:var(--rp-v-muted)!important;opacity:1;}
#rp-phone.rp-art-icons #rp-screen :is(#g2048-continue,#g2048-quit,#gword-quit) {background:var(--rp-v-card)!important;color:var(--rp-v-text)!important;}
#rp-phone.rp-art-icons #rp-screen .rp-moment {backdrop-filter:none!important;-webkit-backdrop-filter:none!important;}
#rp-phone.rp-art-icons #rp-screen .rp-moment-comments-wrap .rp-moment-cname {color:var(--rp-v-text)!important;font-weight:600;}
#rp-phone.rp-art-icons #rp-screen :is(#rp-api-test-v,#rp-api-save-v) {border-color:var(--rp-v-border)!important;}
#rp-phone.rp-art-icons #rp-screen #rp-bank-body {--bank-text:var(--rp-v-text);--bank-text-sub:var(--rp-v-muted);--bank-label:var(--rp-v-muted);}
/* Repairs shared with custom themes, without assigning a theme palette. */
#rp-phone #rp-screen :is(.rp-hb-sheet h3,.rp-loc-sheet h3,.rp-game-partner-title) {color:var(--rp-v-text)!important;}
#rp-phone #rp-screen :is(.rp-game-partner-sub,.rp-game-partner-hint) {color:var(--rp-v-muted)!important;}
#rp-phone #rp-screen :is(#rp-add-name,#rp-add-initials,#rp-game-partner-name-input,#rp-game-partner-note-input)::placeholder {color:var(--rp-v-muted)!important;opacity:1;}
#rp-phone #rp-screen #rp-pending-queue {max-height:96px;}
#rp-phone #rp-screen .rp-pending-item {flex:0 0 auto;min-height:24px;font-size:12px;line-height:18px;padding:3px 10px;}
#rp-phone #rp-screen .rp-pending-hint {flex:0 0 auto;min-height:20px;font-size:11px;line-height:17px;}
#rp-phone #rp-screen #rp-view-xhs-compose .rp-nav-bar {position:relative;}
#rp-phone #rp-screen #rp-view-xhs-compose .rp-nav-title {position:absolute!important;left:50%!important;right:auto!important;top:69px!important;transform:translate(-50%,-50%)!important;margin:0!important;max-width:calc(100% - 140px);pointer-events:none;white-space:nowrap;}
#rp-phone #rp-screen #rp-view-xhs-compose #rp-xhs-post-btn {grid-column:3!important;justify-self:end!important;}
#rp-phone #rp-screen .rp-game-resume {position:absolute;inset:0;z-index:130;background:var(--rp-v-surface);color:var(--rp-v-text);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px;}
#rp-phone #rp-screen .rp-game-resume button {min-height:40px;padding:10px 22px;border-radius:12px;border:1px solid var(--rp-v-border);background:var(--rp-v-card);color:var(--rp-v-text);cursor:pointer;font-family:inherit;}
#rp-phone.rp-art-icons #rp-screen .rp-game-resume-primary {background:var(--rp-r-accent);color:var(--rp-r-on-accent);}
/* Fit the rendered canvas, not its simulation coordinates. */
#rp-phone #rp-screen #ggold-canvas-wrap {flex:1 1 190px;min-height:72px;max-height:194px;padding:2px 12px;overflow:hidden;}
/* Gold miner has a distinct start screen, not a translucent layer over a round. */
#rp-phone #rp-screen #rp-view-ggold.rp-gold-choosing :is(#ggold-header,#ggold-timer-wrap,#ggold-coop-bar,#ggold-canvas-wrap,#ggold-action-row,#ggold-chat-hint,#ggold-chat,#ggold-input-row) {display:none!important;}
#rp-phone #rp-screen #rp-view-ggold.rp-gold-choosing #ggold-newbtn {visibility:hidden;pointer-events:none;}
#rp-phone #rp-screen #rp-view-ggold.rp-gold-choosing #ggold-mode-select {position:relative!important;inset:auto!important;flex:1 1 auto;min-height:0;width:100%;box-sizing:border-box;overflow-y:auto;overscroll-behavior:contain;align-items:center;justify-content:flex-start;gap:6px;padding:32px 22px 24px;background:transparent!important;border:0!important;border-radius:0;box-shadow:none!important;z-index:auto;}
#rp-phone #rp-screen #ggold-mode-select .ggold-mode-intro,#rp-phone #rp-screen #rp-ludo-spicy .rp-mode-intro,#rp-phone #rp-screen #gword-mode-select .rp-mode-intro {width:100%;margin-bottom:22px;text-align:center;color:var(--rp-v-text)!important;}
#rp-phone #rp-screen #ggold-mode-select .ggold-mode-title,#rp-phone #rp-screen #rp-ludo-spicy .rp-mode-title,#rp-phone #rp-screen #gword-mode-select .rp-mode-title {font-size:20px;font-weight:500;letter-spacing:.03em;line-height:1.4;margin:0 0 10px;color:var(--rp-v-text)!important;text-shadow:none!important;}
#rp-phone #rp-screen #ggold-mode-select .ggold-mode-sub,#rp-phone #rp-screen #rp-ludo-spicy .rp-mode-sub,#rp-phone #rp-screen #gword-mode-select .rp-mode-sub {font-size:12px;line-height:1.7;text-align:center;padding:0;margin:0;color:var(--rp-v-text)!important;opacity:1;}
#rp-phone #rp-screen #ggold-mode-select .ggold-mode-btn,#rp-phone #rp-screen #rp-ludo-spicy .rp-mode-btn,#rp-phone #rp-screen #gword-mode-select .rp-mode-btn {width:100%;max-width:280px;min-height:88px;flex:0 0 auto;padding:18px 6px;text-align:left;white-space:normal;box-sizing:border-box;font-family:inherit;display:grid;grid-template-columns:38px minmax(0,1fr) 18px;align-items:center;gap:12px;background:transparent!important;border:0!important;border-radius:10px!important;box-shadow:none!important;color:var(--rp-v-text)!important;touch-action:manipulation;cursor:pointer;}
#rp-phone #rp-screen #ggold-mode-select .ggold-mode-mark,#rp-phone #rp-screen #rp-ludo-spicy .rp-mode-mark,#rp-phone #rp-screen #gword-mode-select .rp-mode-mark {width:38px;height:38px;display:flex;align-items:center;justify-content:center;border-radius:50%;background:color-mix(in srgb,var(--rp-nav-btn) 8%,transparent)!important;color:var(--rp-v-text)!important;font:17px/1 Georgia,"Times New Roman",serif;letter-spacing:.02em;}
#rp-phone #rp-screen #ggold-mode-select .ggold-mode-copy,#rp-phone #rp-screen #rp-ludo-spicy .rp-mode-copy,#rp-phone #rp-screen #gword-mode-select .rp-mode-copy {min-width:0;display:flex;flex-direction:column;gap:7px;}
#rp-phone #rp-screen #ggold-mode-select .ggold-mode-top,#rp-phone #rp-screen #rp-ludo-spicy .rp-mode-top,#rp-phone #rp-screen #gword-mode-select .rp-mode-top {display:block;}
#rp-phone #rp-screen #ggold-mode-select .ggold-mode-name,#rp-phone #rp-screen #rp-ludo-spicy .rp-mode-name,#rp-phone #rp-screen #gword-mode-select .rp-mode-name {font-size:17px;font-weight:500;line-height:1.4;color:var(--rp-v-text)!important;opacity:1;}
#rp-phone #rp-screen #ggold-mode-select .ggold-mode-enter,#rp-phone #rp-screen #rp-ludo-spicy .rp-mode-enter,#rp-phone #rp-screen #gword-mode-select .rp-mode-enter {font-size:24px;font-weight:400;line-height:1;color:var(--rp-v-text)!important;opacity:1;white-space:nowrap;justify-self:end;}
#rp-phone #rp-screen #ggold-mode-select .ggold-mode-desc,#rp-phone #rp-screen #rp-ludo-spicy .rp-mode-desc,#rp-phone #rp-screen #gword-mode-select .rp-mode-desc {font-size:12px;font-weight:400;line-height:1.7;overflow-wrap:anywhere;color:var(--rp-v-text)!important;opacity:1;}
#rp-phone #rp-screen #ggold-mode-select .ggold-mode-btn:hover,#rp-phone #rp-screen #rp-ludo-spicy .rp-mode-btn:hover,#rp-phone #rp-screen #gword-mode-select .rp-mode-btn:hover {background:color-mix(in srgb,var(--rp-v-text) 3%,transparent)!important;}
#rp-phone #rp-screen #ggold-mode-select .ggold-mode-btn:active,#rp-phone #rp-screen #rp-ludo-spicy .rp-mode-btn:active,#rp-phone #rp-screen #gword-mode-select .rp-mode-btn:active {background:color-mix(in srgb,var(--rp-v-text) 6%,transparent)!important;}
#rp-phone #rp-screen #ggold-mode-select .ggold-mode-btn:focus-visible,#rp-phone #rp-screen #rp-ludo-spicy .rp-mode-btn:focus-visible,#rp-phone #rp-screen #gword-mode-select .rp-mode-btn:focus-visible {outline:2px solid var(--rp-v-text)!important;outline-offset:3px;}
#rp-phone #rp-screen #rp-view-ggold.rp-gold-choosing .rp-game-partner-change {min-height:36px;background:transparent!important;border:0!important;box-shadow:none!important;color:var(--rp-v-text)!important;font-size:12px;padding:6px 8px;}
#rp-phone #rp-screen #gword-status:empty {display:none;}
#rp-phone #rp-screen #gword-hint-feedback {display:flex;align-items:center;gap:10px;flex:0 0 auto;padding:8px 14px;background:transparent!important;border:0!important;box-shadow:none!important;color:var(--rp-v-text)!important;}
#rp-phone #rp-screen #gword-hint-message {flex:1 1 auto;min-width:0;font-size:12px;line-height:1.6;font-weight:400;overflow-wrap:anywhere;color:var(--rp-v-text)!important;}
#rp-phone #rp-screen :is(#gword-retry-hint,#gword-retry-guess) {width:auto!important;max-width:100%;align-self:flex-end;flex:0 0 auto;min-height:36px;padding:6px 10px;margin:0 14px 4px;border:0!important;border-radius:10px;background:var(--rp-v-card)!important;color:var(--rp-v-text)!important;box-shadow:none!important;font-size:12px;font-weight:500;font-family:inherit;line-height:1.4;white-space:nowrap;touch-action:manipulation;}
#rp-phone #rp-screen #gword-hint-feedback #gword-retry-hint {align-self:center;margin:0;}
#rp-phone #rp-screen :is(#gword-retry-hint,#gword-retry-guess):focus-visible {outline:2px solid var(--rp-v-text)!important;outline-offset:2px;}
#rp-phone #rp-screen #gword-retry-hint:disabled {opacity:.7;cursor:wait;}
#rp-phone.rp-compact #rp-screen #rp-view-ggold.rp-gold-choosing #ggold-mode-select {flex:1 0 auto;padding:12px 20px 20px;gap:6px;}
#rp-phone.rp-compact #rp-screen #ggold-mode-select .ggold-mode-intro {margin-bottom:12px;}
/* Approved A artwork: real text/actions stay above decorative raster assets. */
#rp-phone #rp-screen :is(.rp-gold-art,.rp-ludo-art,.rp-word-art),#rp-phone #rp-screen :is(.rp-gold-mode-divider,.rp-ludo-mode-divider,.rp-word-mode-divider) {display:none;}
#rp-phone #rp-screen :is(.rp-gold-art,.rp-ludo-art,.rp-word-art)[hidden] {display:none!important;}
/* Include frame specificity so the illustrated paper wins over the shared non-home surface rule. */
#rp-phone.rp-art-icons #rp-frame #rp-screen :is(#rp-view-ggold.rp-gold-choosing.rp-gold-illustrated,#rp-view-game.rp-ludo-choosing.rp-ludo-illustrated,#rp-view-gword.rp-word-choosing.rp-word-illustrated) {background:var(--rp-v-surface) var(--rp-gold-paper,none) center/cover!important;}
#rp-phone #rp-screen :is(#rp-view-ggold.rp-gold-illustrated,#rp-view-game.rp-ludo-illustrated,#rp-view-gword.rp-word-illustrated)>.rp-nav-bar,#rp-phone #rp-screen :is(#rp-view-ggold.rp-gold-illustrated,#rp-view-game.rp-ludo-illustrated,#rp-view-gword.rp-word-illustrated) .rp-game-partner-bar {background:transparent!important;}
#rp-phone #rp-screen :is(#rp-view-ggold.rp-gold-illustrated,#rp-view-game.rp-ludo-illustrated,#rp-view-gword.rp-word-illustrated) :is(#ggold-mode-select,#rp-ludo-spicy,#gword-mode-select) {padding:6px 16px 18px;gap:4px;}
#rp-phone #rp-screen :is(#rp-view-ggold.rp-gold-illustrated,#rp-view-game.rp-ludo-illustrated,#rp-view-gword.rp-word-illustrated) :is(.rp-gold-hero,.rp-ludo-hero,.rp-word-hero) {display:block;width:100%;height:126px;min-height:126px;object-fit:contain;flex-shrink:0;margin:0;}
#rp-phone #rp-screen :is(#rp-view-ggold.rp-gold-illustrated,#rp-view-game.rp-ludo-illustrated,#rp-view-gword.rp-word-illustrated) :is(.ggold-mode-intro,.rp-mode-intro) {margin:4px 0 6px;}
#rp-phone #rp-screen :is(#rp-view-ggold.rp-gold-illustrated,#rp-view-game.rp-ludo-illustrated,#rp-view-gword.rp-word-illustrated) :is(.ggold-mode-title,.rp-mode-title) {font-weight:600;margin:0;}
#rp-phone #rp-screen :is(#rp-view-ggold.rp-gold-illustrated,#rp-view-game.rp-ludo-illustrated,#rp-view-gword.rp-word-illustrated) :is(.ggold-mode-sub,.rp-mode-sub) {display:none;}
#rp-phone #rp-screen :is(#rp-view-ggold.rp-gold-illustrated,#rp-view-game.rp-ludo-illustrated,#rp-view-gword.rp-word-illustrated) :is(.rp-gold-mode-divider,.rp-ludo-mode-divider,.rp-word-mode-divider) {display:block;font-size:11px;color:var(--rp-v-text);margin:2px 0;}
#rp-phone #rp-screen :is(#rp-view-ggold.rp-gold-illustrated,#rp-view-game.rp-ludo-illustrated,#rp-view-gword.rp-word-illustrated) :is(.ggold-mode-btn,.rp-mode-btn) {grid-template-columns:88px minmax(0,1fr) 16px;gap:10px;max-width:320px;min-height:96px;padding:6px 0;}
#rp-phone #rp-screen :is(#rp-view-ggold.rp-gold-illustrated,#rp-view-game.rp-ludo-illustrated,#rp-view-gword.rp-word-illustrated) :is(.ggold-mode-btn,.rp-mode-btn)>:is(.rp-gold-art,.rp-ludo-art,.rp-word-art) {display:block;width:88px;height:84px;object-fit:contain;border:none;box-shadow:none;}
#rp-phone #rp-screen :is(#rp-view-ggold.rp-gold-illustrated,#rp-view-game.rp-ludo-illustrated,#rp-view-gword.rp-word-illustrated) :is(.ggold-mode-mark,.rp-mode-mark) {display:none;}
#rp-phone #rp-screen :is(#rp-view-ggold.rp-gold-illustrated,#rp-view-game.rp-ludo-illustrated,#rp-view-gword.rp-word-illustrated) :is(.ggold-mode-btn,.rp-mode-btn)>:is(.rp-gold-art,.rp-ludo-art,.rp-word-art)[hidden]+:is(.ggold-mode-mark,.rp-mode-mark) {display:flex;justify-self:center;}
#rp-phone.rp-compact #rp-screen :is(#rp-view-ggold.rp-gold-illustrated,#rp-view-game.rp-ludo-illustrated,#rp-view-gword.rp-word-illustrated) :is(.rp-gold-hero,.rp-ludo-hero,.rp-word-hero) {height:100px;min-height:100px;}
#rp-phone #rp-screen #ggold-canvas {height:100%;width:auto;max-width:100%;max-height:190px;aspect-ratio:27/19;object-fit:contain;}
/* Word-game selection shares the A rows without covering navigation or showing inactive round controls. */
#rp-phone #rp-screen #gword-mode-select {display:none;}
#rp-phone #rp-screen #rp-view-gword.rp-word-choosing :is(#gword-header,#gword-status,#gword-hint-feedback,#gword-chat-hint,#gword-chat,#gword-input-row,#gword-over) {display:none!important;}
#rp-phone #rp-screen #rp-view-gword.rp-word-choosing #gword-newbtn {visibility:hidden;pointer-events:none;}
#rp-phone #rp-screen #rp-view-gword.rp-word-choosing #gword-mode-select {position:relative!important;inset:auto!important;display:flex;flex:1 1 auto;min-height:0;width:100%;box-sizing:border-box;overflow-y:auto;overscroll-behavior:contain;flex-direction:column;align-items:center;justify-content:flex-start;gap:4px;padding:20px 16px;background:transparent!important;border:0!important;border-radius:0;box-shadow:none!important;z-index:auto;}
#rp-phone #rp-screen #rp-view-gword.rp-word-choosing .rp-game-partner-change {min-height:36px;background:transparent!important;border:0!important;box-shadow:none!important;color:var(--rp-v-text)!important;font-size:12px;padding:6px 8px;}
/* Ludo has three existing scale levels: share rows/artwork, fit three entries without a blocking overlay. */
#rp-phone #rp-screen #rp-ludo-spicy {display:none;}
#rp-phone #rp-screen #rp-view-game.rp-ludo-choosing :is(#rp-game-board-wrap,#rp-game-controls,#rp-game-chat-hint,#rp-game-chat,#rp-game-input-row,#rp-game-win,#rp-sq-event,#rp-sq-task-bar) {display:none!important;}
#rp-phone #rp-screen #rp-view-game.rp-ludo-choosing #rp-ludo-spicy {position:relative!important;inset:auto!important;display:flex;flex:1 1 auto;min-height:0;width:100%;box-sizing:border-box;overflow-y:auto;overscroll-behavior:contain;flex-direction:column;align-items:center;justify-content:flex-start;gap:4px;padding:20px 16px;background:transparent!important;border:0!important;border-radius:0;box-shadow:none!important;z-index:auto;}
#rp-phone #rp-screen #rp-view-game.rp-ludo-choosing .rp-game-partner-change {min-height:36px;background:transparent!important;border:0!important;box-shadow:none!important;color:var(--rp-v-text)!important;font-size:12px;padding:6px 8px;}
#rp-phone #rp-screen #rp-view-game.rp-ludo-illustrated #rp-ludo-spicy .rp-ludo-hero {height:88px;min-height:88px;}
#rp-phone #rp-screen #rp-view-game.rp-ludo-illustrated #rp-ludo-spicy .rp-mode-btn {grid-template-columns:72px minmax(0,1fr) 16px;min-height:76px;gap:10px;padding:6px 0;}
#rp-phone #rp-screen #rp-view-game.rp-ludo-illustrated #rp-ludo-spicy .rp-mode-btn>.rp-ludo-art {width:68px;height:64px;}
#rp-phone #rp-screen #rp-view-game.rp-ludo-illustrated #rp-ludo-spicy {padding:6px 16px 14px;}
#rp-phone.rp-compact #rp-screen #rp-view-game.rp-ludo-illustrated #rp-ludo-spicy .rp-ludo-hero {height:70px;min-height:70px;}
#rp-phone.rp-compact #rp-screen :is(#rp-view-game,#rp-view-g2048,#rp-view-ggold) {overflow-y:auto;overscroll-behavior:contain;}
#rp-phone.rp-compact #rp-screen :is(#rp-view-game,#rp-view-g2048,#rp-view-ggold)>.rp-nav-bar {height:80px;min-height:80px;padding-top:44px;}
#rp-phone.rp-compact #rp-screen .rp-game-partner-bar {padding:2px 12px;min-height:28px;}
#rp-phone.rp-compact #rp-screen #rp-game-board-wrap {flex:1 0 130px;min-height:130px;padding:0 12px;}
#rp-phone.rp-compact #rp-screen #rp-game-controls {padding:4px 10px;min-height:58px;gap:6px;}
#rp-phone.rp-compact #rp-screen .rp-game-players {font-size:12px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
#rp-phone.rp-compact #rp-screen :is(#rp-game-chat,#g2048-chat,#ggold-chat) {flex:0 0 32px;min-height:32px;max-height:32px;overflow-y:auto;}
#rp-phone.rp-compact #rp-screen :is(#rp-game-input-row,#g2048-input-row,#ggold-input-row) {padding:4px 12px 8px;position:sticky;bottom:0;flex-shrink:0;background:var(--rp-v-surface);}
#rp-phone.rp-compact #rp-screen #ggold-action-row {padding:3px 12px;}
/* Borderless reading and semantic editing. Built-in themes only: custom CSS owns its palette. */
#rp-phone.rp-art-icons #rp-screen .rp-nav-bar {border-bottom:none!important;}
#rp-phone.rp-art-icons #rp-screen :is(.rp-back,.rp-nav-add) {background:transparent!important;border:none!important;box-shadow:none!important;}
#rp-phone.rp-art-icons #rp-screen #rp-diary-list {padding:16px 22px 8px!important;}
#rp-phone.rp-art-icons #rp-screen #rp-view-diary .rp-diary-entry {background:transparent!important;border:none!important;border-radius:0!important;margin:0 0 28px!important;box-shadow:none!important;overflow:visible;}
#rp-phone.rp-art-icons #rp-screen #rp-view-diary .rp-diary-hd {padding:0 0 10px;background:transparent!important;border:none!important;}
#rp-phone.rp-art-icons #rp-screen #rp-view-diary .rp-diary-author {font-size:13px;font-weight:600;}
#rp-phone.rp-art-icons #rp-screen #rp-view-diary .rp-diary-date {font-size:11px;margin-top:3px;}
#rp-phone.rp-art-icons #rp-screen #rp-view-diary .rp-diary-body {padding:0!important;font-size:14px;line-height:1.85;}
#rp-phone.rp-art-icons #rp-screen #rp-view-diary .rp-diary-reply {margin:14px 0 0 10px!important;padding:0 0 0 10px!important;background:transparent!important;border:none!important;border-radius:0!important;box-shadow:none!important;}
#rp-phone.rp-art-icons #rp-screen #rp-view-diary .rp-diary-reply-name {font-size:12px;color:var(--rp-v-muted)!important;}
#rp-phone.rp-art-icons #rp-screen #rp-view-diary .rp-diary-reply-text {font-size:13px;line-height:1.7;margin-top:4px;}
#rp-phone.rp-art-icons #rp-screen #rp-view-diary .rp-diary-compose {border:none!important;padding:10px 18px 18px;box-shadow:none!important;}
#rp-phone.rp-art-icons #rp-screen #rp-diary-input {background:var(--rp-v-card)!important;color:var(--rp-v-text)!important;border:none!important;border-radius:12px!important;padding:12px!important;box-shadow:none!important;line-height:1.7;}
#rp-phone.rp-art-icons #rp-screen #rp-diary-status:not(:empty) {background:transparent!important;border:none!important;border-radius:0;margin:0;padding:6px 22px;color:var(--rp-v-muted);}
#rp-phone.rp-art-icons #rp-screen #rp-diary-status[data-status=error] {color:var(--rp-v-danger)!important;}
#rp-phone.rp-art-icons #rp-screen #rp-diary-status[data-status=success] {color:var(--rp-r-accent)!important;}
/* A single visual editor contract replaces per-game and diary inline skin branches. */
#rp-phone.rp-art-icons #rp-screen .rp-inline-textarea {background:var(--rp-v-card)!important;color:var(--rp-v-text)!important;border:none!important;border-radius:10px!important;box-shadow:none!important;font-size:13px;line-height:1.7;font-family:inherit;}
#rp-phone.rp-art-icons #rp-screen :is(.rp-inline-ok,.rp-inline-cancel) {width:36px;height:36px;min-width:36px;min-height:36px;border:none;border-radius:50%;font-size:14px;cursor:pointer;flex-shrink:0;box-shadow:none!important;}
#rp-phone.rp-art-icons #rp-screen .rp-inline-ok {background:var(--rp-r-accent)!important;color:var(--rp-r-on-accent)!important;}
#rp-phone.rp-art-icons #rp-screen .rp-inline-cancel {background:transparent!important;color:var(--rp-v-muted)!important;}
#rp-phone.rp-art-icons #rp-screen :is(input,textarea):focus-visible {outline:2px solid var(--rp-r-accent)!important;outline-offset:2px;box-shadow:none!important;}
#rp-phone.rp-art-icons #rp-screen button:focus-visible {outline:2px solid var(--rp-r-accent);outline-offset:2px;}
.rp-game-edit-wrap {display:flex;flex-direction:column;gap:4px;flex:1;min-width:0;}
.rp-game-editor {flex:1;width:100%;font-size:12px;line-height:1.5;}
.rp-diary-editor {width:100%;box-sizing:border-box;}
/* Social reading: content edges are not card edges; keep every existing tool visible. */
#rp-phone.rp-art-icons #rp-screen .rp-recv {border:none!important;}
#rp-phone.rp-art-icons #rp-screen .rp-bwrap .rp-translation-btn {border:none!important;background:transparent!important;box-shadow:none!important;padding:3px 5px;}
#rp-phone.rp-art-icons #rp-screen .rp-translation-text {border:none!important;padding:8px 10px;border-radius:8px;}
#rp-phone.rp-art-icons #rp-screen :is(#rp-composer,.rp-moment-comments-wrap,.rp-moment-bar,.rp-moment-input-row) {border:none!important;box-shadow:none!important;}
#rp-phone.rp-art-icons #rp-screen .rp-moment-comments-wrap {background:transparent!important;padding:8px 0!important;}
#rp-phone.rp-art-icons #rp-screen .rp-moment-comment {padding:6px 0!important;line-height:1.65;}
#rp-phone.rp-art-icons #rp-screen .rp-moment-act {border:none!important;background:transparent!important;box-shadow:none!important;padding:5px 7px;}
#rp-phone.rp-art-icons #rp-screen :is(.rp-moment-reply-btn,.rp-moment-comment-del-btn) {min-height:32px;}
#rp-phone.rp-art-icons #rp-screen :is(.rp-voice-wrap,.rp-hongbao,.rp-pending-img,.rp-loc-card) {box-shadow:none!important;border:none!important;}
#rp-phone.rp-art-icons #rp-screen .rp-hongbao {background:linear-gradient(145deg,#b5464c,#96373f);}
#rp-phone.rp-art-icons #rp-screen .rp-badge {background:var(--rp-r-accent)!important;color:var(--rp-r-on-accent)!important;box-shadow:none!important;}
#rp-phone.rp-art-icons #rp-screen #rp-thread-list .rp-thread {background:transparent!important;border:none!important;box-shadow:none!important;padding-top:13px;padding-bottom:13px;}
#rp-phone.rp-art-icons #rp-screen #rp-compose-modal :is(.rp-compose-card,.rp-compose-text,#rp-compose-text) {border:none!important;box-shadow:none!important;background:transparent!important;color:var(--rp-v-text)!important;}
/* XHS has its own tokens: define the complete night set, do not tint image content. */
#rp-phone:where(:not(.rp-theme-custom)).rp-art-icons.rp-dark {--rp-xhs-bg:var(--rp-v-surface);--rp-xhs-card:var(--rp-v-surface);--rp-xhs-soft:var(--rp-v-card);--rp-xhs-chip:var(--rp-v-card);--rp-xhs-text:var(--rp-v-text);--rp-xhs-text-soft:var(--rp-v-muted);--rp-xhs-text-faint:var(--rp-v-muted);--rp-xhs-border:var(--rp-v-border);--rp-xhs-accent:#ff687f;}
#rp-phone.rp-art-icons #rp-screen #rp-view-xhs-detail :is(.rp-xhs-comment,#rp-xhs-detail-input-bar) {border:none!important;box-shadow:none!important;background:var(--rp-xhs-card,var(--rp-v-surface))!important;}
#rp-phone.rp-art-icons #rp-screen #rp-view-xhs-detail .rp-xhs-comment {border-radius:0!important;padding:12px 0!important;}
#rp-phone.rp-art-icons #rp-screen #rp-xhs-detail-body>div {background:var(--rp-v-surface)!important;border:none!important;box-shadow:none!important;}
#rp-phone.rp-art-icons #rp-screen #rp-xhs-comments-list {background:transparent!important;border:none!important;box-shadow:none!important;border-radius:0!important;padding:0!important;}
#rp-phone.rp-art-icons #rp-screen #rp-view-xhs-detail :is([data-xhs-del-cidx],#rp-xhs-del-post) {color:var(--rp-v-danger)!important;}
#rp-phone.rp-art-icons #rp-screen #rp-view-xhs-detail .rp-xhs-comment-actions>div {min-width:36px;min-height:32px;padding:8px 5px;font-size:12px!important;display:inline-flex;align-items:center;background:transparent!important;}
#rp-phone.rp-art-icons #rp-screen #rp-view-xhs-detail #rp-xhs-detail-input {background:var(--rp-v-card)!important;color:var(--rp-v-text)!important;border:none!important;box-shadow:none!important;}
#rp-phone.rp-art-icons #rp-screen #rp-view-xhs-compose .rp-xhs-idea-card {border:none!important;background:transparent!important;box-shadow:none!important;padding:14px 6px!important;}
/* Forms use spacing and field fills. Focus and selection remain explicit. */
#rp-phone.rp-art-icons #rp-screen :is(.rp-set-section,.rp-ts-welcome,.rp-theme-info,.rp-saved-card) {border:none!important;box-shadow:none!important;}
#rp-phone.rp-art-icons #rp-screen .rp-set-section {padding:12px 0!important;background:transparent!important;border-radius:0!important;}
#rp-phone.rp-art-icons #rp-screen :is(.rp-set-row,.rp-set-section-title,.rp-ts-welcome) {border:none!important;background:transparent!important;}
#rp-phone.rp-art-icons #rp-screen .rp-set-section-title {padding:4px 0;font-weight:600;margin-top:20px;}
#rp-phone.rp-art-icons #rp-screen :is(.rp-api-input,.rp-set-select,#rp-add-form input,#rp-block-input,.rp-grp-name-inp,.rp-game-partner-input,.rp-game-partner-textarea,#rp-game-partner-name-input,#rp-game-partner-note-input) {background:var(--rp-v-card)!important;color:var(--rp-v-text)!important;border:none!important;box-shadow:none!important;}
#rp-phone.rp-art-icons #rp-screen :is(.rp-set-upload-btn,.rp-avatar-upload-btn,.rp-api-preset-btn,#rp-api-fetch-models,#rp-ts-undo-v2,.rp-saved-card-act-btn,.rp-game-partner-actions button) {border:none!important;box-shadow:none!important;}
#rp-phone.rp-art-icons #rp-screen .rp-api-preset-btn {background:transparent!important;padding:6px 10px;}
#rp-phone.rp-art-icons #rp-screen :is(.rp-ts-tpl-btn,.rp-ts-bubble-ai,#rp-ts-composer,#rp-ts-tip) {border:none!important;box-shadow:none!important;}
#rp-phone.rp-art-icons #rp-screen .rp-ts-welcome {padding:12px 4px;}
#rp-phone.rp-art-icons #rp-screen :is(.rp-theme-card,.rp-saved-card) {border:none!important;box-shadow:none!important;background:transparent!important;}
#rp-phone.rp-art-icons #rp-screen .rp-theme-card.rp-tc-active,#rp-phone.rp-art-icons #rp-screen .rp-saved-card.rp-tc-active {box-shadow:none!important;}
#rp-phone.rp-art-icons #rp-screen .rp-theme-info {padding:12px 3px!important;background:transparent!important;}
#rp-phone.rp-art-icons #rp-screen .rp-saved-card-actions {border:none!important;background:transparent!important;}
#rp-phone.rp-art-icons #rp-screen .rp-theme-mini-scene[data-preview-theme=candy] {--rp-mini-panel:#faf8f5;--rp-mini-sent:#956174;--rp-mini-recv:#f1ece9;--rp-mini-text:#44353d;}
#rp-phone.rp-art-icons #rp-screen .rp-theme-mini-scene[data-preview-theme=star] {--rp-mini-panel:#211e2b;--rp-mini-sent:#bca9d0;--rp-mini-recv:#2c2738;--rp-mini-text:#ece6f3;}
#rp-phone.rp-art-icons #rp-screen .rp-theme-mini-scene[data-preview-theme=misty] {--rp-mini-panel:#f5f8f9;--rp-mini-sent:#52758b;--rp-mini-recv:#eaf0f3;--rp-mini-text:#344953;}
#rp-phone.rp-art-icons #rp-screen .rp-theme-mini-scene:not([data-preview-theme=custom]) .rp-theme-mini-recv {background:var(--rp-mini-recv)!important;color:var(--rp-mini-text)!important;border:none!important;box-shadow:none!important;}
#rp-phone.rp-art-icons #rp-screen .rp-theme-mini-scene:not([data-preview-theme=custom]) .rp-theme-mini-sent {background:var(--rp-mini-sent)!important;color:#fff!important;box-shadow:none!important;}
#rp-phone.rp-art-icons #rp-screen .rp-theme-mini-scene[data-preview-theme=star] .rp-theme-mini-sent {color:#251f30!important;}
/* Financial reading: one accent summary, then unframed rows. */
#rp-phone.rp-art-icons #rp-screen .rp-bank-hero {background:var(--rp-v-card)!important;color:var(--rp-v-text)!important;border:none!important;box-shadow:none!important;border-radius:18px;}
#rp-phone.rp-art-icons #rp-screen .rp-bank-hero::before,#rp-phone.rp-art-icons #rp-screen .rp-bank-hero::after {display:none!important;}
#rp-phone.rp-art-icons #rp-screen :is(.rp-bank-hero-amount,.rp-bank-hero-unit,.rp-bank-hero-stat-val,.rp-bank-hero-chip-text) {color:var(--rp-v-text);text-shadow:none;}
#rp-phone.rp-art-icons #rp-screen :is(.rp-bank-hero-label,.rp-bank-hero-sub,.rp-bank-hero-stat-lbl) {color:var(--rp-v-muted)!important;opacity:1;}
#rp-phone.rp-art-icons #rp-screen :is(.rp-bank-hero-chip,.rp-bank-hero-divider,.rp-bank-card,.rp-bank-txn) {border:none!important;box-shadow:none!important;}
#rp-phone.rp-art-icons #rp-screen .rp-bank-hero-chip {background:transparent!important;padding-left:0;}
#rp-phone.rp-art-icons #rp-screen .rp-bank-card {background:transparent!important;padding:12px 4px!important;}
#rp-phone.rp-art-icons #rp-screen .rp-asset-item {background:transparent!important;border:none!important;border-radius:0!important;padding:14px 0!important;}
/* One overlay surface; folder grid balanced, copyright content stays intact. */
/* Always-readable base for Chrome 109; only supported engines enhance transparency. */
#rp-phone:is(.rp-art-icons,.rp-art-pack) #rp-screen #rp-folder-modal {background:var(--rp-v-surface,#fff7fa)!important;}
@supports (background:color-mix(in srgb,white 86%,transparent)) {
#rp-phone:is(.rp-art-icons,.rp-art-pack) #rp-screen #rp-folder-modal {background:color-mix(in srgb,var(--rp-v-surface) 86%,transparent)!important;}
}
#rp-phone.rp-art-icons #rp-screen :is(.rp-folder-popup,.rp-about-card) {border:none!important;box-shadow:none!important;}
#rp-phone.rp-art-icons #rp-screen .rp-folder-popup {display:grid!important;grid-template-columns:repeat(3,minmax(0,1fr))!important;gap:18px 10px;background:transparent!important;padding:18px 14px;}
#rp-phone.rp-art-icons #rp-screen .rp-folder-item {width:auto;min-width:0;}
#rp-phone.rp-art-icons #rp-screen :is(.rp-folder-title-lbl,.rp-folder-item-lbl) {color:var(--rp-v-text)!important;text-shadow:none!important;}
#rp-phone:where(:not(.rp-theme-custom)).rp-art-icons.rp-dark #rp-screen .rp-about-card {background:var(--rp-v-card)!important;color:var(--rp-v-text)!important;}
#rp-phone:where(:not(.rp-theme-custom)).rp-art-icons.rp-dark #rp-screen :is(#rp-about-title,#rp-about-author,#rp-about-notice,.rp-about-hl) {color:var(--rp-v-text)!important;text-shadow:none!important;}
#rp-phone.rp-art-icons #rp-screen .rp-grp-pick-chk {border-color:var(--rp-v-muted)!important;}
#rp-phone.rp-art-icons #rp-screen .rp-grp-pick-item.selected .rp-grp-pick-chk {background:var(--rp-r-accent)!important;border-color:var(--rp-r-accent)!important;color:var(--rp-r-on-accent)!important;}
/* Games retain board structure, not decorative dashboard outlines. */
#rp-phone.rp-art-icons #rp-screen :is(.g2048-score-box,.ggold-score-box,.rp-game-partner-bar,.rp-game-controls,#rp-game-controls,#rp-game-chat,#g2048-chat,#ggold-chat,#gword-chat) {border:none!important;box-shadow:none!important;background:transparent!important;}
#rp-phone.rp-art-icons #rp-screen :is(.g2048-sbox,.ggold-sbox) {border:none!important;box-shadow:none!important;background:transparent!important;}
#rp-phone.rp-art-icons #rp-screen #g2048-board {box-shadow:none!important;background:var(--rp-v-card)!important;}
#rp-phone.rp-art-icons #rp-screen :is(.rp-spicy-btn,.gword-mode-btn,.ggold-mode-btn,.game-win-box,#rp-sq-event-box) {border:none!important;box-shadow:none!important;}
#rp-phone.rp-art-icons #rp-screen :is(#rp-newboard-btn,#g2048-newbtn,#ggold-newbtn,#gword-newbtn,.rp-game-resume button:not(.rp-game-resume-primary)) {border:none!important;background:transparent!important;box-shadow:none!important;}
#rp-phone.rp-art-icons #rp-screen :is(.rp-diary-empty,.rp-moments-empty,.rp-bank-empty,.rp-xhs-empty,#rp-xhs-loading) {background:transparent!important;border:none!important;box-shadow:none!important;}
#rp-phone.rp-art-icons #rp-screen :is(.rp-av,.rp-grp-av,.rp-moment-av,.rp-grp-pick-av,.rp-call-av,.rp-hd-av):not(.rp-av-img) {background:var(--rp-v-card)!important;color:var(--rp-v-text)!important;border:none!important;box-shadow:none!important;}
#rp-phone.rp-art-icons #rp-screen #rp-view-settings :is(.rp-set-hint,.rp-set-section-title),#rp-phone.rp-art-icons #rp-screen #rp-view-theme-studio #rp-ts-tip {color:var(--rp-v-muted)!important;opacity:1!important;text-shadow:none!important;}
`;

export const RP_IMPROVEMENT_CSS = `
#rp-phone .rp-feature-nav-actions {display:flex;align-items:center;gap:4px;}
#rp-phone .rp-feature-nav {border:0;background:transparent;color:var(--rp-nav-btn,#99677e);font:inherit;font-size:11px;min-height:30px;padding:0 2px;cursor:pointer;}
#rp-phone .rp-feature-results {max-height:260px;overflow:auto;}
#rp-phone .rp-feature-result {display:block;width:100%;text-align:left;border:0;border-top:1px solid var(--rp-v-border,rgba(90,60,80,.13));padding:10px 4px;color:inherit;background:transparent;cursor:pointer;white-space:normal;overflow-wrap:anywhere;font:inherit;}
#rp-phone .rp-feature-result strong {display:block;font-size:12px;}
#rp-phone .rp-feature-preview {display:block;color:var(--rp-v-muted,#867882);font-size:12px;margin-top:3px;}
#rp-phone #rp-go-latest {position:absolute;right:12px;bottom:84px;z-index:30;font-size:11px;background:var(--rp-v-surface,#fffaf8);color:var(--rp-v-text,#493e46);}
#rp-phone .rp-search-match {outline:1px solid var(--rp-nav-btn,#99677e);outline-offset:2px;border-radius:10px;}

#rp-phone #rp-screen.rp-undo-active > .rp-view {height:calc(100% - 64px)!important;bottom:64px!important;}
#rp-phone #rp-undo-banner {position:absolute;bottom:14px;height:46px;box-sizing:border-box;left:12px;right:12px;z-index:650;display:flex;align-items:center;gap:6px;background:var(--rp-v-surface,#fffaf8);color:var(--rp-v-text,#493e46);padding:8px 10px;border:1px solid var(--rp-v-border,rgba(90,60,80,.18));border-radius:12px;font-size:12px;line-height:1.4;}
#rp-phone #rp-undo-banner span {flex:1;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
#rp-phone #rp-undo-banner button {border:0;background:transparent;color:var(--rp-nav-btn,#99677e);font:inherit;min-height:30px;cursor:pointer;}
#rp-phone .rp-diary-retry-row {margin-top:8px;}
#rp-phone .rp-diary-retry:disabled {opacity:.6;cursor:wait;}

#rp-phone .rp-feature-layer {position:absolute;inset:0;z-index:700;display:flex;align-items:center;justify-content:center;padding:16px;background:rgba(0,0,0,.18);box-sizing:border-box;}
#rp-phone .rp-feature-panel {width:100%;max-height:88%;overflow:auto;padding:15px;border-radius:18px;background:var(--rp-v-surface,#fffaf8);color:var(--rp-v-text,#493e46);border:1px solid var(--rp-v-border,rgba(90,60,80,.14));box-sizing:border-box;font-size:13px;line-height:1.5;}
#rp-phone .rp-feature-header {display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:12px;}
#rp-phone .rp-feature-close {border:0;background:transparent;color:inherit;min-width:30px;min-height:30px;font-size:20px;cursor:pointer;}
#rp-phone .rp-feature-actions {display:flex;justify-content:flex-end;flex-wrap:wrap;gap:8px;margin-top:12px;}
#rp-phone .rp-feature-actions button,#rp-phone .rp-feature-pill {border:1px solid var(--rp-v-border,rgba(90,60,80,.15));border-radius:12px;padding:7px 10px;background:var(--rp-v-card,rgba(120,90,110,.06));color:inherit;font:inherit;cursor:pointer;min-height:32px;}
#rp-phone .rp-feature-actions .rp-feature-primary {background:var(--rp-r-accent,var(--rp-nav-btn,#99677e));color:#fff;border-color:transparent;}
#rp-phone .rp-feature-actions .rp-feature-danger {color:var(--rp-v-danger,#b53f55);}
#rp-phone .rp-feature-input {width:100%;resize:vertical;box-sizing:border-box;border:1px solid var(--rp-v-border,rgba(90,60,80,.15));border-radius:12px;background:var(--rp-v-card,rgba(120,90,110,.04));padding:9px;color:inherit;font:inherit;line-height:1.55;}
#rp-phone button.rp-pending-item {display:block;width:100%;text-align:left;cursor:pointer;border:0;border-radius:8px;background:transparent;color:inherit;font:inherit;padding:5px 7px;min-height:28px;}
#rp-phone button.rp-pending-item:disabled {opacity:.6;cursor:wait;}
#rp-phone .rp-feature-note {margin:8px 0;color:var(--rp-v-muted,#867882);font-size:12px;white-space:pre-wrap;}
`;

export const RP_UI_FINISH_CSS = `
#rp-phone[data-rp-closing]{pointer-events:none!important}
#rp-folder-modal[data-rp-closing]{pointer-events:none!important}
#rp-phone [data-rp-surface-closing]{pointer-events:none!important}
#rp-phone #rp-view-settings details[data-rp-collapsing]>summary .rp-settings-chevron{transform:rotate(0deg)}
#rp-phone.rp-mobile-pos:not(.rp-art-icons) {--rp-art-metal:linear-gradient(120deg,#fffaf1,#cdbdaf 18%,#fbf6ed 38%,#e2d5c8 60%,#ad9e94 83%,#ede3d6);--rp-art-edge:rgba(255,255,255,.85);--rp-art-screen-edge:rgba(92,68,52,.23);--rp-art-button:#a79689;--rp-art-shadow:rgba(82,53,37,.2);}
#rp-phone:where(:not(.rp-theme-custom)).rp-mobile-pos.rp-dark:not(.rp-art-icons) {--rp-art-metal:linear-gradient(120deg,#716d7d,#292835 20%,#585566 40%,#343340 62%,#171923 82%,#575262);--rp-art-edge:rgba(203,197,222,.37);--rp-art-screen-edge:rgba(0,0,0,.9);--rp-art-button:#585362;--rp-art-shadow:rgba(12,10,24,.45);}
#rp-phone.rp-mobile-pos:not(.rp-art-icons) #rp-frame {padding:7px!important;border-radius:38px!important;background:var(--rp-art-metal)!important;box-shadow:0 1px 2px rgba(0,0,0,.12),0 18px 32px var(--rp-art-shadow),inset 0 1px 0 rgba(255,255,255,.65),inset 0 -1px 0 rgba(0,0,0,.18)!important;}
#rp-phone.rp-mobile-pos:not(.rp-art-icons) #rp-frame::after {content:'';position:absolute;inset:1px;border:1px solid var(--rp-art-edge);border-radius:37px;pointer-events:none;}
#rp-phone.rp-mobile-pos:not(.rp-art-icons) #rp-screen {border-radius:31px!important;box-shadow:0 0 0 1px var(--rp-art-screen-edge);}
#rp-phone.rp-mobile-pos:not(.rp-art-icons) #rp-frame .rp-btn {background:var(--rp-art-button);box-shadow:inset 0 0 0 1px rgba(255,255,255,.18);}
#rp-phone #rp-screen #rp-view-xhs>.rp-nav-bar {padding-right:6px!important;padding-left:6px!important;grid-template-columns:40px minmax(0,1fr) 40px;position:relative;z-index:5;overflow:visible!important;}
#rp-phone #rp-screen #rp-view-xhs>.rp-nav-bar>.rp-nav-title {max-width:calc(100% - 104px)!important;}
#rp-phone #rp-screen #rp-view-xhs .rp-xhs-nav-actions {position:relative;display:flex;align-items:center;justify-content:flex-end;margin-left:auto;height:40px;}
#rp-phone #rp-screen #rp-xhs-more {display:inline-flex;align-items:center;justify-content:center;width:40px;height:40px;min-width:40px;min-height:40px;padding:0!important;margin:0;border:0!important;border-radius:50%;background:transparent!important;box-shadow:none!important;color:var(--rp-xhs-accent,var(--rp-nav-btn,#99677e))!important;font:24px/1 Arial,sans-serif!important;cursor:pointer;touch-action:manipulation;}
#rp-phone #rp-screen #rp-xhs-menu {position:absolute;right:0;top:calc(100% + 4px);z-index:20;display:flex;flex-direction:column;min-width:120px;max-width:220px;padding:5px;border:1px solid var(--rp-v-border,rgba(90,60,80,.14));border-radius:14px;background:var(--rp-v-surface,#fff7fa);box-shadow:0 8px 24px rgba(30,20,35,.14);box-sizing:border-box;}
#rp-phone #rp-screen #rp-xhs-menu[hidden] {display:none!important;}
#rp-phone #rp-screen #rp-xhs-menu>button {display:flex;align-items:center;justify-content:flex-start;flex:0 0 auto;width:100%;height:auto;min-width:0;min-height:38px;padding:8px 14px!important;margin:0;border:0!important;border-radius:9px!important;background:transparent!important;box-shadow:none!important;color:var(--rp-v-text,#493e46)!important;font:inherit;font-size:13px!important;line-height:1.4!important;white-space:nowrap;cursor:pointer;touch-action:manipulation;}
#rp-phone #rp-screen #rp-xhs-menu>button:hover,#rp-phone #rp-screen #rp-xhs-menu>button:focus-visible {background:var(--rp-v-card,rgba(120,90,110,.08))!important;}
#rp-phone #rp-screen #rp-xhs-menu>button:disabled {opacity:.5;cursor:wait;}
#rp-phone #rp-screen #rp-view-moments>.rp-nav-bar {padding-right:6px!important;padding-left:6px!important;grid-template-columns:40px minmax(0,1fr) 40px;position:relative;z-index:5;overflow:visible!important;}
#rp-phone #rp-screen #rp-view-moments>.rp-nav-bar>.rp-nav-title {max-width:calc(100% - 104px)!important;}
#rp-phone #rp-screen #rp-view-moments .rp-moments-nav-actions {position:relative;display:flex;align-items:center;justify-content:flex-end;margin-left:auto;height:40px;}
#rp-phone #rp-screen #rp-moments-more {display:inline-flex;align-items:center;justify-content:center;width:40px;height:40px;min-width:40px;min-height:40px;padding:0!important;margin:0;border:0!important;border-radius:50%;background:transparent!important;box-shadow:none!important;color:var(--rp-nav-btn,#99677e)!important;font:20px/1 Arial,sans-serif!important;cursor:pointer;touch-action:manipulation;}
#rp-phone #rp-screen #rp-moments-menu {position:absolute;right:0;top:calc(100% + 4px);z-index:20;display:flex;flex-direction:column;min-width:120px;max-width:220px;padding:5px;border:1px solid var(--rp-v-border,rgba(90,60,80,.14));border-radius:14px;background:var(--rp-v-surface,#fff7fa);box-shadow:0 8px 24px rgba(30,20,35,.14);box-sizing:border-box;}
#rp-phone #rp-screen #rp-moments-menu[hidden] {display:none!important;}
#rp-wrapper #rp-phone #rp-screen #rp-view-moments #rp-moments-menu>button {box-sizing:border-box!important;position:static!important;display:flex!important;align-items:center!important;justify-content:flex-start!important;text-align:left!important;transform:none!important;animation:none!important;flex:0 0 auto!important;width:100%!important;height:auto!important;min-width:0!important;max-width:none!important;min-height:38px!important;max-height:none!important;padding:8px 14px!important;margin:0;border:0!important;border-radius:9px!important;background:transparent!important;box-shadow:none!important;color:var(--rp-v-text,#493e46)!important;font:inherit;font-size:13px!important;line-height:1.4!important;white-space:nowrap;cursor:pointer;touch-action:manipulation;}
#rp-phone #rp-screen #rp-xhs-list.rp-xhs-has-error {flex-wrap:wrap!important;align-content:flex-start!important;}
#rp-phone #rp-screen #rp-xhs-refresh-error {flex:1 0 100%;width:100%;min-width:0;box-sizing:border-box;margin:6px 0 6px;padding:10px 12px;border-radius:10px;font-size:12px;line-height:1.5;overflow-wrap:anywhere;color:var(--rp-xhs-text,#493e46);background:var(--rp-xhs-card,#f4efed);}
#rp-phone #rp-screen #rp-moments-menu>button:hover,#rp-phone #rp-screen #rp-moments-menu>button:focus-visible {background:var(--rp-v-card,rgba(120,90,110,.08))!important;}
#rp-phone #rp-screen #rp-moments-menu>button:disabled {opacity:.5;cursor:wait;}
#rp-phone:where(:not(.rp-theme-custom)).rp-theme-misty.rp-dark #rp-screen :is(#rp-sbar,#rp-lock-time,#rp-lock-date) {color:var(--rp-v-text,#e7e0f4)!important;text-shadow:none!important;}
#rp-phone #rp-screen #rp-xhs-detail-body {overflow-wrap:anywhere;}
#rp-phone:where(:not(.rp-theme-custom)).rp-dark:not(.rp-art-icons) #rp-pending-queue {color:var(--rp-v-text,#e7e0f4);}
#rp-phone:where(:not(.rp-theme-custom)).rp-dark:not(.rp-art-icons) .rp-pending-hint {color:var(--rp-v-muted,#b8b1c2);}
#rp-phone:where(:not(.rp-theme-custom)).rp-dark:not(.rp-art-icons) #rp-screen :is(#rp-swipe-hint,.rp-diary-reply-name,.rp-game-partner-bar,.rp-out .rp-bts) {color:var(--rp-v-muted,#b8b1c2)!important;opacity:1!important;}
#rp-phone:where(:not(.rp-theme-custom)).rp-dark:not(.rp-art-icons) #rp-screen .rp-xhs-empty {color:var(--rp-v-muted,#b8b1c2)!important;background:var(--rp-v-card,#2a2635)!important;}
#rp-phone.rp-theme-misty #rp-screen #rp-avatar-preview-swatch {color:#fff!important;}
#rp-phone:not(.rp-art-icons) #rp-screen #rp-view-thread .rp-out .rp-private-avatar:not(.rp-av-img) {background:linear-gradient(145deg,#64748b,#475569);color:#fff;}
`;

export const RP_MOMENT_TRANSLATE_CSS = `
#rp-phone #rp-screen #rp-view-moments .rp-moment-bar {flex-wrap:wrap;column-gap:4px;row-gap:0;}
#rp-phone #rp-screen #rp-view-moments .rp-moment-delete-translate {display:inline-flex;align-items:center;vertical-align:middle;white-space:nowrap;gap:2px;}
#rp-phone #rp-screen #rp-view-moments .rp-moment-translate-btn {display:inline-flex;align-items:center;justify-content:center;border:0!important;border-radius:0!important;background:transparent!important;box-shadow:none!important;color:#2878c8!important;opacity:1;font-family:inherit;font-size:10.5px!important;line-height:1.5;min-height:32px;padding:0 4px!important;margin-left:6px;white-space:nowrap;cursor:pointer;}
#rp-phone #rp-screen #rp-view-moments .rp-moment-bar .rp-moment-translate-btn {font-size:12px!important;min-height:34px;padding:5px 7px!important;margin-left:0;}
#rp-phone.rp-theme-star #rp-screen #rp-view-moments .rp-moment-translate-btn,
#rp-phone:where(:not(.rp-theme-custom)).rp-dark #rp-screen #rp-view-moments .rp-moment-translate-btn {color:#70aaff!important;}
#rp-phone #rp-screen #rp-view-moments .rp-moment-translate-btn:disabled {opacity:.55;cursor:wait;}
`;

export const RP_MESSAGE_ACTIONS_CSS = `
#rp-phone #rp-screen #rp-view-messages>.rp-nav-bar {padding-right:6px!important;padding-left:6px!important;grid-template-columns:40px minmax(0,1fr) 40px;position:relative;z-index:5;overflow:visible!important;}
#rp-phone #rp-screen #rp-view-messages>.rp-nav-bar>.rp-nav-title {max-width:calc(100% - 104px)!important;}
#rp-phone #rp-screen #rp-view-messages .rp-messages-nav-actions {position:relative;display:flex;align-items:center;justify-content:flex-end;margin-left:auto;height:40px;}
#rp-phone #rp-screen #rp-messages-more {display:inline-flex;align-items:center;justify-content:center;width:40px;height:40px;min-width:40px;min-height:40px;padding:0!important;margin:0;border:0!important;border-radius:50%;background:transparent!important;box-shadow:none!important;color:var(--rp-nav-btn,#99677e)!important;font:20px/1 Arial,sans-serif!important;cursor:pointer;touch-action:manipulation;}
#rp-phone #rp-screen #rp-messages-menu {position:absolute;right:0;top:calc(100% + 4px);z-index:20;display:flex;flex-direction:column;min-width:120px;max-width:220px;padding:5px;border:1px solid var(--rp-v-border,rgba(90,60,80,.14));border-radius:14px;background:var(--rp-v-surface,#fff7fa);box-shadow:0 8px 24px rgba(30,20,35,.14);box-sizing:border-box;}
#rp-phone #rp-screen #rp-messages-menu[hidden] {display:none!important;}
#rp-wrapper #rp-phone #rp-screen #rp-view-messages #rp-messages-menu>button {box-sizing:border-box!important;position:static!important;display:flex!important;align-items:center!important;justify-content:flex-start!important;text-align:left!important;transform:none!important;animation:none!important;flex:0 0 auto!important;width:100%!important;height:auto!important;min-width:0!important;max-width:none!important;min-height:38px!important;max-height:none!important;padding:8px 14px!important;margin:0;border:0!important;border-radius:9px!important;background:transparent!important;box-shadow:none!important;color:var(--rp-v-text,#493e46)!important;font:inherit;font-size:13px!important;line-height:1.4!important;white-space:nowrap;cursor:pointer;touch-action:manipulation;}
#rp-phone #rp-screen #rp-messages-menu>button:hover,#rp-phone #rp-screen #rp-messages-menu>button:focus-visible {background:var(--rp-v-card,rgba(120,90,110,.08))!important;}
#rp-phone #rp-screen #rp-messages-menu>button:disabled {opacity:.5;cursor:wait;}
`;

export const RP_PRIVATE_AVATAR_CSS = `
#rp-phone #rp-screen #rp-view-thread #rp-bubbles>.rp-private-row {flex-direction:row;align-items:flex-start;gap:7px;}
#rp-phone #rp-screen #rp-view-thread #rp-bubbles>.rp-private-row.rp-out {flex-direction:row-reverse;}
#rp-phone #rp-screen #rp-view-thread .rp-private-body {flex:0 1 auto;max-width:72%;min-width:0;display:flex;flex-direction:column;align-items:flex-start;gap:2px;}
#rp-phone #rp-screen #rp-view-thread .rp-out>.rp-private-body {align-items:flex-end;}
#rp-phone #rp-screen #rp-view-thread .rp-private-body>.rp-bubble,
#rp-phone #rp-screen #rp-view-thread .rp-private-body>.rp-img-bbl,
#rp-phone #rp-screen #rp-view-thread .rp-private-body>.rp-voice-wrap,
#rp-phone #rp-screen #rp-view-thread .rp-private-body>.rp-hongbao,
#rp-phone #rp-screen #rp-view-thread .rp-private-body>.rp-loc-card {max-width:100%;}
#rp-phone #rp-screen #rp-view-thread .rp-private-avatar {margin-top:0;width:30px;height:30px;}
#rp-phone #rp-screen #rp-view-thread .rp-message-translation{align-self:stretch;box-sizing:border-box;min-width:0;max-width:100%;margin:4px 0 0!important}
#rp-phone #rp-screen #rp-view-thread .rp-message-translation[hidden]{display:none!important}
#rp-phone #rp-screen #rp-view-thread .rp-message-translation>.rp-translation-text{box-sizing:border-box;width:100%;margin:0!important}
#rp-phone #rp-screen #rp-view-thread .rp-message-meta{width:max-content;min-width:100%;max-width:none;flex-wrap:nowrap;gap:0 2px}
#rp-phone #rp-screen #rp-view-thread .rp-message-meta .rp-bts{flex:0 0 auto;white-space:nowrap}
#rp-phone #rp-screen #rp-view-thread .rp-message-meta .rp-btn-row{flex:0 0 auto;gap:0}
#rp-phone #rp-screen #rp-view-thread .rp-message-meta :is(.rp-edit-btn,.rp-del-btn){width:30px;min-width:30px;height:30px;min-height:30px}
#rp-phone #rp-screen #rp-view-thread .rp-message-meta>.rp-translation-btn{flex:0 0 auto;min-width:0;color:var(--rp-v-muted);margin:0 0 0 auto;padding:3px 2px;white-space:nowrap}
#rp-phone #rp-screen #rp-view-thread .rp-message-meta{align-items:center;min-height:30px;}
#rp-phone #rp-screen #rp-view-thread .rp-message-meta .rp-bts{display:inline-flex;align-items:center;box-sizing:border-box;height:30px;line-height:1.4;}
#rp-phone #rp-screen #rp-view-thread .rp-message-meta .rp-btn-row{align-items:center;align-self:center;margin-top:0;margin-bottom:0;}
#rp-phone #rp-screen #rp-view-thread .rp-message-meta :is(.rp-edit-btn,.rp-del-btn,.rp-message-more,.rp-translation-btn){display:inline-flex!important;align-items:center;justify-content:center;box-sizing:border-box;height:30px!important;min-height:30px!important;line-height:1!important;padding-top:0!important;padding-bottom:0!important;margin-top:0!important;margin-bottom:0!important;vertical-align:middle;}

#rp-phone #rp-screen #rp-view-thread #rp-bubbles>.rp-bwrap>.rp-message-translation{width:72%;max-width:72%;align-self:flex-start}
#rp-phone #rp-screen #rp-view-thread #rp-bubbles>.rp-out>.rp-message-translation{align-self:flex-end}
#rp-phone #rp-screen :is(.rp-translation-control,.rp-translation-btn)[hidden]{display:none!important}
#rp-phone #rp-screen .rp-translation-bubble>.rp-translation-control{box-sizing:border-box;width:100%;max-width:100%;margin:8px 0 0!important;padding:8px 0 0!important;border-top:1px solid var(--rp-v-border)!important;white-space:normal;color:inherit}
#rp-phone #rp-screen .rp-translation-bubble>.rp-translation-control>.rp-translation-text{width:100%;margin:0!important;padding:0!important;background:transparent!important;border:0!important;border-radius:0!important;box-shadow:none!important;color:inherit!important;text-align:left;white-space:pre-wrap}
#rp-phone #rp-screen #rp-moments-list .rp-moment-text.rp-translation-bubble{padding:10px 12px;background:var(--rp-v-card)!important;border-radius:12px}
#rp-phone #rp-screen #rp-moments-list .rp-moment-comment-content.rp-translation-bubble{padding:8px 10px;margin:0 0 4px;background:var(--rp-v-surface)!important;border-radius:10px}
#rp-phone #rp-screen #rp-view-thread .rp-voice-wrap.rp-translation-bubble{box-sizing:border-box;padding:8px 12px;border-radius:14px;background:var(--rp-v-card)!important}
`;

export const RP_SOCIAL_COMPACT_CSS = `
/* Keep Moments continuous: comments and translations do not add nested cards. */
#rp-wrapper #rp-phone #rp-screen #rp-view-moments #rp-moments-list .rp-moment {padding-top:8px!important;padding-bottom:8px!important;}
#rp-wrapper #rp-phone #rp-screen #rp-view-moments #rp-moments-list .rp-moment-hd {margin-bottom:4px!important;gap:8px;}
#rp-wrapper #rp-phone #rp-screen #rp-view-moments #rp-moments-list .rp-moment-text {margin-bottom:4px!important;line-height:1.5!important;}
#rp-wrapper #rp-phone #rp-screen #rp-view-moments #rp-moments-list .rp-moment-comments-wrap {background:transparent!important;border:0!important;box-shadow:none!important;border-radius:0!important;padding:4px 0 0!important;margin:3px 0 0!important;gap:2px!important;}
#rp-wrapper #rp-phone #rp-screen #rp-view-moments #rp-moments-list .rp-moment-comment {padding:2px 0!important;line-height:1.45!important;}
#rp-wrapper #rp-phone #rp-screen #rp-view-moments #rp-moments-list .rp-moment-comment-content {background:transparent!important;border:0!important;box-shadow:none!important;border-radius:0!important;padding:0!important;margin:0 0 1px!important;}
#rp-wrapper #rp-phone #rp-screen #rp-view-moments #rp-moments-list .rp-moment-bar {justify-content:flex-start;flex-wrap:wrap;gap:0 4px;padding:2px 0!important;margin:2px 0 0;border:0!important;}
#rp-wrapper #rp-phone #rp-screen #rp-view-moments #rp-moments-list :is(.rp-moment-act,.rp-moment-reply-btn,.rp-moment-comment-del-btn,.rp-moment-translate-btn) {font-size:10px!important;min-height:24px!important;padding:1px 3px!important;margin:0!important;line-height:1.25;vertical-align:middle;}
#rp-wrapper #rp-phone #rp-screen #rp-view-moments #rp-moments-list .rp-moment-delete-translate {gap:3px!important;align-items:center;}
#rp-wrapper #rp-phone #rp-screen #rp-view-moments #rp-moments-list .rp-translation-control {margin:3px 0 1px!important;padding:3px 0 0!important;}
#rp-wrapper #rp-phone #rp-screen #rp-view-moments #rp-moments-list .rp-translation-text {margin:0!important;padding:0!important;line-height:1.45!important;}
#rp-wrapper #rp-phone #rp-screen #rp-view-moments #rp-moments-list .rp-moment-likes-row {padding-top:2px;padding-bottom:2px;margin-top:0;}
#rp-wrapper #rp-phone #rp-screen #rp-view-moments #rp-moments-list .rp-moment-input-row {margin-top:4px;padding-top:4px;}
#rp-phone #rp-screen #ggold-launch-btn {touch-action:manipulation;-webkit-tap-highlight-color:transparent;min-height:32px;}
`;

export const RP_READING_CSS = `
#rp-phone #rp-screen #rp-view-messages .rp-tn {font-size:12px;}
#rp-phone #rp-screen #rp-view-messages .rp-tp {font-size:10.5px;}
#rp-phone #rp-screen #rp-view-thread .rp-bubble {font-size:var(--rp-reading-message-size,11.5px)!important;line-height:1.5;}
#rp-phone #rp-screen #rp-view-thread .rp-translation-text {font-size:calc(var(--rp-reading-message-size,11.5px) - 1px)!important;line-height:1.5;}
#rp-phone #rp-screen #rp-view-thread :is(.rp-grp-sender,.rp-voice-dur) {font-size:10.5px;}
#rp-phone #rp-screen #rp-view-thread .rp-bts {font-size:10px;}
#rp-phone #rp-screen #rp-view-thread .rp-translation-btn {font-size:10.5px;}
#rp-phone #rp-screen #rp-view-moments .rp-moment-name {font-size:11.5px;}
#rp-phone #rp-screen #rp-view-moments .rp-moment-time {font-size:10px;}
#rp-phone #rp-screen #rp-view-moments #rp-moments-list .rp-moment-text {font-size:var(--rp-reading-moment-size,12px)!important;line-height:1.55!important;}
#rp-phone #rp-screen #rp-view-moments #rp-moments-list .rp-moment-comment {font-size:calc(var(--rp-reading-moment-size,12px) - 1.5px)!important;line-height:1.5!important;}
#rp-phone #rp-screen #rp-view-moments #rp-moments-list .rp-translation-text {font-size:calc(var(--rp-reading-moment-size,12px) - 1.5px)!important;line-height:1.5!important;}
#rp-phone #rp-screen #rp-view-moments :is(.rp-moment-reply-btn,.rp-moment-comment-del-btn) {font-size:10.5px!important;}
#rp-phone #rp-screen #rp-view-moments .rp-moment-likes-row {font-size:10.5px;}
`;

export const RP_XHS_COMPOSE_CSS = `
#rp-phone #rp-screen #rp-compose-photo-area {margin-top:12px;min-width:0;}
#rp-phone #rp-screen .rp-compose-photo-actions {display:flex;align-items:center;justify-content:space-between;gap:8px;}
#rp-phone #rp-screen #rp-compose-photo-choose,#rp-phone #rp-screen #rp-compose-photo-remove {appearance:none;display:inline-flex;align-items:center;justify-content:center;gap:6px;min-height:36px;max-width:100%;margin:0;padding:6px 11px;border:1px solid var(--rp-v-border,#e3d8df);border-radius:10px;background:var(--rp-v-card,#f4eef1);color:var(--rp-v-text,#51434c);font:inherit;font-size:12px;line-height:1.4;box-shadow:none;cursor:pointer;}
#rp-phone #rp-screen #rp-compose-photo-choose svg {width:16px;height:16px;flex:0 0 auto;}
#rp-phone #rp-screen #rp-compose-photo-remove {padding-inline:9px;background:transparent;color:var(--rp-v-muted,#81737c);}
#rp-phone #rp-screen #rp-compose-photo-preview {display:flex;justify-content:flex-start;align-items:center;max-width:100%;margin-top:10px;overflow:hidden;border-radius:12px;background:var(--rp-v-card,#f4eef1);}
#rp-phone #rp-screen #rp-compose-photo-preview img {display:block;width:auto;max-width:100%;max-height:180px;object-fit:contain;border-radius:12px;}
#rp-phone #rp-screen #rp-compose-photo-status {margin-top:5px;color:var(--rp-v-muted,#81737c);font-family:inherit;font-size:11px;line-height:1.5;overflow-wrap:anywhere;}
#rp-phone #rp-screen #rp-compose-photo-status:empty {display:none;}
#rp-phone #rp-screen #rp-compose-photo-preview[hidden],#rp-phone #rp-screen #rp-compose-photo-remove[hidden],#rp-phone #rp-screen #rp-compose-photo-file {display:none!important;}
#rp-phone #rp-screen #rp-compose-photo-choose:focus-visible,#rp-phone #rp-screen #rp-compose-photo-remove:focus-visible {outline:2px solid var(--rp-nav-btn,#96677c);outline-offset:2px;}
#rp-phone #rp-screen #rp-compose-post:disabled {opacity:.5;cursor:default;}

/* C cream stationery: one final composer layer, after the shared theme rules. */
#rp-wrapper #rp-phone #rp-screen :is(#rp-view-xhs-compose,#rp-compose-modal).rp-xhs-stationery.rp-view {
  --rp-compose-bg:#f2ede3; --rp-compose-paper:#fffbf3; --rp-compose-ink:#392f26;
  --rp-compose-muted:#756958; --rp-compose-accent:#62694b; --rp-compose-line:#aaa98f; --rp-compose-tape:#cc9982;
  --rp-compose-serif:'Noto Serif SC','Songti SC','STSong','SimSun',serif;
  background:radial-gradient(ellipse at 18% 4%,rgba(255,255,255,.48),transparent 72%),var(--rp-compose-bg)!important;
  color:var(--rp-compose-ink)!important;
}
#rp-wrapper #rp-phone:where(:not(.rp-theme-custom)).rp-dark #rp-screen :is(#rp-view-xhs-compose,#rp-compose-modal).rp-xhs-stationery.rp-view {
  --rp-compose-bg:#24231f; --rp-compose-paper:#302e27; --rp-compose-ink:#f1e8d9;
  --rp-compose-muted:#c1b7a6; --rp-compose-accent:#c2c99f; --rp-compose-line:#777961; --rp-compose-tape:#b7846c;
  background:var(--rp-compose-bg)!important;
}
#rp-phone #rp-screen :is(#rp-view-xhs-compose,#rp-compose-modal).rp-xhs-stationery>.rp-nav-bar {
  display:grid!important; grid-template-columns:30px minmax(0,1fr) max(64px,calc(64px * var(--mochi-phone-font-scale,1)))!important;
  column-gap:8px!important; align-items:center!important; position:relative!important;
  box-sizing:border-box!important; height:96px!important; min-height:96px!important;
  padding:56px 14px 8px 12px!important; margin:0!important;
  background:transparent!important; border:0!important; box-shadow:none!important;
}
#rp-phone #rp-screen :is(#rp-view-xhs-compose,#rp-compose-modal).rp-xhs-stationery>.rp-nav-bar>.rp-back {
  position:static!important; inset:auto!important; grid-column:1!important; align-self:center!important;
  display:inline-flex!important; align-items:center!important; justify-content:center!important;
  width:30px!important; min-width:30px!important; height:32px!important; min-height:32px!important;
  margin:0!important; padding:0!important; transform:none!important; background:transparent!important;
  color:var(--rp-compose-accent)!important; font-size:22px!important; font-weight:300!important;
}
#rp-phone #rp-screen :is(#rp-view-xhs-compose,#rp-compose-modal).rp-xhs-stationery>.rp-nav-bar>.rp-nav-title {
  position:static!important; inset:auto!important; grid-column:2!important; justify-self:start!important;
  width:auto!important; min-width:0!important; max-width:100%!important; margin:0!important; padding:0!important;
  transform:none!important; text-align:left!important; overflow:hidden!important; text-overflow:ellipsis!important;
  white-space:nowrap!important; font-family:var(--rp-compose-serif)!important; font-size:11px!important;
  font-weight:400!important; line-height:1.4!important; letter-spacing:.08em!important; color:var(--rp-compose-accent)!important;
}
#rp-phone #rp-screen :is(#rp-view-xhs-compose,#rp-compose-modal).rp-xhs-stationery :is(#rp-xhs-post-btn,#rp-compose-post) {
  position:static!important; inset:auto!important; grid-column:3!important; justify-self:stretch!important;
  display:inline-flex!important; justify-content:center!important; align-items:center!important; gap:5px!important;
  box-sizing:border-box!important; width:100%!important; min-width:0!important; max-width:none!important;
  height:28px!important; min-height:28px!important; margin:0!important; padding:0 6px!important;
  font-family:var(--rp-compose-serif)!important; font-size:11px!important; font-weight:400!important;
  line-height:1.2!important; letter-spacing:.06em!important; white-space:nowrap!important;
  background:transparent!important; color:var(--rp-compose-accent)!important;
  border:1px solid var(--rp-compose-accent)!important; border-radius:999px!important; box-shadow:none!important; transform:none!important;
}
#rp-phone #rp-screen :is(#rp-view-xhs-compose,#rp-compose-modal).rp-xhs-stationery :is(.rp-back,:is(#rp-xhs-post-btn,#rp-compose-post)):focus-visible {outline:2px solid var(--rp-compose-accent)!important;outline-offset:2px!important;}
#rp-phone #rp-screen :is(#rp-view-xhs-compose,#rp-compose-modal).rp-xhs-stationery .rp-xhs-compose-body {
  display:flex!important; flex-direction:column!important; align-items:stretch!important; flex:1 1 0!important;
  min-height:0!important; box-sizing:border-box!important; padding:8px 16px 30px!important;
  background:transparent!important; overflow-y:auto!important; overflow-x:hidden!important; overscroll-behavior:contain;
}
#rp-phone #rp-screen :is(#rp-view-xhs-compose,#rp-compose-modal).rp-xhs-stationery .rp-xhs-idea-card {
  display:flex!important; flex-direction:column!important; position:relative!important; isolation:isolate;
  z-index:0!important; flex:1 0 auto!important; box-sizing:border-box!important; width:100%!important;
  max-width:100%!important; height:auto!important; min-height:360px!important; margin:0!important;
  padding:40px 22px 22px!important; border:0!important; border-radius:0!important;
  box-shadow:none!important; background:transparent!important; color:var(--rp-compose-ink)!important;
  overflow:visible!important; transform:none!important;
}
#rp-phone #rp-screen :is(#rp-view-xhs-compose,#rp-compose-modal).rp-xhs-stationery .rp-xhs-idea-card::before {
  content:''!important; display:block!important; position:absolute!important; inset:0 5px 2px!important;
  box-sizing:border-box!important; width:auto!important; height:auto!important; border:1px solid var(--rp-compose-line)!important;
  border-radius:0!important; background:transparent!important; transform:rotate(-3.4deg)!important;
  transform-origin:50% 50%!important; pointer-events:none!important; z-index:-2!important;
}
#rp-phone #rp-screen :is(#rp-view-xhs-compose,#rp-compose-modal).rp-xhs-stationery .rp-xhs-idea-card::after {
  content:''!important; display:block!important; position:absolute!important; inset:0!important;
  background:linear-gradient(115deg,rgba(255,255,255,.22),transparent 68%),var(--rp-compose-paper)!important;
  border:0!important; border-radius:0!important; transform:rotate(1.35deg)!important; transform-origin:50% 50%!important;
  box-shadow:0 5px 24px rgba(54,42,28,.045)!important; pointer-events:none!important; z-index:-1!important;
}
#rp-phone #rp-screen :is(#rp-view-xhs-compose,#rp-compose-modal).rp-xhs-stationery .rp-xhs-paper-tape {
  position:absolute!important; right:10px!important; top:-2px!important; width:40px!important; height:15px!important;
  background:linear-gradient(110deg,rgba(255,255,255,.1),transparent),var(--rp-compose-tape)!important;
  opacity:.76!important; transform:rotate(5deg)!important; pointer-events:none!important; z-index:2!important;
}
/* Labels remain available to assistive technology; the sheet reads like a note, rather than a form. */
#rp-phone #rp-screen :is(#rp-view-xhs-compose,#rp-compose-modal).rp-xhs-stationery .rp-xhs-field-label {
  position:absolute!important; width:1px!important; height:1px!important; min-height:0!important; padding:0!important;
  margin:-1px!important; overflow:hidden!important; clip:rect(0,0,0,0)!important; white-space:nowrap!important; border:0!important;
}
#rp-phone #rp-screen :is(#rp-view-xhs-compose,#rp-compose-modal).rp-xhs-stationery #rp-xhs-post-title {
  display:block!important; flex:none!important; position:relative!important; z-index:1!important;
  box-sizing:border-box!important; width:100%!important; min-width:0!important; max-width:100%!important;
  height:1.5em!important; min-height:1.5em!important; margin:0!important; padding:0!important;
  border:0!important; border-radius:0!important; outline:0!important; box-shadow:none!important;
  background:transparent!important; color:var(--rp-compose-ink)!important; caret-color:var(--rp-compose-tape)!important;
  font-family:var(--rp-compose-serif)!important; font-size:22px!important; font-weight:400!important;
  line-height:1.5!important; letter-spacing:.01em!important; -webkit-appearance:none; appearance:none;
}
#rp-phone #rp-screen :is(#rp-view-xhs-compose,#rp-compose-modal).rp-xhs-stationery .rp-xhs-compose-divider {
  flex:none!important; box-sizing:border-box!important; width:100%!important; height:0!important;
  margin:12px 0 16px!important; padding:0!important; border:0!important; border-top:1px dashed var(--rp-compose-line)!important;
  opacity:.62; pointer-events:none!important;
}
#rp-phone #rp-screen :is(#rp-view-xhs-compose,#rp-compose-modal).rp-xhs-stationery :is(#rp-xhs-post-body,#rp-compose-text) {
  display:block!important; position:relative!important; z-index:1!important; flex:1 0 132px!important;
  box-sizing:border-box!important; width:100%!important; min-width:0!important; max-width:100%!important;
  height:auto!important; min-height:132px!important; max-height:none!important; margin:0!important; padding:0!important;
  border:0!important; border-radius:0!important; outline:0!important; box-shadow:none!important;
  background:transparent!important; color:var(--rp-compose-ink)!important; caret-color:var(--rp-compose-tape)!important;
  font-family:var(--rp-compose-serif)!important; font-size:12.5px!important; font-weight:400!important;
  line-height:1.85!important; letter-spacing:.04em!important; resize:none!important; overflow-y:auto!important;
  overflow-x:hidden!important; overflow-wrap:anywhere; overscroll-behavior:contain; -webkit-appearance:none; appearance:none;
}
#rp-phone #rp-screen :is(#rp-view-xhs-compose,#rp-compose-modal).rp-xhs-stationery :is(#rp-xhs-post-title,:is(#rp-xhs-post-body,#rp-compose-text))::placeholder {
  color:var(--rp-compose-ink)!important; opacity:.72!important; font-size:inherit!important;
  font-family:inherit!important; font-weight:400!important;
}
#rp-phone #rp-screen :is(#rp-view-xhs-compose,#rp-compose-modal).rp-xhs-stationery :is(#rp-xhs-post-title,:is(#rp-xhs-post-body,#rp-compose-text)):focus-visible {outline:0!important;box-shadow:none!important;}
#rp-phone #rp-screen :is(#rp-view-xhs-compose,#rp-compose-modal).rp-xhs-stationery .rp-xhs-paper-signature {
  display:flex!important; align-items:center!important; gap:9px!important; flex:none!important;
  width:max-content!important; max-width:100%!important; margin:22px 0 0 -6px!important; padding:0!important;
  line-height:1.5!important; font-family:Georgia,serif!important; font-size:9px!important;
  font-style:italic!important; font-weight:400!important; letter-spacing:.22em!important;
  color:var(--rp-compose-tape)!important; pointer-events:none!important;
}
#rp-phone #rp-screen :is(#rp-view-xhs-compose,#rp-compose-modal).rp-xhs-stationery .rp-xhs-paper-signature::after {content:'';width:44px;max-width:18vw;height:1px;background:currentColor;transform:rotate(-4deg);}

#rp-wrapper #rp-phone #rp-screen #rp-compose-modal.rp-xhs-stationery {top:0!important;bottom:0!important;height:100%!important;z-index:198!important;flex-direction:column;animation:none!important;isolation:isolate;}
#rp-wrapper #rp-phone #rp-screen #rp-compose-modal.rp-xhs-stationery::before,
#rp-wrapper #rp-phone #rp-screen #rp-compose-modal.rp-xhs-stationery::after {content:none!important;display:none!important;}
#rp-phone #rp-screen #rp-compose-modal.rp-xhs-stationery .rp-xhs-idea-card {min-height:360px!important;}
`;

export const RP_PHONE_CSS = `/* ── wrapper ── */
#rp-wrapper { position:fixed; right:20px; bottom:20px; z-index:9998; }

/* ── FAB ── */
#rp-fab {
  position:fixed; right:20px; bottom:20px; z-index:2147483647;
  width:52px; height:52px; border-radius:50%;
  background:rgba(255,255,255,.95); backdrop-filter:none;
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
    /* 避免用 top:calc(100vh-...) 撑高页面，直接固定到底部 */
    top: auto !important;
    bottom: 14px !important;
    right: 14px !important;
    left: auto !important;
    transform: none !important;
    background: rgba(255,255,255,.95) !important;
    border: 1px solid rgba(0,0,0,.1) !important;
    box-shadow: 0 4px 24px rgba(0,0,0,.18) !important;
    backdrop-filter:none !important;
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
    border-radius: 31px !important;
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
  --rp-island-bg:#000;
  --rp-island-ring:#f5f5f5;
  --rp-screen-bg:#fff;
  /* Status bar */
  --rp-sbar-color:#e06080;
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
  background:var(--rp-art-metal);
  border:0;outline:0;border-radius:38px;
  box-shadow:0 1px 2px rgba(0,0,0,.12),0 18px 32px var(--rp-art-shadow),inset 0 1px 0 rgba(255,255,255,.65),inset 0 -1px 0 rgba(0,0,0,.18);
  padding:7px;
}

/* side buttons */
.rp-btn { position:absolute; border-radius:2px; background:var(--rp-art-button); }
.rp-vol-up  { left:-3px; top:88px;  width:3px; height:34px; }
.rp-vol-dn  { left:-3px; top:130px; width:3px; height:34px; }
.rp-power   { right:-3px; top:106px; width:3px; height:46px; }

/* ── screen ── */
#rp-screen {
  width:100%; height:100%;
  background:var(--rp-home-wall), var(--rp-screen-bg);
  background-size:cover;
  background-position:center;
  border-radius:31px; overflow:hidden;
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

/* ── 滑动删除外层容器 ── */
.rp-ln-wrap {
  position: relative;
  border-radius: 14px;
  overflow: hidden;
  flex-shrink: 0;
}
/* 红色删除按钮层（藏在右侧，初始宽度0隐藏，避免透出） */
.rp-ln-del-btn {
  position: absolute;
  right: 0; top: 0; bottom: 0;
  width: 72px;
  background: #ff3b30;
  display: flex; align-items: center; justify-content: center;
  color: #fff; font-size: 12px; font-weight: 700;
  cursor: pointer;
  border-radius: 0 14px 14px 0;
  user-select: none;
  z-index: 1;
  /* 初始完全隐藏，仅在父容器有 rp-ln-wrap-active 时显示 */
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.18s ease;
}
.rp-ln-wrap.rp-ln-wrap-active .rp-ln-del-btn {
  opacity: 1;
  pointer-events: auto;
}
/* 通知内容卡片（可左滑） */
.rp-ln {
  position: relative;
  z-index: 2;
  background:var(--rp-ln-bg); backdrop-filter:none;
  border:1px solid var(--rp-ln-bd); border-radius:14px;
  padding:10px 14px; display:flex; flex-direction:column; gap:4px;
  box-shadow:0 2px 8px rgba(0,0,0,.08);
  /* 使用 GPU 加速动画，提升 PC 端流畅度 */
  transition: transform 0.22s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  will-change: transform;
  transform: translateZ(0);
  cursor: pointer;
}
.rp-ln.rp-ln-swiped {
  transform: translateX(-72px) translateZ(0);
  border-radius: 14px 0 0 14px;
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

/* ── HOME PAGES (双屏横滑) ── */
#rp-home-pages {
  position:absolute; inset:0;
  display:flex; flex-direction:row;
  width:200%; overflow:hidden;
  transition:transform .32s cubic-bezier(.4,0,.2,1);
  will-change:transform;
  touch-action:pan-y pinch-zoom;
  -webkit-user-select:none; user-select:none;
}
#rp-home-pages img { -webkit-user-drag:none; user-select:none; }
#rp-home-pages input, #rp-home-pages textarea, #rp-home-pages [contenteditable="true"] { -webkit-user-select:text; user-select:text; }
.rp-home-page {
  width:50%; flex-shrink:0;
  position:relative; height:100%;
  overflow:hidden;
}
/* 页面指示点 */
#rp-home-dots {
  position:absolute; bottom:22px; left:50%; transform:translateX(-50%);
  display:flex; gap:6px; z-index:10;
}
.rp-home-dot {
  width:6px; height:6px; border-radius:50%;
  background:var(--rp-indicator,rgba(0,0,0,.25));
  transition:background .25s, transform .25s;
}
.rp-home-dot-active {
  background:var(--rp-clock-color,#e06080);
  transform:scale(1.25);
}
/* ── 关于页 ── */
#rp-about-page {
  position:absolute; inset:0;
  display:flex; flex-direction:column;
  align-items:center; justify-content:center;
  padding:20px 24px 36px;
  /* 默认主题(Candy) token */
  --rp-about-card-bg: rgba(255,240,245,.72);
  --rp-about-card-bd: rgba(224,96,128,.18);
  --rp-about-text: #7a2040;
  --rp-about-hl-color: #a01838;
  --rp-about-bg:var(--rp-screen-bg,#fff);
}
/* Star(深色)主题 */
#rp-phone.rp-theme-star #rp-about-page {
  --rp-about-card-bg: rgba(14,10,45,.78);
  --rp-about-card-bd: rgba(168,85,247,.22);
  --rp-about-text: #e0d8ff;
  --rp-about-hl-color: #c8b4ff;
}
/* Misty主题 */
#rp-phone.rp-theme-misty #rp-about-page {
  --rp-about-card-bg: rgba(235,248,255,.72);
  --rp-about-card-bd: rgba(140,175,210,.28);
  --rp-about-text: #1a2e44;
  --rp-about-hl-color: #1a4a7a;
}
#rp-about-deco {
  width:160px; height:130px;
  color:var(--rp-about-hl-color,#e06080);
  flex-shrink:0;
}
/* 内容卡片：只包文字，壁纸完整透出 */
.rp-about-card {
  display:flex; flex-direction:column; align-items:center;
  padding:18px 28px 20px;
  border-radius:22px;
  background:var(--rp-about-card-bg);
  border:1px solid var(--rp-about-card-bd);
  box-shadow:0 4px 20px rgba(0,0,0,.08);
  backdrop-filter:none;
  -webkit-backdrop-filter:none;
  width:100%;
}
#rp-about-title {
  font-size:18px; font-weight:700;
  color:var(--rp-about-hl-color,#a01838);
  text-shadow:none;
  margin-top:0; letter-spacing:.5px;
}
#rp-about-author {
  font-size:12px; font-weight:600;
  color:var(--rp-about-text,#7a2040);
  opacity:.75; margin-top:4px;
  letter-spacing:.3px;
}
#rp-about-divider {
  width:48px; height:1px;
  background:var(--rp-about-text,#7a2040);
  opacity:.2; margin:12px 0;
}
#rp-about-notice {
  font-size:11.5px; line-height:1.8;
  color:var(--rp-about-text,#7a2040);
  text-align:center; opacity:.9;
  text-shadow:none;
}
.rp-about-hl {
  font-weight:700;
  color:var(--rp-about-hl-color,#a01838);
  opacity:1;
}

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
#rp-phone .rp-translation-control{font-size:11px;line-height:1.5;max-width:100%;min-width:0;margin:3px 0}
#rp-phone .rp-translation-btn{font:inherit;color:inherit;opacity:.72;background:transparent;border:1px solid currentColor;border-radius:5px;padding:2px 7px;min-height:24px;cursor:pointer;touch-action:manipulation}
#rp-phone .rp-translation-btn:disabled{cursor:wait;opacity:.45}
#rp-phone .rp-translation-text{white-space:pre-wrap;overflow-wrap:anywhere;word-break:break-word;padding:6px 8px;margin-top:4px;border-left:2px solid currentColor;background:rgba(128,128,128,.08);border-radius:4px;font-size:12px;line-height:1.55;color:inherit}
#rp-phone #rp-bubbles>.rp-bwrap>.rp-translation-control{max-width:72%}
#rp-phone .rp-moment-comment>.rp-translation-control{margin:3px 0 5px}
.rp-out { align-items:flex-end; }
.rp-in  { align-items:flex-start; }
/* 编辑/删除按钮横排容器 */
.rp-btn-row { display:flex; flex-direction:row; align-items:center; gap:2px; }
.rp-bubble { max-width:72%; padding:9px 13px; border-radius:19px; font-size:13px; line-height:1.45; word-break:break-word; }
.rp-sent { background:var(--rp-sent-bg); color:var(--rp-sent-color,#fff); border-radius:var(--rp-bubble-radius-out); }
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

/* ✅ FIX2: 强制显示发送按钮,防止 SillyTavern 全局 CSS 覆盖 */
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
.rp-hd-av.rp-group-members-trigger { cursor:pointer; box-shadow:0 0 0 2px rgba(255,255,255,.55); transition:transform .15s ease, box-shadow .15s ease; }
.rp-hd-av.rp-group-members-trigger:active { transform:scale(.94); }
.rp-hd-name { font-size:11px; color:var(--rp-hd-name); }

/* ── GROUP MEMBERS MODAL ── */
#rp-group-members-modal {
  position:absolute; inset:0; z-index:620;
  background:rgba(0,0,0,.28);
  display:flex; align-items:center; justify-content:center;
  padding:14px; box-sizing:border-box;
}
.rp-gm-sheet {
  width:100%; max-height:72%; overflow:hidden;
  background:rgba(255,255,255,.96);
  border:1px solid rgba(0,0,0,.08);
  border-radius:22px;
  box-shadow:0 18px 50px rgba(0,0,0,.24);
  display:flex; flex-direction:column;
}
.rp-gm-head {
  display:flex; align-items:center; justify-content:space-between; gap:10px;
  padding:14px 16px 10px; border-bottom:1px solid rgba(0,0,0,.06);
}
.rp-gm-title { min-width:0; font-size:14px; font-weight:700; color:#222; }
.rp-gm-sub { margin-top:2px; font-size:10px; font-weight:500; color:rgba(0,0,0,.42); }
.rp-gm-close {
  width:28px !important; height:28px !important; border:none !important; border-radius:14px !important;
  background:rgba(0,0,0,.06) !important; color:#555 !important; cursor:pointer !important;
  display:flex !important; align-items:center !important; justify-content:center !important;
  font-size:18px !important; line-height:1 !important; padding:0 !important; flex-shrink:0 !important;
}
.rp-gm-list { overflow-y:auto; padding:8px 12px 12px; scrollbar-width:none; }
.rp-gm-list::-webkit-scrollbar { display:none; }
.rp-gm-row { display:flex; align-items:center; gap:10px; padding:8px 4px; border-radius:14px; }
.rp-gm-av { width:34px; height:34px; border-radius:17px; flex-shrink:0; display:flex; align-items:center; justify-content:center; color:#fff; font-size:11px; font-weight:700; overflow:hidden; }
.rp-gm-av img { width:100%; height:100%; object-fit:cover; display:block; }
.rp-gm-name { min-width:0; flex:1; font-size:13px; color:#222; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
.rp-gm-role { font-size:10px; color:rgba(0,0,0,.38); flex-shrink:0; }
.rp-dark:where(:not(.rp-theme-custom)) #rp-group-members-modal { background:rgba(0,0,0,.45); }
.rp-dark:where(:not(.rp-theme-custom)) .rp-gm-sheet { background:rgba(28,28,34,.96); border-color:rgba(255,255,255,.08); }
.rp-dark:where(:not(.rp-theme-custom)) .rp-gm-head { border-bottom-color:rgba(255,255,255,.07); }
.rp-dark:where(:not(.rp-theme-custom)) .rp-gm-title,.rp-dark:where(:not(.rp-theme-custom)) .rp-gm-name { color:#f2f2f4; }
.rp-dark:where(:not(.rp-theme-custom)) .rp-gm-sub,.rp-dark:where(:not(.rp-theme-custom)) .rp-gm-role { color:rgba(255,255,255,.42); }
.rp-dark:where(:not(.rp-theme-custom)) .rp-gm-close { background:rgba(255,255,255,.08) !important; color:#ddd !important; }

/* ── ADD CONTACT MODAL ── */
/* ✅ FIX3: modal 已移至 #rp-screen 内部,position:absolute; inset:0 现在正确覆盖手机屏幕 */
#rp-add-modal {
  position:absolute; inset:0; z-index:600;
  background:rgba(0,0,0,.4); backdrop-filter:none;
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
  background:rgba(255,255,255,.95); backdrop-filter:none;
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
.rp-dark:where(:not(.rp-theme-custom)) .rp-btn{background:#2c2c2c}
.rp-dark:where(:not(.rp-theme-custom)) #rp-screen{background:var(--rp-home-wall);background-size:cover;background-position:center}
.rp-dark:where(:not(.rp-theme-custom)) #rp-island{background:#0a0a0a}
/* ── DARK LOCK ── */
.rp-dark:where(:not(.rp-theme-custom)) .rp-lock-bg{background:radial-gradient(ellipse 120% 80% at 30% 15%,rgba(80,60,200,.35),transparent 55%),radial-gradient(ellipse 100% 80% at 80% 85%,rgba(40,60,200,.25),transparent 55%),linear-gradient(180deg,#0c0c1a,#08080f,#0c0c1a)}
.rp-dark:where(:not(.rp-theme-custom)) .rp-lock-body{color:#e0e2f0}
.rp-dark:where(:not(.rp-theme-custom)) #rp-lock-time{color:#eef0ff}
.rp-dark:where(:not(.rp-theme-custom)) #rp-lock-date{display:none!important}
.rp-dark:where(:not(.rp-theme-custom)) .rp-ln{background:rgba(12,12,24,.88);border-color:rgba(255,255,255,.07)}
.rp-dark:where(:not(.rp-theme-custom)) .rp-ln-type{color:rgba(160,175,255,.45)}
.rp-dark:where(:not(.rp-theme-custom)) .rp-ln-text{color:rgba(210,218,255,.85)}
.rp-dark:where(:not(.rp-theme-custom)) #rp-swipe-hint{color:rgba(180,195,255,.3)}
.rp-dark:where(:not(.rp-theme-custom)) #rp-sbar{color:#dde0f2}
/* ── DARK HOME ── */
.rp-dark:where(:not(.rp-theme-custom)) .rp-home-bg{background:radial-gradient(ellipse 100% 70% at 20% 10%,rgba(50,60,140,.38),transparent 50%),radial-gradient(ellipse 100% 70% at 80% 90%,rgba(30,50,130,.28),transparent 50%),linear-gradient(170deg,#0c0c1a,#090912,#0c0c1a)}
.rp-dark:where(:not(.rp-theme-custom)) #rp-home-clock{color:#eef0ff}
.rp-dark:where(:not(.rp-theme-custom)) .rp-app-lbl{color:rgba(210,218,255,.88);text-shadow:0 1px 3px rgba(0,0,0,.7)}
.rp-dark:where(:not(.rp-theme-custom)) .rp-app-ico{box-shadow:0 2px 10px rgba(0,0,0,.5)}
.rp-dark:where(:not(.rp-theme-custom)) .rp-app-off{opacity:.2}
.rp-dark:where(:not(.rp-theme-custom)) #rp-widget{background:rgba(12,12,24,.78);border-color:rgba(255,255,255,.07);box-shadow:0 2px 12px rgba(0,0,0,.4)}


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
  /* SVG 线条颜色始终跟随时钟颜色，通过 currentColor 继承，无需 JS 读取时机 */
  color: var(--rp-clock-color) !important;
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
#rp-phone:not(.rp-theme-star):not(.rp-theme-misty):where(:not(.rp-theme-custom)) .rp-sent,
#rp-phone.rp-theme-candy .rp-sent {
  background: linear-gradient(135deg,#ff7fb1 0%, #f06292 48%, #e34a86 100%) !important;
  border: 1px solid rgba(255,255,255,.42) !important;
  box-shadow: 0 4px 12px rgba(198,64,116,.34), inset 0 1px 0 rgba(255,255,255,.36) !important;
  color:#fff !important;
}
#rp-phone:not(.rp-theme-star):not(.rp-theme-misty):where(:not(.rp-theme-custom)) .rp-out .rp-bts,
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
  backdrop-filter:none;
  -webkit-backdrop-filter:none;
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
  backdrop-filter:none;
  -webkit-backdrop-filter:none;
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
  backdrop-filter:none;
  -webkit-backdrop-filter:none;
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
/* Shared across Candy, Star and Misty, including their saved-theme variants. */
#rp-phone #rp-screen #rp-app-grid { position:relative; top:-12px; }
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
}
#rp-phone.rp-theme-star .rp-blocklist-tag { background: rgba(239,68,68,.18) !important; color: #fca5a5 !important; }
#rp-phone.rp-theme-star .rp-blocklist-tag .rp-block-x { color: #fca5a5 !important; }
#rp-phone.rp-theme-star #rp-block-input { background: rgba(60,30,120,.5) !important; color: #d4c8ff !important; border-color: rgba(130,90,255,.35) !important; }
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
#rp-phone.rp-theme-misty .rp-blocklist-tag { background: rgba(239,68,68,.1) !important; color: #b91c1c !important; }
#rp-phone.rp-theme-misty .rp-blocklist-tag .rp-block-x { color: #b91c1c !important; }
#rp-phone.rp-theme-misty #rp-block-input { background: rgba(255,255,255,.6) !important; color: #1a3050 !important; border-color: rgba(100,145,195,.3) !important; }
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
#rp-view-messages,#rp-view-thread,#rp-bubbles,#rp-view-moments,#rp-view-settings,#rp-view-api-settings,#rp-view-game,#rp-view-themes,#rp-view-gword {
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
#rp-phone.rp-theme-candy .rp-blocklist-tag { background: rgba(239,68,68,.12) !important; color: #b91c1c !important; }
#rp-phone.rp-theme-candy .rp-blocklist-tag .rp-block-x { color: #b91c1c !important; }
#rp-phone.rp-theme-candy #rp-block-input { background: rgba(255,240,245,.6) !important; color: #7a1038 !important; border-color: rgba(220,130,165,.3) !important; }
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
#rp-phone.rp-theme-candy #rp-view-themes,
#rp-phone.rp-theme-candy #rp-view-gword {
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
#rp-phone.rp-theme-star #rp-view-themes,
#rp-phone.rp-theme-star #rp-view-gword {
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
#rp-phone.rp-theme-misty #rp-view-themes,
#rp-phone.rp-theme-misty #rp-view-gword {
  background: var(--rp-home-wall) !important;
  background-size: cover !important;
  background-position: center !important;
}
/* ── THEMES VIEW ── */
/* ── Misty Blue Hydrangea Theme ── */
#rp-phone.rp-theme-misty {
  --rp-island-bg:#1a2635;
  --rp-island-ring:#e8eff5;
  --rp-screen-bg:transparent;
  --rp-sbar-color:rgba(220,238,252,.92);
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
.rp-dark:where(:not(.rp-theme-custom)) .rp-wd-label{color:rgba(160,175,255,.4)}
.rp-dark:where(:not(.rp-theme-custom)) .rp-wd-stage{color:#dde0f2}
.rp-dark:where(:not(.rp-theme-custom)) .rp-wd-track{background:rgba(255,255,255,.1)}
.rp-dark:where(:not(.rp-theme-custom)) .rp-wd-status{color:rgba(160,175,255,.52)}
.rp-dark:where(:not(.rp-theme-custom)) .rp-home-indicator{background:rgba(255,255,255,.22)}
/* ── DARK MESSAGES ── */

.rp-dark:where(:not(.rp-theme-custom)) .rp-thread{border-bottom-color:rgba(255,255,255,.05)}
.rp-dark:where(:not(.rp-theme-custom)) .rp-thread:hover{background:rgba(255,255,255,.03)}
.rp-dark:where(:not(.rp-theme-custom)) .rp-tn{color:#dde0f2}
.rp-dark:where(:not(.rp-theme-custom)) .rp-tp{color:rgba(160,175,255,.46)}
.rp-dark:where(:not(.rp-theme-custom)) .rp-tt{color:rgba(160,175,255,.36)}
.rp-dark:where(:not(.rp-theme-custom)) .rp-nav-bar{background:#0c0c1a;border-bottom-color:rgba(255,255,255,.07)}
.rp-dark:where(:not(.rp-theme-custom)) .rp-nav-title{color:#dde0f2!important}
.rp-dark:where(:not(.rp-theme-custom)) .rp-back{color:#7090f0 !important}
.rp-dark:where(:not(.rp-theme-custom)) .rp-nav-add{color:#7090f0 !important}
.rp-dark:where(:not(.rp-theme-custom)) .rp-hd-name{color:rgba(160,175,255,.62)}
/* ── DARK THREAD ── */


.rp-dark:where(:not(.rp-theme-custom)) .rp-recv{background:#161628;color:#dde0f2}
.rp-dark:where(:not(.rp-theme-custom)) .rp-bts{color:rgba(160,175,255,.3)}
.rp-dark:where(:not(.rp-theme-custom)) #rp-composer{background:#0c0c1a !important;border-top-color:rgba(255,255,255,.06) !important}
.rp-dark:where(:not(.rp-theme-custom)) #rp-input{background:rgba(255,255,255,.05) !important;border-color:rgba(255,255,255,.1) !important;color:#dde0f2 !important}
.rp-dark:where(:not(.rp-theme-custom)) #rp-input::placeholder{color:rgba(160,175,255,.3)}
.rp-dark:where(:not(.rp-theme-custom)) #rp-pending-queue{background:rgba(37,99,235,.05);border-top-color:rgba(37,99,235,.1)}
.rp-dark:where(:not(.rp-theme-custom)) .rp-pending-item{color:#8aaef0;background:rgba(37,99,235,.12)}
.rp-dark:where(:not(.rp-theme-custom)) .rp-pending-hint{color:rgba(160,175,255,.3)}
.rp-dark:where(:not(.rp-theme-custom)) #rp-add-form{background:#12122a}
.rp-dark:where(:not(.rp-theme-custom)) #rp-add-form h3{color:#dde0f2}
.rp-dark:where(:not(.rp-theme-custom)) #rp-add-form input{background:rgba(255,255,255,.05);border-color:rgba(255,255,255,.1);color:#dde0f2}
.rp-dark:where(:not(.rp-theme-custom)) #rp-add-cancel{background:#1c1c38 !important;color:#dde0f2 !important}
.rp-dark:where(:not(.rp-theme-custom)) #rp-notif-banner{background:rgba(8,8,20,.95);border-color:rgba(255,255,255,.08)}
.rp-dark:where(:not(.rp-theme-custom)) .rp-nb-from{color:rgba(160,175,255,.5)}
.rp-dark:where(:not(.rp-theme-custom)) .rp-nb-text{color:#dde0f2}
.rp-dark:where(:not(.rp-theme-custom)) .rp-nb-time{color:rgba(160,175,255,.36)}
.rp-dark:where(:not(.rp-theme-custom)) #rp-home-ind{background:rgba(255,255,255,.22)}
/* ── MOMENTS VIEW ── */
#rp-view-moments{background:transparent !important;display:flex;flex-direction:column}

#rp-moments-list{flex:1;overflow-y:auto;scrollbar-width:none;padding-bottom:8px}
#rp-moments-list::-webkit-scrollbar{display:none}
.rp-moment{background:var(--rp-moment-card);margin-bottom:8px;padding:14px 16px}
.rp-dark:where(:not(.rp-theme-custom)) .rp-moment{background:#0e0e20}
.rp-moment-hd{display:flex;align-items:center;gap:10px;margin-bottom:10px}
.rp-moment-av{width:42px;height:42px;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:700;color:#fff;flex-shrink:0}
.rp-moment-meta{flex:1;min-width:0}
.rp-moment-name{font-size:14px;font-weight:700;color:var(--rp-moment-name)}
.rp-dark:where(:not(.rp-theme-custom)) .rp-moment-name{color:#8aaef0}
.rp-moment-time{font-size:10.5px;color:rgba(0,0,0,.38);margin-top:2px;font-weight:600}
.rp-dark:where(:not(.rp-theme-custom)) .rp-moment-time{color:rgba(160,175,255,.38)}
.rp-moment-text{font-size:14px;color:var(--rp-moment-text);line-height:1.65;margin-bottom:10px;word-break:break-word}
.rp-dark:where(:not(.rp-theme-custom)) .rp-moment-text{color:#d5d8f0}
.rp-moment-bar{display:flex;align-items:center;justify-content:center;gap:6px;padding:6px 0 2px;border-top:1px solid var(--rp-moment-bd);flex-wrap:nowrap}
.rp-dark:where(:not(.rp-theme-custom)) .rp-moment-bar{border-top-color:rgba(255,255,255,.06)}
.rp-moment-act{display:inline-flex;align-items:center;justify-content:center;gap:3px;padding:5px 10px;border-radius:8px;font-size:11px;font-weight:600;color:rgba(0,0,0,.42);cursor:pointer;transition:background .12s,color .12s;border:none;background:none;font-family:inherit;white-space:nowrap;flex-shrink:0}
.rp-dark:where(:not(.rp-theme-custom)) .rp-moment-act{color:rgba(160,175,255,.42)}
.rp-moment-act:hover{background:rgba(0,0,0,.04)}
.rp-dark:where(:not(.rp-theme-custom)) .rp-moment-act:hover{background:rgba(255,255,255,.04)}
.rp-moment-act.rp-liked{color:#e53e3e !important}
.rp-moment-comments-wrap{background:rgba(0,0,0,.03);border-radius:10px;padding:8px 12px;margin-top:8px;display:flex;flex-direction:column;gap:5px}
.rp-dark:where(:not(.rp-theme-custom)) .rp-moment-comments-wrap{background:rgba(255,255,255,.04)}
.rp-moment-comment{font-size:13px;color:#222;line-height:1.55}
.rp-dark:where(:not(.rp-theme-custom)) .rp-moment-comment{color:#c0c8e8}
.rp-moment-cname{color:#2563eb;font-weight:700}
.rp-dark:where(:not(.rp-theme-custom)) .rp-moment-cname{color:#8aaef0}
.rp-moment-reply-btn{color:rgba(0,0,0,.35);font-size:11px;cursor:pointer;margin-left:6px}
.rp-dark:where(:not(.rp-theme-custom)) .rp-moment-reply-btn{color:rgba(160,175,255,.35)}
.rp-moment-comment-del-btn{color:rgba(200,60,60,.55);font-size:11px;cursor:pointer;margin-left:6px}
.rp-dark:where(:not(.rp-theme-custom)) .rp-moment-comment-del-btn{color:rgba(255,120,140,.45)}
.rp-moment-input-row{display:flex;gap:6px;margin-top:8px;padding-top:6px;border-top:1px solid rgba(0,0,0,.06)}
.rp-dark:where(:not(.rp-theme-custom)) .rp-moment-input-row{border-top-color:rgba(255,255,255,.06)}
.rp-moment-cinput{flex:1;background:rgba(0,0,0,.04);border:1px solid rgba(0,0,0,.1);border-radius:8px;padding:6px 10px;font-size:12.5px;color:#1a1a1a;font-family:inherit;outline:none}
.rp-dark:where(:not(.rp-theme-custom)) .rp-moment-cinput{background:rgba(255,255,255,.05);border-color:rgba(255,255,255,.1);color:#d5d8f0}
.rp-moment-csend{background:#2563eb;color:#fff;border:none;border-radius:8px;padding:6px 12px;font-size:12px;font-weight:700;cursor:pointer;font-family:inherit;white-space:nowrap;flex-shrink:0}
.rp-moment-csend:hover{opacity:.85}
.rp-moments-empty{display:flex;flex-direction:column;align-items:center;justify-content:center;height:200px;color:rgba(0,0,0,.3);font-size:13px;gap:8px}
.rp-dark:where(:not(.rp-theme-custom)) .rp-moments-empty{color:rgba(160,175,255,.3)}

/* ── AVATAR IMAGES ── */
#rp-phone [data-rp-avatar-key] {cursor:pointer;touch-action:manipulation;}
#rp-phone [data-rp-avatar-key]:focus-visible {outline:2px solid var(--rp-v-text, #64748b);outline-offset:3px;}
.rp-av-img,.rp-moment-av.rp-av-img{overflow:hidden;padding:0}
.rp-av-photo{width:100%;height:100%;object-fit:cover;display:block;border-radius:inherit}
/* ── SETTINGS VIEW ── */
#rp-view-settings{background:transparent;display:flex;flex-direction:column;overflow-y:auto}
#rp-view-api-settings{background:transparent;display:flex;flex-direction:column}
.rp-dark:where(:not(.rp-theme-custom)) #rp-view-settings{background:transparent}
.rp-set-section{background:#fff;border-radius:12px;margin:10px 12px 0;padding:0 14px;overflow:hidden}
.rp-dark:where(:not(.rp-theme-custom)) .rp-set-section{background:rgba(255,255,255,.04)}
.rp-set-section-title{font-size:12px;font-weight:600;color:#8a8a9a;text-transform:uppercase;letter-spacing:.05em;margin:16px 12px 5px;padding:0}
.rp-dark:where(:not(.rp-theme-custom)) .rp-set-section-title{color:#6a6a7a}
.rp-set-row{display:flex;align-items:center;padding:11px 0;border-bottom:1px solid rgba(0,0,0,.06);gap:10px;min-height:44px}
.rp-dark:where(:not(.rp-theme-custom)) .rp-set-row{border-bottom-color:rgba(255,255,255,.05)}
.rp-set-row:last-child{border-bottom:none}
.rp-set-key{font-size:15px;color:#1a1a2e;flex:1}
.rp-dark:where(:not(.rp-theme-custom)) .rp-set-key{color:#c8cce8}
.rp-set-hint{font-size:12px;color:#8a8a9a;flex:1}
.rp-dark:where(:not(.rp-theme-custom)) .rp-set-hint{color:rgba(200,190,255,.45)}
.rp-set-select{font-size:14px;color:#3a3a5e;background:rgba(0,0,0,.04);border:1px solid rgba(0,0,0,.1);border-radius:8px;padding:4px 8px;font-family:inherit;max-width:150px;outline:none}
.rp-dark:where(:not(.rp-theme-custom)) .rp-set-select{background:rgba(255,255,255,.06);border-color:rgba(255,255,255,.1);color:#c0c4e0}
.rp-avatar-upload-btn{font-size:13.5px;color:#2563eb;background:rgba(37,99,235,.08);border:1px solid rgba(37,99,235,.18);border-radius:8px;padding:6px 12px;cursor:pointer;flex-shrink:0;display:inline-flex;align-items:center;gap:4px}
.rp-dark:where(:not(.rp-theme-custom)) .rp-avatar-upload-btn{color:#7090f0;background:rgba(112,144,240,.12);border-color:rgba(112,144,240,.2)}
.rp-set-upload-btn{font-size:13.5px;font-family:inherit;padding:8px 12px;border-radius:10px;border:none;cursor:pointer;background:rgba(0,0,0,.06);color:#333;white-space:nowrap;display:flex;align-items:center;justify-content:center;gap:4px}
.rp-dark:where(:not(.rp-theme-custom)) .rp-set-upload-btn{background:rgba(255,255,255,.08);color:#c8cce8}
.rp-wall-reset-btn{background:rgba(0,0,0,.05)!important;color:#666!important}
.rp-dark:where(:not(.rp-theme-custom)) .rp-wall-reset-btn{background:rgba(255,255,255,.06)!important;color:rgba(200,190,255,.6)!important}
.rp-blocklist-tag{display:inline-flex;align-items:center;gap:4px;padding:4px 10px;border-radius:16px;font-size:12px;background:rgba(239,68,68,.08);color:#b91c1c;cursor:default}.rp-blocklist-tag .rp-block-x{cursor:pointer;font-size:14px;font-weight:700;opacity:.6;margin-left:2px}.rp-blocklist-tag .rp-block-x:hover{opacity:1}
.rp-dark:where(:not(.rp-theme-custom)) .rp-blocklist-tag{background:rgba(239,68,68,.15);color:#fca5a5}
.rp-dark:where(:not(.rp-theme-custom)) #rp-block-input{background:rgba(255,255,255,.08)!important;color:#e0e4ff!important;border-color:rgba(255,255,255,.1)!important}
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
.rp-dark:where(:not(.rp-theme-custom)) .rp-diary-entry{background:rgba(255,255,255,.05);border-color:rgba(255,255,255,.08)}
.rp-dark:where(:not(.rp-theme-custom)) .rp-diary-author{color:#dde0f2}
.rp-dark:where(:not(.rp-theme-custom)) .rp-diary-date{color:rgba(200,190,255,.5)}
.rp-dark:where(:not(.rp-theme-custom)) .rp-diary-body{color:#d5d8f0}
.rp-dark:where(:not(.rp-theme-custom)) .rp-diary-reply{background:rgba(255,255,255,.04);border-top-color:rgba(255,255,255,.07)}
.rp-dark:where(:not(.rp-theme-custom)) .rp-diary-reply-text{color:#c8cce8}
.rp-dark:where(:not(.rp-theme-custom)) .rp-diary-compose{border-top-color:rgba(255,255,255,.07)}
.rp-dark:where(:not(.rp-theme-custom)) .rp-diary-input{background:rgba(255,255,255,.07)!important;border-color:rgba(255,255,255,.12);color:#e0e4ff!important}
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
#rp-phone.rp-theme-misty .rp-diary-entry{background:rgba(235,248,255,.76);border-color:rgba(100,170,220,.35);backdrop-filter:none;-webkit-backdrop-filter:none saturate(1.2)}
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
/* 图标颜色由 CSS color: var(--rp-clock-color) + SVG currentColor 统一管理，与时钟颜色始终一致 */

/* ══ 2048 GAME ══ */
#rp-view-g2048{position:relative;background:transparent;display:flex;flex-direction:column;overflow:hidden;height:100%}
#g2048-header{display:flex;align-items:center;justify-content:space-between;padding:6px 14px;flex-shrink:0}
#g2048-scores{display:flex;gap:7px}
.g2048-sbox{background:rgba(255,255,255,.82);border:1px solid rgba(0,0,0,.08);border-radius:7px;padding:3px 10px;text-align:center;min-width:50px;box-shadow:0 1px 4px rgba(0,0,0,.1)}
.g2048-slbl{font-size:9.5px;font-weight:700;color:rgba(60,40,30,.65);text-transform:uppercase;letter-spacing:.04em}
#g2048-score,#g2048-best{font-size:15px;font-weight:800;color:#4a3728}
#g2048-turn{font-size:11.5px;font-weight:600;color:#fff;background:rgba(0,0,0,.38);padding:2px 10px;border-radius:12px;text-shadow:0 1px 3px rgba(0,0,0,.5)}
#g2048-newbtn{background:none;border:none;color:var(--rp-nav-btn,#c0306a);font-size:13px;font-weight:600;cursor:pointer;padding:4px 6px}
#g2048-board-wrap{display:flex;justify-content:center;padding:4px 0 2px;flex-shrink:0;touch-action:none;overscroll-behavior:contain}
#g2048-board{display:grid;grid-template-columns:repeat(4,1fr);grid-template-rows:repeat(4,1fr);gap:5px;padding:6px;background:rgba(195,95,128,.52);border-radius:9px;width:214px;height:214px;box-shadow:0 3px 12px rgba(160,40,80,.2)}
.g2048-cell{background:rgba(235,165,185,.42);border-radius:4px;display:flex;align-items:center;justify-content:center;overflow:hidden;min-width:0;min-height:0}
@keyframes g2048Pop{0%{transform:scale(.72)}55%{transform:scale(1.12)}100%{transform:scale(1)}}
@keyframes g2048Merge{0%{transform:scale(1)}40%{transform:scale(1.22)}100%{transform:scale(1)}}
.g2048-tile{width:100%;height:100%;border-radius:4px;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:22px;animation:g2048Pop .14s ease-out}
#g2048-dpad{display:flex;justify-content:center;gap:5px;padding:3px 0;flex-shrink:0}
.g2048-drow{display:none}
.g2048-dir{width:34px;height:24px;border-radius:7px;border:none;background:rgba(187,173,160,.5);color:#776e65;font-size:14px;font-weight:700;cursor:pointer;display:flex;align-items:center;justify-content:center}
.g2048-dir:active{background:rgba(187,173,160,.85)}
#g2048-chat{flex:1 1 0;min-height:0;overflow-y:auto;padding:5px 8px;display:flex;flex-direction:column;gap:2px;margin:0 8px;background:rgba(0,0,0,.28);border-radius:8px;backdrop-filter:none;cursor:pointer}
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
#g2048-chat-fs{position:absolute;inset:0;z-index:40;background:rgba(0,0,0,.78);backdrop-filter:none;display:flex;flex-direction:column}
#g2048-chat-fs-hd{display:flex;align-items:center;justify-content:space-between;padding:60px 16px 10px;flex-shrink:0;border-bottom:1px solid rgba(255,255,255,.12)}
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
#rp-phone.rp-theme-star #g2048-input{background:rgba(30,14,72,.82)!important;border-color:rgba(140,110,255,.35);color:#e8e0ff!important}
#rp-phone.rp-theme-star #g2048-send{background:linear-gradient(135deg,#7c3aed,#a855f7)!important;color:#fff!important;box-shadow:0 2px 8px rgba(100,30,200,.4)!important}
#rp-phone.rp-theme-star #g2048-input::placeholder{color:rgba(200,185,255,.4)!important}
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
#rp-phone.rp-theme-misty #g2048-input{background:rgba(235,248,255,.7)!important;border-color:rgba(100,170,220,.3);color:#0a1828!important}
#rp-phone.rp-theme-misty #g2048-input::placeholder{color:rgba(10,24,40,.38)!important}
#rp-phone.rp-theme-misty #g2048-send{background:linear-gradient(135deg,#0ea5e9,#0369a1)!important;color:#fff!important;box-shadow:0 2px 8px rgba(0,80,160,.35)!important}
#rp-phone.rp-theme-misty .g2048-dir:active{background:rgba(130,185,230,.8)}
/* Candy theme 2048 input explicit colors */
#rp-phone.rp-theme-candy #g2048-input{background:rgba(255,255,255,.92)!important;border-color:rgba(220,130,165,.4)!important;color:#3a1020!important}
#rp-phone.rp-theme-candy #g2048-input::placeholder{color:rgba(58,16,32,.38)!important}
/* ── COMPOSE MODAL ── */
/* ── Compose Modal ── */
/* ══════════════════════════════════════════════════════════
   COMPOSE MODAL - 磨砂壁纸玻璃效果(三主题通用)
   结构:::before=模糊壁纸  ::after=主题色调层  子元素z-index:2
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

/* ── 第1层:磨砂壁纸 ── */
#rp-compose-modal::before {
  content:'';
  position:absolute; inset:-40px; /* 超出边界消除 blur 边缘白边 */
  z-index:0;
  background-image: var(--rp-home-wall);
  background-size: cover;
  background-position: center;
  filter:none;
}
/* ── 第2层:主题色调染色 ── */
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

/* ── Star 主题:深紫黑染色 ── */
#rp-phone.rp-theme-star  #rp-compose-modal::after { background: rgba(6,3,22,.82); }
/* ── Misty 主题:清冷蓝染色 ── */
#rp-phone.rp-theme-misty #rp-compose-modal::after { background: rgba(222,240,255,.66); }
/* ── Dark mode ── */
.rp-dark:where(:not(.rp-theme-custom)) #rp-compose-modal::after { background: rgba(4,3,18,.86); }

/* ══ 导航栏 - 更亮玻璃条,带模糊分隔感 ══ */
#rp-compose-modal .rp-nav-bar {
  background: rgba(255,255,255,.55) !important;
  backdrop-filter:none !important;
  -webkit-backdrop-filter:none !important;
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
.rp-dark:where(:not(.rp-theme-custom)) #rp-compose-modal .rp-nav-bar {
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
  backdrop-filter:none;
  -webkit-backdrop-filter:none;
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
.rp-dark:where(:not(.rp-theme-custom)) .rp-compose-card {
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
.rp-dark:where(:not(.rp-theme-custom)) #rp-compose-text {
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
.rp-dark:where(:not(.rp-theme-custom)) .rp-compose-sep { background: rgba(255,255,255,.07) !important; }

#rp-compose-text::placeholder { color: rgba(60,60,80,.38); }
#rp-phone.rp-theme-star  #rp-compose-text::placeholder { color: rgba(200,190,255,.4) !important; }
#rp-phone.rp-theme-misty #rp-compose-text::placeholder { color: rgba(44,90,140,.4) !important; }
.rp-dark:where(:not(.rp-theme-custom)) #rp-compose-text::placeholder { color: rgba(200,190,255,.35) !important; }
.rp-compose-hint {
  font-size:11px; color:rgba(0,0,0,.35);
  text-align:right; letter-spacing:.3px; padding-top:2px;
}
#rp-phone.rp-theme-star  .rp-compose-hint { color: rgba(180,165,255,.45) !important; }
#rp-phone.rp-theme-misty .rp-compose-hint { color: rgba(44,90,140,.4) !important; }
.rp-dark:where(:not(.rp-theme-custom)) .rp-compose-hint { color: rgba(200,190,255,.35) !important; }

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
  /* 默认(Candy):玫瑰粉渐变 + 光晕 */
  background: linear-gradient(135deg, #e0567a, #f472b6) !important;
  box-shadow: 0 3px 14px rgba(224,86,122,.45) !important;
  transition: box-shadow .15s, transform .1s !important;
}
.rp-compose-post-btn:active {
  transform: scale(.93) !important;
  box-shadow: 0 1px 6px rgba(224,86,122,.3) !important;
}
/* Star:紫光渐变 */
#rp-phone.rp-theme-star  .rp-compose-post-btn {
  background: linear-gradient(135deg, #7c3aed, #a855f7) !important;
  box-shadow: 0 3px 14px rgba(124,58,237,.5) !important;
}
/* Misty:天蓝渐变 */
#rp-phone.rp-theme-misty .rp-compose-post-btn {
  background: linear-gradient(135deg, #0ea5e9, #38bdf8) !important;
  box-shadow: 0 3px 14px rgba(14,165,233,.45) !important;
}
/* Dark */
.rp-dark:where(:not(.rp-theme-custom)) .rp-compose-post-btn {
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
#rp-view-xhs,#rp-view-xhs-detail,#rp-view-xhs-compose{flex-direction:column!important;overflow:hidden!important;background:transparent!important;min-height:0!important;height:100%!important}
/* XHS三主题：壁纸穿透，中央区域留白透出边缘壁纸 */
#rp-phone.rp-theme-candy #rp-view-xhs-detail,
#rp-phone.rp-theme-candy #rp-view-xhs-compose,
#rp-phone.rp-theme-star  #rp-view-xhs-detail,
#rp-phone.rp-theme-star  #rp-view-xhs-compose,
#rp-phone.rp-theme-misty #rp-view-xhs-detail,
#rp-phone.rp-theme-misty #rp-view-xhs-compose {
  background: var(--rp-home-wall) !important;
  background-size: cover !important;
  background-position: center !important;
}
#rp-view-xhs .rp-nav-bar,#rp-view-xhs-detail .rp-nav-bar,#rp-view-xhs-compose .rp-nav-bar{flex:0 0 auto!important;background:rgba(255,255,255,.55)!important;border-bottom:1px solid var(--rp-xhs-border)!important;backdrop-filter:none!important;-webkit-backdrop-filter:none saturate(1.4)!important}
#rp-phone.rp-theme-star #rp-view-xhs-detail .rp-nav-bar,
#rp-phone.rp-theme-star #rp-view-xhs-compose .rp-nav-bar{background:rgba(10,5,32,.55)!important;border-bottom-color:rgba(140,110,255,.2)!important}
#rp-phone.rp-theme-misty #rp-view-xhs-detail .rp-nav-bar,
#rp-phone.rp-theme-misty #rp-view-xhs-compose .rp-nav-bar{background:rgba(220,238,255,.55)!important;border-bottom-color:rgba(100,170,220,.18)!important}
#rp-view-xhs .rp-nav-title,#rp-view-xhs-detail .rp-nav-title,#rp-view-xhs-compose .rp-nav-title{color:var(--rp-xhs-text)!important}
#rp-view-xhs .rp-back,#rp-view-xhs-detail .rp-back,#rp-view-xhs-compose .rp-back,#rp-xhs-compose,#rp-xhs-refresh{color:var(--rp-xhs-accent)!important}
#rp-xhs-list{scrollbar-width:none;overflow-y:auto!important;-webkit-overflow-scrolling:touch!important;touch-action:pan-y!important;overscroll-behavior-y:contain!important;padding:8px 0 14px!important}
#rp-xhs-detail-body{scrollbar-width:none;overflow-y:auto!important;-webkit-overflow-scrolling:touch!important;touch-action:pan-y!important;overscroll-behavior-y:contain!important}
#rp-xhs-list::-webkit-scrollbar,#rp-xhs-detail-body::-webkit-scrollbar{display:none}

/* XHS empty state: copied from bank empty card style, text only changed */
.rp-xhs-empty {
  text-align: center;
  color: var(--bank-loading-color, #c03060);
  opacity: .88;
  margin: 24px 12px;
  padding: 28px 20px;
  border-radius: 18px;
  background: var(--bank-card-bg, rgba(255,255,255,.62));
  border: 1px solid var(--bank-card-border, rgba(255,255,255,.72));
  box-shadow: var(--bank-card-shadow, 0 6px 24px rgba(0,0,0,.07));
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  font-size: 13px;
  font-weight: 500;
  line-height: 1.6;
}
/* XHS卡片：半透明磨砂玻璃，重要区域遮罩，边缘壁纸透出 */
.rp-xhs-card{background:rgba(255,255,255,.62)!important;backdrop-filter:none!important;-webkit-backdrop-filter:none!important;border:none!important;border-bottom:1px solid var(--rp-xhs-border)!important;border-radius:0!important;box-shadow:none!important;padding:12px 14px!important;margin:0 8px!important;border-radius:16px!important;margin-bottom:6px!important;transition:background .12s ease!important}
#rp-phone.rp-theme-star  .rp-xhs-card{background:rgba(14,8,40,.62)!important;backdrop-filter:none!important;-webkit-backdrop-filter:none saturate(1.2)!important}
#rp-phone.rp-theme-misty .rp-xhs-card{background:rgba(225,242,255,.60)!important;backdrop-filter:none!important;-webkit-backdrop-filter:none saturate(1.2)!important}
.rp-xhs-card::before{display:none}
.rp-xhs-card:hover{background:rgba(255,255,255,.72)!important}
#rp-phone.rp-theme-star  .rp-xhs-card:hover{background:rgba(18,10,50,.72)!important}
#rp-phone.rp-theme-misty .rp-xhs-card:hover{background:rgba(225,245,255,.72)!important}
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
.rp-xhs-detail-post-body{font-size:13px!important;font-weight:400!important;line-height:1.65!important;letter-spacing:0!important;color:var(--rp-xhs-text,#222)!important}
.rp-xhs-comment>div:first-child>div:nth-child(2){font-size:12px!important;line-height:1.74!important;color:var(--rp-xhs-text-soft)!important}
.rp-xhs-comment [data-reply-cidx]{margin-top:0!important;color:var(--rp-xhs-accent)!important;background:var(--rp-xhs-chip)!important;border-radius:999px!important;padding:4px 10px!important;display:inline-flex!important;align-items:center!important;justify-content:center!important;height:22px!important;line-height:1!important;box-sizing:border-box!important;vertical-align:middle!important}
.rp-xhs-comment [data-xhs-del-cidx]{margin-top:0!important;display:inline-flex!important;align-items:center!important;justify-content:center!important;height:22px!important;line-height:1!important;padding:4px 0!important;box-sizing:border-box!important;vertical-align:middle!important}
.rp-xhs-comment-waiting{display:flex!important;align-items:center!important;justify-content:center!important;gap:7px!important;text-align:center!important;color:var(--rp-xhs-text-faint,#a8a8ad)!important;font-size:12px!important;font-weight:600!important;padding:24px 0!important;animation:rpXhsWaitLine 1.25s ease-in-out infinite!important;will-change:transform,opacity!important}
.rp-xhs-comment-waiting .rp-xhs-wait-dot{width:4px!important;height:4px!important;border-radius:50%!important;background:currentColor!important;opacity:.38!important;animation:rpXhsWaitDot 1.15s ease-in-out infinite!important}
.rp-xhs-comment-waiting .rp-xhs-wait-dot:nth-child(2){animation-delay:.16s!important}.rp-xhs-comment-waiting .rp-xhs-wait-dot:nth-child(3){animation-delay:.32s!important}
@keyframes rpXhsWaitDot{0%,80%,100%{transform:translateY(0);opacity:.28}40%{transform:translateY(-3px);opacity:.88}}
@keyframes rpXhsWaitLine{0%,100%{transform:translateY(0);opacity:.74}50%{transform:translateY(-2px);opacity:1}}
#rp-xhs-detail-input-bar{flex:0 0 auto!important;background:rgba(255,255,255,.72)!important;border-top:1px solid var(--rp-xhs-border)!important;backdrop-filter:none!important;-webkit-backdrop-filter:none!important;padding:8px 12px 10px!important;position:relative!important;z-index:10!important}
#rp-phone.rp-theme-star  #rp-xhs-detail-input-bar{background:rgba(10,5,32,.72)!important;border-top-color:rgba(140,110,255,.2)!important}
#rp-phone.rp-theme-misty #rp-xhs-detail-input-bar{background:rgba(220,240,255,.72)!important;border-top-color:rgba(100,170,220,.2)!important}
#rp-xhs-detail-input,#rp-xhs-post-title,#rp-xhs-post-body{background:var(--rp-xhs-card)!important;border:1px solid var(--rp-xhs-border)!important;color:var(--rp-xhs-text)!important;box-shadow:0 4px 14px rgba(0,0,0,.03)!important}
#rp-xhs-detail-input{border-radius:16px!important;padding:10px 14px!important;line-height:1.55!important;min-height:42px!important}
#rp-xhs-detail-input::placeholder,#rp-xhs-post-title::placeholder,#rp-xhs-post-body::placeholder{color:var(--rp-xhs-text-faint)!important}
#rp-xhs-detail-input:focus,#rp-xhs-post-title:focus,#rp-xhs-post-body:focus{border-color:var(--rp-xhs-border-strong)!important;box-shadow:0 0 0 3px var(--rp-xhs-chip),0 8px 18px rgba(0,0,0,.04)!important;outline:none!important}
#rp-view-xhs-compose{position:relative!important}
#rp-view-xhs-compose .rp-nav-bar{padding-inline:12px!important}
#rp-view-xhs-compose .rp-nav-bar .rp-back{padding:6px 10px!important;border-radius:999px!important;background:var(--rp-xhs-chip)!important;border:1px solid var(--rp-xhs-border)!important}
#rp-view-xhs-compose .rp-nav-bar .rp-nav-title{font-weight:800!important;letter-spacing:.02em!important}
#rp-view-xhs-compose>div:nth-child(2){padding:16px 14px 20px!important;background:transparent!important}
#rp-view-xhs-compose>div:nth-child(2)>div{background:var(--rp-xhs-panel)!important;border:1px solid var(--rp-xhs-border)!important;border-radius:24px!important;padding:16px!important;box-shadow:var(--rp-xhs-shadow-2)!important;position:relative!important;overflow:hidden!important;backdrop-filter:none saturate(1.08)!important;-webkit-backdrop-filter:none saturate(1.08)!important}
#rp-view-xhs-compose>div:nth-child(2)>div::before{content:"";position:absolute;inset:0 0 auto 0;height:64px;background:linear-gradient(180deg,rgba(255,255,255,.18),transparent);pointer-events:none}
#rp-view-xhs-compose [style*="font-size:11px;color:#999"]{color:var(--rp-xhs-text-soft)!important;font-size:11.5px!important;font-weight:700!important;letter-spacing:.02em!important}
#rp-xhs-post-title{background:var(--rp-xhs-card)!important;border:1px solid var(--rp-xhs-border)!important;border-radius:18px!important;padding:13px 14px!important;margin-bottom:14px!important;font-size:14px!important;font-weight:700!important;box-shadow:0 4px 14px rgba(0,0,0,.03)!important}
#rp-xhs-post-body{background:var(--rp-xhs-card)!important;border:1px solid var(--rp-xhs-border)!important;border-radius:22px!important;padding:14px 14px 18px!important;min-height:180px!important;line-height:1.8!important;box-shadow:0 6px 18px rgba(0,0,0,.04)!important}
#rp-xhs-post-title::placeholder,#rp-xhs-post-body::placeholder{color:var(--rp-xhs-text-faint)!important}
#rp-xhs-post-title:focus,#rp-xhs-post-body:focus{border-color:var(--rp-xhs-border-strong)!important;box-shadow:0 0 0 3px var(--rp-xhs-chip),0 8px 18px rgba(0,0,0,.04)!important;outline:none!important}
#rp-xhs-detail-send,#rp-xhs-post-btn{background:linear-gradient(135deg,var(--rp-xhs-accent),var(--rp-xhs-accent-2))!important;color:#fff!important;border:none!important;box-shadow:0 8px 18px rgba(0,0,0,.15)!important}
#rp-xhs-post-btn{border-radius:10px!important;padding:4px 12px!important;min-width:0!important;font-weight:600!important;font-size:12px!important;letter-spacing:0!important}
#rp-xhs-detail-send{border-radius:10px!important;padding:5px 14px!important;min-width:0!important;font-weight:600!important;font-size:12px!important}
#rp-xhs-loading{background:var(--rp-xhs-panel)!important;border:1px dashed var(--rp-xhs-border)!important;border-radius:16px!important;box-shadow:var(--rp-xhs-shadow)!important;position:relative;overflow:hidden!important;animation:rpXhsLoadingFloat 1.8s ease-in-out infinite}
#rp-xhs-loading::after{content:"";position:absolute;inset:0;background:linear-gradient(100deg,transparent 0%,rgba(255,255,255,.10) 35%,rgba(255,255,255,.42) 50%,rgba(255,255,255,.10) 65%,transparent 100%);transform:translateX(-120%);animation:rpXhsShine 1.5s ease-in-out infinite;pointer-events:none}
#rp-xhs-loading{color:var(--rp-xhs-accent)!important;font-weight:700!important;letter-spacing:.02em!important}
@keyframes rpXhsShine{to{transform:translateX(120%)}}
#rp-phone.rp-theme-star #rp-xhs-detail-input,
#rp-phone.rp-theme-star #rp-xhs-post-title,
#rp-phone.rp-theme-star #rp-xhs-post-body{color:#eee7ff!important;background:rgba(35,22,78,.96)!important;border-color:rgba(167,139,250,.25)!important}
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

/* XHS image-first layout overrides */
.rp-xhs-card img{transition:transform .18s ease!important}
.rp-xhs-card:active img{transform:scale(.985)!important}
#rp-xhs-list{padding:8px 0 14px!important}
#rp-xhs-detail-body>div:first-child,
#rp-xhs-detail-body>div:nth-child(2),
#rp-xhs-detail-body>div:nth-child(3){border-radius:0!important;box-shadow:none!important;border-left:0!important;border-right:0!important}
#rp-xhs-detail-body>div:first-child{padding:0!important;border:0!important;background:transparent!important}
#rp-xhs-detail-body>div:first-child::before{display:none!important}
#rp-xhs-detail-body>div:nth-child(2){margin:0 -14px!important;background:var(--rp-xhs-card)!important}
#rp-xhs-detail-body>div:nth-child(3){margin:8px -14px 0!important;background:var(--rp-xhs-card)!important}

${XHS_COVER_CSS}
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
.rp-dark:where(:not(.rp-theme-custom)) .rp-moment-likes-row { color: rgba(200,190,255,.45); }
/* ── MOMENTS send button fix ── */
.rp-moment-input-row{display:flex;gap:6px;margin-top:8px;padding-top:6px;border-top:1px solid rgba(0,0,0,.06);align-items:center}
.rp-dark:where(:not(.rp-theme-custom)) .rp-moment-input-row{border-top-color:rgba(255,255,255,.06)}
.rp-moment-cinput{flex:1;min-width:0;background:rgba(0,0,0,.04);border:1px solid rgba(0,0,0,.1);border-radius:8px;padding:6px 10px;font-size:12.5px;color:#1a1a1a;font-family:inherit;outline:none}
.rp-dark:where(:not(.rp-theme-custom)) .rp-moment-cinput{background:rgba(255,255,255,.05);border-color:rgba(255,255,255,.1);color:#d5d8f0}
.rp-moment-csend{flex-shrink:0;background:#2563eb !important;color:#fff !important;border:none !important;border-radius:8px !important;padding:6px 12px !important;font-size:12px !important;font-weight:700 !important;cursor:pointer !important;font-family:inherit !important;display:inline-flex !important;align-items:center !important;visibility:visible !important;opacity:1 !important;pointer-events:auto !important}
.rp-moment-csend:hover{opacity:.85 !important}

/* ══════════════════════════════════════════════════════════
   🎨 THEME STUDIO - AI 自定义主题工作室
   ══════════════════════════════════════════════════════════ */
#rp-view-theme-studio {
  background: transparent;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
/* 主题工作室：壁纸背景 */
#rp-phone.rp-theme-candy  #rp-view-theme-studio,
#rp-phone.rp-theme-star   #rp-view-theme-studio,
#rp-phone.rp-theme-misty  #rp-view-theme-studio {
  background: var(--rp-home-wall) !important;
  background-size: cover !important;
  background-position: center !important;
}
/* 对话区 */
#rp-ts-bubbles {
  flex: 1;
  overflow-y: auto;
  padding: 12px 10px 8px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  scrollbar-width: none;
}
#rp-ts-bubbles::-webkit-scrollbar { display: none; }

/* 欢迎卡片 */
.rp-ts-welcome {
  background: rgba(255,255,255,.62);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255,255,255,.7);
  border-radius: 18px;
  padding: 14px 16px;
  font-size: 13px;
  color: #3a1030;
  line-height: 1.65;
  box-shadow: 0 4px 20px rgba(0,0,0,.08);
}
#rp-phone.rp-theme-star .rp-ts-welcome {
  background: rgba(14,8,40,.78) !important;
  border-color: rgba(140,110,255,.28) !important;
  color: #d4c8ff !important;
}
#rp-phone.rp-theme-misty .rp-ts-welcome {
  background: rgba(225,242,255,.72) !important;
  border-color: rgba(100,170,220,.3) !important;
  color: #0e1f30 !important;
}
.rp-ts-welcome-title {
  font-size: 14px;
  font-weight: 700;
  margin-bottom: 6px;
}
.rp-ts-welcome-hint {
  font-size: 11px;
  opacity: .55;
  margin-top: 6px;
}

/* 快捷模板按钮区 */
.rp-ts-tpls {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 10px;
}
.rp-ts-tpl-btn {
  font-size: 11px !important;
  padding: 5px 11px !important;
  border-radius: 14px !important;
  border: 1px solid rgba(200,100,140,.28) !important;
  background: rgba(255,255,255,.5) !important;
  color: #8a1840 !important;
  cursor: pointer !important;
  font-family: inherit !important;
  font-weight: 600 !important;
  transition: background .12s, transform .1s !important;
  white-space: nowrap !important;
  display: inline-flex !important;
  align-items: center !important;
  visibility: visible !important;
  opacity: 1 !important;
  pointer-events: auto !important;
  box-shadow: none !important;
  outline: none !important;
}
.rp-ts-tpl-btn:active { transform: scale(.93) !important; }
#rp-phone.rp-theme-star .rp-ts-tpl-btn {
  background: rgba(60,30,120,.55) !important;
  border-color: rgba(140,100,255,.45) !important;
  color: #d4c8ff !important;
}
#rp-phone.rp-theme-misty .rp-ts-tpl-btn {
  background: rgba(210,232,248,.6) !important;
  border-color: rgba(80,150,210,.3) !important;
  color: #1a3050 !important;
}

/* 气泡：AI 回复 */
.rp-ts-bubble-ai {
  max-width: 88%;
  align-self: flex-start;
  background: rgba(255,255,255,.68);
  backdrop-filter: blur(14px);
  border: 1px solid rgba(255,255,255,.7);
  border-radius: 16px 16px 16px 4px;
  padding: 10px 13px;
  font-size: 13px;
  color: #2a0a1a;
  line-height: 1.55;
  box-shadow: 0 3px 14px rgba(0,0,0,.08);
}
#rp-phone.rp-theme-star .rp-ts-bubble-ai {
  background: rgba(18,10,48,.82) !important;
  border-color: rgba(130,90,255,.25) !important;
  color: #ddd4ff !important;
}
#rp-phone.rp-theme-misty .rp-ts-bubble-ai {
  background: rgba(228,244,255,.78) !important;
  border-color: rgba(100,165,215,.25) !important;
  color: #0e2035 !important;
}

/* 气泡：用户消息 */
.rp-ts-bubble-user {
  max-width: 80%;
  align-self: flex-end;
  background: var(--rp-sent-bg, #2563eb);
  border-radius: 16px 16px 4px 16px;
  padding: 9px 13px;
  font-size: 13px;
  color: #fff;
  line-height: 1.5;
}

/* CSS 应用成功提示条 */
.rp-ts-applied {
  align-self: center;
  font-size: 11px;
  font-weight: 600;
  background: rgba(34,197,94,.15);
  border: 1px solid rgba(34,197,94,.35);
  border-radius: 12px;
  padding: 4px 12px;
  color: #166534;
}
#rp-phone.rp-theme-star .rp-ts-applied {
  background: rgba(22,101,52,.3) !important;
  color: #86efac !important;
  border-color: rgba(34,197,94,.4) !important;
}

/* 打字动画指示器 */
.rp-ts-typing {
  align-self: flex-start;
  background: rgba(255,255,255,.55);
  border-radius: 12px;
  padding: 8px 14px;
  display: flex;
  gap: 4px;
  align-items: center;
}
.rp-ts-typing span {
  width: 6px; height: 6px;
  border-radius: 50%;
  background: rgba(160,60,100,.5);
  animation: rp-ts-dot 1.2s ease-in-out infinite;
  display: inline-block;
}
.rp-ts-typing span:nth-child(2) { animation-delay: .2s; }
.rp-ts-typing span:nth-child(3) { animation-delay: .4s; }
@keyframes rp-ts-dot {
  0%,80%,100% { transform: scale(.6); opacity:.4; }
  40% { transform: scale(1); opacity:1; }
}
#rp-phone.rp-theme-star .rp-ts-typing {
  background: rgba(18,10,48,.7) !important;
}
#rp-phone.rp-theme-star .rp-ts-typing span {
  background: rgba(160,130,255,.6) !important;
}
#rp-phone.rp-theme-misty .rp-ts-typing {
  background: rgba(220,240,255,.6) !important;
}

/* 底部输入区 */
#rp-ts-composer {
  display: flex !important;
  align-items: flex-end !important;
  gap: 7px !important;
  padding: 8px 10px 20px !important;
  border-top: 1px solid rgba(255,255,255,.2) !important;
  flex-shrink: 0 !important;
  background: rgba(255,255,255,.45) !important;
  backdrop-filter: blur(16px) !important;
}
#rp-phone.rp-theme-star #rp-ts-composer {
  background: rgba(8,4,26,.72) !important;
  border-top-color: rgba(130,90,255,.18) !important;
}
#rp-phone.rp-theme-misty #rp-ts-composer {
  background: rgba(220,240,255,.55) !important;
  border-top-color: rgba(100,165,215,.2) !important;
}
/* textarea 自动撑高，仅限 theme-studio */
#rp-ts-input {
  flex: 1 !important;
  background: rgba(255,255,255,.7) !important;
  border: 1px solid rgba(0,0,0,.12) !important;
  border-radius: 14px !important;
  padding: 8px 12px !important;
  color: #1a1a2e !important;
  font-size: 13px !important;
  line-height: 1.5 !important;
  outline: none !important;
  font-family: inherit !important;
  min-width: 0 !important;
  box-sizing: border-box !important;
  resize: none !important;
  overflow: hidden !important;
  min-height: 36px !important;
  max-height: 110px !important;
  overflow-y: auto !important;
  display: block !important;
  scrollbar-width: none !important;
}
#rp-ts-input::-webkit-scrollbar { display: none !important; }
#rp-ts-input::placeholder { color: rgba(60,20,40,.38); }
#rp-phone.rp-theme-star #rp-ts-input {
  background: rgba(25,14,58,.75) !important;
  border-color: rgba(130,90,255,.35) !important;
  color: #e0d8ff !important;
}
#rp-phone.rp-theme-star #rp-ts-input::placeholder { color: rgba(180,165,255,.4) !important; }
#rp-phone.rp-theme-misty #rp-ts-input {
  background: rgba(240,250,255,.82) !important;
  border-color: rgba(100,165,215,.3) !important;
  color: #0e2035 !important;
}
/* 发送按钮 */
#rp-ts-send {
  width: 34px !important; height: 34px !important;
  min-width: 34px !important; border-radius: 50% !important;
  background: var(--rp-send-bg, linear-gradient(135deg,#e0567a,#f472b6)) !important;
  border: none !important; color: #fff !important;
  font-size: 16px !important; font-weight: 700 !important;
  cursor: pointer !important;
  display: flex !important; align-items: center !important;
  justify-content: center !important; flex-shrink: 0 !important;
  transition: transform .12s, opacity .15s !important;
  visibility: visible !important; opacity: 1 !important;
  pointer-events: auto !important; padding: 0 !important;
  outline: none !important;
}
#rp-ts-send:hover { opacity: .88 !important; transform: scale(1.06) !important; }
#rp-ts-send:disabled { opacity: .4 !important; cursor: default !important; }
/* 提示文字闪烁 */
#rp-ts-tip {
  font-size: 10.5px;
  font-weight: 600;
  text-align: center;
  padding: 5px 14px 3px;
  flex-shrink: 0;
  color: #9a1840;
  text-shadow: -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff, 1px 1px 0 #fff, 0 0 6px rgba(255,255,255,.8);
  animation: rp-ts-tip-blink 2.4s ease-in-out infinite;
  letter-spacing: .01em;
  line-height: 1.4;
}
#rp-phone.rp-theme-star #rp-ts-tip {
  color: #e8d8ff;
  text-shadow: -1px -1px 0 rgba(20,0,60,.9), 1px -1px 0 rgba(20,0,60,.9), -1px 1px 0 rgba(20,0,60,.9), 1px 1px 0 rgba(20,0,60,.9), 0 0 8px rgba(100,50,200,.6);
}
#rp-phone.rp-theme-misty #rp-ts-tip {
  color: #002a5c;
  text-shadow: -1px -1px 0 rgba(255,255,255,.95), 1px -1px 0 rgba(255,255,255,.95), -1px 1px 0 rgba(255,255,255,.95), 1px 1px 0 rgba(255,255,255,.95);
}
@keyframes rp-ts-tip-blink {
  0%, 100% { opacity: 1; }
  50%       { opacity: .45; }
}
/* 回退按钮 */
#rp-ts-undo {
  width: 30px !important; height: 30px !important;
  min-width: 30px !important; border-radius: 50% !important;
  background: rgba(0,0,0,.07) !important;
  border: 1px solid rgba(0,0,0,.1) !important;
  color: #5a2040 !important;
  font-size: 14px !important; cursor: pointer !important;
  display: flex !important; align-items: center !important;
  justify-content: center !important; flex-shrink: 0 !important;
  transition: opacity .15s !important;
  visibility: visible !important; opacity: 1 !important;
  pointer-events: auto !important; padding: 0 !important;
  outline: none !important; box-shadow: none !important;
}
#rp-ts-undo:disabled { opacity: .35 !important; cursor: default !important; }
#rp-phone.rp-theme-star #rp-ts-undo {
  background: rgba(50,25,100,.55) !important;
  border-color: rgba(140,100,255,.35) !important;
  color: #c8b8ff !important;
}
#rp-phone.rp-theme-misty #rp-ts-undo {
  background: rgba(210,232,248,.5) !important;
  border-color: rgba(80,150,210,.25) !important;
  color: #1a3050 !important;
}
/* ── 工作室操作按钮栏 ── */
#rp-ts-action-bar {
  display: none;
  gap: 8px !important;
  padding: 5px 10px 3px !important;
  flex-shrink: 0 !important;
}
.rp-ts-action-btn {
  flex: 1 !important;
  padding: 6px 2px !important;
  border-radius: 14px !important;
  border: none !important;
  font-size: 11px !important;
  font-weight: 700 !important;
  cursor: pointer !important;
  font-family: inherit !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  gap: 3px !important;
  visibility: visible !important;
  opacity: 1 !important;
  pointer-events: auto !important;
  transition: opacity .18s, transform .12s, box-shadow .18s !important;
  white-space: nowrap !important;
  letter-spacing: .1px !important;
  position: relative !important;
  overflow: hidden !important;
}
.rp-ts-action-btn::before {
  content: '' !important;
  position: absolute !important; inset: 0 !important;
  background: rgba(255,255,255,.12) !important;
  opacity: 0 !important;
  transition: opacity .15s !important;
  pointer-events: none !important;
}
.rp-ts-action-btn:hover::before { opacity: 1 !important; }
.rp-ts-action-btn:active { transform: scale(.93) !important; }
/* ── 回到上一版：玻璃磨砂卡 ── */
.rp-ts-undo-btn {
  background: rgba(255,255,255,.52) !important;
  backdrop-filter:none !important;
  -webkit-backdrop-filter:none !important;
  color: #7a1840 !important;
  border: 1.5px solid rgba(220,130,165,.35) !important;
  box-shadow: 0 3px 14px rgba(200,80,120,.12), inset 0 1px 0 rgba(255,255,255,.6) !important;
}
/* ── 保存本次方案：玫瑰渐变卡 ── */
.rp-ts-save-btn {
  background: linear-gradient(135deg, #d94b78 0%, #f06298 50%, #f896b8 100%) !important;
  color: #fff !important;
  border: 1.5px solid rgba(255,255,255,.28) !important;
  box-shadow: 0 4px 16px rgba(210,70,110,.40), inset 0 1px 0 rgba(255,255,255,.3) !important;
  text-shadow: 0 1px 3px rgba(140,20,60,.3) !important;
}
/* ── Star 主题 ── */
#rp-phone.rp-theme-star .rp-ts-undo-btn {
  background: rgba(28,12,72,.68) !important;
  backdrop-filter: blur(14px) !important;
  -webkit-backdrop-filter: blur(14px) !important;
  border-color: rgba(150,110,255,.5) !important;
  color: #d4c8ff !important;
  box-shadow: 0 3px 14px rgba(80,30,200,.25), inset 0 1px 0 rgba(160,130,255,.18) !important;
}
#rp-phone.rp-theme-star .rp-ts-save-btn {
  background: linear-gradient(135deg, #5b16cc 0%, #8b3af5 50%, #b06aff 100%) !important;
  border-color: rgba(255,255,255,.22) !important;
  box-shadow: 0 4px 18px rgba(120,50,240,.5), inset 0 1px 0 rgba(220,190,255,.25) !important;
}
/* ── Misty 主题 ── */
#rp-phone.rp-theme-misty .rp-ts-undo-btn {
  background: rgba(230,244,255,.62) !important;
  backdrop-filter:none !important;
  -webkit-backdrop-filter:none !important;
  border-color: rgba(100,165,210,.38) !important;
  color: #1a3a5a !important;
  box-shadow: 0 3px 14px rgba(60,120,180,.12), inset 0 1px 0 rgba(255,255,255,.7) !important;
}
#rp-phone.rp-theme-misty .rp-ts-save-btn {
  background: linear-gradient(135deg, #1878b8 0%, #3aabdf 50%, #6ac8f0 100%) !important;
  border-color: rgba(255,255,255,.3) !important;
  box-shadow: 0 4px 16px rgba(30,120,200,.4), inset 0 1px 0 rgba(255,255,255,.3) !important;
}
/* 保存成功提示 */
.rp-ts-saved-toast {
  align-self: center;
  font-size: 11px;
  font-weight: 600;
  background: rgba(34,197,94,.15);
  border: 1px solid rgba(34,197,94,.35);
  border-radius: 12px;
  padding: 4px 12px;
  color: #166534;
}
/* ── 主题选择页：已保存方案区 ── */
#rp-saved-section {
  margin-top: 18px;
}
#rp-saved-section-title {
  font-size: 13px;
  font-weight: 600;
  color: var(--rp-themes-label);
  text-align: center;
  margin-bottom: 10px;
  opacity: .75;
  letter-spacing: .4px;
}
#rp-saved-cards {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
}
.rp-saved-card {
  background: var(--rp-tc-bg);
  border-radius: 18px;
  overflow: hidden;
  cursor: pointer;
  box-shadow: 0 2px 12px rgba(100,60,200,.1);
  transition: transform .15s, box-shadow .15s;
  position: relative;
}
.rp-saved-card:active { transform: scale(.94); }
.rp-saved-card.rp-tc-active { box-shadow: 0 0 0 2.5px #a855f7, 0 3px 14px rgba(130,60,200,.25); }
.rp-saved-card-preview {
  height: 72px;
  position: relative;
  overflow: hidden;
}
.rp-saved-card-info {
  padding: 7px 10px 10px;
}
.rp-saved-card-name {
  font-size: 11.5px;
  font-weight: 700;
  color: var(--rp-nav-title);
  margin-bottom: 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.rp-saved-card-time {
  font-size: 10px;
  color: var(--rp-tp-color);
  opacity: .7;
}
.rp-saved-card-del {
  position: absolute !important;
  top: 5px !important; right: 6px !important;
  width: 18px !important; height: 18px !important;
  border-radius: 50% !important;
  background: rgba(0,0,0,.28) !important;
  border: none !important;
  color: #fff !important;
  font-size: 10px !important;
  cursor: pointer !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  line-height: 1 !important;
  padding: 0 !important;
  visibility: visible !important;
  opacity: 1 !important;
  pointer-events: auto !important;
  z-index: 10 !important;
}
/* 已保存方案：操作按钮栏（编辑名称 + 删除） */
.rp-saved-card-actions {
  display: flex;
  gap: 4px;
  padding: 4px 6px 7px;
}
.rp-saved-card-act-btn {
  flex: 1 !important;
  padding: 5px 4px !important;
  border-radius: 8px !important;
  border: none !important;
  font-size: 10px !important;
  font-weight: 600 !important;
  cursor: pointer !important;
  font-family: inherit !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  gap: 2px !important;
  min-width: 0 !important;
  min-height: 26px !important;
  overflow: hidden !important;
  transition: opacity .15s, transform .1s !important;
  visibility: visible !important;
  opacity: 1 !important;
  pointer-events: auto !important;
  white-space: nowrap !important;
}
.rp-saved-card-act-btn:active { transform: scale(.92) !important; }
.rp-saved-card-rename-btn {
  background: rgba(255,255,255,.65) !important;
  color: #5a1030 !important;
  border: 1px solid rgba(200,120,160,.25) !important;
}
.rp-saved-card-delete-btn {
  background: rgba(239,68,68,.1) !important;
  color: #b91c1c !important;
  border: 1px solid rgba(239,68,68,.22) !important;
}
/* Star/Misty主题下操作按钮适配 */
#rp-phone.rp-theme-star .rp-saved-card-rename-btn {
  background: rgba(60,30,120,.55) !important;
  color: #d4c8ff !important;
  border-color: rgba(140,100,255,.4) !important;
}
#rp-phone.rp-theme-star .rp-saved-card-delete-btn {
  background: rgba(127,29,29,.35) !important;
  color: #fca5a5 !important;
  border-color: rgba(239,68,68,.3) !important;
}
#rp-phone.rp-theme-misty .rp-saved-card-rename-btn {
  background: rgba(210,232,248,.6) !important;
  color: #1a3050 !important;
  border-color: rgba(80,150,210,.28) !important;
}
#rp-phone.rp-theme-misty .rp-saved-card-delete-btn {
  background: rgba(254,226,226,.5) !important;
  color: #7f1d1d !important;
  border-color: rgba(239,68,68,.22) !important;
}
/* 确认按钮（改名模式） */
.rp-saved-card-confirm-btn {
  background: linear-gradient(135deg,#a855f7,#7c3aed) !important;
  color: #fff !important;
  border: none !important;
}
#rp-phone.rp-theme-misty .rp-saved-card-confirm-btn {
  background: linear-gradient(135deg,#0ea5e9,#2d6d9a) !important;
}
/* 内联重命名输入框 */
.rp-saved-card-name-input {
  width: 100% !important;
  box-sizing: border-box !important;
  border: 1.5px solid rgba(168,85,247,.45) !important;
  border-radius: 7px !important;
  padding: 3px 7px !important;
  font-size: 11.5px !important;
  font-weight: 600 !important;
  font-family: inherit !important;
  outline: none !important;
  background: rgba(255,255,255,.88) !important;
  color: #3a1060 !important;
}
#rp-phone.rp-theme-star .rp-saved-card-name-input {
  background: rgba(30,14,72,.82) !important;
  border-color: rgba(160,120,255,.5) !important;
  color: #e0d8ff !important;
}
#rp-phone.rp-theme-misty .rp-saved-card-name-input {
  background: rgba(240,250,255,.9) !important;
  border-color: rgba(80,150,210,.45) !important;
  color: #1a3050 !important;
}
#rp-phone.rp-theme-star .rp-saved-card { background: rgba(20,14,55,.9); border: 1px solid rgba(130,90,255,.3); }
#rp-phone.rp-theme-star .rp-saved-card-name { color: #e0d8ff; }
#rp-phone.rp-theme-misty .rp-saved-card { background: rgba(240,248,255,.88); border: 1px solid rgba(130,175,215,.25); }
#rp-phone.rp-theme-misty .rp-saved-card-name { color: #1a2e44; }
/* 自定义主题卡片激活状态 */
.rp-theme-card[data-tid="custom"].rp-tc-active {
  box-shadow: 0 0 0 2.5px #ec4899, 0 3px 14px rgba(200,60,130,.25) !important;
}
/* 自定义主题预览背景 */
.rp-ts-custom-preview {
  width: 100%; height: 100%;
  display: flex; align-items: center; justify-content: center;
  font-size: 28px;
  background: linear-gradient(135deg, #fce4ec, #f8bbd0, #e1bee7);
}
/* 小手机内的自定义 CSS 注入标签 */
#rp-custom-theme-style { /* managed by JS */ }

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
.rp-dark:where(:not(.rp-theme-custom)) .rp-call-rec{background:rgba(255,255,255,.06);color:rgba(255,255,255,.35)}
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
.rp-dark:where(:not(.rp-theme-custom)) .rp-voice-bbl{background:rgba(255,255,255,.07)}
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
.rp-dark:where(:not(.rp-theme-custom)) .rp-voice-dur{color:rgba(255,255,255,.35)}
.rp-voice-txt{font-size:13px;color:#333;line-height:1.65;padding:8px 14px 2px;display:none}
.rp-dark:where(:not(.rp-theme-custom)) .rp-voice-txt{color:#c8cce8}
.rp-voice-bbl.played~.rp-voice-txt{display:block}
/* ── GROUP CHAT ── */
.rp-bwrap.rp-in.rp-grp{flex-direction:row;align-items:flex-start;gap:7px}
.rp-bwrap.rp-out.rp-grp{flex-direction:row-reverse;align-items:flex-start;gap:7px}
.rp-bwrap.rp-grp>.rp-grp-body{flex:0 1 auto;max-width:72%;min-width:0;display:flex;flex-direction:column;align-items:flex-start}
.rp-bwrap.rp-out.rp-grp>.rp-grp-body{align-items:flex-end}
.rp-bwrap.rp-grp .rp-bubble{max-width:100%}
.rp-bwrap.rp-grp .rp-voice-wrap,.rp-bwrap.rp-grp .rp-hongbao{max-width:100%}
.rp-grp-sender{font-size:11px;font-weight:700;color:rgba(0,0,0,.45);margin:0 0 3px 3px;line-height:1.2}
.rp-dark:where(:not(.rp-theme-custom)) .rp-grp-sender{color:rgba(255,255,255,.4)}
.rp-grp-av{width:30px;height:30px;border-radius:15px;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:#fff;flex-shrink:0;margin-top:14px;overflow:hidden}

/* ── ATTACH PANEL ── */
#rp-attach-btn{width:30px;height:30px;border-radius:15px;background:rgba(0,0,0,.07);border:none;font-size:18px;cursor:pointer;flex-shrink:0;display:flex;align-items:center;justify-content:center;color:#555;transition:background .15s}
#rp-attach-btn:active{background:rgba(0,0,0,.13)}
.rp-dark:where(:not(.rp-theme-custom)) #rp-attach-btn{background:rgba(255,255,255,.1);color:#c8cce8}
#rp-attach-panel{position:absolute;bottom:100%;left:0;right:0;background:#fff;border-top:1px solid rgba(0,0,0,.08);padding:6px 0 10px;z-index:50;display:none}
.rp-dark:where(:not(.rp-theme-custom)) #rp-attach-panel{background:#111128;border-top-color:rgba(255,255,255,.07)}
.rp-attach-row{display:grid;grid-template-columns:repeat(3,1fr);gap:0;padding:4px 0}
.rp-attach-item{display:flex;flex-direction:column;align-items:center;gap:7px;padding:14px 8px;cursor:pointer;font-size:12px;color:#555;font-weight:500}
.rp-dark:where(:not(.rp-theme-custom)) .rp-attach-item{color:#9aa0c0}
.rp-attach-item:active{background:rgba(0,0,0,.04)}
.rp-attach-ico{width:46px;height:46px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:22px;background:rgba(0,0,0,.05)}
.rp-dark:where(:not(.rp-theme-custom)) .rp-attach-ico{background:rgba(255,255,255,.07)}
.rp-hb-modal{position:absolute;top:0;right:0;bottom:0;left:0;z-index:600;background:rgba(0,0,0,.45);display:flex;align-items:flex-end}
.rp-hb-sheet{background:#fff;border-radius:18px 18px 0 0;padding:20px 20px 32px;width:100%;box-sizing:border-box}
.rp-dark:where(:not(.rp-theme-custom)) .rp-hb-sheet{background:#13132a}
.rp-hb-sheet h3{margin:0 0 16px;font-size:16px;font-weight:700;color:#222;text-align:center}
.rp-dark:where(:not(.rp-theme-custom)) .rp-hb-sheet h3{color:#e0e4ff}
.rp-hb-sheet input{width:100%;box-sizing:border-box;border:1px solid rgba(0,0,0,.12);border-radius:10px;padding:10px 14px;font-size:14px;outline:none;margin-bottom:10px;background:#fafafa}
.rp-dark:where(:not(.rp-theme-custom)) .rp-hb-sheet input{background:#1c1c38;border-color:rgba(255,255,255,.1);color:#dde0f2}
.rp-hb-send-btn{width:100%;padding:12px;background:#c62828;color:#ffd54f;border:none;border-radius:12px;font-size:15px;font-weight:700;cursor:pointer}
.rp-hb-cancel-btn{width:100%;padding:10px;background:none;color:rgba(0,0,0,.4);border:none;font-size:13px;cursor:pointer;margin-top:4px}
.rp-dark:where(:not(.rp-theme-custom)) .rp-hb-cancel-btn{color:rgba(255,255,255,.3)}
.rp-loc-modal{position:absolute;top:0;right:0;bottom:0;left:0;z-index:600;background:rgba(0,0,0,.45);display:flex;align-items:flex-end}
.rp-loc-sheet{background:#fff;border-radius:18px 18px 0 0;padding:20px 20px 32px;width:100%;box-sizing:border-box}
.rp-dark:where(:not(.rp-theme-custom)) .rp-loc-sheet{background:#13132a}
.rp-loc-sheet h3{margin:0 0 16px;font-size:16px;font-weight:700;color:#222;text-align:center}
.rp-dark:where(:not(.rp-theme-custom)) .rp-loc-sheet h3{color:#e0e4ff}
.rp-loc-sheet input{width:100%;box-sizing:border-box;border:1px solid rgba(0,0,0,.12);border-radius:10px;padding:10px 14px;font-size:14px;outline:none;margin-bottom:10px;background:#fafafa}
.rp-dark:where(:not(.rp-theme-custom)) .rp-loc-sheet input{background:#1c1c38;border-color:rgba(255,255,255,.1);color:#dde0f2}
.rp-loc-send-btn{width:100%;padding:12px;background:#2e7d32;color:#fff;border:none;border-radius:12px;font-size:15px;font-weight:700;cursor:pointer;margin-bottom:8px}
.rp-loc-cancel-btn{width:100%;padding:10px;background:none;color:rgba(0,0,0,.4);border:none;font-size:13px;cursor:pointer;margin-top:4px}
.rp-dark:where(:not(.rp-theme-custom)) .rp-loc-cancel-btn{color:rgba(255,255,255,.3)}
.rp-loc-card{display:flex;align-items:center;gap:10px;padding:10px 14px;background:rgba(0,0,0,.04);border-radius:12px;max-width:220px}
.rp-dark:where(:not(.rp-theme-custom)) .rp-loc-card{background:rgba(255,255,255,.06)}
.rp-loc-ico{font-size:22px;flex-shrink:0}
.rp-loc-txt{font-size:13px;color:#333;font-weight:500}
.rp-dark:where(:not(.rp-theme-custom)) .rp-loc-txt{color:#c8cce8}
.rp-img-bbl{max-width:180px;border-radius:12px;overflow:hidden}
.rp-img-bbl img{width:100%;display:block}
.rp-pending-img{position:relative;z-index:3;pointer-events:auto !important;touch-action:manipulation;-webkit-tap-highlight-color:transparent}
.rp-bwrap[data-pending-id]{position:relative;z-index:1}
/* ── ADD CHOICE ── */
.rp-add-choice{position:absolute;top:0;right:0;bottom:0;left:0;z-index:200;display:flex;flex-direction:column;align-items:center;justify-content:center;background:rgba(0,0,0,.35);gap:10px}
.rp-add-choice-box{background:#fff;border-radius:16px;overflow:hidden;width:80%;max-width:240px;box-shadow:0 8px 32px rgba(0,0,0,.2)}
.rp-dark:where(:not(.rp-theme-custom)) .rp-add-choice-box{background:#1c1c38}
.rp-add-choice-item{padding:16px 20px;font-size:15px;font-weight:600;color:#222;cursor:pointer;display:flex;align-items:center;gap:12px;border-bottom:1px solid rgba(0,0,0,.06)}
.rp-dark:where(:not(.rp-theme-custom)) .rp-add-choice-item{color:#e0e4ff;border-bottom-color:rgba(255,255,255,.06)}
.rp-add-choice-item:last-child{border-bottom:none}
.rp-add-choice-item:active{background:rgba(0,0,0,.04)}
.rp-add-choice-delete{color:#ef4444!important}#rp-del-picker{flex-direction:column!important;align-items:stretch!important;justify-content:flex-start!important;gap:0!important;background:transparent;overflow:hidden}#rp-del-picker::before{content:"";position:absolute;inset:-40px;z-index:0;background-image:var(--rp-home-wall);background-size:cover;background-position:center;filter:none}#rp-del-picker::after{content:"";position:absolute;inset:0;z-index:1;background:rgba(255,245,250,.68)}#rp-del-picker > *{position:relative;z-index:2}#rp-del-picker .rp-nav-bar{background:rgba(255,255,255,.55)!important;backdrop-filter:none!important;-webkit-backdrop-filter:none!important;border-bottom:1px solid rgba(255,255,255,.45)!important;box-shadow:0 1px 0 rgba(0,0,0,.05)!important}#rp-del-picker #rp-del-cancel{color:var(--rp-nav-btn)!important;background:none!important;border:none!important;cursor:pointer!important;font-size:15px!important}#rp-del-picker #rp-del-confirm{color:#ef4444!important;font-weight:700!important;background:none!important;border:none!important;cursor:pointer!important;font-size:15px!important}#rp-del-list{flex:1;overflow-y:auto;padding:8px 0}.rp-del-pick-av{width:36px;height:36px;border-radius:18px;flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:700;color:#fff}.rp-del-pick-item{display:flex;align-items:center;gap:12px;padding:12px 18px;cursor:pointer;background:rgba(255,255,255,.45);border-bottom:1px solid rgba(255,255,255,.3);backdrop-filter:none;transition:background .12s}.rp-del-pick-item:active{background:rgba(255,255,255,.65)}.rp-del-pick-item.rp-del-selected{background:rgba(239,68,68,.08);border-bottom-color:rgba(239,68,68,.15)}.rp-del-pick-name{flex:1;font-size:14px;font-weight:500;color:#222}.rp-del-chk{margin-left:auto;width:22px;height:22px;border-radius:50%;border:2px solid rgba(0,0,0,.22);flex-shrink:0;display:flex;align-items:center;justify-content:center}.rp-del-pick-item.rp-del-selected .rp-del-chk{background:#ef4444;border-color:#ef4444}.rp-del-pick-item.rp-del-selected .rp-del-chk::after{content:"✓";color:#fff;font-size:13px}.rp-dark #rp-del-picker::after{background:rgba(4,3,18,.86)}.rp-dark #rp-del-picker .rp-nav-bar{background:rgba(6,4,22,.55)!important;border-bottom-color:rgba(255,255,255,.07)!important}.rp-dark .rp-del-pick-item{background:rgba(255,255,255,.06);border-bottom-color:rgba(255,255,255,.05)}.rp-dark .rp-del-pick-item:active{background:rgba(255,255,255,.1)}.rp-dark .rp-del-pick-item.rp-del-selected{background:rgba(239,68,68,.14)}.rp-dark .rp-del-pick-name{color:#e0e4ff}.rp-dark .rp-del-chk{border-color:rgba(255,255,255,.28)}#rp-phone:where(:not(.rp-theme-custom)).rp-theme-star #rp-del-picker::after{background:rgba(6,3,22,.82)}#rp-phone:where(:not(.rp-theme-custom)).rp-theme-star #rp-del-picker .rp-nav-bar{background:rgba(10,5,32,.55)!important;border-bottom-color:rgba(140,110,255,.2)!important}#rp-phone:where(:not(.rp-theme-custom)).rp-theme-star .rp-del-pick-item{background:rgba(140,100,255,.08);border-bottom-color:rgba(140,100,255,.12)}#rp-phone:where(:not(.rp-theme-custom)).rp-theme-star .rp-del-pick-item:active{background:rgba(140,100,255,.16)}#rp-phone:where(:not(.rp-theme-custom)).rp-theme-star .rp-del-pick-item.rp-del-selected{background:rgba(239,68,68,.14)}#rp-phone:where(:not(.rp-theme-custom)).rp-theme-star .rp-del-pick-name{color:#dde0ff}#rp-phone:where(:not(.rp-theme-custom)).rp-theme-star .rp-del-chk{border-color:rgba(160,120,255,.45)}#rp-phone:where(:not(.rp-theme-custom)).rp-theme-candy #rp-del-picker::after{background:rgba(255,240,248,.64)}#rp-phone:where(:not(.rp-theme-custom)).rp-theme-candy #rp-del-picker .rp-nav-bar{background:rgba(255,255,255,.55)!important;border-bottom-color:rgba(200,100,140,.15)!important}#rp-phone:where(:not(.rp-theme-custom)).rp-theme-candy .rp-del-pick-item{background:rgba(255,255,255,.5);border-bottom-color:rgba(200,100,140,.1)}#rp-phone:where(:not(.rp-theme-custom)).rp-theme-candy .rp-del-pick-item:active{background:rgba(255,255,255,.72)}#rp-phone:where(:not(.rp-theme-custom)).rp-theme-candy .rp-del-pick-item.rp-del-selected{background:rgba(239,68,68,.06)}#rp-phone:where(:not(.rp-theme-custom)).rp-theme-candy .rp-del-pick-name{color:#4a1030}#rp-phone:where(:not(.rp-theme-custom)).rp-theme-candy .rp-del-chk{border-color:rgba(200,100,140,.4)}#rp-phone:where(:not(.rp-theme-custom)).rp-theme-misty #rp-del-picker::after{background:rgba(222,240,255,.66)}#rp-phone:where(:not(.rp-theme-custom)).rp-theme-misty #rp-del-picker .rp-nav-bar{background:rgba(220,238,255,.55)!important;border-bottom-color:rgba(80,150,210,.18)!important}#rp-phone:where(:not(.rp-theme-custom)).rp-theme-misty .rp-del-pick-item{background:rgba(255,255,255,.5);border-bottom-color:rgba(100,160,210,.12)}#rp-phone:where(:not(.rp-theme-custom)).rp-theme-misty .rp-del-pick-item:active{background:rgba(255,255,255,.72)}#rp-phone:where(:not(.rp-theme-custom)).rp-theme-misty .rp-del-pick-item.rp-del-selected{background:rgba(239,68,68,.06)}#rp-phone:where(:not(.rp-theme-custom)).rp-theme-misty .rp-del-pick-name{color:#1a3a5c}#rp-phone:where(:not(.rp-theme-custom)).rp-theme-misty .rp-del-chk{border-color:rgba(100,160,210,.4)}
.rp-grp-pick-item{display:flex;align-items:center;gap:12px;padding:11px 16px;cursor:pointer;border-bottom:1px solid rgba(0,0,0,.05);transition:background .12s}.rp-grp-pick-item:active{background:rgba(0,0,0,.04)}.rp-grp-pick-item.selected{background:rgba(37,99,235,.06)}.rp-dark:where(:not(.rp-theme-custom)) .rp-grp-pick-item{border-bottom-color:rgba(255,255,255,.05)}.rp-dark:where(:not(.rp-theme-custom)) .rp-grp-pick-item.selected{background:rgba(90,120,255,.1)}.rp-grp-pick-av{width:36px;height:36px;border-radius:18px;flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:700;color:#fff}.rp-grp-pick-name{flex:1;font-size:14px;font-weight:500;color:#222}.rp-dark:where(:not(.rp-theme-custom)) .rp-grp-pick-name{color:#e0e4ff}.rp-grp-pick-chk{width:22px;height:22px;border-radius:11px;border:1.5px solid rgba(0,0,0,.2);display:flex;align-items:center;justify-content:center;font-size:13px;color:transparent;flex-shrink:0;transition:all .15s}
.rp-grp-pick-item.selected .rp-grp-pick-chk{background:#2563eb;border-color:#2563eb;color:#fff}
.rp-grp-modal{background:#fff;border-radius:16px;overflow:hidden;width:90%;max-width:290px;box-shadow:0 8px 32px rgba(0,0,0,.2)}
.rp-dark:where(:not(.rp-theme-custom)) .rp-grp-modal{background:#1c1c38}
.rp-grp-modal-hd{padding:14px 16px;font-size:15px;font-weight:700;color:#222;border-bottom:1px solid rgba(0,0,0,.06);text-align:center}
.rp-dark:where(:not(.rp-theme-custom)) .rp-grp-modal-hd{color:#e0e4ff;border-bottom-color:rgba(255,255,255,.06)}
.rp-grp-name-inp{width:100%;box-sizing:border-box;border:1px solid rgba(0,0,0,.12);border-radius:8px;padding:8px 12px;font-size:13px;outline:none;background:#fafafa}
.rp-dark:where(:not(.rp-theme-custom)) .rp-grp-name-inp{background:#131328;border-color:rgba(255,255,255,.1);color:#dde0f2}
.rp-grp-modal-ft{display:flex;border-top:1px solid rgba(0,0,0,.06)}
.rp-dark:where(:not(.rp-theme-custom)) .rp-grp-modal-ft{border-top-color:rgba(255,255,255,.06)}
.rp-grp-ft-btn{flex:1;padding:12px;border:none;background:none;font-size:14px;font-weight:600;cursor:pointer}
.rp-grp-ft-cancel{color:rgba(0,0,0,.35);border-right:1px solid rgba(0,0,0,.06)}
.rp-grp-ft-ok{color:#2563eb}
.rp-dark:where(:not(.rp-theme-custom)) .rp-grp-ft-cancel{color:rgba(255,255,255,.25);border-right-color:rgba(255,255,255,.06)}
/* ── CHAT BUBBLE INSET ── */
.rp-cb{display:flex;align-items:flex-start;gap:8px;margin:8px 0;clear:both}
.rp-cb-av{width:28px;height:28px;border-radius:14px;flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;color:#fff;overflow:hidden;margin-top:1px}
.rp-cb-av img{width:100%;height:100%;object-fit:cover}
.rp-cb-txt{background:rgba(0,0,0,.07);border-radius:3px 14px 14px 14px;padding:8px 12px;font-size:13.5px;line-height:1.6;color:#1a1a2e;max-width:78%;word-break:break-word;font-style:normal}
.rp-sms-echo{display:block;margin-top:6px;padding:5px 10px;border-left:2px solid rgba(0,0,0,.18);font-size:13px;line-height:1.5;color:inherit;opacity:.82;font-style:normal;word-break:break-word}
.rp-sms-echo .rp-sms-echo-name{font-weight:600;margin-right:0px}
.rp-dark:where(:not(.rp-theme-custom)) .rp-sms-echo{border-left-color:rgba(255,255,255,.22)}
/* ── PHONE BLOCK DIVIDER（取代折叠块） ── */
.rp-phone-divider{display:block;margin:8px 0 4px;border:none;border-top:1px solid rgba(0,0,0,.18);position:relative;text-align:center}
.rp-phone-divider::before{content:attr(data-label);position:absolute;top:-9px;left:50%;transform:translateX(-50%);background:var(--SmartThemeChatBackground,#fff);padding:0 8px;font-size:11px;font-weight:600;color:rgba(0,0,0,.4);white-space:nowrap}
.rp-dark:where(:not(.rp-theme-custom)) .rp-phone-divider{border-top-color:rgba(255,255,255,.2)}
.rp-dark:where(:not(.rp-theme-custom)) .rp-phone-divider::before{color:rgba(255,255,255,.35);background:var(--SmartThemeChatBackground,#1a1a2e)}
.rp-phone-echo-container{display:block;margin-top:6px}
.rp-phone-echo-block{display:block;margin:2px 0;font-size:13px;line-height:1.55}
.rp-phone-echo-container .rp-phone-echo-name,#chat .mes_text .rp-phone-echo-name{font-weight:600;color:var(--rp-echo-name,inherit)!important;opacity:1!important;-webkit-text-fill-color:currentColor!important;text-shadow:none!important;margin-right:2px}
.rp-phone-echo-container .rp-phone-echo-moment-tag,#chat .mes_text .rp-phone-echo-moment-tag{font-size:10px;font-weight:700;color:var(--rp-echo-tag,inherit)!important;opacity:1!important;-webkit-text-fill-color:currentColor!important;text-shadow:none!important;background:transparent!important;border:0!important;box-shadow:none!important;border-radius:0;padding:0 2px 0 0;margin-right:4px;vertical-align:baseline}
/* 隐藏旧 rp-sms-echo，统一用新样式 */
.rp-sms-echo{display:none!important}
/* ── WALLPAPER ── */
.rp-wall-preview-img{width:100%;height:80px;border-radius:10px;object-fit:cover;display:block;border:1px solid rgba(0,0,0,.08);margin-bottom:10px}

/* FIX #3: hide terminal SMS inbox panel */
.p4{display:none!important}
/* FIX #5: attach panel - position relative to composer */
#rp-composer{position:relative}
#rp-attach-panel{position:absolute;bottom:100%;left:0;right:0;background:#fff;border-top:1px solid rgba(0,0,0,.08);padding:6px 0 10px;z-index:500;display:none;border-radius:12px 12px 0 0;box-shadow:0 -4px 20px rgba(0,0,0,.08)}
.rp-dark:where(:not(.rp-theme-custom)) #rp-attach-panel{background:#111128;border-top-color:rgba(255,255,255,.07)}
/* FIX #4: wallpaper layer */
#rp-wallpaper-layer{position:absolute;top:0;right:0;bottom:0;left:0;z-index:0;background-size:cover;background-position:center;background-repeat:no-repeat;pointer-events:none}
.rp-view{z-index:1}

/* ══ LUDO GAME - Candy Garden 糖果花园 ══ */
#rp-view-game{background:transparent;display:flex;flex-direction:column;overflow:hidden;height:100%}
.rp-dark:where(:not(.rp-theme-custom)) #rp-view-game{background:transparent}
#rp-view-game .rp-nav-bar{background:rgba(255,255,255,.55)!important;border-bottom:1px solid rgba(180,120,200,.2)!important}
#rp-view-game .rp-nav-title{color:#4a1060!important;font-weight:700}
.rp-dark:where(:not(.rp-theme-custom)) #rp-view-game .rp-nav-title{color:#e8d0ff!important}
#rp-view-game .rp-back{color:#b060d0!important}
/* Board */
#rp-game-board-wrap{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:2px 0;overflow:hidden;min-height:0;max-height:calc(100% - 140px)}
#rp-ludo-canvas{border-radius:16px;width:240px;height:240px;max-width:100%;max-height:100%;min-height:0;flex:none;display:block;box-shadow:0 4px 24px rgba(160,80,200,.18),0 1px 0 rgba(255,255,255,.9) inset,0 8px 32px rgba(0,0,0,.08)}
/* Controls */
#rp-game-controls{display:flex;align-items:center;justify-content:space-between;padding:8px 14px;background:rgba(255,255,255,.55);border-top:1px solid rgba(180,120,200,.18);flex-shrink:0;gap:10px}
.rp-dark:where(:not(.rp-theme-custom)) #rp-game-controls{background:rgba(30,10,40,.7);border-top-color:rgba(200,120,255,.1)}
.rp-game-info{flex:1;min-width:0}
.rp-game-players{font-size:12px;font-weight:700;color:#4a1060;overflow-wrap:anywhere}
.rp-dark:where(:not(.rp-theme-custom)) .rp-game-players{color:#e8d0ff}
.rp-game-status{font-size:10.5px;color:#a060c0;margin-top:2px;overflow-wrap:anywhere}
.rp-dark:where(:not(.rp-theme-custom)) .rp-game-status{color:rgba(220,170,255,.6)}
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
.rp-dark:where(:not(.rp-theme-custom)) #rp-game-chat{background:rgba(30,10,40,.4);border-top-color:rgba(200,120,255,.08)}
#rp-game-chat-hint{font-size:9.5px;color:rgba(160,80,200,.5);text-align:right;padding:0 14px 1px;flex-shrink:0}
/* Full-screen chat */
#rp-game-chat-fs{position:absolute;top:56px;bottom:0;left:0;right:0;z-index:200;background:rgba(250,245,255,.97);backdrop-filter:none;-webkit-backdrop-filter:none;display:flex;flex-direction:column}
.rp-dark:where(:not(.rp-theme-custom)) #rp-game-chat-fs{background:rgba(18,8,28,.97)}
#rp-game-chat-fs-header{display:flex;align-items:center;justify-content:space-between;padding:10px 14px;border-bottom:1px solid rgba(180,120,200,.15);flex-shrink:0}
#rp-game-chat-fs-title{font-size:14px;font-weight:600;color:#4a1060}
.rp-dark:where(:not(.rp-theme-custom)) #rp-game-chat-fs-title{color:#e8d0ff}
#rp-game-chat-fs-close{width:30px;height:30px;border-radius:15px;background:rgba(160,80,200,.1);border:none;font-size:16px;cursor:pointer;display:flex;align-items:center;justify-content:center;color:#7030a0;position:relative;z-index:10;pointer-events:auto}
.rp-dark:where(:not(.rp-theme-custom)) #rp-game-chat-fs-close{background:rgba(200,120,255,.15);color:#e8d0ff}
#rp-game-chat-fs-body{flex:1;overflow-y:auto;padding:10px 14px;display:flex;flex-direction:column;gap:4px}
#rp-game-chat-fs-body .game-msg{font-size:13px;line-height:1.6;padding:3px 0}
#rp-game-chat-fs-hint{font-size:10px;color:rgba(160,80,200,.5);text-align:center;padding:2px 0 1px;flex-shrink:0}
/* Messages */
.game-msg{font-size:11px;line-height:1.45;padding:1px 0}
.game-msg-user{color:#db2777;text-align:right;font-weight:500}
.game-msg-char{color:#7c3aed;font-weight:500}
.rp-dark:where(:not(.rp-theme-custom)) .game-msg-char{color:#c084fc}
.game-msg-sys{color:#9ca3af;text-align:center;font-style:italic}
.rp-dark:where(:not(.rp-theme-custom)) .game-msg-sys{color:rgba(255,255,255,.35)}
/* ── Square Event Popup - bright clean card ── */
#rp-sq-event{position:absolute;inset:0;z-index:60;background:rgba(100,50,150,.25);backdrop-filter:none;-webkit-backdrop-filter:none;display:flex;align-items:center;justify-content:center;border-radius:48px}
#rp-sq-event-box{background:#fff;border:1px solid rgba(200,150,255,.3);border-radius:24px;padding:24px 22px;max-width:230px;text-align:center;box-shadow:0 8px 40px rgba(150,80,200,.2),0 2px 8px rgba(0,0,0,.08)}
.rp-dark:where(:not(.rp-theme-custom)) #rp-sq-event-box{background:linear-gradient(145deg,#1e0a30,#120520)}
#rp-sq-event-sq{font-size:10px;color:#b07ad0;margin-bottom:8px;letter-spacing:1.5px;text-transform:uppercase}
.rp-dark:where(:not(.rp-theme-custom)) #rp-sq-event-sq{color:rgba(220,170,255,.5)}
#rp-sq-event-emoji{font-size:44px;margin-bottom:10px;line-height:1}
#rp-sq-event-text{font-size:15px;font-weight:700;color:#2d1060;margin-bottom:8px;line-height:1.5}
.rp-dark:where(:not(.rp-theme-custom)) #rp-sq-event-text{color:#f0e0ff}
#rp-sq-event-note{font-size:11px;color:#9070b0;margin-bottom:18px;line-height:1.5}
.rp-dark:where(:not(.rp-theme-custom)) #rp-sq-event-note{color:rgba(220,180,255,.5)}
#rp-sq-event-done{background:linear-gradient(135deg,#f472b6,#a855f7);color:#fff;border:none;border-radius:22px;padding:10px 28px;font-size:14px;cursor:pointer;font-weight:700;letter-spacing:.3px;box-shadow:0 4px 16px rgba(168,85,247,.35)}
#rp-sq-event-done:active{transform:scale(.96)}
/* ── Task bar - 居中弹窗 ── */
#rp-sq-task-bar{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:200px;background:#fff;border:1px solid rgba(200,150,255,.3);color:#2d1060;border-radius:22px;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:18px 20px;z-index:55;box-shadow:0 8px 40px rgba(150,80,200,.2),0 2px 10px rgba(0,0,0,.08);text-align:center}
.rp-dark:where(:not(.rp-theme-custom)) #rp-sq-task-bar{background:linear-gradient(145deg,#1e0a30,#120520);color:#f0e0ff;border-color:rgba(200,150,255,.2)}
#rp-sq-task-text{font-size:13px;font-weight:700;line-height:1.5;margin-bottom:12px;white-space:normal;word-break:break-all;color:#2d1060}
.rp-dark:where(:not(.rp-theme-custom)) #rp-sq-task-text{color:#f0e0ff}
#rp-sq-task-done-btn{background:linear-gradient(135deg,#f472b6,#a855f7);border:none;border-radius:20px;color:#fff;padding:8px 26px;font-size:13px;cursor:pointer;font-weight:700;box-shadow:0 3px 12px rgba(168,85,247,.35);transition:opacity .2s,transform .15s}
#rp-sq-task-done-btn:not(:disabled):hover{opacity:.9}
#rp-sq-task-done-btn:disabled{opacity:.35;cursor:not-allowed;background:#ccc;box-shadow:none}
#rp-sq-task-done-btn:not(:disabled):active{transform:scale(.95)}
#rp-sq-task-hint{font-size:10px;color:#a070c0;margin-top:8px;animation:taskHintBlink 1.3s ease-in-out infinite}
.rp-dark:where(:not(.rp-theme-custom)) #rp-sq-task-hint{color:rgba(220,170,255,.6)}
@keyframes taskHintBlink{0%,100%{opacity:1}50%{opacity:.2}}
/* Input row */
#rp-game-input-row{display:flex;gap:6px;padding:6px 12px 20px;background:rgba(255,255,255,.7);border-top:1px solid rgba(180,120,200,.1);flex-shrink:0;align-items:center}
.rp-dark:where(:not(.rp-theme-custom)) #rp-game-input-row{background:rgba(20,8,32,.6);border-top-color:rgba(180,120,255,.1)}
#rp-game-input{flex:1;min-width:0;background:rgba(255,255,255,.9);border:1.5px solid rgba(180,120,200,.25);border-radius:18px;padding:7px 14px;font-size:12px;font-family:inherit;color:#2d1060;outline:none;transition:border-color .2s}
.rp-dark:where(:not(.rp-theme-custom)) #rp-game-input{background:rgba(255,255,255,.07);border-color:rgba(180,120,255,.2);color:#f0e0ff}
#rp-game-input:focus{border-color:#a855f7}
#rp-game-input::placeholder{color:rgba(120,80,160,.4)}
.rp-dark:where(:not(.rp-theme-custom)) #rp-game-input::placeholder{color:rgba(220,170,255,.3)}
#rp-game-send{width:28px!important;height:28px!important;min-width:28px!important;border-radius:14px!important;background:linear-gradient(135deg,#f472b6,#a855f7)!important;border:none!important;color:#fff!important;font-size:14px!important;cursor:pointer!important;display:flex!important;align-items:center!important;justify-content:center!important;flex-shrink:0!important;visibility:visible!important;opacity:1!important;pointer-events:auto!important;padding:0!important;margin:0!important;box-shadow:0 2px 8px rgba(168,85,247,.35)!important}
#rp-game-send:hover{opacity:.85!important}
/* Win overlay */
#rp-game-win{position:absolute;inset:0;background:rgba(120,60,180,.3);backdrop-filter:none;-webkit-backdrop-filter:none;display:flex;flex-direction:column;align-items:center;justify-content:center;z-index:100}
.game-win-box{background:#fff;border:1px solid rgba(200,150,255,.3);border-radius:28px;padding:32px 24px;text-align:center;max-width:224px;width:88%;box-shadow:0 12px 48px rgba(160,80,200,.25),0 2px 8px rgba(0,0,0,.06)}
.rp-dark:where(:not(.rp-theme-custom)) .game-win-box{background:linear-gradient(145deg,#1e0a30,#120520);border-color:rgba(200,150,255,.2)}
.game-win-emoji{font-size:66px;margin-bottom:10px;line-height:1}
.game-win-title{font-size:22px;font-weight:800;color:#2d1060;margin-bottom:8px;letter-spacing:-.2px}
.rp-dark:where(:not(.rp-theme-custom)) .game-win-title{color:#f0e0ff}
.game-win-sub{font-size:13px;color:#9070b0;margin-bottom:22px;line-height:1.6}
.rp-dark:where(:not(.rp-theme-custom)) .game-win-sub{color:rgba(220,180,255,.6)}
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
  background: rgba(255,255,255,0.18); backdrop-filter:none; -webkit-backdrop-filter:none;
  border: 1px solid rgba(255,255,255,0.28); border-radius: 26px; padding: 18px 16px;
  display: grid; grid-template-columns: repeat(3,minmax(0,1fr)); grid-template-rows: repeat(3,minmax(76px,auto)); gap: 18px 10px; align-items: start;
  width: 260px; max-width: calc(100% - 32px); box-sizing: border-box;
  box-shadow: 0 8px 32px rgba(0,0,0,0.22), inset 0 1px 0 rgba(255,255,255,0.35);
}
.rp-folder-item {
  width: auto;
  min-width: 0;
  display: flex; flex-direction: column; align-items: center; gap: 8px; cursor: pointer;
  transition: transform .15s cubic-bezier(.34,1.56,.64,1);
}
.rp-folder-item:active { transform: scale(.84); }
.rp-folder-item-ico {
  width: 46px; height: 46px; border-radius: 12px;
  display: flex; align-items: center; justify-content: center;
  background: transparent !important;
  box-shadow: none !important;
}
.rp-folder-item-ico svg { width: 28px; height: 28px; }
.rp-folder-game-ludo,
.rp-folder-game-2048 { color: #f6d7e3; }
.rp-folder-item-lbl {
  font-size: 13px; color: #f6d7e3; font-weight: 700;
  text-shadow: 0 1px 2px rgba(0,0,0,.22); white-space: normal; letter-spacing: .1px;
  max-width: 100%; text-align: center; line-height: 1.35; overflow-wrap: anywhere;
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
  backdrop-filter:none; -webkit-backdrop-filter:none;
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
/* ══ 黄金矿工 GAME ══ */
#rp-view-ggold{position:relative;background:transparent;display:flex;flex-direction:column;overflow:hidden;height:100%}
/* Reserve the status bar plus its padding, regardless of host box-sizing. */
#ggold-chat-fs{position:absolute;inset:0;z-index:50;background:#1c1630;color:#fff;display:flex;flex-direction:column;padding:60px 14px 14px;box-sizing:border-box}
#ggold-chat-fs-header{display:flex;justify-content:space-between;align-items:center;gap:8px;margin-bottom:12px;flex-shrink:0}
#ggold-chat-fs-close{background:rgba(255,255,255,.15);border:1px solid rgba(255,255,255,.2);border-radius:50%;color:#fff}
#rp-phone .rp-game-chat-close{width:44px;height:44px;min-width:44px;min-height:44px;flex:0 0 44px;margin:0;padding:0;display:flex;align-items:center;justify-content:center;font-size:20px;line-height:1;cursor:pointer;touch-action:manipulation}
#rp-phone .rp-game-chat-header>span{min-width:0;overflow-wrap:anywhere}
#rp-phone .rp-game-chat-body{min-height:0;overscroll-behavior:contain}
#ggold-header{display:flex;align-items:center;justify-content:space-between;padding:5px 12px;flex-shrink:0;gap:4px}
.ggold-score-box{background:rgba(255,255,255,.82);border:1px solid rgba(0,0,0,.08);border-radius:7px;padding:3px 8px;text-align:center;min-width:60px;box-shadow:0 1px 4px rgba(0,0,0,.1)}
.ggold-score-lbl{font-size:9px;font-weight:700;color:rgba(60,40,10,.65);text-transform:uppercase;letter-spacing:.04em}
.ggold-score-val{font-size:14px;font-weight:800;color:#4a3010}
#ggold-round-info{font-size:11px;font-weight:600;color:#fff;background:rgba(0,0,0,.38);padding:2px 8px;border-radius:12px;text-shadow:0 1px 3px rgba(0,0,0,.5);white-space:nowrap;text-align:center}
#ggold-timer-wrap{padding:2px 12px;flex-shrink:0}
#ggold-timer-bg{height:5px;border-radius:3px;background:rgba(0,0,0,.15);overflow:hidden}
#ggold-timer-bar{height:5px;border-radius:3px;background:var(--rp-wd-fill,linear-gradient(90deg,#f59e0b,#ef4444));transition:width .5s linear;width:100%}
#ggold-canvas-wrap{display:flex;justify-content:center;padding:2px 0;flex-shrink:0}
#ggold-canvas{border-radius:8px;display:block}
#ggold-action-row{display:flex;justify-content:center;align-items:center;gap:10px;padding:3px 12px;flex-shrink:0;min-width:0}
#ggold-launch-btn{padding:6px 22px;border-radius:18px;border:none;background:linear-gradient(135deg,var(--rp-nav-btn,#e05888),color-mix(in srgb,var(--rp-nav-btn,#e05888) 70%,#000 30%));color:#fff;font-weight:700;font-size:13px;cursor:pointer;box-shadow:0 2px 8px rgba(0,0,0,.25);flex-shrink:0}
#ggold-launch-btn:disabled{opacity:.45;cursor:not-allowed}
#ggold-turn-badge{font-size:11px;font-weight:600;color:#fff;background:rgba(0,0,0,.32);padding:2px 10px;border-radius:12px;max-width:100%;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
#ggold-chat-hint{font-size:9.5px;color:rgba(224,64,122,.65);text-align:right;padding:0 14px 1px;flex-shrink:0}
#ggold-chat{flex:1 1 0;min-height:0;overflow-y:auto;padding:5px 8px;display:flex;flex-direction:column;gap:2px;margin:0 8px;background:rgba(0,0,0,.28);border-radius:8px;backdrop-filter:none;cursor:pointer}
#ggold-chat::-webkit-scrollbar{display:none}
#ggold-input-row{display:flex;gap:6px;padding:6px 12px 10px;flex-shrink:0;border-top:1px solid rgba(0,0,0,.06)}
#ggold-input{flex:1;border-radius:18px;border:1px solid rgba(0,0,0,.12);padding:6px 12px;font-size:13px;background:rgba(255,255,255,.88);font-family:inherit;outline:none;color:#1a1008}
#ggold-send{width:34px;height:34px;border-radius:50%;background:linear-gradient(135deg,var(--rp-nav-btn,#e05888),color-mix(in srgb,var(--rp-nav-btn,#e05888) 70%,#000 30%));border:none;color:#fff;font-weight:800;cursor:pointer;font-size:16px;flex-shrink:0;display:flex;align-items:center;justify-content:center;box-shadow:0 2px 8px rgba(0,0,0,.3)}
#ggold-over{position:absolute;inset:0;background:rgba(0,0,0,.62);z-index:50;flex-direction:column;align-items:center;justify-content:center;gap:12px;display:none;border-radius:48px}
.ggold-over-emoji{font-size:48px;line-height:1}
.ggold-over-title{font-size:19px;font-weight:800;color:#fff}
.ggold-over-sub{font-size:12px;color:rgba(255,255,255,.8);text-align:center;padding:0 20px;line-height:1.5;white-space:pre-line}
.ggold-over-btn{padding:8px 18px;border-radius:20px;border:none;background:linear-gradient(135deg,#f59e0b,#d97706);color:#fff;font-weight:700;font-size:13px;cursor:pointer;margin-top:2px}
#ggold-mode-select{position:absolute;inset:0;background:rgba(0,0,0,.55);z-index:60;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px;border-radius:48px;backdrop-filter:none}
.ggold-mode-title{font-size:17px;font-weight:800;color:#fff;text-shadow:0 2px 8px rgba(0,0,0,.4)}
.ggold-mode-sub{font-size:11px;color:rgba(255,255,255,.72);text-align:center;padding:0 24px;line-height:1.5;margin-top:-8px}
.ggold-mode-btn{width:180px;padding:10px 0;border-radius:22px;border:none;font-weight:700;font-size:13px;cursor:pointer;box-shadow:0 3px 12px rgba(0,0,0,.22)}
#ggold-mode-vs{background:linear-gradient(135deg,#ef4444,#b91c1c);color:#fff}
#ggold-mode-co{background:linear-gradient(135deg,#10b981,#059669);color:#fff}
.rp-folder-game-gold{color:#f6d7e3}
#rp-phone.rp-theme-candy .rp-folder-game-gold{color:#ffeaf2 !important;filter:drop-shadow(0 0 5px rgba(255,255,255,.55)) drop-shadow(0 1px 3px rgba(120,20,50,.38)) !important}
#rp-phone.rp-theme-star .rp-folder-game-gold{color:#f7f2ff !important;filter:drop-shadow(0 0 6px rgba(180,150,255,.55)) drop-shadow(0 1px 3px rgba(0,0,0,.42)) !important}
#rp-phone.rp-theme-misty .rp-folder-game-gold{color:#2f587d !important;filter:drop-shadow(0 1px 2px rgba(255,255,255,.38)) drop-shadow(0 0 3px rgba(20,60,90,.15)) !important}
#rp-phone.rp-theme-star #ggold-canvas{filter:brightness(.88) saturate(.9)}
#rp-phone.rp-theme-misty #ggold-chat .game-msg-sys{color:rgba(200,228,255,.92);text-shadow:0 0 4px rgba(0,10,40,.8)}
#rp-phone.rp-theme-misty #ggold-chat .game-msg-user{color:rgba(255,210,228,.92);text-shadow:0 0 4px rgba(0,10,40,.8)}
#rp-phone.rp-theme-misty #ggold-chat .game-msg-char{color:rgba(185,228,255,.95)}
#rp-phone.rp-theme-star #ggold-chat .game-msg-sys{color:rgba(210,200,255,.88)}
#rp-phone.rp-theme-star #ggold-chat .game-msg-user{color:#f0c0ff}
#rp-phone.rp-theme-star #ggold-chat .game-msg-char{color:#c8b8ff}
/* ══ 你说我猜 WORD GUESSING GAME ══ */
#rp-view-gword{position:relative;background:transparent;display:flex;flex-direction:column;overflow:hidden;height:100%}
#gword-header{display:flex;align-items:center;justify-content:space-between;padding:5px 12px;flex-shrink:0;gap:4px}
#gword-category-badge{font-size:12px;font-weight:700;color:#fff;background:rgba(0,0,0,.38);padding:3px 12px;border-radius:12px;text-shadow:0 1px 3px rgba(0,0,0,.5)}
#gword-round-info{font-size:11px;font-weight:600;color:#fff;background:rgba(0,0,0,.32);padding:2px 10px;border-radius:12px;white-space:nowrap}
#gword-status{text-align:center;padding:2px 12px;font-size:12px;font-weight:600;color:#fff;text-shadow:0 1px 3px rgba(0,0,0,.5);flex-shrink:0;min-height:18px}
#gword-chat-hint{font-size:9.5px;color:rgba(224,64,122,.65);text-align:right;padding:0 14px 1px;flex-shrink:0}
#gword-chat{flex:1 1 0;min-height:0;overflow-y:auto;padding:5px 8px;display:flex;flex-direction:column;gap:2px;margin:0 8px;background:rgba(0,0,0,.28);border-radius:8px;backdrop-filter:none;cursor:pointer}
#gword-chat::-webkit-scrollbar{display:none}
#gword-input-row{display:flex;gap:6px;padding:6px 12px 10px;flex-shrink:0;border-top:1px solid rgba(0,0,0,.06);align-items:center}
#gword-input{flex:1;border-radius:18px;border:1px solid rgba(0,0,0,.12);padding:6px 12px;font-size:13px;background:rgba(255,255,255,.88);font-family:inherit;outline:none;color:#1a1008}
#gword-send{width:34px;height:34px;border-radius:50%;background:linear-gradient(135deg,var(--rp-nav-btn,#e05888),color-mix(in srgb,var(--rp-nav-btn,#e05888) 70%,#000 30%));border:none;color:#fff;font-weight:800;cursor:pointer;font-size:16px;flex-shrink:0;display:flex;align-items:center;justify-content:center;box-shadow:0 2px 8px rgba(0,0,0,.3)}
#gword-giveup-btn{width:28px;height:28px;border-radius:50%;background:rgba(0,0,0,.3);border:1px solid rgba(255,255,255,.25);color:#fff;font-size:13px;cursor:pointer;flex-shrink:0;display:flex;align-items:center;justify-content:center}
#gword-giveup-btn:active{background:rgba(255,255,255,.4)}
#gword-over{position:absolute;inset:0;background:rgba(0,0,0,.62);z-index:50;flex-direction:column;align-items:center;justify-content:center;gap:12px;display:none;border-radius:48px}
.gword-over-emoji{font-size:48px;line-height:1}
.gword-over-title{font-size:19px;font-weight:800;color:#fff}
.gword-over-sub{font-size:12px;color:rgba(255,255,255,.8);text-align:center;padding:0 20px;line-height:1.5;white-space:pre-line}
.gword-over-btn{padding:8px 18px;border-radius:20px;border:none;background:linear-gradient(135deg,#f472b6,#a855f7);color:#fff;font-weight:700;font-size:13px;cursor:pointer;margin-top:2px}
#gword-mode-select{position:absolute;inset:0;background:rgba(0,0,0,.55);z-index:60;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px;border-radius:48px;backdrop-filter:none}
.gword-mode-title{font-size:17px;font-weight:800;color:#fff;text-shadow:0 2px 8px rgba(0,0,0,.4)}
.gword-mode-sub{font-size:11px;color:rgba(255,255,255,.72);text-align:center;padding:0 24px;line-height:1.5;margin-top:-8px}
.gword-mode-btn{width:180px;padding:10px 0;border-radius:22px;border:none;font-weight:700;font-size:13px;cursor:pointer;box-shadow:0 3px 12px rgba(0,0,0,.22)}
#gword-mode-char{background:linear-gradient(135deg,#8b5cf6,#6d28d9);color:#fff}
#gword-mode-user{background:linear-gradient(135deg,#f472b6,#db2777);color:#fff}
#gword-chat-fs{position:absolute;inset:0;z-index:40;background:rgba(0,0,0,.78);backdrop-filter:none;display:flex;flex-direction:column}
#gword-chat-fs-hd{display:flex;align-items:center;justify-content:space-between;padding:60px 16px 10px;flex-shrink:0;border-bottom:1px solid rgba(255,255,255,.12)}
#gword-chat-fs-title{color:#fff;font-weight:600;font-size:14px}
#gword-chat-fs-close{background:rgba(255,255,255,.15);border:1px solid rgba(255,255,255,.2);border-radius:50%;color:#fff;font-size:16px;cursor:pointer;width:32px;height:32px;display:flex;align-items:center;justify-content:center}
#gword-chat-fs-body{flex:1;overflow-y:auto;padding:8px 14px;display:flex;flex-direction:column;gap:4px}
#gword-chat-fs-body::-webkit-scrollbar{display:none}
#gword-chat-fs-body .game-msg{font-size:13px;line-height:1.6;padding:3px 0}
#gword-chat-fs-body .game-msg-sys{color:rgba(240,230,215,.88)}
#gword-chat-fs-body .game-msg-user{color:#ffd6e8;font-weight:600}
#gword-chat-fs-body .game-msg-char{color:#fce8ff;font-weight:600}
#gword-chat .game-msg{font-size:12px;line-height:1.55;padding:2px 0;font-weight:500}
#gword-chat .game-msg-sys{color:rgba(255,240,225,.90);text-shadow:0 0 4px rgba(0,0,0,.8),0 1px 3px rgba(0,0,0,.6)}
#gword-chat .game-msg-user{color:#ffd6e8;font-weight:600;text-shadow:0 0 4px rgba(0,0,0,.8),0 1px 3px rgba(0,0,0,.6)}
#gword-chat .game-msg-char{color:#fce8ff;font-weight:600}
#rp-phone.rp-theme-star #gword-chat{background:rgba(8,2,30,.52)!important}
#rp-phone.rp-theme-star #gword-chat .game-msg-sys{color:rgba(210,200,255,.88)}
#rp-phone.rp-theme-star #gword-chat .game-msg-user{color:#f0c0ff}
#rp-phone.rp-theme-star #gword-chat .game-msg-char{color:#c8b8ff}
#rp-phone.rp-theme-star #gword-chat-fs-body .game-msg-sys{color:rgba(210,200,255,.88)}
#rp-phone.rp-theme-star #gword-chat-fs-body .game-msg-user{color:#f0c0ff}
#rp-phone.rp-theme-star #gword-chat-fs-body .game-msg-char{color:#c8b8ff}
#rp-phone.rp-theme-misty #gword-chat{background:rgba(0,15,40,.42)!important}
#rp-phone.rp-theme-misty #gword-chat .game-msg-sys{color:rgba(200,228,255,.92);text-shadow:0 0 4px rgba(0,10,40,.8)}
#rp-phone.rp-theme-misty #gword-chat .game-msg-user{color:rgba(255,210,228,.92);text-shadow:0 0 4px rgba(0,10,40,.8)}
#rp-phone.rp-theme-misty #gword-chat .game-msg-char{color:rgba(185,228,255,.95)}
#rp-phone.rp-theme-misty #gword-chat-fs-body .game-msg-sys{color:rgba(200,228,255,.92)}
#rp-phone.rp-theme-misty #gword-chat-fs-body .game-msg-user{color:rgba(255,210,228,.92)}
#rp-phone.rp-theme-misty #gword-chat-fs-body .game-msg-char{color:rgba(185,228,255,.95)}
#rp-phone.rp-theme-candy #gword-input{background:rgba(255,255,255,.92)!important;border-color:rgba(220,130,165,.4)!important;color:#3a1020!important}
#rp-phone.rp-theme-candy #gword-input::placeholder{color:rgba(58,16,32,.38)!important}
.rp-folder-game-word{color:#f6d7e3}
#rp-phone.rp-theme-candy .rp-folder-game-word{color:#ffeaf2 !important;filter:drop-shadow(0 0 5px rgba(255,255,255,.55)) drop-shadow(0 1px 3px rgba(120,20,50,.38)) !important}
#rp-phone.rp-theme-star .rp-folder-game-word{color:#f7f2ff !important;filter:drop-shadow(0 0 6px rgba(180,150,255,.55)) drop-shadow(0 1px 3px rgba(0,0,0,.42)) !important}
#rp-phone.rp-theme-misty .rp-folder-game-word{color:#2f587d !important;filter:drop-shadow(0 1px 2px rgba(255,255,255,.38)) drop-shadow(0 0 3px rgba(20,60,90,.15)) !important}
#ggold-coop-bar{padding:0 12px 2px;flex-shrink:0;display:none}
#ggold-coop-label{font-size:9.5px;color:rgba(255,255,255,.7);text-align:center;margin-bottom:2px}
#ggold-coop-progress-bg{height:4px;border-radius:2px;background:rgba(255,255,255,.2);overflow:hidden}
#ggold-coop-progress-fill{height:100%;border-radius:2px;background:linear-gradient(90deg,#10b981,#34d399);transition:width .4s ease}

@keyframes rpApiBlink{0%,100%{opacity:1}50%{opacity:.3}}
#rp-api-blink{animation:rpApiBlink 1.6s ease-in-out infinite}
/* API settings */
#rp-api-btn{width:30px;height:30px;border-radius:15px;background:rgba(168,85,247,.1);border:1.5px solid rgba(168,85,247,.22);color:#7c3aed;font-size:12px;cursor:pointer;display:flex!important;align-items:center;justify-content:center;flex-shrink:0;transition:background .2s;font-weight:700;padding:0;visibility:visible!important;pointer-events:auto!important}
#rp-api-btn:hover{background:rgba(168,85,247,.22)}
.rp-dark:where(:not(.rp-theme-custom)) #rp-api-btn{background:rgba(168,85,247,.15);border-color:rgba(168,85,247,.3);color:#c084fc}
#rp-api-panel{position:absolute;inset:0;z-index:80;background:rgba(80,30,130,.28);backdrop-filter:none;-webkit-backdrop-filter:none;display:flex;align-items:center;justify-content:center;border-radius:48px}
#rp-api-box{background:#fff;border:1px solid rgba(200,150,255,.3);border-radius:24px;padding:22px 20px;width:222px;max-width:92%;box-shadow:0 8px 40px rgba(150,80,200,.22)}
.rp-dark:where(:not(.rp-theme-custom)) #rp-api-box{background:linear-gradient(145deg,#1e0a30,#120520);border-color:rgba(200,150,255,.2)}
.rp-api-title{font-size:15px;font-weight:800;color:#2d1060;margin-bottom:5px}
.rp-dark:where(:not(.rp-theme-custom)) .rp-api-title{color:#f0e0ff}
.rp-api-desc{font-size:10.5px;color:#9070b0;margin-bottom:14px;line-height:1.55}
.rp-dark:where(:not(.rp-theme-custom)) .rp-api-desc{color:rgba(220,180,255,.6)}
.rp-api-opt{display:flex;align-items:center;gap:8px;font-size:12.5px;color:#2d1060;margin-bottom:7px;cursor:pointer}
.rp-dark:where(:not(.rp-theme-custom)) .rp-api-opt{color:#e8d0ff}
#rp-api-custom-fields{margin-top:10px;display:flex;flex-direction:column;gap:7px}
.rp-api-presets{display:flex;gap:5px;flex-wrap:wrap;margin-bottom:2px}
.rp-api-profiles{display:flex;flex-direction:column;gap:7px;min-width:0;margin-bottom:10px;padding-bottom:12px;border-bottom:1px solid var(--rp-v-border,rgba(168,85,247,.2))}
.rp-api-profile-actions{display:flex;gap:8px;min-width:0}
.rp-api-profile-action{flex:1;min-width:0;min-height:32px;border:1px solid var(--rp-v-border,rgba(168,85,247,.25));border-radius:10px;padding:6px 8px;background:var(--rp-v-card,rgba(168,85,247,.08));color:var(--rp-v-text,#7c3aed);font:inherit;font-size:12px;cursor:pointer}
.rp-api-profile-action:disabled{opacity:.45;cursor:default}
.rp-api-profile-hint,.rp-api-profile-status{font-size:11px;line-height:1.5;color:var(--rp-v-muted,#9070b0);overflow-wrap:anywhere}
.rp-api-profile-status:empty{display:none}
#rp-api-profile,#rp-api-profile-v{max-width:100%;min-width:0;text-overflow:ellipsis}
#rp-api-box{max-height:calc(100% - 32px);overflow-y:auto;overscroll-behavior:contain}
/* Connection inputs precede optional profile management on small phone screens. */
#rp-phone .rp-api-mode-switch{display:flex;gap:8px;margin-bottom:10px;min-width:0}
#rp-phone #rp-screen .rp-api-mode-switch .rp-api-opt{flex:1;justify-content:center;min-width:0;min-height:30px;box-sizing:border-box;gap:5px;padding:5px 6px;margin:0!important;font-size:12px;border:1px solid var(--rp-v-border,rgba(168,85,247,.2));border-radius:10px}
#rp-phone .rp-api-mode-switch input{margin:0;flex-shrink:0}
#rp-phone .rp-api-profiles{gap:5px;margin-bottom:4px;padding-bottom:0;border:0}
#rp-phone .rp-api-profile-picker{display:flex;align-items:center;gap:6px;min-width:0}
#rp-phone .rp-api-profile-picker select{flex:1;width:0;min-width:0}
#rp-phone .rp-api-profile-picker button{flex:0 0 auto;white-space:nowrap;padding-inline:9px}
#rp-phone .rp-api-secondary{border:1px solid var(--rp-v-border,rgba(168,85,247,.2));border-radius:10px;font-size:12px;min-width:0}
#rp-phone .rp-api-secondary summary{padding:8px 10px;cursor:pointer;color:var(--rp-v-text,#7c3aed);font-weight:500;line-height:1.4}
#rp-phone #rp-screen input[id^="rp-api-profile-name"]{pointer-events:auto!important;-webkit-user-select:text!important;user-select:text!important;touch-action:manipulation;min-height:40px}
@media (hover:none) and (pointer:coarse){#rp-phone #rp-screen input[id^="rp-api-profile-name"]{font-size:16px!important}}
#rp-phone .rp-api-secondary-body{display:flex;flex-direction:column;gap:7px;padding:2px 10px 10px;min-width:0}
#rp-phone #rp-api-custom-fields-v{gap:6px!important}
#rp-phone #rp-screen #rp-view-api-settings .rp-api-scroll{padding-top:8px!important;padding-bottom:8px!important}
#rp-phone #rp-screen #rp-view-api-settings .rp-api-footer{display:grid!important;grid-template-columns:minmax(0,1fr) minmax(0,1.3fr);align-items:stretch;gap:8px!important;padding:8px 18px 16px!important}
#rp-phone #rp-screen #rp-view-api-settings .rp-api-footer button{min-width:0;min-height:40px;margin:0!important;padding:10px 6px!important;border-radius:12px!important;line-height:1.3;overflow-wrap:anywhere}
#rp-phone #rp-screen #rp-view-api-settings #rp-api-test-v{font-size:12px!important}
#rp-phone #rp-screen #rp-view-api-settings #rp-api-status-v{grid-column:1/-1;min-height:0!important;max-height:44px;overflow-y:auto;line-height:1.4;margin:0!important;font-size:11px}
#rp-phone #rp-screen #rp-view-api-settings #rp-api-status-v:empty{display:none}
#rp-phone #rp-api-box{box-sizing:border-box;width:262px;max-width:calc(100% - 24px);max-height:calc(100% - 32px)}

.rp-api-preset-btn{padding:3px 9px;border-radius:10px;border:1px solid rgba(168,85,247,.3);background:transparent;color:#7c3aed;font-size:10px;cursor:pointer;transition:background .15s}
.rp-api-preset-btn:hover{background:rgba(168,85,247,.12)}
.rp-api-input{background:rgba(255,255,255,.9);border:1.5px solid rgba(180,120,200,.25);border-radius:12px;padding:7px 12px;font-size:11.5px;color:#2d1060;font-family:inherit;outline:none;width:100%;box-sizing:border-box}
.rp-dark:where(:not(.rp-theme-custom)) .rp-api-input{background:rgba(255,255,255,.08);border-color:rgba(180,120,255,.2);color:#f0e0ff}
.rp-api-input:focus{border-color:#a855f7}
.rp-api-input::placeholder{color:rgba(120,80,160,.4)}
.rp-api-save-row{display:flex;gap:8px;margin-top:16px}
.rp-api-save-btn{flex:1;padding:9px;background:linear-gradient(135deg,#f472b6,#a855f7);color:#fff;border:none;border-radius:16px;font-size:13px;font-weight:700;cursor:pointer}
.rp-api-cancel-btn{padding:9px 14px;background:rgba(120,60,180,.08);border:1px solid rgba(168,85,247,.2);border-radius:16px;font-size:13px;color:#7c3aed;cursor:pointer}

/* ── EDIT PENCIL BUTTON (SVG线条铅笔,适配主题色) ── */
.rp-edit-btn {
  display:inline-flex; align-items:center; justify-content:center;
  width:22px; height:22px; border-radius:50%;
  background:rgba(0,0,0,.06); border:none; cursor:pointer;
  color:var(--rp-nav-btn,#c0306a); line-height:1;
  flex-shrink:0; margin-left:4px; transition:opacity .15s,background .15s;
  padding:3px; opacity:0; pointer-events:none;
}
/* 桌面端:hover 气泡时显示 */
.rp-bwrap.rp-in:hover .rp-edit-btn,
.rp-bwrap.rp-in .rp-edit-btn:focus { opacity:1; pointer-events:auto; }
.rp-bwrap.rp-out:hover .rp-edit-btn,
.rp-bwrap.rp-out .rp-edit-btn:focus { opacity:1; pointer-events:auto; }
/* 触屏端:常驻半透明,随时可点 */
@media (hover:none) and (pointer:coarse) {
  .rp-edit-btn { opacity:0.5; pointer-events:auto; }
}
.rp-edit-btn:hover,.rp-edit-btn:active { background:rgba(0,0,0,.14); opacity:1; }

/* ── DELETE BUTTON ── */
.rp-del-btn {
  display:inline-flex; align-items:center; justify-content:center;
  width:22px; height:22px; border-radius:50%;
  background:rgba(0,0,0,.06); border:none; cursor:pointer;
  color:#e05060; line-height:1;
  flex-shrink:0; margin-left:2px; transition:opacity .15s,background .15s;
  padding:3px; opacity:0; pointer-events:none;
}
.rp-bwrap.rp-in:hover .rp-del-btn,
.rp-bwrap.rp-in .rp-del-btn:focus { opacity:1; pointer-events:auto; }
.rp-bwrap.rp-out:hover .rp-del-btn,
.rp-bwrap.rp-out .rp-del-btn:focus { opacity:1; pointer-events:auto; }
@media (hover:none) and (pointer:coarse) {
  .rp-del-btn { opacity:0.5; pointer-events:auto; }
}
.rp-del-btn:hover,.rp-del-btn:active { background:rgba(220,50,70,.15); opacity:1; }

/* 游戏聊天铅笔 */
.game-msg-char { position:relative; display:flex; align-items:flex-start; gap:4px; }
.game-edit-btn {
  display:inline-flex; align-items:center; justify-content:center;
  background:none; border:none; cursor:pointer;
  color:var(--rp-nav-btn,#c0306a); padding:2px;
  flex-shrink:0; line-height:1; width:18px; height:18px;
  opacity:0; pointer-events:none; transition:opacity .15s;
}
.game-msg-char:hover .game-edit-btn { opacity:1; pointer-events:auto; }
@media (hover:none) and (pointer:coarse) {
  .game-edit-btn { opacity:0.5; pointer-events:auto; }
}
.game-edit-btn:active { opacity:1; }
/* 日记回复铅笔 */
.rp-diary-reply { position:relative; }
.rp-diary-edit-btn {
  display:inline-flex; align-items:center; justify-content:center;
  background:none; border:none; cursor:pointer;
  color:var(--rp-nav-btn,#c0306a); padding:2px;
  width:18px; height:18px; line-height:1;
  opacity:0; pointer-events:none; transition:opacity .15s;
}
.rp-diary-reply:hover .rp-diary-edit-btn { opacity:1; pointer-events:auto; }
@media (hover:none) and (pointer:coarse) {
  .rp-diary-edit-btn { opacity:0.5; pointer-events:auto; }
}
.rp-diary-edit-btn:active { opacity:1; }
/* 内联编辑区 */
.rp-inline-edit-wrap {
  display:flex; flex-direction:column; gap:4px;
  max-width:72%; min-width:80px;
}
.rp-inline-textarea {
  border:1.5px solid var(--rp-nav-btn,#c0306a) !important;
  border-radius:12px !important; padding:8px 10px !important;
  font-size:13px !important; font-family:inherit !important;
  resize:none !important; outline:none !important;
  background:#ffffff !important; color:#1a1a2e !important;
  line-height:1.45 !important; min-height:48px !important;
  box-shadow:0 0 0 3px rgba(192,48,106,.12) !important;
}
/* star主题(深色): 编辑区用深紫底+亮字 */
#rp-phone.rp-theme-star .rp-inline-textarea {
  background:#1e1060 !important; color:#e8e0ff !important;
  border-color:#a78bfa !important;
  box-shadow:0 0 0 3px rgba(167,139,250,.18) !important;
}
/* misty主题(浅蓝): 白底深字 */
#rp-phone.rp-theme-misty .rp-inline-textarea {
  background:#f0f8ff !important; color:#0d2236 !important;
  border-color:#3d8abf !important;
  box-shadow:0 0 0 3px rgba(61,138,191,.14) !important;
}
/* candy主题(粉色,默认): 白底深字 */
.rp-inline-textarea {
  background:#ffffff !important; color:#2d1030 !important;
}
.rp-inline-edit-btns {
  display:flex; gap:6px; justify-content:flex-end;
}
.rp-inline-ok, .rp-inline-cancel {
  width:28px; height:28px; border-radius:50%; border:none;
  cursor:pointer; font-size:14px; display:flex;
  align-items:center; justify-content:center; font-weight:700;
}
.rp-inline-ok { background:var(--rp-nav-btn,#c0306a); color:#fff; }
.rp-inline-cancel { background:rgba(0,0,0,.1); color:#555; }

/* ══════════════════════════════════════════════════════════
   🏦 BANK CARD MODULE - 银行卡资产模块 (重构 v2)
   设计语言: 金融级高级感 · 浮雕质感 · 三主题全适配
   ══════════════════════════════════════════════════════════ */

/* ── CSS 设计 token (每主题独立覆盖) ── */
#rp-phone {
  --bank-bg-overlay: rgba(255,248,250,.18);
  --bank-hero-grad: linear-gradient(145deg, #1a0a0e 0%, #2d1020 40%, #1e0c18 70%, #0f0608 100%);
  --bank-hero-shine: linear-gradient(125deg, rgba(200,160,80,.22) 0%, transparent 45%, rgba(180,120,60,.12) 100%);
  --bank-hero-border: rgba(200,160,80,.28);
  --bank-hero-text: #f5ede0;
  --bank-hero-sub: rgba(245,237,224,.55);
  --bank-hero-accent: #c8a050;
  --bank-hero-amount: #faf0dc;
  --bank-card-bg: rgba(255,255,255,.62);
  --bank-card-border: rgba(255,255,255,.72);
  --bank-card-shadow: 0 6px 24px rgba(0,0,0,.07), 0 1px 0 rgba(255,255,255,.65) inset;
  --bank-label: rgba(80,20,48,.55);
  --bank-text: #1a0a12;
  --bank-text-sub: rgba(58,16,40,.78);
  --bank-divider: rgba(0,0,0,.06);
  --bank-ico-bg: rgba(255,255,255,.55);
  --bank-ico-shadow: 0 1px 5px rgba(0,0,0,.1);
  --bank-pos: #0d8a3e;
  --bank-neg: #d42020;
  --bank-tag-bg: rgba(180,130,60,.1);
  --bank-tag-text: #8a5a10;
  --bank-loading-color: #c03060;
  --bank-empty-color: rgba(60,16,40,.3);
  --bank-chip-bg: rgba(255,255,255,.55);
  --bank-chip-border: rgba(200,160,80,.25);
}

/* ─── 🌸 CANDY TOKEN (default, no class needed) ─── */
/* defaults above cover candy */

/* ─── ✨ STAR TOKEN ─── */
#rp-phone.rp-theme-star {
  --bank-bg-overlay: rgba(6,3,20,.15);
  --bank-hero-grad: linear-gradient(145deg, #0c0630 0%, #1a0858 40%, #120440 70%, #060220 100%);
  --bank-hero-shine: linear-gradient(125deg, rgba(160,120,255,.25) 0%, transparent 45%, rgba(100,60,200,.15) 100%);
  --bank-hero-border: rgba(160,120,255,.35);
  --bank-hero-text: #f0eaff;
  --bank-hero-sub: rgba(220,210,255,.5);
  --bank-hero-accent: #a87cfa;
  --bank-hero-amount: #ede4ff;
  --bank-card-bg: rgba(20,10,52,.72);
  --bank-card-border: rgba(140,100,255,.28);
  --bank-card-shadow: 0 6px 28px rgba(0,0,0,.45), 0 1px 0 rgba(160,130,255,.14) inset;
  --bank-label: rgba(210,195,255,.65);
  --bank-text: #e4d8ff;
  --bank-text-sub: rgba(200,185,255,.82);
  --bank-divider: rgba(140,100,255,.12);
  --bank-ico-bg: rgba(60,30,120,.55);
  --bank-ico-shadow: 0 1px 6px rgba(80,40,180,.22);
  --bank-pos: #86efac;
  --bank-neg: #fca5a5;
  --bank-tag-bg: rgba(140,100,255,.15);
  --bank-tag-text: #c8b0ff;
  --bank-loading-color: #a87cfa;
  --bank-empty-color: rgba(180,165,255,.35);
  --bank-chip-bg: rgba(40,20,90,.55);
  --bank-chip-border: rgba(160,120,255,.3);
}

/* ─── 🌿 MISTY TOKEN ─── */
#rp-phone.rp-theme-misty {
  --bank-bg-overlay: rgba(200,228,248,.12);
  --bank-hero-grad: linear-gradient(145deg, #062040 0%, #0e3060 40%, #0a2448 70%, #040e22 100%);
  --bank-hero-shine: linear-gradient(125deg, rgba(120,180,240,.28) 0%, transparent 45%, rgba(60,130,200,.15) 100%);
  --bank-hero-border: rgba(120,180,240,.32);
  --bank-hero-text: #e8f4ff;
  --bank-hero-sub: rgba(200,232,255,.52);
  --bank-hero-accent: #6ab4e8;
  --bank-hero-amount: #dff0ff;
  --bank-card-bg: rgba(228,243,255,.65);
  --bank-card-border: rgba(100,168,218,.3);
  --bank-card-shadow: 0 6px 24px rgba(0,60,120,.09), 0 1px 0 rgba(180,220,255,.62) inset;
  --bank-label: rgba(22,60,100,.62);
  --bank-text: #0c1e30;
  --bank-text-sub: rgba(20,50,88,.82);
  --bank-divider: rgba(80,150,210,.14);
  --bank-ico-bg: rgba(190,225,250,.55);
  --bank-ico-shadow: 0 1px 5px rgba(40,100,160,.12);
  --bank-pos: #0e7a36;
  --bank-neg: #c41c1c;
  --bank-tag-bg: rgba(60,130,200,.1);
  --bank-tag-text: #1a5a90;
  --bank-loading-color: #3d8fbf;
  --bank-empty-color: rgba(44,74,106,.4);
  --bank-chip-bg: rgba(200,228,250,.55);
  --bank-chip-border: rgba(80,150,210,.28);
}

/* ────────────────────────────────────────────
   VIEW CONTAINER
──────────────────────────────────────────── */
#rp-view-bank {
  background: transparent;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
#rp-phone.rp-theme-candy #rp-view-bank,
#rp-phone.rp-theme-star  #rp-view-bank,
#rp-phone.rp-theme-misty #rp-view-bank {
  background: var(--rp-home-wall) !important;
  background-size: cover !important;
  background-position: center !important;
}
/* 资产概览标题与 loading/empty 颜色统一 */
#rp-view-bank .rp-nav-title {
  color: var(--bank-loading-color, #c03060) !important;
  text-shadow: none !important;
}
#rp-view-bank .rp-back,
#rp-view-bank .rp-nav-add,
#rp-view-bank #rp-bank-refresh {
  color: var(--bank-loading-color, #c03060) !important;
  text-shadow: none !important;
}

/* ────────────────────────────────────────────
   SCROLL BODY
──────────────────────────────────────────── */
#rp-bank-body {
  flex: 1;
  overflow-y: auto !important;
  overflow-x: hidden !important;
  padding: 12px 11px 32px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  scrollbar-width: none !important;
  -ms-overflow-style: none !important;
}
#rp-bank-body::-webkit-scrollbar { display: none !important; width: 0 !important; height: 0 !important; }
#rp-view-bank { scrollbar-width: none !important; }
#rp-view-bank::-webkit-scrollbar { display: none !important; }

/* ────────────────────────────────────────────
   HERO CARD (总资产 / 净资产)
   效果: 深色磨砂金属质感 + 金色/紫色/蓝色光晕
──────────────────────────────────────────── */
.rp-bank-hero {
  position: relative;
  border-radius: 22px;
  padding: 18px 18px 16px;
  overflow: visible;
  background: var(--bank-hero-grad);
  border: 1px solid var(--bank-hero-border);
  box-shadow:
    0 12px 40px rgba(0,0,0,.35),
    0 2px 0 rgba(255,255,255,.06) inset,
    0 -1px 0 rgba(0,0,0,.25) inset;
  /* clip 内容但不裁子元素伪元素 */
  isolation: isolate;
}
/* 金属反光层 */
.rp-bank-hero::before {
  content: '';
  position: absolute; inset: 0;
  background: var(--bank-hero-shine);
  pointer-events: none;
  border-radius: inherit;
  z-index: 0;
}
/* 底部柔和光晕 — 放到 box-shadow 代替伪元素避免裁切问题 */
.rp-bank-hero::after {
  content: '';
  position: absolute; bottom: -18px; left: 15%; right: 15%;
  height: 36px;
  background: var(--bank-hero-border);
  filter:none;
  opacity: .38;
  pointer-events: none;
  z-index: -1;
  border-radius: 50%;
}
.rp-bank-hero > * { position: relative; z-index: 1; }
.rp-bank-hero-chip {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  background: var(--bank-chip-bg);
  border: 1px solid var(--bank-chip-border);
  border-radius: 20px;
  padding: 3px 10px 3px 7px;
  margin-bottom: 14px;
  backdrop-filter:none;
}
.rp-bank-hero-chip-dot {
  width: 6px; height: 6px;
  border-radius: 50%;
  background: var(--bank-hero-accent);
  box-shadow: 0 0 6px var(--bank-hero-accent);
  flex-shrink: 0;
}
.rp-bank-hero-chip-text {
  font-size: 9.5px;
  font-weight: 700;
  letter-spacing: .5px;
  text-transform: uppercase;
  color: var(--bank-hero-sub);
}
.rp-bank-hero-label {
  font-size: 10px;
  font-weight: 600;
  letter-spacing: .5px;
  text-transform: uppercase;
  color: var(--bank-hero-sub);
  margin-bottom: 6px;
}
.rp-bank-hero-amount {
  font-size: 34px;
  font-weight: 200;
  letter-spacing: -2px;
  color: var(--bank-hero-amount);
  line-height: 1;
  margin-bottom: 3px;
}
.rp-bank-hero-unit {
  font-size: 14px;
  font-weight: 400;
  letter-spacing: 0;
  vertical-align: super;
  margin-right: 3px;
  opacity: .75;
}
.rp-bank-hero-sub {
  font-size: 10px;
  color: var(--bank-hero-sub);
  letter-spacing: .2px;
  margin-top: 2px;
}
/* 底部分隔线 */
.rp-bank-hero-divider {
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--bank-hero-border), transparent);
  margin: 12px 0 10px;
  opacity: .6;
}
/* 底部快速指标行 */
.rp-bank-hero-stats {
  display: flex;
  gap: 0;
}
.rp-bank-hero-stat {
  flex: 1;
  text-align: center;
  padding: 0 4px;
  border-right: 1px solid rgba(255,255,255,.08);
}
.rp-bank-hero-stat:last-child { border-right: none; }
.rp-bank-hero-stat-val {
  font-size: 12px;
  font-weight: 700;
  color: var(--bank-hero-text);
  letter-spacing: -.3px;
}
.rp-bank-hero-stat-lbl {
  font-size: 9px;
  color: var(--bank-hero-sub);
  margin-top: 2px;
  letter-spacing: .3px;
}

/* ────────────────────────────────────────────
   SECTION CARD (资产分项 / 交易记录 等)
──────────────────────────────────────────── */
.rp-bank-card {
  background: var(--bank-card-bg);
  backdrop-filter: blur(18px) saturate(1.4);
  -webkit-backdrop-filter: blur(18px) saturate(1.4);
  border: 1px solid var(--bank-card-border);
  border-radius: 20px;
  padding: 14px 14px 10px;
  box-shadow: var(--bank-card-shadow);
}

/* ── 旧 .rp-bank-card 兼容:如果 hero 和 card 共用则 hero 覆盖 ── */
.rp-bank-card.rp-bank-hero {
  background: var(--bank-hero-grad) !important;
  border-color: var(--bank-hero-border) !important;
  box-shadow: 0 12px 40px rgba(0,0,0,.35) !important;
}

/* ────────────────────────────────────────────
   SECTION TITLE
──────────────────────────────────────────── */
.rp-bank-section-title {
  font-size: 10.5px;
  font-weight: 700;
  letter-spacing: .55px;
  text-transform: uppercase;
  color: var(--bank-label);
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 6px;
}
/* 左侧装饰线 */
.rp-bank-section-title::before {
  content: '';
  display: inline-block;
  width: 3px;
  height: 11px;
  border-radius: 2px;
  background: var(--bank-hero-accent);
  opacity: .75;
  flex-shrink: 0;
}

/* ────────────────────────────────────────────
   总资产数字 (兼容旧 HTML 结构)
──────────────────────────────────────────── */
.rp-bank-total {
  font-size: 32px;
  font-weight: 200;
  letter-spacing: -2px;
  color: var(--bank-hero-amount);
  line-height: 1;
  margin-bottom: 3px;
}
.rp-bank-total-label {
  font-size: 10px;
  color: var(--bank-hero-sub);
  margin-bottom: 14px;
  letter-spacing: .3px;
}

/* ────────────────────────────────────────────
   资产构成 — 全新卡片列表布局（v4 完全重写）
   每个资产项 = 独立小卡片，上下分区，无截断
──────────────────────────────────────────── */

/* 资产列表容器：垂直堆叠，间距分明 */
.rp-asset-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 4px;
}

/* 每个资产项：独立小卡片 */
.rp-asset-item {
  background: var(--bank-ico-bg);
  border-radius: 14px;
  border: 1px solid var(--bank-divider);
  padding: 12px 14px;
  box-sizing: border-box;
}

/* 顶行：图标 + 资产名称（名称完整显示，允许换行） */
.rp-asset-header {
  display: flex;
  align-items: flex-start;
  gap: 8px;
}

.rp-asset-ico {
  flex: 0 0 28px;
  width: 28px;
  height: 28px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  background: var(--bank-ico-bg);
  box-shadow: var(--bank-ico-shadow);
  border: 1px solid rgba(255,255,255,.3);
  margin-top: 1px;
}

.rp-asset-name {
  font-size: 13px;
  font-weight: 600;
  color: var(--bank-text);
  line-height: 1.4;
  /* 关键：允许换行，绝不截断 */
  white-space: normal;
  word-break: break-word;
  flex: 1 1 0;
}

/* 底行：金额独占一行，desc 另起一行截断显示 */
.rp-asset-footer {
  display: flex;
  flex-direction: column;
  gap: 3px;
  padding-left: 36px; /* 与名称对齐 */
  width: 100%;
  box-sizing: border-box;
  overflow: hidden;
}

.rp-asset-amount {
  font-size: 15px;
  font-weight: 700;
  color: var(--bank-text);
  letter-spacing: -.3px;
  white-space: nowrap;
}
.rp-asset-amount.rp-bank-neg { color: var(--bank-neg) !important; }

.rp-asset-desc-wrap {
  position: relative;
  max-width: 100%;
}
.rp-asset-desc {
  font-size: 10px;
  color: var(--bank-text-sub);
  line-height: 1.5;
  word-break: break-all;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  max-width: 100%;
}
.rp-asset-desc.rp-desc-expanded {
  display: block;
  -webkit-line-clamp: unset;
  overflow: visible;
}
.rp-asset-desc-more {
  color: var(--bank-hero-accent, #c8a050);
  cursor: pointer;
  font-size: 10px;
  user-select: none;
  white-space: nowrap;
}
.rp-asset-desc-more:active { opacity: 0.7; }

.rp-asset-change { display: none; }

/* 涨跌色 */
.rp-bank-pos { color: var(--bank-pos) !important; }
.rp-bank-neg-text { color: var(--bank-neg) !important; }

/* ────────────────────────────────────────────
   交易记录行
──────────────────────────────────────────── */
.rp-bank-txn {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: start;
  gap: 8px;
  padding: 11px 0;
  border-bottom: 1px solid var(--bank-divider);
  min-height: 52px;
}
.rp-bank-txn:last-child { border-bottom: none; }
.rp-bank-txn-ico {
  width: 34px; height: 34px;
  min-width: 34px;
  border-radius: 11px;
  display: flex; align-items: center; justify-content: center;
  font-size: 17px;
  background: var(--bank-ico-bg);
  box-shadow: var(--bank-ico-shadow);
  flex-shrink: 0;
  border: 1px solid rgba(255,255,255,.3);
  margin-top: 1px;
}
.rp-bank-txn-info { min-width: 0; overflow: visible; width: 100%; }
.rp-bank-txn-name {
  font-size: 13px;
  font-weight: 600;
  color: var(--bank-text);
  overflow: visible;
  white-space: normal;
  word-break: break-all;
  line-height: 1.4;
  width: 100%;
}
.rp-bank-txn-date {
  font-size: 10px;
  color: var(--bank-text-sub);
  margin-top: 2px;
  line-height: 1.3;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
}
.rp-bank-txn-amt {
  font-size: 13px;
  font-weight: 700;
  color: var(--bank-text);
  flex-shrink: 0;
  letter-spacing: -.2px;
  white-space: nowrap;
}
.rp-bank-txn-amt.rp-bank-out { color: var(--bank-neg) !important; }
.rp-bank-txn-amt.rp-bank-in  { color: var(--bank-pos) !important; }

/* ────────────────────────────────────────────
   进度条 (借款/信用额度)
──────────────────────────────────────────── */
.rp-bank-bar-wrap {
  height: 4px;
  border-radius: 2px;
  background: var(--bank-divider);
  margin-top: 8px;
  overflow: hidden;
}
.rp-bank-bar-fill {
  height: 100%;
  border-radius: 2px;
  background: linear-gradient(90deg, var(--bank-hero-accent), var(--bank-hero-border));
  transition: width .9s cubic-bezier(.25,.46,.45,.94);
}

/* ────────────────────────────────────────────
   REFRESH 按钮
──────────────────────────────────────────── */
#rp-bank-refresh {
  background: none !important; border: none !important;
  color: var(--rp-nav-btn) !important;
  cursor: pointer !important; padding: 2px 4px !important;
  display: inline-flex !important; align-items: center !important;
  justify-content: center !important; border-radius: 6px !important;
  transition: transform .25s, opacity .2s !important;
  visibility: visible !important; opacity: 1 !important;
  pointer-events: auto !important;
}
#rp-bank-refresh:hover { transform: rotate(180deg) !important; }
#rp-bank-refresh:disabled { opacity: .35 !important; cursor: default !important; transform: none !important; }
#rp-bank-refresh.rp-spinning { animation: rpSpin .7s linear infinite !important; }

/* ────────────────────────────────────────────
   LOADING 占位
──────────────────────────────────────────── */
#rp-bank-loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin: 24px 12px;
  padding: 24px 20px;
  border-radius: 18px;
  background: var(--bank-card-bg, rgba(255,255,255,.62));
  border: 1px solid var(--bank-card-border, rgba(255,255,255,.72));
  box-shadow: var(--bank-card-shadow, 0 6px 24px rgba(0,0,0,.07));
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  color: var(--bank-loading-color, #c03060);
  font-size: 13px;
  font-weight: 600;
}
.rp-bank-loading-dots { display: flex; gap: 4px; }
.rp-bank-loading-dots span {
  width: 6px; height: 6px; border-radius: 50%;
  background: var(--bank-loading-color, #c03060);
  animation: rp-ts-dot 1.2s ease-in-out infinite;
  display: inline-block;
}
.rp-bank-loading-dots span:nth-child(2) { animation-delay: .2s; }
.rp-bank-loading-dots span:nth-child(3) { animation-delay: .4s; }

/* ────────────────────────────────────────────
   EMPTY 空状态
──────────────────────────────────────────── */
.rp-bank-empty {
  text-align: center;
  color: var(--bank-loading-color, #c03060);
  opacity: .88;
  margin: 24px 12px;
  padding: 28px 20px;
  border-radius: 18px;
  background: var(--bank-card-bg, rgba(255,255,255,.62));
  border: 1px solid var(--bank-card-border, rgba(255,255,255,.72));
  box-shadow: var(--bank-card-shadow, 0 6px 24px rgba(0,0,0,.07));
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  font-size: 13px;
  font-weight: 500;
  line-height: 1.6;
}

/* ── GLOBAL SCROLLBAR HIDE ── */
/* PC端隐藏所有滚动条，移动端靠原生手势滚动，不展示滚动条 */
#rp-phone * {
  scrollbar-width: none !important;
  -ms-overflow-style: none !important;
}
#rp-phone *::-webkit-scrollbar {
  display: none !important;
  width: 0 !important;
  height: 0 !important;
}


/* ── Game partner selector modal ── */
.rp-game-partner-bar{display:flex;align-items:center;justify-content:center;gap:6px;padding:4px 12px 0;font-size:11px;color:var(--rp-nav-btn,#c0306a);font-weight:600;flex-shrink:0}
.rp-game-partner-name{max-width:96px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.rp-game-partner-change{border:none;border-radius:10px;background:color-mix(in srgb,var(--rp-nav-btn,#c0306a) 16%,transparent);color:var(--rp-nav-btn,#c0306a);font-size:11px;padding:2px 8px;cursor:pointer;font-family:inherit;font-weight:700;box-shadow:0 1px 4px rgba(0,0,0,.06)}
.rp-game-partner-change:active{transform:scale(.96)}
.rp-dark:where(:not(.rp-theme-custom)) .rp-game-partner-bar{color:var(--rp-nav-btn,#d8b4fe)}
.rp-dark:where(:not(.rp-theme-custom)) .rp-game-partner-change{background:color-mix(in srgb,var(--rp-nav-btn,#d8b4fe) 22%,transparent);color:var(--rp-nav-btn,#d8b4fe)}
#rp-game-partner-modal{position:absolute;inset:0;z-index:720;background:rgba(0,0,0,.30);display:flex;align-items:center;justify-content:center;padding:18px;box-sizing:border-box;backdrop-filter:none;-webkit-backdrop-filter:none}
.rp-game-partner-sheet{width:100%;max-width:248px;border-radius:24px;background:color-mix(in srgb,var(--rp-nav-btn,#c0306a) 8%,#fff 92%);border:1px solid color-mix(in srgb,var(--rp-nav-btn,#c0306a) 22%,transparent);box-shadow:0 18px 48px rgba(0,0,0,.24);padding:16px 14px 14px;box-sizing:border-box;color:var(--rp-nav-title,#4a1060)}
.rp-dark:where(:not(.rp-theme-custom)) .rp-game-partner-sheet{background:color-mix(in srgb,var(--rp-nav-btn,#d8b4fe) 16%,#12091c 84%);border-color:color-mix(in srgb,var(--rp-nav-btn,#d8b4fe) 24%,transparent);color:var(--rp-nav-title,#ead8ff)}
.rp-game-partner-title{font-size:15px;font-weight:800;text-align:center;margin-bottom:4px;color:var(--rp-nav-title,currentColor)}
.rp-game-partner-sub{font-size:10.5px;text-align:center;color:var(--rp-hd-name,rgba(0,0,0,.55));margin-bottom:12px;line-height:1.35}
.rp-game-partner-field{display:flex;flex-direction:column;gap:5px;margin-bottom:10px}
.rp-game-partner-label{font-size:11px;font-weight:700;color:var(--rp-nav-btn,#c0306a)}
#rp-game-partner-name-input,#rp-game-partner-note-input{width:100%;box-sizing:border-box;border:1.5px solid color-mix(in srgb,var(--rp-nav-btn,#c0306a) 24%,transparent);border-radius:15px;background:rgba(255,255,255,.94);color:var(--rp-nav-title,#3a174a);font-family:inherit;font-size:12px;outline:none;transition:border-color .15s ease,box-shadow .15s ease,background .15s ease;padding:9px 11px}
#rp-game-partner-note-input{height:74px;resize:none;line-height:1.45}
#rp-game-partner-name-input:focus,#rp-game-partner-note-input:focus{border-color:var(--rp-nav-btn,#c0306a);box-shadow:0 0 0 3px color-mix(in srgb,var(--rp-nav-btn,#c0306a) 18%,transparent)}
.rp-dark:where(:not(.rp-theme-custom)) #rp-game-partner-name-input,.rp-dark:where(:not(.rp-theme-custom)) #rp-game-partner-note-input{background:rgba(255,255,255,.08);color:var(--rp-nav-title,#f7edff)}
#rp-game-partner-name-input::placeholder,#rp-game-partner-note-input::placeholder{color:color-mix(in srgb,var(--rp-hd-name,rgba(0,0,0,.45)) 78%,transparent)}
.rp-game-partner-help{font-size:10px;line-height:1.35;color:var(--rp-hd-name,rgba(0,0,0,.45));margin-top:-3px}
.rp-game-partner-actions{display:flex;gap:8px;margin-top:12px}
.rp-game-partner-actions button{flex:1;height:34px;border:none;border-radius:17px;font-family:inherit;font-size:12px;font-weight:700;cursor:pointer}
#rp-game-partner-cancel{background:color-mix(in srgb,var(--rp-nav-btn,#c0306a) 12%,transparent);color:var(--rp-nav-btn,#c0306a)}
#rp-game-partner-save{background:var(--rp-wd-fill,linear-gradient(135deg,var(--rp-nav-btn,#c0306a),color-mix(in srgb,var(--rp-nav-btn,#c0306a) 68%,#fff 32%)));color:#fff;box-shadow:0 4px 12px color-mix(in srgb,var(--rp-nav-btn,#c0306a) 28%,transparent)}
.rp-dark:where(:not(.rp-theme-custom)) #rp-game-partner-cancel{background:color-mix(in srgb,var(--rp-nav-btn,#d8b4fe) 18%,transparent);color:var(--rp-nav-btn,#d8b4fe)}

${RP_VISUAL_CSS}
${RP_ART_CSS}
${RP_REFINED_CSS}
${RP_READING_CSS}
${RP_IMPROVEMENT_CSS}
${RP_PRIVATE_AVATAR_CSS}
${RP_MESSAGE_ACTIONS_CSS}
${RP_MOMENT_TRANSLATE_CSS}
${RP_UI_FINISH_CSS}
${PHONE_TOOLS_CSS}
${THEATRE_CSS}
${RP_XHS_COMPOSE_CSS}
${RP_SOCIAL_COMPACT_CSS}
#rp-wrapper #rp-phone #rp-screen #rp-view-moments #rp-moments-list {min-height:0;overflow-y:auto;overflow-x:hidden;padding-bottom:18px;}
#rp-wrapper #rp-phone #rp-screen #rp-view-moments #rp-moments-list .rp-moment {flex:0 0 auto;}
#rp-wrapper #rp-phone #rp-screen #rp-view-moments #rp-moments-list :is(.rp-moment-text,.rp-moment-comment-content,.rp-translation-text) {height:auto;max-height:none;overflow:visible;overflow-wrap:anywhere;word-break:normal;-webkit-line-clamp:unset;text-overflow:clip;}
#rp-wrapper #rp-phone #rp-screen #rp-view-moments #rp-moments-list :is(.rp-moment-comments-wrap,.rp-moment-comment) {flex-shrink:0;}
#rp-wrapper #rp-phone #rp-screen #rp-view-moments #rp-moments-list .rp-moment-cinput {min-width:0;}

/* Social feed: sender header, full-width content, discreet actions. Theme tokens remain authoritative. */
#rp-wrapper #rp-phone #rp-screen #rp-view-moments #rp-moments-list .rp-moment{display:block;min-width:0;padding:14px 24px!important;margin:0!important;background:transparent!important;border:0!important;border-bottom:1px solid var(--rp-moment-bd)!important;border-radius:0!important;box-shadow:none!important;position:relative}
#rp-wrapper #rp-phone #rp-screen #rp-view-moments #rp-moments-list .rp-moment-hd{display:flex;align-items:center;gap:10px;min-width:0;margin:0 -10px 8px!important}
#rp-wrapper #rp-phone #rp-screen #rp-view-moments #rp-moments-list .rp-moment-av{flex:0 0 36px;width:36px!important;height:36px!important;border-radius:5px!important;margin:0!important;align-self:center}
#rp-wrapper #rp-phone #rp-screen #rp-view-moments #rp-moments-list .rp-moment-meta{min-width:0;align-self:center;margin:0}
#rp-wrapper #rp-phone #rp-screen #rp-view-moments #rp-moments-list .rp-moment>:not(.rp-moment-hd){min-width:0;max-width:100%;box-sizing:border-box}
#rp-wrapper #rp-phone #rp-screen #rp-view-moments #rp-moments-list .rp-moment-name{line-height:1.4;color:var(--rp-v-text)!important;overflow-wrap:anywhere}
#rp-wrapper #rp-phone #rp-screen #rp-view-moments #rp-moments-list .rp-moment-text{padding:0!important;background:transparent!important;border-radius:0!important;white-space:pre-wrap;margin:0 0 5px!important}
#rp-wrapper #rp-phone #rp-screen #rp-view-moments #rp-moments-list .rp-moment-text:empty{display:none}
#rp-wrapper #rp-phone #rp-screen #rp-view-moments #rp-moments-list .rp-moment-img-wrap{margin:3px 0 5px!important;max-width:100%!important;justify-self:start;border-radius:3px!important;overflow:hidden}
#rp-wrapper #rp-phone #rp-screen #rp-view-moments #rp-moments-list .rp-moment-img{display:block;max-width:100%!important;max-height:240px;object-fit:contain;border-radius:3px!important}
#rp-wrapper #rp-phone #rp-screen #rp-view-moments #rp-moments-list .rp-moment-bar{display:flex;justify-content:space-between!important;gap:4px!important;margin:3px 0 5px!important;padding:0!important;min-width:0}
#rp-wrapper #rp-phone #rp-screen #rp-view-moments #rp-moments-list .rp-moment-time{margin:0!important;align-self:center;white-space:nowrap;opacity:.75}
#rp-wrapper #rp-phone #rp-screen #rp-view-moments #rp-moments-list .rp-moment-foot-actions{display:flex;align-items:center;justify-content:flex-end;gap:5px;min-width:0;flex-wrap:wrap;margin-left:auto}
#rp-wrapper #rp-phone #rp-screen #rp-view-moments #rp-moments-list .rp-moment-menu{position:relative;display:inline-block;align-self:start;flex-shrink:0;line-height:1}
#rp-wrapper #rp-phone #rp-screen #rp-view-moments #rp-moments-list .rp-moment-menu summary{display:flex;list-style:none;align-items:center;justify-content:center;width:30px;height:24px;border-radius:4px;cursor:pointer;color:var(--rp-v-text);background:var(--rp-v-card);font-size:16px;letter-spacing:0;white-space:nowrap;overflow-wrap:normal;user-select:none}
#rp-wrapper #rp-phone #rp-screen #rp-view-moments #rp-moments-list summary::-webkit-details-marker{display:none}
#rp-wrapper #rp-phone #rp-screen #rp-view-moments #rp-moments-list summary:focus-visible{outline:2px solid var(--rp-moment-name);outline-offset:2px}
#rp-wrapper #rp-phone #rp-screen #rp-view-moments #rp-moments-list .rp-moment-menu-items{position:absolute;right:0;top:100%;margin-top:3px;z-index:12;width:max-content;max-width:190px;min-width:110px;padding:4px;border-radius:7px;background:var(--rp-v-surface);color:var(--rp-v-text);border:1px solid var(--rp-moment-bd);box-shadow:0 4px 18px rgba(0,0,0,.12);display:flex;flex-direction:column;align-items:stretch}
#rp-wrapper #rp-phone #rp-screen #rp-view-moments #rp-moments-list .rp-moment-menu:not([open]) .rp-moment-menu-items{display:none}
#rp-wrapper #rp-phone #rp-screen #rp-view-moments #rp-moments-list .rp-moment-menu[open]{z-index:15}
#rp-wrapper #rp-phone #rp-screen #rp-view-moments #rp-moments-list .rp-moment-menu.rp-open-up .rp-moment-menu-items{top:auto;bottom:100%;margin-top:0;margin-bottom:3px}
#rp-wrapper #rp-phone #rp-screen #rp-view-moments #rp-moments-list .rp-moment-menu-items :is(.rp-moment-act,.rp-moment-reply-btn,.rp-moment-comment-del-btn,.rp-moment-translate-btn){background:transparent;border:0;border-radius:4px;text-align:left;justify-content:flex-start;font-family:inherit;padding:5px 9px!important;min-height:30px!important;font-size:11px!important;cursor:pointer}
#rp-wrapper #rp-phone #rp-screen #rp-view-moments #rp-moments-list .rp-moment-menu-items button:hover{background:var(--rp-v-card)}
#rp-wrapper #rp-phone #rp-screen #rp-view-moments #rp-moments-list .rp-moment-menu-items .rp-moment-delete-translate{display:flex;flex-direction:column;align-items:stretch!important;gap:0!important}
#rp-wrapper #rp-phone #rp-screen #rp-view-moments #rp-moments-list .rp-moment-social{background:var(--rp-v-card);border-radius:4px;padding:3px 8px;margin:2px 0 0;min-width:0}
#rp-wrapper #rp-phone #rp-screen #rp-view-moments #rp-moments-list .rp-moment-social.rp-empty{display:none}
#rp-wrapper #rp-phone #rp-screen #rp-view-moments #rp-moments-list .rp-moment-likes-row{padding:4px 0!important;margin:0!important;color:var(--rp-v-text)!important;overflow-wrap:anywhere;border:0!important}
#rp-wrapper #rp-phone #rp-screen #rp-view-moments #rp-moments-list .rp-moment-likes-row+.rp-moment-comments-wrap{border-top:1px solid var(--rp-moment-bd)!important}
#rp-wrapper #rp-phone #rp-screen #rp-view-moments #rp-moments-list .rp-moment-comments-wrap{padding:2px 0!important;margin:0!important;gap:0!important;background:transparent!important}
#rp-wrapper #rp-phone #rp-screen #rp-view-moments #rp-moments-list .rp-moment-comment{display:grid;grid-template-columns:minmax(0,1fr) 24px;gap:3px;padding:3px 0!important;align-items:start}
#rp-wrapper #rp-phone #rp-screen #rp-view-moments #rp-moments-list .rp-moment-comment-content{overflow-wrap:anywhere;min-width:0;margin:0!important;white-space:pre-wrap}
#rp-wrapper #rp-phone #rp-screen #rp-view-moments #rp-moments-list .rp-moment-cname{color:var(--rp-v-text)!important;font-weight:600}
#rp-wrapper #rp-phone #rp-screen #rp-view-moments #rp-moments-list .rp-moment-comment-menu summary{width:24px;height:22px;font-size:13px;background:transparent;opacity:.65}
#rp-wrapper #rp-phone #rp-screen #rp-view-moments #rp-moments-list .rp-moment-sticker .rp-sticker-tile{width:96px;min-height:0;padding:0;max-width:100%;margin:3px 0 5px;background:transparent;border:0;box-shadow:none}
#rp-wrapper #rp-phone #rp-screen #rp-view-moments #rp-moments-list .rp-moment-comment-sticker{display:inline-block;vertical-align:middle;max-width:100%}
#rp-wrapper #rp-phone #rp-screen #rp-view-moments #rp-moments-list .rp-moment-comment-sticker .rp-sticker-tile{display:inline-flex;width:36px;max-width:100%;vertical-align:middle;background:transparent;border:0;box-shadow:none;margin:0 2px;min-height:0;padding:0}
#rp-wrapper #rp-phone #rp-screen #rp-view-moments #rp-moments-list .rp-sticker-tile img{width:100%;height:auto;max-height:130px;object-fit:contain}
#rp-wrapper #rp-phone #rp-screen #rp-view-moments #rp-moments-list .rp-social-sticker-status{font-size:10px;opacity:.55}
#rp-wrapper #rp-phone #rp-screen #rp-view-moments #rp-moments-list .rp-moment-cinput{min-width:0}

`;
