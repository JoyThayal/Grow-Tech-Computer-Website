"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

export default function BeforeAfterSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const sliderPosition = useTransform(scrollYProgress, [0.08, 0.92], [0, 100], {
    clamp: true,
  });

  const leftPosition = useTransform(sliderPosition, (pos) => `${pos}%`);

  const afterClipPath = useTransform(
    sliderPosition,
    (pos) => `inset(0 ${Math.max(0, Math.min(100, 100 - pos))}% 0 0)`,
  );

  const beforeClipPath = useTransform(
    sliderPosition,
    (pos) => `inset(0 0 0 ${Math.max(0, Math.min(100, pos))}%)`,
  );

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[260vh] bg-[#f4f4f4] select-none z-10 transform-[translateZ(0)]"
    >
      {/* স্টিকি ভিউপোর্ট: মোবাইলে পারফেক্ট সেন্টার ও স্পেসিং */}
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center pt-20 pb-5 px-3 sm:px-6 md:pt-28 md:pb-8 md:px-8 overflow-hidden">
        {/* ================= মিনিমাল ট্যাকটিক্যাল হেডিং ================= */}
        <div className="text-center mb-3 sm:mb-4 md:mb-5 pointer-events-none">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-slate-200/80 px-2.5 sm:px-3 py-1 rounded-full mb-1.5 sm:mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse shadow-[0_0_8px_#06b6d4]" />
            <span className="text-[9px] sm:text-[10px] font-mono tracking-[0.2em] sm:tracking-[0.25em] text-slate-600 uppercase font-semibold">
              Live Hardware Inspection // 004
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-900 tracking-tight uppercase">
            Before & After Overhaul
          </h2>
        </div>

        {/* ================= ফুল রাউন্ডেড ফ্রেম কন্টেইনার: মোবাইলে 16:9 (aspect-video) এবং ডেস্কটপে md:w-[70%] flex-1 min-h-95 md:rounded-[2.5rem] ================= */}
        <div className="relative w-full max-w-lg md:max-w-none md:w-[70%] aspect-video md:aspect-auto md:flex-1 md:min-h-95 rounded-2xl sm:rounded-3xl md:rounded-[2.5rem] overflow-hidden border border-slate-300/80 bg-slate-950 shadow-[0_30px_90px_rgba(0,0,0,0.2)] isolate transform-[translateZ(0)]">
          {/* ================= ১. BEFORE লেয়ার ================= */}
          <motion.div
            style={{ clipPath: beforeClipPath }}
            className="absolute inset-0 w-full h-full bg-slate-950 z-10 will-change-[clip-path] transform-[translateZ(0)]"
          >
            <Image
              src="/images/before-cabinet.png"
              alt="Before Diagnosis"
              fill
              priority
              className="object-cover object-center pointer-events-none"
            />

            {/* বিফোর টপ স্ট্যাটাস */}
            <div className="absolute top-2.5 left-2.5 sm:top-6 sm:left-6 z-20 flex items-center gap-1.5 sm:gap-2 font-mono text-[8px] sm:text-[10px] tracking-wider uppercase text-rose-200 bg-black/60 backdrop-blur-md border border-rose-500/30 px-2 sm:px-3.5 py-1 sm:py-1.5 rounded-lg shadow-lg">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shadow-[0_0_8px_#f43f5e] animate-ping" />
              <span>State // Throttle</span>
            </div>

            {/* বিফোর বটম টেলিমেট্রি */}
            <div className="absolute bottom-2.5 left-2.5 sm:bottom-6 sm:left-6 z-20 flex items-center divide-x divide-white/10 bg-black/70 backdrop-blur-md border border-white/10 rounded-lg sm:rounded-xl overflow-hidden shadow-2xl">
              <div className="px-2 sm:px-4 py-1 sm:py-2.5">
                <div className="text-[7px] sm:text-[9px] font-mono tracking-widest text-slate-400 uppercase">
                  Core Temp
                </div>
                <div className="text-[11px] sm:text-sm font-mono font-bold text-rose-400">
                  92.8°C
                </div>
              </div>
              <div className="px-2 sm:px-4 py-1 sm:py-2.5">
                <div className="text-[7px] sm:text-[9px] font-mono tracking-widest text-slate-400 uppercase">
                  Boot Trace
                </div>
                <div className="text-[11px] sm:text-sm font-mono font-bold text-amber-400">
                  94.0s
                </div>
              </div>
            </div>
          </motion.div>

          {/* ================= ২. AFTER লেয়ার ================= */}
          <motion.div
            style={{ clipPath: afterClipPath }}
            className="absolute inset-0 w-full h-full bg-slate-950 z-20 will-change-[clip-path] transform-[translateZ(0)]"
          >
            <Image
              src="/images/after-cabinet.png"
              alt="After Overhaul"
              fill
              priority
              className="object-cover object-center pointer-events-none"
            />

            {/* আফটার টপ স্ট্যাটাস */}
            <div className="absolute top-2.5 right-2.5 sm:top-6 sm:right-6 z-20 flex items-center gap-1.5 sm:gap-2 font-mono text-[8px] sm:text-[10px] tracking-wider uppercase text-slate-200 bg-black/50 backdrop-blur-md border border-white/10 px-2 sm:px-3.5 py-1 sm:py-1.5 rounded-lg shadow-lg">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
              <span>State // Restored</span>
            </div>

            {/* আফটার বটম টেলিমেট্রি */}
            <div className="absolute bottom-2.5 right-2.5 sm:bottom-6 sm:right-6 z-20 flex items-center divide-x divide-white/10 bg-black/60 backdrop-blur-md border border-white/10 rounded-lg sm:rounded-xl overflow-hidden shadow-2xl">
              <div className="px-2 sm:px-4 py-1 sm:py-2.5">
                <div className="text-[7px] sm:text-[9px] font-mono tracking-widest text-slate-400 uppercase">
                  Core Temp
                </div>
                <div className="text-[11px] sm:text-sm font-mono font-bold text-cyan-300">
                  42.4°C
                </div>
              </div>
              <div className="px-2 sm:px-4 py-1 sm:py-2.5">
                <div className="text-[7px] sm:text-[9px] font-mono tracking-widest text-slate-400 uppercase">
                  Boot Trace
                </div>
                <div className="text-[11px] sm:text-sm font-mono font-bold text-emerald-400">
                  08.2s
                </div>
              </div>
            </div>
          </motion.div>

          {/* ================= ৩. রিয়েল অপটিক্যাল স্ক্যানার বিম ================= */}
          <motion.div
            style={{ left: leftPosition }}
            className="absolute top-0 bottom-0 z-30 pointer-events-none flex items-center justify-center -translate-x-1/2 will-change-[left] transform-[translateZ(0)]"
          >
            <div className="absolute inset-y-0 -left-6 sm:-left-10 w-12 sm:w-20 bg-linear-to-r from-transparent via-cyan-400/25 to-transparent blur-md pointer-events-none" />
            <div className="h-full w-0.5 bg-linear-to-b from-cyan-400 via-white to-cyan-400 shadow-[0_0_14px_#22d3ee,0_0_28px_#06b6d4]" />

            <div className="absolute top-1/2 -translate-y-1/2 flex items-center justify-center">
              <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border border-cyan-300/60 bg-black/40 backdrop-blur-sm flex items-center justify-center shadow-[0_0_12px_#22d3ee]">
                <div className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_6px_#fff]" />
              </div>
              <div className="absolute w-5 sm:w-8 h-px bg-cyan-400/70" />
              <div className="absolute h-5 sm:h-8 w-px bg-cyan-400/70" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
