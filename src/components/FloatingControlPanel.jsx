import React, { useRef } from 'react';
import { useSimulationStore } from '../store/simulationStore';
import { Play, Pause, Zap, Flame, RotateCcw, Lightbulb, Volume2, VolumeX } from 'lucide-react';

const GlowButton = ({ onClick, children, color = 'blue', active = false, icon: Icon }) => {
  const btnRef = useRef(null);
  const colorMap = {
    blue: { bg: 'rgba(59,130,246,0.15)', border: 'rgba(59,130,246,0.5)', glow: '0 0 20px rgba(59,130,246,0.3)', hoverGlow: '0 0 30px rgba(59,130,246,0.5)', text: '#93c5fd' },
    green: { bg: 'rgba(34,197,94,0.15)', border: 'rgba(34,197,94,0.5)', glow: '0 0 20px rgba(34,197,94,0.3)', hoverGlow: '0 0 30px rgba(34,197,94,0.5)', text: '#86efac' },
    red: { bg: 'rgba(239,68,68,0.15)', border: 'rgba(239,68,68,0.5)', glow: '0 0 20px rgba(239,68,68,0.3)', hoverGlow: '0 0 30px rgba(239,68,68,0.5)', text: '#fca5a5' },
    amber: { bg: 'rgba(245,158,11,0.15)', border: 'rgba(245,158,11,0.5)', glow: '0 0 20px rgba(245,158,11,0.3)', hoverGlow: '0 0 30px rgba(245,158,11,0.5)', text: '#fcd34d' },
    purple: { bg: 'rgba(168,85,247,0.15)', border: 'rgba(168,85,247,0.5)', glow: '0 0 20px rgba(168,85,247,0.3)', hoverGlow: '0 0 30px rgba(168,85,247,0.5)', text: '#c4b5fd' },
    slate: { bg: 'rgba(100,116,139,0.15)', border: 'rgba(100,116,139,0.5)', glow: '0 0 10px rgba(100,116,139,0.2)', hoverGlow: '0 0 20px rgba(100,116,139,0.3)', text: '#cbd5e1' },
  };
  const c = colorMap[color] || colorMap.blue;

  return (
    <button
      ref={btnRef}
      onClick={onClick}
      className="glow-btn"
      style={{
        background: active ? c.bg : 'rgba(15,15,25,0.6)',
        border: `1px solid ${active ? c.border : 'rgba(255,255,255,0.08)'}`,
        boxShadow: active ? c.glow : 'none',
        padding: '8px 14px',
        borderRadius: '10px',
        color: '#e2e8f0',
        fontSize: '12px',
        fontWeight: 600,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        transition: 'all 0.3s ease',
        fontFamily: "'Inter', sans-serif",
        letterSpacing: '0.5px',
        whiteSpace: 'nowrap',
      }}
      onMouseEnter={() => {
        if (btnRef.current) {
          btnRef.current.style.boxShadow = c.hoverGlow;
          btnRef.current.style.borderColor = c.border;
          btnRef.current.style.background = c.bg;
        }
      }}
      onMouseLeave={() => {
        if (btnRef.current) {
          btnRef.current.style.boxShadow = active ? c.glow : 'none';
          btnRef.current.style.borderColor = active ? c.border : 'rgba(255,255,255,0.08)';
          btnRef.current.style.background = active ? c.bg : 'rgba(15,15,25,0.6)';
        }
      }}
    >
      {Icon && <Icon size={14} style={{ pointerEvents: 'none', flexShrink: 0 }} />}
      {children}
    </button>
  );
};

export function FloatingControlPanel() {
  const {
    isRunning, simulationMode, speed,
    setIsRunning, setSimulationMode, setSpeed, reset, setShowSolution,
    audioEnabled, setAudioEnabled,
  } = useSimulationStore();

  return (
    <div style={{
      position: 'fixed',
      bottom: '24px',
      left: '24px',
      zIndex: 50,
      background: 'rgba(10, 10, 20, 0.75)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: '16px',
      padding: '20px',
      maxWidth: '320px',
      boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
      userSelect: 'none',
    }}>
      {/* Title */}
      <div style={{
        fontSize: '11px', fontWeight: 700, color: '#94a3b8',
        textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '14px',
        fontFamily: "'Inter', sans-serif",
      }}>
        ⚙ Control Panel
      </div>

      {/* Play / Pause / Reset */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '14px' }}>
        <GlowButton
          onClick={() => setIsRunning(!isRunning)}
          color={isRunning ? 'red' : 'green'}
          active={true}
          icon={isRunning ? Pause : Play}
        >
          {isRunning ? 'Pause' : 'Start'}
        </GlowButton>
        <GlowButton onClick={() => { reset(); }} color="slate" icon={RotateCcw}>
          Reset
        </GlowButton>
      </div>

      {/* Scenario Buttons */}
      <div style={{
        fontSize: '10px', fontWeight: 600, color: '#64748b',
        textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '8px',
      }}>
        Scenarios
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '14px' }}>
        <GlowButton
          onClick={() => { reset(); setSimulationMode('normal'); setIsRunning(true); }}
          color="blue" active={simulationMode === 'normal'}
        >
          Normal
        </GlowButton>
        <GlowButton
          onClick={() => { reset(); setSimulationMode('deadlock'); setIsRunning(true); }}
          color="red" active={simulationMode === 'deadlock'} icon={Zap}
        >
          Deadlock
        </GlowButton>
        <GlowButton
          onClick={() => { reset(); setSimulationMode('starvation'); setIsRunning(true); }}
          color="amber" active={simulationMode === 'starvation'} icon={Flame}
        >
          Starvation
        </GlowButton>
      </div>

      {/* Solutions */}
      <div style={{
        fontSize: '10px', fontWeight: 600, color: '#64748b',
        textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '8px',
      }}>
        Solutions
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '14px' }}>
        <GlowButton
          onClick={() => { reset(); setSimulationMode('solution1'); setIsRunning(true); }}
          color="green" active={simulationMode === 'solution1'}
        >
          Waiter
        </GlowButton>
        <GlowButton
          onClick={() => { reset(); setSimulationMode('solution2'); setIsRunning(true); }}
          color="green" active={simulationMode === 'solution2'}
        >
          Ordering
        </GlowButton>
        <GlowButton
          onClick={() => { reset(); setSimulationMode('solution3'); setIsRunning(true); }}
          color="green" active={simulationMode === 'solution3'}
        >
          Odd-Even
        </GlowButton>
      </div>

      {/* Show Solution Explainer */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '14px' }}>
        <GlowButton onClick={() => setShowSolution(true)} color="purple" icon={Lightbulb}>
          Show Solution Guide
        </GlowButton>
      </div>

      {/* Speed */}
      <div style={{
        fontSize: '10px', fontWeight: 600, color: '#64748b',
        textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '8px',
      }}>
        Speed
      </div>
      <div style={{ display: 'flex', gap: '6px', marginBottom: '10px' }}>
        {[0.5, 1, 2, 5].map((s) => (
          <GlowButton key={s} onClick={() => setSpeed(s)} color="blue" active={speed === s}>
            {s}x
          </GlowButton>
        ))}
      </div>

      {/* Audio toggle */}
      <GlowButton onClick={() => setAudioEnabled(!audioEnabled)} color="slate" icon={audioEnabled ? Volume2 : VolumeX}>
        {audioEnabled ? 'Sound On' : 'Sound Off'}
      </GlowButton>
    </div>
  );
}
