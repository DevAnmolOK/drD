'use client';

import Image from "next/image";
import React, { useState } from "react";

export default function OurDivison({ data }: any) {
  const { heading, subheading, divisions } = data || {};
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => {
    setOpenIndex((prev) => (prev === i ? null : i));
  };

  return (
    <section className="bg-[#f4f7fb] py-16">
      <div className="wrapper m-auto px-6 lg:px-0">
        <div className="max-w-3xl mb-12">
          <h2 className="text-3xl md:text-[48px] font-serif font-semibold mb-4">
            {heading}
          </h2>
          <p className="text-2xl text-[#555] leading-relaxed">
            {subheading}
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {divisions?.map((item: any, i: number) => {
            const expanded = openIndex === i;

            return (
              <div
                key={item.id || item.title || i} 
                className="
                  bg-white rounded-[15px] p-6
                  border border-[#e6ecf5]
                  hover:border-primary hover:shadow-lg
                  transition
                  flex flex-col
                  h-fit
                "
              >
                <div className="mb-4">
                  <div className="w-20 h-18 flex items-center justify-center">
                    {item.image && (
                      <Image
                        src={item.image}
                        alt={item.title}
                        width={128}
                        height={40}
                        className="object-contain w-full"
                      />
                    )}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-[#253746] mb-1">
                  {item.title}
                </h3>
                {item.subtitle && (
                  <p className="text-base font-medium text-primary mb-2">
                    {item.subtitle}
                  </p>
                )}
                {item.description && (
                  <>
                    <p
                      className={`text-base text-[#000] leading-relaxed font-normal
                      ${expanded ? "" : "line-clamp-3"}`}
                    >
                      {item.description}
                    </p>

                    <button
                      onClick={() => toggle(i)}
                      className="mt-2 text-primary font-medium text-sm self-start hover:underline cursor-pointer"
                    >
                      {expanded ? "Read less" : "Read more"}
                    </button>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}