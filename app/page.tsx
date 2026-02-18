import Image from 'next/image';
import HeroSection from '../component/homePageComponent/HeroSection';
import TrustedSection from '@/component/homePageComponent/LeadingMedicalSection';
import AboutDPharma from '@/component/homePageComponent/AboutDPharma';
import ProductCategories from '@/component/homePageComponent/ProductCatogries';
import ProductRange from '@/component/homePageComponent/ProductRange';
import DirectorDivisions from '@/component/homePageComponent/DirectorDivisions';
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
        {/* <div className=' h-[10rem] w-full border  border-blue-500 flex items-center justify-center'>
          <span className=''>Homepage sectopn</span>
        </div> */}
      </div>
    </>
  );
}
