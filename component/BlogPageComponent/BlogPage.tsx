"use client";
import React, { useEffect, useState } from "react";
import FeaturedBlogCard from "./FeaturedBlogCard";
import BlogCard from "./BlogCard";
import BlogFilterBar from "./BlogFilterBar";
import { useDebounce } from "../../hooks/useDebounce";
import { BiCollapse } from "react-icons/bi";

interface BlogListProps {
  data: any[];
  meta: any;
  categorey: any[];
}

const BlogListPage = ({ data, meta, categorey }: BlogListProps) => {
  const PER_PAGE = meta?.per_page || 9;
  const base = process.env.NEXT_PUBLIC_API_URL;
  const [blogs, setBlogs] = useState<any[]>(data);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [allLoaded, setAllLoaded] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const debouncedSearch = useDebounce(searchTerm, 500);

  const total = meta?.total ?? 0;

  const AllCategories = [
    { name: "All", slug: "All", id: "All" },
    ...categorey?.map((item: any) => ({
      name: item.name,
      slug: item.slug,
      id: item.id,
    })),
  ];

  const featuredPost = blogs?.find((post) => post.featured === 1);

  //  Core Fetch Function
  const fetchBlogs = async ({
    page = 1,
    append = false,
  }: {
    page?: number;
    append?: boolean;
  }) => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.append("page", String(page));
      params.append("pageSize", String(PER_PAGE));
      if (debouncedSearch) {
        params.append("search", debouncedSearch);
      }
      if (selectedCategory !== "All") {
        const categorySlug = AllCategories.find(
          (c) => c.slug === selectedCategory,
        )?.slug;
        if (categorySlug) {
          params.append("category", String(categorySlug));
        }
      }
      // console.log(
      //   "SearchQuery:",
      //   `${base}/api/v1/posts/filters?${params.toString()}`
      // );

      //  Always build safe URL
      // const url = `${base?.replace(/\/$/, "")}/posts/filters?${params.toString()}`;
      const url = `${base}posts/filters?${params.toString()}`;
      // const res = await fetch(`${base}posts/filters?${params.toString()}`);
      const res = await fetch(url, {
        method: "GET",
        headers: {
          "x-api-key": process.env.NEXT_PUBLIC_API_KEY!,
        },
        cache: "no-store",
      });
      if (!res.ok) throw new Error("Failed to fetch blogs");
      const json = await res.json();
      const newBlogs = json?.data ?? [];
      setBlogs((prev) => (append ? [...prev, ...newBlogs] : newBlogs));
      setCurrentPage(page);
      // if (page > json?.meta?.pagination?.pageCount) {
      if (page >= json?.meta?.last_page) {
        setAllLoaded(true);
      } else {
        setAllLoaded(false);
      }
    } catch (err) {
      console.error("Blog fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  //  Search / Category Change
  useEffect(() => {
    fetchBlogs({ page: 1, append: false });
  }, [debouncedSearch, selectedCategory]);

  //  Load More
  const handleShowMore = () => {
    if (loading || allLoaded) return;
    fetchBlogs({ page: currentPage + 1, append: true });
  };

  const selectedCategoryName =
    selectedCategory === "All"
      ? "Latest Articles"
      : (AllCategories.find(
          (cat) => cat.id === selectedCategory || cat.slug === selectedCategory,
        )?.name ?? "Articles");

  return (
    <div className="min-h-screen  w-full">
      <div className=" mx-auto w-full  ">
        <BlogFilterBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          categories={AllCategories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

        {featuredPost && selectedCategory === "All" && !searchTerm && (
          <FeaturedBlogCard post={featuredPost} />
        )}

        <div className="mb-16">
          <h2 className="text-[2rem] sm:text-[2.25rem] font-bold mb-6">
            {selectedCategory !== "All"
              ? `${selectedCategoryName} Articles`
              : "Latest Articles"}
          </h2>

          {blogs?.length === 0 ? (
            <p className="text-center py-16 text-xl font-bold">
              No articles found.
            </p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 bot">
              {blogs?.map((post, index) => (
                <BlogCard key={index} post={post} />
              ))}
            </div>
          )}
        </div>

        {!allLoaded && (
          <div className="flex justify-center mt-8">
            <button
              onClick={handleShowMore}
              disabled={loading}
              className="px-8 py-3 rounded-lg text-white text-xl font-bold bg-secondary"
            >
              {loading ? "Loading..." : "Show More"}
            </button>
          </div>
        )}

        <p className="text-right text-base font-semibold text-textPrimary  flex justify-end items-center gap-2">
          <BiCollapse size={28} className=" text-secondary" />
          Showing 1–{blogs?.length} of {total} Blogs
        </p>
      </div>
    </div>
  );
};

export default BlogListPage;
