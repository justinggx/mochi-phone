// The original template and API-control markup retain their order.
export function createPhoneTemplate({rpApiProfileControlsHtml,THEATRE_HTML}) {
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
          <div id="rp-swipe-hint">点击解锁</div>
          <div id="rp-swipe-zone"></div>
        </div>

        <!-- 主屏 -->
        <div id="rp-view-home" class="rp-view" style="display:none">
          <div class="rp-home-bg"></div>
          <!-- 双页横滑容器 -->
          <div id="rp-home-pages">
            <!-- 第一屏：主屏幕 -->
            <div class="rp-home-page" id="rp-home-page-0">
              <div class="rp-home-body">
                <div id="rp-home-clock"></div>
                <div id="rp-home-date"></div>
                <div id="rp-app-grid">
                  <!-- row 1: 信息 朋友圈 夜间 -->
                  <div class="rp-app" data-app="messages">
                    <div class="rp-app-ico">
                      <div class="rp-badge" id="rp-main-badge" style="display:none">0</div>
                    </div>
                    <div class="rp-app-lbl">信息</div>
                  </div>
                  <div class="rp-app" data-app="moments">
                    <div class="rp-app-ico"></div>
                    <div class="rp-app-lbl">朋友圈</div>
                  </div>

                  <!-- row 2: 设置 飞行棋 占位 -->
                  <div class="rp-app" data-app="settings">
                    <div class="rp-app-ico"></div>
                    <div class="rp-app-lbl">设置</div>
                  </div>
                  <div class="rp-app" id="rp-folder-games-btn" data-app="folder-games">
                    <div class="rp-app-ico"></div>
                    <div class="rp-app-lbl">游戏</div>
                  </div>
                  <div class="rp-app" data-app="api-settings">
                    <div class="rp-app-ico"></div>
                    <div class="rp-app-lbl">API</div>
                  </div>
                  <!-- row 3: 美化 日记 -->
                  <div class="rp-app" data-app="themes">
                    <div class="rp-app-ico"></div>
                    <div class="rp-app-lbl">主题</div>
                  </div>
                  <div class="rp-app" data-app="diary">
                    <div class="rp-app-ico"></div>
                    <div class="rp-app-lbl">日记</div>
                  </div>
                  <div class="rp-app" data-app="xhs" title="小红书">
                    <div class="rp-app-ico"></div>
                    <div class="rp-app-lbl">小红书</div>
                  </div>
                  <div class="rp-app" data-app="bank" title="银行卡">
                    <div class="rp-app-ico"></div>
                    <div class="rp-app-lbl">银行卡</div>
                  </div>
                  <div class="rp-app" data-app="theatre" title="小剧场"><div class="rp-app-ico"></div><div class="rp-app-lbl">小剧场</div></div>
                </div>
              </div>
            </div>
            <!-- 第二屏：关于 -->
            <div class="rp-home-page" id="rp-home-page-1">
              <div id="rp-about-page">
                <svg id="rp-about-deco" viewBox="0 0 260 200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <circle cx="130" cy="72" r="44" fill="none" stroke="currentColor" stroke-width="1.2" opacity=".18"/>
                  <circle cx="130" cy="72" r="32" fill="none" stroke="currentColor" stroke-width="1" opacity=".22"/>
                  <circle cx="130" cy="72" r="20" fill="currentColor" opacity=".10"/>
                  <!-- 花瓣装饰 -->
                  <ellipse cx="130" cy="36" rx="5" ry="11" fill="currentColor" opacity=".18" transform="rotate(0 130 72)"/>
                  <ellipse cx="130" cy="36" rx="5" ry="11" fill="currentColor" opacity=".18" transform="rotate(45 130 72)"/>
                  <ellipse cx="130" cy="36" rx="5" ry="11" fill="currentColor" opacity=".18" transform="rotate(90 130 72)"/>
                  <ellipse cx="130" cy="36" rx="5" ry="11" fill="currentColor" opacity=".18" transform="rotate(135 130 72)"/>
                  <ellipse cx="130" cy="36" rx="5" ry="11" fill="currentColor" opacity=".18" transform="rotate(180 130 72)"/>
                  <ellipse cx="130" cy="36" rx="5" ry="11" fill="currentColor" opacity=".18" transform="rotate(225 130 72)"/>
                  <ellipse cx="130" cy="36" rx="5" ry="11" fill="currentColor" opacity=".18" transform="rotate(270 130 72)"/>
                  <ellipse cx="130" cy="36" rx="5" ry="11" fill="currentColor" opacity=".18" transform="rotate(315 130 72)"/>
                  <!-- 中心图标：手机 -->
                  <rect x="122" y="60" width="16" height="24" rx="3" fill="currentColor" opacity=".55"/>
                  <rect x="124" y="62" width="12" height="16" rx="1.5" fill="none" stroke="var(--rp-about-bg,#fff)" stroke-width="1.2" opacity=".7"/>
                  <circle cx="130" cy="81" r="1.2" fill="var(--rp-about-bg,#fff)" opacity=".8"/>
                  <!-- 散点 -->
                  <circle cx="52"  cy="48"  r="2.5" fill="currentColor" opacity=".13"/>
                  <circle cx="208" cy="55"  r="2"   fill="currentColor" opacity=".11"/>
                  <circle cx="38"  cy="150" r="3"   fill="currentColor" opacity=".10"/>
                  <circle cx="222" cy="145" r="2.5" fill="currentColor" opacity=".12"/>
                  <circle cx="78"  cy="170" r="2"   fill="currentColor" opacity=".09"/>
                  <circle cx="185" cy="175" r="2"   fill="currentColor" opacity=".09"/>
                </svg>
                <div class="rp-about-card">
                  <div id="rp-about-title">🍡 mochiphone</div>
                  <div id="rp-about-author">by 棠栀 Talia</div>
                  <div id="rp-about-divider"></div>
                  <div id="rp-about-notice">
                    本扩展由作者免费发布于<br>
                    <span class="rp-about-hl">DC社区：旅程 / 类脑 / 多林国</span><br>
                    其他渠道获取均视为盗版。<br><br>
                    生图致谢：<br>
                    感谢智绘姬大佬授权接入<br>
                    @DC 从前跟你一样<br>
                    感谢comfyui大佬提供部署支持<br>
                    @DC zzzyyyyyy
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- 页面指示点 -->
          <div id="rp-home-dots">
            <span class="rp-home-dot rp-home-dot-active"></span>
            <span class="rp-home-dot"></span>
          </div>
          <div class="rp-home-indicator"></div>
        </div>

        <!-- API 设置 -->
        <div id="rp-view-api-settings" class="rp-view" style="display:none">
          <div class="rp-nav-bar">
            <button class="rp-back" data-to="home">‹</button>
            <span class="rp-nav-title">API 设置</span>
          </div>
          <div class="rp-api-scroll" style="flex:1;overflow-y:auto;-webkit-overflow-scrolling:touch;padding:18px 18px 10px;display:flex;flex-direction:column;gap:0">
            <div class="rp-api-mode-switch"><label class="rp-api-opt"><input type="radio" name="rp-api-mode-v" value="st" id="rp-api-mode-st-v" checked> 酒馆主楼 API</label><label class="rp-api-opt"><input type="radio" name="rp-api-mode-v" value="custom" id="rp-api-mode-custom-v"> 自定义 API</label></div>
            <div id="rp-api-custom-fields-v" style="display:none;flex-direction:column;gap:8px">
              ${rpApiProfileControlsHtml('-v')}

              <label class="rp-api-field-label" for="rp-api-url-v">API 地址（URL）</label>
              <input class="rp-api-input" id="rp-api-url-v" placeholder="https://api.deepseek.com/v1" type="url">
              <label class="rp-api-field-label" for="rp-api-key-v">API Key</label>
              <input class="rp-api-input" id="rp-api-key-v" placeholder="API Key" type="password">
              <label class="rp-api-field-label" for="rp-api-model-v">模型</label>
              <div style="display:flex;gap:6px;align-items:center">
                <input class="rp-api-input" id="rp-api-model-v" placeholder="模型名称 (如 deepseek-chat)" style="flex:1;min-width:0">
                <button id="rp-api-fetch-models" style="flex-shrink:0;padding:7px 10px;border-radius:12px;border:1.5px solid rgba(168,85,247,.3);background:rgba(168,85,247,.08);color:#7c3aed;font-size:11px;cursor:pointer;white-space:nowrap;font-weight:600">获取模型</button>
              </div>
              <div id="rp-model-list" style="display:none;background:rgba(255,255,255,.95);border:1px solid rgba(168,85,247,.2);border-radius:12px;max-height:140px;overflow-y:auto"></div>
              <details class="rp-api-secondary rp-api-service-presets"><summary>常用服务快捷填入</summary><div class="rp-api-secondary-body"><div class="rp-api-presets" style="margin-bottom:4px">
                <button class="rp-api-preset-btn" data-url="https://api.deepseek.com/v1" data-model="deepseek-chat">DeepSeek</button>
                <button class="rp-api-preset-btn" data-url="https://api.moonshot.cn/v1" data-model="kimi-k2.6">Kimi</button>
                <button class="rp-api-preset-btn" data-url="https://ark.cn-beijing.volces.com/api/v3" data-model="">豆包·火山方舟</button>
                <button class="rp-api-preset-btn" data-url="https://dashscope.aliyuncs.com/compatible-mode/v1" data-model="qwen-plus">通义千问</button>
                <button class="rp-api-preset-btn" data-url="https://open.bigmodel.cn/api/paas/v4" data-model="glm-4-flash">智谱 GLM</button>
                <button class="rp-api-preset-btn" data-url="https://api.minimax.cn/v1" data-model="MiniMax-M3">MiniMax</button>
                <button class="rp-api-preset-btn" data-url="" data-model="">其他OpenAI</button>
              </div></div></details>
              ${rpApiProfileControlsHtml('-v','manage')}
              <div id="rp-api-provider-note-v" class="rp-set-hint" style="display:none;line-height:1.6"></div>
              <div class="rp-api-privacy" style="font-size:11px;color:#9070b0;line-height:1.6">隐私提示：此端点会收到该功能所需的角色人设、世界书片段、相关聊天或手机内容；Key 仍保存在本浏览器。请只使用可信服务，非本机地址建议使用 HTTPS。</div>
            </div>

            <div class="rp-api-explanation" style="font-size:11px;color:#9070b0;line-height:1.7;background:rgba(168,85,247,.06);border-radius:12px;padding:10px 12px">
              信息仍用酒馆 API；其他小手机功能可使用此接口，需自备 Key。
              <span id="rp-api-blink" style="color:#a855f7;font-weight:700">支持 DeepSeek、Kimi、豆包、通义、GLM、MiniMax。</span>
            </div>
          </div>
          <div class="rp-api-footer" style="padding:10px 18px 28px;flex-shrink:0;display:flex;flex-direction:column;gap:10px">
            <div id="rp-api-status-v" role="status" aria-live="polite" style="font-size:11px;color:#a855f7;min-height:18px;margin-top:8px"></div>
            <button id="rp-api-test-v" style="width:100%;padding:11px;margin-bottom:8px;background:rgba(255,255,255,.18);border:1.5px solid rgba(168,85,247,.45);color:#6d28d9;border-radius:16px;font-size:13px;font-weight:600;cursor:pointer">测试连接</button>
            <button id="rp-api-save-v" style="width:100%;padding:13px;background:linear-gradient(135deg,#f472b6,#a855f7);color:#fff;border:none;border-radius:18px;font-size:14px;font-weight:700;cursor:pointer">保存并使用</button>
          </div>
        </div>

        <!-- 美化/主题 -->
        <div id="rp-view-themes" class="rp-view" style="display:none">
          <div class="rp-nav-bar">
            <button class="rp-back" data-to="home">‹</button>
            <span class="rp-nav-title">主题</span><span></span>
          </div>
          <div style="flex:1;overflow-y:auto;-webkit-overflow-scrolling:touch;padding:20px 16px 28px">
            <div class="rp-theme-select-title">✨ 选择主题</div>
            <div id="rp-theme-cards" style="display:grid;grid-template-columns:1fr 1fr;gap:14px"></div>
            <div id="rp-saved-section" style="display:none">
              <div id="rp-saved-section-title">📌 已保存的方案</div>
              <div id="rp-saved-cards"></div>
            </div>
          </div>
        </div>

        <!-- 🎨 AI 主题工作室 -->
        <div id="rp-view-theme-studio" class="rp-view" style="display:none">
          <div class="rp-nav-bar">
            <button class="rp-back" data-to="themes">‹</button>
            <span class="rp-nav-title">🎨 主题工作室</span>
            <span style="width:32px"></span>
          </div>
          <div id="rp-ts-bubbles">
            <div id="rp-ts-draft"></div>
            <details class="rp-ts-history"><summary>方案与历史</summary>
              <div id="rp-ts-action-bar" style="display:none">
                <button id="rp-ts-undo-v2" class="rp-ts-action-btn rp-ts-undo-btn">回到上一版</button>
                <button id="rp-ts-save-v2" class="rp-ts-action-btn rp-ts-save-btn">保存当前方案</button>
              </div>
              <p id="rp-ts-tip">预览不会直接替换当前主题；应用满意后，可把当前主题另存为方案。</p>
            </details>
          </div>
<section id="rp-ts-chat-sheet" aria-label="主题AI对话"><button id="rp-ts-sheet-toggle" type="button" aria-expanded="false" aria-controls="rp-ts-chat-content" aria-label="展开AI对话"><span class="rp-ts-sheet-grip" aria-hidden="true"></span><svg class="rp-ts-sheet-arrow" aria-hidden="true" viewBox="0 0 24 24" focusable="false"><path d="M5 11l7-7 7 7M12 4v16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></button><div id="rp-ts-chat-content" hidden>
            <section class="rp-ts-conversation" aria-label="和AI设计主题">
              <h2>告诉 AI，你想要什么风格？</h2>
              <p class="rp-ts-intro">先说想法，AI会填好配色和样式。看过效果后，可以继续聊，也可以自己微调。</p>
              <div id="rp-ts-chat-log" role="log" aria-label="主题设计对话" hidden></div>
              <div class="rp-ts-examples" aria-label="试试这些想法"><button type="button" class="rp-ts-tpl-btn" data-tpl="想要奶油白和浅粉色，气泡圆润，文字清楚，整体温柔干净。">奶油暖色</button><button type="button" class="rp-ts-tpl-btn" data-tpl="改成清爽的薄荷绿，背景浅一点，保留清楚的文字和简洁边框。">清爽薄荷</button><button type="button" class="rp-ts-tpl-btn" data-tpl="保留其他设计，只把聊天气泡改得更柔和，文字保持清楚。">调整气泡</button></div>
<button id="rp-ts-jump-preview" class="rp-te-button" type="button" hidden>查看效果 ↓</button>
            </section>
</div>
              <div id="rp-ts-composer">
                <textarea id="rp-ts-input" aria-label="告诉AI你的主题想法" placeholder="比如：奶油白配浅粉，气泡圆润一点，文字清楚些…" rows="2"></textarea>
                <div class="rp-ts-compose-actions"><span>可继续描述想改的部分</span><button id="rp-ts-send" type="button">发送想法</button></div>
              </div>
          <p id="rp-ts-chat-status" role="status" aria-live="polite"></p>
</section>
        </div>

        <!-- 信息列表 -->
        <div id="rp-view-messages" class="rp-view" style="display:none">
          <div class="rp-nav-bar">
            <button class="rp-back" data-to="home">‹</button>
            <span class="rp-nav-title">信息</span>
            <div class="rp-messages-nav-actions">
              <button id="rp-messages-more" type="button" aria-label="信息更多操作" aria-haspopup="menu" aria-controls="rp-messages-menu" aria-expanded="false">⋯</button>
              <div id="rp-messages-menu" role="menu" aria-label="信息操作" hidden>
                <button id="rp-local-search" type="button" role="menuitem">搜索</button>
                <button id="rp-add-btn" type="button" role="menuitem">添加</button>
                <button id="rp-messages-chat-mode" type="button" role="menuitem">聊天方式 · 同步主楼</button>
                <button id="rp-messages-read-all" type="button" role="menuitem">全部已读</button>
              </div>
            </div>
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
            <div class="rp-thread-tools-actions"><button type="button" id="rp-thread-menu" aria-label="聊天更多操作" aria-haspopup="menu" aria-expanded="false">⋯</button></div>
          </div>
          <div id="rp-bubbles"></div>
          <button id="rp-go-latest" type="button" class="rp-feature-pill" style="display:none">↓ 最新</button>
          <!-- FIX3: 待发消息队列预览区 -->
          <div id="rp-pending-queue" style="display:none"></div>
          <div id="rp-composer">
            <div id="rp-attach-panel"></div>
            <button id="rp-attach-btn" type="button">+</button>
            <input id="rp-input" type="text" placeholder="iMessage(回车暂存)" autocomplete="off"/>
            <button id="rp-send" type="button">↑</button>
          </div>
        </div>

        ${THEATRE_HTML}

        <!-- 日记 -->
        <div id="rp-view-diary" class="rp-view" style="display:none">
          <div class="rp-nav-bar">
            <button class="rp-back" data-to="home">‹</button>
            <span class="rp-nav-title">日记</span>
            <button id="rp-gen-diary" title="AI生成今日日记" class="rp-diary-gen-btn"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 0 1-9 9 9 9 0 0 1-6.36-2.64"/><path d="M3 12a9 9 0 0 1 9-9 9 9 0 0 1 6.36 2.64"/><polyline points="16 8 21 3 21 8"/><polyline points="8 16 3 21 3 16"/></svg></button>
          </div>
          <div id="rp-diary-status" role="status" aria-live="polite" style="display:none;flex-shrink:0;padding:8px 14px;font-size:12px;line-height:1.5;overflow-wrap:anywhere;color:var(--rp-nav-btn,#c0306a)"></div>
          <div id="rp-diary-list" style="flex:1;overflow-y:auto;padding:12px 14px 8px"></div>
          <div class="rp-diary-compose">
            <textarea id="rp-diary-input" class="rp-diary-input" placeholder="写下今天的心情..." rows="3"></textarea>
            <button id="rp-diary-send" class="rp-diary-send-btn">发布</button>
          </div>
        </div>

        <!-- 朋友圈 -->
        <div id="rp-view-moments" class="rp-view" style="display:none">
          <div class="rp-nav-bar">
            <button class="rp-back" data-to="home">‹</button>
            <span class="rp-nav-title">朋友圈</span>
            <div class="rp-moments-nav-actions">
              <button id="rp-moments-more" type="button" aria-label="朋友圈更多操作" aria-haspopup="menu" aria-controls="rp-moments-menu" aria-expanded="false">⋯</button>
              <div id="rp-moments-menu" role="menu" aria-label="朋友圈操作" hidden>
                <button id="rp-gen-moments" type="button" role="menuitem" title="AI生成朋友圈">刷新</button>
                <button id="rp-moments-add" type="button" role="menuitem" title="我要发动态">发布</button>
                <button id="rp-moments-auto-translate" type="button" role="menuitemcheckbox" aria-checked="false">一键翻译 · 未开启</button>
              </div>
            </div>   </div>
          <div id="rp-moments-list"></div>
        </div>

        <!-- 小红书 -->
        <!-- 银行卡资产模块 -->
        <div id="rp-view-bank" class="rp-view" style="display:none">
          <div class="rp-nav-bar">
            <button class="rp-back" data-to="home">‹</button>
            <span class="rp-nav-title">资产概览</span>
            <button id="rp-bank-refresh" title="刷新资产">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:20px;height:20px"><path d="M23 4v6h-6"/><path d="M1 20v-6h6"/><path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15"/></svg>
            </button>
          </div>
          <div id="rp-bank-body">
            <div class="rp-bank-empty">✦ 点击右上角刷新，读取 TA 的资产信息</div>
          </div>
        </div>

        <!-- 小红书 -->
        <div id="rp-view-xhs" class="rp-view" style="display:none;flex-direction:column">
          <div class="rp-nav-bar">
            <button class="rp-back" data-to="home">‹</button>
            <span class="rp-nav-title" id="rp-xhs-feed-title">发现</span>
            <div class="rp-xhs-nav-actions">
              <button id="rp-xhs-more" type="button" aria-label="小红书更多操作" aria-haspopup="menu" aria-controls="rp-xhs-menu" aria-expanded="false">⋯</button>
              <div id="rp-xhs-menu" role="menu" aria-label="小红书操作" hidden>
                <button id="rp-xhs-favorites" type="button" role="menuitem">收藏</button>
                <button id="rp-xhs-compose" type="button" role="menuitem">发布</button>
                <button id="rp-xhs-refresh" type="button" role="menuitem">刷新</button>
              </div>
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
            <textarea id="rp-xhs-detail-input" placeholder="发表评论..." autocomplete="off" rows="1" style="flex:1;border-radius:14px;padding:6px 12px;font-size:12px;outline:none;resize:none;overflow:hidden;line-height:1.5;max-height:72px;font-family:inherit;box-sizing:border-box;min-width:0;color:var(--rp-xhs-text,#1a1a1a);background:var(--rp-xhs-card,#fff)"></textarea>
            <button id="rp-xhs-detail-send" style="background:#ff2442;color:#fff;border:none;border-radius:20px;padding:6px 14px;font-size:12px;cursor:pointer;flex-shrink:0;white-space:nowrap;display:inline-flex !important;visibility:visible !important;opacity:1 !important;pointer-events:auto !important">发送</button>
          </div>
        </div>

        <!-- 小红书发帖：奶油拼贴，纸层不参与输入和点击 -->
        <div id="rp-view-xhs-compose" class="rp-view rp-xhs-stationery" style="display:none;flex-direction:column">
          <div class="rp-nav-bar">
            <button class="rp-back" data-to="xhs" aria-label="关闭" style="background:transparent;border:none;cursor:pointer">×</button>
            <span class="rp-nav-title">写笔记</span>
            <button id="rp-xhs-post-btn" aria-label="发布笔记" style="cursor:pointer">发布</button>
          </div>
          <div class="rp-xhs-compose-body">
            <div class="rp-xhs-idea-card">
              <span class="rp-xhs-paper-tape" aria-hidden="true"></span>
              <label class="rp-xhs-field-label" for="rp-xhs-post-title">标题 · 选填</label>
              <input id="rp-xhs-post-title" class="rp-xhs-idea-title-input" type="text" placeholder="把今天，留一小段" maxlength="40" />
              <div class="rp-xhs-compose-divider" aria-hidden="true"></div>
              <label class="rp-xhs-field-label" for="rp-xhs-post-body">正文</label>
              <textarea id="rp-xhs-post-body" placeholder="写下此刻的心情，&#10;或一件想记住的小事。" rows="8" style="resize:none"></textarea>
              <span class="rp-xhs-paper-signature" aria-hidden="true">a little note</span>
            </div>
          </div>
        </div>

        <!-- 发朋友圈 -->
        <div id="rp-compose-modal" class="rp-view rp-compose-publish" style="display:none">
          <div class="rp-nav-bar">
            <button class="rp-back rp-compose-cancel" id="rp-compose-cancel" type="button" aria-label="取消发表朋友圈">取消</button>
            <button class="rp-compose-post-btn" id="rp-compose-post" type="button" aria-label="发表朋友圈">发表</button>
          </div>
          <div class="rp-compose-body">
            <textarea id="rp-compose-text" placeholder="这一刻的想法…" rows="4" aria-label="朋友圈正文"></textarea>
            <div id="rp-compose-photo-area" aria-busy="false">
              <div id="rp-compose-photo-preview">
                <button id="rp-compose-photo-choose" type="button" aria-label="添加图片，最多9张"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" aria-hidden="true"><path d="M12 3v18M3 12h18"/></svg></button>
              </div>
              <input id="rp-compose-photo-file" type="file" accept="image/*" multiple hidden aria-label="选择朋友圈图片，最多9张">
              <div id="rp-compose-photo-status" role="status" aria-live="polite"></div>
            </div>
            <button id="rp-compose-location" type="button" aria-haspopup="dialog"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg><span>所在位置</span><span id="rp-compose-location-value"></span><span class="rp-compose-chevron" aria-hidden="true">›</span></button>
          </div>
        </div>

        <div style="display:none">
        </div>

                <!-- 设置 -->
        <div id="rp-view-settings" class="rp-view" style="display:none">
          <div class="rp-nav-bar"><button class="rp-back" data-to="home">‹</button><span class="rp-nav-title">设置</span><span></span></div>
          <div class="rp-settings-body" style="overflow-y:auto;flex:1">
            <section class="rp-settings-group" aria-labelledby="rp-settings-display-title"><h3 id="rp-settings-display-title" class="rp-set-section-title">显示与大小</h3><div class="rp-set-section"><div id="rp-phone-tools-settings"></div><details id="rp-desktop-size-setting" class="rp-settings-detail" style="display:none"><summary class="rp-settings-item"><span class="rp-settings-copy"><span class="rp-settings-label">手机尺寸（PC）</span><span class="rp-settings-hint">等比调整手机整体大小</span></span><span class="rp-settings-chevron" aria-hidden="true">›</span></summary><div class="rp-settings-panel">
                <div class="rp-set-row" style="flex-direction:column;align-items:stretch;gap:8px">
                  <div style="display:flex;align-items:center;justify-content:space-between;gap:8px">
                    <label for="rp-desktop-size" class="rp-set-key">等比缩放</label>
                    <output id="rp-desktop-size-value" for="rp-desktop-size">100%</output>
                  </div>
                  <input id="rp-desktop-size" type="range" min="60" max="150" step="5" value="100" aria-label="PC 手机尺寸" style="width:100%;min-width:0;cursor:pointer;accent-color:var(--rp-nav-btn,#e06080)">
                  <div id="rp-desktop-size-note" class="rp-set-hint">仅 PC 生效；外框与内部等比缩放，刷新后保留。</div>
                  <button id="rp-desktop-size-reset" type="button" class="rp-set-upload-btn rp-wall-reset-btn">恢复默认（100%）</button>
                </div>
</div></details></div></section>
            <section class="rp-settings-group" aria-labelledby="rp-settings-appearance-title"><h3 id="rp-settings-appearance-title" class="rp-set-section-title">个性外观</h3><div class="rp-set-section"><details id="rp-settings-avatar" class="rp-settings-detail" ><summary class="rp-settings-item"><span class="rp-settings-copy"><span class="rp-settings-label">头像</span><span class="rp-settings-hint">为自己和角色更换头像</span></span><span class="rp-settings-chevron" aria-hidden="true">›</span></summary><div class="rp-settings-panel">
              <div class="rp-set-row">
                <span class="rp-set-key">修改对象</span>
                <select id="rp-avatar-select" class="rp-set-select">
                  <option value="user">我(User)</option>
                </select>
              </div>
              <div class="rp-set-row">
                <label class="rp-set-key" for="rp-avatar-scope">应用范围</label>
                <select id="rp-avatar-scope" class="rp-set-select">
                  <option value="shared">共用头像</option>
                  <option value="local">仅当前聊天</option>
                </select>
              </div>
              <p class="rp-set-hint">Char / NPC 在同卡内共用，User 跟随酒馆身份。已有独立头像保留；点击头像换图也使用此范围。</p>
              <div class="rp-set-row">
                <div id="rp-avatar-preview-swatch" class="rp-set-avatar-preview" style="background:linear-gradient(145deg,#64748b,#475569)">我</div>
                <span class="rp-set-hint">点击右侧上传图片</span>
                <button class="rp-avatar-upload-btn" id="rp-avatar-upload-btn">📷 选择</button>
                <input type="file" id="rp-avatar-file-input" accept="image/*" style="display:none">
              </div>
</div></details><details id="rp-settings-wallpaper" class="rp-settings-detail" ><summary class="rp-settings-item"><span class="rp-settings-copy"><span class="rp-settings-label">壁纸</span><span class="rp-settings-hint">更换或还原手机壁纸</span></span><span class="rp-settings-chevron" aria-hidden="true">›</span></summary><div class="rp-settings-panel">
              <div class="rp-set-row" style="flex-direction:column;align-items:stretch;gap:8px">
                <img id="rp-wall-preview" class="rp-wall-preview-img" style="display:none" alt=""/>
                <div style="display:flex;gap:8px">
                  <button id="rp-wall-upload" class="rp-set-upload-btn" style="flex:1">📷 上传壁纸</button>
                  <button id="rp-wall-reset"  class="rp-set-upload-btn rp-wall-reset-btn" style="flex:1">恢复默认</button>
                </div>
                <input id="rp-wall-file" type="file" accept="image/*" style="display:none"/>
              </div>
</div></details></div></section>
            <section class="rp-settings-group" aria-labelledby="rp-settings-messages-title"><h3 id="rp-settings-messages-title" class="rp-set-section-title">消息与联系人</h3><div class="rp-set-section"><button id="rp-settings-chat-mode" type="button" class="rp-settings-item"><span class="rp-settings-copy"><span class="rp-settings-label">聊天方式</span><span id="rp-settings-chat-mode-hint" class="rp-settings-hint">所有消息同步主楼</span></span><span class="rp-settings-chevron" aria-hidden="true">›</span></button><details id="rp-settings-language" class="rp-settings-detail"><summary class="rp-settings-item"><span class="rp-settings-copy"><span class="rp-settings-label">角色语言</span><span id="rp-phone-language-hint" class="rp-settings-hint">按人设说母语，提供中文翻译</span></span><span class="rp-settings-chevron" aria-hidden="true">›</span></summary><div class="rp-settings-panel">
              <fieldset id="rp-phone-language-options" aria-label="角色语言" style="border:0;margin:0;padding:0;display:grid;gap:12px;min-width:0">
                <label class="rp-language-choice" style="display:flex;align-items:flex-start;gap:10px;box-sizing:border-box;min-height:40px;padding:8px 0;margin:0;cursor:pointer"><input type="radio" name="rp-phone-language-mode" value="native" style="width:16px;height:16px;flex:0 0 16px;margin:2px 0 0;accent-color:var(--rp-nav-btn)"><span class="rp-set-key" style="white-space:normal;min-width:0">角色说母语（提供中文翻译）</span></label>
                <label class="rp-language-choice" style="display:flex;align-items:flex-start;gap:10px;box-sizing:border-box;min-height:40px;padding:8px 0;margin:0;cursor:pointer"><input type="radio" name="rp-phone-language-mode" value="zh" style="width:16px;height:16px;flex:0 0 16px;margin:2px 0 0;accent-color:var(--rp-nav-btn)"><span class="rp-set-key" style="white-space:normal;min-width:0">角色说中文</span></label>
              </fieldset>
              <div class="rp-set-hint" style="margin-top:12px">用于信息、群聊、朋友圈及评论。对之后生成的内容生效，已有内容保持原样。</div>
            </div></details><details id="rp-settings-auto-translation" class="rp-settings-detail"><summary class="rp-settings-item"><span class="rp-settings-copy"><span class="rp-settings-label">一键翻译</span><span class="rp-settings-hint">好友消息与朋友圈自动翻成中文</span></span><span class="rp-settings-chevron" aria-hidden="true">›</span></summary><div class="rp-settings-panel">
              <label class="rp-conv-check"><input type="checkbox" id="rp-auto-messages-enabled"><span>好友消息一键翻译</span></label>
              <label class="rp-conv-check"><input type="checkbox" id="rp-auto-moments-enabled"><span>朋友圈一键翻译</span></label>
              <p class="rp-feature-note">覆盖所有好友、群聊，以及朋友圈动态和评论。开启的项目会自动翻译已有及新收到的外语内容，跳过中文和纯表情，复用已有译文。使用当前翻译 API，可能产生费用；关闭手机时暂停，打开后继续。</p>
            </div></details><div id="rp-settings-bookmark-slot"></div><details id="rp-settings-blocklist" class="rp-settings-detail" ><summary class="rp-settings-item"><span class="rp-settings-copy"><span class="rp-settings-label">黑名单</span><span class="rp-settings-hint">管理不接收互动的角色</span></span><span class="rp-settings-chevron" aria-hidden="true">›</span></summary><div class="rp-settings-panel">
              <div class="rp-set-row" style="flex-direction:column;align-items:stretch;gap:8px">
                <div class="rp-set-hint" style="font-size:12px;color:#8a8a9a;line-height:1.4">拉黑后该角色不会出现在好友列表、不会发消息、不会在朋友圈互动。适用于多人卡场景。</div>
                <div style="display:flex;gap:6px;min-width:0">
                  <input id="rp-block-input" type="text" placeholder="输入角色名称..." style="flex:1;min-width:0;border-radius:8px;padding:6px 10px;font-size:13px;border:1px solid rgba(0,0,0,.12);outline:none;background:rgba(255,255,255,.7);color:#222" />
                  <button id="rp-block-add-btn" style="flex-shrink:0;border:none;border-radius:8px;padding:6px 12px;font-size:13px;font-weight:600;background:linear-gradient(135deg,#f472b6,#a855f7);color:#fff;cursor:pointer;white-space:nowrap">拉黑</button>
                </div>
                <div id="rp-block-list" style="display:flex;flex-wrap:wrap;gap:6px"></div>
              </div>
</div></details></div></section>
            <section class="rp-settings-group" aria-labelledby="rp-settings-data-title"><h3 id="rp-settings-data-title" class="rp-set-section-title">数据管理</h3><div class="rp-set-section"><div id="rp-settings-backup-slot"></div</div></section>
          </div>
        </div>

        <!-- 2048 游戏 -->
        <div id="rp-view-g2048" class="rp-view" style="display:none">
          <div class="rp-nav-bar">
            <button class="rp-back" data-to="home">‹</button>
            <span class="rp-nav-title">🎮 2048</span>
            <button id="g2048-newbtn">新局</button>
          </div>
          <div class="rp-game-partner-bar">当前搭子：<span class="rp-game-partner-name" id="g2048-partner-name">对方</span><button class="rp-game-partner-change" type="button">更换</button></div>
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
          <div id="g2048-api-tip">⚡ 请在API功能中更换国产模型,以提升回复速度。</div>
          <div id="g2048-chat-hint">点击展开 ↗</div>
          <div id="g2048-chat"></div>
          <div id="g2048-input-row">
            <input id="g2048-input" type="text" placeholder="游戏中聊天..." autocomplete="off"/>
            <button id="g2048-send" type="button">↑</button>
          </div>
          <!-- 2048 fullscreen chat -->
          <div id="g2048-chat-fs" style="display:none">
            <div id="g2048-chat-fs-hd" class="rp-game-chat-header">
              <span id="g2048-chat-fs-title">💬 聊天记录</span>
              <button id="g2048-chat-fs-close" class="rp-game-chat-close" type="button" aria-label="关闭聊天记录">✕</button>
            </div>
            <div id="g2048-chat-fs-body" class="rp-game-chat-body"></div>
          </div>
          <div id="g2048-over">
            <div class="g2048-over-emoji" id="g2048-over-emoji">🎉</div>
            <div class="g2048-over-title" id="g2048-over-title">达成2048!</div>
            <div class="g2048-over-sub" id="g2048-over-sub">你们合力完成了!</div>
            <div id="g2048-over-btns" style="display:flex;gap:10px;margin-top:6px">
              <button class="g2048-over-btn" id="g2048-continue" style="background:rgba(255,255,255,.18);border:1px solid rgba(255,255,255,.5)">继续挑战</button>
              <button class="g2048-over-btn" id="g2048-restart">再来一局</button>
              <button class="g2048-over-btn" id="g2048-quit" style="background:rgba(0,0,0,.25);border:1px solid rgba(255,255,255,.25)">退出</button>
            </div>
          </div>
        </div>

        <!-- 黄金矿工 -->
        <div id="rp-view-ggold" class="rp-view" style="display:none">
          <div class="rp-nav-bar">
            <button class="rp-back" data-to="home">‹</button>
            <span class="rp-nav-title">⛏️ 黄金矿工</span>
            <button id="ggold-newbtn" style="font-size:12px;font-weight:600">新局</button>
          </div>
          <div class="rp-game-partner-bar">当前搭子：<span class="rp-game-partner-name" id="ggold-partner-name">对方</span><button class="rp-game-partner-change" type="button">更换</button></div>
          <div id="ggold-header">
            <div class="ggold-score-box"><div class="ggold-score-lbl" id="ggold-u-lbl">你</div><div class="ggold-score-val" id="ggold-u-score">0</div></div>
            <div id="ggold-round-info">第1轮 / 共3轮</div>
            <div class="ggold-score-box"><div class="ggold-score-lbl" id="ggold-c-lbl">对方</div><div class="ggold-score-val" id="ggold-c-score">0</div></div>
          </div>
          <div id="ggold-timer-wrap"><div id="ggold-timer-bg"><div id="ggold-timer-bar"></div></div></div>
          <div id="ggold-coop-bar"><div id="ggold-coop-label">合作目标：0 / 1000</div><div id="ggold-coop-progress-bg"><div id="ggold-coop-progress-fill" style="width:0%"></div></div></div>
          <div id="ggold-canvas-wrap"><canvas id="ggold-canvas" width="270" height="190"></canvas></div>
          <div id="ggold-action-row">
            <div id="ggold-turn-badge">你的回合</div>
            <button id="ggold-launch-btn" type="button">🪝 放钩！</button>
          </div>
          <div id="ggold-chat-hint">点击展开 ↗</div>
          <div id="ggold-chat"></div>
          <div id="ggold-input-row">
            <input id="ggold-input" type="text" placeholder="游戏中聊天..." autocomplete="off"/>
            <button id="ggold-send" type="button">↑</button>
          </div>
          <div id="ggold-chat-fs" style="display:none">
            <div id="ggold-chat-fs-header" class="rp-game-chat-header"><span>💬 聊天记录</span><button id="ggold-chat-fs-close" class="rp-game-chat-close" type="button" aria-label="关闭聊天记录">✕</button></div>
            <div id="ggold-chat-fs-body" class="rp-game-chat-body" style="flex:1;overflow-y:auto"></div>
          </div>
          <div id="ggold-over" style="display:none">
            <div class="ggold-over-emoji" id="ggold-over-emoji">🏆</div>
            <div class="ggold-over-title" id="ggold-over-title">游戏结束</div>
            <div class="ggold-over-sub" id="ggold-over-sub"></div>
            <button class="ggold-over-btn" id="ggold-replay-btn" type="button">再来一局</button>
            <button class="ggold-over-btn" id="ggold-reset-tower-btn" type="button" style="display:none;background:linear-gradient(135deg,#6366f1,#4338ca)">重置爬塔</button>
          </div>
          <div id="ggold-mode-select" role="region" aria-labelledby="ggold-mode-heading">
            <img class="rp-gold-art rp-gold-hero" data-gold-art="hero" alt="" width="1536" height="1024" decoding="async" referrerpolicy="no-referrer" hidden>
            <img class="rp-gold-art" data-gold-art="paper" alt="" style="display:none!important" referrerpolicy="no-referrer" hidden>
            <div class="ggold-mode-intro">
              <h2 class="ggold-mode-title" id="ggold-mode-heading">选择游戏模式</h2>
              <span class="rp-gold-mode-divider" aria-hidden="true">✦</span>
              <p class="ggold-mode-sub">和搭子一起，开一局。</p>
            </div>
            <button class="ggold-mode-btn" id="ggold-mode-vs" type="button"><img class="rp-gold-art" data-gold-art="vs" alt="" width="88" height="84" decoding="async" referrerpolicy="no-referrer" hidden><span class="ggold-mode-mark" aria-hidden="true">01</span><span class="ggold-mode-copy"><span class="ggold-mode-top"><span class="ggold-mode-name">竞技模式</span></span><span class="ggold-mode-desc">轮流挖矿，3轮比总分</span></span><span class="ggold-mode-enter" aria-hidden="true">›</span></button>
            <button class="ggold-mode-btn" id="ggold-mode-co" type="button"><img class="rp-gold-art" data-gold-art="coop" alt="" width="88" height="84" decoding="async" referrerpolicy="no-referrer" hidden><span class="ggold-mode-mark" aria-hidden="true">02</span><span class="ggold-mode-copy"><span class="ggold-mode-top"><span class="ggold-mode-name">合作模式</span></span><span class="ggold-mode-desc">共同达标，再挑战下一层</span></span><span class="ggold-mode-enter" aria-hidden="true">›</span></button>
          </div>
        </div>
        <!-- 你说我猜 -->
        <div id="rp-view-gword" class="rp-view" style="display:none">
          <div class="rp-nav-bar">
            <button class="rp-back" data-to="home">‹</button>
            <span class="rp-nav-title">🎯 你说我猜</span>
            <button id="gword-newbtn" style="font-size:12px;font-weight:600">新局</button>
          </div>
          <div class="rp-game-partner-bar">当前搭子：<span class="rp-game-partner-name" id="gword-partner-name">对方</span><button class="rp-game-partner-change" type="button">更换</button></div>
          <div id="gword-header">
            <div id="gword-category-badge">分类：--</div>
            <button id="gword-giveup-btn" type="button">🏳️</button>
            <div id="gword-round-info">第0轮</div>
          </div>
          <div id="gword-status"></div>
          <div id="gword-hint-feedback" role="status" aria-live="polite" style="display:none">
            <span id="gword-hint-message"></span><button id="gword-retry-hint" type="button">重试提示</button>
          </div>
          <div id="gword-chat-hint">点击展开 ↗</div>
          <div id="gword-chat"></div>
          <div id="gword-input-row">
            <input id="gword-input" type="text" placeholder="输入你的猜测..." autocomplete="off"/>
            <button id="gword-send" type="button">↑</button>
          </div>
          <div id="gword-chat-fs" style="display:none">
            <div id="gword-chat-fs-hd" class="rp-game-chat-header">
              <span id="gword-chat-fs-title">💬 聊天记录</span>
              <button id="gword-chat-fs-close" class="rp-game-chat-close" type="button" aria-label="关闭聊天记录">✕</button>
            </div>
            <div id="gword-chat-fs-body" class="rp-game-chat-body"></div>
          </div>
          <div id="gword-over" style="display:none">
            <div class="gword-over-emoji" id="gword-over-emoji">🎉</div>
            <div class="gword-over-title" id="gword-over-title">猜对了!</div>
            <div class="gword-over-sub" id="gword-over-sub"></div>
            <div id="gword-over-btns" style="display:flex;gap:10px;margin-top:6px">
              <button class="gword-over-btn" id="gword-next">下一题</button>
              <button class="gword-over-btn" id="gword-quit" style="background:rgba(0,0,0,.25);border:1px solid rgba(255,255,255,.25)">不玩啦</button>
            </div>
          </div>
          <div id="gword-mode-select" role="region" aria-labelledby="rp-word-mode-heading">
            <img class="rp-word-art rp-word-hero" data-word-art="hero" alt="" width="1536" height="1024" decoding="async" referrerpolicy="no-referrer" hidden>
            <img class="rp-word-art" data-word-art="paper" alt="" style="display:none!important" referrerpolicy="no-referrer" hidden>
            <div class="rp-mode-intro">
              <h2 class="rp-mode-title" id="rp-word-mode-heading">谁来描述，谁来猜</h2>
              <span class="rp-word-mode-divider" aria-hidden="true">✦</span>
              <p class="rp-mode-sub">选一种玩法，交换彼此的灵感</p>
            </div>
            <button class="gword-mode-btn rp-mode-btn" id="gword-mode-char" type="button"><img class="rp-word-art" data-word-art="guess" alt="" width="88" height="84" decoding="async" referrerpolicy="no-referrer" hidden><span class="rp-mode-mark" aria-hidden="true">01</span><span class="rp-mode-copy"><span class="rp-mode-name">你说我猜</span><span class="rp-mode-desc">角色给提示，你来猜答案</span></span><span class="rp-mode-enter" aria-hidden="true">›</span></button>
            <button class="gword-mode-btn rp-mode-btn" id="gword-mode-user" type="button"><img class="rp-word-art" data-word-art="describe" alt="" width="88" height="84" decoding="async" referrerpolicy="no-referrer" hidden><span class="rp-mode-mark" aria-hidden="true">02</span><span class="rp-mode-copy"><span class="rp-mode-name">我说你猜</span><span class="rp-mode-desc">你来描述，让角色猜答案</span></span><span class="rp-mode-enter" aria-hidden="true">›</span></button>
          </div>
        </div>
        <!-- 飞行棋 -->
        <div id="rp-view-game" class="rp-view" style="display:none">
          <div class="rp-nav-bar">
            <button class="rp-back" data-to="home">‹</button>
            <span class="rp-nav-title">🎲 飞行棋</span>
            <span></span>
          </div>
          <div class="rp-game-partner-bar">当前搭子：<span class="rp-game-partner-name" id="rp-game-partner-name">对方</span><button class="rp-game-partner-change" type="button">更换</button></div>
          <div id="rp-game-board-wrap">
            <canvas id="rp-ludo-canvas" width="240" height="240"></canvas>
          </div>
          <div id="rp-game-controls">
            <div class="rp-game-info">
              <div class="rp-game-players"><span style="color:#ec4899">●</span> 你 vs <span style="color:#7c3aed">●</span> <span id="rp-game-char-name">对方</span></div>
              <div class="rp-game-status" id="rp-game-status-text">按骰子开始!</div>
            </div>
            <button id="rp-dice-btn" type="button" title="掷骰子">🎲</button>
            <button id="rp-newboard-btn" type="button" title="换棋盘" style="width:auto;height:28px;border-radius:14px;background:linear-gradient(145deg,#818cf8,#c084fc);border:none;color:#fff;font-size:11px;cursor:pointer;box-shadow:0 2px 8px rgba(129,140,248,.3);flex-shrink:0;padding:0 10px;letter-spacing:0.5px">换图</button>
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
              <div class="game-win-title" id="game-win-title">恭喜你赢了!</div>
              <div class="game-win-sub" id="game-win-sub">你率先抵达终点,赢得了这场飞行棋!</div>
              <button class="game-win-btn" id="game-restart-btn" type="button">再来一局</button>
            </div>
          </div>
          <div id="rp-ludo-spicy" role="region" aria-labelledby="rp-ludo-mode-heading">
            <img class="rp-ludo-art rp-ludo-hero" data-ludo-art="hero" alt="" width="1536" height="1024" decoding="async" referrerpolicy="no-referrer" hidden>
            <img class="rp-ludo-art" data-ludo-art="paper" alt="" style="display:none!important" referrerpolicy="no-referrer" hidden>
            <div class="rp-mode-intro">
              <h2 class="rp-mode-title" id="rp-ludo-mode-heading">选择今晚的尺度</h2>
              <span class="rp-ludo-mode-divider" aria-hidden="true">✦</span>
              <p class="rp-mode-sub">任务会根据选择随机生成</p>
            </div>
            <button class="rp-spicy-btn rp-mode-btn" data-spicy="1" type="button"><img class="rp-ludo-art" data-ludo-art="gentle" alt="" width="68" height="64" decoding="async" referrerpolicy="no-referrer" hidden><span class="rp-mode-mark" aria-hidden="true">01</span><span class="rp-mode-copy"><span class="rp-mode-name">清纯版</span><span class="rp-mode-desc">轻松互动，慢慢靠近</span></span><span class="rp-mode-enter" aria-hidden="true">›</span></button>
            <button class="rp-spicy-btn rp-mode-btn" data-spicy="2" type="button"><img class="rp-ludo-art" data-ludo-art="classic" alt="" width="68" height="64" decoding="async" referrerpolicy="no-referrer" hidden><span class="rp-mode-mark" aria-hidden="true">02</span><span class="rp-mode-copy"><span class="rp-mode-name">普通版</span><span class="rp-mode-desc">多一点心动与默契</span></span><span class="rp-mode-enter" aria-hidden="true">›</span></button>
            <button class="rp-spicy-btn rp-mode-btn" data-spicy="3" type="button"><img class="rp-ludo-art" data-ludo-art="bold" alt="" width="68" height="64" decoding="async" referrerpolicy="no-referrer" hidden><span class="rp-mode-mark" aria-hidden="true">03</span><span class="rp-mode-copy"><span class="rp-mode-name">大胆版</span><span class="rp-mode-desc">更大胆的互动挑战</span></span><span class="rp-mode-enter" aria-hidden="true">›</span></button>
          </div>
          <!-- API 设置面板 -->
          <div id="rp-api-panel" style="display:none">
            <div id="rp-api-box">
              <div class="rp-api-title">API 设置</div>
              <div class="rp-api-desc">选择已存配置，或新增一套接口。</div>
              <div class="rp-api-mode-switch"><label class="rp-api-opt"><input type="radio" name="rp-api-mode" value="st" id="rp-api-mode-st" checked> 酒馆主楼 API</label><label class="rp-api-opt"><input type="radio" name="rp-api-mode" value="custom" id="rp-api-mode-custom"> 自定义 API</label></div>
              <div id="rp-api-custom-fields" style="display:none">
                ${rpApiProfileControlsHtml('')}


                <input class="rp-api-input" id="rp-api-url" placeholder="API 地址 (如 https://api.deepseek.com/v1)" type="url">
                <input class="rp-api-input" id="rp-api-key" placeholder="API Key" type="password">
                <input class="rp-api-input" id="rp-api-model" placeholder="模型名称 (如 deepseek-chat)">
                <details class="rp-api-secondary rp-api-service-presets"><summary>常用服务快捷填入</summary><div class="rp-api-secondary-body"><div class="rp-api-presets">
                  <button class="rp-api-preset-btn" data-url="https://api.deepseek.com/v1" data-model="deepseek-chat">DeepSeek</button>
                  <button class="rp-api-preset-btn" data-url="https://api.moonshot.cn/v1" data-model="kimi-k2.6">Kimi</button>
                  <button class="rp-api-preset-btn" data-url="https://ark.cn-beijing.volces.com/api/v3" data-model="">豆包·火山方舟</button>
                  <button class="rp-api-preset-btn" data-url="https://dashscope.aliyuncs.com/compatible-mode/v1" data-model="qwen-plus">通义千问</button>
                  <button class="rp-api-preset-btn" data-url="https://open.bigmodel.cn/api/paas/v4" data-model="glm-4-flash">智谱 GLM</button>
                  <button class="rp-api-preset-btn" data-url="https://api.minimax.cn/v1" data-model="MiniMax-M3">MiniMax</button>
                  <button class="rp-api-preset-btn" data-url="" data-model="">其他 OpenAI</button>
                </div></div></details>
                ${rpApiProfileControlsHtml('','manage')}
                <div style="font-size:11px;color:#9070b0;line-height:1.6;margin-bottom:8px">隐私提示：此端点会收到该功能所需的角色人设、世界书片段、相关聊天或手机内容；Key 仍保存在本浏览器。请只使用可信服务，非本机地址建议使用 HTTPS。</div>
                <div id="rp-api-provider-note" class="rp-set-hint" style="display:none;line-height:1.6"></div>
              </div>
              <div id="rp-api-status" role="status" aria-live="polite" style="font-size:11px;line-height:1.5;max-height:52px;overflow-y:auto;overflow-wrap:anywhere"></div>
              <div class="rp-api-save-row">
                <button class="rp-api-save-btn" id="rp-api-save">保存并使用</button>
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
            <div id="rp-game-chat-fs-header" class="rp-game-chat-header">
              <span id="rp-game-chat-fs-title">💬 游戏聊天记录</span>
              <button id="rp-game-chat-fs-close" class="rp-game-chat-close" type="button" aria-label="关闭聊天记录">✕</button>
            </div>
            <div id="rp-game-chat-fs-body" class="rp-game-chat-body"></div>
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
            <div class="rp-folder-item" data-folder-app="ggold">
              <div class="rp-folder-item-ico rp-folder-game-gold">
                <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="20" y1="4" x2="20" y2="13" stroke-width="2"/>
                  <path d="M8 13 Q20 22 32 13" stroke-width="2" fill="none"/>
                  <line x1="20" y1="13" x2="20" y2="28" stroke-width="1.8" stroke-dasharray="2 1"/>
                  <circle cx="20" cy="31" r="4" fill="currentColor" stroke="none" opacity=".85"/>
                  <circle cx="13" cy="26" r="2.5" fill="currentColor" stroke="none" opacity=".55"/>
                  <circle cx="28" cy="24" r="3" fill="currentColor" stroke="none" opacity=".65"/>
                </svg>
              </div>
              <div class="rp-folder-item-lbl">黄金矿工</div>
            </div>
            <div class="rp-folder-item" data-folder-app="gword">
              <div class="rp-folder-item-ico rp-folder-game-word">
                <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="8" y="8" width="24" height="24" rx="5" stroke-width="2"></rect>
                  <text x="20" y="24" text-anchor="middle" font-size="14" font-weight="700" fill="currentColor" stroke="none">？</text>
                </svg>
              </div>
              <div class="rp-folder-item-lbl">你说我猜</div>
            </div>
          </div>
        </div>
        <!-- 添加好友弹窗(位于 #rp-screen 内部) -->
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
        <div id="rp-group-members-modal" style="display:none"></div>
        <div id="rp-game-partner-modal" style="display:none">
          <div class="rp-game-partner-sheet">
            <div class="rp-game-partner-title">更换游戏搭子</div>
            <div class="rp-game-partner-sub">当前窗口内的四个小游戏会统一使用这个角色</div>
            <div class="rp-game-partner-field">
              <div class="rp-game-partner-label">角色名</div>
              <input id="rp-game-partner-name-input" type="text" maxlength="32" placeholder="请输入准确的角色名" autocomplete="off"/>
            </div>
            <div class="rp-game-partner-field">
              <div class="rp-game-partner-label">人设补充（可选）</div>
              <textarea id="rp-game-partner-note-input" maxlength="600" placeholder="会自动读取人设；如果觉得读取不准，可以在这里手动补充一小段。"></textarea>
              <div class="rp-game-partner-help">留空则只使用自动读取的人设。</div>
            </div>
            <div class="rp-game-partner-actions">
              <button id="rp-game-partner-cancel" type="button">取消</button>
              <button id="rp-game-partner-save" type="button">保存</button>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</div>
`;
return HTML;
}
