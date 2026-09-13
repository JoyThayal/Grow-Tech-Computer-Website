import Image from "next/image";

const servicesCards = [
  {
    id: 1,
    title: "Chip-Level Care",
    desc: "Precision motherboard diagnosis, screen replacements, thermal servicing, and liquid damage fixes to bring your device back to life.",
    img: "/images/services-repair.png",
    boxClass: "lg:row-span-2 flex-col-reverse justify-between",
    imgClass:
      "w-52 h-52 sm:w-60 sm:h-60 lg:w-72 lg:h-72 mt-2 lg:-mt-10 lg:-ml-10 self-center lg:self-start",
  },
  {
    id: 2,
    title: "Instant Digital Hub",
    desc: "Error-free government job applications, university forms, PAN/Aadhaar updates, and quick utility bill payments without the hassle.",
    img: "/images/services-folder.png",
    boxClass:
      "lg:col-span-2 flex-col-reverse sm:flex-row justify-between items-center",
    imgClass:
      "w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64 mt-4 sm:mt-0 sm:-mr-8 lg:-mr-12 lg:-mt-10",
  },
  {
    id: 3,
    title: "Sharp Prints",
    desc: "High-resolution color prints, urgent document xerox, lamination, and instant digital scanning ready in seconds.",
    img: "/images/services-printer.png",
    boxClass: "lg:col-span-1 lg:row-span-1 flex-col justify-between",
    imgClass:
      "w-36 h-36 sm:w-40 sm:h-40 lg:w-44 lg:h-44 self-center sm:self-end mt-4 sm:mt-0 sm:-mr-4 lg:-mr-6 sm:-mb-4 lg:-mb-6",
  },
  {
    id: 4,
    title: "Speed Boost",
    desc: "Supercharge slow laptops and desktops with high-speed SSDs, RAM expansions, and clean OS installations.",
    img: "/images/services-ssd.png",
    boxClass: "lg:col-span-1 lg:row-span-1 flex-col justify-between",
    imgClass:
      "w-36 h-36 sm:w-40 sm:h-40 lg:w-44 lg:h-44 self-center sm:self-end mt-4 sm:mt-0 sm:-mr-4 lg:-mr-6 sm:-mb-4 lg:-mb-6",
  },
  {
    id: 5,
    title: "Built for Power",
    desc: "Tailored custom desktop setups configured for gaming, video editing, and heavy office workloads within your budget.",
    img: "/images/services-cabinet.png",
    boxClass:
      "lg:col-span-2 flex-col-reverse sm:flex-row justify-between items-center",
    imgClass:
      "w-52 h-52 sm:w-60 sm:h-60 lg:w-72 lg:h-72 mt-4 sm:mt-0 sm:-mr-8 lg:-mr-12 sm:-mb-6 lg:-mb-10",
  },
  {
    id: 6,
    title: "100% Privacy",
    desc: "Safe document handling, zero data leakage during servicing, and clear upfront pricing with genuine guidance.",
    img: "/images/services-secure.png",
    boxClass: "lg:col-span-1 flex-col justify-between",
    imgClass:
      "w-36 h-36 sm:w-40 sm:h-40 lg:w-44 lg:h-44 self-center sm:self-end mt-4 sm:mt-0 sm:-mr-4 lg:-mr-6 sm:-mb-4 lg:-mb-6",
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="w-full bg-[#f4f4f4] py-14 sm:py-16 lg:py-20 px-5 sm:px-8 lg:px-12 flex flex-col items-center justify-center">
      {/* হেডার: ডেস্কটপে তোমার আগের w-1/2 ও w-[60%] অপরিবর্তিত */}
      <div className="w-full flex flex-col justify-between items-center mb-8 sm:mb-10 lg:mb-12 text-center">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 leading-tight w-full sm:w-4/5 lg:w-1/2">
          Smart Solutions for Every Device and Document.
        </h1>
        <p className="text-slate-500 text-xs sm:text-sm mt-2 w-full sm:w-4/5 lg:w-[60%]">
          Whether it’s upgrading your slow computer, fixing hardware glitches,
          or handling urgent online services—get everything done under one roof
          with speed and precision.
        </p>
      </div>

      {/* গ্রিড কন্টেইনার: ডেস্কটপে হুবহু max-w-6xl h-212.5 grid-cols-3 grid-rows-3 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:grid-rows-3 gap-5 lg:gap-6 w-full max-w-6xl h-auto lg:h-212.5">
        {servicesCards.map((card) => (
          <div
            key={card.id}
            className={`group bg-white rounded-3xl p-6 sm:p-7 lg:p-8 relative overflow-hidden border border-slate-200/80 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-cyan-400 hover:shadow-[0_15px_30px_rgba(6,182,212,0.15)] flex ${card.boxClass}`}
          >
            <div className="z-10 text-center sm:text-left">
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 transition-colors duration-300 group-hover:text-cyan-600">
                {card.title}
              </h3>
              <p className="text-slate-500 text-xs sm:text-sm mt-2 leading-relaxed">
                {card.desc}
              </p>
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
