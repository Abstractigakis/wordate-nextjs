export interface IFaunaUser {
  _id: !string;
  _ts: !int;
  email: !string;
  name: !string;
  image: !string;
  displayName: string;
  solves: { data: IFaunaSolve[] };
}

export interface IFaunaPuzzle {
  i: !number;
  j: !number;
  wi: !string;
  wj: !string;
  date: !string;
  solves: { data: !IFaunaSolve[] };
  _id: !string;
}

export interface IFaunaSolve {
  _ts: numer;
  _id: string;
  gameStack: !string[];
  score: !number;
  wordationStack: !string[];
  wordations: !number;
  errorStack: !string[];
  errors: !number;
  user: !IFaunaUser;
  puzzle: !IFaunaPuzzle;
}

export interface IFaunaSolveData {
  gameStack: !string[];
  score: !number;
  wordationStack: !string[];
  wordations: !number;
  errorStack: !string[];
  errors: !number;
  userId: !string;
  puzzleId: !string;
}
