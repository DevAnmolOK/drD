import Image from "next/image";
// import { fetchData } from "@/utils/fetchData";
// import type { Metadata } from "next";
// import { createMetaData } from "@/utils/fetchData";
import Head from "next/head";
import Script from "next/script";
import CommonHeroSection from "../../component/common/CommonHeroSection";
// import BreadcrumbSchemaOnly from "@/components/breadcrumbsScema/breadcrumbsSchema";
import { headers } from "next/headers";
import { CertificatePageEndPoints } from "../../lib/service/CertificatesPageEndPoint";

// export async function generateMetadata(): Promise<Metadata> {
//   const data = await createMetaData("/certificates", "certificate");
//   return { ...data };
// }

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
  // const { heroSectionData, description } = resp.data || {};

  // const base = process.env.NEXT_PUBLIC_IMAGE_URL;
  // const snippetData = data?.snippet;
  // const heroSectionData = {
  //   badgeText: "Breadcrumbs",
  //   title: {
  //     normal: "MANUFACTURING",
  //     //   highlight: "Calculator",
  //   },
  //   description: `Redefining pharmaceutical production with WHO-GMP compliant facilities. Our commitment to excellence ensures every dosage meets the highest global standards of safety and efficacy.`,
  //   buttonText: "Vision Plus",
  //   background: {
  //     imageAlt: "Modern laboratory background",
  //     imageSrc:
  //       "https://lh3.googleusercontent.com/aida-public/AB6AXuAwvm5ETO-TKsTWwaU8LCyzg9_K10k9m_wLJBcUhNBfsIbCh3XFB6qm0JivbnpoV9nMk7tGsinPjktVcHIYKe3CuVcX2GvixCp1aDSIJf3fzaCmGCvkKvIgTtYSObSkv7pqvNHdXJMWpJAnYXg7-QAk1L2_mKmtoA9WcDBuOyVg7TclDoKf3Gb72fSeHTxltbWL5_KU6OtNIEamEJhM8UyZPVcX6Mo5Zn9HZFyqJ7i3HC0l-f6t3o6zhSTZ5Y-t7O8Ebd20rHBTUj3_",
  //   },
  // };
  return (
    <>
      {/* <BreadcrumbSchemaOnly
        baseUrl={process.env.NEXT_PUBLIC_CLIENT_URL}
        siteName="Eridanus HealthCare"
        title="Our Certificates"
      /> */}

      {/* {snippetData && (
        <Script
          id="snippet-script"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(snippetData),
          }}
        />
      )} */}
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
              {/* <h2 className="text-2xl font-semibold text-center mb-6">
                Certificates from App Dashboard
              </h2> */}
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
