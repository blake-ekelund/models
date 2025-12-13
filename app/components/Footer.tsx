import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-[#456882]/20">
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col sm:flex-row gap-6 sm:items-center sm:justify-between text-sm text-[#456882]">
        {/* LEFT */}
        <div>
          <span className="font-medium text-[#1B3C53]">Synario</span> ©{" "}
          {new Date().getFullYear()}
        </div>

        {/* RIGHT */}
        <div className="flex gap-6">
          <Link href="/pricing" className="hover:text-[#1B3C53] transition">
            Pricing
          </Link>
          <Link href="/about" className="hover:text-[#1B3C53] transition">
            About
          </Link>
          <Link href="/privacy" className="hover:text-[#1B3C53] transition">
            Privacy
          </Link>
          <Link href="/terms" className="hover:text-[#1B3C53] transition">
            Terms
          </Link>
        </div>
      </div>
    </footer>
  );
}
