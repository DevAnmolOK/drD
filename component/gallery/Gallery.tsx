"use client";
import { FiPlay } from "react-icons/fi";

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

type GalleryItem = {
  id?: string | number;
  src?: string;
  alt?: string;
};

type VideoItem =
  | string
  | {
      url?: string;
      src?: string;
      video?: string;
      videoUrl?: string;
    };

type GalleryData = {
  heading?: string;
  subHeading?: string;
  gallery?: GalleryItem[];
  video?: VideoItem[];
};

type GalleryProps = {
  galleryData?: GalleryData | null;
};

export default function Gallery({ galleryData }: GalleryProps) {
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const { heading, subHeading, gallery, video } = galleryData || {};

  const resolveVideoSrc = (item: VideoItem) => {
    const raw =
      typeof item === "string"
        ? item
        : item?.url || item?.src || item?.video || item?.videoUrl;

    if (!raw) return "";

    if (
      raw.startsWith("http://") ||
      raw.startsWith("https://") ||
      raw.startsWith("//") ||
      raw.startsWith("blob:") ||
      raw.startsWith("data:")
    ) {
      return raw;
    }

    const baseUrl =
      process.env.NEXT_PUBLIC_PRODUCT_URL ||
      process.env.NEXT_PUBLIC_API_URL_IMAGE ||
      process.env.NEXT_PUBLIC_API_URL;

    if (!baseUrl) return raw;

    try {
      return new URL(raw, baseUrl).toString();
    } catch {
      return raw;
    }
  };

  const openImageModal = (src: string) => {
    setActiveVideo(null);
    setActiveImage(src);
  };

  const openVideoModal = (src: string) => {
    if (!src) return;
    setActiveImage(null);
    setActiveVideo(src);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveImage(null);
        setActiveVideo(null);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  return (
    <div className="bg-white py-10">
      <div className="wrapper m-auto lg:px-0 px-4 ">
        <SectionHeading
          cssClass="text-center"
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
          {gallery?.map((item: GalleryItem, index: number) => {
            const imageSrc = item?.src || "";
            if (!imageSrc) return null;

            return (
              <div
                key={item.id ?? index}
                className={`relative overflow-hidden rounded-2xl group ${getSpanClass(index)}`}
              >
                <Image
                  src={imageSrc}
                  alt={item.alt || "Gallery image"}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                  <button
                    onClick={() => openImageModal(imageSrc)}
                    className="h-14 w-14 rounded-full bg-white text-black flex items-center justify-center hover:scale-110 transition"
                  >
                    <FiZoomIn size={26} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 mt-12">
          {video?.map((item: VideoItem, index: number) => {
            const videoSrc = resolveVideoSrc(item);

            return (
              <div key={index} className="relative w-full h-55 rounded-xl overflow-hidden group">
                <video
                  src={videoSrc || undefined}
                  className="absolute inset-0 w-full h-full object-cover"
                  muted
                  playsInline
                  preload="metadata"
                />

                {/* Play Button */}
                <button
                  onClick={() => openVideoModal(videoSrc)}
                  disabled={!videoSrc}
                  className="absolute bottom-4 right-4"
                >
                  <span className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-lg hover:scale-110 transition cursor-pointer">
                    <FiPlay className="text-red-500 text-xl ml-1" />
                  </span>
                </button>
              </div>
            );
          })}
        </div>
      </div>
      {/* MODAL POPUP */}
      {activeImage && (
        //         <div
        //           className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
        //           onClick={() => setActiveImage(null)}
        //         >
        //           <div
        //             className="relative max-w-2xl w-full h-[60vh]"
        //             onClick={(e) => e.stopPropagation()}
        //           >
        //             <button
        //               onClick={() => setActiveImage(null)}
        //               className="group absolute top-4 right-8 md:top-3 md:right-12 lg:top-4 lg:right-15 bg-white hover:bg-secondary  text-black rounded-full p-2 shadow-lg bg-white
        //  hover:scale-110 transition z-10"
        //             >
        //               <FiX size={22} className="text-black  group-hover:text-white" />
        //             </button>

        //             <div className="relative w-full aspect-[15/15] rounded-xl overflow-hidden">
        //               <Image
        //                 src={activeImage}
        //                 alt="Gallery preview"
        //                 fill
        //                 className="object-contain"
        //               />
        //             </div>
        //           </div>
        //         </div>
        <div
          className="fixed inset-0 z-999 bg-black/80 flex items-center justify-center p-4 cursor-pointer "
          onClick={() => setActiveImage(null)}
        >
          <div
            className="relative w-fit max-w-5xl max-h-[50rem] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveImage(null)}
              className="absolute -top-12 -right-2 md:-right-8 bg-white hover:bg-secondary text-black hover:text-white rounded-full p-2 shadow-lg transition transform hover:scale-110 z-50"
            >
              <FiX size={24} />
            </button>
            <div className="relative overflow-hidden rounded-xl">
              <img
                src={activeImage}
                alt="Gallery preview"
                className="max-w-full max-h-[85vh] object-contain block shadow-2xl"
              />
            </div>
          </div>
        </div>
      )}

      {activeVideo && (
        <div
          className="fixed inset-0 z-999 bg-black/80 flex items-center justify-center p-4 cursor-pointer"
          onClick={() => setActiveVideo(null)}
        >
          <div
            className="relative w-fit max-w-5xl max-h-120 flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveVideo(null)}
              className="absolute -top-12 -right-2 md:-right-8 bg-white hover:bg-secondary text-black hover:text-white rounded-full p-2 shadow-lg transition transform hover:scale-110 z-50"
            >
              <FiX size={24} />
            </button>

            <video
              src={activeVideo}
              className="max-w-full max-h-[85vh] object-cover block shadow-2xl rounded-xl bg-black"
              controls
              autoPlay
              playsInline
            />
          </div>
        </div>
      )}
    </div>
  );
}
