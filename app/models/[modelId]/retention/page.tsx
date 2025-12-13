"use client";

import { NumberInput } from "@/app/components/ui/NumberInput";
import { useModelInstanceStore } from "@/app/models/[modelId]/components/useModelInstanceStore";

export default function RetentionPage() {
  const inputs = useModelInstanceStore(
    (s) => s.history.present
  );
  const setInputs = useModelInstanceStore(
    (s) => s.setInputs
  );

  return (
    <div className="max-w-xl mx-auto p-8 space-y-4">
      <h1 className="text-xl font-semibold text-[#1B3C53]">
        Retention
      </h1>

      <NumberInput
        label="Monthly Churn %"
        value={inputs.monthlyChurnPct * 100}
        onChange={(v) =>
          setInputs({
            ...inputs,
            monthlyChurnPct: v / 100,
          })
        }
      />
    </div>
  );
}
