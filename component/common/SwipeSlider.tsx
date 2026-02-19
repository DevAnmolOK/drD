"use client";

import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface CenterSliderProps {
  children: React.ReactNode;
}

export default function SwipeSlider({ children }: CenterSliderProps) {
  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "1px",
    slidesToShow: 4,
    speed: 2000,
    arrows: false,
    dots: true, 
    autoplay: true, 
    autoplaySpeed: 3500,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          centerPadding: "40px",
        },
      }, 
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          centerPadding: "0px",
        },
      },
    ],
  };

  return (
    <div className="slider-container w-full pb-12"> 
      <Slider {...settings}>
        {React.Children.map(children, (child) => (
          <div className="outline-none px-2 pb-8 focus:outline-none">
            {child}
          </div>
        ))}
      </Slider>
    </div>
  );
}