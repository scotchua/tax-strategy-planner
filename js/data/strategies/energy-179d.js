/* ============================================================================
 * STRATEGY: §179D Energy-Efficient Commercial Building Deduction
 * One source object → advisor view, client PDF, client slideshow.
 * ==========================================================================*/
window.TSIQ = window.TSIQ || {};
TSIQ.strategyModules = TSIQ.strategyModules || [];

TSIQ.strategyModules.push({
  id: 'energy-179d',
  name: '§179D Energy-Efficient Commercial Building Deduction',
  category: 'Real Estate & Cost Recovery',
  applyOrder: 58,
  modeled: true,

  advisor: {
    summary:
      'DEADLINE FIRST: OBBBA (P.L. 119-21) TERMINATED §179D for property ' +
      'whose construction begins after June 30, 2026 — this is a ' +
      'use-it-or-lose-it window, and "begins construction" is the operative ' +
      'test. §179D allows an immediate deduction for energy-efficient ' +
      'commercial building property (interior lighting, HVAC/hot water, ' +
      'envelope) placed in service in a commercial building or a ' +
      'residential building 4+ stories. The deduction is a sliding scale ' +
      'per square foot keyed to modeled energy savings vs. an ASHRAE 90.1 ' +
      'baseline — for 2026 roughly $0.58–$1.16/sqft at the base rate, ' +
      'multiplied 5x to roughly $2.90–$5.81/sqft when prevailing wage and ' +
      'apprenticeship (PW&A) requirements are met (indexed figures — ' +
      'approximate). Because government and tax-exempt building owners ' +
      'cannot use it, they may ALLOCATE the deduction to the designer ' +
      '(architect/engineer/design-build contractor) — a major benefit for ' +
      'design firms. The deduction reduces the building property\'s basis, ' +
      'so it is an acceleration against 39-year depreciation, not new money.',
    mechanics: [
      'Qualifying systems: interior lighting, HVAC and hot water, and ' +
      'building envelope, certified by a qualified individual using ' +
      'IRS-approved energy modeling software against the applicable ASHRAE ' +
      '90.1 reference standard.',
      'Sliding scale: the per-sqft rate starts at 25% modeled energy-cost ' +
      'savings and climbs with each additional percentage point of savings ' +
      'to a cap at 50% savings. Meeting PW&A quintuples the rate. 2026 ' +
      'amounts are inflation-indexed (~$0.58 base floor to ~$5.81 PW&A cap ' +
      'per sqft — verify against the current-year revenue procedure).',
      'OBBBA termination: no §179D deduction for property the construction ' +
      'of which begins after 6/30/2026. Projects already under construction ' +
      'by that date remain eligible when placed in service.',
      'Designer allocation: government and tax-exempt owners may allocate ' +
      'the deduction to the primary designer via a written allocation ' +
      'letter (§179D(d)) — architects and engineers with public-sector work ' +
      'should sweep open years.',
      'Basis reduction: the deduction reduces the energy property\'s ' +
      'depreciable basis — the benefit is acceleration vs. 39-year ' +
      'straight-line, plus the rate arbitrage.',
      'Deduction repeats: the same building can generate additional §179D ' +
      'on later qualifying retrofits (subject to per-sqft lifetime caps ' +
      'measured over prior deductions in recent years).'
    ],
    authority: [
      { type: 'IRC', cite: 'IRC §179D', note: 'The deduction: energy-efficient commercial building property, sliding per-sqft scale, PW&A multiplier (post-IRA structure).' },
      { type: 'IRC', cite: 'P.L. 119-21 (OBBBA) — §179D termination', note: 'No deduction for property whose construction begins after June 30, 2026 — the planning deadline that leads this strategy.' },
      { type: 'IRC', cite: 'IRC §179D(d)', note: 'Allocation of the deduction to the designer for buildings owned by governmental and tax-exempt entities.' },
      { type: 'Admin', cite: 'Rev. Proc. 2025-32 (2026 inflation adjustments)', note: 'Source of the indexed 2026 per-square-foot amounts (approximate ~$0.58–$5.81 range stated; verify exact figures here).' },
      { type: 'Admin', cite: 'Form 7205', note: 'Required form for claiming §179D, identifying the building, savings percentage, PW&A status, and any designer allocation.' },
      { type: 'Admin', cite: 'ASHRAE Standard 90.1 (applicable edition)', note: 'The reference baseline the modeled energy-cost savings are measured against.' }
    ],
    requirements: [
      'Commercial building (or residential 4+ stories) with qualifying lighting/HVAC/envelope property — and construction beginning by 6/30/2026.',
      'Energy modeling and certification by a qualified third party using approved software.',
      'PW&A compliance documented from the start of construction if the 5x rate is sought — it cannot be retrofitted afterward.',
      'For designers: a written allocation letter from the government/tax-exempt building owner.'
    ],
    risks: [
      'The termination cliff: projects that slip past the 6/30/2026 construction-start date get nothing — document the start (physical work of a significant nature) contemporaneously.',
      'PW&A failures (wage shortfalls, apprenticeship ratios) knock the deduction back to the base rate — an 80% haircut.',
      'Certification quality matters; modeling shortcuts are an exam issue.',
      'Basis reduction means less depreciation later and larger gain on sale — acceleration, not free money.',
      'The 2026 per-sqft figures are indexed and stated here approximately — pull the exact amounts from the current revenue procedure before quantifying for a client.'
    ],
    bestFit: [
      'Owners with commercial construction or major lighting/HVAC/envelope retrofits already underway or startable before 7/1/2026.',
      'Architecture, engineering, and design-build firms with government or tax-exempt projects (schools, municipal buildings) in open years.',
      'PW&A-compliant projects (union or prevailing-wage contractors) where the 5x multiplier is realistic.'
    ],
    implementation: [
      'Triage the pipeline NOW against the 6/30/2026 construction-start deadline; document start dates.',
      'Engage a §179D certification firm for energy modeling before design is locked — savings percentages are won in design.',
      'If pursuing the 5x rate, put PW&A compliance tracking in the construction contracts from day one.',
      'Designers: request allocation letters from public-sector clients for eligible placed-in-service years.',
      'Claim on Form 7205 with the return; reduce the property\'s basis and retain the certification package.'
    ]
  },

  client: {
    teaser: 'A building-upgrade write-off with a hard deadline months away',
    headline: 'Energy-efficient building work: a big deduction — if construction starts in time',
    plainEnglish: [
      'When you build or upgrade a commercial building with efficient lighting, heating and cooling, or insulation and windows, the tax law rewards you with an immediate deduction based on the building\'s square footage — instead of waiting 39 years to deduct those costs the normal way. On a decent-sized building, that can be hundreds of thousands of dollars moved from "someday" to "this year."',
      'Here is the urgent part: Congress ended this deduction for projects that start construction after June 30, 2026. Projects that break ground before then keep their eligibility. If you have been considering a building project or a major systems upgrade, the calendar — not the tax code — is now the main constraint.',
      'The deduction size depends on how efficient the building is and on how construction workers are paid — meeting certain wage standards multiplies the deduction five times. An independent engineer certifies the energy savings, and that certificate is your proof.'
    ],
    analogy: 'It\'s like a store closing sale on a deduction — the discount is real, but the doors close for new projects on June 30, 2026.',
    benefits: [
      'An immediate deduction of up to several dollars per square foot',
      'Five times larger when construction meets certain wage standards',
      'Available for upgrades to existing buildings, not just new construction',
      'Design firms can receive the deduction for government building projects'
    ],
    steps: [
      'We check your project timeline against the June 30, 2026 construction-start deadline — first and fast',
      'An independent engineer models and certifies the energy savings',
      'We coordinate the wage documentation if the 5x version is in reach',
      'We claim the deduction with the proper IRS form and adjust your building records'
    ],
    considerations: [
      'This is an acceleration — the deducted amount reduces the building\'s future depreciation, so we plan the whole timeline.',
      'The deadline is about when construction genuinely begins, and it must be documentable; a signed contract alone may not be enough.',
      'The exact per-square-foot rates adjust with inflation each year — we verify the current figures before promising a number.'
    ]
  },

  inputs: [
    { key: 'deductionAmount', label: 'Certified §179D deduction', type: 'currency', default: 50000 },
    { key: 'targetIncome', label: 'Where the building income is reported', type: 'select', default: 'rental',
      options: [{ value: 'rental', label: 'Rental (Sch E)' }, { value: 'business', label: 'Business (Sch C / K-1)' }] }
  ],

  appliesTo: function (profile) {
    return true; // validated in apply(): needs the selected income stream
  },

  /**
   * Model vs. baseline: §179D reduces the property's basis, so the baseline
   * is assumed to have depreciated the same dollars straight-line over 39
   * years (commercial). Year 1: deduct amount − amount/39; years 2+: income
   * is HIGHER than baseline by amount/39 (that slice of depreciation was
   * used up). 39 years exceeds the projection window, so the give-back runs
   * every later year. Business dollars route to scheduleCNet first (also
   * saves SE tax), else passthroughK1; route fixed in year 1 via state.
   */
  apply: function (profile, params, yearIndex, state) {
    var p = Object.assign({}, profile);
    var notes = [];
    var tb = TSIQ.TABLES_2026;
    var recovery = tb.commercialRecoveryYears; // 39-yr baseline assumption
    var amt = params.deductionAmount || 0;
    var sl = amt / recovery;

    if (yearIndex === 0) {
      var route;
      if (params.targetIncome === 'business') {
        route = p.scheduleCNet > 0 ? 'scheduleCNet' : (p.passthroughK1 > 0 ? 'passthroughK1' : 'none');
      } else {
        route = 'rentalNet';
      }
      state.d179dRoute = route;
      if (route === 'none') {
        notes.push('No positive business income (Schedule C or K-1) to deduct against — ' +
          'select the rental stream or correct the profile. No benefit modeled.');
        return { profile: p, notes: notes };
      }
      p[route] = (p[route] || 0) - (amt - sl);
      notes.push(TSIQ.fmt.usd(amt) + ' §179D deduction (certified energy savings; ' +
        'modeled net of the ' + TSIQ.fmt.usd(sl) + ' straight-line slice the baseline ' +
        'would have taken over 39 years). DEADLINE: §179D is TERMINATED for property ' +
        'beginning construction after 6/30/2026 (OBBBA).');
      notes.push('2026 per-sqft rates are indexed (~$0.58–$5.81 depending on savings % ' +
        'and prevailing wage/apprenticeship) — approximate; verify exact figures in the ' +
        'current revenue procedure.');
      if (route === 'rentalNet' && !p.rentalLossesUsable && (p.rentalNet || 0) < 0) {
        notes.push('Rental losses flagged NOT currently usable (§469) — the excess is ' +
          'suspended and carried forward in the projection.');
      }
    } else if (state.d179dRoute && state.d179dRoute !== 'none') {
      // Baseline still deducts the 39-yr straight-line slice; §179D used it up.
      p[state.d179dRoute] = (p[state.d179dRoute] || 0) + sl;
    }
    return { profile: p, notes: notes };
  }
});
