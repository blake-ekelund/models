"use client";

import { ArrowUp, ArrowDown } from "lucide-react";

interface RowItem {
  title: string;
  description: string;
  votes: number;
}

interface RowProps {
  item: RowItem;
  globalIndex: number;
  vote: (index: number, delta: number) => void;
}

export default function PipelineRow({ item, globalIndex, vote }: RowProps) {
  return (
    <>
      {/* MODEL TITLE */}
      <td className="py-4 px-4 font-medium text-[#1B3C53]">
        {item.title}
      </td>

      {/* DESCRIPTION */}
      <td className="py-4 px-4 text-sm text-[#4A6A83] leading-snug max-w-lg">
        {item.description}
      </td>

      {/* VOTES + CONTROLS */}
      <td className="py-4 px-1.5">
        <div className="flex items-center justify-end gap-3">

          {/* Vote count pill */}
          <span
            className="
              text-xs font-semibold
              px-1.5 py-1
              rounded-full
              bg-[#3BAFDA]/10
              text-[#1B3C53]
            "
          >
            {item.votes} votes
          </span>

          {/* Controls (inline, minimal, like ModelRow action button) */}
          <div className="flex items-center gap-1">

            <button
              onClick={() => vote(globalIndex, +1)}
              className="
                p-1.5 rounded-md
                text-[#3BAFDA]
                hover:text-[#1B3C53]
                hover:bg-gray-100
                transition
              "
            >
              <ArrowUp size={15} />
            </button>

            <button
              onClick={() => vote(globalIndex, -1)}
              className="
                p-1.5 rounded-md
                text-[#3BAFDA]
                hover:text-[#1B3C53]
                hover:bg-gray-100
                transition
              "
            >
              <ArrowDown size={15} />
            </button>

          </div>
        </div>
      </td>
    </>
  );
}
