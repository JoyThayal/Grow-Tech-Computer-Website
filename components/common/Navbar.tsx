import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="w-full fixed top-0 left-0 z-50 p-5">
      <nav className="max-w-7xl mx-auto bg-black/20 backdrop-blur-md border border-white/10 flex items-center justify-between rounded-full px-6 py-2 text-white shadow-lg">
        {/* লোগো */}
        <Link href="/" className="flex items-center">
          <Image
            src="/images/logo-1.png"
            width={90}
            height={90}
            alt="Logo"
            className="object-contain"
            priority
          />
        </Link>

        {/* ডেস্কটপ মেনু (মোবাইলে লুকানো, বড় স্ক্রিনে দৃশ্যমান) */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link href="/" className="hover:text-cyan-300 transition">
            Home
          </Link>
          <Link href="/services" className="hover:text-cyan-300 transition">
            Services
          </Link>
          <Link href="/about" className="hover:text-cyan-300 transition">
            About
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            className="bg-white text-slate-950 font-semibold px-5 py-1.5 rounded-full hover:bg-cyan-100 hover:scale-105 transition shadow-md text-sm"
          >
            Contact Us
          </Link>
        </div>
      </nav>
    </header>
  );
}
