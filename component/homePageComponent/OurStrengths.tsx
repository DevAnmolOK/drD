import Image from "next/image";
import TagBadge from "../ui/TagBadge";
import Button from "../ui/Button";

export default function OurStrengths({ homeOurStrengths }: any) {
   const {data} = homeOurStrengths || {};
   const {
heading_bold,
heading_start
} = data.title || {};

  // const data = {
  //   tag: "OUR STRENGTHS",
  //   title: "The Foundation Of Our Excellence",
  //   desc: `Our excellence is built on a strong foundation of quality-driven processes, regulatory compliance, and industry expertise. From sourcing clinically approved raw materials to implementing strict quality control at every stage of manufacturing, we ensure consistency, safety, and reliability in every product.`,
  //   bgImage: "/images/ourStrengthbg.png",

  //   cards: [
  //     {
  //       image: "/images/pcd01.png",
  //       title: "PCD Pharma Franchise Business Opportunity",
  //       desc: "Best PCD Pharma Franchise in India - Dr. D Pharma is an ISO Certified Company that is a proud supplier and franchiser in the Indian pharmaceutical market that gives manufacturing and marketing services of Pharma Products in Pan India.",
  //       points: [
  //         "Antibiotic",
  //         "Ayurvedic",
  //         "Gynaecology Products",
  //         "Pain Killer Gel",
  //         "Protein Powder",
  //         "Pediatric Range",
  //       ],
  //       button: {
  //         label: "Learn More",
  //         href: "/services",
  //       },
  //     },
  //     {
  //       image: "/images/pcd02.png",
  //       title: "Third Party Pharmaceutical Manufacturer",
  //       desc: "Dr. D Pharma is a leading pharmaceutical company that offers unique third-party pharmaceutical manufacturing services in Chandigarh.",
  //       points: [
  //         "Sourcing",
  //         "Quality Check",
  //         "Manufacturing",
  //         "Production",
  //         "Packaging",
  //       ],
  //       button: {
  //         label: "Learn More",
  //         href: "/services",
  //       },
  //     },
  //   ],
  // };

  console.log(data,"data");
  

  return (
    <section className="relative py-16">
      <div className="absolute inset-0">
        <Image src={data.bgImage} alt="bg" fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0c2d48]/90 via-[#0c2d48]/30 to-transparent" />
      </div>
      <div className="relative wrapper m-auto   grid lg:grid-cols-3 gap-10 items-center">
        <div className="text-white max-w-xl">
          <TagBadge
            text={data.tag}
            className="mb-6 bg-white/5 border-white/20 text-white"
          />

          <h2 className="text-3xl md:text-[44px] font-light mb-6">
            {heading_start}
            <span className="font-semibold">{heading_bold}</span>
          </h2>

          <p className="text-white leading-relaxed text-base">{data.desc}</p>
        </div>
        <div className="lg:col-span-2 grid md:grid-cols-2 gap-10 lg:relative lg:top-[25%] ">
          {data?.cards.map((card:any, i:number) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-6 shadow-xl flex flex-col"
            >
              <div className="relative w-full h-45 rounded-xl overflow-hidden mb-5">
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* title */}
              <h3 className="text-lg md:text-2xl font-normal text-[#253746] mb-3">
                {card.title}
              </h3>
              <p className="text-sm text-[#6b7280] mb-4">{card.desc}</p>
              <ul className="space-y-2 mb-6">
                {card.points.map((p :any, idx:number) => (
                  <li
                    key={idx}
                    className="flex items-center gap-2 text-base text-[#626263] font-medium"
                  >
                    <span className="w-4 h-4 rounded-full bg-red-500 text-white flex items-center justify-center text-[10px]">
                      ✓
                    </span>
                    {p}
                  </li>
                ))}
              </ul>
              {card.button && (
                <div className="mt-auto">
                  <Button href={card.button.href}>{card.button.label}</Button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
