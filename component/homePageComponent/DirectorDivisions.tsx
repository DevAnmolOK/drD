import Image from 'next/image';

const directorData = {
  name: 'Dr. D Pharma',
  role: 'Managing Director at',
  photo: '/images/homePage/director.png',
  description: `Dharam Pal, a visionary business leader with extensive experience in the pharmaceutical industry, founded Dr. D Pharma with the objective of delivering high-quality, affordable healthcare solutions. As the driving force behind the company, he oversees strategic growth, long-term planning, and operational excellence while maintaining strong ethical standards and a positive organizational culture. His leadership, commitment to quality, and industry insight have played a pivotal role in establishing Dr. D Pharma as a trusted and growing name in the pharmaceutical sector.`,
  socials: [
    { icon: 'facebook', url: '#' },
    { icon: 'twitter', url: '#' },
    { icon: 'instagram', url: '#' },
    { icon: 'linkedin', url: '#' },
  ],
};

const divisions = [
  '/images/homePage/ic1.png',
  '/images/homePage/ic2.png',
  '/images/homePage/ic3.png',
  '/images/homePage/ic4.png',
  '/images/homePage/ic5.png',
  '/images/homePage/ic6.png',
  '/images/homePage/ic7.png',
];

export default function DirectorDivisions() {
  return (
    <section>
      <div className=' px-4 sm:px-6 lg:px-0'>
        <div className='grid grid-cols-1 md:grid-cols-2 '>
          {/* LEFT — DIRECTOR */}
          <div className='bg-[#243847] text-white p-8 md:p-10'>
            <div className='py-16 w-2xl m-auto pl-30'>
              <h2 className='text-2xl md:text-[48px] mb-6'>
                Meet Our
                <span className='font-semibold text-[48px]'>Director</span>
              </h2>
              <div className='flex items-start gap-6 mb-6'>
                <div className='relative w-[140px] h-[160px] rounded-xl overflow-hidden'>
                  <Image
                    src={directorData.photo}
                    alt={directorData.name}
                    fill
                    className='object-cover'
                  />
                </div>
                <div>
                  <h3 className='text-lg font-bold'>{directorData.name}</h3>
                  <p className='text-sm text-gray-300 mb-3'>
                    {directorData.role}
                  </p>
                  <div className='flex gap-2'>
                    {directorData.socials.map((s, i) => (
                      <div
                        key={i}
                        className='w-8 h-8 bg-white/90 rounded flex items-center justify-center'>
                        <span className='text-[#243847] text-sm'>
                          {s.icon[0].toUpperCase()}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <p className='text-base leading-relaxed text-white font-normal'>
                {directorData.description}
              </p>
            </div>
          </div>

          {/* RIGHT — DIVISIONS */}
          <div className='bg-[#eef1f4] p-8 md:p-10 '>
            <div className='py-16 max-w-xl '>
              <h2 className='text-2xl md:text-[48px] mb-8 text-[#253746]'>
                Our <span className='font-semibold'>Divisions</span>
              </h2>
              <div className='grid grid-cols-3 gap-6 justify-items-start'>
                {divisions.map((logo, i) => (
                  <div
                    key={i}
                    className='bg-white rounded-full w-[140px]  h-[140px] flex items-center justify-center shadow-sm mx-auto'>
                    <div className='relative w-[99px] h-[90px]'>
                      <Image
                        src={logo}
                        alt='Division'
                        fill
                        className='object-contain'
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
