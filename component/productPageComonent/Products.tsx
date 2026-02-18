"use client";
import dynamic from "next/dynamic";
import DynamicProductFilter from "./ProductFilter";
import { useState, useEffect, useRef, useCallback } from "react";
import { TbFilterHeart } from "react-icons/tb";
import { IoClose } from "react-icons/io5";

const ComponenetProductCard = dynamic(() => import("./ProductCard"));

interface Productpros {
  productsData: any;
  filterMenu?: any;
  totalProducts: any;
}

// API parameter mapping for different filter groups
const FILTER_API_MAPPING = {
  productTypes: "type_slug",
  concerns: "concern_slug",
  categories: "therapatic_slug",
  specialities: "speciality_slug",
  divisions: "division_slug",
};

export default function Product({
  productsData,
  filterMenu,
  totalProducts,
}: Productpros) {
  const [products, setProducts] = useState(productsData || []);
  const [totalPoducts, setTotalProducts] = useState(totalProducts || "");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [initialLoad, setInitialLoad] = useState(false);
  const [currentFilters, setCurrentFilters] = useState<any>({});

  const observerRef = useRef<HTMLDivElement | null>(null);

  // Modified buildProductQuery to handle special filters via API
  function buildProductQuery(filters: any = {}, pageNumber = 1) {
    const parts: string[] = [];
    parts.push(`page=${pageNumber}`);
    parts.push(`limit=10`);

    // Handle special filters - pass to API instead of filtering locally
    if (filters.upcoming === true) {
      parts.push(`upcoming=true`);
    }
    if (filters.new_launched === true) {
      parts.push(`new_launched=true`);
    }

    // Handle regular filters
    Object.entries(filters).forEach(([key, value]) => {
      // Skip special filter keys as they're handled above
      if (
        key === "upcoming" ||
        key === "new_launched" ||
        key === "filterType"
      ) {
        return;
      }

      if (Array.isArray(value) && value.length > 0) {
        const apiParam =
          FILTER_API_MAPPING[key as keyof typeof FILTER_API_MAPPING] ||
          `${key}_slug`;
        parts.push(`${apiParam}=${value.join(",")}`);
      } else if (typeof value === "string" && value) {
        parts.push(`${key}=${value}`);
      }
    });

    return `${process.env.NEXT_PUBLIC_PRODUCTS_API_URL}/products?${parts.join(
      "&",
    )}`;
  }

  const fetchData = useCallback(
    async (filters: any = {}, pageNumber = 1, append = false) => {
      try {
        setLoading(true);
        const url = buildProductQuery(filters, pageNumber);
        const res = await fetch(url, { cache: "no-store" });
        if (!res.ok) throw new Error(`Failed: ${res.status}`);
        const product = await res.json();
        setTotalProducts(product?.total);

        const transformProducts = (product?.products || []).map((data: any) => {
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
            mrp:
              Number(data?.packingVarient?.[0]?.price?.["$numberDecimal"]) || 0,
            gst:
              Number(data?.packingVarient?.[0]?.gst?.["$numberDecimal"]) || 0,

            images: imgImages,
            image: imgImages?.[0]?.url || null,
            moq: data?.min_order_qty,
          };
        });

        if (append) {
          setProducts((prevProducts: any) => [
            ...prevProducts,
            ...transformProducts,
          ]);
        } else {
          setProducts(transformProducts);
        }

        if (transformProducts.length === 0 || transformProducts.length < 10) {
          setHasMore(false);
        } else {
          setHasMore(true);
        }
      } catch (err) {
        console.error("Error fetching Products:", err);
        if (!append) {
          setProducts([]);
        }
        setHasMore(false);
      } finally {
        setLoading(false);
        if (pageNumber === 1) {
          setInitialLoad(false);
        }
      }
    },
    [],
  );

  // Intersection Observer for infinite scroll
  useEffect(() => {
    if (!observerRef.current || !hasMore || loading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          // console.log("Loading more products...");
          setPage((prevPage) => prevPage + 1);
        }
      },
      {
        threshold: 1.0,
        rootMargin: "100px",
      },
    );

    observer.observe(observerRef.current);

    return () => {
      observer.disconnect();
    };
  }, [loading, hasMore]);

  useEffect(() => {
    if (page > 1) {
      fetchData(currentFilters, page, true);
    }
  }, [page, fetchData, currentFilters]);

  useEffect(() => {
    if (productsData && productsData.length > 0) {
      const hasMoreInitial = productsData.length >= 10;
      setHasMore(hasMoreInitial);
      setInitialLoad(false);
    }
  }, [productsData]);

  const resetPagination = () => {
    setPage(1);
    setHasMore(true);
  };

  const handleFilterChange = useCallback(
    (groupKey: string, selectedSlugs: string[]) => {
      setCurrentFilters((prevFilters: any) => {
        const updatedFilters = { ...prevFilters };

        if (selectedSlugs.length > 0) {
          updatedFilters[groupKey] = selectedSlugs;
        } else {
          delete updatedFilters[groupKey];
        }

        // Remove special filter types when normal filters are applied
        if (groupKey !== "filterType") {
          delete updatedFilters.upcoming;
          delete updatedFilters.new_launched;
          delete updatedFilters.filterType;
        }

        return updatedFilters;
      });
    },
    [],
  );

  useEffect(() => {
    setPage(1);
    setHasMore(true);
    fetchData(currentFilters, 1, false);
  }, [currentFilters, fetchData]);

  // Modified special filter handlers to pass boolean flags to API
  const handleSpecialFilter = (filterType: "upcoming" | "new_launched") => {
    resetPagination();

    // Create filter object with boolean flag for API
    const filters = {
      [filterType]: true, // This will be passed as upcoming=true or new_launched=true
    };

    setCurrentFilters(filters);
    fetchData(filters, 1, false);
  };

  const handleShowAllProducts = () => {
    resetPagination();
    setCurrentFilters({});
    fetchData({}, 1, false);
  };

  return (
    <>
      <div className="flex gap-[2rem] relative md:flex-row flex-col">
        {/* Mobile Filter Button */}
        <div className="flex md:hidden items-center justify-between px-4 py-3 bg-gray-50 border-b border-[#e8e8e8]">
          <span className="text-lg font-medium">Products</span>
          <button
            onClick={() => setIsFilterOpen(true)}
            className="flex items-center gap-2 text-primary1 font-medium"
          >
            <TbFilterHeart size={24} /> Filter
          </button>
        </div>

        {/* Desktop Sidebar */}
        <div className="w-[25%] hidden md:block">
          <div className="sticky top-32 z-10 border border-[#e8e8e8] rounded-lg p-4 max-h-[calc(100vh-8rem)] overflow-y-auto">
            <DynamicProductFilter
              filterMenu={filterMenu}
              onFilterChange={handleFilterChange}
              onSpecialFilter={handleSpecialFilter}
              onShowAllProducts={handleShowAllProducts}
              totalProducts={totalPoducts}
            />
          </div>
        </div>

        {/* Mobile Sidebar Overlay */}
        <div
          className={`fixed inset-0 bg-black/40 z-50 transition-opacity duration-300 ${
            isFilterOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
          onClick={() => setIsFilterOpen(false)}
        ></div>

        {/* Mobile Sidebar Content */}
        <div
          className={`fixed top-0 left-0 h-full w-4/5 sm:w-[65%] bg-white z-50 p-5 shadow-lg transition-transform duration-300 ${
            isFilterOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Filter Products</h2>
            <button onClick={() => setIsFilterOpen(false)}>
              <IoClose size={28} />
            </button>
          </div>
          <div className="overflow-y-auto max-h-[calc(100vh-5rem)]">
            <DynamicProductFilter
              filterMenu={filterMenu}
              onFilterChange={handleFilterChange}
              onSpecialFilter={handleSpecialFilter}
              onShowAllProducts={handleShowAllProducts}
              totalProducts={totalPoducts}
            />
          </div>
        </div>

        {/* Product Listing */}
        <div className="w-full lg:w-[75%] min-h-screen">
          <div className="w-full h-full">
            {initialLoad && loading ? (
              <div className="text-center py-10 text-gray-600 text-lg font-medium min-h-[50vh] flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary1"></div>
                  <span>Loading products...</span>
                </div>
              </div>
            ) : products.length > 0 ? (
              <>
                <div className="grid sm:grid-cols-2 gap-[1rem] pb-8">
                  {products.map((data: any, index: number) => (
                    <div key={`${data.slug}-${index}`}>
                      <ComponenetProductCard data={data} />
                    </div>
                  ))}
                </div>

                {loading && (
                  <div className="text-center py-6">
                    <div className="flex flex-col items-center gap-2">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary1"></div>
                      <span className="text-gray-600">
                        Loading more products...
                      </span>
                    </div>
                  </div>
                )}

                {!hasMore && products.length > 0 && (
                  <div className="text-center py-6">
                    <p className="text-gray-500">No more products to load</p>
                  </div>
                )}

                <div
                  ref={observerRef}
                  className="h-10 flex items-center justify-center"
                >
                  {hasMore && !loading && (
                    <div className="text-gray-400 text-sm">
                      Scroll for more products
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="text-center py-10 text-red-600 text-lg font-medium min-h-[50vh] flex items-center justify-center">
                <div className="flex flex-col items-center gap-2">
                  <span className="text-p4xl font-semibold bg-gradient-to-r from-primary1 to-primary2 bg-clip-text text-transparent">
                    No products found.
                  </span>

                  <button
                    onClick={handleShowAllProducts}
                    className="text-primary2 underline text-plg"
                  >
                    Show all products
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
