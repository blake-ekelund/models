"use client";

import { NumberInput } from "@/app/components/ui/NumberInput";
import { useSaaSCoreStore } from "@/app/models/engines/saas-core/store";

export default function AcquisitionPage() {
  const { inputs, setInput } = useSaaSCoreStore();

  return (
    <div className="max-w-xl mx-auto p-8 space-y-4">
      <h1 className="text-xl font-semibold text-[#1B3C53]">
        Customer Acquisition
      </h1>

      <NumberInput
        label="Ad Spend / Month"
        value={inputs.monthlyAdSpend}
        onChange={(v) => setInput("monthlyAdSpend", v)}
      />

      <NumberInput
        label="CAC"
        value={inputs.cac}
        onChange={(v) => setInput("cac", v)}
      />
    </div>
  );
}
