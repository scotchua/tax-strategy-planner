/* ============================================================================
 * STRATEGY: NOL Carryforward Planning (§172)
 * One source object → advisor view, client PDF, client slideshow.
 * ==========================================================================*/
window.TSIQ = window.TSIQ || {};
TSIQ.strategyModules = TSIQ.strategyModules || [];

TSIQ.strategyModules.push({
  id: 'nol-planning',
  name: 'NOL Carryforward Planning',
  category: 'Income Timing & Character',
  applyOrder: 4,
  modeled: true,
  character: 'permanent', // ET2

  advisor: {
    summary:
      'Post-2017 net operating losses carry forward indefinitely but cannot be ' +
      'carried back (limited farming exception), and the deduction is capped at ' +
      '80% of taxable income computed without the NOL (§172(a)(2)). Because the ' +
      'carryforward never expires, the planning question is WHEN to absorb it: ' +
      'an NOL burned against 22%-bracket income is worth far less than the same ' +
      'NOL against a 37% year, so income acceleration into an NOL-shielded year ' +
      '(Roth conversions, gain recognition, bonus timing) is often the play. ' +
      'Interaction traps: the NOL deduction does not reduce QBI (the §199A ' +
      'qualified business loss carryover is a separate, parallel mechanism), and ' +
      'the 80% cap means a large NOL year still leaves 20% of income exposed.',
    mechanics: [
      'Post-2017 NOLs: no carryback (except 2-year carryback for farming ' +
      'losses), indefinite carryforward, deduction limited to 80% of taxable ' +
      'income before the NOL (§172(a)(2)); pre-2018 NOLs remain 100%-usable ' +
      'and expire after 20 years — order and track the vintages separately.',
      'The NOL originates after the §461(l) excess business loss gate: the ' +
      'disallowed EBL becomes part of NEXT year\'s NOL, so a big loss year ' +
      'often produces both a current deduction (up to the threshold) and a ' +
      'carryforward.',
      'Rate arbitrage is the core play: hold discretionary income (Roth ' +
      'conversions, asset sales, dividends from a controlled C corp) for NOL ' +
      'years, or conversely avoid wasting NOL absorption on income that would ' +
      'have been taxed at low brackets anyway.',
      'QBI interplay: §172 and §199A run on separate tracks — the NOL ' +
      'deduction does not reduce current-year QBI, but a negative-QBI year ' +
      'creates its own qualified business loss carryforward (§199A(c)(2)) that ' +
      'reduces FUTURE QBI. A loss year quietly damages future QBI deductions ' +
      'even while the NOL shelters ordinary income.',
      'The 80% cap means NOLs cannot zero out a big year — plan estimated ' +
      'payments and AMT-adjacent items on the exposed 20%.'
    ],
    authority: [
      { type: 'IRC', cite: 'IRC §172(a)(2)', note: 'NOL deduction for post-2017 losses limited to 80% of taxable income computed without regard to the NOL deduction.' },
      { type: 'IRC', cite: 'IRC §172(b)(1)(A)', note: 'No carryback / indefinite carryforward for post-2017 NOLs (farming losses retain a 2-year carryback, §172(b)(1)(B)).' },
      { type: 'IRC', cite: 'IRC §461(l)(2)', note: 'Disallowed excess business loss is treated as an NOL carryover to the following year — the upstream gate that feeds §172.' },
      { type: 'IRC', cite: 'IRC §199A(c)(2)', note: 'Negative QBI carries forward as a separate qualified business loss — the NOL deduction itself does not reduce QBI.' },
      { type: 'Admin', cite: 'IRS Pub. 536', note: 'NOL computation for individuals — the nonbusiness/business income and deduction adjustments in computing the loss.' },
      { type: 'Admin', cite: 'Form 1045, Schedule A / return statement', note: 'NOL computation schedule; carryforward tracked by an attached statement each year.' }
    ],
    requirements: [
      'A computed and documented NOL carryforward — the loss-year return must correctly separate business from nonbusiness income and deductions (Pub. 536 worksheet).',
      'Vintage tracking: pre-2018 NOLs (100% usable, 20-year life) vs. post-2017 NOLs (80% cap, indefinite) applied in the correct order.',
      'A projection of future-year brackets so absorption is aimed at the highest-rate years.',
      'Coordination with §461(l) in the loss year and §199A carryovers in the following years.'
    ],
    risks: [
      'The 80% cap: taxable income cannot be fully zeroed by post-2017 NOLs — clients who spend the "no tax this year" assumption get a surprise on the residual 20%.',
      'Wasting NOL against low-bracket income — absorption at 12–22% when a 32–37% year was coming is a permanent value loss.',
      'Computation errors in the loss year (nonbusiness deduction adjustments) compound silently for years; the IRS can challenge the carryforward in any open year it is used.',
      'The parallel §199A qualified business loss carryover reduces future QBI deductions — the projected benefit of NOL years is often overstated when this is missed.',
      'State conformity varies widely (different caps, carryforward periods, and some states disallow NOLs entirely).'
    ],
    bestFit: [
      'Clients emerging from a loss year (startup ramp, bad year, large bonus depreciation) with a documented carryforward.',
      'Clients with discretionary income timing — Roth conversions, gain harvesting, controlled distributions — to aim at the shielded year.',
      'Multi-entity owners whose loss and income years can be sequenced.'
    ],
    implementation: [
      'Reconstruct and document the carryforward by vintage (pre-2018 vs. post-2017) with the Pub. 536 computation for each loss year.',
      'Project the next 3–5 years of brackets in this tool; pick the absorption year(s) with the highest marginal rates.',
      'Accelerate discretionary income into the shielded year (Roth conversion sized to the NOL after the 80% cap; harvest gains; time bonuses).',
      'Attach the NOL statement to each return; recompute the remaining carryforward annually.',
      'Track the separate §199A qualified business loss carryover and reflect it in QBI projections.'
    ]
  },

  client: {
    teaser: 'Uses a past bad year to erase tax on your best years ahead',
    headline: 'Turn a loss year into a tax shield',
    plainEnglish: [
      'If your business ever lost money on paper — from a slow year, a big equipment write-off, or startup costs — the tax law doesn\'t just forget it. That loss becomes a credit-like shield you carry forward, and it can cancel out income in future years.',
      'The catch is that the shield is worth different amounts depending on WHEN you use it. Used against a modest-income year, it erases tax at low rates. Used against a big year, the same shield erases tax at the highest rates — sometimes nearly double the savings from the identical loss.',
      'Our job is to aim it. We track exactly how much shield you have, project your income, and time things — like retirement account conversions or asset sales — so the shield lands on your most expensive income.'
    ],
    analogy: 'It\'s like a stack of gift cards that never expire: spending them on your most expensive purchase gets you the most value, so we save them for exactly that.',
    benefits: [
      'A past loss becomes real dollars saved on future returns',
      'The shield never expires under current law — no pressure to waste it',
      'Big planned income events (conversions, sales) can be sheltered deliberately',
      'We track the running balance so nothing is lost to a filing mistake'
    ],
    steps: [
      'We verify and document exactly how much loss carryforward you have',
      'We project your next several years and pick the smartest year to use it',
      'We time income events into the shielded year when it helps',
      'Each year we file the supporting schedule and update the remaining balance'
    ],
    considerations: [
      'The shield can cancel most, but not all, of a year\'s income — current law leaves about 20% of a big year still taxable, and we plan for that piece.',
      'Using it well means sometimes waiting — spending it on a low-income year wastes much of its value.'
    ]
  },

  inputs: [
    { key: 'nolAvailable', label: 'NOL carryforward used this year', type: 'currency', default: 100000 }
  ],

  appliesTo: function (profile) {
    return true;
  },

  /**
   * SIMPLIFICATION (stated honestly): the engine applies the NOL as an
   * above-the-line adjustment and does NOT enforce the §172(a)(2) 80%-of-
   * taxable-income cap. The advisor must cap the input at 80% of projected
   * taxable income (before the NOL). Applied in year 1 only — a one-time
   * absorption, not a recurring deduction. Does not reduce QBI (correct:
   * routed through `adjustments`, not the business income fields).
   */
  apply: function (profile, params, yearIndex, state) {
    var p = Object.assign({}, profile);
    var notes = [];
    var nol = params.nolAvailable || 0;

    if (yearIndex === 0 && nol > 0) {
      p.adjustments = (p.adjustments || 0) + nol;
      notes.push('Year 1: ' + TSIQ.fmt.usd(nol) + ' NOL carryforward deducted. ' +
        'IMPORTANT: this input bypasses the engine\'s own NOL machinery. The engine applies the ' +
        '§172(a)(2) 80%-of-taxable-income cap to NOLs it banked itself from a §461(l) disallowance, ' +
        'but this strategy adds the carryforward straight to adjustments, so that cap does NOT ' +
        'apply to what you enter here — cap this input at 80% of projected taxable income before ' +
        'the NOL yourself.');
      notes.push('The NOL deduction does not reduce the §199A QBI base (modeled correctly here); ' +
        'any separate §199A qualified business loss carryover must be handled in the QBI inputs.');
    }
    return { profile: p, notes: notes };
  }
});
