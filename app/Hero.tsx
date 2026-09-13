"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { heroItems } from "@/app/data/heroData";

export default function HeroSection() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % heroItems.length);
    }, 4500);

    return () => clearInterval(timer);
  }, [active]);
  return (
    <section
      className={`h-screen w-full overflow-hidden transition-all duration-700 ${heroItems[active].bgGradient}`}
    >
      <div className="flex items-center justify-between h-full w-full px-16">
        <div className="flex flex-col gap-5 w-[40%] text-white">
          <span className="text-sm font-semibold tracking-wider text-cyan-200 uppercase">
            Trusted Tech Partner
          </span>
          <h1 className="text-4xl font-black text-white uppercase leading-tight">
            Fast Laptop Repair & <br /> Smart Cyber Solutions
          </h1>
          <p className="text-sm text-cyan-100/80 w-[80%] leading-relaxed">
            From advanced hardware repairs to quick online forms, printing, and
            digital services—get everything done under one roof with expert
            care.
          </p>
          <div className="flex gap-4 pt-2">
            <button className="bg-white text-slate-900 font-bold px-6 py-2 rounded-full hover:bg-cyan-100 transition shadow-lg">
              Contact Us
            </button>
            <Link
              href="/"
              className="border border-white/80 text-white font-medium px-6 py-2 rounded-full hover:bg-white/10 transition"
            >
              Our Services
            </Link>
          </div>
        </div>

        <div className="relative w-[60%] h-full flex items-center justify-center">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0">
            <AnimatePresence mode="wait">
              <motion.h1
                key={heroItems[active].id}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={{ opacity: 0.2, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -40, scale: 1.05 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="text-[12rem] font-black text-white uppercase tracking-widest leading-none"
              >
                {heroItems[active].bigText}
              </motion.h1>
            </AnimatePresence>
          </div>
          <div className="relative z-10 w-112.5 h-112.5 flex items-center justify-center">
            <AnimatePresence mode="wait">
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
                  duration: 0.85,
                  ease: [0.76, 0, 0.24, 1],
                }}
                className="absolute"
              >
                <Image
                  src={heroItems[active].img}
                  alt={heroItems[active].name}
                  width={450}
                  height={450}
                  priority
                  className="drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] object-contain pointer-events-none"
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
      <div className="absolute bottom-8 right-12 z-20 flex items-center gap-3 bg-black/20 backdrop-blur-md p-2 rounded-full border border-white/20 shadow-2xl">
        {heroItems.map((item, index) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setActive(index)}
            className={`w-12 h-12 flex items-center justify-center rounded-full p-2 cursor-pointer transition-all duration-300 border border-white/20 shadow-md ${item.btnClass} ${
              active === index
                ? "scale-125 ring-4 ring-white/90 shadow-[0_0_20px_rgba(255,255,255,0.6)] z-10 opacity-100"
                : "opacity-50 hover:opacity-100 hover:scale-110"
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
