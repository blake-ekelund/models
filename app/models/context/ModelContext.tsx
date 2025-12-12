"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export interface ModelInstance {
  id: string;
  name: string;
  type: string;
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

  setActiveModel: (model: ModelInstance | null) => void;

  renameModel: (id: string, name: string) => Promise<void>;
  deleteModel: (id: string) => Promise<void>;
  refreshModels: () => Promise<void>;
}

const ModelContext = createContext<ModelContextValue | null>(null);

export function ModelProvider({ children }: { children: React.ReactNode }) {
  const [recentModels, setRecentModels] = useState<ModelInstance[]>([]);
  const [activeModel, setActiveModel] = useState<ModelInstance | null>(null);

  /* ---------------------------------------------
     Load models from Supabase
  --------------------------------------------- */
  async function refreshModels() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { data } = await supabase
      .from("models")
      .select("*")
      .eq("user_id", user.id)
      .eq("is_deleted", false)
      .order("last_edited_at", { ascending: false })
      .limit(10);

    if (!data) return;

    const models = data.map((m) => ({
      id: m.id,
      name: m.name,
      type: m.model_type,
      lastEdited: new Date(m.last_edited_at),
      inputs: m.inputs,
    }));

    setRecentModels(models);
    setActiveModel(models[0] ?? null);
  }

  /* ---------------------------------------------
     Initial load
  --------------------------------------------- */
  useEffect(() => {
    refreshModels();
  }, []);

  /* ---------------------------------------------
     Create model
  --------------------------------------------- */
  async function createModel({
    name,
    type,
    inputs,
  }: {
    name: string;
    type: string;
    inputs: any;
  }) {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) throw new Error("Not authenticated");

    const { data, error } = await supabase
      .from("models")
      .insert({
        user_id: user.id,
        name,
        model_type: type,
        inputs,
      })
      .select()
      .single();

    if (error) throw error;

    const model: ModelInstance = {
      id: data.id,
      name: data.name,
      type: data.model_type,
      lastEdited: new Date(data.last_edited_at),
      inputs: data.inputs,
    };

    setRecentModels((prev) => [model, ...prev]);
    setActiveModel(model);

    return model;
  }

  /* ---------------------------------------------
     Rename model
  --------------------------------------------- */
  async function renameModel(id: string, name: string) {
    await supabase
      .from("models")
      .update({
        name,
        last_edited_at: new Date().toISOString(),
      })
      .eq("id", id);

    await refreshModels();
  }

  /* ---------------------------------------------
     Soft delete model
  --------------------------------------------- */
  async function deleteModel(id: string) {
    await supabase
      .from("models")
      .update({
        is_deleted: true,
        last_edited_at: new Date().toISOString(),
      })
      .eq("id", id);

    await refreshModels();
    setActiveModel((prev) => (prev?.id === id ? null : prev));
  }

  return (
    <ModelContext.Provider
      value={{
        activeModel,
        recentModels,
        createModel,
        setActiveModel,
        renameModel,
        deleteModel,
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
