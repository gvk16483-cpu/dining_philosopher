import { create } from 'zustand';

const PHILOSOPHER_COUNT = 6;
const THINKING = 'thinking';
const HUNGRY = 'hungry';
const EATING = 'eating';
const BLOCKED = 'blocked';

const FORK_AVAILABLE = 'available';
const FORK_HELD = 'held';

export const useSimulationStore = create((set, get) => ({
  philosophers: Array(PHILOSOPHER_COUNT).fill(null).map((_, i) => ({
    id: i,
    state: THINKING,
    name: ['Navya', 'Ashrith', 'Pardhu', 'Divya', 'Ganesh', 'Vamsi'][i],
    eatingTime: 0,
    thinkingTime: 0,
  })),

  forks: Array(PHILOSOPHER_COUNT).fill(FORK_AVAILABLE),

  isRunning: false,
  simulationMode: 'normal',
  speed: 1,
  timelineStep: 0,
  audioEnabled: true,
  audioPlaying: false,

  hoveredPhilosopher: null,
  selectedPhilosopher: null,
  showSolution: false,

  waiterActive: false,
  selectedSolution: null,

  setPhilosopherState: (id, state) =>
    set((prevState) => {
      const newPhilosophers = [...prevState.philosophers];
      newPhilosophers[id] = { ...newPhilosophers[id], state };
      return { philosophers: newPhilosophers };
    }),

  setForkState: (id, state) =>
    set((prevState) => {
      const newForks = [...prevState.forks];
      newForks[id] = state;
      return { forks: newForks };
    }),

  setIsRunning: (isRunning) => set({ isRunning }),

  setSimulationMode: (mode) => set({ simulationMode: mode, timelineStep: 0 }),

  setSpeed: (speed) => set({ speed }),

  setTimelineStep: (step) => set({ timelineStep: step }),

  setAudioEnabled: (enabled) => set({ audioEnabled: enabled }),

  setAudioPlaying: (playing) => set({ audioPlaying: playing }),

  setWaiterActive: (active) => set({ waiterActive: active }),

  setSelectedSolution: (solution) => set({ selectedSolution: solution }),

  setHoveredPhilosopher: (id) => set({ hoveredPhilosopher: id }),

  setSelectedPhilosopher: (id) => set({ selectedPhilosopher: id }),

  setShowSolution: (show) => set({ showSolution: show }),

  reset: () => {
    set({
      philosophers: Array(PHILOSOPHER_COUNT).fill(null).map((_, i) => ({
        id: i,
        state: THINKING,
        name: ['Navya', 'Ashrith', 'Pardhu', 'Divya', 'Ganesh', 'Vamsi'][i],
        eatingTime: 0,
        thinkingTime: 0,
      })),
      forks: Array(PHILOSOPHER_COUNT).fill(FORK_AVAILABLE),
      isRunning: false,
      simulationMode: 'normal',
      speed: 1,
      timelineStep: 0,
      waiterActive: false,
      selectedSolution: null,
      hoveredPhilosopher: null,
      selectedPhilosopher: null,
      showSolution: false,
    });
  },

  PHILOSOPHER_COUNT,
  THINKING,
  HUNGRY,
  EATING,
  BLOCKED,
  FORK_AVAILABLE,
  FORK_HELD,
}));

export const STATES = {
  THINKING: 'thinking',
  HUNGRY: 'hungry',
  EATING: 'eating',
  BLOCKED: 'blocked',
};

export const FORK_STATES = {
  AVAILABLE: 'available',
  HELD: 'held',
};

export const SIMULATION_MODES = {
  NORMAL: 'normal',
  DEADLOCK: 'deadlock',
  STARVATION: 'starvation',
  SOLUTION_WAITER: 'solution1',
  SOLUTION_ORDERING: 'solution2',
  SOLUTION_ODD_EVEN: 'solution3',
};
