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
  isNew = false,
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
      <td className="py-3 px-4 font-medium text-[#1B3C53]">
        <div className="flex items-center gap-2">
          {name}
          {isNew && (
            <span className="text-[#3BAFDA] text-[10px] font-semibold px-2 py-0.5 bg-[#3BAFDA]/10 rounded-full">
              New
            </span>
          )}
        </div>
      </td>

      {/* CATEGORY */}
      <td className="py-3 px-4">
        <span
          className="
            inline-flex items-center gap-1 text-xs font-semibold 
            px-2 py-1 bg-[#3BAFDA]/10 text-[#3BAFDA] rounded-full
          "
        >
          <Icon size={12} /> {category}
        </span>
      </td>

      {/* DESCRIPTION */}
      <td className="py-3 px-4 text-sm text-[#456882]">{desc}</td>

      {/* STATUS */}
      <td className="py-3 px-4">
        {isAvailable ? (
          <span className="text-blue-600 text-xs font-semibold px-2 py-1 bg-blue-100 rounded-full">
            Available
          </span>
        ) : (
          <span className="text-[#3BAFDA] text-xs font-semibold px-2 py-1 bg-[#3BAFDA]/10 rounded-full">
            Coming Soon
          </span>
        )}
      </td>

      {/* ACTION BUTTON — CENTERED */}
      <td className="py-3 px-4 text-center">
        <button
          onClick={isAvailable ? onStart : undefined}
          disabled={!isAvailable}
          className={`
            inline-flex items-center justify-center gap-1 
            text-sm font-semibold transition whitespace-nowrap
            ${
              isAvailable
                ? "text-[#3BAFDA] hover:text-[#1B3C53]"
                : "text-gray-400 cursor-not-allowed"
            }
          `}
        >
          Start →
        </button>
      </td>
    </>
  );
}
