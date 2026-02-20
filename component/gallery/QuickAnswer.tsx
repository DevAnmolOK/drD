import React from "react";
import SectionHeading from "../common/SectionHeading";
import Image from "next/image";
import Accordion from "../ui/Accordian";

export default function QuickAnswers({ faqSection }: any) {
  const {  heading,  faqData, faq_image } = faqSection || {};
  
  return (
    <div className="bg-[#FAFAFA] relative">
      <div className="wrapper m-auto lg:py-16 py-12 lg:px-0 px-6">
        <SectionHeading cssClass="text-center " title={heading} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mt-8">
          <div className="pt-6 ">
            <Accordion data={faqData} />
          </div>
          <div className="relative w-full h-[260px] sm:h-[300px] md:h-[380px] lg:h-[390px]">
            {faq_image?.src && (
              <Image
                src={faq_image?.src}
                alt={faq_image.alt || "FAQ Image"}
                fill
                className="rounded-2xl object-cover w-full"
                priority
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
