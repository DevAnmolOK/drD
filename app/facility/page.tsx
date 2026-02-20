"use client";

import Image from "next/image";
import CommonHeroSection from "@/component/common/CommonHeroSection";
import { IoIosCheckmark } from "react-icons/io";
import { describe } from "node:test";
import { Certificate } from "crypto";

export default function FacilityPage() {
  const heroSectionData = {
    badgeText: "Breadcrumbs",
    title: {
      normal: "Blogs",
    },
    description:
      "Empower your pharma business with precise financial analytics. Calculate gross margins and net profits instantly to make informed pricing decisions.",
    buttonText: "Scroll to use",
    background: {
      imageAlt: "Modern laboratory background",
      imageSrc:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDlhCxl2Vxag4giglyO3LRkbo1CCD0M2C2xp8aInGg_GtvGQQTne3cPlp4jncbvfjJQ_Xgtjh22jGzKNrHyiH5djBaJD-qol6WT4TXPCHPkfDmXqGNEJBdTSiFfdhxFLO6gCo8h3f1FobHNsLIP1KgizrslMR0Q0tZHzpU0md3rnJ0Stq3MCkjS76TSVHCBBzYISDJrEU5zOL1EJLtiO4teKHAtUwhRSMYV60XhybXAJZm5Moq-MFo9dEJJ6Zrmo-UWJ8sF_9x5U_uD",
    },
  };

  const infrastructureData = {
    heading_start: " Our",
    heading_bold: "Infrastructure & Manufacturing",
    heading_end: " Excellence",
    description: `At Dr. D Pharma, we operate world-class manufacturing
                  facilities located in Himachal Pradesh, designed to meet both
                  domestic and global pharmaceutical standards.`,
    section: {
      description: `At Dr. D Pharma, we operate world-class manufacturing facilities located in Himachal Pradesh, designed to meet both domestic and global pharmaceutical standards. Our manufacturing units are built according to WHO, GMP, and ISO guidelines with fully automated processing lines, enabling efficient production with minimal manual intervention. Each unit is equipped with modern machinery and technology, ensuring high-quality output at every stage of the production process.`,
      heading: "Our infrastructure includes:",
      points: [
        "High-capacity production halls with advanced processing lines",
        "Dedicated blending, granulation, tablet compression & capsule filling",
        "Temperature-controlled warehouses",
        "Cleanrooms & sanitary environments",
        "Robust utilities: HVAC, compressed air, water treatment",
        "Well-planned logistics & shipment systems",
      ],
      image: "/images/infrastructure.jpg",
      imageAlt: "Manufacturing Infrastructure",
    },
  };

  const certificateData = {
    heading_start: " Our",
    heading_bold: "Certifications & Quality",
    heading_end: " Assurance",
    description: `Quality remains at the forefront of everything we do at Dr. D Pharma. Our facilities are certified and audited under globally recognized standards, reflecting our commitment to safety, quality, and compliance.`,
    section: {
      description: `At Dr. D Pharma, we operate world-class manufacturing facilities located in Himachal Pradesh, designed to meet both domestic and global pharmaceutical standards. Our manufacturing units are built according to WHO, GMP, and ISO guidelines with fully automated processing lines, enabling efficient production with minimal manual intervention. Each unit is equipped with modern machinery and technology, ensuring high-quality output at every stage of the production process.`,
      heading: "Our infrastructure includes:",
      certificate: [
        {
          image: "",
          certification: "WHO Compliance",
          describe:
            "  Ensures that our manufacturing processes meet international safety, quality, and hygiene standards established by the World Health Organization for pharmaceutical production.",
        },
        {
          image: "",
          certification: "GMP Certification",
          describe:
            "  Confirms that our products are consistently produced and controlled according to strict quality standards, minimizing risks in pharmaceutical manufacturing",
        },
        {
          image: "",
          certification: "ISO Quality Certification",
          describe:
            " Demonstrates our commitment to maintaining a structured and efficient quality management system that ensures continuous improvement and customer satisfaction.",
        },
      ],
    },
  };

  const capabilitiesDAta = {
    heading_start: " Our",
    heading_bold: "Capabilities & Production",
    heading_end: " Strength",
    description: `Dr. D Pharma’s manufacturing capabilities are built around flexibility, precision, and high-volume production. Our strengths include:`,
    section: {
      description: `At Dr. D Pharma, we operate world-class manufacturing facilities located in Himachal Pradesh, designed to meet both domestic and global pharmaceutical standards. Our manufacturing units are built according to WHO, GMP, and ISO guidelines with fully automated processing lines, enabling efficient production with minimal manual intervention. Each unit is equipped with modern machinery and technology, ensuring high-quality output at every stage of the production process.`,
      heading: "Our infrastructure includes:",
      certificate: [
        {
          image: "",
          heading: "Wide Product Formulation Range",
          description: `We are capable of producing a broad spectrum of pharmaceutical dosage forms,
             This allows us to cater to diverse therapeutic segments such as anti-infectives, derma care, gynaecology care, nutraceuticals, and more. 
             such as:`,
          keyPoints: [
            "Tablets & Coated Tablets",
            "Capsules (Hard & Soft Gel)",
            "Syrups & Liquid Formulations",
            "Injectables",
            "Nutraceuticals",
            "Specialized Healthcare Formulations",
          ],
        },
        {
          image: "",
          heading: `Advanced Production Processes`,
          description: `Our manufacturing prowess includes:`,
          keyPoints: [
            `Controlled blending & mixing techniques`,
            `Precision granulation & compression`,
            `Automated syrup filling lines`,
            ` High-efficiency coating & packaging systems`,
            ` Continuous monitoring via process sensors`,
          ],
        },
        {
          image: "",
          heading: "R&D & Innovation Focus",
          description: `We continuously invest in research and development to innovate formulations that align with current market needs. Our R&D unit collaborates closely with quality and production teams to:`,
          keyPoints: [
            ` Formulate new drug variants`,
            `Improve existing product efficacy`,
            `Ensure speedy regulatory approvals for emerging healthcare requirements`,
          ],
        },
      ],
    },
  };

  const WhyChooseUsDAta = {
    heading_start: "Why",
    heading_bold: "Choose Dr. D Pharma",
    heading_end: " Facility",
    description: `Our infrastructure and operational excellence make us a trusted choice for business partnerships, franchise opportunities, and third-party manufacturing collaborations.`,
    section: {
      description: `Choosing Dr. D Pharma means partnering with a pharmaceutical firm that values:`,
      keyPoints: [
        "Quality over quantity",
        "Compliance with international standards",
        "Transparent & ethical practices",
        "Fast delivery through efficient logistics",
        "Expert QA/QC validated products",
      ],
    },
  };

  const facilityData = {
    heroSectionData: {
      badgeText: "Breadcrumbs",
      title: {
        normal: "Blogs",
      },
      description:
        "Empower your pharma business with precise financial analytics. Calculate gross margins and net profits instantly to make informed pricing decisions.",
      buttonText: "Scroll to use",
      background: {
        imageAlt: "Modern laboratory background",
        imageSrc:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuDlhCxl2Vxag4giglyO3LRkbo1CCD0M2C2xp8aInGg_GtvGQQTne3cPlp4jncbvfjJQ_Xgtjh22jGzKNrHyiH5djBaJD-qol6WT4TXPCHPkfDmXqGNEJBdTSiFfdhxFLO6gCo8h3f1FobHNsLIP1KgizrslMR0Q0tZHzpU0md3rnJ0Stq3MCkjS76TSVHCBBzYISDJrEU5zOL1EJLtiO4teKHAtUwhRSMYV60XhybXAJZm5Moq-MFo9dEJJ6Zrmo-UWJ8sF_9x5U_uD",
      },
    },

    infrastructureData: {
      heading_start: " Our",
      heading_bold: "Infrastructure & Manufacturing",
      heading_end: " Excellence",
      description: `At Dr. D Pharma, we operate world-class manufacturing
                  facilities located in Himachal Pradesh, designed to meet both
                  domestic and global pharmaceutical standards.`,
      section: {
        description: `At Dr. D Pharma, we operate world-class manufacturing facilities located in Himachal Pradesh, designed to meet both domestic and global pharmaceutical standards. Our manufacturing units are built according to WHO, GMP, and ISO guidelines with fully automated processing lines, enabling efficient production with minimal manual intervention. Each unit is equipped with modern machinery and technology, ensuring high-quality output at every stage of the production process.`,
        heading: "Our infrastructure includes:",
        points: [
          "High-capacity production halls with advanced processing lines",
          "Dedicated blending, granulation, tablet compression & capsule filling",
          "Temperature-controlled warehouses",
          "Cleanrooms & sanitary environments",
          "Robust utilities: HVAC, compressed air, water treatment",
          "Well-planned logistics & shipment systems",
        ],
        image: "/images/infrastructure.jpg",
        imageAlt: "Manufacturing Infrastructure",
      },
    },

    certificateData: {
      heading_start: " Our",
      heading_bold: "Certifications & Quality",
      heading_end: " Assurance",
      description: `Quality remains at the forefront of everything we do at Dr. D Pharma. Our facilities are certified and audited under globally recognized standards, reflecting our commitment to safety, quality, and compliance.`,
      section: {
        description: `At Dr. D Pharma, we operate world-class manufacturing facilities located in Himachal Pradesh, designed to meet both domestic and global pharmaceutical standards. Our manufacturing units are built according to WHO, GMP, and ISO guidelines with fully automated processing lines, enabling efficient production with minimal manual intervention. Each unit is equipped with modern machinery and technology, ensuring high-quality output at every stage of the production process.`,
        heading: "Our infrastructure includes:",
        certificate: [
          {
            image: "",
            certification: "WHO Compliance",
            describe:
              "  Ensures that our manufacturing processes meet international safety, quality, and hygiene standards established by the World Health Organization for pharmaceutical production.",
          },
          {
            image: "",
            certification: "GMP Certification",
            describe:
              "  Confirms that our products are consistently produced and controlled according to strict quality standards, minimizing risks in pharmaceutical manufacturing",
          },
          {
            image: "",
            certification: "ISO Quality Certification",
            describe:
              " Demonstrates our commitment to maintaining a structured and efficient quality management system that ensures continuous improvement and customer satisfaction.",
          },
        ],
      },
    },

    capabilitiesDAta: {
      heading_start: " Our",
      heading_bold: "Capabilities & Production",
      heading_end: " Strength",
      description: `Dr. D Pharma’s manufacturing capabilities are built around flexibility, precision, and high-volume production. Our strengths include:`,
      section: {
        description: `At Dr. D Pharma, we operate world-class manufacturing facilities located in Himachal Pradesh, designed to meet both domestic and global pharmaceutical standards. Our manufacturing units are built according to WHO, GMP, and ISO guidelines with fully automated processing lines, enabling efficient production with minimal manual intervention. Each unit is equipped with modern machinery and technology, ensuring high-quality output at every stage of the production process.`,
        heading: "Our infrastructure includes:",
        certificate: [
          {
            image: "",
            heading: "Wide Product Formulation Range",
            description: `We are capable of producing a broad spectrum of pharmaceutical dosage forms,
             This allows us to cater to diverse therapeutic segments such as anti-infectives, derma care, gynaecology care, nutraceuticals, and more. 
             such as:`,
            keyPoints: [
              "Tablets & Coated Tablets",
              "Capsules (Hard & Soft Gel)",
              "Syrups & Liquid Formulations",
              "Injectables",
              "Nutraceuticals",
              "Specialized Healthcare Formulations",
            ],
          },
          {
            image: "",
            heading: `Advanced Production Processes`,
            description: `Our manufacturing prowess includes:`,
            keyPoints: [
              `Controlled blending & mixing techniques`,
              `Precision granulation & compression`,
              `Automated syrup filling lines`,
              ` High-efficiency coating & packaging systems`,
              ` Continuous monitoring via process sensors`,
            ],
          },
          {
            image: "",
            heading: "R&D & Innovation Focus",
            description: `We continuously invest in research and development to innovate formulations that align with current market needs. Our R&D unit collaborates closely with quality and production teams to:`,
            keyPoints: [
              ` Formulate new drug variants`,
              `Improve existing product efficacy`,
              `Ensure speedy regulatory approvals for emerging healthcare requirements`,
            ],
          },
        ],
      },
    },

    WhyChooseUsDAta: {
      heading_start: "Why",
      heading_bold: "Choose Dr. D Pharma",
      heading_end: " Facility",
      description: `Our infrastructure and operational excellence make us a trusted choice for business partnerships, franchise opportunities, and third-party manufacturing collaborations.`,
      section: {
        description: `Choosing Dr. D Pharma means partnering with a pharmaceutical firm that values:`,
        keyPoints: [
          "Quality over quantity",
          "Compliance with international standards",
          "Transparent & ethical practices",
          "Fast delivery through efficient logistics",
          "Expert QA/QC validated products",
        ],
      },
    },
  };
  return (
    <>
      <div className=" w-full mx-auto">
        <CommonHeroSection heroSectionData={heroSectionData} />
        <div className="w-full overflow-hidden flex flex-col mx-auto">
          {/* ================= INFRASTRUCTURE ================= */}
          <section className="py-12 md:py-20 ">
            <div className="wrapper mx-auto space-y-8 sm:space-y-12 ">
              <div className="text-center  mx-auto">
                <h2 className="text-heading text-[2rem] sm:text-[3rem] font-normal  leading-[1.1667] align-middle capitalize tracking-[1.5px]  ">
                  {infrastructureData?.heading_start}
                  <span className="font-bold">
                    {" "}
                    {infrastructureData?.heading_bold}
                  </span>
                  {infrastructureData?.heading_end}
                </h2>
                <p className="text-description mt-4 text-base  align-middle leading-[1.7500]">
                  {infrastructureData?.description}
                </p>
              </div>

              <div className="flex flex-col-reverse md:grid md:grid-cols-2 gap-8 sm:gap-16 ">
                <div className="space-y-5 text-description leading-[170%]">
                  <p className="text-description  text-base  align-middle leading-[1.7500]">
                    {infrastructureData?.section?.description}
                  </p>
                  <h3 className="text-heading text-[1.5rem] font-semibold  leading-[1.1667] align-middle capitalize tracking-[1.5px]">
                    {infrastructureData?.section?.heading}
                  </h3>
                  <ul className="space-y-3">
                    {infrastructureData?.section?.points.map((point, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="w-6 h-6 bg-[#EE4223] rounded-full flex justify-center items-center ">
                          <IoIosCheckmark size={20} className="text-white" />
                        </span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="relative h-[20rem] sm:h-[25rem] md:h-[31.25rem] rounded-xl overflow-hidden shadow-xl">
                  <Image
                    src="/images/infra.jpg"
                    alt="Manufacturing Infrastructure"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* ================= CERTIFICATIONS ================= */}
          <section className="py-12 sm:py-20 bg-gradient-to-r from-[#1c2a3a] via-[#1f2f44] to-[#16222f] text-white">
            <div className="wrapper mx-auto  space-y-10">
              <div className="text-center max-w-4xl mx-auto">
                <h2 className="text-white text-[2rem] sm:text-[3rem] font-normal  leading-[1.1667] align-middle capitalize tracking-[1.5px]  ">
                  {certificateData?.heading_start}
                  <span className="font-bold">
                    {" "}
                    {certificateData?.heading_bold}
                  </span>
                  {certificateData?.heading_end}
                </h2>
                <p className="text-white mt-4 text-base  align-middle leading-[1.7500]">
                  {certificateData?.description}
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-10">
                {certificateData?.section?.certificate?.map((cert, index) => (
                  <div
                    key={index}
                    className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-xl hover:shadow-xl transition flex flex-col gap-4"
                  >
                    <div className="border h-[6rem] w-[6rem] relative overflow-hidden ">
                      <Image
                        src="/Webp/Divisions 07.webp"
                        alt={cert?.certification}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <h3 className="text-xl font-semibold">
                      {cert?.certification}
                    </h3>
                    <p className="text-white  text-sm align-middle leading-[1.7500]">
                      {cert?.describe}
                    </p>
                  </div>
                ))}
              </div>

              <p className="text-white text-center mt-4 text-base  align-middle leading-[1.7500] ">
                These certifications guarantee that our manufacturing processes
                are monitored, documented, and controlled at every step — from
                raw material sourcing, screening, and testing to final product
                packaging. Critical quality checks are performed by our in-house
                QA/QC team to ensure safety, efficacy, and consistency.
              </p>
              <p className="text-white text-center  text-base  align-middle leading-[1.7500]">
                Our strict adherence to FSSAI and DCGI guidelines further
                ensures that all products meet statutory and regulatory
                requirements before reaching the market.
              </p>
            </div>
          </section>

          {/* ================= CAPABILITIES ================= */}
          <section className="py-12 sm:py-20 bg-white">
            <div className="wrapper mx-auto space-y-8 sn:space-y-16">
              <div className="text-center">
                <h2 className="text-heading text-[2rem] sm:text-[3rem] font-normal  leading-[1.1667] align-middle capitalize tracking-[1.5px]  ">
                  {capabilitiesDAta?.heading_start}
                  <span className="font-bold">
                    {" "}
                    {capabilitiesDAta?.heading_bold}
                  </span>
                  {capabilitiesDAta?.heading_end}
                </h2>
                <p className="text-description mt-4 text-base  align-middle leading-[1.7500]">
                  {capabilitiesDAta?.description}
                </p>
              </div>

              {capabilitiesDAta?.section?.certificate?.map((data, index) => (
                <div
                  key={index}
                  className={`grid md:grid-cols-2 gap-8 sm:gap-16 items-center  ${
                    index % 2 !== 0
                      ? "md:[&>*:first-child]:order-2 md:[&>*:last-child]:order-1"
                      : ""
                  }`}
                >
                  {/* TEXT SECTION */}
                  <div className="space-y-5 text-description leading-[170%]">
                    <h3 className="text-heading text-[1.5rem] font-semibold tracking-[1.5px] capitalize">
                      {data?.heading}
                    </h3>
                    <p className="text-base leading-[1.75]">
                      {data?.description}
                    </p>

                    <ul className="space-y-3">
                      {data?.keyPoints?.map((point: string, i: number) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="w-6 h-6 bg-[#EE4223] rounded-full flex justify-center items-center">
                            <IoIosCheckmark size={20} className="text-white" />
                          </span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* IMAGE SECTION */}
                  <div className="relative h-[16rem] sm:h-[25rem] md:h-[31.25rem] rounded-xl overflow-hidden shadow-xl">
                    <Image
                      src={data?.image || "/images/infra.jpg"}
                      alt={data?.heading || "Infrastructure"}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ================= WHY CHOOSE US ================= */}
          <section className="pt-20 pb-10 bg-gradient-to-r from-[#1c2a3a] via-[#1f2f44] to-[#16222f] text-white">
            <div className="wrapper mx-auto border-b pb-20 border-white/50 text-center space-y-12">
              <div className="text-center">
                <h2 className="text-white text-[2rem] sm:text-[3rem] font-normal  leading-[1.1667] align-middle capitalize tracking-[1.5px]  ">
                  {WhyChooseUsDAta?.heading_start}
                  <span className="font-bold">
                    {" "}
                    {WhyChooseUsDAta?.heading_bold}
                  </span>
                  {WhyChooseUsDAta?.heading_end}
                </h2>
                <p className="text-white mt-4 text-base  align-middle leading-[1.7500]">
                  {WhyChooseUsDAta?.description}
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
                {WhyChooseUsDAta?.section?.keyPoints?.map((point, index) => (
                  <div
                    key={index}
                    className="bg-white/5 border border-white/10 p-8 rounded-xl flex gap-4 text-white"
                  >
                    <span className="w-8 h-8 bg-[#EE4223] rounded-full flex justify-center items-center">
                      <IoIosCheckmark size={20} className="text-white" />
                    </span>
                    <span className=" text-lg font-medium">{point}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
