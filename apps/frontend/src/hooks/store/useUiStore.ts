import create from 'zustand';
import { immer } from 'zustand/middleware/immer';

interface UiStore {
  sidebar: {
    title: string;
    description: string;
  };

  setShopSidebarTitle: (title: string) => void;
  setShopSidebarDescription: (description: string) => void;
  resetShopSidebar: () => void;
}

const initialState = {
  sidebar: {
    title: '',
    description: '',
  },
};

const useUiStore = create(
  immer<UiStore>((set) => ({
    ...initialState,

    setShopSidebarTitle: (title) => {
      set((ui) => {
        ui.sidebar.title = title;
      });
    },

    setShopSidebarDescription: (description) => {
      set((ui) => {
        ui.sidebar.description = description;
      });
    },

    resetShopSidebar() {
      set((ui) => {
        ui.sidebar = initialState.sidebar;
      });
    },
  }))
);

export default useUiStore;
