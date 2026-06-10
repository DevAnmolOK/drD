import { apiFetch } from "../api/fetcher";

const BLOG_LIST_REVALIDATE = 300;
const BLOG_DETAIL_REVALIDATE = 900;

export const BlogEndPoints = {
  blogList: () => {
    return apiFetch({
      endpoint: `posts`,
      cache: "dynamic",
      customRevalidate: BLOG_LIST_REVALIDATE,
      tags: ["blogs"],
    });
  },

  getBlogBySlug: (slug: string) => {
    return apiFetch({
      endpoint: `posts/${slug}`,
      throw404: true,
      cache: "dynamic",
      customRevalidate: BLOG_DETAIL_REVALIDATE,
      tags: ["blogs", `blog:${slug}`],
    });
  },

  getSearchedBlog: (query: string) => {
    const normalizedQuery = query.replace(/^\//, "");
    const endpoint = normalizedQuery.startsWith("filters?")
      ? `posts/${normalizedQuery}`
      : `posts?${normalizedQuery.replace(/^\?/, "")}`;

    return apiFetch({
      endpoint,
      cache: "dynamic",
      customRevalidate: BLOG_LIST_REVALIDATE,
      tags: ["blogs"],
    });
  },

  getBlogsByCategory: (categoryId: string | number) => {
    return apiFetch({
      endpoint: `posts/filters?categories=${categoryId}`,
      cache: "dynamic",
      customRevalidate: BLOG_LIST_REVALIDATE,
      tags: ["blogs", `blog-category:${categoryId}`],
    });
  },

  getRecentBlog: () => {
    return apiFetch({
      endpoint: "recent-posts",
      cache: "dynamic",
      customRevalidate: BLOG_LIST_REVALIDATE,
      tags: ["blogs", "recent-blogs"],
    });
  },

  getBlogCategories: () => {
    return apiFetch({
      endpoint: "categories",
      cache: "static",
      customRevalidate: BLOG_DETAIL_REVALIDATE,
      tags: ["blog-categories"],
    });
  },

  getAllBlogSlug: () => {
    return apiFetch({
      endpoint: "post-slugs",
      cache: "static",
      customRevalidate: BLOG_DETAIL_REVALIDATE,
      tags: ["blog-slugs"],
    });
  },
};
