import { IFaunaSolve } from "@lib/faunadb/types";
import { NextApiRequest, NextApiResponse } from "next";
import { createSolve } from "@lib/faunadb/api";

export default async (
  req: NextApiRequest,
  res: NextApiResponse<IFaunaSolve | String>
): Promise<void> => {
  // check for allowed methods
  if (req.method !== "POST") {
    res.status(405).json("Method not allowed");
    return;
  }

  if (req.method === "POST") {
    try {
      const solveData = req.body;
      const newSolveData = await createSolve(solveData);
      res.status(200).json(newSolveData);
      return;
    } catch (error) {
      console.error({ error });
      res.status(500).json(JSON.stringify(error, null, 2));
      return;
    }
  }

  res.status(400).json("Bad Request, case not handled");
};
