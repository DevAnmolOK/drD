import CommonHeroSection from "@/component/common/CommonHeroSection";
import Gallery from "@/component/gallery/Gallery";
import { QuickLinksPageEndPoints } from "@/lib/service/QuickLinks";

import { headers } from "next/headers";
import { getAbsoluteUrl } from "@/utills/seo/getAbsoluteUrl";
import { buildMetadata } from "@/utills/seo/generateMetaData";

export async function generateMetadata() {
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") || "/events";
  const pageUrl = getAbsoluteUrl(pathname);
  const data = await QuickLinksPageEndPoints.getEventsBanner();
  const data1 = data?.seo_meta;
  const data2 = data?.hero;
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
