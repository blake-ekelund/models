"use client";

import { useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import AuthCard from "../components/AuthCard";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const inputClass =
    "w-full rounded-lg border bg-white px-4 py-2 text-sm " +
    "border-[#E3E3E3] " +
    "focus:outline-none focus:ring-2 focus:ring-[#1B3C53]/30 " +
    "focus:border-[#1B3C53]";

  const primaryButton =
    "w-full rounded-lg py-2.5 text-white font-medium transition " +
    "bg-[#1B3C53] hover:bg-[#234C6A]";

  async function sendReset() {
    await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${location.origin}/auth/callback`,
    });
    setSent(true);
  }

  return (
    <AuthCard
      title="Reset Password"
      subtitle="We’ll send you a link to reset your password."
      topLeft={
        <Link
          href="/"
          className="text-sm text-[#456882] hover:text-[#1B3C53] hover:underline"
        >
          ← Home
        </Link>
      }
    >
      {!sent ? (
        <div className="space-y-4">
          {/* EMAIL */}
          <div>
            <label className="text-sm text-[#456882]">
              Email
            </label>
            <input
              className={inputClass}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
          </div>

          {/* SUBMIT */}
          <button onClick={sendReset} className={primaryButton}>
            Send reset link
          </button>

          {/* NAV BACK */}
          <div className="pt-2 text-center">
            <Link
              href="/auth/sign-in"
              className="text-sm text-[#456882] hover:text-[#1B3C53] hover:underline"
            >
              Back to sign in
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-4 text-center">
          <p className="text-sm text-[#456882]">
            Check your email for a reset link.
          </p>

          <div className="pt-2">
            <Link
              href="/auth/sign-in"
              className="text-sm text-[#456882] hover:text-[#1B3C53] hover:underline"
            >
              Return to sign in
            </Link>
          </div>

          <div className="text-sm text-[#456882]">
            Don’t have an account?{" "}
            <Link
              href="/auth/sign-up"
              className="text-[#234C6A] hover:underline font-medium"
            >
              Sign up
            </Link>
          </div>
        </div>
      )}
    </AuthCard>
  );
}
