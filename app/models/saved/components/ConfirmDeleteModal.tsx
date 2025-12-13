"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";

export default function ConfirmDeleteModal({
  open,
  modelName,
  onCancel,
  onConfirm,
}: {
  open: boolean;
  modelName: string;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  const [value, setValue] = useState("");

  useEffect(() => {
    if (open) {
      setValue("");
    }
  }, [open]);

  if (!open) return null;

  const isMatch = value === modelName;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div
        className="bg-white rounded-xl p-6 w-full max-w-sm"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-lg font-semibold text-[#1B3C53]">
          Permanently delete model?
        </h3>

        <p className="text-sm text-[#456882] mt-2">
          This will permanently delete{" "}
          <strong>{modelName}</strong>. This action cannot be undone.
        </p>

        <div className="mt-4 space-y-2">
          <label className="text-sm font-medium text-[#1B3C53]">
            Type <strong>{modelName}</strong> to confirm
          </label>

          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={modelName}
            className={clsx(
              "w-full rounded-md border px-3 py-2 text-sm focus:outline-none",
              isMatch
                ? "border-green-500 focus:ring-1 focus:ring-green-500"
                : "border-gray-300 focus:ring-1 focus:ring-[#00338d]"
            )}
          />
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-3 py-2 text-sm rounded-md border"
          >
            Cancel
          </button>

          <button
            disabled={!isMatch}
            onClick={onConfirm}
            className={clsx(
              "px-3 py-2 text-sm rounded-md text-white transition",
              isMatch
                ? "bg-red-600 hover:bg-red-700"
                : "bg-red-300 cursor-not-allowed"
            )}
          >
            Delete permanently
          </button>
        </div>
      </div>
    </div>
  );
}
