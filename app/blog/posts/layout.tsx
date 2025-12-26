"use client";

import Link from "next/link";
import Footer from "@/app/components/Footer";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full bg-white text-[#1B3C53]">
      {/* TOP BAR */}
      <div className="max-w-5xl mx-auto">
        <div className="w-full mt-18 py-6 flex items-center">
          <Link
            href="/blog"
            className="text-sm font-medium text-[#456882] hover:text-[#1B3C53] transition"
          >
            ← Blog
          </Link>
        </div>
      </div>

      {/* CONTENT */}
      <main className="w-full px-0 py-4">
        <div className="max-w-5xl mx-auto">
          {children}
        </div>
      </main>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}
