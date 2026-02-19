// import PageHero from "@/component/commonComponent/PageHero";
import CommonHeroSection from "../../component/common/CommonHeroSection";
import BlogListPage from "../../component/BlogPageComponent/BlogPage";
// import { BlogData } from "@/lib/api/endpoints";
import { BlogEndPoints } from "../../lib/service/BlogsEndPoints";
// import { getAbsoluteUrl } from "@/utils/getAbsoluteUrl";
// import { buildMetadata } from "@/utils/generateMetaData";
// import { headers } from "next/headers";
// import { cache } from "react";

// const geBlogPageData = cache(async () => {
//   return BlogData.getAllBlogs();
// });

// export async function generateMetadata() {
//   const headersList = await headers();
//   const pathname = headersList.get("x-pathname") || `/category/our-blog`;
//   const pageUrl = getAbsoluteUrl(pathname);
//   const pageData = await geBlogPageData();
//   const data = pageData?.data?.seo_meta;
//   return buildMetadata({
//     pathname: pathname,
//     seo: {
//       metaTitle:
//         data?.seo_title ||
//         " Medical Website Design Company | Healthcare Website Design​",
//       metaDescription:
//         data?.seo_description ||
//         "Logics MD is one of the Best Medical & Healthcare Website Design Company in the United States. Contact us for Medical Practice Friendly Website Design.",
//       canonical: pageUrl,
//       ogImage: "/LogicsMd.svg",
//     },
//   });
// }

export default async function Blogs() {
  const AllBlogs = await BlogEndPoints.blogList();
  const BlogsData = AllBlogs?.data;
  const GetCategorey = await BlogEndPoints.getBlogCategories();
  const { heroSectionData } = AllBlogs || {};
  console.log("HeroSectionData:", heroSectionData);
  // const heroSectionData = {
  //   badgeText: "Breadcrumbs",
  //   title: {
  //     normal: "Blogs",
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
  return (
    <>
      <CommonHeroSection heroSectionData={heroSectionData} />
      <div className="w-full  flex item- justify-center py-[3rem] ">
        <div className="wrapper mx-auto w-full ">
          <BlogListPage
            data={AllBlogs?.data}
            meta={AllBlogs?.meta}
            categorey={GetCategorey?.data}
          />
        </div>
      </div>
    </>
  );
}
