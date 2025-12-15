"use client";

import { useMemo, useState, useCallback, useEffect } from "react";
import { NumberInput } from "@/app/components/ui/NumberInput";
import { PercentInput } from "@/app/components/ui/PercentInput";
import KpiCard from "@/app/components/ui/KpiCard";

import { Chart as ChartJSComponent } from "react-chartjs-2";
import {
  Chart as ChartJS,
  registerables,
  type ChartOptions,
} from "chart.js";

// Excel exports
import { CashFlowModelData } from "@/lib/excel/types";
import { cashFlowModelToWorkbook } from "@/lib/excel/cashFlowModel";
import { exportWorkbook } from "@/lib/excel/exportWorkbook";

ChartJS.register(...registerables);

interface CashFlowModelProps {
  onExportReady?: (fn: () => void) => void;
}

/* ---------------------------------------------
   Formatting helpers (LOCKED + NULL SAFE)
--------------------------------------------- */
function formatCurrency(n: number | null | undefined) {
  const safe = n ?? 0;
  return `$${Math.round(safe).toLocaleString()}`;
}

function formatInteger(n: number | null | undefined) {
  const safe = n ?? 0;
  return Math.round(safe).toLocaleString();
}

export default function CashFlowModel({ onExportReady }: CashFlowModelProps) {
  const [startingCash, setStartingCash] = useState(25000);
  const [revenue, setRevenue] = useState(15000);
  const [cogsPct, setCogsPct] = useState(50);
  const [opex, setOpex] = useState(10000);

  /* ---------------------------------------------
     Month labels (MMM)
  --------------------------------------------- */
  const monthLabels = useMemo(() => {
    const now = new Date();
    return Array.from({ length: 12 }, (_, i) => {
      const d = new Date(now.getFullYear(), now.getMonth() + i);
      return d.toLocaleString("en-US", { month: "short" });
    });
  }, []);

  /* ---------------------------------------------
     12-Month Cash Flow Model
  --------------------------------------------- */
  const model = useMemo(() => {
    let cash = startingCash;

    return Array.from({ length: 12 }, () => {
      const cogs = revenue * (cogsPct / 100);
      const change = revenue - cogs - opex;
      cash += change;

      return { endingCash: cash };
    });
  }, [startingCash, revenue, opex, cogsPct]);

  const month12 = model[11];

  /* ---------------------------------------------
     Runway (months)
  --------------------------------------------- */
  const runwayMonths = useMemo(() => {
    const cogs = revenue * (cogsPct / 100);
    const burn = opex + cogs - revenue;
    if (burn <= 0) return Infinity;
    return Math.floor(startingCash / burn);
  }, [startingCash, revenue, opex, cogsPct]);

  /* ---------------------------------------------
     Out-of-Cash Month
  --------------------------------------------- */
  const outOfCashMonth = useMemo(() => {
    let cash = startingCash;
    const now = new Date();

    for (let i = 0; i < 12; i++) {
      const cogs = revenue * (cogsPct / 100);
      const change = revenue - cogs - opex;
      cash += change;

      if (cash <= 0) {
        const d = new Date(now.getFullYear(), now.getMonth() + i);
        return d.toLocaleString("en-US", {
          month: "long",
          year: "numeric",
        });
      }
    }
    return "—";
  }, [startingCash, revenue, opex, cogsPct]);

  /* ---------------------------------------------
     EXPORT PAYLOAD (TYPED)
  --------------------------------------------- */
  const exportData: CashFlowModelData = useMemo(
    () => ({
      startingCash: Math.round(startingCash),
      endingCash12: Math.round(month12?.endingCash ?? 0),
      runway: runwayMonths === Infinity ? "∞" : runwayMonths,
      months: model.map((m, i) => ({
        month: monthLabels[i],
        endingCash: Math.round(m.endingCash),
      })),
    }),
    [startingCash, model, runwayMonths, monthLabels, month12]
  );

  /* ---------------------------------------------
     EXPORT HANDLER (REAL)
  --------------------------------------------- */
  const handleExport = useCallback(() => {
    exportWorkbook(cashFlowModelToWorkbook(exportData));
  }, [exportData]);

  /* ---------------------------------------------
     EXPOSE EXPORT TO PARENT (FIXED)
  --------------------------------------------- */
  useEffect(() => {
    onExportReady?.(() => handleExport);
  }, [handleExport, onExportReady]);

  /* ---------------------------------------------
     Chart Data (ON-BRAND)
  --------------------------------------------- */
  const chartData = {
    labels: monthLabels,
    datasets: [
      {
        type: "bar" as const,
        label: "Ending Cash",
        data: model.map((m) => Math.round(m.endingCash)),
        backgroundColor: model.map((m) =>
          m.endingCash >= 0 ? "#1B3C53" : "rgba(27,60,83,0.25)"
        ),
        borderRadius: 6,
      },
    ],
  };

  /* ---------------------------------------------
     Chart Options (MATCH RevenueModel)
  --------------------------------------------- */
  const chartOptions: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: "#1B3C53",
          font: { size: 12, weight: 500 },
        },
        onClick: () => {
          /* legend interaction disabled */
        },
      },
      tooltip: {
        callbacks: {
          label(ctx) {
            return `Ending Cash: ${formatCurrency(ctx.parsed.y)}`;
          },
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#456882",
          font: { size: 11, weight: 500 },
        },
        grid: {
          color: "rgba(35,76,106,0.08)",
        },
      },
      y: {
        ticks: {
          color: "#1B3C53",
          callback: (v) => formatCurrency(v as number),
          font: { size: 11, weight: 500 },
        },
        grid: {
          color: "rgba(35,76,106,0.12)",
        },
      },
    },
  };

  /* ---------------------------------------------
     Render
  --------------------------------------------- */
  return (
    <div className="flex flex-col h-full text-[#1B3C53]">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-semibold">12-Month Cash Flow</h2>
      </div>

      <div className="grid grid-cols-2 gap-3 text-sm mb-4">
        <NumberInput label="Starting Cash" value={startingCash} onChange={setStartingCash} />
        <NumberInput label="Monthly Revenue" value={revenue} onChange={setRevenue} />
        <PercentInput label="COGS (% of Revenue)" value={cogsPct} onChange={setCogsPct} />
        <NumberInput label="Monthly Operating Expenses" value={opex} onChange={setOpex} />
      </div>

      <div className="grid grid-cols-3 gap-3 mb-2">
        <KpiCard label="Ending Cash (Month 12)" value={formatCurrency(month12?.endingCash)} />
        <KpiCard label="Runway (Months)" value={runwayMonths === Infinity ? "∞" : runwayMonths} />
        <KpiCard label="Out of Cash" value={outOfCashMonth} />
      </div>

      <div className="flex-1 bg-[#E3E3E3]/40 p-1">
        <ChartJSComponent type="bar" data={chartData} options={chartOptions} />
      </div>
    </div>
  );
}
