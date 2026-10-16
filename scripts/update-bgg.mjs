/* ============================================================
   Actualiza assets/data.js desde BoardGameGeek.
   - No destructivo: conserva descripciones en español, fotos,
     y mecánicas/editoriales ya curadas de los juegos existentes.
   - Actualiza la clasificación (pub/soon) según el año de BGG.
   - Añade juegos nuevos del diseñador que aún no estén.
   Ejecutar:  node scripts/update-bgg.mjs
   ============================================================ */
import fs from 'node:fs';
import path from 'node:path';
import { XMLParser } from 'fast-xml-parser';

const DESIGNER_ID = '64023';
const DATA_PATH = path.resolve('assets/data.js');
const UA = 'Mozilla/5.0 (compatible; CapostudioBot/1.0; +https://github.com/Pacornic/capostudio)';
const YEAR_NOW = new Date().getFullYear();

/* Juegos que NO deben entrar en el catálogo (son prototipos de "En desarrollo"). */
const IGNORE = new Set(['272252', '455107', '245293']); // Zoo Station, Riotinto, Cochabamba

/* Traducción de mecánicas BGG (inglés -> español). Lo que no esté, se deja en inglés. */
const MECH_ES = {
  'Area Majority / Influence': 'Mayorías de área', 'Auction / Bidding': 'Subasta / Pujas',
  'Simultaneous Action Selection': 'Selección simultánea de acciones', 'Worker Placement': 'Colocación de trabajadores',
  'Memory': 'Memoria', 'Push Your Luck': 'Tentar la suerte', 'Set Collection': 'Colección de sets',
  'Hand Management': 'Gestión de la mano', 'Open Drafting': 'Draft abierto', 'Take That': 'Fastidiar al rival',
  'Pick-up and Deliver': 'Recoger y entregar', 'Grid Coverage': 'Cobertura de cuadrícula',
  'Tile Placement': 'Colocación de losetas', 'Solo / Solitaire Game': 'Juego en solitario',
  'Worker Placement, Different Worker Types': 'Colocación de trabajadores (distintos tipos)',
  'Betting and Bluffing': 'Apuestas y faroleo', 'Market': 'Mercado', 'Negotiation': 'Negociación',
  'Dice Rolling': 'Lanzamiento de dados', 'Cooperative Game': 'Juego cooperativo', 'Drafting': 'Draft'
};

const sleep = (ms) => new Promise(r => setTimeout(r, ms));

async function bggXML(url, tries = 6) {
  for (let i = 0; i < tries; i++) {
    const r = await fetch(url, { headers: { 'User-Agent': UA, 'Accept': 'application/xml' } });
    if (r.status === 200) return await r.text();
    if (r.status === 202) { await sleep(2500); continue; } // BGG: en cola, reintentar
    if (r.status === 429) { await sleep(6000); continue; }
    throw new Error('HTTP ' + r.status + ' en ' + url);
  }
  throw new Error('Demasiados reintentos: ' + url);
}

const parser = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: '' });

function decode(s) {
  return String(s || '')
    .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"').replace(/&#10;|&#13;/g, ' ').replace(/&rsquo;/g, '’')
    .replace(/&mdash;/g, '—').replace(/&nbsp;/g, ' ').replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ').trim();
}

async function fetchThing(id) {
  const xml = await bggXML('https://boardgamegeek.com/xmlapi2/thing?id=' + id + '&stats=1');
  const item = parser.parse(xml)?.items?.item;
  if (!item) throw new Error('Sin item para ' + id);
  const names = Array.isArray(item.name) ? item.name : [item.name];
  const primary = names.find(n => n && n.type === 'primary') || names[0] || {};
  const links = Array.isArray(item.link) ? item.link : (item.link ? [item.link] : []);
  const byType = (t) => links.filter(l => l.type === t).map(l => l.value);
  return {
    id,
    name: primary.value || '',
    year: parseInt(item.yearpublished?.value || '0', 10) || 0,
    minp: item.minplayers?.value || '',
    maxp: item.maxplayers?.value || '',
    time: item.playingtime?.value || '',
    minpt: item.minplaytime?.value || '',
    maxpt: item.maxplaytime?.value || '',
    age: item.minage?.value || '',
    image: typeof item.image === 'string' ? item.image : '',
    desc: decode(item.description).slice(0, 300),
    mech: byType('boardgamemechanic'),
    pub: byType('boardgamepublisher')
  };
}

const classify = (year) => (year > 0 && year <= YEAR_NOW) ? 'pub' : 'soon';
const fmtPlayers = (d) => (d.minp && d.maxp) ? (d.minp === d.maxp ? d.minp : d.minp + '-' + d.maxp) : '';
const fmtTime = (d) => (d.minpt && d.maxpt && d.minpt !== d.maxpt) ? (d.minpt + '-' + d.maxpt + ' min') : (d.time ? d.time + ' min' : '');
const transMech = (arr) => arr.map(m => MECH_ES[m] || m);

