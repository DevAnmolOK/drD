import React from "react";
import CommonHeroSection from "../../component/common/CommonHeroSection";
import { CommonEndPoints } from "../../lib/service/CommonEndPoints";
import { headers } from "next/headers";
import { getAbsoluteUrl } from "@/utills/seo/getAbsoluteUrl";
import { buildMetadata } from "@/utills/seo/generateMetaData";

export async function generateMetadata() {
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") || "/privacy-policy";
  const pageUrl = getAbsoluteUrl(pathname);
  const data = await CommonEndPoints.privacyPolicy();
  const data1 = data?.seo_meta;
  const data2 = data?.heroSectionData;
  return buildMetadata({
    pathname: pathname,
    seo: {
      metaTitle: data1?.seo_title || "About-us",
      metaDescription: data1?.seo_description,
      canonical: pageUrl,
      ogImage:
        data2?.background?.imageSrc ||
        "/images/dpharma-logo.svg",
    },
  });
}

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
