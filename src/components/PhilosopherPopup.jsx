import React from 'react';
import { useSimulationStore } from '../store/simulationStore';

const STATE_COLORS = {
  thinking: '#3b82f6',
  hungry: '#eab308',
  eating: '#22c55e',
  blocked: '#ef4444',
};

export function PhilosopherPopup() {
  const { selectedPhilosopher, philosophers, forks, setSelectedPhilosopher } = useSimulationStore();

  if (selectedPhilosopher === null || selectedPhilosopher === undefined) return null;

  const phil = philosophers[selectedPhilosopher];
  if (!phil) return null;

  const leftForkId = selectedPhilosopher;
  const rightForkId = (selectedPhilosopher - 1 + philosophers.length) % philosophers.length;
  const holdsLeft = phil.state === 'eating' || phil.state === 'blocked';
  const holdsRight = phil.state === 'eating';
  const color = STATE_COLORS[phil.state] || '#94a3b8';

  return (
    <div
      onClick={() => setSelectedPhilosopher(null)}
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(0,0,0,0.4)',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'rgba(10, 10, 25, 0.9)',
          backdropFilter: 'blur(24px)',
          border: `1px solid ${color}40`,
          borderRadius: '20px',
          padding: '28px 32px',
          minWidth: '280px',
          boxShadow: `0 0 40px ${color}20, 0 8px 32px rgba(0,0,0,0.6)`,
          fontFamily: "'Inter', sans-serif",
          color: '#e2e8f0',
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div>
            <div style={{ fontSize: '18px', fontWeight: 700, color }}>
              {phil.name}
            </div>
            <div style={{ fontSize: '12px', color: '#64748b' }}>
              Philosopher #{selectedPhilosopher + 1}
            </div>
          </div>
          <button
            onClick={() => setSelectedPhilosopher(null)}
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '8px',
              color: '#94a3b8',
              padding: '4px 10px',
              cursor: 'pointer',
              fontSize: '12px',
            }}
          >
            ✕
          </button>
        </div>

        {/* State */}
        <div style={{
          display: 'inline-block',
          background: `${color}15`,
          border: `1px solid ${color}40`,
          borderRadius: '8px',
          padding: '6px 14px',
          fontSize: '13px',
          fontWeight: 600,
          color,
          textTransform: 'uppercase',
          letterSpacing: '1px',
          marginBottom: '18px',
        }}>
          {phil.state}
        </div>

        {/* Forks */}
        <div style={{ fontSize: '12px', color: '#94a3b8', lineHeight: '2' }}>
          <div>
            🍴 Left Fork (F{leftForkId + 1}): {' '}
            <span style={{ color: holdsLeft ? '#22c55e' : '#64748b', fontWeight: 600 }}>
              {holdsLeft ? 'Holding' : 'On Table'}
            </span>
          </div>
          <div>
            🍴 Right Fork (F{rightForkId + 1}): {' '}
            <span style={{ color: holdsRight ? '#22c55e' : '#64748b', fontWeight: 600 }}>
              {holdsRight ? 'Holding' : 'On Table'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
