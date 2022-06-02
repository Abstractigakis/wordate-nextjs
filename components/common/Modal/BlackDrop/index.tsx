import { Transition } from "@headlessui/react";
import { FC, ReactNode } from "react";

interface IBlackDropProps {
  children: ReactNode;
  show?: boolean;
}

const BlackDrop: FC<IBlackDropProps> = ({ show, children }) => {
  return (
    <Transition
      show={show}
      enter="transition-opacity duration-500"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-500"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className="bg-black bg-opacity-50 absolute inset-0 grid place-items-center">
        {children}
      </div>
    </Transition>
  );
};

export default BlackDrop;
