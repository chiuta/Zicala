// ZICALA 2.0.0 — jocul zilei (potrivire + cuvinte încrucișate), înrudiri, cărți tipăribile, notificare locală.
// Rulare: node tests/joc.test.mjs   (Playwright + Chromium headless, rețea blocată; PW_ROOT / NODE_PATH pentru playwright)
import {createRequire} from 'module';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const require = createRequire(process.env.PW_ROOT || import.meta.url);
const {chromium} = require('playwright');
const HERE = path.dirname(fileURLToPath(import.meta.url));
const APP = 'file://' + path.join(HERE, '..', 'index.html');
let pass = 0, fail = 0;
const ok = (c, n, i) => { if (c) { pass++; console.log('  ok   ' + n); } else { fail++; console.log('  FAIL ' + n + (i === undefined ? '' : ' ' + JSON.stringify(i).slice(0, 400))); } };
const browser = await chromium.launch({executablePath: process.env.CHROMIUM_PATH || process.env.CHROME || undefined, args: ['--no-sandbox']});
const DAY = new Date('2026-10-26T12:00:00Z');
async function open(o = {}) {
  const ctx = o.ctx || await browser.newContext({viewport: {width: 1100, height: 900}, locale: o.locale || 'ro-RO'});
  const reqs = [], errs = [];
  if (!o.ctx) await ctx.route(/^https?:/, r => { reqs.push(r.request().url()); r.abort(); });
  if (o.init) await ctx.addInitScript(o.init);
  const page = await ctx.newPage();
  page.on('pageerror', e => errs.push(e.message));
  page.on('console', m => { if (m.type() === 'error' || /Content Security Policy|Refused to/i.test(m.text())) errs.push(m.text()); });
  await page.clock.setFixedTime(o.date || DAY);
  await page.goto(APP); await page.waitForTimeout(500);
  return {ctx, page, reqs, errs};
}
console.log('ZICALA — jocul zilei');
{
  const {ctx, page, reqs, errs} = await open();
  ok(!errs.length && !reqs.length, 'pornire: 0 erori, 0 CSP, 0 cereri de rețea', {errs, reqs});
  const m = await page.evaluate(() => ({n: GS.m.pairs.length, ok: GS.m.pairs.every(p => p.l && p.r && (p.l + ' ' + p.r) === p.t), ord: GS.m.ord.slice(), btn: document.querySelectorAll('#gM .mb').length}));
  ok(m.n === 6 && m.btn === 12 && m.ord.slice().sort().join() === '0,1,2,3,4,5', 'potrivire: 6 perechi, 12 butoane, ordine permutare', m);
  ok(m.ok, 'potrivire: început + sfârșit = proverbul întreg');
  // greșeală
  const wrong = await page.evaluate(() => { const s = GS.m; const j = s.ord.find(k => k !== 0); return j; });
  await page.click('[data-ml="0"]'); await page.click('[data-mr="' + wrong + '"]');
  ok(/Greșeli: 1/.test(await page.textContent('#gMsg')) && (await page.evaluate(() => GS.m.err)) === 1, 'potrivire: greșeala se numără și se anunță');
  // rezolvare completă
  for (let i = 0; i < 6; i++) { await page.click('[data-ml="' + i + '"]'); await page.click('[data-mr="' + i + '"]'); }
  ok(/Bravo/.test(await page.textContent('#gMsg')) && /1 greșeli|cu 1/.test(await page.textContent('#gMsg')), 'potrivire: mesaj de final cu numărul de greșeli', await page.textContent('#gMsg'));
  ok(await page.evaluate(() => document.querySelectorAll('#gM .mb.ok').length === 12 && document.querySelectorAll('#gM .mb:not(.ok)').length === 0), 'potrivire: toate cele 12 butoane marcate');
  ok((await page.textContent('#tMok')).includes('✓'), 'potrivire: bifă pe filă');
  const st = await page.evaluate(() => JSON.parse(localStorage.getItem('zicala.zg')));
  ok(st && st.m === 1 && typeof st.d === 'number', 'potrivire: rezolvarea se păstrează (zicala.zg)', st);
  // determinism: aceeași zi => aceleași perechi; altă rundă => altele
  const a = await page.evaluate(() => GS.m.pairs.map(p => p.t).join('|'));
  const p2 = await ctx.newPage(); await p2.clock.setFixedTime(DAY); await p2.goto(APP); await p2.waitForTimeout(300);
  ok(a === await p2.evaluate(() => GS.m.pairs.map(p => p.t).join('|')), 'potrivire: aceeași zi → aceleași perechi');
  await p2.click('#gNew');
  ok(a !== await p2.evaluate(() => GS.m.pairs.map(p => p.t).join('|')), 'potrivire: „Altă rundă” schimbă perechile');
  const p3 = await ctx.newPage(); await p3.clock.setFixedTime(new Date('2026-10-27T12:00:00Z')); await p3.goto(APP); await p3.waitForTimeout(300);
  ok(a !== await p3.evaluate(() => GS.m.pairs.map(p => p.t).join('|')), 'potrivire: altă zi → alte perechi');
  ok(!(await p3.textContent('#tMok')).includes('✓'), 'potrivire: bifa nu trece în ziua următoare');
  await ctx.close();
}
{
  const {ctx, page, errs} = await open();
  await page.click('#tX');
  const g = await page.evaluate(() => { const s = GS.x; return {n: s.words.length, rows: s.rows, cols: s.cols, w: s.words.map(q => [q.w, q.r, q.c, q.d, q.n, cloze(q)])}; });
  ok(g.n >= 6 && g.rows <= 13 && g.cols <= 13, 'încrucișate: ≥6 cuvinte, grilă ≤13×13', {n: g.n, rows: g.rows, cols: g.cols});
  // consistență grilă: literele din intersecții coincid, nicio suprapunere coliniară, cuvinte vecine nu formează cuvinte nedorite
  const cons = await page.evaluate(() => { const m = {}; let bad = 0; GS.x.words.forEach(q => { for (let i = 0; i < q.w.length; i++) { const k = (q.r + (q.d ? i : 0)) + ',' + (q.c + (q.d ? 0 : i)); if (m[k] && m[k] !== q.w[i]) bad++; m[k] = q.w[i]; } });
    // orice secvență de ≥2 litere pe rând/coloană trebuie să fie un cuvânt plasat
    const set = new Set(GS.x.words.map(q => q.d + ':' + q.r + ',' + q.c + ':' + q.w.length)); let stray = 0;
    for (let d = 0; d < 2; d++) for (let a = 0; a < (d ? GS.x.cols : GS.x.rows); a++) { let run = 0, start = 0; for (let b = 0; b <= (d ? GS.x.rows : GS.x.cols); b++) { const k = d ? b + ',' + a : a + ',' + b; if (m[k]) { if (!run) start = b; run++; } else { if (run > 1 && !set.has(d + ':' + (d ? start + ',' + a : a + ',' + start) + ':' + run)) stray++; run = 0; } } }
    return {bad, stray, cells: Object.keys(m).length}; });
  ok(cons.bad === 0 && cons.stray === 0, 'încrucișate: intersecții coerente, fără cuvinte accidentale', cons);
  ok(g.w.every(([w, , , , , c]) => c.includes('_____') && !new RegExp(w, 'i').test(c.normalize('NFD').replace(/[̀-ͯ]/g, ''))), 'încrucișate: indiciile sunt proverbe cu cuvântul șters', g.w.slice(0, 2));
  ok((await page.locator('#gX .xc input').count()) === cons.cells && (await page.locator('#gX ol.xl li').count()) === g.n, 'încrucișate: câte o căsuță/literă și câte un indiciu/cuvânt');
  ok(await page.evaluate(() => [...document.querySelectorAll('#gX .xc input')].every(i => i.getAttribute('aria-label').length > 8)), 'încrucișate: căsuțele au etichete accesibile');
  // litere greșite → marcate la verificare
  const first = page.locator('#gX .xc input').first();
  const real = await page.evaluate(() => { const i = document.querySelector('#gX .xc input'); return GS.x.cell[i.dataset.y + ',' + i.dataset.x].ch; });
  await first.fill(real === 'q' ? 'w' : 'q'); await page.click('#xCheck');
  ok((await page.locator('#gX .xc.bad').count()) === 1 && /litere/.test(await page.textContent('#gMsg')), 'încrucișate: litera greșită este marcată, se raportează lipsurile', await page.textContent('#gMsg'));
  // tastare reală cu avans automat și diacritice normalizate
  await page.evaluate(() => { GS.x.vals = {}; GS.x.checked = false; renderCross(); });
  const f2 = page.locator('#gX .xc input').first(); await f2.focus(); await page.keyboard.type('ș');
  ok(!/[^A-Z]/.test(await f2.inputValue()), 'încrucișate: litera e normalizată (fără diacritice, majusculă)', await f2.inputValue());
  // rezolvare completă
  await page.evaluate(() => { const s = GS.x; for (const k in s.cell) s.vals[k] = s.cell[k].ch.toUpperCase(); s.checked = false; renderCross(); });
  await page.click('#xCheck');
  ok(/Bravo/.test(await page.textContent('#gMsg')) && (await page.textContent('#tXok')).includes('✓'), 'încrucișate: grila completă → mesaj + bifă', await page.textContent('#gMsg'));
  ok((await page.evaluate(() => JSON.parse(localStorage.getItem('zicala.zg')).x)) === 1, 'încrucișate: rezolvarea se păstrează');
  // aceeași grilă a doua oară în aceeași zi; altă rundă → altă grilă
  const sig = () => page.evaluate(() => GS.x.words.map(q => q.w).join());
  const s1 = await sig(); const p2 = await ctx.newPage(); await p2.clock.setFixedTime(DAY); await p2.goto(APP); await p2.waitForTimeout(300);
  ok(s1 === await p2.evaluate(() => GS.x.words.map(q => q.w).join()), 'încrucișate: aceeași zi → aceeași grilă');
  await page.click('#gNew'); ok(s1 !== await sig(), 'încrucișate: „Altă rundă” → altă grilă');
  // generatorul reușește pe 120 de zile consecutive
  const gen = await page.evaluate(() => { let fails = 0, min = 99; for (let d = 0; d < 120; d++) { GR = 0; const g = genGrid(20000 + d * 131 + 2); if (!g) fails++; else min = Math.min(min, g.words.length); } return {fails, min}; });
  ok(gen.fails <= 6 && gen.min >= 6, 'încrucișate: generatorul reușește la aproape orice sămânță (fallback pe alte semințe)', gen);
  ok(await page.evaluate(() => { for (let d = 0; d < 60; d++) { GR = 0; DAYX = d; } return !!newCross(); }), 'încrucișate: newCross() produce mereu o grilă');
  ok(!errs.length, 'încrucișate: 0 erori în consolă', errs);
  await ctx.close();
}
{
  const {ctx, page} = await open();
  // înrudiri
  await page.click('#bDraw'); await page.click('#bKin');
  const k = await page.evaluate(() => ({items: document.querySelectorAll('#drawkin li').length, langs: [...document.querySelectorAll('#drawkin ul.kl:first-of-type li b')].map(b => b.textContent), note: !!document.querySelector('#drawkin .ed'), exp: document.getElementById('bKin').getAttribute('aria-expanded')}));
  ok(k.langs.length === 7 && k.note && k.exp === 'true', 'înrudiri: 7 limbi + nota „interpretare”', k);
  await page.click('#bKin'); ok(!(await page.innerHTML('#drawkin')), 'înrudiri: se închide la a doua apăsare');
  // calitate: măcar o parte din proverbe au înrudiri; niciuna nu se auto-referă
  const q = await page.evaluate(() => { let n = 0, self = 0, tot = 0; for (let x = 0; x < 550; x++) { const r = kinRelated(x); if (r.length) n++; if (r.indexOf(x) >= 0) self++; tot += r.length; } return {n, self, tot}; });
  ok(q.n >= 40 && q.self === 0, 'înrudiri: acoperire rezonabilă, fără auto-referire', q);
  // buton pe rând
  await page.fill('#q', 'dimineata'); await page.waitForTimeout(300);
  await page.click('#list [data-k="0"]');
  ok((await page.locator('#list .kp li').count()) >= 7, 'înrudiri: panou și pe rândurile din listă');
  // proverb propriu (fără traduceri)
  await page.fill('#newT', 'Proverbul meu de probă pentru test'); await page.click('#bAdd'); await page.fill('#q', 'proverbul meu'); await page.waitForTimeout(300);
  await page.click('#list [data-k="0"]');
  ok(/Nu am găsit/.test(await page.textContent('#list .kp')), 'înrudiri: proverb propriu → mesaj, fără eroare');
  // schimbare de limbă: cheile noi există în toate cele 8 limbi
  const keys = ['gTitle', 'gTabM', 'gTabX', 'gNew', 'gDescM', 'gDescX', 'gPick', 'gErr', 'gMDone', 'gXOk', 'gXBad', 'gXFail', 'gAcross', 'gDown', 'gLen', 'gCell', 'gCheck', 'gReveal', 'gSolved', 'gLeft', 'gRight', 'kin', 'kinH', 'kinRel', 'kinNone', 'kinNote', 'cardsB', 'ntfB', 'ntfOn', 'ntfDeny', 'ntfNo', 'ntfNote', 'ntfTitle'];
  const par = await page.evaluate(ks => LANGS.map(l => [l, ks.filter(k => !I18N[l][k]), ks.filter(k => (I18N.ro[k].match(/\{\w+\}/g) || []).sort().join() !== (I18N[l][k].match(/\{\w+\}/g) || []).sort().join())]), keys);
  ok(par.every(([, miss, ph]) => !miss.length && !ph.length), 'i18n: cele ' + keys.length + ' chei noi există în toate cele 8 limbi, cu aceleași {variabile}', par.filter(p => p[1].length || p[2].length));
  for (const l of ['en', 'de', 'hu']) {
    await page.selectOption('#lang', l);
    const t = await page.evaluate(() => ({t: document.querySelector('#game h2').textContent, tab: document.querySelector('#tX span').textContent, d: document.getElementById('gDesc').textContent, k: document.getElementById('bKin').textContent, c: document.getElementById('bCards').textContent, g: document.querySelector('#gM .mc').getAttribute('aria-label')}));
    ok(t.t && t.t !== 'Jocul zilei' && t.tab !== 'Cuvinte încrucișate' && t.d && t.k !== 'Înrudiri' && t.c !== 'Tipărește cărți' && t.g, 'i18n: ' + l + ' — jocul, înrudirile și cărțile sunt traduse', t);
  }
  // joc într-o limbă străină: indiciile primesc traducerea
  await page.selectOption('#lang', 'en'); await page.click('#tX');
  ok((await page.locator('#gX ol.xl .tl').count()) >= 6, 'i18n: indiciile încrucișate au traducerea în limba interfeței');
  await ctx.close();
}
{
  const {ctx, page} = await open();
  // cărți tipăribile
  await page.evaluate(() => { window.__pr = 0; window.print = () => { window.__pr++; }; });
  await page.fill('#q', 'apa'); await page.waitForTimeout(300);
  const n = await page.evaluate(() => view.length);
  await page.click('#bCards');
  const c = await page.evaluate(() => ({pr: window.__pr, cards: document.querySelectorAll('#pcards .pcd').length, cls: document.body.classList.contains('pcm'), first: document.querySelector('#pcards .pt').textContent}));
  ok(c.pr === 1 && c.cards === Math.min(n, 240) && c.cls && c.first, 'cărți: lista curentă → cărți, print apelat', {c, n});
  await page.evaluate(() => window.dispatchEvent(new Event('afterprint')));
  ok(await page.evaluate(() => !document.body.classList.contains('pcm') && !document.getElementById('pcards').innerHTML), 'cărți: după tipărire se curăță');
  await ctx.close();
}
{
  // notificare locală (Notification simulat; permisiune acordată)
  const init = () => { window.__n = []; window.Notification = function (t, o) { window.__n.push([t, o && o.body]); }; Notification.permission = localStorage.getItem('__perm') || 'default'; Notification.requestPermission = function (cb) { Notification.permission = 'granted'; localStorage.setItem('__perm', 'granted'); if (cb) cb('granted'); return Promise.resolve('granted'); }; };
  const {ctx, page} = await open({init});
  ok((await page.getAttribute('#bNtf', 'aria-pressed')) === 'false', 'notificare: implicit oprită');
  await page.click('#bNtf');
  const a = await page.evaluate(() => ({n: window.__n.slice(), p: document.getElementById('bNtf').getAttribute('aria-pressed'), t: document.getElementById('bNtf').textContent, st: JSON.parse(localStorage.getItem('zicala.zn'))}));
  ok(a.p === 'true' && a.n.length === 1 && a.n[0][0] === 'Proverbul zilei' && a.n[0][1].length > 8 && a.st.on === 1, 'notificare: pornită → proverbul zilei afișat o dată', a);
  ok(a.n[0][1].startsWith(await page.textContent('#today')), 'notificare: textul coincide cu proverbul zilei');
  await page.reload(); await page.waitForTimeout(300);
  ok((await page.evaluate(() => window.__n.length)) === 0, 'notificare: nu se repetă în aceeași zi');
  await page.evaluate(() => { const s = JSON.parse(localStorage.getItem('zicala.zn')); s.d -= 1; localStorage.setItem('zicala.zn', JSON.stringify(s)); });
  await page.reload(); await page.waitForTimeout(300);
  ok((await page.evaluate(() => window.__n.length)) === 1, 'notificare: într-o zi nouă apare din nou');
  await page.click('#bNtf');
  ok((await page.getAttribute('#bNtf', 'aria-pressed')) === 'false' && (await page.evaluate(() => JSON.parse(localStorage.getItem('zicala.zn')).on)) === 0, 'notificare: se poate opri');
  await ctx.close();
  const b = await open({init: () => { window.Notification = function () {}; Notification.permission = 'default'; Notification.requestPermission = cb => { Notification.permission = 'denied'; if (cb) cb('denied'); return Promise.resolve('denied'); }; }});
  await b.page.click('#bNtf');
  ok(/nu a permis/.test(await b.page.textContent('#gMsg')) && (await b.page.getAttribute('#bNtf', 'aria-pressed')) === 'false', 'notificare: refuzul permisiunii e anunțat și nu pornește', await b.page.textContent('#gMsg'));
  await b.ctx.close();
  const c = await open({init: () => { delete window.Notification; }});
  await c.page.click('#bNtf');
  ok(/nu sunt disponibile/.test(await c.page.textContent('#gMsg')) && !c.errs.length, 'notificare: browser fără Notification → mesaj, fără eroare', c.errs);
  await c.ctx.close();
}
{
  // telefon îngust: fără defilare orizontală a paginii; export/import neafectate
  const ctx = await browser.newContext({viewport: {width: 360, height: 740}, locale: 'ro-RO'});
  const {page} = await open({ctx});
  await page.click('#tX');
  const w = await page.evaluate(() => ({sw: document.documentElement.scrollWidth, cw: document.documentElement.clientWidth}));
  ok(w.sw <= w.cw + 1, 'telefon 360px: fără defilare orizontală a paginii', w);
  const sz = await page.evaluate(() => { const i = document.querySelector('#gX .xc input').getBoundingClientRect(); return [i.width, i.height]; });
  ok(sz[0] >= 24 && sz[1] >= 24, 'telefon 360px: căsuțele ≥ 24px', sz);
  await ctx.close();
}
await browser.close();
console.log('\n' + pass + ' reușite, ' + fail + ' eșuate'); process.exit(fail ? 1 : 0);
