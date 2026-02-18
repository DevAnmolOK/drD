// components/EnquiryModal.tsx
"use client";
import React from "react";
import Image from "next/image";

import {
  IoClose,
  IoPricetagOutline,
  IoCartOutline,
  IoInformationCircleOutline,
  IoShapesOutline,
  IoCubeOutline, // use instead of IoPackage
  IoCarOutline, // use instead of IoTruckOutline
} from "react-icons/io5";

import ProductEnquiryForm from "../productPageComonent/ProductEnquiryForm";

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: any;
}

const ProductEnquiryModal: React.FC<EnquiryModalProps> = ({
  isOpen,
  onClose,
  data,
}) => {
  if (!isOpen) return null;

  const url = process.env.NEXT_PUBLIC_PRODUCT_URL;

  type MongoDecimal = { $numberDecimal: string };
  function getDecimalValue(val: unknown): number {
    return Number((val as MongoDecimal)?.$numberDecimal ?? 0);
  }

  const price = getDecimalValue(data?.packingVarient?.[0]?.price);
  const name: string = data?.name || "Product name not available";
  const id: string = data?._id || "";
  const detail: string = data?.details || "";
  const qty = data?.min_order_qty || "1";
  const baseUrl = process.env.NEXT_PUBLIC_PRODUCT_URL;

  const productDetails = [
    {
      icon: <IoCubeOutline className="w-4 h-4 text-blue-600" />,
      label: "Packing",
      value: data?.packingVarient?.[0]?.packing || "Not specified",
    },
    {
      icon: <IoPricetagOutline className="w-4 h-4 text-green-600" />,
      label: "Price",
      value: `₹${price.toFixed(2)}`,
    },
    {
      icon: <IoCartOutline className="w-4 h-4 text-purple-600" />,
      label: "Min.Qty",
      value: qty,
    },
    {
      icon: <IoShapesOutline className="w-4 h-4 text-orange-600" />,
      label: "Type",
      value: data?.type_id?.[0]?.name || "Not specified",
    },
    {
      icon: <IoCarOutline className="w-4 h-4 text-red-600" />,
      label: "Packing Qty",
      value: data?.packingVarient?.[0]?.packing_qty || "Not specified",
    },
    {
      icon: <IoInformationCircleOutline className="w-4 h-4 text-indigo-600" />,
      label: "Packing Type",
      value:
        data?.packingVarient?.[0]?.packing_type?.[0]?.name || "Not specified",
    },
  ];

  return (
    // <div
    //   className="fixed inset-0 top-28  sm:top-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-4 border border-red-800"
    //   onClick={onClose}
    // >
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-4 pt-[5rem]"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-6xl max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-gray-100 hover:bg-secondary text-gray-600 hover:text-white rounded-full p-2 transition-all duration-200 shadow-lg"
        >
          <IoClose className="w-6 h-6" />
        </button>

        <div className="flex flex-col lg:flex-row h-full max-h-[80vh]">
          {/* Product Details Panel - Hidden on mobile, visible on desktop */}
          <div className="hidden lg:flex lg:w-2/5 bg-gradient-to-br from-primary1/5 to-primary1/10 p-6 flex-col">
            {/* Product Image */}
            <div className="bg-bgSecondary rounded-xl p-4 mb-6 shadow-md">
              <div className="relative w-full h-[16rem] rounded-lg overflow-hidden">
                <Image
                  src={
                    data?.images?.[0]?.url
                      ? `${baseUrl}/${data?.images?.[0]?.url}`
                      : "/fallback/f7.png"
                  }
                  fill
                  className="object-contain "
                  alt="Product Image"
                  priority
                />
              </div>
            </div>

            {/* Product Information */}
            <div className="bg-white rounded-xl p-4 flex-1 shadow-md">
              <h3 className="text-lg font-bold text-subitle mb-2 line-clamp-2">
                {name}
              </h3>

              {detail && (
                <p className="text-sm text-textSecondary mb-4 line-clamp-3">
                  {detail}
                </p>
              )}

              <div className="space-y-2.5">
                {productDetails.map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    {item.icon}
                    <span className="text-xs font-semibold text-black min-w-0 w-20 text-nowrap">
                      {item.label}:
                    </span>
                    <span className="text-sm text-textGray font-medium flex-1 truncate">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Form Panel */}
          <div className="flex-1 lg:w-3/5 p-6 lg:p-8 overflow-y-auto">
            {/* Mobile Product Info */}
            <div className="lg:hidden mb-6">
              <div className="flex gap-4 mb-4">
                <div className="relative w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src={
                      data?.images?.[0]?.url
                        ? `${baseUrl}/${data?.images?.[0]?.url}`
                        : "/fallback/f7.png"
                    }
                    fill
                    className="object-cover"
                    alt="Product Image"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-gray-800 text-sm line-clamp-2 mb-1">
                    {name}
                  </h3>
                  <p className="text-lg font-bold text-green-600">
                    ₹{price.toFixed(2)}
                  </p>
                  <p className="text-xs text-gray-500">Min. Qty: {qty}</p>
                </div>
              </div>
            </div>

            {/* Form Header */}
            <div className="text-center mb-8">
              <h2 className="text-2xl lg:text-3xl font-bold text-subitle mb-2">
                Place Your Enquiry
              </h2>
              <p className="text-gray1 text-sm">
                Fill in your details to get the best quote
              </p>
            </div>

            {/* Form Component */}
            <ProductEnquiryForm
              onClose={onClose}
              pid={id}
              pName={name}
              pDetail={detail}
              qty={qty}
              price={price}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductEnquiryModal;
