import React from 'react';
import { useSimulationStore } from '../store/simulationStore';

export const ControlPanel = () => {
  const {
    isRunning,
    simulationMode,
    speed,
    audioEnabled,
    setIsRunning,
    setSimulationMode,
    setSpeed,
    setAudioEnabled,
    reset,
  } = useSimulationStore();

  const modes = [
    { id: 'normal', label: 'Normal Dining' },
    { id: 'deadlock', label: 'Deadlock' },
    { id: 'starvation', label: 'Starvation' },
  ];

  const solutions = [
    { id: 'solution1', label: 'Waiter' },
    { id: 'solution2', label: 'Ordering' },
    { id: 'solution3', label: 'Odd-Even' },
  ];

  const speeds = [
    { value: 0.5, label: '0.5x' },
    { value: 1, label: '1x' },
    { value: 2, label: '2x' },
    { value: 5, label: '5x' },
  ];

  return (
    <section className="py-12 px-4 bg-gradient-to-b from-transparent to-slate-900/30">
      <div className="max-w-6xl mx-auto">
        <div className="space-y-6">
          {/* Main Controls Row */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            {/* Play/Pause */}
            <button
              onClick={() => setIsRunning(!isRunning)}
              className={`px-8 py-3 rounded-lg font-semibold transition-all ${
                isRunning
                  ? 'bg-red-500 hover:bg-red-600 text-white'
                  : 'bg-green-500 hover:bg-green-600 text-white'
              }`}
            >
              {isRunning ? '⏸️ Pause' : '▶️ Play'}
            </button>

            {/* Reset */}
            <button
              onClick={() => {
                reset();
                setIsRunning(false);
              }}
              className="px-8 py-3 rounded-lg font-semibold bg-slate-600 hover:bg-slate-700 text-white transition-all"
            >
              🔄 Reset
            </button>

            {/* Speed Control */}
            <div className="flex items-center gap-3 ml-auto">
              <span className="text-sm font-semibold text-gray-300">Speed:</span>
              <div className="flex gap-2">
                {speeds.map((s) => (
                  <button
                    key={s.value}
                    onClick={() => setSpeed(s.value)}
                    className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                      speed === s.value
                        ? 'bg-blue-500 text-white'
                        : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Simulation Modes */}
          <div>
            <p className="text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wider">Simulation Modes:</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {modes.map((mode) => (
                <button
                  key={mode.id}
                  onClick={() => {
                    setSimulationMode(mode.id);
                    setIsRunning(true);
                  }}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all border-2 ${
                    simulationMode === mode.id
                      ? 'bg-blue-600 border-blue-400 text-white'
                      : 'bg-slate-700/50 border-slate-600 text-gray-300 hover:border-blue-400'
                  }`}
                >
                  {mode.label}
                </button>
              ))}
            </div>
          </div>

          {/* Solutions */}
          <div>
            <p className="text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wider">Solutions:</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {solutions.map((sol) => (
                <button
                  key={sol.id}
                  onClick={() => {
                    setSimulationMode(sol.id);
                    setIsRunning(true);
                  }}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all border-2 ${
                    simulationMode === sol.id
                      ? 'bg-green-600 border-green-400 text-white'
                      : 'bg-slate-700/50 border-slate-600 text-gray-300 hover:border-green-400'
                  }`}
                >
                  {sol.label}
                </button>
              ))}
            </div>
          </div>

          {/* Audio Control */}
          <div className="flex justify-center">
            <button
              onClick={() => setAudioEnabled(!audioEnabled)}
              className={`px-8 py-3 rounded-lg font-semibold transition-all ${
                audioEnabled
                  ? 'bg-purple-600 hover:bg-purple-700 text-white'
                  : 'bg-slate-700 hover:bg-slate-600 text-gray-300'
              }`}
            >
              {audioEnabled ? '🔊 Sound On' : '🔇 Sound Off'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
