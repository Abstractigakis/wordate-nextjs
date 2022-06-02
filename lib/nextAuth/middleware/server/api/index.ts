import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

export const withNextAuthProtectApi = (handler: NextApiHandler) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getSession({ req });
    if (session) return handler(req, res);
    return res.status(401).json({ message: "Please log in to get access." });
  };
};
