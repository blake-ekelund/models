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

import { getAnonId } from "@/lib/anon";

ChartJS.register(...registerables);

interface CashFlowModelProps {
  onExportReady?: (fn: () => void) => void;
  onExportStateChange?: (isExporting: boolean) => void;
}

/* ---------------------------------------------
   Formatting helpers
--------------------------------------------- */
function formatCurrency(n: number | null | undefined) {
  const safe = n ?? 0;
  return `$${Math.round(safe).toLocaleString()}`;
}

export default function CashFlowModel({
  onExportReady,
  onExportStateChange,
}: CashFlowModelProps) {
  const [startingCash, setStartingCash] = useState(25000);
  const [revenue, setRevenue] = useState(15000);
  const [cogsPct, setCogsPct] = useState(50);
  const [opex, setOpex] = useState(10000);

  const [isExporting, setIsExporting] = useState(false);

  /* ---------------------------------------------
     Month labels
  --------------------------------------------- */
  const monthLabels = useMemo(() => {
    const now = new Date();
    return Array.from({ length: 12 }, (_, i) => {
      const d = new Date(now.getFullYear(), now.getMonth() + i);
      return d.toLocaleString("en-US", { month: "short" });
    });
  }, []);

  /* ---------------------------------------------
     Cash flow model
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
     Runway
  --------------------------------------------- */
  const runwayMonths = useMemo(() => {
    const cogs = revenue * (cogsPct / 100);
    const burn = opex + cogs - revenue;
    if (burn <= 0) return Infinity;
    return Math.floor(startingCash / burn);
  }, [startingCash, revenue, opex, cogsPct]);

  /* ---------------------------------------------
     Out-of-cash month
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
     EXPORT HANDLER (SERVER)
  --------------------------------------------- */
  const handleExport = useCallback(async () => {
    if (isExporting) return;

    try {
      setIsExporting(true);
      onExportStateChange?.(true);

      // allow spinner to paint
      await new Promise((r) => setTimeout(r, 0));

      const res = await fetch("/api/export/cashflow", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          anonId: getAnonId(),
          inputs: {
            startingCash,
            monthlyRevenue: revenue,
            cogsPct,
            monthlyOpex: opex,
          },
        }),
      });

      if (!res.ok) {
        throw new Error("Export failed");
      }

      const { downloadUrl } = await res.json();

      const a = document.createElement("a");
      a.href = downloadUrl;
      a.download = "12-month_cashflow_model.xlsx";
      a.click();
    } catch (err) {
      console.error(err);
    } finally {
      setIsExporting(false);
      onExportStateChange?.(false);
    }
  }, [
    isExporting,
    startingCash,
    revenue,
    cogsPct,
    opex,
    onExportStateChange,
  ]);

  /* ---------------------------------------------
     EXPOSE EXPORT TO PARENT
  --------------------------------------------- */
  useEffect(() => {
    onExportReady?.(() => handleExport);
  }, [handleExport, onExportReady]);

  /* ---------------------------------------------
     Chart
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

  const chartOptions: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: "#1B3C53",
          font: { size: 12, weight: 500 },
        },
        onClick: () => {},
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
        ticks: { color: "#456882", font: { size: 11, weight: 500 } },
        grid: { color: "rgba(35,76,106,0.08)" },
      },
      y: {
        ticks: {
          color: "#1B3C53",
          callback: (v) => formatCurrency(v as number),
          font: { size: 11, weight: 500 },
        },
        grid: { color: "rgba(35,76,106,0.12)" },
      },
    },
  };

  /* ---------------------------------------------
     Render
  --------------------------------------------- */
  return (
    <div className="flex flex-col h-full text-[#1B3C53]">
      <h2 className="text-xl font-semibold mb-2">12-Month Cash Flow</h2>

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

      <div className={`flex-1 bg-[#E3E3E3]/40 p-1 ${isExporting ? "opacity-75 pointer-events-none" : ""}`}>
        <ChartJSComponent type="bar" data={chartData} options={chartOptions} />
      </div>
    </div>
  );
}
