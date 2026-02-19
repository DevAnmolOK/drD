import Image from 'next/image';

const categories = [
  {
    type: 'intro',
    title: `Our Product Categories Different categories of product range`,
    icon: '/SVG/iconcat.png',
  },
  {
    title: 'Pediatric Range',
    image: '/images/homePage/proCat1.png',
  },
  {
    title: 'Antibiotics Range',
    image: '/images/homePage/abtibiotic.png',
  },
  {
    title: 'Orthopedic Range',
    image: '/images/homePage/ortho.png',
  },
  {
    title: 'Injectable Range',
    image: '/images/homePage/injec.png',
  },
  {
    title: 'Gynecology Range',
    image: '/images/homePage/gyno.png',
  },
];

export default function ProductCategories() {
  return (
    <section className='bg-[#F5F5F5] py-12 md:py-16'>
      <div className='wrapper m-auto px-4 sm:px-6 lg:px-0'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {categories.map((item: any, i) => {
            if (item.type === 'intro') {
              return (
                <div
                  key={i}
                  className='bg-[#2e4353] text-white rounded-[16px] p-8 flex flex-col justify-around min-h-[425px] py-16'>
                  <div className='w-15 h-15 mb-4'>
                    <Image
                      src={item.icon}
                      alt='Icon'
                      width={75}
                      height={75}
                    />
                  </div>
                  <h3 className='text-[42px] font-normal'>{item.title}</h3>
                </div>
              );
            }

            return (
              <div
                key={i}
                className='relative rounded-[16px] overflow-hidden group min-h-[425px]'>
                {/* Image */}
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className='object-cover transition-transform duration-500 group-hover:scale-105'
                  // sizes='(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw'
                />
                <div className='absolute inset-0 bg-gradient-to-t from-black/10 via-black/15 to-transparent' />
                {/* Title */}
                <div className='absolute bottom-8 left-5 right-5 text-white'>
                  <h3 className='text-lg md:text-[32px] font-semibold capitalize'>
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
