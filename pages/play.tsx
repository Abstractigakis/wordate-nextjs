import Play from "@components/app/pages/Play";
import GenericError from "@components/common/messages/GenericError";
import PageLoading from "@components/common/PageLoading";
import { useFaunaUserQuery } from "hooks";
import { withCustomServerSidePageAuth } from "@lib/nextAuth/middleware/server/pages";
import { GetServerSideProps, NextPage } from "next";

interface IPlayPageProps {
  data: { authUserEmail: string; puzzleId: string };
}

const PlayPage: NextPage<IPlayPageProps> = ({ data }) => {
  const { authUserEmail } = data;

  const faunaUserQuery = useFaunaUserQuery(authUserEmail);
  const faunaUser = faunaUserQuery.data;

  if (faunaUserQuery.status === "loading") return <PageLoading isLoading />;
  else if (faunaUserQuery.status === "success")
    return <Play faunaUser={faunaUser} />;
  else
    return <GenericError message={JSON.stringify(faunaUserQuery, null, 2)} />;
};

export default PlayPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  return await withCustomServerSidePageAuth(context);
};
