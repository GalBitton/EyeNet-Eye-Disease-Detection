import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link for routing
import Logo from "../assets/symbol1-removebg-preview.png";
import { HiMenuAlt1, HiMenuAlt3 } from "react-icons/hi";
import DarkMode from "./DarkMode";

const NavLinks = [
  { id: 1, name: "Home", link: "/" },
  { id: 2, name: "Record", link: "/record-video" }, // Corrected route
  { id: 3, name: "Upload", link: "/video-upload" },
  { id: 4, name: "Contact Us", link: "/contact" },
];

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const toggleMenu = () => setShowMenu(!showMenu);

  return (
    <div className="relative z-[9999] text-black dark:text-white duration-300">
      <div className="container py-2 md:py-0">
        <div className="flex justify-between items-center">
          {/* Logo Section */}
          <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <img src={Logo} alt="EyeNet Logo" className="h-16 mt-2" />
            <p className="text-3xl">
              Eye
              <span className="font-bold">Net</span>
            </p>
          </Link>
        </div>
          {/* Desktop Menu Section */}
          <nav className="hidden md:block">
            <ul className="flex items-center gap-8">
              {NavLinks.map(({ id, name, link }) => (
                <li key={id} className="py-4">
                  <Link
                    to={link} // Use Link component for routing
                    className="text-xl font-semibold hover:text-primary py-2 hover:border-b-2 hover:border-secondary transition-colors duration-500"
                  >
                    {name}
                  </Link>
                </li>
              ))}
              {/* DarkMode feature */}
              <DarkMode />
            </ul>
          </nav>

          {/* Mobile Menu Section */}
          <div className="md:hidden block">
            <div className="flex items-center gap-4">
              <DarkMode />
              {showMenu ? (
                <HiMenuAlt1
                  className="cursor-pointer"
                  size={30}
                  onClick={toggleMenu}
                />
              ) : (
                <HiMenuAlt3
                  className="cursor-pointer"
                  size={30}
                  onClick={toggleMenu}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {showMenu && (
        <div className="absolute top-14 left-0 w-full bg-white dark:bg-black shadow-lg md:hidden">
          <ul className="flex flex-col items-center gap-6 py-4">
            {NavLinks.map(({ id, name, link }) => (
              <li key={id}>
                <Link
                  to={link}
                  className="text-lg font-semibold hover:text-primary"
                  onClick={toggleMenu} // Close menu on click
                >
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
