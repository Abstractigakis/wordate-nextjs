import Game from "@components/app/Wordate/Game";
import GameControllerFirstRow from "@components/app/Wordate/GameControllerFirstRow";
import GameControllerSecondRow from "@components/app/Wordate/GameControllerSecondRow";
import FuturePuzzle from "@components/app/Wordate/Messages/FuturePuzzle";
import PastPuzzle from "@components/app/Wordate/Messages/PastPuzzle";
import Stats from "@components/app/Wordate/Stats";
import GenericError from "@components/common/messages/GenericError";
import PageLoading from "@components/common/PageLoading";
import { DAY_ZERO, TODAY } from "@lib/utils/constants";
import { dateToPuzzleId } from "@lib/utils/dateHelpers";
import { useFaunaPuzzlesQuery } from "hooks";
import { FC, useState } from "react";
import { IPlayProps } from "./types";

const Play: FC<IPlayProps> = ({ faunaUser }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [puzzleLen, setPuzzleLen] = useState<number>(4);
  const calendarOpen = useState<boolean>(true);
  const viewState = useState<"game" | "stats">("game");
  const [view, setView] = viewState;

  const faunaPuzzlesQuery = useFaunaPuzzlesQuery(dateToPuzzleId(selectedDate));
  const faunaPuzzles = faunaPuzzlesQuery.data;

  console.log({ faunaPuzzles });

  if (selectedDate < DAY_ZERO) {
    return (
      <div className="grid place-items-center">
        <GameControllerFirstRow
          faunaUser={faunaUser}
          viewState={viewState}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          modalState={calendarOpen}
        />
        <PastPuzzle
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
      </div>
    );
  }

  if (selectedDate > TODAY) {
    return (
      <div className="grid place-items-center">
        <GameControllerFirstRow
          faunaUser={faunaUser}
          viewState={viewState}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          modalState={calendarOpen}
        />
        <FuturePuzzle
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
      </div>
    );
  }

  if (faunaPuzzlesQuery.status === "loading") return <PageLoading isLoading />;
  else if (faunaPuzzlesQuery.status === "success")
    return (
      <div className="grid place-items-center">
        <GameControllerFirstRow
          faunaUser={faunaUser}
          viewState={viewState}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          modalState={calendarOpen}
        />

        <GameControllerSecondRow
          faunaPuzzles={faunaPuzzles}
          puzzleLen={puzzleLen}
          setPuzzleLen={setPuzzleLen}
        />

        {view === "game" && (
          <Game
            faunaPuzzle={faunaPuzzles[puzzleLen - 4]}
            faunaUser={faunaUser}
            setView={setView}
          />
        )}

        {view === "stats" && (
          <Stats
            faunaPuzzle={faunaPuzzles[puzzleLen - 4]}
            faunaUser={faunaUser}
          />
        )}
      </div>
    );
  else
    return (
      <GenericError message={JSON.stringify(faunaPuzzlesQuery, null, 2)} />
    );
};

export default Play;
