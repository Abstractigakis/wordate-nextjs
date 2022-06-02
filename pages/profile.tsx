import Profile from "@components/common/pages/Profile";
import GenericError from "@components/common/messages/GenericError";
import PageLoading from "@components/common/PageLoading";
import { useFaunaUserQuery } from "hooks";
import { withCustomServerSidePageAuth } from "@lib/nextAuth/middleware/server/pages";
import { GetServerSideProps, NextPage } from "next";

interface IProfilePageProps {
  data: { authUserEmail: string };
}

const ProfilePage: NextPage<IProfilePageProps> = ({ data }) => {
  const { authUserEmail } = data;
  const faunaUserQuery = useFaunaUserQuery(authUserEmail);
  const faunaUser = faunaUserQuery.data;
  if (faunaUserQuery.status === "loading") return <PageLoading isLoading />;
  else if (faunaUserQuery.status === "success")
    return <Profile faunaUser={faunaUser} />;
  else
    return <GenericError message={JSON.stringify(faunaUserQuery, null, 2)} />;
};

export default ProfilePage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  return await withCustomServerSidePageAuth(context);
};
