import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

export default function ReactBitsGlowButton({ children, className = '', ...props }) {
  const btnRef = useRef();

  useEffect(() => {
    const el = btnRef.current;
    gsap.fromTo(
      el,
      { boxShadow: '0 0 0px #a21caf' },
      {
        boxShadow: '0 0 24px 4px #a21caf, 0 0 64px 8px #6366f1',
        repeat: -1,
        yoyo: true,
        duration: 1.2,
        ease: 'sine.inOut',
      }
    );
  }, []);

  return (
    <button
      ref={btnRef}
      className={`relative px-8 py-4 rounded-xl font-bold text-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg transition-all ${className}`}
      {...props}
    >
      {children}
      <span className="absolute inset-0 rounded-xl pointer-events-none" style={{ boxShadow: '0 0 32px 8px #a21caf44' }} />
    </button>
  );
}
