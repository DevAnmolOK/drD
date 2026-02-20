import CommonHeroSection from '@/component/common/CommonHeroSection';
import OurDivison from '@/component/ourDivison/OurDivison';
import { OurdivisonPageEndPoints } from '@/lib/service/OurDivisonPageEndPoint';
import React from 'react'



  // const heroSectionData = {
  //   badgeText: "Breadcrumbs",
  //   title: {
  //     normal: "Our Divisions",
  //   },
  //   description:
  //     "Empower your pharma business with precise financial analytics. Calculate gross margins and net profits instantly to make informed pricing decisions.",
  //   buttonText: "Scroll to use",
  //   background: {
  //     imageAlt: "Modern laboratory background",
  //     imageSrc:
  //       "https://lh3.googleusercontent.com/aida-public/AB6AXuDlhCxl2Vxag4giglyO3LRkbo1CCD0M2C2xp8aInGg_GtvGQQTne3cPlp4jncbvfjJQ_Xgtjh22jGzKNrHyiH5djBaJD-qol6WT4TXPCHPkfDmXqGNEJBdTSiFfdhxFLO6gCo8h3f1FobHNsLIP1KgizrslMR0Q0tZHzpU0md3rnJ0Stq3MCkjS76TSVHCBBzYISDJrEU5zOL1EJLtiO4teKHAtUwhRSMYV60XhybXAJZm5Moq-MFo9dEJJ6Zrmo-UWJ8sF_9x5U_uD",
  //   },
  // };
export default async function page() {
  const ourDivisionsData = await OurdivisonPageEndPoints.ourDivisions();
  const {heroSectionData , data} = ourDivisionsData;
console.log(ourDivisionsData,"ourDivisionsData");


  return (
    <div>
    <CommonHeroSection heroSectionData={heroSectionData} />
    <OurDivison data={data}/>
    </div>
  )
}
