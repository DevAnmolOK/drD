import { BlogEndPoints } from "../../lib/service/BlogsEndPoints";
import CommonHeroSection from "../../component/common/CommonHeroSection";
import BlogDetailPage from "../../component/BlogPageComponent/BlogDetail";
// import BlogPostSchema from "@/component/schemas/BlogPostSchema";


interface BlogDetailPageProps {
  params: Promise<{ blogDetails: string }>;
}

import { headers } from "next/headers";
import { getAbsoluteUrl } from "@/utills/seo/getAbsoluteUrl";
import { buildMetadata } from "@/utills/seo/generateMetaData";

export async function generateMetadata({ params }: BlogDetailPageProps) {
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") || "/about-us";
  const pageUrl = getAbsoluteUrl(pathname);
  const { blogDetails } = await params;
  const data = await BlogEndPoints.getBlogBySlug(blogDetails);
  const data1 = data?.seo_meta;
  const data2 = data?.data;
  return buildMetadata({
    pathname: pathname,
    seo: {
      metaTitle: data1?.seo_title || "Manufacturing",
      metaDescription: data1?.seo_description,
      canonical: pageUrl,
      ogImage: data2?.image || "/images/dpharma-logo.svg",
    },
  });
}

export default async function BlogDetails({ params }: BlogDetailPageProps) {
  const { blogDetails } = await params;
  const BlogDetail = await BlogEndPoints.getBlogBySlug(blogDetails);
  const Blogdata = BlogDetail?.data;

  const cate1 = Blogdata?.category_id;
  const relatedBOne = await BlogEndPoints.getSearchedBlog(
    `/filters?categories=${cate1}`,
  );

  const mergedBlogs = [
    ...(relatedBOne?.data || []),
  ];

  const uniqueBlogs = Array.from(
    new Map(mergedBlogs.map((blog: any) => [blog.id, blog])).values(),
  );

  const filteredBlogs = uniqueBlogs.filter(
    (blog: any) => blog.id !== Blogdata?.id,
  );

  const relatedBlogs = filteredBlogs.slice(0, 3);
  const RecentBlog = await BlogEndPoints?.getRecentBlog();
  const recentBlog = RecentBlog?.data.slice(0, 3);

  const heroSectionData = {
    badgeText: "Breadcrumbs",
    title: {
      normal: Blogdata.name,
    },
    description: Blogdata.description,
    buttonText: "Scroll to use",
    background: {
      imageAlt: "Modern laboratory background",
      imageSrc:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDlhCxl2Vxag4giglyO3LRkbo1CCD0M2C2xp8aInGg_GtvGQQTne3cPlp4jncbvfjJQ_Xgtjh22jGzKNrHyiH5djBaJD-qol6WT4TXPCHPkfDmXqGNEJBdTSiFfdhxFLO6gCo8h3f1FobHNsLIP1KgizrslMR0Q0tZHzpU0md3rnJ0Stq3MCkjS76TSVHCBBzYISDJrEU5zOL1EJLtiO4teKHAtUwhRSMYV60XhybXAJZm5Moq-MFo9dEJJ6Zrmo-UWJ8sF_9x5U_uD",
    },
  };

  return (
    <>
      {/* <BlogPostSchema
        title={Blogdata?.name}
        slug={Blogdata?.slug}
        description={Blogdata?.description}
        image={{
          url: Blogdata?.image,
          caption: Blogdata?.name,
        }}
        publishedAt={Blogdata?.created_at}
        updatedAt={Blogdata?.updated_at}
        author={{
          name: Blogdata?.authorDetails?.name,
          slug: Blogdata?.authorUrl,
          image: Blogdata?.authorDetails?.avatar,
        }}
        category={{
          name: Blogdata?.categories[0]?.name,
          slug: Blogdata?.categories[0]?.slug,
        }}
      /> */}

      {/* <PageHero
        heading="Our Blog"
        subHeading={`${Blogdata?.name} ` || "Insights & Expert Perspectives"}
        subHeadingCss="text-[2rem] sm:text-[2.375rem] align-middle leading-[1.2778]  text-white font-bold tracking-[-2%] mt-[2.188rem] mb-[1.563rem] text-center"
        description={`${BlogDetail?.seo_meta?.seo_description} || "Explore the latest updates, in-depth guides, and industry expertise on web design, healthcare technology, SEO, and digital marketing"`}
      /> */}

      <CommonHeroSection heroSectionData={heroSectionData} />

      <div>
        <BlogDetailPage
          data={Blogdata}
          recent={recentBlog}
          related={relatedBlogs}
        />
      </div>
    </>
  );
}
