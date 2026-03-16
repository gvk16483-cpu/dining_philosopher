import { useEffect, useRef } from 'react';
import { useSimulationStore, STATES, FORK_STATES } from '../store/simulationStore';

const COUNT = 6;

export const usePhilosopherSimulation = () => {
  const isRunning = useSimulationStore((s) => s.isRunning);
  const simulationMode = useSimulationStore((s) => s.simulationMode);
  const speed = useSimulationStore((s) => s.speed);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    if (!isRunning) return;

    const updateSimulation = () => {
      const state = useSimulationStore.getState();
      
      // Create independent draft copies to prevent intra-tick race conditions
      const nextPhilosophers = state.philosophers.map(p => ({ ...p }));
      const nextForks = [...state.forks];

      for (let idx = 0; idx < COUNT; idx++) {
        const phil = nextPhilosophers[idx];
        const leftForkId = idx;
        const rightForkId = (idx - 1 + COUNT) % COUNT;

        switch (simulationMode) {
          case 'normal':
            updateNormal(phil, leftForkId, rightForkId, nextForks);
            break;
          case 'deadlock':
            updateDeadlock(phil, leftForkId, nextForks);
            break;
          case 'starvation':
            updateStarvation(phil, idx, leftForkId, rightForkId, nextForks);
            break;
          case 'solution1':
            updateWaiter(phil, leftForkId, rightForkId, nextForks, nextPhilosophers);
            break;
          case 'solution2':
            updateOrdering(phil, leftForkId, rightForkId, nextForks);
            break;
          case 'solution3':
            updateOddEven(phil, idx, leftForkId, rightForkId, nextForks);
            break;
          default:
            break;
        }
      }

      // Apply all changes perfectly synchronously in ONE render batch
      useSimulationStore.setState(() => {
        return { 
          philosophers: nextPhilosophers, 
          forks: nextForks 
        };
      });
    };

    intervalRef.current = setInterval(updateSimulation, (1000 / speed) * 2);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isRunning, simulationMode, speed]);
};

// -- Scenario Mutators (Draft Mutators) --

function updateNormal(phil, leftForkId, rightForkId, forks) {
  switch (phil.state) {
    case STATES.THINKING:
      if (Math.random() < 0.2) phil.state = STATES.HUNGRY;
      break;
    case STATES.HUNGRY:
      if (forks[leftForkId] === FORK_STATES.AVAILABLE && forks[rightForkId] === FORK_STATES.AVAILABLE) {
        forks[leftForkId] = phil.id;
        forks[rightForkId] = phil.id;
        phil.state = STATES.EATING;
      }
      break;
    case STATES.EATING:
      if (Math.random() < 0.15) {
        forks[leftForkId] = FORK_STATES.AVAILABLE;
        forks[rightForkId] = FORK_STATES.AVAILABLE;
        phil.state = STATES.THINKING;
      }
      break;
    default: break;
  }
}

function updateDeadlock(phil, leftForkId, forks) {
  switch (phil.state) {
    case STATES.THINKING:
      phil.state = STATES.HUNGRY;
      break;
    case STATES.HUNGRY:
      if (forks[leftForkId] === FORK_STATES.AVAILABLE) {
        forks[leftForkId] = phil.id;
        phil.state = STATES.BLOCKED;
      }
      break;
    default: break;
  }
}

function updateStarvation(phil, idx, leftForkId, rightForkId, forks) {
  if (idx === 0) {
    // Navya struggles (Starvation: constantly grabs one fork, waits, then gives up and tries again)
    switch (phil.state) {
      case STATES.THINKING:
        phil.state = STATES.HUNGRY;
        break;
      case STATES.HUNGRY:
        if (forks[leftForkId] === FORK_STATES.AVAILABLE) {
          forks[leftForkId] = phil.id;
          phil.state = STATES.BLOCKED;
        }
        break;
      case STATES.BLOCKED:
        if (forks[rightForkId] === FORK_STATES.AVAILABLE) {
           // Before she can grab the right fork, simulate dropping it out of frustration 90% of the time
           if (Math.random() < 0.9) {
             forks[leftForkId] = FORK_STATES.AVAILABLE;
             phil.state = STATES.HUNGRY;
           } else {
             forks[rightForkId] = phil.id;
             phil.state = STATES.EATING;
           }
        } else {
           // Right fork isn't available, she gets frustrated and drops her left fork sometimes
           if (Math.random() < 0.1) {
             forks[leftForkId] = FORK_STATES.AVAILABLE;
             phil.state = STATES.HUNGRY;
           }
        }
        break;
      case STATES.EATING:
        if (Math.random() < 0.5) {
          forks[leftForkId] = FORK_STATES.AVAILABLE;
          forks[rightForkId] = FORK_STATES.AVAILABLE;
          phil.state = STATES.HUNGRY;
        }
        break;
      default: break;
    }
  } else {
    // Others eat normally but aggressively
    switch (phil.state) {
      case STATES.THINKING:
        if (Math.random() < 0.5) phil.state = STATES.HUNGRY;
        break;
      case STATES.HUNGRY:
        if (forks[leftForkId] === FORK_STATES.AVAILABLE && forks[rightForkId] === FORK_STATES.AVAILABLE) {
          forks[leftForkId] = phil.id;
          forks[rightForkId] = phil.id;
          phil.state = STATES.EATING;
        }
        break;
      case STATES.EATING:
        if (Math.random() < 0.2) {
          forks[leftForkId] = FORK_STATES.AVAILABLE;
          forks[rightForkId] = FORK_STATES.AVAILABLE;
          phil.state = STATES.THINKING;
        }
        break;
      default: break;
    }
  }
}

