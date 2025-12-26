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
  status: "request" | "wip" | "published";
}

interface ModelsPipelineProps {
  openModal: () => void;
}

export default function ModelsPipeline({ openModal }: ModelsPipelineProps) {
  const [items, setItems] = useState<PipelineItem[]>([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const pageSize = 5;

  const load = useCallback(async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("model_requests")
      .select("id, name, description, vote_count, status")
      .eq("public", true)
      .neq("status", "published");

    if (error) {
      console.error(error);
      setItems([]);
    } else {
      const sorted = (data ?? []).sort((a, b) => {
        if (a.status === "wip" && b.status !== "wip") return -1;
        if (a.status !== "wip" && b.status === "wip") return 1;
        return b.vote_count - a.vote_count;
      });

      setItems(sorted);
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const paginated = items.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  return (
    <section className="relative z-10 w-full py-20 text-[#1B3C53]">
      <div className="max-w-6xl mx-auto px-6">
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

        <p className="text-[#456882] text-sm mb-10 max-w-2xl leading-relaxed">
          Vote on what we should build next. Models in progress are shown at the top.
        </p>

        {loading ? (
          <div className="text-sm text-[#456882]">Loading models…</div>
        ) : items.length === 0 ? (
          <div className="text-sm text-[#456882]">
            No public model requests yet.
          </div>
        ) : (
          <>
            <PipelineTable items={paginated} />

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
