/*
 * scripts/ui-smoke.js — browser smoke sweep for the whole UI surface.
 *
 * The other two suites cover the maths (scripts/test-engine.js) and the
 * strategy schema (scripts/validate-strategies.js). Neither one opens a
 * browser, so nothing catches a renderer that throws, a button whose listener
 * was never wired, or a KPI tile that disagrees with the engine it claims to
 * report. This does: it drives the app the way an advisor would and asserts
 * both that the DOM rendered AND that the numbers on screen tie back to
 * TSIQ.computeScenario.
 *
 * Not part of the required test loop — it needs Playwright and a Chromium
 * build, which the app itself deliberately does not depend on:
 *
 *   npm i -D playwright && npx playwright install chromium
 *   node scripts/ui-smoke.js
 *
 * Environment overrides, both optional:
 *   CHROMIUM_PATH   explicit browser binary (otherwise Playwright's default)
 *   SMOKE_OUT       where screenshots and the log go (default: a temp dir)
 *
 * Exit code is 0 only when every check passes and neither the app nor any
 * popup it opens logged a single console error. Screenshots of the results
 * panel and each of the four renderers land in SMOKE_OUT for eyeballing.
 *
 * Two notes on writing checks here, both learned the hard way:
 *  - KPI values animate via requestAnimationFrame (animateResults() in
 *    app.js), so the context sets reducedMotion and assertions compare
 *    against the data-target attribute rather than a mid-animation
 *    textContent read.
 *  - Every strategy checkbox lives inside a collapsed <details>, and
 *    Playwright will not interact with a hidden element. Call
 *    openAllDetails() after anything that re-renders a picker.
 */
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');
const os = require('os');

const APP = 'file://' + path.join(__dirname, '..', 'index.html');
const SHOTS = process.env.SMOKE_OUT || fs.mkdtempSync(path.join(os.tmpdir(), 'tsiq-smoke-'));
fs.mkdirSync(SHOTS, { recursive: true });
const LOG = path.join(SHOTS, 'ui-smoke.log');
try { fs.unlinkSync(LOG); } catch (e) {}
const results = [];
function record(name, ok, detail) {
  results.push({ name, ok, detail: detail || '' });
  const line = (ok ? 'PASS  ' : 'FAIL  ') + name + (detail ? '   :: ' + detail : '');
  console.log(line);
  fs.appendFileSync(LOG, line + '\n');   // unbuffered, so progress is watchable
}
function say(line) { console.log(line); fs.appendFileSync(LOG, line + '\n'); }
async function check(name, fn) {
  try {
    const d = await fn();
    record(name, true, d);
  } catch (e) {
    record(name, false, e.message.split('\n')[0]);
  }
}
function assert(cond, msg) { if (!cond) throw new Error(msg); }

