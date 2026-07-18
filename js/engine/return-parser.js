/* ============================================================================
 * RETURN PARSER — reads a software-generated Form 1040 package PDF directly
 * in the browser (vendored Mozilla pdf.js, js/vendor/) with NO AI involved.
 *
 * Method: extract text WITH coordinates, group items into visual rows, find
 * standard IRS line labels ("This is your adjusted gross income"), and take
 * the right-column number on that row. Works on text-based PDFs from Drake,
 * Lacerte, UltraTax, ProSeries, TurboTax, etc. Scanned/photographed returns
 * have no text layer and are rejected with a clear message (OCR territory).
 *
 * Everything parsed goes to a REVIEW screen for the advisor to confirm or
 * correct before it touches the form — this is a data-entry accelerator,
 * never an authority. Cross-check figures (AGI, taxable income) are shown
 * so the advisor can tie the parse to the return in seconds.
 * ==========================================================================*/
window.TSIQ = window.TSIQ || {};

(function () {

  // Anchor rows: first row whose text matches `re` AND carries a number.
  // `two: true` captures the two right-most numbers (e.g., qualified +
  // ordinary dividends share one row on the 1040).
  // pairedAB: this line has a gross ("a", middle column) and taxable ("b",
  // right column) amount side by side. When only ONE number survives the
  // row-band filter, x-position (vs. refX, calibrated from AGI's known
  // single right-column line) determines whether it's the taxable "b"
  // value or an unaccompanied gross "a" value with a blank/zero "b".
  var ANCHORS = [
    { key: 'wages1z',      re: /Add lines 1a through 1h/i },
    { key: 'wages1a',      re: /from Form\(s\) W-2, box 1/i },
    { key: 'interest',     re: /Tax-exempt interest.*Taxable interest|Taxable interest/i, pairedAB: true },
    { key: 'dividends',    re: /Qualified dividends/i, two: true },
    { key: 'iraTaxable',   re: /IRA distributions/i, pairedAB: true },
    { key: 'pension',      re: /Pensions and annuities/i, pairedAB: true },
    { key: 'socialSec',    re: /Social security benefits/i, pairedAB: true },
    { key: 'capGain',      re: /Capital gain or \(loss\)\. Attach Schedule D/i },
    { key: 'totalIncome',  re: /This is your total income/i },
    { key: 'agi',          re: /This is your adjusted gross income/i },
    { key: 'deduction',    re: /Standard deduction or itemized deductions/i },
    { key: 'qbiDeduction', re: /business income deduction from Form 8995/i },
    { key: 'taxableIncome', re: /This is your taxable income/i },
    { key: 'totalTax',     re: /This is your total tax/i },
    { key: 'sch1Business', re: /Business income or \(loss\)\. Attach Schedule C/i },
    { key: 'sch1RentalPS', re: /Rental real estate, royalties, partnerships, S corporations/i },
    { key: 'schERental',   re: /Total rental real estate and royalty income/i },
    { key: 'schEK1',       re: /Total partnership and S corporation income or \(loss\)/i },
    { key: 'schEEstate',   re: /Total estate and trust income or \(loss\)/i },
    { key: 'schETotal',    re: /Total income or \(loss\)\. Combine lines 26, 32, 37, 39, and 40/i },
    { key: 'schD7ST',      re: /Net short-term capital gain or \(loss\)\. Combine lines 1a through 6/i },
    { key: 'schD15LT',     re: /Net long-term capital gain or \(loss\)\. Combine lines 8a through 14/i },
    { key: 'seTax',        re: /Self-employment tax\. Attach Schedule SE/i, exclude: /Deductible part/i },
    { key: 'saltIncomeTax', re: /State and local income taxes or general sales taxes/i },
    { key: 'saltRealEstate', re: /State and local real estate taxes/i },
    { key: 'mortgageInterest', re: /Home mortgage interest and points reported/i },
    { key: 'charityCash',  re: /Gifts by cash or check/i },
    { key: 'charityOther', re: /Other than by cash or check/i }
  ];

  function parseNumber(s) {
    s = s.trim();
    var neg = /^\(.*\)$/.test(s);
    var n = parseFloat(s.replace(/[(),$]/g, ''));
    if (isNaN(n)) return null;
    return neg ? -n : n;
  }

  // Accepts an optional leading minus — some software prints losses as
  // "-12,345" rather than "(12,345)". parseNumber() already handles the
  // minus sign correctly (its char-strip only removes commas/$/parens).
  function isNumericItem(s) {
    return /^\(?-?\$?\s?[0-9][0-9,]*\.?[0-9]{0,2}\)?$/.test(s.trim());
  }

  /**
   * data: Uint8Array of the PDF.
   * Returns Promise<{ raw, fields, warnings, formYear, textPages }>.
   */
  TSIQ.parseReturnPdf = function (data) {
    var lib = (typeof pdfjsLib !== 'undefined') ? pdfjsLib : window.pdfjsLib;
    if (!lib) return Promise.reject(new Error('pdf.js not loaded'));

    // SECURITY-LOAD-BEARING: the vendored pdf.js (js/vendor/, v3.11.174) is
    // within the CVE-2024-4367 vulnerable range (arbitrary JS execution via a
    // crafted PDF's FontMatrix). isEvalSupported:false is the mitigation —
    // do not remove it in a refactor. Upgrading to a fixed build (>= 4.2.67)
    // is NOT a drop-in swap: pdf.js dropped classic-script/UMD builds at that
    // version in favor of ES-module-only builds, and ES modules fail to load
    // under file:// in Chromium (a CORS error) — which is this app's primary,
    // documented launch mode (see "Add Desktop Shortcut.cmd"). An upgrade
    // needs either a build/bundling step (contrary to this project's no-build
    // design) or dropping file:// support, and real PDF fixtures to confirm
    // getTextContent()'s output shape is unchanged — tracked as a deferred,
    // deliberate decision, not an oversight.
    return lib.getDocument({ data: data, isEvalSupported: false, useWorkerFetch: false })
      .promise.then(function (doc) {
        var pagePromises = [];
        for (var pn = 1; pn <= doc.numPages; pn++) {
          pagePromises.push(doc.getPage(pn).then(function (page) {
            return page.getTextContent().then(function (tc) {
              return tc.items.map(function (it) {
                return { s: it.str, x: it.transform[4], y: it.transform[5] };
              }).filter(function (i) { return i.s.trim(); });
            });
          }));
        }
        return Promise.all(pagePromises);
      })
      .then(function (pages) {
        var textPages = pages.filter(function (p) { return p.length > 5; }).length;
        if (textPages === 0) {
          throw new Error('This PDF has no text layer — it looks like a scanned or ' +
            'photographed return. Direct import needs a software-generated PDF; for ' +
            'scans, use the Claude review workflow instead.');
        }

        // Build per-page structures: visual label rows (3pt y-buckets, for
        // phrase matching) plus the flat numeric-item list (for value lookup
        // by y-PROXIMITY — values often render in a text run whose y differs
        // slightly from the label's, so strict bucketing misses them).
        var pageData = pages.map(function (items, pi) {
          var buckets = {};
          items.forEach(function (i) {
            var k = Math.round(i.y / 3) * 3;
            (buckets[k] = buckets[k] || []).push(i);
          });
          var rows = Object.keys(buckets).sort(function (a, b) { return b - a; })
            .map(function (k) {
              var row = buckets[k].sort(function (a, b) { return a.x - b.x; });
              return {
                y: parseFloat(k),
                text: row.map(function (i) { return i.s; }).join(' ')
              };
            });
          var nums = items.filter(function (i) { return isNumericItem(i.s); })
            .map(function (i) { return { v: parseNumber(i.s), x: i.x, y: i.y }; })
            .filter(function (n) { return n.v !== null; });
          return { page: pi + 1, rows: rows, nums: nums };
        });

        // Form year (e.g., "Form 1040 (2023)") — used for context notes.
        var formYear = null;
        pageData.forEach(function (pd) {
          if (formYear) return;
          pd.rows.forEach(function (row) {
            if (formYear) return;
            var m = row.text.match(/Form\s*1040\s*\(?\s*(20\d\d)/i) ||
                    row.text.match(/1040\s+(20\d\d)\s+1040/);
            if (m) formYear = parseInt(m[1], 10);
          });
        });

        // Calibrate the right ("b"/single-value) column's x-position from
        // AGI — a known single-column line — so pairedAB anchors can tell,
        // when only ONE number survives, whether it's the taxable "b" value
        // or an unaccompanied gross "a" (middle-column) value.
        var refX = null;
        for (var rp = 0; rp < pageData.length && refX === null; rp++) {
          var rpd = pageData[rp];
          for (var rr = 0; rr < rpd.rows.length && refX === null; rr++) {
            if (!/This is your adjusted gross income/i.test(rpd.rows[rr].text)) continue;
            var refBand = rpd.nums.filter(function (n) { return Math.abs(n.y - rpd.rows[rr].y) <= 4 && n.x >= 200; });
            if (refBand.length) refX = refBand[refBand.length - 1].x;
          }
        }

        // Resolve each anchor: FIRST label row in page order wins (federal
        // forms precede state forms and worksheets in a return package).
        // Value = right-most number within 4pt of the label's y, after
        // dropping line-number artifacts. The IRS layout prints each line
        // number TWICE (far-left column and a right-side reference column
        // ~x490) — a blank line therefore shows only its echoed line number,
        // never a value. Filter: drop numbers at x<200 outright, and drop
        // small integers in the reference band whose value also appeared in
        // the far-left column of the same row (the echo).
        //
        // KNOWN LIMITATION (not fixed here): the x<200/x<520 constants are
        // absolute PDF-user-space coordinates that assume the standard
        // letter-size page transform every supported software package (Drake,
        // Lacerte, UltraTax, ProSeries, TurboTax) happens to share. A package
        // that scales or offsets the page differently would need these
        // calibrated per-page from page.getViewport() and a known label's x
        // instead. Left as absolute constants because there are no real
        // sample PDFs in this repo to verify a per-page-relative rewrite
        // against — guessing at the replacement risked silently breaking
        // parsing that works today for a case that isn't confirmed to exist.
        var raw = {};
        var pairedABWarnings = [];
        ANCHORS.forEach(function (a) {
          for (var p = 0; p < pageData.length && !raw[a.key]; p++) {
            var pd = pageData[p];
            for (var r = 0; r < pd.rows.length; r++) {
              var row = pd.rows[r];
              if (!a.re.test(row.text)) continue;
              if (a.exclude && a.exclude.test(row.text)) continue;
              var band = pd.nums.filter(function (n) { return Math.abs(n.y - row.y) <= 4; });
              var leftVals = {};
              band.forEach(function (n) { if (n.x < 200) leftVals[n.v] = true; });
              var near = band.filter(function (n) {
                if (n.x < 200) return false;                       // left line-number column
                if (n.x < 520 && n.v >= 0 && n.v < 100 &&
                    n.v === Math.round(n.v) && leftVals[n.v]) return false; // echoed line number
                return true;
              }).sort(function (m, n) { return m.x - n.x; });

              var v = near.length ? near[near.length - 1].v : null;
              var v2 = (a.two && near.length >= 2) ? near[near.length - 2].v : undefined;
              if (a.pairedAB && near.length === 1 && refX !== null && (refX - near[0].x) > 15) {
                // The lone surviving number sits in the middle ("a"/gross)
                // column, not the far-right ("b"/taxable) column — the
                // taxable amount is blank (nontaxable rollover, SS below the
                // taxability floor, tax-exempt-only interest, etc.).
                pairedABWarnings.push(a.key + ':' + near[0].v);
                v = 0;
              }
              raw[a.key] = { found: true, page: pd.page, v: v, v2: v2 };
              break;
            }
          }
        });
        function val(k) { return (raw[k] && raw[k].v !== null && raw[k].v !== undefined) ? raw[k].v : null; }
        function found(k) { return !!raw[k]; }

        // ---- Map raw line values to app profile fields ----
        var warnings = [];
        var fields = {};

        var PAIRED_AB_LABELS = {
          interest: 'Taxable interest', iraTaxable: 'IRA distributions',
          pension: 'Pensions and annuities', socialSec: 'Social Security benefits'
        };
        pairedABWarnings.forEach(function (w) {
          var parts = w.split(':'), key = parts[0], grossAmt = parts[1];
          warnings.push('Found a gross ' + (PAIRED_AB_LABELS[key] || key) + ' amount of ' +
            TSIQ.fmt.usd(grossAmt) + ' with no taxable amount printed alongside it — imported ' +
            'as $0 taxable. Verify against the return (a fully nontaxable rollover, exempt ' +
            'interest, or Social Security below the taxability floor would all look like this).');
        });

        fields.wages = val('wages1z') !== null ? val('wages1z') : (val('wages1a') || 0);

        var ordDiv = 0, qualDiv = 0;
        if (raw.dividends) {
          ordDiv = raw.dividends.v || 0;                       // 3b (right-most)
          qualDiv = raw.dividends.v2 !== undefined ? raw.dividends.v2 : 0; // 3a
          if (qualDiv > ordDiv) { var t = qualDiv; qualDiv = ordDiv; ordDiv = t; }
        }
        fields.qualDiv = qualDiv;
        fields.interest = (val('interest') || 0) + Math.max(0, ordDiv - qualDiv);

        fields.scheduleCNet = val('sch1Business') || 0;

        // Schedule 1 line 5 mixes rentals with K-1 passthrough. Prefer the
        // Schedule E lines that isolate each piece: page 1 line 26 (rentals)
        // and page 2 line 32 (partnership/S-corp K-1s). A found-but-blank
        // Schedule E line means zero for that piece.
        var line5 = val('sch1RentalPS');
        var schEFound = found('schERental') || found('schEK1') || found('schETotal');
        var rental = found('schERental') ? (val('schERental') || 0) : null;
        var k1 = found('schEK1') ? (val('schEK1') || 0) : null;
        var estate = found('schEEstate') ? (val('schEEstate') || 0) : 0;
        if (schEFound) {
          if (rental !== null && rental !== 0) {
            fields.rentalNet = rental;
            warnings.push('Schedule E line 26 (' + TSIQ.fmt.usd(rental) + ') mapped entirely to ' +
              'Rental — this line also includes royalties on some returns; confirm the split if ' +
              'this client has royalty income.');
          }
          if (k1 !== null && k1 !== 0) {
            fields.passthroughK1 = k1;
            warnings.push(TSIQ.fmt.usd(k1) + ' of partnership/S-corp income found on Schedule E — ' +
              'enter the entity\'s W-2 wages (for the §199A wage limit) and check SSTB status manually.');
          }
          if (estate) {
            fields.otherIncome = (fields.otherIncome || 0) + estate;
            warnings.push(TSIQ.fmt.usd(estate) + ' of estate/trust income mapped to Other Income.');
          }
          var pieces = (rental || 0) + (k1 || 0) + estate;
          if (line5 !== null && Math.abs(line5 - pieces) >= 2) {
            warnings.push('Schedule E pieces (' + TSIQ.fmt.usd(pieces) + ') do not tie to Schedule 1 ' +
              'line 5 (' + TSIQ.fmt.usd(line5) + ') — royalties, farm rentals, or REMIC amounts may ' +
              'be involved. Review the split manually.');
          }
        } else if (line5 !== null && line5 !== 0) {
          fields.rentalNet = line5;
          warnings.push('Schedule 1 line 5 includes rentals AND K-1 pass-throughs; the Schedule E ' +
            'detail lines were not found in this PDF, so the whole ' + TSIQ.fmt.usd(line5) +
            ' was mapped to Rental. Split it manually if this client has K-1 income.');
        }

        // Capital gain character: 1040 line 7 is ST+LT combined; Schedule D
        // line 15 isolates the long-term piece (preferential rates). If a
        // Schedule D was found at all, a blank line 15 means LT is zero.
        var line7 = val('capGain');
        var schDPresent = found('schD7ST') || found('schD15LT');
        var lt = schDPresent ? (val('schD15LT') || 0) : null;
        if (line7 !== null) {
          if (lt !== null) {
            fields.ltcg = Math.max(0, Math.min(line7, lt));
            var st = line7 - fields.ltcg;
            if (Math.abs(st) >= 1) {
              fields.otherIncome = (fields.otherIncome || 0) + st;
              warnings.push(TSIQ.fmt.usd(st) + ' of the capital gain is short-term (ordinary ' +
                'rates) — mapped to Other Income. Confirm whether the gain recurs; one-time ' +
                'sales should usually be removed for a multi-year projection.');
            }
          } else {
            fields.ltcg = line7;
            if (line7 !== 0) warnings.push('Capital gain of ' + TSIQ.fmt.usd(line7) + ' mapped as ' +
              'long-term, but no Schedule D was found — confirm the short-term/long-term ' +
              'split, and whether the gain is one-time.');
          }
        }

        // Retirement/SS taxable amounts → other income.
        var retire = (val('iraTaxable') || 0) + (val('pension') || 0) + (val('socialSec') || 0);
        if (retire) {
          fields.otherIncome = (fields.otherIncome || 0) + retire;
          warnings.push(TSIQ.fmt.usd(retire) + ' of IRA/pension/Social Security taxable income ' +
            'was mapped to Other Income (note: the engine will not apply SS-taxability ' +
            'phase-ins to it — review if Social Security is a large share).');
        }

        // Itemized detail (present only when Schedule A exists).
        if (val('saltRealEstate') !== null) fields.propertyTax = val('saltRealEstate');
        if (val('mortgageInterest') !== null) fields.mortgageInterest = val('mortgageInterest');
        var charity = (val('charityCash') || 0) + (val('charityOther') || 0);
        if (charity) fields.charitable = charity;
        // Not mapped to any profile field (state tax is modeled as a flat
        // effective rate, not itemized detail) — surfaced only so the
        // advisor can sanity-check the entered state rate against it.
        if (val('saltIncomeTax') !== null && val('saltIncomeTax') !== 0) {
          warnings.push('Schedule A shows ' + TSIQ.fmt.usd(val('saltIncomeTax')) +
            ' of state/local income tax paid — confirm the State effective rate field ' +
            'produces a comparable figure for this client.');
        }

        // Payments are deliberately NOT parsed: they print in a detached
        // block on many layouts (unreliable), and prior-year withholding/
        // estimates aren't this year's YTD figures anyway.
        warnings.push('Withholding and estimated payments are not imported — enter ' +
          'current-year YTD amounts in the Payments section as they happen.');

        // Filing-status inference from the standard deduction of the form's
        // year (only when the deduction matches a standard amount exactly).
        var STD = {
          2022: { single: 12950, mfj: 25900, hoh: 19400 },
          2023: { single: 13850, mfj: 27700, hoh: 20800 },
          2024: { single: 14600, mfj: 29200, hoh: 21900 },
          2025: { single: 15750, mfj: 31500, hoh: 23625 }
        };
        var ded = val('deduction');
        if (formYear && STD[formYear] && ded !== null) {
          var table = STD[formYear];
          if (ded === table.mfj) fields.filingStatus = 'mfj';
          else if (ded === table.hoh) fields.filingStatus = 'hoh';
          else if (ded === table.single) {
            fields.filingStatus = 'single';
            warnings.push('Standard deduction matches Single — but MFS uses the same amount; confirm.');
          } else {
            warnings.push('Deduction of ' + TSIQ.fmt.usd(ded) + ' does not match a ' + formYear +
              ' standard amount — likely itemized (or age-65+/blind add-ons). Filing status not inferred; set it manually.');
          }
        } else {
          warnings.push('Filing status could not be inferred — set it manually.');
        }

        if (formYear && formYear < TSIQ.TABLES_2026.taxYear - 1) {
          warnings.push('This is a ' + formYear + ' return — update the figures to the client\'s ' +
            'current run-rate before presenting a ' + TSIQ.TABLES_2026.taxYear + ' plan.');
        }

        // 2025+ returns can carry new OBBBA below-the-line deductions (no tax
        // on tips/overtime, the senior deduction, car loan interest) reported
        // via Schedule 1-A — not parsed into any field here, so flag its
        // presence rather than leaving an unexplained gap in the AGI/taxable-
        // income tie-out.
        var hasSchedule1A = pageData.some(function (pd) {
          return pd.rows.some(function (row) { return /Schedule\s*1-A/i.test(row.text); });
        });
        if (hasSchedule1A) {
          warnings.push('This return includes Schedule 1-A (tips/overtime/senior/car-loan-' +
            'interest deductions) — these amounts are not imported into any field, which can ' +
            'explain a gap between the parsed figures and the return\'s own AGI/taxable income.');
        }

        warnings.push('Dependents are not parsed from the PDF — enter CTC-qualifying children ' +
          'and other dependents manually.');

        return {
          fields: fields,
          raw: raw,                       // reference lines for cross-checking
          reference: {
            totalIncome: val('totalIncome'), agi: val('agi'),
            taxableIncome: val('taxableIncome'), totalTax: val('totalTax'),
            seTax: val('seTax'), deduction: ded, qbiDeduction: val('qbiDeduction')
          },
          formYear: formYear,
          warnings: warnings
        };
      });
  };
})();
