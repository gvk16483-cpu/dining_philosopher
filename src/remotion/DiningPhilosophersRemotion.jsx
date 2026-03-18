import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring } from 'remotion';

const PHILOSOPHERS = [
  { name: 'P1', emoji: '🧑‍🎓' },
  { name: 'P2', emoji: '🤔' },
  { name: 'P3', emoji: '😊' },
  { name: 'P4', emoji: '🎓' },
  { name: 'P5', emoji: '🦾' },
];
const STATES = ['thinking', 'hungry', 'eating', 'blocked'];
const STATE_COLORS = {
  thinking: '#3b82f6',
  hungry: '#eab308',
  eating: '#22c55e',
  blocked: '#ef4444',
};

const getForkOwner = (frame) => {
  const step = Math.floor(frame / 40) % 5;
  return Array(5).fill(null).map((_, i) => (i === step ? step : null));
};

export const DiningPhilosophersRemotion = () => {
  const frame = useCurrentFrame();
  const forkOwners = getForkOwner(frame);

  const getPhilosopherState = (idx) => {
    if (frame < 40) return 'thinking';
    if (frame < 80) return idx === 0 ? 'hungry' : 'thinking';
    if (frame < 120) return idx === 0 ? 'eating' : 'thinking';
    if (frame < 160) return idx === 1 ? 'hungry' : 'thinking';
    if (frame < 200) return idx === 1 ? 'eating' : 'thinking';
    if (frame < 240) return idx === 2 ? 'hungry' : 'thinking';
    if (frame < 280) return idx === 2 ? 'eating' : 'thinking';
    if (frame < 320) return idx === 3 ? 'hungry' : 'thinking';
    if (frame < 360) return idx === 3 ? 'eating' : 'thinking';
    if (frame < 400) return idx === 4 ? 'hungry' : 'thinking';
    if (frame < 440) return idx === 4 ? 'eating' : 'thinking';
    return 'thinking';
  };

  const center = { x: 640, y: 360 };
  const radius = 220;

  return (
    <AbsoluteFill style={{ background: 'radial-gradient(circle at 50% 50%, #18181b 60%, #0f172a 100%)' }}>
      {/* Table */}
      <div style={{
        position: 'absolute',
        left: center.x - 200,
        top: center.y - 200,
        width: 400,
        height: 400,
        borderRadius: '50%',
        background: 'rgba(30,41,59,0.95)',
        border: '8px solid #6366f1',
        boxShadow: '0 0 80px 10px #6366f1aa, 0 0 0 12px #18181b',
        zIndex: 1,
      }} />
      {/* Forks */}
      {Array(5).fill(0).map((_, i) => {
        const angle = (i / 5) * 2 * Math.PI - Math.PI / 2;
        const forkX = center.x + Math.cos(angle) * (radius - 40);
        const forkY = center.y + Math.sin(angle) * (radius - 40);
        const heldBy = forkOwners[i];
        return (
          <div key={i} style={{
            position: 'absolute',
            left: forkX - 24,
            top: forkY - 24,
            zIndex: 2,
            transition: 'filter 0.3s',
            filter: heldBy !== null ? 'drop-shadow(0 0 16px #eab308)' : 'drop-shadow(0 0 4px #64748b)',
          }}>
            <span style={{
              fontSize: 48,
              color: heldBy !== null ? '#eab308' : '#64748b',
              transition: 'color 0.3s',
            }}>🍴</span>
          </div>
        );
      })}
      {/* Philosophers */}
      {PHILOSOPHERS.map((p, i) => {
        const angle = (i / 5) * 2 * Math.PI - Math.PI / 2;
        const x = center.x + Math.cos(angle) * radius;
        const y = center.y + Math.sin(angle) * radius;
        const state = getPhilosopherState(i);
        return (
          <div key={i} style={{
            position: 'absolute',
            left: x - 48,
            top: y - 48,
            width: 96,
            height: 96,
            borderRadius: 32,
            background: `linear-gradient(135deg, ${STATE_COLORS[state]}33 60%, #18181b 100%)`,
            border: `4px solid ${STATE_COLORS[state]}`,
            boxShadow: state === 'eating' ? '0 0 32px 8px #22c55e88' : '0 0 12px 2px #64748b',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 40,
            fontWeight: 700,
            zIndex: 3,
            transition: 'box-shadow 0.3s',
          }}>
            <span>{p.emoji}</span>
            <span style={{ fontSize: 18, color: '#fff', marginTop: 4 }}>{p.name}</span>
            <span style={{ fontSize: 14, color: STATE_COLORS[state], fontWeight: 600 }}>{state.charAt(0).toUpperCase() + state.slice(1)}</span>
          </div>
        );
      })}
    </AbsoluteFill>
  );
}
