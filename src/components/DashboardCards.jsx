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
  const [goal, setGoal] = useState(
    Number(localStorage.getItem("dailyGoal")) || 3600,
  );
  const [dailyStreak, setDailyStreak] = useState(0);

  const xp = calculateXP(focusTime, distractionCount);
  const level = calculateLevel(focusTime);
  const streak = calculateStreak(focusTime, distractionCount);
  const progress = getDailyGoalProgress(focusTime);
  const goalDone = isGoalCompleted(focusTime);
  const badge = getBadge(focusTime);
  const levelProgress = getLevelProgress(focusTime);
  const total = focusTime + breakTime;
  const message = getMotivation(focusTime);
  const productivity = total === 0 ? 0 : ((focusTime / total) * 100).toFixed(1);
  const achievements = getAchievements(focusTime, distractionCount);
  const sessionsCount = JSON.parse(localStorage.getItem("sessions")) || [];

  const totalFocus = sessions.reduce((sum, s) => sum + s.focus, 0);
  const bestSession =
    sessions.length === 0
      ? null
      : sessions.reduce((max, s) => (s.focus > max.focus ? s : max));

  const clearHistory = () => {
    localStorage.removeItem("sessions");
    setSessions([]);
  };

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

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("sessions")) || [];
    setSessions(data);
  }, []);

  const statCards = [
    { icon: "⭐", label: "XP Points", value: xp },
    { icon: "🏆", label: "Level", value: level },
    {
      icon: "🔥",
      label: "Streak",
      value: streak,
      unit: "min",
    },
    { icon: "🏅", label: "Badge", value: badge, isText: true },
    {
      icon: "📅",
      label: "Daily Streak",
      value: dailyStreak,
      unit: "days",
    },
  ];

  const summaryRows = [
    {
      dot: "dot-green",
      label: "Focus time",
      value: `${Math.floor(focusTime / 60)} min`,
    },
    {
      dot: "dot-red",
      label: "Break time",
      value: `${Math.floor(breakTime / 60)} min`,
    },
    {
      dot: "dot-orange",
      label: "Distractions",
      value: distractionCount,
    },
    {
      dot: "dot-blue",
      label: "Productivity",
      value: `${productivity}%`,
    },
    {
      dot: "dot-purple",
      label: "Total sessions",
      value: sessionsCount.length,
    },
  ];

  return (
    <div className="db">
      {/* ── STATS ROW ── */}
      <p className="section-label">Overview</p>
      <div className="stats-grid">
        {statCards.map((card, i) => (
          <div className="stat-card" key={i}>
            <div className="stat-icon">{card.icon}</div>
            <div className="stat-label">{card.label}</div>
            <div
              className={`stat-value${card.isText ? " stat-value--text" : ""}`}
            >
              {card.value}
              {card.unit && <span className="stat-unit">{card.unit}</span>}
            </div>
          </div>
        ))}
      </div>

      {/* ── GOAL + SUMMARY ── */}
      <div className="two-col">
        {/* Goal */}
        <div className="card">
          <div className="card-title">
            <span className="card-icon">🎯</span> Daily Goal
          </div>

          <input
            className="goal-input"
            type="number"
            placeholder="Set goal in minutes…"
            onChange={(e) => {
              const mins = Number(e.target.value);
              if (isNaN(mins) || mins <= 0) return;
              const val = mins * 60;
              localStorage.setItem("dailyGoal", val);
              setGoal(val);
            }}
          />

          <div className="goal-meta">
            Current goal: <strong>{Math.floor(goal / 60)} min</strong>
          </div>

          <div className="progress-track">
            <div
              className="progress-fill"
              style={{ width: `${Math.min(progress, 100).toFixed(1)}%` }}
            />
          </div>
          <div className="progress-labels">
            <span>Goal: {progress.toFixed(1)}%</span>
            <span>Level: {levelProgress.toFixed(1)}% to next</span>
          </div>

          {goalDone && <div className="goal-done">✅ Goal Completed!</div>}
        </div>

        {/* Summary */}
        <div className="card">
          <div className="card-title">
            <span className="card-icon">📊</span> Today's Summary
          </div>

          {summaryRows.map((row, i) => (
            <div className="summary-row" key={i}>
              <div className="summary-left">
                <div className={`dot ${row.dot}`} />
                {row.label}
              </div>
              <div className="summary-right">{row.value}</div>
            </div>
          ))}

          <div className="motivation">💬 {message}</div>
        </div>
      </div>

      {/* ── FOCUS TOTAL · BEST SESSION · ACHIEVEMENTS ── */}
      <div className="three-col">
        {/* Total Focus */}
        <div className="card focus-total-card">
          <div className="card-title">
            <span className="card-icon">📊</span> Total Focus
          </div>
          <div className="focus-number">{Math.floor(totalFocus / 60)}</div>
          <div className="focus-sub">minutes this week</div>
        </div>

        {/* Best Session */}
        <div className="card">
          <div className="card-title">
            <span className="card-icon">🏆</span> Best Session
          </div>
          {bestSession ? (
            <div className="session-box">
              <div className="session-row">
                📆 <span className="session-tag">{bestSession.date}</span>
              </div>
              <div className="session-row">
                ⏱{" "}
                <span className="session-tag">
                  {Math.floor(bestSession.focus / 60)} min
                </span>{" "}
                focused
              </div>
              <div className="session-row">
                ⚡{" "}
                <span className="session-tag">{bestSession.distractions}</span>{" "}
                distraction{bestSession.distractions !== 1 ? "s" : ""}
              </div>
            </div>
          ) : (
            <div className="empty-state">
              <div className="empty-icon">🎯</div>
              <p>No sessions yet</p>
            </div>
          )}
        </div>

        {/* Achievements */}
        <div className="card">
          <div className="card-title">
            <span className="card-icon">🏆</span> Achievements
          </div>
          {achievements.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">🌟</div>
              <p>No achievements yet</p>
            </div>
          ) : (
            <div className="ach-list">
              {achievements.map((ach, i) => (
                <div className="ach-item" key={i}>
                  <div className="ach-badge">🏅</div>
                  {ach}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── SESSION HISTORY ── */}
      <div className="card history-card">
        <div className="history-header">
          <div className="card-title" style={{ marginBottom: 0 }}>
            <span className="card-icon">📅</span> Session History
          </div>
          <button className="clear-btn" onClick={clearHistory}>
            Clear history ✕
          </button>
        </div>

        {sessions.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📋</div>
            <p>No sessions yet</p>
          </div>
        ) : (
          sessions.map((session, i) => {
            const sessionProductivity =
              session.focus + session.break === 0
                ? 0
                : (
                    (session.focus / (session.focus + session.break)) *
                    100
                  ).toFixed(1);
            return (
              <div className="history-item" key={i}>
                <div className="history-date">📆 {session.date}</div>
                <div className="history-metrics">
                  <div className="metric-chip">
                    <div className="mc-val">
                      {Math.floor(session.focus / 60)}
                    </div>
                    <div className="mc-lbl">Focus min</div>
                  </div>
                  <div className="metric-chip">
                    <div className="mc-val">
                      {Math.floor(session.break / 60)}
                    </div>
                    <div className="mc-lbl">Break min</div>
                  </div>
                  <div className="metric-chip">
                    <div className="mc-val">{session.distractions}</div>
                    <div className="mc-lbl">Distractions</div>
                  </div>
                  <div className="metric-chip">
                    <div className="mc-val">{sessionProductivity}%</div>
                    <div className="mc-lbl">Productivity</div>
                  </div>
                  <div className="metric-chip">
                    <div className="mc-val">{session.score}</div>

                    <div className="mc-lbl">Focus Score</div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default DashboardCards;
