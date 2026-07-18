/* ============================================================================
 * STRATEGY: Oil & Gas Working-Interest Intangible Drilling Costs (IDCs)
 * Advisory-only, risk-flagged: the AMT preference this strategy triggers
 * cannot be honestly quantified without an AMT engine (this tool has none).
 * ==========================================================================*/
window.TSIQ = window.TSIQ || {};
TSIQ.strategyModules = TSIQ.strategyModules || [];

TSIQ.strategyModules.push({
  id: 'oil-gas-idc',
  name: 'Oil & Gas Working-Interest IDCs',
  category: 'Real Estate & Cost Recovery',
  applyOrder: 70,
  modeled: false,
  character: 'permanent', // ET2

  advisor: {
    summary:
      'A direct working interest in an oil or gas well lets the investor ' +
      'elect to expense intangible drilling costs (IDCs — labor, fuel, ' +
      'chemicals, and other non-salvageable drilling costs, typically 60-80% ' +
      'of total well cost) in the year paid instead of capitalizing and ' +
      'depleting them (§263(c)). A working interest is also statutorily ' +
      'NON-PASSIVE under §469(c)(3), regardless of material participation, ' +
      'AS LONG AS the ownership form does not limit the investor\'s liability ' +
      '(a true working interest, not a limited-partner interest) — so the ' +
      'large year-one IDC deduction can offset ordinary income immediately, ' +
      'without a passive-activity fight. The honest catch: excess IDCs are ' +
      'an AMT preference item (§57(a)(2)), and this tool computes no AMT at ' +
      'all — any regular-tax-only projection of this strategy is incomplete, ' +
      'not necessarily wrong, but incomplete.',
    mechanics: [
      'IDC expensing election (§263(c), Reg. §1.612-4): elect to deduct ' +
      'intangible drilling and development costs in the year incurred, ' +
      'rather than capitalizing them into the well\'s depletable basis — ' +
      'made on the first return for which the election applies and binding ' +
      'for all future wells absent a further election.',
      'Non-passive by statute (§469(c)(3)): a working interest in an oil/gas ' +
      'property is not a passive activity for ANY investor holding it in a ' +
      'form that does not limit liability, regardless of hours of ' +
      'participation — a working interest still fully offsets ordinary income.',
      'AMT preference (§57(a)(2)): "excess IDCs" — the amount deducted above ' +
      'what 120-month straight-line amortization would allow — are a ' +
      'preference item to the extent they exceed 65% of the taxpayer\'s net ' +
      'income from oil, gas, and geothermal properties for the year.',
      'Independent producer exception (§57(a)(2)(E)): a taxpayer that is not ' +
      'an integrated oil company can exclude the IDC preference, but the ' +
      'AMTI REDUCTION from that exception cannot exceed 40% of AMTI (computed ' +
      'before the exception and the alternative tax NOL deduction) — a real ' +
      'but PARTIAL limitation on the preference, not a full escape from AMT exposure.',
      'At-risk (§465) and basis limitations still apply on top of the §469(c)(3) ' +
      'non-passive treatment — losses cannot exceed the investor\'s actual ' +
      'economic exposure in the working interest.',
      'Depletion (cost or percentage, §613A, subject to its own limitations ' +
      'for independent producers) applies to the well\'s remaining ' +
      '(capitalized, non-IDC) basis once production begins — a separate, ' +
      'ongoing deduction beyond the year-one IDC expensing.'
    ],
    authority: [
      { type: 'IRC', cite: 'IRC §263(c); Reg. §1.612-4', note: 'Election to currently deduct intangible drilling and development costs instead of capitalizing them.' },
      { type: 'IRC', cite: 'IRC §469(c)(3)', note: 'A working interest in an oil or gas property is not a passive activity, regardless of material participation, if held in a form that does not limit the taxpayer\'s liability.' },
      { type: 'IRC', cite: 'IRC §57(a)(2)', note: 'Excess intangible drilling costs (over 120-month straight-line amortization) are an AMT preference to the extent they exceed 65% of net oil/gas/geothermal income for the year.' },
      { type: 'IRC', cite: 'IRC §57(a)(2)(E)', note: 'Independent producer exception: excludes the IDC preference, but the AMTI reduction is capped at 40% of AMTI (computed before the exception and the ATNOLD) — a partial, not total, limitation on AMT exposure.' },
      { type: 'IRC', cite: 'IRC §465', note: 'At-risk limitation — losses are capped at the investor\'s actual economic exposure in the working interest, independent of the passive-loss rules.' },
      { type: 'IRC', cite: 'IRC §613A', note: 'Percentage depletion for independent producers and royalty owners, with its own volume and income limitations, applicable once production begins.' }
    ],
    requirements: [
      'A genuine WORKING INTEREST (not a royalty interest and not a limited-partner interest that limits liability) in an oil or gas property.',
      'Real economic risk and basis/at-risk amount supporting the size of any loss claimed.',
      'A timely §263(c) election on the return for the first year IDCs are incurred.',
      'A dedicated AMT calculation (outside this tool) before relying on any after-tax number for this strategy.'
    ],
    risks: [
      'This tool computes NO alternative minimum tax — the year-one IDC deduction can look like a much larger regular-tax benefit than the client actually nets once AMT preference and the (partial, 40%-of-AMTI-capped) independent producer exception are factored in.',
      'Holding the interest through a vehicle that limits liability (e.g., as a limited partner) forfeits the §469(c)(3) non-passive treatment entirely, subjecting losses to the ordinary passive-activity rules.',
      'At-risk and basis limitations can disallow losses beyond the investor\'s real economic exposure regardless of the passive-activity treatment.',
      'Oil and gas working interests carry substantial commodity-price and drilling (dry-hole) risk that is independent of, and often larger than, the tax benefit — do not let the tax story drive an investment decision on its own.',
      'Percentage depletion and other ongoing benefits have their own separate limitations (§613A) not addressed by the year-one IDC analysis.'
    ],
    bestFit: [
      'High-income clients with genuine risk appetite for direct energy investment, not merely a tax-shelter mindset.',
      'Independent-producer-eligible investors (not an integrated oil company) who can benefit from the partial §57(a)(2)(E) AMT exception.',
      'Clients willing to commission a dedicated AMT projection before committing capital, given this tool\'s regular-tax-only limitation.'
    ],
    implementation: [
      'Commission a dedicated AMT projection (outside this tool) BEFORE modeling or relying on any after-tax number for this strategy.',
      'Confirm the investment is structured as a genuine working interest, not a limited-partner or royalty interest, to preserve §469(c)(3) non-passive treatment.',
      'Verify at-risk and basis amounts support the size of any loss to be claimed.',
      'Make the §263(c) IDC expensing election on the first return for which it applies.',
      'Track independent-producer status and the 40%-of-AMTI cap on the §57(a)(2)(E) exception in the permanent file.',
      'Revisit depletion (cost vs. percentage) treatment separately once the well begins production.'
    ]
  },

  client: {
    teaser: 'A direct energy investment with a real, but genuinely limited, tax benefit',
    headline: 'Oil & gas drilling investments: a real deduction, with a real limit this tool cannot show you',
    plainEnglish: [
      'Investing directly in an oil or gas well lets you deduct a large share of the drilling cost right away, in the first year, instead of spreading it out over many years. It can also offset your regular income more freely than many other investments, because of a specific rule that treats this type of investment differently.',
      'Here is the honest catch: a separate tax system called the alternative minimum tax can claw back some of that first-year benefit, and this planning tool does not calculate that tax at all. There is a partial protection in the law for smaller, independent investors, but it is only partial — not a complete shield.',
      'Because of that gap, we would never rely on this tool\'s numbers alone for a decision this size. A dedicated specialist calculation of your alternative minimum tax exposure has to happen before we can tell you the real, complete after-tax picture — and the underlying investment carries its own real business risk (dry holes, commodity prices) that matters just as much as the tax result.'
    ],
    analogy: 'It\'s like a coupon with an asterisk — the discount is real, but the fine print (which this tool cannot read for you) determines how much of it you actually get to keep.',
    benefits: [
      'A large, immediate deduction for a real share of the drilling cost',
      'More flexible loss treatment than many other investments enjoy',
      'A partial protection in the law for smaller, independent investors',
      'A genuine, tangible energy investment — not a paper-only tax play'
    ],
    steps: [
      'We discuss whether this fits your risk tolerance as a real investment, not just a tax move',
      'We arrange a dedicated specialist calculation of your alternative minimum tax exposure',
      'We confirm the investment is structured the right way to keep its tax treatment',
      'We revisit the numbers as production begins and the picture evolves'
    ],
    considerations: [
      'This planning tool does not calculate the alternative minimum tax, so the true after-tax cost needs a separate, dedicated calculation before you commit.',
      'This is a real business investment with real risk — commodity prices and drilling outcomes matter as much as, or more than, the tax benefit.'
    ]
  },

  inputs: [],

  appliesTo: function (profile) {
    return true;
  },

  apply: function (profile, params, yearIndex, state) {
    return { profile: profile, notes: yearIndex === 0
      ? ['Advisory strategy — appears in the plan documents but does not change the scenario math. ' +
        'The intangible drilling cost deduction triggers a real AMT preference (§57(a)(2)) this ' +
        'engine cannot compute (no AMT support); the independent-producer exception (§57(a)(2)(E)) ' +
        'only partially limits that exposure (capped at 40% of AMTI). Commission a dedicated AMT ' +
        'projection before relying on any after-tax number for this strategy.']
      : [] };
  }
});
