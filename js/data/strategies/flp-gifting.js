/* ============================================================================
 * STRATEGY: Family Limited Partnership Valuation Discounts
 * One source object → advisor view, client PDF, client slideshow.
 * ==========================================================================*/
window.TSIQ = window.TSIQ || {};
TSIQ.strategyModules = TSIQ.strategyModules || [];

TSIQ.strategyModules.push({
  id: 'flp-gifting',
  name: 'Family Limited Partnership Valuation Discounts',
  category: 'Succession & Exit',
  applyOrder: 93,
  modeled: false,
  character: 'permanent', // ET2

  advisor: {
    summary:
      'Senior family members contribute business interests, real estate, or ' +
      'marketable portfolios to a family limited partnership (or family LLC) and ' +
      'gift limited/non-managing interests to children or trusts. Because a ' +
      'limited interest carries no control and no ready market, qualified ' +
      'appraisers routinely support combined lack-of-control and lack-of-' +
      'marketability discounts of roughly 20–35%, so each gifted dollar of ' +
      'underlying value consumes only 65–80 cents of the $19,000 annual exclusion ' +
      'or the $15M lifetime exemption (2026, permanent under OBBBA and indexed). ' +
      'The structure lives or dies on §2036: retained control or implied use of ' +
      'the assets pulls the FULL undiscounted value back into the estate, as the ' +
      'Tax Court did in Estate of Powell.',
    mechanics: [
      'Formation: senior generation contributes assets to the FLP/LLC in ' +
      'exchange for general/managing and limited/non-managing interests; the ' +
      'entity — not the family members — now owns the assets, and the ' +
      'partnership agreement restricts transfer and control of limited interests.',
      'Gifting: limited interests are gifted (outright or to trusts). The gift ' +
      'is valued as the interest itself, not a pro-rata slice of the assets — a ' +
      'willing buyer would pay less for a minority, illiquid, restricted ' +
      'interest, producing the lack-of-control (minority) discount plus the ' +
      'lack-of-marketability discount, commonly 20–35% combined depending on ' +
      'asset mix and agreement terms.',
      'Leverage math: at a 30% combined discount, a $19,000 annual-exclusion ' +
      'gift moves about $27,000 of underlying value; a $15M exemption shelters ' +
      'roughly $21M of underlying assets — and all post-gift appreciation ' +
      'accrues outside the senior generation\'s estate.',
      '§2036(a) is the countervailing force: if the decedent retained possession, ' +
      'enjoyment, or the right to income (§2036(a)(1)) or the right, alone or ' +
      'with others, to designate who enjoys the property (§2036(a)(2)), the full ' +
      'date-of-death value of the CONTRIBUTED ASSETS is included in the estate — ' +
      'discounts evaporate. The escape hatch is the bona fide sale for adequate ' +
      'and full consideration exception, which case law reads as requiring a ' +
      'legitimate and significant nontax purpose for the entity.',
      'Chapter 14 guardrails: §2701 polices preferred/frozen equity structures ' +
      'between generations (keep interests plain pro-rata to stay out of it), and ' +
      '§2704 disregards certain lapsing rights and "applicable restrictions" on ' +
      'liquidation when valuing transfers among family — the agreement\'s ' +
      'restrictions must be no more restrictive than state-law default to count.',
      'Income tax follows the K-1s: partnership income is allocated to the ' +
      'donees\' interests post-gift (a genuine income shift), and gifted ' +
      'interests take §1015 carryover basis — no step-up until a later ' +
      'includible transfer at death.'
    ],
    authority: [
      { type: 'IRC', cite: 'IRC §2036(a)', note: 'Retained life enjoyment or retained control over beneficial enjoyment pulls contributed assets back into the gross estate at full undiscounted value unless the bona fide sale / adequate consideration exception applies.' },
      { type: 'Case', cite: 'Estate of Powell v. Comm\'r, 148 T.C. 392 (2017)', note: 'Deathbed FLP funded with marketable securities under a POA; Tax Court applied §2036(a)(2) — the decedent\'s ability, in conjunction with others, to dissolve the partnership was a retained right to designate enjoyment. Full value included; the modern warning case.' },
      { type: 'Case', cite: 'Estate of Bongard v. Comm\'r, 124 T.C. 95 (2005)', note: 'Articulates the bona fide sale exception: a legitimate and significant nontax reason for creating the entity, with contributors receiving interests proportionate to contributions.' },
      { type: 'IRC', cite: 'IRC §2704', note: 'Lapsing voting/liquidation rights treated as transfers; "applicable restrictions" on liquidation more restrictive than state-law default are disregarded in valuing family transfers.' },
      { type: 'IRC', cite: 'IRC §2701', note: 'Special valuation rules for preferred/frozen interests retained by the senior generation — avoided by keeping capital and profits interests plain and pro-rata.' },
      { type: 'IRC', cite: 'IRC §2503(b); §2513', note: 'Annual exclusion ($19,000 per donee, 2026, indexed) and gift-splitting — the exclusion each discounted gift leverages. Present-interest status of restricted FLP gifts should be supported (distribution rights or withdrawal powers).' },
      { type: 'Admin', cite: 'Rev. Rul. 59-60', note: 'Foundational valuation framework the qualified appraisal must follow for closely held interests.' },
      { type: 'Reg', cite: 'Reg. §301.6501(c)-1(f)', note: 'Adequate-disclosure rules: a Form 709 with a qualified appraisal and full entity disclosure starts the 3-year statute of limitations on the gift\'s value.' }
    ],
    requirements: [
      'A legitimate, documentable nontax purpose: centralized management of a ' +
      'family business or real estate, creditor protection, consolidated ' +
      'investment management, succession governance — recited AND actually true.',
      'Real formalities: state filing, EIN, partnership agreement, capital ' +
      'accounts, entity bank account, pro-rata distributions, annual 1065/K-1s.',
      'The senior generation keeps ample assets OUTSIDE the FLP to live on — ' +
      'never the house, never the checkbook assets.',
      'A qualified appraisal of each gifted interest by a credentialed business ' +
      'appraiser, attached to a timely, adequately disclosed Form 709.',
      'Time: fund the entity well before gifting and never on a deathbed — ' +
      'sequencing and seasoning matter to the bona fide sale exception.'
    ],
    risks: [
      '§2036 inclusion is the headline risk: the classic bad-facts pattern is ' +
      'deathbed funding, contributing substantially all assets, continued ' +
      'personal use of contributed property (living in the house, spending ' +
      'partnership cash on personal expenses), disproportionate distributions, ' +
      'and no genuine nontax purpose. Any of these can cost the entire discount ' +
      'and more.',
      'Powell extends §2036(a)(2) even to limited-partner-level control held ' +
      '"in conjunction with" others — governance drafting and who-holds-what ' +
      'matter, not just percentages.',
      'Aggressive discounts (40%+) on pure marketable-securities FLPs draw exam ' +
      'attention; valuation penalties under §6662(g)/(h) apply to substantial ' +
      'and gross valuation understatements.',
      '§2704 can void liquidation restrictions the discount leaned on if they ' +
      'exceed state-law defaults.',
      'Carryover basis trade-off: discounted lifetime gifts remove appreciation ' +
      'but forfeit the §1014 step-up — for low-basis assets in estates safely ' +
      'under $15M/$30M, gifting can INCREASE the family\'s total tax. Run the ' +
      'estate-tax-saved vs capital-gains-cost comparison first.',
      'Sloppy administration after formation (commingling, skipped K-1s, ' +
      'non-pro-rata cash pulls) retroactively poisons the whole structure.'
    ],
    bestFit: [
      'Estates meaningfully above the $15M single / $30M married exemption where ' +
      'estate tax is a live 40% problem, holding operating businesses or real ' +
      'estate suited to centralized family management.',
      'Families already committed to systematic annual-exclusion gifting who ' +
      'want each $19,000 to move more underlying value.',
      'Senior generations genuinely ready to give up control and enjoyment of ' +
      'the contributed assets, with plenty retained outside the entity.',
      'Appreciating assets with growth better shifted to the next generation ' +
      'than compounding inside the taxable estate.'
    ],
    implementation: [
      'Screen for the §2036 bad-facts pattern first: confirm a real nontax ' +
      'purpose, adequate retained assets outside the entity, and no personal-use ' +
      'assets going in. If the client cannot pass this screen, stop.',
      'Engage counsel to form the FLP/LLC with §2704-aware governance (avoid ' +
      'restrictions beyond state-law default; avoid §2701 preferred structures); ' +
      'fund it and let it operate — books, bank account, distributions pro-rata.',
      'Obtain a qualified appraisal of the entity and of each interest to be ' +
      'gifted (entity-level value, then interest-level discounts).',
      'Execute gifts of limited/non-managing interests — annual-exclusion gifts ' +
      'each year (consider gift-splitting under §2513) and/or a larger exemption ' +
      'gift, often to trusts for asset protection and GST planning.',
      'File Form 709 by April 15 following each gift year with adequate ' +
      'disclosure (Reg. §301.6501(c)-1(f)) — appraisal attached — to start the ' +
      '3-year statute on valuation.',
      'Maintain the entity annually: 1065/K-1s, minutes for major decisions, ' +
      'pro-rata distributions, and periodic reappraisal for later gifts.'
    ]
  },

  client: {
    teaser: 'A family structure that lets every dollar you pass down count as less than a dollar on the gift-tax meter',
    headline: 'Move the family assets, keep the family discount',
    plainEnglish: [
      'When you give away a share of a family partnership instead of the assets themselves, the tax rules value what the recipient actually got: a minority piece of a family entity that they cannot control and cannot easily sell. Professional appraisers routinely conclude such a share is worth 20% to 35% less than the assets behind it — and the gift-tax system respects that.',
      'That discount is leverage. A gift that uses up $19,000 of your annual gift allowance can move closer to $27,000 of real underlying value. Applied to your lifetime exemption, the same math can shelter millions of extra dollars — and everything those assets earn and grow from that day forward belongs to your kids\' side of the ledger, not your taxable estate.',
      'The catch is that the IRS has beaten this structure in court when families treated it as a paper game — putting in everything they owned, still living off the assets, and skipping the formalities. Done properly, with real purpose, real records, and a professional appraisal, it remains one of the most effective estate-planning tools for larger families.'
    ],
    analogy: 'A share of a family partnership is like one seat in a car you cannot drive and cannot sell — a fair buyer pays less for that seat than for the car, and the tax rules agree.',
    benefits: [
      'Each gift moves 20–35% more real value than the gift-tax cost suggests',
      'Future growth of the gifted share happens outside your taxable estate',
      'The family\'s assets stay under unified, professional management',
      'Built-in protection: heirs receive interests they cannot lose to an impulsive sale or, in many cases, a creditor'
    ],
    steps: [
      'We confirm the structure fits — the right assets, the right purpose, and enough kept outside it for your lifestyle',
      'An attorney forms the partnership and we help fund and operate it properly',
      'A qualified appraiser values the interests before any gift is made',
      'We handle the gift-tax filings and keep the annual records audit-ready'
    ],
    considerations: [
      'You must genuinely let go — keep living off assets you "gave away" and the IRS can pull everything back into your estate at full value.',
      'Gifted assets keep your original cost basis, so heirs may face more capital gains later; for some families, holding assets until death is the better tax answer, and we run that comparison first.',
      'This structure only works with real upkeep — appraisals, tax filings, and disciplined recordkeeping every year.'
    ]
  },

  inputs: [],

  appliesTo: function (profile) {
    return true; // advisory — driven by estate size and asset facts, not return inputs
  },

  apply: function (profile, params, yearIndex, state) {
    return { profile: profile, notes: yearIndex === 0
      ? ['Advisory strategy — appears in the plan documents but does not change the scenario math.']
      : [] };
  }
});
