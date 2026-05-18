import HeroSectionSlider from "./heroSectionSlider";

export default async function HeroSection({ homeBannerSection }: any) {
  const slides = homeBannerSection?.data?.data || [];

  return (
    <div className="relative w-full flex justify-center items-center -mt-[6.35rem]">
      <HeroSectionSlider slides={slides} />
    </div>
  );
}
