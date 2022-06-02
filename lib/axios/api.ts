import {
  IFaunaPuzzle,
  IFaunaSolve,
  IFaunaSolveData,
  IFaunaUser,
} from "@lib/faunadb/types";
import axios from "axios";

//////////////////////////////////////////////////////////////////////////////
// FAUNA
//////////////////////////////////////////////////////////////////////////////

export const getUser = async (email: string): Promise<IFaunaUser> => {
  console.debug(`AXIOS REQUEST: getUser ${email}`);
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${email}`
  );
  return data;
};

export const putUser = async (newUser: IFaunaUser): Promise<IFaunaUser> => {
  console.debug(`AXIOS REQUEST: putUser ${newUser.email}`);
  const { data } = await axios.put(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${newUser.email}`,
    newUser
  );
  return data;
};

export const getPuzzles = async (puzzleId: string): Promise<IFaunaPuzzle> => {
  console.debug(`AXIOS REQUEST: getPuzzles ${puzzleId}`);
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/daily-puzzles/${puzzleId}`
  );
  return data;
};

export const postSolve = async (
  solveData: IFaunaSolveData
): Promise<IFaunaSolve> => {
  console.debug(`AXIOS REQUEST: postSolve ${solveData}`);
  const { data } = await axios.post(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/solve`,
    solveData
  );
  return data;
};

//////////////////////////////////////////////////////////////////////////////
// Dictionary api
//////////////////////////////////////////////////////////////////////////////

export const getWordInfo = async (word: string) => {
  console.debug(`AXIOS REQUEST: getWordInfo ${word}`);
  const { data } = await axios.get(
    `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
  );
  return data;
};
