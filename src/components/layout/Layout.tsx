
import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

interface LayoutProps {
  children: ReactNode;
  withNavbar?: boolean;
  className?: string;
  fullScreen?: boolean;
  withFooter?: boolean;
}

const Layout = ({ 
  children, 
  withNavbar = true,
  withFooter = true,
  className = "",
  fullScreen = false
}: LayoutProps) => {
  return (
    <div className={`min-h-screen bg-netflix-black text-netflix-text ${fullScreen ? 'w-screen overflow-hidden' : ''} ${className}`}>
      {withNavbar && <Navbar />}
      <main className="min-h-[calc(100vh-80px)]">
        {children}
      </main>
      {withFooter && <Footer />}
    </div>
  );
};

export default Layout;
