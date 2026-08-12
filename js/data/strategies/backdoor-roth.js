/* ============================================================================
 * STRATEGY: Backdoor Roth IRA
 * Advisory-only: a nondeductible contribution plus conversion produces no
 * current-year deduction — the value is decades of tax-free growth.
 * ==========================================================================*/
window.TSIQ = window.TSIQ || {};
TSIQ.strategyModules = TSIQ.strategyModules || [];

TSIQ.strategyModules.push({
  id: 'backdoor-roth',
  name: 'Backdoor Roth IRA',
  category: 'Retirement',
  applyOrder: 69,
  modeled: false,
  character: 'permanent', // ET2

  advisor: {
    summary:
      'Clients above the Roth IRA MAGI phase-out cannot contribute directly — ' +
      'but anyone with compensation may make a NONDEDUCTIBLE traditional IRA ' +
      'contribution (§408(o)), and conversions have had no income limit since ' +
      '2010. Contribute $7,500 (2026; +$1,100 catch-up at 50+), convert promptly, ' +
      'and only post-contribution earnings are taxable — the result is a full ' +
      'Roth contribution through the side door. The strategy lives or dies on ' +
      '§408(d)(2): ALL of the client\'s traditional/SEP/SIMPLE IRAs aggregate ' +
      'into one pro-rata fraction, so any existing pre-tax IRA balance makes the ' +
      'conversion substantially taxable. Clean it first (roll pre-tax IRAs into ' +
      'an employer plan) or skip the strategy. Executed annually for both ' +
      'spouses, it compounds into six figures of Roth money over a decade.',
    mechanics: [
      'Step 1: nondeductible traditional IRA contribution — $7,500 / $8,600 at ' +
      '50+ (2026). Requires compensation; a non-working spouse can contribute ' +
      'on the working spouse\'s compensation (spousal IRA).',
      'Step 2: convert to Roth. Conversion is taxable only to the extent it ' +
      'exceeds basis (§408A(d)(3)) — converting promptly keeps earnings, and ' +
      'therefore tax, near zero.',
      'The pro-rata trap: §408(d)(2) treats every traditional, SEP, and SIMPLE ' +
      'IRA the client owns as ONE IRA, measured at DECEMBER 31 of the ' +
      'conversion year. A $92,500 pre-tax rollover IRA plus a $7,500 basis ' +
      'contribution makes any conversion 92.5% taxable — no cherry-picking the ' +
      'basis.',
      'The cleanup move: roll pre-tax IRA balances INTO a 401(k) (employer or ' +
      'solo) — plans are excluded from the §408(d)(2) fraction. Do it before ' +
      'December 31 of the conversion year.',
      'Form 8606 every year, both steps, both spouses: Part I reports the ' +
      'nondeductible contribution and tracks basis; the conversion reconciles ' +
      'against it. Missed 8606s are how clients end up double-taxed years later.',
      'Spouses are tested separately — one spouse\'s pre-tax IRAs do not ' +
      'contaminate the other\'s conversion.'
    ],
    authority: [
      { type: 'IRC', cite: 'IRC §408(o)', note: 'Nondeductible traditional IRA contributions — permitted regardless of income, creating the basis that converts tax-free.' },
      { type: 'IRC', cite: 'IRC §408(d)(2)', note: 'The pro-rata aggregation rule: all traditional/SEP/SIMPLE IRAs treated as one; basis recovered ratably, not selectively.' },
      { type: 'IRC', cite: 'IRC §408A(d)(3)', note: 'Conversion taxation — includible in income except to the extent of basis.' },
      { type: 'Admin', cite: 'Form 8606', note: 'Required annually to report nondeductible contributions and compute the taxable share of conversions; the basis ledger.' },
      { type: 'Admin', cite: 'H.R. Rep. No. 115-466 (TCJA Conference Report)', note: 'Congressional acknowledgment (in the recharacterization-repeal discussion) that a taxpayer may contribute to a traditional IRA and convert it to a Roth.' },
      { type: 'Admin', cite: 'Notice 2025-67', note: '2026 IRA limits: $7,500 contribution, $1,100 catch-up.' }
    ],
    requirements: [
      'Compensation at least equal to the contribution (spousal rule available); MAGI above the Roth phase-out is the reason to bother.',
      'Zero (or near-zero) combined balance in ALL traditional/SEP/SIMPLE IRAs at 12/31 of the conversion year — or a plan-rollover cleanup executed first.',
      'An employer or solo 401(k) that accepts roll-ins, if cleanup is needed.',
      'Discipline to file Form 8606 for each spouse, every year, without fail.'
    ],
    risks: [
      'Hidden IRA balances (old rollover IRAs, active SEPs) discovered after conversion make it unexpectedly taxable — inventory every account, both spouses, before step one. An advisor-maintained SEP is a common self-inflicted conflict.',
      'Missed or botched Form 8606s destroy the basis record — reconstructing years later is painful and the IRS default is fully taxable.',
      'Long contribution-to-conversion gaps let earnings accrue, creating avoidable tax.',
      'Legislative proposals to close the backdoor recur; historically completed conversions are grandfathered, favoring execution over waiting.',
      'The dollar impact is modest per year (~$7,500/spouse) — position it as an annual habit, not a headline strategy.'
    ],
    bestFit: [
      'High-income clients (above the Roth MAGI phase-out) with no pre-tax IRA balances — or balances a 401(k) roll-in can absorb.',
      'Married couples who will run it for both spouses annually.',
      'Clients already maxing plan contributions who want incremental Roth capacity every year.'
    ],
    implementation: [
      'Inventory every traditional/SEP/SIMPLE IRA for both spouses; if pre-tax balances exist, roll them into a 401(k) before year-end or stop here.',
      'Make the nondeductible contribution ($7,500/$8,600 for 2026) for each spouse.',
      'Convert to Roth promptly — days, not months; invest after conversion, not before.',
      'File Form 8606 for each spouse with the return; verify the 1099-R (code 2/7) and 5498 tie out.',
      'Confirm the 12/31 aggregate pre-tax IRA balance is still zero — a late-year SEP contribution can retroactively poison the fraction.',
      'Calendar it annually — contribution and conversion both, every January where cash flow allows.'
    ]
  },

  client: {
    teaser: 'A perfectly legal side door into an account the IRS says you earn too much to use',
    headline: 'Too "high-income" for a Roth? There\'s a legal side door.',
    plainEnglish: [
      'A Roth IRA is one of the best deals in the tax code — money grows for decades and comes out completely tax-free in retirement. The catch: once your income passes a certain level, the IRS bars you from contributing directly. Frustrating, because high earners are exactly the people who benefit most from tax-free growth.',
      'But there is a two-step path that Congress itself has acknowledged works. Step one: put money into a regular IRA without taking a deduction — no income limit applies to that. Step two: promptly convert that account to a Roth — no income limit applies there either. Done quickly and papered correctly, little or no tax is due, and the money is inside the Roth growing tax-free.',
      'One thing must be checked first: if you already have old pre-tax IRA money sitting anywhere — say, from a 401(k) you rolled over years ago — the IRS mixes it all together and the conversion gets taxed. We inventory everything and, if needed, tidy those old accounts first so the door is clean.'
    ],
    analogy: 'The front entrance has a velvet rope and your name isn\'t on the list — but the side entrance is unlocked, legal, and leads to the same room. We just make sure you walk through it the right way.',
    benefits: [
      'Adds up to $7,500 per spouse, every year, to tax-free retirement savings',
      'Works no matter how high your income is',
      'Little or no tax cost when done promptly and papered correctly',
      'Repeats annually — a decade of this builds six figures of tax-free money'
    ],
    steps: [
      'We check all your existing retirement accounts so no hidden tax surprise exists',
      'We handle the two-step contribution and conversion in the right order',
      'We file the specific IRS form that protects you from ever being double-taxed',
      'We put it on the calendar to repeat every year for both spouses'
    ],
    considerations: [
      'Old pre-tax IRA balances can make the conversion taxable — we check for those first, and sometimes a cleanup step is needed before starting.',
      'This is a steady-drip strategy: modest dollars each year that compound into something substantial, not a big first-year number.'
    ]
  },

  inputs: [],

  appliesTo: function (profile) {
    return true;
  },

  apply: function (profile, params, yearIndex, state) {
    return { profile: profile, notes: yearIndex === 0
      ? ['Advisory strategy — appears in the plan documents but does not change the scenario math. The nondeductible contribution creates no current deduction; a prompt conversion is (near) tax-neutral. Verify the client\'s 12/31 pre-tax IRA balances before executing (§408(d)(2) pro-rata).']
      : [] };
  }
});
