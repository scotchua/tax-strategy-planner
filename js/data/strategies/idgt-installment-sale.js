/* ============================================================================
 * STRATEGY: Installment Sale to an IDGT (Succession)
 * ADVISORY — estate-freeze structure; value not computable from return inputs.
 * ==========================================================================*/
window.TSIQ = window.TSIQ || {};
TSIQ.strategyModules = TSIQ.strategyModules || [];

TSIQ.strategyModules.push({
  id: 'idgt-installment-sale',
  name: 'Installment Sale to an IDGT (Succession)',
  category: 'Income Timing & Character',
  applyOrder: 8,
  modeled: false,
  character: 'timing', // ET2

  advisor: {
    summary:
      'The owner sells appreciating assets (business interests, real estate) to ' +
      'an intentionally defective grantor trust in exchange for an installment ' +
      'note bearing interest at the AFR. Because the trust is a grantor trust ' +
      'for income tax but outside the estate for transfer tax, the sale is a ' +
      'non-event for income tax — Rev. Rul. 85-13 treats grantor and trust as ' +
      'the same taxpayer, so no gain on the sale and note interest is neither ' +
      'income nor deduction. The estate value is FROZEN at the note; all ' +
      'appreciation above the AFR accrues to the trust beneficiaries transfer-' +
      'tax-free, and the grantor\'s continued payment of the trust\'s income tax ' +
      'is an additional tax-free wealth shift (Rev. Rul. 2004-64). OBBBA\'s ' +
      'permanent $15M exemption reduces the urgency for mid-size estates, but ' +
      'freezing remains valuable for high-growth assets that will outrun even ' +
      'the indexed exemption. Trade-off: assets sold to the trust take carryover ' +
      'basis — no §1014 step-up at death (Rev. Rul. 2023-2 confirms no step-up ' +
      'for non-includible grantor trust assets) — so low-basis assets carry a ' +
      'built-in income tax cost the freeze must outweigh.',
    mechanics: [
      'Structure: grantor creates the IDGT with a deliberate grantor-trust ' +
      'trigger (commonly the §675(4)(C) power to substitute assets) that makes ' +
      'the trust "defective" for income tax while keeping it out of the gross ' +
      'estate.',
      'Seed gift: the trust is funded with a gift — customarily around 10% of ' +
      'the intended purchase price — so the trust has independent substance and ' +
      'the note is respected as debt rather than a retained equity interest ' +
      '(a §2036 inclusion risk if the trust is a mere shell).',
      'The sale: assets are sold at appraised fair market value for an ' +
      'installment note at the applicable federal rate (§1274(d) / §7872). ' +
      'Interest-only with a balloon is common. No gain is recognized and no ' +
      'interest income/deduction arises while grantor status holds ' +
      '(Rev. Rul. 85-13).',
      'The freeze: the estate holds a note fixed at principal + AFR; growth ' +
      'above the AFR accumulates in the trust for the beneficiaries. With ' +
      'discounted valuations of minority/nonvoting interests, the shifted ' +
      'value can substantially exceed the nominal note.',
      'The tax "burn": the grantor pays income tax on all trust income — not ' +
      'a gift (Rev. Rul. 2004-64) — shrinking the taxable estate further while ' +
      'the trust compounds pre-tax.',
      'Basis trade-off: trust assets keep carryover basis; if grantor status ' +
      'ends or death occurs, planning is needed (note balance vs. remaining ' +
      'basis; possible swap of high-basis assets back into the estate via the ' +
      'substitution power to capture the §1014 step-up on the right assets).'
    ],
    authority: [
      { type: 'Admin', cite: 'Rev. Rul. 85-13', note: 'Grantor and grantor trust are the same taxpayer — a sale between them is ignored for income tax: no gain, no interest income/deduction.' },
      { type: 'IRC', cite: 'IRC §§671–679', note: 'Grantor trust rules — the deliberate trigger (e.g., §675(4)(C) substitution power) that makes the trust defective for income tax only.' },
      { type: 'Admin', cite: 'Rev. Rul. 2004-64', note: 'Grantor\'s payment of the trust\'s income tax is not an additional gift — the "tax burn" that accelerates the wealth shift.' },
      { type: 'IRC', cite: 'IRC §1274(d); §7872', note: 'The note must bear at least the AFR to avoid imputed-gift recharacterization of below-market loans.' },
      { type: 'IRC', cite: 'IRC §2036', note: 'The inclusion risk: an undercapitalized trust or retained control can pull the transferred assets back into the gross estate — the reason for the seed gift and arm\'s-length note terms.' },
      { type: 'Admin', cite: 'Rev. Rul. 2023-2', note: 'No §1014 basis step-up at death for grantor-trust assets not includible in the gross estate — the carryover-basis cost of the freeze.' },
      { type: 'IRC', cite: 'IRC §2010 (as amended by OBBBA, P.L. 119-21)', note: 'Basic exclusion $15M per person, PERMANENT and indexed — resets the math on who needs a freeze at all.' }
    ],
    requirements: [
      'An estate realistically expected to exceed the $15M/person (indexed) exemption — or high-growth assets on a path to exceed it.',
      'A qualified appraisal of the assets sold (business valuation with any minority/marketability discounts defensibly supported).',
      'A seed gift (~10% of the purchase price is the customary practice benchmark, not a statutory safe harbor) reported on a gift tax return with adequate disclosure.',
      'A real note: AFR or better, enforced payment schedule, and actual payments made — serviced by trust cash flow (distributions from the business interest sold).',
      'Estate counsel drafting the trust; this is a coordinated attorney/CPA/appraiser project.'
    ],
    risks: [
      '§2036 inclusion if the trust lacks substance (thin seed, missed payments, retained control) — the entire asset returns to the estate at date-of-death value.',
      'Valuation exam risk: discounts on closely-held interests are the primary IRS attack; adequate-disclosure gift reporting starts the statute of limitations.',
      'Carryover basis: heirs inherit the trust\'s low basis — for low-basis, low-growth assets the lost §1014 step-up can exceed the estate tax saved. Model both taxes before committing.',
      'Death before the note is repaid creates unsettled income-tax questions on the unpaid note — structure to retire the note during life where possible.',
      'Grantor status must be maintained (and the income tax burn afforded) — turning it off mid-stream can trigger gain to the extent the note exceeds basis.',
      'OBBBA\'s permanent exemption means a freeze sized for the old sunset math may be unnecessary complexity for estates under ~$30M (married) — rerun the numbers before recommending.'
    ],
    bestFit: [
      'Owners of rapidly appreciating businesses or real estate whose estates will exceed the exemption despite its permanence.',
      'Clients with cash-flowing assets that can service the note (distributions cover interest).',
      'Families already committed to succession — the trust doubles as the governance vehicle for the next generation.',
      'Clients who can comfortably keep paying the trust\'s income tax (the burn is a feature, not a bug).'
    ],
    implementation: [
      'Model the estate with and without the freeze — including the lost step-up on carryover-basis assets — before engaging counsel.',
      'Estate counsel drafts the IDGT with the chosen grantor trigger; obtain the appraisal.',
      'Make and report the seed gift (Form 709 with adequate disclosure).',
      'Close the sale: note at AFR, security agreement, and a payment calendar the trustee actually follows.',
      'Annually: confirm note payments, revisit the swap power for basis management, and re-run the estate projection as the exemption indexes.'
    ]
  },

  client: {
    teaser: 'Locks in today\'s value for the taxman while tomorrow\'s growth goes to your kids',
    headline: 'Freeze your estate, shift the growth',
    plainEnglish: [
      'If your business or property is growing fast, the estate tax problem isn\'t what it\'s worth today — it\'s what it will be worth when you\'re gone. This strategy freezes the value the estate tax ever sees at today\'s number, so all the future growth happens outside your estate, for your family\'s benefit.',
      'Here\'s the shape of it: you set up a special family trust and sell your business interest to it in exchange for a promissory note. Because of how the trust is designed, the sale itself triggers no income tax. Your estate now holds a note worth today\'s value; the business and everything it becomes belongs to the trust for your children.',
      'There\'s a quiet second benefit: you keep paying the income tax on what the trust earns, which the IRS does not treat as a gift. Every tax payment you make shrinks your taxable estate a little more while the trust grows untouched.'
    ],
    analogy: 'It\'s like selling your family the orchard at today\'s price and taking back an IOU — every harvest from now on is theirs, and the taxman can only ever see the IOU.',
    benefits: [
      'All future growth of the asset happens outside your taxable estate',
      'No income tax on the sale itself when structured correctly',
      'Your ongoing tax payments quietly move even more wealth to the family',
      'Doubles as a real succession plan with the next generation in place'
    ],
    steps: [
      'We model your estate with and without the freeze so the benefit is concrete',
      'An estate attorney we coordinate with drafts the trust; a valuation expert prices the asset',
      'The trust is funded, the sale closes, and the note payments begin',
      'We monitor the plan every year and adjust as the law\'s exemption amounts change'
    ],
    considerations: [
      'With today\'s permanent $15 million per-person exemption, many families simply don\'t need this — we run the numbers first and tell you honestly if you\'re one of them.',
      'Assets moved this way don\'t get the usual "fresh start" on capital gains at death, so there\'s a trade-off we measure before recommending it.',
      'This is a real transaction with real paperwork — the trust must be properly funded and the note actually paid, every year.'
    ]
  },

  inputs: [],

  appliesTo: function (profile) {
    return true;
  },

  apply: function (profile, params, yearIndex, state) {
    return { profile: profile, notes: yearIndex === 0
      ? ['Advisory strategy — appears in the plan documents but does not change the scenario math. ' +
         'Primarily an estate/transfer-tax play; income-tax effects (no gain on sale, grantor pays trust tax) do not change this projection.']
      : [] };
  }
});
