"use client";

import { useMemo, useState } from "react";
import { NumberInput } from "@/app/components/ui/NumberInput";
import { PercentInput } from "@/app/components/ui/PercentInput";

import { Chart, registerables } from "chart.js";
import { Chart as ChartJS } from "react-chartjs-2";

Chart.register(...registerables);

// --------------------
// Currency Formatter
// --------------------
function formatCurrency(n: number) {
  const abs = Math.abs(n).toLocaleString();
  return n < 0 ? `($${abs})` : `$${abs}`;
}

export default function CashFlowModel() {
  const [startingCash, setStartingCash] = useState(25000);
  const [revenue, setRevenue] = useState(15000);
  const [cogsPct, setCogsPct] = useState(50);
  const [opex, setOpex] = useState(10000);

  // --------------------
  // Month Labels (MMM-YY)
  // --------------------
  const monthLabels = useMemo(() => {
    const now = new Date();
    return Array.from({ length: 12 }, (_, i) => {
      const d = new Date(now.getFullYear(), now.getMonth() + i);
      return (
        d.toLocaleString("en-US", { month: "short" }) +
        "-" +
        String(d.getFullYear()).slice(2)
      );
    });
  }, []);

  // --------------------
  // 12-Month Cash Flow
  // --------------------
  const model = useMemo(() => {
    let cash = startingCash;

    return Array.from({ length: 12 }, () => {
      const cogs = revenue * (cogsPct / 100);
      const change = revenue - cogs - opex;
      cash += change;

      return { endingCash: cash };
    });
  }, [startingCash, revenue, opex, cogsPct]);

  // --------------------
  // Runway
  // --------------------
  const runwayMonths = useMemo(() => {
    const cogs = revenue * (cogsPct / 100);
    const burn = opex + cogs - revenue;
    if (burn <= 0) return Infinity;
    return Math.floor(startingCash / burn);
  }, [startingCash, revenue, opex, cogsPct]);

  // --------------------
  // Out-of-Cash Month
  // --------------------
  const outOfCashMonth = useMemo(() => {
    let cash = startingCash;
    const now = new Date();

    for (let i = 0; i < 12; i++) {
      const cogs = revenue * (cogsPct / 100);
      const change = revenue - cogs - opex;
      cash += change;

      if (cash <= 0) {
        const d = new Date(now.getFullYear(), now.getMonth() + i);
        return d.toLocaleString("en-US", { month: "long", year: "numeric" });
      }
    }
    return "—";
  }, [startingCash, revenue, opex, cogsPct]);

  // --------------------
  // Bar Colors (Tone-Based)
  // --------------------
  const barColors = model.map((m) =>
    m.endingCash >= 0 ? "#456882" : "rgba(69,104,130,0.25)"
  );

  // --------------------
  // Chart Data
  // --------------------
  const chartData = {
    labels: monthLabels,
    datasets: [
      {
        type: "bar" as const,
        label: "Ending Cash",
        data: model.map((m) => m.endingCash),
        backgroundColor: barColors,
        borderRadius: 6,
      },
    ],
  };

  // --------------------
  // Chart Options
  // --------------------
  const chartOptions = {
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
      y: {
        ticks: { color: "#1B3C53" },
        grid: { color: "rgba(27,60,83,0.1)" },
      },
      x: {
        ticks: { color: "#1B3C53" },
        grid: { display: false },
      },
    },
  };

  // --------------------
  // Render
  // --------------------
  return (
    <div className="flex flex-col h-full text-[#1B3C53]">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xl font-semibold">12-Month Cash Flow</h2>
      </div>

      {/* Inputs */}
      <div className="grid grid-cols-2 gap-3 text-sm mb-6">
        <NumberInput label="Starting Cash" value={startingCash} onChange={setStartingCash} />
        <NumberInput label="Monthly Revenue" value={revenue} onChange={setRevenue} />
        <PercentInput label="COGS (% of Revenue)" value={cogsPct} onChange={setCogsPct} />
        <NumberInput label="Monthly Operating Expenses" value={opex} onChange={setOpex} />
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        <KPI label="Ending Cash (Month 12)" value={formatCurrency(model[11].endingCash)} />
        <KPI label="Runway (Months)" value={runwayMonths === Infinity ? "∞" : runwayMonths} />
        <KPI label="Out of Cash" value={outOfCashMonth} />
      </div>

      {/* Chart */}
      <div className="flex-1 bg-[#234C6A]/5 border border-[#456882]/30 rounded-xl p-4">
        <ChartJS type="bar" data={chartData} options={chartOptions} />
      </div>
    </div>
  );
}

// --------------------
// KPI Card
// --------------------
function KPI({ label, value }: { label: string; value: any }) {
  return (
    <div className="bg-[#E3E3E3] border border-[#456882]/30 rounded-xl p-3 text-center">
      <div className="text-xs text-[#1B3C53]/60 mb-1">{label}</div>
      <div className="text-lg font-semibold text-[#1B3C53]">{value}</div>
    </div>
  );
}
