import { IFaunaPuzzle, IFaunaUser } from "@lib/faunadb/types";
import Histogram from "../Histogram";
import Leaderboard from "../Leaderboard";

export interface IPuzzleProps {
  faunaPuzzle: IFaunaPuzzle;
  faunaUser: IFaunaUser;
}

const Stats = ({ faunaPuzzle, faunaUser }: IPuzzleProps) => {
  return (
    <div className="grid place-items-center m-4">
      <div className="mt-4 p-2 w-full align-center max-w-sm max-h-1/6">
        <Leaderboard faunaPuzzle={faunaPuzzle} faunaUser={faunaUser} />
        <div className="mt-4">
          {/* <Histogram faunaPuzzle={faunaPuzzle} /> */}
        </div>
      </div>
    </div>
  );
};

export default Stats;
