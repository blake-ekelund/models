"use client";

import { NumberInput } from "@/app/components/ui/NumberInput";
import { useModelInstanceStore } from "@/app/models/[modelId]/components/useModelInstanceStore";

export default function AcquisitionPage() {
  const inputs = useModelInstanceStore(
    (s) => s.history.present
  );
  const setInputs = useModelInstanceStore(
    (s) => s.setInputs
  );

  return (
    <div className="max-w-xl mx-auto p-8 space-y-4">
      <h1 className="text-xl font-semibold text-[#1B3C53]">
        Customer Acquisition
      </h1>

      <NumberInput
        label="Ad Spend / Month"
        value={inputs.monthlyAdSpend}
        onChange={(v) =>
          setInputs({
            ...inputs,
            monthlyAdSpend: v,
          })
        }
      />

      <NumberInput
        label="CAC"
        value={inputs.cac}
        onChange={(v) =>
          setInputs({
            ...inputs,
            cac: v,
          })
        }
      />
    </div>
  );
}
