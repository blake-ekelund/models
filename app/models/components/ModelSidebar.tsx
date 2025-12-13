"use client";

import Link from "next/link";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { ChevronRight, LogOut, Plus } from "lucide-react";
import { usePathname } from "next/navigation";

import { useModelContext } from "@/app/models/context/ModelContext";
import { ModelRegistry } from "@/app/models/core/ModelRegistry";
import { supabase } from "@/lib/supabaseClient";

export default function ModelSidebar() {
  const pathname = usePathname();
  const { activeModel } = useModelContext();

  const isCatalog = pathname.startsWith("/models/catalog");
  const isSaved = pathname.startsWith("/models/saved");
  const inWorkspace = !isCatalog && !isSaved;

  const [expanded, setExpanded] = useState(inWorkspace);

  useEffect(() => {
    if (inWorkspace) setExpanded(true);
  }, [inWorkspace]);

  const definition = activeModel
    ? ModelRegistry[activeModel.type]
    : null;

  async function signOut() {
    await supabase.auth.signOut();
    await fetch("/auth/sign-out", { method: "POST" });
    window.location.replace("/?loggedOut=true");
  }

  return (
    <aside className="flex h-full flex-col bg-[#1B3C53] text-[#E3E3E3]">
      {/* BRAND */}
      <div className="px-4 py-4">
        <div className="text-sm font-semibold tracking-wide">
          synario
        </div>
        <div className="text-[11px] text-[#E3E3E3]/60">
          Financial Modeling Engine
        </div>
      </div>

      <div className="border-t border-[#E3E3E3]/10" />

      {/* GLOBAL ACTIONS */}
      <nav className="px-3 py-3 space-y-1">
        <Link
          href="/models/catalog"
          className={clsx(
            "flex items-center gap-2 rounded-md px-2 py-1.5 text-[13px] transition",
            isCatalog
              ? "bg-[#234C6A] text-white"
              : "text-[#E3E3E3]/80 hover:bg-[#234C6A]"
          )}
        >
          <Plus size={14} />
          Create New Model
        </Link>

        <Link
          href="/models/saved"
          className={clsx(
            "block rounded-md px-2 py-1.5 text-[13px] transition",
            isSaved
              ? "bg-[#234C6A] text-white"
              : "text-[#E3E3E3]/70 hover:bg-[#234C6A]"
          )}
        >
          View Saved Models
        </Link>
      </nav>

      {/* ACTIVE MODEL */}
      {activeModel && definition && (
        <>
          <div className="mt-2 border-t border-[#E3E3E3]/10" />

          <div className="px-3 py-3">
            <div className="text-[10px] uppercase tracking-wide text-[#E3E3E3]/50 mb-2">
              Active Model
            </div>

            <button
              onClick={() => setExpanded((v) => !v)}
              className="w-full text-left rounded-lg px-3 py-2 transition
                         bg-[#234C6A]/60 hover:bg-[#234C6A]"
            >
              <div className="flex items-center justify-between gap-2">
                <div>
                  <div className="text-[13px] font-medium leading-tight">
                    {activeModel.name}
                  </div>
                  <div className="text-[11px] text-[#E3E3E3]/60">
                    {definition.name}
                  </div>
                </div>

                <ChevronRight
                  size={16}
                  className={clsx(
                    "text-[#E3E3E3]/60 transition-transform",
                    expanded && "rotate-90"
                  )}
                />
              </div>
            </button>

            {expanded && (
              <nav className="mt-2 space-y-1">
                {definition.sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => {
                      document
                        .getElementById(`section-${section.id}`)
                        ?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="w-full text-left rounded-md px-3 py-1.5 text-[13px]
                               text-[#E3E3E3]/75 hover:bg-[#234C6A] transition"
                  >
                    {section.label}
                  </button>
                ))}
              </nav>
            )}
          </div>
        </>
      )}

      {/* SIGN OUT */}
      <div className="mt-auto border-t border-[#E3E3E3]/10 p-3">
        <button
          onClick={signOut}
          className="flex items-center gap-2 w-full rounded-md px-2 py-1.5
                     text-[13px] text-[#E3E3E3]/70 hover:bg-[#234C6A]
                     transition"
        >
          <LogOut size={14} />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
