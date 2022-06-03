import Button from "@components/common/Button";
import Modal from "@components/common/Modal";
import { Transition } from "@headlessui/react";
import React, { FC, useState } from "react";
import { IFaunaPuzzle, IFaunaSolve, IFaunaUser } from "@lib/faunadb/types";
import Congrats from "../Congrats";
import Final from "../Final";
import Leaderboard from "../Leaderboard";
// import Premium from "../Premium";

export interface IWinningCarousel {
  solveObj: IFaunaSolve;
  faunaUser: IFaunaUser;
  faunaPuzzle: IFaunaPuzzle;
  restart: Function;
  setView: Function;
  setCalendarOpen: Function;
}

const WinningCarousel: FC<IWinningCarousel> = ({
  solveObj,
  faunaUser,
  faunaPuzzle,
  restart,
  setView,
  setCalendarOpen,
}) => {
  const [carouselIndex, setCarouselIndex] = useState(0);

  const winnerModalState = useState<boolean>(true);

  let carouselComponenets = [
    <Congrats key="congrats" solveObj={solveObj} />,
    <Leaderboard
      key="leaderboard"
      faunaPuzzle={faunaPuzzle}
      faunaUser={faunaUser}
    />,
    <Final
      key="final"
      restart={restart}
      setView={setView}
      setCalendarOpen={setCalendarOpen}
      setModalOpen={winnerModalState[1]}
    />,
  ];

  const stepBack = () => {
    setCarouselIndex((prev: number) => {
      if (prev === null) return prev;
      if (prev === 0) return prev;
      return (prev - 1) % carouselComponenets.length;
    });
  };

  const setpForward = () => {
    setCarouselIndex((prev: number) => {
      if (prev === carouselComponenets.length - 1) return prev;
      return (prev + 1) % carouselComponenets.length;
    });
  };

  return (
    <div>
      <Modal state={winnerModalState} hideCloseButton>
        <Transition
          show={winnerModalState[0]}
          enter="transition-opacity duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          {carouselComponenets[carouselIndex]}
          <div className="mt-12 flex">
            {carouselIndex > 0 && (
              <Button
                type="red"
                text="Back"
                onClick={() => stepBack()}
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
                      d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z"
                    />
                  </svg>
                }
              />
            )}
            {carouselIndex + 1 !== carouselComponenets.length && (
              <div className="flex w-full flex-row-reverse">
                <Button
                  type="green"
                  onClick={() => setpForward()}
                  text="Continue"
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
                        d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  }
                />
              </div>
            )}
          </div>
        </Transition>
      </Modal>
    </div>
  );
};

export default WinningCarousel;
