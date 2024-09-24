import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import PublicRoute from "./route/PublicRoute.jsx";

function App() {
  const theme = useSelector((state) => state.theme);

  useEffect(() => {
    if (theme === "dark") {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [theme]);

  return <PublicRoute />;
}

export default App;
