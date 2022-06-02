import React, {
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useEffect,
} from "react";
import Button from "@components/common/Button";
import BlackDrop from "./BlackDrop";

export interface IModalProps {
  children: ReactNode;
  title?: ReactNode;
  state: [boolean, Dispatch<SetStateAction<boolean>>];
  onOpen?: Function;
  onClose?: Function;
  hideCloseButton?: boolean;
}

const Modal: FC<IModalProps> = ({
  children,
  title,
  state: [open, setOpen],
  onOpen,
  onClose,
  hideCloseButton,
}) => {
  useEffect(() => {
    open ? onOpen && onOpen() : onClose && onClose();
  }, [open]);

  return (
    <BlackDrop show={open}>
      <div className={`w-full max-w-sm bg-gray-900`}>
        <div className="flex p-1 m-1 max-h-80">
          {title && <p className="text-3xl text-yellow-300">{title}</p>}
          <div className="flex w-full flex-row-reverse">
            {!hideCloseButton && (
              <Button type="red" onClick={() => setOpen(false)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </Button>
            )}
          </div>
        </div>
        {children}
      </div>
    </BlackDrop>
  );
};

export default Modal;
