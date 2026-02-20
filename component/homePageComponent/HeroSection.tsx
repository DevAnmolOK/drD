import Link from "next/link";
import { title } from "process";
export default async function HeroSection({ homeBannerSection }: any) {
  const {  background,badgeText,buttonLink,description, buttonText,title} = homeBannerSection.data.data || {};

  return (
    <>
      <div className="h-[51rem]  relative w-full flex  justify-center  items-center   border-red-500 -mt-[6.35rem] ">
        <div
          className=" sm:bg-[position:100%_100%] bg-[position:100%_100%] absolute inset-0  bg-no-repeat overflow-hidden sm:bg-[length:101%] max-[640px]:bg-[length:100%] "
          style={{
            backgroundImage: `url(${background?.imageSrc})`,
          }}
        >
          {/* <div className="absolute inset-0 bg-gradient-to-r from-[#006511] to-transparent opacity-100"></div> */}
        </div>
        <div className=" relative z-10  w-full flex text-white  md:mb-0 sm:pb-[3rem] max-w-[101.625rem]  mt-[15rem]">
          <div className="   h-full  items-center justify-center   flex flex-col   lg:mt-[1.25rem]">
            <div className=" flex flex-col pb-[2rem]">
              <h1 className=" text-[5.25rem] align-middle  sm:leading-[1.1190] font-bold     w-[60%] text-white mt-[1rem] sm:mt-0  ">
                {title?.normal}
              </h1>
              <div className="flex sm:flex-row flex-col sm:mt-20 mt-8 w-[40%]  gap-10 ">
                <Link href={buttonLink} className="bg-white cursor-pointer w-[7.125rem] h-fit sm:px-4 py-1 align-middle text-black  flex gap-1 leading-[1.6250] text-base font-normal items-center text-nowrap justify-center cursor-pointer ">  
                  {badgeText}
                </Link>

                <div className=" text-base  leading-[1.6250] font-normal align-middle ">
                 {description}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
