import React from 'react';
import { Utensils, HelpCircle } from 'lucide-react';

export function FloatingNavbar() {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 50,
      background: 'rgba(10, 10, 20, 0.6)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      borderBottom: '1px solid rgba(255,255,255,0.06)',
      padding: '0 24px',
      height: '52px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      fontFamily: "'Inter', sans-serif",
    }}>
      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <Utensils size={20} color="#a78bfa" />
        <span style={{
          fontSize: '16px', fontWeight: 700,
          background: 'linear-gradient(135deg, #a78bfa, #60a5fa)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          letterSpacing: '0.5px',
        }}>
          Dining Philosophers
        </span>
        <span style={{
          fontSize: '10px', color: '#475569',
          fontWeight: 600, letterSpacing: '1px',
          textTransform: 'uppercase',
        }}>
          immersive simulator
        </span>
      </div>

      {/* Right: help hint */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: '6px',
          fontSize: '11px', color: '#64748b',
        }}>
          <HelpCircle size={14} />
          Drag to look around · Scroll to zoom
        </div>
      </div>
    </div>
  );
}
