import type { Metadata } from "next";
import "./globals.css";
import NavBar from "@/app/components/Navbar";

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

        {/* GLOBAL NAVBAR */}
        <NavBar />

        {/* PAGE CONTENT (pushed down so navbar doesn’t cover hero) */}
        <div className="py-12">
          {children}
        </div>

      </body>
    </html>
  );
}
