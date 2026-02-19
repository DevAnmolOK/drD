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
      className={`inline-flex items-center gap-2 text-xs font-bold px-4 py-2 rounded-full bg-white border border-gray-200 text-[#253746] capitalize ${className}`}
    >
      {/* {icon && ( */}
        <Image
          src={icon || `/SVG/tag-icon.svg`}
          alt={iconAlt}
          width={22}
          height={22}
          className="object-contain"
        />
      {/* )} */}
      {text}
    </span>
  );
}
