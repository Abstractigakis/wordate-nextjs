import Button from "@components/common/Button";
import Title from "@components/common/Typography/Title";
import React, { FC } from "react";

interface IFinalProps {
  restart: Function;
  setView: Function;
}

const Final: FC<IFinalProps> = ({ restart, setView }) => {
  return (
    <div>
      <Title text={"Where to?"} />
      <div className="grid place-items-center">
        <div className="m-1">
          <Button type="red" onClick={() => restart()}>
            Try Again ↺
          </Button>
        </div>
        <div className="m-1">
          <Button onClick={() => setView("stats")}>
            <div className="flex items-center">
              <div className="px-2 flex-row">Stats</div>
              <div className="px-2 flex-row">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                </svg>
              </div>
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Final;
