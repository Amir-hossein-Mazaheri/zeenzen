import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { CourseLevel } from "../../generated/queries";
import { RootState } from "../configStore";

export type CategoryFilter = {
  text: string;
  value: string;
  type: "category";
};

export type LevelFilter = {
  text: string;
  value: CourseLevel;
  type: "level";
};

interface IFilterState {
  categories: CategoryFilter[];
  levels: LevelFilter[];
}

const initialState: IFilterState = {
  categories: [],
  levels: [],
};

const filter = createSlice({
  name: "filter",
  initialState,
  reducers: {
    PUSH_CATEGORY_TO_FILTERS: (
      store,
      action: PayloadAction<{ element: CategoryFilter }>
    ) => {
      const categories = new Set(store.categories);

      categories.add(action.payload.element);

      store.categories = [...categories];
    },
    PUSH_LEVEL_TO_FILTERS: (
      store,
      action: PayloadAction<{ element: LevelFilter }>
    ) => {
      const levels = new Set(store.levels);

      levels.add(action.payload.element);

      store.levels = [...levels];
    },
    POP_FROM_FILTERS: (
      store,
      action: PayloadAction<{ element: LevelFilter | CategoryFilter }>
    ) => {
      const element = action.payload.element;

      if (element.type === "category") {
        store.categories = store.categories.filter(
          (c) => c.value.toString() !== element.value.toString()
        );
      } else {
        store.levels = store.levels.filter(
          (l) => l.value.toString() !== element.value.toString()
        );
      }
    },
    CLEAR_ALL_FILTERS: (store) => {
      store.categories = [];
      store.levels = [];
    },
  },
});

export const selectFilters = (store: RootState) => store.entities.filter;

export const {
  PUSH_CATEGORY_TO_FILTERS,
  PUSH_LEVEL_TO_FILTERS,
  POP_FROM_FILTERS,
  CLEAR_ALL_FILTERS,
} = filter.actions;

export default filter.reducer;
