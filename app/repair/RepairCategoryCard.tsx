"use client";

import { ChevronDown, ChevronRight, Clock } from "lucide-react";
import { RepairCategory } from "@/app/data/repairServicesData";

interface Props {
  cat: RepairCategory;
  isOpen: boolean;
  onToggle: () => void;
  onSelectService: (
    e: React.MouseEvent<HTMLAnchorElement>,
    url: string,
  ) => void;
}

export default function RepairCategoryCard({
  cat,
  isOpen,
  onToggle,
  onSelectService,
}: Props) {
  const Icon = cat.icon;

  return (
    <div className="break-inside-avoid flex flex-col rounded-3xl bg-[#e6ecf2] p-5 sm:p-6 md:p-7 shadow-[8px_8px_16px_#c5ccd4,-8px_-8px_16px_#ffffff] transition-all duration-300">
      {/* Header */}
      <div
        onClick={onToggle}
        className="cursor-pointer md:cursor-default select-none"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 md:w-12 md:h-12 rounded-2xl bg-[#e6ecf2] flex items-center justify-center text-[#cb784a] shadow-[4px_4px_8px_#c5ccd4,-4px_-4px_8px_#ffffff] shrink-0">
              <Icon className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 px-2.5 py-1 rounded-full shadow-[inset_2px_2px_4px_#c8d0d8,inset_-2px_-2px_4px_#ffffff]">
              {cat.tag}
            </span>
          </div>

          <div className="md:hidden w-8 h-8 rounded-full bg-[#e6ecf2] flex items-center justify-center shadow-[3px_3px_6px_#c5ccd4,-3px_-3px_6px_#ffffff] text-slate-600 transition-transform duration-300">
            <ChevronDown
              className={`w-4 h-4 transition-transform duration-300 ${
                isOpen ? "rotate-180 text-[#cb784a]" : ""
              }`}
            />
          </div>
        </div>

        <div className="mt-3.5">
          <h2 className="text-base sm:text-lg md:text-xl font-black text-slate-800 tracking-tight">
            {cat.title}
          </h2>
        </div>
      </div>

      {/* Body */}
      <div
        className={`transition-all duration-300 overflow-hidden ${
          isOpen
            ? "max-h-350 opacity-100 mt-4 pt-4 border-t border-slate-300/60"
            : "max-h-0 opacity-0 md:max-h-none md:opacity-100 md:mt-4 md:pt-4 md:border-t md:border-slate-300/60"
        }`}
      >
        <p className="text-xs text-slate-500 mb-4 leading-relaxed bg-[#e6ecf2] p-3 rounded-xl shadow-[inset_2px_2px_4px_#c8d0d8,inset_-2px_-2px_4px_#ffffff]">
          {cat.desc}
        </p>

        <div className="flex items-center justify-between px-2 pb-2 text-[10px] font-mono text-slate-400 uppercase tracking-wider">
          <span>Service Name</span>
          <span>Starts At</span>
        </div>

        <div className="space-y-2">
          {cat.services.map((srv, i) => {
            const targetUrl = `/book?category=Repair&service=${encodeURIComponent(cat.title)}&issue=${encodeURIComponent(srv.name)}&price=${encodeURIComponent(srv.price)}`;
            return (
              <a
                key={i}
                href={targetUrl}
                onClick={(e) => onSelectService(e, targetUrl)}
                className="group flex items-center justify-between gap-3 text-xs text-slate-700 px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-xl shadow-[inset_2px_2px_5px_#c8d0d8,inset_-2px_-2px_5px_#ffffff] hover:shadow-[4px_4px_8px_#c5ccd4,-4px_-4px_8px_#ffffff] active:scale-[0.98] transition-all cursor-pointer"
              >
                <span className="font-medium group-hover:text-[#cb784a] transition-colors leading-snug">
                  {srv.name}
                </span>

                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="font-mono font-bold text-[#cb784a] bg-[#cb784a]/10 px-2.5 py-1 rounded-md text-[11px] sm:text-xs">
                    {srv.price}
                  </span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#cb784a] group-hover:translate-x-0.5 transition-transform" />
                </div>
              </a>
            );
          })}
        </div>

        <div className="pt-4 mt-4 border-t border-slate-300/50 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-1.5 font-mono text-[11px]">
            <Clock className="w-3.5 h-3.5 text-[#cb784a]" />
            <span>Est: {cat.turnaround}</span>
          </div>
          {(() => {
            const fullServiceUrl = `/book?category=Repair&service=${encodeURIComponent(cat.title)}`;
            return (
              <a
                href={fullServiceUrl}
                onClick={(e) => onSelectService(e, fullServiceUrl)}
                className="font-bold text-[#cb784a] hover:text-[#b5673d] transition cursor-pointer text-xs"
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
