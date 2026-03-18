import { STATES, FORK_STATES } from '../store/simulationStore';

export class PhilosopherSimulation {
  constructor(philosopherId, store) {
    this.id = philosopherId;
    this.store = store;
    this.leftForkId = philosopherId;
    this.rightForkId = (philosopherId + 1) % 5;
    this.eatingDuration = 2000; // ms
    this.thinkingDuration = 3000; // ms
    this.hungryDuration = 1500; // ms
  }

  getLeftFork() {
    return this.store.forks[this.leftForkId];
  }

  getRightFork() {
    return this.store.forks[this.rightForkId];
  }

  canEat() {
    return (
      this.getLeftFork() === FORK_STATES.AVAILABLE &&
      this.getRightFork() === FORK_STATES.AVAILABLE
    );
  }

  pickLeftFork() {
    const forks = [...this.store.forks];
    forks[this.leftForkId] = FORK_STATES.HELD;
    return forks;
  }

  pickRightFork() {
    const forks = [...this.store.forks];
    forks[this.rightForkId] = FORK_STATES.HELD;
    return forks;
  }

  releaseForks() {
    const forks = [...this.store.forks];
    forks[this.leftForkId] = FORK_STATES.AVAILABLE;
    forks[this.rightForkId] = FORK_STATES.AVAILABLE;
    return forks;
  }

  think() {
    return {
      state: STATES.THINKING,
      duration: this.thinkingDuration + Math.random() * 2000,
    };
  }

  becomeHungry() {
    return {
      state: STATES.HUNGRY,
      duration: this.hungryDuration,
    };
  }

  tryToEat() {
    return {
      state: STATES.EATING,
      duration: this.eatingDuration,
    };
  }

  getBlocked() {
    return {
      state: STATES.BLOCKED,
      duration: Infinity,
    };
  }
}

export const simulateNormalDining = (store, philosophers) => {
  
  const updates = philosophers.map((phil, index) => {
    const sim = new PhilosopherSimulation(index, store);
    
    switch (phil.state) {
      case STATES.THINKING:
        if (Math.random() < 0.3) {
          return { id: index, state: STATES.HUNGRY };
        }
        return phil;
      
      case STATES.HUNGRY:
        if (sim.canEat()) {
          return { id: index, state: STATES.EATING, startTime: Date.now() };
        }
        return phil;
      
      case STATES.EATING:
        if (phil.startTime && Date.now() - phil.startTime > sim.eatingDuration) {
          return { id: index, state: STATES.THINKING, startTime: Date.now() };
        }
        return phil;
      
      default:
        return phil;
    }
  });

  return updates;
};

export const simulateDeadlock = (store, philosophers) => {
  
  return philosophers.map((phil, index) => {
    switch (phil.state) {
      case STATES.THINKING:
        return { ...phil, state: STATES.HUNGRY };
      
      case STATES.HUNGRY:
        return { ...phil, state: STATES.BLOCKED };
      
      default:
        return phil;
    }
  });
};

export const simulateStarvation = (store, philosophers) => {
  
  return philosophers.map((phil, index) => {
    if (index === 0) {
      switch (phil.state) {
        case STATES.THINKING:
          return { ...phil, state: STATES.HUNGRY };
        case STATES.HUNGRY:
          if (Math.random() < 0.05) {
            return { ...phil, state: STATES.EATING, startTime: Date.now() };
          }
          return phil;
        case STATES.EATING:
          if (phil.startTime && Date.now() - phil.startTime > 800) {
            return { ...phil, state: STATES.HUNGRY };
          }
          return phil;
        default:
          return phil;
      }
    } else {
      const sim = new PhilosopherSimulation(index, store);
      switch (phil.state) {
        case STATES.THINKING:
          if (Math.random() < 0.4) {
            return { ...phil, state: STATES.HUNGRY };
          }
          return phil;
        case STATES.HUNGRY:
          if (sim.canEat()) {
            return { ...phil, state: STATES.EATING, startTime: Date.now() };
          }
          return phil;
        case STATES.EATING:
          if (phil.startTime && Date.now() - phil.startTime > 1500) {
            return { ...phil, state: STATES.THINKING };
          }
          return phil;
        default:
          return phil;
      }
    }
  });
};
