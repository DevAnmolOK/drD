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
import { HomePageEndPoints } from "@/lib/service/HomePageEndPoints";

export default  async function Home() {
  const homeBannerSection = await HomePageEndPoints.homeBannerSection();
  const homeAboutData = await HomePageEndPoints.homeAbout();
  const homeDirectorData = await HomePageEndPoints.homeDirectorData();
  const homeTrustedBy = await HomePageEndPoints.homeTrustedBy();  
  const homeCategories = await HomePageEndPoints.homeCategories();
  const homeProductRange = await HomePageEndPoints.homeProductRange();
  const homeLifeEasy = await HomePageEndPoints.homeLifeEasy();
  const homeManufacturingPartners = await HomePageEndPoints.homeManufacturingPartners();
  const homeChooseUs = await HomePageEndPoints.homeChooseUs();
  const homeBlogs = await HomePageEndPoints.homeBlogs();
  const homeTestimonials = await HomePageEndPoints.homeTestimonials();
  const homeOurStrengths = await HomePageEndPoints.homeOurStrengths();
  const homeGlobalFootprint = await HomePageEndPoints.homeGlobalFootprint();
  const homeProductListing = await HomePageEndPoints.homeProductListing();

  return (
    <>
      <HeroSection homeBannerSection={homeBannerSection} />
      <AboutDPharma homeAboutData={homeAboutData} />
      <ProductCategories homeCategories={homeCategories}/>
      <TrustedSection  homeTrustedBy={homeTrustedBy}/>
      <ProductRange homeProductRange={homeProductRange} />
      <DirectorDivisions homeDirectorData={homeDirectorData} />
      <PcdFranchise  homeLifeEasy={homeLifeEasy}/>
      <ManifacturingPartners homeManufacturingPartners={homeManufacturingPartners} />
      <WhyUs homeChooseUs={homeChooseUs} />
      <GlobalPresence homeGlobalFootprint={homeGlobalFootprint} />
      <OurStrengths homeOurStrengths={homeOurStrengths}/>
      <ProductList homeProductListing={homeProductListing}/>
      <PtrPtsCalculator />
      <Reviews  homeTestimonials={homeTestimonials}/>
      <LatestBlogs homeBlogs={homeBlogs} />
    </>
  );
}
