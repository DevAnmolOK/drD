import Image from 'next/image';
import { FiArrowRight } from 'react-icons/fi';
import TagBadge from '../ui/TagBadge';
import Button from '../ui/Button';

const ayurvedicData = {
  tag: 'OUR PRODUCT RANGE',
  title: {
    line: 'Complete ',
    line1: ' Ayurvedic Product Solutions',
    line2: 'Under One Roof',
  },
  description:
    'A comprehensive portfolio spanning Ayurvedic third-party manufacturing, nutraceutical supplies, and allopathic medicines—crafted with quality, compliance, and consistency.',
  cta: {
    label: 'Our Complete Ayurvedic Product Range',
    link: '#',
  },
  cards: [
    {
      title: 'Ayurvedic Product Range',
      text: 'Ayurvedic product is the traditional and an antique medical procedure to treat disease.',
      icon: '/SVG/Ayurvedic 01.svg',
    },
    {
      title: 'Allopathic Product Range',
      text: 'Nowadays there is a huge demand for Pharmaceutical products in the market.',
      icon: '/SVG/Ayurvedic 02.svg',
    },
    {
      title: 'Nutraceutical Third Party List',
      text: 'The demand for Nutraceutical drugs has increased in the past few years.',
      icon: '/SVG/Ayurvedic 03.svg',
    },
    {
      title: 'Ayurvedic Third Party List',
      text: 'Dr. D Pharma, with quality production, offers the best ayurvedic third party manufacturing opportunities.',
      icon: '/SVG/Ayurvedic 04.svg',
    },
  ],
};

export default function ProductRange() {
  return (
    <section className='bg-[#fff] py-14 md:py-16'>
      <div className='wrapper mx-auto px-4 sm:px-6 lg:px-0'>
        <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between gap-2 mb-10'>
          <div className='max-w-5xl'>
             <TagBadge text={ayurvedicData.tag}/>
            <h2 className='text-2xl sm:text-3xl lg:text-[42px] leading-tight text-[#253746]'>
              {ayurvedicData.title.line}
              <span className='font-semibold'>{ayurvedicData.title.line1}</span>
              <br />
              {ayurvedicData.title.line2}
            </h2>

            <p className='text-[#626263] mt-3 text-sm sm:text-base leading-relaxed'>
              {ayurvedicData.description}
            </p>
          </div>
          <Button>
            {ayurvedicData.cta.label}
          </Button>
        </div>

        {/* Cards */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5'>
          {ayurvedicData.cards.map((card, i) => (
            <div
              key={i}
              className='bg-[#F5F5F5] rounded-[16px] p-6 min-h-[160px] flex flex-col gap-3  '>
              <div className='text-2xl'>
                <Image
                  src={card?.icon}
                  alt='icon'
                  height={48}
                  width={50}
                  className='object-contain'
                />
              </div>
              <h3 className='text-[#253746] font-normal text-2xl'>
                {card.title}
              </h3>
              <p className='text-[#626263] text-base leading-relaxed font-normal'>
                {card.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
