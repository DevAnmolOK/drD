import Image from "next/image";
import { FaArrowRight } from "react-icons/fa";
export default function PcdFranchise() {
  const content = {
    leftCard: {
      image: "/SVG/our-product.svg",
      title: (
        <>
          Be the part of successful and highly reputed
          <span className="font-bold mx-1">Pharma Franchise Company</span>
          in India for your successful journey in Pharmaceutical sector.
        </>
      ),
      buttonText: "Learn More",
    },
    rightSection: {
      badge: "DR. D PHARMA MAKE YOUR LIFE EASY",
      heading: (
        <>
          Get <span className="font-extrabold">Pcd Franchise</span> Opportunity
          To Boost Your Income
        </>
      ),
      description: `Dr. D Pharma value life and health in this way and offer experiences through a variety of products. The company has made a good contribution to the pharmaceutical industry and pushed the industry forward with high-quality pharmaceutical products that are in great demand in the industry. We respond to the needs of patients or clients and help them gain a better heart.`,
      subHeading:
        "Here is the reason to be the part of our PCD Pharma Business:",
      points: [
        "Our PCD Pharma franchise partners receive modern quality assurance products.",
        "We guarantee 100% product availability, Fast delivery all over India.",
        "Each product is carefully packaged and stored in our extensive microbial warehouse.",
        "Dr. D Pharma has fully integrated manufacturing facilities, which makes us one of the best PCD Business.",
        "The company continues to introduce new and innovative strategies to strengthen its industry presence",
        "Become our partner and take advantage of the best growth opportunities in the pharmaceutical sector.",
      ],
    },
  };

  return (
    <section className="w-full bg-gray-100 py-16 px-6 md:px-20">
      <div className="wrapper m-auto grid grid-cols-1 md:grid-cols-[35%_63%] gap-[2%] items-center">
        {/* LEFT CARD */}
        <div className="bg-gradient-to-br from-[#0f2a3f] to-[#1c3c54] text-white rounded-2xl p-10 max-w-[427]">
          <div className="mb-6">
            <Image
              src={content.leftCard.image}
              alt="our product"
              width={80}
              height={80}
              className="object-contain"
            />
          </div>

          <h2 className="text-2xl md:text-=[32px] font-normal leading-relaxed">
            {content.leftCard.title}
          </h2>

          <button className="mt-8 inline-flex items-center gap-3 bg-white text-[#253746] px-6 py-3 rounded-full font-normal shadow hover:shadow-lg transition">
            {content.leftCard.buttonText}
            <span className="bg-orange-500 text-white p-2 rounded-full">
              <FaArrowRight size={14} />
            </span>
          </button>
        </div>

        {/* RIGHT CONTENT */}
        <div>
          <div className="inline-block border border-gray-300 rounded-full px-4 py-1 text-sm text-gray-600 mb-4">
            {content.rightSection.badge}
          </div>

          <h1 className="text-3xl md:text-[43px] font-normal text-[#253746] leading-tight mb-6">
            {content.rightSection.heading}
          </h1>

          <p className="text-[#626263] mb-6 leading-relaxed font-normal text-base">
            {content.rightSection.description}
          </p>

          <h3 className="font-bold text-[#626263] mb-4">
            {content.rightSection.subHeading}
          </h3>

          <ul className="space-y-2 text-[#626263]">
            {content.rightSection.points.map((item, index) => (
              <li key={index} className="flex items-center gap-3 align-center">
                <span className="text-[#626263] mt-1 text-base inline-flex items-center justify-center ">
                  <Image
                    src={"/SVG/arrow.svg"}
                    alt="icon"
                    height={10}
                    width={10}
                    className="object-contain"
                  />
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
