"use client";

import { ChevronDown, ChevronRight, Clock } from "lucide-react";
import { CyberCategory } from "@/app/data/cyberCafeServicesData";

interface Props {
  cat: CyberCategory;
  isOpen: boolean;
  onToggle: () => void;
  onSelectService: (
    e: React.MouseEvent<HTMLAnchorElement>,
    url: string,
  ) => void;
}

export default function CyberCategoryCard({
  cat,
  isOpen,
  onToggle,
  onSelectService,
}: Props) {
  const Icon = cat.icon;
  const isSeasonal = cat.id === "seasonal_services";

  return (
    <div
      className={`break-inside-avoid flex flex-col rounded-3xl p-5 sm:p-6 md:p-7 transition-all duration-300 ${
        isSeasonal
          ? "bg-[radial-gradient(circle_at_center,#22d3ee,#06b6d4,#0891b2)] border border-cyan-300/40 shadow-2xl text-white relative overflow-hidden"
          : "bg-[#e6ecf2] text-slate-700 shadow-[8px_8px_16px_#c5ccd4,-8px_-8px_16px_#ffffff]"
      }`}
    >
      {/* Accordion Header */}
      <div
        onClick={onToggle}
        className="cursor-pointer md:cursor-default select-none relative z-10"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className={`w-11 h-11 md:w-12 md:h-12 rounded-2xl flex items-center justify-center shrink-0 ${
                isSeasonal
                  ? "bg-cyan-950/40 text-white border border-white/20 shadow-lg"
                  : "bg-[#e6ecf2] text-cyan-600 shadow-[4px_4px_8px_#c5ccd4,-4px_-4px_8px_#ffffff]"
              }`}
            >
              <Icon className="w-5 h-5" />
            </div>
            <span
              className={`text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full ${
                isSeasonal
                  ? "text-white bg-cyan-950/40 border border-white/20 font-bold shadow-md animate-pulse"
                  : "text-slate-500 shadow-[inset_2px_2px_4px_#c8d0d8,inset_-2px_-2px_4px_#ffffff]"
              }`}
            >
              {cat.tag}
            </span>
          </div>

          <div
            className={`md:hidden w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-300 ${
              isSeasonal
                ? "bg-cyan-950/40 text-white border border-white/20"
                : "bg-[#e6ecf2] text-slate-600 shadow-[3px_3px_6px_#c5ccd4,-3px_-3px_6px_#ffffff]"
            }`}
          >
            <ChevronDown
              className={`w-4 h-4 transition-transform duration-300 ${
                isOpen
                  ? isSeasonal
                    ? "rotate-180 text-white"
                    : "rotate-180 text-cyan-600"
                  : ""
              }`}
            />
          </div>
        </div>

        <div className="mt-3.5">
          <h2
            className={`text-base sm:text-lg md:text-xl font-black tracking-tight ${
              isSeasonal ? "text-white" : "text-slate-800"
            }`}
          >
            {cat.title}
          </h2>
        </div>
      </div>

      {/* Collapsible Body */}
      <div
        className={`transition-all duration-300 overflow-hidden relative z-10 ${
          isOpen
            ? "max-h-350 opacity-100 mt-4 pt-4 border-t " +
              (isSeasonal ? "border-cyan-300/30" : "border-slate-300/60")
            : "max-h-0 opacity-0 md:max-h-none md:opacity-100 md:mt-4 md:pt-4 md:border-t " +
              (isSeasonal ? "md:border-cyan-300/30" : "md:border-slate-300/60")
        }`}
      >
        <p
          className={`text-xs mb-4 leading-relaxed p-3 rounded-xl ${
            isSeasonal
              ? "bg-cyan-950/25 border border-white/10 text-cyan-50"
              : "bg-[#e6ecf2] text-slate-500 shadow-[inset_2px_2px_4px_#c8d0d8,inset_-2px_-2px_4px_#ffffff]"
          }`}
        >
          {cat.desc}
        </p>

        <div
          className={`flex items-center justify-between px-2 pb-2 text-[10px] font-mono uppercase tracking-wider ${
            isSeasonal ? "text-cyan-100/70" : "text-slate-400"
          }`}
        >
          <span>Service Name</span>
          <span>Starts At</span>
        </div>

        <div className="space-y-2">
          {cat.services.map((srv, i) => {
            const targetUrl = `/book?category=CyberCafe&service=${encodeURIComponent(cat.title)}&issue=${encodeURIComponent(srv.name)}&price=${encodeURIComponent(srv.price)}`;
            return (
              <a
                key={i}
                href={targetUrl}
                onClick={(e) => onSelectService(e, targetUrl)}
                className={`group flex items-center justify-between gap-3 text-xs px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-xl transition-all cursor-pointer active:scale-[0.98] ${
                  isSeasonal
                    ? "bg-cyan-950/30 text-white hover:bg-cyan-900/60 border border-white/20 shadow-inner"
                    : "text-slate-700 shadow-[inset_2px_2px_5px_#c8d0d8,inset_-2px_-2px_5px_#ffffff] hover:shadow-[4px_4px_8px_#c5ccd4,-4px_-4px_8px_#ffffff]"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="font-medium transition-colors leading-snug">
                    {srv.name}
                  </span>
                  {srv.status === "seasonal" && (
                    <span className="text-[9px] font-mono bg-white/20 text-white px-2 py-0.5 rounded border border-white/30 uppercase font-bold shrink-0">
                      Urgent
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <span
                    className={`font-mono font-bold px-2.5 py-1 rounded-md text-[11px] sm:text-xs ${
                      isSeasonal
                        ? "bg-cyan-950 text-cyan-200 group-hover:bg-white group-hover:text-cyan-900"
                        : "text-cyan-600 bg-cyan-600/10"
                    }`}
                  >
                    {srv.price}
                  </span>
                  <ChevronRight
                    className={`w-3.5 h-3.5 transition-transform ${
                      isSeasonal
                        ? "text-white"
                        : "text-slate-400 group-hover:text-cyan-600"
                    } group-hover:translate-x-0.5`}
                  />
                </div>
              </a>
            );
          })}
        </div>

        <div
          className={`pt-4 mt-4 border-t flex items-center justify-between text-xs ${
            isSeasonal
              ? "border-cyan-300/30 text-cyan-100"
              : "border-slate-300/50 text-slate-500"
          }`}
        >
          <div className="flex items-center gap-1.5 font-mono text-[11px]">
            <Clock
              className={`w-3.5 h-3.5 ${
                isSeasonal ? "text-white" : "text-cyan-600"
              }`}
            />
            <span>Est: {cat.timing}</span>
          </div>
          {(() => {
            const fullServiceUrl = `/book?category=CyberCafe&service=${encodeURIComponent(cat.title)}`;
            return (
              <a
                href={fullServiceUrl}
                onClick={(e) => onSelectService(e, fullServiceUrl)}
                className={`font-bold transition cursor-pointer text-xs ${
                  isSeasonal
                    ? "text-white hover:text-cyan-200 underline underline-offset-4"
                    : "text-cyan-600 hover:text-cyan-700"
                }`}
              >
                Book Category →
              </a>
            );
          })()}
        </div>
      </div>
    </div>
  );
}
