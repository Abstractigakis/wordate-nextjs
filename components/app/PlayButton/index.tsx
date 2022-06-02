import Button from "@components/common/Button";
import PageLoading from "@components/common/PageLoading";
import { useRouter } from "next/router";
import { useState } from "react";

const PlayButton = () => {
  const router = useRouter();
  const [isMenuModalOpen, setIsMenuModalOpen] = useState<boolean>(false);
  const [isPageLoadingOpenState, setIsPageLoadingOpenState] =
    useState<boolean>(false);

  return (
    <div>
      <PageLoading isLoading={isPageLoadingOpenState} />
      <div className="grid place-items-center">
        <div className="m-2 p-2">
          <Button
            type="green"
            onClick={() => {
              setIsPageLoadingOpenState(true);
              router.push("/play").then(() => {
                setIsPageLoadingOpenState(false);
                setIsMenuModalOpen(false);
              });
            }}
          >
            <a className="flex items-center">
              <div className="px-2 flex-row">Play</div>
              <div className="px-2 flex-row">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 3a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2H5zm9 4a1 1 0 10-2 0v6a1 1 0 102 0V7zm-3 2a1 1 0 10-2 0v4a1 1 0 102 0V9zm-3 3a1 1 0 10-2 0v1a1 1 0 102 0v-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PlayButton;
