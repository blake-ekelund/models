"use client";

import { useState, useEffect, useRef } from "react";

interface SubmitIdeaFormProps {
  onSubmit: (title: string, description: string) => void;
  onCancel: () => void;
}

export default function SubmitIdeaForm({
  onSubmit,
  onCancel,
}: SubmitIdeaFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const titleRef = useRef<HTMLInputElement | null>(null);

  // Autofocus the title when modal opens
  useEffect(() => {
    titleRef.current?.focus();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !description.trim()) return;

    onSubmit(title, description);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 pt-8">

      {/* HEADER */}
      <h4 className="text-xl font-semibold text-[#1B3C53] mb-2">
        Submit a New Model
      </h4>

      {/* TITLE INPUT */}
      <div>
        <label className="block text-xs font-medium text-[#456882] mb-1">
          Model Title
        </label>
        <input
          ref={titleRef}
          className="
            w-full px-3 py-2 rounded-lg border border-[#D0D4DA]
            text-sm focus:outline-none focus:ring-2 focus:ring-[#3BAFDA]/40
          "
          placeholder="e.g., Pricing Elasticity Model"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      {/* DESCRIPTION INPUT */}
      <div>
        <label className="block text-xs font-medium text-[#456882] mb-1">
          Short Description
        </label>
        <textarea
          rows={4}
          className="
            w-full px-3 py-2 rounded-lg border border-[#D0D4DA]
            text-sm resize-none focus:outline-none
            focus:ring-2 focus:ring-[#3BAFDA]/40
          "
          placeholder="Describe what the model should help founders do..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      {/* BUTTONS */}
      <div className="flex justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="
            px-4 py-2 rounded-lg border border-[#D0D4DA]
            text-sm hover:bg-gray-100 transition
          "
        >
          Cancel
        </button>

        <button
          type="submit"
          className="
            px-4 py-2 rounded-lg bg-[#3BAFDA] text-white 
            text-sm font-medium hover:bg-[#3BAFDA]/90 transition
          "
        >
          Submit
        </button>
      </div>
    </form>
  );
}
