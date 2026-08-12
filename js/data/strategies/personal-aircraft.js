/* ============================================================================
 * STRATEGY: Business Use of Personal Aircraft
 * The advisor enters the annual deduction from a separate depreciation /
 * operating-cost analysis — this file models the tax effect, not the aircraft.
 * ==========================================================================*/
window.TSIQ = window.TSIQ || {};
TSIQ.strategyModules = TSIQ.strategyModules || [];

TSIQ.strategyModules.push({
  id: 'personal-aircraft',
  name: 'Business Use of Personal Aircraft',
  category: 'Business Expenses',
  applyOrder: 42,
  modeled: true,
  character: 'permanent', // ET2

  advisor: {
    summary:
      'An aircraft used predominantly in a trade or business can generate very ' +
      'large deductions: operating costs under §162 and depreciation — ' +
      'including 100% bonus under §168(k) (permanent post-OBBBA) — on the ' +
      'purchase. But aircraft are the single most audit-exposed deduction in ' +
      'this library: they are §280F listed property requiring >50% qualified ' +
      'business use with flight-by-flight substantiation, entertainment flights ' +
      'are disallowed under the Reg. §1.274-10 occupied-seat rules, personal ' +
      'flights by owners must be imputed as income under the SIFL rules, and ' +
      'the IRS announced a dedicated corporate/high-income aircraft audit ' +
      'campaign in February 2024. The advisor enters the annual deduction from ' +
      'a separate depreciation and cost analysis; this tool models the tax ' +
      'effect only. Do not present this strategy without the underlying study.',
    mechanics: [
      'Deductibility starts with §162: the flying must be ordinary and ' +
      'necessary to the business (client visits, multi-site operations, ' +
      'time-critical travel a commercial schedule cannot serve), documented ' +
      'flight-by-flight with passengers and business purpose.',
      'Aircraft are listed property (§280F(d)(4) — property used as a means of ' +
      'transportation): accelerated depreciation and bonus require MORE than ' +
      '50% qualified business use each year, tested with detailed flight logs; ' +
      'falling below triggers recapture and ADS straight-line going forward.',
      'Entertainment use is disallowed: Reg. §1.274-10 requires allocating ' +
      'costs (including depreciation) across flights by occupied seat hours/' +
      'miles and disallows the share attributable to entertainment passengers, ' +
      'even when income is imputed to the executive.',
      'Personal non-entertainment flights by an owner-employee are compensation: ' +
      'income is imputed under the SIFL formula of Reg. §1.61-21(g) (or actual ' +
      'charter value), and the deduction/compensation mismatch is a recurring ' +
      'exam adjustment.',
      'If the activity is not conducted for profit (the "N-number hobby"), §183 ' +
      'limits deductions; leasing structures between the owner and the business ' +
      'also raise §469 passive/self-rental and sales-tax issues that need ' +
      'separate analysis.',
      'The IRS Large Business & International division announced an aircraft-' +
      'usage audit campaign in February 2024 targeting exactly this fact ' +
      'pattern — assume this deduction will be examined and build the file first.'
    ],
    authority: [
      { type: 'IRC', cite: 'IRC §162(a)', note: 'Ordinary and necessary standard — the business purpose of each flight is the foundation.' },
      { type: 'IRC', cite: 'IRC §280F(d)(4)', note: 'Aircraft are listed property (means of transportation): >50% qualified business use required for accelerated/bonus depreciation; recapture on failure.' },
      { type: 'IRC', cite: 'IRC §168(k)', note: '100% bonus depreciation, permanent post-OBBBA, for qualified property including aircraft acquired after 1/19/2025 (longer-production-period property has extended placed-in-service rules).' },
      { type: 'Reg', cite: 'Reg. §1.274-10', note: 'Entertainment use of aircraft: occupied-seat allocation of ALL costs including depreciation; entertainment share disallowed.' },
      { type: 'Reg', cite: 'Reg. §1.61-21(g)', note: 'SIFL rules — imputed income to owner-employees for personal flights on employer-provided aircraft.' },
      { type: 'IRC', cite: 'IRC §183', note: 'Hobby-loss limitation where the aircraft activity lacks a profit motive.' },
      { type: 'Admin', cite: 'IRS LB&I aircraft audit campaign (announced Feb. 2024)', note: 'Dedicated examination initiative on business-aircraft usage by corporations, partnerships, and high-income individuals.' }
    ],
    requirements: [
      'A genuine, recurring business transportation need that commercial travel serves poorly.',
      '>50% qualified business use, proven by contemporaneous flight logs (date, route, passengers, purpose per flight).',
      'A separate depreciation/operating-cost analysis producing the deduction entered here.',
      'SIFL income imputation in payroll for every personal flight; entertainment-flight cost disallowance computed annually.',
      'Coordination on FAA, state sales/use tax, and insurance issues — outside the scope of this model.'
    ],
    risks: [
      'Audit probability is materially elevated — the IRS announced a dedicated aircraft campaign in 2024; assume examination.',
      'Listed-property failure (business use ≤50% in any year of the recovery period) triggers depreciation recapture and ADS going forward.',
      'Entertainment flights disallow a proportionate share of ALL costs including bonus depreciation (Reg. §1.274-10) — one season of personal-heavy flying can gut the deduction.',
      'Hobby-loss recharacterization under §183 where business rationale is thin.',
      'Missed SIFL imputation is a payroll-tax exposure on top of the deduction adjustment.',
      'The economics rarely pencil on tax savings alone — the aircraft must make business sense before tax.'
    ],
    bestFit: [
      'Owners with genuine multi-site operations or client bases poorly served by commercial schedules.',
      'High-income years where bonus depreciation on a business-required aircraft has maximum rate value.',
      'Clients willing to fund the compliance infrastructure: flight logs, SIFL payroll entries, annual entertainment-use allocation.'
    ],
    implementation: [
      'Commission the underlying analysis first: projected business vs. personal flight hours, depreciation schedule, operating costs, and entity/ownership structure.',
      'Document the business-purpose case (routes, time savings, opportunity cost) BEFORE acquisition.',
      'Implement flight-by-flight logging (date, route, passengers, seat-by-seat purpose classification) from the first flight.',
      'Set up annual Reg. §1.274-10 entertainment-use allocation and SIFL imputation in payroll.',
      'Enter the supported annual deduction from the analysis into this model; refresh it each year.',
      'Review listed-property business-use percentage annually; calendar the recapture exposure.'
    ]
  },

  client: {
    teaser: 'A serious deduction for a serious business tool — with serious rules',
    headline: 'When the plane is a business tool, the tax law treats it like one',
    plainEnglish: [
      'If your business genuinely depends on private air travel — multiple locations, clients spread across the map, schedules commercial airlines cannot meet — the tax law allows real deductions: the operating costs of business flights, and potentially a very large first-year depreciation write-off on the aircraft itself.',
      'This is also one of the most closely watched deductions in the entire tax code. The IRS runs a dedicated audit program for business aircraft. Every flight needs a log showing who was on board and why. Personal trips get added to your income at IRS-set rates, and vacation-style flights can cancel part of the deduction. None of that is a reason to avoid the strategy — it is a reason to do it properly.',
      'Our role is to make sure the numbers come from a real analysis, the records are built from day one, and the deduction we claim is one we can defend without flinching.'
    ],
    analogy: 'Think of it like a company truck, times a thousand — the write-off is bigger, and so is the paperwork that has to ride along with it.',
    benefits: [
      'Deducts the business share of a major operating cost',
      'Potentially a very large first-year depreciation deduction',
      'Structured to survive the IRS\'s dedicated aircraft audit program',
      'We coordinate the specialists so nothing falls through the cracks'
    ],
    steps: [
      'We start with a real analysis of business vs. personal use and the dollars involved',
      'We set up the flight log and payroll items before the first flight',
      'We claim the supported deduction on your return',
      'We review usage every year to keep the position solid'
    ],
    considerations: [
      'The IRS has a dedicated audit campaign for business aircraft — records are not optional, and we will only claim what the logs support.',
      'Personal flights add taxable income to you, and entertainment trips reduce the deduction. The plane needs a genuine business job.',
      'The purchase must make business sense on its own — tax savings help, but they never pay for an aircraft.'
    ]
  },

  inputs: [
    { key: 'annualDeduction', label: 'Annual deduction (from separate aircraft analysis)', type: 'currency', default: 100000 }
  ],

  appliesTo: function (profile) {
    return true; // needs business income; validated with a note in apply()
  },

  /**
   * Reduces business income by the advisor-entered annual amount from the
   * separate aircraft analysis. Depreciation timing/recapture, entertainment
   * disallowance, and SIFL income are handled in that analysis, not here —
   * this file only translates the supported deduction into the scenario.
   */
  apply: function (profile, params, yearIndex, state) {
    var p = Object.assign({}, profile);
    var notes = [];
    var amt = params.annualDeduction || 0;

    if (p.scheduleCNet > 0) {
      p.scheduleCNet = p.scheduleCNet - amt;
    } else if (p.passthroughK1 > 0) {
      p.passthroughK1 = p.passthroughK1 - amt;
    } else {
      notes.push('Requires business income (Schedule C or entity). No benefit modeled.');
      return { profile: p, notes: notes };
    }

    if (yearIndex === 0) {
      notes.push(TSIQ.fmt.usd(amt) + '/yr aircraft deduction applied per the separate ' +
        'analysis — depreciation schedule, entertainment-use disallowance, and SIFL ' +
        'imputation live in that analysis, not in this model.');
      notes.push('High-scrutiny position: >50% business use (listed property), flight-by-' +
        'flight logs, and the 2024 IRS aircraft audit campaign all apply — see advisor detail.');
    }
    return { profile: p, notes: notes };
  }
});
