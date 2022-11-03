import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { useLogoutMutation } from '@zeenzen/data';
import { graphqlClient } from '@zeenzen/common';

import useToast from './useToast';

interface UseLogoutOptions {
  retry?: number;
  retryDelay?: number;
}

export default function useLogout(options?: UseLogoutOptions) {
  const logoutMutation = useLogoutMutation(graphqlClient, {
    retry: options?.retry || 3,
    retryDelay: options?.retryDelay || 500,
  });

  const router = useRouter();

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
          router.reload();
          router.replace('/');
        },
        onError() {
          toast({}).fire({
            title: 'مشکلی در خروج شما از پیش آمده است مجددا تلاش کنید',
            icon: 'error',
          });

          router.back();
        },
      }
    );
  }, [logoutMutation, router, toast]);
}
