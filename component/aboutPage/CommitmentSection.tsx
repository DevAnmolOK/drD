import Image from "next/image";
// data/commitmentData.ts
// export const commitmentData = {
//   title: "Our Commitment to Healthcare Excellence",
//   description:
//     "At VisionPlus Healthcare, we are committed to enhancing lives by delivering scientifically advanced and clinically proven pharmaceutical products. Our formulations are backed by research, ensuring efficacy, safety, and compliance with industry standards.",
//   features: [
//     {
//       icon: "/icons/iso.png",
//       text: "ISO 9001 Certified Quality Standards",
//     },
//     {
//       icon: "/icons/doctor.png",
//       text: "Over 200 Specialist Physicians",
//     },
//   ],
//   cards: [
//     {
//       title: "Patient-First Care",
//       desc: "Providing personalized attention to every individual, ensuring comfort and clear communication throughout the healing process.",
//     },
//     {
//       title: "Advanced Tech",
//       desc: "Utilizing the latest AI-driven medical technology for precision diagnostics and minimally invasive surgical procedures.",
//     },
//   ],
// };

export default function CommitmentSection({ commitmentSectionData }: any) {  
  const {  cards,header, highlights } = commitmentSectionData;
  return (
    <section className="py-20 bg-[#f6f6f6]">
      <div className="wrapper m-auto px-6 lg:px-0 grid lg:grid-cols-2 gap-12 items-start">
        {/* LEFT */}
        <div>
          <h2 className="text-4xl lg:text-[48px] font-serif text-[#000] leading-tight mb-6">
            {header.heading}
          </h2>

          <p className="text-lg text-[#000] leading-relaxed mb-10 ">
            {header.description}
          </p>
          <div className="space-y-6">
            {highlights?.map((item:any, i:number) => (
              <div key={i} className="flex items-center gap-4">
                <Image
                  src={item.icon}
                  alt="icon"
                  width={40}
                  height={40}
                  className="w-10 h-10 object-contain"
                />
                <span className="text-lg font-medium text-[#111]">
                  {item.text}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT */}
        <div className="grid sm:grid-cols-2 gap-6">
          {cards.map((card:any, i:any) => (
            <div
              key={i}
              className="bg-white/70 backdrop-blur rounded-2xl p-8 shadow-sm"
            >
              <Image
                src={card.icon}
                alt={card.title}
                width={40}
                height={40}
                className="w-10 h-10 object-contain mb-4"
              />
              <h3 className="text-2xl font-semibold text-[#253746] mb-4">
                {card.title}
              </h3>
              <p className="text-[#444] leading-relaxed">
                {card.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}