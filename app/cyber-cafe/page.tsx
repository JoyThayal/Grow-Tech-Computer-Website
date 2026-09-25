"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { cyberCategories } from "@/app/data/cyberCafeServicesData";
import { createClient } from "@/lib/supabase/client";
import AuthModal from "@/components/ui/AuthModal";
import CyberCategoryCard from "@/app/cyber-cafe/CyberCategoryCard";
import CyberTrustBar from "@/app/cyber-cafe/CyberTrustBar";

export default function CyberCafePage() {
  const router = useRouter();
  const supabase = createClient();

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [pendingUrl, setPendingUrl] = useState("");
  const [openAccordion, setOpenAccordion] = useState<string | null>(
    "seasonal_services",
  );

  const toggleAccordion = (id: string) => {
    setOpenAccordion((prev) => (prev === id ? null : id));
  };

  const handleProtectedAction = async (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetUrl: string,
  ) => {
    e.preventDefault();
    e.stopPropagation();
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
    <main className="w-full min-h-screen bg-[#e6ecf2] text-slate-700 pt-24 md:pt-28 pb-20 px-4 sm:px-8 md:px-14 lg:px-20 font-sans selection:bg-cyan-600 selection:text-white">
      <div className="max-w-7xl mx-auto space-y-10 md:space-y-14">
        {/* Top Header */}
        <div className="space-y-4 max-w-3xl">
          <div>
            <span className="inline-block px-3.5 py-1 rounded-full text-[10px] md:text-[11px] font-mono tracking-wider text-cyan-700 shadow-[inset_2px_2px_5px_#c8d0d8,inset_-2px_-2px_5px_#ffffff]">
              CYBER CAFE & DIGITAL DESK · BARRACKPORE
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-slate-800 leading-tight">
            Cyber Cafe & Digital{" "}
            <span className="text-cyan-600">Service & Price Chart</span>
          </h1>
          <p className="text-slate-500 text-xs md:text-base leading-relaxed">
            Transparent online processing and service rates at Grow Tech. Tap or
            click on any specific task below to instantly book your queue-free
            desk slot. 🖨️✨
          </p>

          <div className="p-4 rounded-2xl bg-[#e6ecf2] shadow-[inset_3px_3px_6px_#c8d0d8,inset_-3px_-3px_6px_#ffffff] text-xs text-slate-600 space-y-1">
            <span className="font-bold text-slate-700 block uppercase font-mono">
              ⚠️ Service Note:
            </span>
            <p>
              Charges below indicate baseline starting service fees. Government
              fees, official portal charges, taxes, and stamp duties are charged
              separately where applicable.
            </p>
          </div>
        </div>

        {/* Masonry Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {cyberCategories.map((cat) => (
            <CyberCategoryCard
              key={cat.id}
              cat={cat}
              isOpen={openAccordion === cat.id}
              onToggle={() => toggleAccordion(cat.id)}
              onSelectService={handleProtectedAction}
            />
          ))}
        </div>

        {/* Trust Bar */}
        <CyberTrustBar />
      </div>

      {/* Auth Modal */}
      <AuthModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        pendingUrl={pendingUrl}
        brandName="GROW TECH DIGITAL"
      />
    </main>
  );
}
