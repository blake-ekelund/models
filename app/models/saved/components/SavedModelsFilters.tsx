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
      {(["All", "Draft", "Saved"] as const).map((f) => {
        const isActive = filter === f;

        return (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={clsx(
              "rounded-md px-3 py-1 text-sm font-medium transition border",
              isActive
                ? "bg-[#1B3C53] text-white border-[#1B3C53]"
                : "text-[#456882] border-[#E3E3E3] hover:bg-[#F7F9FB]"
            )}
          >
            {f === "All" ? "My Models" : f}
          </button>
        );
      })}
    </div>
  );
}
