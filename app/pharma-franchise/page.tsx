import CommonHeroSection from "@/component/common/CommonHeroSection";
import AboutSection from "@/component/franchise/AboutSection";
import HeroSection from "@/component/franchise/HeroSection";
import ProductCategories from "@/component/franchise/ProductCategories";
import WhyChooseUs from "@/component/franchise/WhyChooseUs";
import { FranchisePageEndPoints } from "@/lib/service/FranchisePageEndPoints";

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
