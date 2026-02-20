"use client";
import React, { useState, useRef, useEffect } from "react";
import { FiXCircle } from "react-icons/fi";

interface BaseOffer {
  id: number;
  title: string;
  description: string;
  image: string;
  discount: string;
  category: string;
  validUntil: string;
  isPopular?: boolean;
}

interface ExpiredOffer extends BaseOffer {
  expiredOn: string;
}

type Offer = BaseOffer | ExpiredOffer;

interface OfferProps {
  offer: Offer;
  isExpired?: boolean;
}

const OfferCard: React.FC<OfferProps> = ({ offer, isExpired = false }) => {
  const [showFull, setShowFull] = useState(false);
  const [maxHeight, setMaxHeight] = useState("4.5rem"); // collapsed height
  const descRef = useRef<HTMLDivElement>(null);

  const imageUrl = process.env.NEXT_PUBLIC_PRODUCT_URL + "/" + offer.image?.[0];

  useEffect(() => {
    if (descRef.current) {
      if (showFull) {
        // Expand to full height
        setMaxHeight(`${descRef.current.scrollHeight}px`);
      } else {
        // Collapse to ~3 lines
        setMaxHeight("4.5rem");
      }
    }
  }, [showFull, offer.description]);

  return (
    <div
      className={`bg-white rounded-xl shadow-sm overflow-hidden border-1 transition-all duration-300 hover:shadow-xl ${
        isExpired
          ? "border-gray-200 opacity-75"
          : "border-link/10 hover:border-secondary/30"
      }`}
    >
      <div className="relative">
        <img
          src={imageUrl}
          alt={offer.title}
          className="w-full h-[20rem] object-cover"
        />
        <div className="absolute top-4 right-4">
          {isExpired && (
            <div className="bg-primary text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
              Expired
            </div>
          )}
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-black mb-3">{offer.title}</h3>

        {/* Animated Description */}
        <div
          ref={descRef}
          style={{ maxHeight }}
          className="overflow-hidden transition-[max-height] duration-500 ease-in-out"
        >
          <p className="text-subitle mb-2">{offer.description}</p>
        </div>

        {/* Show More / Show Less Button */}
        {offer.description.split(" ").length > 20 && (
          <button
            onClick={() => setShowFull(!showFull)}
            className="text-black font-semibold text-sm hover:underline"
          >
            {showFull ? "Show Less" : "Show More"}
          </button>
        )}
      </div>
    </div>
  );
};

export default OfferCard;
