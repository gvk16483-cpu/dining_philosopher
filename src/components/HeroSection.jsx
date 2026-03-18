import React from 'react';
import SplitText from './SplitText';
import ReactBitsParticles from './ReactBitsParticles';
import { motion } from 'framer-motion';
import { Play, Zap } from 'lucide-react';
import ReactBitsGlowButton from './ReactBitsGlowButton';

export const HeroSection = ({ onStartSimulation }) => {
  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16">
      {/* ReactBits*/}
      <ReactBitsParticles />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center px-4 max-w-4xl mx-auto"
      >
        {/* Main Heading with ReactBits */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
        >
          <SplitText
            text="The Dining Philosophers Problem"
            delay={40}
            duration={0.7}
          />
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-xl sm:text-2xl text-gray-300 mb-8 leading-relaxed"
        >
          Understand deadlock, starvation, and synchronization through interactive visualization
        </motion.p>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12 max-w-2xl mx-auto"
        >
          {[
            { icon: '⚡', label: 'Interactive Simulation' },
            { icon: '🎨', label: 'Visual Learning' },
            { icon: '📊', label: 'Real-time Visualization' },
          ].map((feature, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.05 }}
              className="p-4 rounded-xl glass"
            >
              <div className="text-3xl mb-2">{feature.icon}</div>
              <p className="text-sm text-gray-300">{feature.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <ReactBitsGlowButton onClick={onStartSimulation} className="flex items-center justify-center gap-2">
            <Play size={24} /> Start Simulation
          </ReactBitsGlowButton>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-dark-700 hover:bg-dark-600 text-white rounded-xl font-bold text-lg border border-dark-600 flex items-center justify-center gap-2"
          >
            <Zap size={24} /> Learn More
          </motion.button>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex justify-center mt-12"
        >
          <div className="text-gray-400">↓ Scroll to explore</div>
        </motion.div>
      </motion.div>
    </section>
  );
};
