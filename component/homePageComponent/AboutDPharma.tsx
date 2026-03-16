import Image from "next/image";
import { IoIosCheckmark } from "react-icons/io";
import TagBadge from "../ui/TagBadge";
import Button from "../ui/Button";

export default function AboutDPharma({ homeAboutData }: any) {
  const aboutData = homeAboutData?.data || {};
  const { cta } = aboutData || {};

  return (
    <section className="bg-[#fff] py-12 md:py-16">
      <div className="wrapper m-auto">
        <div
          className="
      grid grid-cols-1 gap-10 
      md:[grid-template-columns:1.5fr_1fr_1fr] 
      md:[grid-template-rows:auto_auto_auto]
      md:gap-15
      md:[grid-template-areas:'one_four_four''one_five_three''two_two_three']
      items-center
    "
        >
          {/* AREA FOUR - Moved up in DOM for better mobile hierarchy (Text first) */}
          <div className="md:[grid-area:four] self-start">
            <TagBadge text={aboutData.tag} />
            <h2 className="text-3xl lg:text-[3rem] text-[#253746] leading-tight font-normal mt-2">
              {aboutData.title.line1} <br />
              <span className="font-bold lg:text-[3rem] text-2xl">
                {aboutData.title.line2}
              </span>
            </h2>
            <p className="text-[#626263] leading-relaxed text-base mt-4">
              {aboutData.description}
            </p>
          </div>

          {/* AREA ONE - Main Image */}
          <div className="md:[grid-area:one] flex flex-col items-start">
            <div className="w-full">
              <div className="relative w-full rounded-2xl overflow-hidden">
                {aboutData.images.main && (
                  <Image
                    src={aboutData.images.main}
                    alt="Lab Team"
                    width={532}
                    height={653}
                    className="w-full h-auto object-contain"
                  />
                )}
              </div>
              <div className="relative hidden md:flex justify-center w-full">
                <div className="absolute bottom-5 left-1/2 -translate-x-1/2 translate-y-1/2">
                  {aboutData.images.badge && (
                    <Image
                      src={aboutData.images.badge}
                      alt="Badge"
                      width={120}
                      height={120}
                      className="w-16 sm:w-20 md:w-30 h-auto object-contain"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* AREA FIVE - Features */}
          <div className="md:[grid-area:five] self-start">
            <ul className="space-y-4 text-[#626263] text-base">
              {aboutData?.features?.map((item: any, i: number) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-[#EE4223] rounded-full flex-shrink-0 flex items-center justify-center mt-0.5">
                    <IoIosCheckmark size={18} className="text-white" />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div>
              <Button href={cta?.href} className="mt-8">
                {cta?.lable}
              </Button>
            </div>
          </div>

          {/* AREA THREE - Side Image (Hidden on Mobile) */}
          <div className="md:[grid-area:three] hidden md:flex justify-end self-start">
            {/* <div className="relative w-full rounded-[14px] overflow-hidden">
              <Image
                src={aboutData.images.side}
                alt="Pharmacist"
                width={398}
                height={598}
                className="object-contain "
              />
            </div> */}
            <div className="relative w-full max-w-99.5 rounded-[14px] overflow-hidden">
              {aboutData.images.side && (
                <Image
                  src={aboutData.images.side}
                  alt="Pharmacist"
                  width={398}
                  height={598}
                  className="w-full h-auto object-contain"
                />
              )}
            </div>
          </div>

          {/* AREA TWO - Illustration (Hidden on Mobile) */}
          <div className="md:[grid-area:two] hidden lg:block self-start ">
            {aboutData.images.illustration && (
              <Image
                src={aboutData.images.illustration}
                alt="Illustration"
                width={829}
                height={217}
                className="w-full max-w-207.25 object-cover"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
