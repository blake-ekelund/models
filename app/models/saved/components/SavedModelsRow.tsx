"use client";

import clsx from "clsx";
import { Download, Trash2, Save } from "lucide-react";
import type { ModelInstance } from "@/app/models/context/ModelContext";
import ActionIcon from "./ActionIcon";

interface Props {
  model: ModelInstance;
  showBorder: boolean;
  onOpen: (model: ModelInstance) => void;
  onSave: (id: string) => void;
  onExport: (model: ModelInstance) => void;
  onDelete: (id: string, name: string) => void;
}

function formatRelativeDate(date: Date) {
  const diffMs = Date.now() - date.getTime();
  const diffMin = Math.floor(diffMs / 60000);

  if (diffMin < 1) return "Just now";
  if (diffMin < 60) return `${diffMin} min ago`;

  const diffHr = Math.floor(diffMin / 60);
  if (diffHr < 24) return `${diffHr} hr ago`;

  const diffDay = Math.floor(diffHr / 24);
  return `${diffDay} day${diffDay > 1 ? "s" : ""} ago`;
}

export default function SavedModelsRow({
  model,
  showBorder,
  onOpen,
  onSave,
  onExport,
  onDelete,
}: Props) {
  return (
    <tr
      className={clsx(
        "group transition-colors hover:bg-[#F7F9FB] cursor-pointer",
        showBorder && "border-t border-[#E3E3E3]"
      )}
      onClick={() => onOpen(model)}
    >
      {/* NAME */}
      <td className="px-4 py-2 font-medium text-[#1B3C53]">
        {model.name}
      </td>

      {/* TYPE */}
      <td className="px-4 py-2 text-[#456882]">
        {model.type}
      </td>

      {/* STATUS */}
      <td className="px-4 py-2">
        <span
          className={clsx(
            "rounded-full px-2 py-0.5 text-xs font-medium",
            model.status === "Saved"
              ? "bg-emerald-50 text-emerald-700"
              : "bg-amber-50 text-amber-700"
          )}
        >
          {model.status}
        </span>
      </td>

      {/* LAST EDITED */}
      <td className="px-4 py-2 text-right text-[#456882] text-sm">
        {formatRelativeDate(model.lastEdited)}
      </td>

      {/* ACTIONS */}
      <td
        className="px-4 py-2 text-right"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="inline-flex items-center gap-1 opacity-0 group-hover:opacity-100 transition">
          {model.status === "Draft" && (
            <ActionIcon
              title="Save Model"
              onClick={() => onSave(model.id)}
            >
              <Save size={16} />
            </ActionIcon>
          )}

          <ActionIcon
            title="Download to Excel"
            onClick={() => onExport(model)}
          >
            <Download size={16} />
          </ActionIcon>

          <ActionIcon
            title="Delete permanently"
            danger
            onClick={() => onDelete(model.id, model.name)}
          >
            <Trash2 size={16} />
          </ActionIcon>
        </div>
      </td>
    </tr>
  );
}
