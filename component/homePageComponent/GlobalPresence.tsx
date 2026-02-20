import Image from "next/image";
import TagBadge from "../ui/TagBadge";
import Button from "../ui/Button";

export default function GlobalPresence({ homeGlobalFootprint }: any) {
  const {data} = homeGlobalFootprint || {};

  // const data = {
  //   tag: "GLOBAL FOOTPRINT",
  //   title: "Global Presence Trusted Worldwide",

  //   map: "/images/mapbg.png",

  //   locations: [
  //     "Jammu & Kashmir, India",
  //     "Solan, Himachal Pradesh, India",
  //   ],

  //   card: {
  //     icon: "/SVG/map-icon.svg",
  //     text: "We are steadily expanding our global footprint by delivering high-quality, reliable, and affordable healthcare solutions across international markets.",
  //     button: {
  //       label: "Learn More",
  //       href: "/about",
  //     },
  //   },
  // };

  return (
    <section className="bg-[#f5f6f7] py-16 px-4 md:px-10">
      <div className="wrapper m-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-10">
          <div>
            <TagBadge text={data.tag} className="mb-4" />
            <h2 className="text-2xl lg:text-[43px] font-medium text-[#253746] ">
              Global Presence <span className="font-bold">Trusted</span> Worldwide
            </h2>
          </div>
          <div className="mt-6 md:mt-0">
            <Button href={data.card.button.href}>
              {data.card.button.label}
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          
          {/* Map */}
          <div className="lg:col-span-2  p-4 flex flex-col items-center">
            <Image
              src={data.map}
              alt="World Map"
              width={900}
              height={450}
              className="w-full h-auto object-cover "
            />

            {/* Locations */}
            {/* <div className="flex flex-wrap justify-end flex-col gap-3">
              {data.locations.map((loc, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-full text-sm text-[#2b3a42] shadow-sm"
                >
                  <span className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-white text-[10px]">
                    📍
                  </span>
                  {loc}
                </div>
              ))}
            </div> */}
          </div>

          {/* Info Card */}
          <div className="rounded-[15px]  text-white  bg-[#0f2a3c]  flex items-center justify-center p-8">
            
            <div>
              <Image
                src={data.card.icon}
                alt="location"
                width={72}
                height={72}
                className="mb-6"
              />

              <p className="text-[32px] leading-relaxed text-white font-normal">
                {data.card.text}
              </p>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
