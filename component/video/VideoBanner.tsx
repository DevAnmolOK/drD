"use client";

import { useRef, useState } from "react";
import { FiPlay, FiPause } from "react-icons/fi";

export default function VideoBanner({ homeVideoSection }: any) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const { title, video, image } = homeVideoSection || {};

  const togglePlay = () => {
    if (!videoRef.current) return;

    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <section className="py-10 ">
      <div className="wrapper m-auto px-6 lg:px-0 ">
        <div className="relative rounded-xl overflow-hidden">
          <video
            ref={videoRef}
            className="w-full h-162.5 object-cover"
            poster={image}
            preload="metadata"
            playsInline
          >
            <source src={video} type="video/mp4" />
          </video>

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/18 flex items-end p-8">
            <h2 className="text-white text-2xl md:text-4xl font-bold max-w-xl">
              {title}
            </h2>
          </div>

          {/* Play / Pause Button */}
          <button
            onClick={togglePlay}
            className="absolute bottom-8 right-8 w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition"
          >
            <span className="w-10 h-10 flex items-center justify-center border rounded-full cursor-pointer">
              {isPlaying ? (
                <FiPause className="text-red-500 text-xl" />
              ) : (
                <FiPlay className="text-red-500 text-xl" />
              )}
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
