import React from "react";
import { FiPercent, FiClock, FiXCircle } from "react-icons/fi";
import OffersList from "../../component/offerPageComponent/OfersList";
import CommonHeroSection from "../../component/common/CommonHeroSection";
import { QuickLinksPageEndPoints } from "../../lib/service/QuickLinks";
// import Banner from "@/components/HeroBanner";
// import { createMetaData } from "@/utils/fetchData";
// import type { Metadata } from "next";
// import BreadcrumbSchemaOnly from "@/components/breadcrumbsScema/breadcrumbsSchema";
// Types

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

// export async function generateMetadata(): Promise<Metadata> {
//   const data = await createMetaData("/offers", "offer-page");
//   return { ...data };
// }

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
        title="Offers"
      /> */}
      <CommonHeroSection heroSectionData={data?.heroSectionData} />
      <div className="min-h-screen w-full flex flex-col ">
        <div className="wrapper w-full h-full mx-auto relative sm:mb-0 mb-[1.5rem]  ">
          {/* Hero Section */}
          {/* <Banner pageName="Offers" color="text-white" /> */}
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
