"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import dynamic from "next/dynamic";

const ProductCard = dynamic(
  () => import("../../components/productPageComonent/ProductCard"),
);

interface ProductcategoryPageProps {
  product: any;
  filterKey: any; // initial data (page 1)
}

export default function ProductcategoryPage({
  product,
  filterKey,
}: ProductcategoryPageProps) {
  // console.log("key rendered:", filterKey);

  const transformProducts = (products: any[] = []) =>
    products.map((data: any) => {
      const images = data?.images || [];

      const imgImages = images.filter((img: any) => img.type === "IMG");

      // const visImages = images.filter((img: any) => img.type === "VIS");

      // const orderedImages = [...imgImages, ...visImages];

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
        mrp: Number(data?.packingVarient?.[0]?.price?.["$numberDecimal"]) || 0,
        images: imgImages,
        image: imgImages?.[0]?.url || null,
        moq: data?.min_order_qty,
      };
    });

  //  State
  const [products, setProducts] = useState<any[]>(
    transformProducts(product?.products || []),
  );
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(product?.products?.length >= 10); // agar first page full hai toh aur hoga
  const [loading, setLoading] = useState(false);

  const observerRef = useRef<HTMLDivElement | null>(null);

  //  Fetch function (pagination ke liye)
  const fetchMoreProducts = useCallback(async (pageNumber: number) => {
    try {
      setLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_PRODUCTS_API_URL}/products?${filterKey}=true&page=${pageNumber}&limit=10`,
        {
          cache: "no-store",
          headers: {
            "Content-Type": "application/json",
            "x-secret-key": `${process.env.NEXT_PUBLIC_SECRET_API_KEY}`,
          },
        },
      );

      if (!res.ok) {
        throw new Error(`Failed to fetch products: ${res.status}`);
      }

      const data = await res.json();

      // agar naya data mila toh append karo
      if (data?.products?.length > 0) {
        const newProducts = transformProducts(data.products);
        setProducts((prev) => [...prev, ...newProducts]);
        setHasMore(data.products.length >= 10); // agar 10 se kam mila toh aur nahi hoga
      } else {
        setHasMore(false);
      }
    } catch (err) {
      console.error("Error fetching more products:", err);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  }, []);

  //  Intersection Observer (infinite scroll)
  useEffect(() => {
    if (!observerRef.current || loading || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          // console.log("Loading more products...");
          setPage((prev) => prev + 1);
        }
      },
      {
        threshold: 0.1,
        rootMargin: "200px",
      },
    );

    observer.observe(observerRef.current);

    return () => observer.disconnect();
  }, [loading, hasMore]);

  //  Fetch next page jab `page` update ho
  useEffect(() => {
    if (page > 1) {
      fetchMoreProducts(page);
    }
  }, [page, fetchMoreProducts]);

  // console.log("products:", products);
  return (
    <div className="w-full h-full">
      {products.length > 0 ? (
        <>
          <div className="grid sm:grid-cols-2 xl:grid-cols-3  gap-[1rem] pb-8 mt-8">
            {products.map((data: any, index: number) => (
              <div key={`${data.slug}-${index}`}>
                <ProductCard data={data} />
              </div>
            ))}
          </div>

          {/* Loader */}
          {loading && (
            <div className="text-center py-6">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary1 mx-auto"></div>
              <p className="text-gray-600 mt-2">Loading more products...</p>
            </div>
          )}

          {/* End of products */}
          {!hasMore && (
            <div className="text-center py-6 text-gray-500">
              No more products to load
            </div>
          )}

          {/* Infinite scroll target */}
          <div ref={observerRef} className="h-10" />
        </>
      ) : (
        <div className="text-center py-10 text-red-600 text-lg font-medium">
          No products found.
        </div>
      )}
    </div>
  );
}
