"use client";

import clsx from "clsx";
import { Search, LayoutGrid, Table2 } from "lucide-react";
import { motion } from "framer-motion";

interface Props {
  query: string;
  setQuery: (v: string) => void;

  view: "table" | "grid";
  setView: (v: "table" | "grid") => void;

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
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#456882]"
          />
          <input
            type="text"
            placeholder="Search models"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className={clsx(
              "w-full rounded-lg bg-white border border-[#E3E3E3]",
              "pl-9 pr-3 py-2 text-sm",
              "placeholder:text-[#456882]/70",
              "focus:outline-none focus:ring-2 focus:ring-[#1B3C53]/30 focus:border-[#1B3C53]"
            )}
          />
        </div>

        {/* VIEW TOGGLE */}
        <div className="relative inline-flex rounded-xl bg-[#F7F9FB] p-1">
          {/* Animated thumb */}
          <motion.div
            layout
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="absolute inset-y-1 w-1/2 rounded-lg bg-white shadow-sm border border-[#E3E3E3]"
            style={{
              left: view === "table" ? "0.25rem" : "50%",
            }}
          />

          <ToggleButton
            active={view === "table"}
            onClick={() => setView("table")}
            label="Table"
            icon={<Table2 size={14} />}
          />

          <ToggleButton
            active={view === "grid"}
            onClick={() => setView("grid")}
            label="Grid"
            icon={<LayoutGrid size={14} />}
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
                "px-3 py-1.5 rounded-full text-sm font-medium transition",
                active
                  ? "bg-[#1B3C53]/10 text-[#1B3C53]"
                  : "bg-[#F7F9FB] text-[#456882] hover:bg-[#E3E3E3]"
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
          : "text-[#456882] hover:text-[#1B3C53]"
      )}
    >
      {icon}
      {label}
    </button>
  );
}
