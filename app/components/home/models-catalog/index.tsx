"use client";

import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

import CatalogHeader from "./ModelsHeader";
import ModelGrid from "./ModelGrid";
import ModelTable from "./ModelTable";
import { ModelCardProps } from "./ModelCard";

// ---------------------------------------------------
// TYPES
// ---------------------------------------------------

export type ModelCategory =
  | "Revenue"
  | "Cash Flow"
  | "Profitability"
  | "Planning"
  | "Operational";

export type ModelStatus = "Available" | "Coming Soon";

export interface CatalogModel extends ModelCardProps {
  id: string;
  slug: string;
  popularity: number;
  premium: boolean;
  created_at: string;
}

interface ModelsCatalogProps {
  onRequestModel: () => void;
}

// ---------------------------------------------------
// MAIN COMPONENT
// ---------------------------------------------------

export default function ModelsCatalog({
  onRequestModel,
}: ModelsCatalogProps) {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("Popular");

  const [models, setModels] = useState<CatalogModel[]>([]);
  const [loading, setLoading] = useState(true);

  // ---------------------------------------------------
  // FETCH FROM SUPABASE
  // ---------------------------------------------------

  useEffect(() => {
    async function loadModels() {
      setLoading(true);

      const { data, error } = await supabase
        .from("model_catalog")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Failed to load model catalog:", error);
        setLoading(false);
        return;
      }

      const mapped: CatalogModel[] = data.map((m) => {
        const createdAt = new Date(m.created_at);
        const daysOld =
          (Date.now() - createdAt.getTime()) / (1000 * 60 * 60 * 24);

        const isAvailable = m.status === "Available";

        return {
          id: m.id,
          slug: m.slug,
          name: m.name,
          desc: m.description,
          category: m.category as ModelCategory,
          status: m.status as ModelStatus,
          created_at: m.created_at,

          // New only if available
          isNew: isAvailable && daysOld < 14,

          popularity: 100 - Math.min(daysOld, 90),
          premium: false,

          onStart: isAvailable
            ? () => {
                window.location.href = `/models/${m.slug}`;
              }
            : undefined,
        };
      });

      setModels(mapped);
      setLoading(false);
    }

    loadModels();
  }, []);

  // ---------------------------------------------------
  // FILTERING + SORTING
  // ---------------------------------------------------

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    return models
      .filter((m) => {
        if (!q) return true;

        return (
          m.name.toLowerCase().includes(q) ||
          m.desc.toLowerCase().includes(q) ||
          m.category.toLowerCase().includes(q)
        );
      })
      .filter((m) => {
        if (category === "All") return true;
        return m.category === category;
      })
      .sort((a, b) => {
        // 1️⃣ Available before Coming Soon
        if (a.status !== b.status) {
          return a.status === "Available" ? -1 : 1;
        }

        // 2️⃣ New before Old (within Available)
        if (a.isNew !== b.isNew) {
          return a.isNew ? -1 : 1;
        }

        // 3️⃣ Fallback: popularity
        return b.popularity - a.popularity;
      });
  }, [models, query, category, sort]);

  // ---------------------------------------------------
  // RENDER
  // ---------------------------------------------------

  return (
    <section
      className="
        relative z-10
        w-full max-w-6xl mx-auto
        py-20 px-6
        bg-white
        text-[#1B3C53]
      "
    >
      <CatalogHeader
        query={query}
        setQuery={setQuery}
        view={view}
        setView={setView}
        onRequestModel={onRequestModel}
      />

      {loading ? (
        <p className="text-[#456882]">Loading models…</p>
      ) : view === "grid" ? (
        <ModelGrid models={filtered} />
      ) : (
        <ModelTable models={filtered} />
      )}

      {!loading && filtered.length === 0 && (
        <p className="text-center text-[#456882] mt-8">
          No models match your search.
        </p>
      )}
    </section>
  );
}
