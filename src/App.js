import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PortfolioIntro from "./PortfolioIntro";
import Home from "./Home";
import About from "./About";
import Skills from "./Skills";
import Experience from "./Experience";
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

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/experience" element={<Experience />} />
        {/* Add other routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
