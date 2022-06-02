import MyDatePicker from "@components/app/MyDatePicker";
import Button from "@components/common/Button";
import { IFaunaUser } from "@lib/faunadb/types";
import React, { Dispatch, FC, SetStateAction } from "react";

export interface IGameControllerProps {
  faunaUser: IFaunaUser;
  viewState: ["game" | "stats", Dispatch<SetStateAction<"game" | "stats">>];
  selectedDate: Date;
  setSelectedDate: Dispatch<SetStateAction<Date>>;
  modalState: [boolean, Dispatch<SetStateAction<boolean>>];
}

const GameController: FC<IGameControllerProps> = ({
  faunaUser,
  viewState,
  selectedDate,
  setSelectedDate,
  modalState,
}) => {
  const [view, setView] = viewState;
  return (
    <div>
      <div className="flex justify-center m-2">
        {view === "stats" && (
          <Button
            text="Play"
            svgEl={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                  clipRule="evenodd"
                />
              </svg>
            }
            type="green"
            onClick={() => setView("game")}
          />
        )}

        {view == "game" && (
          <Button
            text="Stats"
            svgEl={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
              </svg>
            }
            onClick={() => setView("stats")}
          />
        )}

        <MyDatePicker
          faunaUser={faunaUser}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          modalState={modalState}
        />
      </div>
    </div>
  );
};

export default GameController;
