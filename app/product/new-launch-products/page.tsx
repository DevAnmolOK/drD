import dynamic from "next/dynamic";
// import { createMetaData } from "@/utils/fetchData";
// import type { Metadata } from "next";
// import Banner from "@/components/HeroBanner";
// import BreadcrumbSchemaOnly from "@/components/breadcrumbsScema/breadcrumbsSchema";

import CommonHeroSection from "../../../component/common/CommonHeroSection";
import ProductcategoryPage from "../../../component/productPageComonent/ProductcategoryPage";

import { QuickLinksPageEndPoints } from "../../../lib/service/QuickLinks";

// const ComponentsProduct = dynamic(
//   () => import("../../../components/productPageComponent/Product")
// );

// const ComponentsProduct = dynamic(
//   () => import("../../../../components/productPageComponent/Product")
// );

// export async function generateMetadata(): Promise<Metadata> {
//   try {
//     const data = await createMetaData(
//       "/product/new-launch-products",
//       "newly-launch-product-page",
//     );

//     return { ...data };
//   } catch (error) {
//     console.error("Error generating metadata:", error);
//     return {};
//   }
// }

interface NewLaunchProductsProps {
  params: Promise<{ typeId: string }>;
}

export default async function NewLaunchProducts({
  params,
}: NewLaunchProductsProps) {
  try {
    let typeId = "";
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_PRODUCTS_API_URL}/products?new_launched=true`,
      {
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
    const transformProducts = products?.products?.map((data: any) => {
      const images = data?.images || [];
      const imgImages = images.filter((img: any) => img.type === "IMG");
      return {
        division: data?.division_id?.[0]?.name,
        name: data?.name,
        composition: data?.details,
        packing: data?.packingVarient?.[0]?.packing,
        packingType: data?.packingVarient?.[0]?.packing_type?.[0]?.name,
        slug: data?.slug,
        type: data?.type_id?.[0]?.name,
        upcoming: data?.upcoming,
        mrp: Number(data?.packingVarient?.[0]?.price?.["$numberDecimal"]) || 0,

        images: imgImages,
        image: imgImages?.[0]?.url || null,
        moq: data?.min_order_qty,
      };
    });

    if (
      !Array.isArray(products?.products) ||
      products?.products?.length === 0
    ) {
      //   throw new Error("No products found");
      <div className="text-center py-10 text-red-600 text-lg font-medium">
        No products found.
      </div>;
    }

    const prdtkey = "new_launched";
    const data = await QuickLinksPageEndPoints.getNewLaunchBanner();

    return (
      <>
        <CommonHeroSection heroSectionData={data?.heroSectionData} />
        <div className="w-full h-full bg-white text-black flex items-center justify-center ">
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
