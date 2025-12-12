"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import AuthCard from "../components/AuthCard";

export default function SignUpPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const inputClass =
    "w-full rounded-lg border border-gray-300 px-4 py-2 text-sm " +
    "focus:outline-none focus:ring-2 focus:ring-[#ebb700]/60 " +
    "focus:border-[#ebb700]";

  const primaryButton =
    "w-full rounded-lg bg-[#00338d] py-2.5 text-white font-medium " +
    "hover:bg-[#002a73] transition";
    
  async function signUp() {
    setError(null);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    });
    if (error) setError(error.message);
    else router.push("/models/catalog");
  }

  return (
    <AuthCard
      title="Create an Account"
      subtitle="Sign up to start building and managing financial models."
    >
      <div className="space-y-4">
        <div>
          <label className="text-sm text-[#55565a]">Email</label>
          <input
            className={inputClass}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label className="text-sm text-[#55565a]">Password</label>
          <input
            type="password"
            className={inputClass}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {error && (
          <p className="text-sm text-red-600">{error}</p>
        )}

        <button onClick={signUp} className={primaryButton}>
          Sign Up
        </button>

        <p className="text-sm text-center text-[#55565a]">
          Already have an account?{" "}
          <a
            href="/auth/sign-in"
            className="text-[#ebb700] hover:underline"
          >
            Log in
          </a>
        </p>
      </div>
    </AuthCard>
  );
}
