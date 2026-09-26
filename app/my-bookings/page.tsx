"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { ArrowLeft, Loader2, FileText, ChevronRight } from "lucide-react";
import BookingCard, { BookingItem } from "@/app/my-bookings/BookingCard";

export default function MyBookingsPage() {
  const router = useRouter();
  const supabase = createClient();

  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"active" | "history">("active");
  const [bookings, setBookings] = useState<BookingItem[]>([]);

  useEffect(() => {
    async function fetchUserBookings() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/");
        return;
      }

      const { data, error } = await supabase
        .from("bookings")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (!error && data) {
        setBookings(data as BookingItem[]);
      }

      setLoading(false);
    }

    fetchUserBookings();
  }, [router, supabase]);

  const activeBookings = bookings.filter(
    (b) => b.status === "pending" || b.status === "in_progress",
  );
  const pastBookings = bookings.filter(
    (b) => b.status === "completed" || b.status === "cancelled",
  );

  const displayedBookings =
    activeTab === "active" ? activeBookings : pastBookings;

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center text-slate-500">
        <Loader2 className="w-6 h-6 animate-spin text-slate-700 mb-2" />
        <p className="text-xs font-medium tracking-wide uppercase">
          Loading service records...
        </p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-100 text-slate-800 py-25 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Breadcrumb & Navigation */}
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-slate-800 transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
          </Link>
          <span className="text-xs font-medium text-slate-500 bg-white border border-slate-200 px-3 py-1 rounded-full shadow-xs">
            Grow Tech Customer Portal
          </span>
        </div>

        {/* Header */}
        <div className="border-b border-slate-200 pb-5">
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Service Bookings
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Check the status of your current requests or review previous shop
            orders.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex gap-2 p-1 bg-slate-200/70 rounded-xl w-fit">
          <button
            onClick={() => setActiveTab("active")}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition cursor-pointer flex items-center gap-2 ${
              activeTab === "active"
                ? "bg-white text-slate-900 shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <span>Active Requests</span>
            <span
              className={`text-[11px] px-1.5 py-0.2 rounded-full ${
                activeTab === "active"
                  ? "bg-slate-100 text-slate-800"
                  : "bg-slate-300 text-slate-600"
              }`}
            >
              {activeBookings.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab("history")}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition cursor-pointer flex items-center gap-2 ${
              activeTab === "history"
                ? "bg-white text-slate-900 shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <span>History</span>
            <span
              className={`text-[11px] px-1.5 py-0.2 rounded-full ${
                activeTab === "history"
                  ? "bg-slate-100 text-slate-800"
                  : "bg-slate-300 text-slate-600"
              }`}
            >
              {pastBookings.length}
            </span>
          </button>
        </div>

        {/* Content Section */}
        {displayedBookings.length === 0 ? (
          <div className="text-center py-16 px-4 bg-white border border-slate-200 rounded-2xl shadow-xs space-y-4">
            <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 mx-auto flex items-center justify-center">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-800">
                {activeTab === "active"
                  ? "No active service requests"
                  : "No previous records found"}
              </h3>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                {activeTab === "active"
                  ? "You do not have any pending appointments or repair jobs at this moment."
                  : "Completed or cancelled service requests will be archived here."}
              </p>
            </div>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-semibold bg-slate-900 text-white hover:bg-slate-800 px-4 py-2.5 rounded-xl transition"
            >
              Book a Service <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {displayedBookings.map((item) => (
              <BookingCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
