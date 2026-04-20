import dynamic from "next/dynamic";
const ComponentsProduct = dynamic(
  () => import("../../component/productPageComonent/Products"),
);
import CommonHeroSection from "../../component/common/CommonHeroSection";
import { ProductApiEndPoints } from "@/lib/service/ProdcutsApiEndPoints";
import { headers } from "next/headers";
import { getAbsoluteUrl } from "@/utills/seo/getAbsoluteUrl";
import { buildMetadata } from "@/utills/seo/generateMetaData";

export async function generateMetadata() {
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") || "/events";
  const pageUrl = getAbsoluteUrl(pathname);
  const data = await ProductApiEndPoints.productBanner();
  const data1 = data?.seo_meta;
  const data2 = data?.heroSectionData;
  return buildMetadata({
    pathname: pathname,
    seo: {
      metaTitle: data1?.seo_title || "Manufacturing",
      metaDescription: data1?.seo_description,
      canonical: pageUrl,
      ogImage: data2?.background?.imageSrc || "/images/dpharma-logo.svg",
    },
  });
}

interface ProductsProps {
  params: Promise<{ typeId: string }>;
}

export default async function Products({ params }: ProductsProps) {
  const bannerResp = await ProductApiEndPoints.productBanner();
  try {
    let typeId = "";
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_PRODUCTS_API_URL}/products?typeid=${typeId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": `${process.env.NEXT_PUBLIC_SECRET_API_KEY}`,
        },
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
        <div className="w-full h-full  text-black flex items-center justify-center m-8 m-auto">
          <div className="wrapper w-full h-full mx-auto relative sm:mb-0 mb-[1.5rem]">
            <div className="pb-[2.5rem] md:py-8">
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
