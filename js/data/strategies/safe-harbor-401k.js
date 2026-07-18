/* ============================================================================
 * STRATEGY: Safe Harbor 401(k) Design
 * Advisory-only: an enabling plan design — it buys out ADP/ACP testing so the
 * owner CAN defer the max; the deferral itself is modeled under other
 * strategies (Solo 401(k) inputs, profit sharing, etc.).
 * ==========================================================================*/
window.TSIQ = window.TSIQ || {};
TSIQ.strategyModules = TSIQ.strategyModules || [];

TSIQ.strategyModules.push({
  id: 'safe-harbor-401k',
  name: 'Safe Harbor 401(k) Design',
  category: 'Retirement',
  applyOrder: 68,
  modeled: false,
  character: 'deferral', // ET2

  advisor: {
    summary:
      'In a 401(k) with employees, the ADP/ACP tests tie the owner\'s deferrals ' +
      'to what the staff actually defers — low participation means the owner\'s ' +
      'contributions get refunded as taxable income. A safe harbor design buys ' +
      'out the tests: commit to either a 3% nonelective contribution for all ' +
      'eligibles or a matching formula costing up to 4% of pay for participants ' +
      'only (§401(k)(12); QACA variants under §401(k)(13)), and the owner may ' +
      'defer the full $24,500 (2026) plus catch-up regardless of staff behavior. ' +
      'The nonelective route also satisfies the gateway for a new comparability ' +
      'or cash balance overlay, which is why 3% nonelective is the default ' +
      'chassis for every owner-max stacked design. This is an enabling strategy ' +
      '— the deduction it unlocks is modeled under the deferral and profit-' +
      'sharing strategies.',
    mechanics: [
      'ADP/ACP tests (§401(k)(3), §401(m)) limit HCE deferral rates to a spread ' +
      'over the NHCE average — with 2% staff participation, an owner wanting ' +
      '$24,500 on a $200,000 salary fails badly and gets corrective refunds.',
      'Safe harbor buy-out options: (a) 3% nonelective to ALL eligibles ' +
      'regardless of participation; (b) basic match — 100% of the first 3% ' +
      'deferred plus 50% of the next 2% (max cost 4% of pay, only for those who ' +
      'defer); (c) QACA auto-enrollment variants with slightly cheaper formulas ' +
      'and 2-year vesting (§401(k)(13)).',
      'Safe harbor nonelective/match dollars are immediately 100% vested ' +
      '(except QACA\'s 2-year cliff).',
      'The 3% nonelective doubles as (most of) the cross-testing gateway — ' +
      'stacking new comparability profit sharing on a safe harbor nonelective ' +
      'plan typically needs only ~2% more for staff to reach the 5% gateway.',
      'Match vs. nonelective economics: match is cheaper with apathetic staff ' +
      '(you pay only participants); nonelective is the price of admission for ' +
      'stacked owner-max designs and is required anyway once cross-testing ' +
      'enters the picture.',
      'Timing (SECURE Act §103): new safe harbor MATCH plans need the design in ' +
      'place before the plan year with participant notice; a 3% NONELECTIVE can ' +
      'be adopted retroactively until 30 days before plan year-end — or even up ' +
      'to the close of the FOLLOWING year if raised to 4%. A failed ADP test ' +
      'can literally be bought back after the fact.'
    ],
    authority: [
      { type: 'IRC', cite: 'IRC §401(k)(3); §401(m)', note: 'The ADP/ACP nondiscrimination tests a safe harbor design buys out.' },
      { type: 'IRC', cite: 'IRC §401(k)(12)', note: 'Traditional safe harbor: 3% nonelective or basic match (100% of first 3% + 50% of next 2%), immediately vested.' },
      { type: 'IRC', cite: 'IRC §401(k)(13)', note: 'QACA automatic-enrollment safe harbor with reduced match formula and 2-year vesting.' },
      { type: 'Admin', cite: 'SECURE Act §103 (P.L. 116-94)', note: 'Eliminated the notice requirement for nonelective safe harbor and allowed retroactive adoption — 3% up to 30 days before year-end; 4% until the close of the following plan year.' },
      { type: 'Admin', cite: 'Notice 2025-67', note: '2026 deferral limit ($24,500) and catch-up amounts the design unlocks for the owner.' }
    ],
    requirements: [
      'A 401(k) covering at least one non-owner employee (owner-only plans have no ADP test — safe harbor adds nothing there).',
      'Budget commitment: 3% of all eligible compensation (nonelective) or up to 4% of participating payroll (match), every year the design is in effect.',
      'Plan document amendment and, for match designs, the annual participant notice before the plan year.',
      'Payroll integration to compute and deposit the safe harbor contribution correctly.'
    ],
    risks: [
      'Mid-year suspension of safe harbor contributions is possible only in narrow circumstances and re-triggers full-year ADP testing — treat the commitment as annual.',
      'The match design does not satisfy the cross-testing gateway — owners who later want a profit-sharing or cash balance overlay usually wish they had chosen nonelective; design for the end state.',
      'Immediate vesting means safe harbor dollars walk out the door with short-tenure employees — no forfeiture recapture.',
      'Sloppy notice/timing on match designs voids safe harbor status for the year, resurrecting the tests the client paid to avoid.'
    ],
    bestFit: [
      'Owners with staff whose low participation is capping HCE deferrals (corrective refunds are the tell).',
      'Any business planning an owner-weighted stack — safe harbor nonelective is the foundation layer.',
      'Employers who want a predictable, budgetable retirement benefit rather than testing roulette.'
    ],
    implementation: [
      'Pull the last ADP/ACP test results — quantify what the owner is currently losing to refunds.',
      'Choose the formula around the end-state design: 3% nonelective if any profit-sharing/cash-balance stacking is plausible; match only if pure deferral-enablement at minimum cost is the goal.',
      'Amend the plan (or adopt with safe harbor provisions); calendar the SECURE Act §103 retroactive windows if the year is already underway.',
      'Deliver the participant notice (match designs) before the plan year.',
      'Fund safe harbor contributions with payroll; deduct on the business return.',
      'Once testing relief is in place, raise the owner\'s deferral to the maximum — model that under the deferral strategy.'
    ]
  },

  client: {
    teaser: 'Removes the hidden rule that quietly caps how much you can put away',
    headline: 'Unlock your full 401(k) — no matter what your employees contribute',
    plainEnglish: [
      'Here is a rule most business owners discover the hard way: in a company 401(k), the IRS ties how much YOU can contribute to how much your employees choose to contribute. If your team saves little, your own contributions get sent back to you as taxable income — even though you did nothing wrong.',
      'The fix is a "safe harbor" plan design. Your business commits to a modest, predictable contribution for your employees — typically 3 to 4 percent of pay. In exchange, the IRS switches off the test entirely: you can contribute the full legal maximum every year, regardless of what anyone else does.',
      'The employee contribution is not wasted money. It is a real, visible benefit that helps you hire and keep good people, it is fully deductible — and it usually doubles as the foundation for the bigger owner-focused plan designs we may layer on later.'
    ],
    analogy: 'It\'s like paying a flat toll to use the express lane all year — a small known cost, and you never get stuck behind traffic you cannot control.',
    benefits: [
      'Contribute your full 401(k) maximum every year — guaranteed, no test',
      'A small, predictable cost instead of surprise refunds at tax time',
      'A genuine benefit your employees can see, fully deductible',
      'Sets the stage for the larger owner-focused plan designs'
    ],
    steps: [
      'We review your plan\'s test results and show what the cap is costing you',
      'We pick the right version — flat contribution or matching — for where your plan is headed',
      'Your plan documents are updated and employees get the required notice',
      'You max your own contributions from then on'
    ],
    considerations: [
      'The employee contribution is a real annual commitment — about 3 to 4 percent of pay — so we budget it against what unlocking your maximum saves you.',
      'This matters only if you have employees; owner-only plans can already contribute the max.'
    ]
  },

  inputs: [],

  appliesTo: function (profile) {
    return true;
  },

  apply: function (profile, params, yearIndex, state) {
    return { profile: profile, notes: yearIndex === 0
      ? ['Advisory strategy — appears in the plan documents but does not change the scenario math. Safe harbor design ENABLES maximum owner deferrals; model the deferral dollars under the 401(k)/profit-sharing strategies.']
      : [] };
  }
});
