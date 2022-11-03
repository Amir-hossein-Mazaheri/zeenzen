import React from 'react';

import { makePriceCleaner } from '../utils';

interface PriceTagProps {
  price: number | string;
  prefix?: string;
  className?: string;
  fontSize?: string;
  color?: string;
  crossedColor?: string;
  crossed?: boolean;
}

export const PriceTag: React.FC<PriceTagProps> = ({
  price,
  prefix,
  className,
  fontSize = 'text-2xl',
  color = 'text-light-blue',
  crossedColor = 'before:bg-light-blue',
  crossed = false,
}) => {
  return (
    <p
      className={`relative font-bold ${fontSize} mb-5 ${color} flex items-center justify-center gap-1 before:content-[''] before:absolute ${crossedColor} before:right-0 before:left-0 before:z-10 before:h-[2px] before:rotate-3 ${
        crossed ? '' : 'before:hidden'
      } ${className}`}
    >
      {prefix && <span>{prefix} </span>}
      <span>{makePriceCleaner(price)}</span>
      <span>تومان</span>
    </p>
  );
};

export default PriceTag;
