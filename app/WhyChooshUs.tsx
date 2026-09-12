import { ShieldCheck, Cpu, Zap, Lock, Eye, Smile } from "lucide-react";

const features = [
  {
    title: "100% Transparent Diagnostics",
    tagline: "Transparent Care",
    desc: "No closed doors. We inspect your PC faults, hardware health, and documents directly at the desk right in front of you.",
    icon: Eye,
    highlight: "Zero Secret Replacements",
    className:
      "md:col-span-2 bg-gradient-to-br from-slate-900 to-slate-800 text-white border-slate-700/50",
    accent: "text-cyan-400",
    tagBg: "bg-cyan-500/10 border-cyan-500/20 text-cyan-300",
  },
  {
    title: "Genuine Parts Only",
    tagline: "Quality First",
    desc: "From NVMe SSDs to display panels, we install only verified and benchmarked original hardware components.",
    icon: Cpu,
    highlight: "Tested Durability",
    className:
      "md:col-span-1 bg-white text-slate-800 border-slate-200/80 shadow-sm",
    accent: "text-amber-500",
    tagBg: "bg-amber-50 border-amber-200 text-amber-700",
  },
  {
    title: "Zero-Leak Data Privacy",
    tagline: "Strict Privacy",
    desc: "Complete integrity for your hard drives and sensitive paperwork like Aadhaar, PAN, and banking receipts.",
    icon: Lock,
    highlight: "Safe & Confidential",
    className:
      "md:col-span-1 bg-white text-slate-800 border-slate-200/80 shadow-sm",
    accent: "text-emerald-500",
    tagBg: "bg-emerald-50 border-emerald-200 text-emerald-700",
  },
  {
    title: "Swift Counter Delivery",
    tagline: "Fast Turnaround",
    desc: "Instant color prints, rapid xerox, online form submissions, and fast-track thermal paste service without delays.",
    icon: Zap,
    highlight: "Immediate Support",
    className:
      "md:col-span-2 bg-gradient-to-r from-violet-900 via-indigo-950 to-slate-900 text-white border-violet-800/40",
    accent: "text-violet-400",
    tagBg: "bg-violet-500/10 border-violet-500/20 text-violet-300",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="w-full bg-[#f4f4f4] py-24 px-6 md:px-12 flex flex-col items-center">
      {/* সেকশন হেডার */}
      <div className="text-center max-w-2xl mb-16">
        <span className="inline-block text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full bg-cyan-100 text-cyan-900 border border-cyan-200/60 mb-3">
          The Grow Tech Difference
        </span>
        <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight uppercase">
          Why Choose Us
        </h2>
        <p className="text-slate-500 text-sm md:text-base mt-3 font-medium">
          Honest diagnostics, genuine components, and prompt cyber cafe workflow
          you can rely on.
        </p>
      </div>

      {/* বেন্টো গ্রিড */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-7xl">
        {features.map((item, idx) => {
          const IconComp = item.icon;
          return (
            <div
              key={idx}
              className={`rounded-3xl p-8 border flex flex-col justify-between relative overflow-hidden transition-all duration-300 hover:translate-y-[-4px]hover:-translate-y-1 hover:shadow-xl ${item.className}`}
            >
              <div>
                <div className="flex items-center justify-between gap-4 mb-6">
                  <span
                    className={`text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${item.tagBg}`}
                  >
                    {item.tagline}
                  </span>
                  <div
                    className={`p-2.5 rounded-2xl bg-white/10 backdrop-blur-sm ${item.accent}`}
                  >
                    <IconComp className="w-6 h-6" />
                  </div>
                </div>

                <h3 className="text-xl md:text-2xl font-bold tracking-tight mb-3">
                  {item.title}
                </h3>
                <p className="text-sm opacity-80 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-current/10 flex items-center justify-between text-xs font-semibold opacity-90">
                <span>{item.highlight}</span>
                <span className="text-base">→</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* বটম ট্রাস্ট বার */}
      <div className="mt-16 w-full max-w-5xl rounded-2xl bg-white border border-slate-200/80 p-6 md:p-8 flex flex-col sm:flex-row items-center justify-around gap-6 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-cyan-50 flex items-center justify-center text-cyan-600 font-bold">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="text-sm font-bold text-slate-900">
              Upfront Estimates
            </div>
            <div className="text-xs text-slate-500">
              Confirmed pricing before starting work
            </div>
          </div>
        </div>

        <div className="h-8 w-px bg-slate-200 hidden sm:block" />

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center text-amber-600 font-bold">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <div className="text-sm font-bold text-slate-900">
              Immediate Spot Service
            </div>
            <div className="text-xs text-slate-500">
              Printouts and online works finished live
            </div>
          </div>
        </div>

        <div className="h-8 w-px bg-slate-200 hidden sm:block" />

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 font-bold">
            <Smile className="w-5 h-5" />
          </div>
          <div>
            <div className="text-sm font-bold text-slate-900">
              Direct Technician Access
            </div>
            <div className="text-xs text-slate-500">
              Consult directly with the team in store
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
