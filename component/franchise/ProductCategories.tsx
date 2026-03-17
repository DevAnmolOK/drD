// components/ProductCategories.tsx
import Link from "next/link";
export default function ProductCategories({ data }: any) {
  return (
    <section className="bg-white py-16 px-6">
      <div className="wrapper m-auto">
        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
            {data.title}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">{data.subheading}</p>
        </div>
        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {data.categories.map((item: any, i: number) => (
            <Link
              href={item?.link}
              key={i}
              className="
                bg-white
                p-6
                rounded-2xl
                border border-white/20
                shadow-sm
                hover:shadow-md
                transition
                min-h-[180px]
                flex flex-col
              "
            >
              <h3 className="text-lg font-semibold text-black mb-3">
                {item.title}
              </h3>

              <p className="text-sm text-gray-600 leading-relaxed">
                {item.desc}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
