import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="w-full h-20 p-5 fixed">
      <nav className="max-w-7xl mx-auto bg-white/20 flex items-center justify-between rounded-full px-5 py-1 text-black backdrop:blur-md">
        <Image src={"/images/logo-1.png"} width={100} height={100} alt=""/>
        <div className="flex gap-5">
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
        </div>
        <Link href="/" className="bg-black text-white px-5 py-1 rounded-full">Contact</Link>
      </nav>
    </header>
  );
}
