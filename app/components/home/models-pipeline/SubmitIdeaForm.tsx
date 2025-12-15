"use client";

import { useState, useEffect, useRef } from "react";
import { supabase } from "@/lib/supabaseClient";

interface SubmitIdeaFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export default function SubmitIdeaForm({
  onSuccess,
  onCancel,
}: SubmitIdeaFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const titleRef = useRef<HTMLInputElement | null>(null);

  // Autofocus title
  useEffect(() => {
    titleRef.current?.focus();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!title.trim() || !description.trim()) return;

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setError("Please sign in to submit an idea.");
      return;
    }

    setSubmitting(true);

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

    setSubmitting(false);

    if (insertError) {
      console.error(insertError);
      setError("Something went wrong. Please try again.");
      return;
    }

    onSuccess();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 pt-8">
      {/* HEADER */}
      <h4 className="text-xl font-semibold text-[#1B3C53] mb-2">
        Submit a New Model
      </h4>

      {/* TITLE */}
      <div>
        <label className="block text-xs font-medium text-[#456882] mb-1">
          Model Title
        </label>
        <input
          ref={titleRef}
          className="
            w-full px-3 py-2 rounded-lg
            border border-[#456882]/30
            text-sm text-[#1B3C53]
            placeholder:text-[#456882]/50
            focus:outline-none
            focus:ring-2 focus:ring-[#456882]/30
          "
          placeholder="Pricing Elasticity Model"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={submitting}
        />
      </div>

      {/* DESCRIPTION */}
      <div>
        <label className="block text-xs font-medium text-[#456882] mb-1">
          Short Description
        </label>
        <textarea
          rows={4}
          className="
            w-full px-3 py-2 rounded-lg
            border border-[#456882]/30
            text-sm text-[#1B3C53]
            resize-none
            placeholder:text-[#456882]/50
            focus:outline-none
            focus:ring-2 focus:ring-[#456882]/30
          "
          placeholder="Describe what the model should help founders do…"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          disabled={submitting}
        />
      </div>

      {/* ERROR */}
      {error && (
        <div className="text-sm text-red-600">
          {error}
        </div>
      )}

      {/* ACTIONS */}
      <div className="flex justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={onCancel}
          disabled={submitting}
          className="
            px-4 py-2 rounded-lg
            text-sm font-medium
            border border-[#456882]/30
            text-[#1B3C53]
            hover:bg-[#1B3C53]/5
            transition
            disabled:opacity-50
          "
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={submitting}
          className="
            px-4 py-2 rounded-lg
            text-sm font-medium
            bg-[#234C6A] text-white
            hover:bg-[#456882]
            transition
            disabled:opacity-50
          "
        >
          {submitting ? "Submitting…" : "Submit"}
        </button>
      </div>
    </form>
  );
}
