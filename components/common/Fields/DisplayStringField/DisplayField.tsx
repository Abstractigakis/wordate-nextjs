import React, { FC } from "react";

export interface IDisplayFieldProps {
  fieldName: string;
  fieldValue: string;
}

const DisplayField: FC<IDisplayFieldProps> = ({ fieldName, fieldValue }) => {
  return (
    <div className="flex justify-between border-b p-1 m-1 border-blue-600">
      <p className="mx-1 text-lg">{fieldName}:</p>
      <p className="mx-1 text-lg text-yellow-300">{fieldValue}</p>
    </div>
  );
};

export default DisplayField;
