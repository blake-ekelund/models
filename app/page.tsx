"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";

import Hero from "./components/home/hero";
import ModelsCatalog from "./components/home/models-catalog";
import ModelsPipeline from "./components/home/models-pipeline";
import Pricing from "./components/home/pricing";
import About from "./components/home/about";
import Contact from "./components/home/contact";

import Modal from "./components/ui/Modal";
import SubmitIdeaForm from "./components/home/models-pipeline/SubmitIdeaForm";

export default function HomePage() {
  const [showIdeaModal, setShowIdeaModal] = useState(false);
  const [submitIdea, setSubmitIdea] = useState<
    null | ((title: string, description: string) => void)
  >(null);

  const handleRegisterSubmit = useCallback(
    (fn: (title: string, description: string) => void) => {
      setSubmitIdea(() => fn);
    },
    []
  );

  return (
    <>
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
      <div className="relative z-0 w-full min-h-screen bg-[#1B3C53] text-white flex flex-col items-center">
        
        {/* HERO */}
        <motion.div
          id="/#home"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full"
        >
          <Hero />
        </motion.div>

        {/* WHITE SECTIONS */}
        <div className="w-full text-[#1B3C53]">

          {/* MODEL CATALOG — #library */}
          <motion.div
            id="library"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="bg-white w-full mt-12"
          >
            <ModelsCatalog />
          </motion.div>

          {/* MODEL PIPELINE — #pipeline */}
          <motion.div
            id="pipeline"
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

          {/* PRICING — #pricing */}
          <motion.div
            id="pricing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="w-full mt-12 mb-0"
          >
            <Pricing />
          </motion.div>

          {/* ABOUT — #about */}
          <motion.div
            id="about"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="w-full mt-12 mb-0"
          >
            <About />
          </motion.div>              
          
          {/* CONTACT — #contact */}
          <motion.div
            id="contact"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="w-full mt-12 mb-0"
          >
            <Contact />
          </motion.div>          

        </div>
      </div>
    </>
  );
}
