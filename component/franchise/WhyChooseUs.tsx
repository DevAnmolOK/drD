// components/WhyChooseUs.tsx

import { IoCheckmark } from "react-icons/io5";

export default function WhyChooseUs({ data }: any) {
  // const data = {
  //   title: "Why Choose us",
  //   points: [
  //     {
  //       title: "Monopoly Rights:",
  //       desc: "Secure territory allocation to build a long-term, conflict-free market.",
  //     },
  //     {
  //       title: "High Margins + Transparent Billing:",
  //       desc: "Competitive pricing, no hidden charges, swift dispatch.",
  //     },
  //     {
  //       title: "Marketing Collateral:",
  //       desc: "Visual aids, LBLs, sample kits, MR bags, doctor reminder tools, digital creatives.",
  //     },
  //     {
  //       title: "Regulatory Strength:",
  //       desc: "Proper documentation, COAs, MSDS, and batch traceability.",
  //     },
  //     {
  //       title: "Supply Chain Reliability:",
  //       desc: "48-hour dispatch for catalogue SKUs; PAN-India logistics partners.",
  //     },
  //   ],
  //   benefits: [
  //     {
  //       badge: "Exclusive Territory",
  //       text: "Grow without internal competition",
  //     },
  //     {
  //       badge: "Promotional Kit",
  //       text: "All essential brand assets",
  //     },
  //     {
  //       badge: "Easy Re-orders",
  //       text: "Dedicated account manager",
  //     },
  //     {
  //       badge: "Regulatory Support",
  //       text: "Guidance with COAs & compliance",
  //     },
  //     {
  //       badge: "Marketing Assistance",
  //       text: "Digital creatives & MR tools",
  //     },
  //     {
  //       badge: "Supply Chain Strength",
  //       text: "PAN-India logistics partners",
  //     },
  //   ],
  // };

  return (
    <section className="bg-color-secondary py-16 px-6">
      <div className="wrapper m-auto grid lg:grid-cols-2 gap-16 items-start">
        {/* LEFT SIDE */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-10">
            {data.title}
          </h2>

          <div className="space-y-6">
            {data.points.map((item: any, i: number) => (
              <div key={i} className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center shrink-0">
                  <IoCheckmark className="text-white" size={18} />
                </div>

                <div>
                  <h4 className="font-semibold text-black inline">
                    {item.title}{" "}
                  </h4>
                  <span className="text-gray-700 text-sm leading-relaxed">
                    {item.desc}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT SIDE CARD */}
        <div className="bg-[#1f2e41] rounded-2xl p-8 shadow-lg text-white">
          <h3 className="text-xl font-semibold mb-8">
            Franchise Benefits at a Glance
          </h3>

          <div className="grid sm:grid-cols-2 gap-6">
            {data.benefits.map((item: any, i: number) => (
              <div
                key={i}
                className="border border-white/20 rounded-xl p-5 bg-[#1f2e41]"
              >
                <span className="inline-block bg-secondary text-white text-xs font-semibold px-3 py-1 rounded-full mb-3">
                  {item.badge}
                </span>

                <p className="text-sm text-white">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
