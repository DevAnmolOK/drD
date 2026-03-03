import CommonHeroSection from "@/component/common/CommonHeroSection";
import OurDivison from "@/component/ourDivison/OurDivison";
import { OurdivisonPageEndPoints } from "@/lib/service/OurDivisonPageEndPoint";
import React from "react";

export default async function page() {
  const ourDivisionsData = await OurdivisonPageEndPoints.ourDivisions();
  const { heroSectionData, data } = ourDivisionsData;

  return (
    <div>
      <CommonHeroSection heroSectionData={heroSectionData} />
      <OurDivison data={data} />
    </div>
  );
}
