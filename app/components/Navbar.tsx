"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, LogOut } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const [signedIn, setSignedIn] = useState<boolean | null>(null);

  // ---------------------------------------------------
  // CHECK AUTH STATE (client-side only)
  // ---------------------------------------------------
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSignedIn(!!data.session);
    });
  }, []);

  async function signOut() {
    await fetch("/auth/sign-out", { method: "POST" });
    window.location.href = "/";
  }

  return (
    <header className="fixed top-0 left-0 w-full z-[9998] bg-white border-b border-gray-200 shadow-sm">
      <nav className="max-w-6xl mx-auto px-0 py-4 flex items-center justify-between">

        {/* LOGO */}
        <Link
          href="/"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "auto" });
          }}
          className="text-xl font-bold text-[#1B3C53] tracking-tight"
        >
          Synario
        </Link>

        {/* MOBILE TOGGLE */}
        <button
          className="md:hidden p-2 text-[#1B3C53] hover:bg-gray-100 rounded-lg"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>

        {/* DESKTOP NAV */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-[#1B3C53]">
          <a href="#library" className="hover:text-[#3BAFDA] transition">
            Library
          </a>
          <a href="#pipeline" className="hover:text-[#3BAFDA] transition">
            Pipeline
          </a>
          <a href="#pricing" className="hover:text-[#3BAFDA] transition">
            Pricing
          </a>
          <a href="#about" className="hover:text-[#3BAFDA] transition">
            About
          </a>
          <a href="#contact" className="hover:text-[#3BAFDA] transition">
            Contact
          </a>
        </div>

        {/* DESKTOP CTA */}
        <div className="hidden md:flex items-center gap-3">
          {signedIn === false && (
            <>
              <Link
                href="/auth/sign-in"
                className="
                  px-4 py-2 rounded-lg text-[#1B3C53] font-semibold text-sm
                  hover:bg-gray-100 transition
                "
              >
                Log In
              </Link>

              <Link
                href="/auth/sign-up"
                className="
                  px-4 py-2 rounded-lg bg-[#3BAFDA] text-[#1B3C53]
                  font-semibold text-sm hover:bg-[#3BAFDA]/90 transition
                "
              >
                Sign Up
              </Link>
            </>
          )}

          {signedIn === true && (
            <button
              onClick={signOut}
              className="
                flex items-center gap-2 px-4 py-2 rounded-lg
                text-[#1B3C53] font-semibold text-sm
                hover:bg-gray-100 transition
              "
            >
              <LogOut size={16} />
              Log Out
            </button>
          )}
        </div>
      </nav>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden px-4 pb-4 space-y-3 text-sm font-medium text-[#1B3C53] bg-white border-b border-gray-200">

          <a href="#library" className="block hover:text-[#3BAFDA]">
            Library
          </a>
          <a href="#pipeline" className="block hover:text-[#3BAFDA]">
            Pipeline
          </a>
          <a href="#pricing" className="block hover:text-[#3BAFDA]">
            Pricing
          </a>
          <a href="#about" className="block hover:text-[#3BAFDA]">
            About
          </a>
          <a href="#contact" className="block hover:text-[#3BAFDA]">
            Contact
          </a>

          {signedIn === false && (
            <>
              <Link
                href="/auth/sign-in"
                className="
                  block mt-2 px-4 py-2 rounded-lg
                  text-[#1B3C53] font-semibold hover:bg-gray-100 transition
                "
              >
                Log In
              </Link>

              <Link
                href="/auth/sign-up"
                className="
                  block px-4 py-2 rounded-lg mt-1
                  bg-[#3BAFDA] text-[#1B3C53] font-semibold
                  hover:bg-[#3BAFDA]/90 transition
                "
              >
                Sign Up
              </Link>
            </>
          )}

          {signedIn === true && (
            <button
              onClick={signOut}
              className="
                flex items-center gap-2 mt-2 px-4 py-2 rounded-lg
                text-[#1B3C53] font-semibold hover:bg-gray-100 transition
              "
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
