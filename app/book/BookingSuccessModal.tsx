"use client";

import Link from "next/link";
import { CheckCircle2, Calendar, Clock, Home, FileCheck2 } from "lucide-react";

interface BookingSuccessModalProps {
  isOpen: boolean;
  serviceName: string;
  assignedDay: string;
  assignedSlot: string;
}

export default function BookingSuccessModal({
  isOpen,
  serviceName,
  assignedDay,
  assignedSlot,
}: BookingSuccessModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 text-center">
        {/* Top Success Icon */}
        <div className="w-16 h-16 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-2xl mx-auto flex items-center justify-center shadow-inner">
          <CheckCircle2 className="w-9 h-9" />
        </div>

        {/* Title & Description */}
        <div className="space-y-1.5">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Request Confirmed!
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
            Your service appointment has been scheduled at Grow Tech
            Barrackpore.
          </p>
        </div>

        {/* Quick Details Box */}
        <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 text-left space-y-2.5 text-xs text-slate-600">
          <div className="flex items-center justify-between">
            <span className="text-slate-400">Service:</span>
            <span className="font-semibold text-slate-800">{serviceName}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-400 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-slate-400" /> Date:
            </span>
            <span className="font-medium text-slate-700">{assignedDay}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-400 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-slate-400" /> Slot:
            </span>
            <span className="font-medium text-slate-700">{assignedSlot}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Link
            href="/"
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-xs transition duration-200 cursor-pointer"
          >
            <Home className="w-4 h-4" /> Go to Home
          </Link>
          <Link
            href="/my-bookings"
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-xl text-xs transition duration-200 shadow-md cursor-pointer"
          >
            <FileCheck2 className="w-4 h-4" /> View My Bookings
          </Link>
        </div>
      </div>
    </div>
  );
}
