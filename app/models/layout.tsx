"use client";

import { ModelProvider } from "@/app/models/context/ModelContext";
import ModelSidebar from "@/app/models/components/ModelSidebar";

export default function ModelsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ModelProvider>
      <div className="flex min-h-screen bg-[#F7F9FB]">
        {/* SIDEBAR */}
        <aside className="w-[260px] shrink-0 border-r border-[#E3E3E3] bg-white">
          <ModelSidebar />
        </aside>

        {/* MAIN CONTENT */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </ModelProvider>
  );
}
