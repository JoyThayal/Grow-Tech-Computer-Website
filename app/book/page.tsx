"use client";

import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, Suspense, useEffect } from "react";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import AuthModal from "@/components/ui/AuthModal";
import ServiceCategoryModal from "@/components/ui/ServiceCategoryModal";
import BookingSummary from "@/app/book/BookingSummary";
import BookingForm from "@/app/book/BookingForm";
import BookingSuccessModal from "@/app/book/BookingSuccessModal";

function BookingCanvas() {
  const params = useSearchParams();
  const router = useRouter();
  const supabase = createClient();
  const { auth } = supabase;

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(
    null,
  );
  const [mapsLink, setMapsLink] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  const service = params.get("service");
  const issue = params.get("issue");
  const category = params.get("category");
  const exactPrice = params.get("price");

  const isCyberCafe =
    category?.toLowerCase().includes("cyber") ||
    category?.toLowerCase().includes("cafe");

  const theme = {
    focusColor: isCyberCafe ? "#06b6d4" : "#cb784a",
    bgGlow: isCyberCafe ? "bg-cyan-500/10" : "bg-[#cb784a]/10",
    border: isCyberCafe ? "border-cyan-500/30" : "border-[#cb784a]/30",
    text: isCyberCafe ? "text-cyan-600" : "text-[#cb784a]",
    selection: isCyberCafe ? "selection:bg-cyan-600" : "selection:bg-[#cb784a]",
    button: isCyberCafe
      ? "bg-cyan-600 hover:bg-cyan-700 shadow-cyan-600/25"
      : "bg-[#cb784a] hover:bg-[#b5673d] shadow-[#cb784a]/25",
  };

  const assignedDay = "Monday, 14 Sept 2026";
  const assignedSlot = "04:00 PM - 05:00 PM";

  useEffect(() => {
    let isMounted = true;

    const verifyUserAndParams = async () => {
      const {
        data: { session },
      } = await auth.getSession();

      if (!isMounted) return;

      if (!session) {
        setShowLoginModal(true);
        setLoading(false);
        return;
      }

      const user = session.user;
      setName(user.user_metadata?.full_name || user.user_metadata?.name || "");
      setEmail(user.email || "");
      setPhone(user.user_metadata?.phone || "");
      setLocation(user.user_metadata?.location || "");

      if (user.user_metadata?.latitude && user.user_metadata?.longitude) {
        setCoords({
          lat: user.user_metadata.latitude,
          lng: user.user_metadata.longitude,
        });
      }
      setMapsLink(user.user_metadata?.maps_link || null);

      if (!service || !category) {
        setShowCategoryModal(true);
      }

      setLoading(false);
    };

    verifyUserAndParams();

    return () => {
      isMounted = false;
    };
  }, [auth, service, category]);

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      const finalMapsLink = coords
        ? `https://www.google.com/maps?q=${coords.lat},${coords.lng}`
        : location.trim()
          ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location.trim())}`
          : null;

      const { error } = await supabase.from("bookings").insert([
        {
          user_id: session?.user?.id || null,
          customer_name: name,
          email: email,
          phone: phone,
          customer_location: location,
          latitude: coords?.lat || null,
          longitude: coords?.lng || null,
          maps_link: finalMapsLink,
          service_category: category || (isCyberCafe ? "CyberCafe" : "Repair"),
          service_name: service,
          issue_task: issue,
          estimated_price: exactPrice ? decodeURIComponent(exactPrice) : "₹100",
          assigned_date: assignedDay,
          assigned_slot: assignedSlot,
          additional_notes: message,
          status: "pending",
        },
      ]);

      if (error) {
        alert("Booking failed: " + error.message);
      } else {
        setShowSuccessModal(true);
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      alert("Error: " + errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center text-slate-500 font-mono text-xs p-4">
        Verifying secure session... 🔒
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen bg-linear-to-br from-slate-100 via-[#e6ecf2] to-slate-200 text-slate-700 flex flex-col justify-between font-sans px-4 sm:px-8 md:px-12 lg:px-20 pb-10 sm:py-20 md:py-25 ${theme.selection} selection:text-white relative overflow-hidden`}
    >
      {/* Decorative Glows */}
      <div
        className={`absolute top-10 left-10 w-72 sm:w-96 h-72 sm:h-96 ${theme.bgGlow} rounded-full blur-3xl pointer-events-none`}
      />
      <div className="absolute bottom-10 right-10 w-72 sm:w-96 h-72 sm:h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <header className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-300/80 pb-5 max-w-5xl mx-auto w-full">
        <Link
          href="/"
          className="group inline-flex items-center gap-2 text-xs font-mono text-slate-500 hover:text-slate-800 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
          <span>BACK TO HOME</span>
        </Link>
        <span className="text-[11px] sm:text-xs font-mono tracking-wider text-slate-600 uppercase bg-white/70 backdrop-blur-md border border-white/50 shadow-xs px-3.5 py-1.5 rounded-full self-start sm:self-auto">
          Grow Tech · {isCyberCafe ? "Cyber Desk" : "Repair Desk"}
        </span>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-3xl mx-auto w-full py-8 sm:py-12 space-y-8 sm:space-y-10">
        <div className="space-y-3 sm:space-y-4">
          <div
            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${theme.bgGlow} border ${theme.border} ${theme.text} text-[11px] sm:text-xs font-mono`}
          >
            DIRECT COUNTER INTAKE (
            {isCyberCafe ? "CYBER CAFE" : "HARDWARE REPAIR"})
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-slate-800 uppercase leading-tight">
            Confirm Your <span className={theme.text}>Service Request</span>
          </h1>

          <BookingSummary
            service={service}
            issue={issue}
            exactPrice={exactPrice}
            assignedDay={assignedDay}
            assignedSlot={assignedSlot}
            theme={theme}
          />
        </div>

        <div className="w-full min-w-0">
          <BookingForm
            name={name}
            setName={setName}
            phone={phone}
            setPhone={setPhone}
            location={location}
            setLocation={(val) => {
              setLocation(val);
              setCoords(null);
            }}
            mapsLink={mapsLink}
            message={message}
            setMessage={setMessage}
            onSubmit={handleBookingSubmit}
            submitting={submitting}
            theme={theme}
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-300/80 pt-5 max-w-5xl mx-auto w-full flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left text-xs font-mono text-slate-500">
        <span className="text-[11px] sm:text-xs tracking-wider">
          NORTH 24 PARGANAS · NO ADVANCE FEES
        </span>
        <div className="flex items-center gap-2 text-slate-700 justify-center">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span className="text-[11px] sm:text-xs">
            Pay at shop counter upon completion
          </span>
        </div>
      </footer>

      {/* Modals */}
      <AuthModal
        isOpen={showLoginModal}
        onClose={() => router.push("/")}
        pendingUrl={typeof window !== "undefined" ? window.location.href : ""}
        brandName="GROW TECH SECURE"
      />

      <ServiceCategoryModal isOpen={showCategoryModal} />

      <BookingSuccessModal
        isOpen={showSuccessModal}
        serviceName={service || "Hardware & Cyber Service"}
        assignedDay={assignedDay}
        assignedSlot={assignedSlot}
      />
    </div>
  );
}

export default function BookingPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-100 flex items-center justify-center font-mono text-xs text-slate-500">
          Loading booking workspace...
        </div>
      }
    >
      <BookingCanvas />
    </Suspense>
  );
}
