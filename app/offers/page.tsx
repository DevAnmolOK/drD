import {  FiClock, FiXCircle } from "react-icons/fi";
import OffersList from "../../component/offerPageComponent/OfersList";
import CommonHeroSection from "../../component/common/CommonHeroSection";
import { QuickLinksPageEndPoints } from "../../lib/service/QuickLinks";

import { headers } from "next/headers";
import { getAbsoluteUrl } from "@/utills/seo/getAbsoluteUrl";
import { buildMetadata } from "@/utills/seo/generateMetaData";

export async function generateMetadata() {
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") || "/offers";
  const pageUrl = getAbsoluteUrl(pathname);
  const data = await QuickLinksPageEndPoints.getOfferPageBanner();
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

interface BaseOffer {
  id: number;
  title: string;
  description: string;
  image: string;
  discount: string;
  category: string;
  validUntil: string;
  isPopular?: boolean;
}

interface ExpiredOffer extends BaseOffer {
  expiredOn: string;
}

async function fetchOffers() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_PRODUCTS_API_URL}/offers/get`,
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
    return {
      vallidOffers: data.nowOffers || [],
      exppiredOffers: data.expOffers || [],
    };
  } catch (error) {
    console.error("Error fetching offers:", error);
    return { validOffers: [], expiredOffers: [] };
  }
}

const OffersPage = async () => {
  const { vallidOffers, exppiredOffers } = await fetchOffers();
  const data = await QuickLinksPageEndPoints.getOfferPageBanner();
  return (
    <>
      {/* <BreadcrumbSchemaOnly
        baseUrl={process.env.NEXT_PUBLIC_CLIENT_URL}
        siteName="Eridanus HealthCare"
        title="Offers"
      /> */}
      <CommonHeroSection heroSectionData={data?.heroSectionData} />
      <div className="min-h-screen w-full flex flex-col ">
        <div className="wrapper w-full h-full mx-auto relative sm:mb-0 mb-[1.5rem]  ">
          {/* Valid Offers */}
          <OffersList
            title="Available Offers"
            icon={<FiClock className="w-6 h-6 text-link" />}
            offers={vallidOffers}
          />

          {/* Expired Offers */}
          <OffersList
            title="Expired Offers"
            icon={<FiXCircle className="w-6 h-6 text-red-600" />}
            offers={exppiredOffers}
            isExpired
          />
        </div>
      </div>
    </>
  );
};

export default OffersPage;
