"use client";

import { NumberInput } from "@/app/components/ui/NumberInput";
import { useSaaSCoreStore } from "@/app/models/engines/saas-core/store";

export default function RevenuePage() {
  const { inputs, setInput } = useSaaSCoreStore();

  return (
    <div className="max-w-xl mx-auto p-8 space-y-4">
      <h1 className="text-xl font-semibold text-[#1B3C53]">
        Revenue & Pricing
      </h1>

      <NumberInput
        label="ARPU"
        value={inputs.arpu}
        onChange={(v) => setInput("arpu", v)}
      />

      <NumberInput
        label="Gross Margin %"
        value={inputs.grossMarginPct * 100}
        onChange={(v) => setInput("grossMarginPct", v / 100)}
      />
    </div>
  );
}
