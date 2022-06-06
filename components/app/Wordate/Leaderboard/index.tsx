import Title from "@components/common/Typography/Title";
import { IFaunaPuzzle, IFaunaUser } from "@lib/faunadb/types";
import { FC } from "react";

export interface ILeaderboardProps {
  faunaPuzzle: IFaunaPuzzle;
  faunaUser: IFaunaUser;
}

const Leaderboard: FC<ILeaderboardProps> = ({ faunaPuzzle, faunaUser }) => {
  // sort solves
  let leaderboard = [...faunaPuzzle.solves.data];
  leaderboard.sort(function (a, b) {
    if (a.wordationStack.length === b.wordationStack.length) {
      // time is only important when socre are the same
      return a._ts - b._ts;
    }
    return a.wordationStack.length > b.wordationStack.length ? 1 : -1;
  });

  // only keep best soves for each user
  let seenUsers: string[] = [];
  for (let i = 0; i < leaderboard.length; i++) {
    const solve = leaderboard[i];
    const uid = solve.user._id;
    if (seenUsers.includes(uid)) {
      leaderboard.splice(i, 1);
      i--;
    } else {
      seenUsers.push(uid);
    }
  }

  return (
    <div>
      <Title text={"😎🚀 Leaderboard 🚀😎"} />
      <div className="m-1 p-1 grid grid-cols-5 border-b">
        <LeaderboardHeadingCell text={"Place"} />
        <LeaderboardHeadingCell text={"Player"} threeCols />
        <LeaderboardHeadingCell text={"Wordations"} />
      </div>
      <div className="overflow-y-scroll max-h-80">
        {leaderboard.map((solve, i) => {
          const isMe = solve.user._id === faunaUser._id;
          return (
            <div className="m-1 p-1 grid grid-cols-5 border-b" key={solve._id}>
              <LeaderboardCell isMe={isMe} text={i + 1} />
              <LeaderboardCell
                threeCols
                isMe={isMe}
                text={solve.user.displayName || solve.user.name}
              />
              <LeaderboardCell
                isMe={isMe}
                text={solve.wordationStack.length - 1}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Leaderboard;

export interface ILeaderboardCellProps {
  isMe: boolean;
  text: number | string;
  threeCols?: boolean;
}

const LeaderboardCell: FC<ILeaderboardCellProps> = ({
  isMe,
  text,
  threeCols,
}) => {
  return (
    <div
      className={`grid place-items-center text-xs ${
        isMe ? "text-yellow-300" : null
      } ${threeCols ? "col-span-3" : null}`}
    >
      {text}
    </div>
  );
};

export interface ILeaderboardHeadingCellProps {
  text: string;
  threeCols?: boolean;
}

const LeaderboardHeadingCell: FC<ILeaderboardHeadingCellProps> = ({
  text,
  threeCols,
}) => {
  return (
    <div
      className={`grid place-items-center text-xs ${
        threeCols ? "col-span-3" : null
      }`}
    >
      {text}
    </div>
  );
};
