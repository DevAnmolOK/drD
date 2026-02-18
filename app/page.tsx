import Image from "next/image";
import HeroSection from "../component/homePageComponent/HeroSection";
import TrustedSection from "@/component/homePageComponent/LeadingMedicalSection";
export default function Home() {
  return (
    <>
      <div className="flex min-h-screen flex-colbg-white font-sans flex flex-col">
        <HeroSection />
        <TrustedSection />
        <div className=" h-[10rem] w-full border  border-blue-500 flex items-center justify-center">
          <span className="">Homepage sectopn</span>
        </div>
      </div>
    </>
  );
}
