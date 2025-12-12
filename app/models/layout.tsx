import { ModelProvider } from "@/app/models/context/ModelContext";
import ModelSidebar from "@/app/models/components/ModelSidebar";

export default function ModelsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ModelProvider>
      <div className="flex h-screen overflow-hidden bg-gray-50">
        <aside className="w-[260px] shrink-0 border-r border-[#456882]">
          <ModelSidebar />
        </aside>

        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </ModelProvider>
  );
}
