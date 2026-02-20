// import dynamic from "next/dynamic";
// import { createMetaData } from "@/utils/fetchData";
// import type { Metadata } from "next";
// import Banner from "@/components/HeroBanner";

import CommonHeroSection from "../../../component/common/CommonHeroSection";
import ProductcategoryPage from "../../../component/productPageComonent/ProductcategoryPage";
import { QuickLinksPageEndPoints } from "../../../lib/service/QuickLinks";
// import BreadcrumbSchemaOnly from "@/components/breadcrumbsScema/breadcrumbsSchema";

// export async function generateMetadata(): Promise<Metadata> {
//   try {
//     const data = await createMetaData(
//       "/product/upcoming-products",
//       "up-comming-product-page",
//     );

//     return { ...data };
//   } catch (error) {
//     console.error("Error generating metadata:", error);
//     return {};
//   }
// }

interface UpcommingProductsProps {
  params: Promise<{ typeId: string }>;
}

export default async function UpcommingProducts({
  params,
}: UpcommingProductsProps) {
  try {
    let typeId = "";
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_PRODUCTS_API_URL}/products?upcoming=true`,
      {
        next: { revalidate: 60 },
        headers: {
          "Content-Type": "application/json",
          "x-secret-key": `${process.env.NEXT_PUBLIC_SECRET_API_KEY}`,
        },
      },
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch products. Status: ${res.status}`);
    }

    const products = await res.json();
    // console.log("products", products);

    const transformProducts = products?.products?.map((data: any) => ({
      division: data?.division_id?.[0]?.name,
      name: data?.name,
      composition: data?.details,
      packing: data?.packingVarient?.[0]?.packing,
      packingType: data?.packingVarient?.[0].packing_type?.[0]?.name,
      slug: data?.slug,
      type: data?.type_id?.[0]?.name,
      upcoming: data?.upcoming,
      mrp: Number(data.packingVarient?.[0]?.price?.["$numberDecimal"]) || 0,
      image: data?.images?.[0]?.url,
      moq: data?.min_order_qty,
    }));

    // fallback if no product
    // if (
    //   !Array.isArray(products?.products) ||
    //   products?.products?.length === 0
    // ) {
    //   throw new Error("No products found");
    // }

    if (
      !Array.isArray(products?.products) ||
      products?.products?.length === 0
    ) {
      //   throw new Error("No products found");
      <div className="text-center py-10 text-red-600 text-lg font-medium">
        No products found.
      </div>;
    }

    // console.log("Transformed Products:", products);
    const prdtkey = "upcoming";
    // const data = await QuickLinksPageEndPoints.getCommingSoonBanner();

    const heroSectionData = {
      badgeText: "Breadcrumbs",
      title: {
        normal: "Blogs",
      },
      description:
        "Empower your pharma business with precise financial analytics. Calculate gross margins and net profits instantly to make informed pricing decisions.",
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
          title="Upcoming Products"
        /> */}
        <CommonHeroSection heroSectionData={heroSectionData} />
        <div className="w-full h-full bg-white text-black flex items-center justify-center">
          <div className="wrapper w-full h-full mx-auto relative sm:mb-0 mb-[1.5rem]">
            <div className="pt-[0rem] pb-[2.5rem]">
              <div className="">
                <ProductcategoryPage product={products} filterKey={prdtkey} />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  } catch (error) {
    console.error("Products page failed:", error);
    throw error;
  }
}
