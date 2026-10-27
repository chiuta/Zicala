// ZICALA 2.2.0 — căutarea potrivește și numele culegerilor („Hințescu”, „Alte culegeri online”), nu doar al celor 11 teme.
// Rulare: node tests/cautare-culegere.test.mjs   (Playwright + Chromium, rețea blocată)
import {createRequire} from 'module';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const require = createRequire(process.env.PW_ROOT || import.meta.url);
const {chromium} = require('playwright');
const APP = 'file://' + path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'index.html');
let pass = 0, fail = 0;
const ok = (c, n, i) => { if (c) { pass++; console.log('  ok   ' + n); } else { fail++; console.log('  FAIL ' + n + (i === undefined ? '' : ' ' + JSON.stringify(i).slice(0, 300))); } };
const browser = await chromium.launch({executablePath: process.env.CHROMIUM_PATH || process.env.CHROME || undefined, args: ['--no-sandbox']});
const ctx = await browser.newContext({viewport: {width: 1100, height: 900}, locale: 'ro-RO'});
const net = [], errs = [];
await ctx.route(/^https?:/, r => { net.push(r.request().url()); r.abort(); });
const page = await ctx.newPage();
page.on('pageerror', e => errs.push(e.message));
page.on('console', m => { if (m.type() === 'error' || /Content Security Policy|Refused to/i.test(m.text())) errs.push(m.text()); });
await page.goto(APP); await page.waitForTimeout(600);
console.log('ZICALA — căutare după culegere');
const search = async q => page.evaluate(v => { const i = document.getElementById('q'); i.value = v; i.dispatchEvent(new Event('input', {bubbles: true})); }, q).then(() => page.waitForTimeout(300)).then(() => page.evaluate(() => ({n: view.length, cats: [...new Set(view.map(p => p.c))]})));
const cnt = await page.evaluate(() => ({h: ALL.filter(p => p.c.indexOf('Hințescu') >= 0).length, o: ALL.filter(p => p.c.indexOf('Alte culegeri') === 0).length, t: ALL.length}));
ok(cnt.h > 0 && cnt.o > 0, 'ambele culegeri au proverbe', cnt);
const h = await search('hintescu');
ok(h.n === cnt.h && h.cats.some(c => /Hințescu/.test(c)), '„hintescu” (fără diacritice) listează selecția Hințescu', {n: h.n, h: cnt.h});
const hs = await search('Hințescu 1877');
ok(hs.n === 0, 'un cuvânt în plus (1877, care nu e în proverbe) → 0 rezultate, fără potriviri false', hs.n);
const o = await search('culegeri online');
ok(o.n === cnt.o && o.cats.some(c => /^Alte culegeri/.test(c)), '„culegeri online” listează „Alte culegeri online”', {n: o.n, o: cnt.o});
const t = await search('rabdare');
ok(t.n >= 13, 'căutarea după temă („rabdare”) rămâne neschimbată (≥13)', t.n);
const none = await search('zzzzqqq');
ok(none.n === 0, 'termen inexistent → 0');

ok((await search('')).n === cnt.t, 'câmp gol → toate proverbele');
// interfață în engleză: numele culegerii în limba curentă
await page.selectOption('#lang', 'en'); await page.waitForTimeout(500);
ok(await page.evaluate(() => document.documentElement.lang) === 'en', 'limba interfeței = en');
const en = await search('collection hintescu');
ok(en.n === cnt.h, 'în engleză: „collection hintescu” listează exact selecția Hințescu', {n: en.n, h: cnt.h});
ok(/collection/i.test(await page.getAttribute('#q', 'placeholder')), 'placeholder în engleză menționează „collection”');
ok(net.length === 0, 'nicio cerere de rețea', net);
ok(errs.length === 0, 'fără erori JS/CSP', errs);
await browser.close();
console.log(`\ncautare-culegere: ${pass} reușite, ${fail} eșuate`); process.exit(fail ? 1 : 0);
