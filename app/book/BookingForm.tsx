"use client";

import {
  User,
  Phone,
  MapPin,
  MessageSquare,
  ArrowRight,
  Loader2,
  ExternalLink,
} from "lucide-react";

interface BookingFormProps {
  name: string;
  setName: (v: string) => void;
  phone: string;
  setPhone: (v: string) => void;
  location: string;
  setLocation: (v: string) => void;
  mapsLink?: string | null;
  message: string;
  setMessage: (v: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  submitting: boolean;
  theme: {
    text: string;
    button: string;
    focusColor: string;
  };
}

export default function BookingForm({
  name,
  setName,
  phone,
  setPhone,
  location,
  setLocation,
  mapsLink,
  message,
  setMessage,
  onSubmit,
  submitting,
  theme,
}: BookingFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-8">
      <div className="space-y-4">
        <label className="text-xs font-mono uppercase tracking-wider text-slate-600 block">
          Contact & Location Details
        </label>

        {/* Name and Phone */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <span className="text-xs text-slate-600 font-medium flex items-center gap-1.5">
              <User className={`w-3.5 h-3.5 ${theme.text}`} /> Your Full Name
            </span>
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full bg-white/80 backdrop-blur-md border border-slate-200 rounded-2xl px-4 py-3.5 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition-all shadow-inner focus:border-cyan-500"
            />
          </div>

          <div className="space-y-1.5">
            <span className="text-xs text-slate-600 font-medium flex items-center gap-1.5">
              <Phone className={`w-3.5 h-3.5 ${theme.text}`} /> WhatsApp / Phone
              Number
            </span>
            <input
              type="tel"
              placeholder="Enter your phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="w-full bg-white/80 backdrop-blur-md border border-slate-200 rounded-2xl px-4 py-3.5 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition-all shadow-inner focus:border-cyan-500"
            />
          </div>
        </div>

        {/* Location Input 📍 */}
        <div className="space-y-1.5 pt-1">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-600 font-medium flex items-center gap-1.5">
              <MapPin className={`w-3.5 h-3.5 ${theme.text}`} /> Area / Pickup
              Address
            </span>
            {mapsLink && (
              <a
                href={mapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] font-mono text-cyan-600 hover:underline inline-flex items-center gap-1"
              >
                View Map Pin <ExternalLink className="w-2.5 h-2.5" />
              </a>
            )}
          </div>
          <input
            type="text"
            placeholder="e.g. Anandapuri, Barrackpore"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full bg-white/80 backdrop-blur-md border border-slate-200 rounded-2xl px-4 py-3.5 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition-all shadow-inner focus:border-cyan-500"
          />
        </div>

        {/* Additional Note */}
        <div className="space-y-1.5 pt-1">
          <span className="text-xs text-slate-600 font-medium flex items-center gap-1.5">
            <MessageSquare className={`w-3.5 h-3.5 ${theme.text}`} /> Additional
            Note (Optional)
          </span>
          <textarea
            rows={3}
            placeholder="Write any specific details about your device or document..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full bg-white/80 backdrop-blur-md border border-slate-200 rounded-2xl px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition-all shadow-inner resize-none focus:border-cyan-500"
          />
        </div>
      </div>

      <div className="pt-2">
        <button
          type="submit"
          disabled={submitting}
          className={`group w-full sm:w-auto min-w-70 flex items-center justify-center gap-3 px-8 py-4 rounded-2xl ${theme.button} text-white font-bold text-sm transition-all duration-300 shadow-xl active:scale-[0.98] cursor-pointer disabled:opacity-60`}
        >
          {submitting ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <>
              <span>Confirm Service Request</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
