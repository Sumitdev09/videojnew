
import { ReactNode } from "react";
import Navbar from "./Navbar";

interface LayoutProps {
  children: ReactNode;
  withNavbar?: boolean;
  className?: string;
  fullScreen?: boolean;
}

const Layout = ({ 
  children, 
  withNavbar = true, 
  className = "",
  fullScreen = false
}: LayoutProps) => {
  return (
    <div className={`min-h-screen bg-netflix-black text-netflix-text ${fullScreen ? 'w-screen overflow-hidden' : ''} ${className}`}>
      {withNavbar && <Navbar />}
      {children}
    </div>
  );
};

export default Layout;
