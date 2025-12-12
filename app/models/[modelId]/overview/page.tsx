"use client";

import { useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import { useModelContext } from "@/app/models/context/ModelContext";
import { useSaaSCoreStore } from "@/app/models/engines/saas-core/store";
import { buildSaaSCoreModel } from "@/app/models/engines/saas-core/buildModel";

export default function OverviewPage() {
  const { modelId } = useParams<{ modelId: string }>();
  const { activeModel, recentModels, setActiveModel } = useModelContext();

  const {
    inputs,
    setAllInputs, // 👈 add this to the store (see note below)
  } = useSaaSCoreStore();

  // ---------------------------------------------
  // Ensure correct active model
  // ---------------------------------------------
  useEffect(() => {
    if (activeModel?.id === modelId) return;

    const found = recentModels.find(m => m.id === modelId);
    if (found) {
      setActiveModel(found);
    }
  }, [modelId, activeModel, recentModels, setActiveModel]);

  // ---------------------------------------------
  // Hydrate inputs ONCE per model
  // ---------------------------------------------
  const hydratedRef = useRef<string | null>(null);

  useEffect(() => {
    if (!activeModel) return;
    if (!activeModel.inputs) return;

    // Prevent rehydrating repeatedly
    if (hydratedRef.current === activeModel.id) return;

    setAllInputs(activeModel.inputs);
    hydratedRef.current = activeModel.id;
  }, [activeModel, setAllInputs]);

  const model = buildSaaSCoreModel(inputs);

  return (
    <div className="max-w-5xl mx-auto p-8 space-y-8">
      <header>
        <h1 className="text-2xl font-semibold text-[#1B3C53]">
          {activeModel?.name ?? "Model Overview"}
        </h1>
        <p className="text-sm text-[#456882] mt-1">
          Summary of inputs and outputs for this model.
        </p>
      </header>

      {/* INPUT SUMMARY */}
      <section className="grid grid-cols-3 gap-6">
        <SummaryCard
          title="Acquisition"
          items={[
            ["Ad Spend / Mo", `$${inputs.monthlyAdSpend.toLocaleString()}`],
            ["CAC", `$${inputs.cac.toLocaleString()}`],
          ]}
        />

        <SummaryCard
          title="Revenue"
          items={[
            ["ARPU", `$${inputs.arpu.toLocaleString()}`],
            ["Gross Margin", `${(inputs.grossMarginPct * 100).toFixed(0)}%`],
          ]}
        />

        <SummaryCard
          title="Retention"
          items={[
            ["Monthly Churn", `${(inputs.monthlyChurnPct * 100).toFixed(2)}%`],
          ]}
        />
      </section>

      {/* OUTPUT SUMMARY */}
      <section className="grid grid-cols-3 gap-6">
        <Metric
          label="Monthly Revenue"
          value={`$${Math.round(model.monthlyRevenue).toLocaleString()}`}
        />
        <Metric
          label="Gross Profit / Mo"
          value={`$${Math.round(model.grossProfit).toLocaleString()}`}
        />
        <Metric
          label="Active Customers"
          value={Math.round(model.activeCustomers).toLocaleString()}
        />
        <Metric
          label="LTV"
          value={
            model.ltv === Infinity
              ? "∞"
              : `$${Math.round(model.ltv).toLocaleString()}`
          }
        />
        <Metric
          label="Payback"
          value={`${model.paybackMonths.toFixed(1)} mo`}
        />
        <Metric
          label="LTV : CAC"
          value={`${model.ltvToCac.toFixed(1)}×`}
        />
      </section>
    </div>
  );
}

/* ---------------------------------------------
   UI helpers
--------------------------------------------- */

function SummaryCard({
  title,
  items,
}: {
  title: string;
  items: [string, string][];
}) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4">
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
