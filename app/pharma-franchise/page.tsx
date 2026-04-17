import CommonHeroSection from "@/component/common/CommonHeroSection";
import AboutSection from "@/component/franchise/AboutSection";
import HeroSection from "@/component/franchise/HeroSection";
import ProductCategories from "@/component/franchise/ProductCategories";
import WhyChooseUs from "@/component/franchise/WhyChooseUs";
import { FranchisePageEndPoints } from "@/lib/service/FranchisePageEndPoints";
import { headers } from "next/headers";
import { getAbsoluteUrl } from "@/utills/seo/getAbsoluteUrl";
import { buildMetadata } from "@/utills/seo/generateMetaData";

export async function generateMetadata() {
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") || "/about-us";
  const pageUrl = getAbsoluteUrl(pathname);
  const data = await FranchisePageEndPoints.franchisePage();
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
  const resp = await FranchisePageEndPoints.franchisePage();
  const {
    heroSectionData,
    aboutData,
    heroData,
    productCategories,
    whyChooseUs,
  } = resp || {};

  return (
    <div>
      <CommonHeroSection heroSectionData={heroSectionData} />
      <HeroSection heroData={heroData} />
      <AboutSection aboutData={aboutData} />
      <ProductCategories data={productCategories} />
      <WhyChooseUs data={whyChooseUs} />
    </div>
  );
}
