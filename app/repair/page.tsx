"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { repairCategories } from "@/app/data/repairServicesData";
import { createClient } from "@/lib/supabase/client";
import AuthModal from "@/components/ui/AuthModal";
import RepairCategoryCard from "@/app/repair/RepairCategoryCard";
import RepairPolicySection from "@/app/repair/RepairPolicySection";
import RepairTrustBar from "@/app/repair/RepairTrustBar";

export default function RepairPage() {
  const router = useRouter();
  const supabase = createClient();

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [pendingUrl, setPendingUrl] = useState("");
  const [openAccordion, setOpenAccordion] = useState<string | null>("desktop");

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
    <main className="w-full min-h-screen bg-[#e6ecf2] text-slate-700 pt-24 md:pt-28 pb-20 px-4 sm:px-8 md:px-14 lg:px-20 font-sans selection:bg-[#cb784a] selection:text-white">
      <div className="max-w-7xl mx-auto space-y-10 md:space-y-14">
        {/* Top Header */}
        <div className="space-y-4 max-w-3xl">
          <div>
            <span className="inline-block px-3.5 py-1 rounded-full text-[10px] md:text-[11px] font-mono tracking-wider text-[#b5673d] shadow-[inset_2px_2px_5px_#c8d0d8,inset_-2px_-2px_5px_#ffffff]">
              HARDWARE & DIAGNOSTICS CLINIC · BARRACKPORE
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-slate-800 leading-tight">
            PC & Electronics{" "}
            <span className="text-[#cb784a]">Service & Price Chart</span>
          </h1>
          <p className="text-slate-500 text-xs md:text-base leading-relaxed">
            Transparent labour and starting rates at Grow Tech. Tap or click on
            any service item below to instantly book your priority desk slot. 🛠️
          </p>

          <div className="p-4 rounded-2xl bg-[#e6ecf2] shadow-[inset_3px_3px_6px_#c8d0d8,inset_-3px_-3px_6px_#ffffff] text-xs text-slate-600 space-y-1">
            <span className="font-bold text-slate-700 block uppercase font-mono">
              ⚠️ Lab Note:
            </span>
            <p>
              Charges below indicate baseline starting labour fees. Any
              replacement components, spare parts, and consumables are charged
              separately where applicable.
            </p>
          </div>
        </div>

        {/* Pinterest-style Masonry Columns */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {repairCategories.map((cat) => (
            <RepairCategoryCard
              key={cat.id}
              cat={cat}
              isOpen={openAccordion === cat.id}
              onToggle={() => toggleAccordion(cat.id)}
              onSelectService={handleProtectedAction}
            />
          ))}
        </div>

        {/* Diagnosis & Repair Policies */}
        <RepairPolicySection />

        {/* Bottom Trust Bar */}
        <RepairTrustBar />
      </div>

      {/* Auth Modal Component */}
      <AuthModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        pendingUrl={pendingUrl}
        brandName="GROW TECH REPAIR"
      />
    </main>
  );
}
