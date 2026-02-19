import ClientProductDetails from "../../../component/productPageComonent/ProductDetails";
// import type { Metadata } from "next";

import CommonHeroSection from "../../../component/common/CommonHeroSection";
// import BreadcrumbSchemaOnly from "@/components/breadcrumbsScema/breadcrumbsSchema";

interface ProductBySlugProps {
  params: Promise<{ slug: string }>;
}

async function getProductBySlug(slug: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_PRODUCTS_API_URL}/products?slug=${slug}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        next: { revalidate: 60 },
      },
    );
    if (!res.ok) throw new Error("Failed to fetch productDetails");
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("API fetch error:", err);
    throw err;
  }
}

const baseUrl = process.env.NEXT_PUBLIC_PRODUCT_URL;

// export async function generateMetadata({
//   params,
// }: ProductBySlugProps): Promise<Metadata> {
//   const { slug } = await params;

//   try {
//     const res = await fetch(
//       `${process.env.NEXT_PUBLIC_PRODUCTS_API_URL}/products?slug=${slug}`,
//       {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         cache: "no-store",
//       },
//     );

//     if (!res.ok) {
//       throw new Error(`Failed to fetch metadata for slug: ${slug}`);
//     }

//     const result = await res.json();

//     const logo = await fetch(
//       `${process.env.NEXT_PUBLIC_IMAGE_URL}/api/global-setting?populate=logo`,
//     );

//     const logoData = await logo.json();

//     const meta = result?.products?.[0]?.seo;

//     if (!meta) {
//       return {
//         title: "product Not Found",
//         description: "The requested product could not be found.",
//       };
//     }

//     const dashboardCanonical = result?.products?.[0]?.canonicalUrl;
//     const canonical = `/product/${slug}`;

//     const canonicalUrl = dashboardCanonical
//       ? dashboardCanonical
//       : `${process.env.NEXT_PUBLIC_CLIENT_URL}${canonical}`;

//     const image = result?.products?.[0]?.images?.[0]?.url;
//     // console.log("image", image);
//     const appleIconUrl = `${baseUrl}/icons/apple-touch-icon.png`;

//     return meta
//       ? {
//           title: meta?.metaTitle,
//           description: meta?.metaDescription || meta?.metaKeywords,

//           // icons: baseUrl + `/${image}`,
//           icons: {
//             icon: baseUrl + `/${image}`, // regular favicon
//             apple: appleIconUrl, // apple-touch-icon
//             shortcut: appleIconUrl, // optional
//             other: [
//               {
//                 rel: "apple-touch-icon-precomposed",
//                 url: appleIconUrl,
//               },
//             ],
//           },

//           twitter: {
//             card: "summary_large_image",
//             description: meta?.metaDescription || meta?.metaKeywords,
//             title: meta?.metaTitle,
//             images: [
//               {
//                 url: baseUrl + `/${image}`,

//                 width: 1200,
//                 height: 630,
//               },
//             ],
//           },

//           alternates: {
//             canonical: canonicalUrl,
//           },

//           openGraph: {
//             title: meta?.metaTitle,
//             description: meta?.metaDescription || meta?.metaKeywords,
//             type: "website",
//             images: [
//               {
//                 url: baseUrl + `/${image}`,
//                 width: 800,
//                 height: 600,
//               },
//             ],

//             locale: "en-IN",
//           },
//         }
//       : {};
//   } catch (error) {
//     console.error("Error generating metadata:", error);
//     return {
//       title: "Error",
//       description: "Unable to load metadata at this time.",
//     };
//   }
// }

export default async function ProductDetails({ params }: ProductBySlugProps) {
  const { slug } = await params;
  const singleProduct = await getProductBySlug(slug);

  const header = singleProduct?.products[0]?.details;

  const heroSectionData = {
    badgeText: "Breadcrumbs",
    title: {
      normal: singleProduct?.products?.[0]?.details,
    },
    // description:
    //   "Empower your pharma business with precise financial analytics. Calculate gross margins and net profits instantly to make informed pricing decisions.",
    buttonText: "Scroll to use",
    background: {
      imageAlt: "Modern laboratory background",
      imageSrc:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDlhCxl2Vxag4giglyO3LRkbo1CCD0M2C2xp8aInGg_GtvGQQTne3cPlp4jncbvfjJQ_Xgtjh22jGzKNrHyiH5djBaJD-qol6WT4TXPCHPkfDmXqGNEJBdTSiFfdhxFLO6gCo8h3f1FobHNsLIP1KgizrslMR0Q0tZHzpU0md3rnJ0Stq3MCkjS76TSVHCBBzYISDJrEU5zOL1EJLtiO4teKHAtUwhRSMYV60XhybXAJZm5Moq-MFo9dEJJ6Zrmo-UWJ8sF_9x5U_uD",
    },
  };

  return (
    <>
      {/* <BreadcrumbSchemaOnly
        baseUrl={process.env.NEXT_PUBLIC_CLIENT_URL}
        siteName="Eridanus HealthCare"
        title={header}
      /> */}

      {/* <div className=" bg-white">
        <div className="lg:max-w-[81vw] max-w-[90vw] w-full h-full mx-auto relative sm:mb-0 ">
          <Banner pageName={header} color="text-white" />
        </div>
      </div> */}
      <CommonHeroSection heroSectionData={heroSectionData} />

      <div className=" h-full w-full flex items-center justify-center   pt-[3rem] pb-[5rem]  flex-col ">
        {/* <div className="text-4xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent"> */}
        {/* </div> */}
        <ClientProductDetails singleProduct={singleProduct} />
      </div>
    </>
  );
}
