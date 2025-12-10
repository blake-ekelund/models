"use client";

import { motion } from "framer-motion";
import {
  LineChart,
  Rocket,
  Blocks,
  Sparkles,
  ArrowRight,
  CheckCircle,
  User,
} from "lucide-react";
import Link from "next/link";

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-white text-[#1B3C53] px-6 py-20 flex flex-col items-center">

      {/* HEADER */}
      <div className="max-w-3xl text-center mb-20">
        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-5xl font-bold mb-6"
        >
          How It Works
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-lg text-gray-600 leading-relaxed"
        >
          Finance doesn’t have to feel like guesswork.  
          Our models give founders clarity in minutes, not hours.
        </motion.p>
      </div>

      {/* FOUNDER STORY CARD */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="
          bg-white shadow-xl rounded-2xl p-10 mb-24 max-w-4xl border border-gray-200
        "
      >
        <div className="flex items-start gap-4 mb-4">
          <User size={32} className="text-emerald-500" />
          <h2 className="text-3xl font-semibold">Why I Built This</h2>
        </div>

        <p className="text-gray-700 leading-relaxed whitespace-pre-line text-lg">
          I’ve spent years as a VP of Finance and consulting with startups and small 
          businesses, and one thing became obvious fast: founders are out there doing 
          incredible work, but far too often without the financial clarity they deserve.

          {"\n\n"}So I started helping the way I knew how — by building simple, honest 
          Excel models that turned confusion into confidence. At first it was just for 
          clients, then friends, then anyone who needed a clearer picture of their revenue, 
          runway, or risks.

          {"\n\n"}Over time, that little collection grew into a full library. And now I’m 
          bringing those models to the web — friendlier, faster, and easier for real folks 
          to use. Because every founder should understand their numbers, not fight them.
        </p>
      </motion.div>

      {/* HOW IT WORKS CARD GRID */}
      <motion.div
        initial={{ opacity: 0, y: 26 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.75 }}
        className="mb-24 max-w-5xl w-full"
      >
        <h2 className="text-3xl font-semibold mb-8 flex items-center gap-2">
          <Blocks size={24} className="text-blue-600" />
          How It Works (In 3 Steps)
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: Rocket,
              title: "Pick a Model",
              text: "Revenue, cash flow, runway, pricing — built to answer real questions quickly.",
            },
            {
              icon: LineChart,
              title: "Adjust Your Inputs",
              text: "Tweak revenue, churn, CAC, or team size. The numbers react instantly.",
            },
            {
              icon: ArrowRight,
              title: "Make Better Decisions",
              text: "See your runway, revenue curve, or pricing impact clearly — no more guessing.",
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

      {/* WHAT YOU GET */}
      <motion.div
        initial={{ opacity: 0, y: 26 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-24 max-w-4xl"
      >
        <h2 className="text-3xl font-semibold mb-6 flex items-center gap-2">
          <Sparkles size={24} className="text-blue-600" />
          What You Get
        </h2>

        <ul className="space-y-3 text-lg">
          {[
            "Financial models that make sense immediately.",
            "A growing library — new models added regularly.",
            "Smart defaults and simple controls.",
            "Founder-friendly design. No jargon.",
            "One membership. Unlimited access.",
          ].map((item) => (
            <li key={item} className="flex items-start gap-3 text-gray-700">
              <CheckCircle size={20} className="text-emerald-500 mt-1" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </motion.div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
        className="text-center max-w-3xl"
      >
        <h2 className="text-3xl font-bold mb-4">Ready to Model Your Business?</h2>

        <p className="text-gray-600 mb-8 text-lg">
          Start with our free models. Upgrade anytime for full access.
        </p>

        <Link
          href="/pricing"
          className="
            px-8 py-4 rounded-full text-lg font-semibold
            bg-blue-600 text-white hover:bg-blue-700 
            transition inline-flex items-center justify-center gap-2
          "
        >
          View Pricing
          <ArrowRight size={18} />
        </Link>
      </motion.div>

    </div>
  );
}
