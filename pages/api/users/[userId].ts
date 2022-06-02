import { IFaunaUser } from "@lib/faunadb/types";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { getUserByEmail, updateUser } from "@lib/faunadb/api";
import { getSession } from "next-auth/react";

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<IFaunaUser | string>
): Promise<void> => {
  const {
    query: { userId },
  } = req;

  if (req.method !== "PUT" && req.method !== "GET") {
    return res.status(405).json("Method not allowed");
  }

  if (req.method !== "GET") {
    const session = await getSession({ req });
    if (!session) return res.status(401).json("Please log in to get access.");
    if (!session?.user?.email) return res.status(500).json("No User email");
    if (session.user.email !== userId) {
      return res.status(401).json("Can't access other accounts");
    }
  }

  if (typeof userId !== "string") {
    return res.status(406).json("id is not of correct type");
  }

  if (req.method === "GET") {
    try {
      const faunaUser: IFaunaUser = await getUserByEmail(userId);
      return res.status(200).json(faunaUser);
    } catch (error) {
      return res.status(500).json(JSON.stringify(error, null, 2));
    }
  }

  if (req.method === "PUT") {
    try {
      const newUser = req.body;
      const newUserData = await updateUser(newUser);
      return res.status(200).json(newUserData);
    } catch (error) {
      return res.status(500).json(JSON.stringify(error, null, 2));
    }
  }

  return res.status(400).json("Bad Request, case not handled");
};

export default handler;
