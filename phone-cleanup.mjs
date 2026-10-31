// Extracted from the existing entry; dependencies stay live through host getters.
export function createPhoneCleanup(phoneHost) {
function phoneCleanupProtocolView(raw) {
  // Keep offsets and line breaks while excluding inert HTML/Markdown examples.
  const source=String(raw||''),ranges=[];
  for(const match of source.matchAll(/<(script|style|pre|code|textarea)\b[^>]*>[\s\S]*?(?:<\/\1\s*>|$)|<!--[\s\S]*?(?:-->|$)/gi))ranges.push([match.index,match.index+match[0].length]);
  const fences=/(^|\n)[ \t]{0,3}(`{3,}|~{3,})([^\n]*)(?:\n|$)/g;let match;
  while((match=fences.exec(source))){
    if(match[2][0]==='`'&&match[3].includes('`'))continue;
    const close=new RegExp('(?:^|\\n)[ \\t]{0,3}'+match[2][0]+'{'+match[2].length+',}[ \\t]*(?=\\n|$)','g');close.lastIndex=fences.lastIndex;
    const end=close.exec(source),stop=end?end.index+end[0].length:source.length;
    ranges.push([match.index,stop]);fences.lastIndex=stop;
  }
  for(const code of source.matchAll(/(?<![\\`])(`+)(?!`)[\s\S]*?(?<!`)\1(?!`)/g))ranges.push([code.index,code.index+code[0].length]);
  const reasoning=Array.from(source.matchAll(/<(think|thinking)\b[^>]*>[\s\S]*?<\/\1\s*>/gi),match=>[match.index,match.index+match[0].length]);
  ranges.push(...reasoning);
  if(!ranges.length)return source;
  ranges.sort((a,b)=>a[0]-b[0]||b[1]-a[1]);
  const chars=source.split('');let end=-1;
  for(const[a,b]of ranges){if(a<end)continue;end=b;for(let i=a;i<b;i++)if(chars[i]!=='\n'&&chars[i]!=='\r')chars[i]=' ';}
  // Paired reasoning remains inert even when its opening overlaps a Markdown
  // code span. The generic overlap skip must not expose its PHONE examples.
  // Keep the existing code/HTML precedence for incomplete example tags.
  for(const[a,b]of reasoning)for(let i=a;i<b;i++)if(chars[i]!=='\n'&&chars[i]!=='\r')chars[i]=' ';
  return chars.join('');
}

