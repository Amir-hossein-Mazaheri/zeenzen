import React, { Fragment } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';

import CartItem, { CartItemProps } from './CartItem';
import AppButton from './AppButton';
import Conditional from './Conditional';
import TrueCondition from './TrueCondition';
import FalseCondition from './FalseCondition';
import { CartItem as TCartItem } from '../types';

interface CartIconProps {
  onRemoveCartItem: CartItemProps['onDelete'];
  items: TCartItem[];
}

export const CartIcon: React.FC<CartIconProps> = ({
  onRemoveCartItem,
  items,
}) => {
  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <Popover.Button className="outline-none">
            <div
              className={`rounded-full w-10 h-10 relative flex items-center justify-center ${
                open ? 'bg-gray-300' : 'bg-light-blue'
              }`}
            >
              {items && items?.length > 0 && (
                <div className="absolute top-0 right-0 translate-x-2 -translate-y-1 flex items-center justify-center font-medium text-sm bg-light-red rounded-full w-6 h-6 text-white">
                  <span>{items?.length}</span>
                </div>
              )}

              <div className={`${open ? 'text-text-black' : 'text-white '}`}>
                <FontAwesomeIcon icon={faCartShopping} />
              </div>
            </div>
          </Popover.Button>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute top-full left-0 mt-5 bg-white rounded-lg shadow-lg shadow-gray-300/50 px-7 py-4 w-max">
              <Conditional condition={(items && items?.length > 0) || false}>
                <TrueCondition>
                  <h2 className="mb-5 font-black text-xl">سبد خرید</h2>

                  <div className="space-y-5">
                    {items?.map((item) => (
                      <CartItem
                        key={item.id}
                        {...item}
                        sm
                        onDelete={onRemoveCartItem}
                      />
                    ))}
                  </div>

                  <AppButton
                    link
                    href="/shop/cart"
                    className="mt-5 w-full text-center"
                  >
                    <p>نهایی سازی</p>
                  </AppButton>
                </TrueCondition>

                <FalseCondition>
                  <p className="text-center font-bold">سبد خرید شما خالی است</p>
                </FalseCondition>
              </Conditional>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};

export default CartIcon;
