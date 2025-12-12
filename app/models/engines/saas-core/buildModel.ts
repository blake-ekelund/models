import { SaaSCoreInputs } from "./store";

export interface SaaSCoreModel {
  newCustomersPerMonth: number;
  activeCustomers: number;
  monthlyRevenue: number;
  grossProfit: number;
  ltv: number;
  paybackMonths: number;
  ltvToCac: number;
}

export function buildSaaSCoreModel(
  inputs: SaaSCoreInputs
): SaaSCoreModel {
  const {
    monthlyAdSpend,
    cac,
    arpu,
    grossMarginPct,
    monthlyChurnPct,
  } = inputs;

  const newCustomersPerMonth =
    cac > 0 ? monthlyAdSpend / cac : 0;

  const lifetime =
    monthlyChurnPct > 0 ? 1 / monthlyChurnPct : Infinity;

  const activeCustomers = newCustomersPerMonth * lifetime;
  const monthlyRevenue = activeCustomers * arpu;
  const grossProfit = monthlyRevenue * grossMarginPct;

  const ltv =
    monthlyChurnPct > 0
      ? (arpu * grossMarginPct) / monthlyChurnPct
      : Infinity;

  const paybackMonths =
    arpu * grossMarginPct > 0
      ? cac / (arpu * grossMarginPct)
      : Infinity;

  return {
    newCustomersPerMonth,
    activeCustomers,
    monthlyRevenue,
    grossProfit,
    ltv,
    paybackMonths,
    ltvToCac: cac > 0 ? ltv / cac : Infinity,
  };
}
