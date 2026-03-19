"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
export default function HeroLeft({ heroData }: any) {
  const router = useRouter();

  return (
    <div>
      <span className="inline-block bg-gray-100 text-gray-700 text-sm px-4 py-1 rounded-full mb-6">
        {heroData.badge}
      </span>
      <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6 text-black">
        {heroData.title}
      </h1>
      <p className="text-lg text-gray-700 mb-8  onest">
        {heroData?.description}
      </p>

      {/* Buttons */}
      <div className="flex flex-wrap gap-4 mb-12">
        {heroData.buttons.map((btn: any, i: number) => (
          <Link
            href={btn.href}
            key={i}
            className={
              btn.variant === "primary"
                ? "bg-secondary  text-white px-6 py-3 rounded-lg font-semibold cursor-pointer "
                : "bg-gray-100 text-black px-6 py-3 rounded-lg font-semibold cursor-pointer "
            }
          >
            {btn.label}
          </Link>
        ))}
      </div>

      {/* Feature Boxes */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {heroData.features.map((item: any, i: number) => (
          <div
            key={i}
            className=" bg-white rounded-xl border border-gray-200  py-6 px-4 text-center flex flex-col justify-between min-h-35  shadow-sm hover:shadow-md transition
      "
          >
            <div>
              <div className="bg-secondary  text-white text-sm font-semibold inline-block px-4 py-1.5 rounded-full mb-4">
                {item.title}
              </div>

              <p className="text-sm text-gray-600 leading-relaxed">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