function updateWaiter(phil, leftForkId, rightForkId, forks, philosophers) {
  const eatingCount = philosophers.filter(p => p.state === STATES.EATING).length;
  switch (phil.state) {
    case STATES.THINKING:
      if (Math.random() < 0.2) phil.state = STATES.HUNGRY;
      break;
    case STATES.HUNGRY:
      // Waiter allows them to pick up one fork ONLY IF it's safe (preventing all 6 from taking 1)
      if (eatingCount < COUNT - 2) {
         if (forks[leftForkId] === FORK_STATES.AVAILABLE) {
           forks[leftForkId] = phil.id;
           if (forks[rightForkId] === FORK_STATES.AVAILABLE) {
             forks[rightForkId] = phil.id;
             phil.state = STATES.EATING;
           } else {
             phil.state = STATES.BLOCKED;
           }
         }
      }
      break;
    case STATES.BLOCKED:
      if (forks[rightForkId] === FORK_STATES.AVAILABLE) {
        forks[rightForkId] = phil.id;
        phil.state = STATES.EATING;
      }
      break;
    case STATES.EATING:
      if (Math.random() < 0.15) {
        forks[leftForkId] = FORK_STATES.AVAILABLE;
        forks[rightForkId] = FORK_STATES.AVAILABLE;
        phil.state = STATES.THINKING;
      }
      break;
    default: break;
  }
}

function updateOrdering(phil, leftForkId, rightForkId, forks) {
  const firstForkId = Math.min(leftForkId, rightForkId);
  const secondForkId = Math.max(leftForkId, rightForkId);
  switch (phil.state) {
    case STATES.THINKING:
      if (Math.random() < 0.2) phil.state = STATES.HUNGRY;
      break;
    case STATES.HUNGRY:
      if (forks[firstForkId] === FORK_STATES.AVAILABLE) {
        forks[firstForkId] = phil.id;
        if (forks[secondForkId] === FORK_STATES.AVAILABLE) {
          forks[secondForkId] = phil.id;
          phil.state = STATES.EATING;
        } else {
          phil.state = STATES.BLOCKED;
        }
      }
      break;
    case STATES.BLOCKED:
      if (forks[secondForkId] === FORK_STATES.AVAILABLE) {
        forks[secondForkId] = phil.id;
        phil.state = STATES.EATING;
      }
      break;
    case STATES.EATING:
      if (Math.random() < 0.15) {
        forks[firstForkId] = FORK_STATES.AVAILABLE;
        forks[secondForkId] = FORK_STATES.AVAILABLE;
        phil.state = STATES.THINKING;
      }
      break;
    default: break;
  }
}

function updateOddEven(phil, idx, leftForkId, rightForkId, forks) {
  const isOdd = idx % 2 === 1;
  const firstForkId = isOdd ? leftForkId : rightForkId;
  const secondForkId = isOdd ? rightForkId : leftForkId;
  switch (phil.state) {
    case STATES.THINKING:
      if (Math.random() < 0.2) phil.state = STATES.HUNGRY;
      break;
    case STATES.HUNGRY:
      if (forks[firstForkId] === FORK_STATES.AVAILABLE) {
        forks[firstForkId] = phil.id;
        if (forks[secondForkId] === FORK_STATES.AVAILABLE) {
          forks[secondForkId] = phil.id;
          phil.state = STATES.EATING;
        } else {
          phil.state = STATES.BLOCKED;
        }
      }
      break;
    case STATES.BLOCKED:
      if (forks[secondForkId] === FORK_STATES.AVAILABLE) {
        forks[secondForkId] = phil.id;
        phil.state = STATES.EATING;
      }
      break;
    case STATES.EATING:
      if (Math.random() < 0.15) {
        forks[firstForkId] = FORK_STATES.AVAILABLE;
        forks[secondForkId] = FORK_STATES.AVAILABLE;
        phil.state = STATES.THINKING;
      }
      break;
    default: break;
  }
}
