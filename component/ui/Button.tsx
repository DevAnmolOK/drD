import Link from "next/link";
import React from "react";
import { FaArrowRight } from "react-icons/fa";

interface PrimaryButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  bgColor?: string;
  textColor?: string;
  arrowBg?: string;
  className?: string;
}

export default function Button({
  children,
  href,
  onClick,
  bgColor = "#253746",
  textColor = "#ffffff",
  arrowBg = "#ef4444",
  className = "",
}: PrimaryButtonProps) {
  const content = (
    <>
      <span>{children}</span>
      <span
        className="w-8 h-8 rounded-full flex items-center justify-center text-md text-white shadow-lg"
        style={{ backgroundColor: arrowBg }}
      > 
       <FaArrowRight size={12}  />
      </span>
    </>
  );

  const baseStyle =
    "inline-flex items-center gap-2 px-5 py-3 rounded-full transition text-[1.125rem] font-normal ";

  const style = {
    backgroundColor: bgColor,
    color: textColor,
  };

  // Link button
  if (href) {
    return (
      <Link href={href} className={`${baseStyle} ${className}`} style={style}>
        {content}
      </Link>
    );
  }

  // Click button
  return (
    <button
      onClick={onClick}
      className={`${baseStyle} ${className}`}
      style={style}
    >
      {content}
    </button>
  );
}
