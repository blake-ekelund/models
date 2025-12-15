// lib/excel/cashFlowModel.ts
import { CashFlowModelData } from "./types";

export function cashFlowModelToWorkbook(modelData: CashFlowModelData) {
  return {
    filename: "Cash_Flow_Model.xlsx",
    sheets: [
      {
        name: "Summary",
        rows: [
          ["Starting Cash", modelData.startingCash],
          ["Ending Cash (Month 12)", modelData.endingCash12],
          ["Runway (Months)", modelData.runway],
        ],
      },
      {
        name: "Monthly Cash Flow",
        columns: ["Month", "Ending Cash"],
        rows: modelData.months.map(m => [
          m.month,
          m.endingCash,
        ]),
      },
    ],
  };
}
