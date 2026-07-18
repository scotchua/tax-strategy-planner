/* ============================================================================
 * SLIDESHOW RENDERER — client-facing deck in the firm's presentation style:
 * 1920×1080 canvas slides, navy/cream/white surfaces, serif display type,
 * mono data figures, numbered strategy slides with savings callouts,
 * before/after reveal, and a recap with next steps.
 *
 * Structure: Title → Three Questions → Income Sources → Current Liability →
 * Plan Overview → one slide per strategy → Savings Reveal → Next Steps.
 *
 * Also exports openDeck/deckLogo (the dark minimal shell) used by the
 * anonymized pitch deck renderer.
 * ==========================================================================*/
window.TSIQ = window.TSIQ || {};
TSIQ.render = TSIQ.render || {};

(function () {
  var esc = function (s) { return TSIQ.esc(s); };
  var usd = function (n) { return TSIQ.fmt.usd(n); };

  /* ------------------- minimal dark shell (pitch deck) ------------------- */
  var DECK_CSS = '' +
    '*{box-sizing:border-box;margin:0;padding:0}' +
    'html,body{height:100%;overflow:hidden;background:#101822;font-family:"Segoe UI",Arial,sans-serif;color:#eef2f7}' +
    '.slide{display:none;height:100vh;padding:7vh 9vw;flex-direction:column;justify-content:center}' +
    '.slide.active{display:flex}' +
    '.eyebrow{color:var(--deck-accent);text-transform:uppercase;letter-spacing:4px;font-size:1.6vh;margin-bottom:2.5vh}' +
    'h1{font-size:7vh;font-weight:300;line-height:1.15;margin-bottom:3vh}' +
    'h2{font-size:5.2vh;font-weight:300;margin-bottom:4vh}' +
    '.sub{font-size:2.6vh;color:#aab8c8;max-width:70vw}' +
    'ul{list-style:none;font-size:2.9vh;line-height:1.5}' +
    'ul li{margin-bottom:2.4vh;padding-left:4vh;position:relative}' +
    'ul li:before{content:"—";position:absolute;left:0;color:var(--deck-accent)}' +
    '.big{font-size:11vh;color:#5dd08a;font-weight:200;margin:1vh 0}' +
    '.big-label{font-size:2vh;text-transform:uppercase;letter-spacing:3px;color:#aab8c8}' +
    '.center{text-align:center;align-items:center}' +
    '.analogy{border-left:4px solid var(--deck-accent);padding:2vh 3vh;font-style:italic;font-size:2.7vh;color:#cdd8e4;margin-top:3vh;max-width:70vw}' +
    'table{border-collapse:collapse;font-size:2.4vh;margin-top:2vh;min-width:60vw}' +
    'th,td{padding:1.4vh 2.5vw;text-align:right;border-bottom:1px solid #2c3a4a}' +
    'th:first-child,td:first-child{text-align:left}' +
    'thead th{color:#aab8c8;font-weight:400;font-size:1.9vh;text-transform:uppercase;letter-spacing:1px}' +
    '.total-row td{border-top:2px solid var(--deck-accent);border-bottom:none;font-weight:600}' +
    '.green{color:#5dd08a}' +
    '.nav{position:fixed;bottom:3vh;right:3vw;display:flex;gap:12px;align-items:center;z-index:10}' +
    '.nav button{background:#1e2a38;color:#eef2f7;border:1px solid #3a4a5c;border-radius:6px;padding:10px 18px;font-size:16px;cursor:pointer}' +
    '.nav button:hover{background:#2c3a4a}' +
    '.counter{color:#7a8a9c;font-size:14px;margin-right:8px}' +
    '.progress{position:fixed;top:0;left:0;height:3px;background:var(--deck-accent);transition:width .3s}';

  var DECK_JS = '' +
    'var i=0,slides=document.querySelectorAll(".slide");' +
    'function show(n){i=Math.max(0,Math.min(slides.length-1,n));' +
    'for(var k=0;k<slides.length;k++)slides[k].classList.toggle("active",k===i);' +
    'document.querySelector(".counter").textContent=(i+1)+" / "+slides.length;' +
    'document.querySelector(".progress").style.width=((i+1)/slides.length*100)+"%";}' +
    'document.addEventListener("keydown",function(e){' +
    'if(e.key==="ArrowRight"||e.key===" "||e.key==="PageDown")show(i+1);' +
    'if(e.key==="ArrowLeft"||e.key==="PageUp")show(i-1);});' +
    'document.getElementById("next").onclick=function(){show(i+1)};' +
    'document.getElementById("prev").onclick=function(){show(i-1)};' +
    'show(0);';

  TSIQ.render.deckLogo = function () {
    var logo = TSIQ.brand && TSIQ.brand.logo;
    return logo
      ? '<img src="' + logo + '" style="max-height:9vh;max-width:30vw;margin-bottom:3vh" alt="">'
      : '';
  };

  TSIQ.render.openDeck = function (title, slidesHtml) {
    var brandColor = (TSIQ.brand && TSIQ.brand.color) || '#8a6d3b';
    var accentVar = ':root{--deck-accent:color-mix(in srgb, ' + brandColor + ' 55%, #f5e9c9)}';
    var html = '<!DOCTYPE html><html><head><meta charset="utf-8">' +
      '<title>' + esc(title) + '</title>' +
      '<style>' + accentVar + DECK_CSS + '</style></head><body>' +
      '<div class="progress"></div>' + slidesHtml +
      '<div class="nav"><span class="counter"></span>' +
      '<button id="prev">&larr;</button><button id="next">&rarr;</button></div>' +
      '<script>' + DECK_JS + '<\/script></body></html>';
    var w = window.open('', '_blank');
    if (!w) { alert('Pop-up blocked — please allow pop-ups for this page.'); return; }
    w.document.write(html);
    w.document.close();
    w.focus();
  };

  /* ================= firm-style 1920×1080 presentation deck =============== */

  // Design tokens per the firm's deck design system. The gold accent follows
  // Brand Settings; the app's generic default maps to the signature gold.
  function stageCss(gold) {
    return '' +
    ':root{--navy:#1B2B3A;--navy-700:#16242F;--navy-900:#0F1A24;--cream:#F5F0E8;' +
    '--gold:' + gold + ';--gold-300:color-mix(in srgb, ' + gold + ' 62%, #fff);' +
    '--leather:#8B6914;--steel:#E8EDF2;--green:#2D6A4F;--error:#C0392B;' +
    '--ink-soft:#44535F;--ink-muted:#6B7884;--line:#D8DDE3;--line-soft:#E8EDF2;' +
    '--on-navy-soft:#B7C2CC;--on-navy-muted:#7E8C98;--navy-line:#2E3F4D;' +
    '--serif:"Playfair Display",Georgia,"Times New Roman",serif;' +
    '--body:"Inter","Segoe UI",-apple-system,sans-serif;' +
    '--mono:"JetBrains Mono",Consolas,"Courier New",monospace}' +
    '*{box-sizing:border-box;margin:0;padding:0}' +
    'html,body{height:100%;overflow:hidden;background:var(--navy-900)}' +
    '#stage{position:absolute;top:50%;left:50%;width:1920px;height:1080px;transform-origin:center center}' +
    'section.slide{position:absolute;inset:0;width:1920px;height:1080px;font-family:var(--body);' +
    'color:var(--navy);overflow:hidden;display:none}' +
    'section.slide.active{display:block}' +
    '.slide-pad{position:absolute;inset:0;padding:100px 140px;display:flex;flex-direction:column}' +
    '.s-navy{background:var(--navy);color:#fff}.s-white{background:#fff}.s-cream{background:var(--cream)}' +
    '.display{font-family:var(--serif);font-weight:800;line-height:1.08;letter-spacing:-0.01em}' +
    '.serif{font-family:var(--serif)}' +
    '.mono{font-family:var(--mono);font-feature-settings:"tnum" 1;font-variant-numeric:tabular-nums}' +
    '.kicker{font-size:24px;font-weight:600;text-transform:uppercase;letter-spacing:.12em;color:var(--gold);display:flex;align-items:center;gap:16px}' +
    '.kicker::before{content:"";width:46px;height:2px;background:var(--gold);display:inline-block}' +
    '.kicker.no-rule::before{display:none}' +
    '.deck-foot{position:absolute;left:140px;right:140px;bottom:52px;display:flex;justify-content:space-between;align-items:center;font-size:16px;letter-spacing:.04em;color:var(--ink-muted)}' +
    '.s-navy .deck-foot{color:var(--on-navy-muted)}' +
    '.deck-foot .wm{font-family:var(--serif);font-weight:700}.deck-foot .wm b{color:var(--gold)}' +
    '.card{background:#fff;border:1px solid var(--line);border-radius:16px;box-shadow:0 2px 14px rgba(15,26,36,.07)}' +
    '.card.on-dark{background:var(--navy-700);border-color:var(--navy-line);box-shadow:none;color:#fff}' +
    '.pill{display:inline-flex;align-items:center;gap:10px;font-size:14px;font-weight:700;text-transform:uppercase;letter-spacing:.12em;padding:8px 18px;border-radius:100px}' +
    '.pill.gold{background:var(--gold);color:var(--navy)}' +
    '.num-index{font-family:var(--serif);font-weight:800;color:var(--gold);line-height:1}' +
    '.check{color:var(--green);font-size:26px;line-height:1.3}' +
    '@media (prefers-reduced-motion:no-preference){' +
    'section.slide.active .anim{animation:rise .62s cubic-bezier(.22,.9,.35,1) both}' +
    'section.slide.active .anim-2{animation:rise .62s cubic-bezier(.22,.9,.35,1) .08s both}' +
    'section.slide.active .anim-3{animation:rise .62s cubic-bezier(.22,.9,.35,1) .16s both}' +
    'section.slide.active .anim-4{animation:rise .62s cubic-bezier(.22,.9,.35,1) .24s both}' +
    'section.slide.active .anim-5{animation:rise .62s cubic-bezier(.22,.9,.35,1) .32s both}' +
    '@keyframes rise{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:none}}}' +
    '.nav{position:fixed;bottom:22px;right:26px;display:flex;gap:12px;align-items:center;z-index:10}' +
    '.nav button{background:rgba(255,255,255,.08);color:#eef2f7;border:1px solid rgba(255,255,255,.22);border-radius:8px;padding:10px 18px;font-size:16px;cursor:pointer}' +
    '.nav button:hover{background:rgba(255,255,255,.18)}' +
    '.counter{color:#7e8c98;font-size:14px;margin-right:8px;font-family:var(--mono)}' +
    '.progress{position:fixed;top:0;left:0;height:4px;background:var(--gold);transition:width .3s;z-index:10}';
  }

  var STAGE_JS = '' +
    'function fit(){var s=Math.min(window.innerWidth/1920,window.innerHeight/1080);' +
    'var st=document.getElementById("stage");' +
    'st.style.transform="translate(-50%,-50%) scale("+s+")";}' +
    'window.addEventListener("resize",fit);fit();' +
    'var i=0,slides=document.querySelectorAll("section.slide");' +
    'function show(n){i=Math.max(0,Math.min(slides.length-1,n));' +
    'for(var k=0;k<slides.length;k++)slides[k].classList.toggle("active",k===i);' +
    'document.querySelector(".counter").textContent=(i+1)+" / "+slides.length;' +
    'document.querySelector(".progress").style.width=((i+1)/slides.length*100)+"%";}' +
    'document.addEventListener("keydown",function(e){' +
    'if(e.key==="ArrowRight"||e.key===" "||e.key==="PageDown")show(i+1);' +
    'if(e.key==="ArrowLeft"||e.key==="PageUp")show(i-1);});' +
    'document.getElementById("next").onclick=function(){show(i+1)};' +
    'document.getElementById("prev").onclick=function(){show(i-1)};' +
    'show(0);';

  function wordmark(firmName) {
    var words = firmName.toUpperCase().split(' ');
    if (words.length === 1) return '<b>' + esc(words[0]) + '</b>';
    var last = words.pop();
    return esc(words.join(' ')) + ' <b>' + esc(last) + '</b>';
  }

  function foot(firmName, clientName) {
    return '<div class="deck-foot"><span class="wm">' + wordmark(firmName) + '</span>' +
      '<span>' + esc(clientName) + ' &middot; ' + TSIQ.TABLES_2026.taxYear + ' Tax Plan</span></div>';
  }

  function statLabel(text) {
    return '<div style="font-size:16px;text-transform:uppercase;letter-spacing:.12em;color:var(--ink-muted);margin-bottom:10px">' + text + '</div>';
  }

  /** data: { clientName, firmName, profile, baseline, scenarios, years, growthRate } */
  TSIQ.render.slideshow = function (data) {
    var year = TSIQ.TABLES_2026.taxYear;
    var best = data.scenarios.reduce(function (a, b) {
      return b.result.totals.totalBurden < a.result.totals.totalBurden ? b : a;
    }, data.scenarios[0]);
    var baseR = data.baseline.years[0];
    var planR = best.result.years[0];
    var b0 = baseR.totalBurden;
    var yr1Savings = b0 - planR.totalBurden;
    var cumSavings = data.baseline.totals.totalBurden - best.result.totals.totalBurden;
    var pctSmaller = b0 > 0 ? Math.round(yr1Savings / b0 * 100) : 0;
    var effRate = baseR.totalIncome > 0 ? (b0 / baseR.totalIncome * 100).toFixed(1) : '0';

    // Strategy list must match the BEST scenario only — every dollar figure
    // in this deck (yr1Savings, cumSavings, stepSavings) comes from `best`,
    // so pulling strategies from OTHER scenarios here would show moves that
    // aren't part of the plan the numbers describe.
    var uniqueStrategies = best.strategies.slice();
    var n = uniqueStrategies.length;
    var movesWord = n + (n === 1 ? ' move' : ' moves');

    // Incremental first-year savings per strategy (best scenario, in order)
    var stepSavings = {};
    if (data.profile && best.selections) {
      var ordered = best.selections.slice().sort(function (a, b) {
        return a.strategy.applyOrder - b.strategy.applyOrder;
      });
      var running = [], prevBurden = b0;
      ordered.forEach(function (sel) {
        running.push(sel);
        var r = TSIQ.computeScenario(data.profile, running, data.years, data.growthRate);
        stepSavings[sel.strategy.id] = prevBurden - r.years[0].totalBurden;
        prevBurden = r.years[0].totalBurden;
      });
    }

    var brand = TSIQ.brand || {};
    var gold = (!brand.color || brand.color === '#8a6d3b') ? '#C9962A' : brand.color;
    var firmName = data.firmName || brand.name || 'Your Firm';
    var logoImg = brand.logo
      ? '<img src="' + brand.logo + '" style="max-height:56px;max-width:220px" alt="">' : '';
    var fsLabel = TSIQ.FILING_STATUS_LABELS[(data.profile && data.profile.filingStatus) || 'mfj'];

    /* ------------------------------ 1 · title ----------------------------- */
    var slides = '<section class="slide s-navy active"><div class="slide-pad" style="justify-content:space-between">' +
      '<div style="display:flex;justify-content:space-between;align-items:flex-start">' +
      '<div style="display:flex;align-items:center;gap:24px">' + logoImg +
      '<div class="serif" style="font-size:26px;font-weight:700;letter-spacing:.02em;color:#fff">' + esc(firmName.toUpperCase()) + '</div></div>' +
      '<div class="pill gold anim">Tax Plan &middot; ' + year + '</div></div>' +
      '<div style="max-width:1400px">' +
      '<div class="kicker anim" style="margin-bottom:34px">' + year + ' Proactive Tax Plan</div>' +
      '<h1 class="display anim-2" style="font-size:118px;margin-bottom:30px;color:#fff">Keep more of<br>what you earn.</h1>' +
      '<p class="anim-3" style="font-size:30px;line-height:1.5;color:var(--on-navy-soft);max-width:1080px">' +
      'A side-by-side look at what ' + year + ' costs you as-is, the ' + movesWord +
      ' we are making, and the tax those moves take off the table.</p></div>' +
      '<div style="display:flex;justify-content:space-between;align-items:flex-end">' +
      '<div class="anim-4">' +
      '<div style="font-size:16px;text-transform:uppercase;letter-spacing:.12em;color:var(--on-navy-muted);margin-bottom:12px">Prepared for</div>' +
      '<div class="serif" style="font-size:44px;font-weight:700;color:#fff">' + esc(data.clientName) + '</div>' +
      '<div style="font-size:21px;color:var(--on-navy-soft);margin-top:8px">' + esc(fsLabel) + ' &middot; Tax Year ' + year + '</div></div>' +
      '<div class="serif anim-4" style="font-size:32px;font-weight:600;color:var(--gold-300);white-space:nowrap">' + esc(firmName) + '</div>' +
      '</div></div></section>';

    /* ------------------------- 2 · three questions ------------------------ */
    slides += '<section class="slide s-cream"><div class="slide-pad">' +
      '<div class="kicker anim" style="margin-bottom:26px">Today, in three questions</div>' +
      '<h2 class="display anim" style="font-size:62px;margin-bottom:70px;max-width:1300px">Where you stand, what changes, what you save.</h2>' +
      '<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:34px;flex:1;align-content:start">' +
      '<div class="card anim-2" style="padding:54px 46px;display:flex;flex-direction:column">' +
      '<div class="num-index" style="font-size:78px">01</div>' +
      '<h3 class="serif" style="font-size:34px;font-weight:700;margin:24px 0 16px">Where do you stand today?</h3>' +
      '<p style="font-size:21px;line-height:1.6;color:var(--ink-soft)">What ' + year + ' looks like with no changes — the full federal and state bill on the table.</p>' +
      '<div class="mono" style="margin-top:auto;padding-top:34px;font-size:30px;font-weight:700;color:var(--error)">' + usd(b0) + ' as-is</div></div>' +
      '<div class="card anim-3" style="padding:54px 46px;display:flex;flex-direction:column">' +
      '<div class="num-index" style="font-size:78px">02</div>' +
      '<h3 class="serif" style="font-size:34px;font-weight:700;margin:24px 0 16px">What are we changing?</h3>' +
      '<p style="font-size:21px;line-height:1.6;color:var(--ink-soft)">' + (n === 1 ? 'One proven strategy' : n + ' proven strategies') + ', properly documented, that legally shrink the bill.</p>' +
      '<div class="mono" style="margin-top:auto;padding-top:34px;font-size:30px;font-weight:700;color:var(--gold)">' + movesWord + '</div></div>' +
      '<div class="card anim-4" style="padding:54px 46px;display:flex;flex-direction:column">' +
      '<div class="num-index" style="font-size:78px">03</div>' +
      '<h3 class="serif" style="font-size:34px;font-weight:700;margin:24px 0 16px">What does it save you?</h3>' +
      '<p style="font-size:21px;line-height:1.6;color:var(--ink-soft)">The new bill side-by-side with the old one, and the cash that stays in your pocket.</p>' +
      '<div class="mono" style="margin-top:auto;padding-top:34px;font-size:30px;font-weight:700;color:var(--green)">' + usd(yr1Savings) + ' saved</div></div>' +
      '</div></div>' + foot(firmName, data.clientName) + '</section>';

    /* ------------------------ 3 · income by source ------------------------ */
    var p0 = baseR.profile;
    var sources = [
      ['W-2 wages', (p0.wages || 0) + (p0.ownerWages || 0)],
      ['Business income (Schedule C)', p0.scheduleCNet || 0],
      ['Business income (K-1)', p0.passthroughK1 || 0],
      ['Rental income', p0.rentalNet || 0],
      ['Capital gains', p0.ltcg || 0],
      ['Dividends & interest', (p0.qualDiv || 0) + (p0.interest || 0)],
      ['Other income', p0.otherIncome || 0]
    ].filter(function (r) { return Math.abs(r[1]) >= 1; });
    var srcRows = sources.map(function (r) {
      return '<div style="display:flex;justify-content:space-between;align-items:center;padding:22px 40px;border-bottom:1px solid var(--line-soft)">' +
        '<span class="serif" style="font-size:25px;font-weight:600">' + esc(r[0]) + '</span>' +
        '<span class="mono" style="font-size:28px;font-weight:700">' + usd(r[1]) + '</span></div>';
    }).join('');
    slides += '<section class="slide s-cream"><div class="slide-pad">' +
      '<div class="kicker anim" style="margin-bottom:24px">Question 1 &middot; Where you stand today</div>' +
      '<h2 class="display anim" style="font-size:60px;margin-bottom:54px;max-width:1300px">Everything you earn, in one place.</h2>' +
      '<div style="display:grid;grid-template-columns:1.3fr 1fr;gap:60px;flex:1;align-content:start">' +
      '<div class="anim-2" style="background:#fff;border:1px solid var(--line);border-radius:16px;box-shadow:0 2px 14px rgba(15,26,36,.07);overflow:hidden;align-self:start">' +
      '<div style="display:flex;justify-content:space-between;padding:26px 40px;background:var(--navy);color:#fff">' +
      '<span style="font-size:17px;text-transform:uppercase;letter-spacing:.12em">Income source</span>' +
      '<span style="font-size:17px;text-transform:uppercase;letter-spacing:.12em">' + year + '</span></div>' +
      srcRows +
      '<div style="display:flex;justify-content:space-between;align-items:center;padding:28px 40px;background:var(--cream)">' +
      '<span class="serif" style="font-size:27px;font-weight:800">Total income</span>' +
      '<span class="mono" style="font-size:34px;font-weight:700;color:var(--green)">' + usd(baseR.totalIncome) + '</span></div></div>' +
      '<div class="anim-3" style="display:flex;flex-direction:column;gap:20px;align-self:start">' +
      '<div class="card" style="padding:34px 40px">' + statLabel('After deductions &amp; QBI') +
      '<div class="serif" style="font-size:26px;font-weight:700">Taxable income</div>' +
      '<div class="mono" style="font-size:52px;font-weight:700;margin-top:10px">' + usd(baseR.taxableIncome) + '</div></div>' +
      '<p style="font-size:19px;color:var(--ink-muted);line-height:1.6">This is the number the IRS actually taxes — after your deductions do their work. The next slide shows what it costs you.</p>' +
      '</div></div></div>' + foot(firmName, data.clientName) + '</section>';

    /* ------------------------ 4 · current liability ----------------------- */
    slides += '<section class="slide s-white"><div class="slide-pad">' +
      '<div class="kicker anim" style="margin-bottom:24px">Question 1 &middot; Where you stand today</div>' +
      '<h2 class="display anim" style="font-size:60px;margin-bottom:14px;max-width:1300px">As things sit, ' + year + ' costs you ' + usd(b0) + '.</h2>' +
      '<p class="anim" style="font-size:23px;color:var(--ink-soft);max-width:900px;margin-bottom:56px">Projected full-year tax with no planning — every dollar taxed straight through.</p>' +
      '<div style="display:grid;grid-template-columns:1.15fr 1fr;gap:56px;flex:1;align-items:center">' +
      '<div class="anim-2" style="background:var(--navy);border-radius:16px;padding:64px;color:#fff;box-shadow:0 18px 50px rgba(15,26,36,.35)">' +
      '<div class="pill" style="background:rgba(192,57,43,.18);color:#F2B8B0;margin-bottom:30px">Without any changes</div>' +
      '<div style="font-size:18px;text-transform:uppercase;letter-spacing:.12em;color:var(--on-navy-muted);margin-bottom:14px">Projected total tax &middot; Federal + State</div>' +
      '<div class="mono" style="font-size:148px;font-weight:700;line-height:.95">' + usd(b0) + '</div>' +
      '<div style="margin-top:34px;display:flex;gap:48px;border-top:1px solid var(--navy-line);padding-top:30px">' +
      '<div><div style="font-size:16px;text-transform:uppercase;letter-spacing:.12em;color:var(--on-navy-muted)">Effective rate</div>' +
      '<div class="mono" style="font-size:38px;font-weight:700;margin-top:8px">' + effRate + '%</div></div>' +
      '<div><div style="font-size:16px;text-transform:uppercase;letter-spacing:.12em;color:var(--on-navy-muted)">on total income of</div>' +
      '<div class="mono" style="font-size:38px;font-weight:700;margin-top:8px">' + usd(baseR.totalIncome) + '</div></div>' +
      '</div></div>' +
      '<div class="anim-3" style="display:flex;flex-direction:column;gap:20px">' +
      '<div class="card" style="padding:34px 40px;display:flex;justify-content:space-between;align-items:center">' +
      '<div><div class="serif" style="font-size:26px;font-weight:700">Federal tax</div>' +
      '<div style="font-size:18px;color:var(--ink-muted);margin-top:4px">Income + payroll taxes, after credits</div></div>' +
      '<div class="mono" style="font-size:46px;font-weight:700">' + usd(baseR.totalFederal) + '</div></div>' +
      '<div class="card" style="padding:34px 40px;display:flex;justify-content:space-between;align-items:center">' +
      '<div><div class="serif" style="font-size:26px;font-weight:700">State tax</div>' +
      '<div style="font-size:18px;color:var(--ink-muted);margin-top:4px">At your effective state rate</div></div>' +
      '<div class="mono" style="font-size:46px;font-weight:700">' + usd(baseR.totalState) + '</div></div>' +
      '<div style="padding:30px 40px;display:flex;justify-content:space-between;align-items:center;background:var(--steel);border-radius:16px">' +
      '<div><div class="serif" style="font-size:24px;font-weight:700">Taxable income</div>' +
      '<div style="font-size:18px;color:var(--ink-muted);margin-top:4px">After QBI &amp; deductions</div></div>' +
      '<div class="mono" style="font-size:40px;font-weight:700;color:var(--ink-soft)">' + usd(baseR.taxableIncome) + '</div></div>' +
      '<p style="font-size:18px;color:var(--ink-muted);line-height:1.55;margin-top:8px">That is real money leaving for no reason. Here is how we keep it.</p>' +
      '</div></div></div>' + foot(firmName, data.clientName) + '</section>';

    /* -------------------------- 5 · plan overview ------------------------- */
    var cols = Math.min(n, 5);
    var overviewCards = uniqueStrategies.map(function (s, i) {
      var sv = stepSavings[s.id];
      // A meaningfully NEGATIVE first-year effect is a real cost — show the
      // signed figure rather than mislabeling it "Foundation".
      var amount = (sv !== undefined && (sv >= 500 || sv <= -500))
        ? usd(sv)
        : (s.modeled === false ? 'Foundation' : '&mdash;');
      return '<div class="card on-dark anim-' + Math.min(i + 2, 5) + '" style="padding:38px 28px;display:flex;flex-direction:column">' +
        '<div class="num-index" style="font-size:50px">' + (i + 1 < 10 ? '0' : '') + (i + 1) + '</div>' +
        '<h3 class="serif" style="font-size:26px;font-weight:700;margin:18px 0 12px">' + esc(s.name) + '</h3>' +
        '<p style="font-size:16.5px;line-height:1.5;color:var(--on-navy-soft)">' + esc(s.client.teaser || s.client.headline) + '.</p>' +
        '<div class="mono" style="margin-top:auto;padding-top:24px;font-size:30px;font-weight:700;color:var(--gold-300)">' + amount + '</div></div>';
    }).join('');
    slides += '<section class="slide s-navy"><div class="slide-pad">' +
      '<div class="kicker anim" style="margin-bottom:24px">Question 2 &middot; What we are changing</div>' +
      '<h2 class="display anim" style="font-size:60px;margin-bottom:14px;max-width:1350px;color:#fff">' +
      (n === 1 ? 'One move' : (['','One','Two','Three','Four','Five','Six','Seven','Eight','Nine','Ten'][n] || n) + ' moves') + ', built for your situation.</h2>' +
      '<p class="anim" style="font-size:23px;color:var(--on-navy-soft);max-width:1000px;margin-bottom:54px">' +
      'Each one is legitimate, documented, and defended by us. Together they cut your ' + year + ' bill by <b style="color:var(--gold-300)">' + usd(yr1Savings) + '</b>.</p>' +
      '<div style="display:grid;grid-template-columns:repeat(' + cols + ',1fr);gap:22px;flex:1;align-content:stretch">' + overviewCards + '</div>' +
      '</div>' + foot(firmName, data.clientName) + '</section>';

    /* ------------------------ 6+ · strategy slides ------------------------ */
    uniqueStrategies.forEach(function (s, i) {
      var c = s.client;
      var sv = stepSavings[s.id];
      var calloutLabel, calloutValue;
      if (sv !== undefined && sv >= 500) {
        calloutLabel = 'Estimated first-year savings';
        calloutValue = '<div class="mono" style="font-size:64px;font-weight:700">' + usd(sv) + '</div>';
      } else if (sv !== undefined && sv <= -500) {
        calloutLabel = 'Year-one investment — pays off in strategies that follow';
        calloutValue = '<div class="mono" style="font-size:64px;font-weight:700;color:#c0392b">' + usd(sv) + '</div>';
      } else {
        calloutLabel = 'Foundation move';
        calloutValue = '<div class="serif" style="font-size:34px;font-weight:700;line-height:1.25">Strengthens the whole plan</div>';
      }
      var bullets = (c.benefits || []).slice(0, 3).map(function (b, bi) {
        return '<li class="anim-' + (bi < 2 ? 3 : 4) + '" style="display:flex;gap:18px;align-items:flex-start">' +
          '<span class="check">&#10003;</span>' +
          '<span style="font-size:22px;line-height:1.55;color:var(--ink-soft)">' + esc(b) + '</span></li>';
      }).join('');
      var nameParts = s.name.length > 22 ? s.name : s.name; // display as-is; CSS wraps
      slides += '<section class="slide s-white"><div class="slide-pad">' +
        '<div style="display:flex;gap:90px;flex:1">' +
        '<div style="flex:0 0 540px;display:flex;flex-direction:column;justify-content:center">' +
        '<div class="num-index anim" style="font-size:150px">' + (i + 1 < 10 ? '0' : '') + (i + 1) + '</div>' +
        '<div class="kicker no-rule anim" style="margin:18px 0 18px">Strategy ' + (['','One','Two','Three','Four','Five','Six','Seven','Eight','Nine','Ten'][i + 1] || (i + 1)) + '</div>' +
        '<h2 class="display anim" style="font-size:62px;line-height:1.05">' + esc(nameParts) + '</h2>' +
        '<div class="anim-2" style="margin-top:46px;background:var(--cream);border-left:4px solid var(--gold);border-radius:12px;padding:30px 34px">' +
        '<div style="font-size:16px;text-transform:uppercase;letter-spacing:.12em;color:var(--ink-muted);margin-bottom:10px">' + calloutLabel + '</div>' +
        calloutValue + '</div></div>' +
        '<div style="flex:1;display:flex;flex-direction:column;justify-content:center;max-width:880px">' +
        '<p class="serif anim-2" style="font-size:34px;font-weight:600;line-height:1.4;margin-bottom:36px">' + esc(c.headline) + '.</p>' +
        '<ul style="list-style:none;display:grid;gap:22px">' + bullets + '</ul>' +
        (c.considerations && c.considerations.length
          ? '<div class="anim-4" style="margin-top:40px;font-size:19px;color:var(--ink-muted);border-top:1px solid var(--line);padding-top:24px">' +
            '<b style="color:var(--leather)">Worth knowing:</b> ' + esc(c.considerations[0]) + '</div>'
          : '') +
        '</div></div></div>' + foot(firmName, data.clientName) + '</section>';
    });

    /* -------------------------- 7 · savings reveal ------------------------ */
    slides += '<section class="slide s-navy"><div class="slide-pad">' +
      '<div class="kicker anim" style="margin-bottom:24px">Question 3 &middot; What it saves you</div>' +
      '<h2 class="display anim" style="font-size:60px;margin-bottom:54px;max-width:1300px;color:#fff">Same income. A smaller tax bill.</h2>' +
      '<div style="display:grid;grid-template-columns:1fr auto 1fr;gap:50px;align-items:center;margin-bottom:auto">' +
      '<div class="card on-dark anim-2" style="padding:50px 54px">' +
      '<div class="pill" style="background:rgba(192,57,43,.2);color:#F2B8B0;margin-bottom:26px">Without changes</div>' +
      '<div class="mono" style="font-size:104px;font-weight:700;line-height:.95;color:var(--on-navy-soft)">' + usd(b0) + '</div>' +
      '<div style="margin-top:24px;display:flex;gap:40px;color:var(--on-navy-soft);font-size:19px">' +
      '<span>Federal <b class="mono" style="color:#fff">' + usd(baseR.totalFederal) + '</b></span>' +
      '<span>State <b class="mono" style="color:#fff">' + usd(baseR.totalState) + '</b></span></div></div>' +
      '<div class="anim-3" style="color:var(--gold);font-size:90px;line-height:1">&rarr;</div>' +
      '<div class="anim-3" style="padding:50px 54px;background:var(--green);border-radius:16px;box-shadow:0 18px 50px rgba(15,26,36,.4)">' +
      '<div class="pill" style="background:rgba(255,255,255,.22);color:#fff;margin-bottom:26px">With the plan</div>' +
      '<div class="mono" style="font-size:104px;font-weight:700;line-height:.95;color:#fff">' + usd(planR.totalBurden) + '</div>' +
      '<div style="margin-top:24px;display:flex;gap:40px;color:rgba(255,255,255,.85);font-size:19px">' +
      '<span>Federal <b class="mono" style="color:#fff">' + usd(planR.totalFederal) + '</b></span>' +
      '<span>State <b class="mono" style="color:#fff">' + usd(planR.totalState) + '</b></span></div></div></div>' +
      '<div class="anim-4" style="margin-top:60px;background:var(--gold);border-radius:16px;padding:44px 60px;display:flex;align-items:center;justify-content:space-between;box-shadow:0 18px 50px rgba(15,26,36,.4)">' +
      '<div><div style="font-size:19px;text-transform:uppercase;letter-spacing:.12em;color:var(--navy-700);font-weight:700">Total tax savings in ' + year + '</div>' +
      '<div style="font-size:22px;color:var(--navy-700);margin-top:8px">A <b>' + pctSmaller + '% smaller</b> bill this year &mdash; and ' +
      '<b>' + usd(cumSavings) + '</b> kept over the next ' + data.years + ' years.</div></div>' +
      '<div class="mono" style="font-size:128px;font-weight:700;line-height:.9;color:var(--navy)">' + usd(yr1Savings) + '</div></div>' +
      '</div>' + foot(firmName, data.clientName) + '</section>';

    /* --------------------------- 8 · next steps --------------------------- */
    var recapRows = uniqueStrategies.map(function (s) {
      var sv = stepSavings[s.id];
      var amount = (sv !== undefined && (sv >= 500 || sv <= -500)) ? usd(sv)
        : (s.modeled === false ? 'Foundation' : '&mdash;');
      return '<div style="display:flex;justify-content:space-between;align-items:center;padding:20px 40px;border-bottom:1px solid var(--line-soft)">' +
        '<span class="serif" style="font-size:24px;font-weight:600">' + esc(s.name) + '</span>' +
        '<span class="mono" style="font-size:26px;font-weight:700">' + amount + '</span></div>';
    }).join('');
    var todos = uniqueStrategies.slice(0, 6).map(function (s, i) {
      var step = (s.client.steps && s.client.steps[0]) || 'We take it from here.';
      return '<li style="display:flex;gap:16px;align-items:flex-start">' +
        '<span class="mono" style="color:var(--gold);font-size:22px;font-weight:700">' + (i + 1) + '.</span>' +
        '<span style="font-size:20px;line-height:1.5;color:var(--ink-soft)">' + esc(step) + '</span></li>';
    }).join('');
    slides += '<section class="slide s-cream"><div class="slide-pad">' +
      '<div class="kicker anim" style="margin-bottom:24px">Where we go from here</div>' +
      '<h2 class="display anim" style="font-size:62px;margin-bottom:54px;max-width:1250px">' + movesWord.charAt(0).toUpperCase() + movesWord.slice(1) + ', locked in together.</h2>' +
      '<div style="display:grid;grid-template-columns:1.3fr 1fr;gap:60px;flex:1">' +
      '<div class="anim-2" style="background:#fff;border:1px solid var(--line);border-radius:16px;box-shadow:0 2px 14px rgba(15,26,36,.07);overflow:hidden;align-self:start">' +
      '<div style="display:flex;justify-content:space-between;padding:26px 40px;background:var(--navy);color:#fff">' +
      '<span style="font-size:17px;text-transform:uppercase;letter-spacing:.12em">Strategy</span>' +
      '<span style="font-size:17px;text-transform:uppercase;letter-spacing:.12em">First-year savings</span></div>' +
      recapRows +
      '<div style="display:flex;justify-content:space-between;align-items:center;padding:28px 40px;background:var(--cream)">' +
      '<span class="serif" style="font-size:27px;font-weight:800">Total saved in ' + year + '</span>' +
      '<span class="mono" style="font-size:34px;font-weight:700;color:var(--green)">' + usd(yr1Savings) + '</span></div></div>' +
      '<div class="anim-3" style="display:flex;flex-direction:column">' +
      '<h3 class="serif" style="font-size:30px;font-weight:700;margin-bottom:24px">Your to-do, with our help</h3>' +
      '<ul style="list-style:none;display:grid;gap:16px">' + todos + '</ul>' +
      '<div style="margin-top:auto;background:var(--navy);border-radius:16px;padding:38px 42px;color:#fff">' +
      '<div class="serif" style="font-size:30px;font-style:italic;color:var(--gold-300);margin-bottom:10px">Keep more in your pocket.</div>' +
      '<p style="font-size:19px;color:var(--on-navy-soft);line-height:1.5">Questions any time &mdash; that is what <b style="color:#fff">' + esc(firmName) + '</b> is here for.</p>' +
      '</div></div></div></div>' + foot(firmName, data.clientName) + '</section>';

    /* ------------------------------- shell --------------------------------- */
    var html = '<!DOCTYPE html><html><head><meta charset="utf-8">' +
      '<title>' + esc(data.clientName) + ' — ' + year + ' Tax Plan</title>' +
      '<style>' + stageCss(gold) + '</style></head><body>' +
      '<div class="progress"></div>' +
      '<div id="stage">' + slides + '</div>' +
      '<div class="nav"><span class="counter"></span>' +
      '<button id="prev">&larr;</button><button id="next">&rarr;</button></div>' +
      '<script>' + STAGE_JS + '<\/script></body></html>';

    var w = window.open('', '_blank');
    if (!w) { alert('Pop-up blocked — please allow pop-ups for this page.'); return; }
    w.document.write(html);
    w.document.close();
    w.focus();
  };
})();
