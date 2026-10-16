"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface FooterProps {
  data: any;
  ProductCategory: any;
}
export default function Footer({ data, ProductCategory }: FooterProps) {
  const { bottomBar } = data || {};
  const categories = ProductCategory || [];
  const INITIAL_COUNT = 15;
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);
  return (
    <footer className="bg-linear-to-r from-[#1c2a3a] via-[#1f2f44] to-[#16222f] text-white w-full">
      <div className="wrapper mx-auto w-full  pb-6 pt-14">
        <div className=" flex md:flex-row flex-col gap-12 w-full  justify-end">
          <div className="  md:w-[24%]">
            <div className="relative w-22.5 h-18.5">
              <Image
                src={data?.brand?.logo}
                alt={data?.brand?.name}
                fill
                className="object-contain"
              />
            </div>

            <p className="text-base  leading-[1.7500] text-white font-normal align-middle mt-4 ">
              {data?.brand?.description}
            </p>

            <div className="flex gap-4 mt-8">
              {data?.socialIcons?.map((Icon: any, i: number) => (
                <Link
                  key={i}
                  href={Icon?.link || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 relative flex items-center justify-center transition cursor-pointer hover:scale-110 duration-300"
                >
                  <Image
                    src={Icon?.icon}
                    alt="Dr D Pharma social media"
                    fill
                    className="object-contain rounded-sm"
                  />
                </Link>
              ))}
            </div>
            <div className=" flex sm:flex-row  flex-col justify-start items-start  gap-4 mt-4 md:mt-4">
              <Link
                href={`https://play.google.com/store/apps/details?id=com.designtech.pharma_app`}
                className=" h-15 w-full relative  "
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src={`/app/GooglePlayStore.svg`}
                  alt="Dr D Pharma Android App"
                  fill
                  className="object-contain"
                />
              </Link>
              <div className=" h-15 w-full relative ">
                <Image
                  src={`/app/IOSAppStore.svg`}
                  alt="Dr D Pharma Android App"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </div>

          {/* right section */}
          <div className="md:w-[74%] ">
            {/* info */}
            <div className="flex sm:flex-row flex-col w-full gap-12 sm:gap-0">
              {/* menu */}
              <div className="  sm:w-[20%] ">
                <h4 className="text-[1.25rem] font-bold leading-[1.2000] align-middle mb-8">
                  {data?.informationMenu?.title}
                </h4>

                <div className="gap-5 text-white">
                  <div className="text-base align-middle font-normal leading-normal flex flex-col gap-5">
                    {data?.informationMenu?.column1?.map(
                      (data: any, index: any) => (
                        <Link key={index} href={data?.href}>
                          {data?.label}
                        </Link>
                      ),
                    )}
                  </div>
                </div>

                <div className=" gap-6   mt-6">
                  <div className="text-base align-middle font-normal leading-normal flex flex-col gap-5">
                    {data?.informationMenu?.column2?.map(
                      (data: any, index: any) => (
                        <Link key={index} href={data?.href}>
                          {data?.label}
                        </Link>
                      ),
                    )}
                  </div>
                </div>
              </div>

              <div className="sm:w-[80%]">
                <h4 className="text-[1.25rem] font-bold leading-[1.2000] align-middle mb-8">
                  Product Category
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4 text-white">
                  {categories.map((item: any, index: number) => {
                    const isHidden = index >= visibleCount;
                    return (
                      <Link
                        key={index}
                        href={`/product-speciality/${item?.slug}`}
                        className={`text-base font-normal leading-normal hover:text-[#e0e0e0] transition-colors ${
                          isHidden ? "hidden" : "block"
                        }`}
                      >
                        {item?.name}
                      </Link>
                    );
                  })}
                </div>

                {categories.length > INITIAL_COUNT && (
                  <div className="flex flex-wrap items-center gap-4 mt-6">
                    {visibleCount < categories.length && (
                      <button
                        type="button"
                        onClick={() =>
                          setVisibleCount((prev) =>
                            Math.min(prev + 15, categories.length),
                          )
                        }
                        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-white/10 hover:bg-white/20 border border-white/20 rounded-md transition duration-200 cursor-pointer"
                      >
                        <span>Load More</span>
                        <span className="text-xs text-white/60">
                          ({categories.length - visibleCount} more)
                        </span>
                      </button>
                    )}
                    {visibleCount < categories.length && (
                      <button
                        type="button"
                        onClick={() => setVisibleCount(categories.length)}
                        className="text-sm font-medium text-white/70 hover:text-white underline cursor-pointer"
                      >
                        View All
                      </button>
                    )}
                    {visibleCount > INITIAL_COUNT && (
                      <button
                        type="button"
                        onClick={() => setVisibleCount(INITIAL_COUNT)}
                        className="text-sm font-medium text-white/70 hover:text-white underline cursor-pointer"
                      >
                        Show Less
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
            {/* contact */}
            <div className=" flex  flex-row flex-wrap  mt-8 text-white text-[15px] w-full lg:gap-0 gap-6">
              <div className="flex items-center gap-4  lg:w-[25%]">
                <div className="min-h-[2.75rem] min-w-[2.75rem] relative  border  border-white p-3 rounded-sm">
                  <Image
                    src={data?.contact?.phone?.icon}
                    alt={data?.contact?.phone?.alt || "phone"}
                    fill
                    className="object-contain p-2"
                  />
                </div>
                <div>
                  {data?.contact?.phone?.numbers?.map(
                    (data: any, index: any) => (
                      <a
                        href={`tel:${data}`}
                        className="text-base font-medium leading-[1.4063] align-middle"
                        key={index}
                      >
                        <p>{data}</p>
                      </a>
                    ),
                  )}
                </div>
              </div>

              <div className="flex items-center gap-4  lg:w-[32.5%]">
                <div className="min-h-11 min-w-11 relative  border  border-white p-3 rounded-sm">
                  <Image
                    src={data?.contact?.email?.icon}
                    alt={data?.contact?.phone?.alt || "email"}
                    fill
                    className="object-contain p-2"
                  />
                </div>
                <a
                  href={`mailto:${data?.contact?.email?.value}`}
                  className="text-base font-medium leading-[1.4063] align-middle lowercase hover:underline"
                >
                  {data?.contact?.email?.value}
                </a>
              </div>

              <div className="flex items-center gap-4  lg:w-[42.5%]">
                <div className="min-h-[2.75rem] min-w-[2.75rem] relative  border  border-white  rounded-sm">
                  <Image
                    src={data?.contact?.address?.icon}
                    alt={data?.contact?.address?.alt || "address"}
                    fill
                    className="object-contain p-2"
                  />
                </div>
                <p className="text-base font-medium leading-[1.4063] ">
                  {data?.contact?.address?.value}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="border-t border-[#626263] text-white/40 mt-8 pt-4 flex flex-col md:flex-row justify-between  gap-4">
          <p className=" text-sm font-normal align-middle">
            {bottomBar?.copyright}{" "}
            {/* <a href="https://www.webhopers.com/" target="_blank">
              <span style={{ color: "#1d74e3" }}>Web</span>
              <span style={{ color: "#fd842f" }}>Hopers</span>{" "}
            </a> */}
          </p>

          <div className="flex gap-4  text-sm font-normal align-middle">
            {bottomBar?.links?.map((item: any, index: number) => (
              <div className="flex gap-4" key={index}>
                <Link href={item?.href}>{item?.label}</Link>
                {index < bottomBar.links.length - 1 && <span>|</span>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
