import CommonHeroSection from "@/component/common/CommonHeroSection";
import Gallery from "@/component/gallery/Gallery";
import { QuickLinksPageEndPoints } from "@/lib/service/QuickLinks";
import React from "react";

export default async function page() {
  const quickLinks = await QuickLinksPageEndPoints.getEventsBanner();
  const { hero, GalleryData1, GalleryData2, GalleryData3 } = quickLinks || {};

  return (
    <div>
      <CommonHeroSection heroSectionData={hero} />
      <Gallery galleryData={GalleryData1} />
      <Gallery galleryData={GalleryData2} />
      <Gallery galleryData={GalleryData3} />
    </div>
  );
}
