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
  onRequestModel: () => void;
}

export default function CatalogHeader({
  query,
  setQuery,
  view,
  setView,
  onRequestModel,
}: CatalogHeaderProps) {
  return (
    <div className="w-full mb-14 space-y-10">
      {/* HERO-ADJACENT HEADER */}
      <div className="max-w-4xl">
        <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-[#456882]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#234C6A]" />
          Model Engine
        </span>

        <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-[#1B3C53] leading-tight">
          Pick a model.<br className="hidden sm:block" />
          Get answers in minutes.
        </h2>

        <p className="mt-3 text-sm text-[#456882] max-w-3xl leading-relaxed">
          Purpose-built financial models for revenue, cash flow, pricing, and
          planning. Designed to turn questions into decisions.
        </p>
      </div>

      {/* CONTROLS BAR */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        {/* LEFT — ACTIONS */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={onRequestModel}
            className="
              inline-flex items-center gap-2
              px-4 py-2 rounded-lg
              text-sm font-semibold
              bg-[#234C6A] text-white
              hover:bg-[#456882]
              transition shadow-sm
            "
          >
            <PlusCircle size={16} />
            Request a Model
          </button>

          <button
            onClick={() => (window.location.href = "/#requests")}
            className="
              inline-flex items-center gap-2
              px-4 py-2 rounded-lg
              text-sm font-medium
              bg-white text-[#1B3C53]
              border border-[#456882]/30
              hover:bg-[#1B3C53]/5
              transition shadow-sm
            "
          >
            <ClipboardList size={16} />
            View Requests
          </button>
        </div>

        {/* RIGHT — SEARCH + VIEW TOGGLE */}
        <div className="flex items-center gap-3 w-full md:w-auto">
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
