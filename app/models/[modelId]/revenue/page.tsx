"use client";

import { NumberInput } from "@/app/components/ui/NumberInput";
import { useModelInstanceStore } from "@/app/models/[modelId]/components/useModelInstanceStore";

export default function RevenuePage() {
  const inputs = useModelInstanceStore(
    (s) => s.history.present
  );
  const setInputs = useModelInstanceStore(
    (s) => s.setInputs
  );

  return (
    <div className="max-w-xl mx-auto p-8 space-y-4">
      <h1 className="text-xl font-semibold text-[#1B3C53]">
        Revenue & Pricing
      </h1>

      <NumberInput
        label="ARPU"
        value={inputs.arpu}
        onChange={(v) =>
          setInputs({
            ...inputs,
            arpu: v,
          })
        }
      />

      <NumberInput
        label="Gross Margin %"
        value={inputs.grossMarginPct * 100}
        onChange={(v) =>
          setInputs({
            ...inputs,
            grossMarginPct: v / 100,
          })
        }
      />
    </div>
  );
}
