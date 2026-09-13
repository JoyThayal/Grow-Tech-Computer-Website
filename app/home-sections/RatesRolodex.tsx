"use client";

import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  AnimatePresence,
} from "framer-motion";
import { HardDrive, Wrench, Cpu, Printer, ShieldAlert } from "lucide-react";

export const ratesData = [
  {
    id: "01",
    title: "REAL CAREER GROWTH",
    price: "₹499",
    desc: "Speed up sluggish laptops with authentic high-speed NVMe drives and DDR4 memory modules.",
    icon: HardDrive,
  },
  {
    id: "02",
    title: "HIGH-IMPACT WORK",
    price: "₹299",
    desc: "Direct-at-counter short tracing, board line checking, and logic repair done live.",
    icon: Wrench,
  },
  {
    id: "03",
    title: "GENUINE EXPERTISE",
    price: "₹349",
    desc: "Arctic cooling grease application, internal exhaust dusting, and silent thermal overhaul.",
    icon: Cpu,
  },
  {
    id: "04",
    title: "DIRECT LEADERSHIP ACCESS",
    price: "₹5",
    desc: "Instant color prints, laminated official documentation, and express cyber desk aid.",
    icon: Printer,
  },
  {
    id: "05",
    title: "OWNERSHIP & RESPONSIBILITY",
    price: "₹599",
    desc: "Non-booting drive retrieval, secure cluster salvage, and zero-leak disk transfers.",
    icon: ShieldAlert,
  },
];

// প্রতিটি আইটেমের জন্য সুনির্দিষ্ট উচ্চতা
const ITEM_HEIGHT = 88;
const CONTAINER_HEIGHT = 264; // ঠিক ৩টি আইটেম দৃশ্যমান থাকার উচ্চতা (88 * 3)

export default function RatesRolodex() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const circumference = 263.9;
  const strokeDashoffset = useTransform(
    scrollYProgress,
    [0, 1],
    [circumference, 0],
  );

  const dialRotation = useTransform(scrollYProgress, [0, 1], [0, 360]);

  // স্ক্রল প্রগ্রেসের সাথে ইনডেক্স পরিবর্তন
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const total = ratesData.length;
    const current = Math.min(
      Math.max(0, Math.round(latest * (total - 1))),
      total - 1,
    );
    setActiveIndex(current);
  });

  const activeItem = ratesData[activeIndex];
  const IconComp = activeItem.icon;

  // নিখুঁত সেন্টারিং ফর্মুলা (ডেস্কটপ)
  const targetY =
    -(activeIndex * ITEM_HEIGHT) + (CONTAINER_HEIGHT / 2 - ITEM_HEIGHT / 2);

  return (
    <section
      id="rates"
      ref={containerRef}
      className="relative w-full h-[320vh] bg-[#0d0e11] text-white select-none z-10 transform-[translateZ(0)]"
    >
      {/* 
        ন্যাভবারের নিচ থেকে শুরু করতে sticky top-16 md:top-20 এবং 
        হাইট h-[calc(100vh-4rem)] md:h-[calc(100vh-5rem)] দেওয়া হয়েছে
      */}
      <div className="sticky top-16 md:top-20 h-[calc(100vh-4rem)] md:h-[calc(100vh-5rem)] w-full flex flex-col md:flex-row items-center justify-between px-6 sm:px-8 md:px-14 lg:px-20 pt-8 sm:pt-12 md:pt-16 pb-10 md:pb-16 overflow-hidden">
        {/* ================= ১. বাঁ পাশ: মেটাডাটা ও রেট ================= */}
        <div className="w-full md:w-[20%] z-10 flex flex-col items-center md:items-start text-center md:text-left justify-center mt-2 md:mt-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeItem.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="space-y-1.5 md:space-y-4"
            >
              <div className="text-[10px] font-mono tracking-[0.25em] text-neutral-400 uppercase">
                REV // 0{activeIndex + 1}
              </div>

              <div className="text-3xl sm:text-4xl lg:text-6xl font-black tracking-tight text-white flex items-baseline justify-center md:justify-start gap-1.5">
                {activeItem.price}
                <span className="text-[11px] font-mono text-neutral-400 font-normal">
                  / desk
                </span>
              </div>

              <div className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest">
                {`REV - ${activeItem.id} // GROW TECH`}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ================= ২. আইকনের ওপরেই সার্কুলার প্রগ্রেস বার ================= */}
        <div className="relative flex items-center justify-center shrink-0 my-3 md:my-0">
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 flex items-center justify-center">
            <svg
              className="w-full h-full -rotate-90 pointer-events-none"
              viewBox="0 0 96 96"
            >
              <circle
                cx="48"
                cy="48"
                r="42"
                stroke="currentColor"
                strokeWidth="2"
                fill="transparent"
                className="text-neutral-800"
              />
              <motion.circle
                cx="48"
                cy="48"
                r="42"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeDasharray={circumference}
                style={{ strokeDashoffset }}
                strokeLinecap="round"
                fill="transparent"
                className="text-white"
              />
            </svg>

            <motion.div
              style={{ rotate: dialRotation }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
            >
              <span className="absolute top-0.5 w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-white shadow-[0_0_10px_#ffffff]" />
            </motion.div>

            <div className="absolute w-14 h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 rounded-full bg-neutral-900/80 border border-neutral-700/50 flex items-center justify-center backdrop-blur-md shadow-2xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeItem.id}
                  initial={{ scale: 0.5, opacity: 0, rotate: -20 }}
                  animate={{ scale: 1, opacity: 1, rotate: 0 }}
                  exit={{ scale: 0.5, opacity: 0, rotate: 20 }}
                  transition={{ duration: 0.25 }}
                  className="text-white"
                >
                  <IconComp className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* ================= ৩. টেক্সট ড্রাম ================= */}
        <div
          style={{
            height: `${CONTAINER_HEIGHT}px`,
            maskImage:
              "linear-gradient(to bottom, transparent 0%, black 25%, black 75%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent 0%, black 25%, black 75%, transparent 100%)",
          }}
          className="w-full md:w-[45%] relative flex items-center justify-center md:justify-start overflow-hidden my-2 md:my-0"
        >
          <motion.div
            animate={{ y: targetY }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col w-full absolute top-0 left-0 items-center md:items-start"
          >
            {ratesData.map((item, idx) => {
              const isActive = idx === activeIndex;
              return (
                <div
                  key={item.id}
                  style={{ height: `${ITEM_HEIGHT}px` }}
                  className="flex items-center justify-center md:justify-start w-full px-2"
                >
                  <div
                    className={`text-lg sm:text-2xl md:text-3xl lg:text-4xl font-extrabold uppercase tracking-tight transition-all duration-300 select-none leading-none text-center md:text-left ${
                      isActive
                        ? "text-white opacity-100 scale-100 md:translate-x-2"
                        : "text-neutral-500 opacity-20 scale-95"
                    }`}
                  >
                    {item.title}
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* ================= ৪. বিবরণ ================= */}
        <div className="w-full md:w-[20%] z-10 flex items-center justify-center md:justify-start text-center md:text-left mb-2 md:mb-0 px-4 md:px-0">
          <AnimatePresence mode="wait">
            <motion.p
              key={activeItem.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-normal max-w-sm md:max-w-none"
            >
              {activeItem.desc}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
