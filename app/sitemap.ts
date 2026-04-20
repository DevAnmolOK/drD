import type { MetadataRoute } from "next";

import { BlogEndPoints } from "@/lib/service/BlogsEndPoints";
import { safeFetch } from "@/utills/seo/helper";
import fetchProductSlug from "@/utills/seo/fetchProductSlug";
import { Boogaloo } from "next/font/google";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [productSlug, blogs] = await Promise.all([
    safeFetch(fetchProductSlug),
    safeFetch(BlogEndPoints.getAllBlogSlug),
  ]);
  
  const blogEndpoints = blogs.status ? blogs.data : []

  const baseUrl = process.env.NEXT_PUBLIC_API_URL_IMAGE;

  return [
    { url: `${baseUrl}/`, lastModified: new Date(), priority: 1.0 },
    {
      url: `${baseUrl}/about-us`,
      lastModified: new Date(),
      priority: 0.9,
    },
    {
      url: `${baseUrl}/manufacturing`,
      lastModified: new Date(),
      priority: 0.8,
    },
    {
      url: `${baseUrl}/pharma-franchise`,
      lastModified: new Date(),
      priority: 0.9,
    },
    {
      url: `${baseUrl}/our-divisions`,
      lastModified: new Date(),
      priority: 0.9,
    },
    {
      url: `${baseUrl}/gallery`,
      lastModified: new Date(),
      priority: 0.9,
    },
    {
      url: `${baseUrl}/events`,
      lastModified: new Date(),
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blogs`,
      lastModified: new Date(),
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact-us`,
      lastModified: new Date(),
      priority: 0.8,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date(),
      priority: 0.7,
    },
    {
      url: `${baseUrl}/terms-and-conditions`,
      lastModified: new Date(),
      priority: 0.7,
    },
    {
      url: `${baseUrl}/certificates`,
      lastModified: new Date(),
      priority: 0.7,
    },
    {
      url: `${baseUrl}/offers`,
      lastModified: new Date(),
      priority: 0.7,
    },
    {
      url: `${baseUrl}/promotions`,
      lastModified: new Date(),
      priority: 0.7,
    },
    {
      url: `${baseUrl}/product`,
      lastModified: new Date(),
      priority: 0.7,
    },
    {
      url: `${baseUrl}/product/new-launch-products`,
      lastModified: new Date(),
      priority: 0.7,
    },
    {
      url: `${baseUrl}/product/upcoming-products`,
      lastModified: new Date(),
      priority: 0.7,
    },

    // Dynamic: blogs
    ...blogEndpoints?.map((blogs: any) => ({
      url: `${baseUrl}/${blogs?.slug}`,
      lastModified: new Date(blogs.updated_at ?? new Date()),
    })),

    //Dynamic: product
    ...productSlug?.map((slug: any) => ({
      url: `${baseUrl}/product/${slug.slug}`,
      lastModified: new Date(slug.updated_at ?? new Date()),
    })),
  ];
}
