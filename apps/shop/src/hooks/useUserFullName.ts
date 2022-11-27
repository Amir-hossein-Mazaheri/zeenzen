import { useMemo } from 'react';

import useUser from './useUser';

export default function useUserFullName() {
  const { isAuthenticated, user } = useUser();

  return useMemo(
    () =>
      isAuthenticated && user?.firstname && user?.lastname
        ? `${user?.firstname} ${user?.lastname}`
        : '',
    [isAuthenticated, user?.firstname, user?.lastname]
  );
}
