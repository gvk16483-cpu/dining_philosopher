import React from 'react';
import { motion } from 'framer-motion';
import { STATES } from '../store/simulationStore';

const PHILOSOPHER_EMOJIS = ['🧘', '🤔', '😊', '🎓', '🧠'];

const getStateColor = (state) => {
  switch (state) {
    case STATES.THINKING:
      return 'from-blue-500/30 to-blue-600/20';
    case STATES.HUNGRY:
      return 'from-yellow-500/30 to-yellow-600/20';
    case STATES.EATING:
      return 'from-green-500/30 to-green-600/20';
    case STATES.BLOCKED:
      return 'from-red-500/30 to-red-600/20';
    default:
      return 'from-gray-500/30 to-gray-600/20';
  }
};

const getStateLabel = (state) => {
  switch (state) {
    case STATES.THINKING:
      return 'Thinking';
    case STATES.HUNGRY:
      return 'Hungry';
    case STATES.EATING:
      return 'Eating';
    case STATES.BLOCKED:
      return 'Blocked';
    default:
      return 'Unknown';
  }
};

const getStateBgClass = (state) => {
  switch (state) {
    case STATES.THINKING:
      return 'state-thinking';
    case STATES.HUNGRY:
      return 'state-hungry';
    case STATES.EATING:
      return 'state-eating';
    case STATES.BLOCKED:
      return 'state-blocked';
    default:
      return 'state-thinking';
  }
};

export const Philosopher = ({ philosopher, position, onPhilosopherClick }) => {
  const positions = [
    { top: '-80px', left: '50%', transform: 'translateX(-50%)' },
    { top: '30px', right: '-60px', transform: 'translateY(0)' },
    { bottom: '30px', right: '-60px', transform: 'translateY(0)' },
    { bottom: '-80px', left: '50%', transform: 'translateX(-50%)' },
    { top: '30px', left: '-60px', transform: 'translateY(0)' },
  ];

  const pos = positions[position];

  const isEating = philosopher.state === STATES.EATING;
  const isBlocked = philosopher.state === STATES.BLOCKED;

  return (
    <motion.div
      className="philosopher-position absolute"
      style={pos}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: position * 0.1 }}
    >
      <motion.button
        onClick={() => onPhilosopherClick?.(philosopher.id)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`philosopher-card bg-gradient-to-br ${getStateColor(
          philosopher.state
        )} border border-gray-600/30 hover:border-gray-400/50 cursor-pointer group`}
        animate={{
          boxShadow:
            philosopher.state === STATES.EATING
              ? '0 0 20px rgba(34, 197, 94, 0.5)'
              : philosopher.state === STATES.BLOCKED
              ? '0 0 20px rgba(239, 68, 68, 0.5)'
              : philosopher.state === STATES.HUNGRY
              ? '0 0 15px rgba(234, 179, 8, 0.5)'
              : '0 0 10px rgba(59, 130, 246, 0.3)',
        }}
      >
        {/* Animated eating motion */}
        <motion.div
          animate={
            isEating
              ? {
                  y: [-2, 2, -2],
                }
              : {}
          }
          transition={{
            duration: 0.8,
            repeat: Infinity,
          }}
          className="flex flex-col items-center justify-center h-full"
        >
          {/* Avatar */}
          <motion.div
            className="text-5xl mb-2"
            animate={{
              scale: isEating ? [1, 1.05, 0.95, 1] : 1,
            }}
            transition={{
              duration: 1.5,
              repeat: isEating ? Infinity : 0,
            }}
          >
            {PHILOSOPHER_EMOJIS[position]}
          </motion.div>

          {/* Name */}
          <div className="text-sm font-semibold text-gray-200 mb-1">
            {philosopher.name}
          </div>

          {/* State Badge */}
          <motion.div
            className={`state-indicator ${getStateBgClass(philosopher.state)}`}
            animate={{
              scale: isBlocked ? [1, 0.98, 1.02, 1] : 1,
            }}
            transition={{
              duration: 0.6,
              repeat: isBlocked ? Infinity : 0,
            }}
          >
            {getStateLabel(philosopher.state)}
          </motion.div>
        </motion.div>

        {/* Hover effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/10 group-hover:to-purple-500/10 transition-all duration-300 pointer-events-none" />
      </motion.button>
    </motion.div>
  );
};
