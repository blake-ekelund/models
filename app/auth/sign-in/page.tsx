"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import AuthCard from "../components/AuthCard";

export default function SignInPage() {
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

  async function signIn() {
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      router.push("/models/catalog");
    }
  }

  async function signInWithOAuth(provider: "google" | "github") {
    await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
  }

  return (
    <AuthCard
      title="Log In"
      subtitle="Welcome back! Sign in to view and manage your models."
    >
      <div className="space-y-4">
        {/* EMAIL */}
        <div>
          <label className="text-sm text-[#55565a]">Email</label>
          <input
            className={inputClass}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
          />
        </div>

        {/* PASSWORD */}
        <div>
          <label className="text-sm text-[#55565a]">Password</label>
          <input
            type="password"
            className={inputClass}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* FORGOT PASSWORD */}
        <div className="text-right">
          <a
            href="/auth/forgot-password"
            className="text-sm text-[#ebb700] hover:underline"
          >
            Forgot password?
          </a>
        </div>

        {/* ERROR */}
        {error && (
          <p className="text-sm text-red-600">{error}</p>
        )}

        {/* PRIMARY BUTTON */}
        <button onClick={signIn} className={primaryButton}>
          Log In
        </button>

        {/* OAUTH DIVIDER */}
        <div className="flex items-center gap-3 my-4">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-xs text-[#55565a]">
            or continue with
          </span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {/* OAUTH BUTTONS */}
        <button
          onClick={() => signInWithOAuth("google")}
          className="w-full rounded-lg border border-gray-300 py-2.5 text-sm
                     hover:bg-gray-50 transition"
        >
          Continue with Google
        </button>

        {/* FOOTER */}
        <p className="text-sm text-center text-[#55565a]">
          Don’t have an account?{" "}
          <a
            href="/auth/sign-up"
            className="text-[#ebb700] hover:underline"
          >
            Sign up
          </a>
        </p>
      </div>
    </AuthCard>
  );
}
