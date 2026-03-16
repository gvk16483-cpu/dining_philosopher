import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Info, AlertCircle, CheckCircle, Lightbulb } from 'lucide-react';
import { useSimulationStore } from '../store/simulationStore';

export const ExplanationPanel = () => {
  const { simulationMode, philosophers } = useSimulationStore();

  const explanations = {
    normal: {
      title: 'Normal Dining',
      icon: <Info size={24} />,
      color: 'from-blue-500 to-cyan-500',
      content: (
        <>
          <p className="mb-3">
            In the normal scenario, philosophers follow a regular pattern:
          </p>
          <ul className="space-y-2 text-sm text-gray-300 mb-4">
            <li>🧠 <strong>Thinking:</strong> Philosopher thinks for a while</li>
            <li>😋 <strong>Hungry:</strong> Philosopher becomes hungry</li>
            <li>🍽️ <strong>Eating:</strong> If both forks available, philosopher eats</li>
            <li>🔄 <strong>Repeat:</strong> After eating, back to thinking</li>
          </ul>
          <p className="text-xs text-gray-400">
            This represents the ideal case where resources are fairly distributed.
          </p>
        </>
      ),
    },
    deadlock: {
      title: 'Deadlock Scenario',
      icon: <AlertCircle size={24} />,
      color: 'from-red-500 to-pink-500',
      content: (
        <>
          <p className="mb-3 font-semibold text-red-300">⚠️ DEADLOCK DETECTED</p>
          <p className="mb-3">
            All philosophers pick their left fork simultaneously. Now each waits for the right fork from their neighbor, who is also waiting. This creates a circular wait:
          </p>
          <div className="bg-dark-700/50 p-3 rounded-lg mb-3">
            <p className="text-xs font-mono text-gray-300">
              P1 → Fork 1 → P5 → Fork 5 → P4 → ... → P1
            </p>
          </div>
          <p className="text-xs text-gray-400">
            <strong>Result:</strong> No philosopher can eat. The system is frozen in a deadlock state.
          </p>
        </>
      ),
    },
    starvation: {
      title: 'Starvation Scenario',
      icon: <AlertCircle size={24} />,
      color: 'from-yellow-500 to-orange-500',
      content: (
        <>
          <p className="mb-3">
            <strong>Philosopher 1</strong> keeps trying to eat but rarely succeeds:
          </p>
          <ul className="space-y-2 text-sm text-gray-300 mb-4">
            <li>😤 P1 becomes hungry</li>
            <li>⏳ Wait for both forks</li>
            <li>❌ Another philosopher grabs them first</li>
            <li>🔄 Back to hungry, repeat</li>
          </ul>
          <p className="text-xs text-gray-400">
            While other philosophers eat regularly, P1 never gets a chance. This is <strong>starvation</strong> - unfair resource allocation.
          </p>
        </>
      ),
    },
    solution1: {
      title: 'Solution 1: Waiter/Arbitrator',
      icon: <CheckCircle size={24} />,
      color: 'from-green-500 to-emerald-500',
      content: (
        <>
          <p className="mb-3">
            A <strong>waiter</strong> controls access to the dining table:
          </p>
          <ul className="space-y-2 text-sm text-gray-300 mb-4">
            <li>👨‍💼 Waiter monitors philosopher requests</li>
            <li>🚫 Only allows maximum 4 philosophers to try eating</li>
            <li>✅ Ensures at least one philosopher can always eat</li>
            <li>🔄 Fair distribution of resources</li>
          </ul>
          <p className="text-xs text-gray-400">
            This prevents circular wait by limiting contention for resources.
          </p>
        </>
      ),
    },
    solution2: {
      title: 'Solution 2: Resource Ordering',
      icon: <CheckCircle size={24} />,
      color: 'from-green-500 to-emerald-500',
      content: (
        <>
          <p className="mb-3">
            All philosophers pick forks in the <strong>same order</strong>:
          </p>
          <ul className="space-y-2 text-sm text-gray-300 mb-4">
            <li>1️⃣ Pick the fork with the lower ID first</li>
            <li>2️⃣ Then pick the fork with the higher ID</li>
            <li>✅ Prevents circular wait</li>
            <li>🍽️ No deadlock or starvation</li>
          </ul>
          <p className="text-xs text-gray-400">
            By establishing a total ordering of resources, we eliminate the possibility of circular wait.
          </p>
        </>
      ),
    },
    solution3: {
      title: 'Solution 3: Odd-Even Strategy',
      icon: <CheckCircle size={24} />,
      color: 'from-green-500 to-emerald-500',
      content: (
        <>
          <p className="mb-3">
            <strong>Asymmetric</strong> fork picking strategy:
          </p>
          <ul className="space-y-2 text-sm text-gray-300 mb-4">
            <li>🔵 <strong>Odd philosophers:</strong> Left fork then right fork</li>
            <li>🟡 <strong>Even philosophers:</strong> Right fork then left fork</li>
            <li>✅ Breaks circular dependency</li>
            <li>🍽️ Guaranteed deadlock-free</li>
          </ul>
          <p className="text-xs text-gray-400">
            This asymmetry ensures that not all philosophers compete for the same resource ordering.
          </p>
        </>
      ),
    },
  };

  const currentExplanation = explanations[simulationMode] || explanations.normal;
  const hungryCo = philosophers.filter(p => p.state === 'hungry').length;
  const eatingCount = philosophers.filter(p => p.state === 'eating').length;

  return (
    <motion.section className="py-20 px-4 bg-gradient-to-b from-dark-800 to-dark-900">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Explanation */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className={`lg:col-span-2 glass-dark p-8 rounded-2xl bg-gradient-to-br ${currentExplanation.color} bg-opacity-5 border border-gray-600/20`}
          >
            <div className="flex items-center gap-3 mb-6 text-2xl">
              {currentExplanation.icon}
              <h3 className="text-2xl font-bold text-white">
                {currentExplanation.title}
              </h3>
            </div>

            <div className="text-gray-300 leading-relaxed">
              {currentExplanation.content}
            </div>
          </motion.div>

          {/* Stats Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <div className="glass-dark p-6 rounded-2xl">
              <h4 className="text-sm font-bold text-gray-400 mb-4 flex items-center gap-2">
                <Lightbulb size={16} /> Statistics
              </h4>

              <div className="space-y-4">
                {/* Thinking */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/30"
                >
                  <p className="text-xs text-gray-400">Thinking</p>
                  <p className="text-2xl font-bold text-blue-400">
                    {philosophers.filter(p => p.state === 'thinking').length}
                  </p>
                </motion.div>

                {/* Hungry */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/30"
                >
                  <p className="text-xs text-gray-400">Hungry</p>
                  <p className="text-2xl font-bold text-yellow-400">
                    {hungryCo}
                  </p>
                </motion.div>

                {/* Eating */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="p-3 rounded-lg bg-green-500/10 border border-green-500/30"
                >
                  <p className="text-xs text-gray-400">Eating</p>
                  <p className="text-2xl font-bold text-green-400">
                    {eatingCount}
                  </p>
                </motion.div>

                {/* Blocked */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="p-3 rounded-lg bg-red-500/10 border border-red-500/30"
                >
                  <p className="text-xs text-gray-400">Blocked</p>
                  <p className="text-2xl font-bold text-red-400">
                    {philosophers.filter(p => p.state === 'blocked').length}
                  </p>
                </motion.div>
              </div>
            </div>

            {/* Key Concept */}
            <div className="glass-dark p-6 rounded-2xl">
              <h4 className="text-sm font-bold text-gray-400 mb-3">Key Concept</h4>
              <p className="text-xs text-gray-300 leading-relaxed">
                {simulationMode === 'deadlock'
                  ? 'Deadlock is a situation where each process holds a resource and waits for another, creating circular dependency.'
                  : simulationMode === 'starvation'
                  ? 'Starvation occurs when a process is indefinitely delayed from accessing required resources due to unfair scheduling.'
                  : 'A solution is valid only if it prevents both deadlock AND starvation while maintaining progress.'}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};
