import Button from "@components/common/Button";
import Title from "@components/common/Typography/Title";
import React, { FC } from "react";

interface IFinalProps {
  restart: Function;
  setView: Function;
  setCalendarOpen: Function;
  setModalOpen: Function;
}

const Final: FC<IFinalProps> = ({
  restart,
  setView,
  setCalendarOpen,
  setModalOpen,
}) => {
  return (
    <div>
      <Title text={"Where to?"} />
      <div className="grid place-items-center">
        <div className="m-1">
          <Button
            type="red"
            onClick={() => restart()}
            text="Try Again"
            svgEl={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
            }
          />
        </div>
        <div className="m-1">
          <Button
            onClick={() => setView("stats")}
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
          />
        </div>
        <div className="m-1">
          <Button
            type={"green"}
            onClick={() => {
              setModalOpen(false);
              setCalendarOpen(true);
            }}
            text="More Puzzles"
            svgEl={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            }
          />
        </div>
      </div>
    </div>
  );
};

export default Final;
