"use client";
import Image from "next/image";
import Link from "next/link";
// import { calculatePtsPtr } from "@/utils/pharmaPricing";/
import { useRouter } from "next/navigation";

interface ProductCardProps {
  data: any;
}
export default function ProductCard({ data }: ProductCardProps) {
  //   const { ptr, pts } = calculatePtsPtr(data?.mrp, {
  //     gstRate: data?.gst || 12,
  //     retailerMargin: 20,
  //     stockistMargin: 10,
  //   });
  const url = process.env.NEXT_PUBLIC_PRODUCT_URL;
  const imageUrl = data.image ? `${url}/${data.image}` : "/fallback.png";
  // : "/images/placeholder.jpg";
  // console.log("data", data);
  const router = useRouter();
  return (
    <>
      <Link
        href={`/product/${data.slug}`}
        onClick={() => {
          setTimeout(() => router.refresh(), 50);
        }}
      >
        <div className="relative max-w-[37rem] h-[15rem] hover:border  bg-white custom-shadow border-[#e8e8e8] flex  p-[1rem] rounded-[1rem] overflow-hidden">
          <div className="absolute z-30 -top-5 -right-12.5 w-24 h-6 bg-secondary text-white text-center text-xs font-semibold leading-[1.5rem] transform rotate-[45deg] origin-top-left shadow">
            {data.type}
          </div>

          <div className=" w-full flex">
            <div className=" w-full  flex  justify-between ">
              <div className="w-[60%] ">
                <div className="w-full flex flex-col-reverse justify-between  h-fit  mb-[0.5rem] gap-1">
                  <div className=" font-normal text-black text-pbase">
                    {data.division}
                  </div>
                </div>
                <div className=" flex item-center  ">
                  <h2 className=" my-[0.25rem] font-semibold text-pxl line-clamp-1">
                    {data.name}
                  </h2>
                  <div className=" flex items-center">
                    {data?.newlaunched && (
                      <div className=" text-pxs bg-secondary/80 text-black animate-pulse shadow-lg ml-[1rem] text-nowrap flex items-center font-medium px-3 py-0.5 rounded-[0.25rem] text-primary2 line-clamp-1">
                        New Launch !
                      </div>
                    )}
                    {data?.upcoming && (
                      <div className=" text-pxs bg-secondary/80 text-black animate-pulse shadow-lg ml-[1rem] flex items-center text-nowrap  font-medium px-3 py-0.5 rounded-[0.25rem] text-primary2">
                        Upcomming !
                      </div>
                    )}
                  </div>
                </div>
                <p className="mb-[0.25rem] text-subitle text-dt line-clamp-1 font-medium ">
                  {data.composition}
                </p>
                <p className=" mb-[0.5rem] text-subitle text-dt font-medium">
                  {data.packing} {data.packingType}
                </p>

                <p className=" text-subitle text-dt font-medium mb-1">
                  Min.Qty:{" "}
                  <span className=" font-semibold text-secondary text-xl ml-1">
                    {data.moq ? data.moq : "Na"}
                  </span>
                </p>
                {/* <p className=" text-subitle text-dt font-medium">
                  MRP:{" "}
                  <span className=" font-semibold text-primary2 text-pbase">
                    ₹{data.mrp}
                  </span>
                </p> */}

                {/* <div className=" flex item-center w-[70%] justify-between">
                  <p className="w-[50%] text-subitle text-dt font-medium">
                    PTS:{" "}
                    <span className=" font-semibold text-primary2 text-pbase">
                      {ptr}
                    </span>
                  </p>
                  <p className="w-[50%] text-subitle text-dt font-medium">
                    PTR:{" "}
                    <span className=" font-semibold text-primary2 text-pbase">
                      {pts}
                    </span>
                  </p>
                </div> */}
              </div>
              <div className="w-[40%]   flex items-center justify-center rounded-[0.75rem] border   border-gray-100 bg-gray-50">
                <div className="relative aspect-square w-[12rem] overflow-hidden">
                  <Image
                    src={imageUrl}
                    alt={data.name}
                    fill
                    className="object-contain "
                    quality={100}
                    sizes="11rem"
                    unoptimized={true}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
}
