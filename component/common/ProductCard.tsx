"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
interface ProductCardProps {
  data: any;
}

export default function ProductCard({ data }: ProductCardProps) {
  const url = process.env.NEXT_PUBLIC_PRODUCT_URL;
  const router = useRouter();
  return (
    <Link
      href={`/product/${data?.slug}`}
      onClick={() => {
        setTimeout(() => router.refresh(), 50);
      }}
      className="text-center w-[20.875rem]"
    >
      <div
        className={`bg-[#FAFAFA] rounded-[15px] p-8 flex flex-col items-center text-center  h-[28.75rem]`}
      >
        <div className="relative w-full h-[22rem] mb-6">
          <Image
            src={data?.image ? `${url}/${data?.image}` : `/fallback.png`}
            fill
            alt={data?.title ? data?.title : " Dr.D Pharma Product"}
            className="object-contain"
          />
        </div>
        <h3 className="text-heading font-semibold text-lg md:text-xl leading-snug capitalize align-middle line-clamp-3">
          {data?.details}
        </h3>
      </div>
    </Link>
  );
}
