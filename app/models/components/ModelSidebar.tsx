"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { ChevronRight, LogOut } from "lucide-react";
import { useModelContext } from "@/app/models/context/ModelContext";
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

  const recentModels = activeModel
    ? [{ ...activeModel, lastEdited: "Today" }]
    : [];

  // ---------------------------------------------------
  // CORRECT SIGN OUT (client + server)
  // ---------------------------------------------------
  async function signOut() {
    // 1. Clear client-side Supabase session
    await supabase.auth.signOut();

    // 2. Clear server-side cookies
    await fetch("/auth/sign-out", { method: "POST" });

    // 3. Hard redirect to HOME
    window.location.replace("/?loggedOut=true");
  }

  return (
    <div className="flex h-full flex-col bg-[#1E4258] text-[#E3E3E3]">
      {/* BRAND */}
      <div className="px-4 py-4">
        <div className="text-sm font-semibold tracking-wide">synario</div>
        <div className="text-[11px] text-[#E3E3E3]/60">
          Financial Modeling Engine
        </div>
      </div>

      <div className="border-t border-[#456882]/60" />

      {/* GLOBAL ACTIONS */}
      <nav className="px-3 py-3 space-y-1">
        <Link
          href="/models/catalog"
          className={clsx(
            "block rounded-md px-2 py-1.5 text-[13px]",
            isCatalog
              ? "bg-[#456882] text-[#E3E3E3]"
              : "text-[#E3E3E3]/85 hover:bg-[#2A5672]"
          )}
        >
          Create New Model
        </Link>

        <Link
          href="/models/saved"
          className={clsx(
            "block rounded-md px-2 py-1.5 text-[13px]",
            isSaved
              ? "bg-[#456882] text-[#E3E3E3]"
              : "text-[#E3E3E3]/70 hover:bg-[#2A5672]"
          )}
        >
          View Saved Models
        </Link>
      </nav>

      {/* RECENT MODELS */}
      {recentModels.length > 0 && (
        <>
          <div className="mt-2 border-t border-[#456882]/60" />

          <div className="px-3 py-3">
            <div className="text-[10px] uppercase tracking-wide text-[#E3E3E3]/50 mb-2">
              Recent Models
            </div>

            {recentModels.map((model, idx) => (
              <div key={model.id} className="mb-2">
                <button
                  onClick={() => idx === 0 && setExpanded(v => !v)}
                  className="w-full text-left rounded-lg bg-[#234F69]
                             border border-[#456882]/60 px-3 py-2
                             hover:bg-[#2A5672] transition"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <div className="text-[13px] font-medium leading-tight">
                        {model.name}
                      </div>
                      <div className="text-[11px] text-[#E3E3E3]/60">
                        Last edited {model.lastEdited}
                      </div>
                    </div>

                    {idx === 0 && (
                      <ChevronRight
                        size={16}
                        className={clsx(
                          "text-[#E3E3E3]/60 transition-transform",
                          expanded && "rotate-90"
                        )}
                      />
                    )}
                  </div>
                </button>

                {idx === 0 && expanded && (
                  <nav className="mt-2 space-y-1">
                    {[
                      { label: "Overview", href: `/models/${model.id}/overview` },
                      { label: "Acquisition", href: `/models/${model.id}/acquisition` },
                      { label: "Revenue", href: `/models/${model.id}/revenue` },
                      { label: "Retention", href: `/models/${model.id}/retention` },
                    ].map(item => {
                      const active = pathname === item.href;

                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          className={clsx(
                            "relative block rounded-md px-2 py-1.5 text-[13px]",
                            active
                              ? "bg-[#456882] text-[#E3E3E3] pl-3"
                              : "text-[#E3E3E3]/75 hover:bg-[#2A5672]"
                          )}
                        >
                          {active && (
                            <span className="absolute left-0 top-1 bottom-1 w-[3px] rounded-r bg-[#EBB700]" />
                          )}
                          {item.label}
                        </Link>
                      );
                    })}
                  </nav>
                )}
              </div>
            ))}
          </div>
        </>
      )}

      {/* SIGN OUT */}
      <div className="mt-auto border-t border-[#456882]/60 p-3">
        <button
          onClick={signOut}
          className="flex items-center gap-2 w-full rounded-md px-2 py-1.5
                     text-[13px] text-[#E3E3E3]/70 hover:bg-[#2A5672]
                     transition"
        >
          <LogOut size={14} />
          Sign Out
        </button>
      </div>
    </div>
  );
}
