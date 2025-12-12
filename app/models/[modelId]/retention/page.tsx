"use client";

import { NumberInput } from "@/app/components/ui/NumberInput";
import { useSaaSCoreStore } from "@/app/models/engines/saas-core/store";

export default function RetentionPage() {
  const { inputs, setInput } = useSaaSCoreStore();

  return (
    <div className="max-w-xl mx-auto p-8 space-y-4">
      <h1 className="text-xl font-semibold text-[#1B3C53]">
        Retention
      </h1>

      <NumberInput
        label="Monthly Churn %"
        value={inputs.monthlyChurnPct * 100}
        onChange={(v) => setInput("monthlyChurnPct", v / 100)}
      />
    </div>
  );
}
