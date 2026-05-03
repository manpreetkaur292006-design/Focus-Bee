# FocusBee 🐝 - Focus & Distraction Tracking Website

# Author : Manpreet Kaur

FocusBee is a productivity and focus management web application built using React and Vite. The application helps users improve concentration using the Pomodoro Technique while tracking productivity statistics, focus streaks, achievements, goals, and session history.

***

# Live Demo

[focus-bee](https://focusbee.netlify.app/)

***

# 🚀 Features

## ⏳ Pomodoro Timer

* 25-minute focus sessions
* 5-minute break sessions
* Start, Pause, and Reset controls
* Automatic switching between focus and break modes
* Alert notifications when sessions end
* Light and Dark mode Toggle

## 📊 Statistics Dashboard

* Focus time tracking
* Break time tracking
* Distraction count tracking
* Productivity percentage
* Interactive charts using Chart.js
* Focus Heatmap

## 🏆 Gamification System

* XP system
* Levels
* Focus streaks
* Daily streaks
* Achievement badges
* Motivation messages

## 🎯 Daily Goals

* Set custom daily focus goals
* Goal progress tracking
* Goal completion notification

## 🗂 Session History

* Stores session history using Local Storage
* Tracks:
  * Date
  * Focus duration
  * Break duration
  * Distractions

## 💾 Local Storage Support

* Saves user data even after page refresh
* Stores:
  * Focus time
  * Break time
  * Distractions
  * Goals
  * Sessions
  * Streaks

***

# 🛠 Tech Stack

* React.js
* Vite
* JavaScript
* Chart.js
* React Chart.js 2
* CSS
* Local Storage API

***

# 📁 Project Structure

```bash
Focus-Bee/
├── node_modules/
├── public/
├── src/
│   ├── assets/
│   │   ├── FocusBeeLogo.png
│   │   └── herobg.png
│   │
│   ├── components/
│   │   ├── DashboardCards.jsx
│   │   ├── FocusHeatmap.jsx
│   │   ├── Hero.jsx
│   │   ├── NavBar.jsx
│   │   ├── QuotesCard.jsx
│   │   ├── Stats.jsx
│   │   ├── TaskList.jsx
│   │   └── Timer.jsx
│   │
│   ├── pages/
│   │   ├── DashboardPage.jsx
│   │   ├── FocusPage.jsx
│   │   ├── Home.jsx
│   │   └── StatsPage.jsx
│   │
│   ├── utils/
│   │   ├── formatTime.js
│   │   ├── gameLogic.js
│   │   └── localStorage.js
│   │
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
│
├── .gitignore
├── eslint.config.js
├── package-lock.json
├── package.json
├── README.md
└── vite.config.js
```

***

# ⚙️ Installation & Setup

## 1️⃣ Clone the repository

```bash
git clone <your-repository-link>
```

## 2️⃣ Navigate into the project folder

```bash
cd Focus-Bee
```

## 3️⃣ Install dependencies

```bash
npm install
```

## 4️⃣ Start development server

```bash
npm run dev
```

***

# 📦 Dependencies Used

```bash
npm install react-router-dom
npm install chart.js react-chartjs-2
```

***

# 🎮 Gamification Logic

## XP System

* Focusing earns XP
* Distractions reduce XP

## Levels

* Every 10 minutes of focus increases level

## Badges

* 🌱 Starter
* 🚀 Beginner
* 💪 Pro
* 🔥 Master

## Achievements

* First Focus Session
* One Hour Deep Work
* Zero Distractions

***

# 📸 Screens Included

* Home Page
* Focus Timer
* Dashboard
* Stats Page

***

# 🔮 Future Improvements

* Dark Mode
* User Authentication
* Cloud Database
* Weekly Analytics
* Sound Notifications
* Mobile Responsive Design
* Advanced Productivity Insights

***

# 👩‍💻 Author

Developed by Manpreet Kaur

***

# ⭐ Acknowledgements

* React Documentation
* Chart.js Documentation
* Pomodoro Technique
* Vite Documentation