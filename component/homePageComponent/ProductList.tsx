import React from "react";
import TagBadge from "../ui/TagBadge";
import CenterMode from "../common/SwipeSlider";
import ProductCard from "../common/ProductCard";
import SwipeSlider from "../common/SwipeSlider";

const products = [
  {
    image: "/images/p1.png",
    name: "Femprolite – Hormonal Balance Support",
  },
  {
    image: "/images/p.png",
    name: "Ovacare Plus – Ovulation & fertility support",
  },
    {
    image: "/images/p2.png",
    name: "Femprolite – Hormonal Balance Support",
  },
  {
    image: "/images/p3.png",
    name: "Ovacare Plus – Ovulation & fertility support",
  },
    {
    image: "/images/p1.png",
    name: "Femprolite – Hormonal Balance Support",
  },
  {
    image: "/images/p2.png",
    name: "Ovacare Plus – Ovulation & fertility support",
  },
];

export default function ProductList() {
  const data = {
    tag: "our Products List",
    title: {
      normal: "We Offer",
      highlight: "High Quality",
      end: "Range of Pharmaceuticals products",
    },
    desc: `Dr. D Pharma has brought a number of high-quality and highly effective pharmaceutical products to the market. Over the years the company has built a healthy and diverse line of drugs that have made us the Best Pharmaceuticals Company in Chandigarh. With the use of innovative and advanced technology, we have successfully tackled the most serious health problems in society. We offer innovative products of unique quality in the industry.`,
  };

  return (
    <section className="bg-white">
      <div className="wrapper mx-auto py-20">
        <div className="flex flex-col items-center text-center lg:mt-16 mx-auto">
          <TagBadge text={data.tag} className="mb-4" />
          <h2 className="text-3xl md:text-[44px] font-light mb-6">
            {data.title.normal}
            <span className="font-semibold mx-2">{data.title.highlight}</span>
            {data.title.end}
          </h2>

          <p className="text-[#626263] leading-relaxed text-base">
            {data.desc}
          </p>
        </div>
        <div className="wrapper m-auto pt-16 flex items-center justify-center">
    <SwipeSlider>
  {products.map((p, i) => (
    <ProductCard key={i} {...p} />
  ))}
</SwipeSlider>
        </div>
      </div>
    </section>
  );
}
