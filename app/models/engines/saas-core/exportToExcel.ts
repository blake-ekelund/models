import * as XLSX from "xlsx";
import { SaaSCoreInputs } from "./types";
import { buildSaaSCoreModel } from "./buildModel";

export function exportSaaSCoreToExcel(
  inputs: SaaSCoreInputs,
  modelName: string
) {
  const model = buildSaaSCoreModel(inputs);

  const rows = [
    ["Model Name", modelName],
    [],
    ["Inputs"],
    ["Monthly Ad Spend", inputs.monthlyAdSpend],
    ["CAC", inputs.cac],
    ["ARPU", inputs.arpu],
    ["Gross Margin %", inputs.grossMarginPct * 100],
    ["Monthly Churn %", inputs.monthlyChurnPct * 100],
    [],
    ["Outputs"],
    ["New Customers / Month", model.newCustomersPerMonth],
    ["Active Customers", model.activeCustomers],
    ["Monthly Revenue", model.monthlyRevenue],
    ["Gross Profit / Month", model.grossProfit],
    ["LTV", model.ltv],
    ["Payback (months)", model.paybackMonths],
    ["LTV : CAC", model.ltvToCac],
  ];

  const worksheet = XLSX.utils.aoa_to_sheet(rows);
  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workbook, worksheet, "SaaS Core");

  XLSX.writeFile(
    workbook,
    `${modelName.replace(/\s+/g, "_")}.xlsx`
  );
}
