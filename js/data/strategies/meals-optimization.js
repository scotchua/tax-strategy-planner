/* ============================================================================
 * STRATEGY: Meals Deduction Optimization
 * ==========================================================================*/
window.TSIQ = window.TSIQ || {};
TSIQ.strategyModules = TSIQ.strategyModules || [];

TSIQ.strategyModules.push({
  id: 'meals-optimization',
  name: 'Meals Deduction Optimization',
  category: 'Business Expenses',
  applyOrder: 46,
  modeled: true,
  character: 'permanent', // ET2

  advisor: {
    summary:
      'A chart-of-accounts and documentation cleanup that captures the meals ' +
      'deductions the law actually allows. Post-TCJA, entertainment is dead ' +
      '(§274(a)) but business meals survive at 50% (§274(n)), and several ' +
      'categories remain 100% deductible under the §274(e) exceptions — ' +
      'company-wide recreational events for non-highly-compensated employees, ' +
      'food and beverages sold to customers, and items made available to the ' +
      'general public. In practice, books lump everything into one "Meals & ' +
      'Entertainment" account: 100% items get haircut to 50%, deductible meals ' +
      'get buried with nondeductible entertainment, and undocumented meals get ' +
      'conceded on exam. The fix is three or four separate accounts, a receipt ' +
      'habit that records who and why, and a year-end reclassification review.',
    mechanics: [
      'Entertainment is nondeductible (§274(a)(1), post-TCJA): club dues, ' +
      'tickets, golf, suites. Food and beverages AT an entertainment event ' +
      'remain 50% deductible only if purchased separately or separately stated ' +
      'on the invoice (Reg. §1.274-11).',
      'Business meals: 50% deductible (§274(n)(1)) when not lavish, the ' +
      'taxpayer or an employee is present, and provided to a business ' +
      'associate — client, customer, supplier, employee (Reg. §1.274-12; ' +
      'Notice 2018-76 confirmed client meals survived the TCJA).',
      '100% categories via §274(n)(2)/§274(e): recreational/social events ' +
      'primarily for the benefit of non-highly-compensated employees (holiday ' +
      'party, summer picnic — §274(e)(4)); food/beverages sold to customers ' +
      'for adequate consideration (§274(e)(8)); items available to the general ' +
      'public (§274(e)(7)); meals treated as W-2 compensation (§274(e)(2)).',
      'The bookkeeping failure mode: one blended account means the preparer ' +
      'applies 50% to everything — silently forfeiting half of every 100% item ' +
      '— or deducts entertainment that should be added back.',
      'Substantiation (§274(d) principles carried into the meals regs): amount, ' +
      'date, place, business purpose, and business relationship of attendees. ' +
      'A credit-card statement alone fails; a receipt annotated "lunch w/ Smith ' +
      're: Q3 contract" passes.',
      '2026 note: TCJA\'s scheduled disallowance of employer-operated eating ' +
      'facility costs and §119 convenience-of-employer meals takes effect for ' +
      'amounts paid after 12/31/2025 (§274(o)) — clients with on-site meal ' +
      'programs need those costs reviewed separately.'
    ],
    authority: [
      { type: 'IRC', cite: 'IRC §274(a)(1)', note: 'Entertainment, amusement, and recreation expenses disallowed entirely post-TCJA.' },
      { type: 'IRC', cite: 'IRC §274(n)', note: 'The 50% limitation on food and beverages, and the (n)(2) cross-references to the §274(e) 100% exceptions.' },
      { type: 'IRC', cite: 'IRC §274(e)(2), (4), (7), (8)', note: 'The 100% categories: meals as compensation; recreational events for non-HCE employees; items available to the public; food/beverages sold to customers.' },
      { type: 'Reg', cite: 'Reg. §1.274-11; §1.274-12', note: 'Final TCJA regulations: entertainment definition, the separately-stated-food rule, and business-meal requirements.' },
      { type: 'Admin', cite: 'Notice 2018-76', note: 'Interim IRS confirmation that client business meals remain 50% deductible after the TCJA entertainment disallowance.' },
      { type: 'IRC', cite: 'IRC §274(o)', note: 'Effective for amounts paid after 2025: employer-operated eating facilities and §119 convenience-of-employer meals nondeductible.' }
    ],
    requirements: [
      'Separate general-ledger accounts: 100% meals, 50% meals, nondeductible entertainment (and on-site meal programs, if any).',
      'Receipts annotated with attendees and business purpose, captured contemporaneously.',
      'A bookkeeper briefed on which spend goes where — the categories fail without the habit.',
      'A year-end review pass reclassifying miscoded items before the return is prepared.'
    ],
    risks: [
      'Undocumented meals are conceded in exam — the receipt-plus-purpose habit is the whole defense.',
      'Entertainment miscoded as meals draws adjustments plus accuracy penalties; the separately-stated rule for event food is strictly applied.',
      'Holiday-party treatment (100%) requires the event to be primarily for non-highly-compensated employees — an owners-only dinner does not qualify.',
      'Do not oversell: this strategy recovers deductions the law allows on spending that already occurs; it is hygiene, not alchemy.',
      'On-site meal programs lose their deduction in 2026 (§274(o)) — clients budgeting on old treatment will be surprised.'
    ],
    bestFit: [
      'Businesses with real client-facing meal spend (sales organizations, professional services).',
      'Restaurants and caterers with staff meals and customer-sold food blended in one account.',
      'Any client whose trial balance shows a single "Meals & Entertainment" line.'
    ],
    implementation: [
      'Restructure the chart of accounts: separate 100%, 50%, and nondeductible categories (plus eating-facility costs if applicable).',
      'Give the client a one-page decision chart and a receipt-annotation habit (photo + note in the accounting app).',
      'Train the bookkeeper on the categories; sample-test coding quarterly.',
      'At year end, review the meals accounts and reclassify miscoded items before preparing the return.',
      'Apply the correct percentage per account on the return; document the §274(e) basis for each 100% category claimed.'
    ]
  },

  client: {
    teaser: 'Recovers deductions your bookkeeping has been quietly giving away',
    headline: 'Stop losing half of meal deductions you\'re entitled to in full',
    plainEnglish: [
      'The tax rules for meals are fussy: taking a client to lunch is 50% deductible, the office holiday party is 100% deductible, and sports tickets are 0% deductible. But most businesses throw all of it into one "meals and entertainment" pile in their books. When everything is in one pile, the safe move at tax time is to cut it all in half — which means the fully deductible items lose half their value, every single year.',
      'The fix is simple and permanent: we split your books into the right categories, give you a ten-second receipt habit (snap a photo, note who you were with and why), and review the coding at year end. Fully deductible costs get counted in full, and every meal deduction you claim has the paper trail the IRS expects.',
      'This is not about spending more — it is about getting proper credit for what you already spend.'
    ],
    analogy: 'It\'s like sorting your recycling — toss everything in one bin and the whole load gets treated as trash; sort it, and everything gets its full value back.',
    benefits: [
      'Full credit for 100% deductible costs like the company party',
      'Every meal deduction backed by records that hold up',
      'A one-time bookkeeping fix that pays off every year',
      'Ten seconds per receipt is the entire ongoing effort'
    ],
    steps: [
      'We reorganize the meal categories in your books (one-time setup)',
      'We give you and your bookkeeper a simple cheat sheet and receipt habit',
      'We review and correct the coding before each tax return',
      'We claim each category at its full allowed percentage'
    ],
    considerations: [
      'Entertainment — tickets, golf, club dues — is simply not deductible anymore, no matter how it is coded. We will be straight with you about those.',
      'The receipt note (who and why) is what makes these deductions stick. Skip the habit and the deductions are at risk.'
    ]
  },

  inputs: [
    { key: 'reclassifiedAmount', label: 'Meal spend recovered by reclassification/documentation', type: 'currency', default: 5000 }
  ],

  appliesTo: function (profile) {
    return true; // needs business income; validated with a note in apply()
  },

  /**
   * Modeling convention (kept deliberately conservative): the advisor enters
   * the gross meal spend recovered — dollars that were previously getting NO
   * deduction (missed capture, misclassified, undocumented) and now land in
   * properly documented categories. We deduct 50% of that amount, the general
   * §274(n) rate, rather than assuming any of it qualifies for a 100%
   * category. If the recovered spend is largely 100%-category (company events,
   * items sold to customers), the real benefit is higher — noted, not modeled.
   */
  apply: function (profile, params, yearIndex, state) {
    var p = Object.assign({}, profile);
    var notes = [];
    var deduction = (params.reclassifiedAmount || 0) * 0.5; // conservative §274(n) 50% convention

    if (p.scheduleCNet > 0) {
      p.scheduleCNet = p.scheduleCNet - deduction;
    } else if (p.passthroughK1 > 0) {
      p.passthroughK1 = p.passthroughK1 - deduction;
    } else {
      notes.push('Requires business income (Schedule C or entity). No benefit modeled.');
      return { profile: p, notes: notes };
    }

    if (yearIndex === 0) {
      notes.push(TSIQ.fmt.usd(deduction) + ' deduction modeled: ' +
        TSIQ.fmt.usd(params.reclassifiedAmount || 0) + ' of recovered meal spend × 50% ' +
        '(§274(n)) — conservatively assumes none of it reaches a 100% category.');
      notes.push('To the extent the recovered spend is 100%-deductible (company events, ' +
        'food sold to customers), actual benefit exceeds the model.');
    }
    return { profile: p, notes: notes };
  }
});
