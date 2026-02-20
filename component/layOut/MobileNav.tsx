"use client";
import { useState, useEffect } from "react";
import { BiCaretDown, BiCaretRight, BiX } from "react-icons/bi";
import { IoMenu } from "react-icons/io5";
import Image from "next/image";
import Link from "next/link";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

interface ChildMenuItem {
  label: string;
  href: string;
}

interface NavigationItem {
  id: number;
  order: number;
  label: string;
  slug: string | null;
  dropdown?: ChildMenuItem[];
}

interface MobileNavProp {
  navigation: NavigationItem[];
  logoUrl?: any;
  categories?: any;
  therapathic?: any;
  speciality?: any;
  productMenu: any;
}

export default function MobileNav({
  navigation,
  logoUrl,
  productMenu,
}: MobileNavProp) {
  // console.log("NavigationData:", navigation);
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const [openSubDropdown, setOpenSubDropdown] = useState<number | null>(null);
  const [openProductCategory, setOpenProductCategory] = useState<number | null>(
    null,
  );
  const pathname = "/"; // Replace with usePathname() if needed

  const toggleNav = () => {
    setIsOpen(!isOpen);
    document.body.style.overflow = !isOpen ? "hidden" : "unset";
  };

  const toggleDropdown = (itemId: number) => {
    setOpenDropdown((prev) => (prev === itemId ? null : itemId));
    setOpenSubDropdown(null);
    setOpenProductCategory(null);
  };

  const toggleSubDropdown = (divisionId: number) => {
    setOpenSubDropdown((prev) => (prev === divisionId ? null : divisionId));
  };

  useEffect(() => {
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const base = process.env.NEXT_PUBLIC_IMAGE_URL;

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

  const router = useRouter();
  return (
    <>
      {/* Mobile Header */}
      <div className="flex items-center justify-between p-4 ">
        <button
          onClick={toggleNav}
          className="w-10 h-10 flex flex-col justify-center items-center text-white rounded-md"
        >
          <IoMenu size={36} />
        </button>
      </div>

      {/* Mobile Navigation Overlay */}
      <div
        className={`fixed inset-0 bg-white z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } flex flex-col`}
      >
        {/* Header with Close Button */}
        <div className="flex items-center justify-between min-h-[5.4375] sm:min-h-[6.4375rem] p-4 border-b border-gray-200 sticky top-0 bg-[#1D2F3E] z-50">
          <Link
            href="/"
            onClick={() => {
              setTimeout(() => router.refresh(), 50);
            }}
          >
            <div className=" relative h-14 sm:h-18 w-26 sm:w-33.5 overflow-hidden ">
              <Image
                src={logoUrl || "/homePage/hlogo.png"}
                alt="VisionPlus"
                fill
                className="object-contain"
              />
            </div>
          </Link>
          <button
            onClick={toggleNav}
            className="w-8 h-8 flex items-center justify-center"
          >
            <BiX size={36} className="text-white" />
          </button>
        </div>

        {/* Scrollable Navigation */}
        <div className="flex-1 overflow-y-auto py-4">
          {navigation?.map((data: any, index: number) => {
            const isProduct = data?.label === "Product";
            const haveChild = data?.is_dropdown && data?.submenu?.length > 0;

            return (
              <div key={index} className="border-b border-gray-100">
                {isProduct ? (
                  <div className="flex items-center justify-between px-4">
                    <a
                      href={data?.href || data?.href || "#"}
                      className={`flex-1 text-plg font-medium w-[80%] py-4 hover:text-link`}
                      onClick={!haveChild && !isProduct ? toggleNav : undefined}
                    >
                      {data.label}
                    </a>

                    {isProduct && (
                      <button
                        onClick={() => toggleDropdown(data.id)}
                        className="py-4 w-[20%] flex justify-center bg-gray-200"
                      >
                        <BiCaretDown
                          size={20}
                          className={`text-black transition-transform ease-in-out duration-600 ${
                            openDropdown === data.id ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                    )}
                  </div>
                ) : haveChild ? (
                  <div className="flex items-center justify-between px-4">
                    <div
                      // href={data?.slug?.slug || data?.slug || "#"}
                      className={`flex-1 text-plg font-medium w-[80%] py-4 hover:text-link`}
                      onClick={!haveChild ? toggleNav : undefined}
                    >
                      {data.label}
                    </div>

                    {(haveChild || isProduct) && (
                      <button
                        onClick={() => toggleDropdown(data.id)}
                        className="py-4 w-[20%] flex justify-center bg-gray-200"
                      >
                        <BiCaretDown
                          size={20}
                          className={`text-black transition-transform ease-in-out duration-600 ${
                            openDropdown === data.id ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center justify-between px-4">
                    <a
                      href={data?.href || data?.href || "#"}
                      className={`flex-1 text-plg font-medium w-[80%] py-4 hover:text-link`}
                      onClick={!haveChild && !isProduct ? toggleNav : undefined}
                    >
                      {data.label}
                    </a>

                    {(haveChild || isProduct) && (
                      <button
                        onClick={() => toggleDropdown(data.id)}
                        className="py-4 w-[20%] flex justify-center bg-gray-200"
                      >
                        <BiCaretDown
                          size={20}
                          className={`text-black transition-transform ease-in-out duration-600 ${
                            openDropdown === data.id ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                    )}
                  </div>
                )}

                {/* Products Dropdown */}
                {isProduct && openDropdown === data.id && (
                  <div className="bg-gray-50 border-t border-gray-200">
                    {productCategoryArray.map((category, categoryIndex) => (
                      <div
                        key={categoryIndex}
                        className="border-b border-gray-100 last:border-b-0"
                      >
                        <div className="flex items-center justify-between pl-6 pr-4">
                          <span className="flex-1 text-plg font-normal text-subitle w-[80%] py-4 hover:text-link">
                            {category.key}
                          </span>

                          {category.data?.length > 0 && (
                            <button
                              onClick={() =>
                                setOpenProductCategory((prev) =>
                                  prev === categoryIndex ? null : categoryIndex,
                                )
                              }
                              className="py-4 w-[20%] flex justify-center bg-gray-200"
                            >
                              <BiCaretRight
                                size={20}
                                className={`text-black transition-transform ease-in-out duration-600 ${
                                  openProductCategory === categoryIndex
                                    ? "rotate-90"
                                    : ""
                                }`}
                              />
                            </button>
                          )}
                        </div>

                        {category.data?.length > 0 &&
                          openProductCategory === categoryIndex && (
                            <div className="bg-gray-50 border-t border-gray-100">
                              {category.data.map(
                                (item: any, itemIndex: number) => (
                                  // item?.slug && (
                                  <a
                                    key={itemIndex}
                                    href={`${category.route}/${
                                      item?.slug || "#"
                                    }`}
                                    className="block px-10 py-3 text-[0.95rem] text-gray-700 hover:text-link hover:bg-gray-100 rounded-md transition-colors border-b border-gray-100 last:border-b-0"
                                    onClick={() => {
                                      Cookies.set(
                                        "productMenuKey",
                                        category.paramKey,
                                        { path: "/" },
                                      );
                                      toggleNav();
                                    }}
                                  >
                                    {item.type_name ||
                                      item.name ||
                                      item.label ||
                                      item.label}
                                  </a>
                                ),
                                // ),
                              )}
                            </div>
                          )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Regular Dropdown */}
                {haveChild && !isProduct && openDropdown === data.id && (
                  <div className="bg-gray-50 border-t border-gray-200">
                    {data.submenu.map((child: any, childIndex: number) => (
                      <a
                        key={childIndex}
                        href={child?.slug?.slug ? `${child.slug.slug}` : "#"}
                        className="block px-6 py-3 text-plg font-normal text-subitle hover:text-link border-b border-gray-200 last:border-b-0"
                        onClick={toggleNav}
                      >
                        {child?.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          {/* Contact Us Button */}
          <div className="px-4 py-8">
            <a
              href="/contact"
              className="block w-full bg-secondary text-white text-center py-3 px-6 rounded-lg font-semibold text-pxl"
              onClick={toggleNav}
            >
              Contact Us →
            </a>
          </div>
        </div>
      </div>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleNav}
        />
      )}
    </>
  );
}
