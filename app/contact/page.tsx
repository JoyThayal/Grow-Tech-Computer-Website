import Link from "next/link";
import {
  ArrowLeft,
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageSquare,
  Laptop,
  Printer,
  ExternalLink,
} from "lucide-react";

export const metadata = {
  title: "Contact Us | Grow Tech Computer",
  description:
    "Get in touch with Grow Tech for computer repair, hardware diagnostics, and cyber cafe services in Madhyamgram.",
};

export default function ContactPage() {
  const whatsappNumber = "918902709631";
  const whatsappMessage = encodeURIComponent(
    "Hello Grow Tech! I would like to inquire about your repair/cyber services.",
  );

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-950 to-indigo-950 text-slate-100 flex flex-col justify-between font-sans px-4 sm:px-8 md:px-16 lg:px-24 pt-20 sm:pt-24 pb-10 selection:bg-indigo-500 selection:text-white relative overflow-hidden">
      {/* Decorative Background Glows */}
      <div className="absolute top-10 left-10 w-72 sm:w-96 h-72 sm:h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-72 sm:w-96 h-72 sm:h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <header className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-5 sm:pb-6 max-w-5xl mx-auto w-full">
        <Link
          href="/"
          className="group inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
          <span>BACK TO HOME</span>
        </Link>
        <span className="text-[11px] sm:text-xs font-mono tracking-wider text-slate-300 uppercase bg-slate-900/80 backdrop-blur-md border border-slate-800 shadow-sm px-3.5 py-1.5 rounded-full">
          Grow Tech · Helpdesk
        </span>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-5xl mx-auto w-full py-8 sm:py-12 space-y-8 sm:space-y-12">
        <div className="space-y-3 text-center max-w-2xl mx-auto px-2">
          <span className="inline-block px-3.5 py-1 rounded-full text-xs font-mono font-medium text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 uppercase tracking-widest">
            Direct Assistance
          </span>
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight text-white uppercase leading-tight">
            Connect With <span className="text-indigo-400">Grow Tech</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-lg mx-auto">
            Reach out directly for rapid hardware diagnosis, laptop maintenance,
            or daily cyber cafe and digital documentation assistance.
          </p>
        </div>

        {/* Contact Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 w-full min-w-0">
          {/* Card 1: Direct Messaging & Calling */}
          <div className="bg-slate-900/70 backdrop-blur-xl border border-slate-800 p-5 sm:p-7 md:p-8 rounded-3xl shadow-2xl space-y-6 flex flex-col justify-between w-full min-w-0">
            <div className="space-y-4">
              <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2.5">
                <MessageSquare className="w-5 h-5 text-indigo-400 shrink-0" />
                <span>Instant Communication</span>
              </h2>
              <p className="text-xs text-slate-400 leading-relaxed">
                Connect via WhatsApp for real-time customer support or call our
                counter directly during working hours.
              </p>

              <div className="space-y-3 pt-2">
                {/* WhatsApp Link */}
                <a
                  href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 sm:p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60 hover:bg-slate-800 transition group cursor-pointer gap-2"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-[#25D366] text-white flex items-center justify-center shadow-md shadow-[#25D366]/20 shrink-0">
                      <svg
                        className="w-5 h-5 sm:w-6 sm:h-6 fill-current"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                    </div>
                    <div className="truncate">
                      <div className="text-xs font-bold text-slate-200 group-hover:text-white">
                        WhatsApp Us
                      </div>
                      <div className="text-[11px] text-slate-400 font-mono truncate">
                        Instant Support Desk
                      </div>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-[#25D366] group-hover:translate-x-0.5 transition-transform shrink-0" />
                </a>

                {/* Direct Phone Call */}
                <a
                  href="tel:+918902709631"
                  className="flex items-center justify-between p-3.5 sm:p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60 hover:bg-slate-800 transition group cursor-pointer gap-2"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-sm shrink-0">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div className="truncate">
                      <div className="text-xs font-bold text-slate-200">
                        Phone Call
                      </div>
                      <div className="text-[11px] text-slate-400 font-mono truncate">
                        +91 890 2709 631
                      </div>
                    </div>
                  </div>
                  <span className="text-[11px] sm:text-xs font-semibold text-indigo-400 shrink-0">
                    Call Now →
                  </span>
                </a>

                {/* Email Address */}
                <div className="flex items-center gap-3 p-3.5 sm:p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-cyan-600 text-white flex items-center justify-center shadow-sm shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-slate-200">
                      Email Address
                    </div>
                    <div className="text-[11px] text-slate-400 font-mono break-all">
                      growtechofficials4@gmail.com
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-slate-800 pt-4 flex items-center gap-2 text-xs font-mono text-slate-400">
              <Clock className="w-4 h-4 text-indigo-400 shrink-0" />
              <span className="text-[11px] sm:text-xs">
                Mon – Sun: 10:00 AM – 10:00 PM
              </span>
            </div>
          </div>

          {/* Card 2: Center Location & Counter Services */}
          <div className="bg-slate-900/70 backdrop-blur-xl border border-slate-800 p-5 sm:p-7 md:p-8 rounded-3xl shadow-2xl space-y-6 flex flex-col justify-between w-full min-w-0">
            <div className="space-y-4">
              <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2.5">
                <MapPin className="w-5 h-5 text-indigo-400 shrink-0" />
                <span>Store Location</span>
              </h2>

              <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 space-y-2">
                <span className="text-xs font-bold text-indigo-400 font-mono uppercase tracking-wider block">
                  Grow Tech Counter
                </span>
                <p className="text-xs sm:text-sm font-medium text-slate-200 leading-relaxed wrap-break-word">
                  Netaji Nagar, Katakhal, Madhyamgram, Kolkata, West Bengal -
                  700132, India
                </p>
              </div>

              <div className="space-y-2.5 pt-2">
                <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                  Active Desks Available:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div className="p-3 sm:p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60 text-xs flex items-center gap-2.5 font-medium text-slate-200">
                    <Laptop className="w-4 h-4 text-indigo-400 shrink-0" />
                    <span className="truncate">PC & Hardware Care</span>
                  </div>
                  <div className="p-3 sm:p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60 text-xs flex items-center gap-2.5 font-medium text-slate-200">
                    <Printer className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span className="truncate">Cyber Desk</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/book"
                className="w-full py-3.5 px-4 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs tracking-wider uppercase text-center transition shadow-lg shadow-indigo-600/25 cursor-pointer block active:scale-[0.99]"
              >
                Book Counter Appointment →
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-800 pt-6 max-w-5xl mx-auto w-full text-center text-[10px] sm:text-xs font-mono text-slate-500 uppercase leading-relaxed px-2">
        GROW TECH COMPUTER · Madhyamgram CENTER · ALL RIGHTS RESERVED
      </footer>
    </div>
  );
}
