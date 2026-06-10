import { BlogEndPoints } from "../../lib/service/BlogsEndPoints";
import CommonHeroSection from "../../component/common/CommonHeroSection";
import BlogDetailPage from "../../component/BlogPageComponent/BlogDetail";
import { getAbsoluteUrl } from "@/utills/seo/getAbsoluteUrl";
import { buildMetadata } from "@/utills/seo/generateMetaData";
import { cache } from "react";
// import BlogPostSchema from "@/component/schemas/BlogPostSchema";

interface BlogDetailPageProps {
  params: Promise<{ blogDetails: string }>;
}

type BlogSlugItem = {
  slug?: string;
};

type BlogSummary = {
  id?: number | string;
  [key: string]: unknown;
};

const getBlogBySlug = cache((slug: string) => BlogEndPoints.getBlogBySlug(slug));

export async function generateStaticParams() {
  try {
    const response = await BlogEndPoints.getAllBlogSlug();
    const slugs: BlogSlugItem[] = Array.isArray(response?.data)
      ? response.data
      : [];

    return slugs
      .map((blog) => blog.slug)
      .filter((slug: string | undefined): slug is string => Boolean(slug))
      .map((blogDetails: string) => ({ blogDetails }));
  } catch (error) {
    console.error("Failed to fetch blog slugs for static params:", error);
    return [];
  }
}

export async function generateMetadata({ params }: BlogDetailPageProps) {
  const { blogDetails } = await params;
  const pathname = `/${blogDetails}`;
  const pageUrl = getAbsoluteUrl(pathname);

  try {
    const data = await getBlogBySlug(blogDetails);
    const data1 = data?.seo_meta;
    const data2 = data?.data;

    return buildMetadata({
      pathname,
      seo: {
        metaTitle: data1?.seo_title || data2?.name || "Blog",
        metaDescription: data1?.seo_description || data2?.description,
        canonical: pageUrl,
        ogImage: data2?.image || "/images/dpharma-logo.svg",
      },
    });
  } catch (error) {
    console.error(
      `Failed to generate blog metadata for slug "${blogDetails}":`,
      error,
    );

    return buildMetadata({
      pathname,
      seo: {
        metaTitle: blogDetails.replace(/-/g, " "),
        canonical: pageUrl,
        ogImage: "/images/dpharma-logo.svg",
      },
    });
  }
}

export default async function BlogDetails({ params }: BlogDetailPageProps) {
  const { blogDetails } = await params;
  const BlogDetail = await getBlogBySlug(blogDetails);
  const Blogdata = BlogDetail?.data;

  const cate1 = Blogdata?.category_id;
  const [relatedBOneResult, recentBlogResult] = await Promise.allSettled([
    cate1
      ? BlogEndPoints.getBlogsByCategory(cate1)
      : Promise.resolve({ data: [] }),
    BlogEndPoints.getRecentBlog(),
  ]);

  if (relatedBOneResult.status === "rejected") {
    console.error(
      `Failed to load related blogs for category "${cate1}":`,
      relatedBOneResult.reason,
    );
  }

  if (recentBlogResult.status === "rejected") {
    console.error("Failed to load recent blogs:", recentBlogResult.reason);
  }

  const relatedBOne =
    relatedBOneResult.status === "fulfilled" ? relatedBOneResult.value : null;
  const RecentBlog =
    recentBlogResult.status === "fulfilled" ? recentBlogResult.value : null;

  const mergedBlogs: BlogSummary[] = Array.isArray(relatedBOne?.data)
    ? relatedBOne.data
    : [];

  const uniqueBlogs = Array.from(
    new Map(mergedBlogs.map((blog) => [blog.id, blog])).values(),
  );

  const filteredBlogs = uniqueBlogs.filter((blog) => blog.id !== Blogdata?.id);

  const relatedBlogs = filteredBlogs.slice(0, 3);
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
