import Image from "next/image";
export default function CoreValues({ coreValuesData }: any) {
  
  return (
    <section className="py-16 bg-color-secondary">
      <div className="wrapper m-auto px-6 lg:px-0">
        <h2 className="text-center text-3xl md:text-4xl font-serif font-semibold mb-12">
          Our Core Values
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {coreValuesData.map((item: any) => (
            <div
              key={item.title}
              className="bg-white rounded-2xl p-8 flex flex-col gap-4
                         hover:shadow-md transition"
            >
              <Image
                src={item.icon}
                alt={item.title}
                width={42}
                height={42}
                className="w-10 h-10"
              />
              <h3 className="text-xl font-semibold text-[#1f2a44] font-serif">
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed text-[#444]">
                {item.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}