import React from 'react';
import Image, { StaticImageData } from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faTrash } from '@fortawesome/free-solid-svg-icons';

import { tomanSymbol } from '../assets';
import { makePriceCleaner } from '../utils';

export interface CartItemProps {
  id: number;
  title: string;
  instructors: string[];
  price: number | string;
  thumbnail: StaticImageData | string;
  hasDiscount?: boolean;
  priceWithDiscount?: number;
  onDelete?: (id: number, title: string) => void;
  sm?: boolean;
}

export const CartItem: React.FC<CartItemProps> = ({
  id,
  thumbnail,
  title,
  instructors,
  price,
  hasDiscount,
  priceWithDiscount,
  onDelete,
  sm = false,
}) => {
  return (
    <div className="flex justify-between gap-7 items-center rounded-xl border border-gray-200 px-5 py-3">
      <div className="flex gap-5 items-center">
        <div className="w-20 h-20 rounded-xl overflow-hidden">
          <Image src={thumbnail} alt={title} width={200} height={200} />
        </div>

        <div className="flex flex-col justify-center gap-2">
          <h2
            className={`m-0 ${
              sm ? ' font-bold' : 'text-2xl font-black'
            } text-title-black`}
          >
            {title}
          </h2>

          {instructors.map((instructor) => (
            <p
              key={instructor}
              className={`text-text-black ${sm ? 'text-sm' : ''}`}
            >
              {instructor}
            </p>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-7">
        <div className="text-md font-medium flex items-center gap-2">
          <div className="flex gap-5">
            {hasDiscount && priceWithDiscount && (
              <>
                <p className="text-light-red">
                  {makePriceCleaner(priceWithDiscount)}
                </p>
                <div>
                  <FontAwesomeIcon icon={faArrowRight} />
                </div>
              </>
            )}
            <div
              className={`relative ${
                hasDiscount &&
                priceWithDiscount &&
                "before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-[2px] before:bg-light-red before:rotate-45"
              } ${sm ? 'text-sm' : ''}`}
            >
              <p>{makePriceCleaner(price)}</p>
            </div>
          </div>

          <Image
            className={sm ? '' : `scale-110`}
            src={tomanSymbol}
            alt="تومان"
          />
        </div>

        {onDelete && (
          <div
            onClick={() => onDelete(id, title)}
            className="flex items-center cursor-pointer justify-center rounded-lg bg-light-red text-white w-8 h-8"
          >
            <FontAwesomeIcon icon={faTrash} />
          </div>
        )}
      </div>
    </div>
  );
};

export default CartItem;
