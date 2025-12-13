"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { useModelContext } from "@/app/models/context/ModelContext";

import CatalogFilters from "./components/CatalogFilters";
import CatalogGrid from "./components/CatalogGrid";
import CatalogTable from "./components/CatalogTable";
import CreateModelModal from "./components/CreateModelModal";

/* ---------------------------------------------
   Types
--------------------------------------------- */

export interface CatalogModel {
  id: string;
  slug: string;
  name: string;
  description: string;
  category: string;
  status: "Available" | "Coming Soon";
  inputs_preview?: string[];
}

/* ---------------------------------------------
   Page
--------------------------------------------- */

export default function ModelsCatalogPage() {
  const router = useRouter();
  const { createModel, recentModels } = useModelContext();

  const [models, setModels] = useState<CatalogModel[]>([]);
  const [loading, setLoading] = useState(true);

  const [query, setQuery] = useState("");
  const [view, setView] = useState<"table" | "grid">("table");

  const [activeCategory, setActiveCategory] = useState("");
  const [selectedModel, setSelectedModel] =
    useState<CatalogModel | null>(null);

  /* ---------------------------------------------
     Load catalog from Supabase
  --------------------------------------------- */
  useEffect(() => {
    async function loadCatalog() {
      const { data, error } = await supabase
        .from("model_catalog")
        .select("*")
        .order("category")
        .order("name");

      if (!error && data) {
        setModels(data);
      }

      setLoading(false);
    }

    loadCatalog();
  }, []);

  /* ---------------------------------------------
     Derive categories
  --------------------------------------------- */
  const categories = useMemo(() => {
    return Array.from(new Set(models.map((m) => m.category)));
  }, [models]);

  /* ---------------------------------------------
     Filtering (query + category)
  --------------------------------------------- */
  const filteredModels = useMemo(() => {
    return models.filter((m) => {
      const matchesQuery = query
        ? `${m.name} ${m.description} ${m.category}`
            .toLowerCase()
            .includes(query.toLowerCase())
        : true;

      const matchesCategory = activeCategory
        ? m.category === activeCategory
        : true;

      return matchesQuery && matchesCategory;
    });
  }, [models, query, activeCategory]);

  /* ---------------------------------------------
     Select model → open modal
  --------------------------------------------- */
  function handleSelect(model: CatalogModel) {
    if (model.status !== "Available") return;
    setSelectedModel(model);
  }

  const defaultName = `My Model ${recentModels.length + 1}`;

  /* ---------------------------------------------
     Render
  --------------------------------------------- */

  return (
    <div className="max-w-7xl mx-auto p-8 space-y-6">
      {/* HEADER */}
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold text-[#1B3C53]">
          Create a New Model
        </h1>
        <p className="text-sm text-[#456882]">
          Choose a model to start from.
        </p>
      </header>

      {/* FILTERS */}
      <CatalogFilters
        query={query}
        setQuery={setQuery}
        view={view}
        setView={setView}
        categories={categories}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />

      {/* LOADING */}
      {loading && (
        <div className="text-sm text-gray-500">
          Loading model catalog…
        </div>
      )}

      {/* EMPTY */}
      {!loading && filteredModels.length === 0 && (
        <div className="rounded-xl border border-dashed border-gray-300 p-12 text-center">
          <p className="text-sm text-[#456882]">
            No models match your filters.
          </p>
        </div>
      )}

      {/* GRID */}
      {!loading && view === "grid" && filteredModels.length > 0 && (
        <CatalogGrid
          models={filteredModels}
          onSelect={handleSelect}
        />
      )}

      {/* TABLE */}
      {!loading && view === "table" && filteredModels.length > 0 && (
        <CatalogTable
          models={filteredModels}
          onSelect={handleSelect}
        />
      )}

      {/* CREATE MODEL MODAL */}
      <CreateModelModal
        open={!!selectedModel}
        defaultName={defaultName}
        onCancel={() => setSelectedModel(null)}
        onCreate={async ({ name }) => {
          if (!selectedModel) return;

          const instance = await createModel({
            name,
            type: selectedModel.slug,
            inputs: {}, // defaults will come from model definition later
          });

          setSelectedModel(null);
          router.push(`/models/${instance.id}`);
        }}
      />
    </div>
  );
}
