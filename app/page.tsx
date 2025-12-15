"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";

import Hero from "./components/home/hero";
import ModelsCatalog from "./components/home/models-catalog";
import ModelsPipeline from "./components/home/models-pipeline";
import Pricing from "./components/home/pricing";
import About from "./components/home/about";

import Footer from "./components/Footer";
import Modal from "./components/ui/Modal";
import SubmitIdeaForm from "./components/home/models-pipeline/SubmitIdeaForm";

export default function HomePage() {
  const [showIdeaModal, setShowIdeaModal] = useState(false);

  // Ref to trigger pipeline reload
  const reloadPipelineRef = useRef<null | (() => void)>(null);

  return (
    <>
      {/* MODAL */}
      <Modal open={showIdeaModal} onClose={() => setShowIdeaModal(false)}>
        <SubmitIdeaForm
          onCancel={() => setShowIdeaModal(false)}
          onSuccess={() => {
            setShowIdeaModal(false);
            reloadPipelineRef.current?.();
          }}
        />
      </Modal>

      {/* PAGE ROOT */}
      <div className="relative w-full min-h-screen bg-[#1B3C53] text-white pt-[72px]">
        {/* HERO */}
        <motion.div
          id="home"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full"
        >
          <Hero />
        </motion.div>

        {/* WHITE WORLD */}
        <div
          className="
            relative w-full
            bg-white text-[#1B3C53]
            rounded-t-[48px]
            -mt-32 pt-32
          "
        >
          {/* MODEL CATALOG */}
          <motion.section
            id="library"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="scroll-mt-[96px]"
          >
            <ModelsCatalog />
          </motion.section>

          {/* MODEL PIPELINE */}
          <motion.section
            id="requests"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="scroll-mt-[96px] mt-12"
          >
            <ModelsPipeline
              openModal={() => setShowIdeaModal(true)}
              registerReload={(fn) => {
                reloadPipelineRef.current = fn;
              }}
            />
          </motion.section>

          {/* PRICING */}
          <motion.section
            id="pricing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="scroll-mt-[96px] mt-12"
          >
            <Pricing />
          </motion.section>

          {/* FAQ (placeholder) */}
          <motion.section
            id="faq"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="scroll-mt-[96px] mt-16"
          />

          {/* ABOUT */}
          <motion.section
            id="about"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="scroll-mt-[96px] mt-16"
          >
            <About />
          </motion.section>

          {/* FOOTER */}
          <Footer />
        </div>
      </div>
    </>
  );
}
