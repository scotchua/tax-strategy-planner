/* ============================================================================
 * STRATEGY: Basis Step-Up Planning at Death
 * One source object → advisor view, client PDF, client slideshow.
 * ==========================================================================*/
window.TSIQ = window.TSIQ || {};
TSIQ.strategyModules = TSIQ.strategyModules || [];

TSIQ.strategyModules.push({
  id: 'basis-step-up-planning',
  name: 'Basis Step-Up Planning at Death',
  category: 'Succession & Exit',
  applyOrder: 95,
  modeled: false,
  character: 'permanent', // ET2

  advisor: {
    summary:
      'Under §1014, assets included in a decedent\'s gross estate take a fresh ' +
      'fair-market-value basis at death — appreciation held to death is never ' +
      'income-taxed. With the estate/gift exemption permanently at $15M ' +
      '($30M married, OBBBA, indexed), most clients will never owe federal ' +
      'estate tax, which flips the planning objective from "get assets out of ' +
      'the estate" to "get the RIGHT assets INTO the estate at death": hold ' +
      'appreciated positions, harvest losses during life (§1014 also steps ' +
      'DOWN), exploit the full double step-up on community property under ' +
      '§1014(b)(6) — directly relevant to the firm\'s Idaho clients, since Idaho ' +
      'IS a community property state — and use grantor-trust swap powers to pull ' +
      'low-basis assets back into the estate before death. Older wealth-transfer ' +
      'structures built for a smaller exemption often now cost more in lost ' +
      'step-up than they save in estate tax and should be re-examined.',
    mechanics: [
      '§1014(a) resets basis to date-of-death FMV (or the §2032 alternate ' +
      'valuation date) for property acquired from a decedent — appreciation ' +
      'escapes income tax entirely, and depreciation recapture on real estate ' +
      'dies with the owner. The reset runs BOTH ways: built-in losses step ' +
      'DOWN, so loss positions should be harvested during life (or gifted), ' +
      'never held to death.',
      'Community property double step-up (§1014(b)(6)): when the first spouse ' +
      'dies, BOTH halves of community property — the decedent\'s AND the ' +
      'survivor\'s — take FMV basis, versus only the decedent\'s half for ' +
      'common-law joint property. Idaho is one of the nine community property ' +
      'states; Washington is another. For the firm\'s WA/ID clients, confirming ' +
      'and documenting community character (and considering community-property ' +
      'agreements where state law permits) can double the basis benefit at the ' +
      'first death.',
      'Hold-vs-sell arithmetic: an appreciated asset sold in life pays up to ' +
      '23.8% federal (20% LTCG + 3.8% NIIT) plus state on the gain; held to ' +
      'death under a $15M exemption it commonly pays nothing at all. For ' +
      'income-tax-driven estates, deferral into the step-up beats almost any ' +
      'realization strategy the client does not otherwise need.',
      'Grantor-trust swap powers: a §675(4)(C) power of substitution lets the ' +
      'grantor swap high-basis assets (or cash) into an old irrevocable grantor ' +
      'trust in exchange for the trust\'s low-basis assets — a non-recognition ' +
      'move under Rev. Rul. 85-13 — repositioning the low-basis assets inside ' +
      'the estate to capture the step-up while keeping trust value unchanged. ' +
      'Substituted values must be equivalent and documented.',
      'Upstream gifting: gifting low-basis assets to an elderly parent whose ' +
      'estate is far under the exemption can capture a step-up at the parent\'s ' +
      'death — but §1014(e) denies the step-up if the parent dies within one ' +
      'year AND the property passes back to the original donor (or the donor\'s ' +
      'spouse). Route the bequest to someone other than the donor (e.g., a ' +
      'trust for the donor\'s children) or accept the one-year mortality risk. ' +
      'Also consider the parent\'s creditors, Medicaid exposure, and the use of ' +
      'the parent\'s own exemption.',
      'Structure review: credit-shelter/bypass trusts funded at the first death ' +
      'deny assets a second step-up at the survivor\'s death. For estates ' +
      'safely under the exemption, portability (§2010(c) DSUE, elected on a ' +
      'timely Form 706) plus outright or marital-trust dispositions often ' +
      'produce a better combined income/estate result than legacy AB-trust ' +
      'boilerplate.'
    ],
    authority: [
      { type: 'IRC', cite: 'IRC §1014(a)', note: 'FMV basis for property acquired from a decedent — the step-up (and step-down) at death.' },
      { type: 'IRC', cite: 'IRC §1014(b)(6)', note: 'The surviving spouse\'s half of community property is treated as acquired from the decedent — full double step-up on both halves at the first death. Idaho and Washington are both community property states.' },
      { type: 'IRC', cite: 'IRC §1014(e)', note: 'Anti-abuse: no step-up for appreciated property gifted to the decedent within one year of death that passes back to the donor or donor\'s spouse — the constraint on upstream gifting.' },
      { type: 'IRC', cite: 'IRC §675(4)', note: 'A nonfiduciary power to substitute assets of equivalent value creates grantor-trust status — the mechanism for swapping low-basis assets back into the estate.' },
      { type: 'Admin', cite: 'Rev. Rul. 85-13', note: 'Transactions between a grantor and a wholly-owned grantor trust are disregarded for income tax — why a substitution/swap is not a taxable sale.' },
      { type: 'IRC', cite: 'IRC §2010(c)', note: '$15M exemption (2026, permanent under OBBBA, indexed) and portability of the deceased spouse\'s unused exclusion — elected on a timely Form 706 even when no tax is due.' },
      { type: 'IRC', cite: 'IRC §1015', note: 'Carryover basis for lifetime gifts — the benchmark that makes holding appreciated assets to death the better income-tax answer for most sub-exemption estates.' },
      { type: 'IRC', cite: 'IRC §2032', note: 'Alternate valuation date election (6 months) where values decline post-death and the election reduces estate tax.' }
    ],
    requirements: [
      'A current balance sheet with BASIS, not just value: every planning move ' +
      'depends on knowing which assets are high-gain, high-basis, or ' +
      'loss positions.',
      'An estate-size determination against the $15M/$30M exemption to confirm ' +
      'the client is income-tax-driven (most are) before unwinding or skipping ' +
      'wealth-transfer structures.',
      'For the double step-up: assets actually titled/characterized as ' +
      'community property under Idaho or Washington law — titling and any ' +
      'community-property agreements reviewed with counsel, especially for ' +
      'couples who moved from common-law states.',
      'For swaps: an existing irrevocable grantor trust whose instrument grants ' +
      'a §675(4)(C) substitution power, and liquid high-basis assets to swap in.',
      'For upstream gifts: a trustworthy, under-exemption elder with ' +
      'cooperative estate documents, and eyes open on §1014(e), creditor, and ' +
      'Medicaid risks.'
    ],
    risks: [
      'Step-DOWN blindness: holding loss assets to death wastes deductible ' +
      'losses permanently — harvest them in life.',
      'Community-property character can be broken unintentionally (commingling, ' +
      'refinancing, moving between common-law and community states); the double ' +
      'step-up is only as good as the documentation of community character.',
      'Upstream gifts put assets legally in the parent\'s hands: their ' +
      'creditors, their new spouse, their Medicaid spend-down, and their ' +
      'freedom to change the will all become the client\'s problem; §1014(e) ' +
      'voids the play if death occurs within a year and the assets return to ' +
      'the donor.',
      'Swap execution risk: substituted assets must be of equivalent value with ' +
      'appraisal support; a sloppy swap invites both fiduciary and gift-tax ' +
      'arguments.',
      'Estate-tax whiplash: clients whose estates may yet grow past the ' +
      'exemption (or who face STATE estate tax — Washington\'s threshold is far ' +
      'below $15M) still need removal strategies; step-up maximization and ' +
      'estate reduction must be balanced, not assumed.',
      'Legacy AB-trust documents that force credit-shelter funding at the first ' +
      'death can strand appreciation outside the second step-up — old documents ' +
      'need review, not autopilot administration.'
    ],
    bestFit: [
      'Estates comfortably under $15M single / $30M married holding highly ' +
      'appreciated real estate, closely held business interests, or ' +
      'concentrated stock.',
      'The firm\'s Idaho (and Washington) married clients, where community-' +
      'property titling can double the first-death basis reset.',
      'Clients with old irrevocable grantor trusts holding low-basis assets — ' +
      'prime swap-power candidates.',
      'Families with elderly, under-exemption parents or grandparents open to ' +
      'upstream planning, and clients whose existing AB-trust documents predate ' +
      'portability.'
    ],
    implementation: [
      'Build the basis-mapped balance sheet: flag high-gain holds, loss ' +
      'positions to harvest, and depreciated real estate whose recapture dies ' +
      'with the owner.',
      'Classify the estate as income-tax-driven or estate-tax-driven against ' +
      'the exemption (federal AND state — Washington clients are often state-' +
      'estate-tax-driven even when federal tax is zero).',
      'For WA/ID married couples: review titling and confirm or establish ' +
      'community-property character with counsel where advantageous; document ' +
      'it in the permanent file.',
      'Audit existing irrevocable trusts for §675(4)(C) swap powers; where ' +
      'present, appraise and execute substitutions of equivalent value to bring ' +
      'low-basis assets back into the estate as health/time horizon warrants.',
      'Evaluate upstream gifts to under-exemption elders; draft around §1014(e) ' +
      'by directing the bequest away from the original donor (e.g., to trusts ' +
      'for grandchildren).',
      'Re-paper stale AB-trust plans toward portability/marital formats where ' +
      'appropriate, and calendar a timely Form 706 portability election at the ' +
      'first death even when no tax is due.'
    ]
  },

  client: {
    teaser: 'The largest tax break in the code is one most families accidentally throw away — keeping it takes planning, not money',
    headline: 'Erase a lifetime of gains — by planning what you hold, where, and how it\'s titled',
    plainEnglish: [
      'Here is one of the most generous rules in the entire tax code: when you pass away, the taxable gain on what you own is wiped clean. The rental you bought for $200,000 that is worth $900,000? If your heirs inherit it, the tax bill on that $700,000 of growth simply never comes due. Sell it the year before, and the tax is very real. For most families today, the smartest estate plan is an income tax plan: hold your winners, sell your losers while you are alive, and make sure nothing in your paperwork accidentally gives the break away.',
      'For married couples in Idaho and Washington, there is a bonus most people have never heard of. These are "community property" states, and when the first spouse passes, the tax slate can be wiped clean on BOTH halves of what the couple owns together — not just half, as in most other states. Whether you get that full benefit often comes down to how your assets are titled, which is fixable now and unfixable later.',
      'There are also advanced moves for families who planned earlier: older trusts can be restocked so low-basis assets come back where the tax break reaches them, and in the right situation, assets can even ride through an elderly parent\'s estate to pick up the break a generation early. Each one has strict rules, and each one starts with knowing exactly what you own and what you paid for it.'
    ],
    analogy: 'Think of every appreciated asset as carrying a tax meter that has been running for decades. Handled correctly at the right moment, the meter resets to zero. Handled carelessly — sold too soon, titled the wrong way, or parked in the wrong trust — the family pays the full fare.',
    benefits: [
      'Decades of gains on real estate and investments can pass to heirs with zero capital gains tax',
      'Idaho and Washington couples can qualify for a double version of the break most states never see',
      'Old trusts and outdated wills can be tuned up so they stop working against you',
      'Losses get used while they still count, instead of vanishing'
    ],
    steps: [
      'We build a complete list of what you own, what you paid, and how each asset is titled',
      'We identify what to hold, what to sell, and what to retitle — and fix the titling with your attorney',
      'We review any existing trusts and update the plan so the tax break lands where it should',
      'We revisit the plan as values, health, and the law change'
    ],
    considerations: [
      'This is long-game planning — the payoff arrives at the hardest moment for a family, so the paperwork has to be right long before it is needed.',
      'Holding an asset for the tax break only makes sense if holding it makes sense — we never let a tax rule force a bad investment decision.',
      'Some advanced moves involve other family members\' estates and have strict timing rules, so they are used selectively and with counsel.'
    ]
  },

  inputs: [],

  appliesTo: function (profile) {
    return true; // advisory — driven by basis facts and estate size, not return inputs
  },

  apply: function (profile, params, yearIndex, state) {
    return { profile: profile, notes: yearIndex === 0
      ? ['Advisory strategy — appears in the plan documents but does not change the scenario math.']
      : [] };
  }
});
