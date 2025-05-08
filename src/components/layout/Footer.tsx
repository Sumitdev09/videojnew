
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Youtube, Mail, Copyright, Globe } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-netflix-black pt-16 pb-8 text-netflix-lightGray">
      <div className="container mx-auto px-4">
        {/* Logo and tagline */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-4">
          <div>
            <Link to="/" className="text-netflix-red font-bold text-3xl">
              VideoJ
            </Link>
            <p className="mt-2 text-sm md:text-base">Stream. Discover. Experience.</p>
          </div>
          
          {/* Social media links */}
          <div className="flex items-center space-x-4">
            <a href="#" className="hover:text-netflix-red transition-colors p-2">
              <Facebook size={20} />
            </a>
            <a href="#" className="hover:text-netflix-red transition-colors p-2">
              <Instagram size={20} />
            </a>
            <a href="#" className="hover:text-netflix-red transition-colors p-2">
              <Twitter size={20} />
            </a>
            <a href="#" className="hover:text-netflix-red transition-colors p-2">
              <Youtube size={20} />
            </a>
            <a href="mailto:info@videoj.com" className="hover:text-netflix-red transition-colors p-2">
              <Mail size={20} />
            </a>
          </div>
        </div>
        
        {/* Navigation Links */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-white font-semibold text-lg mb-6">Navigation</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="hover:text-netflix-red transition-colors flex items-center gap-2">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/movies" className="hover:text-netflix-red transition-colors flex items-center gap-2">
                  Movies
                </Link>
              </li>
              <li>
                <Link to="/series" className="hover:text-netflix-red transition-colors flex items-center gap-2">
                  TV Shows
                </Link>
              </li>
              <li>
                <Link to="/my-list" className="hover:text-netflix-red transition-colors flex items-center gap-2">
                  My List
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold text-lg mb-6">Account</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/login" className="hover:text-netflix-red transition-colors flex items-center gap-2">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="hover:text-netflix-red transition-colors flex items-center gap-2">
                  Sign Up
                </Link>
              </li>
              <li>
                <Link to="/subscription" className="hover:text-netflix-red transition-colors flex items-center gap-2">
                  Subscription
                </Link>
              </li>
              <li>
                <Link to="/account" className="hover:text-netflix-red transition-colors flex items-center gap-2">
                  Account Settings
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold text-lg mb-6">Support</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="hover:text-netflix-red transition-colors flex items-center gap-2">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-netflix-red transition-colors flex items-center gap-2">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-netflix-red transition-colors flex items-center gap-2">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-netflix-red transition-colors flex items-center gap-2">
                  Devices
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold text-lg mb-6">Legal</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="hover:text-netflix-red transition-colors flex items-center gap-2">
                  Terms of Use
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-netflix-red transition-colors flex items-center gap-2">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-netflix-red transition-colors flex items-center gap-2">
                  Cookie Preferences
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-netflix-red transition-colors flex items-center gap-2">
                  Corporate Information
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Newsletter */}
        <div className="bg-netflix-darkGray bg-opacity-50 p-6 rounded-lg mb-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <h3 className="text-white font-semibold text-lg mb-1">Stay Updated</h3>
              <p className="text-sm">Subscribe to our newsletter for exclusive content and updates</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="px-4 py-2 bg-netflix-mediumGray border border-netflix-lightGray rounded-md focus:outline-none focus:border-netflix-red text-white w-full sm:w-64"
              />
              <button className="bg-netflix-red hover:bg-netflix-red/90 text-white px-6 py-2 rounded-md transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        
        {/* Bottom bar with copyright */}
        <div className="pt-8 border-t border-netflix-mediumGray flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center text-sm">
            <Copyright size={16} className="mr-2" />
            <p>{currentYear} VideoJ. All rights reserved.</p>
          </div>
          
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center">
              <Globe size={16} className="mr-2" />
              <select className="bg-transparent border-none focus:outline-none text-netflix-lightGray cursor-pointer">
                <option value="en">English</option>
                <option value="es">Español</option>
                <option value="fr">Français</option>
              </select>
            </div>
            <p>This is a demo project and not a real streaming service.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
