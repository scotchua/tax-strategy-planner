/* ============================================================================
 * STRATEGY: Land vs. Building Basis Allocation
 * One source object → advisor view, client PDF, client slideshow.
 * ==========================================================================*/
window.TSIQ = window.TSIQ || {};
TSIQ.strategyModules = TSIQ.strategyModules || [];

TSIQ.strategyModules.push({
  id: 'land-building-allocation',
  name: 'Land vs. Building Basis Allocation',
  category: 'Real Estate & Cost Recovery',
  applyOrder: 57,
  modeled: true,

  advisor: {
    summary:
      'Land is not depreciable; the building and improvements are. When land ' +
      'and building are acquired for a lump sum, Reg. §1.167(a)-5 requires ' +
      'the basis to be apportioned between them in proportion to relative ' +
      'fair market values — but it does not mandate any particular data ' +
      'source. Many preparers default to the county assessor\'s land/' +
      'improvement ratio, which frequently overstates land (assessors value ' +
      'for property tax, not federal income tax, and land ratios vary wildly ' +
      'by county methodology). A supportable allocation built from an ' +
      'appraisal, comparable land sales, or insurance replacement-cost data ' +
      'often shifts meaningfully more basis to the depreciable building — ' +
      'every defensible dollar moved off the land line depreciates over ' +
      '27.5/39 years (and feeds any cost segregation study). This is a ' +
      'facts-and-documentation play, best made in the placed-in-service year.',
    mechanics: [
      'Governing standard: lump-sum purchase price is allocated by RELATIVE ' +
      'FMV of land vs. improvements at acquisition (Reg. §1.167(a)-5); the ' +
      'contract can also state an allocation, which carries weight when ' +
      'negotiated at arm\'s length between adverse parties.',
      'Hierarchy of support (strongest first): a qualified appraisal ' +
      'separately valuing the land; comparable vacant-land sales; insurance ' +
      'replacement-cost data for the structure (replacement cost less ' +
      'depreciation supports the building value); the assessor ratio is the ' +
      'default, not the ceiling.',
      'The assessor-ratio shortcut is only as good as the county: some ' +
      'jurisdictions carry stale or policy-driven land values. Using the ' +
      'RATIO of assessed values (not the assessed dollars) applied to actual ' +
      'cost is the common method the IRS sees — deviating from it requires ' +
      'the file to say why.',
      'Downstream effects: a higher building allocation increases annual ' +
      'depreciation, enlarges the base for a cost segregation study, and ' +
      'raises future unrecaptured §1250 gain (25% ceiling rate) on sale — ' +
      'timing/rate arbitrage, not free money.',
      'Site improvements (paving, landscaping, site utilities) are neither ' +
      'land nor building — they are 15-year property; a lazy two-way ' +
      'allocation buries them in non-depreciable land.'
    ],
    authority: [
      { type: 'Reg', cite: 'Reg. §1.167(a)-5', note: 'Lump-sum basis must be apportioned between depreciable property and non-depreciable land in proportion to relative fair market values.' },
      { type: 'IRC', cite: 'IRC §167(a); §168(c)', note: 'Depreciation allowance and the 27.5/39-year recovery periods the reallocated basis runs through.' },
      { type: 'IRC', cite: 'IRC §1060', note: 'For applicable asset acquisitions (buying a business with real estate), the residual method and any written allocation agreement bind the parties.' },
      { type: 'Admin', cite: 'IRS Pub. 527 (Residential Rental Property)', note: 'Describes allocating basis by FMV, with assessed values as an acceptable proxy — a proxy, not a mandate.' },
      { type: 'Admin', cite: 'IRS Cost Segregation Audit Techniques Guide', note: 'Exam framework for basis allocation quality; a documented valuation approach outranks rules of thumb.' }
    ],
    requirements: [
      'A lump-sum acquisition of land plus improvements (or an existing allocation worth revisiting in an open year / via the placed-in-service-year filing).',
      'Valuation support: appraisal with a separate land value, comparable land sales, or replacement-cost data — retained in the permanent file.',
      'Consistency: the allocation used for depreciation should match the closing documents and any §1060 agreement.',
      'Reasonableness: the resulting land percentage should be explainable against the neighborhood (a 5% land allocation in a dense urban core will not survive exam).'
    ],
    risks: [
      'An aggressive land allocation without valuation support is an easy exam adjustment — the assessor ratio is the IRS\'s anchor, and the burden of departing from it is the taxpayer\'s.',
      'Extra depreciation now becomes unrecaptured §1250 gain (25%) on sale — model the exit.',
      'In a §1060 deal, a contract allocation binds the buyer; negotiate it, don\'t inherit it.',
      'Changing a prior-year allocation on an in-service property is a method-of-accounting question — coordinate with Form 3115 rather than silently re-filing.'
    ],
    bestFit: [
      'New rental/commercial acquisitions where the county land ratio looks high relative to an appraisal or the market.',
      'High-land-value markets (urban cores, coastal areas) where the default ratio moves six figures of basis.',
      'Clients already commissioning an appraisal or cost segregation study — the land analysis is a cheap add-on.'
    ],
    implementation: [
      'Pull the assessor card and compute the default land ratio; compare against the appraisal and comparable land sales.',
      'Choose the best-supported allocation method; write a short memo tying the number to the evidence.',
      'For business acquisitions, negotiate the land/building split in the purchase agreement (§1060 allocation schedule).',
      'Set up the depreciation schedule using the supported building basis; separately state 15-year site improvements.',
      'Retain the appraisal/comps/replacement-cost data in the permanent file as exam support.'
    ]
  },

  client: {
    teaser: 'The default paperwork on your property may be shortchanging your deductions every year',
    headline: 'Make sure every deductible dollar of your property is actually deducted',
    plainEnglish: [
      'When you buy a rental or commercial property, the price covers two things: the land and the building. The building can be deducted over time through depreciation; the land cannot. So the split between them decides how big your deduction is — every single year you own the property.',
      'Most tax preparers take the split straight from the county assessor\'s records. But assessors value property for their own purposes, and their land numbers are often too high — which quietly shrinks your deductions for decades.',
      'With better evidence — an appraisal, actual land sales nearby, or insurance replacement-cost data — we can often support a larger building share. Nothing aggressive: just replacing a rough default with real documentation, and collecting the extra deduction year after year.'
    ],
    analogy: 'It\'s like being reimbursed for a trip based on a guess of the mileage — if the actual odometer shows more, you should be paid on the real number.',
    benefits: [
      'A bigger depreciation deduction every year you own the property',
      'Based on documentation, not aggressive positions',
      'Makes every other depreciation strategy on the property more powerful',
      'One-time analysis with benefits that repeat for decades'
    ],
    steps: [
      'We compare the county\'s land/building split against real market evidence',
      'We gather the support — appraisal, land sales, replacement-cost data',
      'We set your depreciation schedule on the documented numbers',
      'You keep the evidence file — it\'s your protection if anyone ever asks'
    ],
    considerations: [
      'The split has to reflect reality — in areas where land genuinely is most of the value, the honest answer may be close to the county\'s number.',
      'Extra depreciation now is partly settled up when you eventually sell, so we plan the exit alongside the annual savings.'
    ]
  },

  inputs: [
    { key: 'additionalAnnualDepreciation', label: 'Additional annual depreciation from reallocation', type: 'currency', default: 5000 }
  ],

  appliesTo: function (profile) {
    return true; // needs a rental; noted in apply()
  },

  /**
   * The advisor enters the ANNUAL depreciation increase produced by the
   * supported allocation (e.g., basis shifted to building ÷ 27.5 or 39).
   * Applied every projection year — the building's recovery period (27.5/39
   * years) exceeds the projection window, so no give-back occurs within the
   * model; the offsetting cost (larger unrecaptured §1250 gain on sale) is
   * outside the engine (recapture on sale not modeled in v1) and noted.
   */
  apply: function (profile, params, yearIndex, state) {
    var p = Object.assign({}, profile);
    var notes = [];
    var extra = params.additionalAnnualDepreciation || 0;
    p.rentalNet = (p.rentalNet || 0) - extra;
    if (yearIndex === 0) {
      notes.push(TSIQ.fmt.usd(extra) + '/yr additional depreciation from the supported ' +
        'land/building allocation (Reg. §1.167(a)-5) — applied each projection year; the ' +
        'reallocated basis increases unrecaptured §1250 gain on a future sale (not modeled).');
      if (!p.rentalLossesUsable && (p.rentalNet || 0) < 0) {
        notes.push('Rental losses flagged NOT currently usable (§469) — the excess is ' +
          'suspended and carried forward in the projection.');
      }
    }
    return { profile: p, notes: notes };
  }
});
