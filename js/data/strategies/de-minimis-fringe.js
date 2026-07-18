/* ============================================================================
 * STRATEGY: De Minimis Fringe Benefits (ADVISORY)
 * ==========================================================================*/
window.TSIQ = window.TSIQ || {};
TSIQ.strategyModules = TSIQ.strategyModules || [];

TSIQ.strategyModules.push({
  id: 'de-minimis-fringe',
  name: 'De Minimis Fringe Benefits',
  category: 'Business Expenses',
  applyOrder: 47,
  modeled: false,
  character: 'permanent', // ET2

  advisor: {
    summary:
      'Section 132(e) excludes from employee income any property or service ' +
      'whose value is so small, and whose provision is so infrequent, that ' +
      'accounting for it is unreasonable or administratively impracticable — ' +
      'occasional snacks and coffee, holiday gifts of low-value property, ' +
      'occasional meal money for overtime, group meals, flowers for life ' +
      'events. Properly classified, these are deductible to the employer and ' +
      'tax-free to the employee with zero payroll reporting. Two hard edges: ' +
      'CASH and cash equivalents (gift cards) are NEVER de minimis regardless ' +
      'of amount (Reg. §1.132-6(c)), and there is no statutory dollar bright ' +
      'line — frequency and value are judged together. Employer-provided cell ' +
      'phones have their own safe harbor: Notice 2011-72 treats business-' +
      'reason phones (and their personal use) as excludable. Advisory: this is ' +
      'payroll hygiene and audit-proofing, not a modelable deduction — the ' +
      'costs are typically already being deducted; the win is keeping them off W-2s.',
    mechanics: [
      'The test (§132(e)(1); Reg. §1.132-6): value AND frequency both matter — ' +
      'small value provided occasionally is excludable; the same item provided ' +
      'routinely (daily meal money, monthly gift) fails because frequency makes ' +
      'accounting practicable.',
      'Cash rule (Reg. §1.132-6(c)): cash and cash equivalents — gift cards, ' +
      'gift certificates redeemable for general merchandise — are never de ' +
      'minimis. A $15 gift card is W-2 wages; a $15 coffee mug is not. ' +
      '(Occasional meal money/cab fare for overtime is the narrow exception, ' +
      'and it must be occasional.)',
      'No dollar bright line exists in the statute or regs. Practice lore ' +
      'treats items under roughly $25–$100 as comfortable when infrequent, but ' +
      'that is calibration, not law — frequency can disqualify even trivial amounts.',
      'Cell phones (Notice 2011-72): a phone provided primarily for ' +
      'noncompensatory business reasons (after-hours availability, client ' +
      'contact) is a working-condition fringe and the personal use is de ' +
      'minimis — no logging, no imputation. Reimbursement of employee-owned ' +
      'phones for business reasons gets parallel treatment (IRS field guidance).',
      'Traditional de minimis examples in the regs: occasional typing of ' +
      'personal letters, occasional parties/picnics for employees, occasional ' +
      'supper money, holiday gifts of property with low FMV, coffee/doughnuts/' +
      'soft drinks.',
      'Deduction-side note for 2026: §274(o) makes employer-operated eating ' +
      'facilities and §119 convenience-of-the-employer meals NONDEDUCTIBLE for ' +
      'amounts paid after 12/31/2025. The employee-side §132(e) exclusion is ' +
      'unchanged, but clients running significant on-site meal programs lose ' +
      'the deduction — flag it in planning.'
    ],
    authority: [
      { type: 'IRC', cite: 'IRC §132(a)(4), (e)', note: 'The exclusion: property or service so small in value, accounting for it is unreasonable or administratively impracticable — value and frequency weighed together.' },
      { type: 'Reg', cite: 'Reg. §1.132-6', note: 'Operative rules and examples; (c) makes cash and cash equivalents (gift certificates/cards) never excludable as de minimis; (d) occasional meal money/transit fare rules.' },
      { type: 'Admin', cite: 'Notice 2011-72', note: 'Employer-provided cell phones for noncompensatory business reasons: business use is a working-condition fringe; personal use is de minimis — no recordkeeping required.' },
      { type: 'IRC', cite: 'IRC §274(o)', note: 'For amounts paid after 2025: employer eating-facility and §119 convenience-meal costs nondeductible — the employer-deduction change that reshapes on-site meal programs in 2026.' },
      { type: 'IRC', cite: 'IRC §274(j)(3)(A)(ii)', note: 'Parallel codified rule for achievement awards confirming Congress\'s view that cash equivalents and gift cards are taxable — useful cross-support in exam.' }
    ],
    requirements: [
      'Benefits that are genuinely small in value and OCCASIONAL — frequency is half the test.',
      'A written policy listing which perks the business provides and confirming the no-cash/no-gift-card rule.',
      'Payroll coordination: anything cash-like goes on the W-2; qualifying de minimis items stay off entirely.',
      'For phones: a documented noncompensatory business reason (after-hours availability, field contact).'
    ],
    risks: [
      'Gift cards are the universal trap — any amount, any occasion, they are W-2 wages, and payroll exams reclassify them across every employee and every open year.',
      'Routine provision destroys the exclusion: daily supper money, a monthly "small" gift, or standing meal allowances are compensation.',
      'There is no safe-harbor dollar amount — advisers who promise "$75 is always fine" are guessing; keep value low and frequency genuinely occasional.',
      'On-site meal programs keep the employee exclusion but lose the employer deduction in 2026 (§274(o)) — budget accordingly.',
      'Perks aimed only at owners look like disguised distributions, not fringe benefits.'
    ],
    bestFit: [
      'Employers already providing snacks, occasional meals, holiday gifts, or phones without a policy — formalizing captures the treatment and kills the W-2 exposure.',
      'Businesses that have been running gift cards through "office expense" (cleanup candidates).',
      'Employers wanting low-cost morale perks with zero payroll friction.'
    ],
    implementation: [
      'Inventory current perks: snacks, meals, gifts, phones, event tickets — classify each as de minimis, working-condition, taxable wage, or (for 2026) deduction-limited meals.',
      'Adopt a one-page fringe policy: approved perks, the no-cash/no-gift-card rule, and frequency guardrails.',
      'Replace gift-card programs with tangible items or run them through payroll as intended bonuses — decide deliberately.',
      'Document the business reason for employer-provided phones (one memo covers the program).',
      'Brief the bookkeeper: separate GL treatment for de minimis perks vs. eating-facility costs (nondeductible 2026+) vs. taxable comp.',
      'Revisit annually — frequency creep is what converts a perk into wages.'
    ]
  },

  client: {
    teaser: 'The small perks you already give can stay off everyone\'s tax forms — if handled right',
    headline: 'Keep the small stuff tax-free — for you and your team',
    plainEnglish: [
      'The tax law has a common-sense rule: perks too small to be worth tracking — coffee and snacks in the break room, an occasional team lunch, flowers when an employee has a baby, a modest holiday gift — do not count as taxable pay. Your business deducts them, your employees owe nothing, and nothing touches a W-2.',
      'But there are two tripwires. First, cash and gift cards NEVER qualify — a $20 gift card is legally taxable wages, no matter how small or festive. Second, "occasional" is part of the deal: the same perk given routinely becomes taxable pay. Most businesses stumble on one of these without knowing it, and it surfaces at the worst time — during a payroll audit, multiplied across every employee and every year.',
      'The fix is a simple written policy: which perks you give, how often, and what is off-limits. Ten minutes of structure protects years of goodwill from becoming a payroll problem.'
    ],
    analogy: 'It\'s like the "12 items or fewer" express lane — genuinely small and occasional sails right through, but try to push a full cart through it and the whole arrangement gets pulled aside.',
    benefits: [
      'Team perks that cost you less than equivalent raises or bonuses',
      'Nothing added to W-2s, no payroll tax, no tracking burden',
      'Company phones handled cleanly with one memo',
      'Protection from the gift-card mistake almost every business makes'
    ],
    steps: [
      'We review the perks you currently give and flag any problems',
      'We set up a simple one-page policy with the do\'s and don\'ts',
      'We fix anything mislabeled in payroll before it becomes an issue',
      'We check in annually to keep the program clean'
    ],
    considerations: [
      'Gift cards are the one everyone gets wrong — they are always taxable pay. We will suggest tax-free alternatives your team will like just as much.',
      'These perks must stay small and occasional — regular allowances are pay, and we will be honest about where the line is.',
      'Starting in 2026, businesses running full on-site meal programs lose the deduction for them — if that is you, we will plan for it.'
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
