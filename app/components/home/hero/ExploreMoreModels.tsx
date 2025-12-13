"use client";

import { useState } from "react";
import { X, List, Plus } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

export default function ExploreMoreModels() {
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

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

  // --------------------
  // Submit to Supabase
  // --------------------
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    setLoading(true);

    const { error } = await supabase.from("model_requests").insert({
      title: title.trim(),
      description: description.trim(),
    });

    setLoading(false);

    if (error) {
      console.error(error);
      return;
    }

    setSubmitted(true);

    setTimeout(() => {
      setSubmitted(false);
      setShowRequestForm(false);
      setTitle("");
      setDescription("");
    }, 1200);
  }

  // ---------- REQUEST FORM ----------
  if (showRequestForm) {
    return (
      <div className="flex flex-col h-full text-[#1B3C53]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Submit a Request</h2>
          <button
            onClick={() => setShowRequestForm(false)}
            className="hover:text-[#456882] transition"
          >
            <X size={20} />
          </button>
        </div>

        {submitted ? (
          <div className="text-sm text-center py-4 text-[#456882]">
            Request submitted. Thank you.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 flex-1">
            <div>
              <label className="text-xs text-[#1B3C53]/60 mb-1 block">
                Model Title
              </label>
              <input
                className="w-full px-3 py-2 rounded-lg bg-[#E3E3E3]
                           border border-[#456882]/40 text-sm
                           focus:outline-none focus:ring-2 
                           focus:ring-[#456882]/30"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Pricing Elasticity Model"
              />
            </div>

            <div>
              <label className="text-xs text-[#1B3C53]/60 mb-1 block">
                Short Description
              </label>
              <textarea
                className="w-full px-3 py-2 rounded-lg bg-[#E3E3E3]
                           border border-[#456882]/40 text-sm
                           focus:outline-none focus:ring-2 
                           focus:ring-[#456882]/30
                           h-24 resize-none"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="What problem should this model solve?"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-lg
                         bg-[#234C6A] text-white
                         font-semibold text-sm
                         hover:bg-[#456882] transition
                         disabled:opacity-60"
            >
              {loading ? "Submitting…" : "Submit Request"}
            </button>
          </form>
        )}
      </div>
    );
  }

  // ---------- DEFAULT LIST ----------
  return (
    <div className="flex flex-col h-full text-[#1B3C53]">
      <h2 className="text-xl font-semibold mb-2">Explore More Models</h2>
      <p className="text-sm text-[#1B3C53]/70 mb-4">
        Here’s what’s coming next. You can request models that matter to you.
      </p>

      <div className="flex-1 overflow-y-auto space-y-2 mb-4">
        {upcoming.map((item) => (
          <div
            key={item.name}
            className="bg-[#E3E3E3] border border-[#456882]/30 
                       rounded-xl p-3 text-sm"
          >
            <div className="flex justify-between items-center mb-1">
              <span className="font-medium">{item.name}</span>
              <span className="text-xs font-semibold px-2 py-0.5 
                               bg-[#456882]/10 text-[#456882]
                               rounded-full">
                Coming Soon
              </span>
            </div>
            <p className="text-xs text-[#1B3C53]/60">{item.desc}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3 mt-2">
        <button
          onClick={() => (window.location.href = "/requests")}
          className="flex items-center justify-center gap-2 py-2.5 rounded-lg
                     border border-[#456882]/40
                     text-[#1B3C53] text-sm font-medium 
                     hover:bg-[#1B3C53]/5 transition"
        >
          <List size={16} />
          View Requests
        </button>

        <button
          onClick={() => setShowRequestForm(true)}
          className="flex items-center justify-center gap-2 py-2.5 rounded-lg
                     bg-[#234C6A] text-white text-sm font-semibold
                     hover:bg-[#456882] transition"
        >
          <Plus size={16} />
          Request a Model
        </button>
      </div>
    </div>
  );
}
