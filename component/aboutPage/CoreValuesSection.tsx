"use client";

import { FaUserMd } from "react-icons/fa";
import { GiMedicines } from "react-icons/gi";
import { MdHealthAndSafety } from "react-icons/md";
import { BsLightbulb } from "react-icons/bs";
import Image from "next/image";

const iconMap: any = {
  FaUserMd: <FaUserMd />,
  GiMedicines: <GiMedicines />,
  MdHealthAndSafety: <MdHealthAndSafety />,
  BsLightbulb: <BsLightbulb />,
};



interface CoreValuesSectionProps {
  visionMissionData: any;
  core_values_heading: string;
  coreValuesData: any;
}
export default function CoreValuesSection({
  visionMissionData,
  core_values_heading,
  coreValuesData,
}: CoreValuesSectionProps) {
  return (
    <section className=" py-20 ">
      <div className="wrapper m-auto px-6 lg:px-0 ">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* LEFT SIDE */}
          <div className="space-y-8">
            {/* Heading */}
            <h2 className="text-3xl md:text-5xl font-semibold text-bgSecondarytwo mb-16 align-middle leading-1 capitalize">
              {core_values_heading}
            </h2>
            {visionMissionData?.map((item:any, index:any) => (
              <div key={index} className="flex flex-col items-start gap-5">
                <div className="w-16 h-16 relative flex items-center justify-center rounded-full bg-[#2c3e50] text-white text-xl mb-6">
                  <Image
                    src={item?.icon}
                    alt={item?.title}
                    fill
                    className=" object-cover"
                  />
                </div>

                <div>
                  <h3 className="text-[2rem] leading-1 capitalize align-middle font-semibold text-shadow-bgSecondarytwo mb-5">
                    {item?.title}
                  </h3>
                  <p className="text-description align-middle  text-base font-normal leading-[1.7500]">
                    {item?.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT SIDE */}
          <div className="grid sm:grid-cols-2 gap-6">
            {coreValuesData?.map((card:any, index:any) => (
              <div
                key={index}
                className="bg-[#F5F5F5] rounded-2xl p-6 shadow-sm hover:shadow-md transition flex flex-col gap-6"
              >
                <div className=" h-14 w-14 relative overflow-hidden">
                  <Image
                    src={card?.icon}
                    alt={card?.title} 
                    fill
                    className=" object-cover"
                  />
                </div>

                <h4 className="text-2xl text-bgSecondarytwo font-normal align-middle ">
                  {card?.title}
                </h4>

                <p className="text-description align-middle  text-base font-normal leading-[1.7500]">
                  {card?.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
