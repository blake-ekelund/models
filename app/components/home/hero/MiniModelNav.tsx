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
                    ? "bg-[#3BAFDA]/20 border border-[#3BAFDA]/50 text-[#E3E3E3]"
                    : "text-[#E3E3E3]/60 hover:text-[#E3E3E3]"
                }
              `}
            >
              {model}
            </button>
          );
        })}
      </div>

      {/* RIGHT ACTION BUTTONS */}
      <div className="flex items-center gap-2">

        {/* SETTINGS BUTTON */}
        <button
          onClick={onSettings}
          className="
            p-2 rounded-full border border-[#456882]/50 
            hover:bg-[#456882]/40 transition
            w-9 h-9 flex items-center justify-center
          "
          aria-label="Model settings"
        >
          <Settings size={18} className="text-[#E3E3E3]" />
        </button>

      </div>
    </div>
  );
}
