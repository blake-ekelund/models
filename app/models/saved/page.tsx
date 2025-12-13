"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { useModelContext } from "@/app/models/context/ModelContext";
import { useSaaSCoreStore } from "@/app/models/engines/saas-core/store";
import { exportSaaSCoreToExcel } from "@/app/models/engines/saas-core/exportToExcel";

import ConfirmDeleteModal from "@/app/models/saved/components/ConfirmDeleteModal";
import SavedModelsFilters from "./components/SavedModelsFilters";
import SavedModelsTable from "./components/SavedModelsTable";

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

  const [filter, setFilter] =
    useState<"All" | "Draft" | "Saved">("All");

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

  const isEmpty = filteredModels.length === 0;

  return (
    <div className="max-w-7xl mx-auto p-8 space-y-6">
      {/* HEADER */}
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold text-[#1B3C53]">
          My Models
        </h1>
        <p className="text-sm text-[#456882]">
          Drafts and saved models you’re working on.
        </p>
      </header>

      {/* FILTERS */}
      <SavedModelsFilters
        filter={filter}
        setFilter={setFilter}
      />

      {/* EMPTY STATE */}
      {isEmpty && (
        <div className="rounded-xl border border-dashed border-gray-300 p-12 text-center space-y-4">
          <p className="text-sm text-[#456882]">
            {filter === "All"
              ? "You don’t have any models yet."
              : `No ${filter.toLowerCase()} models in this view.`}
          </p>

          {filter === "All" && (
            <button
              onClick={() => router.push("/models/catalog")}
              className="inline-flex items-center justify-center rounded-md bg-[#00338d] px-4 py-2 text-sm font-medium text-white hover:bg-[#002b73]"
            >
              Create your first model
            </button>
          )}
        </div>
      )}

      {/* TABLE */}
      {!isEmpty && (
        <SavedModelsTable
          models={filteredModels}
          onOpen={openModel}
          onRename={renameModel}
          onSave={saveModel}
          onExport={(name) =>
            exportSaaSCoreToExcel(inputs, name)
          }
          onDelete={(id, name) =>
            setConfirmDelete({ id, name })
          }
        />
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
