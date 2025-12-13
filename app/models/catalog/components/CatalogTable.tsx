"use client";

import { CatalogModel } from "../page";
import CatalogTableRow from "./CatalogTableRow";

interface Props {
  models: CatalogModel[];
  onSelect: (model: CatalogModel) => void;
}

export default function CatalogTable({ models, onSelect }: Props) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-gray-50">
          <tr className="text-xs uppercase tracking-wide text-gray-500">
            <th className="px-6 py-3 text-left">Model</th>
            <th className="px-6 py-3 text-left">Category</th>
            <th className="px-6 py-3 text-left">Status</th>
            <th className="px-6 py-3 text-right">Action</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-100">
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
