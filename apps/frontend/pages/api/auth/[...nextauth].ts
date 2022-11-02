import type { NextApiRequest, NextApiResponse } from "next";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import graphqlClient from "../../../src/api/graphql-client";

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  const sessionCookie = req.cookies["zeenzen_sess"];

  console.log("session cookie: ", sessionCookie);

  return await NextAuth(req, res, {
    secret: process.env.AUTH_SECRET,
    providers: [
      // CredentialsProvider({
      //   credentials: { email: '' }
      // })
    ],
    callbacks: {
      session({ session }) {
        //@ts-ignore
        session.zeenzen_sess = sessionCookie;
        console.log("session: ", session);
        return session;
      },
    },
  });
}
