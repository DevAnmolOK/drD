import CommonHeroSection from "../../component/common/CommonHeroSection";
import BlogListPage from "../../component/BlogPageComponent/BlogPage";
import { BlogEndPoints } from "../../lib/service/BlogsEndPoints";
import { headers } from "next/headers";
import { getAbsoluteUrl } from "@/utills/seo/getAbsoluteUrl";
import { buildMetadata } from "@/utills/seo/generateMetaData";

export async function generateMetadata() {
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") || "/about-us";
  const pageUrl = getAbsoluteUrl(pathname);
  const data = await BlogEndPoints.blogList();
  const data1 = data?.seo_meta;
  const data2 = data?.heroSectionData;
  return buildMetadata({
    pathname: pathname,
    seo: {
      metaTitle: data1?.seo_title || "Manufacturing",
      metaDescription: data1?.seo_description,
      canonical: pageUrl,
      ogImage: data2?.background?.imageSrc || "/images/dpharma-logo.svg",
    },
  });
}

export default async function Blogs() {
  const AllBlogs = await BlogEndPoints.blogList();
  const BlogsData = AllBlogs?.data;
  const GetCategorey = await BlogEndPoints.getBlogCategories();
  const { heroSectionData } = AllBlogs || {};

  return (
    <>
      <CommonHeroSection heroSectionData={heroSectionData} />
      <div className="w-full  flex item- justify-center py-12 ">
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
