"use client";

import { useRouter } from "next/navigation";
import clsx from "clsx";
import { Pencil } from "lucide-react";

/* ---------------------------------------------
   SAFE FORMATTERS (DO NOT REMOVE)
--------------------------------------------- */

function fmt(n?: number) {
  return (n ?? 0).toLocaleString();
}

function pct(n?: number, d = 0) {
  return `${((n ?? 0) * 100).toFixed(d)}%`;
}

/* ---------------------------------------------
   Component
--------------------------------------------- */

export default function InputCards({
  modelId,
  inputs,
}: {
  modelId: string;
  inputs: any;
}) {
  const router = useRouter();

  // Absolute safety: inputs may be undefined briefly
  const safeInputs = inputs ?? {};

  return (
    <section>
      <h2 className="text-sm font-semibold uppercase tracking-wide text-[#456882] mb-4">
        Inputs
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card
          title="Acquisition"
          onActivate={() =>
            router.push(`/models/${modelId}/acquisition`)
          }
          items={[
            ["Ad Spend / Mo", `$${fmt(safeInputs.monthlyAdSpend)}`],
            ["CAC", `$${fmt(safeInputs.cac)}`],
          ]}
        />

        <Card
          title="Revenue"
          onActivate={() =>
            router.push(`/models/${modelId}/revenue`)
          }
          items={[
            ["ARPU", `$${fmt(safeInputs.arpu)}`],
            ["Gross Margin", pct(safeInputs.grossMarginPct)],
          ]}
        />

        <Card
          title="Retention"
          onActivate={() =>
            router.push(`/models/${modelId}/retention`)
          }
          items={[
            ["Monthly Churn", pct(safeInputs.monthlyChurnPct, 2)],
          ]}
        />
      </div>
    </section>
  );
}

/* ---------------------------------------------
   Card (mouse + keyboard)
--------------------------------------------- */

function Card({
  title,
  items,
  onActivate,
}: {
  title: string;
  items: [string, string][];
  onActivate: () => void;
}) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onActivate}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onActivate();
        }
      }}
      className={clsx(
        "relative rounded-2xl border border-gray-200 bg-white p-5 cursor-pointer",
        "hover:shadow-sm hover:border-gray-300 transition",
        "focus:outline-none focus:ring-2 focus:ring-[#00338d]/30"
      )}
    >
      <div className="absolute top-4 right-4 text-xs text-[#00338d] flex items-center gap-1">
        <Pencil size={12} />
        Edit
      </div>

      <div className="text-xs uppercase tracking-wide text-[#456882] mb-3">
        {title}
      </div>

      {items.map(([k, v]) => (
        <div key={k} className="text-sm flex justify-between mb-1">
          <span>{k}</span>
          <span className="font-medium">{v}</span>
        </div>
      ))}
    </div>
  );
}
