/* ============================================================================
 * STRATEGY: HSA Contributions
 * One source object → advisor view, client PDF, client slideshow.
 * ==========================================================================*/
window.TSIQ = window.TSIQ || {};
TSIQ.strategyModules = TSIQ.strategyModules || [];

TSIQ.strategyModules.push({
  id: 'hsa-contributions',
  name: 'HSA Contributions',
  category: 'Health & Fringe',
  applyOrder: 71,
  modeled: true,
  character: 'permanent', // ET2

  advisor: {
    summary:
      'Health Savings Accounts under §223 are the only triple-tax-advantaged ' +
      'vehicle in the Code: contributions are deductible above the line (or ' +
      'pre-FICA through a cafeteria plan), growth is tax-free, and qualified ' +
      'medical distributions are tax-free. 2026 limits (Rev. Proc. 2025-19): ' +
      '$4,400 self-only / $8,750 family, plus a $1,000 catch-up for each spouse ' +
      'age 55+. Eligibility requires HDHP coverage and no disqualifying ' +
      'coverage. OBBBA expanded HDHP eligibility beginning in 2026 — bronze and ' +
      'catastrophic exchange plans are treated as HDHPs, and direct primary ' +
      'care arrangements within monthly fee limits no longer disqualify the ' +
      'account holder. After 65, the account doubles as a supplemental ' +
      'retirement account (non-medical withdrawals taxed like an IRA, no penalty).',
    mechanics: [
      'Deduction is above the line under §223 (Form 8889) — reduces AGI ' +
      'regardless of itemizing. Contributions routed through an employer ' +
      '§125 cafeteria plan additionally escape FICA.',
      'Eligibility (§223(c)): covered by an HDHP on the first of the month, no ' +
      'other non-HDHP coverage, not enrolled in Medicare, not claimable as a ' +
      'dependent. General-purpose health FSA coverage (including a spouse\'s) ' +
      'is disqualifying.',
      'The $1,000 age-55 catch-up is per individual — a 55+ spouse needs their ' +
      'OWN HSA to make a catch-up contribution; it cannot go into the other ' +
      'spouse\'s account.',
      'Last-month rule (§223(b)(8)): eligible on December 1 = treated as ' +
      'eligible all year for the full limit, subject to a 13-month testing ' +
      'period with income inclusion plus 10% recapture if failed.',
      'No use-it-or-lose-it: funds roll over indefinitely and are investable. ' +
      'The max-value play is paying current medical costs out of pocket, ' +
      'keeping receipts, and letting the HSA compound — reimbursement has no ' +
      'deadline.',
      'Contribution deadline is the unextended filing deadline (April 15) for ' +
      'the prior year.'
    ],
    authority: [
      { type: 'IRC', cite: 'IRC §223', note: 'HSA deduction, eligibility, contribution limits, distribution rules.' },
      { type: 'Admin', cite: 'Rev. Proc. 2025-19', note: '2026 inflation-adjusted limits: $4,400 self-only / $8,750 family; HDHP minimum deductibles and out-of-pocket maximums.' },
      { type: 'IRC', cite: 'IRC §106(d)', note: 'Employer HSA contributions excluded from income (and from FICA wages).' },
      { type: 'IRC', cite: 'IRC §223(b)(3)', note: '$1,000 additional contribution for individuals age 55+ (not indexed).' },
      { type: 'Admin', cite: 'Notice 2004-2; Notice 2004-50', note: 'Foundational IRS Q&A guidance on HSA eligibility and administration.' },
      { type: 'IRC', cite: 'IRC §223(f)(4)', note: '20% additional tax on non-qualified distributions — waived after age 65, death, or disability.' },
      { type: 'IRC', cite: 'OBBBA (P.L. 119-21) HSA provisions', note: 'Effective 2026: bronze/catastrophic exchange plans treated as HDHPs; direct primary care arrangements within monthly fee limits do not destroy eligibility.' }
    ],
    requirements: [
      'HDHP coverage meeting the §223(c)(2) deductible/out-of-pocket parameters for each month claimed (or the last-month rule).',
      'No disqualifying coverage — including a spouse\'s general-purpose health FSA and Medicare enrollment (watch the 6-month retroactive Part A enrollment at 65+).',
      'An established HSA with a qualified trustee/custodian before expenses are incurred (expenses before establishment are never qualified).',
      'Form 8889 filed with the return; contributions by April 15.'
    ],
    risks: [
      'Excess contributions draw a 6% excise tax (§4973) per year until withdrawn or absorbed.',
      'Failing the last-month-rule testing period triggers income inclusion plus 10%.',
      'Medicare enrollment (including retroactive Part A) mid-year prorates the limit — a common trap for clients working past 65.',
      'Non-qualified distributions before 65: ordinary income plus 20% additional tax.',
      'Recordkeeping: tax-free reimbursement years later requires retained receipts substantiating unreimbursed qualified expenses.'
    ],
    bestFit: [
      'Clients already on (or able to switch to) HDHP coverage, especially healthy families who can cash-flow medical costs and invest the HSA.',
      'High-bracket clients wanting another above-the-line deduction after retirement accounts are maxed.',
      'Ages 55–64: catch-up window plus the approaching age-65 penalty-free access.',
      'Business owners who can route contributions through a cafeteria plan for the added FICA savings.'
    ],
    implementation: [
      'Confirm HDHP status of the current policy against the 2026 §223(c)(2) parameters (Rev. Proc. 2025-19); if shopping the exchange, note bronze/catastrophic plans now qualify.',
      'Open the HSA with a low-cost custodian that offers investment options; open a second HSA for a 55+ spouse\'s catch-up.',
      'Fund to the applicable limit — through payroll/cafeteria plan where available for the FICA savings.',
      'Advise paying routine medical costs out of pocket and archiving receipts to preserve tax-free compounding.',
      'File Form 8889; calendar the April 15 funding deadline and any last-month-rule testing period.'
    ]
  },

  client: {
    teaser: 'The only account where money is never taxed — going in, growing, or coming out',
    headline: 'The triple-tax-free account most people underuse',
    plainEnglish: [
      'A Health Savings Account is the single most tax-favored account that exists. You get a deduction when you put money in, the money grows tax-free, and when you spend it on medical costs, it comes out tax-free too. No other account — not a 401(k), not an IRA — does all three.',
      'To use one, your health insurance needs to be a qualifying high-deductible plan. For 2026, a family can put in $8,750, and if you are 55 or older you can add another $1,000. The money never expires: whatever you do not spend keeps rolling over and can be invested like a retirement account.',
      'There is a smart move here most people miss: if you can afford to pay medical bills out of pocket today, do that, save the receipts, and let the account grow untouched. You can reimburse yourself from it years from now — tax-free — after the money has compounded. And after age 65 it works like an extra IRA for any purpose.'
    ],
    analogy: 'Think of it as a health-care 401(k) with a bonus: you get the deduction like a 401(k), but the withdrawals are tax-free like a Roth — the only account that gives you both ends.',
    benefits: [
      'An $8,750 family deduction for 2026 (plus $1,000 each if 55 or older)',
      'Tax-free growth and tax-free withdrawals for medical costs',
      'Money never expires — it rolls over and can be invested',
      'After 65, works like an extra retirement account'
    ],
    steps: [
      'We confirm your health plan qualifies (or help you compare one that does)',
      'We help you open the account and set the right contribution amount',
      'We show you the receipt-saving strategy so the account can grow',
      'We handle the tax form each year'
    ],
    considerations: [
      'This only works with a qualifying high-deductible health plan — we check yours before assuming anything.',
      'Once you enroll in Medicare, new contributions must stop, so we plan the timing around age 65.',
      'Spending the money on non-medical items before 65 triggers tax and a penalty — this is a health and retirement account, not a checking account.'
    ]
  },

  inputs: [
    { key: 'coverage', label: 'HDHP coverage type', type: 'select', default: 'family',
      options: [{ value: 'self', label: 'Self-only' }, { value: 'family', label: 'Family' }] },
    { key: 'catchUp55', label: 'Age 55+ catch-up ($1,000)', type: 'select', default: 'no',
      options: [{ value: 'no', label: 'No' }, { value: 'yes', label: 'Yes' }] }
  ],

  suggest: function (p) {
    if (!(p.scheduleCNet > 0 || p.passthroughK1 > 0)) return null;
    return { reason: 'Business owner — if the family is on (or can move to) an HDHP, the HSA is triple-tax-advantaged. Confirm coverage type.' };
  },

  appliesTo: function (profile) {
    return true; // HDHP status is a facts question — flagged in notes
  },

  /**
   * Above-the-line §223 deduction — routed to `adjustments` (no SE/FICA
   * effect; payroll cafeteria-plan FICA savings are NOT modeled — conservative).
   * Limits come from TSIQ.TABLES_2026.limits.fringe (Rev. Proc. 2025-19).
   * Models one catch-up only; a 55+ spouse's separate $1,000 is not modeled.
   */
  apply: function (profile, params, yearIndex, state) {
    var p = Object.assign({}, profile);
    var notes = [];
    var fr = TSIQ.TABLES_2026.limits.fringe;
    var limit = params.coverage === 'self' ? fr.hsaSelf : fr.hsaFamily;
    if (params.catchUp55 === 'yes') {
      limit = limit + fr.hsaCatchUp55;
    }
    p.adjustments = (p.adjustments || 0) + limit;
    if (yearIndex === 0) {
      notes.push('HSA contribution of ' + TSIQ.fmt.usd(limit) +
        ' deducted above the line (§223). Requires qualifying HDHP coverage; ' +
        'confirm no disqualifying coverage (general-purpose FSA, Medicare).');
      notes.push('FICA savings from payroll (cafeteria-plan) funding are not modeled — actual benefit may be modestly higher.');
    }
    return { profile: p, notes: notes };
  }
});
