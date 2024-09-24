/* eslint-disable react/prop-types */
import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../redux/ThemeSlice.jsx";

// NavLink component for consistent styling and navigation
// Accepts `to` for the route, `children` for the link text, and `onClick` for handling clicks.
function NavLink({ to, children, onClick }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="cursor-pointer font-bold pb-1 outline-b-2 outline-transparent hover:outline-gray-600 transition-colors duration-300"
    >
      {children}
    </Link>
  );
}

function Headerbar() {
  // State to manage the visibility of the mobile menu
  const [menuOpen, setMenuOpen] = useState(false);
  // Redux dispatch to toggle the theme
  const dispatch = useDispatch();
  // Getting the current theme state from Redux
  const theme = useSelector((state) => state.theme);

  // Handler to toggle the theme between dark and light
  const handleThemeToggle = () => {
    dispatch(toggleTheme());
  };

  // Handler to toggle the mobile menu open/close state
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav
      className={`w-full px-4 md:px-8 flex items-center justify-between min-h-[50px] outline-b shadow-md ${
        theme === "dark"
          ? "border-gray-700 bg-gray-800 text-white shadow-gray-900"
          : "border-black bg-white text-black shadow-lg shadow-gray-200"
      }`}
    >
      {/* Logo and Brand Name */}
      <Link to="/home" className="flex items-center gap-2 p-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-10"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
          />
        </svg>

        <p className="cursor-pointer select-none text-2xl font-bold">
          SaveGuard
        </p>
      </Link>

      {/* Desktop Menu */}
      <div className="hidden md:flex gap-4 items-center text-xl">
        <NavLink to="/home">Home</NavLink>
        <NavLink to="/about">Why to use our app?</NavLink>
        <NavLink to="/video-introduction">Learn</NavLink>
      </div>

      {/* Theme Toggle Button */}
      <label className="inline-flex items-center cursor-pointer ms-3">
        <input
          type="checkbox"
          className="sr-only peer"
          checked={theme === "dark"}
          onChange={handleThemeToggle}
        />
        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
        <span className="ms-3 text-xl font-bold">
          {theme === "dark" ? "Light mode" : "Dark mode"}
        </span>
      </label>

      {/* Mobile Menu Toggle */}
      <div className="md:hidden">
        <button
          onClick={toggleMenu}
          className="focus:outline-none flex items-center justify-center"
        >
          <svg
            className={`w-6 h-6 ${
              theme === "dark" ? "text-white" : "text-black"
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Icon changes based on menu state: open or closed */}
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div
          className={`absolute top-[65px] left-0 right-0 ${
            theme === "dark" ? "bg-gray-800 text-white" : "bg-white"
          } shadow-lg border-t border-b-[#E5E8EB] md:hidden`}
        >
          <div className="flex flex-col items-center gap-4 text-lg py-4">
            <NavLink to="/home" onClick={toggleMenu}>
              Home
            </NavLink>
            <NavLink to="/about" onClick={toggleMenu}>
              About us
            </NavLink>
            <NavLink to="/contact-us" onClick={toggleMenu}>
              Contact us
            </NavLink>
            <NavLink to="/video-introduction" onClick={toggleMenu}>
              Learn
            </NavLink>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Headerbar;
