import Image from "next/image";
import TagBadge from "../ui/TagBadge";

export default function WhyUs({ homeChooseUs }: any) {
  const data = homeChooseUs.data || {};
  return (
    <section className="bg-color-secondary py-14  ">
      <div className="wrapper mx-auto">
        <div className="flex flex-col items-center max-w-[1155px] mx-auto">
          <TagBadge text={data.tag} className="mb-4" />
          <h2 className="text-2xl sm:text-3xl lg:text-[42px] leading-tight text-[#253746] py-2 text-center pb-4">
            {data.left_title}
            <span className="font-semibold mx-2">{data.bold_title}</span>
            <br />
            {data.right_title}
          </h2>
        </div>
        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl overflow-hidden">
            {data.imageLeft.img && (
              <Image
                src={data.imageLeft.img}
                alt={data.imageLeft.alt}
                width={500}
                height={320}
                className="w-full h-full object-cover"
              />
            )}
          </div>

          {/* First card */}
          <Card {...data.cards[0]} />
          <div className="md:row-span-2 bg-white rounded-2xl overflow-hidden">
            {data.imageRight.img && (
              <Image
                src={data.imageRight.img}
                alt={data.imageRight.alt}
                width={500}
                height={600}
                className="w-full h-full object-cover"
              />
            )}
          </div>
          {data.cards.slice(1).map((card: any, i: number) => (
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
      <h3 className="text-2xl md:text-[2.125rem] font-normal text-[#253746] mb-3">
        {title}
      </h3>
      <p className="text-sm text-[#626263] leading-relaxed">{description}</p>
    </div>
  );
}
