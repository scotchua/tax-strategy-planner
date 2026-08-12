/* ============================================================================
 * STRATEGY: Family Management Company (FMC)
 * One source object → advisor view, client PDF, client slideshow.
 * ==========================================================================*/
window.TSIQ = window.TSIQ || {};
TSIQ.strategyModules = TSIQ.strategyModules || [];

TSIQ.strategyModules.push({
  id: 'family-management-company',
  name: 'Family Management Company (FMC)',
  category: 'Payroll & Family',
  applyOrder: 33,
  modeled: false,
  character: 'permanent', // ET2

  advisor: {
    summary:
      'The under-18 FICA exemption of §3121(b)(3)(A) requires the employer to ' +
      'be the child\'s parent — a sole proprietorship or a partnership owned ' +
      'solely by the parents. An S corporation is a separate employer, so ' +
      'children on S-corp payroll owe full FICA. The FMC workaround: the ' +
      'parents form a sole-proprietorship (or parent-only partnership) ' +
      'management company that employs the children and provides genuine ' +
      'family-labor services — scheduling, content, admin support — to the ' +
      'S corporation under a written services agreement for an arm\'s-length ' +
      'management fee. The S corp deducts the fee under §162; the FMC pays ' +
      'the children FICA-free; the FMC\'s fee income net of wages is roughly ' +
      'zero, so it adds little or no SE tax. The structure lives or dies on ' +
      'the services being real and the fee being defensible — it is a ' +
      'documentation strategy, not a paper one, which is why it is advisory ' +
      'rather than modeled.',
    mechanics: [
      'Parents form a sole prop (one parent) or a general partnership owned ' +
      'only by the two parents — critically NOT an LLC taxed as a corporation ' +
      'and not owned by anyone but the parents, or §3121(b)(3)(A) fails.',
      'A written management services agreement between the FMC and the S corp ' +
      'specifies the services (marketing content, filing, cleaning, mailings, ' +
      'scheduling) and the fee methodology.',
      'The children are employees of the FMC. Because the FMC employer is the ' +
      'parent, wages to under-18 children are FICA-exempt (§3121(b)(3)(A)) ' +
      'and FUTA-exempt to 21 (§3306(c)(5)).',
      'The S corp pays the management fee and deducts it under §162. The fee ' +
      'must be arm\'s-length for services actually delivered — related-party ' +
      'pricing that exists only to move money invites reallocation (§482 ' +
      'principles) or outright disallowance.',
      'FMC economics: fee income minus child wages minus a modest admin ' +
      'margin nets near zero, so the parent picks up little or no additional ' +
      'SE income. Any positive FMC net IS SE income to the parent — price ' +
      'the fee to cover wages plus actual costs.',
      'Combined with the Hiring Children strategy, the endpoint is identical ' +
      'to the sole-prop version: deductible to the operating business, ' +
      'FICA-free wages, income-tax-free to the child up to the standard ' +
      'deduction ($16,100 in 2026).'
    ],
    authority: [
      { type: 'IRC', cite: 'IRC §3121(b)(3)(A)', note: 'FICA exemption for a child under 18 employed by a parent — the reason the FMC must be a parent sole prop or parent-only partnership, not a corporation.' },
      { type: 'IRC', cite: 'IRC §3306(c)(5)', note: 'Parallel FUTA exemption through age 20 for a child employed by a parent.' },
      { type: 'IRC', cite: 'IRC §162(a)', note: 'S corp deduction for the management fee — ordinary, necessary, and reasonable in amount for services actually rendered.' },
      { type: 'IRC', cite: 'IRC §482', note: 'Commissioner\'s authority to reallocate income among commonly controlled businesses — the arm\'s-length standard the fee must survive.' },
      { type: 'IRC', cite: 'IRC §1402(a)', note: 'Any FMC net profit after wages and costs is SE income to the parent — a reason to price the fee at cost plus a thin margin.' },
      { type: 'IRC', cite: 'IRC §63(c)(5)(B)', note: 'The child\'s standard deduction covers earned income up to $16,100 (2026), keeping the wages income-tax-free on the child\'s side.' }
    ],
    requirements: [
      'FMC formed as a parent sole prop or parent-only partnership with its own EIN, bank account, and payroll registration.',
      'Written services agreement between the FMC and the operating S corp, with a fee tied to documented services.',
      'Children do genuine, age-appropriate work tracked with timesheets; wages at market rate.',
      'Monthly (or at least regular) invoicing from the FMC to the S corp with actual payment — no year-end catch-up entries.'
    ],
    risks: [
      'The extra entity is the extra audit surface: an FMC with no invoices, no timesheets, and a fee that exactly equals the kids\' wages looks like what it is. Substance and paper trail are mandatory.',
      'A management fee out of proportion to the services can be reallocated or disallowed under §162/§482 principles — the S corp loses the deduction while payroll consequences remain.',
      'If the FMC is formed as (or elects to be) a corporation, or admits a non-parent owner, the §3121(b)(3)(A) exemption is lost entirely.',
      'FMC net profit above wages and costs picks up SE tax at the parent level, eroding the benefit — monitor annually.',
      'State-level costs: registration, payroll accounts, possible gross receipts or franchise taxes on the FMC.'
    ],
    bestFit: [
      'S-corp owners with children under 18 doing real work who would otherwise lose the FICA exemption.',
      'Families already committed to the Hiring Children strategy where the operating entity form blocks it.',
      'Owners disciplined enough to run a second small entity properly (invoices, payroll, separate account).'
    ],
    implementation: [
      'Form the FMC as a parent sole prop or parent-only partnership; obtain an EIN and open a dedicated bank account.',
      'Draft and sign a management services agreement between the FMC and the S corp; document how the fee was set (wages + payroll costs + modest admin margin).',
      'Register the FMC for payroll; onboard the children with job descriptions, W-4s, and timesheets; mark wages FICA-exempt.',
      'Invoice the S corp monthly; pay by traceable transfer; run FMC payroll on a regular cadence into accounts owned by the children.',
      'File the FMC\'s Schedule C (or Form 1065) and issue the children\'s W-2s each January.',
      'Review annually: services still real, fee still arm\'s-length, children still under 18 (the FICA exemption — and this structure\'s purpose — ends at 18).'
    ]
  },

  client: {
    teaser: 'A small structural fix that restores a family tax break your business type currently blocks',
    headline: 'A family payroll company that unlocks the kids-on-payroll tax break',
    plainEnglish: [
      'Paying your kids for real work in the business is one of the best family tax moves available — their wages are deductible to the business and, because of a special rule for parents who employ their own children, free of Social Security and Medicare tax. But that special rule has a catch: it only works when the parent, personally, is the employer. If your business is an S corporation, the corporation is the employer — and the break disappears.',
      'The fix is a small side business, owned just by you (the parents), that handles the family\'s work for the company — things like marketing content, filing, mailings, and scheduling. Your company pays that side business a fair monthly fee for those services, and the side business employs your kids and pays their wages. Because the kids now work for their parents directly, the tax break is back.',
      'This only works if it is run like a real arrangement: a written agreement, fair pricing, real work, and real records. We set up and maintain all of it.'
    ],
    analogy: 'Your company already outsources things like cleaning or marketing to outside vendors. This makes your family the vendor — through a structure that qualifies for a tax break the company itself cannot get.',
    benefits: [
      'Restores the no-payroll-tax treatment for your kids\' wages',
      'The company deducts the fee like any other vendor expense',
      'Kids can earn up to $16,100 in 2026 with zero income tax',
      'Their earnings can fund Roth IRAs and college savings'
    ],
    steps: [
      'We set up the family company and its bank account',
      'We draft the services agreement and set a fair monthly fee',
      'Your kids do the work; the family company pays them properly',
      'We handle the invoices, payroll forms, and year-end filings'
    ],
    considerations: [
      'This adds a second small business to maintain — the records have to be kept up, and we weigh that effort against the savings before recommending it.',
      'The work and the fee must both be real and defensible; we document everything so it holds up.'
    ]
  },

  inputs: [],

  appliesTo: function (profile) {
    return true;
  },

  apply: function (profile, params, yearIndex, state) {
    return { profile: profile, notes: yearIndex === 0
      ? ['Advisory strategy — appears in the plan documents but does not change the scenario math. Model the wage deduction itself with the Hiring Children strategy once the FMC is in place.']
      : [] };
  }
});
