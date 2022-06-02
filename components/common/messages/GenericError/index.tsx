import { FC } from "react";

export interface IGenericErrorProps {
  message: string;
}
const GenericError: FC<IGenericErrorProps> = ({ message }) => {
  return <p>{message}</p>;
};

export default GenericError;
