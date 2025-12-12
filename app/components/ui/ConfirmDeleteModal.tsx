"use client";

export default function ConfirmDeleteModal({
  open,
  onCancel,
  onConfirm,
  modelName,
}: {
  open: boolean;
  modelName: string;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl p-6 w-full max-w-sm">
        <h3 className="text-lg font-semibold text-[#1B3C53]">
          Delete model?
        </h3>

        <p className="text-sm text-[#456882] mt-2">
          This will permanently delete <strong>{modelName}</strong>.
        </p>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-3 py-2 text-sm rounded-md border"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="px-3 py-2 text-sm rounded-md bg-red-600 text-white"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
