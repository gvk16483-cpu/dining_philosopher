import React from 'react';
import { motion } from 'framer-motion';
import { useSimulationStore } from '../store/simulationStore';

export const Timeline = () => {
  const { simulationMode, timelineStep } = useSimulationStore();

  const timelines = {
    normal: [
      { step: 1, title: 'Philosophers Thinking', description: 'All philosophers are thinking' },
      { step: 2, title: 'Philosophers Become Hungry', description: 'Some philosophers become hungry' },
      { step: 3, title: 'Fork Pickup', description: 'Hungry philosophers pick up available forks' },
      { step: 4, title: 'Eating', description: 'Philosophers with two forks are eating' },
      { step: 5, title: 'Fork Release', description: 'Finished philosophers release their forks' },
    ],
    deadlock: [
      { step: 1, title: 'Become Hungry', description: 'All philosophers become hungry' },
      { step: 2, title: 'Pick Left Fork', description: 'All pick their left fork simultaneously' },
      { step: 3, title: 'Wait for Right', description: 'All wait for the right fork from neighbor' },
      { step: 4, title: 'Circular Wait', description: 'P1 waits for P2, P2 waits for P3, ..., P5 waits for P1' },
      { step: 5, title: 'DEADLOCK', description: 'No progress possible - system is frozen' },
    ],
    starvation: [
      { step: 1, title: 'P1 Hungry', description: 'Philosopher 1 becomes hungry' },
      { step: 2, title: 'Others Eat', description: 'Other philosophers get the forks first' },
      { step: 3, title: 'P1 Waits', description: 'P1 waits while others finish eating' },
      { step: 4, title: 'P1 Still Hungry', description: 'Cycle repeats, P1 rarely gets a turn' },
      { step: 5, title: 'Starvation', description: 'P1 is starved of resource access' },
    ],
    solution1: [
      { step: 1, title: 'Request Waiter', description: 'Philosopher requests forks from waiter' },
      { step: 2, title: 'Waiter Decides', description: 'Waiter checks if at most 3 are eating' },
      { step: 3, title: 'Permission Granted', description: 'Waiter grants permission if safe' },
      { step: 4, title: 'Pick Forks', description: 'Philosopher picks both forks' },
      { step: 5, title: 'Eat Safely', description: 'Philosopher eats without deadlock' },
    ],
    solution2: [
      { step: 1, title: 'Become Hungry', description: 'Philosopher becomes hungry' },
      { step: 2, title: 'Pick Lower Fork First', description: 'Pick the fork with lower ID number' },
      { step: 3, title: 'Pick Higher Fork', description: 'Then pick the fork with higher ID' },
      { step: 4, title: 'Total Ordering', description: 'All philosophers follow same order' },
      { step: 5, title: 'No Deadlock', description: 'Circular wait is impossible' },
    ],
    solution3: [
      { step: 1, title: 'Odd-Even Separation', description: 'Philosophers split into odd and even' },
      { step: 2, title: 'Odd Pick Left First', description: 'Odd philosophers: left fork then right' },
      { step: 3, title: 'Even Pick Right First', description: 'Even philosophers: right fork then left' },
      { step: 4, title: 'Asymmetric Ordering', description: 'Asymmetry breaks circular dependency' },
      { step: 5, title: 'Deadlock-Free', description: 'System progresses without deadlock' },
    ],
  };

  const currentTimeline = timelines[simulationMode] || timelines.normal;

  return (
    <motion.section className="py-20 px-4 bg-gradient-to-b from-dark-900 to-dark-800">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
        >
          Process Timeline
        </motion.h2>

        <div className="space-y-4">
          {currentTimeline.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={`glass-dark p-6 rounded-xl border-l-4 backdrop-blur-sm transition-all ${
                idx === currentTimeline.length - 1
                  ? 'border-l-red-500 bg-red-500/5'
                  : 'border-l-blue-500 bg-blue-500/5'
              }`}
            >
              <div className="flex items-start gap-4">
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                  className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center flex-shrink-0 text-white font-bold"
                >
                  {item.step}
                </motion.div>

                <div className="flex-1">
                  <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-gray-400 text-sm">{item.description}</p>
                </div>

                {idx === currentTimeline.length - 1 && (
                  <motion.div
                    animate={{
                      rotate: [0, 360],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                    }}
                    className="text-3xl"
                  >
                    ⚠️
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4"
        >
          {[
            { emoji: '🧠', label: 'Thinking' },
            { emoji: '😋', label: 'Hungry' },
            { emoji: '🍽️', label: 'Eating' },
            { emoji: '🔴', label: 'Blocked' },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.05 }}
              className="glass-dark p-4 rounded-lg text-center"
            >
              <span className="text-3xl mb-2">{item.emoji}</span>
              <p className="text-xs text-gray-400">{item.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};
