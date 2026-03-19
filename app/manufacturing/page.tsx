import Image from "next/image";
import CommonHeroSection from "@/component/common/CommonHeroSection";
import { IoIosCheckmark } from "react-icons/io";
import { describe } from "node:test";
import { Certificate } from "crypto";
import { facilitiesPageEndPoints } from "@/lib/service/facilities";

export default async function FacilityPage() {
  const data = await facilitiesPageEndPoints.getData();
  const {
    heroSectionData,
    infrastructureData,
    certificateData,
    capabilitiesData,
    whyChooseUsData,
  } = data;

  return (
    <>
      <div className=" w-full mx-auto">
        <CommonHeroSection heroSectionData={data?.heroSectionData} />
        <div className="w-full overflow-hidden flex flex-col mx-auto">
          {/* ================= INFRASTRUCTURE ================= */}
          <section className="py-12 md:py-20 ">
            <div className="wrapper mx-auto space-y-8 sm:space-y-12 ">
              <div className="text-center  mx-auto">
                <h2 className="text-heading text-[2rem] sm:text-[3rem] font-normal  leading-[1.1667] align-middle capitalize tracking-[1.5px]  ">
                  {infrastructureData?.heading_start}
                  <span className="font-bold">
                    {" "}
                    {infrastructureData?.heading_bold}{" "}
                  </span>
                  {infrastructureData?.heading_end}
                </h2>
                <p className="text-description mt-4 text-base  align-middle leading-[1.7500]">
                  {infrastructureData?.description}
                </p>
              </div>

              <div className="flex flex-col-reverse md:grid md:grid-cols-2 gap-8 sm:gap-16 ">
                <div className="space-y-5 text-description leading-[170%]">
                  <p className="text-description  text-base  align-middle leading-[1.7500]">
                    {infrastructureData?.section?.description}
                  </p>
                  <h3 className="text-heading text-[1.5rem] font-semibold  leading-[1.1667] align-middle capitalize tracking-[1.5px]">
                    {infrastructureData?.section?.heading}
                  </h3>
                  <ul className="space-y-3">
                    {infrastructureData?.section?.points.map(
                      (point: any, index: any) => (
                        <li key={index} className="flex items-start  gap-2 ">
                          <span className="w-6 h-6 bg-[#EE4223] rounded-full flex justify-center items-center ">
                            <IoIosCheckmark size={20} className="text-white" />
                          </span>
                          <span>{point}</span>
                        </li>
                      ),
                    )}
                  </ul>
                </div>

                <div className="relative h-[20rem] sm:h-[25rem] md:h-[31.25rem] rounded-xl overflow-hidden shadow-xl">
                  <Image
                    src={infrastructureData?.section?.image || `/fallback.png`}
                    alt={
                      infrastructureData?.section?.imageAlt ||
                      "Manufacturing Infrastructure"
                    }
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* ================= CERTIFICATIONS ================= */}
          <section className="py-12 sm:py-20 bg-gradient-to-r from-[#1c2a3a] via-[#1f2f44] to-[#16222f] text-white">
            <div className="wrapper mx-auto  space-y-10">
              <div className="text-center max-w-4xl mx-auto">
                <h2 className="text-white text-[2rem] sm:text-[3rem] font-normal  leading-[1.1667] align-middle capitalize tracking-[1.5px]  ">
                  {certificateData?.heading_start}
                  <span className="font-bold">
                    {" "}
                    {certificateData?.heading_bold}{" "}
                  </span>
                  {certificateData?.heading_end}
                </h2>
                <p className="text-white mt-4 text-base  align-middle leading-[1.7500]">
                  {certificateData?.description}
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-10">
                {certificateData?.section?.certificate?.map(
                  (cert: any, index: any) => (
                    <div
                      key={index}
                      className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-xl hover:shadow-xl transition flex flex-col gap-4"
                    >
                      <div className=" h-[6rem] w-[6rem] relative overflow-hidden ">
                        <Image
                          src={cert?.image}
                          alt={cert?.certification}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <h3 className="text-xl font-semibold">
                        {cert?.certification}
                      </h3>
                      <p className="text-white  text-sm align-middle leading-[1.7500]">
                        {cert?.describe}
                      </p>
                    </div>
                  ),
                )}
              </div>

              <p className="text-white text-center mt-4 text-base  align-middle leading-[1.7500] ">
                {certificateData?.section?.description}
              </p>
              <p className="text-white text-center  text-base  align-middle leading-[1.7500]">
                {certificateData?.section?.heading}
              </p>
            </div>
          </section>

          {/* ================= CAPABILITIES ================= */}
          <section className="py-12 sm:py-20 bg-white">
            <div className="wrapper mx-auto space-y-8 sn:space-y-16">
              <div className="text-center">
                <h2 className="text-heading text-[2rem] sm:text-[3rem] font-normal  leading-[1.1667] align-middle capitalize tracking-[1.5px]  ">
                  {capabilitiesData?.heading_start}
                  <span className="font-bold">
                    {" "}
                    {capabilitiesData?.heading_bold}{" "}
                  </span>
                  {capabilitiesData?.heading_end}
                </h2>
                <p className="text-description mt-4 text-base  align-middle leading-[1.7500]">
                  {capabilitiesData?.description}
                </p>
              </div>

              {capabilitiesData?.section?.certificate?.map(
                (data: any, index: any) => (
                  <div
                    key={index}
                    className={`grid md:grid-cols-2 gap-8 sm:gap-16 items-center  ${
                      index % 2 !== 0
                        ? "md:[&>*:first-child]:order-2 md:[&>*:last-child]:order-1"
                        : ""
                    }`}
                  >
                    {/* TEXT SECTION */}
                    <div className="space-y-5 text-description leading-[170%]">
                      <h3 className="text-heading text-[1.5rem] font-semibold tracking-[1.5px] capitalize">
                        {data?.heading}
                      </h3>
                      <p className="text-base leading-[1.75]">
                        {data?.description}
                      </p>

                      <ul className="space-y-3">
                        {data?.keyPoints?.map((point: string, i: number) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="w-6 h-6 bg-[#EE4223] rounded-full flex justify-center items-center">
                              <IoIosCheckmark
                                size={20}
                                className="text-white"
                              />
                            </span>
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* IMAGE SECTION */}
                    <div className="relative h-[16rem] sm:h-[25rem] md:h-[31.25rem] rounded-xl overflow-hidden shadow-xl">
                      <Image
                        src={data?.image || "/images/infra.jpg"}
                        alt={data?.heading || "Infrastructure"}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                ),
              )}
            </div>
          </section>

          {/* ================= WHY CHOOSE US ================= */}
          <section className="pt-20 pb-10 bg-gradient-to-r from-[#1c2a3a] via-[#1f2f44] to-[#16222f] text-white">
            <div className="wrapper mx-auto border-b pb-20 border-white/50 text-center space-y-12">
              <div className="text-center">
                <h2 className="text-white text-[2rem] sm:text-[3rem] font-normal  leading-[1.1667] align-middle capitalize tracking-[1.5px]  ">
                  {whyChooseUsData?.heading_start}
                  <span className="font-bold">
                    {" "}
                    {whyChooseUsData?.heading_bold}{" "}
                  </span>
                  {whyChooseUsData?.heading_end}
                </h2>
                <p className="text-white mt-4 text-base  align-middle leading-[1.7500]">
                  {whyChooseUsData?.description}
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
                {whyChooseUsData?.section?.keyPoints?.map(
                  (point: any, index: any) => (
                    <div
                      key={index}
                      className="bg-white/5 border border-white/10 p-4 sm:p-8 rounded-xl flex gap-4 text-white"
                    >
                      <span className="min-w-8 h-8 bg-[#EE4223] rounded-full flex justify-center items-center">
                        <IoIosCheckmark size={20} className="text-white" />
                      </span>
                      <span className=" text-lg font-medium">{point}</span>
                    </div>
                  ),
                )}
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
