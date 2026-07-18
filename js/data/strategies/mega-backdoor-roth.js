/* ============================================================================
 * STRATEGY: Mega Backdoor Roth (After-Tax 401(k))
 * Advisory-only: builds tax-free growth but creates NO current deduction,
 * so there is nothing honest to model against this year's liability.
 * ==========================================================================*/
window.TSIQ = window.TSIQ || {};
TSIQ.strategyModules = TSIQ.strategyModules || [];

TSIQ.strategyModules.push({
  id: 'mega-backdoor-roth',
  name: 'Mega Backdoor Roth (After-Tax 401(k))',
  category: 'Retirement',
  applyOrder: 65,
  modeled: false,
  character: 'permanent', // ET2

  advisor: {
    summary:
      'Fills the gap between elective deferrals and the §415(c) annual additions ' +
      'ceiling — $72,000 for 2026 — with non-Roth after-tax employee ' +
      'contributions, then immediately converts them via in-plan Roth rollover ' +
      '(§402A(c)(4)) or rollover to a Roth IRA. After a maxed $24,500 deferral ' +
      'and typical employer contributions, this can move $30,000–$45,000+ per ' +
      'year into Roth status. There is NO current deduction — after-tax means ' +
      'after-tax — so this strategy appears in the plan as advisory: its value is ' +
      'decades of tax-free growth, not a line on this year\'s return. Unlike the ' +
      'IRA backdoor, the §408(d)(2) pro-rata trap does not apply: plan ' +
      'accounting tracks the after-tax subaccount separately, and Notice 2014-54 ' +
      'lets basis and earnings be split cleanly on distribution.',
    mechanics: [
      'Capacity = $72,000 §415(c) ceiling (2026) − elective deferrals − employer ' +
      'contributions. Example: $24,500 deferral + $12,500 employer leaves ' +
      '$35,000 of after-tax capacity.',
      'The plan document must permit BOTH non-Roth after-tax employee ' +
      'contributions AND in-plan Roth conversions (or in-service distribution of ' +
      'the after-tax account). Most off-the-shelf plans allow neither — check ' +
      'first, amend if needed.',
      'Convert immediately: earnings accrued between contribution and conversion ' +
      'are taxable at conversion, so a same-payroll sweep (many providers ' +
      'automate this) keeps the taxable slice near zero.',
      'In plans with staff, after-tax contributions are ACP-tested under ' +
      '§401(m) — heavy owner use in a small plan with low staff participation ' +
      'fails testing and gets refunded. Owner-only solo 401(k)s have no ACP ' +
      'test, making them the cleanest chassis.',
      'Contrast with the IRA backdoor: no aggregation with the client\'s ' +
      'pre-tax IRAs — the plan\'s separate accounting replaces the §408(d)(2) ' +
      'pro-rata fraction.'
    ],
    authority: [
      { type: 'IRC', cite: 'IRC §415(c)', note: 'Annual additions ceiling — $72,000 for 2026 — that after-tax contributions can fill.' },
      { type: 'IRC', cite: 'IRC §402A(c)(4)', note: 'In-plan Roth rollovers, including otherwise nondistributable amounts (as expanded by ATRA 2012).' },
      { type: 'IRC', cite: 'IRC §401(m)', note: 'ACP nondiscrimination test applies to employee after-tax contributions in plans with staff.' },
      { type: 'Admin', cite: 'Notice 2014-54', note: 'Allocation of pre-tax and after-tax amounts among simultaneous rollover destinations — the authority for clean basis separation.' },
      { type: 'Admin', cite: 'Notice 2013-74', note: 'Guidance on in-plan Roth rollovers of nondistributable amounts.' },
      { type: 'Admin', cite: 'Notice 2025-67', note: '2026 dollar limits ($24,500 deferral; $72,000 annual additions).' }
    ],
    requirements: [
      'A 401(k) whose document allows non-Roth after-tax contributions and in-plan Roth conversion (or in-service withdrawal of the after-tax account) — amend or restate if not.',
      'Cash flow to fund contributions that produce no current deduction, after deferrals and employer contributions are already maxed.',
      'Owner-only plan, or a staff plan that can pass ACP testing with the owner\'s after-tax dollars included.',
      'A provider or process that converts promptly (ideally automatically) each payroll.'
    ],
    risks: [
      'ACP testing failure in plans with employees — after-tax dollars get refunded, unwinding the strategy. Test before funding, not after.',
      'Conversion lag: earnings between contribution and conversion are taxable; a neglected after-tax account quietly builds a tax bill.',
      'Plan-document foot-faults — contributing after-tax dollars a plan does not actually permit creates an operational failure needing EPCRS correction.',
      'Legislative risk: proposals to curtail backdoor conversions recur; funded and converted dollars are historically grandfathered, which argues for using capacity while it exists.'
    ],
    bestFit: [
      'High savers who already max deferrals and still have surplus cash flow — typically $400k+ household income or exceptional savings discipline.',
      'Owner-only solo 401(k) clients: full plan-design control and no ACP test.',
      'Clients whose income blocks direct Roth IRA contributions and who want far more Roth capacity than the $7,500 IRA backdoor.'
    ],
    implementation: [
      'Read the plan document / adoption agreement for after-tax and in-plan conversion provisions; amend or restate if absent (solo plans: pick a provider whose document includes both).',
      'Compute this year\'s capacity: $72,000 − deferrals − employer contributions.',
      'Set up after-tax payroll contributions (W-2 owners) or plan contributions (solo), with automatic same-period Roth conversion if the provider offers it.',
      'For staff plans, have the TPA project ACP results BEFORE the owner funds.',
      'Confirm the 1099-R for conversions shows only converted earnings (if any) as taxable; reconcile on the return.',
      'Recheck capacity annually — employer contribution changes move the after-tax headroom.'
    ]
  },

  client: {
    teaser: 'A little-known way to grow retirement money the IRS can never tax again',
    headline: 'Supercharge your Roth: up to triple the savings growing tax-free forever',
    plainEnglish: [
      'A Roth account is the best deal in retirement savings: the money grows for decades and you never pay tax on it again — not on the growth, not when you take it out. The catch is the front door is tiny: normal Roth contributions are capped at a few thousand dollars a year, and high earners are locked out entirely.',
      'But inside a 401(k) there is a bigger door most people never notice. The law allows total yearly contributions of up to $72,000 — far beyond the usual limits — if your plan is set up to accept a special extra type of contribution. Once those dollars are in, we convert them to Roth right away, where they grow tax-free for good.',
      'These extra contributions do not reduce this year\'s tax bill — you fund them with money you have already paid tax on. The payoff comes later, and it compounds: decades of growth the IRS never touches, and no required withdrawals forcing money out on the government\'s schedule.'
    ],
    analogy: 'It\'s like finding out the express lane you thought was closed to you has a second entrance — and it fits three times as much luggage.',
    benefits: [
      'Move an extra $30,000–$45,000 per year into never-taxed-again savings',
      'Works even when your income is too high for a regular Roth',
      'No required withdrawals later — the money compounds on your schedule',
      'Tax-free money in retirement gives us pricing power over your future brackets'
    ],
    steps: [
      'We check whether your retirement plan has the two features this needs — and fix it if not',
      'We calculate your exact extra capacity for the year',
      'Contributions convert to Roth automatically, so growth is tax-free from day one',
      'We recheck the numbers every year as your plan contributions change'
    ],
    considerations: [
      'This does not cut this year\'s taxes — it is a wealth-building move whose payoff is tax-free growth for decades.',
      'It only makes sense after your regular retirement contributions are already maxed and cash flow is comfortable.'
    ]
  },

  inputs: [],

  appliesTo: function (profile) {
    return true;
  },

  apply: function (profile, params, yearIndex, state) {
    return { profile: profile, notes: yearIndex === 0
      ? ['Advisory strategy — appears in the plan documents but does not change the scenario math. After-tax contributions create no current deduction; the value is long-term tax-free growth.']
      : [] };
  }
});
