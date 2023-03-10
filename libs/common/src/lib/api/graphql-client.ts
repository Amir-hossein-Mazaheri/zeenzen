import { GraphQLClient } from 'graphql-request';

export const graphqlClient = new GraphQLClient(
  'http://localhost:4000/graphql',
  {
    credentials: 'include',
  }
);

export default graphqlClient;
