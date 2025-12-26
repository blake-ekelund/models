import { BlogPostMeta } from "../posts/_posts";
import BlogTableRow from "./BlogTableRow";

export default function BlogTable({ posts }: { posts: BlogPostMeta[] }) {
  return (
    <div className="w-full rounded-xl border border-[#E3E3E3] bg-white overflow-hidden">
      <table className="w-full text-sm table-fixed">
        <thead className="bg-[#F7F9FB] text-xs uppercase tracking-wide text-[#456882]">
          <tr>
            <th className="px-6 py-3 text-left w-full">Post</th>
            <th className="px-6 py-3 w-48">Tags</th>
            <th className="px-6 py-3 w-40">Date</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#E3E3E3]">
          {posts.map((post) => (
            <BlogTableRow key={post.slug} post={post} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
