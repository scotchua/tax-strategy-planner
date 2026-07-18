/* ============================================================================
 * STRATEGY: Cash Balance Stacked on 401(k)/Profit Sharing
 * One source object → advisor view, client PDF, client slideshow.
 * ==========================================================================*/
window.TSIQ = window.TSIQ || {};
TSIQ.strategyModules = TSIQ.strategyModules || [];

TSIQ.strategyModules.push({
  id: 'cash-balance-stack',
  name: 'Cash Balance Stacked on 401(k)/Profit Sharing',
  category: 'Retirement',
  applyOrder: 64,
  modeled: true,

  // Notice 98-4 bars pairing a qualified plan with a SIMPLE for the same year.
  conflictsWith: ['simple-ira'],

  advisor: {
    summary:
      'The maximum-deduction retirement architecture for a high-income owner: ' +
      'three layers in one design. Layer 1 — 401(k) elective deferral ($24,500 ' +
      'for 2026, plus catch-up). Layer 2 — employer profit sharing, held to 6% ' +
      'of compensation. Layer 3 — a cash balance (defined benefit) pay credit, ' +
      'actuarially determined and often $100,000–$250,000+ for owners in their ' +
      '50s. The 6% ceiling on layer 2 is not a style choice: §404(a)(7) caps ' +
      'combined DC deductions at 6% of compensation when a DB plan is also ' +
      'maintained — elective deferrals do not count against it. Properly ' +
      'designed, an owner in their late 50s can exceed $300,000 of combined ' +
      'annual deductions. The real ceiling comes from the actuary, not a table.',
    mechanics: [
      'Layer 1: §402(g) deferral — $24,500 + $8,000 catch-up at 50+ ($11,250 at ' +
      '60–63). Deferrals are exempt from the §404(a)(7) combined-deduction cap.',
      'Layer 2: profit sharing capped at 6% of eligible compensation — the ' +
      '§404(a)(7) combined limit when DB and DC plans overlap (deferrals ' +
      'excluded). Cross-tested allocation typically directs it to the owner ' +
      'over the same gateway used in a standalone new comparability design.',
      'Layer 3: cash balance pay credit sized by the actuary toward the ' +
      '§415(b) maximum benefit ($290,000 annuity, 2026) — age-driven, so the ' +
      'credit grows as the owner nears retirement.',
      'Staff cost: combined-plan nondiscrimination testing typically requires ' +
      '~7.5% of pay for NHCEs (5% gateway + cash balance minimums, design-' +
      'dependent) — the price of the owner\'s six-figure stack.',
      'Compensation base: W-2 wages for an S corp owner must SUPPORT the ' +
      'design — a $50,000 salary cannot carry a $200,000 pay credit; ' +
      'coordinate reasonable compensation before adopting.',
      'Both plans file Form 5500; the cash balance side needs an enrolled ' +
      'actuary (Schedule SB) and, with staff, usually PBGC coverage.'
    ],
    authority: [
      { type: 'IRC', cite: 'IRC §404(a)(7)', note: 'Combined deduction limit when DB and DC plans overlap — DC contributions capped at 6% of compensation (elective deferrals excluded).' },
      { type: 'IRC', cite: 'IRC §415(b); §415(c)', note: '2026 ceilings on each layer: $290,000 DB annuity; $72,000 DC annual additions.' },
      { type: 'IRC', cite: 'IRC §404(o)', note: 'Deduction for the cash balance contribution follows the actuarial funding target.' },
      { type: 'IRC', cite: 'IRC §412; §430', note: 'Minimum funding — the cash balance layer is mandatory each year once adopted.' },
      { type: 'Reg', cite: 'Reg. §1.401(a)(4)-8', note: 'Cross-testing and gateway rules governing the combined-plan nondiscrimination math.' },
      { type: 'Admin', cite: 'Notice 2025-67', note: '2026 COLAs: $24,500/$8,000/$11,250 deferral figures, $72,000 §415(c), $290,000 §415(b), $360,000 comp limit.' }
    ],
    requirements: [
      'Consistent income comfortably above the target deduction — the cash balance layer is a mandatory multi-year funding commitment (§412/§430).',
      'A TPA/actuary team running BOTH plans\' documents and combined testing as one design.',
      'Owner compensation (W-2 or SE earnings) large enough to support the pay credit and the 6% profit-sharing base.',
      'With staff: budget roughly 7.5%+ of eligible payroll for required employee benefits.'
    ],
    risks: [
      'Blowing the §404(a)(7) 6% limit — running a pre-existing 25% profit-sharing formula alongside a new cash balance plan creates nondeductible contributions and a 10% excise tax; the DC plan must be amended in the adoption year.',
      'Mandatory funding meets a bad year: the cash balance contribution is not optional — underfunding triggers excise taxes and freezing early undermines permanency.',
      'Demographic drift can unravel combined testing — an aging staff or departing young employees changes the math annually.',
      'Two plan documents, two 5500s, actuarial fees, and PBGC premiums (with staff) — typically $5,000–$10,000/year of administration against the six-figure deduction.',
      'Do NOT also select the standalone Defined Benefit strategy in the same scenario — this strategy already includes the DB layer; stacking both double-counts.'
    ],
    bestFit: [
      'Owners 50+ with $500,000+ of stable business income who have outgrown every DC-only design.',
      'Professional practices and partner groups where each principal wants their own six-figure credit.',
      'Clients within reach of the §199A phase-out for whom a $200,000+ above-the-line deduction restores the QBI deduction on top of the direct savings.'
    ],
    implementation: [
      'Commission a combined design study (census, target deduction, staff cost) from an actuary/TPA — insist on seeing the §404(a)(7) coordination in the illustration.',
      'Amend the existing 401(k)/profit-sharing plan to a 6%-compatible formula in the same year the cash balance plan is adopted.',
      'Adopt the cash balance document by the filing deadline; set deferral elections through payroll by 12/31.',
      'Fund all three layers by the return due date including extensions (minimum funding no later than 8½ months after year-end).',
      'File both Forms 5500 (Schedule SB on the cash balance side); pay PBGC premiums if covered.',
      'Re-run the combined design every year; plan the endgame — freeze and terminate near retirement, rolling balances to IRAs.'
    ]
  },

  client: {
    teaser: 'Three deductions stacked into one design — often $300,000 a year for the owner',
    headline: 'Stack three retirement plans into one $300,000-a-year deduction machine',
    plainEnglish: [
      'Most owners know about the 401(k). Far fewer know the law lets a business run a 401(k) AND a pension-style plan at the same time, stacked into one coordinated design. Each layer has its own limit — and they add together.',
      'Layer one is your own 401(k) contribution. Layer two is a company profit-sharing contribution. Layer three is the big one: a pension-style account whose annual contribution is calculated by a specialist and grows with your age — for owners in their fifties it is often $150,000 to $250,000 a year on its own. Stacked, the three layers can top $300,000 of deductions annually, every dollar reducing your taxable income now and building your retirement instead.',
      'This is the most powerful retirement design the law offers, and it comes with real commitments: the pension layer must be funded every year for several years, your team receives meaningful contributions too, and specialists run the numbers annually. We only build it when your income is strong and steady enough to carry it comfortably.'
    ],
    analogy: 'One savings account has a lid on it. This design stacks three accounts with three separate lids — and the biggest lid gets higher every year you get older.',
    benefits: [
      'Combined deductions that can exceed $300,000 per year for an owner in their 50s',
      'Three separate legal limits working together instead of one',
      'Compresses decades of retirement saving into your highest-earning years',
      'Often restores other tax breaks that high income was phasing out'
    ],
    steps: [
      'A pension specialist designs all three layers around your age, income, and team',
      'You see the full picture first — your number, the staff cost, the multi-year commitment',
      'We coordinate your existing 401(k) so the layers fit the legal limits',
      'Specialists certify the numbers annually; we capture the deduction on every return'
    ],
    considerations: [
      'The pension layer is a real multi-year commitment — the contribution is required even in a slower year, so we stress-test your cash flow before building it.',
      'With employees, the design includes required contributions for your team — typically around 7.5% of their pay — which we price into the decision.',
      'Setup and annual specialist fees are real, though small next to six-figure deductions.'
    ]
  },

  inputs: [
    { key: 'combinedContribution', label: 'Combined contribution (all three layers, owner)', type: 'currency', default: 200000 }
  ],

  appliesTo: function (profile) {
    return true; // needs scheduleCNet or ownerWages; validated with a note in apply()
  },

  /**
   * The advisor enters the actuary's combined owner number (deferral + 6%
   * profit sharing + cash balance credit). Modeled as an above-the-line
   * deduction that also reduces QBI — a simplification (the deferral slice of
   * an S corp owner technically reduces W-2 Box 1 and the entity layers reduce
   * K-1), acceptable because all layers reduce taxable income and none reduce
   * FICA; noted below. §404(a)(7) coordination and staff cost are the
   * actuary's math — flagged, not computed. Sanity-capped at earned income.
   */
  apply: function (profile, params, yearIndex, state) {
    var p = Object.assign({}, profile);
    var notes = [];

    var earned = (p.scheduleCNet > 0 ? p.scheduleCNet : 0) + (p.ownerWages || 0);
    if (earned <= 0) {
      if (yearIndex === 0) {
        notes.push('Requires self-employment income (Schedule C) or W-2 wages from the ' +
          'client\'s own entity — neither is present. No benefit modeled.');
      }
      return { profile: p, notes: notes };
    }
    if (state.hasSimplePlan) {
      if (yearIndex === 0) {
        notes.push('A SIMPLE IRA is also selected in this scenario — an employer generally ' +
          'cannot maintain both a SIMPLE IRA and this stack in the same year (Notice 98-4). ' +
          'No benefit modeled here; choose one plan type.');
      }
      return { profile: p, notes: notes };
    }

    var amt = params.combinedContribution || 0;
    if (amt > earned) {
      amt = earned; // combined deduction cannot exceed owner compensation/earned income
      if (yearIndex === 0) {
        notes.push('Combined contribution capped at ' + TSIQ.fmt.usd(amt) +
          ' (owner earned income shown) — a larger number requires higher compensation; ' +
          'the actuarial design study will set the real figure.');
      }
    }

    p.adjustments = (p.adjustments || 0) + amt;
    p.qbiReduction = (p.qbiReduction || 0) + amt; // owner retirement deductions reduce §199A QBI
    if (yearIndex === 0) {
      notes.push(TSIQ.fmt.usd(amt) + ' combined 401(k) + 6% profit sharing + cash balance ' +
        'contribution modeled. The TRUE ceiling is actuarially determined — this tool does ' +
        'not compute §404(a)(7) coordination or required staff cost; get a design study ' +
        'before quoting the client. Funding the cash balance layer is a multi-year commitment.');
      notes.push('Do not also select the standalone Defined Benefit, Solo 401(k), SEP-IRA, ' +
        'or Profit-Sharing strategies in this scenario — this combined figure already ' +
        'includes those layers, and selecting them too would double-count the same dollars.');
    }
    state.hasQualifiedPlan = true;
    return { profile: p, notes: notes };
  }
});
