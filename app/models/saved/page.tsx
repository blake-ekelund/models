"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import clsx from "clsx";
import {
  Download,
  Share2,
  Trash2,
} from "lucide-react";

import { useModelContext } from "@/app/models/context/ModelContext";
import { exportSaaSCoreToExcel } from "@/app/models/engines/saas-core/exportToExcel";
import { useSaaSCoreStore } from "@/app/models/engines/saas-core/store";

/* ---------------------------------------------
   Helpers
--------------------------------------------- */

function formatRelativeDate(date: Date) {
  const diffMs = Date.now() - date.getTime();
  const diffMin = Math.floor(diffMs / 60000);

  if (diffMin < 1) return "Just now";
  if (diffMin < 60) return `${diffMin} min ago`;

  const diffHr = Math.floor(diffMin / 60);
  if (diffHr < 24) return `${diffHr} hr ago`;

  const diffDay = Math.floor(diffHr / 24);
  return `${diffDay} day${diffDay > 1 ? "s" : ""} ago`;
}

/* ---------------------------------------------
   Page
--------------------------------------------- */

export default function SavedModelsPage() {
  const router = useRouter();
  const {
    recentModels,
    setActiveModel,
    deleteModel,
    renameModel,
  } = useModelContext();

  const { inputs } = useSaaSCoreStore();

  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  function openModel(model: any) {
    setActiveModel(model);
    router.push(`/models/${model.id}/overview`);
  }

  return (
    <div className="max-w-6xl mx-auto p-8 space-y-6">
      {/* HEADER */}
      <header>
        <h1 className="text-2xl font-semibold text-[#1B3C53]">
          Saved Models
        </h1>
        <p className="text-sm text-[#456882] mt-1">
          Resume, export, share, or manage your models.
        </p>
      </header>

      {/* EMPTY STATE */}
      {recentModels.length === 0 && (
        <div className="rounded-xl border border-dashed border-gray-300 p-12 text-center">
          <p className="text-sm text-[#456882]">
            No saved models yet.
          </p>
        </div>
      )}

      {/* TABLE */}
      {recentModels.length > 0 && (
        <div className="rounded-xl border border-gray-200 bg-white overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr className="text-xs uppercase tracking-wide text-gray-500">
                <th className="px-6 py-3 text-left font-medium">
                  Model Name
                </th>
                <th className="px-6 py-3 text-left font-medium">
                  Model Type
                </th>
                <th className="px-6 py-3 text-right font-medium">
                  Last Edited
                </th>
                <th className="px-6 py-3 text-right font-medium">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {recentModels.map((model, idx) => (
                <tr
                  key={model.id}
                  className={clsx(
                    "group transition",
                    idx !== 0 && "border-t border-gray-100",
                    "hover:bg-gray-50"
                  )}
                >
                  {/* NAME */}
                  <td className="px-6 py-4 font-medium text-[#1B3C53]">
                    <EditableName
                      name={model.name}
                      onSave={(n) => renameModel(model.id, n)}
                      onOpen={() => openModel(model)}
                    />
                  </td>

                  {/* TYPE */}
                  <td
                    className="px-6 py-4 text-[#456882] cursor-pointer"
                    onClick={() => openModel(model)}
                  >
                    {model.type}
                  </td>

                  {/* LAST EDIT */}
                  <td
                    className="px-6 py-4 text-right text-gray-500 cursor-pointer"
                    onClick={() => openModel(model)}
                  >
                    {formatRelativeDate(model.lastEdited)}
                  </td>

                  {/* ACTIONS */}
                  <td className="px-6 py-4 text-right">
                    <div className="inline-flex items-center gap-1 opacity-0 group-hover:opacity-100 transition">
                      <ActionIcon
                        title="Download to Excel"
                        onClick={() =>
                          exportSaaSCoreToExcel(inputs, model.name)
                        }
                      >
                        <Download size={16} />
                      </ActionIcon>

                      <ActionIcon
                        title="Share"
                        onClick={() =>
                          console.log("Share model", model)
                        }
                      >
                        <Share2 size={16} />
                      </ActionIcon>

                      <ActionIcon
                        title="Delete"
                        danger
                        onClick={() =>
                          setConfirmDelete(model.id)
                        }
                      >
                        <Trash2 size={16} />
                      </ActionIcon>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* DELETE CONFIRM */}
      {confirmDelete && (
        <ConfirmDelete
          onCancel={() => setConfirmDelete(null)}
          onConfirm={() => {
            deleteModel(confirmDelete);
            setConfirmDelete(null);
          }}
        />
      )}
    </div>
  );
}

/* ---------------------------------------------
   Inline rename (cleaned UX)
--------------------------------------------- */

function EditableName({
  name,
  onSave,
  onOpen,
}: {
  name: string;
  onSave: (n: string) => void;
  onOpen: () => void;
}) {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(name);

  if (!editing) {
    return (
      <span
        className="cursor-text hover:underline"
        onClick={() => setEditing(true)}
        onDoubleClick={onOpen}
      >
        {name}
      </span>
    );
  }

  return (
    <input
      autoFocus
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onBlur={() => {
        onSave(value.trim() || name);
        setEditing(false);
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          onSave(value.trim() || name);
          setEditing(false);
        }
        if (e.key === "Escape") {
          setEditing(false);
          setValue(name);
        }
      }}
      className="w-full rounded-md border border-gray-300 px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-[#00338d]"
    />
  );
}

/* ---------------------------------------------
   Action Icon
--------------------------------------------- */

function ActionIcon({
  children,
  onClick,
  title,
  danger = false,
}: {
  children: React.ReactNode;
  onClick: () => void;
  title: string;
  danger?: boolean;
}) {
  return (
    <button
      title={title}
      onClick={onClick}
      className={clsx(
        "p-2 rounded-md transition",
        danger
          ? "text-red-500 hover:bg-red-50"
          : "text-gray-500 hover:bg-gray-100"
      )}
    >
      {children}
    </button>
  );
}

/* ---------------------------------------------
   Confirm Delete Modal
--------------------------------------------- */

function ConfirmDelete({
  onCancel,
  onConfirm,
}: {
  onCancel: () => void;
  onConfirm: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-sm rounded-xl bg-white p-6">
        <h3 className="text-lg font-semibold text-[#1B3C53]">
          Delete model?
        </h3>

        <p className="mt-2 text-sm text-[#456882]">
          This action cannot be undone.
        </p>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="rounded-md border px-3 py-2 text-sm"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="rounded-md bg-red-600 px-3 py-2 text-sm text-white"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
