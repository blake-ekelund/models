"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";

import Hero from "./components/home/hero";
import ModelsCatalog from "./components/home/models-catalog";
import ModelsPipeline from "./components/home/models-pipeline";
import Pricing from "./components/home/pricing";

import Modal from "./components/ui/Modal";
import SubmitIdeaForm from "./components/home/models-pipeline/SubmitIdeaForm";

export default function HomePage() {
  const [showIdeaModal, setShowIdeaModal] = useState(false);
  const [submitIdea, setSubmitIdea] = useState<
    null | ((title: string, description: string) => void)
  >(null);

  console.log("Modal state:", showIdeaModal);

  // Prevent infinite loops by stabilizing this function
  const handleRegisterSubmit = useCallback(
    (fn: (title: string, description: string) => void) => {
      setSubmitIdea(() => fn);
    },
    []
  );

  return (
    <>
      {/* MODAL LIVES AT TOP LEVEL — THIS IS REQUIRED */}
      <Modal open={showIdeaModal} onClose={() => setShowIdeaModal(false)}>
        {submitIdea ? (
          <SubmitIdeaForm
            onSubmit={(title, description) => {
              submitIdea(title, description);
              setShowIdeaModal(false);
            }}
            onCancel={() => setShowIdeaModal(false)}
          />
        ) : (
          <div className="text-black p-20">Loading…</div>
        )}
      </Modal>

      {/* PAGE CONTENT */}
      <div
        className="
          relative z-0
          w-full min-h-screen 
          bg-[#1B3C53] text-white 
          flex flex-col items-center 
        "
      >
        {/* HERO — NO TRANSLATE-Y */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full"
        >
          <Hero />
        </motion.div>

        {/* WHITE SECTION */}
        <div className="w-full text-[#1B3C53]">

          {/* MODEL CATALOG */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="bg-white w-full mt-12"
          >
            <ModelsCatalog />
          </motion.div>

          {/* MODEL PIPELINE */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="w-full mt-0 mb-12"
          >
            <ModelsPipeline
              openModal={() => setShowIdeaModal(true)}
              registerSubmit={handleRegisterSubmit}
            />
          </motion.div>

          {/* PRICING */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="w-full mt-12 mb-0"
          >
            <Pricing />
          </motion.div>

        </div>
      </div>
    </>
  );
}
