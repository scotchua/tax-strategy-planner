/* ============================================================================
 * STRATEGY: 529 Education Savings (OBBBA Expansions)
 * One source object → advisor view, client PDF, client slideshow.
 * ==========================================================================*/
window.TSIQ = window.TSIQ || {};
TSIQ.strategyModules = TSIQ.strategyModules || [];

TSIQ.strategyModules.push({
  id: 'education-529',
  name: '529 Education Savings (OBBBA Expansions)',
  category: 'Payroll & Family',
  applyOrder: 29,
  modeled: true,
  character: 'permanent', // ET2

  advisor: {
    summary:
      'OBBBA (P.L. 119-21) substantially widened what a 529 plan can pay for ' +
      'tax-free: the K-12 annual withdrawal cap doubled to $20,000 for tax ' +
      'years beginning after 12/31/2025, the K-12 expense list expanded ' +
      '(tutoring, standardized testing fees, educational therapies for ' +
      'disabilities, curriculum materials) effective at enactment 7/4/2025, ' +
      'and 529 funds can now also pay for postsecondary CREDENTIALING — ' +
      'professional licenses, certifications, and continuing education — ' +
      'also effective at enactment. None of this changes federal income tax ' +
      'directly (529 growth was already tax-free for qualified withdrawals); ' +
      'the one genuinely NEW dollar-for-dollar number this tool computes is ' +
      'the STATE income tax deduction many (not all) states allow for 529 ' +
      'contributions, modeled off the client\'s entered flat state rate.',
    mechanics: [
      'Federal: contributions are never federally deductible; qualified ' +
      'withdrawals (tuition, K-12 up to the new $20,000/yr cap, room and ' +
      'board, books, and now postsecondary credentialing expenses) are ' +
      'federal-tax-free — no federal number moves either way from a 529 ' +
      'contribution or a qualified withdrawal.',
      'State deduction: many states allow a current-year income tax ' +
      'deduction (sometimes a credit) for contributions to the STATE\'S OWN ' +
      '529 plan, subject to a state-specific dollar cap this tool does not ' +
      'track — modeled here as contribution × the client\'s entered flat ' +
      'state rate, gated on confirming the state actually offers one.',
      'K-12 expansion (OBBBA §70414, amending §529(e)(3)(A)): the annual K-12 ' +
      'qualified-expense cap doubles from $10,000 to $20,000 for ' +
      'distributions in tax years beginning after 12/31/2025; the broader ' +
      'expense list itself (tutoring, standardized test fees, educational ' +
      'therapies, curriculum materials) took effect at enactment, 7/4/2025.',
      'Postsecondary credentialing (§529(c)(8)): 529 funds can now pay for ' +
      'programs leading to a recognized professional license, certification, ' +
      'or continuing education required to maintain one — tuition, exam ' +
      'fees, books, and required equipment, effective at enactment 7/4/2025.',
      '529-to-Roth rollover (SECURE 2.0 §126, not an OBBBA provision): up to ' +
      '$35,000 lifetime per beneficiary can roll from a 529 (open 15+ years, ' +
      'no contributions/earnings from the last 5 years) into the ' +
      'beneficiary\'s OWN Roth IRA, subject to the beneficiary\'s ordinary ' +
      'annual Roth contribution limit and earned-income requirement each year.',
      'Gift-tax front-loading: a single contributor may elect to treat a 529 ' +
      'contribution as made ratably over 5 years (§529(c)(2)(B)), allowing ' +
      'up to 5× the annual gift exclusion ($95,000 for 2026 at a single ' +
      '$19,000 exclusion) in one year without using estate exemption.'
    ],
    authority: [
      { type: 'IRC', cite: 'IRC §529(e)(3)(A) (OBBBA, P.L. 119-21 §70414)', note: 'K-12 qualified-expense annual cap doubled to $20,000 for tax years beginning after 12/31/2025.' },
      { type: 'IRC', cite: 'IRC §529(c)(8) (OBBBA, P.L. 119-21)', note: 'Qualified postsecondary credentialing expenses added as a 529 qualified expense, effective at enactment 7/4/2025.' },
      { type: 'IRC', cite: 'IRC §529(c)(3)(E) (SECURE 2.0 §126)', note: '529-to-Roth-IRA rollover: $35,000 lifetime cap per beneficiary, 15-year account-age requirement, 5-year no-recent-contribution rule.' },
      { type: 'IRC', cite: 'IRC §529(c)(2)(B)', note: '5-year gift-tax averaging election for a single large 529 contribution.' },
      { type: 'IRC', cite: 'IRC §2503(b); §2010(c)', note: 'Annual gift tax exclusion ($19,000 for 2026) underlying the 5-year front-loading math; permanent $15M (2026) estate/gift exemption for the broader estate plan.' }
    ],
    requirements: [
      'An open 529 account for the intended beneficiary (or one opened as part of this plan).',
      'For the state deduction: contributions generally must go to the CLIENT\'S OWN state\'s 529 plan — many states (a majority, in fact) offer no deduction at all, or only for in-state plans; verify before modeling.',
      'For the Roth rollover: the 529 account must be at least 15 years old with no contributions or earnings from the last 5 years rolled over, and the beneficiary needs earned income at least equal to the rollover amount that year.',
      'For postsecondary credentialing: the program must lead to a recognized credential, license, or required continuing education — general personal-enrichment courses do not qualify.'
    ],
    risks: [
      'Non-qualified withdrawals are taxed as ordinary income on the earnings portion PLUS a 10% penalty (§529(c)(6)) — do not oversize the account beyond realistic future qualified use.',
      'Not every state offers a 529 deduction, and many that do cap it well below the full contribution or restrict it to the in-state plan — verify the client\'s actual state rules before promising a number.',
      'The $35,000 lifetime Roth-rollover cap is modest relative to typical 529 balances — do not oversell it as a general escape hatch for leftover funds.',
      'The 5-year gift-tax-averaging election requires filing Form 709 and locks in the ratable-gift treatment even if the contributor dies during the 5-year period (with a pro-rated inclusion back into the estate).'
    ],
    bestFit: [
      'Families actively saving for K-12 tuition, college, or a professional credential, especially in a state offering a real 529 deduction.',
      'Grandparents or other family members wanting to front-load education gifting using the 5-year averaging election.',
      'Families with a 529 account old enough (15+ years) with genuinely leftover funds after education is complete, as a modest bridge into the beneficiary\'s own Roth IRA.'
    ],
    implementation: [
      'Confirm the client\'s state 529 deduction rules (whether one exists, the dollar cap, and whether it requires the in-state plan) before modeling any state tax benefit.',
      'Size annual contributions against realistic future K-12 (now $20,000/yr cap), college, and credentialing costs — do not oversize for the (modest) Roth-rollover escape hatch.',
      'For a large single contribution, file Form 709 to elect the 5-year gift-tax averaging treatment.',
      'For families using 529 funds for K-12 tuition, confirm which expenses beyond tuition qualify under the expanded post-OBBBA list.',
      'For a Roth rollover, confirm the account\'s 15-year age and the absence of contributions/earnings from the last 5 years before initiating the trustee-to-trustee transfer.'
    ]
  },

  client: {
    teaser: 'A tax-smart way to save for school — kindergarten through a professional license',
    headline: 'Save for school (K-12 through professional credentials) with a real tax edge',
    plainEnglish: [
      'A 529 account lets money grow tax-free for education, and recent law changes made it useful for a lot more than just college. You can now use it for private K-12 tuition and related costs up to a higher yearly amount, and — new — for programs that lead to a professional license or certification, not just a traditional degree.',
      'Many states also give you a tax break in the year you contribute, on top of the federal tax-free growth. That state benefit varies a lot by where you live, so we check your specific state\'s rules before counting on it.',
      'If you end up with money left over after all the schooling is paid for, a portion can even move into the beneficiary\'s own retirement account later in life, tax-free — a nice bonus, though the amount allowed is modest, so it is not a reason to overfund the account.'
    ],
    analogy: 'Think of it as a savings account with a discount stapled to the front — money grows tax-free like always, and many states also knock a little off this year\'s tax bill just for putting money in.',
    benefits: [
      'Tax-free growth for K-12, college, and now professional credentialing expenses',
      'A possible state tax deduction in the year you contribute (state rules vary)',
      'A higher annual K-12 spending cap under recent law changes',
      'Unused funds can eventually help fund the beneficiary\'s own retirement, within limits'
    ],
    steps: [
      'We confirm your state\'s specific 529 deduction rules before counting on any tax benefit',
      'We help size contributions to your real, expected education costs',
      'We handle the paperwork for a large one-time gift if you want to front-load several years at once',
      'We revisit the account each year as costs and rules change'
    ],
    considerations: [
      'Money taken out for anything other than qualified education costs owes tax plus a 10% penalty on the growth — so we size the account to realistic future use.',
      'The tax break for putting money in a 529 depends entirely on your state — some offer a real deduction, many offer none at all, so we check first before promising a number.'
    ]
  },

  inputs: [
    { key: 'contribution', label: 'Annual 529 contribution', type: 'currency', default: 10000 },
    { key: 'stateDeduction', label: 'Does the client\'s state offer a 529 contribution deduction?', type: 'select', default: 'yes',
      options: [{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No (most states with no state income tax, or no 529 deduction)' }] }
  ],

  suggest: function (p) {
    if (!(p.kidsCTC > 0 || p.otherDeps > 0)) return null;
    return { reason: 'Dependents present — check whether K-12, college, or credentialing funding through a 529 plan (and the client\'s state deduction rules) is already part of the plan.' };
  },

  appliesTo: function (profile) {
    return true; // validated in apply(): needs a positive contribution
  },

  /**
   * The ONLY quantified effect: a state-only deduction (stateOnlyDeduction)
   * equal to the contribution, reducing the STATE tax base while leaving
   * federal AGI untouched (529 contributions are never federally
   * deductible) — gated on the advisor confirming the state actually offers
   * one. Everything else in the advisor/client text (K-12 cap, postsecondary
   * credentialing, Roth rollover, gift-tax averaging) is federal-side
   * informational content with no per-dollar number this engine can compute.
   */
  apply: function (profile, params, yearIndex, state) {
    var p = Object.assign({}, profile);
    var notes = [];
    if (yearIndex !== 0) return { profile: p, notes: notes };

    var contribution = params.contribution || 0;
    if (contribution <= 0) {
      notes.push('No contribution amount entered — nothing to model.');
      return { profile: p, notes: notes };
    }
    if (params.stateDeduction !== 'yes') {
      notes.push(TSIQ.fmt.usd(contribution) + ' contributed — no state deduction modeled per the ' +
        'advisor\'s entry (many states offer none, or restrict it to the in-state plan). Federal ' +
        'tax is unaffected either way (529 contributions are never federally deductible); growth ' +
        'and qualified withdrawals — K-12 up to $20,000/yr, college, and now postsecondary ' +
        'credentialing expenses — remain federal-tax-free.');
      return { profile: p, notes: notes };
    }
    if (!(p.stateRate > 0)) {
      notes.push(TSIQ.fmt.usd(contribution) + ' contributed — no state income tax entered, so ' +
        'there is no state deduction to model (states with no income tax also generally have no ' +
        '529 deduction to offer).');
      return { profile: p, notes: notes };
    }
    p.stateOnlyDeduction = (p.stateOnlyDeduction || 0) + contribution;
    notes.push(TSIQ.fmt.usd(contribution) + ' contributed, modeled as fully deductible against ' +
      'STATE tax only (federal is never affected) at the entered ' + TSIQ.fmt.pct(p.stateRate) +
      ' rate — verify the client\'s actual state caps this deduction (most states that offer one ' +
      'cap it well below an unlimited amount, and often restrict it to the in-state plan).');
    notes.push('Federal side (informational, not quantified): K-12 withdrawals up to $20,000/yr, ' +
      'postsecondary credentialing expenses, and a $35,000 lifetime 529-to-Roth rollover option ' +
      '(SECURE 2.0 §126, subject to a 15-year account age and the beneficiary\'s own Roth limits) ' +
      'are all available federal-tax-free.');
    return { profile: p, notes: notes };
  }
});
