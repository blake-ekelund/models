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
  renameModel: (id: string, name: string) => Promise<void>;
  deleteModel: (id: string) => Promise<void>;

  setActiveModel: (model: ModelInstance | null) => void;
  refreshModels: () => Promise<void>;
}

const ModelContext = createContext<ModelContextValue | null>(null);

export function ModelProvider({ children }: { children: React.ReactNode }) {
  const [recentModels, setRecentModels] = useState<ModelInstance[]>([]);
  const [activeModel, setActiveModel] = useState<ModelInstance | null>(null);

  async function refreshModels() {
    const { data: { session } } = await supabase.auth.getSession();
    const user = session?.user;
    if (!user) return;

    const { data } = await supabase
      .from("models")
      .select("*")
      .eq("user_id", user.id)
      .order("last_edited_at", { ascending: false });

    if (!data) return;

    const models: ModelInstance[] = data.map((m) => ({
      id: m.id,
      name: m.name,
      type: m.model_type,
      status: m.status as ModelStatus,
      lastEdited: new Date(m.last_edited_at),
      inputs: m.inputs,
    }));

    setRecentModels(models);
    setActiveModel(models[0] ?? null);
  }

  useEffect(() => {
    refreshModels();
  }, []);

  async function createModel({ name, type, inputs }: any) {
    const { data: { session } } = await supabase.auth.getSession();
    const user = session?.user;
    if (!user) throw new Error("Not authenticated");

    const { data, error } = await supabase
      .from("models")
      .insert({
        user_id: user.id,
        name,
        model_type: type,
        inputs,
        status: "Draft",
      })
      .select()
      .single();

    if (error) throw error;

    await refreshModels();
    return data;
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

  async function deleteModel(id: string) {
    await supabase
      .from("models")
      .delete()
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
        saveModel,
        renameModel,
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
  if (!ctx) throw new Error("useModelContext must be used within ModelProvider");
  return ctx;
}
