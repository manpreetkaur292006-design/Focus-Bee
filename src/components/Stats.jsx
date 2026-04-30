import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { clearStats } from "../utils/localStorage";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const Stats = () => {
  // const [focusTime, setFocusTime] = useState(0);
  // const [breakTime, setBreakTime] = useState(0);
  // const [distractionCount, setDistractionCount] = useState(0);

  const getSafeNumber = (value) => {
    const num = Number(value);
    return isNaN(num) ? 0 : num;
  };

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setFocusTime(getSafeNumber(localStorage.getItem("focusTime")));
  //     setBreakTime(getSafeNumber(localStorage.getItem("breakTime")));
  //     setDistractionCount(
  //       getSafeNumber(localStorage.getItem("distractionCount")),
  //     );
  //   }, 1000);

  //   return () => clearInterval(interval);
  // }, []);

  const sessions = JSON.parse(localStorage.getItem("sessions")) || [];

  const totalFocus = sessions.reduce((acc, session) => acc + session.focus, 0);

  const totalBreak = sessions.reduce((acc, session) => acc + session.break, 0);

  const totalDistractions = sessions.reduce(
    (acc, session) => acc + session.distractions,
    0,
  );

  const chartData = {
    labels: ["Focus", "Break", "Distractions"],
    datasets: [
      {
        label: "Time / Count",
        data: [
          totalFocus > 0 ? totalFocus : 0.1,
          totalBreak > 0 ? totalBreak : 0.1,
          totalDistractions > 0 ? totalDistractions : 0.1,
        ],
        backgroundColor: ["green", "red", "orange"],
      },
    ],
  };

  return (
    <div className="stats-container">
      <div className="stats-card">
        <h2 className="stats-title">Stats 📊</h2>

        {sessions.length === 0 ? (
          <p className="no-data-text">No data yet. Start timer.</p>
        ) : (
          <div className="chart-wrapper">
            <Bar data={chartData} />
          </div>
        )}

        <div className="stats-summary">
          <div className="summary-box">
            <p>🟢 Focus</p>
            <h3>{Math.floor(totalFocus / 60)} min</h3>
          </div>

          <div className="summary-box">
            <p>🔴 Break</p>
            <h3>{Math.floor(totalBreak / 60)} min</h3>
          </div>

          <div className="summary-box">
            <p>🟠 Distractions</p>
            <h3>{totalDistractions}</h3>
          </div>
        </div>

        <button
          className="reset-btn"
          onClick={() => {
            clearStats();
            window.location.reload();
          }}
        >
          Reset Stats
        </button>
      </div>
    </div>
  );
};

export default Stats;
