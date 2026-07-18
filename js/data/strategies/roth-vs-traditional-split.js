/* ============================================================================
 * STRATEGY: Roth vs. Traditional 401(k) Split
 * Advisory-only: the right split is a bracket-arbitrage judgment across
 * decades — quantifying it from one year's return would be false precision.
 * ==========================================================================*/
window.TSIQ = window.TSIQ || {};
TSIQ.strategyModules = TSIQ.strategyModules || [];

TSIQ.strategyModules.push({
  id: 'roth-vs-traditional-split',
  name: 'Roth vs. Traditional 401(k) Split',
  category: 'Retirement',
  applyOrder: 66,
  modeled: false,
  character: 'timing', // ET2

  advisor: {
    summary:
      'Every deferral dollar (up to $24,500 for 2026) can be designated ' +
      'traditional (deduct now, taxed later) or Roth (taxed now, never again) — ' +
      'and the split is an annual election, not a one-time identity. The core ' +
      'analysis is marginal rate now vs. expected effective rate in withdrawal ' +
      'years. OBBBA\'s permanence of the TCJA rate structure removed the ' +
      '"rates snap back in 2026" argument that had favored Roth by default; the ' +
      'calculus is now client-specific: current bracket, retirement income ' +
      'floor (RMDs, Social Security), state-of-residence arbitrage, and estate ' +
      'intentions. One piece is no longer elective: under SECURE 2.0 §603, a ' +
      'participant whose prior-year FICA wages exceeded $150,000 (2026 ' +
      'threshold) must make catch-up contributions as Roth.',
    mechanics: [
      'Same $24,500 limit either way (§402(g)) — but Roth dollars are worth ' +
      'more at equal balances, since the tax is already paid; a maxed Roth ' +
      'account effectively shelters more real wealth.',
      'Traditional wins when the contribution-year marginal rate clearly ' +
      'exceeds the expected withdrawal-year rate — the classic case: peak-' +
      'earnings 35–37% bracket now, moderate retirement income later.',
      'Roth wins in temporarily low-income years (startup year, loss year, ' +
      'sabbatical, early retirement pre-RMD), for young high-trajectory savers, ' +
      'and where large pre-tax balances already guarantee heavy RMDs at 73+.',
      'OBBBA (P.L. 119-21) made the TCJA individual rate structure permanent — ' +
      'no scheduled rate sunset. Rate risk is now legislative, not calendared, ' +
      'which weakens the reflexive "rates are going up" Roth pitch and makes ' +
      'the client\'s own income trajectory the dominant variable.',
      'Mandatory Roth catch-up (SECURE 2.0 §603): prior-year FICA wages over ' +
      '$150,000 (2026, indexed) force the $8,000/$11,250 catch-up into Roth — ' +
      'affected clients lose that deduction whether they like it or not; plan ' +
      'documents must support Roth or catch-up is unavailable entirely.',
      'Roth 401(k) accounts no longer have lifetime RMDs (SECURE 2.0 aligned ' +
      'them with Roth IRAs beginning 2024) — strengthening Roth as an estate ' +
      'and longevity asset; heirs still take under the 10-year rule but ' +
      'distributions are tax-free.'
    ],
    authority: [
      { type: 'IRC', cite: 'IRC §402A', note: 'Designated Roth contributions: taxed currently, qualified distributions excluded.' },
      { type: 'IRC', cite: 'IRC §402(g)', note: 'One combined deferral limit — $24,500 (2026) — across traditional and Roth designations.' },
      { type: 'Admin', cite: 'SECURE 2.0 Act §603 (P.L. 117-328)', note: 'Catch-up contributions must be Roth for participants with prior-year FICA wages above the indexed threshold ($150,000 for 2026).' },
      { type: 'Admin', cite: 'Notice 2025-67', note: '2026 figures: $24,500 deferral, $8,000 catch-up, $11,250 enhanced catch-up (60–63), $150,000 Roth catch-up wage threshold.' },
      { type: 'Admin', cite: 'OBBBA (P.L. 119-21)', note: 'Made the TCJA individual rate structure permanent — eliminated the scheduled 2026 rate increase that previously tilted the analysis toward Roth.' }
    ],
    requirements: [
      'A plan document offering a designated Roth option (and Roth catch-up — mandatory to offer if any high-wage participant must use it).',
      'A realistic projection of retirement income: expected RMDs on existing pre-tax balances, Social Security, pensions, and planned retirement state.',
      'Payroll capability to split a single deferral election between the two buckets.'
    ],
    risks: [
      'All-or-nothing thinking: the optimum is usually a split, revisited annually — locking either identity in for decades forfeits option value.',
      'Roth contributions in a 37%-bracket year with modest expected retirement income is simply overpaying — the arithmetic has to win, not the ideology.',
      'Ignoring §603: a high-wage 50+ client whose plan lacks a Roth feature cannot make catch-up contributions at all — a five-figure annual miss.',
      'State arbitrage cuts both ways: deducting at 0% state (TX/FL) now and withdrawing in a high-tax state later argues Roth; the reverse argues traditional.'
    ],
    bestFit: [
      'High earners 50+ who must digest the mandatory Roth catch-up and want the rest of the split optimized around it.',
      'Clients with large existing pre-tax balances heading toward heavy RMDs.',
      'Owners with volatile income — the split can be re-aimed every year (Roth-heavy in loss years, traditional-heavy in spike years).'
    ],
    implementation: [
      'Confirm the plan offers designated Roth and Roth catch-up; amend if not.',
      'Project the retirement-year effective rate (RMDs on current balances grown forward + Social Security + pensions) and compare with today\'s marginal rate.',
      'Set this year\'s split; flag any client with prior-year FICA wages near $150,000 for mandatory Roth catch-up treatment.',
      'Coordinate with conversion strategies — a low-income year is often better used for an in-plan Roth conversion than merely flipping the election.',
      'Re-run the split decision each fall with the tax projection.'
    ]
  },

  client: {
    teaser: 'Choosing the year you pay tax on your savings — and picking the cheapest one',
    headline: 'Pay tax on your retirement money in the cheapest year possible',
    plainEnglish: [
      'Your retirement contributions come with a choice the paperwork makes look boring but that is worth real money: pay tax on this money now, or pay tax on it later. The "traditional" option gives you a deduction today, and the IRS taxes every dollar when you retire. The "Roth" option skips today\'s deduction, and in exchange the money — and all its growth — is never taxed again.',
      'Neither is always right. The answer depends on comparing your tax rate today with your likely rate in retirement — and that changes with your income, your other savings, even which state you plan to retire in. In a big-income year, the deduction is king. In a lighter year, paying a low rate now to lock in tax-free growth forever is the bargain.',
      'The good news: you do not have to pick a side for life. We can split your contributions between the two buckets and adjust the mix every year as your situation moves. One heads-up for higher earners over 50: a recent law change requires part of your contribution to go in the Roth bucket whether you choose it or not — we plan around that.'
    ],
    analogy: 'It\'s like choosing when to fill up the tank on a road trip — you buy the most gas in the towns where it\'s cheapest. Here, we buy your retirement tax bill in your cheapest-rate years.',
    benefits: [
      'Every dollar gets taxed at the lowest rate available across your lifetime',
      'A tax-free bucket in retirement lets us control your bracket later',
      'The mix adjusts every year as your income changes',
      'Tax-free money passes to your heirs without an income tax bill'
    ],
    steps: [
      'We compare your tax rate today with your projected rate in retirement',
      'We set the right split between the two buckets for this year',
      'We make sure your plan is set up correctly, including new rules for higher earners over 50',
      'We revisit the mix every year with your tax projection'
    ],
    considerations: [
      'Choosing Roth means giving up a deduction now — it only pays if today\'s rate is genuinely lower than your future rate, which is a projection, not a certainty.',
      'For higher earners over 50, part of the choice is now made by law — the extra "catch-up" savings must go in the pay-tax-now bucket.'
    ]
  },

  inputs: [],

  appliesTo: function (profile) {
    return true;
  },

  apply: function (profile, params, yearIndex, state) {
    return { profile: profile, notes: yearIndex === 0
      ? ['Advisory strategy — appears in the plan documents but does not change the scenario math. The Roth/traditional split shifts WHEN tax is paid; model specific deferral amounts under the Solo 401(k) or plan strategies.']
      : [] };
  }
});
