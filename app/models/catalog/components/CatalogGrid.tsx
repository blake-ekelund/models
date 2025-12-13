"use client";

import { CatalogModel } from "../page";
import CatalogGridCard from "./CatalogGridCard";

interface Props {
  models: CatalogModel[];
  onSelect: (model: CatalogModel) => void;
}

export default function CatalogGrid({ models, onSelect }: Props) {
  if (models.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-[#E3E3E3] p-12 text-center bg-white">
        <p className="text-sm text-[#456882]">
          No models match your filters.
        </p>
      </div>
    );
  }

  return (
    <div
      className="
        grid
        grid-cols-1
        sm:grid-cols-2
        lg:grid-cols-3
        gap-4
      "
    >
      {models.map((model) => (
        <CatalogGridCard
          key={model.id}
          model={model}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}
