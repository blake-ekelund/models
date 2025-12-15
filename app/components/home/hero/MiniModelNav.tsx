"use client";

import { Download, Settings, RefreshCw } from "lucide-react";

export type ModelKey = "Revenue Model" | "Cash Flow Model" | "Explore More";

interface MiniModelNavProps {
  models: ModelKey[];
  activeModel: ModelKey;
  onChange: (model: ModelKey) => void;

  onExport?: (() => void) | null;
  onSettings?: () => void;
  isExporting?: boolean;
}


function IconAction({
  onClick,
  label,
  tooltip,
  children,
  disabled,
}: {
  onClick: () => void;
  label: string;
  tooltip: string;
  children: React.ReactNode;
  disabled?: boolean;
}) {
  return (
    <div className="relative group">
      <button
        onClick={onClick}
        disabled={disabled}
        aria-label={label}
        className={`
          w-9 h-9 flex items-center justify-center
          rounded-full border border-[#456882]/40
          text-[#1B3C53]
          transition
          focus:outline-none focus:ring-2 focus:ring-[#456882]/40
          ${
            disabled
              ? "opacity-60 cursor-wait"
              : "hover:bg-[#1B3C53]/5"
          }
        `}
      >
        {children}
      </button>

      {/* Tooltip (hover only, hidden while disabled) */}
      {!disabled && (
        <div
          className="
            absolute right-0 top-11
            opacity-0 group-hover:opacity-100
            pointer-events-none
            transition
          "
        >
          <div
            className="
              bg-[#1B3C53]
              text-white text-xs
              px-3 py-1.5
              rounded-lg shadow whitespace-nowrap
            "
          >
            {tooltip}
          </div>
        </div>
      )}
    </div>
  );
}

export default function MiniModelNav({
  models,
  activeModel,
  onChange,
  onExport,
  onSettings,
  isExporting = false,
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
                focus:outline-none focus:ring-2 focus:ring-[#456882]/40
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
        {onExport && (
        <IconAction
          onClick={onExport ?? (() => {})}
          disabled={!onExport || isExporting}
          label="Export to Excel"
          tooltip={
            !onExport
              ? "Preparing export…"
              : isExporting
              ? "Preparing Excel…"
              : "Export to Excel"
          }
        >
          {isExporting ? (
            <RefreshCw size={18} className="animate-spin" />
          ) : (
            <Download size={18} />
          )}
        </IconAction>

        )}

        {onSettings && (
          <IconAction
            onClick={onSettings}
            label="Model settings"
            tooltip="Customize branding & units"
          >
            <Settings size={18} />
          </IconAction>
        )}
      </div>
    </div>
  );
}
