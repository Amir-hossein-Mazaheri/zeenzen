import { useMeQuery } from '@zeenzen/data';
import { graphqlClient } from '@zeenzen/common';

export default function useUser(enabled = true) {
  const { data, isFetching, error, refetch } = useMeQuery(
    graphqlClient,
    {},
    {
      staleTime: 1000 * 60 * 5, // 5minutes
      retry: 4,
      enabled,
    }
  );

  return {
    loading: isFetching,
    isAuthenticated: !!(!isFetching && data?.me && !error),
    role: data?.me.role,
    user: data?.me,
    refetch,
  };
}
