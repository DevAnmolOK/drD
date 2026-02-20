"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { FiZoomIn, FiX } from "react-icons/fi";
import SectionHeading from "../common/SectionHeading";

const getSpanClass = (index: number) => {
  const position = index % 5;
  switch (position) {
    case 2:
      return "md:row-span-2"; //tall
    case 3:
      return "md:row-span-2 lg:col-span-2"; //wide
    default:
      return ""; //small
  }
};

export default function Gallery({ galleryData }: any) {
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const { heading, subHeading, gallery } = galleryData || {};

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveImage(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  return (
    <div className="bg-white">
      <div className="wrapper m-auto lg:px-0 px-4 py-10">
        <SectionHeading
          cssClass="text-left"
          title={heading}
          subTitle={subHeading}
        />
        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3
            auto-rows-[180px]
            sm:auto-rows-[200px]
            lg:auto-rows-[220px]
            gap-6
            mt-6
          "
        >
          {gallery?.map((item: any, index: any) => (
            <div
              key={item.id}
              className={`relative overflow-hidden rounded-2xl group ${getSpanClass(index)}`}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                <button
                  onClick={() => setActiveImage(item.src)}
                  className="h-14 w-14 rounded-full bg-white text-black flex items-center justify-center hover:scale-110 transition"
                >
                  <FiZoomIn size={26} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* MODAL POPUP */}
      {activeImage && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={() => setActiveImage(null)}
        >
          <div
            className="relative max-w-2xl w-full h-[60vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveImage(null)}
              className="absolute top-12 right-2 md:top-30 md:right-4 lg:-top-3 lg:right-15 
        bg-white text-black rounded-full p-2 shadow-lg
        hover:scale-110 transition z-10"
            >
              <FiX size={22} />
            </button>
            <Image
              src={activeImage}
              alt="Gallery preview"
              fill
              className="rounded-xl object-contain w-full"
            />
          </div>
        </div>
      )}
    </div>
  );
}
