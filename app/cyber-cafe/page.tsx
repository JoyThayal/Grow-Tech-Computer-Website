"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Clock, ShieldCheck, ChevronRight } from "lucide-react";
import { cyberCategories } from "@/app/data/cyberCafeServicesData";
import { createClient } from "@/lib/supabase/client";
import AuthModal from "@/components/ui/AuthModal";

export default function CyberCafePage() {
  const router = useRouter();
  const supabase = createClient();

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [pendingUrl, setPendingUrl] = useState("");

  const handleProtectedAction = async (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetUrl: string,
  ) => {
    e.preventDefault();
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      setPendingUrl(targetUrl);
      setShowLoginModal(true);
    } else {
      router.push(targetUrl);
    }
  };

  return (
    <main className="w-full min-h-screen bg-[#e6ecf2] text-slate-700 pt-28 pb-20 px-6 md:px-14 lg:px-20 font-sans selection:bg-cyan-600 selection:text-white">
      <div className="max-w-8xl mx-auto space-y-14">
        {/* Top Header */}
        <div className="space-y-4 max-w-3xl">
          <div>
            <span className="inline-block px-3.5 py-1 rounded-full text-[11px] font-mono tracking-wider text-cyan-700 shadow-[inset_2px_2px_5px_#c8d0d8,inset_-2px_-2px_5px_#ffffff]">
              CYBER CAFE & DIGITAL DESK · BARRACKPORE
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-slate-800">
            Cyber Cafe & Digital{" "}
            <span className="text-cyan-600">Service & Price Chart</span>
          </h1>
          <p className="text-slate-500 text-sm md:text-base leading-relaxed">
            Transparent online processing and service rates at Grow Tech. Click
            on any specific task below to instantly book your queue-free desk
            slot. 🖨️✨
          </p>

          {/* Notice Box */}
          <div className="p-4 rounded-2xl bg-[#e6ecf2] shadow-[inset_3px_3px_6px_#c8d0d8,inset_-3px_-3px_6px_#ffffff] text-xs text-slate-600 space-y-1">
            <span className="font-bold text-slate-700 block uppercase font-mono">
              ⚠️ Service Note:
            </span>
            <p>
              Service charges below are separate from any government fees,
              taxes, portal charges, or other applicable official fees.
            </p>
          </div>
        </div>

        {/* Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cyberCategories.map((cat) => {
            const Icon = cat.icon;
            const isSeasonal = cat.id === "seasonal_services";

            return (
              <div
                key={cat.id}
                className={`flex flex-col justify-between rounded-3xl p-7 md:p-8 transition-all duration-300 ${
                  isSeasonal
                    ? "bg-[radial-gradient(circle_at_center,#22d3ee,#06b6d4,#0891b2)] border border-cyan-300/40 shadow-2xl text-white relative overflow-hidden group"
                    : "bg-[#e6ecf2] text-slate-700 shadow-[9px_9px_18px_#c5ccd4,-9px_-9px_18px_#ffffff]"
                }`}
              >
                <div className="space-y-6 relative z-10">
                  <div className="flex items-center justify-between">
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                        isSeasonal
                          ? "bg-cyan-950/40 text-white border border-white/20 shadow-lg"
                          : "bg-[#e6ecf2] text-cyan-600 shadow-[5px_5px_10px_#c5ccd4,-5px_-5px_10px_#ffffff]"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <span
                      className={`text-[10px] font-mono uppercase tracking-wider px-3 py-1 rounded-full ${
                        isSeasonal
                          ? "text-white bg-cyan-950/40 border border-white/20 font-bold shadow-md animate-pulse"
                          : "text-slate-500 shadow-[inset_2px_2px_4px_#c8d0d8,inset_-2px_-2px_4px_#ffffff]"
                      }`}
                    >
                      {cat.tag}
                    </span>
                  </div>

                  <div>
                    <h2
                      className={`text-xl font-black tracking-tight ${
                        isSeasonal ? "text-white" : "text-slate-800"
                      }`}
                    >
                      {cat.title}
                    </h2>
                    <p
                      className={`text-xs mt-1.5 leading-relaxed ${
                        isSeasonal ? "text-cyan-100/90" : "text-slate-500"
                      }`}
                    >
                      {cat.desc}
                    </p>
                  </div>

                  {/* Service Items List */}
                  <div
                    className={`space-y-2 pt-2 border-t ${
                      isSeasonal ? "border-cyan-300/30" : "border-slate-300/60"
                    }`}
                  >
                    {cat.services.map((srv, i) => {
                      // targetUrl-এ সরাসরি service, issue এবং exact price পাস করা হচ্ছে
                      const targetUrl = `/book?category=CyberCafe&service=${encodeURIComponent(cat.title)}&issue=${encodeURIComponent(srv.name)}&price=${encodeURIComponent(srv.price)}`;
                      return (
                        <a
                          key={i}
                          href={targetUrl}
                          onClick={(e) => handleProtectedAction(e, targetUrl)}
                          className={`group flex items-center justify-between gap-3 text-xs px-4 py-3 rounded-xl transition-all cursor-pointer ${
                            isSeasonal
                              ? "bg-cyan-950/30 text-white hover:bg-cyan-900/60 border border-white/20 shadow-inner"
                              : "text-slate-700 shadow-[inset_2px_2px_5px_#c8d0d8,inset_-2px_-2px_5px_#ffffff] hover:shadow-[4px_4px_8px_#c5ccd4,-4px_-4px_8px_#ffffff]"
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span className="font-medium transition-colors">
                              {srv.name}
                            </span>
                            {srv.status === "seasonal" && (
                              <span className="text-[9px] font-mono bg-white/20 text-white px-2 py-0.5 rounded border border-white/30 uppercase font-bold">
                                Urgent
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            <span
                              className={`font-mono font-bold px-2.5 py-1 rounded-md ${
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
                </div>

                <div
                  className={`pt-6 mt-6 border-t flex items-center justify-between text-xs ${
                    isSeasonal
                      ? "border-cyan-300/30 text-cyan-100"
                      : "border-slate-300/60 text-slate-500"
                  }`}
                >
                  <div className="flex items-center gap-1.5 font-mono">
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
                        onClick={(e) =>
                          handleProtectedAction(e, fullServiceUrl)
                        }
                        className={`font-bold transition cursor-pointer ${
                          isSeasonal
                            ? "text-white hover:text-cyan-200 underline underline-offset-4"
                            : "text-cyan-600 hover:text-cyan-700"
                        }`}
                      >
                        Quick Booking →
                      </a>
                    );
                  })()}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Trust Bar */}
        <div className="rounded-2xl p-6 bg-[#e6ecf2] shadow-[6px_6px_14px_#c5ccd4,-6px_-6px_14px_#ffffff] flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>
              Strict privacy adherence for all submitted customer documents,
              application receipts, and credentials at Grow Tech Barrackpore! 🔒
            </span>
          </div>
          <a
            href="https://wa.me/91XXXXXXXXXX"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-semibold transition shrink-0 shadow-[4px_4px_8px_#c5ccd4,-4px_-4px_8px_#ffffff] active:scale-95"
          >
            Walk-in Inquiry 💬
          </a>
        </div>
      </div>

      {/* Auth Modal Component */}
      <AuthModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        pendingUrl={pendingUrl}
        brandName="GROW TECH DIGITAL"
      />
    </main>
  );
}
