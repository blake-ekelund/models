"use client";

import { useState } from "react";

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
  popularity: number;
  premium: boolean;
}

// ---------------------------------------------------
// MAIN COMPONENT
// ---------------------------------------------------

export default function ModelsCatalog() {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [query, setQuery] = useState<string>("");
  const [category, setCategory] = useState<string>("All");
  const [sort, setSort] = useState<string>("Popular");

  // ---------------------------------------------------
  // MODEL DATA (strictly typed)
  // ---------------------------------------------------

  const models: CatalogModel[] = [
    {
      name: "Revenue Model (SaaS)",
      desc: "Forecast MRR, ARR, churn, CAC, and subscriber growth.",
      status: "Available",
      category: "Revenue",
      popularity: 95,
      premium: false,
      isNew: false,
    },
    {
      name: "Cash Flow Model",
      desc: "Project 12 months of ending cash, runway, and burn.",
      status: "Available",
      category: "Cash Flow",
      popularity: 90,
      premium: true,
      isNew: false,
    },
    {
      name: "Pricing Model",
      desc: "Test pricing tiers, elasticity, and revenue impact.",
      status: "Coming Soon",
      category: "Revenue",
      popularity: 80,
      premium: false,
      isNew: false,
    },
  ];

  // ---------------------------------------------------
  // FILTERING + SORTING
  // ---------------------------------------------------

  const matchesFilters = (m: CatalogModel) => {
    const matchesQuery = m.name.toLowerCase().includes(query.toLowerCase());
    const matchesCategory = category === "All" || m.category === category;
    return matchesQuery && matchesCategory;
  };

  const sortedModels = [...models].sort((a, b) => {
    switch (sort) {
      case "Popular":
        return b.popularity - a.popularity;
      case "New":
        return Number(b.isNew ?? 0) - Number(a.isNew ?? 0);
      case "Free":
        return Number(a.premium) - Number(b.premium);
      case "Premium":
        return Number(b.premium) - Number(a.premium);
      default:
        return 0;
    }
  });

  const filtered = sortedModels.filter(matchesFilters);

  // ---------------------------------------------------
  // RENDER
  // ---------------------------------------------------

  return (
    <section className="w-full max-w-6xl mx-auto py-20 px-6 bg-white text-[#1B3C53]">

      {/* HEADER + FILTER BAR */}
      <CatalogHeader
        query={query}
        setQuery={setQuery}
        view={view}
        setView={setView}
        category={category}
        setCategory={setCategory}
        sort={sort}
        setSort={setSort}
      />

      {/* GRID OR TABLE */}
      {view === "grid" ? (
        <ModelGrid models={filtered} />
      ) : (
        <ModelTable models={filtered} />
      )}

      {/* EMPTY STATE */}
      {filtered.length === 0 && (
        <p className="text-center text-[#456882] mt-8">
          No models match your search.
        </p>
      )}
    </section>
  );
}
