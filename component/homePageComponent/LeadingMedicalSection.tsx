"use client";

import { FiAward, FiCheckCircle, FiPackage, FiUsers } from "react-icons/fi";
import Image from "next/image";
export default function TrustedSection({ homeTrustedBy }: any) {

  const { heading_start, heading_bold, heading_end, stats } = homeTrustedBy.data || {};

  return (
    <section className="w-full bg-gradient-to-r from-[#253746]  to-[#162836] text-white py-20 px-6">
      <div className="wrapper mx-auto ">
        {/* Heading */}
        <h2 className=" text-[3rem] font-normal  leading-[1.1667] align-middle capitalize tracking-[1.5px]  mb-16">
          {heading_start}
          <span className="font-bold mx-2">{heading_bold}</span> {heading_end}
        </h2>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4  r divide-y sm:divide-y-0 lg:divide-x divide-white/20">
          {stats.map((item:any, index:any) => (
            <div
              key={index}
              className={`flex flex-col ${index === 0 ? "items-start justify-start" : " items-center justify-center"}  py-10 lg:py-0`}
            >
              <div className="">
                <div className="mb-2 h-[3rem] w-[3rem] relative overflow-hidden">
                  <Image
                    src={item?.icon}
                    alt={item?.label}
                    fill
                    unoptimized
                    className=" object-contain"
                  />
                </div>

                <div className="text-[3rem] font-normal  mb-2 align-middle ">
                  {item.number}
                </div>

                <p className="text-base  font-normal align-middle leading-[180%]">
                  {item.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
