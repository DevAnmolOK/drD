"use client";

import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface CenterSliderProps {
  children: React.ReactNode;
}

export default function HeroSectionSlider({ children }: CenterSliderProps) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "0px",
    slidesToShow: 1,
    speed: 2000,
    arrows: false,
    dots: false,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    fade: true,
    slidesToScroll: 1,
    waitForAnimate: false,
    // responsive: [
    //   {
    //     breakpoint: 1024,
    //     settings: { slidesToShow: 2, centerPadding: "40px" },
    //   },
    //   {
    //     breakpoint: 768,
    //     settings: { slidesToShow: 2, centerPadding: "20px" },
    //   },
    //   {
    //     breakpoint: 640,
    //     settings: { slidesToShow: 1, centerPadding: "0px" },
    //   },
    // ],
  };

  return (
    <div className=" w-full ">
      <Slider {...settings}>
        {React.Children.map(children, (child, i) => (
          <div key={i} className="outline-none ">
            {child}
          </div>
        ))}
      </Slider>
    </div>
  );
}
