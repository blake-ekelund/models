"use client";

import SavedModelsRow from "./SavedModelsRow";

interface Props {
  models: any[];
  onOpen: (model: any) => void;
  onRename: (id: string, name: string) => void;
  onSave: (id: string) => void;
  onExport: (name: string) => void;
  onDelete: (id: string, name: string) => void;
}

export default function SavedModelsTable({
  models,
  onOpen,
  onRename,
  onSave,
  onExport,
  onDelete,
}: Props) {
  if (models.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-gray-300 p-12 text-center">
        <p className="text-sm text-[#456882]">
          No models in this view.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-gray-200 bg-white overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-gray-50">
          <tr className="text-xs uppercase tracking-wide text-gray-500">
            <th className="px-4 py-2 text-left">Model</th>
            <th className="px-4 py-2 text-left">Type</th>
            <th className="px-4 py-2 text-left">Status</th>
            <th className="px-4 py-2 text-right">Last Edited</th>
            <th className="px-4 py-2 text-right">Actions</th>
          </tr>
        </thead>

        <tbody>
          {models.map((model, idx) => (
            <SavedModelsRow
              key={model.id}
              model={model}
              showBorder={idx !== 0}
              onOpen={onOpen}
              onRename={onRename}
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
