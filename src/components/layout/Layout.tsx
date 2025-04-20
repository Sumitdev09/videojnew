
import { ReactNode } from "react";
import Navbar from "./Navbar";

interface LayoutProps {
  children: ReactNode;
  withNavbar?: boolean;
  className?: string;
}

const Layout = ({ children, withNavbar = true, className = "" }: LayoutProps) => {
  return (
    <div className={`min-h-screen bg-netflix-black text-netflix-text ${className}`}>
      {withNavbar && <Navbar />}
      {children}
    </div>
  );
};

export default Layout;
