"use client";

import { useState } from "react";
import { X, List, Plus } from "lucide-react";

export default function ExploreMoreModels() {
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // 5 models with descriptions
  const upcoming = [
    {
      name: "3-Statement Financial Model",
      desc: "A lightweight Income Statement, Balance Sheet, and Cash Flow for founders.",
    },
    {
      name: "Bear / Base / Bull Scenarios",
      desc: "Model upside and downside paths for revenue, costs, and cash.",
    },
    {
      name: "Runway Sensitivity Model",
      desc: "Experiment with burn and hiring changes to understand true runway.",
    },
    {
      name: "Team Cost Model",
      desc: "Model headcount, salaries, taxes, and benefits to understand payroll burn.",
    },
    {
      name: "Churn & Retention Model",
      desc: "Model subscriber decay, retention curves, and revenue impact.",
    },
  ];

  // Handle request submission
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!title.trim() || !description.trim()) return;

    setSubmitted(true);

    setTimeout(() => {
      setSubmitted(false);
      setShowRequestForm(false);
      setTitle("");
      setDescription("");
    }, 1200);
  }

  // ---------- IN-PANEL REQUEST FORM ----------
  if (showRequestForm) {
    return (
      <div className="flex flex-col h-full text-[#E3E3E3]">

        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Submit a Request</h2>
          <button
            onClick={() => setShowRequestForm(false)}
            className="text-[#E3E3E3] hover:text-white transition"
          >
            <X size={20} />
          </button>
        </div>

        {submitted ? (
          <div className="text-emerald-400 text-sm text-center py-4">
            Thanks! Your idea has been added.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 flex-1">

            {/* Title */}
            <div>
              <label className="text-xs text-[#E3E3E3]/70 mb-1 block">
                Model Title
              </label>
              <input
                className="w-full px-3 py-2 rounded-lg bg-[#1E4258]
                           border border-[#456882] text-sm
                           focus:outline-none focus:ring-2 
                           focus:ring-[#3BAFDA]/40"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Pricing Elasticity Model"
              />
            </div>

            {/* Description */}
            <div>
              <label className="text-xs text-[#E3E3E3]/70 mb-1 block">
                Short Description
              </label>
              <textarea
                className="w-full px-3 py-2 rounded-lg bg-[#1E4258]
                           border border-[#456882] text-sm
                           focus:outline-none focus:ring-2 
                           focus:ring-[#3BAFDA]/40
                           h-24 resize-none"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe what the model should help with..."
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-2.5 rounded-lg bg-[#3BAFDA] text-[#1B3C53]
                         font-semibold hover:opacity-90 transition text-sm"
            >
              Submit Request
            </button>

          </form>
        )}
      </div>
    );
  }

  // ---------- DEFAULT MODEL LIST ----------
  return (
    <div className="flex flex-col h-full text-[#E3E3E3]">
      
      {/* Title */}
      <h2 className="text-xl font-semibold mb-2">Explore More Models</h2>
      <p className="text-sm text-[#E3E3E3]/80 mb-4">
        Here's what we're building next. Want us to build something you need? Request it.
      </p>

      {/* List */}
      <div className="flex-1 overflow-y-auto space-y-2 mb-4">
        {upcoming.map((item) => (
          <div
            key={item.name}
            className="bg-[#1E4258]/40 border border-[#456882]/40 
                       rounded-xl p-3 text-sm"
          >
            <div className="flex justify-between items-center mb-1">
              <span className="font-medium">{item.name}</span>
              <span className="text-emerald-400 text-xs font-semibold px-2 py-0.5 
                               bg-emerald-400/10 rounded-full">
                Coming Soon
              </span>
            </div>
            <p className="text-xs text-[#E3E3E3]/70">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="grid grid-cols-2 gap-3 mt-2">

        {/* See Full List */}
        <button
          onClick={() => (window.location.href = "/requests")}
          className="flex items-center justify-center gap-2 py-2.5 rounded-lg
                     bg-[#1E4258] border border-[#456882]
                     text-[#3BAFDA] text-sm font-medium 
                     hover:bg-[#1E4258]/70 hover:border-[#5CCFFF]
                     hover:text-[#5CCFFF] transition"
        >
          <List size={16} />
          <span>View List of Upcoming Models</span>
        </button>

        {/* Submit Request */}
        <button
          onClick={() => setShowRequestForm(true)}
          className="flex items-center justify-center gap-2 py-2.5 rounded-lg
                     bg-[#3BAFDA] text-[#1B3C53] text-sm font-semibold
                     hover:opacity-90 transition"
        >
          <Plus size={16} />
          <span>Request a Model</span>
        </button>

      </div>

    </div>
  );
}
