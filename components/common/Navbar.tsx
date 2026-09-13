"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="w-full fixed top-0 left-0 z-50 p-3 sm:p-5">
      <nav className="max-w-7xl mx-auto bg-black/20 backdrop-blur-md border border-white/10 flex items-center justify-between rounded-full px-4 sm:px-6 py-2 text-white shadow-lg">
        {/* লোগো */}
        <Link href="/" className="flex items-center">
          <Image
            src="/images/logo-1.png"
            width={90}
            height={90}
            alt="Logo"
            className="w-16 h-auto sm:w-20 md:w-22.5 object-contain"
            priority
          />
        </Link>

        {/* ডেস্কটপ মেনু (অপরিবর্তিত) */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link href="/" className="hover:text-cyan-300 transition">
            Home
          </Link>
          <Link href="/services" className="hover:text-cyan-300 transition">
            Services
          </Link>
          <Link href="/about" className="hover:text-cyan-300 transition">
            About
          </Link>
        </div>

        {/* অ্যাকশন বাটন ও অ্যানিমেটেড মেনু টগল */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <Link
            href="/contact"
            className="bg-white text-slate-950 font-semibold px-4 sm:px-5 py-1.5 rounded-full hover:bg-cyan-100 hover:scale-105 transition shadow-md text-xs sm:text-sm"
          >
            Contact Us
          </Link>

          {/* অ্যানিমেটেড হ্যামবার্গার থেকে "X" বাটন */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            className="md:hidden w-9 h-9 flex flex-col items-center justify-center gap-1 rounded-full bg-white/10 hover:bg-white/20 transition cursor-pointer"
          >
            {/* উপরের লাইন */}
            <motion.span
              animate={
                isOpen
                  ? { rotate: 45, y: 6, backgroundColor: "#22d3ee" }
                  : { rotate: 0, y: 0, backgroundColor: "#ffffff" }
              }
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="w-4.5 h-0.5 rounded-full block"
            />
            {/* মাঝের লাইন */}
            <motion.span
              animate={
                isOpen
                  ? { opacity: 0, scaleX: 0 }
                  : { opacity: 1, scaleX: 1, backgroundColor: "#ffffff" }
              }
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="w-4.5 h-0.5 rounded-full block"
            />
            {/* নিচের লাইন */}
            <motion.span
              animate={
                isOpen
                  ? { rotate: -45, y: -6, backgroundColor: "#22d3ee" }
                  : { rotate: 0, y: 0, backgroundColor: "#ffffff" }
              }
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="w-4.5 h-0.5 rounded-full block"
            />
          </button>
        </div>
      </nav>

      {/* মোবাইল ড্রপডাউন মেনু */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -15, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="md:hidden mt-2 max-w-7xl mx-auto bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl p-4 flex flex-col gap-2.5 shadow-2xl text-center"
          >
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="py-2 text-sm font-medium text-white hover:text-cyan-300 transition rounded-lg hover:bg-white/5"
            >
              Home
            </Link>
            <Link
              href="/services"
              onClick={() => setIsOpen(false)}
              className="py-2 text-sm font-medium text-white hover:text-cyan-300 transition rounded-lg hover:bg-white/5"
            >
              Services
            </Link>
            <Link
              href="/about"
              onClick={() => setIsOpen(false)}
              className="py-2 text-sm font-medium text-white hover:text-cyan-300 transition rounded-lg hover:bg-white/5"
            >
              About
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
