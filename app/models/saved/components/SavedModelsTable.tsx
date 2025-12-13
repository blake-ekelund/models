"use client";

import type { ModelInstance } from "@/app/models/context/ModelContext";
import SavedModelsRow from "./SavedModelsRow";

interface Props {
  models: ModelInstance[];
  onOpen: (model: ModelInstance) => void;
  onSave: (id: string) => void;
  onExport: (model: ModelInstance) => void;
  onDelete: (id: string, name: string) => void;
}

export default function SavedModelsTable({
  models,
  onOpen,
  onSave,
  onExport,
  onDelete,
}: Props) {
  return (
    <div className="rounded-xl border border-[#E3E3E3] bg-white overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-[#F7F9FB]">
          <tr className="text-xs uppercase tracking-wide text-[#456882]">
            <th className="px-4 py-3 text-left font-medium">Model</th>
            <th className="px-4 py-3 text-left font-medium">Type</th>
            <th className="px-4 py-3 text-left font-medium">Status</th>
            <th className="px-4 py-3 text-right font-medium">Last Edited</th>
            <th className="px-4 py-3 text-right font-medium">Actions</th>
          </tr>
        </thead>

        <tbody>
          {models.map((model, idx) => (
            <SavedModelsRow
              key={model.id}
              model={model}
              showBorder={idx !== 0}
              onOpen={onOpen}
              onSave={onSave}
              onExport={onExport}
              onDelete={onDelete}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
