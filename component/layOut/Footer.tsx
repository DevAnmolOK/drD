'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  const SocalIcons = [
    {
      icon: '/SVG/SM links 01.svg',
      link: '#',
    },
    {
      icon: '/SVG/SM links 02.svg',
      link: '#',
    },
    {
      icon: '/SVG/SM links 03.svg',
      link: '#',
    },
    {
      icon: '/SVG/SM links 04.svg',
      link: '#',
    },
  ];
  const contact = {
    phone: {
      icon: '/SVG/footer 01.svg',
      alt: '',
      number: [9041246545, 4666406],
    },
    email: {
      icon: '/SVG/footer 02.svg',
      alt: '',
      email: `drdpharmachd@gmail.com`,
    },
    address: {
      icon: '/SVG/footer 03.svg',
      alt: '',
      address: `Village Bhatoli Khurd, Officer Colony, Opposite Birla Textile, Sector 5, Baddi, Himachal Pradesh 173205`,
    },
  };
  return (
    <footer className='bg-gradient-to-r from-[#1c2a3a] via-[#1f2f44] to-[#16222f] text-white w-full'>
      <div className='wrapper mx-auto w-full  pb-6 pt-14'>
        {/* TOP GRID */}

        <div className=' flex md:flex-row flex-col gap-12 w-full  justify-end'>
          {/* LEFT SECTION */}
          <div className='  md:w-[24%]'>
            <div className='relative w-[5.625rem] h-[4.625rem]'>
              <Image
                src='/images/dpharma-logo.svg'
                alt='Dr D Pharma'
                unoptimized
                fill
                className='object-contain'
              />
            </div>

            <p className='text-base  leading-[1.7500] text-white font-normal align-middle mt-[1rem] '>
              We at Dr. D Pharma believes that complete customer satisfaction is
              the key to expand business everywhere. Our actions are driven by
              these core values: SERVICE, INTEGRITY, QUALITY, CUSTOMER
              SATISFACTION & INNOVATIONS.
            </p>

            {/* Social Icons */}
            <div className='flex gap-4 mt-8'>
              {SocalIcons?.map((Icon, i) => (
                <div
                  key={i}
                  className='w-[2.5rem] h-[2.5rem] relative  flex items-center justify-center  transition cursor-pointer'>
                  <Image
                    src={Icon?.icon}
                    alt='Dr D Pharma'
                    unoptimized
                    fill
                    className='object-contain'
                  />
                </div>
              ))}
            </div>
          </div>

          {/* right section */}
          <div className='  md:w-[74%] '>
            {/* info */}
            <div className=' flex sm:flex-row flex-col w-full'>
              {/* menu */}
              <div className='  sm:w-[25%]'>
                <h3 className='text-[1.25rem] font-bold leading-[1.2000] align-middle mb-8'>
                  Information
                </h3>

                <div className='grid grid-cols-2 gap-5 text-white'>
                  <div className='text-base align-middle font-normal leading-[1.5000] flex flex-col gap-5'>
                    <Link href='/'>Home</Link>
                    <Link href='#'>About Us</Link>
                    <Link href='#'>Facility</Link>
                    <Link href='#'>Products</Link>
                  </div>
                </div>
              </div>
              <div className='  sm:w-[32.5%] '>
                {/* <h3 className="text-lg font-semibold mb-6">Information</h3> */}

                <div className='grid grid-cols-2 gap-6   mt-14'>
                  <div className='text-base align-middle font-normal leading-[1.5000] flex flex-col gap-5'>
                    <Link href='#'>Our Divisions</Link>
                    <Link href='#'>New Launch</Link>
                    <Link href='#'>Gallery</Link>
                    <Link href='#'>Contact Us</Link>
                  </div>
                </div>
              </div>
              {/*  MAP */}
              <div className='  sm:w-[42.5%]'>
                <div className='relative w-full h-[16.188rem]  overflow-hidden'>
                  <iframe
                    src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d54773.00740713477!2d76.82159773491381!3d30.90587516593629!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ff569da45e4bb%3A0xde121e5eea7ece12!2sDr.%20D%20Pharma%20-%20Derma%20Range%20%7C%20Ortho%20Range%20%7C%20Gynae%20Range!5e0!3m2!1sen!2sin!4v1771331898755!5m2!1sen!2sin'
                    width='100%'
                    height='100%'
                    style={{ border: 0 }}
                    allowFullScreen
                    loading='lazy'
                    referrerPolicy='no-referrer-when-downgrade'
                    className='rounded-md'></iframe>
                </div>
              </div>
            </div>
            {/* contact */}
            <div className=' flex  flex-row flex-wrap  mt-8 text-white text-[15px] w-full lg:gap-0 gap-6'>
              <div className='flex items-center gap-4  lg:w-[25%]'>
                <div className='min-h-[2.75rem] min-w-[2.75rem] relative  border  border-white p-3 rounded-sm'>
                  <Image
                    src={contact?.phone?.icon}
                    alt={contact?.phone?.alt}
                    unoptimized
                    fill
                    className='object-contain'
                  />
                </div>
                <div>
                  {contact?.phone?.number.map((data, index) => (
                    <p
                      className=' text-base font-medium leading-[1.4063] align-middle'
                      key={index}>
                      {data}
                    </p>
                  ))}
                </div>
              </div>

              <div className='flex items-center gap-4  lg:w-[32.5%]'>
                <div className='min-h-[2.75rem] min-w-[2.75rem] relative  border  border-white p-3 rounded-sm'>
                  <Image
                    src={contact?.email?.icon}
                    alt={contact?.email?.alt}
                    unoptimized
                    fill
                    className='object-contain'
                  />
                </div>
                <p className=' text-base font-medium leading-[1.4063] align-middle lowercase'>
                  {contact?.email?.email}
                </p>
              </div>

              <div className='flex items-center gap-4  lg:w-[42.5%]'>
                <div className='min-h-[2.75rem] min-w-[2.75rem] relative  border  border-white p-3 rounded-sm'>
                  <Image
                    src={contact?.address?.icon}
                    alt={contact?.address?.alt}
                    unoptimized
                    fill
                    className='object-contain'
                  />
                </div>
                <p className='text-base font-medium leading-[1.4063] '>
                  {contact?.address?.address}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CONTACT ROW */}

        {/* DIVIDER */}
        <div className='border-t border-[#626263] text-white/40 mt-8 pt-4 flex flex-col md:flex-row justify-between  gap-4'>
          <p className=' text-sm font-normal align-middle'>
            © 2026 by{' '}
            <span className='underline cursor-pointer font-semibold align-middle'>
              Dr. D Pharma
            </span>
          </p>

          <div className='flex gap-4  text-sm font-normal align-middle'>
            <Link href='#'>Terms & Conditions</Link>
            <span>|</span>
            <Link href='#'>Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
