import Image from "next/image";

interface ProductCardProps {
  image: string;
  name: string;
  className?: string;
}

export default function ProductCard({
  image,
  name,
  className = "",
}: ProductCardProps) {
  return (
    <div
      className={`bg-[#FAFAFA] rounded-[15px] p-8 flex flex-col items-center text-center ${className} `}
    >
      <div className="relative w-[180px] h-[220px] mb-6">
        <Image
          src={image}
          alt={name}
          fill
          className="object-contain"
        />
      </div>
      <h3 className="text-[#000] font-semibold text-lg md:text-2xl leading-snug">
        {name}
      </h3>
    </div>
  );
}
