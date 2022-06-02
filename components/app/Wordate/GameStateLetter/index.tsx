import { MouseEventHandler, ReactNode } from "react";

export interface IGameStateLetterProps {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  children?: ReactNode;
  correct: boolean;
  badWord: boolean;
  selected: boolean;
  disabled: boolean;
}

const GameStateLetter = ({
  children,
  onClick,
  correct,
  badWord,
  selected,
  disabled,
}: IGameStateLetterProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`m-1 w-10 h-10 rounded-md text-2xl transition-all duration-fast ${
        selected
          ? "bg-yellow-600 hover:bg-yellow-400"
          : badWord
          ? "bg-red-600 hover:bg-red-400"
          : correct
          ? "bg-green-600 hover:bg-green-400"
          : "bg-blue-600 hover:bg-blue-400"
      }`}
    >
      {children}
    </button>
  );
};

export default GameStateLetter;
