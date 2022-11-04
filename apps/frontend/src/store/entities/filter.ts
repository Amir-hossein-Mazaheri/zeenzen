import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidV4 } from 'uuid';
import { Types } from '@zeenzen/common';
import { CourseLevel } from '@zeenzen/data';

import { RootState } from '../configStore';

export type CategoryFilter = Types.SelectItem & {
  type: 'category';
};

export type LevelFilter = Types.SelectItem & {
  value: CourseLevel;
  type: 'level';
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
  name: 'filter',
  initialState,
  reducers: {
    PUSH_CATEGORY_TO_FILTERS: (
      store,
      action: PayloadAction<{ element: Omit<CategoryFilter, 'id'> }>
    ) => {
      const categories = new Set(store.categories);

      categories.add({ id: uuidV4(), ...action.payload.element });

      store.categories = [...categories];
    },
    PUSH_LEVEL_TO_FILTERS: (
      store,
      action: PayloadAction<{ element: Omit<LevelFilter, 'id'> }>
    ) => {
      const levels = new Set(store.levels);

      levels.add({ id: uuidV4(), ...action.payload.element });

      store.levels = [...levels];
    },
    POP_FROM_FILTERS: (
      store,
      action: PayloadAction<{
        element: Omit<LevelFilter | CategoryFilter, 'id'>;
      }>
    ) => {
      const element = action.payload.element;

      if (element.type === 'category') {
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
