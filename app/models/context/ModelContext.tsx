"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export type ModelStatus = "Draft" | "Saved";

export interface ModelInstance {
  id: string;
  name: string;
  type: string;
  status: ModelStatus;
  lastEdited: Date;
  inputs: any;
}

interface ModelContextValue {
  activeModel: ModelInstance | null;
  recentModels: ModelInstance[];

  createModel: (model: {
    name: string;
    type: string;
    inputs: any;
  }) => Promise<ModelInstance>;

  saveModel: (id: string) => Promise<void>;
  deleteModel: (id: string) => Promise<void>;

  setActiveModel: (model: ModelInstance | null) => void;
  refreshModels: () => Promise<void>;
}

const ModelContext = createContext<ModelContextValue | null>(null);

/* --------------------------------------------------
   Supabase → ModelInstance mapper (single source)
-------------------------------------------------- */
function mapRowToModel(m: any): ModelInstance {
  return {
    id: m.id,
    name: m.name,
    type: m.model_type,
    status: m.status as ModelStatus,
    lastEdited: new Date(m.last_edited_at),
    inputs: m.inputs,
  };
}

export function ModelProvider({ children }: { children: React.ReactNode }) {
  const [recentModels, setRecentModels] = useState<ModelInstance[]>([]);
  const [activeModel, setActiveModel] = useState<ModelInstance | null>(null);

  async function refreshModels() {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session?.user) {
      setRecentModels([]);
      setActiveModel(null);
      return;
    }

    const { data, error } = await supabase
      .from("models")
      .select("*")
      .eq("user_id", session.user.id)
      .order("last_edited_at", { ascending: false });

    if (error || !data) return;

    const models = data.map(mapRowToModel);

    setRecentModels(models);
    setActiveModel((prev) =>
      prev ? models.find((m) => m.id === prev.id) ?? null : models[0] ?? null
    );
  }

  useEffect(() => {
    // Initial load
    refreshModels();

    // Re-run whenever auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      refreshModels();
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  async function createModel({
    name,
    type,
    inputs,
  }: {
    name: string;
    type: string;
    inputs: any;
  }): Promise<ModelInstance> {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session?.user) {
      throw new Error("Not authenticated");
    }

    const { data, error } = await supabase
      .from("models")
      .insert({
        user_id: session.user.id,
        name,
        model_type: type,
        inputs,
        status: "Draft",
      })
      .select()
      .single();

    if (error || !data) {
      throw error ?? new Error("Failed to create model");
    }

    const model = mapRowToModel(data);

    await refreshModels();
    return model;
  }

  async function saveModel(id: string) {
    await supabase
      .from("models")
      .update({
        status: "Saved",
        last_edited_at: new Date().toISOString(),
      })
      .eq("id", id);

    await refreshModels();
  }

  async function deleteModel(id: string) {
    await supabase.from("models").delete().eq("id", id);

    setActiveModel((prev) => (prev?.id === id ? null : prev));
    await refreshModels();
  }

  return (
    <ModelContext.Provider
      value={{
        activeModel,
        recentModels,
        createModel,
        saveModel,
        deleteModel,
        setActiveModel,
        refreshModels,
      }}
    >
      {children}
    </ModelContext.Provider>
  );
}

export function useModelContext() {
  const ctx = useContext(ModelContext);
  if (!ctx) {
    throw new Error("useModelContext must be used within ModelProvider");
  }
  return ctx;
}
