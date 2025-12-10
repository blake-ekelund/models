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
    <div className="flex flex-col">
      <label className="mb-1 text-[#E3E3E3]/80">{label}</label>
      <input
        type="text"
        inputMode="decimal"
        value={display}
        onChange={handleChange}
        className="bg-[#1E4258] border border-[#456882] rounded-lg px-3 py-2
                   text-[#E3E3E3] focus:outline-none focus:ring-2 
                   focus:ring-[#E3E3E3]/40"
      />
    </div>
  );
}
