import React from "react";

const PremiumSubscriptionMessage = () => {
  return (
    <>
      <div className="m-2 p-2 flex justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 m-1 text-yellow-300"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <p className="text-3xl text-yellow-300">5,99</p>
        <p className="text-xs pl-2">monthly</p>
      </div>
      <div className="m-2 p-2 grid place-items-center">
        <p>
          Unlocks all{" "}
          <span className="text-yellow-300">
            {/* {3 * daysBw(TODAY, DAY_ZERO)} */}
            456
          </span>{" "}
          Goodies
        </p>
      </div>
    </>
  );
};

export default PremiumSubscriptionMessage;
