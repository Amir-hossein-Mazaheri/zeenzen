import create from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { v4 as uuidV4 } from 'uuid';

import { CategoryFilter, LevelFilter } from '../../types';

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
  immer<FilterStore>((set) => ({
    ...initialState,

    pushCategoryToFilters: (element) => {
      set((filters) => {
        const categories = new Set(filters.categories);

        categories.add({ id: uuidV4(), ...element });

        filters.categories = [...categories];
      });
    },

    pushLevelToFilters: (element) => {
      set((filters) => {
        const levels = new Set(filters.levels);

        levels.add({ id: uuidV4(), ...element });

        filters.levels = [...levels];
      });
    },

    popFromFilters: (element) => {
      set((filters) => {
        if (element.type === 'category') {
          filters.categories = filters.categories.filter(
            (category) => category.id !== element.id
          );
        } else {
          filters.levels = filters.levels.filter(
            (level) => level.id !== element.id
          );
        }
      });
    },

    clearAllFilters: () => {
      set((filters) => {
        filters.categories = [];
        filters.levels = [];
      });
    },
  }))
);

export default useFilterStore;
