import CommitmentSection from "@/component/aboutPage/CommitmentSection";
import CoreValues from "@/component/aboutPage/CoreValues";
import DirectorMessage from "@/component/aboutPage/DirectorMessage";
import ReasonsSection from "@/component/aboutPage/ReasonsSection";
import VisionMission from "@/component/aboutPage/VisionMission";
import CommonHeroSection from "@/component/common/CommonHeroSection";
import { AboutPageEndPoints } from "@/lib/service/AboutUsPageEndPoints";
import CoreValuesSection from "@/component/aboutPage/CoreValuesSection";

import { headers } from "next/headers";
import { getAbsoluteUrl } from "@/utills/seo/getAbsoluteUrl";
import { buildMetadata } from "@/utills/seo/generateMetaData";
export async function generateMetadata() {
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") || "/about-us";
  const pageUrl = getAbsoluteUrl(pathname);
  const { data, seo_meta } = await AboutPageEndPoints.companyProfile();
  const data1 = seo_meta;
  const data2 = data;
  return buildMetadata({
    pathname: pathname,
    seo: {
      metaTitle: data1?.seo_title || "About-us",
      metaDescription: data1?.seo_description,
      canonical: pageUrl,
      ogImage:
        data2?.heroSectionData?.background?.imageSrc ||
        "/images/dpharma-logo.svg",
    },
  });
}

export default async function page() {
  const { data } = await AboutPageEndPoints.companyProfile();
  const {
    heroSectionData,
    commitmentSectionData,
    visionMissionData,
    coreValuesData,
    directorMessageData,
    timelineData,
    core_values_heading,
    signature,
    timeline,
  } = data;

  return (
    <>
      <CommonHeroSection heroSectionData={heroSectionData} />
      <CommitmentSection commitmentSectionData={commitmentSectionData} />
      <CoreValuesSection
        visionMissionData={visionMissionData}
        core_values_heading={core_values_heading}
        coreValuesData={coreValuesData}
      />
      <DirectorMessage directorMessageData={directorMessageData} />
      <ReasonsSection timelineData={timelineData} timelineTag={timeline} />
    </>
  );
}
