import Image from "next/image";
export default function VisionMission({ visionMissionData }: any) {
  return (
    <section className="w-full py-12">
      <div className="wrapper m-auto px-6 lg:px-0">
        <div className="grid md:grid-cols-2 rounded-3xl overflow-hidden shadow-sm">
          {visionMissionData.map((item:any, index:number) => {
            // const isDark = item.variant === "dark";
            const isDark = index === 0;

            return (
              <div
                key={item.id}
                className={`p-10 md:p-14 flex flex-col justify-center gap-6
                ${isDark ? "bg-black text-white" : "bg-gray-100 text-black"}`}
              >
                <div>
                  <Image
                    src={item.icon}
                    alt={item.title}
                    width={42}
                    height={42}
                    className="w-10 h-10"
                  />
                </div>
                <h2 className="text-3xl md:text-4xl font-serif font-semibold">
                  {item.title}
                </h2>
                <p
                  className={`text-lg leading-relaxed max-w-xl
                  ${isDark ? "text-white/80" : "text-black/70"}`}
                >
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}