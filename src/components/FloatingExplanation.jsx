import React from 'react';
import { useSimulationStore } from '../store/simulationStore';
import { Info, AlertTriangle, CheckCircle, AlertCircle } from 'lucide-react';

const EXPLANATIONS = {
  normal: {
    title: 'Normal Dining',
    icon: Info,
    color: '#3b82f6',
    text: 'Philosophers cycle through thinking → hungry → eating → thinking. When both forks are available, a philosopher picks them up and eats. After eating, forks are released.',
    detail: 'This is the ideal scenario with fair resource distribution.',
  },
  deadlock: {
    title: '⚠ Deadlock',
    icon: AlertTriangle,
    color: '#ef4444',
    text: 'All philosophers pick their LEFT fork simultaneously. Now each waits for the RIGHT fork — which their neighbor holds. Nobody can eat.',
    detail: 'Circular wait: P1→F1→P2→F2→P3→F3→P4→F4→P5→F5→P6→F6→P1',
  },
  starvation: {
    title: '🔥 Starvation',
    icon: AlertCircle,
    color: '#f59e0b',
    text: 'Navya (Philosopher 1) rarely gets to eat. Others repeatedly grab forks before her, starving her indefinitely.',
    detail: 'Starvation = unfair scheduling. The system makes progress, but not for everyone.',
  },
  solution1: {
    title: '✅ Waiter Solution',
    icon: CheckCircle,
    color: '#22c55e',
    text: 'A waiter allows at most 5 philosophers to attempt eating at once. This guarantees at least one can always get both forks.',
    detail: 'Prevents circular wait by limiting concurrent access.',
  },
  solution2: {
    title: '✅ Resource Ordering',
    icon: CheckCircle,
    color: '#22c55e',
    text: 'All philosophers pick the lower-numbered fork first. This global ordering prevents circular wait.',
    detail: 'Example: P6 picks F0 before F5, breaking the cycle.',
  },
  solution3: {
    title: '✅ Odd-Even Strategy',
    icon: CheckCircle,
    color: '#22c55e',
    text: 'Odd philosophers pick left fork first; even pick right first. This asymmetry breaks circular dependency.',
    detail: 'Adjacent philosophers reach for different forks first.',
  },
};

export function FloatingExplanation() {
  const { simulationMode, philosophers } = useSimulationStore();
  const exp = EXPLANATIONS[simulationMode] || EXPLANATIONS.normal;
  const IconComp = exp.icon;

  const counts = {
    thinking: philosophers.filter(p => p.state === 'thinking').length,
    hungry: philosophers.filter(p => p.state === 'hungry').length,
    eating: philosophers.filter(p => p.state === 'eating').length,
    blocked: philosophers.filter(p => p.state === 'blocked').length,
  };

  return (
    <div style={{
      position: 'fixed',
      bottom: '24px',
      right: '24px',
      zIndex: 50,
      background: 'rgba(10, 10, 20, 0.75)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: '16px',
      padding: '20px',
      maxWidth: '300px',
      boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
      fontFamily: "'Inter', sans-serif",
    }}>
      {/* Title */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
        <IconComp size={18} color={exp.color} />
        <span style={{
          fontSize: '14px', fontWeight: 700, color: exp.color,
        }}>
          {exp.title}
        </span>
      </div>

      {/* Description */}
      <p style={{ fontSize: '12px', color: '#cbd5e1', lineHeight: '1.6', marginBottom: '10px' }}>
        {exp.text}
      </p>
      <p style={{ fontSize: '11px', color: '#64748b', lineHeight: '1.5', marginBottom: '16px', fontStyle: 'italic' }}>
        {exp.detail}
      </p>

      {/* Live counts */}
      <div style={{
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px',
      }}>
        {[
          { label: 'Thinking', count: counts.thinking, color: '#3b82f6' },
          { label: 'Hungry', count: counts.hungry, color: '#eab308' },
          { label: 'Eating', count: counts.eating, color: '#22c55e' },
          { label: 'Blocked', count: counts.blocked, color: '#ef4444' },
        ].map((s) => (
          <div key={s.label} style={{
            background: `${s.color}10`,
            border: `1px solid ${s.color}30`,
            borderRadius: '8px',
            padding: '8px 10px',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: '18px', fontWeight: 700, color: s.color }}>{s.count}</div>
            <div style={{ fontSize: '10px', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px' }}>{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
