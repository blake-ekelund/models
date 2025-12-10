"use client";

import {
  TrendingUp,
  Wallet,
  BarChart3,
  CalendarClock,
  Users,
} from "lucide-react";

export type ModelCategory =
  | "Revenue"
  | "Cash Flow"
  | "Profitability"
  | "Planning"
  | "Operational";

export type ModelStatus = "Available" | "Coming Soon";

export interface ModelCardProps {
  name: string;
  desc: string;
  status: ModelStatus;
  category: ModelCategory;
  isNew?: boolean;
  onStart?: () => void;
}

export default function ModelCard({
  name,
  desc,
  status,
  category,
  isNew = false,
  onStart,
}: ModelCardProps) {
  const Icons: Record<ModelCategory, React.ElementType> = {
    Revenue: TrendingUp,
    "Cash Flow": Wallet,
    Profitability: BarChart3,
    Planning: CalendarClock,
    Operational: Users,
  };

  const Icon = Icons[category];
  const isAvailable = status === "Available";

  return (
    <div
      className="
        bg-white border border-[#456882]/40 rounded-xl p-6 shadow-md 
        hover:shadow-lg transition flex flex-col h-full
      "
    >
      {/* HEADER */}
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-xl font-semibold text-[#1B3C53] leading-snug">
          {name}
        </h3>

        <div className="flex flex-col items-end gap-1">
          {isNew && (
            <span
              className="
                text-[#3BAFDA] text-[10px] font-semibold px-2 py-0.5 
                rounded-full bg-[#3BAFDA]/10
              "
            >
              New
            </span>
          )}

          {status === "Coming Soon" && (
            <span
              className="
                text-[#3BAFDA] text-[10px] font-semibold px-2 py-0.5 
                rounded-full bg-[#3BAFDA]/10
              "
            >
              Coming Soon
            </span>
          )}
        </div>
      </div>

      {/* DESCRIPTION */}
      <p className="text-[#456882] text-sm mb-4 leading-relaxed">{desc}</p>

      {/* CATEGORY CHIP */}
      <div className="mb-4">
        <span
          className="
            inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 
            rounded-full bg-[#3BAFDA]/10 text-[#3BAFDA]
          "
        >
          <Icon size={12} /> {category}
        </span>
      </div>

      {/* CTA */}
      <button
        disabled={!isAvailable}
        onClick={isAvailable ? onStart : undefined}
        className={`
          mt-auto w-full flex items-center justify-center gap-2 py-2 rounded-lg 
          text-sm font-semibold transition
          ${
            isAvailable
              ? "bg-[#3BAFDA] text-white hover:bg-[#3BAFDA]/90"
              : "bg-gray-200 text-gray-500 cursor-not-allowed"
          }
        `}
      >
        Start Modeling →
      </button>
    </div>
  );
}
