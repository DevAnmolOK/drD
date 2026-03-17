"use client";
import EnquiryForm from "../../component/common/EnquireyForm";
import CommonHeroSection from "../../component/common/CommonHeroSection";
import ProductList from "../../component/productPageComonent/ProductList";
import React, { useState, useEffect, useRef } from "react";
import FloatingEnquiryPanel from "../../component/productPageComonent/FloatingEnquiryPanel";
import fetchProductMenu from "../../utills/fetchProductMenu";
import EnquiryGateModal from "./EnquiryGateModal";

export interface SelectedProduct {
  id: string | number;
  name: string;
  price: number;
  minOrderQty: number;
  quantityForEnquiry: number;
}

interface ProductListingPageProps {
  product: any;
  istype: boolean;
  slug: string;
  parentKey: string | null;
  metaData?: any;
  heroSectionData?: any;
}

const ProductListingPage = ({
  product,
  istype,
  slug,
  parentKey,
  metaData,
  heroSectionData,
}: ProductListingPageProps) => {
  // For Enquirey Modal
  const [isChecking, setIsChecking] = useState(true);
  const [hasEnquired, setHasEnquired] = useState(false);
  const [showGateModal, setShowGateModal] = useState(false);
  // ------------
  const [pKey, setPkey] = useState(parentKey);
  const [cSlug, setCSlug] = useState(slug);
  const [menu, setMenu] = useState<any[]>([]);
  const [totalProducts, setTotalProducts] = useState(product?.total || 0);
  const [products, setProducts] = useState(product?.products || []);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProducts, setSelectedProducts] = useState<SelectedProduct[]>(
    [],
  );
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const observerRef = useRef<HTMLDivElement | null>(null);

  // ----------------------
  // Load from localStorage on mount & merge
  // ----------------------
  useEffect(() => {
    try {
      const saved = localStorage.getItem("selectedProducts");
      if (saved) {
        const savedProducts: SelectedProduct[] = JSON.parse(saved);

        // Merge only if not already in selectedProducts
        setSelectedProducts((prev) => {
          const merged = [...savedProducts];
          prev.forEach((p) => {
            if (!merged.find((sp) => sp.id === p.id)) {
              merged.push(p);
            }
          });
          return merged;
        });
      }
    } catch (err) {
      console.error("Failed to load selected products:", err);
    }
  }, []);

  // ------------------------------ Enquirey Modal -----------------
  // check weather user submit enquirey erlier(valid for 24 hours)
  useEffect(() => {
    const enquiryData = localStorage.getItem("siteEnquiry");
    if (!enquiryData) {
      setShowGateModal(true);
      setIsChecking(false);
      return;
    }
    try {
      const parsed = JSON.parse(enquiryData);
      const now = Date.now();
      const diff = now - parsed.time;
      const hours = diff / (1000 * 60 * 60);
      if (parsed?.status === "success" && hours < 24) {
        setHasEnquired(true);
        setShowGateModal(false);
      } else {
        localStorage.removeItem("siteEnquiry");
        setHasEnquired(false);
        setShowGateModal(true);
      }
    } catch (error) {
      localStorage.removeItem("siteEnquiry");
      setShowGateModal(true);
    }
    setIsChecking(false);
  }, []);
  // submit form to see the data
  const handleGateEnquirySubmit = (e: any) => {
    e.preventDefault();
    const payload = {
      status: "success",
      time: Date.now(),
    };
    localStorage.setItem("siteEnquiry", JSON.stringify(payload));
    setHasEnquired(true);
    setShowGateModal(false);
  };

  // ----------------------
  // Save to localStorage whenever selectedProducts changes
  // ----------------------
  useEffect(() => {
    localStorage.setItem("selectedProducts", JSON.stringify(selectedProducts));
  }, [selectedProducts]);

  // -------------------------------
  // Fetch products from API
  // -------------------------------
  const fetchProducts = async (
    name: string = "",
    pageNumber = 1,
    append = false,
  ) => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (name) params.set("name", name);
      params.set("page", String(pageNumber));
      params.set("limit", "10");

      const url = `${
        process.env.NEXT_PUBLIC_PRODUCTS_API_URL
      }/products?${pKey}=${cSlug}&${params.toString()}`;
      const res = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": `${process.env.NEXT_PUBLIC_SECRET_API_KEY}`,
        },
        cache: "no-store",
      });
      if (!res.ok) throw new Error("Failed to fetch products");

      const data = await res.json();
      setTotalProducts(data.total || 0);
      if (append)
        setProducts((prev: any) => [...prev, ...(data.products || [])]);
      else setProducts(data.products || []);

      setHasMore(data.products?.length === 10);
    } catch (err) {
      console.error(err);
      if (!append) setProducts([]);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

  // -------------------------------
  // Debounced search
  // -------------------------------
  useEffect(() => {
    const handler = setTimeout(() => {
      setPage(1);
      fetchProducts(searchTerm, 1, false);
    }, 500);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  // -------------------------------
  // Infinite scroll observer
  // -------------------------------
  useEffect(() => {
    if (!observerRef.current || !hasMore || loading) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) setPage((prev) => prev + 1);
      },
      { threshold: 1.0, rootMargin: "100px" },
    );
    observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [hasMore, loading]);

  useEffect(() => {
    if (page > 1) fetchProducts(searchTerm, page, true);
  }, [page]);

  useEffect(() => {
    fetchProducts("", 1, false);
  }, []);

  useEffect(() => {
    fetchProducts("", 1, false);
  }, [pKey, cSlug]);

  // fetch menu
  useEffect(() => {
    async function loadMenu() {
      const data = await fetchProductMenu();
      const { divisions, ...menuWithoutDivision } = data;
      setMenu(menuWithoutDivision);
    }
    loadMenu();
  }, []);

  const descriptionContent =
    metaData?.data?.[0]?.editorcontent || `<p>Content not available.</p>`;

  const handleParentKey = (key: string) => {
    if (key) {
      setPkey(key);
    }
  };

  const handleSlug = (slug: string) => {
    if (slug) {
      setCSlug(slug);
    }
  };

  if (isChecking) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }
  return (
    <>
      {hasEnquired && (
        <>
          <div className=" w-full mb-4">
            {/* <Banner
          pageName={slug.replace(/-/g, " ").toUpperCase()}
          color="text-white"
        /> */}

            <CommonHeroSection heroSectionData={heroSectionData} />
          </div>

          <div className=" w-full flex mt-4  items-center justify-center">
            <div className="wrapper w-full items-center  p-4 rounded-lg border border-gray-200 bg-white relative">
              <div
                className={`text-gray-700 text-subtitle leading-relaxed ${
                  !isDescriptionExpanded
                    ? "line-clamp-2 overflow-hidden italic"
                    : ""
                }`}
                dangerouslySetInnerHTML={{ __html: descriptionContent }}
              />
              <button
                onClick={() => setIsDescriptionExpanded((prev) => !prev)}
                className="mt-2 text-secondary font-semibold hover:underline"
              >
                {isDescriptionExpanded ? "Read less" : "Read More"}
              </button>
            </div>
          </div>

          <div className="wrapper mx-auto pb-8 pt-4 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-black">
              <div className="col-span-2">
                <ProductList
                  isType={istype}
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                  filteredProducts={products}
                  selectedProducts={selectedProducts} // controlled
                  handleGetSelectedProduct={setSelectedProducts} // update parent
                  totalProducts={totalProducts}
                  menuData={menu}
                  slugg={slug}
                  parentsKey={parentKey}
                  handleParentKey={handleParentKey}
                  handleSlug={handleSlug}
                />
                <div
                  ref={observerRef}
                  className="h-10 flex items-center justify-center my-4"
                >
                  {loading && (
                    <span className="text-gray-500">
                      Loading more products...
                    </span>
                  )}
                  {!hasMore && products.length > 0 && (
                    <span className="text-gray-400">No more products</span>
                  )}
                </div>
              </div>

              <div className="col-span-1 lg:block hidden">
                <div className="sticky top-28">
                  <div className="lg:block hidden">
                    <FloatingEnquiryPanel
                      selectedProducts={selectedProducts}
                      onRemoveProduct={(id: any) => {
                        setSelectedProducts((prev) =>
                          prev.filter((p) => p.id !== id),
                        );
                      }}
                    />
                  </div>
                  <EnquiryForm
                    heading="Product Enquiry"
                    selectedProducts={selectedProducts}
                    setSelectedProducts={setSelectedProducts}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="lg::hidden block">
            <FloatingEnquiryPanel
              selectedProducts={selectedProducts}
              onRemoveProduct={(id: any) => {
                setSelectedProducts((prev) => prev.filter((p) => p.id !== id));
              }}
            />
          </div>
        </>
      )}

      {showGateModal && (
        <EnquiryGateModal
          slug={slug}
          onSuccess={() => {
            setHasEnquired(true);
            setShowGateModal(false);
          }}
        />
      )}
    </>
  );
};

export default ProductListingPage;
