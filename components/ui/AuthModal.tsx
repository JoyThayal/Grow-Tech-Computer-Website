"use client";

import { X } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  pendingUrl: string;
  brandName?: string;
}

export default function AuthModal({
  isOpen,
  onClose,
  pendingUrl,
  brandName = "GROW TECH",
}: AuthModalProps) {
  if (!isOpen) return null;

  const supabase = createClient();

  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(pendingUrl)}`,
      },
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 backdrop-blur-md p-4">
      <div className="relative w-full max-w-md rounded-3xl bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border border-white/40 dark:border-slate-800/60 p-8 shadow-2xl shadow-slate-950/20 space-y-6">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/60 dark:bg-slate-800/60 hover:bg-white dark:hover:bg-slate-800 flex items-center justify-center text-slate-500 hover:text-slate-800 dark:hover:text-white transition shadow-sm cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header Section */}
        <div className="space-y-3 text-center">
          <span className="inline-block px-3.5 py-1 rounded-full text-[10px] font-mono tracking-widest text-[#cb784a] bg-[#cb784a]/10 border border-[#cb784a]/20 uppercase">
            {brandName} Security Check
          </span>
          <h3 className="text-2xl font-black text-slate-800 dark:text-white tracking-tight">
            Please Sign In ✨
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed max-w-xs mx-auto">
            Quickly sign in with your Google account to securely book your
            service slot at our Barrackpore center.
          </p>
        </div>

        {/* Google Login Button */}
        <button
          onClick={handleGoogleLogin}
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
      </div>
    </div>
  );
}
