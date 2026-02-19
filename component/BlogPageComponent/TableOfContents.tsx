"use client";

import { useEffect, useState } from "react";

type TocItem = {
  id: string;
  text: string;
  level: number;
};

type Props = {
  contentSelector?: string;
};

export default function TableOfContents({
  contentSelector = ".blog-content",
}: Props) {
  const [toc, setToc] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const content = document.querySelector(contentSelector);
    if (!content) return;

    const headings = Array.from(
      content.querySelectorAll("h2, h3, h4"),
    ) as HTMLElement[];

    const items: TocItem[] = headings.map((heading, index) => {
      if (!heading.id) {
        heading.id =
          heading.textContent
            ?.toLowerCase()
            .replace(/\s+/g, "-")
            .replace(/[^\w-]/g, "") || `heading-${index}`;
      }

      return {
        id: heading.id,
        text: heading.innerText,
        level: Number(heading.tagName.replace("H", "")),
      };
    });

    setToc(items);
  }, [contentSelector]);

  // Scroll spy
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-30% 0px -60% 0px" },
    );

    toc.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [toc]);

  if (!toc.length) return null;

  return (
    <aside className="toc bg-white rounded-xl  p-6 border  border-gray-100 z-20">
      <h3 className="toc-title text-textSecondary text-xl sm:text-2xl font-bold mb-3 tracking-[-2%] leading-[130%] align-middle flex items-center gap-2">
        Table of Contents
      </h3>
      <ul className="toc-list">
        {toc.map((item) => (
          <li
            key={item.id}
            className={` toc-item block  px-3 text-black hover:bg-textPrimary/10 hover:text-bgSecondary rounded-lg transition-colors text-sm font-medium leading-[1.7500]  tracking-[-2%] level-${
              item.level
            } ${activeId === item.id ? "active" : ""}`}
          >
            <a href={`#${item.id}`}>{item.text}</a>
          </li>
        ))}
      </ul>
    </aside>
  );
}
