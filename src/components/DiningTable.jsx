import React from 'react';
import { useSimulationStore } from '../store/simulationStore';
import { usePhilosopherSimulation } from '../hooks/usePhilosopherSimulation';

import { DiningTable3D } from './DiningTable3D';

export const DiningTable = () => {
  const { simulationMode } = useSimulationStore();

  usePhilosopherSimulation();

  return (
    <section id="simulation" className="w-full min-h-[calc(100vh-120px)] flex flex-col items-center justify-center p-0 m-0 bg-transparent">
      <DiningTable3D />
      {/* Mode Indicator (without emoji) */}
      <div className="text-center mt-4">
        <div className="inline-block px-8 py-4 rounded-xl bg-slate-700/50 backdrop-blur border border-slate-600">
          <p className="text-sm text-gray-400 mb-2 font-semibold uppercase tracking-widest">Current Mode:</p>
          <p className="text-2xl font-bold text-blue-400 capitalize">
            {simulationMode === 'solution1'
              ? 'Waiter Solution'
              : simulationMode === 'solution2'
              ? 'Ordering Solution'
              : simulationMode === 'solution3'
              ? 'Odd-Even Solution'
              : simulationMode.charAt(0).toUpperCase() + simulationMode.slice(1)}
          </p>
        </div>
      </div>
    </section>
  );
};
