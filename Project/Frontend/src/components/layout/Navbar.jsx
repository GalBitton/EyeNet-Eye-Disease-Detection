import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../constants/routes.jsx";
import Logo from "../../assets/symbol1-removebg-preview.png";
import { HiMenuAlt1, HiMenuAlt3 } from "react-icons/hi";
import DarkMode from "./DarkMode.jsx";

const NavLinks = [
  { id: 1, name: "Home", link: ROUTES.HOME },
  { id: 2, name: "Record", link: ROUTES.RECORD },
  { id: 3, name: "Upload", link: ROUTES.UPLOAD },
  { id: 4, name: "Contact", link: ROUTES.CONTACT },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header className="relative z-[9999] text-black dark:text-white duration-300">
      <div className="container flex justify-between items-center py-3">
        {/* Logo */}
        <Link to={ROUTES.HOME} className="flex items-center">
          <img src={Logo} alt="EyeNet Logo" className="h-16" />
          <p className="text-2xl font-bold ml-2">EyeNet</p>
        </Link>

        {/* Desktop Links */}
        <nav className="hidden md:flex gap-8 items-center">
          {NavLinks.map(({ id, name, link }) => (
            <Link key={id} to={link} className="hover:text-primary font-semibold">
              {name}
            </Link>
          ))}
          <DarkMode />
        </nav>

        {/* Mobile */}
        <div className="flex items-center gap-4 md:hidden">
          <DarkMode />
          {menuOpen ? (
            <HiMenuAlt1 size={30} onClick={toggleMenu} className="cursor-pointer" />
          ) : (
            <HiMenuAlt3 size={30} onClick={toggleMenu} className="cursor-pointer" />
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute w-full bg-white dark:bg-black shadow-lg md:hidden">
          <nav className="flex flex-col items-center gap-6 py-4">
            {NavLinks.map(({ id, name, link }) => (
              <Link key={id} to={link} onClick={toggleMenu} className="hover:text-primary">
                {name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
