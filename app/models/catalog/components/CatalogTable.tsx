"use client";

import { CatalogModel } from "../page";
import CatalogTableRow from "./CatalogTableRow";

interface Props {
  models: CatalogModel[];
  onSelect: (model: CatalogModel) => void;
}

export default function CatalogTable({ models, onSelect }: Props) {
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
    <div className="rounded-xl border border-[#E3E3E3] bg-white overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-[#F7F9FB]">
          <tr className="text-xs uppercase tracking-wide text-[#456882]">
            <th className="px-6 py-3 text-left font-medium">
              Model
            </th>
            <th className="px-6 py-3 text-left font-medium">
              Category
            </th>
            <th className="px-6 py-3 text-left font-medium">
              Status
            </th>
            <th className="px-6 py-3 text-right font-medium">
              Action
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-[#E3E3E3]">
          {models.map((model) => (
            <CatalogTableRow
              key={model.id}
              model={model}
              onSelect={onSelect}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
