import React from "react";
import CommonHeroSection from "../../component/common/CommonHeroSection";
import { CommonEndPoints } from "../../lib/service/CommonEndPoints";

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
