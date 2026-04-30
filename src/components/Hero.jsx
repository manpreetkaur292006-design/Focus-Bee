import React from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";

const Hero = () => {
   const navigate = useNavigate();
  return (
    <div className="main-hero-div">
      <h1 className="main-hero-head">Turn Distractions into Deep Focus</h1>
      <p className="hero-para">
        Track your focus time, reduce interruptions, and build the better work
        habits.
      </p>
      <div>
        <button className="hero-btn primary-btn" onClick={() => navigate("/focus")}>Start Focusing Free</button>
        <button className="hero-btn secondary-btn" onClick={() => navigate("/stats")}>See Your Stats</button>
      </div>
      <p className="hero-para-2">
        ⏱ Focus timer · 📊 Track distractions · 📈 Productivity insights
      </p>
    </div>
  );
};

export default Hero;
