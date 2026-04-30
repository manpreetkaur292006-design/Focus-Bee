// XP = reward focus, penalize distractions
export const calculateXP = (focusTime, distractionCount) => {
  const xp = focusTime * 2 - distractionCount * 5;
  return Math.max(0, xp);
};

// Level based on focus time (every 10 min = level up)
export const calculateLevel = (focusTime) => {
  return Math.floor(focusTime / 600) + 1;
};

// Streak = focus time without distractions
export const calculateStreak = (focusTime, distractionCount) => {
  if (distractionCount === 0) return Math.floor(focusTime / 60);
  return Math.max(0, Math.floor(focusTime / 60) - distractionCount);
};

// daily goals
export const getDailyGoalProgress = (focusTime) => {
  const goal = Number(localStorage.getItem("dailyGoal")) || 3600;
  const progress = (focusTime / goal) * 100;
  return Math.min(progress, 100);
};

// checks wheather the goal is completed or not
export const isGoalCompleted = (focusTime) => {
  const goal = Number(localStorage.getItem("dailyGoal")) || 3600;
  return focusTime >= goal;
};

// Badge system based on focus time (in minutes)
export const getBadge = (focusTime) => {
  const minutes = Math.floor(focusTime / 60);

  if (minutes >= 120) return "🔥 Master";
  if (minutes >= 60) return "💪 Pro";
  if (minutes >= 30) return "🚀 Beginner";

  return "🌱 Starter";
};

// see the level progress
export const getLevelProgress = (focusTime) => {
  const level = Math.floor(focusTime / 600);
  const currentLevelTime = focusTime % 600;

  const progress = (currentLevelTime / 600) * 100;

  return progress;
};


// daily streak
export const getDailyStreak = () => {
  const today = new Date().toDateString();
  const lastDate = localStorage.getItem("lastActiveDate");
  let streak = Number(localStorage.getItem("dailyStreak")) || 0;

  if (!lastDate) {
    localStorage.setItem("lastActiveDate", today);
    localStorage.setItem("dailyStreak", 1);
    return 1;
  }

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  if (lastDate === today) {
    return streak; // same day
  }

  if (lastDate === yesterday.toDateString()) {
    streak += 1; // continue streak
  } else {
    streak = 1; // reset streak
  }

  localStorage.setItem("lastFocusDate", today);
  localStorage.setItem("dailyStreak", streak);

  return streak;
};

// message
export const getMotivation = (focusTime) => {
  if (focusTime < 600) return "Let's get started 🚀";
  if (focusTime < 1800) return "Good progress 👍";
  if (focusTime < 3600) return "You're focused 🔥";
  return "Deep work mode 💪";
};


// achievements
export const getAchievements = (focusTime, distractionCount) => {
  const achievements = [];

  if (focusTime >= 600) {
    achievements.push("🎯 First Focus (10 min)");
  }

  if (focusTime >= 3600) {
    achievements.push("🔥 1 Hour Deep Work");
  }

  if (distractionCount === 0 && focusTime > 0) {
    achievements.push("🧘 Zero Distraction");
  }

  return achievements;
};