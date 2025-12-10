"use client";

import { motion } from "framer-motion";
import PipelineRow from "./PipelineRow";

interface PipelineItem {
  title: string;
  description: string;
  votes: number;
}

interface Props {
  items: PipelineItem[];
  fullList: PipelineItem[];
  vote: (index: number, delta: number) => void;
  page: number;
  pageSize: number;
}

export default function PipelineTable({ items, vote, page, pageSize }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="
        w-full overflow-hidden rounded-xl 
        border border-[#E1E5EB] shadow-sm bg-white
      "
    >
      <table className="w-full border-collapse bg-white">

        {/* HEADER */}
        <thead
          className="
            bg-[#F8FAFC] 
            text-[#1B3C53] 
            border-b border-[#E1E5EB]
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
          {items.map((item, index) => {
            const globalIndex = (page - 1) * pageSize + index;

            return (
              <motion.tr
                key={item.title}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.18, delay: index * 0.02 }}
                className="
                  border-b border-[#E1E5EB]
                  hover:bg-[#F4F7FA]
                  transition-colors
                "
              >
                <PipelineRow
                  item={item}
                  globalIndex={globalIndex}
                  vote={vote}
                />
              </motion.tr>
            );
          })}
        </tbody>

      </table>
    </motion.div>
  );
}
