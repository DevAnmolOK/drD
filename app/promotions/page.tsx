import React from "react";
import { FiPercent, FiClock, FiXCircle } from "react-icons/fi";
import PromotionList from "../../component/promotionPageComponent/PromotionList";
import CommonHeroSection from "../../component/common/CommonHeroSection";
import { QuickLinksPageEndPoints } from "../../lib/service/QuickLinks";

import { headers } from "next/headers";
import { getAbsoluteUrl } from "@/utills/seo/getAbsoluteUrl";
import { buildMetadata } from "@/utills/seo/generateMetaData";

export async function generateMetadata() {
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") || "/offers";
  const pageUrl = getAbsoluteUrl(pathname);
  const data = await QuickLinksPageEndPoints.getPromotionBanner();
  const data1 = data?.seo_meta;
  const data2 = data?.heroSectionData;
  return buildMetadata({
    pathname: pathname,
    seo: {
      metaTitle: data1?.seo_title || "Manufacturing",
      metaDescription: data1?.seo_description,
      canonical: pageUrl,
      ogImage: data2?.background?.imageSrc || "/images/dpharma-logo.svg",
    },
  });
}

async function fetchOffers() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_PRODUCTS_API_URL}/promotional/get`,
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
    return { promo: data.promo || [] };
  } catch (error) {
    console.error("Error fetching offers:", error);
    return { validOffers: [], expiredOffers: [] };
  }
}

const PromotionPage = async () => {
  const { promo } = await fetchOffers();
  const data = await QuickLinksPageEndPoints.getPromotionBanner();

  return (
    <>
      {/* <BreadcrumbSchemaOnly
        baseUrl={process.env.NEXT_PUBLIC_CLIENT_URL}
        siteName="Eridanus HealthCare"
        title="Promotions"
      /> */}
      <CommonHeroSection heroSectionData={data?.heroSectionData} />
      <div className="min-h-screen w-full">
        <div className="wrapper w-full h-full mx-auto relative sm:mb-0 mb-[1.5rem]">
          <PromotionList
            title="Promotions"
            icon={<FiClock className="w-6 h-6 text-green-600" />}
            offers={promo}
          />
        </div>
      </div>
    </>
  );
};

export default PromotionPage;
