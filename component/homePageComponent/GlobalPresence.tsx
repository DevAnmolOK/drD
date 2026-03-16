import Image from "next/image";
import TagBadge from "../ui/TagBadge";
import Button from "../ui/Button";
import { FaLocationDot } from "react-icons/fa6";

export default function GlobalPresence({ homeGlobalFootprint }: any) {
  const { data } = homeGlobalFootprint || {};
  const { title_start, title_bold, title_end, embedMaps } = data || {};
  const { first_source, second_source } = embedMaps || {};

  const getLocationsFromUrl = (url: string) => {
    const match = url.match(/q=([^&]+)/);
    if (!match) return [];
    const decoded = decodeURIComponent(match[1]);
    return decoded.split("|");
  };

  const locations = getLocationsFromUrl(first_source);

  return (
    <section className="bg-white py-16 ">
      <div className="wrapper m-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-10">
          <div>
            <TagBadge text={data.tag} className="mb-4" />
            <h2 className="text-2xl lg:text-[3rem] font-medium text-[#253746] ">
              {title_start} <span className="font-bold">{title_bold}</span>{" "}
              {title_end}
            </h2>
          </div>
          <div className="mt-6 md:mt-0">
            <Button href={data.card.button.href}>
              {data.card.button.label}
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch ">
          <div className="lg:col-span-2  flex flex-col items-center ">
            <div className="w-full  space-y-12">
              <div>
                <div className="overflow-hidden">
                  {second_source && (
                    <iframe
                      title="Global Presence"
                      width="100%"
                      height="420"
                      loading="lazy"
                      src={second_source}
                      allowFullScreen
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  )}
                </div>
                <div className="text-center flex justify-center py-4 flex-col">
                  {locations?.map((loc: any) => {
                    return (
                      <h3 className="text-sm font-medium text-black border border-[#0f2a3c]/30 rounded-full max-w-80 m-auto  px-4 py-2 mt-4">
                        <FaLocationDot
                          className="inline-block mr-2 text-red-600"
                          size={18}
                        />
                        {loc}
                      </h3>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Info Card */}
          <div className="rounded-[15px] text-white bg-[#0f2a3c]  flex items-center justify-center p-8 ">
            <div>
              {data.card.icon && (
                <Image
                  src={data.card.icon}
                  alt="location"
                  width={72}
                  height={72}
                  className="w-12 h-12 sm:w-14 sm:h-14 md:w-15 md:h-15 lg:w-18.75 lg:h-18.75 mb-6 object-contain"
                />
              )}
              <p className="text-2xl md:text-[2rem] leading-relaxed text-white font-normal ">
                {data.card.text}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
