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

  // ১. গুগল দিয়ে এক ক্লিকে লগইন
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 backdrop-blur-md p-4 overflow-y-auto">
      <div className="relative w-full max-w-md rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-white/40 dark:border-slate-800/60 p-6 md:p-8 shadow-2xl shadow-slate-950/20 space-y-6 my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/60 dark:bg-slate-800/60 hover:bg-white dark:hover:bg-slate-800 flex items-center justify-center text-slate-500 hover:text-slate-800 dark:hover:text-white transition shadow-sm cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="space-y-2 text-center">
          <span className="inline-block px-3.5 py-1 rounded-full text-[10px] font-mono tracking-widest text-[#cb784a] bg-[#cb784a]/10 border border-[#cb784a]/20 uppercase">
            {brandName} Direct Desk
          </span>
          <h3 className="text-2xl font-black text-slate-800 dark:text-white tracking-tight">
            {step === "email" ? "Instant Sign In ✨" : "Enter Email Code 📩"}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed max-w-xs mx-auto">
            {step === "email"
              ? "গুগল দিয়ে অথবা ইমেইলে সরাসরি ওটিপি কোড নিয়ে লগইন করুন।"
              : `আমরা একটি ৬ ডিজিটের কোড পাঠালাম: ${email}`}
          </p>
        </div>

        {/* Google Login (শুধু প্রথম স্টেপে দেখাবে) */}
        {step === "email" && (
          <>
            <button
              onClick={handleGoogleLogin}
              type="button"
              className="w-full py-3.5 px-4 rounded-2xl bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold text-xs tracking-wide border border-slate-200/80 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-750 active:scale-[0.98] transition shadow-md shadow-slate-200/50 dark:shadow-none flex items-center justify-center gap-3 cursor-pointer"
            >
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                <path
                  fill="#EA4335"
                  d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.8 14.8 1 12 1 7.5 1 3.7 3.6 1.8 7.3l3.7 2.9C6.4 7.2 9 5 12 5z"
                />
                <path
                  fill="#4285F4"
                  d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.5 14.8c-.2-.8-.4-1.7-.4-2.8s.2-2 .4-2.8L1.8 6.3C.7 8.5 0 10.2 0 12s.7 3.5 1.8 5.7l3.7-2.9z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.6-2.2-6.5-5.2L1.8 16c1.9 3.7 5.7 7 10.2 7z"
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

        {/* এরর মেসেজ */}
        {errorMsg && (
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-500 text-xs text-center font-medium">
            {errorMsg}
          </div>
        )}

        {/* ধাপ ১: ইমেইল ইনপুট ফর্ম */}
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
                className="w-full bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 focus:border-[#cb784a] rounded-xl px-4 py-3 text-xs text-slate-800 dark:text-white outline-none transition shadow-inner"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-4 rounded-xl bg-[#cb784a] hover:bg-[#b5673d] text-white font-bold text-xs tracking-wide transition shadow-lg shadow-[#cb784a]/20 flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98] disabled:opacity-50"
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
          /* ধাপ ২: ৬ ডিজিটের ওটিপি ইনপুট ফর্ম */
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
                className="w-full tracking-widest text-center text-lg font-mono font-bold bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 focus:border-[#cb784a] rounded-xl px-4 py-3 text-slate-800 dark:text-white outline-none transition shadow-inner"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs tracking-wide transition shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98] disabled:opacity-50"
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
                className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 dark:hover:text-slate-300 transition-colors"
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
