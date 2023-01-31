import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ActiveMenu } from '../types';
import { RootState } from './configStore';

const activeMenu: ActiveMenu = 'courses';

const initialState = {
  activeMenuCover: {
    x: 0,
    y: 0,
  },
  activeMenu,
  bodyNavbarTitle: 'دوره های آموزشی',
};

const ui = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    SET_ACTIVE_MENU_COVER_POS: (
      store,
      { payload: { x, y } }: PayloadAction<{ x: number; y: number }>
    ) => {
      store.activeMenuCover.x = x;
      store.activeMenuCover.y = y;
    },
    SET_BODY_NAVBAR: (store, { payload }: PayloadAction<string>) => {
      store.bodyNavbarTitle = payload;
    },
    SET_ACTIVE_MENU: (store, { payload }: PayloadAction<ActiveMenu>) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      store.activeMenu = payload;
    },
  },
});

export default ui.reducer;

export const { SET_ACTIVE_MENU_COVER_POS, SET_BODY_NAVBAR, SET_ACTIVE_MENU } =
  ui.actions;

export const selectNavbarTitle = (store: RootState) => store.ui.bodyNavbarTitle;

export const selectActiveMenuCover = (store: RootState) =>
  store.ui.activeMenuCover;
