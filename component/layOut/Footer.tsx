"use client";

import Image from "next/image";
import Link from "next/link";

export default function Footer({ data }: any) {
  const { bottomBar } = data || {};

  return (
    <footer className="bg-gradient-to-r from-[#1c2a3a] via-[#1f2f44] to-[#16222f] text-white w-full">
      <div className="wrapper mx-auto w-full  pb-6 pt-14">
        <div className=" flex md:flex-row flex-col gap-12 w-full  justify-end">
          <div className="  md:w-[24%]">
            <div className="relative w-[5.625rem] h-[4.625rem]">
              <Image
                src={data?.brand?.logo}
                alt={data?.brand?.name}
                unoptimized
                fill
                className="object-contain"
              />
            </div>

            <p className="text-base  leading-[1.7500] text-white font-normal align-middle mt-[1rem] ">
              {data?.brand?.description}
            </p>

            <div className="flex gap-4 mt-8">
              {data?.socialIcons?.map((Icon: any, i: number) => (
                <Link
                  key={i}
                  href={Icon?.link || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-[2.5rem] h-[2.5rem] relative flex items-center justify-center transition cursor-pointer hover:scale-110 duration-300"
                >
                  <Image
                    src={Icon?.icon}
                    alt="Dr D Pharma social media"
                    unoptimized
                    fill
                    className="object-contain rounded-sm"
                  />
                </Link>
              ))}
            </div>
          </div>

          {/* right section */}
          <div className="md:w-[74%] ">
            {/* info */}
            <div className="flex sm:flex-row flex-col w-full">
              {/* menu */}
              <div className="  sm:w-[25%]">
                <h3 className="text-[1.25rem] font-bold leading-[1.2000] align-middle mb-8">
                  {data?.informationMenu?.title}
                </h3>

                <div className="grid grid-cols-2 gap-5 text-white">
                  <div className="text-base align-middle font-normal leading-[1.5000] flex flex-col gap-5">
                    {data?.informationMenu?.column1?.map(
                      (data: any, index: any) => (
                        <Link key={index} href={data?.href}>
                          {data?.label}
                        </Link>
                      ),
                    )}
                  </div>
                </div>
              </div>
              <div className="  sm:w-[32.5%] ">
                <div className="grid grid-cols-2 gap-6   mt-14">
                  <div className="text-base align-middle font-normal leading-[1.5000] flex flex-col gap-5">
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
              {/*  MAP */}
              <div className="  sm:w-[42.5%]">
                <div className="relative w-full h-[16.188rem]  overflow-hidden sm:mt-0 mt-8">
                  <iframe
                    title="Global Presence"
                    src={data?.map?.embedUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="rounded-md"
                  ></iframe>
                </div>
              </div>
            </div>
            {/* contact */}
            <div className=" flex  flex-row flex-wrap  mt-8 text-white text-[15px] w-full lg:gap-0 gap-6">
              <div className="flex items-center gap-4  lg:w-[25%]">
                <div className="min-h-[2.75rem] min-w-[2.75rem] relative  border  border-white p-3 rounded-sm">
                  <Image
                    src={data?.contact?.phone?.icon}
                    alt={data?.contact?.phone?.alt || "phone"}
                    unoptimized
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
                <div className="min-h-[2.75rem] min-w-[2.75rem] relative  border  border-white p-3 rounded-sm">
                  <Image
                    src={data?.contact?.email?.icon}
                    alt={data?.contact?.phone?.alt || "email"}
                    unoptimized
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
                    unoptimized
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
            {bottomBar?.copyright}
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
