import CommonHeroSection from "@/component/common/CommonHeroSection";
import AboutSection from "@/component/franchise/AboutSection";
import HeroSection from "@/component/franchise/HeroSection";
import ProductCategories from "@/component/franchise/ProductCategories";
import WhyChooseUs from "@/component/franchise/WhyChooseUs";
import { FranchisePageEndPoints } from "@/lib/service/FranchisePageEndPoints";
import React from "react";

// const heroSectionData = {
//   badgeText: "Breadcrumbs",
//   title: {
//     normal: "Pharma Franchise",
//   },
//   description:
//     "Empower your pharma business with precise financial analytics. Calculate gross margins and net profits instantly to make informed pricing decisions.",
//   buttonText: "Scroll to use",
//   buttonLink: "#",
//   background: {
//     imageAlt: "Modern laboratory background",
//     imageSrc:
//       "https://lh3.googleusercontent.com/aida-public/AB6AXuDlhCxl2Vxag4giglyO3LRkbo1CCD0M2C2xp8aInGg_GtvGQQTne3cPlp4jncbvfjJQ_Xgtjh22jGzKNrHyiH5djBaJD-qol6WT4TXPCHPkfDmXqGNEJBdTSiFfdhxFLO6gCo8h3f1FobHNsLIP1KgizrslMR0Q0tZHzpU0md3rnJ0Stq3MCkjS76TSVHCBBzYISDJrEU5zOL1EJLtiO4teKHAtUwhRSMYV60XhybXAJZm5Moq-MFo9dEJJ6Zrmo-UWJ8sF_9x5U_uD",
//   },
// };
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
