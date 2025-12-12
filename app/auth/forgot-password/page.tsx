"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import AuthCard from "../components/AuthCard";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const inputClass =
    "w-full rounded-lg border border-gray-300 px-4 py-2 text-sm " +
    "focus:outline-none focus:ring-2 focus:ring-[#ebb700]/60 " +
    "focus:border-[#ebb700]";

  const primaryButton =
    "w-full rounded-lg bg-[#00338d] py-2.5 text-white font-medium " +
    "hover:bg-[#002a73] transition";

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
    >
      {!sent ? (
        <div className="space-y-4">
          <input
            className={inputClass}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
          />

          <button onClick={sendReset} className={primaryButton}>
            Send reset link
          </button>
        </div>
      ) : (
        <p className="text-sm text-[#55565a]">
          Check your email for a reset link.
        </p>
      )}
    </AuthCard>
  );
}
