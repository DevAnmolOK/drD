// components/ProductCategories.tsx

export default function ProductCategories() {
  const data = {
    title: "Product Categories",
    subheading:
      "Explore our high-demand portfolio designed for prescription confidence and business growth.",
    categories: [
      {
        title: "Tablets",
        desc: "Antibiotics, anti-inflammatory, antifungal, antihistamine, cardiac-diabetic, gastro, neurology, ortho.",
      },
      {
        title: "Capsules",
        desc: "Hard gelatin & softgel in multiple strengths; enhanced bioavailability and patient compliance.",
      },
      {
        title: "Syrups & Suspensions",
        desc: "Pediatric & adult formulations — palatable, stable, and therapeutically effective.",
      },
      {
        title: "Injections",
        desc: "Sterile small-volume parenterals; critical care & emergency support with strict aseptic controls.",
      },
      {
        title: "Ointments & Creams",
        desc: "Dermatology care for infections, inflammation, acne, and wound management.",
      },
      {
        title: "Nutraceuticals",
        desc: "Immunity boosters, bone & joint health, vitamins, minerals, antioxidants, probiotics.",
      },
      {
        title: "Ayurvedic / Herbal",
        desc: "Traditional formulations for digestion, liver care, respiratory wellness, and vitality.",
      },
      {
        title: "New Launches",
        desc: "Market-researched SKUs aligned with prescribing trends and patient needs.",
      },
    ],
  };

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
          {data.categories.map((item, i) => (
            <div
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
