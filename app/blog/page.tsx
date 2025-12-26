"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { BLOG_POSTS } from "./posts/_posts";

import BlogHeader from "./components/BlogHeader";
import BlogGrid from "./components/BlogGrid";
import BlogTable from "./components/BlogTable";
import BlogEmptyState from "./components/BlogEmptyState";

export default function BlogPage() {
  const [view, setView] = useState<"grid" | "table">("grid");
  const [query, setQuery] = useState("");

  // ---------------------------------------------
  // FILTER POSTS (SEARCH)
  // ---------------------------------------------
  const filteredPosts = useMemo(() => {
    if (!query.trim()) return BLOG_POSTS;

    const q = query.toLowerCase();

    return BLOG_POSTS.filter((post) => {
      const haystack = [
        post.title,
        post.description,
        post.author,
        post.tags.join(" "),
      ]
        .join(" ")
        .toLowerCase();

      return haystack.includes(q);
    });
  }, [query]);

  return (
    <motion.div
      className="w-full max-w-6xl mx-auto px-4 py-36 space-y-4"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      {/* HEADER + FILTERS */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05, duration: 0.3 }}
      >
        <BlogHeader
          view={view}
          setView={setView}
          query={query}
          setQuery={setQuery}
        />
      </motion.div>

      {/* CONTENT */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.12, duration: 0.25 }}
      >
        {filteredPosts.length === 0 && <BlogEmptyState />}

        {filteredPosts.length > 0 && view === "grid" && (
          <BlogGrid posts={filteredPosts} />
        )}

        {filteredPosts.length > 0 && view === "table" && (
          <BlogTable posts={filteredPosts} />
        )}
      </motion.div>
    </motion.div>
  );
}
