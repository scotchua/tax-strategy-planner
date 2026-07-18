/* ============================================================================
 * STRATEGY: Nonqualified Deferred Compensation for Owners
 * One source object → advisor view, client PDF, client slideshow.
 * ==========================================================================*/
window.TSIQ = window.TSIQ || {};
TSIQ.strategyModules = TSIQ.strategyModules || [];

TSIQ.strategyModules.push({
  id: 'deferred-comp',
  name: 'Nonqualified Deferred Compensation for Owners',
  category: 'Payroll & Family',
  applyOrder: 39,
  modeled: false,
  character: 'deferral', // ET2

  advisor: {
    summary:
      'A nonqualified deferred compensation (NQDC) plan lets an executive or ' +
      'owner elect, before services are performed, to receive compensation ' +
      'in a later year — deferring the income tax to years with lower ' +
      'expected rates (retirement, post-sale) with no qualified-plan dollar ' +
      'limits. The discipline comes from §409A: deferral elections generally ' +
      'must be made before the year the compensation is earned, distribution ' +
      'timing must be fixed up front to permissible events, and violations ' +
      'trigger immediate inclusion, a 20% additional tax, and premium ' +
      'interest. The structural catch for owners: the employer\'s deduction ' +
      'is deferred until the employee\'s inclusion (§404(a)(5)), so in a ' +
      'pass-through the owner is usually just deferring their own deduction ' +
      '— NQDC economics genuinely work for owners of C corporations (rate ' +
      'arbitrage between 21% corporate deferral cost and personal rates) or ' +
      'sellers deferring comp from an unrelated buyer. Purely advisory: the ' +
      'value depends on future rate assumptions the tool does not project.',
    mechanics: [
      'Election timing (§409A(a)(4)): the deferral election must generally ' +
      'be irrevocable before the start of the year the services are ' +
      'performed; performance-based comp gets a limited 6-months-before- ' +
      'period-end exception.',
      'Distributions (§409A(a)(2)) only on six permissible events: ' +
      'separation from service (6-month delay for specified employees of ' +
      'public companies), death, disability, a fixed date/schedule, change ' +
      'in control, or unforeseeable emergency. No haircut withdrawals, no ' +
      'acceleration.',
      'Failure cost: immediate inclusion of all vested deferrals, plus 20% ' +
      'additional tax, plus underpayment-rate-plus-1% premium interest ' +
      '(§409A(a)(1)(B)) — the practitioner\'s reason to document mercilessly.',
      'The plan must stay UNFUNDED and unsecured to avoid current taxation: ' +
      'constructive receipt (Reg. §1.451-2) and economic benefit doctrines ' +
      'apply; a rabbi trust works only because its assets remain reachable ' +
      'by the employer\'s general creditors.',
      'Employer side: no deduction until the employee includes the amount ' +
      '(§404(a)(5)). FICA runs on the SPECIAL TIMING rule instead — taxed ' +
      'when vested (§3121(v)(2)), often cheap if the executive is already ' +
      'over the wage base, and the later payout is then FICA-free.',
      'Owner math: in an S corp/partnership, the entity\'s deferred ' +
      'deduction is the owner\'s own deferred deduction — usually a wash or ' +
      'worse. The clean use cases are C-corp owners (corp deducts at 21% ' +
      'later; owner defers 37%-bracket income to lower-rate years) and ' +
      'owners negotiating deferred comp/consulting from an unrelated ' +
      'acquirer post-sale.'
    ],
    authority: [
      { type: 'IRC', cite: 'IRC §409A', note: 'Governs all NQDC: election timing, permissible distribution events, anti-acceleration; violations cause immediate inclusion + 20% additional tax + premium interest.' },
      { type: 'Reg', cite: 'Reg. §1.409A-1 through -6', note: 'The operating manual — definitions of deferral, separation from service, specified employees, plan aggregation, and correction concepts.' },
      { type: 'IRC', cite: 'IRC §404(a)(5)', note: 'Employer deduction deferred to the year the employee includes the compensation — the reason pass-through owner NQDC is usually self-defeating.' },
      { type: 'Reg', cite: 'Reg. §1.451-2', note: 'Constructive receipt — income credited, set apart, or made available without substantial limitation is taxed now; the doctrine every NQDC design must clear.' },
      { type: 'IRC', cite: 'IRC §3121(v)(2)', note: 'FICA special timing rule: deferred comp is FICA-taxed at vesting rather than payment — frequently advantageous above the wage base.' }
    ],
    requirements: [
      'A written plan document satisfying §409A in form AND operation before any deferral election.',
      'Elections executed before the service year (calendar reminders are part of the engagement).',
      'The right taxpayer profile: C-corp owner/executive, or an owner receiving deferred amounts from an unrelated payor — not a routine S-corp owner deferring against their own K-1.',
      'Employer solvency confidence: deferred amounts are an unsecured claim; a rabbi trust mitigates change-of-heart risk, never creditor risk.'
    ],
    risks: [
      '§409A failures are ruinous relative to the benefit — immediate inclusion, 20% additional tax, premium interest — and operational footfaults (paying 30 days early, a discretionary acceleration) count.',
      'Credit risk is real: NQDC participants are general unsecured creditors; employer bankruptcy can wipe out decades of deferrals.',
      'Rate-assumption risk: deferring at today\'s rates to unknown future rates is a bet; legislation or a big payout year can invert it.',
      'For pass-through owners, §404(a)(5) makes the entity-side deduction wait for the inclusion — run the combined owner+entity math before assuming any benefit.',
      'State sourcing: deferred comp paid over fewer than 10 years can remain taxable by the state where it was earned even after the owner moves (4 U.S.C. §114 protects only certain periodic payments).'
    ],
    bestFit: [
      'C-corporation owner-executives in peak-rate years expecting materially lower personal rates at payout.',
      'Owners selling to an unrelated buyer who can structure post-sale deferred comp or consulting payments.',
      'Key-employee retention plans where the family business wants golden handcuffs (deduction timing is a cost, not a bar).'
    ],
    implementation: [
      'Screen the fact pattern first: entity type, expected rate path at payout, employer credit quality — decline the strategy for typical pass-through owner deferrals.',
      'Engage ERISA/exec-comp counsel to draft the §409A-compliant plan (top-hat filing with the DOL where applicable).',
      'Execute deferral elections before December 31 for next year\'s compensation; fix the distribution schedule in the election.',
      'Consider a rabbi trust for benefit security short of funding.',
      'Apply the §3121(v)(2) FICA special timing rule at vesting; track deferrals in payroll (W-2 Box 11 reporting at distribution).',
      'Audit operations annually — payments made exactly per schedule, no accelerations — and calendar the specified-employee 6-month delay if the company ever becomes public.'
    ]
  },

  client: {
    teaser: 'Lets you decide which year — and which tax rate — your biggest paydays land in',
    headline: 'Earn it now, get taxed later — on your schedule',
    plainEnglish: [
      'Normally you pay tax on compensation the year you earn it — even if that year happens to be your highest-tax year ever. A deferred compensation plan is a formal agreement, set up in advance, that part of your pay will be delivered in a later year instead: after retirement, after a business sale, or on a schedule you choose up front. You pay tax when the money arrives — ideally in years when your rate is much lower.',
      'The rules are strict and unforgiving: the decision to defer has to be made before you earn the money, the payout schedule has to be locked in from the start, and breaking the rules triggers steep penalties. This is a "set it up right or not at all" strategy, which is why it comes with real legal paperwork.',
      'One honest caveat: for most owners of S corporations and partnerships, deferring your own pay also defers your own deduction — the math usually cancels out. Where this shines is for owners of C corporations and for owners selling their business, where the deferral genuinely moves income from a 37% year into much cheaper ones.'
    ],
    analogy: 'It\'s like a dam on a river of income: instead of the whole flow hitting in flood years, you release it steadily into the years where it does the least damage.',
    benefits: [
      'Moves income from peak-rate years into low-rate years',
      'No dollar caps like a 401(k) — meaningful amounts can be deferred',
      'Can be designed around retirement or the sale of your business',
      'Also works to retain key employees with future payouts'
    ],
    steps: [
      'We screen whether your entity type and plans actually benefit — and say so if not',
      'A specialist attorney drafts the plan documents',
      'You elect deferrals before each year begins; the payout schedule is fixed up front',
      'We monitor the plan each year so the strict rules stay satisfied'
    ],
    considerations: [
      'Deferred money is an IOU from the company — if the company ever failed, deferred amounts are at risk. We weigh that squarely.',
      'The rules are rigid: elections and payout dates cannot be changed casually, and mistakes carry heavy penalties — this strategy is only for situations that clearly justify the formality.'
    ]
  },

  inputs: [],

  appliesTo: function (profile) {
    return true;
  },

  apply: function (profile, params, yearIndex, state) {
    return { profile: profile, notes: yearIndex === 0
      ? ['Advisory strategy — appears in the plan documents but does not change the scenario math. Deferral value depends on future-year rate assumptions; model a specific deferral by shifting income between scenario years.']
      : [] };
  }
});
