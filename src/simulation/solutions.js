import { STATES, FORK_STATES } from '../store/simulationStore';

/**
 * Solution 1: Waiter / Arbitrator
 * Only N-1 philosophers can try to eat at once
 * A waiter controls access to resource allocation
 */
export const simulateWaiterSolution = (store, philosophers) => {
  // Count how many philosophers are trying to eat
  const hungryCount = philosophers.filter(p => p.state === STATES.HUNGRY).length;
  
  return philosophers.map((phil, index) => {
    if (hungryCount >= 4) {
      // Waiter prevents more than 4 from trying
      if (phil.state === STATES.HUNGRY && Math.random() < 0.1) {
        return { ...phil }; // Keep waiting
      }
    }

    switch (phil.state) {
      case STATES.THINKING:
        if (Math.random() < 0.3) {
          return { ...phil, state: STATES.HUNGRY };
        }
        return phil;
      
      case STATES.HUNGRY:
        // Try to eat if both forks available
        if (index === 0 || index === 1 || index === 2 || index === 3) {
          const leftFork = store.forks[index];
          const rightFork = store.forks[(index + 1) % 5];
          
          if (leftFork === FORK_STATES.AVAILABLE && rightFork === FORK_STATES.AVAILABLE) {
            return { ...phil, state: STATES.EATING, startTime: Date.now() };
          }
        }
        return phil;
      
      case STATES.EATING:
        if (phil.startTime && Date.now() - phil.startTime > 2000) {
          return { ...phil, state: STATES.THINKING, startTime: null };
        }
        return phil;
      
      default:
        return phil;
    }
  });
};

/**
 * Solution 2: Resource Ordering
 * All philosophers pick forks in the same order (lowest numbered fork first)
 * This prevents circular wait
 */
export const simulateOrderingSolution = (store, philosophers) => {
  return philosophers.map((phil, index) => {
    const leftForkId = index;
    const rightForkId = (index + 1) % 5;
    
    // Order: always pick lower numbered fork first
    const firstForkId = Math.min(leftForkId, rightForkId);
    const secondForkId = Math.max(leftForkId, rightForkId);

    switch (phil.state) {
      case STATES.THINKING:
        if (Math.random() < 0.3) {
          return { ...phil, state: STATES.HUNGRY, forkProgress: 0 };
        }
        return phil;
      
      case STATES.HUNGRY:
        // Try to pick first fork
        if (!phil.forkProgress) {
          if (store.forks[firstForkId] === FORK_STATES.AVAILABLE) {
            return { ...phil, forkProgress: 1 };
          }
        }
        // Try to pick second fork
        else if (phil.forkProgress === 1) {
          if (store.forks[secondForkId] === FORK_STATES.AVAILABLE) {
            return { ...phil, state: STATES.EATING, startTime: Date.now(), forkProgress: 0 };
          }
        }
        return phil;
      
      case STATES.EATING:
        if (phil.startTime && Date.now() - phil.startTime > 2000) {
          return { ...phil, state: STATES.THINKING, startTime: null };
        }
        return phil;
      
      default:
        return phil;
    }
  });
};

/**
 * Solution 3: Odd/Even Strategy
 * Odd philosophers pick left then right
 * Even philosophers pick right then left
 * This prevents circular wait
 */
export const simulateOddEvenSolution = (store, philosophers) => {
  return philosophers.map((phil, index) => {
    const leftForkId = index;
    const rightForkId = (index + 1) % 5;
    
    // Odd philosophers: left first, then right
    // Even philosophers: right first, then left
    const isOdd = index % 2 === 1;
    const firstForkId = isOdd ? leftForkId : rightForkId;
    const secondForkId = isOdd ? rightForkId : leftForkId;

    switch (phil.state) {
      case STATES.THINKING:
        if (Math.random() < 0.3) {
          return { ...phil, state: STATES.HUNGRY, forkProgress: 0 };
        }
        return phil;
      
      case STATES.HUNGRY:
        // Try to pick first fork (based on odd/even)
        if (!phil.forkProgress) {
          if (store.forks[firstForkId] === FORK_STATES.AVAILABLE) {
            return { ...phil, forkProgress: 1 };
          }
        }
        // Try to pick second fork
        else if (phil.forkProgress === 1) {
          if (store.forks[secondForkId] === FORK_STATES.AVAILABLE) {
            return { ...phil, state: STATES.EATING, startTime: Date.now(), forkProgress: 0 };
          }
        }
        return phil;
      
      case STATES.EATING:
        if (phil.startTime && Date.now() - phil.startTime > 2000) {
          return { ...phil, state: STATES.THINKING, startTime: null };
        }
        return phil;
      
      default:
        return phil;
    }
  });
};

export const SOLUTIONS = {
  WAITER: 'solution1',
  ORDERING: 'solution2',
  ODD_EVEN: 'solution3',
};
