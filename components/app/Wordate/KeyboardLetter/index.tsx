import { MouseEventHandler, ReactNode } from "react";

export interface IGameStateLetterProps {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  children?: ReactNode;
  selected?: boolean;
  disabled?: boolean;
}

const KeyBoardButton = ({
  children,
  onClick,
  selected,
  disabled,
}: IGameStateLetterProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`flip-letter m-[2px] w-8 h-8 rounded-md transition-all duration-fast ${
        selected
          ? "bg-yellow-600 hover:bg-yellow-400"
          : "bg-blue-600 hover:bg-blue-400"
      }`}
    >
      {children}
    </button>
  );
};

export default KeyBoardButton;
