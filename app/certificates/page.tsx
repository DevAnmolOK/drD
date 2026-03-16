import Image from "next/image";

import Head from "next/head";
import Script from "next/script";
import CommonHeroSection from "../../component/common/CommonHeroSection";
import { headers } from "next/headers";
import { CertificatePageEndPoints } from "../../lib/service/CertificatesPageEndPoint";

async function fetchCertificates() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_PRODUCTS_API_URL}/certificate/get`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-secret-key": `${process.env.NEXT_PUBLIC_SECRET_API_KEY}`,
        },
      },
    );
    if (!res.ok) throw new Error("Failed to fetch offers");
    const data = await res.json();
    return { certificates: data.certificate || [] };
  } catch (error) {
    console.error("Error fetching offers:", error);
    return { validOffers: [], expiredOffers: [] };
  }
}

const baseUrl = process.env.NEXT_PUBLIC_PRODUCT_URL;

export default async function Certificates() {
  // const { data } = await fetchData(
  //   "certificate?populate[slug][populate]=true&populate[seo][populate][canonical_links]=true&populate[Images][fields][0]=url",
  // );
  const { certificates } = await fetchCertificates();
  const resp = await CertificatePageEndPoints.getCertificatePage();

  return (
    <>
      <CommonHeroSection heroSectionData={resp?.heroSectionData} />
      <div className="w-full h-full  text-black  flex items-center justify-center">
        <div className="wrapper w-full h-full mx-auto  relative  sm:mb-0 mb-[1.5rem]">
          <div className=" flex items-center flex-col justify-center mt-[1rem] mb-[3rem]">
            <div className=" lg:max-w-[60vw]  md:max-w-[75vw] w-full mt-[1rem]">
              <div
                className="text-[var(--color-subitle)] font-normal text-pbase leading2 text-center"
                dangerouslySetInnerHTML={{
                  __html: resp?.data?.content || "",
                }}
              />
            </div>

            {/* ---------------- Dashboard Certificates Section ---------------- */}
            <div className=" mx-auto lg:max-w-[70vw]  md:max-w-[75vw] w-full mt-[3rem] flex items-center justify-center">
              {Array.isArray(certificates) && certificates.length > 0 ? (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-12">
                  {certificates.map((img: any, index: number) => (
                    <div
                      className="flex flex-col items-center text-center space-y-4"
                      key={index}
                    >
                      <div className="relative min-[400px]:h-[28.5625rem] h-[23.5625rem] min-[400px]:w-[22.5625rem] w-[17.5625rem]">
                        <Image
                          src={
                            img?.image
                              ? `${baseUrl}/${img.image}`
                              : "/placeholder.png"
                          }
                          alt={img?.title || "Certificate image"}
                          fill
                          className="object-contain"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className=" text-xl text-secondary font-semibold">
                  No certificates
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
