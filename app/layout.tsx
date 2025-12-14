import type { Metadata } from "next";
import "./globals.css";
import NavbarGate from "@/app/components/NavbarGate";
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"

export const metadata: Metadata = {
  title: "A financial engine for small teams.",
  description: "Model revenue, cost structure, and financial outcomes in seconds.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="relative min-h-screen bg-white text-[#1B3C53]">
        {/* CONDITIONAL NAVBAR */}
        <NavbarGate />

        {/* PAGE CONTENT */}
        <main className="relative">
          {children}
          <Analytics />
          <SpeedInsights />
        </main>
      </body>
    </html>
  );
}
