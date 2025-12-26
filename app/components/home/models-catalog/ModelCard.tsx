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

  const showNew = isAvailable && isNew;
  const showComingSoon = !isAvailable;

  return (
    <div
      className={`
        relative
        bg-white
        border border-[#456882]/30
        rounded-xl
        p-6
        flex flex-col h-full
        shadow-sm
        transition-all duration-200
        hover:shadow-lg
        hover:-translate-y-0.5
        hover:border-[#234C6A]/60
      `}
    >
      {/* HEADER */}
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-xl font-semibold text-[#1B3C53] leading-snug">
          {name}
        </h3>

        {showNew && (
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#1B3C53]/10 text-[#1B3C53]">
            New
          </span>
        )}

        {showComingSoon && (
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#456882]/10 text-[#456882]">
            Coming Soon
          </span>
        )}
      </div>

      {/* DESCRIPTION */}
      <p className="text-[#456882] text-sm mb-4 leading-relaxed">
        {desc}
      </p>

      {/* CATEGORY */}
      <div className="mb-4">
        <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full bg-[#456882]/10 text-[#456882]">
          <Icon size={12} /> {category}
        </span>
      </div>

      {/* CTA */}
      <button
        disabled={!isAvailable}
        onClick={isAvailable ? onStart : undefined}
        className={`
          mt-auto w-full
          flex items-center justify-center
          py-2 rounded-lg
          text-sm font-semibold
          transition
          ${
            isAvailable
              ? "bg-[#234C6A] text-white hover:bg-[#456882]"
              : "bg-[#E3E3E3] text-[#456882] cursor-not-allowed"
          }
        `}
      >
        Start Modeling
      </button>
    </div>
  );
}
