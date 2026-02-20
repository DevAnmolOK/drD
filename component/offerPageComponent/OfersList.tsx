"use client";
import React from "react";

import OfferCard from "./OfferCard";

interface OfferListProps {
  title: string;
  icon: React.ReactNode;
  offers: any[];
  isExpired?: boolean;
}

const OffersList: React.FC<OfferListProps> = ({
  title,
  icon,
  offers,
  isExpired = false,
}) => {
  // console.log("Rendering OffersList with offers:", offers);
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-2xl font-bold text-textSecondary mb-6 flex items-center gap-2">
        {icon}
        {title} ({offers.length})
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {offers.map((offer, index) => (
          <div key={index}>
            <OfferCard key={offer.id} offer={offer} isExpired={isExpired} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default OffersList;
