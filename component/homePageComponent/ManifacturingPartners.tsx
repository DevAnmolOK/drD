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


export default function ManufacturingPartners({ homeManufacturingPartners }: any) {
  const { tag, title, partners } = homeManufacturingPartners.data ||   {};

  return (
    <div className="w-full bg-white py-16 px-6 md:px-20">
      <div className="wrapper m-auto items-center text-center">
        <TagBadge text={tag} className="mb-4" />

        <h3 className="text-2xl md:text-[43px] font-semibold text-[#000] leading-tight mb-6">
          {title}
        </h3>

        <div className="flex flex-wrap justify-center">
          {partners.map((partner:any, index:number) => (
            <div
              key={index}
              className="flex justify-center items-center border border-[#E8E8E8] p-4 m-2 h-[124px] w-[266px]"
            >
              <Image
                src={partner.logo}
                alt={partner.name}
                height={18}
                width={150}
                className="object-contain h-[108px]"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
