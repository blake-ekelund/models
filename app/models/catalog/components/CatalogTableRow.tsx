"use client";

import clsx from "clsx";
import { CatalogModel } from "../page";

interface Props {
  model: CatalogModel;
  onSelect: (model: CatalogModel) => void;
}

export default function CatalogTableRow({
  model,
  onSelect,
}: Props) {
  const isAvailable = model.status === "Available";

  return (
    <tr
      className={clsx(
        "group transition-colors",
        "hover:bg-[#F7F9FB]"
      )}
    >
      {/* MODEL */}
      <td className="px-6 py-4">
        {/* TITLE */}
        <div className="font-medium text-[#1B3C53]">
          {model.name}
        </div>

        {/* DESCRIPTION */}
        <div className="text-sm text-[#456882] mt-0.5">
          {model.description}
        </div>

        {/* INPUT PREVIEW */}
        {model.inputs_preview?.length ? (
          <div className="text-xs text-[#456882]/80 mt-1">
            Inputs: {model.inputs_preview.join(", ")}
          </div>
        ) : null}
      </td>

      {/* CATEGORY */}
      <td className="px-6 py-4 align-top">
        <span className="text-xs uppercase tracking-wide text-[#456882]/70">
          {model.category}
        </span>
      </td>

      {/* STATUS */}
      <td className="px-6 py-4 align-top">
        <span
          className={clsx(
            "inline-block rounded-full px-2 py-0.5 text-xs font-medium",
            isAvailable
              ? "bg-emerald-50 text-emerald-700"
              : "bg-[#E3E3E3] text-[#456882]"
          )}
        >
          {model.status}
        </span>
      </td>

      {/* ACTION */}
      <td className="px-6 py-4 text-right align-top">
        {isAvailable ? (
          <button
            onClick={() => onSelect(model)}
            className="
              text-sm font-medium
              text-[#1B3C53]
              hover:text-[#234C6A]
              transition
            "
          >
            Select
          </button>
        ) : (
          <span className="text-sm text-[#456882]/60">
            —
          </span>
        )}
      </td>
    </tr>
  );
}
