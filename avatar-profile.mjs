// Avatar reference reading is explicit and read-only; it never runs a host WI scan.
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
  const xml = [...text.matchAll(/<character(?:[_-][^>]*)?[^>]*>([\s\S]*?)<\/character(?:[_-][^>]*)?>/gi)];
  if (xml.length) return xml.filter(m => mentions(m[0].split('\n').slice(0, 6).join('\n'), names)).map(m => m[1]).join('\n\n');
  const parts = text.split(/\n(?=\s*(?:#{1,6}\s|(?:[-*]\s*)?name\s*[:：]|【|\[角色))/i);
  if (parts.length > 1) return parts.filter(p => mentions(p.split('\n').slice(0, 2).join('\n'), names)).join('\n\n');
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
  } else if (target.card) {
    for (const [field, label, cap] of [['description', '人物设定', 6500], ['personality', '性格与气质', 1500], ['scenario', '背景', 1500]]) {
      const raw = target.card[field] || target.card.data?.[field] || '';
      const selected = target.kind === 'char' ? raw : targetSections(raw, target.names);
      if (selected) { add(label, selected, cap); if (!sources.includes('角色卡')) sources.push('角色卡'); }
    }
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
  const matches = [];
  for (const [bookName, book] of books) for (const entry of Object.values(book.entries || {})) {
    const e = { ...entry?.extensions, ...entry };
    if (!entry || on(e.disable) || on(e.disabled) || off(e.enabled) || on(e.useProbability) && Number(e.probability) <= 0) continue;
    const raw = String(e.content || e.text || '');
    const heading = [e.comment, e.name, ...splitNames(e.key || e.keys)].filter(Boolean).join('\n');
    const direct = mentions(heading, target.names);
    if (!direct && !mentions(raw, target.names)) continue;
    const structured = /<character(?:[_-][^>]*)?[^>]*>|\n\s*(?:#{1,6}\s|(?:[-*]\s*)?name\s*[:：]|【|\[角色)/i.test(raw);
    const selected = structured ? targetSections(raw, target.names) : direct ? raw : targetSections(raw, target.names);
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
