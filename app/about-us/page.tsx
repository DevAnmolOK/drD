import CommitmentSection from "@/component/aboutPage/CommitmentSection";
import CoreValues from "@/component/aboutPage/CoreValues";
import DirectorMessage from "@/component/aboutPage/DirectorMessage";
import ReasonsSection from "@/component/aboutPage/ReasonsSection";
import VisionMission from "@/component/aboutPage/VisionMission";
import CommonHeroSection from "@/component/common/CommonHeroSection";
import { AboutPageEndPoints } from "@/lib/service/AboutUsPageEndPoints";
import CoreValuesSection from "@/component/aboutPage/CoreValuesSection";

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
      {/* <VisionMission
        visionMissionData={visionMissionData}
        core_values_heading={core_values_heading}
      />
      <CoreValues coreValuesData={coreValuesData} /> */}
      <DirectorMessage directorMessageData={directorMessageData} />
      <ReasonsSection timelineData={timelineData} timelineTag={timeline} />
    </>
  );
}
