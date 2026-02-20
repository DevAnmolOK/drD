/** @format */

import React from "react";
import {
  FaLightbulb,
  FaSearch,
  FaChess,
  FaCogs,
  FaUsers,
  FaChalkboardTeacher,
  FaRocket,
  FaRunning,
} from "react-icons/fa";
import Image from "next/image";

type TimelineItem = {
  id: string;
  titleLetter: string;
  side: "left" | "right";
  color: string; 
  icon: React.ReactNode;
  title: string;
  description: string;
};

export default function Infographic({
  timelineData,
}: {
  timelineData: TimelineItem[];
}) {

  return (
    <section className="w-full bg-white py-16 ">
      <div className="wrapper mx-auto">
        {/* TOP TITLE */}
        <div className="flex justify-center items-center flex-col mb-15">
          <h2 className="text-2xl sm:text-3xl lg:text-[42px] leading-tight text-[#253746]">
            Many More Reason Why Join
            <span className="font-semibold"> Dr. D Pharma</span>
          </h2>
          <p className="text-[#626263] mt-3 text-sm sm:text-base leading-relaxed">
            Join VisionPlus Healthcare and grow with trusted products, strong
            support, and a partner-first approach to success.
          </p>
        </div>
        {/* TIMELINE WRAPPER */}
        <div className="relative">
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {timelineData?.map((item: any, index: any) => (
              <div
                className="group relative bg-[#f5f5f5] p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all"
                key={index}
              >
                <div className="text-[5rem] font-black text-[#121b60]/10 absolute -top-6 right-6 group-hover:text-[#121b60]/20 transition-colors">
                  {index + 1}
                </div>
                <div className="text-[1.8rem] max-md:text-[1.25rem]  h-[3rem] align-middle leading-[1.2031] font-bold rounded-lg flex w-fit md:mb-18 lg:mb-10 text-textPrimary group-hover:text-textSecondary transition-colors">
                  {item?.heading}
                </div>
                <h4 className="text-[1.25rem] max-md:text-base align-middle leading-[1.2031] font-medium text-textPrimary mb-2">
                  {item?.title}
                </h4>
                <p className="text-lg leading-[1.5] font-medium tracking-[2%] align-middle text-textSecondary  w-full">
                  {item?.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
