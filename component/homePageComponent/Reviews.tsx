import React from "react";
import TestimonialCard from "../common/TestinomialCard";
import SwipeSlider from "../common/SwipeSlider";

const testimonials = [
  {
    rating: 5,
    title: "Excellent Services",
    text: `These services involve cleaning and washing textiles, such as clothing, linens, and towels. Laundering services can be provided by commercial laundry facilities hotels`,
    user: {
      name: "Customer",
      company: "Royal Ins",
      avatar: "/images/test1.png",
    },
},
  {
    rating: 3.5,
    title: "Excellent Services",
    text: `These services involve cleaning and washing textiles, such as clothing, linens, and towels. Laundering services can be provided by commercial laundry facilities hotels`,
    user: {
      name: "Customer",
      company: "Royal Ins",
      avatar: "/images/test1.png",
    },
},
  {
    rating: 4,  
    title: "Excellent Services",
    text: `These services involve cleaning and washing textiles, such as clothing, linens, and towels. Laundering services can be provided by commercial laundry facilities hotels`,
    user: { 
        name: "Customer",
        company: "Royal Ins",
        avatar: "/images/test1.png",
    },
},  
  {
    rating: 4,  
    title: "Excellent Services",
    text: `These services involve cleaning and washing textiles, such as clothing, linens, and towels. Laundering services can be provided by commercial laundry facilities hotels`,
    user: { 
        name: "Customer",
        company: "Royal Ins",
        avatar: "/images/test1.png",
    },
}, 
  {
    rating: 4,  
    title: "Excellent Services",
    text: `These services involve cleaning and washing textiles, such as clothing, linens, and towels. Laundering services can be provided by commercial laundry facilities hotels`,
    user: { 
        name: "Customer",
        company: "Royal Ins",
        avatar: "/images/test1.png",
    },
}, 


];

export default function Reviews() {
  return (
    <div className="bg-[#F5F5F5] py-14 md:py-16">
         <div className="flex flex-col items-center text-center pb-6 mx-auto">
            <h2 className="text-3xl md:text-[44px] font-light mb-6">
            What
            <span className="font-semibold mx-2">people says</span>
              about
          </h2>
          </div>
      <div className="wrapper mx-auto px-4 sm:px-6 lg:px-0">
        {/* <div className="grid md:grid-cols-4 gap-8"> */}
            <SwipeSlider>
          {testimonials.map((t, i) => (
            <TestimonialCard key={i} {...t} />
          ))}
          </SwipeSlider>
        {/* </div> */}
      </div>
    </div>
  );
}
 