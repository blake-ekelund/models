"use client";

import { useEffect, useState } from "react";
import { PlusCircle } from "lucide-react";

import PipelineTable from "./PipelineTable";
import PaginationControls from "./PaginationControls";

interface PipelineItem {
  title: string;
  description: string;
  votes: number;
}

interface ModelsPipelineProps {
  openModal: () => void;
  registerSubmit: (
    fn: (title: string, description: string) => void
  ) => void;
}

export default function ModelsPipeline({
  openModal,
  registerSubmit,
}: ModelsPipelineProps) {
  const [items, setItems] = useState<PipelineItem[]>([
    {
      title: "Pricing Elasticity Model",
      description: "Test pricing tiers impact on revenue, adoption, and churn.",
      votes: 42,
    },
    {
      title: "3-Statement Model (Lite)",
      description: "Simple Income Statement, Balance Sheet, and Cash Flow.",
      votes: 31,
    },
    {
      title: "Runway Sensitivity Dashboard",
      description: "See how hiring & CAC changes affect runway.",
      votes: 28,
    },
    {
      title: "Unit Economics Analyzer",
      description: "Decompose CAC, LTV, contribution margin, and retention impact.",
      votes: 22,
    },
    {
      title: "Hiring Plan Model",
      description: "Forecast payroll & hiring ramp effects on burn.",
      votes: 18,
    },
    {
      title: "Churn Scenario Simulator",
      description: "Model extreme churn conditions & retention recovery.",
      votes: 17,
    },
  ]);

  const [page, setPage] = useState(1);
  const pageSize = 5;

  // Register submit handler with HomePage ONCE
  useEffect(() => {
    registerSubmit((title, description) => {
      setItems((prev) => [...prev, { title, description, votes: 0 }]);
    });
  }, [registerSubmit]);

  function vote(idx: number, delta: number) {
    setItems((prev) =>
      prev
        .map((item, i) =>
          i === idx ? { ...item, votes: Math.max(0, item.votes + delta) } : item
        )
        .sort((a, b) => b.votes - a.votes)
    );
  }

  const sorted = [...items].sort((a, b) => b.votes - a.votes);
  const paginated = sorted.slice((page - 1) * pageSize, page * pageSize);

  return (
    <section className="w-full bg-[#F2F4F7] py-20 px-6 text-[#1B3C53]">
      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-3xl font-bold">Model Pipeline</h3>

          <button
            onClick={openModal}
            className="
              flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium
              bg-[#3BAFDA] text-white hover:bg-[#3BAFDA]/90 transition shadow-sm
            "
          >
            <PlusCircle size={18} />
            Submit an Idea
          </button>
        </div>

        {/* DESCRIPTION */}
        <p className="text-[#456882] text-sm mb-10 max-w-2xl leading-relaxed">
          A leaderboard of models requested by founders. Upvote the ideas you want built next.
        </p>

        {/* TABLE */}
        <PipelineTable
          items={paginated}
          fullList={sorted}
          vote={vote}
          page={page}
          pageSize={pageSize}
        />

        {/* PAGINATION */}
        <div className="flex justify-center mt-8">
          <PaginationControls
            page={page}
            totalPages={Math.ceil(items.length / pageSize)}
            setPage={setPage}
          />
        </div>

      </div>
    </section>
  );
}
