import { FC, useState } from "react";
import Button from "@components/common/Button";
import Modal from "@components/common/Modal";
import PageLoading from "@components/common/PageLoading";
import { useRouter } from "next/router";

const Navbar: FC = () => {
  const router = useRouter();
  const PAGES: ILinks[] = [
    {
      link: "/",
      text: "Home",
      svgEl: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
        </svg>
      ),
    },
    {
      link: "/profile",
      text: "Profile",
      svgEl: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 2a1 1 0 00-1 1v1a1 1 0 002 0V3a1 1 0 00-1-1zM4 4h3a3 3 0 006 0h3a2 2 0 012 2v9a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm2.5 7a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm2.45 4a2.5 2.5 0 10-4.9 0h4.9zM12 9a1 1 0 100 2h3a1 1 0 100-2h-3zm-1 4a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      link: "/play",
      text: "Play",
      svgEl: (
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
      ),
    },
  ];

  // context start
  const modalOpenState = useState<boolean>(false);
  const [isMenuModalOpen, setIsMenuModalOpen] = modalOpenState;
  const pageLoadingOpenState = useState<boolean>(false);
  const [isPageLoadingOpenState, setIsPageLoadingOpenState] =
    pageLoadingOpenState;
  // context end

  return (
    <div className={`p-3 w-full bg-gray-900`}>
      <div className="m-auto flex flex-row max-w-2xl">
        {/* title and logo that link home */}
        <Button
          onClick={() => {
            setIsPageLoadingOpenState(true);
            router.push("/").then(() => {
              setIsPageLoadingOpenState(false);
              setIsMenuModalOpen(false);
            });
          }}
          type={"secondary"}
          text={process.env.NEXT_PUBLIC_APP_TTILE}
        />

        {/* hambarger that opens nav PAGES modal */}

        <div className="flex w-full flex-row-reverse">
          <div>
            <Button onClick={() => setIsMenuModalOpen(true)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </Button>
          </div>
        </div>
      </div>

      <Modal title="Menu" state={modalOpenState}>
        <div className="grid place-items-center">
          {PAGES.map(({ link, text, svgEl }: ILinks) => {
            return (
              <div className="my-2" key={text}>
                <Button
                  key={`link_to_${link}`}
                  onClick={() => {
                    setIsMenuModalOpen(false);
                    setIsPageLoadingOpenState(true);
                    router.push(link).then(() => {
                      setIsPageLoadingOpenState(false);
                      setIsMenuModalOpen(false);
                    });
                  }}
                  text={text}
                  svgEl={svgEl}
                />
              </div>
            );
          })}
        </div>
      </Modal>

      {isPageLoadingOpenState && <PageLoading isLoading={true} />}
    </div>
  );
};

export interface ILinks {
  link: string;
  text: string;
  svgEl: JSX.Element;
}

export default Navbar;
