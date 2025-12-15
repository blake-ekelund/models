"use client";

import { useEffect, useState, useCallback } from "react";
import { PlusCircle } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

import PipelineTable from "./PipelineTable";
import PaginationControls from "./PaginationControls";

interface PipelineItem {
  id: string;
  name: string;
  description: string;
  vote_count: number;
}

interface ModelsPipelineProps {
  openModal: () => void;
  registerReload: (fn: () => void) => void;
}

export default function ModelsPipeline({
  openModal,
}: ModelsPipelineProps) {
  const [items, setItems] = useState<PipelineItem[]>([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const pageSize = 5;

  /* ---------------------------------------------
     Load public model requests
  --------------------------------------------- */
  const load = useCallback(async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("model_requests")
      .select("id, name, description, vote_count")
      .eq("public", true)
      .order("vote_count", { ascending: false });

    if (error) {
      console.error(error);
      setItems([]);
    } else {
      setItems(data ?? []);
    }

    setLoading(false);
  }, []);

  /* Initial load */
  useEffect(() => {
    load();
  }, [load]);

  /* ---------------------------------------------
     Pagination
  --------------------------------------------- */
  const paginated = items.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  return (
    <section className="relative z-10 w-full py-20 text-[#1B3C53]">
      <div className="max-w-6xl mx-auto px-6">
        {/* HEADER */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-4xl font-bold">Model Requests</h3>

          <button
            onClick={openModal}
            className="
              flex items-center gap-2
              px-4 py-2 rounded-lg
              text-sm font-medium
              bg-[#234C6A] text-white
              hover:bg-[#456882]
              transition shadow-sm
            "
          >
            <PlusCircle size={18} />
            Submit an Idea
          </button>
        </div>

        {/* DESCRIPTION */}
        <p className="text-[#456882] text-sm mb-10 max-w-2xl leading-relaxed">
          A leaderboard of models requested by founders. Upvote the ideas you want us to build next.
        </p>

        {/* CONTENT */}
        {loading ? (
          <div className="text-sm text-[#456882]">Loading models…</div>
        ) : items.length === 0 ? (
          <div className="text-sm text-[#456882]">
            No public model requests yet.
          </div>
        ) : (
          <>
            <PipelineTable
              items={paginated}
              page={page}
              pageSize={pageSize}
            />

            <div className="flex justify-center mt-8">
              <PaginationControls
                page={page}
                totalPages={Math.ceil(items.length / pageSize)}
                setPage={setPage}
              />
            </div>
          </>
        )}
      </div>
    </section>
  );
}
