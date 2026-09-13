"use client";

import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  AnimatePresence,
} from "framer-motion";
import {
  HardDrive,
  Wrench,
  Cpu,
  Printer,
  ShieldAlert,
  ArrowUpRight,
} from "lucide-react";

export const ratesData = [
  {
    id: "01",
    title: "SSD & RAM Upgrade",
    price: "₹499",
    tag: "High Performance",
    desc: "Speed up slow systems with original NVMe SSDs and high-speed memory modules.",
    icon: HardDrive,
  },
  {
    id: "02",
    title: "Chip-Level Diagnostics",
    price: "₹299",
    tag: "Hardware Care",
    desc: "Precision fault tracing and motherboard inspections done directly at desk.",
    icon: Wrench,
  },
  {
    id: "03",
    title: "Thermal & Deep Clean",
    price: "₹349",
    tag: "Cooling Overhaul",
    desc: "High-grade thermal paste application with internal dust ventilation overhaul.",
    icon: Cpu,
  },
  {
    id: "04",
    title: "Instant Digital & Print",
    price: "₹5",
    tag: "Same-Day Desk",
    desc: "High-speed color prints, online paperwork, xerox, and document processing.",
    icon: Printer,
  },
  {
    id: "05",
    title: "Data Recovery Care",
    price: "₹599",
    tag: "Zero-Leak Safety",
    desc: "Safe retrieval of corrupted storage and non-bootable drive transfers.",
    icon: ShieldAlert,
  },
];

export default function RatesRolodex() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // SVG সার্কেলের পরিধি: 2 * PI * 26 ≈ 163.3
  const circumference = 226.2;
  const strokeDashoffset = useTransform(
    scrollYProgress,
    [0, 1],
    [circumference, 0],
  );

  // ডায়াল রোটেট
  const dialRotation = useTransform(scrollYProgress, [0, 1], [0, 360]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const total = ratesData.length;
    // ম্যাপিং আরও স্মুথ ও নির্ভুল করার ক্যালকুলেশন
    const current = Math.min(Math.floor(latest * total), total - 1);
    setActiveIndex(current);
  });

  const activeItem = ratesData[activeIndex];
  const IconComp = activeItem.icon;

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen bg-[#f4f4f4] select-none"
    >
      <div className="sticky top-0 h-screen w-full flex items-center justify-between px-8 md:px-20 lg:px-28 overflow-hidden">
        {/* হালকা সফট লাইট অরা (ডেপথ বাড়ানোর জন্য) */}
        <div className="absolute left-1/4 top-1/2 -translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-cyan-200/20 rounded-full blur-3xl pointer-events-none" />

        {/* ================= বাঁ পাশ: ডায়নামিক প্রাইস কার্ড ================= */}
        <div className="w-[35%] z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeItem.id}
              initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -20, filter: "blur(4px)" }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-4"
            >
              {/* মিনি ট্যাগ ও কাউন্টার */}
              <div className="flex items-center gap-3">
                <span className="text-[11px] font-mono font-bold tracking-widest text-slate-500 uppercase bg-slate-200/80 px-2.5 py-1 rounded-md">
                  {activeItem.tag}
                </span>
                <span className="text-xs font-mono font-bold text-slate-400">
                  [{activeItem.id} / 0{ratesData.length}]
                </span>
              </div>

              {/* প্রাইস টিকেটিং এফেক্ট */}
              <div>
                <span className="text-[11px] uppercase tracking-wider font-semibold text-slate-400 block mb-0.5">
                  Starting Rate
                </span>
                <div className="text-6xl md:text-7xl font-black text-slate-900 tracking-tight flex items-baseline gap-1.5">
                  {activeItem.price}
                  <span className="text-sm font-semibold text-slate-400 tracking-normal">
                    / onwards
                  </span>
                </div>
              </div>

              {/* বিবরণ */}
              <p className="text-slate-600 text-sm md:text-base leading-relaxed max-w-sm font-medium">
                {activeItem.desc}
              </p>

              {/* ছোট অ্যাকশন সিগনেচার */}
              <div className="pt-2 flex items-center gap-1.5 text-xs font-bold text-slate-900 tracking-wide uppercase">
                <span>Transparent Diagnostics</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ================= মাঝের অংশ: সার্কুলার স্ক্রল প্রগ্রেস ও ডায়াল (বড় সাইজ) ================= */}
        <div className="relative flex items-center justify-center">
          {/* সাইজ w-24 h-24 থেকে বাড়িয়ে w-32 h-32 (128px) করা হয়েছে */}
          <div className="relative w-28 h-28 md:w-32 md:h-32 flex items-center justify-center">
            {/* SVG সার্কুলার প্রগ্রেস বার (viewBox 80 80 এবং r=36) */}
            <svg className="w-full h-full -rotate-90" viewBox="0 0 80 80">
              {/* ব্যাকগ্রাউন্ড ট্র্যাক সার্কেল */}
              <circle
                cx="40"
                cy="40"
                r="36"
                stroke="currentColor"
                strokeWidth="2"
                fill="transparent"
                className="text-slate-200"
              />
              {/* স্ক্রলের সাথে ফিল হওয়া প্রগ্রেস রিং */}
              <motion.circle
                cx="40"
                cy="40"
                r="36"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeDasharray={circumference}
                style={{ strokeDashoffset }}
                strokeLinecap="round"
                fill="transparent"
                className="text-slate-900"
              />
            </svg>

            {/* স্ক্রলের সাথে ঘুরতে থাকা কাঁটা ও পয়েন্টার ডট */}
            <motion.div
              style={{ rotate: dialRotation }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
            >
              <span className="absolute top-1 w-2 h-2 rounded-full bg-slate-900 shadow-sm" />
            </motion.div>

            {/* সেন্টারে ডাইনামিক আইকন (বড় সার্কেলের সাথে মিলিয়ে সাইজ বাড়ানো হয়েছে) */}
            <div className="absolute flex items-center justify-center text-slate-900">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeItem.id}
                  initial={{ scale: 0.5, opacity: 0, rotate: -30 }}
                  animate={{ scale: 1, opacity: 1, rotate: 0 }}
                  exit={{ scale: 0.5, opacity: 0, rotate: 30 }}
                  transition={{ duration: 0.25 }}
                >
                  <IconComp className="w-7 h-7 md:w-8 md:h-8" />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        <div
          className="w-[48%] h-screen relative flex items-center"
          style={{
            maskImage:
              "linear-gradient(to bottom, transparent 0%, black 28%, black 72%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent 0%, black 28%, black 72%, transparent 100%)",
          }}
        >
          <motion.div
            animate={{ y: -(activeIndex * 84) + 138 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-6 w-full py-10"
          >
            {ratesData.map((item, idx) => {
              const isActive = idx === activeIndex;
              const distance = Math.abs(activeIndex - idx);

              return (
                <div
                  key={item.id}
                  className={`text-3xl md:text-5xl font-black uppercase tracking-tight transition-all duration-500 cursor-default ${
                    isActive
                      ? "text-slate-950 opacity-100 scale-100 translate-x-2"
                      : distance === 1
                        ? "text-slate-400 opacity-40 scale-95"
                        : "text-slate-300 opacity-15 scale-90"
                  }`}
                  style={{
                    transformStyle: "preserve-3d",
                    transform: isActive
                      ? "perspective(500px) rotateX(0deg)"
                      : idx < activeIndex
                        ? "perspective(500px) rotateX(15deg)"
                        : "perspective(500px) rotateX(-15deg)",
                  }}
                >
                  {item.title}
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
