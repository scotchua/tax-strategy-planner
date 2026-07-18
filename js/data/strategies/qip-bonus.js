/* ============================================================================
 * STRATEGY: Qualified Improvement Property (QIP) Bonus
 * One source object → advisor view, client PDF, client slideshow.
 * ==========================================================================*/
window.TSIQ = window.TSIQ || {};
TSIQ.strategyModules = TSIQ.strategyModules || [];

TSIQ.strategyModules.push({
  id: 'qip-bonus',
  name: 'Qualified Improvement Property (QIP) Bonus',
  category: 'Real Estate & Cost Recovery',
  applyOrder: 58,
  modeled: true,

  advisor: {
    summary:
      'Qualified Improvement Property — any improvement made by the taxpayer ' +
      'to the INTERIOR of NONresidential real property after the building is ' +
      'first placed in service — is 15-year MACRS property (§168(e)(6), as ' +
      'fixed by the CARES Act after the TCJA drafting error), which makes it ' +
      'eligible for 100% bonus depreciation under §168(k) (permanent under ' +
      'OBBBA for property acquired after 1/19/2025). The practical effect: a ' +
      'tenant buildout, office reconfiguration, or interior renovation that ' +
      'would naively sit on a 39-year schedule can instead be fully deducted ' +
      'in year one — without a cost segregation study, because QIP ' +
      'classification is categorical, not engineering-based. Exclusions are ' +
      'structural: building enlargements, elevators/escalators, and internal ' +
      'structural framework never qualify. This is acceleration against the ' +
      '39-year baseline — the give-back and recapture follow.',
    mechanics: [
      'Definition (§168(e)(6)): improvements to an interior portion of ' +
      'nonresidential real property, placed in service AFTER the building ' +
      'itself was first placed in service, made by the taxpayer. Excluded: ' +
      'enlargement of the building, elevators and escalators, and the ' +
      'internal structural framework.',
      'Classification is categorical: drywall, interior doors, ceilings, ' +
      'interior lighting, plumbing and electrical distribution serving the ' +
      'interior space, flooring, and fire suppression typically qualify — no ' +
      'engineering study required (unlike cost segregation).',
      '15-year recovery, straight-line class — and because the recovery ' +
      'period is ≤ 20 years, QIP is qualified property for 100% bonus under ' +
      '§168(k). One placed-in-service year, one full deduction.',
      'Residential rental interiors do NOT qualify — QIP is a nonresidential ' +
      'concept. Mixed-use buildings need the nonresidential characterization ' +
      'analysis first.',
      'Missed QIP in a prior open year (e.g., depreciated at 39 years) is ' +
      'fixed prospectively via Form 3115 automatic method change with a ' +
      '§481(a) catch-up (Rev. Proc. 2020-25 provided the CARES-era template).',
      'Interaction: electing out of bonus for the 15-year class (§168(k)(7)) ' +
      'leaves QIP on 15-year straight-line — still four times faster than 39 ' +
      'years, useful when a year-one loss would be wasted.'
    ],
    authority: [
      { type: 'IRC', cite: 'IRC §168(e)(6)', note: 'QIP definition: interior improvements to nonresidential real property placed in service after the building; exclusions for enlargement, elevators/escalators, internal structural framework.' },
      { type: 'IRC', cite: 'IRC §168(k)', note: '100% bonus depreciation for property with recovery period ≤ 20 years — QIP\'s 15-year life is the ticket in; permanent under OBBBA for acquisitions after 1/19/2025.' },
      { type: 'Admin', cite: 'CARES Act (P.L. 116-136) §2307', note: 'The retroactive "retail glitch" fix assigning QIP its intended 15-year recovery period, restoring bonus eligibility.' },
      { type: 'Admin', cite: 'Rev. Proc. 2020-25', note: 'Automatic method-change / late-election procedures for QIP — the template for correcting misclassified improvements via Form 3115.' },
      { type: 'IRC', cite: 'IRC §168(k)(7)', note: 'Election out of bonus by class — the deliberate-slowdown option for loss-limited years.' },
      { type: 'IRC', cite: 'IRC §1245/§1250', note: 'Recapture exposure on disposition of fully-bonused improvement property.' }
    ],
    requirements: [
      'NONresidential building, already placed in service before the improvements (day-one buildout of a brand-new building is not QIP).',
      'Interior improvements only — enlargements, elevators/escalators, and structural framework are carved out by statute.',
      'Improvements made by the taxpayer (a purchased building\'s pre-existing improvements do not carry QIP status to the buyer).',
      'A use path for the deduction: §469 passive-loss gating applies to rental-held property; §461(l) can limit business-side losses.'
    ],
    risks: [
      'Misclassification: sweeping structural work, exterior work, or building additions into QIP is an exam adjustment waiting to happen — scope the invoices.',
      'A large year-one loss can be trapped (§469 for landlords without REPS/STR status; §461(l) on the business side) — run the opt-out analysis first.',
      'Recapture at ordinary/25% rates on disposition of fully-bonused improvements; plan the exit.',
      'State decoupling from bonus depreciation creates addback schedules.',
      'Landlord vs. tenant ownership of the improvements (who made and owns them, lease terms, §110 allowances) determines who deducts — get the lease right first.'
    ],
    bestFit: [
      'Commercial landlords funding tenant buildouts or common-area interior renovations.',
      'Business owner-occupants renovating leased or owned nonresidential space (restaurants, medical suites, offices).',
      'High-bracket years where a six-figure interior renovation can be absorbed currently — or paired with REPS/STR strategies on the rental side.'
    ],
    implementation: [
      'Scope the project against the statutory exclusions BEFORE signing contracts — separate interior-improvement line items from structural/exterior work in the bids.',
      'Confirm the building is nonresidential and was in service before the improvement.',
      'Decide bonus vs. elect-out (§168(k)(7), 15-year class) based on the loss-usability analysis for the year.',
      'Claim on Form 4562 in the placed-in-service year; for prior-year misclassifications, file Form 3115 (automatic consent) with the §481(a) catch-up.',
      'Retain invoices segregating qualifying interior work as the exam file.'
    ]
  },

  client: {
    teaser: 'Certain building projects can be written off decades ahead of the normal schedule',
    headline: 'Interior renovations: deduct in one year what others spread over 39',
    plainEnglish: [
      'When you improve the inside of a commercial building — remodeling offices, building out a space for a tenant, upgrading interior lighting or flooring — the default tax schedule spreads that deduction over 39 years. At that pace, a renovation you pay for today is still trickling onto your tax return in the 2060s.',
      'But the tax law puts most interior improvements to commercial buildings in a special fast lane. Instead of 39 years, they qualify for an immediate 100% write-off in the year the work is finished. No engineering study, no special appraisal — the category itself qualifies.',
      'The main rules: it must be interior work on a commercial (not residential) building that was already in use, and things like additions, elevators, and structural framing don\'t count. We check the project scope up front so the invoices tell the right story, and we make sure a deduction this large actually helps you this year — if not, we can deliberately slow it down.'
    ],
    analogy: 'It\'s like a 39-year layaway plan where the store suddenly lets you take the whole discount today — as long as the paperwork describes the purchase correctly.',
    benefits: [
      'Deduct 100% of qualifying interior improvements in year one',
      'No costly engineering study required — the category qualifies by definition',
      'Applies to tenant buildouts, remodels, lighting, flooring, and more',
      'If a giant deduction would be wasted this year, we can elect a slower schedule instead'
    ],
    steps: [
      'We review your renovation plans against the qualification rules before work begins',
      'We coordinate with your contractor so bids and invoices separate qualifying work',
      'We model whether the full write-off or a slower schedule saves more, and file the right election',
      'If past renovations were put on the slow schedule by mistake, we can often recover those deductions too'
    ],
    considerations: [
      'This front-loads deductions rather than creating new ones — later years have less depreciation, and some is settled up if you sell.',
      'Residential rental interiors don\'t qualify, and neither do additions or structural work — the scope of the project decides.'
    ]
  },

  inputs: [
    { key: 'qipBasis', label: 'QIP placed in service (interior improvements)', type: 'currency', default: 150000 },
    { key: 'targetIncome', label: 'Where the building is reported', type: 'select', default: 'rental',
      options: [{ value: 'rental', label: 'Rental (Sch E)' }, { value: 'business', label: 'Business (Sch C / K-1)' }] }
  ],

  appliesTo: function (profile) {
    return true; // validated in apply(): needs the selected income stream
  },

  /**
   * Model vs. baseline (delta pattern like cost-segregation.js): the baseline
   * is assumed to have MISSED the QIP classification and depreciated the
   * improvement straight-line over 39 years. QIP + 100% bonus deducts it all
   * in year 1:
   *   Year 1: extra deduction = qipBasis − (qipBasis / 39)
   *   Years 2+: income HIGHER than baseline by qipBasis / 39 (that slice was
   *   used up). 39 years exceeds the projection, so the give-back runs every
   *   later year. (QIP's actual 15-year life only matters if electing OUT of
   *   bonus — not the modeled path; kept simple deliberately.)
   */
  apply: function (profile, params, yearIndex, state) {
    var p = Object.assign({}, profile);
    var notes = [];
    var tb = TSIQ.TABLES_2026;
    var baselineRecovery = tb.commercialRecoveryYears; // 39-yr baseline assumption
    var basis = params.qipBasis || 0;
    var sl = basis / baselineRecovery;

    if (yearIndex === 0) {
      var route;
      if (params.targetIncome === 'business') {
        route = p.scheduleCNet > 0 ? 'scheduleCNet' : (p.passthroughK1 > 0 ? 'passthroughK1' : 'none');
      } else {
        route = 'rentalNet';
      }
      state.qipRoute = route;
      if (route === 'none') {
        notes.push('No positive business income (Schedule C or K-1) to deduct against — ' +
          'select the rental stream or correct the profile. No benefit modeled.');
        return { profile: p, notes: notes };
      }
      var bonus = basis * tb.bonusDepreciationRate;
      p[route] = (p[route] || 0) - (bonus - sl);
      // Tracked for the plan-level "accelerated depreciation accumulating"
      // materiality note (scenario-engine.js) — quantifies future §1245/§1250
      // recapture-on-sale exposure this tool does not model.
      state.acceleratedDepAccumulated = (state.acceleratedDepAccumulated || 0) + (bonus - sl);
      notes.push('Year 1: ' + TSIQ.fmt.usd(bonus) + ' bonus depreciation on QIP ' +
        '(15-year property, §168(e)(6); 100% bonus, §168(k)) — modeled net of the ' +
        TSIQ.fmt.usd(sl) + ' straight-line slice a 39-year baseline would have taken. ' +
        'Interior improvements to NONresidential property only; enlargements, ' +
        'elevators/escalators, and structural framework are excluded.');
      if (route === 'rentalNet' && !p.rentalLossesUsable && (p.rentalNet || 0) < 0) {
        notes.push('Rental losses flagged NOT currently usable (§469) — the excess is ' +
          'suspended and carried forward. Consider REPS / short-term rental strategies, ' +
          'or the §168(k)(7) elect-out to 15-year straight-line.');
      }
    } else if (state.qipRoute && state.qipRoute !== 'none') {
      // Baseline still deducts its 39-yr straight-line slice; bonus used it up.
      p[state.qipRoute] = (p[state.qipRoute] || 0) + sl;
    }
    return { profile: p, notes: notes };
  }
});
