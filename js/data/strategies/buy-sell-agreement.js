/* ============================================================================
 * STRATEGY: Buy-Sell Agreement Funded with Life Insurance
 * One source object → advisor view, client PDF, client slideshow.
 * ==========================================================================*/
window.TSIQ = window.TSIQ || {};
TSIQ.strategyModules = TSIQ.strategyModules || [];

TSIQ.strategyModules.push({
  id: 'buy-sell-agreement',
  name: 'Buy-Sell Agreement Funded with Life Insurance',
  category: 'Succession & Exit',
  applyOrder: 91,
  modeled: false,
  character: 'permanent', // ET2

  advisor: {
    summary:
      'A binding buy-sell agreement fixes what happens to an owner\'s equity at ' +
      'death, disability, or exit, funded with life insurance so the buyout cash ' +
      'exists exactly when it is needed. Death proceeds are income-tax-free under ' +
      '§101(a), and a properly drafted agreement meeting §2703 standards can fix ' +
      'the estate-tax value of the decedent\'s interest. Structure now matters more ' +
      'than ever: in Connelly v. United States, 602 U.S. 257 (2024), the Supreme ' +
      'Court held that corporate-owned life insurance proceeds INCREASE the ' +
      'estate-tax value of the decedent\'s shares with no offset for the company\'s ' +
      'redemption obligation. Post-Connelly, cross-purchase and special-purpose ' +
      'insurance-LLC structures are generally preferred over entity redemptions.',
    mechanics: [
      'Entity-purchase (redemption): the company owns policies on each owner and ' +
      'redeems the decedent\'s interest. Simple (one policy per owner), but after ' +
      'Connelly the proceeds are a corporate asset that inflates the value of the ' +
      'decedent\'s shares — the redemption obligation is NOT a liability offset — ' +
      'and surviving owners get no basis step-up in their retained shares (their ' +
      'percentage simply grows).',
      'Cross-purchase: each owner personally owns policies on the others and buys ' +
      'the decedent\'s interest directly. Proceeds never sit inside the entity ' +
      '(no Connelly inflation), and buyers take cost basis in the purchased ' +
      'interest. Drawback: n owners need n×(n−1) policies, and premium burden ' +
      'follows age/health disparities.',
      'Special-purpose insurance LLC: a partnership-taxed LLC owns one policy per ' +
      'owner and effects the cross-purchase — one policy per insured, centralized ' +
      'administration, and transfers of policies among partners fit the ' +
      '§101(a)(2)(B) transfer-for-value exceptions.',
      'Death proceeds are excluded from income under §101(a), but a policy ' +
      'transferred for valuable consideration loses the exclusion above basis-plus-' +
      'premiums unless an exception applies (transfer to the insured, to a partner ' +
      'of the insured, to a partnership in which the insured is a partner, or to a ' +
      'corporation in which the insured is a shareholder or officer). Unwinding an ' +
      'old redemption plan by distributing policies to co-owners is where this ' +
      'trap most often springs — note there is NO exception for a transfer to a ' +
      'mere co-shareholder.',
      'For the agreement price to fix estate-tax value, §2703(b) requires a bona ' +
      'fide business arrangement, terms not a device to transfer wealth to family ' +
      'for less than full consideration, and terms comparable to arm\'s-length ' +
      'arrangements. Family-controlled agreements that fail §2703 are ignored for ' +
      'valuation and the estate is stuck proving value the hard way.',
      'Premiums are nondeductible under §264(a)(1) whether the entity or the ' +
      'owners pay them — funding is an after-tax cost weighed against the ' +
      'liquidity and valuation certainty purchased.'
    ],
    authority: [
      { type: 'Case', cite: 'Connelly v. United States, 602 U.S. 257 (2024)', note: 'Unanimous: company-owned life insurance proceeds increase the estate-tax value of the decedent\'s shares; the corporation\'s contractual redemption obligation is not an offsetting liability. Redemption-style funding now carries a built-in estate-tax cost for taxable estates.' },
      { type: 'IRC', cite: 'IRC §101(a)', note: 'Death proceeds excluded from gross income; §101(a)(2) strips the exclusion after a transfer for valuable consideration, subject to the §101(a)(2)(A)-(B) exceptions (insured, partner of insured, partnership of insured, corporation in which insured is a shareholder/officer).' },
      { type: 'IRC', cite: 'IRC §2703', note: 'Buy-sell price fixes estate value only if the agreement is a bona fide business arrangement, not a testamentary device, and comparable to arm\'s-length terms (§2703(b)); restrictions failing the test are disregarded.' },
      { type: 'IRC', cite: 'IRC §2042', note: 'Inclusion of proceeds in the insured\'s gross estate where the insured holds incidents of ownership — the reason owners should not own policies on their own lives in these structures.' },
      { type: 'IRC', cite: 'IRC §264(a)(1)', note: 'No deduction for premiums on a policy where the taxpayer is directly or indirectly a beneficiary — buy-sell funding is an after-tax cost.' },
      { type: 'IRC', cite: 'IRC §302(b)(3)', note: 'A complete redemption of the estate\'s stock qualifies for exchange (capital gain) treatment rather than dividend treatment — usually harmless gain given the §1014 date-of-death basis step-up.' },
      { type: 'Admin', cite: 'Rev. Rul. 59-60', note: 'Governing framework for valuing closely held stock — the standard the buy-sell pricing formula or appraisal process should track to survive §2703 comparability review.' }
    ],
    requirements: [
      'Two or more co-owners (or an identified successor buyer) with a genuine ' +
      'continuity need — single-owner businesses need a different exit tool.',
      'A written agreement covering all triggers (death, disability, divorce, ' +
      'termination, voluntary exit) with a pricing mechanism that is followed in ' +
      'practice — fixed-price agreements must actually be updated.',
      'Insurance ownership aligned to the structure chosen: owners (or the ' +
      'insurance LLC) as owner and beneficiary for cross-purchase; insureds must ' +
      'hold no incidents of ownership over policies on their own lives (§2042).',
      'For family businesses, §2703(b) support: independent appraisal or a formula ' +
      'benchmarked to comparable arm\'s-length agreements.',
      'Insurable owners — underwriting problems discovered late can force a ' +
      'sinking-fund or installment fallback.'
    ],
    risks: [
      'Connelly exposure in existing redemption plans: for a taxable estate, ' +
      'company-owned proceeds inflate the decedent\'s share value at a 40% ' +
      'marginal estate rate with no offset. Every pre-2024 entity-purchase plan ' +
      'should be reviewed and likely restructured.',
      'Transfer-for-value traps when restructuring: distributing corporate-owned ' +
      'policies to co-shareholders is a transfer for value with NO exception, ' +
      'converting tax-free proceeds into ordinary income above basis. Route ' +
      'transfers through a bona fide partnership of the insureds or to the ' +
      'insured directly.',
      '§2703 failure in family settings: a below-market fixed price is ignored ' +
      'for estate valuation, so the estate pays tax on full value while heirs are ' +
      'contractually forced to sell for less.',
      'Stale valuations: an agreement pegged to a decade-old certificate of value ' +
      'invites both a family fight and an IRS challenge.',
      'Cross-purchase administration drift: owners let policies lapse or premiums ' +
      'go unpaid because the entity is no longer writing the check — the ' +
      'insurance-LLC structure centralizes this.',
      'Proceeds inside a C corporation can raise corporate AMT considerations for ' +
      'very large corporations and complicate accumulated-earnings exposure — ' +
      'flag for corporate counsel where material.'
    ],
    bestFit: [
      'Multi-owner S corps, partnerships, and C corps where a death would force ' +
      'an unplanned buyout or leave heirs as unwanted co-owners.',
      'Estates near or above the $15M exemption ($30M married), where the ' +
      'Connelly valuation issue and §2703 price-fixing have real estate-tax ' +
      'dollars attached.',
      'Family businesses passing to a child active in the business while ' +
      'equalizing non-active heirs with insurance proceeds.',
      'Owner groups of 3+ where the special-purpose insurance LLC avoids the ' +
      'policy-count explosion of a classic cross-purchase.'
    ],
    implementation: [
      'Inventory any existing buy-sell and policy ownership; identify Connelly ' +
      'exposure (entity-owned policies + redemption obligation) and transfer-for-' +
      'value risk in any proposed restructuring path.',
      'Choose the structure: cross-purchase for 2 owners; special-purpose ' +
      'insurance LLC (partnership-taxed, with genuine partnership substance) for ' +
      '3+ owners or where centralized premium administration is needed.',
      'Obtain a business appraisal or adopt a Rev. Rul. 59-60-consistent formula; ' +
      'for family businesses, document the §2703(b) comparability file.',
      'Have counsel draft or restate the agreement covering all trigger events; ' +
      'coordinate policy applications so ownership and beneficiary designations ' +
      'match the agreement before it is signed.',
      'Calendar an annual review: reconfirm the price/valuation, verify premiums ' +
      'paid and policies in force, and re-test coverage against current value.',
      'At a trigger event: file the estate\'s valuation consistently with the ' +
      'agreement, complete the purchase on the contractual timeline, and paper ' +
      'the §302(b)(3) complete redemption if any redemption component remains.'
    ]
  },

  client: {
    teaser: 'Guarantees your family gets full value for your life\'s work — in cash, not a lawsuit',
    headline: 'A guaranteed buyer, at a fair price, with the cash already there',
    plainEnglish: [
      'If you co-own a business, ask one hard question: what happens to your share if you die tomorrow? Without a plan, your family inherits a piece of a company they may not be able to run or sell, your partners inherit co-owners they never chose, and everyone argues about what the business is worth — at the worst possible moment.',
      'A buy-sell agreement is a signed contract that answers all of that in advance: who buys, at what price, and on what timeline. Life insurance supplies the money, so the buyout happens in cash instead of a decade of IOUs. Your family gets paid full value quickly; your partners keep the business running.',
      'A 2024 Supreme Court decision changed how these plans should be built — the old, most common setup can now quietly add estate tax for larger estates. If you already have an agreement, it needs a fresh look. If you do not have one, the right structure from day one avoids the problem entirely.'
    ],
    analogy: 'It is a prenup for business partners — everyone agrees on fair terms while everyone is healthy and friendly, so nobody has to negotiate in a crisis.',
    benefits: [
      'Your family receives full, fair value for your share — in cash',
      'Your partners keep control of the business without scrambling for money',
      'A pre-agreed price prevents disputes and can lock in the value for estate taxes',
      'The insurance payout that funds it is generally income-tax-free'
    ],
    steps: [
      'We review any existing agreement and how your current policies are owned',
      'We work with your attorney and a valuation expert to set the structure and price',
      'Insurance is put in place, owned the right way, matched to the agreement',
      'We revisit the value and coverage together every year'
    ],
    considerations: [
      'Life insurance premiums are a real, non-deductible cost — we weigh that against the protection purchased.',
      'If you already have an older agreement funded with company-owned insurance, recent law changes mean it may need restructuring; moving policies around the wrong way has its own tax traps, so this is not a do-it-yourself fix.',
      'The agreed price has to be genuinely fair and kept current — a stale or lowball number can be ignored by the IRS.'
    ]
  },

  inputs: [],

  appliesTo: function (profile) {
    return true; // advisory — applicability is a facts-and-circumstances call
  },

  apply: function (profile, params, yearIndex, state) {
    return { profile: profile, notes: yearIndex === 0
      ? ['Advisory strategy — appears in the plan documents but does not change the scenario math.']
      : [] };
  }
});
