"use client";

import clsx from "clsx";
import { CatalogModel } from "../page";

interface Props {
  model: CatalogModel;
  onSelect: (model: CatalogModel) => void;
}

export default function CatalogGridCard({ model, onSelect }: Props) {
  const isAvailable = model.status === "Available";

  return (
    <div
      className={clsx(
        "w-full max-w-[360px]",
        "rounded-xl border bg-white p-5 flex justify-between gap-4 transition",
        "border-[#E3E3E3]",
        isAvailable && "hover:bg-[#F7F9FB] hover:border-[#1B3C53]/30"
      )}
    >
      <div className="space-y-1">
        <div className="text-sm font-medium text-[#1B3C53] line-clamp-2">
          {model.name}
        </div>

        <div className="text-xs text-[#456882]">
          {model.description}
        </div>

        <div className="text-[11px] uppercase tracking-wide text-[#456882]/70">
          {model.category}
        </div>
      </div>

      <div className="flex items-start">
        {isAvailable ? (
          <button
            onClick={() => onSelect(model)}
            className="
              text-sm font-medium
              text-[#1B3C53]
              hover:text-[#234C6A]
              transition
            "
          >
            Select
          </button>
        ) : (
          <span className="text-xs text-[#456882]/60">
            Coming soon
          </span>
        )}
      </div>
    </div>
  );
}

