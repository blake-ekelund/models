import type { Metadata } from "next";
import "./globals.css";
import NavbarGate from "@/app/components/NavbarGate";
import Feedback from "@/app/components/ui/Feedback";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

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
        <NavbarGate />

        <main className="relative">{children}</main>

        <Analytics />
        <SpeedInsights />

        {/* Client decides if this shows */}
        <Feedback />
      </body>
    </html>
  );
}
