"use client";

import { useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import AuthCard from "../components/AuthCard";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const inputClass =
    "w-full rounded-lg border bg-white px-4 py-2 text-sm " +
    "border-[#E3E3E3] " +
    "focus:outline-none focus:ring-2 focus:ring-[#1B3C53]/30 " +
    "focus:border-[#1B3C53]";

  const primaryButton =
    "w-full rounded-lg py-2.5 text-white font-medium transition " +
    "bg-[#1B3C53] hover:bg-[#234C6A] disabled:opacity-60";

  async function signIn() {
    setError(null);
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setError(error.message);
    } else {
      window.location.replace("/models/catalog");
    }
  }

  async function signInWithOAuth(provider: "google" | "github") {
    setLoading(true);

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
        subtitle="Welcome back. Sign in to manage your models."
      >
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
              disabled={loading}
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label className="text-sm text-[#456882]">
              Password
            </label>
            <input
              type="password"
              className={inputClass}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              disabled={loading}
            />
          </div>

          {/* FORGOT PASSWORD */}
          <div className="text-right">
            <Link
              href="/auth/forgot-password"
              className="text-sm text-[#456882] hover:text-[#1B3C53] hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          {/* ERROR */}
          {error && (
            <p className="text-sm text-red-600">
              {error}
            </p>
          )}

          {/* PRIMARY BUTTON */}
          <button
            onClick={signIn}
            className={primaryButton}
            disabled={loading}
          >
            {loading ? "Signing in…" : "Log In"}
          </button>

          {/* OAUTH DIVIDER */}
          <div className="flex items-center gap-3 my-4">
            <div className="flex-1 h-px bg-[#E3E3E3]" />
            <span className="text-xs text-[#456882]">
              or continue with
            </span>
            <div className="flex-1 h-px bg-[#E3E3E3]" />
          </div>

          {/* GOOGLE SIGN IN */}
          <button
            onClick={() => signInWithOAuth("google")}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 rounded-lg 
                       border border-[#E3E3E3] py-2.5 text-sm
                       bg-white hover:bg-gray-50 transition disabled:opacity-60"
          >
            <GoogleIcon />
            Continue with Google
          </button>

          {/* FOOTER */}
          <p className="text-sm text-center text-[#456882]">
            <Link
              href="/auth/sign-up"
              className="text-[#234C6A] hover:underline font-medium"
            >
              Don’t have an account? Sign up
            </Link>
          </p>
        </div>
      </AuthCard>
  );
}

/* ---------------------------------------------
   Google Icon (official-style)
--------------------------------------------- */

function GoogleIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 48 48"
      aria-hidden
    >
      <path
        fill="#EA4335"
        d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.42 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.24 17.74 9.5 24 9.5z"
      />
      <path
        fill="#4285F4"
        d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.94-2.26 5.43-4.78 7.11l7.73 6c4.51-4.18 7.09-10.36 7.09-17.58z"
      />
      <path
        fill="#FBBC05"
        d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
      />
      <path
        fill="#34A853"
        d="M24 48c6.48 0 11.93-2.13 15.91-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.18 2.3-6.26 0-11.57-3.74-13.47-8.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
      />
    </svg>
  );
}
