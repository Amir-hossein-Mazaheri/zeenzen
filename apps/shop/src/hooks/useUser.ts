import { useEffect, useRef } from 'react';
import { useMeQuery } from '@zeenzen/data';
import { graphqlClient } from '@zeenzen/common';

import useRedirect from './useRedirect';
import getQueryRetryFn from '../utils/getQueryRetryFn';

/**
 *
 * @param Boolean enabled - determine that data should be fetched onMount or you should fetch it manually
 */
export default function useUser(enabled = true) {
  const oldIsAuthenticated = useRef<boolean | null>(null);

  const redirect = useRedirect({
    to: '/signin',
    message: 'نشست کاربری شما به پایان رسیده است، لطفا مجددا وارد شوید',
    toastType: 'error',
  });

  const { data, isLoading, error, refetch } = useMeQuery(
    graphqlClient,
    {},
    {
      staleTime: 1000 * 60 * 5, // 5minutes
      enabled,
      retry: getQueryRetryFn(4),
    }
  );

  const isAuthenticated = !!(!isLoading && data?.me && !error);

  // this useEffect redirects user if user was logged in but his/her session ended and should log in again
  useEffect(() => {
    if (oldIsAuthenticated.current && !isAuthenticated) {
      redirect();
    }

    oldIsAuthenticated.current = isAuthenticated;

    // it only depends on isAuthenticate
  }, [isAuthenticated, redirect]);

  return {
    loading: isLoading,
    isAuthenticated,
    role: data?.me.role,
    user: data?.me,
    refetch,
  };
}
