"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { publicMediaUrl } from "@/lib/publicMediaUrl";

interface SliderProps {
  slides: any[];
}

export default function HeroSectionSlider({ slides }: SliderProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startAutoplay = () => {
    stopAutoplay();

    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, 3000);
  };

  const stopAutoplay = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  useEffect(() => {
    if (slides?.length > 1) {
      startAutoplay();
    }

    return () => stopAutoplay();
  }, [slides?.length]);

  return (
    <div
      className="w-full relative overflow-hidden"
      onMouseEnter={stopAutoplay}
      onMouseLeave={startAutoplay}
    >
      <div className="relative w-full h-[51rem]">
        {slides?.map((t: any, i: number) => {
          const isActive = activeIndex === i;

          return (
            <div
              key={i}
              className={`absolute inset-0 transition-opacity duration-[2000ms] ease-in-out ${
                isActive
                  ? "opacity-100 z-10 pointer-events-auto"
                  : "opacity-0 z-0 pointer-events-none"
              }`}
            >
              <div className="h-[51rem] relative w-full flex justify-center items-center">
                {/* Background */}
                <div
                  className="absolute inset-0 bg-no-repeat bg-cover bg-[position:50%_20%] sm:bg-center md:bg-[position:100%_100%]"
                  style={{
                    backgroundImage: `url(${
                      publicMediaUrl(t?.background?.imageSrc) || "none"
                    })`,
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#006511] to-transparent opacity-10"></div>
                </div>

                {/* Content */}
                <div className="px-8 relative z-10 w-full flex text-white md:mb-0 sm:pb-[3rem] max-w-[101.625rem] md:mt-[15rem]">
                  <div className="h-full items-center justify-center flex flex-col lg:mt-[1.25rem]">
                    <div className="flex flex-col pb-[2rem]">
                      {/* ONLY ACTIVE H1 */}
                      {isActive && (
                        <h1 className="text-[3rem] md:text-[5.25rem] align-middle sm:leading-[1.1190] font-bold w-full lg:w-[65%] text-white mt-[1rem] sm:mt-0">
                          {t?.title?.normal}
                        </h1>
                      )}

                      <div className="flex sm:flex-row flex-col sm:mt-20 mt-8 w-full lg:w-[40%] gap-10">
                        <Link
                          href={t?.buttonLink || "#"}
                          className="bg-white cursor-pointer w-[7.125rem] h-fit sm:px-4 py-1 align-middle text-black flex gap-1 leading-[1.6250] text-base font-normal items-center text-nowrap justify-center"
                        >
                          {t?.badgeText}
                        </Link>

                        <div className="text-lg md:text-base leading-[1.6250] font-normal align-middle">
                          {t?.description}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
