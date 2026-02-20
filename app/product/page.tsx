import dynamic from "next/dynamic";
// import type { Metadata } from "next";
// import { createMetaData } from "@/utils/fetchData";
// import Banner from "@/components/HeroBanner";
// import BreadcrumbSchemaOnly from "@/components/breadcrumbsScema/breadcrumbsSchema";

const ComponentsProduct = dynamic(
  () => import("../../component/productPageComonent/Products"),
);
import CommonHeroSection from "../../component/common/CommonHeroSection";
import { ProductApiEndPoints } from "@/lib/service/ProdcutsApiEndPoints";

// export async function generateMetadata(): Promise<Metadata> {
//   try {
//     const data = await createMetaData("/product", "products-page");

//     return { ...data };
//   } catch (error) {
//     console.error("Error generating metadata:", error);
//     return {};
//   }
// }

interface ProductsProps {
  params: Promise<{ typeId: string }>;
}

export default async function Products({ params }: ProductsProps) {
  // const heroSectionData = {
  //   badgeText: "Breadcrumbs",
  //   title: {
  //     normal: "Blogs",
  //   },
  //   description:
  //     "Empower your pharma business with precise financial analytics. Calculate gross margins and net profits instantly to make informed pricing decisions.",
  //   buttonText: "Scroll to use",
  //   background: {
  //     imageAlt: "Modern laboratory background",
  //     imageSrc:
  //       "https://lh3.googleusercontent.com/aida-public/AB6AXuDlhCxl2Vxag4giglyO3LRkbo1CCD0M2C2xp8aInGg_GtvGQQTne3cPlp4jncbvfjJQ_Xgtjh22jGzKNrHyiH5djBaJD-qol6WT4TXPCHPkfDmXqGNEJBdTSiFfdhxFLO6gCo8h3f1FobHNsLIP1KgizrslMR0Q0tZHzpU0md3rnJ0Stq3MCkjS76TSVHCBBzYISDJrEU5zOL1EJLtiO4teKHAtUwhRSMYV60XhybXAJZm5Moq-MFo9dEJJ6Zrmo-UWJ8sF_9x5U_uD",
  //   },
  // };

  const bannerResp = await ProductApiEndPoints.productBanner();

  try {
    let typeId = "";
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_PRODUCTS_API_URL}/products?typeid=${typeId}`,
      {
        next: { revalidate: 60 },
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
        newlaunched: data?.new_launched,
        gst: Number(data?.packingVarient?.[0]?.gst?.["$numberDecimal"]) || 0,
        mrp: Number(data?.packingVarient?.[0]?.price?.["$numberDecimal"]) || 0,

        images: imgImages,
        image: imgImages?.[0]?.url || null,
        moq: data?.min_order_qty,
      };
    });

    const menuRes = await fetch(
      `${process.env.NEXT_PUBLIC_PRODUCTS_API_URL}/menu`,
      {
        next: { revalidate: 60 },
      },
    );
    if (!menuRes.ok) {
      throw new Error(`Failed to fetch menu data. Status: ${menuRes.status}`);
    }
    const menus = await menuRes.json();

    const menu = {
      productTypes: menus?.productTypes,
      categories: menus?.categories,
      specialities: menus?.specialities,
      concerns: menus?.concerns,
      divisions: menus?.divisions,
    };

    if (!Array.isArray(transformProducts) || transformProducts.length === 0) {
      <div className="text-center py-10 text-red-600 text-lg font-medium">
        No products found.
      </div>;
    }
    return (
      <>
        {/* <BreadcrumbSchemaOnly
          baseUrl={process.env.NEXT_PUBLIC_CLIENT_URL}
          siteName="Eridanus HealthCare"
          title="Products"
        /> */}
        <CommonHeroSection heroSectionData={bannerResp?.heroSectionData} />
        <div className="w-full h-full  text-black flex items-center justify-center m-8">
          <div className="wrapper w-full h-full mx-auto relative sm:mb-0 mb-[1.5rem]">
            <div className=" pb-[2.5rem]">
              {transformProducts.length > 0 ? (
                <ComponentsProduct
                  filterMenu={menu}
                  productsData={transformProducts}
                  totalProducts={products?.total}
                />
              ) : (
                <div className="text-center py-10 text-red-600 text-lg font-medium">
                  No products found.
                </div>
              )}
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
