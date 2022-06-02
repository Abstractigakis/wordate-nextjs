import Button from "@components/common/Button";
import { DAY_ZERO, TODAY } from "@lib/utils/constants";
import { dateToPuzzleId } from "@lib/utils/dateHelpers";
import { FC } from "react";

export interface IPastPuzzleProps {
  selectedDate: Date;
  setSelectedDate: Function;
}

const PastPuzzle: FC<IPastPuzzleProps> = ({
  selectedDate,
  setSelectedDate,
}) => {
  return (
    <div className="grid place-items-center mt-6">
      <div className="text-red-600">
        No Puzzles before {dateToPuzzleId(DAY_ZERO)}
      </div>
      <div className="flex mt-6">
        <Button onClick={() => setSelectedDate(DAY_ZERO)}>
          Earliest puzzle
        </Button>
        <Button onClick={() => setSelectedDate(TODAY)}>Today's puzzle</Button>
      </div>
    </div>
  );
};

export default PastPuzzle;
