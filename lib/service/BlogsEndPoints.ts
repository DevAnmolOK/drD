import { apiFetch, apiPost } from "../api/fetcher";

export const BlogEndPoints = {
  blogList: (page?: number) => {
    return apiFetch({
      endpoint: `posts`,
      cache: "no-store",
    });
  },

  // /api/v1/posts/{slug}
  // blogDetails: (slug: string) => {
  //   return apiFetch({
  //     endpoint: `posts/${slug}`,
  //     cache: "no-store",
  //   });
  // },

  getBlogBySlug: (slug: string) => {
    return apiFetch({
      endpoint: `posts/${slug}`,
      throw404: true,
      cache: "no-store",
    });
  },

  getSearchedBlog: (query: string) => {
    return apiFetch({
      endpoint: `posts?${query}`,
      cache: "no-store",
    });
  },

  getRecentBlog: () => {
    return apiFetch({
      endpoint: "recent-posts",
      cache: "no-store",
    });
  },

  getBlogCategories: () => {
    return apiFetch({
      endpoint: "categories",
      cache: "no-store",
    });
  },
};
