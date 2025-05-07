
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-netflix-black py-12 text-netflix-lightGray">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <Link to="/" className="text-netflix-red font-bold text-2xl">
            VideoJ
          </Link>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white font-medium mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/movies" className="hover:text-white transition-colors">
                  Movies
                </Link>
              </li>
              <li>
                <Link to="/series" className="hover:text-white transition-colors">
                  TV Shows
                </Link>
              </li>
              <li>
                <Link to="/my-list" className="hover:text-white transition-colors">
                  My List
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-medium mb-4">Account</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/login" className="hover:text-white transition-colors">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="hover:text-white transition-colors">
                  Sign Up
                </Link>
              </li>
              <li>
                <Link to="/subscription" className="hover:text-white transition-colors">
                  Subscription
                </Link>
              </li>
              <li>
                <Link to="/account" className="hover:text-white transition-colors">
                  Account Settings
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-medium mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Devices
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-medium mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Terms of Use
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Cookie Preferences
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Corporate Information
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-netflix-mediumGray text-center text-sm">
          <p>&copy; {new Date().getFullYear()} VideoJ. All rights reserved.</p>
          <p className="mt-2">This is a demo project and not a real streaming service.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
