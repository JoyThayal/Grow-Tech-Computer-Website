"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Wrench, Printer, User as UserIcon } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";

const servicePages = [
  {
    name: "PC & Laptop Repair",
    href: "/repair",
    icon: Wrench,
    desc: "Diagnostics & chip-level fixes",
  },
  {
    name: "Cyber Cafe & Forms",
    href: "/cyber-cafe",
    icon: Printer,
    desc: "Prints, Xerox & online cards",
  },
];

const homeSections = [
  { name: "Overview", href: "/#services" },
  { name: "How It Works", href: "/#how-it-works" },
  { name: "Why Us", href: "/#why-us" },
  { name: "Rates", href: "/#rates" },
  { name: "Before & After", href: "/#before-after" },
  { name: "Reviews", href: "/#testimonials" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdown, setDropdown] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const supabase = createClient();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      },
    );

    return () => listener.subscription.unsubscribe();
  }, [supabase.auth]);

  return (
    <header className="w-full fixed top-0 left-0 z-50 p-3 sm:p-5">
      <nav className="max-w-7xl mx-auto bg-black/20 backdrop-blur-md border border-white/10 flex items-center justify-between rounded-full px-4 sm:px-6 py-2 text-white shadow-lg">
        <div className="flex items-center justify-center gap-2 sm:gap-3">
          <Link href="/">
            <Image
              src="/images/g.png"
              width={90}
              height={90}
              alt="Logo"
              className="w-16 sm:w-20 md:w-22.5 object-contain"
              priority
            />
          </Link>
          <span className="uppercase font-semibold hidden sm:block text-sm">
            Computer Services
          </span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-7 text-sm font-medium">
          <Link href="/" className="hover:text-cyan-300 transition">
            Home
          </Link>

          {/* Services Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setDropdown("services")}
            onMouseLeave={() => setDropdown(null)}
          >
            <button className="flex items-center gap-1 hover:text-cyan-300 transition py-2 cursor-pointer">
              Services{" "}
              <ChevronDown
                className={`w-4 h-4 transition-transform ${dropdown === "services" ? "rotate-180 text-cyan-300" : ""}`}
              />
            </button>
            <AnimatePresence>
              {dropdown === "services" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full -left-4 w-64 bg-slate-950/95 backdrop-blur-xl border border-white/15 rounded-2xl p-2 shadow-2xl flex flex-col gap-1"
                >
                  {servicePages.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/10 transition"
                      >
                        <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-white">
                            {item.name}
                          </div>
                          <div className="text-[10px] text-slate-400">
                            {item.desc}
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Explore Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setDropdown("explore")}
            onMouseLeave={() => setDropdown(null)}
          >
            <button className="flex items-center gap-1 hover:text-cyan-300 transition py-2 cursor-pointer">
              Explore{" "}
              <ChevronDown
                className={`w-4 h-4 transition-transform ${dropdown === "explore" ? "rotate-180 text-cyan-300" : ""}`}
              />
            </button>
            <AnimatePresence>
              {dropdown === "explore" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full -left-6 w-44 bg-slate-950/95 backdrop-blur-xl border border-white/15 rounded-2xl p-2 shadow-2xl flex flex-col gap-1 text-xs"
                >
                  {homeSections.map((sec) => (
                    <Link
                      key={sec.href}
                      href={sec.href}
                      className="p-2 rounded-lg hover:bg-white/10 text-slate-300 hover:text-cyan-300 transition"
                    >
                      {sec.name}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link href="/about" className="hover:text-cyan-300 transition">
            About
          </Link>
        </div>

        {/* Action Buttons: Contact Us + Circular Profile Icon */}
        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/contact"
            className="bg-white text-slate-950 font-semibold px-4 py-1.5 rounded-full hover:bg-cyan-100 transition text-xs sm:text-sm shadow-sm"
          >
            Contact Us
          </Link>

          {user && (
            <Link
              href="/profile"
              title="My Profile"
              className="w-9 h-9 sm:w-9.5 sm:h-9.5 rounded-full bg-cyan-400 hover:bg-cyan-300 text-slate-950 flex items-center justify-center transition-all duration-300 shadow-md shadow-cyan-500/20 active:scale-95 border border-cyan-200"
            >
              <UserIcon className="w-4.5 h-4.5 stroke-[2.5]" />
            </Link>
          )}

          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            className="md:hidden w-8.5 h-8.5 sm:w-9 sm:h-9 flex flex-col items-center justify-center gap-1 rounded-full bg-white/10 cursor-pointer"
          >
            <motion.span
              animate={
                isOpen
                  ? { rotate: 45, y: 6, backgroundColor: "#22d3ee" }
                  : { rotate: 0, y: 0, backgroundColor: "#fff" }
              }
              className="w-4.5 h-0.5 rounded-full block"
            />
            <motion.span
              animate={
                isOpen
                  ? { opacity: 0 }
                  : { opacity: 1, backgroundColor: "#fff" }
              }
              className="w-4.5 h-0.5 rounded-full block"
            />
            <motion.span
              animate={
                isOpen
                  ? { rotate: -45, y: -6, backgroundColor: "#22d3ee" }
                  : { rotate: 0, y: 0, backgroundColor: "#fff" }
              }
              className="w-4.5 h-0.5 rounded-full block"
            />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden mt-2 bg-black/85 backdrop-blur-2xl border border-white/10 rounded-2xl p-4 flex flex-col gap-2 max-h-[80vh] overflow-y-auto"
          >
            {user && (
              <Link
                href="/profile"
                onClick={() => setIsOpen(false)}
                className="py-2 px-3 text-sm font-semibold text-cyan-300 bg-white/5 rounded-xl flex items-center gap-2"
              >
                <UserIcon className="w-4 h-4" /> My Profile
              </Link>
            )}

            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="py-1.5 px-3 text-sm font-medium hover:text-cyan-300"
            >
              Home
            </Link>

            <div className="text-[11px] font-mono uppercase text-slate-400 px-3 pt-1">
              Services
            </div>
            {servicePages.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="py-1.5 px-3 text-xs text-cyan-200 hover:text-cyan-300"
              >
                {item.name}
              </Link>
            ))}

            <div className="text-[11px] font-mono uppercase text-slate-400 px-3 pt-2">
              Sections
            </div>
            <div className="grid grid-cols-2 gap-1 px-1">
              {homeSections.map((sec) => (
                <Link
                  key={sec.href}
                  href={sec.href}
                  onClick={() => setIsOpen(false)}
                  className="py-1 px-2 text-xs text-slate-300 hover:text-cyan-300 rounded hover:bg-white/5"
                >
                  {sec.name}
                </Link>
              ))}
            </div>

            <div className="h-px bg-white/10 my-1" />
            <Link
              href="/about"
              onClick={() => setIsOpen(false)}
              className="py-1.5 px-3 text-sm hover:text-cyan-300"
            >
              About
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
