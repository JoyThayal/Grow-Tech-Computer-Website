"use client";

import { Calendar, Clock } from "lucide-react";

interface BookingSummaryProps {
  service: string | null;
  issue: string | null;
  exactPrice: string | null;
  assignedDay: string;
  assignedSlot: string;
  theme: {
    text: string;
    bgGlow: string;
    border: string;
  };
}

export default function BookingSummary({
  service,
  issue,
  exactPrice,
  assignedDay,
  assignedSlot,
  theme,
}: BookingSummaryProps) {
  return (
    <div className="space-y-4">
      {/* Recap Card */}
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
            <span
              className={`${theme.text} font-mono ${theme.bgGlow} px-2.5 py-1 rounded-md border ${theme.border} font-medium`}
            >
              {issue || "Standard Checkup"}
            </span>
            <span className="text-emerald-700 font-mono font-bold bg-emerald-500/10 px-3 py-1 rounded-md border border-emerald-500/20 shadow-sm text-sm">
              {exactPrice ? decodeURIComponent(exactPrice) : "₹100"}
            </span>
          </div>
        </div>
      </div>

      {/* Date & Time Slot */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
        <div className="p-4 rounded-2xl bg-white/60 backdrop-blur-lg border border-white/50 shadow-md flex items-center gap-3">
          <div
            className={`w-10 h-10 rounded-xl ${theme.bgGlow} border ${theme.border} flex items-center justify-center ${theme.text} shrink-0`}
          >
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
          <div
            className={`w-10 h-10 rounded-xl ${theme.bgGlow} border ${theme.border} flex items-center justify-center ${theme.text} shrink-0`}
          >
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
  );
}
