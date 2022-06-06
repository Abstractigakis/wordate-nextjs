import Button from "@components/common/Button";
import Defn from "../Defn";
import { Transition } from "@headlessui/react";
import { FC } from "react";

interface IGameHudProps {
  firstWord: string;
  finalWord: string;
  scoring: boolean;
  score: number;
}

const GameHud: FC<IGameHudProps> = ({
  firstWord,
  finalWord,
  scoring,
  score,
}) => {
  return (
    <div className="flex justify-center border-b mb-2 pb-2">
      <Transition
        show={scoring}
        enter="transform transition duration-[400ms]"
        enterFrom="opacity-0 rotate-[-120deg] scale-50"
        enterTo="opacity-100 rotate-0 scale-100"
        leave="transform duration-200 transition ease-in-out"
        leaveFrom="opacity-100 rotate-0 scale-100 "
        leaveTo="opacity-0 scale-95 "
      >
        <Button disabled type={"green"}>
          Score: {score}
        </Button>
      </Transition>

      <Defn word={firstWord} />
      <Button
        disabled={true}
        type={"secondary"}
        svgEl={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 rounded-lg text-yellow-300"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
            <path
              fillRule="evenodd"
              d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        }
      />

      <Defn word={finalWord} />
    </div>
  );
};

export default GameHud;
