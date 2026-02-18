"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { useState } from "react";
import { FiSearch, FiFilter, FiPackage, FiTag, FiLayers } from "react-icons/fi";
import { MdOutlineShoppingCart } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";
import { useRouter } from "next/navigation";
import { FaTags } from "react-icons/fa";
import { GiBoxUnpacking } from "react-icons/gi";

interface Product {
  _id: string;
  slug: string;
  name: string;
  type_id: any;
  details: string;
  packingVarient: any;
  speciality_id: any;
  category_id: any;
  minOrderQty?: number;
}

interface ProductListProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filteredProducts: Product[];
  isType: boolean;
  selectedProducts: any[];
  handleGetSelectedProduct: (data: any) => void;
  totalProducts: number;
  menuData: any;
  parentsKey: any;
  slugg: any;
  handleParentKey: (key: string) => void;
  handleSlug: (slug: string) => void;
}

const ProductList: React.FC<ProductListProps> = ({
  isType,
  searchTerm,
  setSearchTerm,
  filteredProducts,
  selectedProducts,
  handleGetSelectedProduct,
  slugg,
  parentsKey,
  handleParentKey,
  handleSlug,
  totalProducts,
  menuData,
}) => {
  const productCategoryArray = [
    {
      key: "Product Form",
      data: menuData?.productTypes || [],
      paramKey: "type_slug",
      route: "/product-forms",
    },
    {
      key: "Therapathic",
      data: menuData?.categories || [],
      paramKey: "therapatic_slug",
      route: "/product-category",
    },
    {
      key: "Concerns",
      data: menuData?.concerns || [],
      paramKey: "concern_slug",
      route: "/product-concern",
    },
    {
      key: "Speciality",
      data: menuData?.specialities || [],
      paramKey: "speciality_slug",
      route: "/product-speciality",
    },
  ];

  // Find default parent based on parentsKey
  const defaultParent =
    productCategoryArray.find((item) => item.paramKey === parentsKey) ||
    productCategoryArray[0];

  /* ---------- dropdown state ---------- */
  const [openParent, setOpenParent] = useState(false);
  const [openChild, setOpenChild] = useState(false);
  const [parent, setParent] = useState(defaultParent);
  const [child, setChild] = useState<any>("");
  const [parentKey, setParentKey] = useState(defaultParent?.paramKey);
  const [slug, setSlug] = useState("");

  const toggleParent = () => setOpenParent(!openParent);
  const toggleChild = () => setOpenChild(!openChild);

  // Initialize parent and child based on URL parameters
  useEffect(() => {
    if (parentsKey && menuData) {
      // Find the correct parent based on parentsKey
      const correctParent = productCategoryArray.find(
        (item) => item.paramKey === parentsKey,
      );

      if (correctParent) {
        setParent(correctParent);
        setParentKey(correctParent.paramKey);

        // Find and set the correct child based on slugg
        if (slugg && correctParent.data && correctParent.data.length > 0) {
          const correctChild = correctParent.data.find(
            (item: any) => item.slug === slugg,
          );

          if (correctChild) {
            setChild(correctChild);
            setSlug(correctChild.slug);
          }
        }
      }
    }
  }, [parentsKey, slugg, menuData]);

  // Update parent when parentsKey changes
  useEffect(() => {
    if (parentsKey) {
      const correctParent = productCategoryArray.find(
        (item) => item.paramKey === parentsKey,
      );

      if (correctParent && correctParent.paramKey !== parent.paramKey) {
        setParent(correctParent);
        setParentKey(correctParent.paramKey);
        setChild(""); // Reset child when parent changes
        setSlug("");
      }
    }
  }, [parentsKey]);

  // Update child when slugg changes and parent data is available
  useEffect(() => {
    if (slugg && parent && parent.data && parent.data.length > 0) {
      const correctChild = parent.data.find((item: any) => item.slug === slugg);

      if (correctChild && correctChild.slug !== child.slug) {
        setChild(correctChild);
        setSlug(correctChild.slug);
      }
    }
  }, [slugg, parent]);

  // Debug useEffect - Remove this in production
  // useEffect(() => {
  //   console.log("Debug Info:", {
  //     parentsKey,
  //     slugg,
  //     currentParent: parent?.key,
  //     currentChild: child?.name,
  //     availableChildren: parent?.data?.map((item: any) => ({
  //       name: item.name,
  //       slug: item.slug,
  //     })),
  //   });
  // }, [parentsKey, slugg, parent, child]);

  // Handle checkbox toggle

  const handleCheckboxChange = (product: Product, quantity: number = 1) => {
    const exists = selectedProducts.find((p) => p.id === product._id);
    let updated;
    if (exists) {
      updated = selectedProducts.filter((p) => p.id !== product._id);
    } else {
      updated = [
        ...selectedProducts,
        {
          id: product._id,
          name: product.name,
          price: product.packingVarient?.[0]?.price || 0,
          minOrderQty: product.minOrderQty || 1,
          quantityForEnquiry: quantity,
        },
      ];
    }
    handleGetSelectedProduct(updated);
  };

  // Handle quantity change
  const handleQuantityChange = (product: Product, quantity: number) => {
    const exists = selectedProducts.find((p) => p.id === product._id);
    let updated;
    if (exists) {
      updated = selectedProducts.map((p) =>
        p.id === product._id ? { ...p, quantityForEnquiry: quantity } : p,
      );
    } else {
      updated = [
        ...selectedProducts,
        {
          id: product._id,
          name: product.name,
          price: product.packingVarient?.[0]?.price || 0,
          minOrderQty: product.minOrderQty || 1,
          quantityForEnquiry: quantity,
        },
      ];
    }
    handleGetSelectedProduct(updated);
  };

  const router = useRouter();
  return (
    <div className="lg:col-span-2">
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        {/* Search */}
        <div className="p-6 border-b border-gray-200 flex flex-col xl:flex-row gap-4">
          <div className="relative flex-1">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border placeholder:text-subitle border-gray-200 focus:ring-2 focus:ring-secondary/50 focus:border-none "
            />
          </div>
          <div className=" flex md:flex-row flex-col gap-4 justify-between">
            {/* --- custom dropdowns --- */}
            <div className="flex sm:flex-row flex-col gap-4  w-full">
              {/*----------------- Parent dropdown--------------- */}
              <div className="relative w-full">
                <button
                  onClick={toggleParent}
                  className=" px-4 py-3 rounded-xl  border border-gray-200 text-subitle font-medium flex items-center justify-between min-w-48 w-full cursor-pointer"
                >
                  {parent.key}
                  <span className="ml-2">
                    <IoIosArrowDown size={16} />
                  </span>
                </button>
                {openParent && (
                  <ul className="absolute  w-[12rem]  shadow-lg rounded-xl border border-gray-200 bg-white z-10">
                    {productCategoryArray.map((item: any, index: any) => (
                      <li
                        key={index}
                        onClick={() => {
                          setParent(item);
                          setChild("");
                          setSlug("");
                          setOpenParent(false);
                          setParentKey(item?.paramKey || "");
                          // handleParentKey(item?.paramKey);
                          // handleSlug(""); // Reset slug when parent changes
                        }}
                        className="px-4 py-2 cursor-pointer hover:bg-link/10"
                      >
                        {item?.key || ""}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/*----------- Child dropdown------------- */}
              <div className="relative w-full">
                <button
                  onClick={toggleChild}
                  disabled={!parent?.data.length}
                  className="px-3 py-3 rounded-xl  border border-gray-200 text-subitle font-medium flex items-center justify-between min-w-48 w-full line-clamp-1 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {child?.name || "Select Child"}

                  <span className="ml-2">
                    <IoIosArrowDown size={16} />
                  </span>
                </button>
                {openChild && parent?.data.length > 0 && (
                  <ul className="absolute  w-[14rem]  shadow-lg rounded-xl border border-gray-200 bg-white z-10 max-h-60 overflow-y-auto">
                    {parent?.data?.map(
                      (c: any, index: number) =>
                        c?.slug && (
                          <li
                            key={c.slug ?? index}
                            onClick={() => {
                              setChild(c);
                              setOpenChild(false);
                              setSlug(c.slug);
                              handleParentKey(parent?.paramKey);
                              handleSlug(c.slug);
                            }}
                            className={`px-4 py-2 cursor-pointer hover:bg-primary1/10 ${
                              child?.slug === c.slug ? "bg-secondary/10" : ""
                            }`}
                          >
                            {c.name}
                          </li>
                        ),
                    )}
                  </ul>
                )}
              </div>
            </div>

            <div className="flex gap-2">
              <div className="bg-bgSecondaryone/10 text-black px-4 py-1 rounded-full text-base xl:font-semibold flex items-center text-nowrap">
                <FiPackage className="mr-2" /> {totalProducts} Products
              </div>
              <div className="bg-secondary/20 text-textPrimary px-4 py-1 rounded-full text-base xl:font-semibold flex items-center text-nowrap">
                <MdOutlineShoppingCart className="mr-2" />{" "}
                {selectedProducts.length} Selected
              </div>
            </div>
          </div>
        </div>

        {/* Product Table */}
        <div className="overflow-x-scroll">
          <table className="w-full">
            <thead>
              <tr className="bg-bgSecondaryone/20 border-b border-gray-200 w-full">
                <th className="px-2 py-4 text-left text-dt font-bold text-subitle capitalize tracking-wider ">
                  {" "}
                </th>
                <th className=" py-4 text-left text-dt font-bold text-subitle capitalize tracking-wider ">
                  Qty
                </th>
                <th className="px-4 py-4 text-left text-dt font-bold text-subitle capitalize tracking-wider  ">
                  <div className="flex items-center">
                    <FiPackage className="mr-2" />
                    Product Name
                  </div>
                </th>
                <th className="px-4 py-4 text-left text-dt font-bold text-subitle capitalize tracking-wider ">
                  <div className="flex items-center">
                    <FiTag className="mr-2" />
                    Speciality
                  </div>
                </th>
                <th className="px-4 py-4 text-left text-dt font-bold text-subitle capitalize tracking-wider ">
                  <div className="flex items-center">
                    <FaTags className="mr-2" />
                    Category
                  </div>
                </th>
                {isType && (
                  <th className="px-4 py-4 text-left text-dt font-bold text-subitle capitalize tracking-wider ">
                    <div className="flex items-center">
                      <FiTag className="mr-2" />
                      Type
                    </div>
                  </th>
                )}

                <th className="px-6 py-2 text-left text-dt font-bold text-subitle capitalize tracking-wider ">
                  <div className="flex items-center">
                    <FiLayers className="mr-2" />
                    Composition
                  </div>
                </th>
                <th className="px-3 py-2 text-left text-dt font-bold text-subitle capitalize tracking-wider ">
                  <div className="flex items-center">
                    <GiBoxUnpacking className="mr-2" />
                    Packing
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-bgSecondaryone/10">
              {filteredProducts.map((product) => {
                const selected = selectedProducts.find(
                  (p) => p.id === product._id,
                );
                const quantity = selected?.quantityForEnquiry || 1;
                return (
                  <tr
                    key={product._id}
                    className="hover:bg-bgSecondaryone/10 transition-all duration-200"
                  >
                    <td className="px-4 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        className="w-5 h-5 text-primary1 border-gray-300 rounded focus:ring-primary1  checked:bg-primary2 checked:border-primary1 cursor-pointer"
                        checked={!!selected}
                        onChange={() => handleCheckboxChange(product)}
                      />
                    </td>
                    <td className="px-4 py-6 whitespace-nowrap">
                      <input
                        type="number"
                        min={1}
                        value={quantity}
                        onChange={(e) =>
                          handleQuantityChange(
                            product,
                            parseInt(e.target.value),
                          )
                        }
                        className="w-10 border border-gray-300 rounded px-2 py-1 text-base text-black focus:outline-none focus:ring-1 focus:ring-primary1/70"
                      />
                    </td>
                    <td className="px-6 py-4 ">
                      <Link
                        href={`/product/${product.slug}`}
                        onClick={() => {
                          setTimeout(() => router.refresh(), 50);
                        }}
                      >
                        <div className="font-semibold text-gray-900 hover:text-primary1">
                          {product?.name}
                        </div>
                      </Link>
                    </td>
                    <td className="px-6 py-4 ">
                      <span className="inline-flex items-center px-3 py-1 rounded-[.5rem]  text-xs flex-col  bg-bgSecondarytwo/10 font-medium bg-link/10 text-primary1/80">
                        {/* {product?.speciality_id?.map(
                          (spec: any, index: any) => (
                            <div key={index}>{spec?.name || "N/A"} </div>
                          ),
                        )} */}
                        {product?.speciality_id?.length ? (
                          product.speciality_id.map(
                            (spec: any, index: number) => (
                              <div key={index}>{spec?.name || "N/A"}</div>
                            ),
                          )
                        ) : (
                          <div>N/A</div>
                        )}
                      </span>
                    </td>
                    <td className="px-4 py-4 ">
                      <span className="inline-flex items-center px-3 py-1 rounded-[.5rem] text-xs font-medium bg-bgSecondaryone/10 text-black ">
                        {product?.category_id?.[0]?.name || "N/A"}
                      </span>
                    </td>
                    {isType && (
                      <td className="px-4 py-4 ">
                        <span className="inline-flex items-center px-3 py-1 rounded-[.5rem] text-xs font-medium bg-secondary/20 text-primary2/80">
                          {product.type_id?.[0]?.name}
                        </span>
                      </td>
                    )}
                    <td className="px-3 py-4 ">
                      <div className="text-sm text-subitle">
                        {product.details}
                      </div>
                    </td>
                    <td className="px-6 py-4 ">
                      <div className="text-sm font-medium text-black">
                        <span>{product.packingVarient?.[0]?.packing}</span>
                        <span className=" ml-2">
                          {product.packingVarient?.[0]?.packing_type?.[0]?.name}
                        </span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
