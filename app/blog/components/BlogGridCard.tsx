"use client";

import Link from "next/link";
import { BlogPostMeta } from "../posts/_posts";

interface Props {
  post: BlogPostMeta;
}

export default function BlogGridCard({ post }: Props) {
  return (
    <Link
      href={`/blog/posts/${post.slug}`}
      className="
        group
        relative
        bg-white
        border border-[#456882]/30
        rounded-xl
        p-6
        flex flex-col h-full
        shadow-sm
        transition-all duration-200
        hover:shadow-lg
        hover:-translate-y-0.5
        hover:border-[#234C6A]/60
      "
    >
      {/* HEADER */}
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-semibold text-[#1B3C53] leading-snug">
          {post.title}
        </h3>

        {post.tags?.[0] && (
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#456882]/10 text-[#456882]">
            {post.tags[0]}
          </span>
        )}
      </div>

      {/* DESCRIPTION */}
      <p className="text-[#456882] text-sm mb-4 leading-relaxed">
        {post.description}
      </p>

      {/* META + CTA */}
      <div className="mt-auto space-y-3">
        <div className="text-xs text-[#456882]">
          {post.publishedAt} · {post.author}
        </div>

        <div className="text-sm font-medium text-[#1B3C53] group-hover:text-[#234C6A] transition">
          Read →
        </div>
      </div>
    </Link>
  );
}
