/* ============================================================================
 * STRATEGY: Real Estate Professional Status (REPS)
 * One source object → advisor view, client PDF, client slideshow.
 * ==========================================================================*/
window.TSIQ = window.TSIQ || {};
TSIQ.strategyModules = TSIQ.strategyModules || [];

TSIQ.strategyModules.push({
  id: 'reps-qualification',
  name: 'Real Estate Professional Status (REPS)',
  category: 'Real Estate & Cost Recovery',
  applyOrder: 53,
  modeled: true,

  advisor: {
    summary:
      '§469(c)(2) makes rental activities per-se passive, trapping losses ' +
      'against passive income only. §469(c)(7) removes the per-se taint for a ' +
      'taxpayer who (1) performs more than 750 hours AND (2) more than half ' +
      'of all personal-service time in real property trades or businesses in ' +
      'which they materially participate. The rentals still must clear ' +
      'material participation individually — or as one activity via the Reg. ' +
      '§1.469-9(g) aggregation election. REPS is the master key that lets ' +
      'cost segregation, bonus depreciation, and ordinary rental losses ' +
      'offset W-2 and business income currently. On a joint return only one ' +
      'spouse must qualify, but that spouse must meet both hour tests alone.',
    mechanics: [
      'Two-part test under §469(c)(7)(B), applied to ONE spouse individually: ' +
      '>750 hours in real property trades or businesses (development, ' +
      'construction, acquisition, rental, management, brokerage, etc.) AND ' +
      'more than 50% of ALL personal services performed that year — a ' +
      'full-time W-2 job outside real estate makes the 50% prong nearly ' +
      'impossible.',
      'Qualifying removes the per-se passive label, but each rental must ' +
      'still pass a Reg. §1.469-5T(a) material participation test (500 hours; ' +
      'substantially all participation; >100 hours and more than anyone else; ' +
      'etc.) — per property, unless aggregated.',
      'The Reg. §1.469-9(g) election treats ALL rental real estate interests ' +
      'as a single activity, so material participation is tested once across ' +
      'the whole portfolio. Filed as a statement with the return; binding on ' +
      'future years until revoked for a material change in circumstances.',
      'Employee hours count only if the taxpayer owns >5% of the employer ' +
      '(§469(c)(7)(D)(ii)) — a salaried property manager with no ownership ' +
      'gets zero qualifying hours.',
      'Documentation is the battleground: contemporaneous time logs, ' +
      'calendars, and records win or lose these cases. Courts reject ' +
      '"ballpark guesstimates" reconstructed at exam.'
    ],
    authority: [
      { type: 'IRC', cite: 'IRC §469(c)(2), (c)(4)', note: 'Rental activities are passive per se, regardless of material participation — the rule REPS overrides.' },
      { type: 'IRC', cite: 'IRC §469(c)(7)', note: 'The real estate professional exception: >750 hours and >50% of personal services in real property trades or businesses with material participation.' },
      { type: 'Reg', cite: 'Reg. §1.469-9', note: 'Operative REPS rules, including the (g) election to aggregate all rental real estate as one activity for material participation.' },
      { type: 'Reg', cite: 'Reg. §1.469-5T(a)', note: 'The seven material participation tests each rental (or the aggregated activity) must satisfy.' },
      { type: 'Case', cite: 'Moss v. Comm\'r, 135 T.C. 365 (2010)', note: 'On-call/standby hours do not count toward the 750-hour test — only hours actually worked.' },
      { type: 'Admin', cite: 'IRS Passive Activity Loss Audit Technique Guide', note: 'Exam playbook: examiners test the 50% prong first and attack reconstructed time logs.' }
    ],
    requirements: [
      'One spouse individually clears BOTH prongs: >750 hours and >50% of total personal-service time in real property trades or businesses.',
      'Material participation in each rental — or the §1.469-9(g) aggregation election filed with the return.',
      'Contemporaneous time logs: dates, hours, and the specific work performed, kept as the year happens.',
      '>5% ownership in any real estate employer whose hours are being counted.'
    ],
    risks: [
      'The 50%-of-services prong disqualifies most clients with full-time non-real-estate jobs — hours alone are not enough.',
      'REPS is tested EVERY year; a qualifying 2026 does not carry into 2027.',
      'Reconstructed or inflated time logs are the most-litigated fact pattern in the passive-loss area; courts routinely reject after-the-fact estimates.',
      'Forgetting the aggregation election forces material participation per property — often fatal for multi-property portfolios.',
      'The aggregation election is binding going forward and can have side effects (e.g., on complete-disposition loss recognition) — elect deliberately.'
    ],
    bestFit: [
      'A spouse who genuinely works in real estate (agent, broker, developer, full-time landlord) while the other spouse earns the W-2 income being sheltered.',
      'Portfolio owners planning cost segregation studies whose losses would otherwise be suspended.',
      'Self-employed clients scaling back other work whose real estate hours can credibly exceed half their total.'
    ],
    implementation: [
      'Screen the two prongs honestly — build a projected hour budget by property and activity BEFORE claiming the status.',
      'Start a contemporaneous time log now (app or calendar-based); record dates, hours, and tasks.',
      'Evaluate and, if appropriate, file the Reg. §1.469-9(g) aggregation election statement with the timely return.',
      'Confirm material participation under a specific §1.469-5T(a) test and document which one.',
      'Re-test the facts every year; pair with cost segregation / bonus depreciation once the status is solid.'
    ]
  },

  client: {
    teaser: 'A status change that turns paper losses into real refunds',
    headline: 'Make your rental losses count against your other income',
    plainEnglish: [
      'The tax code normally puts rental losses in a locked box: they can only offset other rental-type income, not your salary or business profits. For most landlords, big depreciation deductions just pile up unused.',
      'But there is an exception for people who genuinely work in real estate. If you spend more than 750 hours a year — and more than half of your total working time — on real estate activities, and you are hands-on with your rentals, the lock comes off. Your rental losses can then offset wages, business income, everything.',
      'For a couple, only one spouse needs to qualify. That is a powerful combination: one spouse runs the real estate, the other earns the paycheck, and the rental deductions shelter the household\'s whole income. The catch is proof — the IRS expects a real diary of your hours, kept as you go, not remembered later.'
    ],
    analogy: 'It\'s like a members-only door at the tax office: put in the documented hours and your rental losses walk straight through to offset your paycheck.',
    benefits: [
      'Rental losses offset salary and business income in the same year',
      'Unlocks the full power of accelerated depreciation strategies',
      'Only one spouse needs to qualify on a joint return',
      'No dollar cap on the losses that become usable'
    ],
    steps: [
      'We assess honestly whether your work pattern can qualify — before you count on it',
      'We set you up with a simple time-tracking system that satisfies the IRS',
      'We file the right elections so all your properties are tested together',
      'We re-check every year and pair the status with depreciation strategies'
    ],
    considerations: [
      'This requires real, documented hours — more than 750 a year and more than half your working time. A full-time job outside real estate almost always disqualifies you.',
      'The status is earned one year at a time, and your time log is your defense if the IRS asks.'
    ]
  },

  inputs: [],

  suggest: function (p) {
    if (!(p.rentalNet < 0 && p.rentalLossesUsable === false)) return null;
    return { reason: 'Rental losses are currently suspended (§469) — REPS or the short-term-rental route could unlock them.' };
  },

  appliesTo: function (profile) {
    return true; // the unlock is meaningful whenever rental losses exist or are planned
  },

  /**
   * No dollar inputs — this strategy flips two independent engine gates.
   * rentalLossesUsable = true (§469) lets rental losses (including those
   * created by cost segregation / bonus / QIP strategies) offset nonpassive
   * income instead of being suspended. reNonPassive = true (§1411) also
   * excludes rental income from NIIT — REPS qualification is a non-passive,
   * material-participation trade or business under both sections. Both
   * flags are set every projection year; notes only in year 1.
   */
  apply: function (profile, params, yearIndex, state) {
    var p = Object.assign({}, profile);
    var notes = [];
    var alreadyUsable = !!p.rentalLossesUsable;
    p.rentalLossesUsable = true;
    p.reNonPassive = true;
    if (yearIndex === 0) {
      if (alreadyUsable) {
        notes.push('Rental losses were already flagged usable — REPS documented as the ' +
          'supporting position (>750 hrs, >50% of services, material participation, ' +
          'contemporaneous logs).');
      } else {
        notes.push('REPS qualification unlocks rental losses (§469(c)(7)): losses from ' +
          'this and other real estate strategies now offset nonpassive income in the ' +
          'scenario instead of being suspended. Requires >750 documented hours, >50% of ' +
          'personal-service time in real property trades, and material participation ' +
          '(consider the Reg. §1.469-9(g) aggregation election).');
      }
    }
    return { profile: p, notes: notes };
  }
});
