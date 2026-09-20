"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Clock, ShieldCheck, ChevronRight, Wrench } from "lucide-react";
import { repairCategories } from "@/app/data/repairServicesData";
import { createClient } from "@/lib/supabase/client";
import AuthModal from "@/components/ui/AuthModal";

export default function RepairPage() {
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
    <main className="w-full min-h-screen bg-[#e6ecf2] text-slate-700 pt-28 pb-20 px-6 md:px-14 lg:px-20 font-sans selection:bg-[#cb784a] selection:text-white">
      <div className="max-w-8xl mx-auto space-y-14">
        {/* Top Header */}
        <div className="space-y-4 max-w-3xl">
          <div>
            <span className="inline-block px-3.5 py-1 rounded-full text-[11px] font-mono tracking-wider text-[#b5673d] shadow-[inset_2px_2px_5px_#c8d0d8,inset_-2px_-2px_5px_#ffffff]">
              HARDWARE & DIAGNOSTICS CLINIC · BARRACKPORE
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-slate-800">
            PC & Electronics{" "}
            <span className="text-[#cb784a]">Service & Price Chart</span>
          </h1>
          <p className="text-slate-500 text-sm md:text-base leading-relaxed">
            Transparent labour and service rates at Grow Tech. Click on any
            specific service item below to instantly book your priority desk
            slot. 🛠️
          </p>

          {/* Notice Box */}
          <div className="p-4 rounded-2xl bg-[#e6ecf2] shadow-[inset_3px_3px_6px_#c8d0d8,inset_-3px_-3px_6px_#ffffff] text-xs text-slate-600 space-y-1">
            <span className="font-bold text-slate-700 block uppercase font-mono">
              ⚠️ Lab Note:
            </span>
            <p>
              Charges below are service/labour fees. Spare parts, replacement
              components, ink, and consumables are charged separately where
              applicable.
            </p>
          </div>
        </div>

        {/* Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {repairCategories.map((cat) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.id}
                className="flex flex-col justify-between rounded-3xl bg-[#e6ecf2] p-7 md:p-8 shadow-[9px_9px_18px_#c5ccd4,-9px_-9px_18px_#ffffff]"
              >
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-[#e6ecf2] flex items-center justify-center text-[#cb784a] shadow-[5px_5px_10px_#c5ccd4,-5px_-5px_10px_#ffffff]">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 px-3 py-1 rounded-full shadow-[inset_2px_2px_4px_#c8d0d8,inset_-2px_-2px_4px_#ffffff]">
                      {cat.tag}
                    </span>
                  </div>

                  <div>
                    <h2 className="text-xl font-black text-slate-800 tracking-tight">
                      {cat.title}
                    </h2>
                    <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                      {cat.desc}
                    </p>
                  </div>

                  {/* Service Items Table / List with Prices */}
                  <div className="space-y-2 pt-2 border-t border-slate-300/60">
                    {cat.services.map((srv, i) => {
                      const targetUrl = `/book?category=Repair&service=${encodeURIComponent(cat.title)}&issue=${encodeURIComponent(srv.name)}&price=${encodeURIComponent(srv.price)}`;
                      return (
                        <a
                          key={i}
                          href={targetUrl}
                          onClick={(e) => handleProtectedAction(e, targetUrl)}
                          className="group flex items-center justify-between gap-3 text-xs text-slate-700 px-4 py-3 rounded-xl shadow-[inset_2px_2px_5px_#c8d0d8,inset_-2px_-2px_5px_#ffffff] hover:shadow-[4px_4px_8px_#c5ccd4,-4px_-4px_8px_#ffffff] transition-all cursor-pointer"
                        >
                          <span className="font-medium group-hover:text-[#cb784a] transition-colors">
                            {srv.name}
                          </span>
                          <div className="flex items-center gap-2 shrink-0">
                            <span className="font-mono font-bold text-[#cb784a] bg-[#cb784a]/10 px-2.5 py-1 rounded-md">
                              {srv.price}
                            </span>
                            <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#cb784a] group-hover:translate-x-0.5 transition-transform" />
                          </div>
                        </a>
                      );
                    })}
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-300/60 flex items-center justify-between text-xs text-slate-500">
                  <div className="flex items-center gap-1.5 font-mono">
                    <Clock className="w-3.5 h-3.5 text-[#cb784a]" />
                    <span>Est: {cat.turnaround}</span>
                  </div>
                  {(() => {
                    const fullServiceUrl = `/book?category=Repair&service=${encodeURIComponent(cat.title)}`;
                    return (
                      <a
                        href={fullServiceUrl}
                        onClick={(e) =>
                          handleProtectedAction(e, fullServiceUrl)
                        }
                        className="font-bold text-[#cb784a] hover:text-[#b5673d] transition cursor-pointer"
                      >
                        Book Category →
                      </a>
                    );
                  })()}
                </div>
              </div>
            );
          })}
        </div>

        {/* Diagnosis & Repair Policies Section */}
        <div className="rounded-3xl bg-[#e6ecf2] p-8 md:p-10 shadow-[9px_9px_18px_#c5ccd4,-9px_-9px_18px_#ffffff] space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#e6ecf2] flex items-center justify-center text-[#cb784a] shadow-[4px_4px_8px_#c5ccd4,-4px_-4px_8px_#ffffff]">
              <Wrench className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight">
              Service & Diagnosis Policy
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-600 leading-relaxed">
            <div className="space-y-4 p-5 rounded-2xl shadow-[inset_3px_3px_6px_#c8d0d8,inset_-3px_-3px_6px_#ffffff]">
              <p>
                <strong>1. Testing / Diagnosis Charge (₹100):</strong> If a
                customer brings a computer, laptop or printer solely for fault
                identification, the testing fee is ₹100.
              </p>
              <p>
                <strong>2. Repair Adjustment:</strong> If you proceed with the
                repair/service, the testing charge is adjusted against the final
                service bill.
              </p>
              <p>
                <strong>3. Unfixable Issues:</strong> If the problem cannot be
                solved after reasonable diagnosis, no repair fee is charged
                beyond standard testing.
              </p>
              <p>
                <strong>4. Rejection of Repair:</strong> If the fault is
                identified but you choose not to proceed with the repair, only
                the standard diagnosis charge applies.
              </p>
            </div>

            <div className="space-y-4 p-5 rounded-2xl shadow-[inset_3px_3px_6px_#c8d0d8,inset_-3px_-3px_6px_#ffffff]">
              <p>
                <strong>5. Spare Parts:</strong> Components, ink, cartridges,
                and cables are billed separately as per actual market rates.
              </p>
              <p>
                <strong>6. Data Responsibility:</strong> Customers must back up
                essential data before OS installation or hardware repair. Grow
                Tech is not liable for unexpected data loss.
              </p>
              <p>
                <strong>7. Customer Approval:</strong> Paid repairs begin
                strictly after customer confirmation and approval.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Trust Bar */}
        <div className="rounded-2xl p-6 bg-[#e6ecf2] shadow-[6px_6px_14px_#c5ccd4,-6px_-6px_14px_#ffffff] flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>
              All repairs include standard component warranties and transparent
              pre-inspection pricing at Grow Tech Barrackpore! 🛡️
            </span>
          </div>
          <a
            href="https://wa.me/91XXXXXXXXXX"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-xl bg-[#cb784a] hover:bg-[#b5673d] text-white font-semibold transition shrink-0 shadow-[4px_4px_8px_#c5ccd4,-4px_-4px_8px_#ffffff] active:scale-95"
          >
            Direct WhatsApp Desk 💬
          </a>
        </div>
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
