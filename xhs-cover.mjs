// Deterministic, local text covers. Models supply data, never HTML/CSS/SVG.
export const XHS_DESIGN_VERSION = 1;
export const XHS_TEMPLATES = ['quote', 'note', 'question', 'bubble'];
const SANS = '"PingFang SC","Microsoft YaHei",sans-serif';
const HAND = '"Kaiti SC","STKaiti","KaiTi","PingFang SC",serif';
const PALETTES = {
  cocoa: { bg: '#807369', ink: '#fffdf8', accent: '#80c94b' },
  ink: { bg: '#414a51', ink: '#fffdf8', accent: '#edce64' },
  paper: { bg: '#faf8f4', ink: '#79481f', accent: '#99c768' },
  cream: { bg: '#fffbed', ink: '#603b22', accent: '#8dcddc' },
  blue: { bg: '#edf6f8', ink: '#294b55', accent: '#eed06a' },
  white: { bg: '#ffffff', ink: '#191919', accent: '#161616' },
};
const DEFAULT_PALETTE = { quote: 'cocoa', note: 'paper', question: 'cream', bubble: 'white' };
const ALLOWED_PALETTES = { quote: ['cocoa', 'ink'], note: ['paper', 'blue'], question: ['cream', 'blue'], bubble: ['white'] };
const clean = (value, limit) => Array.from(typeof value === 'string' ? value.replace(/[\u0000-\u001f]/g, ' ').replace(/\s+/g, ' ').trim() : '').slice(0, limit).join('');
const escape = value => String(value).replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[ch]);
function hash(value) { let n = 2166136261; for (const ch of String(value)) n = Math.imul(n ^ ch.codePointAt(0), 16777619); return n >>> 0; }

export function normalizeXHSCover(post = {}) {
  const source = post.coverDesign && typeof post.coverDesign === 'object' && !Array.isArray(post.coverDesign) ? post.coverDesign : {};
  const seed = hash(post.id || post.title || post.body || 'note');
  const template = XHS_TEMPLATES.includes(source.template) ? source.template : XHS_TEMPLATES[seed % XHS_TEMPLATES.length];
  const palette = ALLOWED_PALETTES[template].includes(source.palette) ? source.palette : DEFAULT_PALETTE[template];
  const headline = clean(source.headline, 72) || clean(post.title, 72) || clean(post.body, 72) || '今日分享';
  const highlight = clean(source.highlight, 12);
  const requestedRatio = source.ratio || post.coverRatio;
  const ratio = ['3/4', '1/1', '4/3'].includes(requestedRatio) ? requestedRatio : seed % 5 === 0 ? '1/1' : '3/4';
  return { version: XHS_DESIGN_VERSION, template, palette, headline, highlight: highlight && headline.includes(highlight) ? highlight : '', ratio };
}

let canvasContext;
function browserMeasure(text, size, family) {
  if (canvasContext === undefined) {
    canvasContext = null;
    try { canvasContext = globalThis.document?.createElement('canvas').getContext('2d') || null; } catch(e) {}
  }
  if (canvasContext) {
    canvasContext.font = `700 ${size}px ${family}`;
    return canvasContext.measureText(text).width;
  }
  // Non-browser tests/export can supply exact metrics; conservative fallback.
  return Array.from(text).reduce((sum, ch) => sum + (/[\u0000-\u007f]/.test(ch) ? 0.6 : 1), 0) * size;
}

