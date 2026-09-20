import {
  Laptop,
  Monitor,
  HardDrive,
  Printer,
  Gamepad2,
  Network,
  Cpu,
  ShieldCheck,
} from "lucide-react";
import { LucideIcon } from "lucide-react";

export interface RepairServiceItem {
  name: string;
  price: string;
}

export interface RepairCategory {
  id: string;
  title: string;
  desc: string;
  icon: LucideIcon;
  tag: string;
  turnaround: string;
  services: RepairServiceItem[];
}

export const repairCategories: RepairCategory[] = [
  {
    id: "desktop",
    title: "Computer / Desktop Services",
    desc: "Complete desktop diagnostics, OS installation, hardware setup, and performance tuning.",
    icon: Monitor,
    tag: "DESKTOP CLINIC",
    turnaround: "1-2 Hours",
    services: [
      { name: "Desktop Diagnosis / Testing", price: "₹100" },
      { name: "Desktop General Service & Cleaning", price: "₹300" },
      { name: "Desktop Formatting / OS Installation", price: "₹300" },
      { name: "Desktop Service + Formatting", price: "₹400" },
      { name: "Desktop Software Installation", price: "₹100+" },
      { name: "Desktop Driver Installation", price: "₹100" },
      { name: "Desktop Virus / Malware Removal", price: "₹200+" },
      { name: "Desktop Hardware Installation", price: "₹100+" },
      { name: "Desktop RAM / SSD / HDD Installation", price: "₹150" },
      { name: "Desktop Data Backup / Transfer", price: "₹200+" },
    ],
  },
  {
    id: "laptop",
    title: "Laptop Services",
    desc: "Advanced laptop care, thermal cleaning, formatting, and dead laptop troubleshooting.",
    icon: Laptop,
    tag: "LAPTOP CARE",
    turnaround: "2-4 Hours",
    services: [
      { name: "Laptop Diagnosis / Testing", price: "₹100" },
      { name: "Laptop General Service & Cleaning", price: "₹400" },
      { name: "Laptop Formatting / OS Installation", price: "₹400" },
      { name: "Laptop Service + Formatting", price: "₹500" },
      { name: "Laptop Software Installation", price: "₹100+" },
      { name: "Laptop Driver Installation", price: "₹100" },
      { name: "Laptop Virus / Malware Removal", price: "₹200+" },
      { name: "Laptop RAM / SSD / HDD Installation", price: "₹150" },
      { name: "Laptop Data Backup / Transfer", price: "₹200+" },
      { name: "Dead / No-Power Laptop Diagnosis", price: "₹300" },
      { name: "Dead Laptop Repair", price: "₹1,200+ / Call" },
    ],
  },
  {
    id: "software",
    title: "Windows & Software Services",
    desc: "Genuine setup, MS Office, driver installations, and system optimization.",
    icon: ShieldCheck,
    tag: "SOFTWARE & OS",
    turnaround: "30-60 Mins",
    services: [
      { name: "Windows Installation", price: "₹300" },
      { name: "Windows Reinstallation + Basic Setup", price: "₹400" },
      { name: "Genuine Windows Activation Setup", price: "₹100" },
      { name: "Basic Software Installation", price: "₹100+" },
      { name: "MS Office Installation / Setup", price: "₹150+" },
      { name: "Browser & Basic Utility Setup", price: "₹50" },
      { name: "Printer Driver Installation", price: "₹100" },
      { name: "Antivirus Installation", price: "₹100" },
      { name: "System Optimization", price: "₹200" },
      { name: "Boot / Startup Problem Diagnosis", price: "₹150" },
    ],
  },
  {
    id: "storage",
    title: "Data & Storage Services",
    desc: "SSD upgrades, cloning, health checks, and professional data recovery assessment.",
    icon: HardDrive,
    tag: "DATA STORAGE",
    turnaround: "Same Day",
    services: [
      { name: "HDD / SSD Installation", price: "₹150" },
      { name: "HDD / SSD Cloning", price: "₹400+" },
      { name: "Data Transfer — Basic", price: "₹200+" },
      { name: "Data Backup", price: "₹200+" },
      { name: "Hard Drive Health Check", price: "₹100" },
      { name: "Basic Data Recovery Assessment", price: "₹300" },
      { name: "Data Recovery — Successful Recovery", price: "₹500+" },
    ],
  },
  {
    id: "printer",
    title: "Printer Services",
    desc: "Printer diagnostics, head cleaning, Wi-Fi setup, and cartridge troubleshooting.",
    icon: Printer,
    tag: "PRINTER LAB",
    turnaround: "2-3 Hours",
    services: [
      { name: "Printer Diagnosis / Testing", price: "₹100" },
      { name: "Printer General Service & Cleaning", price: "₹400+" },
      { name: "Printer Head / Nozzle Cleaning", price: "₹250+" },
      { name: "Printer Setup with Computer", price: "₹150" },
      { name: "Printer Wi-Fi Setup", price: "₹200" },
      { name: "Printer Troubleshooting", price: "₹200+" },
      { name: "Printer Repair", price: "₹400+ / Call" },
      { name: "Cartridge / Ink Related Service", price: "₹100+" },
    ],
  },
  {
    id: "gaming_audio",
    title: "Gaming Console & Speaker Services",
    desc: "PS5 console cleaning, speaker troubleshooting, and audio diagnostics.",
    icon: Gamepad2,
    tag: "GAMING & AUDIO",
    turnaround: "1-2 Days",
    services: [
      { name: "PS5 / PlayStation Cleaning", price: "₹600" },
      { name: "Small Speaker Service / Cleaning", price: "₹100" },
      { name: "Large Speaker Diagnosis / Service", price: "Call for Price" },
      { name: "Speaker / Audio Troubleshooting", price: "₹100+" },
    ],
  },
  {
    id: "network",
    title: "Network & Internet Services",
    desc: "Wi-Fi setup, router configuration, LAN troubleshooting, and network sharing.",
    icon: Network,
    tag: "NETWORKING",
    turnaround: "1 Hour",
    services: [
      { name: "Wi-Fi / Router Setup", price: "₹200" },
      { name: "Router Configuration", price: "₹200" },
      { name: "Computer Network Setup", price: "₹200+" },
      { name: "LAN Cable / Network Troubleshooting", price: "₹150+" },
      { name: "Printer Network Sharing Setup", price: "₹200" },
      { name: "Basic Internet Connection Troubleshooting", price: "₹100" },
    ],
  },
  {
    id: "hardware",
    title: "Hardware Installation & Assembly",
    desc: "RAM upgrades, SMPS replacement, CPU cooler setup, and full PC assembly.",
    icon: Cpu,
    tag: "HARDWARE LAB",
    turnaround: "1-3 Hours",
    services: [
      { name: "RAM Installation", price: "₹100" },
      { name: "SSD / HDD Installation", price: "₹150" },
      { name: "SMPS Replacement", price: "₹150" },
      { name: "CPU Cooler Installation", price: "₹200" },
      { name: "PC Component Installation", price: "₹100+" },
      { name: "Desktop Assembly Service", price: "₹500+" },
      { name: "Computer Cleaning & Cable Management", price: "₹300+" },
    ],
  },
];
