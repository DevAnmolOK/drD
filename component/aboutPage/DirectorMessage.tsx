import Image from "next/image";

export default function DirectorMessage({ directorMessageData }: any) {
  const data = directorMessageData;

  return (
    <section className="bg-black text-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="rounded-[15px] overflow-hidden border border-white/10">
            {data.image?.src && (
              <Image
                src={data.image?.src}
                alt={data.image?.alt || "Director"}
                width={700}
                height={520}
                className="w-full object-cover"
              />
            )}
          </div>
          <div className="flex flex-col gap-6">
            <p className="uppercase tracking-[0.25em] text-white/60 text-sm">
              {data.badgeText}
            </p>
            <h2 className="font-serif text-4xl lg:text-5xl leading-tight">
              {data.heading}
            </h2>
            {data.messageParagraphs?.[0] && (
              <p className="italic text-white/80 leading-relaxed">
                “{data.messageParagraphs[0]}”
              </p>
            )}
            {data.messageParagraphs?.slice(1).map((p: string, i: number) => (
              <p key={i} className="text-white/80 leading-relaxed">
                {p}
              </p>
            ))}
            <div className="pt-4">
              <p className="font-serif text-xl">{data.signature?.name}</p>
              <p className="uppercase tracking-widest text-sm text-white/60">
                {data.signature?.designation}
              </p>
            </div>
          </div>
        </div>
        <div className="text-center mt-16 max-w-4xl mx-auto">
          <p className="font-serif text-xl mb-4">{data.bottomTitle}</p>
          <p className="text-white/70 leading-relaxed">
            {data.bottomDescription}
          </p>
        </div>
      </div>
    </section>
  );
}
