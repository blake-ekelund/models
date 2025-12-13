"use client";

import { useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { useModelInstanceStore } from "./store/useModelInstanceStore";
import { DEFAULT_MODEL_INPUTS } from "@/app/models/defaultInputs";
import { useModelAutosave } from "./useModelAutosave";
import SaveStatus from "./components/SaveStatus";

export default function ModelInstanceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { modelId } = useParams<{ modelId: string }>();
  const setInputs = useModelInstanceStore((s) => s.setInputs);

  const hydratedRef = useRef<string | null>(null);

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

  useModelAutosave(modelId);

  return (
    <div className="w-full h-full">
      {/* Model-level header */}
      <div className="sticky top-0 z-10 bg-white border-b px-6 py-3 flex items-center justify-between">
        <div className="text-sm font-medium text-[#1B3C53]">
          Model
        </div>

        <SaveStatus />
      </div>

      {children}
    </div>
  );
}
