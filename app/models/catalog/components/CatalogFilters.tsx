"use client";

import clsx from "clsx";
import { Search, LayoutGrid, Table2 } from "lucide-react";
import { motion } from "framer-motion";

interface Props {
  query: string;
  setQuery: (v: string) => void;

  view: "grid" | "table";
  setView: (v: "grid" | "table") => void;

  categories: string[];
  activeCategory: string;
  setActiveCategory: (c: string) => void;
}

export default function CatalogFilters({
  query,
  setQuery,
  view,
  setView,
  categories,
  activeCategory,
  setActiveCategory,
}: Props) {
  return (
    <div className="space-y-4">
      {/* SEARCH + VIEW TOGGLE */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        {/* SEARCH */}
        <div className="relative w-full sm:max-w-md">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search models"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className={clsx(
              "w-full rounded-lg border border-gray-200 bg-white",
              "pl-9 pr-3 py-2 text-sm",
              "placeholder:text-gray-400",
              "focus:outline-none focus:ring-2 focus:ring-[#00338d]/20 focus:border-[#00338d]"
            )}
          />
        </div>

        {/* VIEW TOGGLE */}
        <div className="relative inline-flex rounded-lg border border-gray-200 bg-gray-50 p-1">
          {/* Animated thumb */}
          <motion.div
            layout
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="absolute inset-y-1 w-1/2 rounded-md bg-white shadow-sm"
            style={{
              left: view === "grid" ? "0.25rem" : "50%",
            }}
          />

          <ToggleButton
            active={view === "grid"}
            onClick={() => setView("grid")}
            label="Grid"
            icon={<LayoutGrid size={14} />}
          />

          <ToggleButton
            active={view === "table"}
            onClick={() => setView("table")}
            label="Table"
            icon={<Table2 size={14} />}
          />
        </div>
      </div>

      {/* CATEGORY PILLS */}
      <div className="flex flex-wrap gap-2">
        {["All", ...categories].map((cat) => {
          const active =
            activeCategory === cat ||
            (cat === "All" && activeCategory === "");

          return (
            <button
              key={cat}
              onClick={() =>
                setActiveCategory(cat === "All" ? "" : cat)
              }
              className={clsx(
                "px-3 py-1.5 rounded-full text-sm transition",
                active
                  ? "bg-[#00338d]/10 text-[#00338d]"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              )}
            >
              {cat}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ---------------------------------------------
   Toggle button
--------------------------------------------- */

function ToggleButton({
  active,
  onClick,
  label,
  icon,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  icon: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={clsx(
        "relative z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm transition",
        active
          ? "text-[#1B3C53]"
          : "text-gray-500 hover:text-[#1B3C53]"
      )}
    >
      {icon}
      {label}
    </button>
  );
}
