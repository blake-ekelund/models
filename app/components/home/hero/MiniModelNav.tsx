"use client";

import { Settings } from "lucide-react";

interface MiniModelNavProps {
  models: string[];
  activeModel: string;
  onChange: (model: string) => void;
  onSettings?: () => void;
  onVideo?: () => void;
}

export default function MiniModelNav({
  models,
  activeModel,
  onChange,
  onSettings,
}: MiniModelNavProps) {
  return (
    <div className="flex items-center justify-between mb-4">
      {/* MODEL TABS */}
      <div className="flex gap-2 flex-wrap">
        {models.map((model) => {
          const isActive = activeModel === model;

          return (
            <button
              key={model}
              onClick={() => onChange(model)}
              className={`
                px-3 py-1.5 rounded-lg text-sm font-medium transition
                ${
                  isActive
                    ? "bg-[#1B3C53]/10 text-[#1B3C53] border border-[#456882]/40"
                    : "text-[#1B3C53]/60 hover:text-[#1B3C53]"
                }
              `}
            >
              {model}
            </button>
          );
        })}
      </div>

      {/* RIGHT ACTIONS */}
      <div className="flex items-center gap-2">
        {onSettings && (
          <button
            onClick={onSettings}
            className="
              w-9 h-9
              flex items-center justify-center
              rounded-full
              border border-[#456882]/40
              text-[#1B3C53]
              hover:bg-[#1B3C53]/5
              transition
            "
            aria-label="Model settings"
          >
            <Settings size={18} />
          </button>
        )}
      </div>
    </div>
  );
}
