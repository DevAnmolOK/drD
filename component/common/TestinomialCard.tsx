import Image from "next/image";

export default function TestimonialCard(data: {
  rating: number;
  title: string;
  text: string;
  user: {
    name: string;
    company: string;
    avatar: string;
  };
}) {
  return (
    <div className="relative w-[320px]">
      <div className="bg-[#FFFFFF] rounded-[24px] p-6 pb-10 shadow-sm">
        <div className="flex gap-1 mb-2">
          {Array.from({ length: data.rating }).map((_, i) => (
            <span key={i} className="text-[#FEAF06]">
              ★
            </span>
          ))}
        </div>

        <h3 className="text-[#282725] font-normal text-lg mb-4">{data.title}</h3>

        <div className="border-t border-gray-300 mb-4"></div>

        <p className="text-[#5C5D5E] text-base leading-relaxed font-normal">“{data.text}”</p>
      </div>

      {/* User */}
      <div className="flex items-center gap-3 mt-4 pl-6">
        <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow">
          <Image
            src={data.user.avatar}
            alt={data.user.name}
            fill
            className="object-cover"
          />
        </div>

        <div className="text-sm">
          <div className="text-[#253746] font-medium">{data.user.name}</div>
          <div className="text-[#626263]">{data.user.company}</div>
        </div>
      </div>
    </div>
  );
}
