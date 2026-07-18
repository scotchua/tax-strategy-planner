/* ============================================================================
 * STRATEGY: Section 179 Expensing
 * One source object → advisor view, client PDF, client slideshow.
 * ==========================================================================*/
window.TSIQ = window.TSIQ || {};
TSIQ.strategyModules = TSIQ.strategyModules || [];

TSIQ.strategyModules.push({
  id: 'section-179-expensing',
  name: 'Section 179 Expensing',
  category: 'Real Estate & Cost Recovery',
  applyOrder: 52,
  modeled: true,

  advisor: {
    summary:
      '§179 permits an election to expense the cost of qualifying tangible ' +
      'personal property (and, under §179(f), certain nonresidential real ' +
      'property improvements — roofs, HVAC, fire protection/alarm, and ' +
      'security systems) in the placed-in-service year instead of ' +
      'depreciating it. For 2026 the maximum is $2,560,000, phasing out ' +
      'dollar-for-dollar once total §179 property placed in service exceeds ' +
      '$4,090,000 (OBBBA-raised, indexed). Unlike §168(k) bonus, §179 is ' +
      'elected asset-by-asset and dollar-by-dollar — the cherry-picking tool ' +
      '— but is capped and limited to aggregate active business taxable ' +
      'income under §179(b)(3), with disallowed amounts carrying forward.',
    mechanics: [
      'Election is made on Form 4562, Part I, asset by asset and amount by ' +
      'amount — the taxpayer can expense one machine, half of another, and ' +
      'depreciate the rest. Bonus, by contrast, is all-or-nothing by class.',
      'Eligible property: §1245 tangible personal property used in an active ' +
      'trade or business, off-the-shelf software, and §179(f) qualified real ' +
      'property (roofs, HVAC, fire/alarm, security systems on NONresidential ' +
      'buildings) — items bonus depreciation generally cannot reach because ' +
      'they are 39-year property.',
      'Used property qualifies — acquired by purchase from an unrelated party.',
      'The §179(b)(3) taxable-income limitation caps the deduction at ' +
      'aggregate active-trade-or-business income (including W-2 wages); the ' +
      'excess is not lost but carries forward indefinitely to years with ' +
      'sufficient business income.',
      'For partnerships and S corporations the dollar limit and income limit ' +
      'apply at BOTH the entity and owner level — the deduction passes ' +
      'through separately stated.',
      'Recapture under §179(d)(10) if business use drops to 50% or below ' +
      'during the recovery period.'
    ],
    authority: [
      { type: 'IRC', cite: 'IRC §179(a), (b)(1)-(2)', note: 'The expensing election; 2026 dollar limit $2,560,000 with phase-out beginning at $4,090,000 of total §179 property placed in service (OBBBA, P.L. 119-21; indexed).' },
      { type: 'IRC', cite: 'IRC §179(b)(3)', note: 'Taxable-income limitation: deduction capped at aggregate active business income; excess carries forward indefinitely.' },
      { type: 'IRC', cite: 'IRC §179(d)(1)', note: 'Eligible property definition — §1245 property, off-the-shelf software; purchase requirement (used property OK if from an unrelated party).' },
      { type: 'IRC', cite: 'IRC §179(f)', note: 'Qualified real property: roofs, HVAC, fire protection and alarm systems, and security systems for nonresidential real property — the reach bonus does not have.' },
      { type: 'IRC', cite: 'IRC §179(d)(10)', note: 'Recapture if business use falls to 50% or less before the end of the recovery period.' },
      { type: 'Admin', cite: 'Form 4562, Part I', note: 'Where the election and asset-by-asset amounts are reported; election made on a timely filed return (amendable under current rules).' }
    ],
    requirements: [
      'Qualifying property placed in service during the tax year in an ACTIVE trade or business (not a mere investment activity).',
      'Aggregate active business taxable income at least equal to the desired deduction — or acceptance of a carryforward.',
      'Total §179 property below the phase-out ceiling ($4,090,000 for 2026) to preserve the full limit.',
      'Business use above 50%, maintained through the recovery period to avoid recapture.'
    ],
    risks: [
      'The taxable-income limit can defer the benefit: an election exceeding business income produces a carryforward, not a current deduction.',
      'Business-use drop to ≤50% triggers §179(d)(10) recapture at ordinary rates.',
      'Entity-level and owner-level limits both apply to pass-throughs — an owner with other §179 from multiple entities can hit the cap.',
      '§1245 ordinary-income recapture on disposition, same as any fully expensed asset.',
      'State nonconformity: several states impose lower §179 limits and require addbacks.',
      'Rental real estate usually is not an "active trade or business" for §179 — routing rental-asset purchases here without that analysis invites disallowance.'
    ],
    bestFit: [
      'Profitable businesses buying equipment, vehicles (subject to luxury-auto/SUV limits), or nonresidential roofs/HVAC.',
      'Clients who want to fine-tune taxable income to a target (QBI thresholds, bracket edges) — §179\'s dollar-by-dollar control is the tool.',
      'Buyers of used assets or §179(f) real property components that bonus cannot expense.'
    ],
    implementation: [
      'List the year\'s acquisitions; separate §179-eligible items (including §179(f) roofs/HVAC/fire/security on nonresidential buildings).',
      'Compute the §179(b)(3) aggregate business-income limit before choosing amounts — do not elect into a pointless carryforward.',
      'Choose the exact assets and dollar amounts to expense; coordinate with bonus depreciation on the remaining classes.',
      'Make the election on Form 4562, Part I, with the timely filed return.',
      'Track business-use percentage on listed property annually; calendar the recapture exposure.'
    ]
  },

  client: {
    teaser: 'Choose exactly which purchases to write off now — down to the dollar',
    headline: 'Expense your equipment purchases the year you make them',
    plainEnglish: [
      'When your business buys equipment, machinery, computers, or even a new roof or HVAC system for a commercial building, the normal rule is to deduct the cost slowly over many years. A special election lets you instead deduct the full cost right away — up to a very generous annual limit.',
      'What makes this election special is control. You pick exactly which purchases to write off immediately and which to spread out, dollar by dollar. That lets us aim your taxable income at precisely the level that saves you the most — not too high, not wastefully low.',
      'It even covers things the other fast write-off rules miss, like used equipment and certain building components such as roofs and air-conditioning systems on commercial property.'
    ],
    analogy: 'Think of it as a dimmer switch for your deductions instead of an on/off switch — we can dial in exactly the amount that fits your year.',
    benefits: [
      'Deduct up to the full cost of qualifying purchases immediately',
      'You choose which assets and how much — total control over the timing',
      'Covers used equipment and certain commercial building upgrades',
      'Pairs with other write-off rules for a tuned overall result'
    ],
    steps: [
      'We review everything your business placed in service this year',
      'We calculate the most valuable amount to expense — not just the maximum',
      'We make the election on your return; no separate IRS filings needed',
      'We track the assets going forward so nothing gets clawed back'
    ],
    considerations: [
      'The deduction can\'t exceed your business income for the year — anything above it waits for a future year, so we size it carefully.',
      'This accelerates deductions rather than creating new ones; we plan the later years too.',
      'If an expensed asset\'s business use drops below half, some of the deduction can be recaptured — worth knowing before expensing a vehicle.'
    ]
  },

  inputs: [
    { key: 'amount', label: 'Amount elected under §179', type: 'currency', default: 100000 }
  ],

  appliesTo: function (profile) {
    return true; // validated in apply(): needs active business income
  },

  /**
   * Model vs. baseline: baseline is assumed to depreciate the asset straight-
   * line over 7 years (simplification — same convention as the bonus
   * depreciation strategy). §179 takes it all in year 1:
   *   Year 1: extra deduction = allowed − (allowed / 7)
   *   Years 2–7: income HIGHER than baseline by allowed / 7; stops after yr 7.
   * The election is capped at the 2026 statutory limit and at the routed
   * income stream (a single-stream simplification of the §179(b)(3) aggregate
   * business-income limit); the excess carryforward is NOT modeled — noted.
   * Routes to scheduleCNet first (also saves SE tax), else passthroughK1.
   */
  apply: function (profile, params, yearIndex, state) {
    var p = Object.assign({}, profile);
    var notes = [];
    var tb = TSIQ.TABLES_2026;
    var recovery = 7; // simplified class life — see comment above

    if (yearIndex === 0) {
      var elected = params.amount || 0;
      var allowed = Math.min(elected, tb.limits.sec179.max);
      if (elected > tb.limits.sec179.max) {
        notes.push('Election capped at the 2026 §179 limit of ' +
          TSIQ.fmt.usd(tb.limits.sec179.max) + ' (phase-out begins at ' +
          TSIQ.fmt.usd(tb.limits.sec179.phaseOutStart) + ' of total §179 property).');
      }
      var route, incomeCap;
      if (p.scheduleCNet > 0) {
        route = 'scheduleCNet'; incomeCap = p.scheduleCNet;
      } else if (p.passthroughK1 > 0) {
        route = 'passthroughK1'; incomeCap = p.passthroughK1;
      } else {
        state.sec179Route = 'none';
        notes.push('No positive active business income (Schedule C or K-1) — the ' +
          '§179(b)(3) taxable-income limitation would defer the entire deduction ' +
          'to a carryforward. No benefit modeled.');
        return { profile: p, notes: notes };
      }
      if (allowed > incomeCap) {
        notes.push('§179(b)(3) taxable-income limitation: deduction limited to ' +
          TSIQ.fmt.usd(incomeCap) + ' of business income; the remaining ' +
          TSIQ.fmt.usd(allowed - incomeCap) + ' carries forward (carryforward not modeled).');
        allowed = incomeCap;
      }
      var sl = allowed / recovery;
      p[route] = p[route] - (allowed - sl);
      // Tracked for the plan-level "accelerated depreciation accumulating"
      // materiality note (scenario-engine.js) — quantifies future §1245/§1250
      // recapture-on-sale exposure this tool does not model.
      state.acceleratedDepAccumulated = (state.acceleratedDepAccumulated || 0) + (allowed - sl);
      state.sec179Route = route;
      state.sec179Allowed = allowed;
      notes.push('Year 1: ' + TSIQ.fmt.usd(allowed) + ' expensed under §179, modeled ' +
        'net of the ' + TSIQ.fmt.usd(sl) + ' straight-line deduction the baseline would ' +
        'have taken (simplified 7-year class life).');
    } else if (yearIndex >= 1 && yearIndex <= recovery - 1 && state.sec179Route && state.sec179Route !== 'none') {
      // Baseline still deducts the straight-line slice; §179 used it up.
      p[state.sec179Route] = p[state.sec179Route] + (state.sec179Allowed / recovery);
    }
    return { profile: p, notes: notes };
  }
});
