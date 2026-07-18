/* ============================================================================
 * STRATEGY: Home Office Deduction (Sole Prop)
 * ==========================================================================*/
window.TSIQ = window.TSIQ || {};
TSIQ.strategyModules = TSIQ.strategyModules || [];

TSIQ.strategyModules.push({
  id: 'home-office-deduction',
  name: 'Home Office Deduction (Sole Prop)',
  category: 'Business Expenses',
  applyOrder: 41,
  modeled: true,
  character: 'permanent', // ET2

  advisor: {
    summary:
      'A Schedule C proprietor who uses part of the home exclusively and ' +
      'regularly as the principal place of business (or to meet clients, or as ' +
      'a separate structure) deducts the business-use share of home costs under ' +
      '§280A(c) via Form 8829, or elects the Rev. Proc. 2013-13 simplified ' +
      'method ($5/sq ft, 300 sq ft max, $1,500 cap). The deduction reduces net ' +
      'Schedule C profit, saving both income tax and SE tax. "Principal place ' +
      'of business" includes a space used for administrative or management ' +
      'activities when there is no other fixed location where the taxpayer ' +
      'conducts substantial administrative work — the statutory fix that ' +
      'superseded the narrow Soliman result. This is the sole-proprietor ' +
      'version; S-corp owners must run home-office costs through an ' +
      'accountable-plan reimbursement instead (see Accountable Plan).',
    mechanics: [
      'Qualifying use (§280A(c)(1)): a portion of the dwelling used EXCLUSIVELY ' +
      'and on a REGULAR basis as (A) the principal place of business, (B) a ' +
      'place to meet patients/clients/customers in the normal course, or (C) a ' +
      'separate structure not attached to the dwelling. Exclusive means no ' +
      'personal use of the space at all.',
      'Actual-expense method (Form 8829): business-use percentage (office sq ft ' +
      '÷ home sq ft) applied to rent or mortgage interest, real estate taxes, ' +
      'utilities, insurance, repairs, plus depreciation on the office share of ' +
      'the home\'s basis. Direct expenses of the office (e.g., painting that ' +
      'room) are 100% deductible.',
      'Simplified method (Rev. Proc. 2013-13): $5 per square foot, capped at ' +
      '300 sq ft — a $1,500 maximum. No depreciation is claimed, so no §1250 ' +
      'unrecaptured gain accrues on later sale of the home, and mortgage ' +
      'interest/taxes stay fully on Schedule A. Elected year-by-year on the ' +
      'timely return; no Form 8829.',
      'Gross-income limitation (§280A(c)(5)): the deduction cannot create or ' +
      'increase a Schedule C loss. Under the actual method, disallowed amounts ' +
      'carry forward; under the simplified method there is NO carryover of the ' +
      'excess.',
      'Because the deduction lands on Schedule C, it reduces SE income too — ' +
      'each dollar saves income tax AND ~14.1% effective SE tax below the ' +
      'wage base.',
      'Depreciation claimed (or allowable) under the actual method is ' +
      'unrecaptured §1250 gain on sale, taxed up to 25%, and is not shielded ' +
      'by the §121 home-sale exclusion.'
    ],
    authority: [
      { type: 'IRC', cite: 'IRC §280A(c)(1)', note: 'Exclusive and regular use as principal place of business, client-meeting space, or separate structure; flush language (added 1997) treats a space used for substantial administrative/management activities as the principal place of business when there is no other fixed location for them.' },
      { type: 'IRC', cite: 'IRC §280A(c)(5)', note: 'Gross-income limitation — home-office deductions cannot create a business loss; excess carries forward (actual method only).' },
      { type: 'Case', cite: 'Comm\'r v. Soliman, 506 U.S. 168 (1993)', note: 'Narrow "principal place of business" test (relative importance/time). Superseded prospectively by the 1997 statutory amendment for administrative/management use — cited to explain the current statutory language.' },
      { type: 'Admin', cite: 'Rev. Proc. 2013-13', note: 'Simplified method: $5/sq ft up to 300 sq ft ($1,500 max), elected annually; no depreciation, no carryover of amounts over the income limit.' },
      { type: 'Admin', cite: 'Form 8829 / IRS Pub. 587', note: 'Computation and reporting of actual-expense home office; IRS guidance on qualifying use.' },
      { type: 'IRC', cite: 'IRC §121(d)(6); §1250', note: 'Post-May-6-1997 depreciation is not excluded on sale of the residence — unrecaptured §1250 gain taxed up to 25%.' }
    ],
    requirements: [
      'Net Schedule C profit — the deduction is limited to business gross income (§280A(c)(5)).',
      'A specific area used exclusively and regularly for the business (measure it; photograph it).',
      'For the principal-place-of-business prong: no other fixed location where substantial administrative work is done.',
      'Actual method: records of home expenses and the square-footage computation; Form 8829 filed with Schedule C.'
    ],
    risks: [
      'Exclusive use is strictly construed — a guest room/office or a desk in the family room fails. This is the most common exam loss.',
      'Actual-method depreciation creates unrecaptured §1250 gain on sale that the §121 exclusion does not cover — plan the exit or use the simplified method.',
      'The simplified method\'s $1,500 cap and no-carryover rule can leave money on the table for large offices or high-cost homes — run both computations.',
      'Deduction disallowed to the extent it creates a loss; simplified-method excess is lost entirely.',
      'A sole proprietor deducts this directly on Schedule C — but an S-corp owner cannot; after incorporation the only path is an accountable-plan reimbursement.'
    ],
    bestFit: [
      'Profitable Schedule C proprietors who genuinely run the business from home.',
      'Renters (actual method shines — rent is otherwise nondeductible).',
      'Clients wary of recordkeeping or of recapture on a future home sale (simplified method).'
    ],
    implementation: [
      'Confirm the exclusive-use space and measure square footage (office and whole home).',
      'Run both methods: Form 8829 actual vs. $5/sq ft simplified; pick the larger sustainable number.',
      'Actual method: assemble the year\'s home costs (interest, taxes, utilities, insurance, repairs) and compute depreciation on the office share of basis.',
      'File Form 8829 with Schedule C (actual) or elect simplified on Schedule C line 30 — the election is year-by-year.',
      'Document the space (photos, floor plan) in the permanent file; recheck annually as use changes.',
      'If the client later elects S-corp status, convert this to an accountable-plan reimbursement — do not leave it on a Schedule C that no longer exists.'
    ]
  },

  client: {
    teaser: 'Turns bills you already pay every month into a business deduction',
    headline: 'Get paid back by your tax return for working from home',
    plainEnglish: [
      'If you run your business from a dedicated space in your home, the tax law lets you deduct the business share of costs you are already paying — rent or mortgage interest, utilities, insurance, and repairs. The catch: the space has to be used only for business, on a regular basis. A spare bedroom that is truly your office qualifies; a desk in the corner of the living room does not.',
      'There are two ways to figure the deduction. The simple way is $5 for every square foot of office space, up to $1,500 a year, with almost no recordkeeping. The detailed way adds up your actual home costs and deducts the office\'s share — often more money, but it requires records and has a small tax consequence when you eventually sell the home. We calculate both and pick the one that serves you best.',
      'Because this deduction comes off your business profit, it saves you two taxes at once: regular income tax and self-employment tax.'
    ],
    analogy: 'Your home is quietly doubling as your office rent-free. This deduction makes the tax return finally acknowledge the rent.',
    benefits: [
      'Deducts a slice of costs you were paying anyway',
      'Saves both income tax and self-employment tax',
      'A no-receipts simple option is available ($5 per square foot)',
      'Repeats every year you work from home'
    ],
    steps: [
      'We confirm your workspace qualifies and measure it',
      'We calculate the deduction both ways and choose the better one',
      'We file the right forms with your return — nothing extra for you to send the IRS',
      'We keep the documentation that makes it audit-ready'
    ],
    considerations: [
      'The space must be used only for business — that rule is strict, and we will be honest with you about whether your setup qualifies.',
      'The detailed method claims depreciation on your home, which slightly increases tax when you sell it someday. We factor that in when choosing the method.',
      'The deduction cannot be larger than your business profit for the year.'
    ]
  },

  inputs: [
    { key: 'method', label: 'Method', type: 'select', default: 'actual',
      options: [{ value: 'actual', label: 'Actual expenses (Form 8829)' }, { value: 'simplified', label: 'Simplified ($5/sq ft, $1,500 max)' }] },
    { key: 'annualAmount', label: 'Annual home-office deduction', type: 'currency', default: 6000 }
  ],

  appliesTo: function (profile) {
    return true; // needs Schedule C profit; validated with a note in apply()
  },

  /**
   * Reduces scheduleCNet (income tax + SE tax savings). Enforces the $1,500
   * simplified-method cap (Rev. Proc. 2013-13) and the §280A(c)(5) gross-income
   * limitation (cannot create a loss). Sole-prop only: without Schedule C
   * income the advisor is pointed to the accountable plan.
   */
  apply: function (profile, params, yearIndex, state) {
    var p = Object.assign({}, profile);
    var notes = [];
    var amt = params.annualAmount || 0;

    if (!(p.scheduleCNet > 0)) {
      notes.push('Requires Schedule C profit. No sole-prop income on this profile — ' +
        'for S-corp/partnership owners, run home-office costs through the Accountable ' +
        'Plan strategy instead. No benefit modeled.');
      return { profile: p, notes: notes };
    }

    if (params.method === 'simplified' && amt > 1500) {
      amt = 1500; // Rev. Proc. 2013-13: $5/sq ft × 300 sq ft max
      notes.push('Simplified method capped at $1,500 ($5/sq ft × 300 sq ft max, Rev. Proc. 2013-13).');
    }
    if (amt > p.scheduleCNet) {
      // §280A(c)(5): cannot create/increase a Schedule C loss.
      notes.push('Deduction limited to Schedule C profit (§280A(c)(5) gross-income limitation)' +
        (params.method === 'simplified' ? ' — no carryover under the simplified method.' : ' — excess carries forward (not modeled).'));
      amt = p.scheduleCNet;
    }

    p.scheduleCNet = p.scheduleCNet - amt;
    if (yearIndex === 0) {
      notes.push(TSIQ.fmt.usd(amt) + ' home-office deduction (' +
        (params.method === 'simplified' ? 'simplified method' : 'actual expenses, Form 8829') +
        ') reduces Schedule C profit — saves income tax and SE tax.');
      if (params.method !== 'simplified') {
        notes.push('Actual method claims home depreciation — unrecaptured §1250 gain on a future home sale is not modeled.');
      }
    }
    return { profile: p, notes: notes };
  }
});
