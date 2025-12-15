// lib/excel/types.ts

export interface RevenueMonth {
  month: string;
  subscribers: number;
  mrr: number;
}

export interface RevenueModelData {
  subscribers12: number;
  mrr12: number;
  arr: number;
  months: RevenueMonth[];
}

export interface CashFlowMonth {
  month: string;
  endingCash: number;
}

export interface CashFlowModelData {
  startingCash: number;
  endingCash12: number;
  runway: number | "∞";
  months: CashFlowMonth[];
}
