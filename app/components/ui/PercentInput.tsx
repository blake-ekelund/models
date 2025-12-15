"use client";

import { useState, useEffect } from "react";

export function PercentInput({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
}) {
  const [display, setDisplay] = useState(String(value));

  useEffect(() => {
    setDisplay(String(value));
  }, [value]);

  function sanitize(input: string) {
    // allow digits and one decimal
    const cleaned = input.replace(/[^0-9.]/g, "");
    const parts = cleaned.split(".");
    if (parts.length > 2) return parts[0] + "." + parts[1];

    return cleaned;
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const raw = sanitize(e.target.value);
    setDisplay(raw);

    const num = Number(raw);
    if (!isNaN(num)) onChange(num);
  }

  return (
    <div className="flex flex-col space-y-1">
      {/* Label */}
      <label className="text-sm font-medium text-[#1B3C53]">
        {label}
      </label>

      {/* Input */}
      <input
        type="text"
        inputMode="decimal"
        value={display}
        onChange={handleChange}
        className="
          bg-white
          border border-[#456882]/40
          rounded-lg
          px-3 py-1.5
          text-[#1B3C53]
          focus:outline-none
          focus:ring-2 focus:ring-[#456882]/40
        "
      />
    </div>
  );
}
