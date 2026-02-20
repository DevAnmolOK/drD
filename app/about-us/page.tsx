import CommitmentSection from '@/component/aboutPage/CommitmentSection';
import CoreValues from '@/component/aboutPage/CoreValues';
import DirectorMessage from '@/component/aboutPage/DirectorMessage';
import ReasonsSection from '@/component/aboutPage/ReasonsSection';
import VisionMission from '@/component/aboutPage/VisionMission';
import CommonHeroSection from '@/component/common/CommonHeroSection'
import { AboutPageEndPoints } from '@/lib/service/AboutUsPageEndPoints';

export default  async function page() {
const {data} = await AboutPageEndPoints.companyProfile();
const { heroSectionData,commitmentSectionData ,visionMissionData,coreValuesData,directorMessageData,timelineData} = data;
  
  return (
    <>
    <CommonHeroSection heroSectionData={heroSectionData} />
    <CommitmentSection commitmentSectionData={commitmentSectionData}/>
    <VisionMission visionMissionData={visionMissionData}/>
    <CoreValues coreValuesData={coreValuesData}/>
    <DirectorMessage directorMessageData={directorMessageData}/>
    <ReasonsSection timelineData={timelineData}/>
    </>
  )
}
