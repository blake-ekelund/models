"use client";

import clsx from "clsx";

interface Props {
  filter: "All" | "Draft" | "Saved";
  setFilter: (v: "All" | "Draft" | "Saved") => void;
}

export default function SavedModelsFilters({
  filter,
  setFilter,
}: Props) {
  return (
    <div className="flex gap-2">
      {(["All", "Draft", "Saved"] as const).map((f) => (
        <button
          key={f}
          onClick={() => setFilter(f)}
          className={clsx(
            "rounded-md px-3 py-1 text-sm border transition",
            filter === f
              ? "bg-[#00338d] text-white border-[#00338d]"
              : "text-gray-600 hover:bg-gray-50"
          )}
        >
          {f === "All" ? "My Models" : f}
        </button>
      ))}
    </div>
  );
}
