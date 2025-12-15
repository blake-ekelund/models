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

  const navLinks = [
    ["Library", "#library"],
    ["Requests", "#requests"],
    ["Pricing", "#pricing"],
    ["About", "#about"],
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-[9998] bg-[#E3E3E3] border-b border-[#1B3C53]/10">
      <nav className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* LEFT: LOGO */}
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

        {/* MIDDLE: NAV LINKS */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-[#1B3C53]">
          {navLinks.map(([label, href]) => (
            <a
              key={label}
              href={href}
              className="hover:text-[#456882] transition"
            >
              {label}
            </a>
          ))}
        </div>

        {/* RIGHT: CTA */}
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
            <>
              {/* PRIMARY WORK MODE */}
              <Link
                href="/models/catalog"
                className="px-4 py-2 rounded-lg text-sm font-semibold text-[#1B3C53] font-semibold hover:bg-[#1B3C53]/5 transition"
              >
                Model Portal
              </Link>

              {/* SUBTLE DIVIDER */}
              <span className="h-5 w-px bg-[#1B3C53]/20" />

              {/* LOG OUT */}
              <button
                onClick={signOut}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-[#1B3C53] hover:bg-[#1B3C53]/5 transition"
              >
                <LogOut size={16} />
                Log Out
              </button>
            </>
          )}
        </div>
      </nav>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden px-4 pb-4 space-y-3 text-sm font-medium text-[#1B3C53] bg-[#E3E3E3] border-t border-[#1B3C53]/10">
          {navLinks.map(([label, href]) => (
            <a
              key={label}
              href={href}
              className="block hover:text-[#456882] transition"
              onClick={() => setOpen(false)}
            >
              {label}
            </a>
          ))}

          {signedIn === false && (
            <>
              <Link
                href="/auth/sign-in"
                className="block mt-2 px-4 py-2 rounded-lg font-semibold hover:bg-[#1B3C53]/5 transition"
                onClick={() => setOpen(false)}
              >
                Log In
              </Link>

              <Link
                href="/auth/sign-up"
                className="block px-4 py-2 rounded-lg mt-1 bg-[#234C6A] text-white font-semibold hover:bg-[#456882] transition"
                onClick={() => setOpen(false)}
              >
                Sign Up
              </Link>
            </>
          )}

          {signedIn === true && (
            <>
              <Link
                href="/models/catalog"
                className="block mt-2 px-4 py-2 rounded-lg font-semibold hover:bg-[#1B3C53]/5 transition"
                onClick={() => setOpen(false)}
              >
                Model Portal
              </Link>

              <button
                onClick={signOut}
                className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium hover:bg-[#1B3C53]/5 transition"
              >
                <LogOut size={16} />
                Log Out
              </button>
            </>
          )}
        </div>
      )}
    </header>
  );
}
