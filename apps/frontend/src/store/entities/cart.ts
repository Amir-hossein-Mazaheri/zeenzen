import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import CartItem from "../../common/CartItem";
import persistCart from "../../utils/persistCart";
import { RootState } from "../configStore";

export type CartItem = {
  id: string;
  title: string;
  thumbnail: string;
  instructors: string[];
  price: number;
  discountedPrice: number;
};

export interface Cart {
  items: CartItem[];
}

const initialState: Cart = {
  items: [],
};

const cart = createSlice({
  name: "cart",
  initialState,
  reducers: {
    LOAD_ITEMS: (store, action: PayloadAction<{ items: CartItem[] }>) => {
      store.items = action.payload.items;
    },
    ADD_ITEM: (store, action: PayloadAction<{ item: CartItem }>) => {
      // this loop prevents duplicate cart items.
      for (const item of store.items) {
        if (item.id === action.payload.item.id) {
          return;
        }
      }

      store.items.push(action.payload.item);

      persistCart(store.items);
    },
    REMOVE_ITEM: (
      store,
      action: PayloadAction<{ courseId: CartItem["id"] }>
    ) => {
      store.items = store.items.filter(
        (item) => item.id !== action.payload.courseId
      );

      persistCart(store.items);
    },
    EMPTY_CART: (store) => {
      store.items = [];

      persistCart(store.items);
    },
  },
});

export const selectCart = (store: RootState) => store.entities.cart;

export const selectCartItems = (store: RootState) => store.entities.cart.items;

export const { LOAD_ITEMS, ADD_ITEM, REMOVE_ITEM, EMPTY_CART } = cart.actions;

export default cart.reducer;
