"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import Link from "next/link";

export default function PricingPage() {
  return (
    <div className="bg-white text-[#1B3C53] py-24">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-6xl mx-auto px-6"
      >
        {/* HEADER — LEFT ALIGNED */}
        <div className="max-w-3xl mb-12">
          <h1 className="text-4xl font-bold mb-4">
            One Plan. Built for Founders.
          </h1>
          <p className="text-[#456882] text-lg">
            Synario gives you clear financial models, honest assumptions,
            and a community-driven roadmap — without pricing games.
          </p>
        </div>

        {/* PRICING CARD — CENTERED DECISION OBJECT */}
        <div className="flex justify-center">
          <div className="w-full max-w-xl">
            <div className="border border-[#456882]/30 rounded-2xl p-8 mb-10">
              {/* PRICE */}
              <div className="flex items-end gap-3 mb-6">
                <div className="text-5xl font-bold">$20</div>
                <div className="text-[#456882] text-base mb-1">
                  per month
                </div>
              </div>

              <p className="text-[#456882] mb-8 max-w-lg">
                Full access to everything we build — now and in the future.
                No tiers. No usage limits.
              </p>

              {/* BENEFITS */}
              <div className="space-y-8 text-sm">
                {/* MODELING */}
                <div>
                  <h3 className="text-base font-semibold mb-3">
                    Modeling
                  </h3>
                  <ul className="space-y-2">
                    {[
                      "Clear, explicit assumptions in every model",
                      "Live updates as you adjust inputs",
                      "Revenue, cash flow, pricing, and planning models",
                      "Base / Bear / Bull scenario switching",
                      "Export results to Excel or PDF",
                      "New models shipped regularly",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <Check
                          size={16}
                          className="text-[#456882] mt-0.5"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* COMMUNITY */}
                <div>
                  <h3 className="text-base font-semibold mb-3">
                    Community
                  </h3>
                  <ul className="space-y-2">
                    {[
                      "Request new models based on real needs",
                      "Vote on what we build next",
                      "Public roadmap shaped by founders, not sales demos",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <Check
                          size={16}
                          className="text-[#456882] mt-0.5"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* SUPPORT */}
                <div>
                  <h3 className="text-base font-semibold mb-3">
                    Support
                  </h3>
                  <ul className="space-y-2">
                    {[
                      "Email support with a 24-hour response target",
                      "Weekly tutorial videos and walkthroughs",
                      "Live office hours (first-come, first-served)",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <Check
                          size={16}
                          className="text-[#456882] mt-0.5"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* PHILOSOPHY */}
                <div>
                  <h3 className="text-base font-semibold mb-3">
                    Founder-First Pricing
                  </h3>
                  <ul className="space-y-2">
                    {[
                      "No seat-based pricing",
                      "No feature gating",
                      "No penalties for being small",
                      "Automatic cancellation after 3 months of inactivity",
                      "Your data is archived for a full year — nothing is lost if you return",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <Check
                          size={16}
                          className="text-[#456882] mt-0.5"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* CTA */}
              <div className="mt-10">
                <Link
                  href="/auth/sign-up"
                  className="
                    inline-flex items-center justify-center
                    px-6 py-3 rounded-lg
                    text-sm font-semibold
                    bg-[#234C6A] text-white
                    hover:bg-[#456882]
                    transition
                  "
                >
                  Start Using Synario
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* FOOTNOTE — LEFT ALIGNED */}
        <div className="max-w-3xl">
          <p className="text-xs text-[#456882]">
            If Synario doesn’t help you understand your numbers or make better
            decisions, you shouldn’t pay for it. That’s the deal.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
