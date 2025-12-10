"use client";

import { motion } from "framer-motion";
import { CheckCircle, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

export default function PricingPage() {
  return (
    <div className="bg-[#1B3C53] text-[#E3E3E3] px-6 py-10 flex justify-center">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-xl"
      >
        {/* HEADER */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-3">
            Simple Pricing, Built for Founders
          </h1>

          <p className="text-[#E3E3E3]/80 text-base leading-relaxed max-w-xl mx-auto">
            All models. All updates. One flat monthly subscription.
          </p>
        </div>

        {/* PRICING CARD */}
        <div
          className="
            bg-[#234C6A] border border-[#456882]/50 
            rounded-2xl p-6 shadow-xl
            backdrop-blur-sm space-y-6
          "
        >
          {/* Price + CTA */}
          <div className="flex items-center justify-between">
            <div>
              <div className="text-5xl font-extrabold">$20/mo</div>
            </div>

            <Link
              href="/signup"
              className="
                px-5 py-2.5 rounded-lg bg-[#3BAFDA] text-[#1B3C53] 
                font-semibold text-base hover:bg-[#3BAFDA]/90 
                transition flex items-center gap-2 shadow-sm
              "
            >
              Get Access
              <ArrowRight size={16} />
            </Link>
          </div>

          {/* Minimal List */}
          <div>
            <h3 className="text-lg font-semibold mb-3">What You Get</h3>

            <ul className="space-y-2 text-sm">
              {[
                "Unlimited access to all financial models",
                "Export results to Excel or PDF",
                "Request one new model each month",
                "Vote daily on new model ideas",
                "Email support (24-hour response time)",
                "Switch between Base / Bear / Bull scenarios",
                "Real-time updates as you adjust inputs",
                "Clear explanations for all assumptions",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <CheckCircle
                    size={16}
                    className="text-emerald-400 mt-0.5 shrink-0"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-center text-xs text-[#E3E3E3]/60 mt-6 flex items-center justify-center gap-2">
          <Sparkles size={14} className="text-[#3BAFDA]" />
          <span>No contracts. No hidden fees. Cancel anytime.</span>
        </div>
      </motion.div>
    </div>
  );
}
