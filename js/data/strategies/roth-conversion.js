/* ============================================================================
 * STRATEGY: Roth IRA Conversion
 * Traditional IRA -> Roth IRA, the general-purpose bracket-fill conversion
 * available to anyone with a Traditional IRA (no employer plan required) —
 * distinct from in-plan-roth-conversion.js, which needs a 401(k)/similar
 * plan with an in-plan Roth conversion feature. Both can be modeled together
 * when a client has both pots of money; each tracks its own converted
 * amount and both add to the same shared rothConversionIncome engine field.
 * ==========================================================================*/
window.TSIQ = window.TSIQ || {};
TSIQ.strategyModules = TSIQ.strategyModules || [];

TSIQ.strategyModules.push({
  id: 'roth-conversion',
  name: 'Roth IRA Conversion',
  category: 'Retirement',
  // Runs after every deduction strategy so it stacks on the final bracket
  // picture — same reasoning as in-plan-roth-conversion.js (90); kept one
  // slot earlier so, if a scenario selects both, this one is attributed
  // first in the incremental-savings waterfall (order is otherwise
  // immaterial — both add to the same rothConversionIncome field).
  applyOrder: 89,
  modeled: true,
  character: 'permanent', // ET2

  advisor: {
    summary:
      'Under §408A(d)(3), any Traditional IRA balance may be converted to a ' +
      'Roth IRA regardless of income — the pre-2010 AGI ceiling on conversions ' +
      'was permanently repealed. The converted amount is ordinary income in the ' +
      'conversion year; afterward it grows tax-free with no lifetime RMDs for ' +
      'the original owner (SECURE 2.0 eliminated Roth IRA RMDs entirely, unlike ' +
      'the designated Roth 401(k) accounts in-plan-roth-conversion.js addresses, ' +
      'which only lost their RMD requirement in 2024). Like the in-plan version ' +
      'this is a bracket-fill timing play, not a deduction — the art is sizing ' +
      'the amount to a low-income or large-deduction year. Unlike the in-plan ' +
      'version, no plan amendment or employer cooperation is needed: any ' +
      'custodian can execute a Traditional-to-Roth IRA conversion directly.',
    mechanics: [
      'Mechanics: trustee-to-trustee transfer (or 60-day rollover) from a ' +
      'Traditional IRA to a Roth IRA; reported on Form 1099-R (distribution) ' +
      'and Form 5498 (Roth contribution) by the custodian, Form 8606 by the ' +
      'taxpayer to track basis.',
      'Pro-rata rule (§408(d)(2)): if the client holds ANY nondeductible basis ' +
      'across ALL Traditional/SEP/SIMPLE IRAs, the converted amount is taxed ' +
      'proportionally taxable/nontaxable across the aggregate balance — a ' +
      'partial conversion cannot cherry-pick only the pre-tax dollars.',
      'No income limits and no dollar cap on conversions (distinct from the ' +
      'separate $7,000/$8,000 annual Roth IRA CONTRIBUTION limits, which do ' +
      'phase out by MAGI — conversions are a different mechanism entirely).',
      'Irrevocable: recharacterization of a conversion was repealed by TCJA — ' +
      'there is no undo once executed.',
      'The 5-year clock on EACH conversion (separate from the account\'s ' +
      'overall 5-year clock) determines whether a pre-59½ withdrawal of ' +
      'converted principal avoids the 10% penalty — converted amounts ' +
      'withdrawn within 5 years (and before 59½) can trigger recapture.',
      'Same AGI-cascade caution as the in-plan version: conversion income ' +
      'can phase down the OBBBA SALT cap, squeeze QBI thresholds, and trigger ' +
      'IRMAA two years later for Medicare-age clients.'
    ],
    authority: [
      { type: 'IRC', cite: 'IRC §408A(d)(3)', note: 'Conversion taxation framework — ordinary income inclusion of the converted amount, no AGI ceiling (repealed for tax years after 2009).' },
      { type: 'IRC', cite: 'IRC §408(d)(2)', note: 'Pro-rata aggregation rule across all the taxpayer\'s Traditional/SEP/SIMPLE IRAs when basis exists.' },
      { type: 'IRC', cite: 'IRC §408A(d)(4)', note: '5-year recapture rule on converted amounts withdrawn early.' },
      { type: 'Admin', cite: 'Form 8606', note: 'Tracks nondeductible IRA basis and reports the taxable/nontaxable split of a conversion.' },
      { type: 'Admin', cite: 'SECURE 2.0 Act §325', note: 'Eliminated lifetime RMDs for designated Roth 401(k)/403(b) accounts starting 2024, bringing them in line with the Roth IRA\'s long-standing no-RMD treatment.' }
    ],
    requirements: [
      'A Traditional (or SEP/SIMPLE) IRA balance worth converting.',
      'Outside cash to pay the conversion tax — paying it from the converted dollars forfeits a chunk of the tax-free growth and, if under 59½, is itself an early distribution.',
      'A reliable year-end projection: irrevocable once executed.',
      'Awareness of ALL IRA balances if any nondeductible basis exists anywhere (pro-rata rule).'
    ],
    risks: [
      'Pro-rata rule: converting "just the basis" from one account does not work if the client holds other IRA balances — the whole aggregate is prorated.',
      'Irrevocable: no recharacterization since TCJA.',
      'AGI cascade: SALT-cap phase-down, QBI phase-in, NIIT on other income, IRMAA two years out.',
      'Paying the tax from the converted funds (especially pre-59½) destroys the arbitrage and can add a 10% penalty on the amount used.',
      'Converting in a normal-income year at top rates is usually just prepaying tax — the strategy is the TIMING.'
    ],
    bestFit: [
      'Clients in a genuine income valley (early retirement, a sale gap year, a sabbatical) with room in low brackets.',
      'A year another selected strategy already creates a large deduction (DB/cash-balance funding, cost segregation, a large charitable gift).',
      'Clients without a 401(k) in-plan conversion feature who still want to convert pre-tax dollars — this needs no employer plan at all.'
    ],
    implementation: [
      'Inventory every Traditional/SEP/SIMPLE IRA the client owns (pro-rata rule applies in aggregate).',
      'Build the year-end projection including every planned deduction; identify the target bracket ceiling.',
      'Size the conversion net of AGI-driven cliffs (SALT phase-down, QBI, NIIT, IRMAA for 63+).',
      'Execute via direct trustee-to-trustee transfer late in the year against near-final numbers.',
      'File Form 8606 to document the taxable/nontaxable split; confirm outside cash covered the tax.',
      'Repeat annually in future low-income years rather than one large conversion.'
    ]
  },

  client: {
    teaser: 'Trades a future tax bill on retirement money for today\'s known, lower rate',
    headline: 'Convert retirement savings to tax-free — on your terms, in your cheapest year',
    plainEnglish: [
      'Money in a Traditional IRA carries a tax bill the IRS hasn\'t collected yet. Every future withdrawal is taxed as ordinary income, and starting in your seventies, required withdrawals force the issue whether you want the money that year or not.',
      'A Roth conversion moves some of that money to the tax-free side now: you pay tax on the amount converted this year, and from then on it grows completely tax-free with no forced withdrawals, ever. The key is picking the right year — one where your income is unusually low, or where another deduction has already brought your tax rate way down.',
      'This works with ANY Traditional IRA, whether or not your employer plan offers Roth conversions — it just takes a phone call to your IRA custodian.'
    ],
    analogy: 'It\'s like paying off a loan early at a discount — the tax was always coming due, so we pay it in the year it\'s on sale.',
    benefits: [
      'Converted money grows 100% tax-free forever, with no required withdrawals — ever',
      'No employer plan needed — any Traditional IRA qualifies',
      'No income limit on conversions, unlike Roth IRA contributions',
      'Pairs perfectly with a big-deduction year to convert at bargain rates'
    ],
    steps: [
      'We identify your lowest-tax window this year or next',
      'We calculate the amount that fills your cheap brackets and stops',
      'Your IRA custodian executes a direct transfer to a Roth IRA',
      'We file the paperwork tracking exactly what was converted'
    ],
    considerations: [
      'You pay real tax now, from money outside the IRA — the win only shows up if the rate today beats the rate you would have paid later.',
      'If you have other Traditional IRA balances with after-tax contributions mixed in, the IRS treats a conversion as pulling proportionally from everything — we check this first.',
      'A conversion is permanent once made.'
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
   * Same mechanism as in-plan-roth-conversion.js — adds ordinary income via
   * the shared profile.rothConversionIncome field (tax-engine.js includes it
   * in totalIncome, excludes it from the NIIT base per §1411(c)(5)). Kept as
   * a separate strategy because the eligibility facts and client story
   * differ (any Traditional IRA vs. a 401(k) with an in-plan feature); both
   * may be selected together for a client converting from both pots.
   * Deliberately NOT `grows: true` — a chosen one-time conversion amount
   * must not compound with the income growth rate.
   */
  apply: function (profile, params, yearIndex, state) {
    var p = Object.assign({}, profile);
    var notes = [];
    var targetYearIndex = Math.max(1, Math.round(params.conversionYear || 1)) - 1;
    if (yearIndex !== targetYearIndex) return { profile: p, notes: notes };

    var amt = Math.max(0, params.conversionAmount || 0);
    p.rothConversionIncome = (p.rothConversionIncome || 0) + amt;
    notes.push(TSIQ.fmt.usd(amt) + ' converted from a Traditional IRA to a Roth IRA in ' +
      'projection year ' + (targetYearIndex + 1) + ' — ordinary income this year, excluded ' +
      'from NIIT (§1411(c)(5)), tax-free growth and no RMDs afterward. Irrevocable once ' +
      'executed — size against a near-final year-end projection.');
    notes.push('If the client holds nondeductible basis in ANY Traditional/SEP/SIMPLE IRA, ' +
      'the §408(d)(2) pro-rata rule applies across the aggregate balance — confirm before ' +
      'assuming this amount is fully taxable (or fully basis) as modeled here.');
    notes.push('Watch the AGI cascade this conversion amount also drives elsewhere in the ' +
      'scenario: SALT-cap phase-down, QBI phase-in, and (for Medicare-age clients) IRMAA ' +
      'two years later — size net of those cliffs, not gross.');
    return { profile: p, notes: notes };
  }
});
