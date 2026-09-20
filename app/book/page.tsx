"use client";

import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, Suspense, useEffect } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Clock,
  User,
  Phone,
  MessageSquare,
  CheckCircle2,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import AuthModal from "@/components/ui/AuthModal";
import ServiceCategoryModal from "@/components/ui/ServiceCategoryModal";

function BookingCanvas() {
  const params = useSearchParams();
  const router = useRouter();
  const supabase = createClient();

  const [loading, setLoading] = useState(true);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const service = params.get("service");
  const issue = params.get("issue");
  const category = params.get("category");
  const exactPrice = params.get("price"); // সরাসরি কার্ড থেকে পাঠানো সঠিক দাম

  // অ্যাসাইন করা ডেট ও সময় (Display-only)
  const assignedDay = "Monday, 14 Sept 2026";
  const assignedSlot = "04:00 PM - 05:00 PM";

  useEffect(() => {
    const verifyUserAndParams = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        setShowLoginModal(true);
        setLoading(false);
        return;
      }

      const user = session.user;
      setName(user.user_metadata?.full_name || user.user_metadata?.name || "");
      setEmail(user.email || "");

      if (!service || !category) {
        setShowCategoryModal(true);
      }

      setLoading(false);
    };

    verifyUserAndParams();
  }, [supabase, service, category]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center text-slate-500 font-mono text-xs">
        Verifying secure session... 🔒
      </div>
    );
  }

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Slot booked successfully at Grow Tech!");
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-100 via-[#e6ecf2] to-slate-200 text-slate-700 flex flex-col justify-between font-sans px-6 md:px-16 lg:px-24 py-10 selection:bg-[#cb784a] selection:text-white relative overflow-hidden">
      {/* Background Frosted Glow Accents */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-[#cb784a]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Nav */}
      <header className="relative z-10 flex items-center justify-between border-b border-slate-300/80 pb-6 max-w-5xl mx-auto w-full">
        <Link
          href="/"
          className="group inline-flex items-center gap-2 text-xs font-mono text-slate-500 hover:text-slate-800 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
          <span>BACK TO HOME</span>
        </Link>
        <span className="text-xs font-mono tracking-wider text-slate-600 uppercase bg-white/60 backdrop-blur-md border border-white/40 shadow-sm px-4 py-1.5 rounded-full">
          Grow Tech · Desk Priority
        </span>
      </header>

      {/* Main Booking Form */}
      <main className="relative z-10 max-w-3xl mx-auto w-full py-10 md:py-14 space-y-10">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#cb784a]/10 border border-[#cb784a]/30 text-[#cb784a] text-xs font-mono">
            DIRECT COUNTER INTAKE
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight text-slate-800 uppercase leading-tight">
            Confirm Your <span className="text-[#cb784a]">Service Request</span>
          </h1>

          {/* Selected Service, Issue & Exact Price Recap */}
          <div className="p-5 rounded-3xl bg-white/70 backdrop-blur-xl border border-white/60 shadow-xl shadow-slate-300/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
            <div className="space-y-1">
              <span className="text-slate-400 font-mono uppercase block text-[11px]">
                Selected Module:
              </span>
              <span className="text-slate-800 font-bold text-sm">
                {service || "General Inspection"}
              </span>
            </div>
            <div className="sm:text-right space-y-1">
              <span className="text-slate-400 font-mono uppercase block text-[11px]">
                Target Issue / Task & Exact Price:
              </span>
              <div className="flex flex-wrap items-center gap-2 sm:justify-end">
                <span className="text-[#cb784a] font-mono bg-[#cb784a]/10 px-2.5 py-1 rounded-md border border-[#cb784a]/20 font-medium">
                  {issue || "Standard Checkup"}
                </span>
                {/* হুবহু কার্ডের দাম এখানে শো করবে */}
                <span className="text-emerald-700 font-mono font-bold bg-emerald-500/10 px-3 py-1 rounded-md border border-emerald-500/20 shadow-sm text-sm">
                  {exactPrice ? decodeURIComponent(exactPrice) : "₹100"}
                </span>
              </div>
            </div>
          </div>

          {/* Assigned Date & Time Display Box */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-white/60 backdrop-blur-lg border border-white/50 shadow-md flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#cb784a]/10 border border-[#cb784a]/20 flex items-center justify-center text-[#cb784a] shrink-0">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
                  Assigned Date
                </span>
                <span className="text-sm font-bold text-slate-800">
                  {assignedDay}
                </span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/60 backdrop-blur-lg border border-white/50 shadow-md flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#cb784a]/10 border border-[#cb784a]/20 flex items-center justify-center text-[#cb784a] shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
                  Assigned Time Window
                </span>
                <span className="text-sm font-bold text-slate-800">
                  {assignedSlot}
                </span>
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleBookingSubmit} className="space-y-8">
          {/* User Details */}
          <div className="space-y-4">
            <label className="text-xs font-mono uppercase tracking-wider text-slate-600 block">
              Contact Information
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <span className="text-xs text-slate-600 font-medium flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-[#cb784a]" /> Your Name
                  (Google)
                </span>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full bg-white/80 backdrop-blur-md border border-slate-200 focus:border-[#cb784a] rounded-2xl px-4 py-3.5 text-sm text-slate-800 outline-none transition-all shadow-inner"
                />
              </div>

              <div className="space-y-1.5">
                <span className="text-xs text-slate-600 font-medium flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-[#cb784a]" /> WhatsApp /
                  Phone Number
                </span>
                <input
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  className="w-full bg-white/80 backdrop-blur-md border border-slate-200 focus:border-[#cb784a] rounded-2xl px-4 py-3.5 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition-all shadow-inner"
                />
              </div>
            </div>

            <div className="space-y-1.5 pt-2">
              <span className="text-xs text-slate-600 font-medium flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-[#cb784a]" />{" "}
                Additional Note (Optional)
              </span>
              <textarea
                rows={3}
                placeholder="Write any specific details about your device or document..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full bg-white/80 backdrop-blur-md border border-slate-200 focus:border-[#cb784a] rounded-2xl px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition-all shadow-inner resize-none"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="group w-full sm:w-auto min-w-70 flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-[#cb784a] hover:bg-[#b5673d] text-white font-bold text-sm transition-all duration-300 shadow-xl shadow-[#cb784a]/25 active:scale-[0.98] cursor-pointer"
            >
              <span>Confirm Service Request</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </form>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-300/80 pt-6 max-w-5xl mx-auto w-full flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
        <span>BARRACKPORE CENTER · NO ADVANCE FEES</span>
        <div className="flex items-center gap-2 text-slate-700">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Pay at shop counter upon completion</span>
        </div>
      </footer>

      {/* 1. Login Modal */}
      <AuthModal
        isOpen={showLoginModal}
        onClose={() => router.push("/")}
        pendingUrl={typeof window !== "undefined" ? window.location.href : ""}
        brandName="GROW TECH SECURE"
      />

      {/* 2. Service Category Choice Modal */}
      <ServiceCategoryModal isOpen={showCategoryModal} />
    </div>
  );
}

export default function BookingPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-100" />}>
      <BookingCanvas />
    </Suspense>
  );
}
