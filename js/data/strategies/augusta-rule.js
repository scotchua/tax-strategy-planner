/* ============================================================================
 * STRATEGY: Augusta Rule (§280A(g) Home Rental)
 * ==========================================================================*/
window.TSIQ = window.TSIQ || {};
TSIQ.strategyModules = TSIQ.strategyModules || [];

TSIQ.strategyModules.push({
  id: 'augusta-rule',
  name: 'Augusta Rule (§280A(g))',
  category: 'Business Expenses',
  applyOrder: 30,
  modeled: true,
  character: 'permanent', // ET2

  advisor: {
    summary:
      'Under §280A(g), a taxpayer who rents their personal residence for fewer ' +
      'than 15 days per year excludes the rental income entirely — no reporting, ' +
      'no tax. The business entity rents the owner\'s home for legitimate business ' +
      'meetings (board meetings, planning retreats, trainings) at a documented ' +
      'market rate and deducts the rent under §162. Result: deductible to the ' +
      'entity, tax-free to the owner. Sinopoli (2023) shows the IRS will attack ' +
      'inflated rates and thin documentation, not the structure itself.',
    mechanics: [
      '§280A(g): if a dwelling used as a residence is rented for < 15 days ' +
      'during the year, rental income is excluded and rental deductions denied.',
      'The entity deducts rent as an ordinary and necessary expense under §162 — ' +
      'which requires a bona fide business purpose for each rental day.',
      'Market rate must be defensible: comparable local venue quotes (hotel ' +
      'conference rooms, event spaces) for similar capacity/duration, retained ' +
      'in the file. Daily-rate comps, not monthly residential rent ÷ 30.',
      'Each meeting needs contemporaneous support: agenda, minutes, attendees, ' +
      'invoice from the owner to the entity, and actual payment.',
      'Works with S corps, partnerships, and C corps. A Schedule C sole ' +
      'proprietor renting from themselves is one taxpayer paying itself — the ' +
      'deduction is not respected (§280A(a) disallowance applies with no ' +
      'separate-entity payor). Requires a separate entity.'
    ],
    authority: [
      { type: 'IRC', cite: 'IRC §280A(g)', note: 'The exclusion: dwelling used as a residence, rented < 15 days — income not includible, deductions not allowable.' },
      { type: 'IRC', cite: 'IRC §162(a)', note: 'The entity-side deduction — requires ordinary, necessary, and reasonable-in-amount rent with a business purpose.' },
      { type: 'Case', cite: 'Sinopoli v. Comm\'r, T.C. Memo 2023-105', note: 'IRS allowed the structure but slashed $3,000+/meeting rents to $500 where taxpayers had no comparable-rate evidence and thin meeting documentation. The blueprint for what NOT to do.' },
      { type: 'IRC', cite: 'IRC §280A(a)', note: 'General disallowance for dwelling-unit expenses — why a self-rental by a sole proprietor fails.' },
      { type: 'Admin', cite: 'IRC §274 substantiation principles', note: 'Contemporaneous documentation standard the courts expect for the business purpose of each rental day.' }
    ],
    requirements: [
      'A separate business entity (S corp, partnership, C corp) as the paying tenant.',
      '14 or fewer rental days per residence per year — day 15 makes ALL of it taxable.',
      'Genuine business events: agendas, minutes, attendee lists for every date.',
      'Written rental invoice and actual payment (entity check/transfer to owner).',
      'Comparable-venue rate documentation supporting the daily rate.'
    ],
    risks: [
      'Rate inflation is the audit target (Sinopoli) — an unsupported $2,500/day home rental gets cut to a few hundred dollars.',
      'Sham meetings (weekly "board meetings" of a single-owner entity with no minutes) invite full disallowance plus accuracy penalties.',
      'Exceeding 14 days converts every dollar to taxable rental income.',
      'Benefit is modest relative to other strategies — do not let a client take aggressive positions for a few thousand dollars of deduction.'
    ],
    bestFit: [
      'Entity owners who already hold legitimate planning meetings, trainings, or client events.',
      'Homes genuinely suited to hosting (space for the stated attendee count).',
      'Clients disciplined about documentation.'
    ],
    implementation: [
      'Adopt a corporate resolution authorizing home rentals for specified business purposes.',
      'Gather 2–3 comparable venue quotes annually; set the daily rate from them.',
      'Calendar the meetings; prepare agenda + minutes each time.',
      'Owner invoices the entity; entity pays by traceable method.',
      'Track the day count — hard stop at 14.'
    ]
  },

  client: {
    teaser: 'Moves money from your business to your pocket — completely tax-free',
    headline: 'Rent your home to your business — tax-free',
    plainEnglish: [
      'There is a little-known rule, nicknamed the "Augusta Rule" after homeowners in Augusta, Georgia who rent their homes during the Masters golf tournament: if you rent out your home for 14 days or fewer in a year, the rent you collect is completely tax-free. You do not even report it.',
      'Your business, meanwhile, needs places to meet — board meetings, annual planning sessions, team trainings. Instead of paying a hotel conference room, your business can rent your home for those meetings at the going local rate.',
      'The business deducts the rent as a normal business expense. You receive the money personally and pay zero tax on it. It is one of the cleanest ways to move money from your business to your pocket.'
    ],
    analogy: 'Your business was going to pay someone for meeting space anyway. This rule lets that someone be you — and uniquely, you do not pay tax on it.',
    benefits: [
      'Up to 14 days of rental income per year, completely tax-free to you',
      'Fully deductible to your business',
      'No special filings — just good records',
      'Repeats every year'
    ],
    steps: [
      'We document a fair daily rate using real quotes from local venues',
      'Your business schedules its meetings at your home (up to 14 days)',
      'Each meeting gets a simple agenda and minutes — we provide templates',
      'Your business pays you rent; you keep it tax-free'
    ],
    considerations: [
      'The 14-day limit is absolute — day 15 makes all of it taxable, so we track the count.',
      'The meetings must be real and documented, and the rate must match what a comparable venue actually charges. We set both conservatively.'
    ]
  },

  inputs: [
    { key: 'days', label: 'Rental days per year (max 14)', type: 'number', default: 12, max: 14 },
    { key: 'dailyRate', label: 'Documented daily rate', type: 'currency', default: 1000 }
  ],

  suggest: function (p) {
    if (!(p.passthroughK1 > 0)) return null;
    return { reason: 'A business entity exists — up to 14 days of home rental can move money out tax-free.' };
  },

  appliesTo: function (profile) {
    return true; // validated in apply(): needs entity income
  },

  /**
   * Deducts rent from entity income; the income side is excluded (§280A(g))
   * so nothing is added back to personal income. Requires passthrough entity
   * income — a sole proprietor self-rental is not respected.
   */
  apply: function (profile, params, yearIndex, state) {
    var p = Object.assign({}, profile);
    var notes = [];
    var days = Math.min(params.days || 0, 14);
    if ((params.days || 0) > 14) {
      notes.push('Days capped at 14 — the §280A(g) exclusion is lost entirely at 15+ days.');
    }
    var rent = days * (params.dailyRate || 0);
    if (p.passthroughK1 > 0) {
      p.passthroughK1 = p.passthroughK1 - rent;
      if (yearIndex === 0) {
        notes.push(TSIQ.fmt.usd(rent) + ' rent (' + days + ' days) deducted by the entity; excluded from personal income under §280A(g).');
      }
    } else {
      notes.push('Requires a separate business entity as the tenant — a sole proprietor ' +
        'renting from themselves is not respected. Pair with the S-Corp Election strategy. No benefit modeled.');
    }
    return { profile: p, notes: notes };
  }
});
