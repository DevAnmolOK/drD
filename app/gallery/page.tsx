import CommonHeroSection from "@/component/common/CommonHeroSection";
import Gallery from "@/component/gallery/Gallery";
import QuickAnswers from "@/component/gallery/QuickAnswer";
import { GalleryPageEndPoints } from "@/lib/service/GalleryPageEndPoint";
import React from "react";

export default async function page() {
  const data = await GalleryPageEndPoints.gallery();
  const { GalleryData, faq, heroSectionData } = data;
  return (
    <div>
      <CommonHeroSection heroSectionData={heroSectionData} />
      <Gallery galleryData={GalleryData} />
      <QuickAnswers faqSection={faq} />
    </div>
  );
}
