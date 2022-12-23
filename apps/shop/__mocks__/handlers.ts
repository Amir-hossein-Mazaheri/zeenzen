import { graphql } from 'msw';
import { v4 as uuid } from 'uuid';

export const handlers = [
  graphql.query('Me', (req, res, ctx) => {
    return res(
      ctx.data({
        me: {
          id: 1,
          firstname: 'Test',
          lastname: 'User',
          email: 'test@test.com',
          phoneNumber: '0913xxxxxxx',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          role: 'ADMIN',

          avatar: {
            id: 2,
            fullPath: 'https:google.com',
          },

          cart: {
            id: uuid(),
          },
        },
      })
    );
  }),

  graphql.mutation('SignIn', (req, res, ctx) => {
    const { email } = req.variables;

    return res(
      ctx.data({
        signIn: {
          id: 1,
          firstname: 'Test',
          lastname: 'User',
          email,
          role: 'ADMIN',
        },
      })
    );
  }),
];
