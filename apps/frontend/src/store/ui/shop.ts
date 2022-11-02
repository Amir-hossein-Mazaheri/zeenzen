import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../configStore";

const sidebar = {
  title: "شرح دوره ها",
  description: `لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است.
لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است.
لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است.
لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است.
`,
};

const initialState = {
  sidebar,
};

const shop = createSlice({
  name: "shop",
  initialState,
  reducers: {
    SET_SHOP_SIDEBAR_TITLE: (
      store,
      action: PayloadAction<{ title: string }>
    ) => {
      store.sidebar.title = action.payload.title;
    },
    SET_SHOP_SIDEBAR_DESCRIPTION: (
      store,
      action: PayloadAction<{ description: string }>
    ) => {
      store.sidebar.description = action.payload.description;
    },
    RESET_SHOP_SIDEBAR: (store) => {
      store.sidebar = sidebar;
    },
  },
});

export const selectShopSidebarTitle = (store: RootState) =>
  store.ui.sidebar.title;

export const selectShopSidebarDescription = (store: RootState) =>
  store.ui.sidebar.description;

export const {
  SET_SHOP_SIDEBAR_TITLE,
  SET_SHOP_SIDEBAR_DESCRIPTION,
  RESET_SHOP_SIDEBAR,
} = shop.actions;

export default shop.reducer;
