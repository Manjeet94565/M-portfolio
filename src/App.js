import React, { useState, useEffect } from "react";
import PortfolioIntro from "./PortfolioIntro";
import Home from "./Home";
import "./App.css";

function App() {
  const [currentPage, setCurrentPage] = useState("intro");
  const [hasShownIntro, setHasShownIntro] = useState(false);

  // Only show intro once on initial mount (simulates reload detection)
  useEffect(() => {
    if (!hasShownIntro) {
      const timer = setTimeout(() => {
        setCurrentPage("home");
        setHasShownIntro(true);
      }, 7000); // 7 seconds of fast intro then switch

      return () => clearTimeout(timer);
    }
  }, [hasShownIntro]);

  if (currentPage === "intro") {
    return <PortfolioIntro />;
  }

  return <Home />;
}

export default App;
