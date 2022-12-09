import create from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { devtools } from 'zustand/middleware';
import { isProd, isServer, Types } from '@zeenzen/common';

import persistCart from '../utils/persistCart';

interface InitialState {
  items: Types.CartItem[];
}

interface CartStore extends InitialState {
  loadCartItems: () => void;
  addCartItem: (item: Types.CartItem) => void;
  removeCartItem: (courseId: Types.CartItem['id']) => void;
  emptyCart: () => void;
}

const initialState: InitialState = {
  items: [],
};

const useCartStore = create(
  devtools(
    immer<CartStore>((set) => ({
      ...initialState,

      loadCartItems: () => {
        set(
          (cart) => {
            cart.items = persistCart();
          },
          false,
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          'cart/loadCartItem'
        );
      },

      addCartItem: (item) => {
        set(
          (cart) => {
            for (const item of cart.items) {
              if (item.id === item.id) {
                return;
              }
            }

            cart.items.push(item);

            persistCart(cart.items);
          },
          false,
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          'cart/addCartItem'
        );
      },

      removeCartItem: (courseId: Types.CartItem['id']) => {
        set(
          (cart) => {
            cart.items = cart.items.filter((item) => item.id !== courseId);

            persistCart(cart.items);
          },
          false,
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          'cart/removeCartItem'
        );
      },

      emptyCart: () => {
        set(
          (cart) => {
            cart.items = [];

            persistCart(cart.items);
          },
          false,
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          'cart/emptyCart'
        );
      },
    })),
    {
      name: 'cart',
      anonymousActionType: 'cart',
      enabled: !isProd() || isServer(),
    }
  )
);

export default useCartStore;
