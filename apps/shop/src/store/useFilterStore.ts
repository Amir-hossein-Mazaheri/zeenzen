import create from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { devtools } from 'zustand/middleware';
import { v4 as uuidV4 } from 'uuid';
import { isProd } from '@zeenzen/common';

import { CategoryFilter, LevelFilter } from '../types';

interface FilterStore {
  categories: CategoryFilter[];
  levels: LevelFilter[];

  pushCategoryToFilters: (element: Omit<CategoryFilter, 'id'>) => void;
  pushLevelToFilters: (element: Omit<LevelFilter, 'id'>) => void;
  popFromFilters: (element: LevelFilter | CategoryFilter) => void;
  clearAllFilters: () => void;
}

const initialState = {
  categories: [],
  levels: [],
};

const useFilterStore = create(
  devtools(
    immer<FilterStore>((set) => ({
      ...initialState,

      pushCategoryToFilters: (element) => {
        set(
          (filters) => {
            const categories = new Set(filters.categories);

            categories.add({ id: uuidV4(), ...element });

            filters.categories = [...categories];
          },
          false,
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          'filter/pushCategoryToFilters'
        );
      },

      pushLevelToFilters: (element) => {
        set(
          (filters) => {
            const levels = new Set(filters.levels);

            levels.add({ id: uuidV4(), ...element });

            filters.levels = [...levels];
          },
          false,
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          'filter/pushLevelToFilters'
        );
      },

      popFromFilters: (element) => {
        set(
          (filters) => {
            if (element.type === 'category') {
              filters.categories = filters.categories.filter(
                (category) => category.id !== element.id
              );
            } else {
              filters.levels = filters.levels.filter(
                (level) => level.id !== element.id
              );
            }
          },
          false,
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          'filter/popFromFilters'
        );
      },

      clearAllFilters: () => {
        set(
          (filters) => {
            filters.categories = [];
            filters.levels = [];
          },
          false,
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          'filter/clearAllFilters'
        );
      },
    })),
    {
      name: 'filters',
      anonymousActionType: 'filter',
      enabled: !isProd(),
    }
  )
);

export default useFilterStore;
