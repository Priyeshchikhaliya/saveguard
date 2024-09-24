import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Headerbar from "../components/Headerbar";
import Footer from "../components/Footer";
import { useSelector } from "react-redux";

function Layout(props) {
  const { pathname } = useLocation();
  const theme = useSelector((state) => state.theme);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // Ensure scrolling to top also on initial render
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div
      className={`flex flex-col min-h-screen ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      {/* Header */}
      <header
        className={`sticky top-0 z-10 ${
          theme === "dark" ? "bg-gray-800" : "bg-white"
        }`}
      >
        <Headerbar />
      </header>

      {/* Main content */}
      <main className="flex-grow flex justify-center m-4">{props.children}</main>

      {/* Footer */}
      <footer
        className={`flex-shrink-0 ${
          theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"
        }`}
      >
        <Footer />
      </footer>
    </div>
  );
}

export default Layout;
