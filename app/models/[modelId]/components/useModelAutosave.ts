"use client";

import { useEffect, useRef } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useModelInstanceStore } from "./useModelInstanceStore";

export function useModelAutosave(modelId: string) {
  const inputs = useModelInstanceStore((s) => s.history.present);
  const dirty = useModelInstanceStore((s) => s.dirty);
  const markSaved = useModelInstanceStore((s) => s.markSaved);

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const savingRef = useRef(false);

  useEffect(() => {
    if (!dirty || !modelId) return;

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(async () => {
      if (savingRef.current) return;
      savingRef.current = true;

      try {
        await supabase
          .from("models")
          .update({
            inputs,
            last_edited_at: new Date().toISOString(),
          })
          .eq("id", modelId);

        markSaved();
      } catch (e) {
        console.error("Autosave failed:", e);
      } finally {
        savingRef.current = false;
      }
    }, 800); // sweet spot for modeling tools

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [inputs, dirty, modelId, markSaved]);
}
