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
          <div key={item.id} className="rounded-lg bg-white  border-gray-200">
            <button
              onClick={() => toggle(item.id)}
              className="flex w-full items-center justify-between pl-10 pr-6 py-5  text-left cursor-pointer onesta"
            >
              <span className="text-lg font-medium text-[#02000F] ">
                {item.id}. {item.question}
              </span>
              <span className="text-xl text-gray-700 cursor-pointer">
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
                <div className="px-6 pb-5">
                  <p className="text-base leading-relaxed text-black font-normal">{item.answer}</p>
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