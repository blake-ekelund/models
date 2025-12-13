import type { ModelDefinition } from "../ModelTypes";

export const SaaSRevenueModel: ModelDefinition = {
  id: "saas_revenue",
  name: "SaaS Revenue",
  category: "Revenue",

  /* ---------------------------------------------
     Sections (UI structure)
  --------------------------------------------- */
  sections: [
    {
      id: "overview",
      label: "Overview",
      inputKeys: [],
      description: "High-level revenue performance",
    },
    {
      id: "pricing",
      label: "Revenue & Pricing",
      inputKeys: ["arpu", "grossMarginPct"],
      description: "How much you earn per customer and margin profile",
    },
  ],

  /* ---------------------------------------------
     Inputs
  --------------------------------------------- */
  inputs: [
    {
      key: "arpu",
      label: "ARPU",
      type: "currency",
      default: 120,
      min: 0,
    },
    {
      key: "grossMarginPct",
      label: "Gross Margin",
      type: "percent",
      default: 0.8,
      min: 0,
      max: 1,
    },
  ],

  /* ---------------------------------------------
     Outputs
  --------------------------------------------- */
  outputs: [
    {
      key: "revenue.monthly",
      label: "Monthly Revenue",
      unit: "currency",
    },
  ],

  /* ---------------------------------------------
     Computation
  --------------------------------------------- */
  compute(inputs) {
    return {
      "revenue.monthly": inputs.arpu * inputs.grossMarginPct,
    };
  },
};
