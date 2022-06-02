import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { FaunaAdapter } from "@next-auth/fauna-adapter";
import { faunaDbClient } from "@lib/faunadb/client";

export default NextAuth({
  adapter: FaunaAdapter(faunaDbClient),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
});
