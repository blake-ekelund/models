"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function NavBar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-[9998] bg-white border-b border-gray-200 shadow-sm">
      <nav className="max-w-6xl mx-auto px-0 py-4 flex items-center justify-between">

        {/* LOGO */}
        <Link
          href="/"
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
          <Link href="/models" className="hover:text-[#3BAFDA] transition">
            Models
          </Link>
          <Link href="/pricing" className="hover:text-[#3BAFDA] transition">
            Pricing
          </Link>
          <Link href="/about" className="hover:text-[#3BAFDA] transition">
            About
          </Link>
        </div>

        {/* DESKTOP CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/signup"
            className="
              px-4 py-2 rounded-lg bg-[#3BAFDA] text-[#1B3C53]
              font-semibold text-sm hover:bg-[#3BAFDA]/90 transition
            "
          >
            Sign Up
          </Link>
        </div>
      </nav>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden px-4 pb-4 space-y-3 text-sm font-medium text-[#1B3C53] bg-white border-b border-gray-200">
          <Link href="/models" className="block hover:text-[#3BAFDA]">
            Models
          </Link>
          <Link href="/pricing" className="block hover:text-[#3BAFDA]">
            Pricing
          </Link>
          <Link href="/about" className="block hover:text-[#3BAFDA]">
            About
          </Link>

          <Link
            href="/signup"
            className="
              inline-block px-4 py-2 rounded-lg mt-2
              bg-[#3BAFDA] text-[#1B3C53] font-semibold
              hover:bg-[#3BAFDA]/90 transition
            "
          >
            Sign Up
          </Link>
        </div>
      )}
    </header>
  );
}