export function wrapXHSText(text, size, maxWidth, measure = browserMeasure, family = SANS) {
  // Keep English words intact unless a single word exceeds the whole line.
  const tokens = typeof Intl.Segmenter === 'function'
    ? Array.from(new Intl.Segmenter('zh', { granularity: 'word' }).segment(String(text)), part => part.segment)
    : String(text).match(/[A-Za-z0-9]+(?:[’'._-][A-Za-z0-9]+)*|\s+|[^\x00-\x7f]|./gu) || [];
  const lines = [];
  let line = '';
  const append = token => {
    if (!line && /^\s+$/.test(token)) return;
    const width = measure(line + token, size, family);
    if (line && width > maxWidth) {
      // Chinese closing punctuation belongs to the preceding phrase. Make
      // room by moving the last character, not by overflowing the safe zone.
      const chars = Array.from(line);
      const last = chars.at(-1);
      const closingPunctuation = /^[，。！？、；：）》」』】]$/.test(token);
      const hangingPrefix = /[不没别未在把给让去]$/.test(line) && measure(last + token, size, family) <= maxWidth;
      if ((closingPunctuation || hangingPrefix) && chars.length > 1) {
        chars.pop();
        lines.push(chars.join('').trimEnd()); line = last + token;
      } else { lines.push(line.trimEnd()); line = token.trimStart(); }
    } else line += token;
  };
  for (const token of tokens) {
    if (measure(token, size, family) > maxWidth) for (const ch of token) append(ch);
    else append(token);
  }
  if (line.trim()) lines.push(line.trim());
  return lines.length ? lines : ['今日分享'];
}

export function layoutXHSCover(design, measure = browserMeasure) {
  const height = design.ratio === '1/1' ? 600 : design.ratio === '4/3' ? 450 : 800;
  const bubble = design.template === 'bubble';
  const family = design.template === 'note' ? HAND : SANS;
  const maxWidth = bubble ? 426 : 480;
  const availableHeight = bubble ? height * 0.48 : height * 0.65;
  const preferred = design.template === 'note' ? 68 : bubble ? 70 : 80;
  let size = preferred, lines;
  for (; size >= 26; size -= 2) {
    lines = wrapXHSText(design.headline, size, maxWidth, measure, family);
    if (lines.length * size * 1.38 <= availableHeight && lines.every(line => measure(line, size, family) <= maxWidth)) break;
  }
  size = Math.max(26, size);
  lines = wrapXHSText(design.headline, size, maxWidth, measure, family);
  const leading = size * 1.38;
  const center = bubble ? height * 0.35 : height * 0.50;
  const y = Math.max(size + 72, center - (lines.length - 1) * leading / 2);
  return { width: 600, height, size, lines, leading, y, family, maxWidth, x: bubble ? 300 : 60, anchor: bubble ? 'middle' : 'start' };
}

function doodles(design, palette, height) {
  if (design.template === 'quote') return `<text x="56" y="155" fill="${palette.ink}" opacity=".35" font-family="Georgia,serif" font-size="170">“</text><path d="M490 ${height - 70}h36" stroke="${palette.ink}" opacity=".38" stroke-width="9"/>`;
  if (design.template === 'note') return `<text x="58" y="103" fill="${palette.ink}" font-size="80" font-family="Georgia,serif">“</text><text x="482" y="${height - 44}" fill="${palette.ink}" font-size="78" font-family="Georgia,serif">”</text>`;
  if (design.template === 'question') return `<text x="448" y="${height - 35}" fill="#ed786e" font-size="145" font-weight="900" transform="rotate(9 470 ${height - 100})">?</text><path d="M30 85Q200 5 325 115T590 100" fill="none" stroke="${palette.ink}" opacity=".035" stroke-width="48"/>`;
  const bottom = height * 0.68;
  return `<path d="M62 110Q85 52 310 66Q529 61 548 144Q571 ${bottom - 85} 490 ${bottom - 25}Q302 ${bottom + 26} 176 ${bottom - 6}L66 ${bottom + 63}L93 ${bottom - 44}Q29 ${bottom - 66} 62 110Z" fill="none" stroke="${palette.ink}" stroke-width="5" stroke-linejoin="round"/><g transform="translate(78 ${height - 128})" fill="none" stroke="${palette.ink}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"><path d="M0 78L2 9L22 26L46 19L63 2L67 75M4 49Q36 79 66 44M18 43l3 2M48 40l3 2M32 55l7 1M31 30l1-11M42 30l1-11"/></g>`;
}

export function renderXHSCover(post, options = {}) {
  const design = normalizeXHSCover(post);
  const measure = options.measure || browserMeasure;
  const layout = layoutXHSCover(design, measure);
  const palette = PALETTES[design.palette];
  const strokes = [];
  const text = layout.lines.map((line, i) => {
    const y = layout.y + i * layout.leading;
    const index = design.highlight ? line.indexOf(design.highlight) : -1;
    if (index >= 0 && design.template !== 'bubble') {
      const x = layout.x + measure(line.slice(0, index), layout.size, layout.family);
      const width = measure(design.highlight, layout.size, layout.family);
      if (design.template === 'question') strokes.push(`<rect x="${x - 5}" y="${y - layout.size * 0.88}" width="${width + 10}" height="${layout.size * 1.06}" rx="${layout.size * 0.48}" fill="${palette.accent}" opacity=".75"/>`);
      else strokes.push(`<path d="M${x} ${y + 5}Q${x + width / 2} ${y + 1} ${x + width} ${y + 7}" stroke="${palette.accent}" stroke-width="${layout.size * 0.17}" fill="none" stroke-linecap="round"/>`);
    }
    return `<tspan x="${layout.x}" y="${y}">${escape(line)}</tspan>`;
  }).join('');
  return `<svg class="rp-xhs-design-cover" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 ${layout.height}" role="img" aria-label="${escape(design.headline)}" data-template="${design.template}" data-cover-version="${design.version}" style="aspect-ratio:${design.ratio}"><rect width="600" height="${layout.height}" fill="${palette.bg}"/>${doodles(design, palette, layout.height)}${strokes.join('')}<text class="rp-xhs-cover-title" fill="${palette.ink}" font-family="${escape(layout.family)}" font-size="${layout.size}" font-weight="700" text-anchor="${layout.anchor}">${text}</text></svg>`;
}

// Explicit component classes replace the historical child-index selectors.
export const XHS_COVER_CSS = String.raw`
#rp-phone #rp-view-xhs{--rp-xhs-bg:#f7f7f7;--rp-xhs-card:#fff;--rp-xhs-text:#222;--rp-xhs-text-soft:#777;background:var(--rp-xhs-bg)!important}
#rp-phone.rp-theme-star #rp-view-xhs,#rp-phone.rp-dark #rp-view-xhs{--rp-xhs-bg:#17151d;--rp-xhs-card:#24212b;--rp-xhs-text:#f4f0f7;--rp-xhs-text-soft:#b8b1c2}
#rp-phone #rp-view-xhs .rp-nav-bar{background:var(--rp-xhs-card)!important;border:0!important;height:92px;min-height:92px;padding:46px 7px 0!important;display:grid;grid-template-columns:32px 1fr 65px}
#rp-phone #rp-view-xhs .rp-nav-title{font-size:15px!important;font-weight:700!important;color:var(--rp-xhs-text)!important;position:relative;left:auto;right:auto;height:40px;display:flex;align-items:center;justify-content:center}
#rp-phone #rp-view-xhs .rp-nav-title::after{content:"";position:absolute;bottom:3px;left:50%;width:25px;height:3px;transform:translateX(-50%);border-radius:4px;background:#ff2442}
#rp-phone #rp-view-xhs .rp-back,#rp-phone #rp-view-xhs #rp-xhs-refresh{color:var(--rp-xhs-text)!important}
#rp-phone #rp-xhs-list.rp-xhs-waterfall{display:flex!important;align-items:flex-start!important;gap:6px!important;padding:6px 6px 12px!important;background:var(--rp-xhs-bg)!important;position:relative;box-sizing:border-box}
#rp-phone #rp-xhs-list .rp-xhs-col{flex:1 1 0;min-width:0;display:flex;flex-direction:column;gap:6px!important}
#rp-phone #rp-xhs-list .rp-xhs-note-card{background:var(--rp-xhs-card)!important;border:0!important;border-radius:6px!important;padding:0!important;margin:0!important;box-shadow:none!important;overflow:hidden;cursor:pointer;min-width:0}
#rp-phone .rp-xhs-design-cover{width:100%;height:auto;display:block;overflow:hidden;flex-shrink:0}
#rp-phone #rp-xhs-list .rp-xhs-card-content{padding:7px 7px 9px!important;min-width:0}
#rp-phone #rp-xhs-list .rp-xhs-card-title{font-size:12.5px;line-height:1.5;font-weight:600;color:var(--rp-xhs-text);display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2;overflow:hidden;overflow-wrap:break-word;margin-bottom:7px}
#rp-phone #rp-xhs-list .rp-xhs-card-meta{display:flex;align-items:center;gap:4px;min-width:0}
#rp-phone #rp-xhs-list .rp-xhs-card-author{flex:1;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-size:10px;color:var(--rp-xhs-text-soft)}
#rp-phone #rp-xhs-list .rp-xhs-card-likes{display:flex;align-items:center;gap:2px;flex-shrink:0;font-size:10px;color:var(--rp-xhs-text-soft)}
#rp-phone #rp-xhs-list .rp-xhs-card-likes.is-liked{color:#ff2442}
#rp-phone #rp-xhs-list .rp-xhs-heart{width:13px;height:13px;fill:none;stroke:currentColor;stroke-width:1.7}
#rp-phone #rp-xhs-list .is-liked .rp-xhs-heart{fill:currentColor}
#rp-phone #rp-xhs-list #rp-xhs-refresh-loading{position:absolute;top:8px;left:8px;right:8px;text-align:center;padding:12px;background:var(--rp-xhs-card)!important;color:var(--rp-xhs-text)!important;border:0!important;border-radius:8px;box-shadow:0 3px 14px #0000000a!important;font-size:12px!important;z-index:2;pointer-events:none}
#rp-phone #rp-xhs-list.rp-xhs-refreshing .rp-xhs-col{padding-top:65px}
#rp-phone #rp-view-xhs #rp-xhs-compose{color:#fff!important;background:#ff2442!important;border-radius:7px!important;font-size:21px!important;width:28px;height:25px;line-height:21px}
`;
