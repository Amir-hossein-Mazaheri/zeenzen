import { configureStore } from "@reduxjs/toolkit";

import reducer from "./reducer";

export const createStore = function () {
  return configureStore({
    reducer,
  });
};

const store = createStore();

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
