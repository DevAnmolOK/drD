import React from "react";
import TestimonialCard from "../common/TestinomialCard";
import SwipeSlider from "../common/SwipeSlider";

interface ReviewItem {
  rating: number;
  title: string;
  text: string;
  user: {
    name: string;
    company: string;
    avatar: string;
  };
}

async function getReviews(): Promise<ReviewItem[]> {
  const apiUrl =
    process.env.SMART_REVIEW_API_URL ||
    "https://smart-review-woad.vercel.app/api/public/reviews?workspace=ws-72a33196";
  const apiKey =
    process.env.SMART_REVIEW_API_KEY ||
    "sr_live_bfe2ca2ada5e984eff065fdea2e111216646924225d538e5";

  try {
    const res = await fetch(apiUrl, {
      headers: {
        "x-api-key": apiKey,
      },
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      console.error(`Failed to fetch reviews: ${res.statusText}`);
      return [];
    }

    const data = await res.json();
    if (data?.reviews && Array.isArray(data.reviews)) {
      return data.reviews.map((rev: any) => ({
        rating: rev.starRating || 5,
        title: rev.businessTitle || "Dr. D Pharma",
        text: rev.comment || "",
        user: {
          name: rev.reviewerName || "Customer",
          company: rev.businessTitle ? "Verified Customer" : "Dr. D Pharma",
          avatar: rev.reviewerPhotoUrl || "/images/test1.png",
        },
      }));
    }
  } catch (err) {
    console.error("Error fetching public reviews:", err);
  }
  return [];
}

export default async function Reviews({ homeTestimonials }: any) {
  const { title, testimonials: defaultTestimonials } =
    homeTestimonials?.data || {};
  const { heading_start, heading_bold, heading_end } = title || {};

  const apiReviews = await getReviews();
  const reviewList =
    apiReviews.length > 0 ? apiReviews : defaultTestimonials || [];

  return (
    <div className="bg-color-secondary py-14 md:py-16">
      <div className="flex flex-col items-center text-center pb-6 mx-auto">
        <h2 className="text-3xl md:text-[3rem] font-light mb-6">
          {heading_start || "Customer"}
          <span className="font-semibold mx-2">
            {heading_bold || "Feedback &"}
          </span>
          {heading_end || "Reviews"}
        </h2>
      </div>
      <div className="wrapper mx-auto px-4 sm:px-6 lg:px-0">
        {reviewList && reviewList.length > 0 && (
          <SwipeSlider>
            {reviewList.map((t: any, i: number) => (
              <TestimonialCard key={i} {...t} />
            ))}
          </SwipeSlider>
        )}
      </div>
    </div>
  );
}
