import React from 'react';
import { motion } from 'framer-motion';
import { FORK_STATES } from '../store/simulationStore';

export const Fork = ({ forkId, position, state }) => {
  const isHeld = state === FORK_STATES.HELD;
  
  const rotations = [0, 72, 144, 216, 288];
  const rotation = rotations[forkId];

  return (
    <motion.div
      className="fork-position absolute"
      style={{
        transform: `rotate(${rotation}deg) translateY(-140px)`,
      }}
      key={`fork-${forkId}`}
    >
      <motion.div
        animate={{
          scale: isHeld ? 1.1 : 1,
          color: isHeld ? '#ea580b' : '#6b7280',
          filter: isHeld ? 'drop-shadow(0 0 8px #ea580b)' : 'drop-shadow(0 0 2px rgba(0,0,0,0.5))',
        }}
        transition={{ type: 'spring', stiffness: 300 }}
        style={{
          transform: `rotate(-${rotation}deg)`,
        }}
        className="text-5xl cursor-grab active:cursor-grabbing"
      >
        🍴
      </motion.div>
    </motion.div>
  );
};
