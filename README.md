# The Dining Philosophers Problem - Interactive Visualization

An interactive, modern educational website that visually demonstrates the **Dining Philosophers Problem** from Operating Systems using React, Vite, Tailwind CSS, and Framer Motion.

## 🎯 Overview

The Dining Philosophers Problem is a classic synchronization problem in operating systems that illustrates issues with deadlock and resource allocation:

- **5 philosophers** sit around a circular table
- **5 forks** are placed between them (one between each pair)
- Each philosopher needs **2 forks** to eat
- Philosophers alternate between **thinking** and **eating**

This project provides an interactive simulation showcasing:
- 🔴 **Deadlock** scenarios
- ⏳ **Starvation** scenarios  
- ✅ **Solutions** to prevent deadlock and starvation

## 🚀 Features

### Visual Simulation
- **Interactive Dining Table**: Real-time visualization of philosophers and forks
- **State Indicators**: Color-coded states for each philosopher
  - 🧠 Blue: Thinking
  - 😋 Yellow: Hungry
  - 🍽️ Green: Eating
  - 🔴 Red: Blocked (Deadlock)
- **Real-time Fork State**: Visual feedback when forks are picked up or released

### Simulation Modes
1. **Normal Dining** - Fair distribution of resources
2. **Deadlock Scenario** - Demonstrates circular wait condition
3. **Starvation Scenario** - One philosopher starves while others eat

### Solutions Demonstrated
1. **Waiter/Arbitrator Solution** - A waiter controls fork access
2. **Resource Ordering Solution** - Philosophers pick forks in order
3. **Odd-Even Strategy** - Asymmetric fork picking breaks circular wait

### Controls
- ▶️ **Play/Pause** Simulation
- 🔄 **Reset** to initial state
- ⚡ **Speed Control** (0.5x, 1x, 2x, 5x)
- 🔊 **Audio Narration** with explanations
- 📊 **Real-time Statistics** (Thinking, Hungry, Eating, Blocked count)

## 🛠️ Tech Stack

- **Frontend Framework**: React 19
- **Build Tool**: Vite
- **Styling**: Tailwind CSS 3
- **Animations**: Framer Motion 11
- **State Management**: Zustand
- **Icons**: Lucide React
- **Audio**: Howler.js (prepared for future integration)

## 📁 Project Structure

\\\
src/
├── components/           # React components
│   ├── Navbar.jsx       # Navigation bar
│   ├── HeroSection.jsx  # Landing section
│   ├── DiningTable.jsx  # Main simulation
│   ├── Philosopher.jsx  # Individual philosopher
│   ├── Fork.jsx         # Fork visualization
│   ├── ControlPanel.jsx # Simulation controls
│   ├── ExplanationPanel.jsx # Educational content
│   ├── Timeline.jsx     # Process timeline
│   └── Footer.jsx       # Footer section
├── store/
│   └── simulationStore.js # Zustand state management
├── hooks/
│   └── usePhilosopherSimulation.js # Simulation logic hook
├── simulation/          # Core algorithm logic
│   ├── philosopherLogic.js
│   └── solutions.js
├── audio/
│   └── narration.js     # Audio narration system
├── App.jsx              # Main app component
├── App.css              # Component styles
├── index.css            # Global styles
└── main.jsx             # Entry point
\\\

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Navigate to the project directory:
\\\ash
cd dp
\\\

2. Install dependencies:
\\\ash
npm install --legacy-peer-deps
\\\

3. Start the development server:
\\\ash
npm run dev
\\\

4. Open your browser to \http://localhost:5173\

### Building for Production

\\\ash
npm run build
npm run preview
\\\

## 🎮 How to Use

1. **Start on the Hero Section**: Read the problem description and click \"Start Simulation\"
2. **Choose a Scenario**: Select from Normal Dining, Deadlock, or Starvation
3. **Play/Pause**: Control the simulation with play/pause buttons
4. **Adjust Speed**: Change simulation speed from 0.5x to 5x
5. **Read Explanations**: The explanation panel updates based on the current mode
6. **View Timeline**: See the step-by-step process at the bottom
7. **Try Solutions**: Switch to different solutions to see how they prevent deadlock

## 📊 Educational Content

Each scenario includes:
- **Problem Description**: What's happening and why
- **Visual Feedback**: Color-coded states and animations
- **Statistics**: Real-time counters
- **Solutions**: When applicable
- **Timeline**: Step-by-step breakdown

## 👨‍💻 Development

### Available Scripts

- \
pm run dev\ - Start development server
- \
pm run build\ - Build for production
- \
pm run preview\ - Preview production build
- \
pm run lint\ - Run ESLint

## 📄 License

MIT License - Feel free to use this project for educational purposes.

## 🙏 Credits

Built as an educational tool to help students understand Operating Systems concepts.

---

**Happy Learning!** 🚀

Learn Operating Systems concepts through beautiful, interactive visualizations.
