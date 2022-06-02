import { getPuzzles, getUser, putUser } from "@lib/axios/api";
import { useMutation, useQuery, useQueryClient } from "react-query";

//////////////////////////////////////////////////////////////////////////////
// FAUNA React Query
//////////////////////////////////////////////////////////////////////////////

export const useFaunaUserQuery = (authUserEmail: string) => {
  return useQuery(["get-self", authUserEmail], () => getUser(authUserEmail), {
    staleTime: Infinity,
    retry: false,
    select: (data: any) => {
      const usersByEmail = data.userByEmail.data;
      if (usersByEmail.length == 0) {
        throw new Error("No User found");
      }
      const faunaUser = usersByEmail.slice(-1)[0];
      if (usersByEmail.length > 1) {
        console.error(`more that 1 user found with email ${authUserEmail}`);
      }
      return faunaUser;
    },
  });
};

export const useFaunaUserUpdateMutation = (faunaUserEmail: string) => {
  const queryClient = useQueryClient();
  return useMutation(putUser, {
    onSuccess: () => {
      queryClient.invalidateQueries(["get-self", faunaUserEmail]);
    },
  });
};

export const useFaunaPuzzlesQuery = (puzzleId: string) => {
  return useQuery(["get-puzzles", puzzleId], () => getPuzzles(puzzleId), {
    staleTime: Infinity,
    retry: false,
    select: (data: any) => {
      const puzzlesByDate = data.puzzlesByDate.data;
      if (puzzlesByDate.length == 0) {
        throw new Error("No puzzles found");
      }
      if (puzzlesByDate.length !== 3) {
        throw new Error(
          `${puzzlesByDate.length} puzzles found, but expected 3`
        );
      }
      return puzzlesByDate;
    },
  });
};
