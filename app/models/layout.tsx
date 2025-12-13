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
      <div className="flex h-screen overflow-hidden bg-[#F7F9FB]">
        <aside className="w-[260px] shrink-0 border-r border-[#E3E3E3]">
          <ModelSidebar />
        </aside>

        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </ModelProvider>
  );
}
