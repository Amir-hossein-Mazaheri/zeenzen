import { useCallback } from 'react';
import { useLogoutMutation } from '@zeenzen/data';
import { graphqlClient } from '@zeenzen/common';

import useToast from './useToast';
import useUser from './useUser';

interface UseLogoutOptions {
  retry?: number;
  retryDelay?: number;
}

export default function useLogout(options?: UseLogoutOptions) {
  const { refetch: refetchUser } = useUser(false);

  const logoutMutation = useLogoutMutation(graphqlClient, {
    retry: options?.retry || 3,
    retryDelay: options?.retryDelay || 500,
  });

  const toast = useToast();

  return useCallback(() => {
    logoutMutation.mutate(
      {},
      {
        onSuccess() {
          toast({}).fire({
            title: 'با موفقیت خارج شدید',
            icon: 'success',
          });
        },
        onError() {
          toast({}).fire({
            title: 'مشکلی در خروج شما از پیش آمده است مجددا تلاش کنید',
            icon: 'error',
          });
        },
        onSettled() {
          refetchUser();
        },
      }
    );
  }, [logoutMutation, refetchUser, toast]);
}
