import Link from "next/link";
import { publicMediaUrl } from "@/lib/publicMediaUrl";
import { MdOutlineArrowDownward } from "react-icons/md";
import Breadcrumb from "../schema/BreadCrumbs";

interface CommonHeroSectionProps {
  heroSectionData: any;
}
export default function CommonHeroSection({
  heroSectionData,
}: CommonHeroSectionProps) {
  return (
    <section>
      <div className="relative min-h-112.5 overflow-hidden bg-[#1e293b] pt-[7.5rem] md:pt-[8.5rem] pb-20">
        {heroSectionData?.background?.imageAlt && (
          <img
            alt={heroSectionData?.background?.imageAlt || "logo"}
            className="absolute inset-0 w-full h-full object-cover opacity-40"
            src={publicMediaUrl(
              heroSectionData?.background?.imageSrc || "/images/fallback.png",
            )}
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-r from-[#1e293b] via-[#1e293b]/70 to-transparent"></div>
        <div className="relative wrapper mx-auto z-10 w-full">
          <div className="">
            <div className=" bg-red-900/50 w-fit px-4 py-2 rounded-full text-white text-xs font-light mb-6">
              <Breadcrumb customBread={false} />
            </div>
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-white leading-tight mb-6">
              {heroSectionData?.title?.normal}{" "}
              {heroSectionData?.title?.highlight && (
                <span className="text-[#e11d48] italic">
                  {heroSectionData?.title?.highlight}
                </span>
              )}
            </h1>
            {heroSectionData?.description && (
              <p className="text-xl text-slate-300 leading-relaxed mb-8">
                {heroSectionData?.description}
              </p>
            )}
            <div className="flex flex-wrap gap-4">
              <Link
                href={`${heroSectionData?.buttonLink}`}
                className="rounded-full px-6 py-3  bg-secondary text-white align-middle leading-[1.4063]  text-base font-semibold  hover:bg-red-700 transition flex items-center z-0 "
              >
                {heroSectionData?.buttonText}{" "}
                <span className="material-symbols-outlined text-xl">
                  <MdOutlineArrowDownward />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

//check
