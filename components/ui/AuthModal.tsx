"use client";

import { useState } from "react";
import {
  X,
  Mail,
  KeyRound,
  ArrowRight,
  Loader2,
  RefreshCw,
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
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"email" | "otp">("email");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const supabase = createClient();

  const redirectTarget =
    pendingUrl && pendingUrl.trim() !== ""
      ? pendingUrl
      : `${window.location.origin}/`;

  // ১. গুগল দিয়ে সাইন ইন
  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(redirectTarget)}`,
      },
    });
  };

  // ২. ইমেইলে ওটিপি পাঠানোর লজিক
  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          shouldCreateUser: true,
        },
      });

      if (error) {
        setErrorMsg(error.message);
      } else {
        setStep("otp");
      }
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : "Failed to send code!");
    } finally {
      setLoading(false);
    }
  };

  // ৩. ওটিপি ভেরিফাই করে লগইন সম্পন্ন করা
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.verifyOtp({
        email,
        token: otp.trim(),
        type: "email",
      });

      if (error) {
        setErrorMsg(error.message);
      } else if (data.session) {
        window.location.href = redirectTarget;
      }
    } catch (err: unknown) {
      setErrorMsg(
        err instanceof Error ? err.message : "Invalid verification code!",
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

        {/* Header */}
        <div className="space-y-2 text-center">
          <span className="inline-block px-3.5 py-1 rounded-full text-[10px] font-mono tracking-widest text-[#cb784a] bg-[#cb784a]/10 border border-[#cb784a]/20 uppercase font-semibold">
            {brandName} Direct Desk
          </span>
          <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            {step === "email" ? "Instant Sign In ✨" : "Enter Email Code 📩"}
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed max-w-xs mx-auto">
            {step === "email"
              ? "Login with Google or enter your email address to sign in."
              : `Enter the code we just sent to: ${email}`}
          </p>
        </div>

        {/* Google Login (শুধু প্রথম ধাপে প্রদর্শিত হবে) */}
        {step === "email" && (
          <>
            <button
              onClick={handleGoogleLogin}
              type="button"
              className="w-full py-3 px-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-100 font-semibold text-xs tracking-wide hover:bg-slate-50 dark:hover:bg-slate-700/70 hover:border-slate-400 dark:hover:border-slate-600 active:scale-[0.98] transition-all shadow-sm flex items-center justify-center gap-3 cursor-pointer"
            >
              {/* হাই-কোয়ালিটি অফিসিয়াল গুগল আইকন */}
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
              <span>Or Email Code</span>
              <div className="h-px bg-slate-200 dark:bg-slate-800 flex-1" />
            </div>
          </>
        )}

        {/* এরর মেসেজ বক্স */}
        {errorMsg && (
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-500 text-xs text-center font-medium">
            {errorMsg}
          </div>
        )}

        {/* ধাপ ১: ইমেইল ইনপুট */}
        {step === "email" ? (
          <form onSubmit={handleSendOtp} className="space-y-4">
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

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-4 rounded-xl bg-[#cb784a] hover:bg-[#b5673d] text-white font-bold text-xs tracking-wide transition-all shadow-md shadow-[#cb784a]/20 flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98] disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <span>Send OTP Code</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        ) : (
          /* ধাপ ২: ওটিপি কোড ইনপুট */
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <div className="space-y-1.5">
              <span className="text-xs text-slate-600 dark:text-slate-300 font-medium flex items-center gap-1.5">
                <KeyRound className="w-3.5 h-3.5 text-[#cb784a]" /> 6-Digit OTP
                Code
              </span>
              <input
                type="text"
                maxLength={6}
                placeholder="123456"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
                className="w-full tracking-widest text-center text-lg font-mono font-bold bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-[#cb784a] rounded-xl px-4 py-3 text-slate-800 dark:text-white outline-none transition shadow-inner"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs tracking-wide transition-all shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98] disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <span>Verify & Proceed</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <div className="text-center pt-1">
              <button
                type="button"
                onClick={() => {
                  setStep("email");
                  setOtp("");
                  setErrorMsg("");
                }}
                className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 dark:hover:text-slate-300 transition-colors cursor-pointer"
              >
                <RefreshCw className="w-3 h-3" /> Change Email
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
