"use client";

import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

interface RowItem {
  id: string;
  name: string;
  description: string;
  vote_count: number;
  status: "request" | "wip" | "published";
}

interface RowProps {
  item: RowItem;
}

export default function PipelineRow({ item }: RowProps) {
  const [hasVoted, setHasVoted] = useState(false);
  const [count, setCount] = useState(item.vote_count);
  const [loading, setLoading] = useState(false);

  const votingDisabled = item.status === "wip";

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

  async function vote() {
    if (loading || hasVoted || votingDisabled) return;

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

    if (!error) {
      setHasVoted(true);
      setCount((c) => c + 1);
    } else {
      setHasVoted(true);
    }

    setLoading(false);
  }

  return (
    <>
      {/* MODEL */}
      <td className="text-sm py-3 px-4 font-medium text-[#1B3C53] whitespace-nowrap">
        {item.name}

        {item.status === "wip" && (
          <span
            className="
              ml-2
              inline-flex items-center
              text-xs font-semibold
              px-2 py-1 rounded-full
              bg-[#456882]/10
              text-[#456882]
            "
          >
            WIP
          </span>
        )}
      </td>

      {/* DESCRIPTION */}
      <td className="py-3 px-4 text-sm text-[#456882] leading-relaxed max-w-lg">
        {item.description}
      </td>

      {/* VOTES / ACTION */}
      <td className="py-3 px-4 text-right whitespace-nowrap">
        <div className="inline-flex items-center gap-3">
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
            disabled={hasVoted || loading || votingDisabled}
            className={`
              p-1.5 rounded-md transition
              ${
                votingDisabled
                  ? "text-[#456882]/40 cursor-not-allowed"
                  : hasVoted
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
