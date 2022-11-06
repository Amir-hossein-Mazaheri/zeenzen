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
    title: 'شرح دوره ها',
    description: `لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است.
لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است.
لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است.
لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است.
`,
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

    resetShopSidebar: () => {
      set((ui) => {
        ui.sidebar = initialState.sidebar;
      });
    },
  }))
);

export default useUiStore;
