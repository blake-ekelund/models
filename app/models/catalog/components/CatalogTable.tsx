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
      <div className="w-full rounded-xl border border-dashed border-[#E3E3E3] p-12 text-center bg-white">
        <p className="text-sm text-[#456882]">
          No models match your filters.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full rounded-xl border border-[#E3E3E3] bg-white overflow-hidden">
      <table className="w-full table-fixed text-sm">
        <thead className="bg-[#F7F9FB]">
          <tr className="text-xs uppercase tracking-wide text-[#456882]">
            {/* MODEL — flex column */}
            <th className="px-6 py-3 text-left font-medium w-full">
              Model
            </th>

            {/* CATEGORY — fixed */}
            <th className="px-6 py-3 text-left font-medium whitespace-nowrap w-40">
              Category
            </th>

            {/* STATUS — fixed */}
            <th className="px-6 py-3 text-left font-medium whitespace-nowrap w-36">
              Status
            </th>

            {/* ACTION — fixed */}
            <th className="px-6 py-3 text-right font-medium whitespace-nowrap w-32">
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
