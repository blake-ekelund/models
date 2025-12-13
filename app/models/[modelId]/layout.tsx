"use client";

import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { Settings } from "lucide-react";

import { supabase } from "@/lib/supabaseClient";
import { useModelInstanceStore } from "./components/useModelInstanceStore";
import { useModelContext } from "@/app/models/context/ModelContext";
import { DEFAULT_MODEL_INPUTS } from "@/app/models/defaultInputs";
import { useModelAutosave } from "./components/useModelAutosave";

import SaveStatus from "./components/SaveStatus";
import ModelSettingsModal from "./components/ModelSettingsModal";

export default function ModelInstanceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { modelId } = useParams<{ modelId: string }>();

  const setInputs = useModelInstanceStore((s) => s.setInputs);
  const { recentModels, renameModel } = useModelContext();

  const hydratedRef = useRef<string | null>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const model = recentModels.find((m) => m.id === modelId);

  /* ---------------------------------------------
     Hydrate model inputs once
  --------------------------------------------- */
  useEffect(() => {
    if (!modelId) return;
    if (hydratedRef.current === modelId) return;

    async function loadModel() {
      const { data, error } = await supabase
        .from("models")
        .select("inputs")
        .eq("id", modelId)
        .single();

      if (error) {
        console.error("Failed to load model:", error);
        return;
      }

      setInputs({
        ...DEFAULT_MODEL_INPUTS,
        ...(data?.inputs ?? {}),
      });

      hydratedRef.current = modelId;
    }

    loadModel();
  }, [modelId, setInputs]);

  /* ---------------------------------------------
     Autosave
  --------------------------------------------- */
  useModelAutosave(modelId);

  return (
    <div className="w-full h-full">
      {/* WORKSPACE HEADER */}
      <div className="sticky top-0 z-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          {/* LEFT: Model identity */}
          <div className="min-w-0">
            <div className="text-sm font-semibold text-[#1B3C53] truncate">
              {model?.name ?? "Model"}
            </div>
          </div>

          {/* RIGHT: Save status + settings */}
          <div className="flex items-center gap-4">
            <SaveStatus />

            <button
              title="Model settings"
              onClick={() => setSettingsOpen(true)}
              className="p-2 rounded-md text-gray-500 hover:bg-gray-100 hover:text-[#1B3C53]"
            >
              <Settings size={18} />
            </button>
          </div>
        </div>

        {/* SOFT DIVIDER */}
        <div className="border-t border-[#456882]/40" />
      </div>

      {/* PAGE CONTENT */}
      <div className="relative">
        {children}
      </div>

      {/* SETTINGS MODAL */}
      <ModelSettingsModal
        open={settingsOpen}
        initialName={model?.name ?? ""}
        initialYears={model?.inputs?.years ?? 3}
        initialDescription={model?.inputs?.description ?? ""}
        onCancel={() => setSettingsOpen(false)}
        onSave={({ name, years, description }) => {
          if (!model) return;

          // 1️⃣ Update model name (metadata)
          renameModel(model.id, name);

          // 2️⃣ SAFELY update only config fields inside inputs
          const currentInputs =
            useModelInstanceStore.getState().history.present ?? {};

          setInputs({
            ...currentInputs,
            years,
            description,
          });

          setSettingsOpen(false);
        }}
      />
    </div>
  );
}
