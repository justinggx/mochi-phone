// Avatar reference reading is explicit and read-only; it never runs a host WI scan.
import { rolePartnerText, rolePersonEntryText, rolePersonPolicy } from './role-context.mjs?v=20261112-crossmodule-identity-236';
const norm = value => String(value || '').normalize('NFKC').toLocaleLowerCase().trim();
const on = value => value === true || value === 1 || value === 'true';
const off = value => value === false || value === 0 || value === 'false';
const splitNames = value => (Array.isArray(value) ? value : String(value || '').split(/[,，、|/\n]/)).map(v => String(v).trim()).filter(Boolean);
const escape = value => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
function mentions(text, names) {
  const value = norm(text);
  return names.some(name => {
    const needle = norm(name);
    return needle && (/^[\x00-\x7f]+$/.test(needle)
      ? new RegExp('(?:^|[^\\p{L}\\p{N}_])' + escape(needle) + '(?:$|[^\\p{L}\\p{N}_])', 'u').test(value)
      : value.includes(needle));
  });
}
function clean(value, charName, userName) {
  return String(value || '').replace(/<(script|style|think|thinking)\b[^>]*>[\s\S]*?<\/\1\s*>/gi, '')
    .replace(/\{\{char\}\}/gi, charName).replace(/\{\{user\}\}/gi, userName)
    .replace(/\{\{[\s\S]*?\}\}/g, '').replace(/<[^>]*>/g, ' ')
    .replace(/[ \t]+/g, ' ').replace(/\n{3,}/g, '\n\n').trim();
}
function targetSections(raw, names) {
  const text = String(raw || '');
  const named = value => typeof value === 'string' && names.some(name => norm(name) === norm(value.replace(/^["']|["']$/g, '').trim()));
  try {
    const data = JSON.parse(text), matches = [];
    const visit = (value, depth = 0) => {
      if (!value || typeof value !== 'object' || depth > 24) return;
      if (Array.isArray(value)) { value.slice(0, 512).forEach(item => visit(item, depth + 1)); return; }
      const fields = Object.entries(value), read = key => fields.find(([name]) => name.toLowerCase() === key)?.[1];
      const identity = read('identity'), identityName = identity && typeof identity === 'object' ? Object.entries(identity).find(([key]) => /^(?:name|full_name|姓名)$/i.test(key))?.[1] : null;
      const directName = fields.find(([key]) => /^(?:name|full_name|姓名)$/i.test(key))?.[1];
      if (named(identityName) || named(directName)) { matches.push(JSON.stringify(value, null, 2)); return; }
      for (const [, item] of fields) visit(item, depth + 1);
    };
    visit(data); return matches.join('\n\n');
  } catch {}
  const xml = [...text.matchAll(/<character(?:[_-][^>]*)?[^>]*>([\s\S]*?)<\/character(?:[_-][^>]*)?>/gi)];
  if (xml.length) return xml.filter(m => {
    const opening = m[0].slice(0, m[0].indexOf('>') + 1), attribute = opening.match(/\bname\s*=\s*["']([^"']+)["']/i);
    const field = m[1].match(/^\s*(?:[-*]\s*)?(?:name|full_name|姓名)\s*[:：]\s*([^\r\n]+)/im);
    return attribute || field ? named(attribute?.[1]) || named(field?.[1]) : mentions(m[1].split('\n').find(line => line.trim()) || '', names);
  }).map(m => m[1]).join('\n\n');
  const parts = text.split(/\n(?=\s*(?:#{1,6}\s|(?:[-*]\s*)?name\s*[:：]|【|\[角色))/i);
  if (parts.length > 1) return parts.filter(p => mentions(p.split('\n').find(line => line.trim()) || '', names)).join('\n\n');
  return text.split(/\n\s*\n/).filter(p => mentions(p, names)).join('\n\n');
}

export function avatarTarget(who, ctx = {}) {
  const key = String(who || '').trim();
  if (!key || key.length > 200) throw new Error('头像对象无效');
  const card = ctx.characters?.[ctx.characterId] || null;
  const charNames = [ctx.name2, card?.name].filter(Boolean);
  const kind = key === 'user' ? 'user' : charNames.some(n => norm(n) === norm(key)) ? 'char' : 'npc';
  return { key, kind, name: kind === 'user' ? String(ctx.name1 || '我') : key,
    card: ctx.groupId == null ? card : null,
    names: kind === 'char' ? [...new Set([key, ...charNames, ...splitNames(card?.data?.extensions?.aliases)])] : [kind === 'user' ? String(ctx.name1 || '我') : key] };
}

// The image can still belong to a card; only this generation's person changes.
export function avatarPersonTarget(target, subject, ctx = {}) {
  if (!subject || subject.id === 'legacy-card') return target;
  const person = avatarTarget(subject.name, ctx);
  return { ...person, kind: 'npc', names: [...new Set([person.name, ...splitNames(subject.aliases)])], note: String(subject.note || '').slice(0, 3000) };
}

export async function readAvatarProfile(target, ctx = {}, { check = () => {} } = {}) {
  check();
  const sources = [], warnings = [], parts = [];
  let used = 0, clipped = false;
  const charName = String(target.card?.name || ctx.name2 || ''), userName = String(ctx.name1 || '用户');
  const add = (label, raw, cap) => {
    const text = clean(raw, charName, userName);
    if (!text) return;
    const allowance = Math.max(0, Math.min(cap, 15500 - used - label.length - 4));
    if (text.length > allowance) clipped = true;
    if (allowance < 1) return;
    const picked = text.slice(0, allowance);
    parts.push('【' + label + '】\n' + picked); used += picked.length + label.length + 4;
  };
  if (target.kind === 'user') {
    add('当前用户设定', ctx.powerUserSettings?.persona_description || '', 8000);
    if (parts.length) sources.push('当前酒馆用户设定');
  }
  const books = [];
  if (target.kind !== 'user' && target.card) {
    const bound = target.card.data?.extensions?.world || target.card.extensions?.world;
    const chatBook = ctx.chatMetadata?.world_info;
    const names = [...new Set([bound, typeof chatBook === 'string' ? chatBook : ''].filter(n => typeof n === 'string' && n.trim()))];
    if (names.length && typeof ctx.loadWorldInfo !== 'function') throw new Error('世界书读取入口未就绪，请重试');
    for (const name of names) {
      let timer;
      const book = await Promise.race([Promise.resolve().then(() => ctx.loadWorldInfo(name)), new Promise((_, reject) => {
        timer = setTimeout(() => reject(new Error('世界书读取超时，请重试')), 15000);
      })]).finally(() => clearTimeout(timer)); check();
      if (!book?.entries) throw new Error('绑定世界书读取失败，请重试');
      books.push([name, book]);
    }
    const embedded = target.card.data?.character_book;
    if (!names.length && embedded?.entries) books.push(['角色卡内嵌世界书', embedded]);
  }
  const policy = target.kind === 'npc' ? rolePersonPolicy(target.card ? [target.card] : [], books)({name:target.name,aliases:target.names.filter(name=>norm(name)!==norm(target.name))}) : null;
  if (target.kind !== 'user' && target.card) {
    for (const [field, label, cap] of [['description', '人物设定', 6500], ['personality', '性格与气质', 1500], ['scenario', '背景', 1500]]) {
      const raw = target.card[field] || target.card.data?.[field] || '';
      const selected = target.kind === 'char' ? raw : rolePartnerText(raw, target.names, true, true, policy);
      if (selected) { add(label, selected, cap); if (!sources.includes('角色卡')) sources.push('角色卡'); }
    }
  }
  if (target.kind === 'npc' && target.note) { add('本次确认的人物补充', target.note, 3000); sources.push('本次选择的人物'); }
  const matches = [];
  for (const [bookName, book] of books) for (const entry of Object.values(book.entries || {})) {
    const e = { ...entry?.extensions, ...entry };
    if (!entry || on(e.disable) || on(e.disabled) || off(e.enabled) || on(e.useProbability) && Number(e.probability) <= 0) continue;
    const raw = String(e.content || e.text || '');
    const heading = [e.comment, e.name, ...splitNames(e.key || e.keys)].filter(Boolean).join('\n');
    const direct = mentions(heading, target.names);
    if (!direct && !mentions(raw, target.names)) continue;
    const selected = target.kind === 'npc' ? rolePersonEntryText(raw, heading, target.names, policy) : direct ? raw : targetSections(raw, target.names);
    if (selected) matches.push({ bookName, text: selected, direct, label: String(e.comment || e.name || '相关人物条目') });
  }
  matches.sort((a, b) => Number(b.direct) - Number(a.direct));
  const seen = new Set();
  for (const match of matches) {
    const signature = norm(match.text); if (seen.has(signature)) continue; seen.add(signature);
    add('世界书人物资料', match.text, 3500);
    sources.push('世界书「' + match.bookName + '」· ' + match.label);
  }
  check();
  if (!parts.length) warnings.push(target.kind === 'npc' ? '没有找到这个人物的明确资料，请补充外貌后再生成。' : '没有读取到明确人设，请在下方补充外貌。');
  if (target.kind === 'npc' && !target.card) warnings.push('当前无法确认 NPC 所属角色卡，请自行补充资料。');
  if (clipped) warnings.push('人物资料较长，已节选；可以补充遗漏的关键外貌。');
  return { kind: target.kind, name: target.name, body: parts.join('\n\n'), sources, warnings, requiresSupplement: !parts.length,
    bookCount: books.length, matchedEntries: seen.size };
}
