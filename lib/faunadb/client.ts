import { Client as FaunaClient } from "faunadb";
import { GraphQLClient } from "graphql-request";

const KEY = process.env.FAUNADB_SECRET;

// used for creating users with next auth
export const faunaDbClient = new FaunaClient({
  // @ts-ignore
  secret: KEY,
  domain: "db.us.fauna.com",
  scheme: "https",
});

// used for our custom queries
export const graphQLClient = new GraphQLClient(
  "https://graphql.us.fauna.com/graphql",
  {
    headers: {
      authorization: `Bearer ${KEY}`,
    },
  }
);
