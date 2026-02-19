"use client";

import React, { useState, useEffect } from "react";
import {
  LuRotateCcw,
  LuPercent,
  LuIndianRupee,
  LuArrowRight,
} from "react-icons/lu";
import Button from "../ui/Button";

export default function PtrPtsCalculator() {
  /* ✅ JSON DATA ONLY */
  const ui = {
    gstDefault: 12,
    retailerDefault: 20,
    stockistDefault: 10,
    theme: {
      leftBg: "bg-[#FAFAFA]",
      rightBg: "bg-[#1A202C]",
      accent: "text-[#EE4223]",
    },

    headings: {
      titleMain: "PTR & PTS",
      titleSub: "Calculator",
      desc: "Calculate Price To Retailer and Price To Stockist for pharma products.",
      inputTitle: "Input Parameters",
      resultMain: "Calculation",
      resultSub: "Results",
      breakdown: "Breakdown",
    },

    inputs: [
      { key: "gst", label: "GST Rate" },
      { key: "retailer", label: "Retailer Margin" },
      { key: "stockist", label: "Stockist Margin" },
    ],

    resultCards: [
      { key: "ptr", title: "PTR", sub: "Retailer" },
      { key: "pts", title: "PTS", sub: "Stockist" },
    ],

    breakdownItems: [
      { key: "mrp", label: "MRP (Incl. GST)" },
      { key: "gstAmount", label: "GST Amount" },
      { key: "netMrp", label: "Net MRP" },
      { key: "retailerProfit", label: "Retailer Profit" },
      { key: "stockistProfit", label: "Stockist Profit" },
    ],

    buttons: {
      reset: "Reset Calculator",
    },
  };

  /* STATE (unchanged logic) */
  const [mrp, setMrp] = useState<number | string>("");
  const [gst, setGst] = useState<number>(ui.gstDefault);
  const [retailerMargin, setRetailerMargin] = useState<number>(
    ui.retailerDefault
  );
  const [stockistMargin, setStockistMargin] = useState<number>(
    ui.stockistDefault
  );

  const [results, setResults] = useState({
    ptr: 0,
    pts: 0,
    gstAmount: 0,
    netMrp: 0,
    retailerProfit: 0,
    stockistProfit: 0,
  });

  useEffect(() => {
    const valMrp = Number(mrp) || 0;
    const netMrp = valMrp / (1 + gst / 100);
    const ptr = netMrp / (1 + retailerMargin / 100);
    const pts = ptr / (1 + stockistMargin / 100);

    setResults({
      ptr,
      pts,
      gstAmount: valMrp - netMrp,
      netMrp,
      retailerProfit: netMrp - ptr,
      stockistProfit: ptr - pts,
    });
  }, [mrp, gst, retailerMargin, stockistMargin]);

  const formatCurrency = (num: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    }).format(num);

  const handleReset = () => {
    setMrp("");
    setGst(ui.gstDefault);
    setRetailerMargin(ui.retailerDefault);
    setStockistMargin(ui.stockistDefault);
  };

  return (
    <div className="relative  w-full flex justify-center overflow-x-hidden">
      <div className="absolute inset-0 flex flex-col lg:flex-row z-0">
        <div className={`w-full h-full lg:w-1/2 ${ui.theme.leftBg}`} />
        <div className={`w-full h-full lg:w-1/2 ${ui.theme.rightBg}`} />
      </div>

      <div className="relative z-10 w-full wrapper grid grid-cols-1 lg:grid-cols-2 items-start py-16 ">
        {/* LEFT */}
        <div className="flex flex-col justify-center p-8 lg:p-12 lg:pr-60 lg:pl-0 ">
          <div className="max-w-lg w-full m-auto lg:ml-auto lg:mr-0">
            <div className="flex items-center gap-3 mb-2">
              <h1 className=" text-4xl lg:text-[48px] font-bold text-black leading-tight">
                {ui.headings.titleMain}
                <span className="text-black font-normal font-light ml-2">
                  {ui.headings.titleSub}
                </span>
              </h1>
            </div>
            <p className="text-lg mb-10 leading-relaxed font-normal">
              {ui.headings.desc}
            </p>
            <h2 className="text-lg lg:text-[27px] font-bold mb-6">
              {ui.headings.inputTitle}
            </h2>
            <div className="space-y-6 mb-40 lg:mb-0">
              {/* MRP */}
              <div>
                <label className="flex items-center gap-2 text-base font-bold mb-2 text-black  tracking-wider">
                  <LuIndianRupee /> MRP*
                </label>
                <input
                  type="number"
                  value={mrp}
                  onChange={(e) => setMrp(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl p-4 focus:ring-2 focus:ring-blue-500 outline-none bg-gray-50/50 transition-all"
                  placeholder="0.00"
                />
              </div>
              {/* Dynamic inputs */}
              {ui.inputs.map((input) => {
                const map = {
                  gst: [gst, setGst],
                  retailer: [retailerMargin, setRetailerMargin],
                  stockist: [stockistMargin, setStockistMargin],
                } as const;

                const [val, setter] = map[input.key as keyof typeof map];
                return (
                  <div key={input.key}>
                    <label className="flex items-center gap-2 text-base font-bold mb-2 text-black  tracking-wider">
                      <LuPercent /> {input.label}
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        value={val}
                        onChange={(e) => setter(Number(e.target.value))}
                        className="w-full border border-gray-200 rounded-xl p-4 outline-none focus:border-blue-400 bg-gray-50/50 transition-colors"
                      />
                      <span className="absolute right-4 top-4 text-white font-bold text-sm">
                        %
                      </span>
                    </div>
                  </div>
                );
              })}

              <Button  onClick={handleReset}>
                {ui.buttons.reset}
              </Button>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex flex-col justify-center p-8 lg:p-12 lg:px-20 text-white">
          <div className="max-w-lg w-full m-auto lg:mr-auto lg:ml-0">
            <div className="flex items-center gap-4 mb-10">
              <h2 className="text-4xl lg:text-[48px] font-bold">
                {ui.headings.resultMain}{" "}
                <span className="opacity-40 font-light">
                  {ui.headings.resultSub}
                </span>
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-10">
              {ui.resultCards.map((card) => (
                <div
                  key={card.key}
                  className="bg-white rounded-2xl p-6 shadow-xl transform transition hover:-translate-y-1"
                >
                  <p className="text-black font-bold text-base font-normal tracking-widest mb-1">
                    {card.title}
                  </p>
                  <p className={`${ui.theme.accent} text-2xl lg:text-3xl font-black`}>
                    {formatCurrency(
                      results[card.key as keyof typeof results] as number
                    )}
                  </p>
                  <p className="text-black text-base font-normal mt-1 font-medium ">
                    Price To {card.sub}
                  </p>
                </div>
              ))}
            </div>

            <div className="space-y-5 border-t border-gray-700/50 pt-8">
              <h3 className="text-white text-[20px] font-bold  tracking-[0.3em] mb-4">
                {ui.headings.breakdown}
              </h3>

              {ui.breakdownItems.map((item) => {
                const value =
                  item.key === "mrp"
                    ? formatCurrency(Number(mrp) || 0)
                    : formatCurrency(
                        results[item.key as keyof typeof results] as number
                      );

                return (
                  <div
                    key={item.key}
                    className="flex justify-between items-center group cursor-default"
                  >
                    <span className="text-white text-lg group-hover:text-white transition-colors">
                      {item.label}
                    </span>
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-lg font-normal">
                        {value}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
