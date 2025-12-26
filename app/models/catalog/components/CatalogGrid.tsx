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
      <div className="w-full rounded-xl border border-dashed border-[#E3E3E3] p-12 text-center bg-white">
        <p className="text-sm text-[#456882]">
          No models match your filters.
        </p>
      </div>
    );
  }

  return (
    <div
      className="
        w-full
        grid
        gap-4
        items-stretch
        [grid-template-columns:repeat(auto-fill,minmax(320px,1fr))]
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
