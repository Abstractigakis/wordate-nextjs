import Game from "@components/app/Wordate/Game";
import GameController from "@components/app/Wordate/GameController";
import Stats from "@components/app/Wordate/Stats";
import GenericError from "@components/common/messages/GenericError";
import PageLoading from "@components/common/PageLoading";
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

  if (faunaPuzzlesQuery.status === "loading") return <PageLoading isLoading />;
  else if (faunaPuzzlesQuery.status === "success")
    return (
      <div className="grid place-items-center">
        <GameController
          faunaUser={faunaUser}
          faunaPuzzles={faunaPuzzles}
          viewState={viewState}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          modalState={calendarOpen}
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
