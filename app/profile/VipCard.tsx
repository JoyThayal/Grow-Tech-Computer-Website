"use client";

import { useState } from "react";
import { Download, ShieldCheck, MapPin, Sparkles, Loader2 } from "lucide-react";
import Image from "next/image";
import { toPng } from "html-to-image";

interface ClientPassProps {
  fullName: string;
  email: string;
  location: string;
}

export default function VipCard({
  fullName,
  email,
  location,
}: ClientPassProps) {
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async () => {
    const card = document.getElementById("growtech-client-pass");
    if (!card) return;

    setDownloading(true);

    try {
      const dataUrl = await toPng(card, {
        cacheBust: true,
        pixelRatio: 2,
      });

      const a = document.createElement("a");
      a.download = `GrowTech-Pass-${fullName.trim() || "Client"}.png`;
      a.href = dataUrl;
      a.click();
    } catch (err) {
      console.error("Download failed:", err);
      alert("Failed to download pass. Please try again!");
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="space-y-3">
      {/* 💳 Grow Tech Multi-Tone Tech Pass */}
      <div
        id="growtech-client-pass"
        className="relative overflow-hidden rounded-[26px] bg-gradient-to-br from-[#070b19] via-[#0b152d] to-[#040814] border border-cyan-500/30 p-6 text-white shadow-2xl transition-all duration-300 hover:border-cyan-400/60"
      >
        {/* Dynamic Multi-Color Glows */}
        <div className="absolute -top-14 -right-14 w-48 h-48 bg-cyan-500/25 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-14 -left-14 w-44 h-44 bg-blue-600/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 left-1/3 w-32 h-32 bg-indigo-500/15 rounded-full blur-2xl pointer-events-none" />

        {/* Ambient Top Light Beam */}
        <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />

        {/* Card Header: Official Logo + Status Tag */}
        <div className="relative z-10 flex items-center justify-between pb-4 border-b border-white/10">
          <div className="relative w-36 sm:w-44 h-11">
            <Image
              src="/images/g.png"
              alt="Grow Tech"
              fill
              className="object-contain object-left"
              priority
              unoptimized
            />
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-500/30 shadow-xs">
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-[10px] font-mono font-semibold tracking-wider text-cyan-200 uppercase">
              Verified
            </span>
          </div>
        </div>

        {/* Client Identity Information */}
        <div className="relative z-10 py-5 space-y-1">
          <div className="flex items-center gap-1 text-[10px] font-mono uppercase tracking-widest text-cyan-400 font-semibold">
            <Sparkles className="w-3 h-3 text-cyan-400" /> Authorized Account
          </div>
          <h2 className="text-xl font-black text-white tracking-tight truncate drop-shadow-sm">
            {fullName || "Valued Client"}
          </h2>
          <p className="text-xs font-mono text-slate-300 truncate">{email}</p>
        </div>

        {/* Card Footer: Location & Verified UID */}
        <div className="relative z-10 pt-4 border-t border-white/10 flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 text-slate-300 truncate max-w-[200px]">
            <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
            <span className="truncate text-[11px] font-medium text-slate-200">
              {location ? location.split(",")[0] : "Barrackpore Hub"}
            </span>
          </div>

          <span className="text-[10px] font-mono font-semibold text-cyan-300 bg-cyan-950/60 px-2.5 py-1 rounded-lg border border-cyan-500/30">
            GT-ID: {email ? btoa(email).slice(0, 7).toUpperCase() : "GT-9204"}
          </span>
        </div>
      </div>

      {/* Download Action Button */}
      <button
        type="button"
        onClick={handleDownload}
        disabled={downloading}
        className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 text-xs font-semibold tracking-wide transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98] disabled:opacity-60"
      >
        {downloading ? (
          <>
            <Loader2 className="w-3.5 h-3.5 animate-spin text-slate-700" />
            Generating Pass...
          </>
        ) : (
          <>
            <Download className="w-3.5 h-3.5 text-slate-700" />
            Download Client Pass (.PNG)
          </>
        )}
      </button>
    </div>
  );
}
