import { FC } from "react";
import { ISuccessProps } from "./types";
import { shootFireworks } from "@lib/fireworks";

const Success: FC<ISuccessProps> = ({ faunaUser }) => {
  return (
    <div className="container xl:max-w-screen-xl mx-auto py-12 px-6 text-center">
      <div className="py-4 px-8 rounded-md  max-w-lg mx-auto">
        <h2 className="text-4xl font-semibold flex flex-col items-center space-x-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-12 h-12 flex-shrink-0 text-green-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Thanks for your order!</span>
          <span>Please wait to be redirected to profile</span>
        </h2>
        <p className="text-lg mt-3">Check your inbox for the receipt.</p>
      </div>
    </div>
  );
};

export default Success;
