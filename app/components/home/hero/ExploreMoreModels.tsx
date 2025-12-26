"use client";

import { useEffect, useState } from "react";
import { X, List, Plus, CheckCircle } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

interface ModelRequest {
  id: string;
  name: string;
  description: string;
  vote_count: number;
}

const MAX_MODELS = 5;

export default function ExploreMoreModels() {
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [requests, setRequests] = useState<ModelRequest[]>([]);
  const [requestsLoading, setRequestsLoading] = useState(true);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  /* ---------------------------------------------
     Load public model requests (top voted)
  --------------------------------------------- */
  useEffect(() => {
    async function loadRequests() {
      setRequestsLoading(true);

      const { data, error } = await supabase
        .from("model_requests")
        .select("id, name, description, vote_count")
        .eq("public", true)
        .order("vote_count", { ascending: false })
        .limit(MAX_MODELS);

      if (error) {
        console.error(error);
        setRequests([]);
      } else {
        setRequests(data ?? []);
      }

      setRequestsLoading(false);
    }

    loadRequests();
  }, []);

  /* ---------------------------------------------
     Submit new model request
  --------------------------------------------- */
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!title.trim() || !description.trim()) return;

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setError("Please sign in to submit a model request.");
      return;
    }

    setLoading(true);

    const { error: insertError } = await supabase
      .from("model_requests")
      .insert({
        model_key: title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, ""),
        name: title.trim(),
        description: description.trim(),
        public: false,
        created_by: user.id,
      });

    setLoading(false);

    if (insertError) {
      console.error(insertError);
      setError("Something went wrong. Please try again.");
      return;
    }

    // 🔒 Explicit success state — no auto close
    setSubmitted(true);
  }

  /* ---------------------------------------------
     Request Form
  --------------------------------------------- */
  if (showRequestForm) {
    return (
      <div className="flex flex-col h-full text-[#1B3C53]">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Request a Model</h2>
          <button
            onClick={() => {
              setShowRequestForm(false);
              setSubmitted(false);
              setError(null);
            }}
            className="p-1 rounded-md hover:bg-[#E3E3E3]"
          >
            <X size={18} />
          </button>
        </div>

        {submitted ? (
          /* SUCCESS STATE */
          <div className="flex flex-col items-center justify-center py-10 text-[#456882]">
            <CheckCircle size={32} className="mb-3 text-[#234C6A]" />

            <div className="text-sm font-medium mb-1">
              Request submitted
            </div>

            <div className="text-xs text-center max-w-xs mb-6">
              Thanks for the idea. We’ll review it and decide whether to add it to the public requests.
            </div>

            <button
              onClick={() => {
                setShowRequestForm(false);
                setSubmitted(false);
                setTitle("");
                setDescription("");
                setError(null);
              }}
              className="
                px-4 py-2 rounded-lg
                text-sm font-semibold
                bg-[#234C6A] text-white
                hover:bg-[#456882]
                transition
              "
            >
              Done
            </button>
          </div>
        ) : (
          /* FORM STATE */
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 flex-1">
            <div>
              <label className="text-sm font-medium mb-1 block">
                Model Title
              </label>
              <input
                className="w-full px-3 py-2 rounded-lg bg-white
                           border border-[#456882]/40 text-sm
                           focus:outline-none focus:ring-2 
                           focus:ring-[#456882]/30"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                disabled={loading}
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-1 block">
                Short Description
              </label>
              <textarea
                className="w-full px-3 py-2 rounded-lg bg-white
                           border border-[#456882]/40 text-sm
                           focus:outline-none focus:ring-2 
                           focus:ring-[#456882]/30
                           h-24 resize-none"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                disabled={loading}
              />
            </div>

            {error && (
              <div className="text-sm text-red-600">
                {error}
              </div>
            )}

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

  /* ---------------------------------------------
     Public Requests Preview
  --------------------------------------------- */
  return (
    <div className="flex flex-col h-full text-[#1B3C53]">
      <h2 className="text-xl font-semibold mb-2">
        Explore More Models
      </h2>

      <p className="text-sm text-[#456882] mb-4">
        Popular models requested by founders. Vote on what we build next.
      </p>

      <div className="space-y-2 mb-4">
        {requestsLoading ? (
          <div className="text-sm text-[#456882]">
            Loading requests…
          </div>
        ) : requests.length === 0 ? (
          <div className="text-sm text-[#456882]">
            No public requests yet.
          </div>
        ) : (
          requests.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-[#456882]/30
                         rounded-xl p-3"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-medium text-sm">
                  {item.name}
                </span>
                <span className="text-xs font-semibold px-2 py-0.5
                                 bg-[#456882]/10 text-[#456882]
                                 rounded-full">
                  {item.vote_count} votes
                </span>
              </div>

              <p className="text-xs text-[#456882]">
                {item.description}
              </p>
            </div>
          ))
        )}
      </div>

      {/* CTAs */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => (window.location.href = "/#requests")}
          className="
            flex items-center justify-center gap-2
            py-2.5 rounded-lg
            border border-[#456882]/40
            text-[#1B3C53] text-sm font-medium
            hover:bg-[#1B3C53]/5
            transition
          "
        >
          <List size={16} />
          View Model Requests
        </button>

        <button
          onClick={() => setShowRequestForm(true)}
          className="
            flex items-center justify-center gap-2
            py-2.5 rounded-lg
            bg-[#1B3C53]
            text-white text-sm font-semibold
            hover:bg-[#234C6A]
            transition
            shadow-sm
          "
        >
          <Plus size={16} />
          Request a Model
        </button>
      </div>
    </div>
  );
}
