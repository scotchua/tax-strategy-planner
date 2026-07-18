/* ============================================================================
 * STRATEGY: Systematic Gifting (Annual Exclusion + Lifetime Exemption)
 * One source object → advisor view, client PDF, client slideshow.
 * ==========================================================================*/
window.TSIQ = window.TSIQ || {};
TSIQ.strategyModules = TSIQ.strategyModules || [];

TSIQ.strategyModules.push({
  id: 'annual-gifting-program',
  name: 'Systematic Gifting (Annual Exclusion + Lifetime Exemption)',
  category: 'Succession & Exit',
  applyOrder: 94,
  modeled: false,
  character: 'permanent', // ET2

  advisor: {
    summary:
      'A disciplined, repeating program that layers the per-donee annual ' +
      'exclusion ($19,000 in 2026, indexed), unlimited direct payments of ' +
      'tuition and medical costs under §2503(e), 529 five-year front-loading, ' +
      'and targeted use of the $15M lifetime exemption (permanent under OBBBA ' +
      'and indexed — there is no sunset to race). The scale compounds quietly: a ' +
      'married couple with three married children and six grandchildren has 12 ' +
      'donees and can move $456,000 per year with zero gift tax and zero ' +
      'exemption used. Post-OBBBA, the case for lifetime gifting is ' +
      'appreciation-shifting, income-shifting, state estate taxes, and asset ' +
      'protection — not exemption panic — and asset selection now matters more ' +
      'than speed: carryover basis under §1015 means low-basis assets held by an ' +
      'older client are often better kept for the §1014 step-up.',
    mechanics: [
      'Annual exclusion (§2503(b)): $19,000 per donor, per donee, per year in ' +
      '2026, indexed — present-interest gifts only. A married couple gives ' +
      '$38,000 per donee, either from joint funds or via the §2513 gift-' +
      'splitting election (which requires a Form 709). 12 donees × $38,000 = ' +
      '$456,000/year, repeatable indefinitely, no exemption consumed.',
      'Unlimited exclusions stack on top: tuition paid DIRECTLY to the ' +
      'institution and medical expenses (including health insurance premiums) ' +
      'paid DIRECTLY to the provider are not gifts at all under §2503(e) — no ' +
      'dollar limit, no Form 709, and the annual exclusion remains fully ' +
      'available for the same donee. Reimbursing the child instead of paying ' +
      'the school/provider forfeits the exclusion.',
      '529 front-loading (§529(c)(2)(B)): a donor may elect to treat a lump 529 ' +
      'contribution as made ratably over five years — up to $95,000 per donor ' +
      '($190,000 per couple) per beneficiary in 2026 — moving years of ' +
      'tax-free-growth runway in one transaction. The election is made on ' +
      'Form 709; dying within the five years pulls the unratified portion back ' +
      'into the estate.',
      'Lifetime exemption gifts (§2505): larger gifts beyond the exclusions ' +
      'consume the $15M exemption but freeze value — all post-gift appreciation ' +
      'and income accrue outside the estate. With permanence, the discipline is ' +
      'to gift the RIGHT assets (high-basis, high-growth) rather than to gift ' +
      'fast.',
      'Basis is the governing trade-off: gifts take §1015 carryover basis ' +
      '(donee inherits the gain; for loss property, the loss-side basis is FMV ' +
      'at gift — the built-in loss simply evaporates), while assets held to ' +
      'death take a §1014 FMV basis. Gift cash and high-basis/high-growth ' +
      'assets; let a dying or elderly holder keep low-basis assets for the ' +
      'step-up.',
      'Income shifting rides along: gifted income-producing assets move future ' +
      'income to the donee\'s bracket — tempered by the kiddie tax for young ' +
      'donees ($2,700 unearned-income threshold in 2026).'
    ],
    authority: [
      { type: 'IRC', cite: 'IRC §2503(b)', note: 'The annual exclusion — $19,000 per donee for 2026 (indexed; see TSIQ.TABLES_2026.limits.gift). Present-interest gifts only; gifts in trust need Crummey-style withdrawal rights to qualify.' },
      { type: 'IRC', cite: 'IRC §2503(e)', note: 'Qualified transfers — tuition paid directly to the educational organization and medical payments made directly to the provider — are excluded without limit and without using the annual exclusion.' },
      { type: 'IRC', cite: 'IRC §529(c)(2)(B)', note: 'Five-year ratable-spread election for 529 contributions: up to 5× the annual exclusion per donor per beneficiary in one year, elected on Form 709.' },
      { type: 'IRC', cite: 'IRC §2513', note: 'Gift-splitting: a consenting spouse doubles every exclusion even when one spouse owns the gifted asset; requires a Form 709 signaling consent.' },
      { type: 'IRC', cite: 'IRC §2505; §2010(c)', note: 'Lifetime gift/estate exemption — $15,000,000 for 2026, made permanent and indexed by OBBBA (P.L. 119-21). No sunset; large-gift timing is a planning choice, not a deadline.' },
      { type: 'IRC', cite: 'IRC §1015', note: 'Carryover basis for gifts (FMV cap on the loss side) — the reason low-basis assets held by an elderly donor are usually better kept for the §1014 step-up.' },
      { type: 'IRC', cite: 'IRC §1014', note: 'FMV basis at death — the benchmark every proposed lifetime gift of appreciated property must beat.' },
      { type: 'Admin', cite: 'Form 709', note: 'Required for gifts over the annual exclusion, gift-splitting, the 529 five-year election, and GST allocations; due April 15 following the gift year. Adequate disclosure starts the statute of limitations on valuation.' }
    ],
    requirements: [
      'Donor retains comfortably enough assets and income for life expectancy, ' +
      'long-term care risk, and lifestyle — gifting is irrevocable.',
      'Present-interest delivery: outright transfers, UTMA/529 accounts, or ' +
      'trusts with properly administered withdrawal (Crummey) rights and ' +
      'contemporaneous notices.',
      'A basis review of every non-cash asset BEFORE it is gifted — basis, ' +
      'expected appreciation, and the donor\'s health/time horizon.',
      'Form 709 compliance where triggered (split gifts, 529 election, ' +
      'exemption gifts), with qualified appraisals for hard-to-value assets.',
      'Family readiness: donees (or their trusts) able to handle the money; ' +
      'trustee selection where control matters.'
    ],
    risks: [
      'Wrong-asset gifting: moving low-basis stock out of an 80-year-old\'s ' +
      'estate that would otherwise be fully wiped clean by the step-up can ' +
      'trade a 0% estate-tax problem for a 20%+ capital-gains problem. Model ' +
      'both sides before gifting appreciated property.',
      'Overshooting: irrevocable gifts plus a long-term-care event can leave ' +
      'the donor dependent; solve retention first, gifting second.',
      'Botched present-interest mechanics: gifts to trusts without withdrawal ' +
      'rights (or without actual Crummey notices) do not qualify for the ' +
      'exclusion and silently consume exemption.',
      'Missed filings: gift-splitting and the 529 five-year election both ' +
      'REQUIRE a Form 709 even when no tax is due; unfiled returns leave ' +
      'valuation open forever.',
      '529 front-load mortality risk: the donor dying within the five-year ' +
      'spread pulls the unallocated portion back into the estate.',
      'State exposure survives federal permanence: a dozen-plus states levy ' +
      'estate or inheritance taxes with far lower thresholds (Washington ' +
      'prominently among them; Idaho has none) — lifetime gifts can remove ' +
      'assets from a state estate-tax base even when federal tax is not in play.'
    ],
    bestFit: [
      'Estates above or growing toward the $15M/$30M federal exemption, where ' +
      'every excluded dollar and its future growth avoids a 40% marginal rate.',
      'Clients in state estate-tax jurisdictions (e.g., Washington) whose ' +
      'thresholds are a fraction of the federal exemption.',
      'Multi-generation families with many natural donees — children, their ' +
      'spouses, grandchildren — where the per-donee math multiplies.',
      'Clients holding cash or high-basis, high-growth assets to give, with ' +
      'education funding goals that 529 front-loading and direct tuition ' +
      'payments serve efficiently.'
    ],
    implementation: [
      'Build the donee map (children, spouses of children, grandchildren, ' +
      'others) and set the annual program amount; confirm donor retention needs ' +
      'with a lifetime cash-flow projection.',
      'Screen every non-cash asset for basis: gift cash/high-basis/high-growth; ' +
      'retain low-basis assets of older or ill donors for the §1014 step-up.',
      'Route education and medical support as §2503(e) direct payments to ' +
      'institutions and providers — never reimbursements — preserving the ' +
      'exclusions for other gifts.',
      'Fund 529s; where front-loading fits, make the §529(c)(2)(B) five-year ' +
      'election on Form 709.',
      'For minor or spendthrift donees, use UTMA, 2503(c) trusts, or Crummey ' +
      'trusts with documented withdrawal notices each gift.',
      'Calendar the program: gifts executed early each year (moves that year\'s ' +
      'growth too), Form 709 filed by April 15 where required, and an annual ' +
      'review against the indexed exclusion and exemption figures.'
    ]
  },

  client: {
    teaser: 'A quiet yearly routine that moves six figures to your family with zero tax — and compounds for decades',
    headline: 'Give it away on schedule — tax-free, every year',
    plainEnglish: [
      'The tax law lets each person give each recipient up to $19,000 every year with no tax, no paperwork, and no dent in your lifetime allowance. That sounds small until you multiply it. A married couple with three married kids and six grandkids has twelve people to give to — that is $456,000 every single year, completely tax-free. Do it for ten years and you have moved millions, plus all the growth those dollars earned along the way, out of your taxable estate.',
      'On top of that, tuition and medical bills you pay directly to the school or the hospital do not count as gifts at all — no limit. And college savings plans have a special feature that lets you deposit five years of gifts in one lump sum per grandchild, so the money starts growing tax-free sooner.',
      'One thing matters as much as how much you give: WHICH assets you give. Some assets are smarter to hand over now; others carry a built-in tax break for your heirs only if you keep them for life. We sort every asset into the right pile before anything moves.'
    ],
    analogy: 'Think of it as an annual harvest: every year the tax law lets you carry a certain amount out of the field free and clear — but only if you actually harvest it. Skip a year and that year\'s allowance is gone for good.',
    benefits: [
      'Six-figure annual transfers with zero gift tax for a typical multi-generation family',
      'All future growth on gifted dollars happens outside your taxable estate',
      'Unlimited extra room for tuition and medical bills paid directly',
      'Can sidestep state death taxes that kick in far below the federal level'
    ],
    steps: [
      'We map your family tree into a giving plan and confirm you keep more than enough for life',
      'We sort your assets — what to give now, what to keep for the tax break at death',
      'Gifts go out on a set schedule each year, structured properly for minors',
      'We handle any required filings and update the numbers annually as limits rise'
    ],
    considerations: [
      'Gifts are permanent — we size the program so your own security is never in question.',
      'Giving away the wrong asset can cost your heirs more in capital gains than it saves in estate tax, so asset selection comes before generosity.',
      'Some moves (splitting gifts with a spouse, the five-year college-fund deposit) require a gift-tax form even when no tax is owed — skipping it causes problems later.'
    ]
  },

  inputs: [],

  appliesTo: function (profile) {
    return true; // advisory — driven by estate size and family facts, not return inputs
  },

  apply: function (profile, params, yearIndex, state) {
    return { profile: profile, notes: yearIndex === 0
      ? ['Advisory strategy — appears in the plan documents but does not change the scenario math.']
      : [] };
  }
});
