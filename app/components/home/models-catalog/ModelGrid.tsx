"use client";

import { motion } from "framer-motion";
import ModelCard, { ModelCardProps } from "./ModelCard";

interface ModelGridProps {
  models: ModelCardProps[];
}

export default function ModelGrid({ models }: ModelGridProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="grid md:grid-cols-3 gap-6"
    >
      {models.map((model) => (
        <motion.div
          key={model.name}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <ModelCard
            name={model.name}
            desc={model.desc}
            status={model.status}
            category={model.category}
            isNew={model.isNew}
            onStart={model.onStart}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}
