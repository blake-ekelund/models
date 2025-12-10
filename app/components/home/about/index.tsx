"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  LineChart,
  Rocket,
  Blocks,
  ArrowRight,
  User,
} from "lucide-react";

export default function HowItWorksPage() {
  const [showFullStory, setShowFullStory] = useState(false);

  return (
    <div className="relative z-10 min-h-screen bg-white text-[#1B3C53] px-6 py-20 flex flex-col items-center">

      {/* HEADER */}
      <div className="max-w-6xl mb-20 w-full text-left">
        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-5xl font-bold mb-6"
        >
          About Us
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-lg text-gray-600 leading-relaxed max-w-6xl"
        >
          Finance doesn’t have to feel like guesswork.  
          Synario gives founders clarity in minutes — without wrestling a spreadsheet.
        </motion.p>
      </div>

      {/* FOUNDER STORY CARD */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="
          bg-white shadow-xl rounded-2xl p-10 mb-24 max-w-4xl border border-gray-200 relative z-10
        "
      >
        <div className="flex items-start gap-4 mb-4">
          <User size={32} className="text-emerald-500" />
          <h2 className="text-3xl font-semibold">Why I Built This</h2>
        </div>

        {/* COLLAPSIBLE STORY */}
        <p className="text-gray-700 leading-relaxed whitespace-pre-line text-lg">
          {!showFullStory ? (
            <>
              I'm a finance guy who has spent years inside early-stage companies — first 
              building models to keep my own teams aligned, then helping other founders 
              who needed clarity fast. I've been a VP of Finance, a fractional CFO, and a 
              builder of tools that small teams rely on when they don’t have the budget 
              for a full FP&A engine.

              {"\n\n"}Across hundreds of conversations, the pattern was always the same: 
              founders are brilliant at product, sales, and strategy — but stuck using 
              spreadsheets that were brittle, confusing, or impossible to maintain.

              {/* fade-out */}
              <span className="block h-10 bg-gradient-to-b from-white/0 to-white/90 -mt-6" />
            </>
          ) : (
            <>
              I'm a finance guy who has spent years inside early-stage companies — first 
              building models to keep my own teams aligned, then helping other founders 
              who needed clarity fast. I've been a VP of Finance, a fractional CFO, and a 
              builder of tools that small teams rely on when they don’t have the budget 
              for a full FP&A engine.

              {"\n\n"}Across hundreds of conversations, the pattern was always the same: 
              founders are brilliant at product, sales, and strategy — but stuck using 
              spreadsheets that were brittle, confusing, or impossible to maintain. 
              Not because they lacked skill, but because the tooling was never built for 
              the speed and uncertainty of real-world startup life.

              {"\n\n"}So I began creating simple, honest financial models that answered the 
              questions founders actually ask:
              {"\n"}• What happens if growth slows?
              {"\n"}• Can I afford this hire?
              {"\n"}• How long does my runway last?
              {"\n"}• What does churn really do to me?

              {"\n\n"}Those tools grew into a larger library. That library eventually became 
              Synario — a home for clear, trustworthy financial models that anyone can use 
              without a finance degree.

              {"\n\n"}My goal isn't to replace spreadsheets or accountants. It's to bridge the 
              massive gap between “idea in your head” and “real financial clarity.”  
              If I can help a founder make one smarter decision in 30 seconds, that’s a win.
            </>
          )}
        </p>

        {/* TOGGLE BUTTON */}
        <button
          onClick={() => setShowFullStory(!showFullStory)}
          className="mt-6 text-blue-600 font-medium hover:underline"
        >
          {showFullStory ? "Show Less" : "See Full Story"}
        </button>
      </motion.div>

      {/* HOW IT WORKS — MODELING PROCESS */}
      <motion.div
        initial={{ opacity: 0, y: 26 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.75 }}
        className="mb-24 max-w-5xl w-full relative z-10"
      >
        <h2 className="text-3xl font-semibold mb-8 flex items-center gap-2">
          <Blocks size={24} className="text-blue-600" />
          How It Works (In 3 Steps)
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {[ 
            {
              icon: Rocket,
              title: "Choose a Model",
              text: "Start with revenue, cash flow, runway, pricing, or one of the specialty tools built for founders.",
            },
            {
              icon: LineChart,
              title: "Adjust Your Assumptions",
              text: "Change growth, churn, CAC, hiring plans, timing, or customer behavior. Everything updates instantly.",
            },
            {
              icon: ArrowRight,
              title: "Compare Scenarios",
              text: "See how decisions ripple through cash, runway, profitability, and risk — no spreadsheet stress required.",
            },
          ].map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 * i, duration: 0.6 }}
              className="bg-white shadow-xl border border-gray-200 rounded-xl p-6"
            >
              <step.icon size={40} className="text-emerald-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{step.text}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* TIMELINE SECTION */}
      <motion.div
        initial={{ opacity: 0, y: 26 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-32 max-w-6xl w-full relative z-10"
      >
        <h2 className="text-3xl font-semibold mb-10 flex items-center gap-2">
          Synario Timeline
        </h2>

        <div className="relative w-full border-t-2 border-gray-200 pt-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

            {[
              {
                year: "2017",
                title: "Early FP&A Work",
                desc: "Supporting operators and seeing firsthand how startups make decisions under pressure.",
              },
              {
                year: "2019",
                title: "Building Excel Models",
                desc: "Developing simple financial tools for founders who needed clarity, not complexity.",
              },
              {
                year: "2022",
                title: "Fractional CFO + Tooling",
                desc: "Working with small businesses, automating reporting, and refining modeling frameworks.",
              },
              {
                year: "2025",
                title: "Synario Begins",
                desc: "Turning years of finance experience into an accessible library of financial models.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 * i, duration: 0.6 }}
                className="relative"
              >
                {/* TIMELINE DOT */}
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-6 h-6 bg-blue-600 rounded-full border-4 border-white shadow-lg" />

                {/* CARD */}
                <div className="bg-white border border-gray-200 rounded-xl shadow-md p-5">
                  <h3 className="text-xl font-semibold mb-1">{item.year}</h3>
                  <p className="text-[#1B3C53] font-medium mb-2">{item.title}</p>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}

          </div>
        </div>
      </motion.div>
    </div>
  );
}
