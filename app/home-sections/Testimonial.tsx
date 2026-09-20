"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Biprajit Sarkar",
    role: "Business Owner",
    company: "Maa Bhavani Traders",
    quote:
      "Urgent government portal submissions and billing tasks are handled with extreme care. Hassle-free experience every time.",
    img: "/images/testimonial-biprajit.png",
  },
  {
    id: 2,
    name: "Joy Debroy",
    role: "High School Teacher",
    company: "Barrackpore Academy",
    quote:
      "Got school project documentation and premium color prints with crisp clarity. Fast turnaround and completely dependable.",
    img: "/images/testimonial-joy.png",
  },
  {
    id: 3,
    name: "Pushkar Ghosh",
    role: "Freelance Video Editor",
    company: "Creative Frame Studio",
    quote:
      "My editing rig was sluggish; they upgraded it with a genuine NVMe SSD and thermal cleanup. Running silky smooth now!",
    img: "/images/testimonial-biprajit.png",
  },
  {
    id: 4,
    name: "Rahul Ghosh",
    role: "College Student",
    company: "B.R.S.N. College",
    quote:
      "Quick assistance with exam form fill-ups, admit printouts, and digital portal aid. Very supportive and polite behavior.",
    img: "/images/testimonial-joy.png",
  },
  {
    id: 5,
    name: "Suman Halder",
    role: "Pharmacy Owner",
    company: "Arogya Medicine Corner",
    quote:
      "Fixed our counter billing PC and reinstalled the software without any data loss. Top-notch diagnostic work.",
    img: "/images/testimonial-biprajit.png",
  },
  {
    id: 6,
    name: "Debasish Mukherjee",
    role: "Aspirant",
    company: "Govt Exam Prep Desk",
    quote:
      "PAN card correction and document scans were handled on an urgent basis. You can rely on them with eyes closed.",
    img: "/images/testimonial-joy.png",
  },
  {
    id: 7,
    name: "Anik Dey",
    role: "Photographer",
    company: "Motion Drops Media",
    quote:
      "Photo laminations, high-res prints, and quick PC optimization—all done at fair, transparent pricing. Pure dedication!",
    img: "/images/testimonial-biprajit.png",
  },
];

export default function TestimonialSection() {
  const [start, setStart] = useState(0);
  const [active, setActive] = useState(0);
  const [cardsCount, setCardsCount] = useState(4);
  const total = testimonials.length;

  useEffect(() => {
    const updateCardsCount = () => {
      if (window.innerWidth < 640) {
        setCardsCount(1);
      } else if (window.innerWidth < 1024) {
        setCardsCount(2);
      } else {
        setCardsCount(4);
      }
    };

    updateCardsCount();
    window.addEventListener("resize", updateCardsCount);
    return () => window.removeEventListener("resize", updateCardsCount);
  }, []);

  const slide = (dir: number) => {
    setStart((prev) => (prev + dir + total) % total);
    setActive(0);
  };

  const visibleCards = Array.from(
    { length: cardsCount },
    (_, i) => testimonials[(start + i) % total],
  );

  return (
    <section id="testimonials" className="w-full bg-white py-16 md:py-20 px-5 sm:px-8 md:px-14 select-none transform-[translateZ(0)]">
      <div className="max-w-7xl mx-auto">
        {/* হেডার */}
        <div className="max-w-xl mb-8 md:mb-10 text-center sm:text-left">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-slate-900 mb-2 md:mb-3">
            Why Clients Rely on Us
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm">
            Specializing in diagnostics, workstation reliability, and
            high-precision care.
          </p>
        </div>

        <div className="relative">
          {/* স্ক্রল বাটন (মোবাইলে কিছুটা ভেতরের দিকে অফসেট যাতে স্ক্রিন থেকে ছিটকে না যায়) */}
          <button
            type="button"
            onClick={() => slide(-1)}
            aria-label="Previous slide"
            className="absolute -left-2 sm:-left-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-[#cb784a] text-white flex items-center justify-center shadow-lg hover:bg-[#b5673d] transition-transform active:scale-90 cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={() => slide(1)}
            aria-label="Next slide"
            className="absolute -right-2 sm:-right-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-[#cb784a] text-white flex items-center justify-center shadow-lg hover:bg-[#b5673d] transition-transform active:scale-90 cursor-pointer"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* কার্ডের ফ্রেম: ডেস্কটপে অপরিবর্তিত h-107.5 ও flex gap-4 */}
          <div className="h-100 sm:h-105 md:h-107.5 flex gap-3 sm:gap-4 overflow-hidden py-2 contain-paint">
            {visibleCards.map((item, idx) => {
              const isExpanded = active === idx;
              return (
                <div
                  key={`${item.id}-${start}-${idx}`}
                  onMouseEnter={() => setActive(idx)}
                  onClick={() => setActive(idx)}
                  className={`relative h-full rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer shadow-md will-change-[flex-grow] transition-[flex-grow] duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${
                    cardsCount === 1
                      ? "flex-1 w-full"
                      : isExpanded
                        ? "flex-2"
                        : "flex-[1.4] min-w-35 sm:min-w-45"
                  }`}
                >
                  {/* ব্যাকগ্রাউন্ড ছবি */}
                  <Image
                    src={item.img}
                    alt={item.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
                    className="object-cover pointer-events-none transform-gpu"
                    priority={idx === 0}
                  />

                  {/* ডার্ক গ্রেডিয়েন্ট */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/95 via-black/40 to-transparent pointer-events-none" />

                  {/* টেক্সট কন্টেইনার: মোবাইলে w-full যাতে ফ্লেক্সিবল থাকে, ডেস্কটপে min-w-[320px] সুরক্ষিত */}
                  <div className="absolute inset-0 px-4 sm:px-6 pb-6 sm:pb-8 pt-4 flex flex-col justify-end text-white z-10 pointer-events-none overflow-hidden">
                    <div className="w-full sm:w-[320px] sm:min-w-[320px]">
                      {/* হেডার ব্লক */}
                      <div>
                        <div className="font-bold text-base sm:text-lg md:text-xl tracking-tight truncate">
                          {item.company}
                        </div>
                        <div className="text-[11px] sm:text-xs text-slate-300 truncate">
                          {item.name} · {item.role}
                        </div>
                      </div>

                      {/* কোট ব্লক: মোবাইলে সবসময় উন্মুক্ত (কারণ ১টি কার্ড), ডেস্কটপে হোভার এক্সপ্যান্ড */}
                      <div
                        className={`overflow-hidden transition-all duration-400 ease-out ${
                          cardsCount === 1 || isExpanded
                            ? "max-h-32 opacity-100 mt-2.5 sm:mt-3 pt-2.5 sm:pt-3 border-t border-white/20"
                            : "max-h-0 opacity-0 mt-0 pt-0 border-transparent"
                        }`}
                      >
                        <p className="text-xs text-slate-200 leading-relaxed line-clamp-3">
                          “{item.quote}”
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
