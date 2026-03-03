import { IoCheckmarkDoneSharp } from "react-icons/io5";

export default function AboutSection({ aboutData }: any) {
  // const aboutData = {
  //   title: "About Medipectus Pharma",
  //   highlight: "Key Highlights",
  //   description:
  //     "We are a growth-focused, WHO-GMP & ISO certified pharmaceutical company offering PCD Pharma Franchise and third-party manufacturing across India. Our culture blends scientific rigor with ethical business practices. Every batch is tested for identity, potency, purity, and stability in our in-house QA/QC labs.",
  //   points: [
  //     {
  //       title: "Therapeutic breadth:",
  //       desc: "Antibiotic, analgesic, gastro, cardiac-diabetic, gynae, pediatrics, ortho, ENT, derma, nutraceuticals.",
  //     },
  //     {
  //       title: "Quality Assurance:",
  //       desc: "SOP-driven processes, validated cleaning, controlled environments, GLP documentation.",
  //     },
  //     {
  //       title: "Partner Success:",
  //       desc: "Monopoly territories, marketing inputs, digital creatives, MR bags, visual aids, and training.",
  //     },
  //   ],
  //   highlights: [
  //     { badge: "WHO-GMP", text: "Certified facilities" },
  //     { badge: "ISO 9001:2015", text: "Process excellence" },
  //     { badge: "500+ SKUs", text: "Expanding pipeline" },
  //     { badge: "PAN India", text: "Logistics network" },
  //   ],
  //   footer:
  //     "We comply with Schedule M, maintain vendor qualification programs, and source APIs/excipients only from audited suppliers.",
  // };

  return (
    <section className="bg-color-secondary py-16 ">
      <div className="wrapper m-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
            {aboutData.title}
          </h2>

          <p className="text-gray-700 leading-relaxed mb-10">
            {aboutData.description}
          </p>

          <div className="space-y-8">
            {aboutData.points.map((item: any, i: any) => (
              <div key={i} className="flex gap-4 ">
                <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center shrink-0">
                  <IoCheckmarkDoneSharp size={18} className="text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-black mb-1">
                    {item.title}
                  </h4>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-[#1f2e41] rounded-2xl p-8 shadow-md border border-gray-200">
          <h3 className="text-xl font-bold text-white mb-8">
            {aboutData.highlight}
          </h3>
          <div className="grid sm:grid-cols-2 gap-6 mb-8">
            {aboutData.highlights.map((item: any, i: number) => (
              <div
                key={i}
                className="border border-white/20 rounded-xl p-6 text-center bg-[#1f2e41]"
              >
                <span className="inline-block bg-secondary text-white text-xs font-semibold px-4 py-1 rounded-full mb-3">
                  {item.badge}
                </span>
                <p className="text-sm text-white">{item.text}</p>
              </div>
            ))}
          </div>
          <p className="text-sm text-white leading-relaxed">
            {aboutData.footer}
          </p>
        </div>
      </div>
    </section>
  );
}
