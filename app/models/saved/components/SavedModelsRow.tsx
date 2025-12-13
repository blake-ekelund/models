"use client";

import clsx from "clsx";
import { Download, Share2, Trash2, Save } from "lucide-react";
import EditableName from "./EditableName";
import ActionIcon from "./ActionIcon";

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
  onRename,
  onSave,
  onExport,
  onDelete,
}: any) {
  return (
    <tr
      className={clsx(
        "group transition hover:bg-gray-50",
        showBorder && "border-t border-gray-100"
      )}
    >
      <td className="px-4 py-2 font-medium text-[#1B3C53]">
        <EditableName
          name={model.name}
          onSave={(n) => onRename(model.id, n)}
          onOpen={() => onOpen(model)}
        />
      </td>

      <td
        className="px-4 py-2 text-[#456882] cursor-pointer"
        onClick={() => onOpen(model)}
      >
        {model.type}
      </td>

      <td className="px-4 py-2">
        <span
          className={clsx(
            "rounded-full px-2 py-0.5 text-xs font-medium",
            model.status === "Saved"
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
          )}
        >
          {model.status}
        </span>
      </td>

      <td className="px-4 py-2 text-right text-gray-500">
        {formatRelativeDate(model.lastEdited)}
      </td>

      <td className="px-4 py-2 text-right">
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
            onClick={() => onExport(model.name)}
          >
            <Download size={16} />
          </ActionIcon>

          {model.status === "Saved" && (
            <ActionIcon title="Share">
              <Share2 size={16} />
            </ActionIcon>
          )}

          <ActionIcon
            title="Delete permanently"
            danger
            onClick={() =>
              onDelete(model.id, model.name)
            }
          >
            <Trash2 size={16} />
          </ActionIcon>
        </div>
      </td>
    </tr>
  );
}
