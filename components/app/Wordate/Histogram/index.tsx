import { IFaunaPuzzle } from "@lib/faunadb/types";
import { FC } from "react";

export interface IHistogramProps {
  faunaPuzzle: IFaunaPuzzle;
}

const Histogram: FC<IHistogramProps> = ({ faunaPuzzle }) => {
  return <div>Histogram</div>;
};

export default Histogram;
