import { FC } from "react";

interface ITitleProps {
  text: string;
}

const Title: FC<ITitleProps> = ({ text }) => {
  return (
    <h1 className="p-1 grid place-items-center text-xl text-yellow-300">
      {text}
    </h1>
  );
};

export default Title;
