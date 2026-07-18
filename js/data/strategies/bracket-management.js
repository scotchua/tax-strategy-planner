/* ============================================================================
 * STRATEGY: Income Acceleration / Deferral (Bracket Management)
 * One source object → advisor view, client PDF, client slideshow.
 * ==========================================================================*/
window.TSIQ = window.TSIQ || {};
TSIQ.strategyModules = TSIQ.strategyModules || [];

TSIQ.strategyModules.push({
  id: 'bracket-management',
  name: 'Income Acceleration / Deferral (Bracket Management)',
  category: 'Income Timing & Character',
  applyOrder: 1,
  modeled: true,
  character: 'timing', // ET2

  advisor: {
    summary:
      'Deliberate shifting of income recognition across year-ends to smooth the ' +
      'client through rate brackets and benefit cliffs. A cash-method business ' +
      'defers December billings into January (or accelerates them when next year ' +
      'will be higher-rate); other income (bonuses, Roth conversions, asset sales, ' +
      'retirement distributions) can be timed the same way. The value is the ' +
      'marginal-rate differential between the two years plus one year of deferral, ' +
      'and — often larger — staying under specific cliffs: the §199A phase-in ' +
      'threshold, the OBBBA SALT-cap phase-down starting at $505,000 MAGI, the ' +
      '0.9% additional Medicare and 3.8% NIIT thresholds, and the child tax ' +
      'credit phase-out. The tool\'s year-by-year columns make the cliff effects ' +
      'visible rather than guessing at them.',
    mechanics: [
      'Cash-method taxpayers recognize income when actually or constructively ' +
      'received (§451; Reg. §1.451-2). Holding December invoices until January, ' +
      'or prepaying deductible expenses, moves taxable income across the ' +
      'year-end without changing the underlying economics.',
      'Constructive receipt is the guardrail: income credited, set apart, or ' +
      'available without substantial limitation is taxed now even if the check ' +
      'is not cashed. Defer the BILLING, not the deposit of a received check.',
      'Cliff management is frequently worth more than the bracket spread: the ' +
      '§199A(b)(3) wage/SSTB limitation phases in above the taxable-income ' +
      'threshold; the OBBBA SALT cap ($40,400 in 2026) phases down 30% of MAGI ' +
      'over $505,000 (floor $10,000); NIIT attaches at $200k/$250k MAGI; the ' +
      'CTC phases out $50 per $1,000 over $200k/$400k.',
      'Deferring Schedule C income also defers SE tax; deferring pass-through ' +
      'K-1 ordinary income does not change FICA but does move QBI. The engine ' +
      'models the difference — select the correct income source.',
      'The give-back is real: deferred income lands in the next year. This ' +
      'strategy models both sides so the projection never shows deferral as ' +
      'free money — the benefit is the rate/cliff differential plus one year ' +
      'of payment deferral.'
    ],
    authority: [
      { type: 'IRC', cite: 'IRC §451(a)', note: 'General rule for the taxable year of inclusion — cash-method income is taxed when actually or constructively received.' },
      { type: 'Reg', cite: 'Reg. §1.451-2', note: 'Constructive receipt doctrine — income credited or made available without substantial limitation cannot be deferred.' },
      { type: 'IRC', cite: 'IRC §461(a)', note: 'Taxable year of deduction — the expense-side lever (prepayments, accrual timing) for the same bracket-management goal.' },
      { type: 'Admin', cite: 'Rev. Proc. 2025-32 (2026 inflation adjustments)', note: '2026 rate brackets and thresholds, as modified by OBBBA (P.L. 119-21) — the figures this tool uses.' },
      { type: 'IRC', cite: 'IRC §199A(b)(3), (e)(2)', note: 'QBI wage-limit/SSTB phase-in above the taxable-income threshold — a key cliff that income timing can manage.' },
      { type: 'IRC', cite: 'IRC §164 (as amended by OBBBA)', note: 'SALT cap $40,400 (2026) phased down 30% of MAGI over $505,000 with a $10,000 floor — creates a very high effective marginal rate in the phase-down band.' },
      { type: 'IRC', cite: 'IRC §1411; §3101(b)(2)', note: '3.8% NIIT and 0.9% additional Medicare tax thresholds ($200k/$250k, not inflation-indexed).' },
      { type: 'IRC', cite: 'IRC §24(b)', note: 'Child tax credit phase-out — $50 per $1,000 of MAGI over $200k/$400k.' }
    ],
    requirements: [
      'Cash-method business or discretionary control over income timing (billing practices, bonus timing, distribution elections, sale closings).',
      'A genuine rate or cliff differential between the two years — deferral into an equal-or-higher-rate year loses money after time value is netted.',
      'Deferral implemented before constructive receipt — decisions must be made before the income is made available, not after.',
      'A projection (this tool) quantifying both years, including SE tax, QBI, SALT phase-down, NIIT, and CTC effects.'
    ],
    risks: [
      'Constructive receipt: a check received in December is December income even if deposited in January — only unbilled/unearned amounts can be deferred.',
      'Rate risk: statutes change and income surprises happen; the "low" year can turn out high.',
      'Deferring receivables is a real credit risk — the customer must still pay in January.',
      'Stacking too much into one year can trigger the very cliffs being managed (SALT phase-down band, NIIT, QBI phase-in) — model the combined effect, not each item in isolation.',
      'Accrual-method taxpayers have far less flexibility; §451(b) ties inclusion to financial-statement revenue for many items.'
    ],
    bestFit: [
      'Cash-method business owners with lumpy or discretionary year-end income.',
      'Clients within roughly $50k–$150k of a major cliff (§199A threshold, $505k SALT phase-down, CTC phase-out).',
      'A known one-time high year (asset sale, big contract) next to a normal year.'
    ],
    implementation: [
      'Run this projection in Q4 with year-to-date actuals to locate the client against each cliff.',
      'Set a target taxable-income number for the current year; compute the dollar amount to defer or accelerate.',
      'Implement before year-end: hold or issue invoices, time bonuses and distributions, schedule closings on the chosen side of 12/31.',
      'Document the business purpose of billing timing; never hold received checks.',
      'Re-run the projection in January to set next year\'s estimated payments on the shifted income.'
    ]
  },

  client: {
    teaser: 'Times your income so more of it is taxed at your lowest rates',
    headline: 'Pay tax in the year it costs you least',
    plainEnglish: [
      'Tax rates work like a staircase: the more you earn in a single year, the higher the rate on your last dollars. Two years with even income almost always cost less total tax than one big year next to one small year.',
      'If you control when income shows up — when you send invoices, take a bonus, or close a sale — you can move some of it from a high-tax year into a lower-tax year. The income is the same; only the timing changes.',
      'There are also hidden trip-wires in the tax law: certain deductions and credits shrink or disappear once your income crosses specific lines. Timing your income to stay under those lines can save more than the rate difference itself. We map exactly where those lines are for you.'
    ],
    analogy: 'It\'s like an electric bill with peak and off-peak pricing — running the same appliances at off-peak hours costs less. Same income, cheaper hours.',
    benefits: [
      'The same income taxed at lower rates, just by moving the calendar date',
      'Keeps valuable deductions and credits that vanish above income cut-offs',
      'Pays part of the tax a full year later — your money works for you longer',
      'Repeatable planning, not a one-time trick'
    ],
    steps: [
      'Each fall we project your income and find your rate "staircase" position',
      'We calculate the exact amount worth moving across year-end',
      'You adjust billing, bonuses, or sale timing — we tell you precisely what and when',
      'We re-check in January so the next year is planned, not a surprise'
    ],
    considerations: [
      'Income moved into next year is still taxed next year — the win is the rate difference and the one-year delay, and we show you both sides honestly.',
      'Only income you haven\'t yet received or billed can be moved — money already made available to you counts this year.'
    ]
  },

  inputs: [
    { key: 'amountDeferred', label: 'Income deferred from year 1 into year 2', type: 'currency', default: 50000 },
    { key: 'source', label: 'Income source deferred', type: 'select', default: 'business',
      options: [{ value: 'business', label: 'Business income (Sch C / K-1)' }, { value: 'other', label: 'Other income' }] }
  ],

  appliesTo: function (profile) {
    return true; // validated in apply(): needs income in the selected source
  },

  /**
   * Year 0: remove the deferred amount from the selected income source.
   * Year 1: add the same nominal amount back (the give-back — deferral is
   * never modeled as free money). Business deferral comes out of scheduleCNet
   * if present (also defers SE tax), else passthroughK1 (QBI only).
   * Simplification: the add-back is the nominal amount, not grown.
   */
  apply: function (profile, params, yearIndex, state) {
    var p = Object.assign({}, profile);
    var notes = [];
    var amt = params.amountDeferred || 0;

    if (yearIndex === 0) {
      var field;
      if (params.source === 'business') {
        field = (p.scheduleCNet || 0) > 0 ? 'scheduleCNet'
              : ((p.passthroughK1 || 0) > 0 ? 'passthroughK1' : null);
      } else {
        field = (p.otherIncome || 0) > 0 ? 'otherIncome' : null;
      }
      if (!field) {
        notes.push('No income found in the selected source to defer — choose the ' +
          'source that matches the profile. No benefit modeled.');
        return { profile: p, notes: notes };
      }
      if (amt > p[field]) {
        amt = p[field];
        notes.push('Deferral capped at ' + TSIQ.fmt.usd(amt) +
          ' — cannot defer more than the ' + field + ' income on the profile.');
      }
      p[field] = p[field] - amt;
      state.bracketMgmt = { field: field, amount: amt };
      notes.push('Year 1: ' + TSIQ.fmt.usd(amt) + ' of ' +
        (params.source === 'business' ? 'business' : 'other') +
        ' income deferred into year 2. The year-2 column shows the add-back — ' +
        'the savings are the rate/cliff differential plus one year of deferral, not the whole tax.');
      notes.push('Watch the columns for cliff effects: §199A phase-in, SALT phase-down (MAGI over $505k), NIIT/additional Medicare, and CTC phase-out.');
    } else if (yearIndex === 1 && state.bracketMgmt) {
      p[state.bracketMgmt.field] = (p[state.bracketMgmt.field] || 0) + state.bracketMgmt.amount;
      notes.push('Year 2: deferred ' + TSIQ.fmt.usd(state.bracketMgmt.amount) + ' recognized (the give-back side of the deferral).');
    }
    return { profile: p, notes: notes };
  }
});
