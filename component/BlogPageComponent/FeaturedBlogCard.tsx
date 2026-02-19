"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MdCalendarToday, MdAccessTime, MdArrowForward } from "react-icons/md";
import { FaUser } from "react-icons/fa";

export default function FeaturedBlogCard({ post }: any) {
  if (!post) return null;
  const router = useRouter();
  return (
    <div className="mb-12">
      <h2 className="text-[2rem] sm:text-[2.25rem] text-Vulcan leading-[130%] mt-2 font-bold mb-6">
        Featured Article
      </h2>
      <Link
        href={`/${post.slug}`}
        onClick={() => {
          setTimeout(() => router.refresh(), 50);
        }}
      >
        <div className="bg-white rounded-2xl shadow-custom-md overflow-hidden transition-shadow group cursor-pointer">
          <div className="grid md:grid-cols-2 gap-0">
            {/* Image */}
            <div className="relative h-64 md:h-full overflow-hidden">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-4 left-4">
                <span className="bg-bgSecondary text-white px-4 py-1 rounded-full text-sm font-semibold">
                  Featured
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-8 flex flex-col justify-center">
              <div className="flex items-center gap-4 mb-4 text-sm text-border">
                <span className="flex items-center gap-1">
                  <MdCalendarToday className="w-4 h-4" />
                  {post.date}
                </span>
                <span className="flex items-center gap-1">
                  <MdAccessTime className="w-4 h-4" />
                  {post.readTime}
                </span>
              </div>

              <h3 className="sm:text-3xl font-bold mb-4 group-hover:text-primary transition-colors text-Vulcan text-2xl tracking-[-2%] leading-[130%]">
                {post.title}
              </h3>

              <p className="mb-6 text-lg text-border leading-[1.7500] font-medium tracking-[-2%]">
                {post.description}
              </p>

              <div className="flex items-center justify-between">
                <span className="text-border font-medium flex items-center gap-1">
                  <FaUser className="w-4 h-4" />
                  {post.author}
                </span>
                <button className="flex items-center gap-2 text-primary font-semibold group-hover:gap-3 transition-all">
                  Read More
                  <MdArrowForward className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
