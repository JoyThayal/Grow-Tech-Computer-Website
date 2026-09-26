"use client";

import {
  Calendar,
  Clock,
  MapPin,
  ExternalLink,
  CheckCircle2,
  Clock3,
  Wrench,
  XCircle,
  FileText,
  Monitor,
} from "lucide-react";

export interface BookingItem {
  id: string;
  created_at: string;
  service_category: string;
  service_name: string;
  issue_task: string;
  estimated_price: string;
  assigned_date: string;
  assigned_slot: string;
  customer_location?: string;
  maps_link?: string;
  additional_notes?: string;
  status: "pending" | "in_progress" | "completed" | "cancelled";
}

const getStatusBadge = (status: BookingItem["status"]) => {
  switch (status) {
    case "in_progress":
      return {
        label: "In Progress",
        icon: <Wrench className="w-3.5 h-3.5" />,
        classes: "bg-amber-50 text-amber-700 border-amber-200",
      };
    case "completed":
      return {
        label: "Completed",
        icon: <CheckCircle2 className="w-3.5 h-3.5" />,
        classes: "bg-emerald-50 text-emerald-700 border-emerald-200",
      };
    case "cancelled":
      return {
        label: "Cancelled",
        icon: <XCircle className="w-3.5 h-3.5" />,
        classes: "bg-rose-50 text-rose-700 border-rose-200",
      };
    default:
      return {
        label: "Request Received",
        icon: <Clock3 className="w-3.5 h-3.5" />,
        classes: "bg-blue-50 text-blue-700 border-blue-200",
      };
  }
};

export default function BookingCard({ item }: { item: BookingItem }) {
  const badge = getStatusBadge(item.status);
  const isCyber =
    item.service_category?.toLowerCase().includes("cyber") ||
    item.service_category?.toLowerCase().includes("cafe");

  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 shadow-xs space-y-4">
      {/* Top Bar */}
      <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-3.5">
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded-lg bg-slate-100 text-slate-600">
            {isCyber ? (
              <FileText className="w-4 h-4" />
            ) : (
              <Monitor className="w-4 h-4" />
            )}
          </span>
          <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">
            {item.service_category || "Service"}
          </span>
        </div>

        <span
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-medium ${badge.classes}`}
        >
          {badge.icon}
          {badge.label}
        </span>
      </div>

      {/* Service Info */}
      <div>
        <h3 className="text-base font-semibold text-slate-900">
          {item.service_name}
        </h3>
        {item.issue_task && (
          <p className="text-xs text-slate-600 mt-1">
            <span className="text-slate-400">Issue / Scope:</span>{" "}
            {item.issue_task}
          </p>
        )}
      </div>

      {/* Metadata Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
        <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-slate-700">
          <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span className="truncate">{item.assigned_date}</span>
        </div>

        <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-slate-700">
          <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span className="truncate">{item.assigned_slot}</span>
        </div>

        <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
          <span className="text-slate-500">Estimate:</span>
          <span className="font-semibold text-slate-900 font-mono">
            {item.estimated_price}
          </span>
        </div>
      </div>

      {/* Location Info */}
      {item.customer_location && (
        <div className="flex items-center justify-between text-xs bg-slate-50 border border-slate-100 px-3 py-2 rounded-xl text-slate-600">
          <div className="flex items-center gap-1.5 truncate pr-2">
            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate">{item.customer_location}</span>
          </div>
          {item.maps_link && (
            <a
              href={item.maps_link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-800 font-medium hover:underline inline-flex items-center gap-1 shrink-0 ml-2"
            >
              View Map <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>
      )}
    </div>
  );
}
