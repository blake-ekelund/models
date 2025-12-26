"use client";

import { motion } from "framer-motion";
import ModelCard, { ModelCardProps } from "./ModelCard";

interface ModelGridProps {
  models: ModelCardProps[];
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
};

export default function ModelGrid({ models }: ModelGridProps) {
  return (
    <motion.div
      key={models.map((m) => m.name).join("|")}
      variants={containerVariants}
      initial="hidden"
      animate="show"
      exit="hidden"
      className="
        grid gap-6
        grid-cols-1
        sm:grid-cols-2
        lg:grid-cols-3
      "
    >
      {models.map((model) => (
        <motion.div
          key={model.name}
          variants={itemVariants}
          transition={{ duration: 0.25, ease: "easeOut" }}
        >
          <ModelCard {...model} />
        </motion.div>
      ))}
    </motion.div>
  );
}

