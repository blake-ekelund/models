"use client";

import {
  TrendingUp,
  Wallet,
  BarChart3,
  CalendarClock,
  Users,
} from "lucide-react";

import { ModelCardProps, ModelCategory } from "./ModelCard";

interface ModelRowProps extends ModelCardProps {}

export default function ModelRow({
  name,
  desc,
  status,
  category,
  onStart,
}: ModelRowProps) {
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
    <>
      {/* MODEL NAME */}
      <td className="py-3 px-4 font-medium text-sm text-[#1B3C53]">
        {name}
      </td>

      {/* CATEGORY — no wrap */}
      <td className="py-3 px-4 whitespace-nowrap">
        <span
          className="
            inline-flex items-center gap-1
            text-xs font-semibold
            px-2 py-1 rounded-full
            bg-[#456882]/10 text-[#456882]
          "
        >
          <Icon size={12} /> {category}
        </span>
      </td>

      {/* DESCRIPTION */}
      <td className="py-3 px-4 text-sm text-[#456882]">
        {desc}
      </td>

      {/* STATUS — no wrap */}
      <td className="py-3 px-4 whitespace-nowrap">
        <span
          className="
            text-xs font-semibold px-2 py-1 rounded-full
            bg-[#456882]/10 text-[#456882]
          "
        >
          {isAvailable ? "Available" : "Coming Soon"}
        </span>
      </td>

      {/* ACTION */}
      <td className="py-3 px-4 text-center whitespace-nowrap">
        <button
          onClick={isAvailable ? onStart : undefined}
          disabled={!isAvailable}
          className={`
            inline-flex items-center justify-center
            text-sm font-semibold
            transition
            ${
              isAvailable
                ? "text-[#456882] hover:text-[#1B3C53]"
                : "text-[#456882]/40 cursor-not-allowed"
            }
          `}
        >
          Start →
        </button>
      </td>
    </>
  );
}
