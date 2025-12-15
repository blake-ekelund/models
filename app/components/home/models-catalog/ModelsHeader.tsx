"use client";

import {
  Search,
  Grid,
  List,
  PlusCircle,
  ClipboardList,
} from "lucide-react";

interface CatalogHeaderProps {
  query: string;
  setQuery: (v: string) => void;
  view: "grid" | "list";
  setView: (v: "grid" | "list") => void;
  category: string;
  setCategory: (c: string) => void;
  sort: string;
  setSort: (s: string) => void;
}

export default function CatalogHeader({
  query,
  setQuery,
  view,
  setView,
}: CatalogHeaderProps) {
  return (
    <div className="w-full space-y-8 mb-12">
      {/* ROW 1 — TITLE */}
      <div>
        <h2 className="text-4xl font-bold text-[#1B3C53]">Model Library</h2>
        <p className="text-[#456882] text-sm mt-2 max-w-6xl leading-relaxed">
          A growing collection of simple, powerful financial models for founders and small
          businesses. Browse revenue, cash flow, pricing, and FP&A tools. We publish new models
          every week based on community feedback.
        </p>
      </div>

      {/* ROW 2 — ACTIONS + SEARCH */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        {/* LEFT — ACTIONS */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Submit Request */}
          <button
            onClick={() => (window.location.href = "/requests")}
            className="
              flex items-center gap-2 px-4 py-2 rounded-lg
              text-sm font-medium
              bg-[#234C6A] text-white
              hover:bg-[#456882]
              transition shadow-sm
            "
          >
            <PlusCircle size={16} />
            Submit a Model Request
          </button>

          {/* View Requests */}
          <button
            onClick={() => (window.location.href = "/#requests")}
            className="
              flex items-center gap-2 px-4 py-2 rounded-lg
              text-sm font-medium
              bg-white text-[#1B3C53]
              border border-[#456882]/30
              hover:bg-[#1B3C53]/5
              transition shadow-sm
            "
          >
            <ClipboardList size={16} />
            View Current Requests
          </button>
        </div>

        {/* RIGHT — SEARCH + VIEW TOGGLE */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          {/* SEARCH */}
          <div className="relative w-full md:w-72">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#456882]/60"
            />
            <input
              type="text"
              placeholder="Search models…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="
                w-full bg-white rounded-lg
                pl-10 pr-4 py-2 text-sm
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
              onClick={() => setView("grid")}
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
              onClick={() => setView("list")}
              className={`
                p-2 rounded-md transition
                ${
                  view === "list"
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
