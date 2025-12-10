"use client";

import { motion } from "framer-motion";
import ModelRow from "./ModelRow";
import { ModelCardProps } from "./ModelCard";

interface ModelTableProps {
  models: ModelCardProps[];
}

export default function ModelTable({ models }: ModelTableProps) {
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
            <th className="py-3 px-4">Model Name</th>
            <th className="py-3 px-4">Category</th>
            <th className="py-3 px-4">Description</th>
            <th className="py-3 px-4">Status</th>
            <th className="py-3 px-4 text-center w-32">Action</th>
          </tr>
        </thead>

        {/* BODY */}
        <tbody>
          {models.map((model, index) => (
            <motion.tr
              key={model.name}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.18, delay: index * 0.02 }}
              className="
                border-b border-[#E1E5EB]
                hover:bg-[#F4F7FA]
                transition-colors
              "
            >
              <ModelRow {...model} />
            </motion.tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
}
