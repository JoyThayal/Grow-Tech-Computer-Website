"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import {
  User,
  Phone,
  Mail,
  Loader2,
  Save,
  LogOut,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";

export default function ProfilePage() {
  const router = useRouter();
  const supabase = createClient();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [statusMessage, setStatusMessage] = useState<{
    text: string;
    type: "success" | "error";
  } | null>(null);

  useEffect(() => {
    async function loadUserData() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        // User login na thakle home page-e redirect korbe
        router.push("/");
        return;
      }

      setEmail(user.email ?? "");
      setFullName(
        user.user_metadata?.full_name ?? user.user_metadata?.name ?? "",
      );
      setPhone(user.user_metadata?.phone ?? "");
      setLoading(false);
    }

    loadUserData();
  }, [router, supabase]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setStatusMessage(null);

    const { error } = await supabase.auth.updateUser({
      data: {
        full_name: fullName,
        phone: phone,
      },
    });

    if (error) {
      setStatusMessage({ text: error.message, type: "error" });
    } else {
      setStatusMessage({
        text: "Profile updated successfully! ✨",
        type: "success",
      });
    }

    setSaving(false);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950 text-white">
        <Loader2 className="w-9 h-9 animate-spin text-cyan-400 mb-3" />
        <p className="text-xs font-mono tracking-widest text-slate-400 uppercase">
          Loading Account...
        </p>
      </div>
    );
  }

  // Profile-er avatar letter
  const avatarLetter = (fullName?.[0] || email?.[0] || "U").toUpperCase();

  return (
    <main className="min-h-screen pt-28 pb-16 px-4 bg-[#060913] text-slate-100 flex items-center justify-center relative overflow-hidden">
      {/* Background Soft Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-lg bg-slate-900/90 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 sm:p-9 shadow-2xl relative z-10">
        {/* Top Bar: Back to Home & Logout */}
        <div className="flex items-center justify-between pb-6 border-b border-white/10">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-cyan-300 transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
          </Link>
          <button
            onClick={handleSignOut}
            className="flex items-center gap-1.5 text-xs text-rose-400 hover:text-rose-300 bg-rose-500/10 hover:bg-rose-500/20 px-3 py-1.5 rounded-full border border-rose-500/20 transition cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" /> Log Out
          </button>
        </div>

        {/* User Identity Header */}
        <div className="flex items-center gap-4 pt-6 pb-4">
          <div className="w-14 h-14 rounded-2xl bg-slate-800 border-2 border-cyan-400/40 flex items-center justify-center text-cyan-400 font-bold text-xl shadow-lg shadow-cyan-500/10">
            {avatarLetter}
          </div>
          <div>
            <h1 className="text-lg sm:text-xl font-bold text-white tracking-tight">
              {fullName || "User Account"}
            </h1>
            <p className="text-xs text-slate-400">{email}</p>
          </div>
        </div>

        {/* Status Alert Notification */}
        {statusMessage && (
          <div
            className={`mt-3 p-3.5 rounded-2xl text-xs font-medium flex items-center gap-2.5 transition-all ${
              statusMessage.type === "success"
                ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/25"
                : "bg-rose-500/10 text-rose-400 border border-rose-500/25"
            }`}
          >
            {statusMessage.type === "success" ? (
              <CheckCircle2 className="w-4 h-4 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 shrink-0" />
            )}
            <span>{statusMessage.text}</span>
          </div>
        )}

        {/* Form Inputs */}
        <form onSubmit={handleUpdateProfile} className="space-y-4 mt-6">
          {/* Email Field (Read Only) */}
          <div className="space-y-1.5">
            <label className="text-xs text-slate-400 font-medium flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-cyan-400" /> Account Email
            </label>
            <input
              type="email"
              value={email}
              disabled
              className="w-full bg-white/5 border border-white/5 rounded-2xl px-4 py-3 text-xs sm:text-sm text-slate-400 cursor-not-allowed outline-none select-none"
            />
          </div>

          {/* Full Name Input */}
          <div className="space-y-1.5">
            <label className="text-xs text-slate-300 font-medium flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-cyan-400" /> Full Name
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter your full name"
              required
              className="w-full bg-white/5 border border-white/10 focus:border-cyan-400 rounded-2xl px-4 py-3 text-xs sm:text-sm text-white placeholder:text-slate-500 outline-none transition-all shadow-inner"
            />
          </div>

          {/* Phone Number Input */}
          <div className="space-y-1.5">
            <label className="text-xs text-slate-300 font-medium flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-cyan-400" /> WhatsApp / Contact
              Number
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="e.g. +91 98765 43210"
              className="w-full bg-white/5 border border-white/10 focus:border-cyan-400 rounded-2xl px-4 py-3 text-xs sm:text-sm text-white placeholder:text-slate-500 outline-none transition-all shadow-inner"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-3">
            <button
              type="submit"
              disabled={saving}
              className="w-full flex items-center justify-center gap-2 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold py-3.5 rounded-2xl text-sm transition-all duration-300 shadow-lg shadow-cyan-400/20 active:scale-[0.98] disabled:opacity-60 cursor-pointer"
            >
              {saving ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <Save className="w-4 h-4" /> Save Profile Details
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
