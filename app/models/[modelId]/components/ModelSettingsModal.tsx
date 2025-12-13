"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";

interface Props {
  open: boolean;
  initialName: string;
  initialYears: number;
  initialDescription: string;
  onCancel: () => void;
  onSave: (data: {
    name: string;
    years: number;
    description: string;
  }) => void;
}

export default function ModelSettingsModal({
  open,
  initialName,
  initialYears,
  initialDescription,
  onCancel,
  onSave,
}: Props) {
  const [name, setName] = useState(initialName);
  const [years, setYears] = useState(initialYears);
  const [description, setDescription] = useState(initialDescription);

  useEffect(() => {
    if (open) {
      setName(initialName);
      setYears(initialYears);
      setDescription(initialDescription);
    }
  }, [open, initialName, initialYears, initialDescription]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center"
      onClick={onCancel}
    >
      <div
        className="bg-white rounded-2xl w-full max-w-md p-6 space-y-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER */}
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold text-[#1B3C53]">
              Model Settings
            </h3>
            <p className="text-sm text-[#456882] mt-1">
              Update how this model is configured.
            </p>
          </div>

          <button
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-600 text-lg leading-none"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* FORM */}
        <div className="space-y-5">
          <Field
            label="Model name"
            hint="This will appear throughout the workspace."
          >
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm
                         focus:outline-none focus:ring-2 focus:ring-[#00338d]/20 focus:border-[#00338d]"
            />
          </Field>

          <Field
            label="Projection length"
            hint="How many years should this model project?"
          >
            <select
              value={years}
              onChange={(e) => setYears(Number(e.target.value))}
              className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm
                         focus:outline-none focus:ring-2 focus:ring-[#00338d]/20 focus:border-[#00338d]"
            >
              {[1, 2, 3, 4, 5].map((y) => (
                <option key={y} value={y}>
                  {y} {y === 1 ? "year" : "years"}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Description (optional)">
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm resize-none
                         focus:outline-none focus:ring-2 focus:ring-[#00338d]/20 focus:border-[#00338d]"
            />
          </Field>
        </div>

        {/* ACTIONS */}
        <div className="flex justify-end gap-3 pt-2">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>

          <button
            onClick={() =>
              onSave({
                name: name.trim() || initialName,
                years,
                description,
              })
            }
            className={clsx(
              "px-4 py-2 text-sm rounded-md text-white transition",
              "bg-[#00338d] hover:bg-[#002b73]"
            )}
          >
            Save changes
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------
   Field wrapper (shared pattern)
--------------------------------------------- */

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1">
      <label className="text-sm font-medium text-[#1B3C53]">
        {label}
      </label>
      {children}
      {hint && (
        <p className="text-xs text-[#456882]">
          {hint}
        </p>
      )}
    </div>
  );
}
