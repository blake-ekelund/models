import Link from "next/link";
import { BlogPostMeta } from "../posts/_posts";

export default function BlogTableRow({ post }: { post: BlogPostMeta }) {
  return (
    <tr className="hover:bg-[#F7F9FB] transition">
      <td className="px-6 py-4">
        <Link
          href={`/blog/posts/${post.slug}`}
          className="font-medium text-[#1B3C53]"
        >
          {post.title}
        </Link>
        <div className="text-sm text-[#456882] mt-0.5">
          {post.description}
        </div>
      </td>
      <td className="px-6 py-4 text-sm">
        {post.tags.join(", ")}
      </td>
      <td className="px-6 py-4 text-sm">
        {post.publishedAt}
      </td>
    </tr>
  );
}
