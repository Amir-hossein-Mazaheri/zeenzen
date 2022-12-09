import create from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { devtools } from 'zustand/middleware';
import { isProd } from '@zeenzen/common';

interface InitialState {
  email: string;
  password: string;
}

interface UserStore extends InitialState {
  preSignUp: (credentials: { email: string; password: string }) => void;
  signUp: (email: string) => void;
  signUpFailed: () => void;
}

const initialState: InitialState = {
  email: '',
  password: '',
};

const useUserStore = create(
  devtools(
    immer<UserStore>((set) => ({
      ...initialState,

      preSignUp: ({ email, password }) => {
        set(
          (user) => {
            user.email = email;
            user.password = password;
          },
          false,
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          'user/preSignUp'
        );
      },

      signUp: (email) => {
        set(
          (user) => {
            user.email = email;
            user.password = '';
          },
          false,
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          'user/signUp'
        );
      },

      signUpFailed: () => {
        set(
          (user) => {
            user.email = '';
            user.password = '';
          },
          false,
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          'user/signUpFailed'
        );
      },
    })),
    {
      name: 'user',
      anonymousActionType: 'user',
      enabled: !isProd(),
    }
  )
);

export default useUserStore;
