"use client";
import Image from "next/image";

interface ProductCardProps {
  data: {
    image: string;
    name: string;
  };
  className?: string;
}

export default function ProductCard({
  data,
  className = "",
}: ProductCardProps) {
  return (
    <div
      className={`bg-[#FAFAFA] rounded-[15px] p-8 flex flex-col items-center text-center ${className} `}
    >
      <div className="relative w-[11.25em] h-[13.75rem] mb-6">
        <Image
          src={data?.image}
          alt={data?.name}
          fill
          className="object-contain"
        />
      </div>
      <h3 className="text-[#000] font-semibold text-lg md:text-2xl leading-snug">
        {data?.name}
      </h3>
    </div>
  );
}
