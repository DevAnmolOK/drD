import Image, { StaticImageData } from "next/image";
import React from "react";

interface TagBadgeProps {
  text: string;
  icon?: string | StaticImageData;
  iconAlt?: string;
  className?: string;
}

export default function TagBadge({
  text,
  icon,
  iconAlt = "icon",
  className = "",
}: TagBadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-2 text-[0.75rem] font-semibold px-4 py-2 rounded-full bg-white border border-gray-200 text-[#253746] uppercase  ${className}`}
    >
        <Image
          src={icon || `/SVG/tag-icon.svg`}
          alt={iconAlt}
          width={24}
          height={24}
          className="w-6 h-6 object-contain shrink-0"
        />
      {text}
    </span>
  );
}
