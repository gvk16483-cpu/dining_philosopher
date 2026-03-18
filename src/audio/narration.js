
export const NARRATION_SCRIPTS = {
  intro: {
    text: "The Dining Philosophers Problem is a classic synchronization problem in operating systems. Five philosophers sit around a circular table. Between each philosopher is one fork. Each philosopher needs two forks to eat. When a philosopher finishes eating, they put down their forks and think for a while.",
    duration: 12000,
  },
  
  normalDining: {
    text: "In normal dining, philosophers think, become hungry, pick up both forks if available, eat, then put down the forks and think again. The system continues cycling smoothly without issues.",
    duration: 10000,
  },
  
  deadlock: {
    text: "Deadlock occurs when all philosophers pick up their left fork simultaneously. Each philosopher waits for the right fork to become available. But no philosopher will ever put down their left fork because they haven't eaten yet. This creates a circular wait, and the system is deadlocked.",
    duration: 14000,
  },
  
  starvation: {
    text: "Starvation happens when a philosopher keeps trying to eat but rarely succeeds. This philosopher becomes hungry repeatedly but by the time they can pick up both forks, another philosopher already took them. This philosopher starves because they don't get sufficient access to the resources.",
    duration: 12000,
  },
  
  solutionWaiter: {
    text: "Solution 1: Waiter or Arbitrator. We introduce a waiter who controls access to the forks. Only 4 philosophers are allowed to try eating at once. The waiter ensures fair distribution. When a philosopher wants to eat, they request both forks from the waiter. This prevents deadlock.",
    duration: 13000,
  },
  
  solutionOrdering: {
    text: "Solution 2: Resource Ordering. All philosophers follow the same order when picking forks. Always pick the fork with the lower number first, then the one with the higher number. This prevents circular wait. The philosophers can eat successfully without deadlock.",
    duration: 12000,
  },
  
  solutionOddEven: {
    text: "Solution 3: Odd-Even Strategy. Odd-numbered philosophers pick their left fork first, then right. Even-numbered philosophers pick their right fork first, then left. This asymmetry breaks the circular wait condition. The system can proceed smoothly.",
    duration: 12000,
  },
};

export const generateNarration = async (scriptKey, audioEnabled = true) => {
  if (!audioEnabled) return null;
  
  const script = NARRATION_SCRIPTS[scriptKey];
  if (!script) return null;
  
  
  return {
    text: script.text,
    duration: script.duration,
    scriptKey,
  };
};

export class AudioPlayer {
  constructor() {
    this.isPlaying = false;
    this.currentTime = 0;
    this.callback = null;
  }

  play(narration, onComplete) {
    if (!narration) return;
    
    this.isPlaying = true;
    this.currentTime = 0;
    this.callback = onComplete;
    
    this.timeout = setTimeout(() => {
      this.isPlaying = false;
      if (this.callback) {
        this.callback();
      }
    }, narration.duration);
  }

  pause() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    this.isPlaying = false;
  }

  stop() {
    this.pause();
    this.currentTime = 0;
  }
}

export const audioManager = new AudioPlayer();
