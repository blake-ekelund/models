"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function PricingPage() {
  return (
    <div className="bg-white text-[#1B3C53] py-20">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="max-w-6xl mx-auto px-6"
      >
        {/* HEADER */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-2">
            Pricing
          </h1>
          <p className="text-[#456882] text-sm">
            One plan. No tiers. No usage games.
          </p>
        </div>

        {/* PRICE BLOCK */}
        <div className="border border-[#456882]/30 rounded-xl p-6 mb-12">
          <div className="flex items-baseline gap-2 mb-4">
            <div className="text-3xl font-bold">$20</div>
            <div className="text-sm text-[#456882]">
              / month per
            </div>
          </div>

          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-6 text-sm text-[#456882] mb-6">
            <li>• Unlimited financial models</li>
            <li>• Revenue, cash flow, pricing & planning</li>
            <li>• Base / Bear / Bull scenarios</li>
            <li>• Export to Excel and PDF</li>
            <li>• Save & revisit models</li>
            <li>• Request & vote on new models</li>
          </ul>

          <Link
            href="/auth/sign-up"
            className="
              inline-flex items-center
              px-4 py-2.5 rounded-lg
              text-sm font-semibold
              bg-[#234C6A] text-white
              hover:bg-[#456882]
              transition
            "
          >
            Create an Account
          </Link>
        </div>

        {/* FOOTNOTE */}
        <p className="text-xs text-[#456882] max-w-6xl">
          If Synario doesn’t help you understand your numbers or make better
          decisions, you shouldn’t keep paying for it.
        </p>
      </motion.div>
    </div>
  );
}
