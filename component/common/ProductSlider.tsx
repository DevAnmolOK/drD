"use client";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface SlickSliderProps {
  products: any[];
  CardComponent: React.ComponentType<{ data: any }>;
  slideToShow: number;
}

export default function SlickSlider({
  products,
  CardComponent,
  slideToShow,
}: SlickSliderProps) {
  const settings = {
    dots: false,
    infinite: products.length > 1, // Only infinite if more than 1 product
    speed: 4000,
    slidesToShow: slideToShow,
    slidesToScroll: 1,
    autoplay: products.length > 1, // Only autoplay if more than 1 product
    autoplaySpeed: 0,
    cssEase: "linear",
    swipeToSlide: true,
    arrows: false,
    centerMode: slideToShow === 1, // Enable center mode when showing only 1 slide
    centerPadding: slideToShow === 1 ? "0px" : "0px", // Adjust padding for center mode
    variableWidth: false, // Ensure consistent width
    adaptiveHeight: true, // Adapt height to content
    responsive: [
      {
        breakpoint: 1420,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          centerMode: false,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          centerMode: false,
        },
      },
      {
        breakpoint: 1050,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          centerMode: false,
        },
      },
      {
        breakpoint: 770,
        settings: {
          slidesToShow: 2.75,
          slidesToScroll: 1,
          centerMode: false,
        },
      },
      {
        breakpoint: 650,
        settings: {
          slidesToShow: 2.5,
          slidesToScroll: 1,
          centerMode: false,
        },
      },
      {
        breakpoint: 570,
        settings: {
          slidesToShow: 2.25,
          slidesToScroll: 1,
          centerMode: false,
        },
      },
      {
        breakpoint: 525,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          centerMode: false,
        },
      },
      {
        breakpoint: 450,
        settings: {
          slidesToShow: 1.75,
          slidesToScroll: 1,
          centerMode: false,
        },
      },
      {
        breakpoint: 400,
        settings: {
          slidesToShow: 1.5,
          slidesToScroll: 1,
          centerMode: false,
        },
      },
      {
        breakpoint: 350,
        settings: {
          slidesToShow: 1.25,
          slidesToScroll: 1,
          centerMode: false,
        },
      },
    ],
  };

  return (
    <div className="lg:max-w-[81vw] max-w-[90vw] mx-[1rem]">
      <Slider {...settings}>
        {products.map((data: any, index: any) => (
          <div
            key={index}
            // className={`w-full h-full justify-between items-center flex flex-row overflow-hidden ${
            className={`px-6 flex ${slideToShow === 1 ? "px-4" : ""}  gap-4`}
          >
            <CardComponent data={data} />
          </div>
        ))}
      </Slider>
    </div>
  );
}
