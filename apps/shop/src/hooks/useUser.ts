import { useMeQuery } from '@zeenzen/data';
import { graphqlClient } from '@zeenzen/common';

export default function useUser(enabled = true) {
  const { data, isLoading, error, refetch } = useMeQuery(
    graphqlClient,
    {},
    {
      staleTime: 1000 * 60 * 5, // 5minutes
      retry: 4,
      enabled,
    }
  );

  return {
    loading: isLoading,
    isAuthenticated: !!(!isLoading && data?.me && !error),
    role: data?.me.role,
    user: data?.me,
    refetch,
  };
}
