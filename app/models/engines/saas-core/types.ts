// ==============================
// INPUTS (what the user controls)
// ==============================

export interface SaaSCoreInputs {
  /**
   * Monthly paid acquisition spend
   */
  monthlyAdSpend: number;

  /**
   * Customer Acquisition Cost
   */
  cac: number;

  /**
   * Average Revenue Per User (monthly)
   */
  arpu: number;

  /**
   * Gross margin as a decimal (e.g. 0.8 = 80%)
   */
  grossMarginPct: number;

  /**
   * Monthly logo churn as a decimal (e.g. 0.03 = 3%)
   */
  monthlyChurnPct: number;
}

// ==============================
// OUTPUTS (derived economics)
// ==============================

export interface SaaSCoreModel {
  /**
   * New customers acquired per month
   */
  newCustomersPerMonth: number;

  /**
   * Steady-state active customers
   */
  activeCustomers: number;

  /**
   * Monthly recurring revenue at steady state
   */
  monthlyRevenue: number;

  /**
   * Monthly gross profit
   */
  grossProfit: number;

  /**
   * Lifetime value per customer
   */
  ltv: number;

  /**
   * CAC payback period in months
   */
  paybackMonths: number;

  /**
   * Ratio of LTV to CAC
   */
  ltvToCac: number;
}
