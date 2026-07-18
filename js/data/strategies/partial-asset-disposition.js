/* ============================================================================
 * STRATEGY: Partial Asset Disposition on Renovations
 * One source object → advisor view, client PDF, client slideshow.
 * ==========================================================================*/
window.TSIQ = window.TSIQ || {};
TSIQ.strategyModules = TSIQ.strategyModules || [];

TSIQ.strategyModules.push({
  id: 'partial-asset-disposition',
  name: 'Partial Asset Disposition on Renovations',
  category: 'Real Estate & Cost Recovery',
  applyOrder: 57,
  modeled: true,

  advisor: {
    summary:
      'When a renovation replaces a building component — a roof, HVAC ' +
      'system, windows, a facade — the owner is usually required to ' +
      'capitalize the NEW component as a restoration, while the OLD ' +
      'component\'s remaining basis keeps depreciating inside the building, ' +
      'invisible. Reg. §1.168(i)-8(d)(2) allows an ELECTION to treat the ' +
      'retirement of the old component as a partial disposition: the ' +
      'taxpayer deducts its remaining adjusted basis as a loss in the ' +
      'renovation year, and — often overlooked — the associated demolition/' +
      'removal costs become currently deductible rather than capitalized ' +
      '(Reg. §1.263(a)-3(g)(2)). The election also purges the old ' +
      'component\'s accumulated depreciation from future §1250 recapture. ' +
      'It is made simply by claiming the loss on the TIMELY return for the ' +
      'year of the disposition — miss the year and the basis stays buried.',
    mechanics: [
      'Trigger: a capitalizable restoration (new roof/HVAC/etc.) that ' +
      'replaces a structural component or a portion of one — the same event ' +
      'that forces capitalization under Reg. §1.263(a)-3(k) opens the ' +
      'partial-disposition election on the retired piece.',
      'The deduction equals the retired component\'s remaining adjusted ' +
      'basis. Where the original cost was never separately stated, the regs ' +
      'permit any reasonable method — including discounting the replacement ' +
      'cost back to the acquisition date (e.g., via the Producer Price ' +
      'Index) and applying the accumulated depreciation ratio.',
      'Removal and demolition costs tied to the disposed component are ' +
      'deducted currently under Reg. §1.263(a)-3(g)(2) when a disposition ' +
      'loss is claimed — frequently worth as much as the basis loss itself.',
      'Recapture cleanup: basis and accumulated depreciation of the retired ' +
      'component leave the fixed-asset ledger, so they never resurface as ' +
      'unrecaptured §1250 gain on sale — a permanent character benefit, not ' +
      'just timing.',
      'Deadline discipline: the election is made by reporting the loss on ' +
      'the timely filed (incl. extensions) ORIGINAL return for the year the ' +
      'component is retired. It is not available retroactively for old ' +
      'renovations absent narrow method-change relief.',
      'A cost segregation study or contractor payment application for the ' +
      'renovation provides the cleanest valuation of the retired component.'
    ],
    authority: [
      { type: 'Reg', cite: 'Reg. §1.168(i)-8', note: 'Dispositions of MACRS property; (d)(2) provides the partial disposition election for retired structural components, with reasonable-method basis determination.' },
      { type: 'Reg', cite: 'Reg. §1.263(a)-3(k)', note: 'Restoration standard requiring capitalization of the replacement — the event that makes the election available and valuable.' },
      { type: 'Reg', cite: 'Reg. §1.263(a)-3(g)(2)', note: 'Removal costs: deductible currently when the taxpayer realizes a loss on the disposed component (rather than capitalized into the new one).' },
      { type: 'IRC', cite: 'IRC §165; §168', note: 'Loss allowance and the MACRS framework the retired basis is deducted under.' },
      { type: 'Admin', cite: 'Form 4797', note: 'Where the disposition loss on the retired component is reported.' }
    ],
    requirements: [
      'A renovation in the CURRENT year that retires an identifiable building component (roof, HVAC, windows, plumbing, facade, etc.).',
      'A reasonable, documented method for the retired component\'s remaining basis (cost records, cost seg study, or PPI-discounted replacement cost).',
      'The loss claimed on the timely filed original return for the disposition year — this IS the election.',
      'The replacement component capitalized and depreciated per the tangible property regs (the election pairs with, not instead of, capitalization).'
    ],
    risks: [
      'Blown deadline: fail to claim it on the timely original return and the old component\'s basis stays buried in the building for decades.',
      'Sloppy valuations (guessing the old roof\'s basis) draw exam adjustments — use a defensible method and keep the math.',
      'The election requires actually removing the component\'s basis from the depreciation schedule — bookkeeping errors here cascade.',
      'If the "replacement" is really a repair (no capitalization required), expensing under the repair regs usually beats the election — run that analysis first.',
      'Rental losses created by the deduction are still subject to §469 if the owner has no passive-loss path.'
    ],
    bestFit: [
      'Landlords and commercial owners doing roof, HVAC, window, or facade replacements this year.',
      'Recently renovated properties where the disposition-year return is still open to timely filing.',
      'Owners pairing the renovation with a cost segregation study (the study prices the retired components).'
    ],
    implementation: [
      'Before year-end, inventory the renovation: which components were removed, and what did removal/demolition cost?',
      'Compute the retired components\' remaining basis by a reasonable method; memo the methodology.',
      'Claim the disposition loss (Form 4797) and deduct removal costs on the timely filed return for the renovation year.',
      'Remove the retired basis from the depreciation schedule; capitalize the new component.',
      'Retain contractor invoices and the valuation workpapers as exam support.'
    ]
  },

  client: {
    teaser: 'A renovation write-off most tax preparers never claim',
    headline: 'Renovating? The part you tore out is a deduction',
    plainEnglish: [
      'When you replace a roof or an HVAC system on a rental or commercial building, the new one gets deducted slowly over many years — the tax law insists. But here\'s what most people miss: the OLD roof you just tore off still has undeducted cost sitting inside your building\'s tax records. Left alone, that leftover cost keeps trickling out over decades — for a roof that\'s in a dumpster.',
      'A special election lets you deduct all of the old component\'s remaining cost in the year you replace it. On top of that, the cost of tearing it out and hauling it away — often a big number by itself — becomes deductible right now instead of being buried in the new roof\'s cost.',
      'There\'s a genuine deadline: the election only works on the tax return for the year of the renovation. Tell us before you file, and we capture it. Tell us two years later, and it\'s usually gone.'
    ],
    analogy: 'It\'s like getting a trade-in credit for the old equipment instead of paying full price for the new — but only if you ask at the register, not after you\'ve driven home.',
    benefits: [
      'Deduct the old component\'s leftover cost the year you replace it',
      'Demolition and removal costs become immediately deductible too',
      'Reduces the tax bill when you eventually sell the building',
      'No special IRS application — just the right reporting, on time'
    ],
    steps: [
      'Tell us about the renovation before we file that year\'s return — timing is everything',
      'We calculate what the torn-out component was still worth on paper, using accepted methods',
      'We claim the deduction and clean up your depreciation records',
      'We keep the contractor invoices and calculations as your support file'
    ],
    considerations: [
      'This only works on the tax return for the year the renovation happened — it\'s use-it-or-lose-it.',
      'The old component\'s value has to be calculated by a reasonable, documented method, not a guess.'
    ]
  },

  inputs: [
    { key: 'abandonedBasis', label: 'Remaining basis of retired component', type: 'currency', default: 25000 }
  ],

  appliesTo: function (profile) {
    return true; // needs a rental/commercial renovation this year; noted in apply()
  },

  /**
   * Year 1 only: the retired component's remaining basis is deducted as a
   * disposition loss against rentalNet. Simplification (commented, immaterial):
   * the baseline would have kept straight-line depreciating that basis
   * (~basis/27.5 per year) — that small later-year delta is ignored; the
   * election's other benefit (removing the component from future §1250
   * recapture) is outside the engine (sale-year recapture not modeled in v1).
   */
  apply: function (profile, params, yearIndex, state) {
    var p = Object.assign({}, profile);
    var notes = [];
    if (yearIndex !== 0) {
      return { profile: p, notes: notes };
    }
    var loss = params.abandonedBasis || 0;
    p.rentalNet = (p.rentalNet || 0) - loss;
    notes.push(TSIQ.fmt.usd(loss) + ' partial disposition loss on the retired component ' +
      '(Reg. §1.168(i)-8(d)(2)) — elected by claiming it on the TIMELY return for the ' +
      'renovation year. Related removal costs are also deductible (not included here — ' +
      'add them to this input if known).');
    if (!p.rentalLossesUsable && (p.rentalNet || 0) < 0) {
      notes.push('Rental losses flagged NOT currently usable (§469) — the excess is ' +
        'suspended and carried forward in the projection.');
    }
    return { profile: p, notes: notes };
  }
});
