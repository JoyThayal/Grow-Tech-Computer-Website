"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { useGeolocation } from "@/components/hooks/useGeolocation";
import VipCard from "@/app/profile/VipCard";
import {
  User,
  Phone,
  Mail,
  Loader2,
  Save,
  LogOut,
  ArrowLeft,
  Navigation,
  ExternalLink,
  ChevronRight,
  CalendarCheck,
  Compass,
} from "lucide-react";

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

    setStatus(error ? error.message : "Details updated successfully! ✨");
    setSaving(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f8fafc] flex flex-col items-center justify-center text-slate-500 font-mono text-xs">
        <Loader2 className="w-7 h-7 animate-spin text-slate-900 mb-2" />
        INITIALIZING ACCOUNT WORKSPACE...
      </div>
    );
  }

  const currentMapsUrl = coords
    ? `https://www.google.com/maps?q=${coords.lat},${coords.lng}`
    : form.location.trim()
      ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
          form.location.trim(),
        )}`
      : null;

  return (
    <main className="min-h-screen bg-[#f1f5f9] text-slate-800 py-25 px-4 sm:px-6 lg:px-12 font-sans">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Navigation Bar */}
        <div className="flex items-center justify-between bg-white px-5 py-3.5 rounded-2xl border border-slate-200/80 shadow-xs">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Home Workspace
          </Link>
          <div className="flex items-center gap-3">
            <span className="text-[11px] font-mono uppercase bg-slate-100 text-slate-600 px-3 py-1 rounded-lg border border-slate-200">
              Client: {form.email.split("@")[0]}
            </span>
            <button
              onClick={() =>
                supabase.auth.signOut().then(() => router.push("/"))
              }
              className="text-xs font-medium text-rose-600 hover:text-rose-700 bg-rose-50 px-3 py-1.5 rounded-lg border border-rose-100 transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" /> Exit
            </button>
          </div>
        </div>

        {/* 2-Column Split Dashboard Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: VIP Card & Bookings Hub */}
          <div className="lg:col-span-4 space-y-5">
            <VipCard
              fullName={form.fullName}
              email={form.email}
              location={form.location}
            />

            <Link
              href="/my-bookings"
              className="group block bg-white hover:bg-slate-50 border border-slate-200/90 rounded-2xl p-5 shadow-xs transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {/* 📁 আগের মতো সেইম স্টাইল ও আইকন */}
                  <div className="p-2.5 rounded-xl bg-slate-900 text-white group-hover:scale-105 transition-transform">
                    <CalendarCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-900">
                      My Service Bookings
                    </h3>
                    <p className="text-[11px] text-slate-500">
                      Track active services & booking history
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </div>

          {/* Right Column: Settings Form & Location Radar */}
          <div className="lg:col-span-8 bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <h2 className="text-base font-bold text-slate-900">
                Personal & Service Coordinates
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Keep your dispatch address and phone up to date for fast
                turnaround.
              </p>
            </div>

            {status && (
              <div className="p-3 text-xs rounded-xl bg-slate-900 text-white font-medium">
                {status}
              </div>
            )}

            <form onSubmit={handleUpdate} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-slate-400" /> Full Name
                  </label>
                  <input
                    type="text"
                    value={form.fullName}
                    onChange={(e) =>
                      setForm({ ...form, fullName: e.target.value })
                    }
                    required
                    placeholder="e.g. Joy Thayal"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:bg-white focus:border-slate-900 outline-none transition"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-slate-400" /> WhatsApp /
                    Direct Contact
                  </label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) =>
                      setForm({ ...form, phone: e.target.value })
                    }
                    placeholder="e.g. +91 98765 43210"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:bg-white focus:border-slate-900 outline-none transition"
                  />
                </div>
              </div>

              {/* Location Radar Field */}
              <div className="space-y-2 p-4 rounded-2xl bg-slate-50/80 border border-slate-200/70">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-800 flex items-center gap-1.5">
                    <Compass className="w-4 h-4 text-slate-700" /> Service
                    Pickup / Visit Address
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      getCoordinates(
                        ({ locationName, lat, lng }) => {
                          setForm((prev) => ({
                            ...prev,
                            location: locationName,
                          }));
                          setCoords({ lat, lng });
                        },
                        (msg) => setStatus(msg),
                      )
                    }
                    disabled={detecting}
                    className="text-[11px] font-semibold text-slate-900 hover:text-cyan-700 inline-flex items-center gap-1 bg-white px-2.5 py-1 rounded-lg border border-slate-200 shadow-2xs transition cursor-pointer"
                  >
                    {detecting ? (
                      <Loader2 className="w-3 h-3 animate-spin" />
                    ) : (
                      <Navigation className="w-3 h-3" />
                    )}
                    Live GPS Scan
                  </button>
                </div>

                <input
                  type="text"
                  value={form.location}
                  onChange={(e) => {
                    setForm({ ...form, location: e.target.value });
                    setCoords(null);
                  }}
                  placeholder="Type address or use Live GPS scan"
                  className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:border-slate-900 outline-none transition"
                />

                {currentMapsUrl && (
                  <div className="pt-1 flex items-center justify-between text-[11px] text-slate-500">
                    <span className="font-mono text-[10px]">
                      {coords
                        ? `GPS: ${coords.lat.toFixed(4)}, ${coords.lng.toFixed(4)}`
                        : "Manual Text Mode"}
                    </span>
                    <a
                      href={currentMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-800 font-semibold hover:underline inline-flex items-center gap-1"
                    >
                      Open Google Maps Radar{" "}
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                )}
              </div>

              {/* Account Registered Email */}
              <div className="space-y-1">
                <label className="text-[11px] font-medium text-slate-400 flex items-center gap-1.5">
                  <Mail className="w-3 h-3 text-slate-400" /> Account Registered
                  Email
                </label>
                <input
                  type="email"
                  value={form.email}
                  disabled
                  className="w-full bg-slate-100/60 border border-slate-200/50 rounded-xl px-3.5 py-2 text-xs text-slate-400 select-none cursor-not-allowed font-mono"
                />
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs tracking-wide shadow-md active:scale-[0.98] transition cursor-pointer disabled:opacity-50 inline-flex items-center gap-2"
                >
                  {saving ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <Save className="w-3.5 h-3.5" /> Save Configuration
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
