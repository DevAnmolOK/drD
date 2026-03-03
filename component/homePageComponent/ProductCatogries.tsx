import Image from "next/image";

// const categories1 = [
//   {
//     type: 'intro',
//     title: `Our Product Categories Different categories of product range`,
//     icon: '/SVG/iconcat.png',
//   },
//   {
//     title: 'Pediatric Range',
//     image: '/images/homePage/proCat1.png',
//   },
//   {
//     title: 'Antibiotics Range',
//     image: '/images/homePage/abtibiotic.png',
//   },
//   {
//     title: 'Orthopedic Range',
//     image: '/images/homePage/ortho.png',
//   },
//   {
//     title: 'Injectable Range',
//     image: '/images/homePage/injec.png',
//   },
//   {
//     title: 'Gynecology Range',
//     image: '/images/homePage/gyno.png',
//   },
// ];

export default function ProductCategories({ homeCategories }: any) {
  const { categories } = homeCategories?.data || [];

  return (
    <section className="bg-color-secondary py-12 md:py-16">
      <div className="wrapper m-auto px-4 sm:px-6 lg:px-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories?.map((item: any, i: any) => {
            if (item.type === "intro") {
              return (
                <div
                  key={i}
                  className="bg-[#2e4353] text-white rounded-2xl p-8 flex flex-col justify-around  py-16"
                >
                  <div className="w-15 h-15 mb-4">
                    {item.image && (
                      <Image
                        src={item.image}
                        alt="Icon"
                        width={75}
                        height={75}
                        className="w-12 h-12 sm:w-14 sm:h-14 md:w-15 md:h-15 lg:w-18.75 lg:h-18.75 object-contain "
                      />
                    )}
                  </div>
                  <h3 className="text-2xl md:text-[3rem] font-normal mt-6">
                    {item.title}
                  </h3>
                </div>
              );
            }

            return (
              <div
                key={i}
                className="relative rounded-2xl overflow-hidden group min-h-106.25"
              >
                {item.image && (
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                )}
                <div className="absolute inset-0 bg-linear-to-t from-black/10 via-black/15 to-transparent" />
                <div className="absolute bottom-8 left-5 right-5 text-white">
                  <h3 className="text-[2rem] font-semibold capitalize">
                    {item.title}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
