/* ============================================================================
 * STRATEGY: Payroll & Bonus Timing
 * One source object → advisor view, client PDF, client slideshow.
 * ==========================================================================*/
window.TSIQ = window.TSIQ || {};
TSIQ.strategyModules = TSIQ.strategyModules || [];

TSIQ.strategyModules.push({
  id: 'payroll-timing',
  name: 'Payroll & Bonus Timing',
  category: 'Payroll & Family',
  applyOrder: 38,
  modeled: false,
  character: 'timing', // ET2

  advisor: {
    summary:
      'Compensation timing lets an accrual-basis business take this year\'s ' +
      'deduction for bonuses paid early next year — and lets the household ' +
      'place the income in whichever year carries the lower marginal rate. ' +
      'The accrual rules give a 2.5-month window: a bonus fixed and ' +
      'determinable at year-end and paid within 2.5 months after year-end is ' +
      'deductible in the accrual year rather than treated as deferred ' +
      'compensation (Reg. §1.404(b)-1T). The hard stop is §267(a)(2): for ' +
      'amounts owed to a RELATED payee — including any S corporation ' +
      'shareholder, at any ownership level, via §267(e) — the deduction is ' +
      'forced onto the cash method, deferred until the year the payee ' +
      'includes the income. Owner bonuses therefore cannot be accrued and ' +
      'deducted ahead of payment; the timing lever for owners is actual ' +
      'payment date, bracket management, and coordinating comp with the ' +
      'household\'s year-by-year rate picture. Advisory: the value depends ' +
      'on rate differentials between years the tool projects at flat law.',
    mechanics: [
      'Accrual-basis rule for NON-owner employees: a bonus is deductible in ' +
      'year 1 if all events fixing the liability have occurred by year-end ' +
      '(amount determinable, obligation fixed — beware plans where bonuses ' +
      'are forfeited on pre-payment termination and revert to the employer) ' +
      'and payment occurs within 2.5 months after year-end. Beyond 2.5 ' +
      'months it is deferred compensation, deductible only when paid ' +
      '(Reg. §1.404(b)-1T; §404(a)(5)).',
      'Related-party override: §267(a)(2) defers the employer\'s deduction ' +
      'on any accrual to a related person until that person includes it in ' +
      'income. §267(e) makes EVERY shareholder of an S corporation related ' +
      'for this purpose — even 1% owners — and family attribution sweeps in ' +
      'spouses and children on payroll.',
      'Practical owner rule: an owner/family bonus is deductible when PAID ' +
      'and included on the W-2 — a December accrual paid in January belongs ' +
      'to next year. December vs. January payment is the actual lever.',
      'Bracket management: pull income into the current year when it is a ' +
      'low year (fill the 22/24% brackets before they are wasted) or push ' +
      'into next year when the current year is a spike — coordinate with ' +
      'QBI thresholds ($403,500 MFJ taxable income for 2026), the SS wage ' +
      'base ($184,500 for 2026), and the 0.9% additional Medicare threshold.',
      'S-corp owners: the bonus level also feeds the reasonable-compensation ' +
      'picture and the §199A W-2 wage limit — a December bonus can serve ' +
      'both bracket and QBI-wage-limit goals in the same stroke.',
      'Payroll mechanics matter: the bonus must actually run through payroll ' +
      'with deposits by the applicable schedule; a journal entry is not ' +
      'payment.'
    ],
    authority: [
      { type: 'Reg', cite: 'Reg. §1.404(b)-1T', note: 'The 2.5-month rule: compensation paid within 2.5 months after year-end is presumed NOT deferred compensation; later payment falls into §404(a)(5) paid-year deduction.' },
      { type: 'IRC', cite: 'IRC §267(a)(2)', note: 'Accrual deduction to a related payee deferred until the payee\'s inclusion — the matching rule that blocks accrued owner bonuses.' },
      { type: 'IRC', cite: 'IRC §267(e)', note: 'For pass-through entities, ANY shareholder/owner is a related person for §267(a)(2) — no 50% threshold protects a minority S-corp owner.' },
      { type: 'IRC', cite: 'IRC §404(a)(5)', note: 'Deferred compensation deductible only in the year the recipient includes it.' },
      { type: 'Reg', cite: 'Reg. §1.461-1(a)(2)', note: 'All-events test for accrual deductions: liability fixed, amount determinable, economic performance.' }
    ],
    requirements: [
      'Knowledge of the business\'s accounting method — the 2.5-month window is an accrual-method benefit only; cash-method businesses deduct when paid, full stop.',
      'A bonus obligation genuinely fixed by year-end for non-owner accruals (board resolution/bonus plan; watch forfeiture-with-reversion terms).',
      'A current-year and next-year household rate projection to decide which side of December 31 the owner\'s bonus belongs on.',
      'Payroll capacity to run an actual year-end bonus cycle with timely deposits.'
    ],
    risks: [
      'Accruing and deducting an owner bonus paid in January is a straightforward exam adjustment under §267(a)(2) — common in S corps that treat owners like other employees.',
      'Bonus pools where a departing employee\'s share reverts to the employer can fail the all-events test at year-end, deferring even non-owner accruals.',
      'Timing plays assume next year\'s rates: legislation, income surprises, or a filing-status change can invert the arbitrage.',
      'Shifting owner comp across years interacts with reasonable compensation, the SS wage base restart, and QBI wage limits — optimize the system, not one variable.'
    ],
    bestFit: [
      'Accrual-basis businesses with a non-owner bonus pool — the 2.5-month rule is nearly free money for them.',
      'Owners with lumpy income: a sale year, a down year, or an approaching bracket/threshold cliff.',
      'S corps coordinating year-end owner comp with §199A wage-limit needs.'
    ],
    implementation: [
      'Confirm the accounting method and identify owner vs. non-owner bonus recipients (apply §267(e) broadly for S corps — every owner counts).',
      'For non-owner bonuses: fix the liability by year-end via board resolution or written plan; calendar payment inside the 2.5-month window.',
      'For owner bonuses: project both years\' marginal pictures in this tool; run the bonus through December payroll if pulling income in, or first-quarter payroll if pushing out.',
      'Document the resolution and payroll records; deposit employment taxes on schedule.',
      'Re-run the projection every November — the right answer changes year to year.'
    ]
  },

  client: {
    teaser: 'The same paycheck can cost very different tax depending on one date — we pick the right one',
    headline: 'Time your bonuses so the tax lands in the cheapest year',
    plainEnglish: [
      'The tax you pay on a bonus depends not just on the amount, but on WHEN it is paid. A bonus paid December 31 lands in this year\'s taxes; the same bonus paid January 2 lands in next year\'s. If one of those years puts you in a lower bracket — because income dipped, spiked, or is about to — choosing the right side of New Year\'s can save real money on the exact same paycheck.',
      'For bonuses to your employees, the rules are even friendlier: a business on the accrual method of accounting can often deduct this year a bonus it does not actually pay until early next year, as long as the commitment was locked in by December 31 and payment happens within two and a half months.',
      'For bonuses to you as the owner, a special rule closes that shortcut — the business only gets the deduction when you are actually paid. So for owners, the strategy is simpler but still powerful: each fall, we look at this year and next year side by side and pay the bonus into whichever year taxes it less.'
    ],
    analogy: 'It\'s like choosing which lane to merge into before a toll plaza — same car, same road, but one booth charges less. The trick is you have to pick your lane before December 31.',
    benefits: [
      'The same compensation, taxed in the cheaper year',
      'Employee bonuses can be deducted before they are even paid (accrual businesses)',
      'Pairs with other year-end moves for a coordinated plan',
      'Costs nothing — it is scheduling, not spending'
    ],
    steps: [
      'Each fall we project your taxes for this year and next, side by side',
      'We recommend December or January for each planned bonus',
      'Employee bonus commitments get documented before year-end',
      'Payroll runs on the dates we set — that\'s it'
    ],
    considerations: [
      'The plan is only as good as the projection — a surprise late-year income swing can change the right answer, so we revisit before the final payroll.',
      'Owner bonuses follow stricter rules than employee bonuses; the deduction always matches the year you are actually paid.'
    ]
  },

  inputs: [],

  appliesTo: function (profile) {
    return true;
  },

  apply: function (profile, params, yearIndex, state) {
    return { profile: profile, notes: yearIndex === 0
      ? ['Advisory strategy — appears in the plan documents but does not change the scenario math. Timing value depends on year-over-year rate differences; model specific shifts by adjusting income inputs across scenarios.']
      : [] };
  }
});
