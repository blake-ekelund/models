"use client";

import { motion } from "framer-motion";
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
        {/* HEADER */}
        <div className="max-w-3xl mb-16">
          <h1 className="text-4xl font-bold mb-4">
            Simple pricing for small teams
          </h1>
          <p className="text-[#456882] text-lg">
            Synario is a financial engine for small teams who want clarity,
            not complexity.
          </p>
        </div>

        {/* PRICING CARD */}
        <div className="flex justify-center mb-20">
          <div className="w-full max-w-md">
            <div className="border border-[#456882]/30 rounded-2xl p-6">
              {/* PLAN NAME */}
              <div className="text-sm font-medium text-[#456882] mb-2">
                Standard
              </div>

              {/* PRICE */}
              <div className="flex items-end gap-2 mb-4">
                <div className="text-4xl font-bold">$20</div>
                <div className="text-[#456882] text-sm mb-1">
                  / month
                </div>
              </div>

              {/* VALUE */}
              <p className="text-[#456882] text-sm mb-4">
                Everything you need to model revenue, cash flow, and decisions —
                without pricing games.
              </p>

              {/* CORE INCLUSIONS */}
              <ul className="space-y-2 text-sm text-[#456882] mb-6">
                <li>• Unlimited financial models</li>
                <li>• Live scenario updates (Base / Bear / Bull)</li>
                <li>• Export to Excel and PDF</li>
                <li>• Community requests & voting</li>
              </ul>

              {/* CTA */}
              <Link
                href="/auth/sign-up"
                className="
                  block w-full text-center
                  px-4 py-2.5 rounded-lg
                  text-sm font-semibold
                  bg-[#234C6A] text-white
                  hover:bg-[#456882]
                  transition
                "
              >
                Start using Synario
              </Link>

              {/* SECONDARY CTA */}
              <div className="mt-3 text-center">
                <Link
                  href="/#about"
                  className="text-xs text-[#456882] hover:text-[#1B3C53] transition"
                >
                  Pricing philosophy →
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* PRODUCT SNAPSHOT */}
        <section className="max-w-4xl mb-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
            <Snapshot
              title="What it is"
              body="A financial modeling workspace for revenue, cash flow, and planning."
            />
            <Snapshot
              title="Who it’s for"
              body="Founders and small teams making real financial decisions."
            />
          </div>
        </section>

        {/* FEATURE DETAIL */}
        <section className="max-w-4xl space-y-10 text-sm">
          <FeatureBlock
            title="Modeling"
            items={[
              "Clear, explicit assumptions in every model",
              "Live updates as inputs change",
              "Revenue, cash flow, pricing, and planning models",
              "Scenarios designed for thinking, not prediction",
            ]}
          />

          <FeatureBlock
            title="Support & community"
            items={[
              "Request new models based on real needs",
              "Vote on what we build next",
              "Email support with a 24-hour response target",
              "Weekly walkthroughs and office hours",
            ]}
          />
        </section>

        {/* FOOTNOTE */}
        <div className="max-w-3xl mt-16">
          <p className="text-xs text-[#456882]">
            If Synario doesn’t help you understand your numbers or make better
            decisions, you shouldn’t pay for it.
          </p>
        </div>
      </motion.div>
    </div>
  );
}

/* -----------------------------
   Supporting components
------------------------------ */

function Snapshot({
  title,
  body,
}: {
  title: string;
  body: string;
}) {
  return (
    <div className="border border-[#456882]/30 rounded-xl p-4">
      <div className="font-semibold mb-1">{title}</div>
      <div className="text-[#456882]">{body}</div>
    </div>
  );
}

function FeatureBlock({
  title,
  items,
}: {
  title: string;
  items: string[];
}) {
  return (
    <div>
      <h3 className="text-base font-semibold mb-3">{title}</h3>
      <ul className="space-y-2 text-[#456882]">
        {items.map((item) => (
          <li key={item}>• {item}</li>
        ))}
      </ul>
    </div>
  );
}
