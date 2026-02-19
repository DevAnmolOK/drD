import Image from 'next/image';

const directorData = {
  name: 'Dr. D Pharma',
  role: 'Managing Director at',
  photo: '/images/homePage/director.png',
  description: `Dharam Pal, a visionary business leader with extensive experience in the pharmaceutical industry, founded Dr. D Pharma with the objective of delivering high-quality, affordable healthcare solutions. As the driving force behind the company, he oversees strategic growth, long-term planning, and operational excellence while maintaining strong ethical standards and a positive organizational culture. His leadership, commitment to quality, and industry insight have played a pivotal role in establishing Dr. D Pharma as a trusted and growing name in the pharmaceutical sector.`,
  socials: [
    { icon: '/images/fb.png', url: '#' },
    { icon: '/images/inst.png', url: '#' },
    { icon: '/images/tw.png', url: '#' },
    { icon: '/images/linkedIn.png', url: '#' },
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

// import Image from "next/image";

export default function DirectorDivisions() {
  return (
    <section>
      <div className="px-4 sm:px-6 lg:px-0">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center">
          
          {/* LEFT — DIRECTOR */}
          <div className="bg-[#243847] text-white p-6 sm:p-8 md:p-10">
            <div className="py-10 md:py-16 max-w-2xl mx-auto md:pl-10 lg:pl-20">
              
              <h2 className="text-2xl sm:text-3xl md:text-[48px] mb-6">
                Meet Our{" "}
                <span className="font-semibold">Director</span>
              </h2>

              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-8 md:mb-10">
                
                {/* image */}
                <div className="relative w-[180px] h-[180px] sm:w-[220px] sm:h-[220px] md:w-[242px] md:h-[239px] rounded-[15px] overflow-hidden">
                  <Image
                    src={directorData.photo}
                    alt={directorData.name}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* text */}
                <div className="text-center sm:text-left">
                  <h3 className="text-lg md:text-[28px] font-bold">
                    {directorData.name}
                  </h3>

                  <p className="text-lg md:text-[28px] text-white mb-3">
                    {directorData.role}
                  </p>

                  <div className="flex justify-center sm:justify-start gap-2">
                    {directorData.socials.map((s, i) => (
                      <div
                        key={i}
                        className="w-9 h-9 md:w-10 md:h-10 bg-white rounded flex items-center justify-center"
                      >
                        <Image
                          src={s.icon}
                          alt="social-icon"
                          width={12}
                          height={12}
                          className="object-contain"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <p className="text-sm sm:text-base leading-relaxed text-white font-normal">
                {directorData.description}
              </p>
            </div>
          </div>

          {/* RIGHT — DIVISIONS */}
          <div className="bg-[#eef1f4] p-6 sm:p-8 md:p-10">
            <div className="py-10 md:py-16 max-w-2xl ">

              <h2 className="text-2xl sm:text-3xl md:text-[48px] mb-8 text-[#253746]">
                Our <span className="font-semibold">Divisions</span>
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 justify-items-start">
                {divisions.map((logo, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-full w-[110px] h-[110px] sm:w-[130px] sm:h-[130px] md:w-[140px] md:h-[140px] flex items-center justify-center shadow-sm"
                  >
                    <div className="relative w-[70px] h-[70px] sm:w-[85px] sm:h-[85px] md:w-[99px] md:h-[90px]">
                      <Image
                        src={logo}
                        alt="Division"
                        fill
                        className="object-contain"
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

