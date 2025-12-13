"use client";

import { NumberInput } from "@/app/components/ui/NumberInput";
import type { InputDefinition } from "@/app/models/core/ModelTypes";

interface Props {
  definition: InputDefinition;
  value: number;
  onChange: (value: number) => void;
}

export default function InputRenderer({
  definition,
  value,
  onChange,
}: Props) {
  // Convert internal value → display value
  const displayValue =
    definition.type === "percent"
      ? value * 100
      : value;

  return (
    <NumberInput
      label={definition.label}
      value={displayValue}
      min={definition.min}
      max={definition.max}
      hint={definition.description}
      onChange={(v) =>
        onChange(
          definition.type === "percent"
            ? v / 100
            : v
        )
      }
    />
  );
}
