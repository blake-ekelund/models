"use client";

import { useState, useMemo } from "react";
import { NumberInput } from "@/app/components/ui/NumberInput";
import { PercentInput } from "@/app/components/ui/PercentInput";
import { Chart as ChartJS } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import KpiCard from "@/app/components/ui/KpiCard";

Chart.register(...registerables);

function formatCurrency(n: number) {
  const abs = Math.abs(n).toLocaleString();
  return n < 0 ? `($${abs})` : `$${abs}`;
}

export default function RevenueModel() {
  const [adSpend, setAdSpend] = useState(5000);
  const [cac, setCac] = useState(100);
  const [churn, setChurn] = useState(5);
  const [arppu, setArppu] = useState(20);

  // Month labels
  const monthLabels = useMemo(() => {
    const now = new Date();
    return Array.from({ length: 12 }, (_, i) => {
      const d = new Date(now.getFullYear(), now.getMonth() + i);
      return d.toLocaleString("en-US", { month: "short" });
    });
  }, []);

  // Model
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

  // Chart data
  const combinedData = {
    labels: monthLabels,
    datasets: [
      {
        type: "line" as const,
        label: "Subscribers",
        data: model.map((m) => m.subscribers),
        borderColor: "#456882",
        backgroundColor: "rgba(69,104,130,0.15)",
        borderWidth: 2,
        tension: 0.25,
        yAxisID: "y1",
      },
      {
        type: "bar" as const,
        label: "MRR ($)",
        data: model.map((m) => m.mrr),
        backgroundColor: "#E3E3E3",
        borderRadius: 6,
        yAxisID: "y2",
      },
    ],
  };

  const combinedOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: "#1B3C53",
          font: { size: 12 },
        },
      },
    },
    scales: {
      x: {
        ticks: { color: "#1B3C53" },
        grid: { color: "rgba(27,60,83,0.08)" },
      },
      y1: {
        position: "left" as const,
        ticks: { color: "#456882" },
        grid: { color: "rgba(69,104,130,0.15)" },
      },
      y2: {
        position: "right" as const,
        ticks: { color: "#1B3C53" },
        grid: { display: false },
      },
    },
  };

  return (
    <div className="flex flex-col h-full text-[#1B3C53]">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xl font-semibold">12-Month Revenue Model</h2>
      </div>

      {/* Inputs */}
      <div className="grid grid-cols-2 gap-3 text-sm mb-6">
        <NumberInput label="Monthly Ad Spend" value={adSpend} onChange={setAdSpend} />
        <NumberInput label="CAC (Cost per Acquisition)" value={cac} onChange={setCac} />
        <PercentInput label="Monthly Churn (%)" value={churn} onChange={setChurn} />
        <NumberInput label="ARPPU (Revenue per User)" value={arppu} onChange={setArppu} />
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        <KpiCard label="Subscribers (Month 12)" value={month12.subscribers} />
        <KpiCard label="MRR (Month 12)" value={formatCurrency(month12.mrr)} />
        <KpiCard label="ARR" value={formatCurrency(ARR)} />
      </div>

      {/* Chart */}
      <div className="flex-1 bg-[#234C6A]/5 border border-[#456882]/30 rounded-xl p-3">
        <ChartJS type="bar" data={combinedData} options={combinedOptions} />
      </div>
    </div>
  );
}
