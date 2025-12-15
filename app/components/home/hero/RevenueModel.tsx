"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import { NumberInput } from "@/app/components/ui/NumberInput";
import { PercentInput } from "@/app/components/ui/PercentInput";
import { Chart as ChartJSComponent } from "react-chartjs-2";
import {
  Chart as ChartJS,
  registerables,
  type ChartOptions,
} from "chart.js";
import KpiCard from "@/app/components/ui/KpiCard";
import { getAnonId } from "@/lib/anon";

ChartJS.register(...registerables);

interface RevenueModelProps {
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

function formatInteger(n: number | null | undefined) {
  const safe = n ?? 0;
  return Math.round(safe).toLocaleString();
}

export default function RevenueModel({
  onExportReady,
  onExportStateChange,
}: RevenueModelProps) {  const [adSpend, setAdSpend] = useState(5000);
  const [cac, setCac] = useState(100);
  const [churn, setChurn] = useState(5);
  const [arppu, setArppu] = useState(20);

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
     Model (UI only)
  --------------------------------------------- */
  const model = useMemo(() => {
    const churnRate = churn / 100;
    const acquired = adSpend / cac;

    let subscribers = acquired;

    return Array.from({ length: 12 }, (_, i) => {
      if (i > 0) {
        subscribers = subscribers * (1 - churnRate) + acquired;
      }
      return {
        subscribers,
        mrr: subscribers * arppu,
      };
    });
  }, [adSpend, cac, churn, arppu]);

  const month12 = model[11];
  const ARR = month12.mrr * 12;

  /* ---------------------------------------------
     EXPORT HANDLER (with loading state)
  --------------------------------------------- */
  const handleExport = useCallback(async () => {
    if (isExporting) return;

    try {
      setIsExporting(true);
      onExportStateChange?.(true);

      const res = await fetch("/api/export/revenue", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          anonId: getAnonId(),
          inputs: {
            adSpend,
            cac,
            churnPct: churn,
            arppu,
          },
        }),
      });

      if (!res.ok) {
        throw new Error("Export failed");
      }

      const { downloadUrl } = await res.json();

      const a = document.createElement("a");
      a.href = downloadUrl;
      a.download = "12-month_revenue_model.xlsx";
      a.click();
    } catch (err) {
      console.error(err);
    } finally {
      setIsExporting(false);
      onExportStateChange?.(false);
    }
  }, [
    adSpend,
    cac,
    churn,
    arppu,
    isExporting,
    onExportStateChange,
  ]);

  /* ---------------------------------------------
     EXPOSE EXPORT TO PARENT
  --------------------------------------------- */
  useEffect(() => {
    if (!onExportReady) return;
    onExportReady(() => handleExport);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ---------------------------------------------
     Chart data
  --------------------------------------------- */
  const combinedData = {
    labels: monthLabels,
    datasets: [
      {
        type: "line" as const,
        label: "Subscribers",
        data: model.map((m) => Math.round(m.subscribers)),
        borderColor: "#456882",
        backgroundColor: "rgba(69,104,130,0.15)",
        borderWidth: 2,
        tension: 0.25,
        pointRadius: 2,
        pointHoverRadius: 4,
        yAxisID: "y1",
      },
      {
        type: "bar" as const,
        label: "MRR ($)",
        data: model.map((m) => Math.round(m.mrr)),
        backgroundColor: "#1B3C53",
        borderRadius: 6,
        yAxisID: "y2",
      },
    ],
  };

  /* ---------------------------------------------
     Chart options
  --------------------------------------------- */
  const combinedOptions: ChartOptions<"bar" | "line"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: "#1B3C53",
          font: { size: 12, weight: 500 },
        },
      },
    },
    scales: {
      x: {
        ticks: { color: "#456882", font: { size: 11, weight: 500 } },
      },
      y1: {
        position: "left",
        ticks: {
          color: "#456882",
          callback: (v) => formatInteger(v as number),
        },
      },
      y2: {
        position: "right",
        ticks: {
          color: "#1B3C53",
          callback: (v) => formatCurrency(v as number),
        },
        grid: { display: false },
      },
    },
  };

  /* ---------------------------------------------
     Render
  --------------------------------------------- */
  return (
    <div className="flex flex-col h-full text-[#1B3C53]">
      <h2 className="text-xl font-semibold mb-2">
        12-Month Revenue Model
      </h2>

      <div className="grid grid-cols-2 gap-3 text-sm mb-4">
        <NumberInput label="Monthly Ad Spend" value={adSpend} onChange={setAdSpend} />
        <NumberInput label="CAC (Cost per Acquisition)" value={cac} onChange={setCac} />
        <PercentInput label="Monthly Churn (%)" value={churn} onChange={setChurn} />
        <NumberInput label="ARPPU (Revenue Per User)" value={arppu} onChange={setArppu} />
      </div>

      <div className="grid grid-cols-3 gap-3 mb-2">
        <KpiCard label="Subscribers (Month 12)" value={formatInteger(month12?.subscribers)} />
        <KpiCard label="MRR (Month 12)" value={formatCurrency(month12?.mrr)} />
        <KpiCard label="ARR" value={formatCurrency(ARR)} />
      </div>

      <div
        className={`flex-1 bg-[#E3E3E3]/40 p-1 ${
          isExporting ? "opacity-75 pointer-events-none" : ""
        }`}
      >
        <ChartJSComponent type="bar" data={combinedData} options={combinedOptions} />
      </div>
    </div>
  );
}
