"use client";

import { useState } from "react";
import { FiMessageCircle, FiX } from "react-icons/fi";
import { HiShoppingCart } from "react-icons/hi";

import EnquiryForm from "../../component/common/EnquireyForm";
interface FloatingEnquiryPanel {
  selectedProducts: any;
  onRemoveProduct: (id: string | number) => void;
}
export default function FloatingEnquiryPanel({
  selectedProducts,
  onRemoveProduct,
}: FloatingEnquiryPanel) {
  if (selectedProducts.length === 0) return null;

  const [isPanelOpen, setIsPanelOpen] = useState(false);

  // console.log("selectedProductsttttttttttttttt", selectedProducts);

  return (
    <>
      <button
        onClick={() => setIsPanelOpen(true)}
        className=" fixed bottom-20 right-0 rounded-tl-full rounded-bl-full bg-secondary text-white p-2 pr-6 custom-drop-shadow hover:scale-105 transition-transform z-50 cursor-pointer flex items-center justify-between gap-2
                   lg:static lg:bottom-auto lg:right-auto lg:w-full lg:mb-4 lg:rounded-xl lg:bg-link/10 lg:text-textPrimary lg:border lg:border-link/50 lg:hover:scale-100"
      >
        <span className=" inline-flex lg:hidden items-center justify-center w-10 h-10 text-base font-bold text-secondary bg-white rounded-full">
          {selectedProducts.length}
        </span>
        <span className="font-semibold block lg:hidden"> In </span>
        <HiShoppingCart size={24} className="ml-2" />
        <span className="font-semibold text-lg lg:block hidden text-nowrap">
          {" "}
          Total Selected Product{" "}
        </span>
        <span className=" lg:inline-flex hidden items-center justify-center w-28 h-10 text-base font-bold text-secondary bg-white rounded-xl ">
          {selectedProducts.length}
        </span>
      </button>

      <div
        className={`fixed bottom-0 right-0 w-full md:w-[400px] bg-white border border-[#e8e8e8] custom-shadow transition-transform duration-300 z-70
        ${isPanelOpen ? "translate-y-0" : "translate-y-full"}`}
      >
        <div className=" block lg:hidden overflow-y-auto sm:max-h-[45vh] max-h-[56vh]">
          <EnquiryForm
            heading=" Product Enquiry"
            selectedProducts={selectedProducts}
          />
        </div>

        <div className="flex justify-between items-center border-b border-[#e8e8e8] p-4  text-subitle">
          <h3 className="text-lg font-semibold text-textSecondary">
            <span className="mr-2 bg-textPrimary/10 text-textPrimary  rounded-full p-2   font-semibold">
              {selectedProducts.length}
            </span>
            Product Selected for Enquiry
          </h3>
          <button
            onClick={() => setIsPanelOpen(false)}
            className="text-textPrimary hover:text-black"
          >
            <FiX size={22} />
          </button>
        </div>
        <div className="p-4 sm:max-h-[40vh]  max-h-[25vh] overflow-y-auto text-subitle">
          <ul className="gap-0.5">
            {selectedProducts.map((p: any) => (
              <li
                key={p.id}
                className=" flex flex-row mb-2  pl-2 items-center justify-between "
              >
                <div className="text-dt font-semibold flex gap-2 text-secondary">
                  <div>{p.name}</div>
                  <div>
                    <span>Qty:</span>
                    <span>{p.quantityForEnquiry}</span>
                  </div>
                  <div>₹:{Number(p?.price?.["$numberDecimal"]) || 0}</div>
                </div>
                <button
                  onClick={() => onRemoveProduct(p.id)}
                  className=" bg-secondary/30 px-2 py-2 text-secondary  hover:bg-secondary/40 cursor-pointer rounded-full"
                >
                  <FiX />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
