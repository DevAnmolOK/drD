import React from "react";
import TagBadge from "../ui/TagBadge";
import Image from "next/image";

// export const manufacturingPartnersData = {
//   tag: "Trusted Manufacturing Partners",
//   title:
//     "Trusted and approved manufacturing facilities delivering quality, compliance, and consistency.",
//   partners: [
//     {
//       name: "Partner 1",
//       logo: "/images/trustlogo1.png",
//     },
//     {
//       name: "Partner 2",
//       logo: "/images/trustlogo2.png",
//     },
//     {
//       name: "Partner 3",
//       logo: "/images/trustlogo3.png",
//     },
//     {
//       name: "Partner 4",
//       logo: "/images/trustlogo4.png",
//     },
//   ],
// };

export default function ManufacturingPartners({
  homeManufacturingPartners,
}: any) {
  const { tag, title, partners } = homeManufacturingPartners.data || {};

  return (
    <div className="w-full bg-white py-16 md:px-20">
      <div className="wrapper m-auto items-center text-center">
        <TagBadge
          text={tag}
          className="mb-4 text-[0.75rem] font-medium text-[#253746]"
        />
        <h3 className="text-2xl md:text-[3rem] font-semibold text-black leading-tight mb-6">
          {title}
        </h3>
        <div className="flex flex-wrap justify-center">
          {partners?.map((partner: any, index: number) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center border border-[#E8E8E8] rounded-lg p-4 m-2 w-66.5 h-31 text-center bg-white"
            >
              {partner.logo && (
                <div className="relative w-full h-15 flex items-center justify-center mb-2">
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    fill
                    className="object-contain"
                  />
                </div>
              )}
              <p className="text-xl font-medium text-[#253746] leading-tight">
                {partner.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