function normalizePhoneCompareText(s) {
  return String(s || '')
    .replace(/&quot;|&#34;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&nbsp;/gi, ' ')
    .replace(/[\u200B-\u200D\uFEFF]/g, '')
    .replace(/[“”„‟＂]/g, '"')
    .replace(/[‘’‛＇]/g, "'")
    // 必须和 normalizePhoneCleanupText 保持同一套核心标点规范化。
    // cleanup item 已把中文逗号/句号等转成 ASCII；若这里不转，removePhoneEchoFragments()
    // 的 includes 预检查会在 DOM 原文仍是中文标点时直接失败，导致主楼残留完全删不掉。
    .replace(/[：﹕︰]/g, ':')
    .replace(/[；﹔]/g, ';')
    .replace(/[，､]/g, ',')
    .replace(/[。．]/g, '.')
    .replace(/[！]/g, '!')
    .replace(/[？]/g, '?')
    .replace(/[（]/g, '(')
    .replace(/[）]/g, ')')
    .replace(/(?:\.{3,}|…|⋯|·{3,}|•{3,}|。{3,})/g, '...')
    .replace(/\s+/g, ' ')
    .trim();
}

function buildLoosePhoneFragmentRegex(fragment) {
  const normalized = normalizePhoneCompareText(fragment);
  if (!normalized) return null;
  const looseLiteral = function(part) {
    return (0,phoneHost.escapeRegExp)(part)
      .replace(/\s\+/g, '\\s+')
      // cleanup/compare 会把中文标点规范成 ASCII；regex 真正落到 DOM 原文时必须同时匹配两边。
      .replace(/,/g, '[,，､]')
      .replace(/:/g, '[:：﹕︰]')
      .replace(/;/g, '[;；﹔]')
      .replace(/\\\./g, '[\\.。．]')
      .replace(/!/g, '[!！]')
      .replace(/\\\?/g, '[\\?？]')
      .replace(/\\\(/g, '[\\(（]')
      .replace(/\\\)/g, '[\\)）]');
  };
  const parts = normalized.split(/("|'|\.{3}|\s+)/).filter(Boolean).map(function(part) {
    if (/^\s+$/.test(part)) return '\\s+';
    if (part === '...') return '(?:\\.\\.\\.|…|⋯|·{3,}|•{3,}|。{3,})';
    if (part === '"') return '(?:"|&quot;|&#34;|“|”|„|‟|＂)';
    if (part === "'") return "(?:'|&#39;|&apos;|‘|’|‛|＇)";
    return looseLiteral(part);
  });
  if (!parts.length) return null;
  return new RegExp(parts.join(''), 'g');
}

function normalizePhoneCleanupText(s) {
  return String(s || '')
    .replace(/&quot;|&#34;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&nbsp;/gi, ' ')
    .replace(/[\u200B-\u200D\uFEFF]/g, '')
    .replace(/[“”„‟＂]/g, '"')
    .replace(/[‘’‛＇]/g, "'")
    .replace(/[：﹕︰]/g, ':')
    .replace(/[，､]/g, ',')
    .replace(/[。．]/g, '.')
    .replace(/[！]/g, '!')
    .replace(/[？]/g, '?')
    .replace(/[（]/g, '(')
    .replace(/[）]/g, ')')
    .replace(/(?:\.{3,}|…|⋯|·{3,}|•{3,}|。{3,})/g, '...')
    .replace(/\s+/g, ' ')
    .trim();
}

function compactPhoneCleanupText(s) {
  return normalizePhoneCleanupText(s)
    .replace(/["'「」『』《》〈〉【】\[\]()（）]/g, '')
    .replace(/[\s\u00a0\u3000]/g, '')
    .replace(/[,:;，。.!！？?、｜|\-—–_~～`·•…⋯]/g, '')
    .replace(/^🧧/, '')
    .trim();
}

function stripPhoneCleanupDecorations(s) {
  return normalizePhoneCleanupText(s)
    .replace(/^(?:📱\s*)?(?:手机(?:消息)?|群聊|朋友圈|评论|红包|语音|定位|位置|图片)(?:\s*[·:：-]\s*[^:：]*)?\s*/i, '')
    .replace(/^群聊\s*[·:：-]\s*[^:：]+\s*/, '')
    .replace(/^评论\s*/, '')
    .trim();
}

function uniquePhoneCleanupVariants(parts) {
  const out = [];
  const seen = new Set();
  (parts || []).forEach(function(part) {
    const v = normalizePhoneCleanupText(part);
    if (!v || seen.has(v)) return;
    seen.add(v);
    out.push(v);
    ['"', "'", '“', '「'].forEach(function(q) {
      const close = q === '“' ? '”' : (q === '「' ? '」' : q);
      const qv = normalizePhoneCleanupText(q + v + close);
      if (qv && !seen.has(qv)) { seen.add(qv); out.push(qv); }
    });
  });
  return out;
}

function makePhoneCleanupItem(kind, from, text, aux, display, extraVariants) {
  const variants = uniquePhoneCleanupVariants([display, text, aux].concat(extraVariants || []));
  return {
    kind: kind,
    from: normalizePhoneCleanupText(from),
    text: normalizePhoneCleanupText(text),
    aux: normalizePhoneCleanupText(aux),
    display: normalizePhoneCleanupText(display),
    variants: variants,
    compactVariants: variants.map(compactPhoneCleanupText).filter(Boolean),
  };
}

function collectPhoneCleanupItems(block) {
  const items = [];
  if (!block) return items;

  (0,phoneHost.extractSmsSummaries)(block).forEach(function(x) {
    items.push(makePhoneCleanupItem('sms', x.from, x.text, '', x.text, [x.from ? `${x.from}: ${x.text}` : '']));
  });

  (0,phoneHost.extractGroupSummaries)(block).forEach(function(x) {
    if (x.kind === 'gmsg') {
      items.push(makePhoneCleanupItem('group', x.from, x.text, x.group, x.from ? `${x.from}: ${x.text}` : x.text, [x.text, x.group ? `${x.group} ${x.from}: ${x.text}` : '']));
    } else if (x.kind === 'gvoice') {
      const main = [x.from ? `${x.from}:` : '', x.duration ? `🎤[${x.duration}]` : '🎤', x.text || ''].filter(Boolean).join(' ');
      items.push(makePhoneCleanupItem('voice', x.from, x.text, x.duration, main, [x.text, x.duration, `${x.from || ''}: ${x.text || ''}`, `${x.from || ''}: ${x.duration || ''} ${x.text || ''}`]));
    } else if (x.kind === 'ghongbao') {
      const hb = [x.amount ? `🧧${x.amount}` : '🧧红包', x.note].filter(Boolean).join(' ');
      items.push(makePhoneCleanupItem('hongbao', x.from, x.note, x.amount, x.from ? `${x.from}: ${hb}` : hb, [hb, [x.amount, x.note].filter(Boolean).join(' '), x.note, x.amount]));
    }
  });

  (0,phoneHost.extractMomentSummaries)(block).forEach(function(x) {
    items.push(makePhoneCleanupItem('moment', x.from, x.text, x.time, x.text, [x.from ? `${x.from}: ${x.text}` : '']));
  });

  (0,phoneHost.extractCommentSummaries)(block).forEach(function(x) {
    const display = x.from ? `${x.from}: ${x.text}` : x.text;
    const vars = [x.text];
    if (x.replyTo && x.from) vars.push(`${x.from} 回复 ${x.replyTo}: ${x.text}`, `${x.from} reply ${x.replyTo}: ${x.text}`);
    items.push(makePhoneCleanupItem('comment', x.from, x.text, x.replyTo || '', display, vars));
  });

  (0,phoneHost.extractDirectPhoneSummaries)(block).forEach(function(x) {
    if (x.kind === 'voice') {
      const main = [x.from ? `${x.from}:` : '', x.duration ? `🎤[${x.duration}]` : '🎤', x.text || ''].filter(Boolean).join(' ');
      items.push(makePhoneCleanupItem('voice', x.from, x.text, x.duration, main, [x.text, x.duration, `${x.from || ''}: ${x.text || ''}`, `${x.from || ''}: ${x.duration || ''} ${x.text || ''}`]));
    } else if (x.kind === 'hongbao') {
      const hb = [x.amount ? `🧧${x.amount}` : '🧧红包', x.note].filter(Boolean).join(' ');
      items.push(makePhoneCleanupItem('hongbao', x.from, x.note, x.amount, x.from ? `${x.from}: ${hb}` : hb, [hb, [x.amount, x.note].filter(Boolean).join(' '), x.note, x.amount]));
    } else if (x.kind === 'image') {
      if (!x.text) return;
      items.push(makePhoneCleanupItem('image', x.from, x.text, x.src || '', x.from ? `${x.from}: ${x.text}` : x.text, [x.text, `🖼️ ${x.text}`, x.from ? `${x.from}: 🖼️ ${x.text}` : '']));
    } else if (x.kind === 'location') {
      items.push(makePhoneCleanupItem('location', x.from, x.place, '', x.from ? `${x.from}: ${x.place}` : x.place, [x.place, `📍${x.place}`, x.from ? `${x.from}: 📍${x.place}` : '']));
    }
  });

  return items.filter(function(item) { return item.variants && item.variants.length; });
}

function cleanupRenderedPhoneEchoResiduals(textEl, rawSource) {
  // Rendered summary text alone cannot authorize deletion of equal text elsewhere.
  if (!textEl || typeof rawSource !== 'string' || !rawSource) return false;
  const scope=createPhoneCleanupScope(textEl,rawSource);
  return scope.sourceParts?scope.remove(['literal','body','author','noise']):false;
}

function installPhoneCleanupSourceMarkers() {
  try {
    const formatter=(0,phoneHost.getContext)()?.messageFormatter;
    if(!formatter?.addHook||!formatter.stage?.AFTER_MARKDOWN)return false;
    const installed=installPhoneCleanupSourceMarkers.formatters ||= new WeakSet();
    if(installed.has(formatter))return true;
    formatter.addHook(markPhoneCleanupSourceHtml,{stage:formatter.stage.AFTER_MARKDOWN,order:formatter.order?.LATEST??100});
    installed.add(formatter);return true;
  } catch { return false; }
}

function markPhoneCleanupSourceHtml(html, meta = {}) {
  try {
    if(typeof html!=='string'||meta.isUser||meta.isSystem||meta.isReasoning||!/^\d+$/.test(String(meta.messageId??''))||!(0,phoneHost.isMochiPhoneEnabled)())return html;
    if(typeof phoneHost.rpRuntime!=='undefined'&&(phoneHost.rpRuntime.stats().destroyed||phoneHost.window.__mochiPhoneRuntime&&phoneHost.window.__mochiPhoneRuntime!==phoneHost.rpRuntime))return html;
    const message=(0,phoneHost.getContext)()?.chat?.[Number(meta.messageId)],raw=message?.mes;
    if(!message||message.is_user||typeof raw!=='string'||raw.length>200000)return html;
    const normalized=(0,phoneHost.normalizePhoneMarkup)(raw.replace(/<think>[\s\S]*?<\/think>/gi,''));
    if((0,phoneHost.hasUnclosedPhonePairedTag)(normalized)||!(0,phoneHost.hasBarePhoneTagsIn)(normalized))return html;
    const records=installPhoneCleanupSourceMarkers.records ||= new WeakMap();
    let record=records.get(message);
    if(!record||record.raw!==raw){record={raw,token:'mp-'+(phoneHost.window.crypto?.randomUUID?.()||Math.random().toString(36).slice(2))};records.set(message,record);}
    // Scan the inert-aware view, then splice the untouched original HTML. A
    // fake opening inside code must not consume a later real block's closing.
    const scan=phoneCleanupProtocolView(html),edits=[];
    const available=new Map();
    const sourceParts=phoneCleanupSourceParts(normalized).filter(p=>p.phone);
    for(const p of sourceParts){const tag=p.text.match(/^<([a-z]+)\b/i)?.[1]?.toUpperCase();if(tag)available.set(tag,(available.get(tag)||0)+1);}
    const tags=/<PHONE\b[^>]*>[\s\S]*?<\/PHONE\s*>|<(SMS|GMSG|GVOICE|SIMG|NOTIFY|CALL|VOICE|MOMENTS|COMMENT|SYNC|HONGBAO|GHONGBAO|mochiLOCATION|mochiLOC)\b[^>]*>[\s\S]*?<\/\1\s*>|<(?:SIMG|NOTIFY|CALL|SYNC|HONGBAO|GHONGBAO|mochiLOCATION|mochiLOC)\b[^>]*\/?>|&lt;PHONE\b[\s\S]*?&lt;\/PHONE\s*&gt;|&lt;(SMS|GMSG|GVOICE|SIMG|NOTIFY|CALL|VOICE|MOMENTS|COMMENT|SYNC|HONGBAO|GHONGBAO|mochiLOCATION|mochiLOC)\b[\s\S]*?&lt;\/\2\s*&gt;|&lt;(?:SIMG|NOTIFY|CALL|SYNC|HONGBAO|GHONGBAO|mochiLOCATION|mochiLOC)\b(?:(?!&gt;)[\s\S])*?&gt;/gi;
    if(available.size)(0,phoneHost.rpQueuePhoneRenderRepair)?.(Number(meta.messageId),message,raw);
    for(const found of scan.matchAll(tags)){
      const offset=found.index,match=html.slice(offset,offset+found[0].length);
      const tag=(0,phoneHost.normalizePhoneMarkup)(match).match(/^<([a-z]+)\b/i)?.[1]?.toUpperCase(),left=available.get(tag)||0;
      if(!left)continue;
      available.set(tag,left-1);edits.push({start:offset,end:offset+match.length});
    }
    let out='',cursor=0;
    for(const edit of edits){out+=html.slice(cursor,edit.start)+'<div data-rp-phone-source="'+record.token+'">'+html.slice(edit.start,edit.end)+'</div>';cursor=edit.end;}
    return out+html.slice(cursor);
  } catch { return html; }
}

function isPhoneCleanupSourceMarker(el, root, raw) {
  if(!el?.matches?.('[data-rp-phone-source]')||!root?.contains(el))return false;
  const mes=root.closest?.('.mes'),id=mes?.getAttribute('mesid');
  if(!/^\d+$/.test(id||'')||!phoneCleanupSourceMatches(root,raw))return false;
  const message=(0,phoneHost.getContext)()?.chat?.[Number(id)],record=message&&installPhoneCleanupSourceMarkers.records?.get(message);
  return !!record&&record.raw===message.mes&&el.dataset.rpPhoneSource===record.token;
}

function removePhoneSourceMarkedResidue(el) {
  // Clear only text proven to originate inside PHONE. Keep image/mount/control nodes,
  // their original ancestors and listeners, including still-empty async mount spans.
  const walker=phoneHost.document.createTreeWalker(el,phoneHost.NodeFilter.SHOW_TEXT),textNodes=[];
  while(walker.nextNode())textNodes.push(walker.currentNode);
  for(const node of textNodes){
    if(isPhoneCleanupProtectedNode(node)||node.parentElement?.closest('img,video,audio,button,iframe,canvas,svg,input,select,textarea'))continue;
    node.nodeValue='';
  }
  for(const node of Array.from(el.querySelectorAll('*')).reverse()){
    if(isPhoneCleanupProtectedNode(node)||hasPhoneCleanupMedia(node)||node.matches('input,select,textarea,form'))continue;
    if(/^(PHONE|SMS|SYNC|GMSG|GVOICE|GHONGBAO|SIMG|NOTIFY|CALL|VOICE|HONGBAO|MOMENTS|COMMENT|MOCHILOCATION|MOCHILOC)$/.test(node.tagName))node.replaceWith(...Array.from(node.childNodes));
    else if(/^(P|DIV|SPAN|BR|HR|EM|STRONG|B|I|U|S|DEL|SMALL|MARK|Q|BLOCKQUOTE|UL|OL|LI|A)$/.test(node.tagName)&&!node.textContent.trim()&&!node.querySelector('input,select,textarea,form'))node.remove();
  }
  el.replaceWith(...Array.from(el.childNodes));
}

function phoneCleanupSourceMatches(root, raw) {
  const mes=root?.closest?.('.mes');if(!mes)return true;
  const id=mes.getAttribute('mesid');if(!/^\d+$/.test(id||''))return false;
  const message=(0,phoneHost.getContext)()?.chat?.[Number(id)];if(!message||message.is_user)return false;
  const normalized=value=>(0,phoneHost.normalizePhoneMarkup)(String(value||'').replace(/<think>[\s\S]*?<\/think>/gi,'')).trim();
  return normalized(message.mes)===normalized(raw);
}

function isPhoneCleanupForeignNode(node, root) {
  let el = node && (node.nodeType === 1 ? node : node.parentElement);
  const plain = /^(P|DIV|SPAN|BR|HR|EM|STRONG|B|I|U|S|DEL|SMALL|MARK|Q|BLOCKQUOTE|UL|OL|LI|A|PHONE|SMS|SYNC|GMSG|GVOICE|GHONGBAO|SIMG|NOTIFY|CALL|VOICE|HONGBAO|MOMENTS|COMMENT|MOCHILOCATION|MOCHILOC)$/;
  const protocol = /^(PHONE|SMS|SYNC|GMSG|GVOICE|GHONGBAO|SIMG|NOTIFY|CALL|VOICE|HONGBAO|MOMENTS|COMMENT|MOCHILOCATION|MOCHILOC)$/;
  for (; el && el !== root; el = el.parentElement) {
    if(el.hasAttribute('data-rp-phone-source')){
      const id=root?.closest?.('.mes')?.getAttribute('mesid'),raw=/^\d+$/.test(id||'')?(0,phoneHost.getContext)()?.chat?.[Number(id)]?.mes:null;
      if(typeof raw!=='string'||!isPhoneCleanupSourceMarker(el,root,raw))return true;
    }
    if (isPhoneCleanupProtectedNode(el) || !plain.test(el.tagName || '')) return true;
    if (!protocol.test(el.tagName || '') && Array.from(el.attributes || []).some(a => /^(?:id|class|style|role|on\w+|data-.+)$/.test(a.name)&&!/^data-rp-/.test(a.name))) return true;
  }
  return !el;
}

function phoneCleanupSourceParts(raw) {
  const source = (0,phoneHost.normalizePhoneMarkup)(raw), view=phoneCleanupProtocolView(source), parts = [];
  const re = /<PHONE\b[^>]*>[\s\S]*?<\/PHONE\s*>|<(SMS|GMSG|GVOICE|SIMG|NOTIFY|CALL|VOICE|MOMENTS|COMMENT|SYNC|HONGBAO|GHONGBAO|mochiLOCATION|mochiLOC)\b[^>]*>[\s\S]*?<\/\1\s*>|<(?:SIMG|NOTIFY|CALL|SYNC|HONGBAO|GHONGBAO|mochiLOCATION|mochiLOC)\b[^>]*\/?>/gi;
  let m, end = 0;
  while ((m = re.exec(view))) {
    if (m.index > end) parts.push({phone:false, text:source.slice(end,m.index)});
    parts.push({phone:true, text:source.slice(m.index,re.lastIndex)});end = re.lastIndex;
  }
  if (end < source.length) parts.push({phone:false,text:source.slice(end)});
  return parts;
}

function phoneCleanupNarrativeChunks(raw, opaqueIslands = [], corpus = '') {
  // Detached parsing does not run card regexes, scripts or macros a second time.
  const template = phoneHost.document.createElement('template');
  // Reasoning is not rendered narrative and cannot be an outside-source anchor.
  const narrative=String(raw||'').replace(/<(think|thinking)\b[^>]*>[\s\S]*?<\/\1\s*>/gi,'\n');
  template.innerHTML = narrative.replace(/```[^\n]*\n[\s\S]*?```/g,'').replace(/`[^`\n]+`/g,'').replace(/!\[[^\]]*\]\([^)]*\)/g,'').replace(/\[([^\]]+)\]\([^)]*\)/g,'$1');
  let text = '';
  const plain = /^(P|DIV|SPAN|BR|HR|EM|STRONG|B|I|U|S|DEL|SMALL|MARK|Q|BLOCKQUOTE|UL|OL|LI|A)$/;
  function visit(node) {
    if (node.nodeType === 3) {text += node.nodeValue || '';return;}
    if (node.nodeType !== 1) return;
    if (!plain.test(node.tagName || '') || Array.from(node.attributes || []).some(a => /^(?:id|class|style|role|on\w+|data-.+)$/.test(a.name))) {
      if(/^(SCRIPT|STYLE|PRE|CODE)$/.test(node.tagName||'')){text+='\n';return;}
      const full=normalizePhoneCompareText(node.textContent||'');
      const parts=String(node.textContent||'').replace(/【[^：:】]+[：:]([^】]+)】/g,'\n$1\n').split(/\n+/).map(normalizePhoneCompareText).filter(Boolean);
      const occurs=value=>{const re=buildLoosePhoneFragmentRegex(value);if(!re)return false;let m;while((m=re.exec(corpus)))if(!m[0].includes('\0'))return true;return false;};
      const fullInPlain=full&&occurs(full),anyPartInPlain=parts.some(occurs);
      const consumed=!fullInPlain&&parts.length&&opaqueIslands.some(island=>{
        if(!parts.every(part=>island.text.includes(part)))return false;
        const sameId=node.id&&node.id===island.id;
        const classes=Array.from(node.classList||[]),sameClass=classes.length&&node.tagName===island.tag&&classes.every(c=>island.classes.includes(c));
        return sameId||sameClass||parts.length>1&&parts.some(part=>!occurs(part))||!anyPartInPlain;
      });
      // Unknown source tags remain narrative unless a real opaque component accounts for them.
      text+='\n'+(consumed?'':String(node.textContent||''))+'\n';return;
    }
    const block = /^(P|DIV|BR|HR|BLOCKQUOTE|UL|OL|LI)$/.test(node.tagName);
    if (block) text += '\n';
    Array.from(node.childNodes).forEach(visit);
    if (block) text += '\n';
  }
  Array.from(template.content.childNodes).forEach(visit);
  return text.split(/\n+/).map(s => normalizePhoneCompareText(s.replace(/(?:\*\*|__|~~|`)/g,'').replace(/\*([^*\n]+)\*/g,'$1').replace(/^\s*(?:#{1,6}\s+|>\s*|[-*+]\s+)/,''))).filter(Boolean);
}

function createPhoneCleanupScope(root, raw) {
  const parts = phoneCleanupSourceParts(raw), records = [], tokens = [], segments = [], opaqueIslands = [];
  const visibleCache=new Map();
  const visible=value=>{const text=String(value||'');if(visibleCache.has(text))return visibleCache.get(text);const decoder=phoneHost.document.createElement('textarea');decoder.innerHTML=text;const result=normalizePhoneCompareText(decoder.value);visibleCache.set(text,result);return result;};
  let corpus = '', disabled = String(raw || '').length > 200000;
  const protocolTags = new Set();
  const add = value => {corpus += value;};
  function visit(node) {
    if (node.nodeType === 3) {const value=node.nodeValue||'';segments.push({node,value,start:corpus.length,end:corpus.length+value.length,last:value,ranges:[],removed:new Set()});add(value);return;}
    if (node.nodeType !== 1) return;
    if (isPhoneCleanupForeignNode(node,root)) {
      if(!isPhoneCleanupProtectedNode(node)&&!/^(SCRIPT|STYLE|PRE|CODE)$/.test(node.tagName||'')){
        const visibleText=n=>n.nodeType===3?(n.nodeValue||''):n.nodeType===1&&!/^(SCRIPT|STYLE)$/.test(n.tagName)?Array.from(n.childNodes).map(visibleText).join(''):'';
        opaqueIslands.push({text:normalizePhoneCompareText(visibleText(node)),id:node.id||'',classes:Array.from(node.classList||[]),tag:node.tagName});
      }
      add('\0');return;
    }
    const block=/^(P|DIV|BR|HR|BLOCKQUOTE|UL|OL|LI)$/.test(node.tagName || '');
    if(block)add('\n');Array.from(node.childNodes).forEach(visit);if(block)add('\n');
  }
  Array.from(root.childNodes || []).forEach(visit);
  if(corpus.length>200000)disabled=true;
  parts.forEach((part,index) => {
    part.index=index;
    if (!part.phone) {phoneCleanupNarrativeChunks(part.text,opaqueIslands,corpus).forEach(text=>tokens.push({kind:'outside',part:index,text}));return;}
    for(const tag of part.text.matchAll(/<([a-z]+)\b/gi))protocolTags.add(tag[1].toUpperCase());
    part.items=collectPhoneCleanupItems(part.text);records.push(part);
    const re=/<(SMS|GMSG|GVOICE|SIMG|NOTIFY|CALL|VOICE|MOMENTS|COMMENT|SYNC|HONGBAO|GHONGBAO|mochiLOCATION|mochiLOC)\b[^>]*>[\s\S]*?<\/\1\s*>|<(?:SIMG|NOTIFY|CALL|SYNC|HONGBAO|GHONGBAO|mochiLOCATION|mochiLOC)\b[^>]*\/?>/gi;
    let m;while((m=re.exec(part.text)))for(const item of collectPhoneCleanupItems(m[0])) {
      if(item.from)tokens.push({kind:'author',part:index,text:visible(item.from)});
      const body=visible(item.text || item.display);
      if(body)tokens.push({kind:'body',part:index,text:body});
    }
  });
  if(tokens.length>512)disabled=true;
  const compare=(a,b)=>a[0]-b[0]||a[1]-b[1]||a[2]-b[2];
  let states=[{end:0,score:[0,0,0],prev:null,match:null}];
  if(!disabled)for(const token of tokens){
    const regex=buildLoosePhoneFragmentRegex(token.text),hits=[];
    if(regex){let m;while((m=regex.exec(corpus))){if(hits.length>=128){disabled=true;break;}if(!m[0].length)break;if(!m[0].includes('\0'))hits.push({start:m.index,end:m.index+m[0].length,token});}}
    if(disabled)break;
    const next=states.slice();
    for(const hit of hits){let best=null;for(const state of states)if(state.end<=hit.start&&(!best||compare(state.score,best.score)>0))best=state;
      if(!best)continue;const score=best.score.slice();if(token.kind==='outside'){score[0]+=token.text.length;score[1]++;}else score[2]+=token.kind==='body'?token.text.length:1;
      next.push({end:hit.end,score,prev:best,match:hit});
    }
    next.sort((a,b)=>a.end-b.end||compare(b.score,a.score));states=[];let bestScore=null;
    for(const state of next){if(bestScore&&compare(bestScore,state.score)>=0)continue;states.push(state);bestScore=state.score;}
    if(states.length>512){disabled=true;break;}
  }
  let best=states.reduce((a,b)=>compare(a.score,b.score)>=0?a:b),matches=[];
  for(let state=best;state;state=state.prev)if(state.match)matches.push(state.match);
  matches.reverse();
  const outside=matches.filter(m=>m.token.kind==='outside');
  const aligned=!disabled&&outside.length===tokens.filter(t=>t.kind==='outside').length;
  function mark(start,end,kind){
    if(start>=end)return;
    for(const segment of segments){const a=Math.max(start,segment.start),b=Math.min(end,segment.end);if(a<b)segment.ranges.push({start:a-segment.start,end:b-segment.start,kind});}
  }
  if(aligned){
    // The outside source is fully accounted for. Only its unassigned gaps can hold phone residue,
    // including fragments moved past PHONE's former DOM wrapper by another renderer.
    const gaps=[];let cursor=0;
    for(const keep of outside){if(cursor<keep.start)gaps.push({start:cursor,end:keep.start});cursor=keep.end;}
    if(cursor<corpus.length)gaps.push({start:cursor,end:corpus.length});
    for(const part of records)for(const gap of gaps){
      const {start,end}=gap,slice=corpus.slice(start,end),proposed=[];
      function propose(text,kind){
        text=visible(text);if(!text)return;const regex=buildLoosePhoneFragmentRegex(text);if(!regex)return;let m;
        while((m=regex.exec(slice))){if(!m[0].length)break;if(!m[0].includes('\0'))proposed.push({start:start+m.index,end:start+m.index+m[0].length,kind});}
      }
      for(const item of part.items){for(const v of item.variants||[])if(v)propose(v,'body');if(item.from)propose(item.from,'author');}
      const literal=/<phone\b[^>]*>(?:(?!\0)[\s\S])*?<\/phone\s*>|&lt;phone\b(?:(?!\0)[\s\S])*?&lt;\/phone&gt;/gi;
      let m;while((m=literal.exec(slice))){
        const text=visible((0,phoneHost.normalizePhoneMarkup)(m[0]));
        if(part.items.some(item=>item.text&&text.includes(visible(item.text))))mark(start+m.index,start+m.index+m[0].length,'literal');
      }
      const tags=/<\/?(?:phone|sms|sync|gmsg|gvoice|ghongbao|simg|notify|call|voice|hongbao|moments|comment|mochilocation|mochiloc)\b[^>]*>|&lt;\/?(?:phone|sms|sync|gmsg|gvoice|ghongbao|simg|notify|call|voice|hongbao|moments|comment|mochilocation|mochiloc)\b(?:(?!&gt;|\0)[\s\S])*?&gt;/gi;
      while((m=tags.exec(slice)))if(!m[0].includes('\0'))proposed.push({start:start+m.index,end:start+m.index+m[0].length,kind:'literal'});
      let lineStart=start;
      for(const line of slice.split(/[\n\0]/)){
        const lineEnd=lineStart+line.length,hits=proposed.filter(r=>r.start<lineEnd&&r.end>lineStart);
        const labelOnly=/^(?:(?:📱|📸|🎤|🧧|🖼️|📍)?\s*(?:朋友圈|评论|群聊|手机消息|语音|红包|图片|定位|位置))[:：\s]*$/.test(line.trim());
        if(hits.length||labelOnly&&proposed.length){
          let rest='';for(let i=0;i<line.length;i++)if(!hits.some(r=>lineStart+i>=r.start&&lineStart+i<r.end))rest+=line[i];
          rest=rest.replace(/(?:📱|📸|🎤|🧧|🖼️|📍|朋友圈|评论|群聊|手机消息|语音|红包|图片|定位|位置|回复|reply)/gi,'').replace(/[\s:：,，;；|｜\-—–_~～·•。.!！？?「」『』“”"'()[\]{}]+/g,'');
          if(!rest){for(const hit of hits)mark(Math.max(lineStart,hit.start),Math.min(lineEnd,hit.end),hit.kind);mark(lineStart,lineEnd,'noise');}
        }
        lineStart=lineEnd+1;
      }
    }
  }
  function protocolNodes(){
    if(!phoneCleanupSourceMatches(root,raw))return [];
    const marked=Array.from(root.querySelectorAll('[data-rp-phone-source]')).filter(el=>isPhoneCleanupSourceMarker(el,root,raw));
    return marked.concat(Array.from(root.querySelectorAll('phone,sms,sync,gmsg,gvoice,ghongbao,simg,notify,call,voice,hongbao,moments,comment,mochilocation,mochiloc')).filter(el=>!marked.some(m=>m.contains(el))&&protocolTags.has(el.tagName)&&!isPhoneCleanupForeignNode(el,root)));
  }
  function prune(node){
    let el=node.parentElement;
    while(el&&el!==root&&!isPhoneCleanupForeignNode(el,root)&&!hasPhoneCleanupMedia(el)&&!Array.from(el.querySelectorAll('*')).some(child=>isPhoneCleanupForeignNode(child,root))&&!String(el.textContent||'').trim()){
      const parent=el.parentElement;el.remove();el=parent;
    }
  }
  const scope={root,raw,sourceParts:records.length,aligned,ambiguous:!aligned,valid:el=>el===root&&phoneCleanupSourceMatches(root,raw),
    protocolNodes,
    has:kind=>phoneCleanupSourceMatches(root,raw)&&segments.some(s=>root.contains(s.node)&&s.ranges.some(r=>(!kind||r.kind===kind)&&s.value.slice(r.start,r.end).trim())),
    remove(kinds,filter){
      if(!phoneCleanupSourceMatches(root,raw))return false;
      const allowed=new Set(kinds);let changed=false;
      for(const segment of segments){
        const node=segment.node;if(!root.contains(node)||node.nodeValue!==segment.last||isPhoneCleanupForeignNode(node,root))continue;
        if(filter&&!(filter===node||filter.contains?.(node)))continue;
        for(const r of segment.ranges)if(allowed.has(r.kind))segment.removed.add(r.kind);
        const ranges=segment.ranges.filter(r=>segment.removed.has(r.kind));if(!ranges.length)continue;
        let next='';for(let i=0;i<segment.value.length;i++)if(!ranges.some(r=>i>=r.start&&i<r.end))next+=segment.value[i];
        if(next!==segment.last){node.nodeValue=next;segment.last=next;changed=true;prune(node);}
      }
      return changed;
    }
  };
  return scope;
}

function hasPhoneCleanupProtocolResidue(textEl, raw) {
  if(!textEl)return false;const scope=createPhoneCleanupScope(textEl,raw);
  return scope.protocolNodes().length>0||scope.has('literal');
}

function removePhoneProtocolNodes(textEl, scope, savedImageBtns) {
  if(!scope?.valid(textEl))return;
  for(const el of scope.protocolNodes()){
    if(!textEl.contains(el))continue;
    if(isPhoneCleanupSourceMarker(el,textEl,scope.raw)){removePhoneSourceMarkedResidue(el);continue;}
    const kept=[];
    for(const child of Array.from(el.querySelectorAll('*'))){
      if(kept.some(parent=>parent.contains(child)))continue;
      if(isPhoneCleanupForeignNode(child,el)||/^(IMG|VIDEO|AUDIO|BUTTON|IFRAME|CANVAS|SVG)$/.test(child.tagName))kept.push(child);
    }
    for(const child of kept){
      if(Array.isArray(savedImageBtns)&&child.matches?.('button.st-chatu8-image-button,button.image-tag-button')){
        if(!savedImageBtns.includes(child))savedImageBtns.push(child);child.remove();
      }else el.before(child);
    }
    el.remove();
  }
}

function isPhoneCleanupChatu8Node(node, includeDescendants = false) {
  const el = node && (node.nodeType === 1 ? node : node.parentElement);
  if (!el) return false;
  const selector = '.image-tag-button, .st-chatu8-image-button, .st-chatu8-image-span, .st-chatu8-image-container, .st-chatu8-collapse-wrapper, span[data-request-id]';
  return !!(el.closest?.(selector) || (includeDescendants && el.querySelector?.(selector)));
}

function isPhoneCleanupProtectedNode(node) {
  const el = node && (node.nodeType === 1 ? node : node.parentElement);
  return isPhoneCleanupChatu8Node(el) || !!(el && el.closest('.rp-phone-echo-container, .rp-phone-echo-block, .rp-phone-saved-img-btns, .rp-phone-live-img-btns, .mes_buttons, script, style'));
}

function hasPhoneCleanupMedia(el) {
  return isPhoneCleanupChatu8Node(el, true) || !!(el && (el.matches?.('img, video, audio, button, iframe, canvas, svg') || el.querySelector?.('img, video, audio, button, iframe, canvas, svg')));
}

function removePhoneLines(textEl, cleanupItems, scope) {
  if(!scope?.valid(textEl)||!Array.isArray(cleanupItems))return;
  removePhoneEchoFragments(textEl,cleanupItems.flatMap(item=>item.variants||[]),scope);
  removePhoneAuthorStubs(textEl,cleanupItems,scope);
  (0,phoneHost.cleanupPhoneResidualNoise)(textEl,scope);
}

function removePhoneAuthorStubs(textEl, cleanupItems, scope) {
  if(scope?.valid(textEl)&&Array.isArray(cleanupItems))scope.remove(['author']);
}

function hasPhoneEchoResidualText(textEl, block) {
  if(!textEl||!block)return false;
  const scope=createPhoneCleanupScope(textEl,block);
  return scope.has('body')||scope.has('author')||scope.has('noise');
}

function removePhoneEchoFragments(textEl, fragments, scope) {
  if(scope?.valid(textEl)&&Array.isArray(fragments))scope.remove(['body']);
}

function stripPhoneLiteralNodes(textEl, scope) {
  if(scope?.valid(textEl))scope.remove(['literal']);
}

return { phoneCleanupProtocolView, normalizePhoneCompareText, buildLoosePhoneFragmentRegex, normalizePhoneCleanupText, compactPhoneCleanupText, stripPhoneCleanupDecorations, uniquePhoneCleanupVariants, makePhoneCleanupItem, collectPhoneCleanupItems, cleanupRenderedPhoneEchoResiduals, installPhoneCleanupSourceMarkers, markPhoneCleanupSourceHtml, isPhoneCleanupSourceMarker, removePhoneSourceMarkedResidue, phoneCleanupSourceMatches, isPhoneCleanupForeignNode, phoneCleanupSourceParts, phoneCleanupNarrativeChunks, createPhoneCleanupScope, hasPhoneCleanupProtocolResidue, removePhoneProtocolNodes, isPhoneCleanupChatu8Node, isPhoneCleanupProtectedNode, hasPhoneCleanupMedia, removePhoneLines, removePhoneAuthorStubs, hasPhoneEchoResidualText, removePhoneEchoFragments, stripPhoneLiteralNodes };
}
