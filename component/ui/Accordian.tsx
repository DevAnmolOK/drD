'use client';
import { useState } from 'react';
import { FiPlus, FiMinus } from 'react-icons/fi';

interface AccordionItem {
  id: number;
  question: string;
  answer: string;
}

interface AccordionProps {
  data: AccordionItem[];
}

const Accordion = ({ data }: AccordionProps) => {
  const [activeId, setActiveId] = useState<number | null>(1);

  const toggle = (id: number) => {
    setActiveId(activeId === id ? null : id);
  };

  return (
    <div className="space-y-5">
      {data?.map((item) => {
        const isOpen = activeId === item.id;

        return (
          <div
            key={item.id}
            className={`border rounded-xl overflow-hidden bg-white transition-all duration-300 ${isOpen
              ? 'border-[#EE4223]/30 shadow-md'
              : 'border-gray-100 shadow-sm hover:border-gray-300 hover:shadow-md'
              }`}
          >
            <button
              onClick={() => toggle(item.id)}
              className="flex w-full items-center justify-between pl-6 pr-6 py-5 sm:pl-8 sm:pr-8 text-left cursor-pointer transition-colors duration-300"
            >
              <span
                className={`text-lg font-semibold transition-colors duration-300 ${isOpen ? 'text-[#EE4223]' : 'text-[#253746]'
                  }`}
              >
                {item.id}. {item.question}
              </span>
              <span
                className={`text-xl transition-all duration-300 ${isOpen ? 'text-[#EE4223] rotate-180' : 'text-gray-500'
                  }`}
              >
                {isOpen ? <FiMinus /> : <FiPlus />}
              </span>
            </button>

            <div
              className={`
                grid transition-all duration-300 ease-in-out
                ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}
              `}
            >
              <div className="overflow-hidden">
                <div className="pl-6 pr-6 pb-5 sm:pl-8 sm:pr-8 sm:pb-6">
                  <p className="text-base leading-relaxed text-[#626263] font-normal">
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Accordion;