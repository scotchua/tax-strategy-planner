/* ============================================================================
 * STRATEGY: Bonus Depreciation Election (and Opt-Out Analysis)
 * One source object → advisor view, client PDF, client slideshow.
 * ==========================================================================*/
window.TSIQ = window.TSIQ || {};
TSIQ.strategyModules = TSIQ.strategyModules || [];

TSIQ.strategyModules.push({
  id: 'bonus-depreciation',
  name: 'Bonus Depreciation Election (and Opt-Out Analysis)',
  category: 'Real Estate & Cost Recovery',
  applyOrder: 51,
  modeled: true,

  advisor: {
    summary:
      '§168(k) allows a 100% first-year deduction for qualified property — ' +
      'MACRS property with a recovery period of 20 years or less, including ' +
      'equipment, furniture, land improvements, and QIP — made permanent by ' +
      'OBBBA (P.L. 119-21) for property acquired and placed in service after ' +
      '1/19/2025. Bonus is automatic unless the taxpayer elects out; the real ' +
      'planning work is the annual election-out analysis under §168(k)(7), by ' +
      'class of property, for years where an immediate deduction would be ' +
      'wasted — losses trapped by §469 or §461(l), NOL positions, low-bracket ' +
      'years, or QBI taxable-income games. Acceleration is a timing benefit: ' +
      'depreciation taken now is unavailable later.',
    mechanics: [
      'Qualified property under §168(k)(2): MACRS recovery period ≤ 20 years ' +
      '(5/7/15-year personalty and land improvements, 15-year QIP), certain ' +
      'computer software, and used property acquired by purchase from an ' +
      'unrelated party (post-TCJA).',
      '100% of eligible basis is deducted in the placed-in-service year; the ' +
      'asset\'s remaining basis is zero, so no depreciation remains for later years.',
      'The deduction lands where the asset lives: Schedule C/F, the entity ' +
      'return (flowing through the K-1), or Schedule E for rental assets — ' +
      'which determines whether it also saves SE tax and how §469 applies.',
      'Election OUT under §168(k)(7) is made annually, by class (all 5-year ' +
      'property, all 7-year property, etc.), on a timely filed return ' +
      'including extensions — generally irrevocable without IRS consent.',
      'Elect out when the deduction would be wasted or wasteful: a §469-' +
      'suspended rental loss, a §461(l)-limited business loss, an NOL year, a ' +
      'temporarily low bracket, or where spreading depreciation preserves ' +
      'taxable income needed for §199A QBI or the §179(b)(3) limit.',
      'Bonus vs. §179: bonus is all-or-nothing by class with no dollar cap or ' +
      'income limit; §179 is asset-by-asset but capped and limited to business ' +
      'income. Many plans use both deliberately.'
    ],
    authority: [
      { type: 'IRC', cite: 'IRC §168(k)', note: '100% bonus depreciation, made permanent by OBBBA (P.L. 119-21) for property acquired and placed in service after Jan 19, 2025.' },
      { type: 'IRC', cite: 'IRC §168(k)(2)', note: 'Definition of qualified property: MACRS recovery ≤ 20 years; used property qualifies if acquired by purchase from an unrelated party.' },
      { type: 'IRC', cite: 'IRC §168(k)(7)', note: 'Election out of bonus, made by class of property, on a timely filed return — the opt-out lever this analysis turns on.' },
      { type: 'Reg', cite: 'Reg. §1.168(k)-2', note: 'Operative rules for post-2017 bonus: acquisition date, placed-in-service, used-property acquisition requirements.' },
      { type: 'IRC', cite: 'IRC §461(l)', note: 'Excess business loss limitation — a key reason to elect out; deductions creating a limited loss convert to an NOL carryforward instead of a current benefit.' },
      { type: 'IRC', cite: 'IRC §469', note: 'Passive activity loss rules — bonus on rental assets is worthless currently if the loss is suspended.' },
      { type: 'Admin', cite: 'Form 4562', note: 'Depreciation reporting; the election-out statement attaches to the timely filed return.' }
    ],
    requirements: [
      'Qualified property acquired and placed in service during the year (acquired after 1/19/2025 for the permanent 100% rate).',
      'For used property: acquired by purchase from an unrelated party; not previously used by the taxpayer.',
      'Election-out (if chosen) filed by class on a timely return including extensions — missing the deadline locks in bonus.',
      'A path to actually use the deduction: taxable income, or usable losses not trapped by §469/§461(l).'
    ],
    risks: [
      'Wasted deductions: bonus that creates a §469-suspended or §461(l)-limited loss produces no current benefit while burning future depreciation.',
      'Bracket arbitrage in reverse — a 100% deduction in a 22% year that strips depreciation from future 37% years destroys value.',
      'QBI interaction: bonus reduces QBI dollar-for-dollar; it can also drop taxable income below where the client wanted it for other phase-outs.',
      'Election out is by entire class — you cannot cherry-pick assets within a class (that is §179\'s job).',
      'State nonconformity: many states decouple from §168(k) and require addback/recovery schedules.',
      '§1245 ordinary-income recapture on disposition of fully-bonused personalty.'
    ],
    bestFit: [
      'Profitable, high-bracket clients placing significant equipment or improvements in service.',
      'Clients with rental assets AND a passive-loss path (REPS, STR material participation, other passive income).',
      'Conversely, the OPT-OUT fits loss-year clients, NOL positions, and those needing taxable income for QBI or §179 limits.'
    ],
    implementation: [
      'Inventory the year\'s acquisitions by MACRS class and confirm §168(k)(2) eligibility (acquisition date, related-party screen).',
      'Project the return both ways — full bonus vs. elect-out by class — including §469, §461(l), QBI, and state addback effects.',
      'Coordinate with §179: decide which assets get §179 (cherry-picked) and which classes ride bonus or elect out.',
      'If electing out, attach the §168(k)(7) statement by class to the timely filed return (extensions count) — calendar it.',
      'Report on Form 4562; document the analysis in the workpapers for the elect-out years.'
    ]
  },

  client: {
    teaser: 'Write off major purchases far faster than the normal schedule allows',
    headline: 'Deduct 100% of big purchases in year one — when it makes sense',
    plainEnglish: [
      'Normally, when your business buys equipment, furniture, or makes certain property improvements, you deduct the cost a little at a time over several years. Current law lets you instead deduct 100% of the cost in the year you buy it — a rule called bonus depreciation, and it is now a permanent part of the tax code.',
      'But "as fast as possible" is not always "as smart as possible." If your income is unusually low this year, or the deduction would create a loss you cannot use yet, taking it all now can waste it. In those years, the smarter move is to opt out and save the deductions for higher-tax years.',
      'We run the numbers both ways every year — full speed ahead, or deliberately slower — and pick whichever puts more money in your pocket over time, not just this April.'
    ],
    analogy: 'It\'s like having a coupon you can use all at once or spread over several shopping trips. We make sure you redeem it when prices — your tax rates — are highest.',
    benefits: [
      'Deduct 100% of qualifying purchases immediately instead of over 5–20 years',
      'Big cash-flow boost in the year you invest in your business',
      'Works on used equipment, not just new',
      'When immediate write-offs would be wasted, we opt out and bank them for better years'
    ],
    steps: [
      'We list everything you bought or improved this year and confirm what qualifies',
      'We model your taxes both ways — immediate write-off vs. spread out',
      'We file the right election with your return so nothing is left to chance',
      'We repeat the analysis every year as your income changes'
    ],
    considerations: [
      'This speeds up deductions rather than creating new ones — a bigger deduction now means smaller ones later, so we plan the whole timeline.',
      'Some states don\'t follow the federal rule, which can create differences on your state return.'
    ]
  },

  inputs: [
    { key: 'eligibleBasis', label: 'Eligible property basis placed in service', type: 'currency', default: 100000 },
    { key: 'targetIncome', label: 'Where the asset is used', type: 'select', default: 'business',
      options: [{ value: 'business', label: 'Business (Sch C / K-1)' }, { value: 'rental', label: 'Rental (Sch E)' }] },
    { key: 'classLife', label: 'MACRS class life (baseline comparison)', type: 'select', default: '7',
      options: [
        { value: '5', label: '5-year (autos, computers, light equipment)' },
        { value: '7', label: '7-year (most machinery & equipment, furniture)' },
        { value: '15', label: '15-year (land improvements, QIP)' }
      ] }
  ],

  appliesTo: function (profile) {
    return true; // validated in apply(): needs the selected income stream
  },

  /**
   * Model vs. baseline: the baseline is assumed to depreciate the asset
   * straight-line over the selected MACRS class life (SF7: 5/7/15-year,
   * `params.classLife` — no state needed, apply() receives params every
   * year; 27.5-yr building components belong to the cost segregation
   * strategy, not here). Bonus takes it all in year 1, so:
   *   Year 1: extra deduction = basis − (basis / classLife)
   *   Years 2–classLife: income is HIGHER than baseline by basis / classLife
   *   (the straight-line slice was already used up). Give-back stops after
   *   that class life.
   * Business dollars route to scheduleCNet first (also saves SE tax) and fall
   * back to passthroughK1; the route is fixed in year 1 via state so the
   * give-back follows the same stream.
   */
  apply: function (profile, params, yearIndex, state) {
    var p = Object.assign({}, profile);
    var notes = [];
    var recovery = parseInt(params.classLife, 10) || 7; // SF7: selected MACRS class life
    var basis = params.eligibleBasis || 0;
    var sl = basis / recovery;

    if (yearIndex === 0) {
      var route;
      if (params.targetIncome === 'rental') {
        route = 'rentalNet';
      } else if (p.scheduleCNet > 0) {
        route = 'scheduleCNet';
      } else if (p.passthroughK1 > 0) {
        route = 'passthroughK1';
      } else {
        route = 'none';
      }
      state.bonusDepRoute = route;

      if (route === 'none') {
        notes.push('No positive business income found (Schedule C or K-1) — bonus ' +
          'depreciation needs a business activity to deduct against. No benefit modeled.');
        return { profile: p, notes: notes };
      }
      p[route] = p[route] - (basis - sl);
      // Tracked for the plan-level "accelerated depreciation accumulating"
      // materiality note (scenario-engine.js) — quantifies future §1245/§1250
      // recapture-on-sale exposure this tool does not model.
      state.acceleratedDepAccumulated = (state.acceleratedDepAccumulated || 0) + (basis - sl);
      notes.push('Year 1: ' + TSIQ.fmt.usd(basis) + ' deducted at 100% bonus (§168(k)); ' +
        'modeled net of the ' + TSIQ.fmt.usd(sl) + ' straight-line deduction the baseline ' +
        'would have taken over a ' + recovery + '-year class life.');
      if (route === 'rentalNet' && !p.rentalLossesUsable) {
        notes.push('Rental losses flagged NOT currently usable (§469) — a bonus-created ' +
          'loss would be suspended. Consider the §168(k)(7) election OUT for this class, ' +
          'or pair with REPS / the short-term rental strategy.');
      }
    } else if (yearIndex >= 1 && yearIndex <= recovery - 1 && state.bonusDepRoute && state.bonusDepRoute !== 'none') {
      // Baseline still deducts the straight-line slice; bonus used it up.
      p[state.bonusDepRoute] = p[state.bonusDepRoute] + sl;
    }
    return { profile: p, notes: notes };
  }
});
