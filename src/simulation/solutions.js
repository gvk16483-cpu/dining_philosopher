import { STATES, FORK_STATES } from '../store/simulationStore';

export const simulateWaiterSolution = (store, philosophers) => {
  const hungryCount = philosophers.filter(p => p.state === STATES.HUNGRY).length;
  
  return philosophers.map((phil, index) => {
    if (hungryCount >= 4) {
      if (phil.state === STATES.HUNGRY && Math.random() < 0.1) {
        return { ...phil }; 
      }
    }

    switch (phil.state) {
      case STATES.THINKING:
        if (Math.random() < 0.3) {
          return { ...phil, state: STATES.HUNGRY };
        }
        return phil;
      
      case STATES.HUNGRY:
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

export const simulateOrderingSolution = (store, philosophers) => {
  return philosophers.map((phil, index) => {
    const leftForkId = index;
    const rightForkId = (index + 1) % 5;
    
    const firstForkId = Math.min(leftForkId, rightForkId);
    const secondForkId = Math.max(leftForkId, rightForkId);

    switch (phil.state) {
      case STATES.THINKING:
        if (Math.random() < 0.3) {
          return { ...phil, state: STATES.HUNGRY, forkProgress: 0 };
        }
        return phil;
      
      case STATES.HUNGRY:
        if (!phil.forkProgress) {
          if (store.forks[firstForkId] === FORK_STATES.AVAILABLE) {
            return { ...phil, forkProgress: 1 };
          }
        }
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

export const simulateOddEvenSolution = (store, philosophers) => {
  return philosophers.map((phil, index) => {
    const leftForkId = index;
    const rightForkId = (index + 1) % 5;
    
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
        if (!phil.forkProgress) {
          if (store.forks[firstForkId] === FORK_STATES.AVAILABLE) {
            return { ...phil, forkProgress: 1 };
          }
        }
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
