"use client";

import Link from "next/link";
import { Wrench, Globe } from "lucide-react";

interface ServiceCategoryModalProps {
  isOpen: boolean;
}

export default function ServiceCategoryModal({
  isOpen,
}: ServiceCategoryModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-md p-4">
      <div className="relative w-full max-w-md rounded-3xl bg-white/70 dark:bg-neutral-900/80 backdrop-blur-xl border border-white/40 dark:border-neutral-800 p-8 shadow-2xl space-y-6 text-center">
        {/* Header Badge */}
        <span className="inline-block px-3.5 py-1 rounded-full text-[10px] font-mono tracking-widest text-[#cb784a] bg-[#cb784a]/10 border border-[#cb784a]/25 uppercase">
          Grow Tech Desk
        </span>

        {/* Title & Description */}
        <div className="space-y-2">
          <h3 className="text-2xl font-black text-slate-800 dark:text-white tracking-tight">
            Which service do you need? 🛠️
          </h3>
          <p className="text-xs text-slate-500 dark:text-neutral-400 leading-relaxed max-w-xs mx-auto">
            You came directly to the booking page. Please select a category
            below to proceed with the right service:
          </p>
        </div>

        {/* Category Buttons */}
        <div className="grid grid-cols-1 gap-3.5 pt-2">
          <Link
            href="/repair"
            className="flex items-center justify-center gap-3 py-3.5 px-4 rounded-2xl bg-white dark:bg-neutral-800 text-slate-700 dark:text-white font-bold text-xs tracking-wide border border-slate-200 dark:border-neutral-700 hover:bg-[#cb784a] hover:text-white hover:border-[#cb784a] transition-all shadow-sm cursor-pointer"
          >
            <Wrench className="w-4 h-4 text-[#cb784a]" />
            <span>PC & Laptop Repair Services</span>
          </Link>

          <Link
            href="/cyber-cafe"
            className="flex items-center justify-center gap-3 py-3.5 px-4 rounded-2xl bg-white dark:bg-neutral-800 text-slate-700 dark:text-white font-bold text-xs tracking-wide border border-slate-200 dark:border-neutral-700 hover:bg-cyan-600 hover:text-white hover:border-cyan-600 transition-all shadow-sm cursor-pointer"
          >
            <Globe className="w-4 h-4 text-cyan-600" />
            <span>Cyber Cafe & Digital Services</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
