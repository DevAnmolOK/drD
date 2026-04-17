import CommonHeroSection from "@/component/common/CommonHeroSection";
import Gallery from "@/component/gallery/Gallery";
import QuickAnswers from "@/component/gallery/QuickAnswer";
import { GalleryPageEndPoints } from "@/lib/service/GalleryPageEndPoint";
import { headers } from "next/headers";
import { getAbsoluteUrl } from "@/utills/seo/getAbsoluteUrl";
import { buildMetadata } from "@/utills/seo/generateMetaData";

export async function generateMetadata() {
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") || "/about-us";
  const pageUrl = getAbsoluteUrl(pathname);
 const data = await GalleryPageEndPoints.gallery();
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
