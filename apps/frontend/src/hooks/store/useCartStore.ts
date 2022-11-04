import create from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { persist } from 'zustand/middleware/persist';
import { Types } from '@zeenzen/common';

interface CartStore {
  items: Types.CartItem[];
}

const useCartStore = create(
  persist(
    immer<CartStore>((set) => ({
      items: [],

      addCartItem: (item: Types.CartItem) => {
        set((cart) => {
          for (const item of cart.items) {
            if (item.id === item.id) {
              return;
            }
          }

          cart.items.push(item);
        });
      },

      removeCartItem: (courseId: Types.CartItem['id']) => {
        set((cart) => {
          cart.items = cart.items.filter((item) => item.id !== courseId);
        });
      },

      emptyCart: () => {
        set((cart) => (cart.items = []));
      },
    })),
    {
      name: 'zeenzen_cart',
      getStorage: () => localStorage,
    }
  )
);

export default useCartStore;
