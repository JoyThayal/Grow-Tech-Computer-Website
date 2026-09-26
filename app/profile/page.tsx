"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useGeolocation } from "@/components/hooks/useGeolocation";
import {
  User,
  Phone,
  Mail,
  MapPin,
  Loader2,
  Save,
  LogOut,
  ArrowLeft,
  Navigation,
  ExternalLink,
  ArrowRight

} from "lucide-react";
import Link from "next/link";

export default function ProfilePage() {
  const router = useRouter();
  const supabase = createClient();
  const { getCoordinates, detecting } = useGeolocation();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    email: "",
    fullName: "",
    phone: "",
    location: "",
  });
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(
    null,
  );
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) return router.push("/");
      setForm({
        email: user.email || "",
        fullName: user.user_metadata?.full_name || "",
        phone: user.user_metadata?.phone || "",
        location: user.user_metadata?.location || "",
      });
      if (user.user_metadata?.latitude && user.user_metadata?.longitude) {
        setCoords({
          lat: user.user_metadata.latitude,
          lng: user.user_metadata.longitude,
        });
      }
      setLoading(false);
    });
  }, [router, supabase]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    // জিপিএস থাকলে এক্স্যাক্ট পিন লিঙ্ক, ম্যানুয়াল টেক্সট থাকলে সার্চ লিঙ্ক 🗺️
    let generatedMapsLink: string | null = null;
    if (coords) {
      generatedMapsLink = `https://www.google.com/maps?q=${coords.lat},${coords.lng}`;
    } else if (form.location.trim()) {
      generatedMapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        form.location.trim(),
      )}`;
    }

    const { error } = await supabase.auth.updateUser({
      data: {
        full_name: form.fullName,
        phone: form.phone,
        location: form.location,
        latitude: coords?.lat ?? null,
        longitude: coords?.lng ?? null,
        maps_link: generatedMapsLink,
      },
    });

    setStatus(
      error ? error.message : "Profile & location saved successfully! ✨",
    );
    setSaving(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
        <Loader2 className="w-8 h-8 animate-spin text-cyan-400" />
      </div>
    );
  }

  // প্রিভিউ দেখানোর জন্য লিংক তৈরি
  const currentMapsUrl = coords
    ? `https://www.google.com/maps?q=${coords.lat},${coords.lng}`
    : form.location.trim()
      ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
          form.location.trim(),
        )}`
      : null;

  return (
    <main className="min-h-screen pt-28 pb-16 px-4 bg-[#060913] text-slate-100 flex items-center justify-center">
      <div className="w-full max-w-lg bg-slate-900/90 border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <Link
            href="/"
            className="flex items-center gap-1 text-xs text-slate-400 hover:text-cyan-300"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back
          </Link>
          <button
            onClick={() => supabase.auth.signOut().then(() => router.push("/"))}
            className="flex items-center gap-1 text-xs text-rose-400 bg-rose-500/10 hover:bg-rose-500/20 px-3 py-1.5 rounded-full transition cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" /> Log Out
          </button>
        </div>

        {/* Identity */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-slate-800 border border-cyan-400/40 flex items-center justify-center text-cyan-400 font-bold text-lg">
            {(form.fullName[0] || form.email[0] || "U").toUpperCase()}
          </div>
          <div>
            <h1 className="text-base font-bold text-white">
              {form.fullName || "User"}
            </h1>
            <p className="text-xs text-slate-400">{form.email}</p>
          </div>
        </div>

        {status && (
          <div className="p-3 text-xs rounded-xl bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
            {status}
          </div>
        )}
        {/* 📋 My Bookings Shortcut Card */}
        <div className="pt-2 pb-6 border-b border-white/10 mt-2">
          <Link
            href="/my-bookings"
            className="w-full flex items-center justify-between bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/25 px-4 py-3.5 rounded-2xl transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-cyan-500/20 rounded-xl text-cyan-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
                  <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                  <path d="M12 11h4" />
                  <path d="M12 16h4" />
                  <path d="M8 11h.01" />
                  <path d="M8 16h.01" />
                </svg>
              </div>
              <div className="text-left">
                <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                  My Service Bookings
                </h3>
                <p className="text-[11px] text-slate-400">
                  Track active services & past history
                </p>
              </div>
            </div>

            <ArrowRight className="w-4 h-4 text-cyan-400 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Form */}
        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <label className="text-xs text-slate-400 flex items-center gap-1 mb-1">
              <Mail className="w-3 h-3 text-cyan-400" /> Email
            </label>
            <input
              value={form.email}
              disabled
              className="w-full bg-white/5 rounded-xl px-4 py-2.5 text-xs text-slate-400 select-none cursor-not-allowed"
            />
          </div>

          <div>
            <label className="text-xs text-slate-300 flex items-center gap-1 mb-1">
              <User className="w-3 h-3 text-cyan-400" /> Full Name
            </label>
            <input
              value={form.fullName}
              onChange={(e) => setForm({ ...form, fullName: e.target.value })}
              required
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:border-cyan-400 outline-none"
            />
          </div>

          <div>
            <label className="text-xs text-slate-300 flex items-center gap-1 mb-1">
              <Phone className="w-3 h-3 text-cyan-400" /> WhatsApp / Phone
            </label>
            <input
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:border-cyan-400 outline-none"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs text-slate-300 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-cyan-400" /> Area / Location
              </label>
              <button
                type="button"
                onClick={() =>
                  getCoordinates(
                    ({ locationName, lat, lng }) => {
                      setForm((prev) => ({ ...prev, location: locationName }));
                      setCoords({ lat, lng });
                    },
                    (msg) => setStatus(msg),
                  )
                }
                disabled={detecting}
                className="text-[11px] text-cyan-400 hover:underline flex items-center gap-1 cursor-pointer"
              >
                {detecting ? (
                  <Loader2 className="w-3 h-3 animate-spin" />
                ) : (
                  <Navigation className="w-3 h-3" />
                )}
                Use GPS
              </button>
            </div>
            <input
              value={form.location}
              onChange={(e) => {
                setForm({ ...form, location: e.target.value });
                // ইউজার নিজে ম্যানুয়ালি লিখলে আগের জিপিএস কোঅর্ডিনেট রিসেট হয়ে যাবে
                setCoords(null);
              }}
              placeholder="e.g. Anandapuri, Barrackpore"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:border-cyan-400 outline-none"
            />

            {/* গুগল ম্যাপস লিঙ্ক প্রিভিউ (GPS অথবা ম্যানুয়াল উভয়ের জন্যই কাজ করবে) */}
            {currentMapsUrl && (
              <a
                href={currentMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] text-cyan-400 hover:underline mt-1.5 inline-flex items-center gap-1"
              >
                View Location on Google Maps{" "}
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>

          <button
            type="submit"
            disabled={saving}
            className="w-full bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold py-3 rounded-xl text-xs transition duration-200 cursor-pointer disabled:opacity-60"
          >
            {saving ? (
              <Loader2 className="w-4 h-4 animate-spin mx-auto" />
            ) : (
              <span className="flex items-center justify-center gap-1.5">
                <Save className="w-3.5 h-3.5" /> Save Changes
              </span>
            )}
          </button>
        </form>
      </div>
    </main>
  );
}
