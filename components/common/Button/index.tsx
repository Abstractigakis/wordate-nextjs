import { FC, ReactNode, MouseEventHandler } from "react";

export interface IButtonProps {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  tooltip?: string;
  children?: ReactNode;
  type?:
    | null
    | "red"
    | "green"
    | "secondary"
    | "tertiary"
    | "primary"
    | "quaternary";
  svgEl?: JSX.Element;
  text?: string;
  disabled?: boolean;
  notify?: boolean;
  circle?: boolean;
}

const Button: FC<IButtonProps> = ({
  children,
  onClick,
  type,
  disabled,
  notify,
  svgEl,
  text,
  circle,
}) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`group m-1 p-1 transition-all duration-fast ${
        type === "secondary"
          ? `bg-gray-900 text-yellow-300 ${
              disabled ? "hover:bg-gray-700" : null
            }`
          : type === `tertiary`
          ? `bg-purple-600 ${!disabled ? "hover:bg-purple-400" : null}`
          : type === `red`
          ? `bg-red-600 ${!disabled ? "hover:bg-red-400" : null}`
          : type === `green`
          ? `bg-green-600  ${!disabled ? "hover:bg-green-400" : null}`
          : type === `quaternary`
          ? `bg-yellow-300 text-gray-900 ${
              !disabled ? "hover:bg-yellow-500" : null
            }`
          : `bg-blue-600 hover:bg-blue-400`
      }

      ${notify ? "animation-wiggle" : null}
      ${circle ? "rounded-full" : "rounded-md"}
      `}
    >
      {svgEl && text ? (
        <div className="flex items-center">
          <div className="px-2 flex-row">{text}</div>
          <div className="px-2 flex-row flex">{svgEl}</div>
        </div>
      ) : text ? (
        text
      ) : svgEl ? (
        svgEl
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
