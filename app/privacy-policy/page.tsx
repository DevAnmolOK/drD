import React from "react";
import CommonHeroSection from "../../component/common/CommonHeroSection";
import { CommonEndPoints } from "../../lib/service/CommonEndPoints";

const heroSectionData = {
  badgeText: "Breadcrumbs",
  title: {
    normal: "Who We Are",
    //   highlight: "Calculator",
  },
  description: `VisionPlus Healthcare Private Limited is a leading
                    pharmaceutical company with over 10 years of experience in
                    pharma marketing. We specialize in providing high-quality,
                    innovative, and affordable healthcare solutions, ensuring
                    better patient outcomes.`,
  buttonText: "Expore us",
  background: {
    imageAlt: "Modern laboratory background",
    imageSrc:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDlhCxl2Vxag4giglyO3LRkbo1CCD0M2C2xp8aInGg_GtvGQQTne3cPlp4jncbvfjJQ_Xgtjh22jGzKNrHyiH5djBaJD-qol6WT4TXPCHPkfDmXqGNEJBdTSiFfdhxFLO6gCo8h3f1FobHNsLIP1KgizrslMR0Q0tZHzpU0md3rnJ0Stq3MCkjS76TSVHCBBzYISDJrEU5zOL1EJLtiO4teKHAtUwhRSMYV60XhybXAJZm5Moq-MFo9dEJJ6Zrmo-UWJ8sF_9x5U_uD",
  },
};

export default async function page() {
  const resp = await CommonEndPoints.privacyPolicy();
  const { data, heroSectionData } = resp || {};

  return (
    <div>
      <CommonHeroSection heroSectionData={heroSectionData} />
      <div className="m-auto wrapper">
        <div
          className="blog-content py-12"
          dangerouslySetInnerHTML={{ __html: data?.content }}
        />
      </div>
    </div>
  );
}
