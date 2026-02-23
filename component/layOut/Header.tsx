"use client";
import { useEffect, useState, useRef } from "react";
import { searchApi, Product } from "@/utills/globalProductSearch";
import { useRouter } from "next/navigation";
import { useDebounce } from "@/hooks/useDebounce";
import Image from "next/image";
import Link from "next/link";
import { FiSearch, FiMenu, FiArrowRight } from "react-icons/fi";
import { LuSearch } from "react-icons/lu";
import Cookies from "js-cookie";
import { BiCaretDown } from "react-icons/bi";
import MobileNav from "./MobileNav";

export default function NavigationBar({ navBar, productMenu }: any) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredProductCategory, setHoveredProductCategory] = useState(null);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchIconRef = useRef<any>(null);
  const searchInputRef = useRef<any>(null);
  const [results, setResults] = useState<Product[]>([]);
  // const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { buttonLink, buttonName, headerImage, menu } = navBar || {};

  const debouncedQuery = useDebounce(searchQuery, 500);
  //  Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const productCategoryArray = [
    {
      key: "Product Form",
      data: productMenu?.productTypes || [],
      paramKey: "type_slug", // Parent key
      route: "/product-forms",
    },
    {
      key: "Therapathic",
      data: productMenu?.categories || [],
      paramKey: "therapatic_slug",
      route: "/product-category",
    },
    {
      key: "Concerns",
      data: productMenu?.concerns || [],
      paramKey: "concern_slug",
      route: "/product-concern",
    },
    {
      key: "Speciality",
      data: productMenu?.specialities || [],
      paramKey: "speciality_slug",
      route: "/product-speciality",
    },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // console.log("Searching for:", searchQuery);
      setShowSearch(false);
      setSearchQuery("");
    }
  };
  //  API call whenever debounced query changes
  useEffect(() => {
    const fetchResults = async () => {
      if (!debouncedQuery.trim()) {
        setResults([]);
        return;
      }
      setLoading(true);
      // setError(null);
      try {
        const res = await searchApi(debouncedQuery);
        setResults(res.products);
      } catch (err) {
        console.error(err);
        // setError("Failed to fetch results.");
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [debouncedQuery]);
  const url = process.env.NEXT_PUBLIC_PRODUCT_URL;
  const navItems = [
    { label: "Home", href: "/", active: true },
    { label: "About Us", href: "/about-us" },
    { label: "Facility", href: "/facility" },
    { label: "Products", href: "/product" },
    { label: "Our Divisions", href: "/our-divisions" },
    { label: "New Launches", href: "/new-launches" },
    { label: "Gallery", href: "/gallery" },
  ];

  return (
    <>
      <div className="w-full items-center justify-center flex h-[6.25rem]  z-100 sticky top-0  border-b border-[#FFFFFF2E] bg-black/80">
        <div className="  h-full  h-[4.625rem] w-full max-w-[101.625rem] flex items-center justify-between 2xl:px-0 sm:px-8 px-6">
          <Link href="/">
            <div className="flex items-center gap-3 relative w-[5.625rem] h-[4.625rem] ">
              <Image
                src="/images/dpharma-logo.svg"
                alt="Dr D Pharma"
                fill
                unoptimized
                className=""
              />
            </div>
          </Link>
          <div className=" flex flex-row gap-12">
            <nav className={`hidden lg:flex items-center  gap-8  text-white`}>
              {menu?.map((item: any, index: any) => {
                const isProduct = item?.label === "Product";
                const haveChild =
                  item?.is_dropdown && item?.submenu?.length > 0;
                return (
                  <div
                    className={`relative group px-2 pb-1 text-base tracking-wide font-semibold align-middle transition ${
                      item.active
                        ? "text-white border-b  border-white"
                        : "text-white "
                    }`}
                    key={index}
                  >
                    {isProduct ? (
                      <Link
                        href={item?.href || "#"}
                        className="hover:text-red-600 transition"
                        //     onClick={() => {
                        //       setTimeout(() => router.refresh(), 50);
                        //     }}
                      >
                        {
                          <div
                            className={`cursor-pointer text-[1.0369rem] font-inter font-medium text-nowrap flex items-center gap-1 `}
                          >
                            {item.label}

                            <BiCaretDown
                              className=" inline ml-1 text-current transition-transform duration-500 ease-in-out group-hover:-rotate-90"
                              size={18}
                            />
                          </div>
                        }
                      </Link>
                    ) : haveChild ? (
                      <button
                        className={`cursor-pointer hover:text-red-600 transition text-[1.0369rem] font-inter font-medium  text-nowrap flex items-center gap-1 `}
                      >
                        {item.label}
                        <BiCaretDown
                          className=" inline ml-1 text-current transition-transform duration-500 ease-in-out group-hover:-rotate-90"
                          size={18}
                        />
                      </button>
                    ) : (
                      <Link
                        href={item?.href || "#"}
                        className="hover:text-red-600 transition"
                        // onClick={() => {
                        //   setTimeout(() => router.refresh(), 50);
                        // }}
                      >
                        <div
                          className={`cursor-pointer text-[1.0369rem] font-inter font-medium  text-nowrap flex items-center gap-1 `}
                        >
                          {item.label}
                        </div>
                      </Link>
                    )}

                    {/* Dropdown menu for Products */}
                    {isProduct && (
                      <div className="absolute -left-1 rounded-[0.5rem] hidden group-hover:block bg-white custom-drop-shadow2 z-50 w-fit max-w-[15rem]">
                        {productCategoryArray
                          ?.filter((category: any) => category.data?.length > 0)
                          .map((category: any, categoryIndex: any) => (
                            <div
                              className="relative group"
                              key={categoryIndex}
                              onMouseEnter={() =>
                                setHoveredProductCategory(categoryIndex)
                              }
                              onMouseLeave={() =>
                                setHoveredProductCategory(null)
                              }
                            >
                              <div className="block border-b border-b-[#e8e8e8] hover:border-b mx-1 hover:border-b-secondary cursor-pointer group">
                                <div className="text-[#051B2E] text-[1.0369rem] font-normal pl-4 pr-4 text-nowrap mb-0.5 py-3 flex justify-between ">
                                  <span className="">{category.key}</span>
                                  <span className="">
                                    {category.data?.length > 0 && (
                                      <BiCaretDown
                                        className=" inline ml-1 text-current transition-transform duration-500 ease-in-out group-hover:-rotate-90"
                                        size={14}
                                      />
                                    )}
                                  </span>
                                </div>
                              </div>

                              {category.data?.length > 0 && (
                                <ul
                                  className={`absolute overflow-visible max-h-[25rem] overflow-y-scroll left-full top-0 rounded-[0.5rem] bg-white custom-drop-shadow2 z-[50] w-fit min-w-[15rem] ${
                                    hoveredProductCategory === categoryIndex
                                      ? "block"
                                      : "hidden"
                                  }`}
                                >
                                  {category.data.map(
                                    (item: any, itemIndex: any) => {
                                      // Determine display name
                                      let displayName =
                                        item.type_name ||
                                        item.name ||
                                        item.title ||
                                        item.label ||
                                        "Not specified";

                                      // Replace any variant of "Na" with "Not specified"
                                      if (/^na$/i.test(displayName.trim())) {
                                        displayName = "Not-Specified";
                                      }

                                      displayName = displayName.replace(
                                        /-/g,
                                        " ",
                                      );
                                      return (
                                        <li key={itemIndex}>
                                          {/* {item?.slug && ( */}
                                          <Link
                                            href={
                                              item.slug
                                                ? `${category.route}/${item.slug}`
                                                : `#`
                                            }
                                            onClick={() => {
                                              //Save parent key in cookie
                                              Cookies.set(
                                                "productMenuKey",
                                                category.paramKey,
                                                {
                                                  path: "/",
                                                },
                                              );
                                              setTimeout(
                                                () => router.refresh(),
                                                50,
                                              );
                                            }}
                                            className="block border-b border-b-[#e8e8e8] hover:border-b mx-1 hover:border-b-secondary text-nowrap min-w-[10rem]"
                                          >
                                            <div className="text-[#051B2E] text-[1.0369rem] font-normal pl-4 pr-4 w-full mb-0.5 py-3">
                                              {displayName}
                                            </div>
                                          </Link>
                                          {/* )} */}
                                        </li>
                                      );
                                    },
                                  )}
                                </ul>
                              )}
                            </div>
                          ))}
                      </div>
                    )}
                    {/* Other dropdown menus */}
                    {haveChild && !isProduct && (
                      <div className="absolute overflow-hidden -left-1 rounded-[0.5rem] hidden group-hover:block bg-white custom-drop-shadow2 z-50 w-fit max-w-[15rem]">
                        {item?.submenu?.map((child: any, index: number) => {
                          return (
                            <Link
                              key={index}
                              href={child?.href || "#"}
                              className="block border-b border-b-[#e8e8e8] hover:border-b hover:border-b-secondary"
                              onClick={() => {
                                setTimeout(() => router.refresh(), 50);
                              }}
                            >
                              <div className="text-[#051B2E] text-[1.0369rem] font-normal pl-4 pr-4 text-nowrap mb-0.5 py-3">
                                {child?.label}
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>

            {/* ACTIONS + MOBILE NAV */}
            <div className="flex items-center gap-10 ">
              <Link
                href="/contact-us"
                className="hidden md:flex items-center gap-3 bg-white text-black px-6 py-3 rounded-full font-semibold text-[15px] shadow-md hover:shadow-lg transition"
              >
                Contact Us
                <span className="bg-[#f04e23] text-white rounded-full w-8 h-8 flex items-center justify-center">
                  <FiArrowRight size={18} />
                </span>
              </Link>

              {/* SEARCH */}
              <button
                className="text-white hover:opacity-80 transition "
                onClick={() => setShowSearch(true)}
                ref={searchIconRef}
              >
                <LuSearch size={36} />
              </button>

              <div className="lg:hidden w-10 h-10 rounded-full border flex items-center justify-center text-xl">
                <MobileNav
                  navigation={navBar?.menu}
                  logoUrl={headerImage?.src}
                  productMenu={productMenu}
                />
              </div>
            </div>
          </div>
        </div>

        {showSearch && (
          <div className="fixed inset-0 bg-black/90 z-[9999] flex items-start justify-center pt-20 ">
            <div className="relative bg-white w-full max-w-4xl mx-4 rounded-[1rem] shadow-2xl z-50 max-h-[80vh]">
              {/* Close Button */}
              <div className="absolute -right-4  sm:-top-4 -top-5 z-20">
                <button
                  onClick={() => setShowSearch(false)}
                  className="p-2    bg-gray-100 hover:bg-gray-300 rounded-full transition"
                >
                  <svg
                    className="w-6 h-6 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* Search Input */}
              <div className="p-2 sm:p-4">
                <form onSubmit={handleSearchSubmit} className="">
                  <div className="relative">
                    <input
                      ref={searchInputRef}
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search products"
                      className="w-full text-plg sm:px-6 px-3 py-4 border-1 text-textPrimary border-textGray rounded-xl focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500 focus:ring-opacity-20 transition-all duration-200 placeholder:text-textGray"
                    />
                    <button
                      type="submit"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-secondary/70 text-white px-5 py-3 rounded-full hover:bg-opacity-90 transition-colors duration-200"
                    >
                      <LuSearch />
                    </button>
                  </div>
                </form>

                {/* Fake Results */}
                {searchQuery && (
                  <div className="mt-6 text-textGray">
                    <p>
                      Searching for: <strong>{searchQuery}</strong>
                    </p>
                  </div>
                )}

                <div className=" overflow-y-auto max-h-[60vh] mt-4">
                  {loading && (
                    <p className="text-gray-500 text-center">Loading...</p>
                  )}
                  {error && <p className="text-red-500 text-center">{error}</p>}
                  {!loading && !error && results.length > 0 && (
                    <ul className="divide-y divide-gray-200 grid sm:grid-cols-2 grid-cols-1 ">
                      {results.map((item, index) => (
                        <li key={index} className="py-3 px-2 hover:bg-link/10 ">
                          <Link
                            href={`/product/${item.slug}`}
                            onClick={() => {
                              setShowSearch(false);
                              setTimeout(() => router.refresh(), 50);
                            }}
                          >
                            <div className="flex gap-2">
                              <img
                                src={
                                  item?.images?.[0]?.url
                                    ? `${url}/${item?.images?.[0]?.url.replace(
                                        /^\/+/,
                                        "",
                                      )}`
                                    : "/images/fallback.png"
                                }
                                height={100}
                                width={100}
                                alt={item?.name || "VisionPuls Healthcare"}
                                className="object-contain"
                              />

                              <div className="flex flex-col">
                                <div className="flex gap-1 items-center justify-between">
                                  <div className="font-medium text-textPrimary">
                                    {item?.name || " "}
                                  </div>

                                  <div className="text-[0.65rem] text-secondary bg-secondary/10 py-0.5 px-1 rounded-[4px] ">
                                    {item?.type_id?.[0]?.name}
                                  </div>
                                </div>

                                <span className="text-dt text-textSecondary line-clamp-2">
                                  {item?.details}
                                </span>
                              </div>
                            </div>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                  {!loading &&
                    !error &&
                    debouncedQuery &&
                    results.length === 0 && (
                      <p className="text-gray-500 text-center py-8">
                        No results found for <strong>{debouncedQuery}</strong>
                      </p>
                    )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
