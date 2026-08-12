/* ============================================================================
 * STRATEGY: SSTB Threshold Management
 * One source object → advisor view, client PDF, client slideshow.
 * ==========================================================================*/
window.TSIQ = window.TSIQ || {};
TSIQ.strategyModules = TSIQ.strategyModules || [];

TSIQ.strategyModules.push({
  id: 'sstb-threshold-management',
  name: 'SSTB Threshold Management',
  category: 'QBI Optimization',
  applyOrder: 23, // after wage/aggregation moves; manages taxable income last
  modeled: true,
  character: 'permanent', // ET2

  advisor: {
    summary:
      'Owners of specified service trades or businesses (health, law, ' +
      'accounting, consulting, financial services, athletics, performing arts — ' +
      '§199A(d)(2), Reg. §1.199A-5) lose the QBI deduction entirely once ' +
      'taxable income clears the threshold ($403,500 MFJ / $201,750 single, ' +
      '2026) plus the phase-in range. OBBBA widened the range to $150k MFJ / ' +
      '$75k single starting 2026, so the old cliff is now a longer ramp — but ' +
      'the effective marginal rate inside the ramp is still brutal: each ' +
      'incremental dollar both bears tax and strips away deduction. The play is ' +
      'to manage taxable income back under (or lower into) the range using ' +
      'above-the-line levers: retirement plan contributions, defined benefit ' +
      'plans, charitable bunching, income deferral, and filing-status review. ' +
      'For income pushed to a later year this is timing, not elimination — the ' +
      'engine models the add-back.',
    mechanics: [
      'Inside the phase-in range, the SSTB\'s QBI, W-2 wages, and UBIA are all ' +
      'scaled down ratably (Reg. §1.199A-5(a)(2)); past the top of the range the ' +
      'deduction is zero. The deduction lost per dollar of taxable income makes ' +
      'the effective marginal rate in the ramp several points above the stated ' +
      'bracket rate.',
      'Threshold is measured against TAXABLE INCOME (before the QBI deduction), ' +
      'not AGI — itemized deductions and above-the-line adjustments both count ' +
      'toward getting under it.',
      'Primary levers: employer retirement contributions (401(k) deferrals, ' +
      'profit-sharing, and for large excesses a defined benefit / cash balance ' +
      'plan, which can absorb six figures for older owners), HSA contributions, ' +
      'charitable bunching (a donor-advised fund concentrates 2–3 years of giving ' +
      'into the year that needs it), and deferring income (billing/collections ' +
      'for cash-method practices, installment sales, deferred comp).',
      'Filing status check: MFS splits the threshold ($201,775 each (MFS)) and rarely ' +
      'helps, but where one spouse is the SSTB owner and the other has large ' +
      'W-2 income, comparing MFJ vs. MFS math is worth the ten minutes.',
      'Deferral is timing: income pushed out of year 1 lands in year 2 and can ' +
      'recreate the same problem there. Recurring levers (retirement plans) beat ' +
      'one-shot deferral for chronic threshold proximity — deferral shines when ' +
      'one year spikes.',
      'OBBBA also added a $400 minimum deduction (indexed) for taxpayers with at ' +
      'least $1,000 of active QBI beginning 2026 — a floor, not a planning ' +
      'target, but it means even a fully phased-out SSTB owner with active ' +
      'participation keeps a token deduction.'
    ],
    authority: [
      { type: 'IRC', cite: 'IRC §199A(d)(2), (d)(3)', note: 'SSTB definition and the phase-out: SSTB owners above threshold + range get no deduction; inside the range the benefit is scaled down.' },
      { type: 'Reg', cite: 'Reg. §1.199A-5(b)', note: 'Field-by-field SSTB definitions (health, law, accounting, actuarial, performing arts, consulting, athletics, financial/brokerage services, reputation-or-skill catchall).' },
      { type: 'IRC', cite: 'IRC §199A(e)(2)', note: 'Threshold amount defined by reference to taxable income (computed before the §199A deduction) — $403,500 MFJ / $201,750 single for 2026.' },
      { type: 'Admin', cite: 'P.L. 119-21 (OBBBA, 2025) — §199A amendments', note: 'Made §199A permanent; widened the phase-in range to $75k single / $150k MFJ beginning 2026; added the $400 (indexed) minimum deduction for taxpayers with ≥$1,000 of active QBI.' },
      { type: 'IRC', cite: 'IRC §§401(k), 404, 415', note: 'Qualified plan contribution and deduction limits — the workhorse levers for reducing taxable income below the threshold; defined benefit plans reach far beyond DC limits for older owners.' },
      { type: 'IRC', cite: 'IRC §170', note: 'Charitable deduction — bunching multiple years of giving (e.g., via a donor-advised fund) into the year that needs the taxable-income reduction.' }
    ],
    requirements: [
      'An SSTB owner whose taxable income sits at or modestly above the threshold — the strategy is dose-dependent; $200k over the top of the range cannot be managed away.',
      'Deduction capacity: plan documents in place by the applicable deadlines (DB plans generally must be adopted by the extended due date under the SECURE Act rules; employee deferrals need payroll before year-end).',
      'Cash flow to fund the retirement/charitable levers — this strategy spends real dollars to save tax dollars.',
      'Accurate year-end projection: the target is a taxable-income number, so the plan needs a reliable November/December estimate.'
    ],
    risks: [
      'Deferral just moves the problem: next year\'s income stacks unless a recurring lever replaces it — the projection here shows the year-2 add-back honestly.',
      'DB/cash-balance plans carry actuarial funding obligations for multiple years — do not install one for a single-year threshold problem.',
      'Recharacterizing the business as a non-SSTB ("we\'re not really consulting") is an exam magnet — the Reg. §1.199A-5(b) definitions and the reputation-or-skill catchall are broad; manage the income, not the label, unless facts genuinely support it.',
      'Retirement contributions that reduce SSTB income also reduce QBI itself (the qbiReduction interplay) — the net benefit is smaller than the gross deduction; model, don\'t estimate.',
      'The thresholds and range are indexed — a plan calibrated to 2026 numbers needs annual re-tuning.'
    ],
    bestFit: [
      'Physicians, attorneys, CPAs, consultants, and advisors with taxable income within roughly $150k of the threshold.',
      'Owners over 50 with capacity and appetite for large retirement contributions (catch-ups, DB plans).',
      'Charitably inclined clients who can bunch giving into high-income years.'
    ],
    implementation: [
      'Run a November taxable-income projection; measure the gap to the top and bottom of the phase-in range.',
      'Stack levers in cost order: maximize 401(k) deferrals and employer contributions first, then HSA, then evaluate a DB/cash-balance plan if the gap is six figures and recurring.',
      'For charitable bunching, open/fund a donor-advised fund before December 31; get contemporaneous acknowledgments.',
      'For deferral, shift December billing/collections (cash method) or negotiate January payment dates before the income is earned and receivable.',
      'Re-run the QBI computation with the levers applied — confirm the deduction recovered exceeds the levers\' cost, then calendar the same review annually.'
    ]
  },

  client: {
    teaser: 'Keeps your income on the right side of an invisible line where a major deduction quietly vanishes',
    headline: 'Protect the 20% deduction the tax law tries to take back',
    plainEnglish: [
      'The tax law gives business owners a deduction worth up to 20% of their business income. But for certain professions — doctors, lawyers, accountants, consultants, financial advisors — the deduction disappears as income rises past a set line. Cross far enough over it and the deduction is gone completely.',
      'The good news: the line is based on your taxable income, and taxable income is something we can manage. Retirement plan contributions, the timing of income, and how charitable gifts are bundled can each pull your number back under the line — or at least further down the slope where more of the deduction survives.',
      'Most of these moves are things worth doing anyway, like funding your retirement. Here they do double duty: the contribution itself is deductible, AND it revives the 20% deduction that higher income was taking away.'
    ],
    analogy: 'Think of it like a toll bridge where the toll depends on your speed. We are not telling you to earn less — we are timing and routing the trip so you cross the bridge at the cheapest moment.',
    benefits: [
      'Rescues a deduction worth up to 20% of your business income',
      'Uses moves that build your wealth anyway — retirement savings, planned giving',
      'Each dollar of adjustment can save well over a dollar-for-dollar amount in the slide zone',
      'Reviewed and re-tuned every year as the line moves'
    ],
    steps: [
      'We project your income before year-end, while there is still time to act',
      'We measure exactly how far you are from the line',
      'We pick the cheapest combination of levers to close the gap',
      'We recheck the plan every fall'
    ],
    considerations: [
      'When we defer income into next year, it does show up next year — the projection includes that honestly, and recurring tools like retirement plans handle it better than one-time deferrals.',
      'These levers use real cash (retirement contributions, charitable gifts), so we only recommend amounts your cash flow comfortably supports.'
    ]
  },

  inputs: [
    { key: 'incomeDeferred', label: 'Income deferred / reduced in year 1', type: 'currency', default: 40000 }
  ],

  suggest: function (p) {
    var inc = (p.scheduleCNet || 0) + (p.passthroughK1 || 0) + (p.wages || 0);
    if (!(p.isSSTB && inc > 300000)) return null;
    return { reason: 'SSTB with income near the §199A phase-out zone — deduction-stacking to stay under the threshold protects the QBI deduction.' };
  },

  appliesTo: function (profile) {
    return true; // validated in apply(): needs business income; SSTB flag noted
  },

  /**
   * Bracket-management pattern: year 0 reduces the dominant business income
   * field by the deferred amount; year 1 adds it back (timing, not
   * elimination). The engine's SSTB phase-out then shows the recovered QBI
   * deduction directly when isSSTB is checked. Routing through the actual
   * income field (not `adjustments`) is deliberate: deferring Schedule C
   * income also defers SE tax, which is the true mechanical effect.
   */
  apply: function (profile, params, yearIndex, state) {
    var p = Object.assign({}, profile);
    var notes = [];
    var amt = params.incomeDeferred || 0;

    if (yearIndex === 0) {
      // Pick the dominant business income field and remember it for year 1.
      var field = (p.scheduleCNet || 0) >= (p.passthroughK1 || 0) ? 'scheduleCNet' : 'passthroughK1';
      if ((p[field] || 0) <= 0) {
        notes.push('No positive business income found to defer — nothing modeled.');
        return { profile: p, notes: notes };
      }
      var deferred = Math.min(amt, p[field]);
      if (deferred < amt) {
        notes.push('Deferral capped at available business income of ' + TSIQ.fmt.usd(p[field]) + '.');
      }
      p[field] = p[field] - deferred;
      state.sstbThresholdMgmt = { field: field, amount: deferred };

      notes.push(TSIQ.fmt.usd(deferred) + ' of income deferred out of year 1 to hold taxable ' +
        'income under the §199A threshold ($403,500 MFJ / $201,750 single, 2026); it returns in year 2 — ' +
        'this is timing, not elimination.');
      if (!p.isSSTB) {
        notes.push('Profile is not flagged SSTB — this strategy targets the SSTB phase-out. ' +
          'Check the SSTB flag on the profile for the deduction-recovery effect to appear; as modeled, ' +
          'only the ordinary deferral/bracket effect is shown.');
      }
    } else if (yearIndex === 1 && state.sstbThresholdMgmt) {
      // The give-back: deferred income lands in year 2.
      var d = state.sstbThresholdMgmt;
      p[d.field] = (p[d.field] || 0) + d.amount;
      notes.push(TSIQ.fmt.usd(d.amount) + ' of deferred income recognized in year 2 (add-back of the year-1 deferral).');
    }
    return { profile: p, notes: notes };
  }
});