async function discoverIds() {
  const url = 'https://api.geekdo.com/api/geekitem/linkeditems?ajax=1&linkdatatype=boardgame&nosession=1' +
    '&objectid=' + DESIGNER_ID + '&objecttype=person&pageid=1&showcount=100&subtype=boardgamedesigner';
  try {
    const r = await fetch(url, { headers: { 'User-Agent': UA, 'Accept': 'application/json' } });
    if (r.status !== 200) throw new Error('status ' + r.status);
    const j = await r.json();
    const items = j.items || j.linkeditems || [];
    const ids = items.map(it => String(it.objectid || it.id)).filter(Boolean);
    console.log('Descubiertos ' + ids.length + ' juegos del diseñador.');
    return ids;
  } catch (e) {
    console.warn('⚠ No se pudo descubrir juegos nuevos (' + e.message + '). Solo se refrescan los existentes.');
    return [];
  }
}

function jsObj(g) {
  return '{i:' + JSON.stringify(g.i) + ',n:' + JSON.stringify(g.n) + ',y:' + JSON.stringify(g.y) +
    ',cat:' + JSON.stringify(g.cat) + ',pl:' + JSON.stringify(g.pl || '') + ',t:' + JSON.stringify(g.t || '') +
    ',ag:' + JSON.stringify(g.ag || '') + ',d:' + JSON.stringify(g.d || '') +
    ',c:' + (g.c ? JSON.stringify(g.c) : 'null') + ',p:' + JSON.stringify(g.p || []) + '}';
}

function serializeMap(obj) {
  return Object.keys(obj).map(k => '  ' + JSON.stringify(k) + ': ' + JSON.stringify(obj[k])).join(',\n');
}

async function main() {
  const src = fs.readFileSync(DATA_PATH, 'utf8');

  // Evaluar el data.js actual para obtener los objetos existentes
  const win = {};
  new Function('window', src)(win);
  const games = (win.GAMES || []).slice();
  const mech = Object.assign({}, win.MECH || {});
  const pub = Object.assign({}, win.PUB || {});

  // Conservar cabecera (helpers) y cola (PROTOS) tal cual
  const headEnd = src.indexOf('window.GAMES');
  const protosIdx = src.indexOf('PROTOTIPOS JUGABLES');
  const tailStart = src.lastIndexOf('/*', protosIdx);
  if (headEnd < 0 || protosIdx < 0 || tailStart < 0) throw new Error('No encuentro los marcadores en data.js');
  const HEAD = src.slice(0, headEnd);
  const TAIL = src.slice(tailStart);

  const existingIds = new Set(games.map(g => g.i));
  const discovered = await discoverIds();
  const allIds = Array.from(new Set([...games.map(g => g.i), ...discovered])).filter(id => !IGNORE.has(id));

  // Traer datos de BGG
  const data = {};
  for (const id of allIds) {
    try { data[id] = await fetchThing(id); console.log('✓ ' + id + ' ' + data[id].name); }
    catch (e) { console.warn('✗ ' + id + ': ' + e.message); }
    await sleep(900);
  }

  // Actualizar existentes (solo clasificación; conservar lo curado)
  for (const g of games) {
    const d = data[g.i];
    if (!d || !d.year) continue;
    g.cat = classify(d.year);
    g.y = g.cat === 'pub' ? String(d.year) : (g.y && g.y !== '' ? g.y : 'Próximamente');
    if (g.cat === 'soon') g.y = 'Próximamente';
  }

  // Añadir nuevos
  let added = 0;
  for (const id of allIds) {
    if (existingIds.has(id)) continue;
    const d = data[id];
    if (!d) continue;
    const cat = classify(d.year);
    games.push({
      i: id, n: d.name, y: cat === 'pub' ? String(d.year) : 'Próximamente', cat,
      pl: fmtPlayers(d), t: fmtTime(d), ag: d.age ? d.age + '+' : '', d: d.desc, c: d.image || null, p: []
    });
    mech[id] = transMech(d.mech);
    pub[id] = d.pub;
    added++;
    console.log('＋ Añadido: ' + d.name + ' (' + cat + ')');
  }

  // Serializar
  const gamesTxt = 'window.GAMES = [\n' + games.map(g => '  ' + jsObj(g)).join(',\n') + '\n];\n';
  const mechTxt = '\n/* Mecánicas por juego (traídas de BGG). Clave = id del juego. */\nwindow.MECH = {\n' + serializeMap(mech) + '\n};\n';
  const pubTxt = '\n/* Editoriales por juego (traídas de BGG). Clave = id del juego. */\nwindow.PUB = {\n' + serializeMap(pub) + '\n};\n\n';

  fs.writeFileSync(DATA_PATH, HEAD + gamesTxt + mechTxt + pubTxt + TAIL, 'utf8');
  console.log('\nListo. Juegos totales: ' + games.length + ' (nuevos: ' + added + ').');
}

main().catch(e => { console.error('ERROR:', e.message); process.exit(1); });
