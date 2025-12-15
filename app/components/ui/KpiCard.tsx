"use client";

export default function KpiCard({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  const formatted =
    typeof value === "number"
      ? Math.round(value).toLocaleString()
      : value;

  return (
    <div
      className="
        bg-[#1B3C53]
        border border-[#234C6A]
        rounded-xl
        p-2
        text-center
        relative
        overflow-hidden
      "
    >
      {/* Label */}
      <div className="text-xs font-medium text-[#E3E3E3]/70 mb-0">
        {label}
      </div>

      {/* Value */}
      <div className="text-lg font-semibold text-[#E3E3E3]">
        {formatted}
      </div>
    </div>
  );
}
