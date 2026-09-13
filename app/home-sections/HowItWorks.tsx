"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import {
  Wrench,
  ShieldCheck,
  CheckCircle2,
  HeartHandshake,
} from "lucide-react";

export const stepsData = [
  {
    step: "01",
    tag: "Walk-in & Diagnostics",
    title: "Drop In or Share Details",
    desc: "Bring your slow PC, damaged cabinet, or online paperwork directly to our desk. We inspect the hardware or files right in front of you.",
    points: ["On-spot hardware diagnosis", "Transparent issue breakdown"],
    icon: Wrench,
    cardBg:
      "bg-[radial-gradient(circle_at_center,#22d3ee,#06b6d4,#0891b2)] border-cyan-300/40 shadow-2xl text-white",
    numberColor: "text-cyan-200/25",
    tagStyle: "text-white bg-cyan-950/40 border-white/20",
    dotColor: "bg-white",
  },
  {
    step: "02",
    tag: "Upfront Estimate",
    title: "Clear Quote & Genuine Repair",
    desc: "No hidden costs or sudden surprises. We confirm the exact pricing and timeline before touching any screws, upgrading components, or processing prints.",
    points: ["Zero hidden charges", "Approval-first workflow"],
    icon: ShieldCheck,
    cardBg:
      "bg-[radial-gradient(circle_at_center,#fbbf24,#f59e0b,#d97706)] border-amber-300/40 shadow-2xl text-white",
    numberColor: "text-amber-200/25",
    tagStyle: "text-white bg-amber-950/40 border-white/20",
    dotColor: "bg-white",
  },
  {
    step: "03",
    tag: "Testing & Handover",
    title: "Spot Testing & Quick Delivery",
    desc: "Test machine performance, peripherals, and verified documents directly in shop. Walk away fully verified and ready for prime performance.",
    points: ["Live user spot-testing", "Verified and handover-ready"],
    icon: CheckCircle2,
    cardBg:
      "bg-[radial-gradient(circle_at_center,#a78bfa,#7c3aed,#6d28d9)] border-violet-300/40 shadow-2xl text-white",
    numberColor: "text-violet-200/25",
    tagStyle: "text-white bg-violet-950/40 border-white/20",
    dotColor: "bg-white",
  },
  {
    step: "04",
    tag: "Post-Service Care",
    title: "Warranty & Continuous Support",
    desc: "Enjoy peace of mind with replacement warranty on installed parts and dedicated after-service support whenever your system needs fine-tuning.",
    points: ["Component warranty support", "Direct post-repair assistance"],
    icon: HeartHandshake,
    cardBg:
      "bg-[radial-gradient(circle_at_center,#fb7185,#e11d48,#9f1239)] border-rose-400/40 shadow-2xl text-white",
    numberColor: "text-rose-200/25",
    tagStyle: "text-white bg-rose-950/40 border-white/20",
    dotColor: "bg-white",
  },
];

interface CardProps {
  item: (typeof stepsData)[0];
  index: number;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
}

function Card({ item, index, progress, range, targetScale }: CardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const IconComponent = item.icon;

  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div
      ref={containerRef}
      className="min-h-[75vh] md:min-h-[85vh] py-4 md:py-6 flex items-start justify-center sticky top-20 md:top-28"
    >
      <motion.div
        style={{
          scale,
          top: `calc(4vh + ${index * 24}px)`,
        }}
        className={`w-full max-w-4xl min-h-80 md:min-h-95 rounded-3xl p-6 sm:p-8 md:p-12 border flex flex-col md:flex-row items-start md:items-center justify-between relative overflow-hidden shadow-2xl origin-top ${item.cardBg}`}
      >
        {/* বাম পাশ: মূল টেক্সট কনটেন্ট */}
        <div className="w-full md:max-w-md z-10 space-y-3 md:space-y-4">
          <span
            className={`inline-block text-[11px] md:text-xs font-bold uppercase tracking-wider px-3 md:px-3.5 py-1 md:py-1.5 rounded-full border ${item.tagStyle}`}
          >
            {item.tag}
          </span>

          <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            {item.title}
          </h3>

          <p className="text-white/85 text-xs sm:text-sm md:text-base leading-relaxed">
            {item.desc}
          </p>

          {/* চেকলিস্ট পয়েন্ট */}
          <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2 sm:gap-4 pt-1 md:pt-2">
            {item.points.map((pt, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 text-[11px] sm:text-xs font-semibold text-white/95"
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full shrink-0 ${item.dotColor}`}
                />
                {pt}
              </div>
            ))}
          </div>
        </div>

        {/* ডান পাশ: প্রিমিয়াম আইকন এবং ওয়াটারমার্ক নাম্বার */}
        <div className="relative flex items-center justify-center mt-4 md:mt-0 self-end md:self-center">
          <span
            className={`text-[120px] sm:text-[150px] md:text-[220px] font-black select-none tracking-tighter leading-none pointer-events-none ${item.numberColor}`}
          >
            {item.step}
          </span>

          <div className="absolute w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-white/15 border border-white/25 backdrop-blur-md flex items-center justify-center text-white top-1 right-1 md:top-2 md:right-2 shadow-inner">
            <IconComponent className="w-6 h-6 md:w-8 md:h-8" />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function HowItWorksCards() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section className="w-full bg-[#f4f4f4] px-4 sm:px-6">
      {/* সেকশন হেডার */}
      <div className="text-center max-w-xl mx-auto pt-16 md:pt-24 mb-4 md:mb-6">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 mt-2 md:mt-4 tracking-tight uppercase">
          How It Works
        </h2>
        <p className="text-slate-500 text-xs sm:text-sm md:text-base mt-2 md:mt-3 font-medium">
          Simple Process. Clear Results.
        </p>
      </div>

      {/* কার্ড তালিকা কন্টেইনার */}
      <div ref={containerRef} className="relative">
        {stepsData.map((item, index) => {
          const targetScale = 1 - (stepsData.length - index) * 0.04;
          const stepSegment = 1 / stepsData.length;
          const start = index * stepSegment;

          return (
            <Card
              key={item.step}
              item={item}
              index={index}
              progress={scrollYProgress}
              range={[start, 1]}
              targetScale={targetScale}
            />
          );
        })}
      </div>
    </section>
  );
}
