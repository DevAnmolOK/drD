


"use client";

import Image from 'next/image';
import React from 'react';

const directorData = {
  name: 'Dr. D Pharma',
  role: 'Managing Director at',
  photo: '/images/homePage/director.png',
  description: `Dharam Pal, a visionary business leader with extensive experience in the pharmaceutical industry, founded Dr. D Pharma with the objective of delivering high-quality, affordable healthcare solutions. As the driving force behind the company, he oversees strategic growth, long-term planning, and operational excellence while maintaining strong ethical standards and a positive organizational culture.`,
  socials: [
    { icon: '/images/fb.png', url: '#' },
    { icon: '/images/inst.png', url: '#' },
    { icon: '/images/tw.png', url: '#' },
    { icon: '/images/linkedIn.png', url: '#' },
  ],
};

const divisions = [
  '/images/homePage/ic1.png',
  '/images/homePage/ic2.png',
  '/images/homePage/ic3.png',
  '/images/homePage/ic4.png',
  '/images/homePage/ic5.png',
  '/images/homePage/ic6.png',
  '/images/homePage/ic7.png',
];

export default function DirectorDivisions() {
  return (
    <section className="relative w-full overflow-hidden">
      {/* 1. BACKGROUND LAYER (Split screen) */}
      <div className="absolute inset-0 flex flex-col md:flex-row z-0">
        <div className="w-full md:w-1/2 h-full bg-[#243847]" />
        <div className="w-full md:w-1/2 h-full bg-[#EEF1F4]" />
      </div>

      {/* 2. CONTENT WRAPPER (Centered) */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-2">
        
        {/* LEFT — DIRECTOR SECTION */}
        <div className="flex flex-col justify-center py-16 px-6 sm:px-10 md:px-16 lg:pl-24 lg:pr-12">
          <div className="max-w-2xl text-white">
            <h2 className="text-3xl md:text-[48px] leading-tight mb-8">
              Meet Our <span className="font-semibold ">Director</span>
            </h2>

            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8 mb-10">
              {/* Photo */}
              <div className="relative w-[180px] h-[180px] md:w-[240px] md:h-[240px] flex-shrink-0 rounded-2xl overflow-hidden ">
                <Image
                  src={directorData.photo}
                  alt={directorData.name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Identity & Socials */}
              <div className="text-center sm:text-left flex flex-col justify-center">
                <h3 className="text-2xl md:text-[32px] font-bold mb-1">
                  {directorData.name}
                </h3>
                <p className="text-lg md:text-xl opacity-80 mb-6 font-light">
                  {directorData.role}
                </p>

                <div className="flex justify-center sm:justify-start gap-3">
                  {directorData.socials.map((s, i) => (
                    <a
                      key={i}
                      href={s.url}
                      className="w-10 h-10 bg-white rounded-lg flex items-center justify-center hover:bg-orange-500 transition-colors duration-300"
                    >
                      <Image
                        src={s.icon}
                        alt="social"
                        width={15}
                        height={15}
                        className="object-contain"
                      />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <p className="text-base md:text-lg leading-relaxed opacity-90 font-light">
              {directorData.description}
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
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-8 justify-items-center sm:justify-items-start">
              {divisions.map((logo, i) => (
                <div
                  key={i}
                  className="bg-white rounded-full w-32 h-32 md:w-36 md:h-36 flex items-center justify-center shadow-lg shadow-black/5 hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer"
                >
                  <div className="relative w-20 h-20 md:w-24 md:h-24">
                    <Image
                      src={logo}
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
