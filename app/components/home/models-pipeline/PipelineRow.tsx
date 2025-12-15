"use client";

import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

interface RowItem {
  id: string;
  name: string;
  description: string;
  vote_count: number;
}

interface RowProps {
  item: RowItem;
}

export default function PipelineRow({ item }: RowProps) {
  const [hasVoted, setHasVoted] = useState(false);
  const [count, setCount] = useState(item.vote_count);
  const [loading, setLoading] = useState(false);

  /* ---------------------------------------------
     Check if user already voted
  --------------------------------------------- */
  useEffect(() => {
    async function checkVote() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { data } = await supabase
        .from("model_request_votes")
        .select("id")
        .eq("model_request_id", item.id)
        .eq("user_id", user.id)
        .maybeSingle();

      if (data) setHasVoted(true);
    }

    checkVote();
  }, [item.id]);

  /* ---------------------------------------------
     Vote handler
  --------------------------------------------- */
  async function vote() {
    if (loading || hasVoted) return;

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert("Please sign in to vote.");
      return;
    }

    setLoading(true);

    const { error } = await supabase
      .from("model_request_votes")
      .insert({
        model_request_id: item.id,
        user_id: user.id,
      });

    if (error) {
      // unique constraint violation → already voted
      setHasVoted(true);
    } else {
      setHasVoted(true);
      setCount((c) => c + 1);
    }

    setLoading(false);
  }

  return (
    <>
      {/* MODEL TITLE */}
      <td className="py-4 px-4 font-medium text-[#1B3C53]">
        {item.name}
      </td>

      {/* DESCRIPTION */}
      <td className="py-4 px-4 text-sm text-[#456882] leading-snug max-w-lg">
        {item.description}
      </td>

      {/* VOTES */}
      <td className="py-4 px-1.5">
        <div className="flex items-center justify-end gap-3">
          <span
            className="
              text-xs font-semibold
              px-2 py-1 rounded-full
              bg-[#456882]/10
              text-[#456882]
            "
          >
            {count} votes
          </span>

          <button
            onClick={vote}
            disabled={hasVoted || loading}
            className={`
              p-1.5 rounded-md transition
              ${
                hasVoted
                  ? "text-[#456882]/40 cursor-not-allowed"
                  : "text-[#456882] hover:text-[#1B3C53] hover:bg-[#1B3C53]/5"
              }
            `}
            aria-label="Upvote"
          >
            <ArrowUp size={15} />
          </button>
        </div>
      </td>
    </>
  );
}
