"use client";

import { useState } from "react";
import {
  X,
  Mail,
  Lock,
  ArrowRight,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  pendingUrl?: string;
  brandName?: string;
}

export default function AuthModal({
  isOpen,
  onClose,
  pendingUrl,
  brandName = "GROW TECH",
}: AuthModalProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"signup" | "login">("signup");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const supabase = createClient();

  const redirectTarget =
    pendingUrl && pendingUrl.trim() !== ""
      ? pendingUrl
      : `${window.location.origin}/`;

  // ১. গুগল দিয়ে সরাসরি সাইন ইন
  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(redirectTarget)}`,
      },
    });
  };

  // ২. ইমেইল ও পাসওয়ার্ড দিয়ে সাইন আপ (লিঙ্ক ভেরিফিকেশন) অথবা লগইন
  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    try {
      if (mode === "signup") {
        // সাইন আপ: ইমেইলে কনফার্মেশন লিঙ্ক পাঠানো হবে
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(redirectTarget)}`,
          },
        });

        if (error) {
          setErrorMsg(error.message);
        } else {
          setIsSubmitted(true);
        }
      } else {
        // লগইন: সরাসরি ইমেইল ও পাসওয়ার্ড দিয়ে সাইন ইন
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          setErrorMsg(error.message);
        } else if (data.session) {
          window.location.href = redirectTarget;
        }
      }
    } catch (err: unknown) {
      setErrorMsg(
        err instanceof Error ? err.message : "Authentication process failed!",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-md p-4 overflow-y-auto">
      <div className="relative w-full max-w-md rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 md:p-8 shadow-2xl space-y-6 my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          type="button"
          aria-label="Close modal"
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center justify-center text-slate-500 hover:text-slate-800 dark:hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* লিঙ্ক পাঠানোর পর সাকসেস মেসেজ স্ক্রিন */}
        {isSubmitted ? (
          <div className="space-y-5 text-center py-4">
            <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-7 h-7" />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                Verify Your Email 📩
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed max-w-xs mx-auto">
                We have sent a verification link to:
                <br />
                <span className="font-mono font-bold text-slate-800 dark:text-slate-200">
                  {email}
                </span>
              </p>
              <p className="text-[11px] text-slate-500 leading-relaxed pt-2">
                Please check your inbox (or spam folder) and click the link to
                activate your account.
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                setIsSubmitted(false);
                setMode("login");
              }}
              className="w-full py-3 px-4 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs transition cursor-pointer"
            >
              Back to Sign In
            </button>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="space-y-2 text-center">
              <span className="inline-block px-3.5 py-1 rounded-full text-[10px] font-mono tracking-widest text-[#cb784a] bg-[#cb784a]/10 border border-[#cb784a]/20 uppercase font-semibold">
                {brandName} Direct Desk
              </span>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                {mode === "signup" ? "Create an Account ✨" : "Welcome Back 👋"}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed max-w-xs mx-auto">
                {mode === "signup"
                  ? "Enter your email & password to register. We will send a confirmation link."
                  : "Sign in with your email and password to proceed."}
              </p>
            </div>

            {/* Google Login */}
            <button
              onClick={handleGoogleLogin}
              type="button"
              className="w-full py-3 px-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-100 font-semibold text-xs tracking-wide hover:bg-slate-50 dark:hover:bg-slate-700/70 hover:border-slate-400 dark:hover:border-slate-600 active:scale-[0.98] transition-all shadow-sm flex items-center justify-center gap-3 cursor-pointer"
            >
              <svg
                className="w-4 h-4 shrink-0"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  fill="#EA4335"
                />
              </svg>
              <span>Continue with Google</span>
            </button>

            <div className="flex items-center gap-4 text-xs text-slate-400 uppercase font-mono">
              <div className="h-px bg-slate-200 dark:bg-slate-800 flex-1" />
              <span>Or Use Credentials</span>
              <div className="h-px bg-slate-200 dark:bg-slate-800 flex-1" />
            </div>

            {/* এরর মেসেজ বক্স */}
            {errorMsg && (
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-500 text-xs text-center font-medium">
                {errorMsg}
              </div>
            )}

            {/* ইমেইল ও পাসওয়ার্ড ফর্ম */}
            <form onSubmit={handleAuthSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <span className="text-xs text-slate-600 dark:text-slate-300 font-medium flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-[#cb784a]" /> Email Address
                </span>
                <input
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-[#cb784a] rounded-xl px-4 py-3 text-xs text-slate-800 dark:text-white outline-none transition shadow-inner"
                />
              </div>

              <div className="space-y-1.5">
                <span className="text-xs text-slate-600 dark:text-slate-300 font-medium flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-[#cb784a]" /> Password
                </span>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  minLength={6}
                  required
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-[#cb784a] rounded-xl px-4 py-3 text-xs text-slate-800 dark:text-white outline-none transition shadow-inner"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-4 rounded-xl bg-[#cb784a] hover:bg-[#b5673d] text-white font-bold text-xs tracking-wide transition-all shadow-md shadow-[#cb784a]/20 flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98] disabled:opacity-50"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <span>
                      {mode === "signup"
                        ? "Send Verification Link"
                        : "Sign In to Account"}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              {/* মোড সুইচ বাটন (Sign Up <-> Login) */}
              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setMode((prev) => (prev === "signup" ? "login" : "signup"));
                    setErrorMsg("");
                  }}
                  className="text-xs text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition cursor-pointer"
                >
                  {mode === "signup" ? (
                    <>
                      Already have an account?{" "}
                      <span className="font-bold text-[#cb784a]">Sign In</span>
                    </>
                  ) : (
                    <>
                      Don&apos;t have an account?{" "}
                      <span className="font-bold text-[#cb784a]">
                        Create Account
                      </span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
