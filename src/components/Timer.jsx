import React from "react";
import { useState, useEffect } from "react";
import { formatTime } from "../utils/formatTime";
import { getDailyStreak } from "../utils/gameLogic";

const Timer = () => {
  const FOCUS_TIME = 1500; // 25 MINS = 25 * 60 - USING THE POMODORO TECHNIQUE
  const BREAK_TIME = 300; // 5 MINS = 5 * 60

  const [time, setTime] = useState(FOCUS_TIME);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState("focus");
  const [distractionCount, setDistractionCount] = useState(0);

  const [focusTime, setFocusTime] = useState(0);
  const [breakTime, setBreakTime] = useState(0);

  const [focusScore, setFocusScore] = useState(100);

  // save the each session history
  const saveSession = () => {
    const sessions = JSON.parse(localStorage.getItem("sessions")) || [];

    const newSession = {
      date: new Date().toLocaleDateString(),
      focus: focusTime,
      break: breakTime,
      distractions: distractionCount,
      score: focusScore,
    };

    sessions.push(newSession);

    localStorage.setItem("sessions", JSON.stringify(sessions));
  };

  //   const handleReset = () => {
  //   saveSession();

  //   setIsRunning(false);
  //   setMode("focus");
  //   setTime(FOCUS_TIME);

  //   setDistractionCount(0);
  // };

  const handleReset = () => {
    const score = Math.max(100 - distractionCount * 10, 0);

    setFocusScore(score);

    const sessions = JSON.parse(localStorage.getItem("sessions")) || [];

    const newSession = {
      date: new Date().toLocaleDateString(),
      focus: focusTime,
      break: breakTime,
      distractions: distractionCount,
      score: score,
    };

    sessions.push(newSession);

    localStorage.setItem("sessions", JSON.stringify(sessions));

    setIsRunning(false);
    setMode("focus");
    setTime(FOCUS_TIME);

    setDistractionCount(0);
  };

  const handleDistraction = () => {
    setDistractionCount((prev) => prev + 1);
  };

  const calculateFocusScore = () => {
    const score = Math.max(100 - distractionCount * 10, 0);

    setFocusScore(score);
  };

  useEffect(() => {
    let interval = null;

    if (isRunning) {
      interval = setInterval(() => {
        if (mode === "focus") {
          setFocusTime((prev) => prev + 1);
          getDailyStreak();
        } else {
          setBreakTime((prev) => prev + 1);
        }

        setTime((prevTime) => {
          if (prevTime === 0) {
            if (mode === "focus") {
              calculateFocusScore();

              alert("Focus session complete! Time for a break 🧘");

              setMode("break");

              return BREAK_TIME;
            } else {
              alert("Break over! Back to focus 💪");
              setMode("focus");
              return FOCUS_TIME;
            }
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, mode]);

  // loads data from the local storage
  useEffect(() => {
    setFocusTime(Number(localStorage.getItem("focusTime")) || 0);
    setBreakTime(Number(localStorage.getItem("breakTime")) || 0);
    setDistractionCount(Number(localStorage.getItem("distractionCount")) || 0);
  }, []);

  // saves data to the local storage
  useEffect(() => {
    localStorage.setItem("focusTime", focusTime);
    localStorage.setItem("breakTime", breakTime);
    localStorage.setItem("distractionCount", distractionCount);
  }, [focusTime, breakTime, distractionCount]);

  // daily reset
  useEffect(() => {
    const today = new Date().toDateString();
    const lastDate = localStorage.getItem("lastDate");

    if (lastDate !== today) {
      // reset daily data
      setFocusTime(0);
      setBreakTime(0);
      setDistractionCount(0);

      localStorage.setItem("focusTime", 0);
      localStorage.setItem("breakTime", 0);
      localStorage.setItem("distractionCount", 0);

      localStorage.setItem("lastDate", today);
    }
  }, []);

  // detect tab switching
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setDistractionCount((prev) => prev + 1);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <div className="main-timer-div">
      <h1 className="timer-h1">Timer</h1>
      <h2 className="timer-h2">{formatTime(time)}</h2>
      <h3 className="timer-h3">
        {mode === "focus" ? "Focus Time" : "Break Time"}
      </h3>
      <h3 className="timer-h3">Distractions : {distractionCount}</h3>
      <h3 className="timer-h3">Focus Score : {focusScore}</h3>

      {focusScore >= 80 && <p>🔥 Deep Focus</p>}

      {focusScore >= 50 && focusScore < 80 && <p>👍 Good Session</p>}

      {focusScore < 50 && <p>⚠ Distracted Session</p>}
      <div className="timer-btn-group">
        <button
          onClick={() => setIsRunning(true)}
          className="timer-btns"
          id="start-timer-btn"
        >
          Start
        </button>
        <button
          onClick={() => {
            if (mode === "focus" && time > 0) {
              setDistractionCount((prev) => prev + 1);
            }
            setIsRunning(false);
          }}
          className="timer-btns"
          id="pause-timer-btn"
        >
          Pause
        </button>
        <button
          onClick={handleReset}
          className="timer-btns"
          id="reset-timer-btn"
        >
          Reset
        </button>
        <button
          onClick={handleDistraction}
          className="timer-btns"
          id="distracted-btn"
        >
          I got distracted 😅
        </button>
      </div>
    </div>
  );
};

export default Timer;
