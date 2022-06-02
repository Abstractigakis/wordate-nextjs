import Button from "@components/common/Button";
import { IFaunaPuzzle } from "@lib/faunadb/types";
import React, { FC } from "react";

export interface IGameControllerProps {
  faunaPuzzles: IFaunaPuzzle[];
  puzzleLen: number;
  setPuzzleLen: Function;
}

const GameController: FC<IGameControllerProps> = ({
  faunaPuzzles,
  puzzleLen,
  setPuzzleLen,
}) => {
  return (
    <div className="flex justify-center m-2">
      {[4, 5, 6].map((n: number) => (
        <Button
          key={n}
          type={n === puzzleLen ? "green" : "secondary"}
          onClick={() => setPuzzleLen(n)}
          text={`${faunaPuzzles[n - 4].wi} ${faunaPuzzles[n - 4].wj}`}
        />
      ))}
    </div>
  );
};

export default GameController;
