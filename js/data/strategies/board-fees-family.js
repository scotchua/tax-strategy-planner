/* ============================================================================
 * STRATEGY: Board of Directors Fees for Family (C-Corp)
 * One source object → advisor view, client PDF, client slideshow.
 * ==========================================================================*/
window.TSIQ = window.TSIQ || {};
TSIQ.strategyModules = TSIQ.strategyModules || [];

TSIQ.strategyModules.push({
  id: 'board-fees-family',
  name: 'Board of Directors Fees for Family (C-Corp)',
  category: 'Payroll & Family',
  applyOrder: 39,
  modeled: false,
  character: 'permanent', // ET2

  advisor: {
    summary:
      'A C corporation that pays reasonable directors\' fees to family ' +
      'members who genuinely serve on the board — attending meetings, ' +
      'reviewing financials, voting on corporate actions — deducts the fees ' +
      'under §162 and shifts that income from the corporation (and ' +
      'ultimately the high-bracket owner) to lower-bracket family members. ' +
      'The honesty requirement cuts both ways: director fees are ' +
      'self-employment income to the recipient (Rev. Rul. 72-86), so the ' +
      'recipient owes SE tax on top of income tax — roughly 14.1% effective ' +
      '— which consumes much of the bracket arbitrage at modest fee levels. ' +
      'And directors must actually govern: minutes, prepared materials, real ' +
      'votes. Because the recipients\' returns are outside the modeled ' +
      'household and the net benefit is fee-level- and recipient-bracket- ' +
      'specific, this is advisory rather than modeled.',
    mechanics: [
      'Deduction side: directors\' fees are deductible under §162(a) as ' +
      'ordinary and necessary — IF reasonable in amount for governance ' +
      'services actually rendered. Benchmarks: what comparable small ' +
      'companies pay outside directors per meeting or per year.',
      'Recipient side: director fees are non-employee compensation — ' +
      'reported on Form 1099-NEC, and SE income under Rev. Rul. 72-86, so ' +
      'the recipient files Schedule SE. An adult child in the 12% bracket ' +
      'still nets roughly 26% combined on the fees — the shift only wins ' +
      'against a 37%-bracket owner plus the 21% corporate layer.',
      'Because director fees are compensation for services, they are EARNED ' +
      'income — never kiddie-taxed (§1(g) reaches only unearned income) — ' +
      'and they support IRA contributions for the recipient.',
      'The C-corp context matters: fees strip income out at the 21% entity ' +
      'rate before it is ever double-taxed as a dividend — the deduction ' +
      'avoids both the corporate tax and the eventual dividend tax on those ' +
      'dollars.',
      'Governance must be real: directors are elected, appear in the bylaws ' +
      'and minutes, receive board packages, attend and vote. A director who ' +
      'has never seen a financial statement is exhibit A for disallowance.',
      'Fees to minors are hard to defend as governance — this strategy fits ' +
      'adult family members (parents, adult children, siblings) with actual ' +
      'judgment to contribute.'
    ],
    authority: [
      { type: 'IRC', cite: 'IRC §162(a)', note: 'Deduction for directors\' fees — ordinary, necessary, and reasonable for services actually performed; unreasonable amounts are disallowed (and can be recharacterized as dividends in a C corp).' },
      { type: 'Admin', cite: 'Rev. Rul. 72-86', note: 'Directors\' fees are self-employment income — the recipient owes SE tax; model the shift net of it.' },
      { type: 'IRC', cite: 'IRC §1402(a)', note: 'SE income definition sweeping in a director\'s trade or business of serving on boards.' },
      { type: 'IRC', cite: 'IRC §11', note: 'The 21% corporate rate — the entity-level layer the deduction removes before dividend double-tax.' },
      { type: 'IRC', cite: 'IRC §1(g)', note: 'Kiddie tax reaches only unearned income — director fees for real services are earned income taxed at the recipient\'s own rates.' },
      { type: 'Admin', cite: 'Form 1099-NEC', note: 'Reporting for director fees of $600+ — non-employee compensation, not W-2 wages.' }
    ],
    requirements: [
      'A C corporation with a functioning board — bylaws providing for directors, elections documented, meetings actually held.',
      'Family directors with genuine capacity to govern (adults reviewing financials, voting on real corporate decisions).',
      'Fees benchmarked to what comparable companies pay outside directors, set by resolution before payment.',
      'Board minutes, meeting agendas, distributed board materials, and 1099-NEC reporting for each director.'
    ],
    risks: [
      'Recharacterization: in a C corp, excessive or service-free "fees" to shareholders\' relatives can be treated as constructive dividends — no deduction, still taxable to the recipient.',
      'The SE tax drag (Rev. Rul. 72-86) erodes the arbitrage — a fee shifted from a 37% owner to a 22%-bracket adult child nets far less than the bracket spread suggests once ~14.1% SE tax is added.',
      'Paper boards fail: no minutes, no materials, no votes means no services — disallowance plus accuracy penalties.',
      'Fees at levels far above small-company norms (a few hundred to a few thousand dollars per meeting) draw reasonableness challenges.',
      'Recipients may need quarterly estimates for the income and SE tax — a compliance cost on their side of the ledger.'
    ],
    bestFit: [
      'Closely held C corporations with adult family members who can contribute real oversight.',
      'High-bracket owners (35–37%) shifting income to family members in the 10–22% brackets.',
      'Families formalizing succession — a paid, working board is also a governance and training structure for the next generation.'
    ],
    implementation: [
      'Confirm the corporation\'s bylaws and elect the family directors properly; document in the corporate record book.',
      'Benchmark and set fees by board resolution (per-meeting or annual retainer) BEFORE payment; keep the comparables in the file.',
      'Run real meetings: agendas circulated in advance, financials reviewed, minutes recording attendance and votes.',
      'Pay fees by corporate check/transfer; issue Form 1099-NEC each January.',
      'Advise each recipient on Schedule SE and quarterly estimates; coordinate their IRA opportunities from the earned income.',
      'Revisit fee levels annually against the services actually delivered.'
    ]
  },

  client: {
    teaser: 'Pays family members for real oversight work — from company profits taxed at high rates to their much lower ones',
    headline: 'A real board of directors — staffed by family, paid by the company',
    plainEnglish: [
      'Every corporation is required to have a board of directors — the people who review the finances, weigh in on big decisions, and vote on the company\'s direction. Companies routinely pay their directors for this work, and those payments are a deductible business expense.',
      'If adult members of your family genuinely serve in that role — showing up to meetings, reading the numbers, voting — the company can pay them a fair directors\' fee. The company deducts it, and the income lands with family members whose tax rates are usually far lower than yours. Money that would have been taxed at the corporate level and again at your top rate instead gets taxed once, at their rate.',
      'Two honest notes. First, the recipients owe self-employment tax on director fees — that is the law, and we count it in the math before recommending anything. Second, the board work must be real and documented: actual meetings, actual minutes, fees in line with what small companies typically pay. Done right, it is both a tax strategy and a genuinely better-governed family business.'
    ],
    analogy: 'Instead of hiring outside advisors the company would have to pay anyway, you pay the family members already invested in the business\'s success — and the tax bill on that money shrinks with the move.',
    benefits: [
      'A business deduction for the company at fair, benchmarked fee levels',
      'Income shifted to family members in lower tax brackets',
      'The fees count as earned income — they can fund IRAs for the recipients',
      'Builds real governance and grooms the next generation'
    ],
    steps: [
      'We formalize the board and elect the family directors properly',
      'We benchmark fair fee levels and document them by resolution',
      'The board meets on a real schedule — we provide agenda and minutes templates',
      'We handle the year-end tax forms for each director'
    ],
    considerations: [
      'The recipients pay self-employment tax on the fees, which reduces the net benefit — we run the full family math first and only proceed if it clearly wins.',
      'The board service must be genuine: meetings, minutes, and fees that match the work. This is not a strategy for paper titles.'
    ]
  },

  inputs: [],

  appliesTo: function (profile) {
    return true;
  },

  apply: function (profile, params, yearIndex, state) {
    return { profile: profile, notes: yearIndex === 0
      ? ['Advisory strategy — appears in the plan documents but does not change the scenario math. The recipients\' returns (income tax plus SE tax on the fees) are outside the modeled household, so the net family benefit is computed off-model.']
      : [] };
  }
});
