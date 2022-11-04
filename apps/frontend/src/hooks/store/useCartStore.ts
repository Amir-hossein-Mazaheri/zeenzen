import create from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { devtools } from 'zustand/middleware';
import { Types } from '@zeenzen/common';
import persistCart from '../../utils/persistCart';

interface CartStore {
  items: Types.CartItem[];

  loadCartItems: () => void;
  addCartItem: (item: Types.CartItem) => void;
  removeCartItem: (courseId: Types.CartItem['id']) => void;
  emptyCart: () => void;
}

const useCartStore = create(
  devtools(
    immer<CartStore>((set) => ({
      items: [],

      loadCartItems: () => {
        set((cart) => {
          cart.items = persistCart();
        });
      },

      addCartItem: (item) => {
        set((cart) => {
          for (const item of cart.items) {
            if (item.id === item.id) {
              return;
            }
          }

          cart.items.push(item);

          persistCart(cart.items);
        });
      },

      removeCartItem: (courseId: Types.CartItem['id']) => {
        set((cart) => {
          cart.items = cart.items.filter((item) => item.id !== courseId);

          persistCart(cart.items);
        });
      },

      emptyCart: () => {
        set((cart) => {
          cart.items = [];

          persistCart(cart.items);
        });
      },
    }))
  )
);

export default useCartStore;
