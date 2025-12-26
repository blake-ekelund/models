"use client";

import { Search, Grid, List } from "lucide-react";

interface BlogHeaderProps {
  view: "grid" | "table";
  setView: (v: "grid" | "table") => void;
  query: string;
  setQuery: (v: string) => void;
}

export default function BlogHeader({
  view,
  setView,
  query,
  setQuery,
}: BlogHeaderProps) {
  return (
    <div className="w-full mb-8">
      {/* TOP ROW — HERO + CONTROLS */}
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        {/* LEFT — HERO */}
        <div className="max-w-4xl">
          <h1 className="text-3xl sm:text-4xl font-bold text-[#1B3C53] leading-tight">
            Blog
          </h1>

          <p className="mt-3 text-sm text-[#456882] max-w-3xl leading-relaxed">
            Writing on financial modeling, pricing, and decision-making.
          </p>
        </div>

        {/* RIGHT — CONTROLS */}
        <div className="flex items-center gap-3 w-full lg:w-auto">
          {/* SEARCH */}
          <div className="relative w-full sm:w-72">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#456882]/60"
            />
            <input
              type="text"
              placeholder="Search posts…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="
                w-full bg-white rounded-lg
                pl-9 pr-4 py-2 text-sm
                text-[#1B3C53]
                border border-[#456882]/30
                placeholder:text-[#456882]/50
                focus:outline-none
                focus:ring-2 focus:ring-[#456882]/30
              "
            />
          </div>

          {/* VIEW TOGGLE */}
          <div
            className="
              flex items-center gap-1
              bg-white rounded-lg p-1
              border border-[#456882]/30
              shadow-sm
            "
          >
            <button
              type="button"
              onClick={() => setView("grid")}
              aria-pressed={view === "grid"}
              className={`
                p-2 rounded-md transition
                ${
                  view === "grid"
                    ? "bg-[#1B3C53]/10 text-[#1B3C53]"
                    : "text-[#456882] hover:bg-[#1B3C53]/5"
                }
              `}
            >
              <Grid size={16} />
            </button>

            <button
              type="button"
              onClick={() => setView("table")}
              aria-pressed={view === "table"}
              className={`
                p-2 rounded-md transition
                ${
                  view === "table"
                    ? "bg-[#1B3C53]/10 text-[#1B3C53]"
                    : "text-[#456882] hover:bg-[#1B3C53]/5"
                }
              `}
            >
              <List size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
