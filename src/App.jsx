import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import FocusPage from "./pages/FocusPage";
import DashboardPage from "./pages/DashboardPage";
import StatsPage from "./pages/StatsPage";

const App = () => {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark",
  );
  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <button
          onClick={() => {
            setDarkMode(!darkMode);

            localStorage.setItem("theme", !darkMode ? "dark" : "light");
          }}
          className="theme-btn"
        >
          {darkMode ? "☀ Light" : "🌙 Dark"}
        </button>

        <NavBar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/focus" element={<FocusPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/stats" element={<StatsPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
