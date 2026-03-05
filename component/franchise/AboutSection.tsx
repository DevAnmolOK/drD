import { IoCheckmarkDoneSharp } from "react-icons/io5";

export default function AboutSection({ aboutData }: any) {
  return (
    <section className="bg-color-secondary py-16 ">
      <div className="wrapper m-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
            {aboutData.title}
          </h2>

          <p className="text-gray-700 leading-relaxed mb-10">
            {aboutData.description}
          </p>

          <div className="space-y-8">
            {aboutData.points.map((item: any, i: any) => (
              <div key={i} className="flex gap-4 ">
                <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center shrink-0">
                  <IoCheckmarkDoneSharp size={18} className="text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-black mb-1">
                    {item.title}
                  </h4>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-[#1f2e41] rounded-2xl p-8 shadow-md border border-gray-200">
          <h3 className="text-xl font-bold text-white mb-8">
            {aboutData.highlight}
          </h3>
          <div className="grid sm:grid-cols-2 gap-6 mb-8">
            {aboutData.highlights.map((item: any, i: number) => (
              <div
                key={i}
                className="border border-white/20 rounded-xl p-6 text-center bg-[#1f2e41]"
              >
                <span className="inline-block bg-secondary text-white text-xs font-semibold px-4 py-1 rounded-full mb-3">
                  {item.badge}
                </span>
                <p className="text-sm text-white">{item.text}</p>
              </div>
            ))}
          </div>
          <p className="text-sm text-white leading-relaxed">
            {aboutData.footer}
          </p>
        </div>
      </div>
    </section>
  );
}
