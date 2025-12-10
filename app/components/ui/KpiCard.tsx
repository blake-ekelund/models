"use client";

export default function KpiCard({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  // Format numbers as #,###
  const formatted =
    typeof value === "number"
      ? Math.round(value).toLocaleString() // no decimals
      : value;

  return (
    <div className="bg-[#1E4258]/40 border border-[#456882]/40 rounded-xl p-3 text-center">
      <div className="text-xs text-[#E3E3E3]/70 mb-1">{label}</div>
      <div className="text-lg font-semibold text-[#E3E3E3]">
        {formatted}
      </div>
    </div>
  );
}
