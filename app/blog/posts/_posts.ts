export interface BlogPostMeta {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  author: string;
  publishedAt: string;
}

export const BLOG_POSTS: BlogPostMeta[] = [
  {
    slug: "why-models-fail",
    title: "Why Financial Models Fail",
    description:
      "Most models don’t fail because of math — they fail because of assumptions.",
    tags: ["Modeling", "Strategy"],
    author: "Synario",
    publishedAt: "2025-01-12",
  },

];
