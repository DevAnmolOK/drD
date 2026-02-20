"use client";
import React from "react";

import PromotionCard from "./PromotionCard";

interface OfferListProps {
  title: string;
  icon: React.ReactNode;
  offers: any[];
  isExpired?: boolean;
}

const PromotionList: React.FC<OfferListProps> = ({
  title,
  icon,
  offers,
  isExpired = false,
}) => {

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        {icon}
        {title} ({offers.length})
      </h2>
      {offers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {offers.map((offer, index) => (
            <div key={index}>
              <PromotionCard
                key={offer.id}
                offer={offer}
                isExpired={isExpired}
              />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center text-lg">
          No {isExpired ? "expired" : "active"} promotions available.
        </p>
      )}
    </div>
  );
};

export default PromotionList;
