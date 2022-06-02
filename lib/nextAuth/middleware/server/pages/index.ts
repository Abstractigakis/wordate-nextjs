import { getUser } from "@lib/axios/api";
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  PreviewData,
} from "next";
import { getSession } from "next-auth/react";
import { ParsedUrlQuery } from "querystring";
import { QueryClient, dehydrate } from "react-query";

export const withRedirectLoggedInUserToProfile: GetServerSideProps = async (
  context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>
) => {
  const session = await getSession({ req: context.req });
  if (session) {
    return {
      redirect: {
        permanent: false,
        destination: "/profile",
      },
      props: { data: {} },
    };
  }
  return {
    props: {
      data: {},
    },
  };
};

export const withCustomServerSidePageAuth: GetServerSideProps = async (
  context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>
) => {
  const session = await getSession({ req: context.req });
  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
      props: {},
    };
  } else {
    const queryClient = new QueryClient();
    const authUser = session.user;
    // @ts-ignore
    const authUserEmail: string = authUser.email;

    await queryClient.prefetchQuery(
      ["get-self", authUserEmail],
      () => getUser(authUserEmail),
      {
        retry: false,
        staleTime: Infinity,
      }
    );

    const dehydratedState = dehydrate(queryClient);
    return {
      props: {
        dehydratedState,
        data: { authUserEmail },
      },
    };
  }
};
