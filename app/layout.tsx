import type { Metadata } from "next";
import "./globals.css";
import NavbarGate from "@/app/components/NavbarGate";

export const metadata: Metadata = {
  title: "A Financial Modeling Engine",
  description: "Model revenue, cost structure, and financial outcomes in seconds.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="relative min-h-screen">

        {/* CONDITIONAL NAVBAR */}
        <NavbarGate />

        {/* PAGE CONTENT */}
        <div className="py-0">
          {children}
        </div>

      </body>
    </html>
  );
}
