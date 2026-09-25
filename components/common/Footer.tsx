"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  ShieldCheck,
  Zap,
  LogOut,
} from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaWhatsapp,
} from "react-icons/fa6";
import { createClient } from "@/lib/supabase/client";

const services = [
  "SSD & RAM Upgrade",
  "Motherboard Diagnostics",
  "Thermal Paste & Service",
  "OS & Software Setup",
  "Online Portal & Cards",
  "Color Print & Photocopy",
];

const companyLinks = [
  { label: "Services", href: "#services" },
  { label: "Price Rates", href: "#rates" },
  { label: "Why Us", href: "#why-us" },
  { label: "Reviews", href: "#testimonials" },
];

const socials = [
  { name: "Facebook", href: "https://facebook.com", icon: FaFacebookF },
  { name: "Instagram", href: "https://instagram.com", icon: FaInstagram },
  { name: "LinkedIn", href: "https://linkedin.com", icon: FaLinkedinIn },
  { name: "WhatsApp", href: "https://wa.me/91XXXXXXXXXX", icon: FaWhatsapp },
];

export default function Footer() {
  const router = useRouter();
  const supabase = createClient();

  // লগ-আউট হ্যান্ডেলার
  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

  return (
    <footer className="w-full bg-[#0a0b0e] text-neutral-400 border-t border-neutral-800/80 pt-12 sm:pt-16 pb-10 px-5 sm:px-8 md:px-14 lg:px-20 font-sans selection:bg-cyan-500 selection:text-black">
      <div className="max-w-7xl mx-auto">
        {/* ================= CTA ব্যানার ================= */}
        <div className="bg-linear-to-r from-neutral-900 via-neutral-900/90 to-[#0e171b] border border-neutral-800 hover:border-cyan-500/30 transition-colors p-6 sm:p-8 md:p-10 rounded-3xl mb-12 sm:mb-16 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-2 text-center md:text-left flex flex-col items-center md:items-start">
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold tracking-wide">
              <Zap className="w-3.5 h-3.5" /> FAST TECH SUPPORT & CYBER CARE
            </div>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
              Facing Hardware or Online Service Issues?
            </h3>
            <p className="text-neutral-400 text-xs sm:text-sm max-w-xl">
              Walk into our shop in Barrackpore or reach out via WhatsApp for
              immediate assistance.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-3 sm:gap-4 shrink-0">
            <a
              href="https://wa.me/918902709631"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-sm transition-all active:scale-95 flex items-center justify-center gap-2 shadow-lg shadow-[#25D366]/20"
            >
              {/* Real WhatsApp Icon */}
              <svg
                className="w-4 h-4 fill-current shrink-0"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              <span>WhatsApp</span>
            </a>

            <a
              href="tel:+919088879219"
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white text-sm font-semibold transition-all border border-neutral-700 hover:border-cyan-500/50 active:scale-95 flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4 text-cyan-400" />
              <span>Call</span>
            </a>
          </div>
        </div>

        {/* ================= মূল কলাম গ্রিড ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 pb-10 sm:pb-12 border-b border-neutral-800/80">
          {/* ব্র্যান্ড ও সোশ্যাল আইকন */}
          <div className="sm:col-span-2 lg:col-span-4 space-y-4 text-left">
            <Link
              href="/"
              className="text-2xl font-black text-white tracking-tight inline-block"
            >
              GROW{" "}
              <span className="text-cyan-400 drop-shadow-[0_0_12px_rgba(34,211,238,0.4)]">
                TECH
              </span>
            </Link>
            <p className="text-sm leading-relaxed max-w-sm text-neutral-400">
              Your dependable hardware diagnosis clinic and complete cyber
              service hub. High-speed SSD upgrades and dedicated client care.
            </p>
            <div className="flex gap-2.5 pt-1">
              {socials.map((s, idx) => {
                const Icon = s.icon;
                return (
                  <a
                    key={idx}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.name}
                    className="w-9 h-9 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-cyan-400 hover:border-cyan-500/40 hover:bg-neutral-800/80 transition-all"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* সার্ভিসেস */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-semibold uppercase text-white tracking-wider">
              Services
            </h4>
            <ul className="space-y-2 text-sm">
              {services.map((item, idx) => (
                <li
                  key={idx}
                  className="hover:text-cyan-400 transition-colors cursor-pointer"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* কোম্পানি লিংক */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-sm font-semibold uppercase text-white tracking-wider">
              Company
            </h4>
            <ul className="space-y-2 text-sm">
              {companyLinks.map((item, idx) => (
                <li key={idx}>
                  <Link
                    href={item.href}
                    className="hover:text-cyan-400 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ঠিকানা ও যোগাযোগ */}
          <div className="sm:col-span-2 lg:col-span-3 space-y-3">
            <h4 className="text-sm font-semibold uppercase text-white tracking-wider">
              Shop Address
            </h4>
            <div className="space-y-2.5 text-sm">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>Madhyamgram, North 24 Parganas, WB, India</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Mon - Sun: 10:00 AM - 10:00 PM</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>growtechofficials4@gmail.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* ================= ফুটার বটম ================= */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-neutral-500 text-center md:text-left">
          <div className="flex items-center justify-center gap-2">
            <ShieldCheck className="w-4 h-4 text-green-400 shrink-0" />
            <span>100% Genuine Components & Complete Data Privacy</span>
          </div>

          {/* লগ-আউট বাটন ও অন্যান্য লিংক */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 text-rose-400 hover:text-rose-300 font-semibold transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" /> Log Out
            </button>
            <Link
              href="/privacy"
              className="hover:text-cyan-400 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="hover:text-cyan-400 transition-colors"
            >
              Terms of Service
            </Link>
            <span>© {new Date().getFullYear()} Grow Tech.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
