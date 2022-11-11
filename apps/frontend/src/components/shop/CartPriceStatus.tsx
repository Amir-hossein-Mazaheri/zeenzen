import React from 'react';
import Image from 'next/image';
import { makePriceCleaner } from '@zeenzen/common';

import dollarSign from '../../assets/images/cart/dollar-sign.svg';
import discountSign from '../../assets/images/cart/discount-sign.svg';
import tomanSymbol from '../../assets/images/cart/toman-symbol.svg';

interface CartPriceStatusProps {
  totalPrice: string;
  totalPriceWithDiscount: string;
  className?: string;
}

const CartPriceStatus: React.FC<CartPriceStatusProps> = ({
  totalPrice,
  totalPriceWithDiscount,
  className,
}) => {
  return (
    <div className={`space-y-6 px-1 py-2 ${className}`}>
      <div className="flex items-center justify-between">
        <p className="flex items-center gap-1">
          <span>
            <Image src={dollarSign} width={40} height={40} alt="قیمت کل" />
          </span>
          <span>مبلغ کل:</span>
        </p>

        <p className="flex items-center gap-1">
          <span>{makePriceCleaner(totalPrice)}</span>
          <span>
            <Image src={tomanSymbol} width={21} height={41} alt="تومان" />
          </span>
        </p>
      </div>

      <div className="flex items-center justify-between">
        <p className="flex items-center gap-1">
          <span>
            <Image
              src={discountSign}
              width={40}
              height={40}
              alt="قیمت کل با تخفیف"
            />
          </span>
          <span>قیمت کل با تخفیف: </span>
        </p>

        <p className="flex items-center gap-1">
          <span>{makePriceCleaner(totalPriceWithDiscount)}</span>
          <span>
            <Image src={tomanSymbol} width={21} height={41} alt="تومان" />
          </span>
        </p>
      </div>
    </div>
  );
};

export default CartPriceStatus;
