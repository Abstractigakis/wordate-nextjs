import Navbar from "../Navbar";
import { FC, ReactNode } from "react";
import { Toaster } from "react-hot-toast";

export interface ILayoutProps {
  children: ReactNode;
}

const Layout: FC<ILayoutProps> = ({ children }) => {
  return (
    <div className={`w-full min-h-screen min-w-[320px] bg-gray-800 text-white`}>
      <Navbar />
      <div className="my-4">{children}</div>
      <Toaster />
    </div>
  );
};

export default Layout;
