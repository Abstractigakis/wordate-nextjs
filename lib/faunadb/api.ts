import {
  IFaunaSolve,
  IFaunaUser,
  IFaunaPuzzle,
  IFaunaSolveData,
} from "./types";
import { graphQLClient } from "./client";
import { createSolveMutation, updateUserMutation } from "./graphql/mutations";
import { puzzleByDateQuery, userByEmailQuery } from "./graphql/queries";

//////////////////////////////////////////////////////////////////////////////
// Fauna GQL requests
//////////////////////////////////////////////////////////////////////////////
export const getPuzzleByDate = async (date: string): Promise<IFaunaPuzzle> => {
  console.debug(`GQL FAUNA REQUEST: getPuzzleByDate `);
  const res = await graphQLClient.request(puzzleByDateQuery, {
    input: date,
  });
  return res;
};

export const getUserByEmail = async (email: string): Promise<IFaunaUser> => {
  console.debug(`GQL FAUNA REQUEST: getUserByEmail `);
  const res = await graphQLClient.request(userByEmailQuery, {
    input: email,
  });
  return res;
};

export const updateUser = async (newUser: IFaunaUser): Promise<IFaunaUser> => {
  console.debug(`GQL FAUNA REQUEST: updateUser ${newUser.email}`);
  let data = newUser;
  const id = newUser._id;

  // @ts-ignore
  delete data["_id"];
  delete data["_ts"];

  const res = await graphQLClient.request(updateUserMutation, {
    id,
    ...data,
  });
  return res;
};

export const createSolve = async (
  solveData: IFaunaSolveData
): Promise<IFaunaSolve> => {
  console.debug(`GQL FAUNA REQUEST: createSolve ${solveData.score}`);
  const res = await graphQLClient.request(createSolveMutation, solveData);
  return res;
};
