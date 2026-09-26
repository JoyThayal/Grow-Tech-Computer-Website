"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { heroItems } from "@/app/data/heroData";

export default function HeroSection() {
  const [active, setActive] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // অটো-স্লাইডার টাইমার চালু করার ফাংশন
  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % heroItems.length);
    }, 4500);
  };

  // কম্পোনেন্ট মাউন্ট হলে টাইমার চালু হবে
  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // ইউজার ক্লিক করলে টাইমার ফ্রেশ ভাবে রিসেট হবে (ওভাররাইড ঠেকাবে)
  const handleItemClick = (index: number) => {
    setActive(index);
    startTimer();
  };

  return (
    <section
      className={`relative min-h-[80vh] lg:h-screen w-full overflow-hidden transition-colors duration-700 ${heroItems[active].bgGradient}`}
    >
      <div className="flex flex-col lg:flex-row items-center justify-center min-h-auto lg:h-full w-full px-6 sm:px-10 lg:px-16 pt-25 pb-20 lg:py-0 gap-8 lg:gap-0">
        {/* ================= বাঁ দিকের টেক্সট (মোবাইলে উপরে) ================= */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left gap-4 lg:gap-5 w-full lg:w-[40%] text-white z-10">
          <span className="text-xs sm:text-sm font-semibold tracking-wider text-cyan-200 uppercase">
            Trusted Tech Partner
          </span>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white uppercase leading-tight">
            Fast Laptop Repair & <br className="hidden sm:inline" /> Smart Cyber
            Solutions
          </h1>
          <p className="garet text-xs sm:text-sm text-cyan-100/80 w-full sm:w-[90%] lg:w-[80%] leading-relaxed">
            From advanced hardware repairs to quick online forms, printing, and
            digital services—get everything done under one roof with expert
            care.
          </p>
          <div className="flex flex-wrap justify-center lg:justify-start gap-3 sm:gap-4 pt-2">
            <Link
              href="/contact"
              className="bg-white text-slate-900 font-bold px-5 sm:px-6 py-2 rounded-full hover:bg-cyan-100 transition shadow-lg cursor-pointer text-sm sm:text-base inline-block text-center"
            >
              Contact Us
            </Link>
            <Link
              href="/book"
              className="border border-white/80 text-white font-medium px-5 sm:px-6 py-2 rounded-full hover:bg-white/10 transition text-sm sm:text-base"
            >
              Our Services
            </Link>
          </div>
        </div>

        {/* ================= ডান দিকের হিরো ভিজ্যুয়াল (মোবাইলে নিচে) ================= */}
        <div className="relative w-full lg:w-[60%] h-64 sm:h-80 lg:h-full flex items-center justify-center">
          {/* পেছনের বড় টেক্সট */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 overflow-visible">
            <AnimatePresence>
              <motion.h1
                key={heroItems[active].id}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={{ opacity: 0.2, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -40, scale: 1.05 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="absolute text-5xl sm:text-7xl md:text-8xl lg:text-[10rem] xl:text-[12rem] font-black text-white uppercase tracking-widest whitespace-nowrap leading-normal py-4"
              >
                {heroItems[active].bigText}
              </motion.h1>
            </AnimatePresence>
          </div>

          {/* মেইন ইমেজ কন্টেইনার */}
          <div className="relative z-10 w-60 h-60 sm:w-72 sm:h-72 lg:w-112.5 lg:h-112.5 flex items-center justify-center">
            <AnimatePresence>
              <motion.div
                key={heroItems[active].id}
                initial={{
                  opacity: 0,
                  scale: 0.7,
                  x: 250,
                  y: 250,
                  rotate: -35,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  x: 0,
                  y: 0,
                  rotate: 0,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.7,
                  x: 250,
                  y: -250,
                  rotate: 35,
                }}
                transition={{
                  duration: 0.8,
                  ease: [0.76, 0, 0.24, 1],
                }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <Image
                  src={heroItems[active].img}
                  alt={heroItems[active].name}
                  width={450}
                  height={450}
                  priority
                  className="w-full h-full drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] object-contain pointer-events-none"
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* ================= বটম ডট/বাটন ================= */}
      {/* মোবাইলে নিচে সেন্টারে থাকবে, আর ডেস্কটপে (lg) আগের মতো bottom-8 right-12 */}
      <div className="absolute bottom-5 lg:bottom-8 left-1/2 -translate-x-1/2 lg:left-auto lg:translate-x-0 lg:right-12 z-20 flex items-center gap-2.5 sm:gap-3 bg-black/20 backdrop-blur-md p-1.5 sm:p-2 rounded-full border border-white/20 shadow-2xl">
        {heroItems.map((item, index) => (
          <button
            key={item.id}
            type="button"
            onClick={() => handleItemClick(index)}
            className={`w-9 h-9 sm:w-11 sm:h-11 lg:w-12 lg:h-12 flex items-center justify-center rounded-full p-1.5 sm:p-2 cursor-pointer transition-all duration-300 border border-white/20 shadow-md ${item.btnClass} ${
              active === index
                ? "scale-110 lg:scale-125 ring-2 sm:ring-4 ring-white/90 shadow-[0_0_20px_rgba(255,255,255,0.6)] z-10 opacity-100"
                : "opacity-50 hover:opacity-100 hover:scale-105 lg:hover:scale-110"
            }`}
            title={item.name}
          >
            <Image
              src={item.img}
              alt={item.name}
              width={40}
              height={40}
              className="w-full h-full object-contain pointer-events-none drop-shadow"
            />
          </button>
        ))}
      </div>

      {/* প্রি-লোড ইমেজ */}
      <div className="hidden">
        {heroItems.map((item) => (
          <Image
            key={item.id}
            src={item.img}
            alt="preload"
            width={450}
            height={450}
            priority
          />
        ))}
      </div>
    </section>
  );
}
