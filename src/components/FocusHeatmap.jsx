import React from "react";

const FocusHeatmap = () => {
  const sessions =
    JSON.parse(localStorage.getItem("sessions")) || [];

  const dailyData = {};

  sessions.forEach((session) => {
    const date = session.date;

    if (!dailyData[date]) {
      dailyData[date] = 0;
    }

    dailyData[date] += session.focus;
  });

  const dates = Object.keys(dailyData);

  return (
    <div className="heatmap-container">
      <h2>Focus Heatmap</h2>

      <div className="heatmap-grid">
        {dates.map((date, index) => {
          const minutes =
            Math.floor(dailyData[date] / 60);

          let level = "level-0";

          if (minutes > 30) level = "level-1";
          if (minutes > 60) level = "level-2";
          if (minutes > 120) level = "level-3";

          return (
            <div
              key={index}
              className={`heatmap-cell ${level}`}
              title={`${date} - ${minutes} min`}
            >
              <span>{new Date(date).getDate()}</span>
            </div>
          );
        })}
      </div>

      <div className="heatmap-legend">
        <span>Less</span>

        <div className="legend-box level-0"></div>

        <div className="legend-box level-1"></div>

        <div className="legend-box level-2"></div>

        <div className="legend-box level-3"></div>

        <span>More</span>
      </div>
    </div>
  );
};

export default FocusHeatmap;