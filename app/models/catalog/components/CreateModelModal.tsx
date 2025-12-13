"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";

interface Props {
  open: boolean;
  defaultName: string;
  onCancel: () => void;
  onCreate: (data: {
    name: string;
    years: number;
    description: string;
  }) => void;
}

export default function CreateModelModal({
  open,
  defaultName,
  onCancel,
  onCreate,
}: Props) {
  const [name, setName] = useState(defaultName);
  const [years, setYears] = useState(3);
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (open) {
      setName(defaultName);
      setYears(3);
      setDescription("");
    }
  }, [open, defaultName]);

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
              Create Model
            </h3>
            <p className="text-sm text-[#456882] mt-1">
              Set up your model before getting started.
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
          {/* NAME */}
          <Field
            label="Model name"
            hint="You can change this later."
          >
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={defaultName}
              className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm
                         focus:outline-none focus:ring-2 focus:ring-[#00338d]/20 focus:border-[#00338d]"
            />
          </Field>

          {/* YEARS */}
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

          {/* DESCRIPTION */}
          <Field
            label="Description (optional)"
          >
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              placeholder="e.g. Board planning scenario, pricing test, fundraising model…"
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
              onCreate({
                name: name.trim() || defaultName,
                years,
                description,
              })
            }
            className={clsx(
              "px-4 py-2 text-sm rounded-md text-white transition",
              "bg-[#00338d] hover:bg-[#002b73]"
            )}
          >
            Create model
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------
   Field wrapper
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
