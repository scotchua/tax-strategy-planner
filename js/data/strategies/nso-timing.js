/* ============================================================================
 * STRATEGY: Non-Qualified Stock Option (NSO) Exercise Timing
 * One source object → advisor view, client PDF, client slideshow.
 * ==========================================================================*/
window.TSIQ = window.TSIQ || {};
TSIQ.strategyModules = TSIQ.strategyModules || [];

TSIQ.strategyModules.push({
  id: 'nso-timing',
  name: 'NSO Exercise Timing',
  category: 'Income Timing & Character',
  applyOrder: 19,
  modeled: true,

  advisor: {
    summary:
      'Exercising a non-qualified stock option creates ordinary W-2 wage ' +
      'income equal to the spread (FMV at exercise minus the strike price) ' +
      'in the year of exercise — no special election defers it, and (unlike ' +
      'an ISO) there is no AMT-only detour: the spread hits the regular tax ' +
      'return immediately, with employer withholding and both FICA halves. ' +
      'The lever available to the client is WHEN to exercise, not whether ' +
      'the income is ordinary — spreading a large spread across two lower-' +
      'bracket years, or timing it to a year with offsetting losses/deductions, ' +
      'materially changes the marginal rate that applies. This is the ' +
      'sibling of bracket-management.js applied specifically to option ' +
      'exercises, and the modeled centerpiece of the equity-comp suite — RSU ' +
      'vesting, by contrast, is scheduled by the employer and deferrable only ' +
      'through a rare §409A-compliant advance election, so it is not modeled ' +
      'as a timing lever here.',
    mechanics: [
      'Spread = (FMV per share at exercise − strike price) × shares exercised, ' +
      'taxed as ordinary income in the exercise year (Reg. §1.83-7) — added to ' +
      'Box 1 wages, subject to federal/state withholding and both FICA halves ' +
      '(employer withholds; no separate employee filing burden beyond the W-2).',
      'Additional Medicare Tax (0.9% above $200k/$250k) and the wage-base ' +
      'interaction with any other W-2 income apply automatically once the ' +
      'spread is added to wages — no separate calculation needed.',
      'Basis in the acquired shares becomes the FMV at exercise; a later sale ' +
      'is capital gain/loss measured from that basis, with its own holding ' +
      'period starting at exercise (not grant).',
      'Company blackout windows, vesting-cliff dates, and option expiration ' +
      'deadlines constrain WHEN exercise is even possible — the tax-timing ' +
      'lever only works within whatever window the plan and insider-trading ' +
      'policy allow.',
      'Exercising across a calendar year boundary (some shares in December, ' +
      'the rest in January) splits the spread between two tax years — the ' +
      'most common practical version of "timing" for a large single grant.',
      'A cashless (same-day-sale) exercise realizes the spread as ordinary ' +
      'income AND a (usually tiny) short-term capital gain/loss on the ' +
      'immediate resale — a cash/hold exercise instead starts the LTCG clock ' +
      'on the retained shares but ties up cash to pay the tax.'
    ],
    authority: [
      { type: 'Reg', cite: 'Reg. §1.83-7', note: 'Nonstatutory (non-qualified) stock options are taxed at exercise on the spread, as ordinary compensation income.' },
      { type: 'IRC', cite: 'IRC §83(a)', note: 'General property-transferred-for-services rule underlying the exercise-date income recognition.' },
      { type: 'IRC', cite: 'IRC §3101(b)(2)', note: 'Additional 0.9% Medicare tax above the wage threshold — applies automatically to a large exercise spread added to wages.' },
      { type: 'IRC', cite: 'IRC §409A', note: 'Deferred compensation rules — the reason RSU vesting cannot simply be pushed to a later year without a compliant advance election.' }
    ],
    requirements: [
      'Vested, unexpired non-qualified stock options with a positive spread (FMV above strike).',
      'A blackout-window-compliant exercise date under the company\'s insider trading policy.',
      'Cash (or a cashless-exercise/same-day-sale arrangement) to cover the strike price and the resulting withholding.',
      'A near-final projection of the client\'s OTHER income for the candidate exercise year(s) to size the bracket impact honestly.'
    ],
    risks: [
      'Option expiration is a hard deadline — do not let "wait for a better tax year" run past the exercise window.',
      'A same-day-sale (cashless) exercise locks in the ordinary income regardless of what the stock does the next day — no way to undo it.',
      'Concentration risk: holding exercised shares to start the LTCG clock keeps the client concentrated in employer stock during the whole holding period.',
      'This tool models NSOs only — an ISO exercised the same way has an entirely different (AMT-driven) profile; do not use this strategy\'s numbers for ISO shares (see the ISO/§83(b) advisory companion strategy).'
    ],
    bestFit: [
      'Employees or founders with a large, vested NSO spread and real flexibility in WHEN to exercise (no near-term expiration forcing the issue).',
      'A year with unusually low other income (a sabbatical, a business loss, retirement transition) as the exercise target.',
      'Splitting one large grant\'s exercise across two calendar years to avoid a single-year bracket/NIIT/Additional-Medicare spike.'
    ],
    implementation: [
      'Pull the option grant agreement: strike price, vesting schedule, expiration date, and any company-imposed exercise windows.',
      'Project the client\'s total income for each candidate exercise year BEFORE modeling the exercise, so the marginal-rate comparison is honest.',
      'Confirm cash availability for the strike price and withholding, or arrange a cashless/same-day-sale exercise if cash is tight.',
      'Coordinate the exercise date with the company\'s blackout calendar and any 10b5-1 plan requirements for insiders.',
      'If splitting across a year boundary, confirm the company can actually process exercises on both sides of December 31.',
      'Track basis (FMV at exercise) and the new holding period for the retained shares if not doing a same-day sale.'
    ]
  },

  client: {
    teaser: 'Choosing WHEN to exercise your stock options can matter as much as the grant itself',
    headline: 'Time your stock option exercise to the year that actually helps you',
    plainEnglish: [
      'When you exercise a stock option, the difference between what you pay and what the stock is worth becomes taxable income right then — added right on top of your paycheck for that year. You cannot avoid that tax, but you often have real say over WHICH year it lands in.',
      'That choice matters a lot. Exercising in a year when your other income is already high pushes the option income into your most expensive tax bracket. Exercising in a lower-income year — a sabbatical, a slow year for your business, before a big raise — can mean a meaningfully smaller tax bill on the exact same option.',
      'For a large grant, splitting the exercise across two calendar years instead of doing it all at once is often the simplest way to avoid one enormous, expensive year.'
    ],
    analogy: 'It\'s like choosing which grocery store to shop at on any given day — the bill for the same cart of goods can differ a lot depending on where (or when) you check out.',
    benefits: [
      'The same option income taxed at a lower average rate, just by choosing the right year',
      'A path to avoid one especially expensive tax year from a single large exercise',
      'Coordinated with your other income so we never guess — we project first, then decide',
      'Keeps your original decision to hold or exercise intact; this only changes the timing'
    ],
    steps: [
      'We review your option grant\'s deadlines and any company exercise restrictions',
      'We project your income for each realistic exercise year',
      'We recommend the year (or split) that produces the best result',
      'We coordinate the exercise date with your company\'s trading windows'
    ],
    considerations: [
      'Options eventually expire — we will never suggest waiting past a deadline chasing a better tax year.',
      'This applies to non-qualified options specifically; incentive stock options work very differently and need separate, careful planning.'
    ]
  },

  inputs: [
    { key: 'exerciseSpread', label: 'Exercise spread (FMV at exercise minus strike, all shares)', type: 'currency', default: 100000 },
    { key: 'exerciseYear', label: 'Projection year to exercise in (1 = this year)', type: 'number', default: 1, min: 1 }
  ],

  appliesTo: function (profile) {
    return true; // validated in apply(): needs a positive exercise spread
  },

  /**
   * Adds the exercise spread to `wages` in the chosen (1-based, clamped)
   * projection year only — ordinary W-2 income, so FICA-wage-base
   * interaction, Additional Medicare Tax, and bracket placement all flow
   * automatically through the engine's existing wages handling. Deliberately
   * NOT `grows: true` — a chosen one-time exercise amount must not compound.
   */
  apply: function (profile, params, yearIndex, state) {
    var p = Object.assign({}, profile);
    var notes = [];
    var spread = Math.max(0, params.exerciseSpread || 0);
    if (spread <= 0) {
      if (yearIndex === 0) {
        notes.push('No exercise spread entered — nothing to model. Enter the spread (FMV at ' +
          'exercise minus strike price, across all shares to be exercised).');
      }
      return { profile: p, notes: notes };
    }
    var targetYearIndex = Math.max(1, Math.round(params.exerciseYear || 1)) - 1;
    if (yearIndex !== targetYearIndex) return { profile: p, notes: notes };

    p.wages = (p.wages || 0) + spread;
    notes.push(TSIQ.fmt.usd(spread) + ' NSO exercise spread modeled as ordinary W-2 wages in ' +
      'projection year ' + (targetYearIndex + 1) + ' (Reg. §1.83-7) — FICA wage-base interaction ' +
      'and the 0.9% Additional Medicare Tax apply automatically since it is added to wages.');
    notes.push('Basis in the acquired shares becomes the exercise-date FMV; a later sale is a ' +
      'separate capital gain/loss with its own holding period starting at exercise — not modeled ' +
      'here unless entered separately as a future LTCG/short-term-gain event.');
    notes.push('This models non-qualified options only. An ISO exercised the same way has an ' +
      'entirely different, AMT-driven profile this tool cannot compute (see the ISO/§83(b) ' +
      'advisory strategy) — confirm the option type before relying on this model.');
    return { profile: p, notes: notes };
  }
});
