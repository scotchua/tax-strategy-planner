/* ============================================================================
 * STRATEGY: ESOP Exit with §1042 Rollover
 * One source object → advisor view, client PDF, client slideshow.
 * ==========================================================================*/
window.TSIQ = window.TSIQ || {};
TSIQ.strategyModules = TSIQ.strategyModules || [];

TSIQ.strategyModules.push({
  id: 'esop-exit',
  name: 'ESOP Exit with §1042 Rollover',
  category: 'Succession & Exit',
  applyOrder: 92,
  modeled: false,
  character: 'permanent', // ET2

  advisor: {
    summary:
      'An employee stock ownership plan buys out the owner at appraised fair ' +
      'market value, and §1042 lets a C-corporation seller defer 100% of the gain ' +
      'by reinvesting in qualified replacement property (QRP) within the ' +
      'replacement window. Basis carries over from the sold stock to the QRP, and ' +
      'if the seller holds the QRP until death the §1014 step-up erases the ' +
      'deferred gain permanently. Separately, an S-corporation ESOP is a powerful ' +
      'operating structure: the ESOP\'s share of S-corp income is exempt from UBIT ' +
      'under §512(e)(3), so a 100% ESOP-owned S corp pays no federal income tax at ' +
      'the entity or shareholder level — but §1042 is available only for C-corp ' +
      'stock, so sellers must choose between the two benefits (or sequence them).',
    mechanics: [
      '§1042 election: the seller of qualified employer securities (domestic ' +
      'C-corp stock, no public market, held 3+ years) elects nonrecognition to ' +
      'the extent proceeds are reinvested in QRP within the window running from ' +
      '3 months before to 12 months after the sale. Immediately after the sale, ' +
      'the ESOP must own at least 30% of the company\'s stock (§1042(b)).',
      'QRP is stock or bonds of domestic operating corporations (not more than ' +
      '25% passive income, not the sponsor); many sellers use long-maturity ' +
      '"ESOP floating-rate notes" as permanent QRP and borrow against them, ' +
      'keeping the deferral intact while accessing liquidity.',
      'Basis mechanics: the deferred gain reduces basis in the QRP (§1042(d)), ' +
      'so selling QRP triggers the gain. Holding QRP until death converts the ' +
      'deferral into permanent exclusion via the §1014 basis step-up.',
      'Anti-double-dip rules: under §409(n), §1042 sellers, 25%+ shareholders, ' +
      'and certain family members are barred from receiving allocations of the ' +
      '§1042 shares inside the ESOP; violations trigger the §4979A 50% excise tax.',
      'S-corp ESOP economics: the ESOP trust is a tax-exempt shareholder whose ' +
      'share of pass-through income escapes UBIT (§512(e)(3)), so a 100% ' +
      'ESOP-owned S corp pays no federal income tax on operating earnings — ' +
      'a permanent cash-flow advantage for reinvestment and debt service. ' +
      '§409(p) polices this: if "disqualified persons" (measured by deemed-owned ' +
      'shares and synthetic equity) own 50%+ in a "nonallocation year," brutal ' +
      'excise taxes and deemed distributions apply.',
      'The company funds the buyout with deductible contributions (and, in ' +
      'leveraged ESOPs, deductible loan repayments) — effectively buying out the ' +
      'owner with pre-tax dollars, subject to §404 contribution limits.'
    ],
    authority: [
      { type: 'IRC', cite: 'IRC §1042', note: 'Gain deferral on sale of C-corp qualified securities to an ESOP owning 30%+ after the sale, with reinvestment in qualified replacement property within the 3-month-before/12-month-after window; §1042(d) carries the deferred gain into QRP basis.' },
      { type: 'IRC', cite: 'IRC §512(e)', note: 'S-corp interests held by exempt organizations generally generate UBIT — but §512(e)(3) exempts ESOP-held S-corp stock, the provision that makes the 100% ESOP-owned S corp federally income-tax-free.' },
      { type: 'IRC', cite: 'IRC §409(p)', note: 'S-corp ESOP anti-abuse: prohibited allocations to disqualified persons in a nonallocation year (50%+ concentration counting synthetic equity) trigger deemed distributions and the §4979A excise tax.' },
      { type: 'IRC', cite: 'IRC §409(n)', note: 'No allocation of §1042 shares to the seller, 25%+ shareholders, or their family — the price of the seller\'s deferral.' },
      { type: 'IRC', cite: 'IRC §4979A', note: '50% excise tax enforcing the §409(n)/§409(p) prohibited-allocation rules.' },
      { type: 'IRC', cite: 'IRC §401(a)(28)(C)', note: 'Annual valuation of non-publicly-traded employer securities by an independent appraiser — the recurring compliance backbone of every ESOP.' },
      { type: 'IRC', cite: 'IRC §1014', note: 'Step-up at death eliminates the §1042 deferred gain embedded in QRP held until death.' },
      { type: 'Reg', cite: 'Reg. §1.1042-1T', note: 'Election mechanics: statement of election with the timely return, corporate consent to the §4978/§4979A excise-tax regime, and notarized statement of purchase for each QRP item.' }
    ],
    requirements: [
      'For §1042: domestic C-corp stock (not readily tradable), held 3+ years, ' +
      'not acquired from a qualified plan or via compensatory options; ESOP owns ' +
      '30%+ immediately after the sale; QRP purchased within the statutory ' +
      'window and the election properly filed.',
      'A sustainable company: ESOP debt service, ongoing administration ' +
      '($15k–$50k+/yr), annual independent appraisals, and the repurchase ' +
      'obligation all come out of future cash flow.',
      'An independent trustee and appraiser establishing that the ESOP pays no ' +
      'more than fair market value (ERISA adequate-consideration standard).',
      'Workforce large and stable enough for a qualified plan to make sense — ' +
      'ESOPs rarely pencil below roughly 20–25 employees.',
      'For the S-corp ESOP tax exemption: §409(p) testing must pass every year, ' +
      'counting synthetic equity (options, SARs, deferred comp) against ' +
      'disqualified-person concentration.'
    ],
    risks: [
      'Valuation is the #1 exam and litigation issue — DOL and IRS both police ' +
      'ESOPs that overpaid; an independent, well-documented appraisal and a ' +
      'genuinely independent trustee are non-negotiable.',
      'The repurchase obligation is a real, growing liability: the company must ' +
      'buy back shares from departing employees at appraised value, forever. ' +
      'Unfunded repurchase obligations sink mature ESOPs.',
      'C vs S tension: §1042 requires C-corp stock, while the §512(e)(3) ' +
      'income-tax exemption requires S status. A common sequence — sell as a ' +
      'C corp with §1042, then elect S later — works, but the §1374 built-in ' +
      'gains period and plan design need coordination.',
      '§409(p) failure in an S-corp ESOP is catastrophic (deemed distributions, ' +
      '50% excise on prohibited allocations and synthetic equity) — annual ' +
      'testing is mandatory, especially with management incentive equity.',
      'Selling or disposing of QRP recognizes the deferred gain (limited ' +
      'exceptions: death, gift does NOT qualify — gifts of QRP trigger ' +
      'recognition); portfolio management inside QRP is constrained.',
      'Transaction cost: feasibility study, trustee, appraiser, plan counsel, and ' +
      'lender fees commonly run well into six figures — this is a $2M+ ' +
      'enterprise-value tool.'
    ],
    bestFit: [
      'Owners of profitable, stable C corps (or S corps willing to plan around ' +
      'the C/S sequencing) with strong management benches and 20+ employees.',
      'Sellers with large embedded gains who value deferral and are old enough ' +
      'that holding QRP until death (permanent exclusion) is a realistic plan.',
      'Owners who want a legacy exit — selling to employees at full appraised ' +
      'value without auctioning the company to a competitor or private equity.',
      'Companies that can redeploy the federal income tax an S-corp ESOP stops ' +
      'paying into debt service and growth.'
    ],
    implementation: [
      'Commission a feasibility study: valuation range, debt capacity, ' +
      'contribution limits (§404), repurchase-obligation forecast, and whether ' +
      '§1042 (C corp) or the S-corp exemption is the priority.',
      'Assemble the team: independent trustee, independent appraiser, ERISA ' +
      'counsel, and lender; design the plan document and the transaction ' +
      '(leveraged vs installment).',
      'Close the sale with the ESOP owning 30%+ (for §1042); document the ' +
      'trustee\'s adequate-consideration file.',
      'For §1042: purchase QRP within the window (3 months before to 12 months ' +
      'after); file the statement of election with the timely return, corporate ' +
      'consent, and notarized statement of purchase (Reg. §1.1042-1T).',
      'Implement §409(n) allocation restrictions in plan administration; if/when ' +
      'S status is elected, run §409(p) testing annually before any equity or ' +
      'synthetic-equity grants.',
      'Calendar the annual independent appraisal (§401(a)(28)(C)), Form 5500 ' +
      'filings, and a standing repurchase-obligation study every 2–3 years.'
    ]
  },

  client: {
    teaser: 'Sell your company, pay no capital gains tax now — possibly ever — and reward the team that built it',
    headline: 'Sell to your employees, defer the tax, keep the legacy',
    plainEnglish: [
      'When you sell your company, capital gains tax usually takes a large bite the moment the deal closes. There is a different kind of buyer that changes that: an employee ownership trust set up for your own team. You sell at a price set by an independent appraiser, and a special tax rule lets you roll the sale money into a portfolio of stocks and bonds without paying capital gains tax on the sale.',
      'That tax bill is not just delayed — with the right planning, it can disappear. If you hold the replacement investments for the rest of your life, current law wipes out the deferred gain when your estate passes to your heirs. You got full price for the business, and the capital gains tax on the sale was never paid.',
      'There is a second prize, too. Once the company is fully owned by the employee trust and set up the right way, it generally stops paying federal income tax on its profits. That extra cash flow helps the company pay off the buyout and grow — and your employees end up owning the place where they work.'
    ],
    analogy: 'It is like trading your company for a diversified portfolio in a way the tax system treats as "you never really sold" — and if you hold that portfolio for life, the tax meter never comes back on.',
    benefits: [
      'Full appraised value for your company, paid to you',
      'Capital gains tax deferred — and eliminated entirely if you hold the replacement investments for life',
      'The company can become largely federal-income-tax-free going forward, powering the buyout',
      'Your employees become owners; the business and jobs stay put'
    ],
    steps: [
      'We run a feasibility study — value, financing, and whether your company is a good fit',
      'An independent trustee and appraiser are brought in to set and protect the price',
      'The sale closes and we reinvest your proceeds within the required window',
      'We handle the tax elections and set up the annual compliance calendar'
    ],
    considerations: [
      'This is a serious transaction with real setup and ongoing costs — it fits established, profitable companies, usually with 20 or more employees.',
      'The company takes on a lasting obligation to buy back shares from employees who leave or retire; we plan and fund for that from day one.',
      'The tax deferral has strict rules — the reinvestment window, what you can buy, and what you and your family can receive from the plan — so the paperwork and timing must be exact.'
    ]
  },

  inputs: [],

  appliesTo: function (profile) {
    return true; // advisory — feasibility depends on entity, size, and workforce facts
  },

  apply: function (profile, params, yearIndex, state) {
    return { profile: profile, notes: yearIndex === 0
      ? ['Advisory strategy — appears in the plan documents but does not change the scenario math.']
      : [] };
  }
});
