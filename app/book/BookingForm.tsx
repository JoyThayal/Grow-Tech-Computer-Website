"use client";

import { User, Phone, MessageSquare, ArrowRight, Loader2 } from "lucide-react";

interface BookingFormProps {
  name: string;
  setName: (v: string) => void;
  phone: string;
  setPhone: (v: string) => void;
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
          Contact Information
        </label>
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
              className={`w-full bg-white/80 backdrop-blur-md border border-slate-200 focus:border-[${theme.focusColor}] rounded-2xl px-4 py-3.5 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition-all shadow-inner`}
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
              className={`w-full bg-white/80 backdrop-blur-md border border-slate-200 focus:border-[${theme.focusColor}] rounded-2xl px-4 py-3.5 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition-all shadow-inner`}
            />
          </div>
        </div>

        <div className="space-y-1.5 pt-2">
          <span className="text-xs text-slate-600 font-medium flex items-center gap-1.5">
            <MessageSquare className={`w-3.5 h-3.5 ${theme.text}`} /> Additional
            Note (Optional)
          </span>
          <textarea
            rows={3}
            placeholder="Write any specific details about your device or document..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className={`w-full bg-white/80 backdrop-blur-md border border-slate-200 focus:border-[${theme.focusColor}] rounded-2xl px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition-all shadow-inner resize-none`}
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
