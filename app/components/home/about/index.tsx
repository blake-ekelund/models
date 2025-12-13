"use client";

import { motion } from "framer-motion";
import { useState } from "react";

type SectionKey = "founder" | "pricing" | "models" | "probono";

export default function AboutPage() {
  const [active, setActive] = useState<SectionKey>("founder");

  return (
    <div className="bg-white text-[#1B3C53] py-24">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-6xl mx-auto px-6"
      >
        {/* HEADER */}
        <div className="max-w-6xl mb-10">
          <h1 className="text-4xl font-bold mb-4">
            Built by founders. Designed for clarity.
          </h1>
          <p className="text-[#456882] text-lg">
            Synario exists because spreadsheets break down exactly when decisions
            start to matter.
          </p>
        </div>

        {/* CONTENT PANEL */}
        <div className="max-w-6xl border border-[#456882]/30 rounded-xl overflow-hidden">
          {/* PANEL NAV */}
          <div className="flex flex-wrap gap-2 px-4 py-3 border-b border-[#456882]/20 bg-[#1B3C53]/[0.02]">
            <Tab active={active === "founder"} onClick={() => setActive("founder")}>
              Founder note
            </Tab>
            <Tab active={active === "pricing"} onClick={() => setActive("pricing")}>
              Pricing philosophy
            </Tab>
            <Tab active={active === "models"} onClick={() => setActive("models")}>
              Modeling principles
            </Tab>
            <Tab active={active === "probono"} onClick={() => setActive("probono")}>
              Pro bono access
            </Tab>
          </div>

          {/* PANEL CONTENT */}
          <motion.div
            key={active}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="p-6 space-y-6 text-sm text-[#456882]"
          >
            {active === "founder" && (
              <>
                <p>
                  I’ve had to explain numbers to boards, investors, and myself,
                  often using fragile spreadsheets held together by assumptions
                  no one remembered making.
                </p>

                <p>
                  Synario is an attempt to fix that. Every model is explicit about
                  its assumptions, updates in real time, and is designed to
                  support decision-making instead of vanity metrics.
                </p>

                <p>
                  There’s no sales team, no growth hacks, and no penalty for being
                  small. If you stop using Synario, we automatically cancel your
                  subscription. Your data is archived for a full year in case you
                  come back.
                </p>

                <p>
                  Questions, feedback, or skepticism are welcome. I read every
                  email.
                </p>

                <p className="font-medium text-[#1B3C53]">
                  blake@synario.io
                </p>
              </>
            )}

            {active === "pricing" && (
              <>
                <p>
                  We believe pricing should be simple, predictable, and aligned
                  with how small teams actually work.
                </p>

                <p>
                  Complexity usually benefits the vendor, not the customer.
                  That’s why we avoid seat-based pricing, feature gating, and
                  usage penalties.
                </p>

                <p>
                  If you stop using Synario, we automatically cancel your
                  subscription after three months. Your data is archived for a
                  full year in case you return.
                </p>

                <p>
                  We’d rather earn trust over time than extract value through
                  pricing tricks.
                </p>
              </>
            )}

            {active === "models" && (
              <>
                <p>
                  Models are only useful if their assumptions are visible and
                  understandable.
                </p>

                <p>
                  Every model in Synario is built to surface its logic, not hide
                  it behind formulas or black boxes.
                </p>

                <p>
                  Scenarios aren’t predictions. They’re tools for thinking. We
                  design models to support exploration, not certainty.
                </p>

                <p>
                  If a model can’t explain itself clearly, it doesn’t belong in
                  the product.
                </p>
              </>
            )}

            {active === "probono" && (
              <>
                <p>
                  Synario is available at no cost for verified nonprofit and
                  mission-driven organizations.
                </p>

                <p>
                  We offer pro bono access through a short review process to make
                  sure the program stays fair, sustainable, and focused on work
                  that serves a public good.
                </p>

                <p>
                  Supporting mission-driven teams shouldn’t require fighting for
                  discounts or navigating pricing loopholes.
                </p>

                <p className="font-medium text-[#1B3C53]">
                  probono@synario.io
                </p>
              </>
            )}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

/* -----------------------------
   Tab Component
------------------------------ */

function Tab({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`
        px-3 py-1.5 rounded-full text-sm transition
        ${
          active
            ? "bg-[#1B3C53]/10 text-[#1B3C53] font-medium"
            : "text-[#456882] hover:bg-[#1B3C53]/5"
        }
      `}
    >
      {children}
    </button>
  );
}
