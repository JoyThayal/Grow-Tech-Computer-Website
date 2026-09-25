import {
  CreditCard,
  FileText,
  Vote,
  Receipt,
  Landmark,
  Stamp,
  Award,
  ShieldCheck,
  LucideIcon,
} from "lucide-react";

export interface CyberServiceItem {
  name: string;
  price: string;
  status?: "active" | "seasonal";
}

export interface CyberCategory {
  id: string;
  title: string;
  desc: string;
  icon: LucideIcon;
  tag: string;
  timing: string;
  services: CyberServiceItem[];
}

export const cyberCategories: CyberCategory[] = [
  {
    id: "seasonal_services",
    title: "Seasonal & Special Portal Services",
    desc: "Special scholarship forms, exam registrations, or seasonal applications that open temporarily. Apply before portal closes!",
    icon: ShieldCheck,
    tag: "⚡ LIMITED TIME / LIVE",
    timing: "Live When Active",
    services: [
      {
        name: "Special Government Scholarship Form",
        price: "₹100",
        status: "seasonal",
      },
      {
        name: "Seasonal Admission / Recruitment Portal",
        price: "₹150",
        status: "seasonal",
      },
    ],
  },
  {
    id: "aadhaar",
    title: "Aadhaar Services",
    desc: "Appointments, PVC card ordering, and mobile/email/address updates.",
    icon: CreditCard,
    tag: "AADHAAR DESK",
    timing: "Instant / 10 Mins",
    services: [
      { name: "Aadhaar Seva Kendra Appointment", price: "₹50" },
      { name: "Aadhaar PVC Card Order", price: "₹120" },
      { name: "Aadhaar Mobile Number Update", price: "₹120" },
      { name: "Aadhaar Email Update", price: "₹120" },
      { name: "Aadhaar Address Update", price: "₹150" },
    ],
  },
  {
    id: "pan",
    title: "PAN Card Services",
    desc: "New PAN applications, corrections, updates, and PAN–Aadhaar linking.",
    icon: FileText,
    tag: "PAN DESK",
    timing: "1-3 Days",
    services: [
      { name: "Apply for New PAN Card", price: "₹200" },
      { name: "PAN Card Correction / Data Update", price: "₹200" },
      { name: "PAN–Aadhaar Linking", price: "₹100" },
    ],
  },
  {
    id: "voter",
    title: "Voter ID Services",
    desc: "New voter card applications, corrections, and mobile number linking.",
    icon: Vote,
    tag: "VOTER DESK",
    timing: "2-4 Days",
    services: [
      { name: "Apply for New Voter ID Card", price: "₹75" },
      { name: "Voter ID Correction", price: "₹50" },
      { name: "Mobile Number Linking with Voter ID", price: "₹50" },
    ],
  },
  {
    id: "ration",
    title: "Ration Card Services",
    desc: "New ration card applications, corrections, and mobile number linking/delinking.",
    icon: Receipt,
    tag: "RATION DESK",
    timing: "3-5 Days",
    services: [
      { name: "Apply for New Ration Card", price: "₹100" },
      { name: "Ration Card Update / Correction", price: "₹30" },
      { name: "Mobile Number Link / Delink", price: "₹50" },
    ],
  },
  {
    id: "property",
    title: "Property Services",
    desc: "Municipal property tax, revenue/khajna payments, and Porcha applications.",
    icon: Landmark,
    tag: "PROPERTY DESK",
    timing: "Same Day",
    services: [
      { name: "Property Tax — Municipal Area", price: "₹75" },
      { name: "Property Revenue / Khajna Payment", price: "₹100" },
      { name: "Apply for Porcha", price: "₹100" },
    ],
  },
  {
    id: "trade_license",
    title: "Trade License Services",
    desc: "Municipal & Panchayat area trade license applications, renewals, and updates.",
    icon: Stamp,
    tag: "TRADE DESK",
    timing: "1-2 Days",
    services: [
      { name: "New Trade License Application (Municipal)", price: "₹150" },
      { name: "Trade License Renewal (Municipal)", price: "₹100" },
      { name: "Trade License Cancellation", price: "₹100" },
      { name: "Trade License Data Change / Update", price: "₹100" },
      { name: "New Trade License Application (Panchayat)", price: "₹150" },
      { name: "Trade License Renewal (Panchayat)", price: "₹100" },
    ],
  },
  {
    id: "certificate",
    title: "Certificate Services",
    desc: "Birth and death certificate applications (new and delayed registrations).",
    icon: Award,
    tag: "CERTIFICATE DESK",
    timing: "2-5 Days",
    services: [
      { name: "New Birth Certificate Application", price: "₹150" },
      { name: "Delayed Birth Certificate Application", price: "₹200" },
      { name: "Death Certificate Application", price: "₹150" },
      { name: "Delayed Death Certificate Application", price: "₹200" },
    ],
  },
];
