"use client";
import { useState } from "react";
import TableOfContents from "./TableOfContents";

import EnquiryForm from "../common/EnquireyForm";

import {
  FaRegCalendarAlt as Calendar,
  FaRegClock as Clock,
  FaChartLine as TrendingUp,
} from "react-icons/fa";
import { FaHandPointLeft } from "react-icons/fa";
import Link from "next/link";
import BlogCard from "./BlogCard";
import { useRouter } from "next/navigation";
import { GrUpdate } from "react-icons/gr";
import { MdCreate } from "react-icons/md";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL_IMAGE;
// console.log("Base_Url:", BASE_URL);

function addBaseUrlToImages(html: string) {
  if (!html) return html;
  return html.replace(
    /<img\s+[^>]*src="(\/[^"]+)"/g,
    `<img src="${BASE_URL}$1"`,
  );
}

interface BlogDetailProps {
  data?: any;
  recent?: any;
  related?: any;
  services?: any;
}

function Exampl({ updatedAt }: any) {
  const formattedDate = new Date(updatedAt)
    .toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })
    .replace(/\s/g, "/");

  return <span>{formattedDate}</span>;
}
const BlogDetailPage = ({
  data,
  recent,
  related,
  services,
}: BlogDetailProps) => {
  // console.log("BLOG Details:", data);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [likes, setLikes] = useState(234);
  const [hasLiked, setHasLiked] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const router = useRouter();
  return (
    <div className="min-h-screen ">
      {/* Navigation Bar */}

      <div className="wrapper mx-auto  mt-8 ">
        <div className="flex items-center justify-between">
          <Link
            href={`/blogs`}
            onClick={() => {
              setTimeout(() => router.refresh(), 50);
            }}
            className="flex items-center gap-2 text-Midnight hover:text-bgSecondary transition-colors font-medium"
          >
            <FaHandPointLeft size={28} />
            Back to Blog
          </Link>
          <div className="flex items-center gap-3"></div>
        </div>
      </div>

      <div className="wrapper mx-auto py-8">
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Main Content */}
          <article className="lg:col-span-8">
            {/* Header */}
            <div className="mb-8 rounded-2xl overflow-hidden shadow-xl">
              <img
                src={data?.image || "/fallback.jpg"}
                alt={data?.title}
                className="w-full h-96 object-cover"
              />
            </div>

            <div className="mb-8">
              {/* <div className="flex items-center gap-3 mb-4">
                {data?.category.map((cate: any, index: any) => (
                  <span
                    className="bg-textPrimary/10 text-textPrimary px-4 py-1 rounded-full text-sm font-semibold"
                    key={index}
                  >
                    {cate}
                  </span>
                ))}
              </div> */}

              {/* <h2 className="text-3xl md:text-5xl font-bold text-Midnight mb-4 ">
                {data?.name}
              </h2> */}

              {/* <p className="text-xl text-border mb-6  leading-[1.4000] ">
                {data?.description}
              </p> */}

              {/* Author Info */}
              <div className="flex items-center justify-between flex-wrap gap-4 pb-6 border-b border-gray-200">
                <Link
                  href={`/author/${data?.authorUrl}`}
                  className="flex items-center gap-4"
                  onClick={() => {
                    setTimeout(() => router.refresh(), 50);
                  }}
                >
                  <img
                    src={data?.authorDetails.avatar || "/fallback.jpg"}
                    alt={data?.authorDetails?.name || ""}
                    className="w-14 h-14 rounded-full object-cover ring-4 ring-blue-50"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {data?.author || ""}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {data?.authorDetails?.email || ""}
                    </p>
                  </div>
                </Link>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <MdCreate className="w-4 h-4 text-black" />
                    {data?.date || ""}
                  </span>
                  <span className="flex items-center gap-1">
                    <GrUpdate className="w-4 h-4 text-black" />
                    {data?.updated_at ? (
                      <Exampl updatedAt={data?.updated_at} />
                    ) : (
                      ""
                    )}
                  </span>

                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4 text-black" />
                    {data.readTime || "5 min read"}
                  </span>
                </div>
              </div>
            </div>

            {/* Featured Image */}

            <div className=" mb-4">
              <TableOfContents />
            </div>
            <div
              className="blog-content"
              dangerouslySetInnerHTML={{
                __html: addBaseUrlToImages(data?.content),
              }}
            />
          </article>

          {/* Sidebar */}
          <aside className="lg:col-span-4">
            <div className="sticky top-24 space-y-6">
              {/* Table of Contents */}

              {/* <TableOfContents /> */}
              <EnquiryForm heading="Get In Touch With Us" />

              {/* Services */}
              {services?.length > 0 && (
                <div className="bg-white rounded-xl shadow-custom-lg p-6  border-gray-100">
                  <h3 className="text-Vulcan text-xl sm:text-2xl font-bold mb-3 tracking-[-2%] leading-[130%] align-middle flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-bgSecondary" />
                    Services
                  </h3>
                  <nav className="">
                    {services?.map((item: any) => (
                      <Link
                        key={item.id}
                        href={`/services${item.url}`}
                        onClick={() => {
                          setTimeout(() => router.refresh(), 50);
                        }}
                        className="block py-2 px-3 text-black hover:bg-bgSecondary/10 hover:text-bgSecondary rounded-lg transition-colors text-sm font-medium leading-[1.7500]  tracking-[-2%]"
                      >
                        {item?.title}
                      </Link>
                    ))}
                  </nav>
                </div>
              )}
              {/* Recent Posts */}
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-4">
                  Recent Articles
                </h3>
                <div className="space-y-6">
                  {recent?.map((post: any, index: any) => (
                    <Link
                      href={`/${post?.slug}`}
                      onClick={() => {
                        setTimeout(() => router.refresh(), 50);
                      }}
                      className="group cursor-pointer"
                      key={index}
                    >
                      <div className="relative h-32 rounded-lg overflow-hidden mb-2">
                        <img
                          src={post.image || "/fallback.jpg"}
                          alt={post?.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        {post?.category?.length > 0 && (
                          <div className="absolute top-2 right-2">
                            <span className="text-white bg-secondary px-3 py-1 rounded-full text-xs font-semibold">
                              {post?.category}
                            </span>
                          </div>
                        )}
                      </div>
                      <h4 className="font-semibold text-gray-900 text-sm mb-1 group-hover:text-blue-600 transition-colors line-clamp-2">
                        {post?.name}
                      </h4>
                      <p className="text-gray-600 text-xs mb-4">
                        {post?.readTime || "5 min read"}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
      <div className="wrapper mx-auto pb-16 pt-12 ">
        <h3 className="font-bold text-gray-900 mb-4">Related Articles</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {related?.map((post: any) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogDetailPage;
