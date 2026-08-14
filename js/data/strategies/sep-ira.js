/* ============================================================================
 * STRATEGY: SEP-IRA
 * One source object → advisor view, client PDF, client slideshow.
 * ==========================================================================*/
window.TSIQ = window.TSIQ || {};
TSIQ.strategyModules = TSIQ.strategyModules || [];

TSIQ.strategyModules.push({
  id: 'sep-ira',
  name: 'SEP-IRA',
  category: 'Retirement',
  applyOrder: 62,
  modeled: true,
  character: 'deferral', // ET2

  // Same base compensation as a Solo 401(k) for the same self-employment
  // income (§415(c) coordination already caps both via
  // state.dcAnnualAdditionsUsed); Notice 98-4 bars pairing with a SIMPLE.
  // cash-balance-stack's combined figure already contains this layer.
  conflictsWith: ['solo-401k', 'simple-ira', 'cash-balance-stack'],

  advisor: {
    summary:
      'A Simplified Employee Pension under §408(k): the employer contributes a ' +
      'uniform percentage of compensation to each eligible participant\'s IRA. ' +
      'The 2026 per-participant cap is the lesser of 25% of compensation and ' +
      '$72,000 (§415(c)); for a self-employed owner the effective rate is ~20% of ' +
      'net SE earnings because the base is reduced by the contribution itself and ' +
      'half of SE tax. Its killer feature is timing — a SEP can be established AND ' +
      'funded as late as the return due date including extensions, making it the ' +
      'only meaningful retirement deduction still available after year-end. Its ' +
      'trap is uniformity: every eligible employee must receive the same ' +
      'percentage the owner takes.',
    mechanics: [
      'Employer-only contributions — no employee deferrals, no catch-up. The ' +
      'deduction limit is 25% of aggregate compensation (§404(h)); compensation ' +
      'counted up to $360,000 per participant (§401(a)(17), 2026).',
      'Self-employed owner math: 25% of (net SE earnings − ½ SE tax − the ' +
      'contribution), which resolves to ~20% of net SE earnings.',
      'Uniform-percentage rule: the owner cannot take 25% and give staff 3% — ' +
      'every eligible employee gets the owner\'s percentage of their pay.',
      'Eligibility can be set as restrictively as: age 21, service in 3 of the ' +
      'prior 5 years, and a de minimis indexed compensation floor — useful to ' +
      'exclude new hires for up to 3 years.',
      'Establish and fund by the return due date INCLUDING extensions — the ' +
      'classic "it\'s March and we owe money" lever.',
      'A SEP balance is a pre-tax IRA for §408(d)(2) purposes — it poisons the ' +
      'backdoor Roth pro-rata calculation. Coordinate before recommending both.'
    ],
    authority: [
      { type: 'IRC', cite: 'IRC §408(k)', note: 'SEP requirements: uniform contributions, eligibility standards, IRA funding vehicle.' },
      { type: 'IRC', cite: 'IRC §404(h)', note: 'Deduction limit — 25% of compensation; contributions by the extended due date are treated as made for the year.' },
      { type: 'IRC', cite: 'IRC §415(c)', note: 'Per-participant cap — $72,000 for 2026 (lesser of that or 25% of comp).' },
      { type: 'IRC', cite: 'IRC §401(a)(17)', note: 'Compensation taken into account capped at $360,000 (2026).' },
      { type: 'IRC', cite: 'IRC §408(d)(2)', note: 'IRA aggregation — SEP balances count in the pro-rata fraction for Roth conversions.' },
      { type: 'Admin', cite: 'Form 5305-SEP', note: 'Model plan document; adopting it (or a prototype) is the entire establishment step. No annual Form 5500.' },
      { type: 'Admin', cite: 'Notice 2025-67', note: '2026 cost-of-living adjustments for the $72,000 and $360,000 figures.' },
      { type: 'Admin', cite: 'IRS Publication 560', note: 'Self-employed rate worksheet (the ~20% computation) and eligibility rules.' }
    ],
    requirements: [
      'Self-employment income or compensation from the client\'s own entity to base the percentage on.',
      'Willingness to fund EVERY eligible employee at the owner\'s percentage — this is the go/no-go question for any business with staff.',
      'Plan adopted (Form 5305-SEP or prototype) and funded by the return due date including extensions.',
      'Written eligibility terms applied consistently — you cannot exclude an eligible employee ad hoc.'
    ],
    risks: [
      'Staff cost: with employees, a 20% owner contribution means 20% of payroll for everyone eligible — often erasing the owner\'s benefit. Run the census math first.',
      'Uniformity failures (owner funded, employee skipped) disqualify the SEP — contributions become currently taxable wages.',
      'Pro-rata contamination of backdoor Roth conversions (§408(d)(2)) — a growing SEP balance blocks that strategy for high earners.',
      'No catch-up contributions and no employee deferral layer — at moderate income a Solo 401(k) shelters strictly more.',
      'Contributions above the 25%/$72,000 limit are subject to excise tax if not withdrawn timely.'
    ],
    bestFit: [
      'Owner-only businesses that missed the 12/31 window — the after-year-end deduction of last resort.',
      'High-income owners with no (or only short-tenure) employees.',
      'Clients who value zero administration: no plan testing, no Form 5500, IRA-level paperwork only.'
    ],
    implementation: [
      'Pull an employee census: anyone age 21+ with service in 3 of the last 5 years is in — decide if the staff cost is acceptable.',
      'Adopt Form 5305-SEP (or a custodian prototype) — a signature, not a filing.',
      'Compute the owner max: Pub. 560 worksheet for Schedule C (~20% of net SE earnings) or 25% of W-2 wages for an S corp owner, capped at $72,000.',
      'Fund all eligible participants\' SEP-IRAs at the uniform percentage by the extended due date.',
      'Deduct: Schedule 1 for the self-employed owner (also reduces QBI); entity return for employees and an S corp owner.',
      'If a backdoor Roth is also on the plan menu, resolve the pro-rata conflict first (e.g., roll the SEP into a 401(k)).'
    ]
  },

  client: {
    teaser: 'The one big deduction you can still create after the year is already over',
    headline: 'A retirement deduction you can decide on at tax time',
    plainEnglish: [
      'Most tax moves have to happen before December 31. This one is different: your business can set up and fund this retirement account all the way up to the day your tax return is due — even on extension. You see the final numbers first, then decide how much to put away.',
      'The business contributes a percentage of your pay into a retirement account in your name, and deducts every dollar. For 2026 the contribution can be as large as $72,000 depending on your income.',
      'One important catch: if you have employees, the same percentage that goes in for you must also go in for every eligible employee. That is fair to your team, but it changes the math — so we run those numbers with you before you commit.'
    ],
    analogy: 'It\'s like being allowed to buy a ticket after the race has been run — you already know your income for the year, so you can pick the deduction that fits it exactly.',
    benefits: [
      'Set up and fund it after year-end — decide when you see your tax bill',
      'Contributions can reach $72,000 (2026), all deductible',
      'Almost no paperwork — no annual government filings for the plan',
      'Contribute a lot in good years, nothing in lean ones'
    ],
    steps: [
      'We calculate your exact maximum from your final income numbers',
      'We prepare the one-page plan document for your signature',
      'You fund the account before the filing deadline; we take the deduction',
      'If you have employees, we run the full cost picture with you first'
    ],
    considerations: [
      'Every eligible employee must get the same percentage of pay you give yourself — with staff, that cost can outweigh your benefit.',
      'This account can complicate another popular strategy (the "backdoor" Roth), so we coordinate the two before opening it.'
    ]
  },

  inputs: [
    { key: 'contribution', label: 'Owner SEP contribution', type: 'currency', default: 30000, solveable: true }
  ],

  appliesTo: function (profile) {
    return true; // needs scheduleCNet or ownerWages; validated with a note in apply()
  },

  /**
   * Owner contribution only — employee-coverage cost is flagged in notes, not
   * modeled (headcount is not a profile field). Self-employed: above-the-line
   * deduction that also reduces QBI. S corp owner: entity deduction against
   * passthroughK1. Capped at the lesser of $72,000 (§415(c)) and the
   * compensation-based max (~20% of net SE earnings / 25% of W-2 wages).
   */
  apply: function (profile, params, yearIndex, state) {
    var p = Object.assign({}, profile);
    var notes = [];
    var lim = TSIQ.TABLES_2026.limits.retirement;

    var isSE = p.scheduleCNet > 0;
    var isW2Owner = !isSE && p.ownerWages > 0;
    if (!isSE && !isW2Owner) {
      if (yearIndex === 0) {
        notes.push('Requires self-employment income (Schedule C) or W-2 wages from the ' +
          'client\'s own entity — neither is present. No benefit modeled.');
      }
      return { profile: p, notes: notes };
    }

    // SE base ≈ 20% of net earnings (§1402(a)(12) 0.9235 factor; the exact
    // Pub. 560 circular computation differs immaterially and this is conservative).
    var compMax = isSE
      ? p.scheduleCNet * 0.9235 * 0.20
      : Math.min(p.ownerWages, lim.compensationLimit) * 0.25;
    var cap = Math.min(compMax, lim.dcAnnualAdditions);

    var amt = Math.min(params.contribution || 0, cap);
    if ((params.contribution || 0) > cap && yearIndex === 0) {
      notes.push('SEP contribution capped at ' + TSIQ.fmt.usd(cap) + ' — the lesser of ' +
        TSIQ.fmt.usd(lim.dcAnnualAdditions) + ' (§415(c), 2026) and ' +
        (isSE ? '~20% of net self-employment earnings' : '25% of owner W-2 wages') + '.');
    }

    // §415(c) is shared across every DC plan (Solo 401(k), SEP-IRA,
    // profit-sharing) the same business maintains in the same year.
    state.dcAnnualAdditionsUsed = state.dcAnnualAdditionsUsed || 0;
    var headroom = Math.max(0, lim.dcAnnualAdditions - state.dcAnnualAdditionsUsed);
    if (amt > headroom) {
      amt = headroom;
      if (yearIndex === 0) {
        notes.push('Reduced further because another defined-contribution plan (Solo 401(k) / ' +
          'profit-sharing) in this scenario already used ' +
          TSIQ.fmt.usd(state.dcAnnualAdditionsUsed) + ' of the shared §415(c) limit — ' +
          'a SEP-IRA generally is not layered on top of a 401(k) for the same business anyway.');
      }
    }
    state.dcAnnualAdditionsUsed += amt;
    state.hasQualifiedPlan = true;

    if (isSE) {
      p.adjustments = (p.adjustments || 0) + amt;
      p.qbiReduction = (p.qbiReduction || 0) + amt; // SE retirement deduction reduces §199A QBI
    } else {
      p.passthroughK1 = p.passthroughK1 - amt; // entity deduction (also reduces QBI)
    }
    if (yearIndex === 0) {
      notes.push(TSIQ.fmt.usd(amt) + ' SEP-IRA contribution modeled for the owner. ' +
        'IMPORTANT: every eligible employee must receive the SAME percentage of pay ' +
        '— staff cost is NOT modeled here. Run the employee census before adopting.');
    }
    return { profile: p, notes: notes };
  }
});
