"use client";

import { CatalogModel } from "../page";
import CatalogGridCard from "./CatalogGridCard";

interface Props {
  models: CatalogModel[];
  onSelect: (model: CatalogModel) => void;
}

export default function CatalogGrid({ models, onSelect }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
