import Image from 'next/image';
import HeroSection from '../component/homePageComponent/HeroSection';
import TrustedSection from '@/component/homePageComponent/LeadingMedicalSection';
import AboutDPharma from '@/component/homePageComponent/AboutDPharma';
import ProductCategories from '@/component/homePageComponent/ProductCatogries';
import ProductRange from '@/component/homePageComponent/ProductRange';
import DirectorDivisions from '@/component/homePageComponent/DirectorDivisions';
import PcdFranchise from '@/component/homePageComponent/PcdFranchise';
import ManifacturingPartners from '@/component/homePageComponent/ManifacturingPartners';
import WhyUs from '@/component/homePageComponent/Whyus';
import GlobalPresence from '@/component/homePageComponent/GlobalPresence';
export default function Home() {
  return (
    <>
      <div className='flex min-h-screen flex-colbg-white font-sans flex flex-col'>
        <HeroSection />
        <AboutDPharma />
        <ProductCategories />
        <TrustedSection />
        <ProductRange />
        <DirectorDivisions />
        <PcdFranchise/>
        <ManifacturingPartners/>
        <WhyUs/>
        <GlobalPresence/>
      </div>
    </>
  );
}
