"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, LogOut } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const [signedIn, setSignedIn] = useState<boolean | null>(null);

  // ---------------------------------------------------
  // KEEP AUTH STATE IN SYNC
  // ---------------------------------------------------
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSignedIn(!!data.session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSignedIn(!!session);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // ---------------------------------------------------
  // SIGN OUT
  // ---------------------------------------------------
  async function signOut() {
    await supabase.auth.signOut();
    await fetch("/auth/sign-out", { method: "POST" });
    window.location.replace("/auth/sign-in?loggedOut=true");
  }

  return (
    <header className="fixed top-0 left-0 w-full z-[9998] bg-[#E3E3E3] border-b border-[#1B3C53]/10">
      <nav className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* LOGO */}
        <Link
          href="/"
          className="text-xl font-semibold tracking-tight text-[#1B3C53]"
        >
          Synario
        </Link>

        {/* MOBILE TOGGLE */}
        <button
          className="md:hidden p-2 rounded-lg text-[#1B3C53] hover:bg-[#1B3C53]/5 transition"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>

        {/* DESKTOP NAV */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-[#1B3C53]">
          {[
            ["Library", "#library"],
            ["Pipeline", "#pipeline"],
            ["Pricing", "#pricing"],
            ["About", "#about"],
          ].map(([label, href]) => (
            <a
              key={label}
              href={href}
              className="hover:text-[#456882] transition"
            >
              {label}
            </a>
          ))}
        </div>

        {/* DESKTOP CTA */}
        <div className="hidden md:flex items-center gap-3">
          {signedIn === false && (
            <>
              <Link
                href="/auth/sign-in"
                className="px-4 py-2 rounded-lg text-sm font-semibold text-[#1B3C53] hover:bg-[#1B3C53]/5 transition"
              >
                Log In
              </Link>

              <Link
                href="/auth/sign-up"
                className="px-4 py-2 rounded-lg text-sm font-semibold bg-[#234C6A] text-white hover:bg-[#456882] transition"
              >
                Sign Up
              </Link>
            </>
          )}

          {signedIn === true && (
            <button
              onClick={signOut}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-[#1B3C53] hover:bg-[#1B3C53]/5 transition"
            >
              <LogOut size={16} />
              Log Out
            </button>
          )}
        </div>
      </nav>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden px-4 pb-4 space-y-3 text-sm font-medium text-[#1B3C53] bg-[#E3E3E3] border-t border-[#1B3C53]/10">
          {[
            ["Library", "#library"],
            ["Pipeline", "#pipeline"],
            ["Pricing", "#pricing"],
            ["About", "#about"],
          ].map(([label, href]) => (
            <a
              key={label}
              href={href}
              className="block hover:text-[#456882] transition"
            >
              {label}
            </a>
          ))}

          {signedIn === false && (
            <>
              <Link
                href="/auth/sign-in"
                className="block mt-2 px-4 py-2 rounded-lg font-semibold hover:bg-[#1B3C53]/5 transition"
              >
                Log In
              </Link>

              <Link
                href="/auth/sign-up"
                className="block px-4 py-2 rounded-lg mt-1 bg-[#234C6A] text-white font-semibold hover:bg-[#456882] transition"
              >
                Sign Up
              </Link>
            </>
          )}

          {signedIn === true && (
            <button
              onClick={signOut}
              className="flex items-center gap-2 mt-2 px-4 py-2 rounded-lg font-semibold hover:bg-[#1B3C53]/5 transition"
            >
              <LogOut size={16} />
              Log Out
            </button>
          )}
        </div>
      )}
    </header>
  );
}
