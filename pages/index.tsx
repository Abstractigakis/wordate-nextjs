import Home from "@components/app/pages/Home";
import type { NextPage } from "next";
import Head from "next/head";

const HomePage: NextPage = () => {
  return (
    <>
      <Head>
        <title>{process.env.NEXT_PUBLIC_APP_TTILE}</title>
        <meta name="description" content="A word based game web application" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Home />
    </>
  );
};

export default HomePage;
