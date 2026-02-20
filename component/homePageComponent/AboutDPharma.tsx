import Image from "next/image";
import { IoIosCheckmark } from "react-icons/io";
import TagBadge from "../ui/TagBadge";
import Button from "../ui/Button";

// const aboutData = {
//   tag: "ABOUT DR. PHARMA",
//   title: {
//     line1: "India’s Best",
//     line2: "Pharmaceutical Company",
//   },
//   description: `Dr. D Pharma is an ISO certified Company that was established in 2010 and has been famous for bringing quality-oriented pharmaceutical products into the market. With the help of our skilled and dedicated co-operations across India, we have gained a great position as the India's Best Pharmaceutical Company. The firm is nationally known for its effective, quality, durable and efficient medicines which are available at the affordable rates. We have more the 800+ Pharma products in various sections like tablets, capsules, injections, etc. `,
//   features: [
//     "3 Factories ,36400㎡ covering, 150+ workers",
//     "professional quality inspection teams",
//     "Focus on Sustainability",
//     "Product Design & Development",
//   ],
//   images: {
//     main: "/images/homePage/about01.jpg",
//     badge: "/images/homePage/aboutlogo.png",
//     illustration: "/images/homePage/dAbout1.svg",
//     side: "/images/homePage/dAbout.jpg",
//   },
//   cta: {
//     lable: "",
//     href: "",
//   },
// };

export default function AboutDPharma({ homeAboutData }: any) {
    const aboutData = homeAboutData?.data || {};
    
  return (
    <section className="bg-[#fff] py-16">
      <div className="wrapper m-auto px-6 lg:px-0 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-[45%_50%] gap-y-12 lg:gap-[5%] items-start">
        <div className="space-y-4 m-auto lg:m-0 w-full">
          <div className="relative">
            <div className="relative w-full h-[540px] rounded-[16px] overflow-hidden">
              <Image
                src={aboutData.images.main}
                alt="Lab Team"
                fill
                className="object-cover"
                sizes="(max-width:768px) 100vw, 520px"
              />
            </div>

            <div className="absolute -bottom-12 left-1/2 z-10 -translate-x-1/2">
              <Image
                src={aboutData.images.badge}
                alt="Badge"
                width={120}
                height={120}
                className="object-contain"
              />
            </div>
          </div>

          {/* Illustration */}
          <div className="absolute mt-25 w-full max-w-[824px] h-[154px] hidden lg:block ">
            <Image
              src={aboutData.images.illustration}
              alt="Illustration"
              fill
              className="object-cover "
            />
          </div>
        </div>

        {/* RIGHT */}
        <div className="space-y-6 w-full">
          <TagBadge text={aboutData.tag} />

          <h2 className="text-3xl lg:text-[48px]  text-[##253746] leading-tight font-normal">
            {aboutData.title.line1} <br />
            <span className="font-bold lg:text-[43px] text-2xl">
              {aboutData.title.line2}
            </span>
          </h2>
          <p className="text-[#626263] leading-relaxed text-base">
            {aboutData.description}
          </p>
          <div className="flex flex-col md:flex-row items-start gap-6 pt-4 md:justify-between">
            <div>
              <ul className="space-y-3  text-[#626263] text-base">
                {aboutData.features.map((item:any, i:number) => (
                  <li key={i} className="flex items-center gap-3">
                    <span className="w-6 h-6 bg-[#EE4223] rounded-full flex justify-center items-center ">
                      <IoIosCheckmark size={20} className="text-white" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>

              {/* <button className='bg-[#0c2d48] mt-8 text-white px-6 py-3 rounded-full flex items-center gap-2 hover:bg-[#0a243b] transition'>
                About Us
                <span className='w-6 h-6 rounded-full bg-red-500 flex items-center justify-center text-sm'>
                  →
                </span>
              </button> */}
              <Button href="/about" className="mt-8">About Us</Button>
            </div>

            {/* Side Image */}
            <div className="hidden md:block">
              <div className="relative w-[220px] sm:w-[260px] lg:w-[300px] aspect-[398/538] rounded-[16px] overflow-hidden shadow-md">
                <Image
                  src={aboutData.images.side}
                  alt="Pharmacist"
                  fill
                  className="object-cover"
                  sizes="(max-width:640px) 220px, (max-width:1024px) 260px, 300px"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
