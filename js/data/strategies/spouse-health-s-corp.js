/* ============================================================================
 * STRATEGY: S-Corp 2% Shareholder Health Insurance
 * One source object → advisor view, client PDF, client slideshow.
 * ==========================================================================*/
window.TSIQ = window.TSIQ || {};
TSIQ.strategyModules = TSIQ.strategyModules || [];

TSIQ.strategyModules.push({
  id: 'spouse-health-s-corp',
  name: 'S-Corp 2% Shareholder Health Insurance',
  category: 'Payroll & Family',
  applyOrder: 37,
  modeled: true,

  // Non-blocking hint only — an existing S-corp owner (ownerWages already
  // entered) doesn't need the election paired in the SAME scenario.
  requiresOneOf: ['s-corp-election'],

  advisor: {
    summary:
      'A more-than-2% S corporation shareholder is treated as a partner for ' +
      'fringe benefit purposes under §1372, so health insurance premiums the ' +
      'corporation pays (or reimburses) for the shareholder are not an ' +
      'excludable fringe — they must be included in the shareholder\'s W-2 ' +
      'Box 1 wages. But the inclusion is exempt from FICA (Announcement ' +
      '92-16), and once the premiums run through wages, the shareholder ' +
      'deducts them above the line as self-employed health insurance under ' +
      '§162(l) (Rev. Rul. 91-26; Notice 2008-1). Net federal effect: the ' +
      'entity deduction and the wage inclusion wash, leaving the §162(l) ' +
      'deduction — which converts premiums the owner was paying with ' +
      'after-tax dollars into an above-the-line deduction, with zero payroll ' +
      'tax cost. The mechanics are unforgiving: premiums paid personally and ' +
      'never run through the entity and the W-2 forfeit the deduction.',
    mechanics: [
      '§1372 treats a >2% shareholder (including a spouse and other §318 ' +
      'attribution family) as a partner for fringe purposes — the §106 ' +
      'exclusion is off the table; the premiums are compensation.',
      'The corporation pays the premiums directly or reimburses the ' +
      'shareholder under a documented arrangement, deducts them as officer ' +
      'compensation, and adds them to W-2 Box 1 — NOT Boxes 3/5, because ' +
      'Announcement 92-16 exempts the inclusion from FICA.',
      'Rev. Rul. 91-26 establishes the partner/2%-shareholder premium ' +
      'framework; Notice 2008-1 confirms the §162(l) deduction works even ' +
      'when the policy is in the shareholder\'s own name, provided the ' +
      'S corp pays or reimburses the premiums and includes them in wages.',
      'The shareholder then deducts the premiums above the line under ' +
      '§162(l), limited to earned income from the business — for a >2% ' +
      'shareholder, their W-2 wages from the S corp (§162(l)(5)(A)). Wages ' +
      'must be at least the premiums for a full deduction.',
      'No deduction is allowed for any month the shareholder or spouse is ' +
      'ELIGIBLE to participate in a subsidized employer health plan — ' +
      'eligibility alone, not enrollment, kills that month (§162(l)(2)(B)).',
      'Net result vs. paying the same premiums personally: an above-the-line ' +
      'deduction at the marginal rate, no FICA on the inclusion, and no ' +
      'itemized-deduction 7.5%-AGI medical floor to fight through.'
    ],
    authority: [
      { type: 'IRC', cite: 'IRC §1372', note: 'S corporation treated as a partnership and >2% shareholders as partners for fringe benefit purposes — premiums are compensation, not excludable fringes.' },
      { type: 'IRC', cite: 'IRC §162(l)', note: 'Above-the-line self-employed health insurance deduction; limited to earned income — for 2% shareholders, W-2 wages from the corporation.' },
      { type: 'IRC', cite: 'IRC §162(l)(2)(B)', note: 'No deduction for any calendar month of eligibility for a subsidized employer plan of the taxpayer OR spouse.' },
      { type: 'Admin', cite: 'Rev. Rul. 91-26', note: 'Accident and health premiums paid for a partner or 2% shareholder-employee treated as compensation includible in income.' },
      { type: 'Admin', cite: 'Notice 2008-1', note: 'The controlling mechanics: policy may be in the shareholder\'s name if the S corp pays or reimburses and includes premiums in W-2 wages; otherwise no §162(l) deduction.' },
      { type: 'Admin', cite: 'Announcement 92-16', note: 'The Box 1 inclusion for 2% shareholder health premiums is NOT wages for FICA purposes — no payroll tax cost.' }
    ],
    requirements: [
      'An S corporation paying the owner W-2 wages at least equal to the premiums (§162(l) is wage-limited for 2% shareholders).',
      'Premiums paid by the corporation, or reimbursed under a documented arrangement — never simply paid personally with no entity involvement.',
      'Payroll processing that adds the premiums to Box 1 only (no FICA boxes) and shows them on the W-2.',
      'No month of eligibility for a subsidized employer plan through the shareholder\'s or spouse\'s other employment.'
    ],
    risks: [
      'The most common failure is procedural: premiums paid personally all year with no entity payment/reimbursement and no W-2 inclusion — the deduction is simply lost for that year (Notice 2008-1 leaves no cure after the fact).',
      'Spouse takes a job with subsidized coverage mid-year: every month of mere ELIGIBILITY disallows the deduction, even if the family never enrolls.',
      'W-2 wages below the premium level cap the deduction — coordinate with reasonable-compensation planning.',
      'Payroll providers that route the inclusion through FICA boxes create needless payroll tax; the setup must be checked the first year.',
      'IRS FAQ guidance treats the §162(l) deduction as reducing QBI for the S corp owner — this model applies that §199A offset.'
    ],
    bestFit: [
      'S-corp owners currently paying health premiums personally with after-tax dollars.',
      'Owner-only or family S corps where group-plan nondiscrimination spillover is not an issue.',
      'Households with no access to a subsidized employer plan on either spouse\'s side.'
    ],
    implementation: [
      'Move premium payment to the corporate account (or adopt a written reimbursement arrangement) effective the first practical month.',
      'Instruct payroll to add annual premiums to Box 1 wages only — exempt from Social Security/Medicare boxes per Announcement 92-16.',
      'Confirm owner W-2 wages meet or exceed premiums; adjust the salary plan if needed.',
      'Verify no month of subsidized-plan eligibility for either spouse; calendar any known job changes.',
      'Deduct the premiums above the line (Schedule 1) on the shareholder\'s 1040.',
      'Re-verify the payroll coding each January when the W-2 is issued.'
    ]
  },

  client: {
    teaser: 'Turns a bill you already pay every month into a tax deduction',
    headline: 'Deduct your health insurance — the right way for S-corp owners',
    plainEnglish: [
      'If you own an S corporation and pay for your own health insurance, there is a good chance you are paying those premiums with after-tax money — no deduction. The tax law actually gives S-corp owners a full deduction for health premiums, but only if the paperwork flows a specific way: the company pays the premiums (or pays you back for them), the amount shows up in your W-2, and then you deduct the whole thing on your personal return.',
      'When it is set up correctly, the pieces cancel out except one: you get a full deduction for your premiums, and — thanks to a special rule — no Social Security or Medicare tax is owed on any of it. On a typical family premium, that is thousands of dollars a year in tax savings for what amounts to a bookkeeping change.',
      'The catch is that it cannot be fixed after the fact. If the year ends and the premiums never ran through the company and your W-2, the deduction is gone for that year. So the setup happens now, not at tax time.'
    ],
    analogy: 'It\'s the same money taking a different route — like discovering the toll road you drive daily has a free lane, but only if you get in it before the exit.',
    benefits: [
      'Your full health insurance premium becomes a tax deduction',
      'No payroll tax on any of it',
      'No new spending — it is money you already pay, rerouted',
      'Repeats automatically every year once set up'
    ],
    steps: [
      'We move the premium payments to the company (or set up reimbursement)',
      'We set your payroll to report it correctly on your W-2',
      'We take the full deduction on your personal return',
      'We double-check the W-2 coding every January'
    ],
    considerations: [
      'If you or your spouse could join a subsidized health plan at another job — even without enrolling — the deduction is lost for those months, so tell us about job changes.',
      'Your salary from the company must be at least as large as the premiums; we coordinate the two.'
    ]
  },

  inputs: [
    { key: 'annualPremiums', label: 'Annual health insurance premiums', type: 'currency', default: 18000 }
  ],

  appliesTo: function (profile) {
    return true; // needs owner W-2 wages; validated with a note in apply()
  },

  /**
   * The entity deduction and the W-2 Box 1 inclusion offset each other, so
   * the net modeled effect vs. paying premiums personally is the §162(l)
   * above-the-line deduction: adjustments += premiums. No FICA cost is added
   * (the inclusion is FICA-exempt per Announcement 92-16). The §162(l)
   * earned-income limit is enforced by capping at ownerWages. The entity's
   * premium payment is part of W-2 comp deducted against K-1 ordinary
   * income, so it also reduces §199A QBI — modeled via qbiReduction,
   * matching the sibling SE Health Insurance strategy's treatment.
   */
  apply: function (profile, params, yearIndex, state) {
    var p = Object.assign({}, profile);
    var notes = [];

    if (!(p.ownerWages > 0)) {
      if (yearIndex === 0) {
        notes.push('Requires S-corp W-2 wages to the owner — the §162(l) deduction for a ' +
          '2% shareholder is limited to W-2 wages from the corporation, and the premiums ' +
          'must be paid/reimbursed by the entity and added to Box 1 wages. Pair with the ' +
          'S-Corp Election strategy. No benefit modeled.');
      }
      return { profile: p, notes: notes };
    }

    var premiums = params.annualPremiums || 0;
    var deduction = Math.min(premiums, p.ownerWages);
    p.adjustments = (p.adjustments || 0) + deduction;
    p.qbiReduction = (p.qbiReduction || 0) + deduction;

    if (yearIndex === 0) {
      notes.push(TSIQ.fmt.usd(deduction) + ' of health premiums deducted above the line ' +
        '(§162(l)): entity pays/reimburses, adds to W-2 Box 1 (FICA-exempt per Ann. 92-16), ' +
        'shareholder deducts — the wage inclusion and entity deduction wash, leaving this ' +
        'deduction as the net benefit vs. paying premiums personally.');
      if (premiums > p.ownerWages) {
        notes.push('Premiums exceed owner W-2 wages — deduction capped at wages ' +
          '(§162(l) earned-income limit). Consider raising reasonable compensation.');
      }
      notes.push('No deduction is allowed for any month either spouse is ELIGIBLE for a ' +
        'subsidized employer health plan — confirm before implementing.');
    }
    return { profile: p, notes: notes };
  }
});
