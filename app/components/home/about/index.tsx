"use client";

import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <div className="bg-white text-[#1B3C53] py-24">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-6xl mx-auto px-6"
      >
        {/* HEADER */}
        <div className="max-w-3xl mb-12">
          <h1 className="text-4xl font-bold mb-4">
            Built by founders. Designed for clarity.
          </h1>
          <p className="text-[#456882] text-lg">
            Synario exists because spreadsheets break down exactly when decisions
            start to matter.
          </p>
        </div>

        {/* FOUNDER NOTE */}
        <div className="max-w-3xl space-y-6 text-sm text-[#456882]">
          <div className="text-xs uppercase tracking-wide text-[#456882]/70">
            A note from our founder
          </div>

          <p>
            I’ve had to explain numbers to boards, investors, and myself — often
            using fragile spreadsheets held together by assumptions no one
            remembered making.
          </p>

          <p>
            Synario is an attempt to fix that. Every model is explicit about its
            assumptions, updates in real time, and is designed to support
            decision-making instead of vanity metrics.
          </p>

          <p>
            There’s no sales team, no growth hacks, and no penalty for being
            small. If you stop using Synario, we automatically cancel your
            subscription. Your data is archived for a full year in case you come
            back.
          </p>

          <p>
            Questions, feedback, or skepticism are welcome. We read every email.
          </p>

          <p className="font-medium text-[#1B3C53]">
            blake@synario.io
          </p>
        </div>
      </motion.div>
    </div>
  );
}
