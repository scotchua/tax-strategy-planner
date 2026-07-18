/* ============================================================================
 * STRATEGY: Charitable Remainder Trust for Appreciated Assets (§664)
 * ADVISORY — value depends on payout design, §7520 rate, and charitable intent.
 * ==========================================================================*/
window.TSIQ = window.TSIQ || {};
TSIQ.strategyModules = TSIQ.strategyModules || [];

TSIQ.strategyModules.push({
  id: 'crt',
  name: 'Charitable Remainder Trust for Appreciated Assets',
  category: 'Income Timing & Character',
  applyOrder: 9,
  modeled: false,
  character: 'permanent', // ET2

  advisor: {
    summary:
      'A §664 charitable remainder trust converts a low-basis appreciated asset ' +
      'into a lifetime (or term) income stream without a taxable sale. The donor ' +
      'contributes the asset to the CRT; the trust — exempt from income tax under ' +
      '§664(c) — sells it and recognizes no gain, reinvesting 100% of the ' +
      'proceeds. The donor receives an annuity (CRAT) or a fixed percentage of ' +
      'annually revalued assets (CRUT), taxed under the four-tier worst-in-' +
      'first-out ordering of §664(b): ordinary income first, then capital gain, ' +
      'then other/tax-exempt income, then tax-free basis. A partial charitable ' +
      'deduction equals the actuarial remainder value, which must be at least ' +
      '10% of the contribution. Timing is the critical exam issue: the asset ' +
      'must be contributed BEFORE any binding sale obligation exists, or ' +
      'assignment-of-income doctrine taxes the gain to the donor anyway. ' +
      'Commonly paired with an irrevocable life insurance trust ("wealth ' +
      'replacement") so heirs are made whole for the remainder passing to ' +
      'charity.',
    mechanics: [
      'No gain on sale: the CRT is tax-exempt (§664(c)); it sells the ' +
      'appreciated asset and reinvests the full pre-tax proceeds. The gain is ' +
      'not eliminated — it is deferred and distributed over the payout term ' +
      'through the four-tier ordering.',
      'Four-tier WIFO taxation of distributions (§664(b)): (1) ordinary ' +
      'income (current + accumulated), (2) capital gains, (3) other income ' +
      '(e.g., tax-exempt), (4) return of corpus. The trapped LTCG typically ' +
      'flows out in tier 2 over many years — spreading and often lowering the ' +
      'rate versus a lump-sum sale.',
      'CRUT vs. CRAT: a unitrust pays a fixed percentage (5%–50%) of assets ' +
      'revalued annually — payments grow with the portfolio and additional ' +
      'contributions are allowed. An annuity trust pays a fixed dollar amount ' +
      'set at funding — no additions, and it must pass the 5% probability-of-' +
      'exhaustion test. CRUTs dominate in practice, especially in low-§7520 ' +
      'environments.',
      'Deduction: present value of the charitable remainder (Form 5227 ' +
      'regime; §170(f)(2)(A)), computed with the §7520 rate; the remainder ' +
      'must be ≥10% of initial FMV (§664(d)(1)(D) CRAT / §664(d)(2)(D) CRUT). ' +
      'Appreciated-stock contributions are subject to the 30%-of-AGI ceiling ' +
      'with a 5-year carryforward.',
      'Funding timing: contribute before any legally binding sale agreement. ' +
      'Under the anticipatory assignment-of-income doctrine, a donor who ' +
      'contributes after the sale is effectively locked in is taxed on the ' +
      'gain personally; Rev. Rul. 78-197 frames the bright line — proceeds are ' +
      'taxed to the donor only if the charity/trust is legally bound to sell ' +
      'at the time of the gift. LOIs, shareholder votes, and signed purchase ' +
      'agreements before funding are the danger zone.',
      'Wealth replacement: the income stream (or the tax saved) funds premiums ' +
      'on survivorship life insurance inside an ILIT sized to the remainder — ' +
      'heirs receive insurance proceeds estate-tax-free; charity receives the ' +
      'trust remainder.'
    ],
    authority: [
      { type: 'IRC', cite: 'IRC §664', note: 'The CRT regime: qualification requirements, CRAT/CRUT payout rules (5%–50%), and the 10% minimum remainder tests (§664(d)).' },
      { type: 'IRC', cite: 'IRC §664(b)', note: 'Four-tier ordering of distributions — ordinary income, capital gain, other income, corpus (worst-in, first-out).' },
      { type: 'IRC', cite: 'IRC §664(c)', note: 'The trust itself is exempt from income tax (UBTI is subject to a 100% excise tax rather than disqualification).' },
      { type: 'IRC', cite: 'IRC §170(f)(2)(A); §170(b)(1)(C)', note: 'Deduction limited to the remainder interest\'s actuarial value; appreciated long-term property deductions capped at 30% of AGI with 5-year carryforward.' },
      { type: 'IRC', cite: 'IRC §7520', note: 'The actuarial rate (120% of the midterm AFR) used to value the remainder — the rate environment materially changes the deduction and feasibility.' },
      { type: 'Admin', cite: 'Rev. Rul. 78-197', note: 'Assignment-of-income bright line — gain taxed to the donor only where the donee is legally bound (or can be compelled) to complete the sale at the time of the gift.' },
      { type: 'Admin', cite: 'Form 5227', note: 'Split-interest trust annual information return; distributions reported to the beneficiary on Schedule K-1.' }
    ],
    requirements: [
      'A highly appreciated, marketable (or readily salable) asset — low-basis stock, real estate free of mortgages (debt-financed property creates UBTI problems), or a business interest without a binding buyer.',
      'Funding completed BEFORE any binding sale obligation — document the state of negotiations at the contribution date.',
      'Payout between 5% and 50% AND an actuarial remainder of at least 10% of contributed value at the §7520 rate.',
      'Genuine charitable intent — the remainder is real money that goes to charity, not a fee for tax deferral.',
      'A trustee (or co-trustee arrangement) able to administer valuations, the four-tier accounting, and Form 5227 annually.'
    ],
    risks: [
      'Assignment of income is the signature exam issue: fund after a deal is effectively done and the entire gain lands back on the donor\'s return — timing documentation is the defense.',
      'Irrevocability: the asset is gone; only the payout stream remains. Changed family circumstances cannot unwind it.',
      'The 10% remainder and (for CRATs) the 5% exhaustion test can fail at drafting — a disqualified trust means no deduction and a taxable sale.',
      'Tier-1 trap: if the trustee invests for ordinary income, distributions carry out ordinary income first — investment policy drives the beneficiary\'s tax rate.',
      'UBTI (including debt-financed income) draws a 100% excise tax on that income (§664(c)(2)) — mortgaged real estate needs restructuring before contribution.',
      'Beneficiary outliving projections (CRUT) or portfolio underperformance (CRAT) changes the economics; model conservatively.'
    ],
    bestFit: [
      'Charitably inclined clients holding low-basis concentrated stock or appreciated real estate ahead of a contemplated (but not yet binding) sale.',
      'Pre-retirees who want to convert a non-income-producing asset into a lifetime income stream.',
      'Clients facing a one-time liquidity event who want gain spread over decades instead of one 20%+NIIT year.',
      'Families using the insurance-replacement pairing so charity and heirs both receive full value.'
    ],
    implementation: [
      'Confirm no binding sale obligation exists; memorialize the negotiation status in the file BEFORE funding.',
      'Model CRUT vs. CRAT payouts, the §7520-rate deduction, and the four-tier income projection against a lump-sum sale in this tool\'s scenarios.',
      'Estate counsel drafts the trust (payout rate sized to pass the 10% remainder test); obtain qualified appraisals for non-marketable assets.',
      'Fund the trust; the trustee sells and reinvests; claim the deduction (30%-of-AGI ceiling, Form 8283 for property).',
      'If replacing wealth for heirs, establish the ILIT and fund premiums from the payout stream.',
      'File Form 5227 and issue the K-1 annually; monitor the four-tier accounts and investment policy.'
    ]
  },

  client: {
    teaser: 'Sells a big winner without the big tax bill — and pays you for life',
    headline: 'Turn a big winner into lifetime income — without selling it the hard way',
    plainEnglish: [
      'Selling something that has grown enormously — company stock, a rental property, land — normally hands a large slice straight to the IRS before you can reinvest a dime. A charitable remainder trust is a way to sell it with no tax due at the sale, so the entire value goes to work for you.',
      'Here\'s how it flows: you place the asset into a special trust you set up. The trust sells it — tax-free — and reinvests everything. The trust then pays you an income every year for life (or a set number of years). When the trust ends, what remains goes to a charity you choose.',
      'You also get a charitable deduction the year you fund it, and you spread the tax on the gain over many years of payments instead of one painful bill. Many families use part of the income to fund a life insurance policy so their children ultimately receive just as much — the charity\'s share comes from the tax savings, not from the kids.'
    ],
    analogy: 'Instead of harvesting the whole orchard at once and losing a big share to tax, you donate the orchard to a foundation that pays you from every future harvest — and the trees never stop working for you.',
    benefits: [
      'No tax at the sale — 100% of the asset\'s value is reinvested for you',
      'A dependable income stream for life or a term you choose',
      'An immediate charitable deduction in the year you fund it',
      'A meaningful legacy gift, with insurance planning available so heirs are made whole'
    ],
    steps: [
      'We model your income stream, deduction, and tax savings against a straight sale',
      'An estate attorney we coordinate with drafts the trust to fit your goals',
      'The trust receives the asset, sells it tax-free, and reinvests the proceeds',
      'You receive payments every year; we handle the trust\'s tax filings'
    ],
    considerations: [
      'Timing is everything: the trust must own the asset before any sale is locked in — tell us before you sign anything, even a letter of intent.',
      'The gift is permanent — the asset belongs to the trust, and the remainder truly goes to charity, so this fits people who genuinely want to give.',
      'The yearly payments are taxable as you receive them — the tax is spread out and often lower, not erased.'
    ]
  },

  inputs: [],

  appliesTo: function (profile) {
    return true;
  },

  apply: function (profile, params, yearIndex, state) {
    return { profile: profile, notes: yearIndex === 0
      ? ['Advisory strategy — appears in the plan documents but does not change the scenario math. ' +
         'CRT economics (deduction, four-tier payout taxation) depend on payout design and the §7520 rate — model separately with dedicated software before presenting numbers.']
      : [] };
  }
});
