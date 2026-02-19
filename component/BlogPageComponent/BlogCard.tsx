"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import React from "react";
import { MdCalendarToday, MdAccessTime, MdArrowForward } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import Image from "next/image";

export default function BlogCard({ post }: any) {
  // console.log("Post:", post?.slug);
  const router = useRouter();
  return (
    <Link
      href={`/${post.slug}`}
      onClick={() => {
        setTimeout(() => router.refresh(), 50);
      }}
    >
      <article className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col group cursor-pointer h-full">
        {/* Thumbnail */}
        <div className="relative h-72 md:h-[20rem] overflow-hidden">
          <Image
            src={post?.image || "/images/fallback.png"}
            alt={post?.name || "Blog Image"}
            fill
            unoptimized
            quality={100}
            className="w-full h-full object-contain sm:object-cover group-hover:scale-110 transition-transform duration-500"
          />
          {post?.categories?.length > 0 && (
            <div className="absolute top-4 right-4">
              <span className="bg-secondary text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                {post?.category}
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-grow">
          <div className="flex items-center gap-3 mb-3 text-sm text-border">
            <span className="flex items-center gap-1">
              <MdCalendarToday className="w-4 h-4" />
              {post?.date}
            </span>
            <span className="flex items-center gap-1">
              <MdAccessTime className="w-4 h-4" />
              {post?.readTime}
            </span>
          </div>

          <h3 className="text-Vulcan text-xl sm:text-2xl font-bold tracking-[-2%] leading-[130%] mb-3 group-hover:text-secondary transition-colors line-clamp-2">
            {post?.name}
          </h3>

          <p className="mb-4 flex-grow line-clamp-3 text-border text-base font-normal leading-[1.7500]  tracking-[-2%]">
            {post.description || "N/A"}
          </p>

          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <span className="text-sm text-border font-medium flex items-center gap-1">
              <FaUser className="w-4 h-4 inline-block mr-1" />
              {post?.author}
            </span>
            <button className="text-secondary font-semibold text-sm flex items-center gap-1 group-hover:gap-4 transition-all">
              Read
              <MdArrowForward className="w-4 h-4" />
            </button>
          </div>
        </div>
      </article>
    </Link>
  );
}
