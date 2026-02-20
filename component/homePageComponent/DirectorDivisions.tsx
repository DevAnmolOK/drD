"use client";

import Image from 'next/image';
import React from 'react';
export default function DirectorDivisions({ homeDirectorData }: any) {
  const { name, role, photo, description, socials,divisions } = homeDirectorData?.data || {};
  
  return (
    <section className="relative w-full overflow-hidden">
      <div className="absolute inset-0 flex flex-col md:flex-row z-0">
        <div className="w-full md:w-1/2 h-full bg-[#243847]" />
        <div className="w-full md:w-1/2 h-full bg-[#EEF1F4]" />
      </div>  

      <div className="relative z-10 w-full max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-2">
        
        <div className="flex flex-col justify-center py-16 px-6 sm:px-10 md:px-16 lg:pl-24 lg:pr-12">
          <div className="max-w-2xl text-white">
            <h2 className="text-3xl md:text-[48px] leading-tight mb-8">
              Meet Our <span className="font-semibold ">Director</span>
            </h2>

            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8 mb-10 flex-wrap">
              {/* Photo */}
              <div className="relative w-[180px] h-[180px] md:w-[240px] md:h-[240px] flex-shrink-0 rounded-2xl overflow-hidden ">
                <Image
                  src={photo}
                  alt={name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Identity & Socials */}
              <div className="text-center sm:text-left flex flex-col justify-center">
                <h3 className="text-2xl md:text-[32px] font-bold mb-1">
                  {name}
                </h3>
                <p className="text-lg md:text-xl opacity-80 mb-6 font-light">
                  {role}
                </p>

                <div className="flex justify-center sm:justify-start gap-3">
                  {socials?.map((s:any, i:number) => (
                    <a
                      key={i}
                      href={s.url}
                      className="w-10 h-10 bg-white rounded-lg flex items-center justify-center"
                      target='__blank'
                    >
                      <Image
                        src={s.icon}
                        alt="social"
                        width={30}
                        height={30}
                        className="object-contain"
                      />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <p className="text-base md:text-lg leading-relaxed opacity-90 font-light">
              {description}
            </p>
          </div>
        </div>

        {/* RIGHT — DIVISIONS SECTION */}
        <div className="flex flex-col justify-center py-16 px-6 sm:px-10 md:px-16 lg:pr-24 lg:pl-12 bg-[#EEF1F4] md:bg-transparent">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-[48px] leading-tight mb-12 text-[#243847]">
              Our <span className="font-semibold ">Divisions</span>
            </h2>

            {/* Responsive Grid for Logos */}
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 justify-items-center sm:justify-items-start">
              {divisions?.map((logo:any, i:number) => (
                <div
                  key={i}
                  className="bg-white rounded-full w-32 h-32 md:w-36 md:h-36 flex items-center justify-center shadow-lg shadow-black/5 hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer"
                >
                  <div className="relative w-20 h-20 md:w-24 md:h-24">
                    <Image
                      src={logo.icon}
                      alt="Division Logo"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
