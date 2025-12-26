"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabaseClient";

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
  const [showAuthModal, setShowAuthModal] = useState(false);

  async function handleOpenSubmitIdea() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setShowAuthModal(true);
      return;
    }

    setShowIdeaModal(true);
  }

  return (
    <>
      {/* AUTH MODAL */}
      <Modal open={showAuthModal} onClose={() => setShowAuthModal(false)}>
        <div className="max-w-sm">
          <h3 className="text-xl font-semibold text-[#1B3C53] mb-2">
            Sign in to continue
          </h3>

          <p className="text-sm text-[#456882] mb-6">
            Create an account or sign in to submit model ideas and vote.
          </p>

          <div className="space-y-3">
            <a
              href="/auth/sign-in"
              className="
                block w-full text-center
                px-4 py-2.5 rounded-lg
                text-sm font-semibold
                bg-[#234C6A] text-white
                hover:bg-[#456882]
                transition
              "
            >
              Sign in
            </a>

            <a
              href="/auth/sign-up"
              className="
                block w-full text-center
                px-4 py-2.5 rounded-lg
                text-sm font-semibold
                border border-[#456882]/30
                text-[#1B3C53]
                hover:bg-[#1B3C53]/5
                transition
              "
            >
              Create an account
            </a>
          </div>
        </div>
      </Modal>

      {/* SUBMIT IDEA MODAL */}
      <Modal open={showIdeaModal} onClose={() => setShowIdeaModal(false)}>
        <SubmitIdeaForm
          onCancel={() => setShowIdeaModal(false)}
          onSuccess={() => setShowIdeaModal(false)}
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
          <ModelsCatalog onRequestModel={handleOpenSubmitIdea} />
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
              openModal={handleOpenSubmitIdea}
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

          <Footer />
        </div>
      </div>
    </>
  );
}
