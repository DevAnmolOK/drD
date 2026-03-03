import CommonHeroSection from "../../component/common/CommonHeroSection";
import BlogListPage from "../../component/BlogPageComponent/BlogPage";
import { BlogEndPoints } from "../../lib/service/BlogsEndPoints";

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
