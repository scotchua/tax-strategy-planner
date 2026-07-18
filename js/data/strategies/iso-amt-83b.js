/* ============================================================================
 * STRATEGY: ISO Exercise & §83(b) Election Planning
 * Advisory-only: both levers are AMT-driven or holding-period-driven in ways
 * this engine (which computes no AMT) cannot honestly quantify.
 * ==========================================================================*/
window.TSIQ = window.TSIQ || {};
TSIQ.strategyModules = TSIQ.strategyModules || [];

TSIQ.strategyModules.push({
  id: 'iso-amt-83b',
  name: 'ISO Exercise & §83(b) Election Planning',
  category: 'Income Timing & Character',
  applyOrder: 20,
  modeled: false,

  advisor: {
    summary:
      'Two distinct equity-comp levers, both structurally important and ' +
      'both wrong to model with a regular-tax-only engine. Incentive stock ' +
      'options (§422): exercising creates NO regular-tax income at all — ' +
      'only an AMT preference equal to the spread (§56(b)(3)) — so a ' +
      'regular-tax comparison shows zero cost for an exercise that can ' +
      'trigger a large real AMT bill. §83(b) elections (restricted stock or ' +
      'early-exercised options subject to vesting): electing to be taxed at ' +
      'grant/exercise on a typically-small current spread, instead of on the ' +
      'full value at each vesting date, starts the LTCG holding clock early ' +
      'and can convert years of future ordinary income into capital gain — ' +
      'a bet that pays off only if the stock is worth MORE later and the ' +
      'employee stays through vesting. Both require the client\'s specific ' +
      'AMT position and risk tolerance, not a generic dollar model.',
    mechanics: [
      'ISO exercise: no regular-tax income at exercise (§421(a)) if the ' +
      'statutory holding periods are later met (2 years from grant, 1 year ' +
      'from exercise) — but the exercise spread (FMV minus strike) is an AMT ' +
      'preference item in the exercise year (§56(b)(3)), potentially ' +
      'triggering AMT with no matching regular-tax income to absorb it.',
      'AMT credit (§53): AMT paid because of an ISO exercise generally ' +
      'becomes a minimum tax credit usable against regular tax in future ' +
      'years once AMT no longer applies — real money, but recovered slowly ' +
      'and only if future regular tax exceeds future tentative minimum tax.',
      'Disqualifying disposition: selling ISO shares before meeting BOTH ' +
      'holding periods converts some or all of the gain to ordinary income ' +
      'in the sale year and can eliminate the AMT preference retroactively — ' +
      'timing sales around the holding-period anniversary matters.',
      '§83(b) election (§83(b)): within 30 days of a grant/exercise subject ' +
      'to a substantial risk of forfeiture (restricted stock, or an ISO/NSO ' +
      'exercised early before vesting), elect to be taxed NOW on the then-' +
      'current spread instead of on each future vesting date\'s (likely ' +
      'larger) spread — starts the capital-gain holding clock immediately.',
      '§83(b) downside risk: if the stock is later forfeited (employee ' +
      'departs before vesting) or declines in value, the tax paid on the ' +
      'election is NOT refunded — the election is irrevocable and can be a ' +
      'real loss, not just a timing choice.',
      'Both levers interact with year-end AMT/regular-tax crossover planning ' +
      '— exercising ISOs up to (but not over) the point where AMT would ' +
      'exceed regular tax is a common year-end optimization this tool cannot ' +
      'compute without an AMT engine.'
    ],
    authority: [
      { type: 'IRC', cite: 'IRC §421(a); §422', note: 'ISO statutory framework — no regular-tax income at exercise if the 2-year-from-grant/1-year-from-exercise holding periods are met.' },
      { type: 'IRC', cite: 'IRC §56(b)(3)', note: 'ISO exercise spread is an AMT preference/adjustment item in the exercise year, regardless of the regular-tax result.' },
      { type: 'IRC', cite: 'IRC §53', note: 'Minimum tax credit for AMT paid in a prior year, usable against regular tax in later years once AMT liability recedes.' },
      { type: 'IRC', cite: 'IRC §83(b)', note: 'Election to include the spread in income at grant/early-exercise instead of at vesting — must be filed with the IRS within 30 days; irrevocable.' },
      { type: 'IRC', cite: 'IRC §83(a)', note: 'Default rule this election overrides — property subject to a substantial risk of forfeiture is taxed as it vests, at each vesting date\'s (potentially larger) spread.' }
    ],
    requirements: [
      'For ISOs: knowledge of the client\'s full AMT position (this tool does not compute one) before recommending any exercise size.',
      'For §83(b): a grant or early exercise genuinely subject to a substantial risk of forfeiture (time-based vesting, typically), and real conviction the stock will be worth more later.',
      'Strict 30-day filing deadline for the §83(b) election — no extensions, no exceptions, mailed with proof of timely filing.',
      'Cash to pay tax on the election (§83(b)) or the AMT (ISO exercise) without selling the shares that created the income.'
    ],
    risks: [
      'This engine computes NO alternative minimum tax — any regular-tax-only projection of an ISO exercise understates its true cost, potentially to zero, when the real AMT bill can be substantial.',
      '§83(b) elections are irrevocable: if the stock is forfeited or declines, the tax paid is gone with no offsetting loss deduction beyond a capital loss on worthless stock (and no refund of the tax itself).',
      'Missing the 30-day §83(b) filing window forecloses the election permanently — there is no cure.',
      'A disqualifying ISO disposition can retroactively change the character of income in ways that interact with the AMT credit in non-obvious ways — model by hand or with dedicated AMT software.',
      'Recommending either lever without full AMT modeling risks a materially wrong client conversation about the actual after-tax cost.'
    ],
    bestFit: [
      'ISO holders with real AMT exposure who need a dedicated AMT projection before choosing an exercise size or year.',
      'Founders or very early employees granted restricted stock or early-exercisable options at a low current FMV — the classic §83(b) case.',
      'Clients with genuine conviction in the company\'s future value and the cash to pay tax on an election without selling shares.'
    ],
    implementation: [
      'Run a dedicated AMT projection (outside this tool) before sizing any ISO exercise — do not rely on this tool\'s regular-tax-only numbers for that decision.',
      'For §83(b): confirm the 30-day window from grant/exercise, prepare the election statement, and file with the IRS by mail with delivery confirmation — calendar the deadline immediately upon grant.',
      'Track the ISO holding-period anniversaries (2 years from grant, 1 year from exercise) to plan sale timing and avoid an inadvertent disqualifying disposition.',
      'Maintain a minimum-tax-credit carryforward schedule for any AMT paid on ISO exercises, and monitor future years for when it becomes usable.',
      'For §83(b) elections, keep proof of timely filing (certified mail receipt) in the permanent file — this is one of the most commonly botched deadlines in equity comp.'
    ]
  },

  client: {
    teaser: 'Two equity-compensation decisions where the tax math is more complicated than it looks',
    headline: 'Incentive stock options and early-exercise elections need specialized tax modeling',
    plainEnglish: [
      'If your company grants you incentive stock options, exercising them does NOT immediately show up as regular taxable income the way other stock compensation does — but it can trigger a completely separate tax called the alternative minimum tax, which this tool does not calculate. A generic tax projection can make an ISO exercise look free when it may not be.',
      'Separately, if you receive restricted stock or exercise options early, before they vest, there is a one-time election you can make within 30 days that lets you pay tax now, on a usually small amount, instead of later on a potentially much larger amount as the stock vests. Done right, this can turn future ordinary income into more favorably taxed long-term gain — but it is irreversible, and if the stock loses value or you leave before vesting, the tax you paid is not refunded.',
      'Both of these decisions deserve dedicated, specialized modeling rather than the standard comparison this tool runs — we handle that analysis separately and bring you the real numbers before you decide.'
    ],
    analogy: 'It\'s like a toll road with a separate gate the map doesn\'t show — the regular map (this tool) gets you most of the way, but these two decisions need a specialist who knows exactly where that gate is and what it costs.',
    benefits: [
      'Avoids a nasty tax-time surprise from an ISO exercise that looked "free" on paper',
      'A properly filed early-exercise election can convert future income into more favorably taxed gain',
      'Careful holding-period tracking can avoid accidentally losing ISO tax benefits',
      'Decisions are backed by dedicated specialized modeling, not a generic estimate'
    ],
    steps: [
      'We identify whether your grants are incentive stock options, restricted stock, or something else',
      'For ISOs, we run a dedicated alternative-minimum-tax projection before you exercise anything',
      'For early-exercise or restricted stock, we evaluate whether the 30-day election makes sense for your situation',
      'We calendar every deadline — the 30-day election window and the ISO holding-period anniversaries'
    ],
    considerations: [
      'This tool does not calculate the alternative minimum tax, so any numbers you see elsewhere for an ISO exercise should not be trusted without separate, dedicated modeling.',
      'The early-exercise election is irreversible — if you leave the company or the stock loses value before it vests, the tax you paid is not refunded.'
    ]
  },

  inputs: [],

  appliesTo: function (profile) {
    return true;
  },

  apply: function (profile, params, yearIndex, state) {
    return { profile: profile, notes: yearIndex === 0
      ? ['Advisory strategy — appears in the plan documents but does not change the scenario math. ' +
        'ISO exercises need a dedicated AMT projection (this engine computes no AMT); §83(b) ' +
        'elections need a 30-day-deadline check and an honest forfeiture-risk conversation before ' +
        'filing. Neither is quantified here.']
      : [] };
  }
});
