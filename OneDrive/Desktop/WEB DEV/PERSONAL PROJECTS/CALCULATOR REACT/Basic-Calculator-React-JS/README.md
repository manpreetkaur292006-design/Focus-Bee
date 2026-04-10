# Basic Calculator Using React JS

# Author : Manpreet Kaur

## Basic Calculator App

A fully functional calculator built with **React** and **Vite**. Features basic arithmetic operations (+, -, ×, ÷), keyboard support, clear/delete functions, and responsive design.

**Live Demo**: 



## ✨ Features

- Basic math operations (add, subtract, multiply, divide)
- Keyboard shortcuts (numbers, operators, Enter=, Escape=clear, Backspace=delete)
- Clean, modern UI split into reusable components
- Responsive design works on mobile/desktop
- Error handling for invalid calculations

## 🛠️ Tech Stack

```
Frontend: React 18+, Vite, JavaScript, CSS
Structure: Component-based (App, Display, Buttons, Header)
Tools: VS Code, Git/GitHub
```

## 📁 Project Structure

```
src/
├── Components/
│   ├── Buttons.jsx     # Calculator buttons
│   ├── Display.jsx     # Display screen
│   └── Header.jsx      # App header/title
├── App.jsx             # Main app with state/logic
├── App.css             # Global styles
└── main.jsx            # Entry point
```

## 🚀 Quick Start

1. **Clone the repo**
   ```bash
   git clone https://github.com/yourusername/calculator-react.git
   cd calculator-react
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```
   Opens at `http://localhost:5173`

4. **Build for production**
   ```bash
   npm run build
   ```

## 💻 Code Flow

1. **State** in `App.jsx`: `displayValue` tracks current input
2. **Handlers** in `App.jsx`: `appendToDisplay()`, `calculate()`, `clearDisplay()`, etc.
3. **Props**: Functions passed to `Buttons.jsx` and `Display.jsx`
4. **Keyboard**: `useEffect` listens for key events
5. **Styling**: `App.css` with `className` in JSX

## 🎯 Learning Goals

- React Hooks (`useState`, `useEffect`)
- Component communication via props
- Replacing vanilla JS with React patterns
- Vite project setup and hot reload
- Keyboard event handling in React

<!-- ## 🔮 Next Steps

- [ ] Add advanced functions (√, x², memory)
- [ ] Themes (dark/light mode)
- [ ] History of calculations
- [ ] Unit tests with Vitest/Jest
- [ ] Deploy to Vercel/Netlify -->


