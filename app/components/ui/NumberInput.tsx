"use client";

import { useState, useEffect } from "react";

export function NumberInput({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
}) {
  const [display, setDisplay] = useState(format(value));

  // Sync external changes → update display
  useEffect(() => {
    setDisplay(format(value));
  }, [value]);

  function format(n: number | string) {
    if (n === "" || n === null) return "";
    const num = Number(String(n).replace(/[^\d.-]/g, ""));
    if (isNaN(num)) return "";
    return num.toLocaleString();
  }

  function stripFormatting(v: string) {
    return Number(v.replace(/[^\d.-]/g, ""));
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const raw = e.target.value;

    // Update visible value immediately (formatted)
    setDisplay(format(raw));

    // Update numeric value for model
    const clean = stripFormatting(raw);
    if (!isNaN(clean)) {
      onChange(clean);
    }
  }

  return (
    <div className="flex flex-col">
      <label className="mb-1 text-[#E3E3E3]/80">{label}</label>

      <input
        type="text"
        inputMode="numeric"
        value={display}
        onChange={handleChange}
        className="bg-[#1E4258] border border-[#456882] rounded-lg px-3 py-2 
                   text-[#E3E3E3] focus:outline-none focus:ring-2 
                   focus:ring-[#E3E3E3]/40"
      />
    </div>
  );
}
