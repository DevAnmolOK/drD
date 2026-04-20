import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Existing Googlebot rule
      {
        userAgent: "Googlebot",
        allow: ["/"],
        disallow: ["/private/"],
      },

      // Existing Applebot + Bingbot rule
      {
        userAgent: ["Applebot", "Bingbot"],
        disallow: ["/"],
      },

      //  New: User-agent: *
      {
        userAgent: "*",
        disallow: [
          "/admin/",
          "/login",
          "/register",
          "/password/",
          "/reset-password",
          "/email/",
          "/verify/",
          "/api/",
          "/storage/",
          "/vendor/",
          "/bootstrap/",
          "/node_modules/",
          "/resources/",
          "/.env",
          "/.git",
          "/composer.json",
          "/composer.lock",
          "/artisan",
          "/server.php",
        ],
      },
    ],

    sitemap: "https://www.drdpharma.in/sitemap.xml",
  };
}
