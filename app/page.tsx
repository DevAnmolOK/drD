import Image from "next/image";
import HeroSection from "../component/homePageComponent/HeroSection";
import TrustedSection from "@/component/homePageComponent/LeadingMedicalSection";
import AboutDPharma from "@/component/homePageComponent/AboutDPharma";
import ProductCategories from "@/component/homePageComponent/ProductCatogries";
import ProductRange from "@/component/homePageComponent/ProductRange";
import DirectorDivisions from "@/component/homePageComponent/DirectorDivisions";
import PcdFranchise from "@/component/homePageComponent/PcdFranchise";
import ManifacturingPartners from "@/component/homePageComponent/ManifacturingPartners";
import WhyUs from "@/component/homePageComponent/Whyus";
import GlobalPresence from "@/component/homePageComponent/GlobalPresence";
import OurStrengths from "@/component/homePageComponent/OurStrengths";
import ProductList from "@/component/homePageComponent/ProductList";
import Reviews from "@/component/homePageComponent/Reviews";
import PtrPtsCalculator from "@/component/homePageComponent/CalculatorPTR";
import LatestBlogs from "@/component/homePageComponent/LatestBlogs";
export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutDPharma />
      <ProductCategories />
      <TrustedSection />
      <ProductRange />
      <DirectorDivisions />
      <PcdFranchise />
      <ManifacturingPartners />
      <WhyUs />
      <GlobalPresence />
      <OurStrengths />
      <ProductList />
      <PtrPtsCalculator />
      <Reviews />
      <LatestBlogs/>
    </>
  );
}
