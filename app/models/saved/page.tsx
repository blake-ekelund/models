"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import clsx from "clsx";
import { Download, Share2, Trash2, Save } from "lucide-react";

import { useModelContext } from "@/app/models/context/ModelContext";
import { exportSaaSCoreToExcel } from "@/app/models/engines/saas-core/exportToExcel";
import { useSaaSCoreStore } from "@/app/models/engines/saas-core/store";
import ConfirmDeleteModal from "@/app/components/ui/ConfirmDeleteModal";

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

export default function MyModelsPage() {
  const router = useRouter();
  const {
    recentModels,
    setActiveModel,
    deleteModel,
    renameModel,
    saveModel,
  } = useModelContext();

  const { inputs } = useSaaSCoreStore();

  const [filter, setFilter] = useState<"All" | "Draft" | "Saved">("All");
  const [confirmDelete, setConfirmDelete] = useState<{
    id: string;
    name: string;
  } | null>(null);

  function openModel(model: any) {
    setActiveModel(model);
    router.push(`/models/${model.id}/overview`);
  }

  const filteredModels =
    filter === "All"
      ? recentModels
      : recentModels.filter((m) => m.status === filter);

  return (
    <div className="max-w-6xl mx-auto p-8 space-y-6">
      {/* HEADER */}
      <header className="space-y-3">
        <div>
          <h1 className="text-2xl font-semibold text-[#1B3C53]">
            My Models
          </h1>
          <p className="text-sm text-[#456882]">
            Drafts and saved models you’re working on.
          </p>
        </div>

        {/* FILTERS */}
        <div className="flex gap-2">
          {(["All", "Draft", "Saved"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={clsx(
                "rounded-md px-3 py-1 text-sm border",
                filter === f
                  ? "bg-[#00338d] text-white border-[#00338d]"
                  : "text-gray-600 hover:bg-gray-50"
              )}
            >
              {f === "All" ? "My Models" : f}
            </button>
          ))}
        </div>
      </header>

      {/* EMPTY STATE */}
      {filteredModels.length === 0 && (
        <div className="rounded-xl border border-dashed border-gray-300 p-12 text-center">
          <p className="text-sm text-[#456882]">
            No models in this view.
          </p>
        </div>
      )}

      {/* TABLE */}
      {filteredModels.length > 0 && (
        <div className="rounded-xl border border-gray-200 bg-white overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr className="text-xs uppercase tracking-wide text-gray-500">
                <th className="px-4 py-2 text-left">Model Name</th>
                <th className="px-4 py-2 text-left">Type</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-right">Last Edited</th>
                <th className="px-4 py-2 text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredModels.map((model, idx) => (
                <tr
                  key={model.id}
                  className={clsx(
                    "group transition hover:bg-gray-50",
                    idx !== 0 && "border-t border-gray-100"
                  )}
                >
                  {/* NAME */}
                  <td className="px-4 py-2 font-medium text-[#1B3C53]">
                    <EditableName
                      name={model.name}
                      onSave={(n) => renameModel(model.id, n)}
                      onOpen={() => openModel(model)}
                    />
                  </td>

                  {/* TYPE */}
                  <td
                    className="px-4 py-2 text-[#456882] cursor-pointer"
                    onClick={() => openModel(model)}
                  >
                    {model.type}
                  </td>

                  {/* STATUS */}
                  <td className="px-4 py-2">
                    <span
                      className={clsx(
                        "rounded-full px-2 py-0.5 text-xs font-medium",
                        model.status === "Saved" &&
                          "bg-green-100 text-green-700",
                        model.status === "Draft" &&
                          "bg-yellow-100 text-yellow-700"
                      )}
                    >
                      {model.status}
                    </span>
                  </td>

                  {/* LAST EDIT */}
                  <td className="px-4 py-2 text-right text-gray-500">
                    {formatRelativeDate(model.lastEdited)}
                  </td>

                  {/* ACTIONS */}
                  <td className="px-4 py-2 text-right">
                    <div className="inline-flex items-center gap-1 opacity-0 group-hover:opacity-100 transition">
                      {model.status === "Draft" && (
                        <ActionIcon
                          title="Save Model"
                          onClick={() => saveModel(model.id)}
                        >
                          <Save size={16} />
                        </ActionIcon>
                      )}

                      <ActionIcon
                        title="Download to Excel"
                        onClick={() =>
                          exportSaaSCoreToExcel(inputs, model.name)
                        }
                      >
                        <Download size={16} />
                      </ActionIcon>

                      {model.status === "Saved" && (
                        <ActionIcon
                          title="Share"
                          onClick={() =>
                            console.log("Share", model)
                          }
                        >
                          <Share2 size={16} />
                        </ActionIcon>
                      )}

                      <ActionIcon
                        title="Delete permanently"
                        danger
                        onClick={() =>
                          setConfirmDelete({
                            id: model.id,
                            name: model.name,
                          })
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

      {/* CONFIRM DELETE */}
      <ConfirmDeleteModal
        open={!!confirmDelete}
        modelName={confirmDelete?.name ?? ""}
        onCancel={() => setConfirmDelete(null)}
        onConfirm={() => {
          if (!confirmDelete) return;
          deleteModel(confirmDelete.id);
          setConfirmDelete(null);
        }}
      />
    </div>
  );
}

/* ---------------------------------------------
   Inline rename
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
