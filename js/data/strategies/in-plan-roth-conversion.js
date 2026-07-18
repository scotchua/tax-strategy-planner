/* ============================================================================
 * STRATEGY: In-Plan Roth Conversions
 * Advisory-only: conversions ADD income at a client-chosen time and amount —
 * the right number falls out of a bracket-fill analysis, not a formula. It is
 * the timing complement to the deduction strategies, not a deduction itself.
 * ==========================================================================*/
window.TSIQ = window.TSIQ || {};
TSIQ.strategyModules = TSIQ.strategyModules || [];

TSIQ.strategyModules.push({
  id: 'in-plan-roth-conversion',
  name: 'In-Plan Roth Conversions',
  category: 'Retirement',
  // Runs after every deduction strategy (DB/cash-balance funding, cost seg,
  // PTET at 88, etc.) so the conversion stacks on the FINAL bracket picture
  // those deductions create — the whole point of bracket-fill timing.
  applyOrder: 90,
  modeled: true,

  advisor: {
    summary:
      'Under §402A(c)(4), a participant may convert vested pre-tax 401(k) ' +
      'balances to a designated Roth account inside the plan — including ' +
      'amounts not otherwise distributable (ATRA 2012 expansion). The converted ' +
      'amount is ordinary income in the conversion year at rates that are, ' +
      'post-OBBBA, permanent and known; everything after that grows tax-free ' +
      'with no lifetime RMDs. The strategy is deliberate bracket-filling: ' +
      'convert exactly enough to fill low brackets in the years income dips, or ' +
      'to absorb large deductions that would otherwise be wasted — a DB plan ' +
      'funding year, a cost segregation year, an NOL year. Unlike pre-2018 IRA ' +
      'conversions, it is IRREVOCABLE: there is no recharacterization, so the ' +
      'amount must be right when executed, typically in Q4 against a near-final ' +
      'projection.',
    mechanics: [
      'Mechanics: direct in-plan rollover of vested pre-tax (or employer) ' +
      'amounts to the plan\'s designated Roth account; the plan must offer ' +
      'designated Roth accounts and permit in-plan conversions (Notice 2010-84; ' +
      'Notice 2013-74 for nondistributable amounts).',
      'Tax: converted amount is ordinary income in the year of conversion; no ' +
      '10% early-distribution penalty at conversion, but amounts distributed ' +
      'within 5 years of conversion can trigger penalty recapture.',
      'No income limits, no dollar caps — the ceiling is the client\'s bracket ' +
      'tolerance, not a statute.',
      'The classic pairings this tool models elsewhere: convert in the year a ' +
      'defined benefit contribution or cost segregation loss crushes taxable ' +
      'income — the deduction absorbs the conversion income, moving pre-tax ' +
      'money to Roth at 10–22% instead of 32–37%.',
      'Watch the cascade: conversion income raises AGI, which can phase down ' +
      'the OBBBA SALT cap (over $505,000 MAGI), squeeze QBI thresholds, and ' +
      'trigger IRMAA two years later for Medicare-age clients — fill brackets ' +
      'net of these cliffs, not gross.',
      'No recharacterization (TCJA repealed it): the election is irrevocable — ' +
      'convert against a solid year-end projection, and consider splitting ' +
      'across December/January to straddle uncertainty.'
    ],
    authority: [
      { type: 'IRC', cite: 'IRC §402A(c)(4)', note: 'In-plan Roth rollovers; subparagraph (E) extends them to otherwise nondistributable amounts (added by ATRA 2012 §902).' },
      { type: 'Admin', cite: 'Notice 2010-84', note: 'Q&A guidance on in-plan Roth rollovers: taxation, withholding, the 5-year recapture rule.' },
      { type: 'Admin', cite: 'Notice 2013-74', note: 'Guidance implementing the ATRA expansion to nondistributable amounts; plan amendment requirements.' },
      { type: 'IRC', cite: 'IRC §408A(d)(3)', note: 'Conversion-taxation framework (ordinary income inclusion) that §402A(c)(4) incorporates.' },
      { type: 'Admin', cite: 'OBBBA (P.L. 119-21)', note: 'Made the TCJA rate structure permanent — conversions now lock in a known, historically low rate rather than racing a sunset.' }
    ],
    requirements: [
      'A plan offering designated Roth accounts and an in-plan conversion feature (amend if absent — solo 401(k) documents vary widely here).',
      'Vested pre-tax balances worth converting, and cash OUTSIDE the plan to pay the tax — paying it from the converted dollars guts the math.',
      'A reliable year-end projection: the amount is irrevocable once executed.',
      'A low-bracket year or an offsetting-deduction year to convert into.'
    ],
    risks: [
      'Irrevocability: overshooting the bracket target cannot be undone — no recharacterization since TCJA.',
      'AGI cascade effects: SALT-cap phase-down, QBI phase-out, NIIT exposure on other income, and IRMAA surcharges can push the true marginal cost well above the nominal bracket.',
      'Paying conversion tax from plan assets (or with penalty-bearing early money) destroys the arbitrage — outside cash only.',
      'The 5-year recapture rule surprises clients under 59½ who tap converted amounts early.',
      'Converting in a normal-income year at 32–37% is usually just prepaying tax at top rates — the strategy is the TIMING, not the conversion itself.'
    ],
    bestFit: [
      'Clients executing a large-deduction strategy this year (DB plan funding, cost segregation, large charitable) with bracket room underneath.',
      'Owners in a genuine income valley — startup losses, sale gap year, semi-retirement before Social Security and RMDs.',
      'Clients with large pre-tax balances facing heavy RMDs at 73+ who want to pre-empt them at lower rates.'
    ],
    implementation: [
      'Confirm (or amend in) the plan\'s designated Roth and in-plan conversion features.',
      'Build the year-end projection including every planned deduction; identify the target bracket ceiling.',
      'Size the conversion to fill brackets net of AGI-driven cliffs (SALT phase-down, QBI, NIIT, IRMAA for 63+).',
      'Execute in Q4 against near-final numbers; ensure outside cash covers the tax (adjust Q4 estimates/withholding to avoid penalties).',
      'Reconcile the 1099-R; confirm the plan\'s Roth accounting starts the 5-year clocks.',
      'Repeat the analysis annually — systematic partial conversions across several low years beat one heroic conversion.'
    ]
  },

  client: {
    teaser: 'Locks today\'s low tax rate on retirement money before higher-rate years arrive',
    headline: 'Pay tax on your terms — convert retirement money in your cheapest years',
    plainEnglish: [
      'The money in your pre-tax retirement account has a tax bill attached — the IRS just hasn\'t collected it yet. When you retire, every withdrawal is taxed, and once required withdrawals begin in your seventies, the government decides how much comes out and gets taxed each year, not you.',
      'A conversion flips that. You choose an amount of pre-tax money, pay tax on it now, and move it to the tax-free side of your plan — where it grows forever untaxed, with no forced withdrawals. The power move is picking WHICH year to do it: a year when your income dips, or a year when a big deduction (like a large retirement plan contribution or a real estate deduction) has already pushed your tax rate way down. In those years, money that would eventually be taxed at high rates gets taxed at bargain rates instead.',
      'We size the amount precisely — enough to use up your low tax brackets, not a dollar more. One thing to know going in: once a conversion is done, it cannot be undone, which is why we run it against near-final numbers late in the year.'
    ],
    analogy: 'It\'s like a going-out-of-business sale on your future tax bill — the debt was always going to be paid, so we pay it in the year it\'s marked 60% off.',
    benefits: [
      'Future withdrawals from converted money are 100% tax-free',
      'No required withdrawals later — you keep control of the timing',
      'Pairs perfectly with big-deduction years to convert at bargain rates',
      'Shrinks the forced, fully-taxed withdrawals waiting in your seventies'
    ],
    steps: [
      'We spot the low-tax window — a dip year or a big-deduction year',
      'We calculate the exact amount that fills your cheap tax brackets and stops',
      'We execute late in the year, when the numbers are nearly final',
      'We repeat in each low-rate year until the pre-tax pile is right-sized'
    ],
    considerations: [
      'You pay real tax now, from money outside the retirement account — the win is paying at a low rate instead of a high one later, so the timing has to be right.',
      'A conversion is permanent once made — we size it carefully against near-final year-end numbers.'
    ]
  },

  inputs: [
    { key: 'conversionAmount', label: 'Amount converted', type: 'currency', default: 50000 },
    { key: 'conversionYear', label: 'Projection year to convert in (1 = this year)', type: 'number', default: 1, min: 1 }
  ],

  appliesTo: function (profile) {
    return true;
  },

  /**
   * Adds the converted amount as ordinary income (via profile.rothConversionIncome
   * — tax-engine.js includes it in totalIncome but EXCLUDES it from the NIIT
   * base per §1411(c)(5): a conversion raises MAGI but is not investment
   * income) in exactly the chosen projection year. conversionYear is
   * 1-based to match the year columns the advisor sees (year 1 == yearIndex
   * 0); a value beyond the projection horizon simply never matches and the
   * strategy quietly does nothing that run. Deliberately NOT `grows: true`
   * — a chosen one-time conversion amount must not compound with the
   * income growth rate.
   */
  apply: function (profile, params, yearIndex, state) {
    var p = Object.assign({}, profile);
    var notes = [];
    var targetYearIndex = Math.max(1, Math.round(params.conversionYear || 1)) - 1;
    if (yearIndex !== targetYearIndex) return { profile: p, notes: notes };

    var amt = Math.max(0, params.conversionAmount || 0);
    p.rothConversionIncome = (p.rothConversionIncome || 0) + amt;
    notes.push(TSIQ.fmt.usd(amt) + ' converted to Roth in projection year ' +
      (targetYearIndex + 1) + ' — ordinary income this year, excluded from NIIT ' +
      '(§1411(c)(5)), tax-free growth and no RMDs afterward. Irrevocable once ' +
      'executed (no recharacterization since TCJA) — size against a near-final ' +
      'year-end projection, ideally in a year another strategy already creates a ' +
      'large deduction.');
    notes.push('Watch the AGI cascade this conversion amount also drives elsewhere ' +
      'in the scenario: SALT-cap phase-down, QBI phase-in, and (for Medicare-age ' +
      'clients) IRMAA two years later — the right amount fills brackets net of ' +
      'those cliffs, not gross.');
    return { profile: p, notes: notes };
  }
});
