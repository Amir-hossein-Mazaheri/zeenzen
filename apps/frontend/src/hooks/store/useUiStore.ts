import create from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { devtools } from 'zustand/middleware';
import { isProd } from '@zeenzen/common';

interface InitialState {
  isPageLoading: boolean;
  sidebar: {
    title: string;
    description: string;
  };
}

interface UiStore extends InitialState {
  setShopSidebarTitle: (title: string) => void;
  setShopSidebarDescription: (description: string) => void;
  resetShopSidebar: () => void;
  setPageLoading: (state: boolean) => void;
}

const initialState: InitialState = {
  isPageLoading: false,
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
  devtools(
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

      setPageLoading: (state) => {
        set((ui) => {
          ui.isPageLoading = state;
        });
      },
    })),
    {
      name: 'ui',
      enabled: !isProd(),
    }
  )
);

export default useUiStore;
