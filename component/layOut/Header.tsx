import Image from 'next/image';
import Link from 'next/link';
import { FiSearch, FiMenu, FiArrowRight } from 'react-icons/fi';
import { LuSearch } from 'react-icons/lu';

export default async function NavigationBar() {
  const navItems = [
    { label: 'Home', href: '/', active: true },
    { label: 'About Us', href: '/about-us' },
    { label: 'Facility', href: '/facility' },
    { label: 'Products', href: '/products' },
    { label: 'Our Divisions', href: '/our-divisions' },
    { label: 'New Launches', href: '/new-launches' },
    { label: 'Gallery', href: '/gallery' },
  ];

  return (
    <>
      <div className='w-full items-center justify-center flex h-[6.25rem]  z-100 sticky top-0  border-b border-[#FFFFFF2E]'>
        <div className='  h-full  h-[4.625rem] w-full max-w-[101.625rem] flex items-center justify-between '>
          <div className='flex items-center gap-3 relative w-[5.625rem] h-[4.625rem] '>
            <Image
              src='/images/dpharma-logo.svg'
              alt='Dr D Pharma'
              fill
              unoptimized
              className=''
            />
          </div>
          <div className=' text-white  flex gap-10'>
            <nav className='hidden lg:flex items-center gap-8'>
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`relative px-2 pb-1 text-base tracking-wide font-semibold align-middle transition ${
                    item.active ?
                      'text-white border-b  border-white'
                    : 'text-white '
                  }`}>
                  {item.label}

                  {/* Active underline */}
                </Link>
              ))}
            </nav>
            {/* RIGHT SECTION */}
            <div className='flex items-center gap-10'>
              {/* CTA BUTTON */}
              <Link
                href='/contact-us'
                className='hidden md:flex items-center gap-3 bg-white text-black px-6 py-3 rounded-full font-semibold text-[15px] shadow-md hover:shadow-lg transition'>
                Contact Us
                <span className='bg-[#f04e23] text-white rounded-full w-8 h-8 flex items-center justify-center'>
                  <FiArrowRight size={18} />
                </span>
              </Link>

              {/* SEARCH */}
              <button className='text-white hover:opacity-80 transition'>
                <LuSearch size={36} />
              </button>

              {/* MOBILE MENU */}
              <button
                // onClick={() => setMobileOpen(!mobileOpen)}
                className='text-white hover:opacity-80 transition'>
                <FiMenu size={26} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
