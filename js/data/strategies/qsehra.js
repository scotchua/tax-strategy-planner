/* ============================================================================
 * STRATEGY: QSEHRA
 * One source object → advisor view, client PDF, client slideshow.
 * ==========================================================================*/
window.TSIQ = window.TSIQ || {};
TSIQ.strategyModules = TSIQ.strategyModules || [];

TSIQ.strategyModules.push({
  id: 'qsehra',
  name: 'QSEHRA',
  category: 'Health & Fringe',
  applyOrder: 73,
  modeled: true,
  character: 'permanent', // ET2

  advisor: {
    summary:
      'A Qualified Small Employer HRA under §9831(d) (21st Century Cures Act, ' +
      '2016) lets an employer with fewer than 50 full-time-equivalent employees ' +
      'and NO group health plan reimburse employees for individual-market ' +
      'premiums and §213(d) medical expenses — deductible to the business, ' +
      'excluded from the employee\'s income — without violating the ACA market ' +
      'reforms, because a compliant QSEHRA is statutorily defined not to be a ' +
      'group health plan. Reimbursements are capped by indexed dollar limits ' +
      '(approximately $6,450 self-only / $13,100 family for 2026 — verify ' +
      'against the current-year Rev. Proc. before implementation) and must be ' +
      'offered to all eligible employees on the same terms. This is an ' +
      'EMPLOYEE-benefit play: the owner\'s deduction is the modeled benefit ' +
      'here; self-employed owners, partners, and >2% S-corp shareholders ' +
      'cannot themselves participate tax-free.',
    mechanics: [
      'Employer funds reimbursements 100% (no employee salary reductions ' +
      'permitted). Reimbursements of individual health insurance premiums and ' +
      '§213(d) medical care are excluded from employee income under §106/§105(b) ' +
      'if the employee has minimum essential coverage.',
      'Eligibility gate (§9831(d)(3)(B)): the employer must not be an ' +
      'applicable large employer (fewer than 50 FTEs) and must not offer a ' +
      'group health plan to ANY employee.',
      'Same-terms requirement: all eligible employees get the same benefit ' +
      '(variation allowed only by age and family size, tracking individual ' +
      'premium pricing). Employees with under 90 days of service, under age 25, ' +
      'part-time, and seasonal workers may be excluded.',
      'Annual dollar caps are indexed; the 2026 amounts are approximately ' +
      '$6,450 self-only / $13,100 family (verify current figures). Reimbursing ' +
      'above the cap disqualifies the arrangement.',
      'Employee-side interactions: QSEHRA reimbursement reduces any premium ' +
      'tax credit dollar-for-dollar (affordability test under §36B), and the ' +
      'benefit must be reported in Box 12 (code FF) of the W-2.',
      'Business-side modeling here: reimbursements to employees are ordinary ' +
      'deductions reducing business income — SE tax savings included when the ' +
      'business is a Schedule C.'
    ],
    authority: [
      { type: 'IRC', cite: 'IRC §9831(d)', note: 'The QSEHRA statute: definition, <50 FTE and no-group-plan conditions, same-terms rule, indexed dollar caps.' },
      { type: 'Admin', cite: 'Notice 2017-67', note: 'Comprehensive IRS Q&A guidance: eligibility, substantiation, minimum essential coverage requirement, W-2 reporting, PTC coordination.' },
      { type: 'IRC', cite: 'IRC §106; §105(b)', note: 'Exclusion of the reimbursements from employee income where MEC is maintained.' },
      { type: 'IRC', cite: 'IRC §162(a)', note: 'Employer deduction for the reimbursements.' },
      { type: 'IRC', cite: 'IRC §36B(c)(4)', note: 'Premium tax credit coordination — QSEHRA offer reduces or eliminates the employee\'s PTC.' },
      { type: 'IRC', cite: 'IRC §6652(o)', note: 'Penalty for failing the required 90-day advance employee notice.' }
    ],
    requirements: [
      'Fewer than 50 full-time-equivalent employees (not an ALE) and no group health plan offered to any employee — including no group dental/vision unless excepted.',
      'Written plan offered to all eligible employees on the same terms; funded solely by the employer.',
      'Written employee notice at least 90 days before each plan year (or by eligibility date) covering the benefit amount and PTC/MEC disclosures.',
      'Proof of minimum essential coverage from each employee before reimbursing; substantiation of each expense.',
      'W-2 Box 12 code FF reporting of the permitted benefit.'
    ],
    risks: [
      'Offering any group health plan — even inherited from an acquisition — disqualifies the QSEHRA entirely.',
      'Exceeding the indexed dollar caps or varying benefits beyond age/family-size disqualifies the arrangement; failures can convert it to a non-compliant group health plan with §4980D exposure ($100/employee/day).',
      'Notice failures draw §6652(o) penalties ($50/employee, capped annually).',
      'Reimbursing employees who lack minimum essential coverage makes those reimbursements taxable.',
      'Owner expectation management: the owner\'s own family medical costs are generally NOT tax-free through a QSEHRA (self-employed, partners, >2% S-corp shareholders excluded) — the value is a deductible employee benefit that substitutes for costlier group coverage.'
    ],
    bestFit: [
      'Small employers (typically 1–15 employees) who want to help with employee health costs but cannot justify group-plan premiums.',
      'Businesses whose employees mostly have individual-market or spousal coverage already.',
      'Employers competing for staff against larger firms with benefits.'
    ],
    implementation: [
      'Count FTEs and confirm non-ALE status; confirm no group health plan exists (terminate any before the QSEHRA effective date).',
      'Verify the current-year indexed caps from the applicable Revenue Procedure and set benefit levels (may vary only by age/family size).',
      'Adopt the written plan document; distribute the 90-day employee notice.',
      'Collect MEC attestations and substantiate each reimbursement (a TPA is inexpensive and recommended).',
      'Deduct reimbursements on the business return; report code FF on W-2s.',
      'Recheck FTE count and caps annually.'
    ]
  },

  client: {
    teaser: 'Help your team with health costs — without buying a group insurance plan',
    headline: 'Health benefits for your team, without group insurance premiums',
    plainEnglish: [
      'If your business is small and does not offer group health insurance, there is a program designed exactly for you: instead of buying an expensive group plan, your business reimburses each employee for their own health insurance premiums and medical bills, up to a yearly limit set by the IRS.',
      'Those reimbursements are a deductible business expense for you, and your employees receive them tax-free. It turns "we can\'t afford benefits" into a real, meaningful benefit — at a cost you control, because you pick the reimbursement amount up to the legal cap.',
      'One honest note: as the owner, this program is built to benefit your employees, not you personally — the tax rules generally keep owners from reimbursing themselves through it. Your win is the deduction, a competitive benefits package, and happier employees, and we pair it with other strategies for your own family\'s health costs.'
    ],
    analogy: 'Instead of buying everyone the same one-size-fits-all insurance policy, you give each employee a tax-free allowance toward the coverage they already picked for themselves.',
    benefits: [
      'Every dollar reimbursed is a business deduction',
      'Employees receive the money tax-free',
      'You set the budget — no group-plan premium increases',
      'A real recruiting and retention tool for a small team'
    ],
    steps: [
      'We confirm your business qualifies and set the reimbursement amounts',
      'We put the written plan and required employee notices in place',
      'Employees submit proof of coverage and expenses; the business reimburses them',
      'We handle the deduction and W-2 reporting at year-end'
    ],
    considerations: [
      'This is for businesses with no group health plan and fewer than 50 employees — offering both is not allowed.',
      'The tax rules keep owners from using it for their own family in most cases — we plan your household\'s health costs through other strategies.',
      'It comes with required notices and recordkeeping; we set up a simple system so it runs itself.'
    ]
  },

  inputs: [
    { key: 'annualReimbursement', label: 'Total annual reimbursements to employees', type: 'currency', default: 6000 }
  ],

  appliesTo: function (profile) {
    return true; // needs business income; validated with a note in apply()
  },

  /**
   * Models the EMPLOYER deduction only: reimbursements reduce business income.
   * Against scheduleCNet this also saves SE tax; against passthroughK1 it
   * does not. The owner's own participation is not modeled (self-employed
   * owners / >2% S-corp shareholders are excluded from tax-free treatment).
   * Per-employee indexed caps (§9831(d)) are a compliance matter, not
   * enforced here — the input is total plan cost.
   */
  apply: function (profile, params, yearIndex, state) {
    var p = Object.assign({}, profile);
    var notes = [];
    var amt = params.annualReimbursement || 0;
    if (p.scheduleCNet > 0) {
      p.scheduleCNet = p.scheduleCNet - amt;
      if (yearIndex === 0) {
        notes.push(TSIQ.fmt.usd(amt) + ' QSEHRA reimbursements deducted against Schedule C income (also reduces SE tax).');
      }
    } else if (p.passthroughK1 > 0) {
      p.passthroughK1 = p.passthroughK1 - amt;
      if (yearIndex === 0) {
        notes.push(TSIQ.fmt.usd(amt) + ' QSEHRA reimbursements deducted against pass-through income.');
      }
    } else {
      notes.push('QSEHRA requires an operating business with employees — no business income found in this profile. No benefit modeled.');
      return { profile: p, notes: notes };
    }
    if (yearIndex === 0) {
      notes.push('Per-employee 2026 caps are indexed (~$6,450 self / ~$13,100 family — verify against the current Rev. Proc.). Requires <50 FTEs and no group health plan.');
    }
    return { profile: p, notes: notes };
  }
});
