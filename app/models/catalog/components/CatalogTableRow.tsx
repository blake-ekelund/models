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
  return (
    <tr
      className={clsx(
        "group transition",
        "hover:bg-gray-50"
      )}
    >
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
            model.status === "Available"
              ? "bg-green-100 text-green-700"
              : "bg-gray-200 text-gray-600"
          )}
        >
          {model.status}
        </span>
      </td>

      {/* ACTION */}
      <td className="px-6 py-4 text-right align-top">
        {model.status === "Available" ? (
          <button
            onClick={() => onSelect(model)}
            className="text-sm font-medium text-[#00338d] hover:underline"
          >
            Select
          </button>
        ) : (
          <span className="text-sm text-gray-400">
            —
          </span>
        )}
      </td>
    </tr>
  );
}
