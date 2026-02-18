"use client";
import React from "react";
import Head from "next/head";
import Image from "next/image";
import { useState, useEffect } from "react";
import ProductEnquiryModal from "../productPageComonent/ProductEnquiryModal";
// import { calculatePtsPtr } from "../../utills/pharmaPricing";
interface ClientProductDetailsProps {
  singleProduct: any;
}
export default function ClientProductDetails({
  singleProduct,
}: ClientProductDetailsProps) {
  // const { ptr, pts } = calculatePtsPtr(
  //   singleProduct?.products?.[0]?.packingVarient?.[0]?.price?.[
  //     "$numberDecimal"
  //   ],
  //   {
  //     gstRate:
  //       Number(singleProduct.packingVarient?.[0]?.gst?.["$numberDecimal"]) ||
  //       12,
  //     retailerMargin: 20,
  //     stockistMargin: 10,
  //   },
  // );

  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState("description");
  const [isModelOpen, setIsModelopen] = useState(false);
  // console.log("selectedImage", selectedImage);

  useEffect(() => {
    if (isModelOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isModelOpen]);

  const openModel = () => {
    setIsModelopen(true);
  };

  const closeModel = () => {
    setIsModelopen(false);
  };

  // Fake JSON data for pharmaceutical product
  const productData = {
    id: "28333",
    name: "Neuro-Active Plus Tablets",
    brand: "Eridanus Healthcare",
    category: "Neuropsychiatric Range",
    price: 245.5,
    originalPrice: 289.0,
    discount: 15,
    rating: 4.7,
    reviewCount: 184,
    availability: "In Stock",
    sku: "ERD-NAP-28333",
    batchNo: "NAP2024-07-001",
    mfgDate: "July 2024",
    expDate: "June 2027",
    shelfLife: "3 Years",
    packSize: "10x10 Tablets",
    description:
      "Neuro-Active Plus is a comprehensive neuropsychiatric formulation designed to support cognitive function and neurological health. Manufactured in WHO-GMP certified facilities, this premium formulation combines proven ingredients to deliver optimal therapeutic outcomes for patients with neurological conditions.",
    composition:
      "Each tablet contains: Citicoline 500mg, Piracetam 400mg, Vinpocetine 5mg, Ginkgo Biloba Extract 120mg, Vitamin B6 1.5mg, Vitamin B12 2.5mcg, Folic Acid 1.5mg",
    indications: [
      "Cognitive enhancement and memory support",
      "Cerebral circulation improvement",
      "Age-related cognitive decline",
      "Post-stroke recovery support",
      "Attention and focus enhancement",
      "Neuroprotective support",
    ],
    features: [
      "WHO-GMP certified manufacturing",
      "Clinically proven ingredients",
      "3-year shelf life",
      "Blister packed for freshness",
      "Doctor recommended formula",
      "Premium quality assurance",
    ],
    dosage: "One tablet twice daily after meals or as directed by physician",
    contraindications:
      "Hypersensitivity to any component, pregnancy, lactation",
    images: [
      "/api/placeholder/500/500",
      "/api/placeholder/500/500",
      "/api/placeholder/500/500",
      "/api/placeholder/500/500",
    ],
    certificates: ["WHO-GMP", "ISO 9001:2015", "FSSAI", "Drug License"],
    manufacturer: {
      name: "Eridanus Healthcare Pvt. Ltd.",
      address: "Plot No. 245, Industrial Area, Bathinda, Punjab - 151001",
      phone: "+91-164-2234567",
      email: "info@eridanushealthcare.com",
    },
  };

  const handleImageSelect = (index: any) => {
    setSelectedImage(index);
  };

  const baseUrl = process.env.NEXT_PUBLIC_PRODUCT_URL;

  const gst =
    Number(
      singleProduct?.products?.[0]?.packingVarient?.[0]?.gst?.[
        "$numberDecimal"
      ],
    ) || 0;

  // console.log("singleProduct", singleProduct);

  const productImages = singleProduct?.products?.[0]?.images || [];
  const orderedImages = [
    ...productImages.filter((img: any) => img.type === "IMG"),
    ...productImages.filter((img: any) => img.type === "VIS"),
  ];

  // console.log("orderedImages:", orderedImages);
  return (
    <>
      <div className="min-h-screen  w-full">
        {/* Product Section */}
        <div className=" wrapper mx-auto   p-16   bg-bgSecondary">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:gap-12 gap-6">
            {/* Product Images */}
            <div className="space-y-4   ">
              <div className=" h-[18.75rem] sm:h-[31rem] relative  rounded-2xl  overflow-hidden bg-gray-50   ">
                <Image
                  src={
                    orderedImages[selectedImage]
                      ? `${baseUrl}/${orderedImages[selectedImage]?.url}`
                      : "/placeholder.jpg"
                  }
                  alt={singleProduct?.[0]?.name || "Product Image"}
                  fill
                  className="w-full h-full object-contain  sm:p-2"
                  quality={100}
                  unoptimized={true}
                />
              </div>
              {singleProduct?.products?.[0]?.images?.length > 0 && (
                <div className="grid grid-cols-4 gap-3">
                  {orderedImages.map((img: any, index: number) => (
                    <div
                      key={index}
                      onClick={() => handleImageSelect(index)}
                      className={`aspect-square relative rounded-lg overflow-hidden border-2 transition-all cursor-pointer bg-gray-50 ${
                        selectedImage === index
                          ? "border-secondary/60"
                          : "border-gray-200"
                      }`}
                    >
                      <Image
                        src={
                          img?.url
                            ? `${baseUrl}/${img?.url}`
                            : "/placeholder.jpg"
                        }
                        fill
                        unoptimized
                        alt={`Product ${index + 1}`}
                        className="w-full h-full object-contain sm:p-4"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Product Details */}
            <div className="space-y-4">
              <div className=" flex items-center gap-2 ">
                <div className="  bg-secondary/10 font-medium px-3 py-1 rounded-[0.25rem] text-secondary">
                  {singleProduct?.products?.[0]?.division_id?.[0]?.name}
                </div>
                <div className=" bg-textPrimary/10 font-medium py-1 px-6    rounded-[0.25rem] text-textPrimary">
                  {singleProduct?.products?.[0]?.type_id?.[0]?.name}
                </div>
              </div>

              {/* <div className="flex sm:flex-row flex-col sm:items-center sm:gap-2 text-dt font-normal mb-2 text-white ">
                <div className=" border border-green-200 py-1 px-6  bg-green-50 rounded-[0.25rem] text-primary1">
                  {singleProduct?.products?.[0]?.type_id?.[0]?.name}
                </div>
              </div> */}

              <div className="  flex flex-row  items-center gap-[1rem] ">
                <h2 className="text-3xl font-bold text-textPrimary mt-4 text-[var(--color-black)] ">
                  {singleProduct?.products?.[0]?.name}
                </h2>
                {singleProduct?.products?.[0]?.new_launched && (
                  <div className=" bg-secondary/10 animate-pulse shadow-lg ml-[1rem] mt-4  font-medium px-3 py-0.5 rounded-[0.25rem] text-secondary">
                    New Launch !
                  </div>
                )}
                {singleProduct?.products?.[0]?.upcoming && (
                  <div className=" bg-textPrimary/10 animate-pulse shadow-lg ml-[1rem] mt-4  font-medium px-3 py-0.5 rounded-[0.25rem] text-primary2">
                    Upcomming !
                  </div>
                )}
              </div>

              {/* <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon
                        key={i}
                        filled={i < Math.floor(productData.rating)}
                        className={`w-5 h-5 ${
                          i < Math.floor(productData.rating)
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                    <span className="text-sm text-gray-600 ml-2">
                      {productData.rating} ({productData.reviewCount} reviews)
                    </span>
                  </div>
                </div> */}

              <div className="flex items-center gap-3 mb-6 mt-4">
                <div className="text-3xl font-bold text-[var(--color-primary2)]">
                  ₹
                  {
                    singleProduct?.products?.[0]?.packingVarient?.[0]?.price?.[
                      "$numberDecimal"
                    ]
                  }
                </div>

                {/* <span className="text-xl text-gray-500 line-through">
                    ₹{productData.originalPrice}
                  </span>
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                    {productData.discount}% OFF
                  </span> */}
              </div>
              {/* <div className=" flex item-center gap-4">
                <p className=" text-xl font-bold text-subitle">
                  PTS:{" "}
                  <span className=" font-semibold text-primary2 text-xl">
                    {ptr}
                  </span>
                </p>
                <p className=" text-xl font-bold text-subitle">
                  PTR:{" "}
                  <span className=" font-semibold text-primary2 text-xl">
                    {pts}
                  </span>
                </p>
              </div> */}

              <div className="bg-link/10 rounded-lg p-4 mb-6 gap-3   ">
                <span className="text-lg font-noraml text-textPrimary text-nowrap">
                  Composition / Active Ingredients :
                </span>

                <h3 className="text-plg text-textPrimary leading-relaxed font-bold">
                  {singleProduct?.products?.[0]?.details}
                </h3>
              </div>

              {/* Product Info Grid */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="bg-white p-4 rounded-lg  flex items-center gap-2 border border-[#e8e8e8]">
                  <p className="text-[var(--color-black)] font-medium text-pbase">
                    Packaging Type:{" "}
                  </p>
                  <p className="font-medium text-[var(--color-subitle)]">
                    {
                      singleProduct?.products?.[0]?.packingVarient?.[0]
                        ?.packing_type?.[0]?.name
                    }
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg flex items-center gap-2 border border-[#e8e8e8]">
                  <p className="text-[var(--color-black)] font-medium text-pbase">
                    Dimensions:
                  </p>
                  <p className="font-medium text-[var(--color-subitle)]">
                    {singleProduct?.products?.[0]?.packingVarient?.[0]?.packing}
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg flex items-center gap-2 border border-[#e8e8e8]">
                  <p className="text-[var(--color-black)] font-medium text-pbase">
                    Min Order Qty:
                  </p>
                  <p className="font-medium text-[var(--color-subitle)]">
                    {singleProduct?.products?.[0]?.min_order_qty}
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg flex items-center gap-2 border border-[#e8e8e8]">
                  <p className="text-[var(--color-black)] font-medium text-pbase">
                    G. S. T (%)
                  </p>
                  <p className="font-medium text-[var(--color-subitle)] pl-[0.5rem]">
                    {gst} %
                  </p>
                </div>
              </div>
              <button
                className=" submit-button w-full bg-secondary hover:bg-secondary/90 disabled:bg-secondary/60 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                onClick={openModel}
              >
                Place Enquiry
              </button>
            </div>
          </div>

          {/* Product Details Tabs */}
          <div className="mt-8 mb-8">
            <div className="border-b border-gray-200">
              <nav className="flex gap-8 overflow-x-scroll sm:overflow-hidden">
                {/* {["description", "composition", "indications", "dosage"].map( */}
                {["description"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`py-4 px-2 border-b-2 font-semibold text-xl transition-colors ${
                      activeTab === tab
                        ? "border-secondary text-secondary"
                        : "border-transparent text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </nav>
            </div>

            <div className="py-8 ">
              {activeTab === "description" && (
                <div className="max-w-4xl">
                  {singleProduct?.products?.[0]?.editorcontent ? (
                    <div
                      className="blog-content"
                      dangerouslySetInnerHTML={{
                        __html: singleProduct.products[0].editorcontent,
                      }}
                    />
                  ) : (
                    <></>
                  )}
                </div>
              )}

              {activeTab === "composition" && (
                <div className="max-w-4xl">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    Composition
                  </h3>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                    <p className="text-gray-800 leading-relaxed">
                      {singleProduct?.products?.[0]?.details}
                    </p>
                  </div>
                </div>
              )}

              {activeTab === "indications" && (
                <div className="max-w-4xl">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    Indications
                  </h3>
                  <ul className="space-y-3">
                    {productData.indications.map((indication, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-700">{indication}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {activeTab === "dosage" && (
                <div className="max-w-4xl">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    Dosage & Administration
                  </h3>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
                    <p className="text-gray-800 font-medium mb-2">
                      Recommended Dosage:
                    </p>
                    <p className="text-gray-700">{productData.dosage}</p>
                  </div>
                  <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                    <p className="text-gray-800 font-medium mb-2">
                      Contraindications:
                    </p>
                    <p className="text-gray-700">
                      {productData.contraindications}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Manufacturer Info */}
          {/* <div className="mt-16 bg-white rounded-2xl shadow-sm p-8 border border-violet-700">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Manufacturer Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">
                  {productData.manufacturer.name}
                </h4>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="text-blue-600 mt-0.5 flex-shrink-0">
                      <MapIcon />
                    </div>
                    <p className="text-gray-700">
                      {productData.manufacturer.address}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-blue-600 flex-shrink-0">
                      <PhoneIcon />
                    </div>
                    <p className="text-gray-700">
                      {productData.manufacturer.phone}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-blue-600 flex-shrink-0">
                      <MailIcon />
                    </div>
                    <p className="text-gray-700">
                      {productData.manufacturer.email}
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">
                  Quality Certifications
                </h4>
                <div className="flex flex-wrap gap-2">
                  {productData.certificates.map((cert, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {cert}
                    </span>
                  ))}
                </div>
                <p className="text-sm text-gray-600 mt-4">
                  All products manufactured in WHO-GMP certified facilities
                  ensuring highest quality standards.
                </p>
              </div>
            </div>
          </div> */}
        </div>
      </div>
      {isModelOpen && (
        <ProductEnquiryModal
          isOpen={isModelOpen}
          onClose={closeModel}
          data={singleProduct?.products?.[0]}
        />
      )}
    </>
  );
}
