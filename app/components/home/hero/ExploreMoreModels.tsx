"use client";

import { useEffect, useState } from "react";
import { X, List, Plus } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

interface CatalogModel {
  id: string;
  slug: string;
  name: string;
  description: string;
  category: string;
  status: string;
  inputs_preview: string[] | null;
}

const MAX_MODELS = 5;

export default function ExploreMoreModels() {
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [catalog, setCatalog] = useState<CatalogModel[]>([]);
  const [catalogLoading, setCatalogLoading] = useState(true);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  /* ---------------------------------------------
     Fetch model catalog (capped)
  --------------------------------------------- */
  useEffect(() => {
    async function loadCatalog() {
      setCatalogLoading(true);

      const { data, error } = await supabase
        .from("model_catalog")
        .select(
          "id, slug, name, description, category, status, inputs_preview"
        )
        .order("created_at", { ascending: true })
        .limit(MAX_MODELS);

      if (error) {
        console.error(error);
        setCatalog([]);
      } else {
        setCatalog(data ?? []);
      }

      setCatalogLoading(false);
    }

    loadCatalog();
  }, []);

  /* ---------------------------------------------
     Submit request
  --------------------------------------------- */
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    setLoading(true);
    setError(null);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { error } = await supabase.from("model_requests").insert({
      title: title.trim(),
      description: description.trim(),
      user_id: user?.id ?? null,
      status: "new",
    });

    setLoading(false);

    if (error) {
      console.error(error);
      setError("Something went wrong. Please try again.");
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

  /* ---------------------------------------------
     Request Form
  --------------------------------------------- */
  if (showRequestForm) {
    return (
      <div className="flex flex-col h-full text-[#1B3C53]">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Submit a Request</h2>
          <button
            onClick={() => setShowRequestForm(false)}
            className="p-1 rounded-md hover:bg-[#E3E3E3]"
          >
            <X size={18} />
          </button>
        </div>

        {submitted ? (
          <div className="text-sm text-center py-6 text-[#456882]">
            Request submitted. Thank you.
          </div>
        ) : (
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
     Catalog View
  --------------------------------------------- */
  return (
    <div className="flex flex-col h-full text-[#1B3C53]">
      <h2 className="text-xl font-semibold mb-2">
        Explore More Models
      </h2>

      <p className="text-sm text-[#456882] mb-4">
        Here’s what’s coming next. You can request models that matter to you.
      </p>

      {/* Catalog list (max 5) */}
      <div className="space-y-2 mb-4">
        {catalogLoading ? (
          <div className="text-sm text-[#456882]">
            Loading models…
          </div>
        ) : catalog.length === 0 ? (
          <div className="text-sm text-[#456882]">
            No upcoming models yet.
          </div>
        ) : (
          catalog.map((item) => (
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
                  {item.status}
                </span>
              </div>

              <p className="text-xs text-[#456882] mb-1">
                {item.description}
              </p>

              {item.inputs_preview && (
                <div className="text-xs text-[#456882]/70">
                  Inputs: {item.inputs_preview.join(", ") }
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* CTAs */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => (window.location.href = "/requests")}
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
          View Requests
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
