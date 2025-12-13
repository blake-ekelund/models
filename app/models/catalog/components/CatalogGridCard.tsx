"use client";

import { CatalogModel } from "../page";

interface Props {
  model: CatalogModel;
  onSelect: (model: CatalogModel) => void;
}

export default function CatalogGridCard({ model, onSelect }: Props) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 flex justify-between gap-4">
      <div className="space-y-1">
        <div className="text-sm font-medium text-[#1B3C53]">
          {model.name}
        </div>

        <div className="text-xs text-[#456882]">
          {model.description}
        </div>

        <div className="text-[11px] uppercase tracking-wide text-[#456882]/70">
          {model.category}
        </div>
      </div>

      <div className="flex items-center">
        {model.status === "Available" ? (
          <button
            onClick={() => onSelect(model)}
            className="text-sm font-medium text-[#00338d] hover:underline"
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
