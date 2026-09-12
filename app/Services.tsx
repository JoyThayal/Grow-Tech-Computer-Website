import Image from "next/image";

const servicesCards = [
  {
    id: 1,
    title: "Chip-Level Care",
    desc: "Precision motherboard diagnosis, screen replacements, thermal servicing, and liquid damage fixes to bring your device back to life.",
    img: "/images/services-repair.png",
    boxClass: "row-span-2 flex-col-reverse justify-between",
    imgClass: "w-72 h-72 -mt-10 -ml-10",
  },
  {
    id: 2,
    title: "Instant Digital Hub",
    desc: "Error-free government job applications, university forms, PAN/Aadhaar updates, and quick utility bill payments without the hassle.",
    img: "/images/services-folder.png",
    boxClass: "col-span-2 flex-row justify-between items-center",
    imgClass: "w-64 h-64 -mr-12 -mt-10",
  },
  {
    id: 3,
    title: "Sharp Prints",
    desc: "High-resolution color prints, urgent document xerox, lamination, and instant digital scanning ready in seconds.",
    img: "/images/services-printer.png",
    boxClass: "col-span-1 row-span-1 flex-col justify-between",
    imgClass: "w-44 h-44 self-end -mr-6 -mb-6",
  },
  {
    id: 4,
    title: "Speed Boost",
    desc: "Supercharge slow laptops and desktops with high-speed SSDs, RAM expansions, and clean OS installations.",
    img: "/images/services-ssd.png",
    boxClass: "col-span-1 row-span-1 flex-col justify-between",
    imgClass: "w-44 h-44 self-end -mr-6 -mb-6",
  },
  {
    id: 5,
    title: "Built for Power",
    desc: "Tailored custom desktop setups configured for gaming, video editing, and heavy office workloads within your budget.",
    img: "/images/services-cabinet.png",
    boxClass: "col-span-2 flex-row justify-between items-center",
    imgClass: "w-72 h-72 -mr-12 -mb-10",
  },
  {
    id: 6,
    title: "100% Privacy",
    desc: "Safe document handling, zero data leakage during servicing, and clear upfront pricing with genuine guidance.",
    img: "/images/services-secure.png",
    boxClass: "col-span-1 flex-col justify-between",
    imgClass: "w-44 h-44 self-end -mr-6 -mb-6",
  },
];

export default function ServicesSection() {
  return (
    <section className="w-full bg-[#f4f4f4] py-20 px-12 flex flex-col items-center justify-center">
      {/* হেডার */}
      <div className="w-full flex flex-col justify-between items-center mb-12 text-center">
        <h1 className="text-4xl font-black text-slate-900 leading-tight w-1/2">
          Smart Solutions for Every Device and Document.
        </h1>
        <p className="text-slate-500 text-sm mt-2 w-[60%]">
          Whether it’s upgrading your slow computer, fixing hardware glitches,
          or handling urgent online services—get everything done under one roof
          with speed and precision.
        </p>
      </div>

      <div className="grid grid-cols-3 grid-rows-3 gap-6 w-full max-w-6xl h-212.5">
        {servicesCards.map((card) => (
          <div
            key={card.id}
            className={`group bg-white rounded-3xl p-8 relative overflow-hidden border border-slate-200/80 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-cyan-400 hover:shadow-[0_15px_30px_rgba(6,182,212,0.15)] flex items-center ${card.boxClass}`}
          >
            <div className="z-10">
              <h3 className="text-2xl font-bold text-slate-900 transition-colors duration-300 group-hover:text-cyan-600">
                {card.title}
              </h3>
              <p className="text-slate-500 text-sm mt-2">{card.desc}</p>
            </div>

            <div
              className={`relative shrink-0 transition-transform duration-500 ease-out group-hover:scale-110 ${card.imgClass}`}
            >
              <Image
                src={card.img}
                alt={card.title}
                fill
                className="object-contain drop-shadow-md"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