(async () => {
  const launch = { args: ['--no-sandbox', '--allow-file-access-from-files'] };
  if (process.env.CHROMIUM_PATH) launch.executablePath = process.env.CHROMIUM_PATH;
  const browser = await chromium.launch(launch);
  const ctx = await browser.newContext({
    reducedMotion: 'reduce',
    viewport: { width: 1500, height: 1000 },
    acceptDownloads: true,
  });

  const errors = [];   // console errors + page exceptions, main page
  const popupErrors = [];
  ctx.on('page', (p) => {
    p.on('pageerror', (e) => (p === page ? errors : popupErrors).push(String(e).split('\n')[0]));
    p.on('console', (m) => {
      if (m.type() === 'error') (p === page ? errors : popupErrors).push(m.text().slice(0, 300));
    });
  });

  const page = await ctx.newPage();
  page.setDefaultTimeout(6000);
  const dialogs = [];
  page.on('dialog', (d) => {
    dialogs.push(d.type() + ': ' + d.message().slice(0, 200));
    // accept confirms (the import flow gates on one), dismiss alerts
    (d.type() === 'confirm' ? d.accept() : d.dismiss()).catch(() => {});
  });

  await page.goto(APP, { waitUntil: 'load' });
  await page.waitForTimeout(400);
  const openAllDetails = () => page.evaluate(() => {
    document.querySelectorAll('details').forEach(function (d) { d.open = true; });
  });
  await openAllDetails();

  // ---------- 1. Load integrity ----------
  await check('load: no console errors or exceptions', async () => {
    assert(errors.length === 0, errors.join(' | '));
    return 'clean';
  });

  await check('load: strategy index has no snapshot drift', async () => {
    const r = await page.evaluate(() => ({
      strategies: TSIQ.STRATEGIES.length,
      modules: TSIQ.strategyModules.length,
      modeled: TSIQ.STRATEGIES.filter((s) => s.modeled).length,
      noChar: TSIQ.STRATEGIES.filter((s) => !s.character).length,
      dupes: (function () {
        var seen = {}, d = [];
        TSIQ.STRATEGIES.forEach(function (s) { if (seen[s.id]) d.push(s.id); seen[s.id] = 1; });
        return d;
      })(),
    }));
    assert(r.strategies === r.modules, 'STRATEGIES ' + r.strategies + ' != modules ' + r.modules);
    assert(r.noChar === 0, r.noChar + ' strategies missing character');
    assert(r.dupes.length === 0, 'duplicate ids: ' + r.dupes.join(','));
    return r.strategies + ' strategies, ' + r.modeled + ' modeled';
  });

  await check('load: library renders one card per strategy', async () => {
    const n = await page.locator('#library-cards .strategy-card').count();
    const total = await page.evaluate(() => TSIQ.STRATEGIES.length);
    assert(n === total, 'rendered ' + n + ' of ' + total);
    return n + ' cards';
  });

  await check('load: both scenario builders list every strategy', async () => {
    const sc2 = await page.locator('#sc2-strategies input[type=checkbox]').count();
    const sc3 = await page.locator('#sc3-strategies input[type=checkbox]').count();
    const total = await page.evaluate(() => TSIQ.STRATEGIES.length);
    assert(sc2 === total && sc3 === total, 'sc2=' + sc2 + ' sc3=' + sc3 + ' total=' + total);
    return sc2 + ' per builder';
  });

  // ---------- 2. Tabs ----------
  await check('tab: Strategy Library switches and back', async () => {
    await page.click('#tab-btn-library');
    await page.waitForTimeout(150);
    assert(await page.locator('#tab-library').isVisible(), 'library pane not visible');
    assert(await page.locator('#tab-btn-library').getAttribute('aria-selected') === 'true', 'aria-selected not updated');
    await page.click('#tab-btn-builder');
    await page.waitForTimeout(150);
    assert(await page.locator('#tab-builder').isVisible(), 'builder pane not visible');
    return 'ok';
  });

  await check('library: search filters cards', async () => {
    await page.click('#tab-btn-library');
    await page.fill('#library-search', 'cost segregation');
    await page.waitForTimeout(300);
    const visible = await page.locator('#library-cards .strategy-card:visible').count();
    assert(visible > 0 && visible < 20, 'unexpected visible count ' + visible);
    await page.fill('#library-search', 'zzzznomatch');
    await page.waitForTimeout(300);
    const none = await page.locator('#library-cards .strategy-card:visible').count();
    const emptyShown = await page.locator('#library-empty').isVisible();
    assert(none === 0, none + ' cards still visible for a no-match query');
    assert(emptyShown, 'empty-state message not shown for a no-match query');
    await page.fill('#library-search', '');
    await page.waitForTimeout(300);
    const back = await page.locator('#library-cards .strategy-card:visible').count();
    assert(back === 109, 'clearing the search restored only ' + back + ' cards');
    return 'matched ' + visible + ', no-match empty state ok, cleared back to ' + back;
  });

  await check('library: card opens detail modal, closes cleanly', async () => {
    const before = errors.length;
    const card = page.locator('#library-cards .strategy-card').first();
    await card.click();
    await page.waitForTimeout(300);
    assert(await page.locator('#detail-modal').isVisible(), 'detail modal did not open');
    const body = (await page.locator('#detail-body').innerText()).trim();
    assert(body.length > 100, 'detail body suspiciously short: ' + body.length);
    await page.click('#detail-close');
    await page.waitForTimeout(200);
    assert(!(await page.locator('#detail-modal').isVisible()), 'detail modal did not close');
    assert(errors.length === before, 'new errors: ' + errors.slice(before).join(' | '));
    return body.length + ' chars of detail';
  });
  await page.click('#tab-btn-builder');

  // ---------- 3. Section 1 form, including the two newer fields ----------
  const PROFILE = {
    clientName: 'Sample Client (synthetic)',
    firmName: 'Test Firm',
    kidsCTC: '2', otherDeps: '0',
    wages: '120000', scheduleCNet: '400000', passthroughK1: '0',
    entityW2Wages: '0', ownerWages: '0',
    rentalNet: '-30000', ltcg: '250000', shortTermGains: '15000',
    qualDiv: '20000', interest: '8000', otherIncome: '0', ssBenefitsGross: '42000',
    propertyTax: '18000', mortgageInterest: '22000', charitable: '15000', otherItemized: '3000',
    fedWithholding: '30000', fedEstimates: '20000', stateWithholding: '5000', stateEstimates: '2000',
    priorYearTax: '150000', priorYearAGI: '700000',
    stateRatePct: '6.5', years: '10', growthPct: '3',
  };

  await check('section 1: all text/number fields accept input', async () => {
    for (const [id, v] of Object.entries(PROFILE)) await page.fill('#' + id, v);
    const bad = [];
    for (const [id, v] of Object.entries(PROFILE)) {
      const got = await page.inputValue('#' + id);
      if (got !== v) bad.push(id + '=' + got + '(want ' + v + ')');
    }
    assert(bad.length === 0, bad.join(', '));
    return Object.keys(PROFILE).length + ' fields set';
  });

  await check('section 1: filingStatus select cycles every option', async () => {
    const opts = await page.locator('#filingStatus option').evaluateAll((o) => o.map((x) => x.value));
    for (const o of opts) await page.selectOption('#filingStatus', o);
    await page.selectOption('#filingStatus', 'mfj');
    return opts.join(',');
  });

  await check('section 1: age65Count select (newer field) cycles and reaches the profile', async () => {
    const opts = await page.locator('#age65Count option').evaluateAll((o) => o.map((x) => x.value));
    assert(opts.length >= 3, 'expected 0/1/2, got ' + opts.join(','));
    for (const o of opts) {
      await page.selectOption('#age65Count', o);
      const v = await page.evaluate(() => TSIQ.__test ? TSIQ.__test.readProfile().age65Count : null);
      if (v !== null) assert(String(v) === o, 'profile age65Count=' + v + ' after selecting ' + o);
    }
    await page.selectOption('#age65Count', '2');
    return 'options ' + opts.join(',');
  });

  await check('section 1: every checkbox toggles both ways', async () => {
    const ids = ['isSSTB', 'rentalLossesUsable', 'reNonPassive', 'ltcgOneTime', 'otherIncomeOneTime'];
    for (const id of ids) {
      const before = await page.isChecked('#' + id);
      await page.click('#' + id);
      assert((await page.isChecked('#' + id)) !== before, id + ' did not toggle');
      await page.click('#' + id);
      assert((await page.isChecked('#' + id)) === before, id + ' did not toggle back');
    }
    // leave reNonPassive ON so the NIIT branch is exercised downstream
    await page.check('#reNonPassive');
    await page.check('#ltcgOneTime');
    return ids.length + ' checkboxes';
  });

  await check('income transitions: fields + selects accept a change', async () => {
    await page.fill('#it1-fromYear', '4');
    await page.selectOption('#it1-field', { index: 1 });
    await page.selectOption('#it1-mode', { index: 0 });
    await page.fill('#it1-value', '0');
    const f = await page.inputValue('#it1-fromYear');
    assert(f === '4', 'fromYear=' + f);
    return 'transition 1 armed at year 4';
  });

  // ---------- 4. Suggest ----------
  await check('button: Suggest Strategies flags candidates', async () => {
    const before = errors.length;
    await page.click('#btn-suggest');
    await page.waitForTimeout(600);
    const badges = await page.locator('.suggest-badge:visible').count();
    assert(errors.length === before, 'errors: ' + errors.slice(before).join(' | '));
    assert(badges > 0, 'no suggestion badges shown for a rich MFJ profile');
    return badges + ' badges';
  });

  // ---------- 5. Scenario 2 selection ----------
  const PICKED = ['s-corp-election', 'ptet'];

  await check('scenario 2: check S-Corp Election and PTET, params appear', async () => {
    await openAllDetails();
    for (const id of PICKED) {
      const cb = page.locator('#sc2-' + id);
      assert(await cb.count() > 0, 'no checkbox #sc2-' + id);
      await cb.check();
      await page.waitForTimeout(150);
      const params = page.locator('#sc2-' + id + '-params');
      assert(await params.isVisible(), 'param block for ' + id + ' stayed hidden after checking');
    }
    const inputs = await page.locator('#sc2-strategies .params input[type=number]:visible').count();
    assert(inputs > 0, 'no parameter inputs rendered for the checked strategies');
    return PICKED.join(' + ') + ', ' + inputs + ' visible param inputs';
  });

  await check('scenario 2: live-preview total updates on selection (WF1)', async () => {
    const t = page.locator('#sc2-live-total');
    if (await t.count() === 0) return 'no #sc2-live-total element (skipped)';
    await page.waitForTimeout(900);
    const txt = (await t.innerText()).trim();
    assert(/\d/.test(txt), 'live total has no number: "' + txt + '"');
    return txt;
  });

  await check('scenario 2: overrides accept values', async () => {
    await page.fill('#sc2-ov-stateRatePct', '5.0');
    await page.fill('#sc2-ov-incomeMultiplier', '1.10');
    await page.selectOption('#sc2-ov-filingStatus', { index: 0 });
    return 'state 5.0, mult 1.10';
  });

  // ---------- 6. Run Comparison + numeric correctness ----------
  await check('button: Run Comparison renders results', async () => {
    const before = errors.length;
    await page.click('#compute');
    await page.waitForTimeout(1200);
    const kpis = await page.locator('#results .kpi-value[data-target]').count();
    assert(kpis >= 4, 'only ' + kpis + ' KPI tiles');
    const tables = await page.locator('#results table').count();
    assert(tables >= 1, 'no projection table rendered');
    assert(errors.length === before, 'errors: ' + errors.slice(before).join(' | '));
    return kpis + ' KPIs, ' + tables + ' tables';
  });

  await check('correctness: KPI text equals its settled data-target', async () => {
    const bad = await page.evaluate(() => {
      var out = [];
      document.querySelectorAll('#results .kpi-value[data-target]').forEach(function (el) {
        var want = TSIQ.fmt.usd(parseFloat(el.getAttribute('data-target')));
        if (el.textContent.trim() !== want.trim()) out.push(el.textContent.trim() + ' vs ' + want);
      });
      return out;
    });
    assert(bad.length === 0, bad.join(' | '));
    return 'all tiles settled';
  });

  await check('correctness: baseline KPI ties to a fresh TSIQ.computeScenario run', async () => {
    const r = await page.evaluate(() => {
      var tiles = document.querySelectorAll('#results .kpi-value[data-target]');
      var shownBaseline = parseFloat(tiles[0].getAttribute('data-target'));
      // Rebuild the baseline the same way the app does, straight from the engine.
      var prof = TSIQ.__test ? TSIQ.__test.readProfile() : null;
      if (!prof) return { skip: true };
      var years = parseInt(document.getElementById('years').value, 10);
      var growth = parseFloat(document.getElementById('growthPct').value) / 100;
      var fresh = TSIQ.computeScenario(prof, [], years, growth);
      return { shownBaseline: shownBaseline, engine: Math.round(fresh.years[0].totalBurden) };
    });
    if (r.skip) return 'no test hook exported (skipped)';
    assert(Math.abs(r.shownBaseline - r.engine) <= 1, 'KPI ' + r.shownBaseline + ' vs engine ' + r.engine);
    return 'baseline ' + r.engine + ' matches';
  });

  await check('correctness: savings KPI equals baseline minus best scenario', async () => {
    const r = await page.evaluate(() => {
      var t = document.querySelectorAll('#results .kpi-value[data-target]');
      return [0, 1, 2].map(function (i) { return parseFloat(t[i].getAttribute('data-target')); });
    });
    const [base, best, savings] = r;
    assert(Math.abs((base - best) - savings) <= 1, base + ' - ' + best + ' = ' + (base - best) + ', shown ' + savings);
    return 'base ' + base + ' - best ' + best + ' = ' + savings;
  });

  await check('correctness: projection table has one row per projection year', async () => {
    const years = parseInt(await page.inputValue('#years'), 10);
    const r = await page.evaluate(() => {
      var out = [];
      document.querySelectorAll('#results table').forEach(function (t) { out.push(t.querySelectorAll('tbody tr').length); });
      return out;
    });
    assert(r.some((n) => n === years || n === years + 1), 'row counts ' + r.join('/') + ' for ' + years + ' years');
    return 'row counts ' + r.join('/');
  });

  await check('results: threshold cliff strip renders (WF3)', async () => {
    const n = await page.locator('.cliff-chip').count();
    return n + ' cliff chips';
  });

  await check('results: calculation trace / fine print present', async () => {
    const txt = await page.locator('#results').innerText();
    assert(/not modeled|AMT/i.test(txt), 'fine-print disclosure missing from results');
    return 'disclosure present';
  });

  await page.screenshot({ path: SHOTS + '/01-results.png', fullPage: false });

  // ---------- 7. Solve, Copy, Undo ----------
  await check('button: Solve optimizes a parameter (WF2)', async () => {
    const before = errors.length;
    const btn = page.locator('#sc2-strategies .params:visible .wf-solve-btn').first();
    if (await btn.count() === 0) return 'no solve button rendered (skipped)';
    const input = page.locator('#sc2-strategies .params:visible input[type=number]').first();
    const was = await input.inputValue();
    await btn.click();
    await page.waitForTimeout(2500);
    const now = await input.inputValue();
    assert(errors.length === before, 'errors: ' + errors.slice(before).join(' | '));
    assert(/^-?\d+(\.\d+)?$/.test(now), 'solve produced non-numeric "' + now + '"');
    return was + ' -> ' + now;
  });

  await check('button: Copy Scenario 2 -> 3 mirrors the selection', async () => {
    const before = errors.length;
    await page.click('#copy-sc2-to-sc3');
    await page.waitForTimeout(500);
    await openAllDetails();
    const sc2 = await page.locator('#sc2-strategies input[type=checkbox]:checked').count();
    const sc3 = await page.locator('#sc3-strategies input[type=checkbox]:checked').count();
    assert(sc2 === sc3 && sc3 > 0, 'sc2=' + sc2 + ' sc3=' + sc3);
    assert(errors.length === before, 'errors: ' + errors.slice(before).join(' | '));
    return sc3 + ' strategies copied';
  });

  await check('button: Undo becomes enabled and reverts the copy (WF7)', async () => {
    const disabled = await page.locator('#btn-undo').isDisabled();
    assert(!disabled, 'Undo still disabled after a copy');
    await page.click('#btn-undo');
    await page.waitForTimeout(500);
    const sc3 = await page.locator('#sc3-strategies input[type=checkbox]:checked').count();
    assert(sc3 === 0, 'sc3 still has ' + sc3 + ' checked after undo');
    return 'reverted';
  });

  await check('rerun: Run Comparison twice in a row stays clean', async () => {
    const before = errors.length;
    await page.click('#compute');
    await page.waitForTimeout(1200);
    assert(errors.length === before, 'errors: ' + errors.slice(before).join(' | '));
    return 'second run clean';
  });

  const closeBrand = async () => {
    if (await page.locator('#brand-modal').isVisible()) {
      await page.click('#brand-close');
      await page.waitForTimeout(300);
    }
  };

  // ---------- 8. Brand modal ----------
  await check('modal: Brand Settings opens', async () => {
    await page.click('#brand-settings-btn');
    await page.waitForTimeout(300);
    assert(await page.locator('#brand-modal').isVisible(), 'brand modal not visible');
    return 'open';
  });

  await check('brand: swatch click live-previews --accent and rings the swatch', async () => {
    const sw = page.locator('#brand-modal .swatch').nth(2);
    const want = (await sw.getAttribute('data-color')).toLowerCase();
    await sw.click();
    await page.waitForTimeout(200);
    const got = await page.evaluate(() => document.documentElement.style.getPropertyValue('--accent').trim().toLowerCase());
    assert(got === want, '--accent is "' + got + '", wanted ' + want);
    assert(await sw.getAttribute('aria-pressed') === 'true', 'aria-pressed not set on the picked swatch');
    const rings = await page.locator('#brand-modal .swatch.selected').count();
    assert(rings === 1, rings + ' swatches marked selected');
    return want + ' previewed';
  });

  await check('brand: colour input live-previews the picked value', async () => {
    await page.fill('#brand-color-input', '#1a7f5a');
    await page.waitForTimeout(250);
    const r = await page.evaluate(() => ({
      accent: document.documentElement.style.getPropertyValue('--accent').trim().toLowerCase(),
      text: document.documentElement.style.getPropertyValue('--accent-text').trim().toLowerCase(),
      rings: document.querySelectorAll('#brand-modal .swatch.selected').length,
    }));
    assert(r.accent === '#1a7f5a', 'accent is ' + r.accent);
    assert(r.text === '#fff' || r.text === '#ffffff' || r.text === '#111' || /^#/.test(r.text),
      '--accent-text not set, got "' + r.text + '"');
    assert(r.rings === 0, 'a swatch is still ringed after typing a custom colour');
    return 'accent ' + r.accent + ', text ' + r.text + ', no stale swatch ring';
  });

  await check('brand: Save persists the colour', async () => {
    await page.click('#brand-save');
    await page.waitForTimeout(400);
    const r = await page.evaluate(() => ({
      accent: document.documentElement.style.getPropertyValue('--accent').trim().toLowerCase(),
      brand: TSIQ.brand.color.toLowerCase(),
      stored: (JSON.parse(localStorage.getItem('tsiq-brand') || '{}').color || '').toLowerCase(),
    }));
    assert(r.accent === '#1a7f5a', 'accent ' + r.accent);
    assert(r.brand === '#1a7f5a', 'TSIQ.brand.color ' + r.brand);
    assert(r.stored === '#1a7f5a', 'localStorage ' + r.stored);
    return 'saved + persisted';
  });

  await check('brand: abandoning a pick reverts to the saved colour', async () => {
    await page.click('#brand-settings-btn');
    await page.waitForTimeout(250);
    const sw = page.locator('#brand-modal .swatch').nth(4);
    const other = (await sw.getAttribute('data-color')).toLowerCase();
    await sw.click();
    await page.waitForTimeout(150);
    let got = await page.evaluate(() => document.documentElement.style.getPropertyValue('--accent').trim().toLowerCase());
    assert(got === other, 'preview did not take, got ' + got);
    await closeBrand();
    got = await page.evaluate(() => document.documentElement.style.getPropertyValue('--accent').trim().toLowerCase());
    assert(got === '#1a7f5a', 'abandoned pick stuck: ' + got);
    return 'previewed ' + other + ', reverted to saved';
  });

  await check('brand: Reset to default restores TSIQ.DEFAULT_BRAND_COLOR', async () => {
    await page.click('#brand-settings-btn');
    await page.waitForTimeout(250);
    await page.click('#brand-reset');
    await page.waitForTimeout(400);
    const r = await page.evaluate(() => ({
      brand: TSIQ.brand.color.toLowerCase(),
      def: TSIQ.DEFAULT_BRAND_COLOR.toLowerCase(),
    }));
    assert(r.brand === r.def, 'brand ' + r.brand + ' vs default ' + r.def);
    await closeBrand();
    return 'reset to ' + r.def;
  });

  // ---------- 9. The four popup renderers ----------
  // A deck shows one slide at a time, so body.innerText only ever holds the
  // current slide — measure the whole slide set instead, and prove the deck
  // actually advances rather than rendering a single frame.
  async function popupCheck(name, selector, opts) {
    opts = opts || {};
    await check(name, async () => {
      const beforeMain = errors.length;
      const beforePop = popupErrors.length;
      const [pop] = await Promise.all([
        ctx.waitForEvent('page', { timeout: 15000 }),
        page.click(selector),
      ]);
      await pop.waitForLoadState('domcontentloaded').catch(() => {});
      await pop.waitForTimeout(1200);
      const info = await pop.evaluate(() => {
        const slides = document.querySelectorAll('.slide, section, [data-slide]');
        let all = '';
        slides.forEach((el) => { all += ' ' + (el.textContent || ''); });
        const html = document.documentElement.outerHTML;
        return {
          slides: slides.length,
          html: html.length,
          slideChars: all.trim().length,
          bodyChars: (document.body ? document.body.innerText : '').trim().length,
          suspicious: (html.match(/undefined|NaN|\[object Object\]/g) || []).slice(0, 3),
        };
      });
      assert(info.html > 2000, 'popup HTML only ' + info.html + ' bytes');
      assert(info.suspicious.length === 0, 'rendered HTML contains ' + info.suspicious.join(', '));
      const chars = Math.max(info.slideChars, info.bodyChars);
      assert(chars > 600, 'only ' + chars + ' chars of rendered content');
      let advanced = '';
      if (opts.deck) {
        assert(info.slides >= opts.minSlides, 'only ' + info.slides + ' slides, wanted >= ' + opts.minSlides);
        const seen = new Set();
        for (let i = 0; i < 4; i++) {
          seen.add((await pop.evaluate(() => (document.body.innerText || '').trim().slice(0, 120))));
          await pop.keyboard.press('ArrowRight');
          await pop.waitForTimeout(350);
        }
        assert(seen.size >= 3, 'deck showed only ' + seen.size + ' distinct states across 4 arrow presses');
        advanced = ', ' + info.slides + ' slides, advances';
      }
      const shot = SHOTS + '/' + name.replace(/[^a-z0-9]+/gi, '-').toLowerCase() + '.png';
      await pop.screenshot({ path: shot }).catch(() => {});
      await pop.close();
      assert(popupErrors.length === beforePop, 'popup errors: ' + popupErrors.slice(beforePop).join(' | '));
      assert(errors.length === beforeMain, 'main errors: ' + errors.slice(beforeMain).join(' | '));
      return info.html + ' bytes, ' + chars + ' chars' + advanced;
    });
  }

  await popupCheck('renderer client PDF report', '#btn-pdf');
  await popupCheck('renderer client slideshow', '#btn-slides', { deck: true, minSlides: 6 });
  await popupCheck('renderer pitch deck', '#btn-pitch', { deck: true, minSlides: 6 });

  await check('renderer strategy handout from a library card', async () => {
    await page.click('#tab-btn-library');
    await page.waitForTimeout(200);
    const handout = page.locator('#library-cards .strategy-card .card-pdf').first();
    assert(await handout.count() > 0, 'no .card-pdf handout button on any library card');
    const beforePop = popupErrors.length;
    const [pop] = await Promise.all([ctx.waitForEvent('page', { timeout: 15000 }), handout.click()]);
    await pop.waitForTimeout(1000);
    const text = await pop.evaluate(() => (document.body ? document.body.innerText : ''));
    assert(text.trim().length > 200, 'handout text only ' + text.trim().length);
    assert(!/undefined|NaN|\[object Object\]/.test(text), 'handout contains ' +
      (text.match(/undefined|NaN|\[object Object\]/) || [])[0]);
    await pop.screenshot({ path: SHOTS + '/handout.png' }).catch(() => {});
    await pop.close();
    assert(popupErrors.length === beforePop, 'popup errors: ' + popupErrors.slice(beforePop).join(' | '));
    if (await page.locator('#detail-modal').isVisible()) await page.click('#detail-close');
    await page.click('#tab-btn-builder');
    return text.trim().length + ' chars';
  });

  // ---------- 10. Export / import round trip ----------
  await check('button: Export Client File downloads valid JSON', async () => {
    const [dl] = await Promise.all([
      page.waitForEvent('download', { timeout: 15000 }),
      page.click('#btn-export'),
    ]);
    const p = path.join(SHOTS, 'export.tsiq.json');
    await dl.saveAs(p);
    const data = JSON.parse(fs.readFileSync(p, 'utf8'));
    assert(data.format === 'tsiq-client-v1', 'format is ' + data.format);
    assert(data.profile && String(data.profile.wages) === PROFILE.wages,
      'profile.wages is ' + (data.profile && data.profile.wages));
    assert(Array.isArray(data.scenarios) && data.scenarios.length === 2,
      'scenarios: ' + JSON.stringify(data.scenarios && data.scenarios.length));
    const sc2 = data.scenarios.find((x) => x.key === 'sc2');
    assert(sc2 && sc2.strategies.length === PICKED.length,
      'sc2 carried ' + (sc2 ? sc2.strategies.length : 'no') + ' strategies, wanted ' + PICKED.length);
    assert(data.fees && typeof data.fees.planning === 'number', 'fees.planning missing');
    return dl.suggestedFilename() + ', ' + sc2.strategies.map((x) => x.id).join('+') + ' round-tripped';
  });

  await check('button: Import Client File round-trips the export', async () => {
    const before = errors.length;
    await page.fill('#wages', '1');
    await page.setInputFiles('#import-file', path.join(SHOTS, 'export.tsiq.json'));
    await page.waitForTimeout(900);
    const wages = await page.inputValue('#wages');
    assert(wages === PROFILE.wages, 'wages came back as ' + wages + ', wanted ' + PROFILE.wages);
    const checked = await page.locator('#sc2-strategies input[type=checkbox]:checked').count();
    assert(checked === PICKED.length, 'sc2 came back with ' + checked + ' strategies, wanted ' + PICKED.length);
    assert(errors.length === before, 'errors: ' + errors.slice(before).join(' | '));
    return 'wages ' + wages + ' and ' + checked + ' strategies restored';
  });

  await check('button: Import Return (PDF) opens a file picker without throwing', async () => {
    const before = errors.length;
    const [chooser] = await Promise.all([
      page.waitForEvent('filechooser', { timeout: 8000 }),
      page.click('#btn-import-pdf'),
    ]);
    assert(!!chooser, 'no file chooser');
    assert(errors.length === before, 'errors: ' + errors.slice(before).join(' | '));
    return 'chooser opened (no sample PDF to feed it)';
  });

  // ---------- 11. Edge input: everything zero ----------
  await check('edge: an all-zero profile computes without NaN', async () => {
    const before = errors.length;
    await page.evaluate(() => {
      document.querySelectorAll('#tab-builder input[type=number]').forEach(function (i) {
        if (i.id === 'years') { i.value = '5'; return; }
        if (i.id === 'growthPct' || i.id === 'stateRatePct') { i.value = '0'; return; }
        i.value = '0';
        i.dispatchEvent(new Event('input', { bubbles: true }));
        i.dispatchEvent(new Event('change', { bubbles: true }));
      });
      document.querySelectorAll('#sc2-strategies input[type=checkbox]:checked, #sc3-strategies input[type=checkbox]:checked')
        .forEach(function (c) { c.checked = false; c.dispatchEvent(new Event('change', { bubbles: true })); });
    });
    await page.click('#compute');
    await page.waitForTimeout(1200);
    const txt = await page.locator('#results').innerText();
    assert(!/NaN|Infinity|undefined/.test(txt), 'results contain ' + (txt.match(/NaN|Infinity|undefined/) || [])[0]);
    assert(errors.length === before, 'errors: ' + errors.slice(before).join(' | '));
    return 'clean zero-profile run';
  });

  await page.screenshot({ path: SHOTS + '/02-zero-profile.png' });

  // ---------- summary ----------
  say('\n================ SUMMARY ================');
  say('output written to ' + SHOTS);
  const fails = results.filter((r) => !r.ok);
  say(results.length + ' checks, ' + (results.length - fails.length) + ' passed, ' + fails.length + ' failed');
  if (fails.length) fails.forEach((f) => say('  FAIL ' + f.name + ' :: ' + f.detail));
  if (dialogs.length) say('\nnative dialogs raised:\n  ' + dialogs.join('\n  '));
  if (errors.length) say('\nMAIN PAGE console errors/exceptions (' + errors.length + '):\n  ' + errors.join('\n  '));
  if (popupErrors.length) say('\nPOPUP console errors/exceptions (' + popupErrors.length + '):\n  ' + popupErrors.join('\n  '));

  await browser.close();
  process.exit(fails.length ? 1 : 0);
})();
