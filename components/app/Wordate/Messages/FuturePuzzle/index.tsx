import Button from "@components/common/Button";
import { TODAY } from "@lib/utils/constants";
import { dateToPuzzleId } from "@lib/utils/dateHelpers";
import { FC } from "react";

export interface IFuturePuzzleProps {
  selectedDate: Date;
  setSelectedDate: Function;
}

const FuturePuzzle: FC<IFuturePuzzleProps> = ({
  selectedDate,
  setSelectedDate,
}) => {
  return (
    <div className="grid place-items-center mt-6">
      <div className="text-red-600">Selected a future date!</div>
      <div className="text-red-600">
        Puzzle will be relased on {dateToPuzzleId(selectedDate)}
      </div>
      <div className="mt-6">
        <Button onClick={() => setSelectedDate(TODAY)}>Today's puzzle</Button>
      </div>
    </div>
  );
};

export default FuturePuzzle;
