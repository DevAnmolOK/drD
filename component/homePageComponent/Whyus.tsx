import Image from "next/image";
import TagBadge from "../ui/TagBadge";

export default function WhyUs() {
  const data = {
    tag: "Why choose us",
    title:
      "The Best Pharma Company For Franchise & Third Party Manufacturing Services",

    imageLeft: {
      img: "/images/why1.png",
      alt: "Manufacturing",
    },

    imageRight: {
      img: "/images/why2.png",
      alt: "Doctor",
    },

    cards: [
      {
        title: "Monopoly Rights",
        desc: "Dr. D Pharma offers PCD monopoly rights of dedicated and hard-working pharmacists in select locations in India. Our employees are given the opportunity to work independently in their area. We offer an exclusive range of affordable pharmaceutical products to reach more people and to gain more profit.",
      },
      {
        title: "Pharma Franchise",
        desc: "We invite Pharma experts from all over the country to come and be a part of Dr. D Pharma, and start your own company in the pharmaceutical industry. You can get a wide range of different pharmaceutical products for us for pharmaceutical franchise businesses across India.",
      },
      {
        title: "Quality Assurance",
        desc: "The quality of our products makes us reliable and contributes significantly to our success. We have the best quality assurance team and all the products we offer are quality checked. From raw material receiving to pharmaceutical packaging.",
      },
    ],
  };

  return (
    <section className="bg-[#f3f4f6] py-14 px-4 md:px-10">
      <div className="wrapper mx-auto">

        {/* Header */}
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
          {data.cards.slice(1).map((card, i) => (
            <Card key={i} {...card} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* reusable text card */
function Card({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="bg-white rounded-2xl p-6">
      <h3 className="text-[34px] font-normal text-[#253746] mb-3">
        {title}
      </h3>
      <p className="text-sm text-[#626263] leading-relaxed">
        {desc}
      </p>
    </div>
  );
}
