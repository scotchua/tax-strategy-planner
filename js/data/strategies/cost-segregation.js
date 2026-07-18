/* ============================================================================
 * STRATEGY: Cost Segregation Study
 * One source object → advisor view, client PDF, client slideshow.
 * ==========================================================================*/
window.TSIQ = window.TSIQ || {};
TSIQ.strategyModules = TSIQ.strategyModules || [];

TSIQ.strategyModules.push({
  id: 'cost-segregation',
  name: 'Cost Segregation Study',
  category: 'Real Estate & Cost Recovery',
  applyOrder: 50,
  modeled: true,

  advisor: {
    summary:
      'An engineering-based study that reclassifies components of a building ' +
      '(normally depreciated straight-line over 27.5 or 39 years) into 5-, 7-, and ' +
      '15-year MACRS property. Reclassified components qualify for 100% bonus ' +
      'depreciation under §168(k) (made permanent by OBBBA for property acquired ' +
      'after 1/19/2025), front-loading deductions into year one. For property ' +
      'already in service, the catch-up adjustment is taken all at once under ' +
      '§481(a) via Form 3115 — no amended returns.',
    mechanics: [
      'Engineering study allocates purchase price / construction cost among ' +
      '§1245 personal property (5/7-year: carpet, cabinetry, specialty electrical, ' +
      'appliances), 15-year land improvements (paving, landscaping, site utilities), ' +
      'and the remaining §1250 building shell (27.5/39-year straight-line).',
      'Reclassified 5/7/15-year property is eligible for 100% bonus depreciation ' +
      'under §168(k) in the placed-in-service year.',
      'Typical reclassification: 20–35% of depreciable basis for residential ' +
      'rentals, 15–45% for commercial depending on property type.',
      'Deductions flow to Schedule E. If the loss exceeds rental income, §469 ' +
      'passive activity rules control whether it is currently usable: real estate ' +
      'professional status (Reg. §1.469-9) with material participation, the STR ' +
      '"loophole" (Reg. §1.469-1T(e)(3)(ii) — avg stay ≤7 days), other passive ' +
      'income, or the $25k active-participation allowance (phases out $100k–$150k AGI).',
      'The acceleration is a timing benefit: later-year depreciation is lower, and ' +
      '§1245/§1250 recapture applies on sale (unless deferred via §1031 exchange). ' +
      'Value comes from time value of money and rate arbitrage.'
    ],
    authority: [
      { type: 'IRC', cite: 'IRC §168(k)', note: '100% bonus depreciation, made permanent by OBBBA (P.L. 119-21) for property acquired and placed in service after Jan 19, 2025.' },
      { type: 'IRC', cite: 'IRC §§167, 168; §1245/§1250', note: 'Depreciation framework; recapture character of reclassified components on disposition.' },
      { type: 'IRC', cite: 'IRC §469', note: 'Passive activity loss limits — the gating issue for whether accelerated losses are currently deductible.' },
      { type: 'Case', cite: 'Hosp. Corp. of America v. Comm\'r, 109 T.C. 21 (1997)', note: 'Landmark case: component-based depreciation of §1245 property within a building is permissible — the foundation of modern cost segregation.' },
      { type: 'Case', cite: 'Whiteco Indus., Inc. v. Comm\'r, 65 T.C. 664 (1975)', note: 'Six-factor test distinguishing tangible personal property from structural components.' },
      { type: 'Admin', cite: 'Rev. Proc. 87-56', note: 'Class lives and recovery periods for asset classes.' },
      { type: 'Admin', cite: 'Rev. Proc. 2015-13 / Form 3115 (DCN 7)', note: 'Automatic accounting-method change; §481(a) catch-up for property already in service — no amended returns.' },
      { type: 'Admin', cite: 'IRS Cost Segregation Audit Techniques Guide', note: 'IRS expectations for a quality study; engineering-based approach preferred over residual/rule-of-thumb.' },
      { type: 'Reg', cite: 'Reg. §1.469-9; §1.469-1T(e)(3)(ii)', note: 'Real estate professional rules; short-term rental exception to the per-se rental passive rule.' }
    ],
    requirements: [
      'Depreciable real property (not land); owned by the taxpayer with basis to recover.',
      'A quality engineering-based study (IRS ATG standard) — not a percentage guess.',
      'A path to use the losses: RE professional status, STR material participation, other passive income, or the §469(i) allowance.',
      'For in-service property: Form 3115 filed with a timely return for the year of change.'
    ],
    risks: [
      'Losses trapped by §469 if no passive-income path exists — model suspended losses honestly.',
      'Recapture on sale: §1245 recapture at ordinary rates on personal property; unrecaptured §1250 gain at 25%. Plan the exit (hold, 1031, or die with a step-up).',
      'Aggressive allocations invite exam adjustments; use a reputable engineering firm.',
      'Study cost ($3k–$15k typical) must be justified by the modeled benefit.',
      'State nonconformity: many states decouple from bonus depreciation.'
    ],
    bestFit: [
      'Recently acquired or constructed rentals with basis ≥ ~$500k (excluding land).',
      'Clients with RE professional status or short-term rentals with material participation.',
      'High-bracket years (37%) where acceleration arbitrages future lower rates.',
      'Clients planning to hold long-term or exit via 1031/step-up.'
    ],
    implementation: [
      'Confirm the passive-loss path before commissioning the study.',
      'Engage an engineering-based cost seg firm; obtain the allocation report.',
      'New acquisitions: apply on the placed-in-service year return. In-service property: file Form 3115 (automatic consent, DCN 7) with the §481(a) adjustment.',
      'Attach the depreciation schedules; retain the study for exam support.',
      'Calendar the recapture exposure in the client\'s permanent file.'
    ]
  },

  client: {
    teaser: 'Unlocks deductions hiding inside an asset you already own',
    headline: 'Unlock the depreciation hiding inside your building',
    plainEnglish: [
      'When you buy a rental or commercial building, the IRS normally lets you deduct its cost a little at a time — over 27.5 years (residential) or 39 years (commercial). But a building is not just walls: it is carpet, cabinets, appliances, parking lots, and landscaping, and the tax law lets those items be written off much faster — in as little as one year.',
      'A cost segregation study is a detailed engineering report that identifies exactly which parts of your property qualify for the faster write-off. Under current law, most of those parts can be deducted 100% in the first year.',
      'The result is a very large deduction now instead of small deductions spread over decades. That frees up cash today that you can reinvest, pay down debt with, or use for the next property.'
    ],
    analogy: 'It\'s like being owed $27,500 paid out at $1,000 a year for 27 years — versus getting a big chunk of it today. A dollar today is worth far more than a dollar in 2050.',
    benefits: [
      'A large first-year tax deduction, often 20–35% of the building\'s cost',
      'More cash in your pocket now, when it can be reinvested',
      'Works on buildings you already own — no amended returns needed',
      'The study itself is tax-deductible'
    ],
    steps: [
      'We confirm your situation lets you use the deduction this year',
      'A licensed engineering firm studies your property (2–6 weeks)',
      'We apply the results to your tax return and handle all IRS forms',
      'You keep the report — it is your audit support'
    ],
    considerations: [
      'This accelerates deductions rather than creating new ones — we plan the later years and any future sale together so there are no surprises.',
      'The study has a one-time professional fee, which we weigh against your projected savings before you commit.'
    ]
  },

  inputs: [
    { key: 'buildingBasis', label: 'Depreciable basis (building, excl. land)', type: 'currency', default: 1000000 },
    { key: 'reclassPct', label: '% reclassified to 5/7/15-yr property', type: 'percent', default: 25 },
    { key: 'propertyType', label: 'Property type', type: 'select', default: 'residential',
      options: [{ value: 'residential', label: 'Residential (27.5-yr)' }, { value: 'commercial', label: 'Commercial (39-yr)' }] },
    { key: 'studyCost', label: 'Cost of study (deductible)', type: 'currency', default: 6000 }
  ],

  suggest: function (p) {
    if (!p.rentalNet) return null;
    return { reason: 'Rental activity on the return — if the property was acquired recently and depreciation looks straight-line, a study may unlock a large year-one deduction.' };
  },

  appliesTo: function (profile) {
    return true; // needs a rental; validated with a note in apply()
  },

  /**
   * Model vs. baseline: the baseline rentalNet is assumed to already include
   * regular straight-line depreciation on the full basis. Cost seg moves
   * `reclassPct` of basis into year 1 (100% bonus), so:
   *   Year 1: extra deduction = reclassAmt − (reclassAmt / recovery)
   *   Years 2+: rental income is HIGHER than baseline by reclassAmt / recovery
   *   (that slice of straight-line depreciation was already used up).
   * Mid-year/mid-quarter conventions not modeled (immaterial to comparison).
   */
  apply: function (profile, params, yearIndex, state) {
    var p = Object.assign({}, profile);
    var notes = [];
    var tb = TSIQ.TABLES_2026;
    var recovery = params.propertyType === 'commercial'
      ? tb.commercialRecoveryYears : tb.residentialRentalRecoveryYears;
    var reclassAmt = params.buildingBasis * (params.reclassPct / 100);
    var slPerYear = reclassAmt / recovery;

    if (yearIndex === 0) {
      var bonus = reclassAmt * tb.bonusDepreciationRate;
      p.rentalNet = p.rentalNet - (bonus - slPerYear) - (params.studyCost || 0);
      // Tracked for the plan-level "accelerated depreciation accumulating"
      // materiality note (scenario-engine.js) — quantifies future §1245/§1250
      // recapture-on-sale exposure this tool does not model.
      state.acceleratedDepAccumulated = (state.acceleratedDepAccumulated || 0) + (bonus - slPerYear);
      notes.push('Year 1: ' + TSIQ.fmt.usd(bonus) + ' bonus depreciation on ' +
        TSIQ.fmt.usd(reclassAmt) + ' of reclassified property (100% bonus, §168(k)).');
      if (!p.rentalLossesUsable) {
        notes.push('Rental losses flagged NOT currently usable (§469) — excess loss is suspended and carried forward in the projection.');
      }
    } else {
      // Baseline still assumes SL on the reclassified slice; cost seg used it up.
      p.rentalNet = p.rentalNet + slPerYear;
    }
    return { profile: p, notes: notes };
  }
});
