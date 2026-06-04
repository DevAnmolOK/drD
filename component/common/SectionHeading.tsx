import React from 'react';

export default function SectionHeading({ title, subTitle, cssClass, subHeadingCss }: any) {
  return (
    <div className={cssClass || 'text-center'}>
      {title && (
        <h2 className="text-2xl lg:text-[48px] text-[#253746] font-semibold capitalize">
          {title}
        </h2>
      )}
      {subTitle && (
        <p className={`${subHeadingCss} font-normal text-lg text-[#626263] mt-2`}>
          {subTitle}
        </p>
      )}
    </div>
  );
}