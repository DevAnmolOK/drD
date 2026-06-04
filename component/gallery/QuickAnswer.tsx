import React from "react";
import SectionHeading from "../common/SectionHeading";
import Image from "next/image";
import Accordion from "../ui/Accordian";
interface QuickAnswersProps {
  heading?: any;
  faqData?: any;
  faq_image?: any;
  showImage?: boolean;
}
export default function QuickAnswers({
  heading,
  faqData,
  faq_image,
  showImage = true,
}: QuickAnswersProps) {


  return (
    <div className="bg-[#FAFAFA] relative">
      <div className="wrapper m-auto lg:py-16 py-12 lg:px-0 px-6 h-full">
        <SectionHeading cssClass="text-center" title={heading || "Frequently Asked Questions"} />
        {showImage ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mt-8 h-full">
            <div className="h-full">
              <Accordion data={faqData} />
            </div>

            <div className="relative w-full h-65 sm:h-75 md:h-95 lg:h-97.5">
              {faq_image?.src && (
                <Image
                  src={faq_image.src}
                  alt={faq_image.alt || "FAQ Image"}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="rounded-2xl object-cover"
                  priority
                />
              )}
            </div>
          </div>
        ) : (
          <div className="h-full  mt-8">
            <Accordion data={faqData} />
          </div>
        )}
        {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mt-8 h-full">
          <div className="  h-full">
            <Accordion data={faqData} />
          </div>
          <div className="relative w-full h-65 sm:h-75 md:h-95 lg:h-97.5">
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
        </div> */}
      </div>
    </div>
  );
}
