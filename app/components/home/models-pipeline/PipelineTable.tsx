"use client";

import { motion } from "framer-motion";
import PipelineRow from "./PipelineRow";

interface PipelineItem {
  id: string;
  name: string;
  description: string;
  vote_count: number;
}

interface Props {
  items: PipelineItem[];
  page: number;
  pageSize: number;
}

export default function PipelineTable({
  items,
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="
        w-full overflow-hidden rounded-xl
        bg-white
        border border-[#456882]/30
        shadow-sm
      "
    >
      <table className="w-full border-collapse bg-white">
        {/* HEADER */}
        <thead
          className="
            bg-[#E3E3E3]
            text-[#1B3C53]
            border-b border-[#456882]/30
          "
        >
          <tr className="text-left text-sm font-semibold">
            <th className="py-3 px-4">Model</th>
            <th className="py-3 px-4">Description</th>
            <th className="py-3 px-4 text-right w-40">Votes</th>
          </tr>
        </thead>

        {/* BODY */}
        <tbody>
          {items.map((item, index) => (
            <motion.tr
              key={item.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.18, delay: index * 0.02 }}
              className="
                border-b border-[#456882]/20
                hover:bg-[#1B3C53]/5
                transition-colors
              "
            >
              <PipelineRow item={item} />
            </motion.tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
}
