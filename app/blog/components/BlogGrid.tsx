"use client";

import { BlogPostMeta } from "../posts/_posts";
import BlogGridCard from "./BlogGridCard";

export default function BlogGrid({ posts }: { posts: BlogPostMeta[] }) {
  return (
    <div
      className="
        w-full
        grid
        gap-6
        items-stretch
        [grid-template-columns:repeat(auto-fill,minmax(320px,1fr))]
      "
    >
      {posts.map((post) => (
        <BlogGridCard
          key={post.slug}
          post={post}
        />
      ))}
    </div>
  );
}
