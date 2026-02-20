/** @format */

import React from "react";
import Link from "next/link";
import { MdOutlineArrowDownward } from "react-icons/md";

interface CommonHeroSectionProps {
  heroSectionData: any;
}
export default function CommonHeroSection({
  heroSectionData,
}: CommonHeroSectionProps) {
  return (
    <section className="-mt-[6.35rem]">
      <div className="relative min-h-[450px] flex items-center overflow-hidden bg-[#1e293b] pt-52 pb-20 ">
        {heroSectionData?.background?.imageAlt && (
          <img
            alt={heroSectionData?.background?.imageAlt || "logo"}
            className="absolute inset-0 w-full h-full object-cover opacity-40"
            src={
              heroSectionData?.background?.imageSrc || "/images/fallback.png"
            }
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-r from-[#1e293b] via-[#1e293b]/70 to-transparent"></div>

        <div className="relative wrapper mx-auto z-10  w-full">
          <div className="">
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-white leading-tight mb-6">
              {heroSectionData?.title?.normal}{" "}
              {heroSectionData?.title?.highlight && (
                <span className="text-[#e11d48] italic">
                  {heroSectionData?.title?.highlight}
                </span>
              )}
            </h1>
            {heroSectionData?.description && (
              <p className="text-xl text-slate-300 leading-relaxed mb-8">
                {heroSectionData?.description}
              </p>
            )}

            <div className="flex flex-wrap gap-4">
              <Link href={`${heroSectionData?.buttonLink}`} className="rounded-full px-6 py-3  bg-secondary text-white align-middle leading-[1.4063]  text-base font-bold  hover:bg-red-700 transition flex items-center">
                {heroSectionData?.buttonText}{" "}
                <span className="material-symbols-outlined text-xl">
                  <MdOutlineArrowDownward />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
