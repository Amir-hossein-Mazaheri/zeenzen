import create from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { devtools } from 'zustand/middleware';
import { isProd, isServer } from '@zeenzen/common';

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
        set(
          (ui) => {
            ui.sidebar.title = title;
          },
          false,
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          'ui/setShopSidebarTitle'
        );
      },

      setShopSidebarDescription: (description) => {
        set(
          (ui) => {
            ui.sidebar.description = description;
          },
          false,
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          'ui/setShopSidebarDescription'
        );
      },

      resetShopSidebar: () => {
        set(
          (ui) => {
            ui.sidebar = initialState.sidebar;
          },
          false,
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          'ui/resetShopSidebar'
        );
      },

      setPageLoading: (state) => {
        set(
          (ui) => {
            ui.isPageLoading = state;
          },
          false,
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          'ui/setPageLoading'
        );
      },
    })),
    {
      name: 'ui',
      anonymousActionType: 'ui',
      enabled: !isProd() || isServer(),
    }
  )
);

export default useUiStore;
