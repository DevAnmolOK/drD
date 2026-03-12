import { cookies } from "next/headers";
import type { Metadata } from "next";
import { TransformProducts } from "../../../utills/transformProducts";

import ProductListingPage from "../../../component/productPageComonent/ProductListingPage";
import { ProductApiEndPoints } from "../../../lib/service/ProdcutsApiEndPoints";
interface DivisionPreviewProps {
  params: Promise<{ slug: string }>;
}

//  separate function to fetch product data
async function fetchProductCategoryData(slug: string) {
  const url = process.env.NEXT_PUBLIC_PRODUCTS_API_URL;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_PRODUCTS_API_URL}/products?therapatic_slug=${slug}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": `${process.env.NEXT_PUBLIC_SECRET_API_KEY}`,
        },
      },
    );

    if (!res.ok) {
      throw new Error("Failed to fetch product data");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching product category data:", error);
    return null;
  }
}

const baseUrl = process.env.NEXT_PUBLIC_IMAGE_URL;

export default async function Productcategory({
  params,
}: DivisionPreviewProps) {
  const { slug } = await params;
  const bannerResp = await ProductApiEndPoints.productBanner();

  const cookieStore = await cookies();
  const parentKey = cookieStore.get("productMenuKey")?.value || null;
  const productData = await fetchProductCategoryData(slug);
  const transformedData = productData
    ? { ...productData, products: TransformProducts(productData.products) }
    : null;

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
      <div className="w-full h-full  flex items-center justify-center border-4 ">
        <div className=" w-full h-full mx-auto relative sm:mb-0 mb-[1.5rem]">
          <div className="pt-[0rem] pb-[2.5rem]">
            <div className="text-black ">
              {productData ? (
                <ProductListingPage
                  heroSectionData={bannerResp?.heroSectionData}
                  product={productData}
                  istype={true}
                  slug={slug}
                  parentKey={parentKey}
                />
              ) : (
                "No data found"
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
