// src/components/Footer.jsx
import { Link } from "react-router-dom";

function Footer() {
  return (
    // Footer container with responsive styles
    <footer className="w-full p-3 ring-1 ring-slate-900/5 shadow-xl text-center flex flex-col md:flex-row items-center justify-center bg-white dark:bg-gray-800">
      {/* Copyright text */}
      <p className="font-bold mb-2 md:mb-0">Copyright © 2024 SaveGuard</p>

      {/* Link to the Contact Us page */}
      <Link
        to="/contact-us"
        className="cursor-pointer font-bold hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-300 mt-2 md:mt-0 md:ml-8"
      >
        Contact us
      </Link>
    </footer>
  );
}

export default Footer;
