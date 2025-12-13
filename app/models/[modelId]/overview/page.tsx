"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import clsx from "clsx";
import { Pencil } from "lucide-react";
import { useModelInstanceStore } from "@/app/models/[modelId]/store/useModelInstanceStore";
import { useModelContext } from "@/app/models/context/ModelContext";
import { buildSaaSCoreModel } from "@/app/models/engines/saas-core/buildModel";

function fmt(n: number | null | undefined) {
  return (n ?? 0).toLocaleString();
}

function pct(n: number | null | undefined, digits = 0) {
  return `${(((n ?? 0) * 100)).toFixed(digits)}%`;
}

export default function OverviewPage() {
  const router = useRouter();
  const { modelId } = useParams<{ modelId: string }>();

  const inputs = useModelInstanceStore((s) => s.history.present);
  const model = buildSaaSCoreModel(inputs);

  const { recentModels, renameModel } = useModelContext();
  const activeModel = recentModels.find((m) => m.id === modelId);

  const [editingName, setEditingName] = useState(false);
  const [nameValue, setNameValue] = useState(
    activeModel?.name ?? "Untitled Model"
  );

  // Keep local input in sync if model changes
  useEffect(() => {
    if (activeModel) {
      setNameValue(activeModel.name);
    }
  }, [activeModel]);

  function saveName() {
    if (!activeModel) return;

    const trimmed = nameValue.trim();
    if (!trimmed || trimmed === activeModel.name) {
      setEditingName(false);
      setNameValue(activeModel.name);
      return;
    }

    renameModel(activeModel.id, trimmed);
    setEditingName(false);
  }

  return (
    <div className="max-w-5xl mx-auto p-8 space-y-8">
      {/* HEADER */}
      <header className="space-y-2">
        <div className="flex items-center gap-3">
          {!editingName ? (
            <>
              <h1 className="text-2xl font-semibold text-[#1B3C53]">
                {activeModel?.name ?? "Model Overview"}
              </h1>

              <button
                onClick={() => setEditingName(true)}
                className="flex items-center gap-1 text-sm text-[#456882] hover:text-[#00338d]"
                title="Rename model"
              >
                <Pencil size={14} />
                <span>Rename</span>
              </button>
            </>
          ) : (
            <input
              autoFocus
              value={nameValue}
              onChange={(e) => setNameValue(e.target.value)}
              onBlur={saveName}
              onKeyDown={(e) => {
                if (e.key === "Enter") saveName();
                if (e.key === "Escape") {
                  setEditingName(false);
                  setNameValue(activeModel?.name ?? "");
                }
              }}
              className="text-2xl font-semibold text-[#1B3C53] border-b border-gray-300 focus:outline-none focus:border-[#00338d]"
            />
          )}
        </div>

        <p className="text-sm text-[#456882]">
          Summary of inputs and outputs for this model.
        </p>
      </header>

      {/* INPUT SUMMARY */}
      <section className="grid grid-cols-3 gap-6">
        <NavSummaryCard
          title="Acquisition"
          onClick={() => router.push(`/models/${modelId}/acquisition`)}
          items={[
            ["Ad Spend / Mo", `$${fmt(inputs.monthlyAdSpend)}`],
            ["CAC", `$${fmt(inputs.cac)}`],
          ]}
        />

        <NavSummaryCard
          title="Revenue"
          onClick={() => router.push(`/models/${modelId}/revenue`)}
          items={[
            ["ARPU", `$${fmt(inputs.arpu)}`],
            ["Gross Margin", pct(inputs.grossMarginPct)],
          ]}
        />

        <NavSummaryCard
          title="Retention"
          onClick={() => router.push(`/models/${modelId}/retention`)}
          items={[
            ["Monthly Churn", pct(inputs.monthlyChurnPct, 2)],
          ]}
        />
      </section>

      {/* OUTPUT SUMMARY */}
      <section className="grid grid-cols-3 gap-6">
        <Metric label="Monthly Revenue" value={`$${fmt(model.monthlyRevenue)}`} />
        <Metric label="Gross Profit / Mo" value={`$${fmt(model.grossProfit)}`} />
        <Metric label="Active Customers" value={fmt(model.activeCustomers)} />
        <Metric
          label="LTV"
          value={model.ltv === Infinity ? "∞" : `$${fmt(model.ltv)}`}
        />
        <Metric label="Payback" value={`${model.paybackMonths.toFixed(1)} mo`} />
        <Metric label="LTV : CAC" value={`${model.ltvToCac.toFixed(1)}×`} />
      </section>
    </div>
  );
}

/* ---------------------------------------------
   UI helpers
--------------------------------------------- */

function NavSummaryCard({
  title,
  items,
  onClick,
}: {
  title: string;
  items: [string, string][];
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className={clsx(
        "relative rounded-xl border border-gray-200 bg-white p-4 cursor-pointer",
        "hover:shadow-sm hover:border-gray-300 transition"
      )}
    >
      {/* Edit affordance */}
      <div className="absolute top-3 right-3 flex items-center gap-1 text-xs text-[#00338d]">
        <Pencil size={12} />
        <span>Edit</span>
      </div>

      <div className="text-xs uppercase text-[#456882] mb-2">
        {title}
      </div>

      {items.map(([k, v]) => (
        <div key={k} className="text-sm flex justify-between">
          <span>{k}</span>
          <span className="font-medium">{v}</span>
        </div>
      ))}
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4">
      <div className="text-xs uppercase text-[#456882] mb-1">
        {label}
      </div>
      <div className="text-lg font-semibold text-[#1B3C53]">
        {value}
      </div>
    </div>
  );
}
