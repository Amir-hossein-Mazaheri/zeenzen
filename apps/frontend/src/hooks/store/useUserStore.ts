import create from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { devtools } from 'zustand/middleware';
import { isProd } from '@zeenzen/common';

interface UserStore {
  email: string;
  password: string;

  preSignUp: (credentials: { email: string; password: string }) => void;
  signUp: (email: string) => void;
  signUpFailed: () => void;
}

const useUserStore = create(
  devtools(
    immer<UserStore>((set) => ({
      email: '',
      password: '',

      preSignUp: ({ email, password }) => {
        set((user) => {
          user.email = email;
          user.password = password;
        });
      },

      signUp: (email) => {
        set((user) => {
          user.email = email;
          user.password = '';
        });
      },

      signUpFailed: () => {
        set((user) => {
          user.email = '';
          user.password = '';
        });
      },
    })),
    {
      name: 'user',
      enabled: !isProd(),
    }
  )
);

export default useUserStore;
