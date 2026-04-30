import React, { useState, useEffect } from "react";
import {
  calculateXP,
  calculateLevel,
  calculateStreak,
  getDailyGoalProgress,
  isGoalCompleted,
  getBadge,
  getLevelProgress,
  getDailyStreak,
  getMotivation,
  getAchievements,
} from "../utils/gameLogic";

import "../App.css";

const DashboardCards = () => {
  const [sessions, setSessions] = useState([]);

  const [focusTime, setFocusTime] = useState(0);
  const [breakTime, setBreakTime] = useState(0);
  const [distractionCount, setDistractionCount] = useState(0);

  const xp = calculateXP(focusTime, distractionCount);
  const level = calculateLevel(focusTime);
  const streak = calculateStreak(focusTime, distractionCount);

  const [goal, setGoal] = useState(
    Number(localStorage.getItem("dailyGoal")) || 3600,
  );

  const progress = getDailyGoalProgress(focusTime);
  const goalDone = isGoalCompleted(focusTime);

  const badge = getBadge(focusTime);

  const levelProgress = getLevelProgress(focusTime);

  const [dailyStreak, setDailyStreak] = useState(0);

  const total = focusTime + breakTime;

  const message = getMotivation(focusTime);

  const productivity = total === 0 ? 0 : ((focusTime / total) * 100).toFixed(1);

  const achievements = getAchievements(focusTime, distractionCount);

  const sessionsCount = JSON.parse(localStorage.getItem("sessions")) || [];

  // clear session history
  const clearHistory = () => {
    localStorage.removeItem("sessions");
    setSessions([]);
  };

  // calculating the total focus
  const totalFocus = sessions.reduce((sum, session) => {
    return sum + session.focus;
  }, 0);

  // best session - high score
  const bestSession =
    sessions.length === 0
      ? null
      : sessions.reduce((max, session) =>
          session.focus > max.focus ? session : max,
        );

  useEffect(() => {
    const interval = setInterval(() => {
      setFocusTime(Number(localStorage.getItem("focusTime")) || 0);
      setBreakTime(Number(localStorage.getItem("breakTime")) || 0);
      setDistractionCount(
        Number(localStorage.getItem("distractionCount")) || 0,
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setDailyStreak(getDailyStreak());
  }, []);

  // loading the sessions
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("sessions")) || [];
    setSessions(data);
  }, []);

  return (
    <div className="dashboard-container">
      {/* Top Stats */}
      <div className="stats-grid">
        <div className="card stat-card">
          <h2>⭐ XP</h2>
          <p>{xp}</p>
        </div>

        <div className="card stat-card">
          <h2>🏆 Level</h2>
          <p>{level}</p>
        </div>

        <div className="card stat-card">
          <h2>🔥 Streak</h2>
          <p>{streak} min</p>
        </div>

        <div className="card stat-card">
          <h2>🏅 Badge</h2>
          <p>{badge}</p>
        </div>

        <div className="card stat-card">
          <h2>📅 Daily Streak</h2>
          <p>{dailyStreak} days</p>
        </div>
      </div>

      {/* Goal Section */}
      <div className="card goal-card">
        <h3>🎯 Daily Goal</h3>

        <input
          className="goal-input"
          type="number"
          placeholder="Set daily goal (in minutes)"
          onChange={(e) => {
            const minutes = Number(e.target.value);
            if (isNaN(minutes) || minutes <= 0) return;

            const value = minutes * 60;
            localStorage.setItem("dailyGoal", value);
            setGoal(value);
          }}
        />

        <p>Current Goal: {Math.floor(goal / 60)} min</p>

        <h2>Goal Progress: {progress.toFixed(1)}%</h2>

        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${levelProgress}%` }}
          ></div>
        </div>

        <p>{levelProgress.toFixed(1)}% to next level</p>

        {goalDone && <h3 className="goal-complete">✅ Goal Completed!</h3>}
      </div>

      {/* Summary Section */}
      <div className="card summary-card">
        <h3>📊 Today’s Summary</h3>

        <div className="summary-item">
          <span>🟢 Focus Time</span>
          <span>{Math.floor(focusTime / 60)} minutes</span>
        </div>

        <div className="summary-item">
          <span>🔴 Break Time</span>
          <span>{Math.floor(breakTime / 60)} minutes</span>
        </div>

        <div className="summary-item">
          <span>🟠 Distractions</span>
          <span>{distractionCount}</span>
        </div>

        <div className="summary-item">
          <span>⚡ Productivity</span>
          <span>{productivity}%</span>
        </div>

        <div className="summary-item">
          <span>📘 Total Sessions</span>
          <span>{sessionsCount.length}</span>
        </div>

        <h3 className="motivation-message">{message}</h3>
      </div>

      {/* Focus Stats */}
      <div className="card focus-card">
        <h3>📊 Total Focus Time</h3>
        <p>{Math.floor(totalFocus / 60)} minutes</p>
      </div>

      {/* Best Session */}
      <div className="card best-session-card">
        <h3>🏆 Best Session</h3>

        {bestSession ? (
          <div className="session-box">
            <p>📆 {bestSession.date}</p>
            <p>Focus: {Math.floor(bestSession.focus / 60)} min</p>
            <p>Distractions: {bestSession.distractions}</p>
          </div>
        ) : (
          <p>No sessions yet</p>
        )}
      </div>

      {/* Achievements */}
      <div className="card achievements-card">
        <h3>🏆 Achievements</h3>

        {achievements.length === 0 ? (
          <p>No achievements yet</p>
        ) : (
          <div className="achievements-list">
            {achievements.map((ach, index) => (
              <p key={index} className="achievement-item">
                {ach}
              </p>
            ))}
          </div>
        )}
      </div>

      {/* Session History */}
      <div className="card history-card">
        <div className="history-header">
          <h3>📅 Session History</h3>

          <button className="clear-btn" onClick={clearHistory}>
            Clear History ❌
          </button>
        </div>

        {sessions.length === 0 ? (
          <p>No sessions yet</p>
        ) : (
          sessions.map((session, index) => (
            <div key={index} className="session-history-item">
              <p>📆 {session.date}</p>
              <p>Focus Time: {Math.floor(session.focus / 60)} min</p>
              <p>Break Time: {Math.floor(session.break / 60)} min</p>
              <p>Distractions: {session.distractions}</p>
              <p>⚡ Productivity Score: {productivity}%</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DashboardCards;
