import type { Metadata } from "next";

type SeoInput = {
  metaTitle: string;
  metaDescription?: string;
  canonical?: string;
  ogImage?: string;
  noIndex?: boolean; // optional future use
};

type BuildMetadataProps = {
  seo: SeoInput;
  pathname: string;
  siteName?: string;
};

export function buildMetadata({
  seo,
  pathname,
  siteName = "drdpharma.in",
}: BuildMetadataProps): Metadata {
  let composeTitle = `${seo?.metaTitle} | Dr D Pharma`;
  let title = composeTitle;

  let desMessge = `Want to know more about ${title}, visit Dr D pharma . Request a Quote!`;
  let description = seo.metaDescription || desMessge;

  const metadataBase = new URL(
    process.env.NEXT_PUBLIC_META_URL || "https://www.drdpharma.in",
  );
  // const baseUrl = process.env.NEXT_PUBLIC_CLIENT_URL || "https://logicsmd.com";

  // const canonicalUrl = seo.canonical || `${baseUrl}${pathname}`;

  // const ogImage = seo.ogImage || `${baseUrl}/og-default.jpg`;

  return {
    metadataBase,
    title,
    description,

    // robots: {
    //   index: !seo.noIndex,
    //   follow: !seo.noIndex,

    //   googleBot: {
    //     index: !seo.noIndex,
    //     follow: !seo.noIndex,
    //     "max-snippet": -1,
    //     "max-video-preview": -1,
    //     "max-image-preview": "large",
    //   },
    // },

    alternates: {
      canonical: seo.canonical || pathname,
    },

    openGraph: {
      title,
      description,
      url: seo.canonical || pathname,
      siteName,
      type: "website",
      locale: "en_IN",
      images: [
        {
          url: seo.ogImage || "/og-default.jpg",
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [seo.ogImage || "/og-default.jpg"],
    },
  };
}
