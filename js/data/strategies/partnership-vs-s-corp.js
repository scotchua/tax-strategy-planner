/* ============================================================================
 * STRATEGY: Partnership vs. S-Corp (Guaranteed Payment Flexibility)
 * ==========================================================================*/
window.TSIQ = window.TSIQ || {};
TSIQ.strategyModules = TSIQ.strategyModules || [];

TSIQ.strategyModules.push({
  id: 'partnership-vs-s-corp',
  name: 'Partnership vs. S-Corp (Guaranteed Payment Flexibility)',
  category: 'Entity Structure',
  applyOrder: 14,
  modeled: false, // advisory-only: entity-choice analysis; the S-corp math lives in s-corp-election
  character: 'permanent', // ET2

  advisor: {
    summary:
      'Entity-choice analysis for multi-owner businesses: partnership (Form ' +
      '1065) versus S corporation (Form 1120-S). The S corp wins the ' +
      'employment-tax comparison — only reasonable comp bears FICA, while a ' +
      'general partner\'s guaranteed payments AND distributive share of ' +
      'ordinary business income are generally SE-taxed in full (§1402(a); ' +
      '§707(c); Rev. Rul. 69-184 — partners cannot be W-2 employees of their ' +
      'partnership). The partnership wins nearly everything else: special ' +
      'allocations under §704(b), outside basis from entity-level debt under ' +
      '§752 (S shareholders get debt basis only for direct shareholder loans, ' +
      '§1366(d)), §754/§743(b) inside-basis step-ups on transfers and death, ' +
      'tax-free property distributions (§731 vs. §311(b) gain recognition for ' +
      'S corps), and no reasonable-compensation exam exposure. The right ' +
      'answer is fact-driven; this advisory frames the tradeoffs, and the ' +
      'S-Corp Election strategy models the employment-tax side.',
    mechanics: [
      'Employment tax: an S-corp owner pays FICA only on W-2 reasonable comp; ' +
      'distributions escape it (Rev. Rul. 59-221). A general partner pays SE ' +
      'tax on guaranteed payments (§707(c)) and on the full distributive ' +
      'share of trade-or-business income (§1402(a)); the §1402(a)(13) ' +
      'limited-partner exclusion is contested ground for LLC members who ' +
      'actively participate (see Soroban, Renkemeyer line).',
      'Allocations: partnerships can specially allocate income, loss, and ' +
      'cash flow disproportionately to ownership if the allocations have ' +
      'substantial economic effect (§704(b); Reg. §1.704-1(b)). S corps are ' +
      'locked to strict pro-rata, single-class-of-stock sharing (§1361(b)(1)(D), ' +
      '§1366) — no waterfall, no preferred return, no carried interest.',
      'Debt basis: partnership liabilities are allocated to partners\' outside ' +
      'basis under §752, supporting loss deductions and tax-free debt-financed ' +
      'distributions. S-corp shareholders get basis only from stock and DIRECT ' +
      'loans they make to the corporation (§1366(d)(1)(B)) — entity-level bank ' +
      'debt gives them nothing. Decisive for leveraged real estate.',
      'Basis step-ups: with a §754 election, a partnership adjusts inside ' +
      'basis under §743(b) on a sale or death of a partner (and §734(b) on ' +
      'distributions) — the buyer/heir effectively gets fresh depreciation. ' +
      'S corps have no inside-basis step-up mechanism; the step-up strands at ' +
      'the stock level.',
      'Guaranteed payments are the partnership\'s comp flexibility: fixed ' +
      'amounts for services or capital, deductible by the partnership, set by ' +
      'agreement — no "reasonableness" exam standard, but SE-taxed in full and ' +
      'excluded from the recipient\'s QBI (Reg. §1.199A-3(b)(2)(ii)(I)).',
      'Property in, property out: appreciated property generally enters (§721) ' +
      'and exits (§731) a partnership tax-free; an S corp recognizes gain on ' +
      'distributing appreciated property (§311(b)) — partnerships age better ' +
      'for appreciating assets.'
    ],
    authority: [
      { type: 'IRC', cite: 'IRC §707(c)', note: 'Guaranteed payments for services or capital, determined without regard to partnership income — deductible to the partnership, ordinary (and SE) income to the partner.' },
      { type: 'IRC', cite: 'IRC §1402(a); §1402(a)(13)', note: 'SE tax on a partner\'s distributive share and guaranteed payments; the limited-partner exclusion and its contested application to active LLC members.' },
      { type: 'Admin', cite: 'Rev. Rul. 69-184', note: 'A partner is not an employee of the partnership — no W-2, no FICA wage treatment; compensation flows as guaranteed payments.' },
      { type: 'IRC', cite: 'IRC §704(b); Reg. §1.704-1(b)', note: 'Special allocations respected if they have substantial economic effect — the partnership\'s core flexibility.' },
      { type: 'IRC', cite: 'IRC §752', note: 'Partnership liabilities included in outside basis — supports losses and debt-financed distributions; no S-corp analogue.' },
      { type: 'IRC', cite: 'IRC §1366(d)', note: 'S-corp loss limitation: stock basis plus basis in DIRECT shareholder loans only — entity-level debt gives no basis.' },
      { type: 'IRC', cite: 'IRC §§754, 743(b)', note: 'Election to adjust inside basis on transfers of partnership interests (sale or death) — fresh depreciation for the transferee.' },
      { type: 'Case', cite: 'Renkemeyer, Campbell & Weaver LLP v. Comm\'r, 136 T.C. 137 (2011)', note: 'Law-firm LLP partners actively performing services could not use the §1402(a)(13) limited-partner exclusion — their shares were SE income.' }
    ],
    requirements: [
      'Two or more owners (a single-member LLC defaults to disregarded status; the partnership option requires real co-ownership).',
      'For S status instead: all §1361 eligibility tests — ≤100 eligible shareholders, one class of stock, no entity/nonresident-alien owners — which themselves rule out many deal structures.',
      'A drafted operating/partnership agreement reflecting the intended allocations and guaranteed payments (the §704(b) protections live in the document).',
      'Willingness to handle K-1 complexity: capital accounts, §704(c) layers on contributed property, and liability allocations.'
    ],
    risks: [
      'SE-tax exposure on the full distributive share for active partners — the partnership\'s biggest recurring cost versus the S corp; the limited-partner exclusion for active LLC members is an audit-active area (Renkemeyer line), so do not promise SE savings inside a partnership.',
      'Choosing S for the payroll savings and later discovering the deal needs preferred returns, waterfalls, or new investor classes the single-class-of-stock rule forbids — a common and expensive regret.',
      'Terminating S status inadvertently (a second class of stock via side agreements, an ineligible shareholder) blows the election.',
      'Partnership complexity is real: §704(c) allocations, capital-account maintenance, and liability recomputations raise prep cost and error risk.',
      'Converting between forms later is not free — incorporating a partnership is manageable, but getting appreciated assets OUT of an S corp triggers §311(b) gain.'
    ],
    bestFit: [
      'Service businesses with owner-operators and simple pro-rata ownership: S corp usually wins on employment tax.',
      'Leveraged real estate and asset-heavy ventures: partnership wins on §752 debt basis, §754 step-ups, and tax-free property movement.',
      'Deals with unequal economics (preferred returns, profits interests, sweat-equity partners): partnership is often the only form that fits.',
      'Businesses expecting outside investors or estate transitions where inside-basis step-ups matter.'
    ],
    implementation: [
      'Score the client\'s facts on the five axes: employment tax, allocation needs, debt basis, exit/step-up plans, and property movement.',
      'If S corp: model the employment-tax savings with the S-Corp Election strategy in this tool and file Form 2553 timely.',
      'If partnership: draft the agreement with §704(b)-compliant allocation and guaranteed-payment provisions; decide the guaranteed-payment vs. priority-allocation mix.',
      'For partnerships holding depreciable assets, adopt a standing plan to make the §754 election when a triggering transfer occurs.',
      'Set the SE-tax position for each member (general/limited/active LLC member) deliberately and document it.',
      'Revisit at every ownership change — the right answer moves as the cap table does.'
    ]
  },

  client: {
    teaser: 'The right ownership setup can unlock savings and flexibility the standard choice leaves on the table',
    headline: 'Partnership or S corporation? The choice is worth real money',
    plainEnglish: [
      'When a business has more than one owner, there are two main ways to set it up for taxes: a partnership or an S corporation. They look similar from the outside — both pass profits to the owners\' returns — but they behave very differently, and picking the wrong one can cost you every year.',
      'The S corporation usually saves on payroll-style taxes: you take a fair salary, and profits above it avoid the extra 15%. But it comes with rigid rules — every owner must share profits exactly in proportion to ownership, no exceptions. A partnership flips that: owners can split profits, losses, and cash in almost any way they agree to, one owner can be paid a fixed amount for their work, and loans the business takes out can unlock deductions for the owners.',
      'Neither is "better" — it depends on whether your business is mostly about the owners\' work (S corporation often wins) or about property, debt, and flexible deals between owners (partnership often wins). We run your actual numbers both ways before anything gets filed.'
    ],
    analogy: 'It\'s like choosing between a sedan and a pickup: the sedan is cheaper to run every day, but if your life involves hauling things, the truck pays for itself. The mistake is buying on sticker price without looking at your driveway.',
    benefits: [
      'A structure matched to how your business actually makes money',
      'Payroll-tax savings when the S corporation route fits',
      'Freedom to split profits unevenly and reward sweat equity when the partnership route fits',
      'Fewer expensive do-overs when investors, property, or heirs enter the picture'
    ],
    steps: [
      'We map how your business earns, borrows, and pays its owners',
      'We run your numbers under both structures, side by side',
      'We draft or update the ownership agreement to match the winner',
      'We revisit the choice whenever owners, debt, or plans change'
    ],
    considerations: [
      'The flexible partnership route means active owners pay self-employment tax on their full share of profits — flexibility has a price, and we quantify it.',
      'The S corporation\'s rules are strict: equal sharing, limited types of owners. If your plans include investors or uneven splits, it can box you in.',
      'Switching structures later is possible but can trigger tax, so we aim to get it right before the business appreciates.'
    ]
  },

  inputs: [],

  appliesTo: function (profile) {
    return true;
  },

  apply: function (profile, params, yearIndex, state) {
    return { profile: profile, notes: yearIndex === 0
      ? ['Advisory strategy — appears in the plan documents but does not change the scenario math.']
      : [] };
  }
});
