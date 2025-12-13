"use client";

import NavBar from "@/app/components/Navbar";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavBar />

      {/* Offset for fixed navbar */}
      <div className="pt-12">
        {children}
      </div>
    </>
  );
}
