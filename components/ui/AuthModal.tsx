"use client";

import { useState } from "react";
import {
  X,
  Mail,
  Lock,
  ArrowRight,
  Loader2,
  CheckCircle2,
  ShieldCheck,
  ChevronRight,
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
      : `${typeof window !== "undefined" ? window.location.origin : ""}/`;

  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(
          redirectTarget,
        )}`,
      },
    });
  };

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(
              redirectTarget,
            )}`,
          },
        });

        if (error) {
          setErrorMsg(error.message);
        } else {
          setIsSubmitted(true);
        }
      } else {
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md overflow-y-auto animate-in fade-in duration-300">
      {/* Background Ambient Glow */}
      <div className="absolute w-112.5 h-112.5 bg-linear-to-tr from-cyan-500/20 via-blue-500/15 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="relative w-full max-w-105 rounded-[28px] bg-white/95 backdrop-blur-2xl border border-slate-200/90 shadow-[0_25px_60px_-15px_rgba(15,23,42,0.25)] p-7 sm:p-8 space-y-6 my-auto overflow-hidden">
        {/* Subtle Top Accent Border */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-linear-to-r from-cyan-500 via-indigo-500 to-cyan-500" />

        {/* Close Button */}
        <button
          onClick={onClose}
          type="button"
          aria-label="Close modal"
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-400 hover:text-slate-700 flex items-center justify-center transition-all duration-200 hover:rotate-90 cursor-pointer shadow-xs"
        >
          <X className="w-4 h-4" />
        </button>

        {isSubmitted ? (
          /* Confirmation Screen */
          <div className="space-y-6 text-center py-4 animate-in zoom-in-95 duration-200">
            <div className="relative w-16 h-16 mx-auto">
              <div className="absolute inset-0 rounded-2xl bg-emerald-500/20 blur-lg animate-pulse" />
              <div className="relative w-16 h-16 rounded-2xl bg-emerald-50 border border-emerald-200/80 text-emerald-600 flex items-center justify-center shadow-inner">
                <CheckCircle2 className="w-8 h-8" />
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-black text-slate-900 tracking-tight">
                Check Your Inbox 📩
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed max-w-xs mx-auto">
                We sent a secure sign-in link to:
                <br />
                <span className="font-mono font-semibold text-slate-800 text-[13px] bg-slate-100 px-2 py-0.5 rounded-md inline-block mt-1.5 border border-slate-200">
                  {email}
                </span>
              </p>
              <p className="text-[11px] text-slate-400 pt-2">
                Click the confirmation link inside the email to immediately
                activate your account.
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                setIsSubmitted(false);
                setMode("login");
              }}
              className="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs tracking-wide transition-all shadow-md active:scale-[0.98] cursor-pointer"
            >
              Proceed to Sign In
            </button>
          </div>
        ) : (
          <>
            {/* Header with Segmented Pill Switcher */}
            <div className="space-y-4 pt-1">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono tracking-wider font-semibold text-cyan-800 bg-cyan-50 border border-cyan-200/80 uppercase">
                  <ShieldCheck className="w-3.5 h-3.5 text-cyan-600" />
                  {brandName} AUTH
                </span>
              </div>

              <div>
                <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                  {mode === "signup" ? "Get Started" : "Welcome Back"}
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  {mode === "signup"
                    ? "Create your Grow Tech profile in a few clicks."
                    : "Access your dashboard and service records."}
                </p>
              </div>

              {/* Segmented Mode Selector Tab */}
              <div className="grid grid-cols-2 p-1 bg-slate-100 rounded-xl border border-slate-200/80">
                <button
                  type="button"
                  onClick={() => {
                    setMode("signup");
                    setErrorMsg("");
                  }}
                  className={`py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                    mode === "signup"
                      ? "bg-white text-slate-900 shadow-xs"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  Create Account
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMode("login");
                    setErrorMsg("");
                  }}
                  className={`py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                    mode === "login"
                      ? "bg-white text-slate-900 shadow-xs"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  Sign In
                </button>
              </div>
            </div>

            {/* Google OAuth Button */}
            <button
              onClick={handleGoogleLogin}
              type="button"
              className="w-full py-3 px-4 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-semibold text-xs transition-all shadow-xs hover:shadow-sm active:scale-[0.98] flex items-center justify-center gap-2.5 cursor-pointer group"
            >
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
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
              <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
            </button>

            {/* Subtle Divider */}
            <div className="relative flex items-center justify-center">
              <div className="border-t border-slate-200 w-full" />
              <span className="bg-white px-3 text-[10px] uppercase font-mono tracking-widest text-slate-400">
                OR
              </span>
            </div>

            {errorMsg && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200/80 text-rose-600 text-xs text-center font-medium animate-in shake">
                {errorMsg}
              </div>
            )}

            {/* Email / Password Form */}
            <form onSubmit={handleAuthSubmit} className="space-y-3.5">
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-slate-600 flex items-center gap-1.5">
                  <Mail className="w-3 h-3 text-cyan-600" /> Work / Personal
                  Email
                </label>
                <input
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-slate-50/70 hover:bg-slate-50 focus:bg-white border border-slate-200 focus:border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 outline-none transition-all shadow-inner focus:ring-2 focus:ring-slate-800/10"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-slate-600 flex items-center gap-1.5">
                  <Lock className="w-3 h-3 text-cyan-600" /> Security Password
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  minLength={6}
                  required
                  className="w-full bg-slate-50/70 hover:bg-slate-50 focus:bg-white border border-slate-200 focus:border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 outline-none transition-all shadow-inner focus:ring-2 focus:ring-slate-800/10"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs tracking-wide transition-all shadow-md shadow-slate-900/15 active:scale-[0.98] disabled:opacity-60 flex items-center justify-center gap-2 cursor-pointer"
                >
                  {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <span>
                        {mode === "signup"
                          ? "Send Verification Email"
                          : "Sign In to Account"}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5" />
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
