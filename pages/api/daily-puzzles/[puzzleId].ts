import { getPuzzleByDate } from "@lib/faunadb/api";
import { IFaunaPuzzle } from "@lib/faunadb/types";
import { NextApiRequest, NextApiResponse } from "next";

export default async (
  req: NextApiRequest,
  res: NextApiResponse<IFaunaPuzzle | String>
): Promise<void> => {
  const {
    query: { puzzleId },
  } = req;

  if (req.method !== "GET" && req.method !== "PUT") {
    return res.status(405).json("Method not allowed");
  }

  if (typeof puzzleId !== "string") {
    return res.status(406).json("id is not of correct type");
  }

  if (req.method === "GET") {
    try {
      const existingPuzzleData = await getPuzzleByDate(puzzleId);
      return res.status(200).json(existingPuzzleData);
    } catch (error) {
      return res.status(500).json(JSON.stringify(error, null, 2));
    }
  }

  res.status(400).json("Bad Request, case not handled");
};
