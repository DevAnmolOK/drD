import React from "react";
import HeroLeft from "./HeroLeft";
import ContactForm from "../contact/ContactForm";

export default function HeroSection() {
  return (
    <div className="wrapper m-auto py-16 px-6 lg:px-0 ">
      <div className="grid grid-cols-1 gap-15 md:grid-cols-[55%_40%] md:gap-[5%] items-center">
        <HeroLeft />
        <div className=" shadow-md  rounded-2xl p-6">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
