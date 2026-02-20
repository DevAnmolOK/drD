import Image from "next/image";
import TagBadge from "../ui/TagBadge";

export default function WhyUs({ homeChooseUs }: any) {
  const data = homeChooseUs.data || {};
  return (
    <section className="bg-[#f3f4f6] py-14 px-4 md:px-10">
      <div className="wrapper mx-auto">
        <div className="flex flex-col items-center max-w-[1155px] mx-auto">
          <TagBadge text={data.tag} className="mb-4" />
          <h2 className="text-center text-2xl md:text-[38px] lg:text-[44px] font-medium text-[#2b3a42] mb-10">
            {data.title}
          </h2>
        </div>
        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Left image */}
          <div className="bg-white rounded-2xl overflow-hidden">
            <Image
              src={data.imageLeft.img}
              alt={data.imageLeft.alt}
              width={500}
              height={320}
              className="w-full h-full object-cover"
            />
          </div>

          {/* First card */}
          <Card {...data.cards[0]} />

          {/* Right tall image */}
          <div className="md:row-span-2 bg-white rounded-2xl overflow-hidden">
            <Image
              src={data.imageRight.img}
              alt={data.imageRight.alt}
              width={500}
              height={600}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Remaining cards */}
          {data.cards.slice(1).map((card:any, i:number) => (
            <Card key={i} {...card} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* reusable text card */
function Card({ title, description }: { title: string; description: string }) {
  return (
    <div className="bg-white rounded-2xl p-6">
      <h3 className="text-[34px] font-normal text-[#253746] mb-3">
        {title}
      </h3>
      <p className="text-sm text-[#626263] leading-relaxed">
        {description}
      </p>
    </div>
  );
}
