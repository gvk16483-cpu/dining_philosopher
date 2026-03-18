import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const NUM_PARTICLES = 32;

const random = (min, max) => Math.random() * (max - min) + min;

export default function ReactBitsParticles({ className = '', style = {} }) {
  const containerRef = useRef();

  useEffect(() => {
    const particles = Array.from(containerRef.current.children);
    particles.forEach((el, i) => {
      gsap.to(el, {
        y: random(-40, 40),
        x: random(-40, 40),
        scale: random(0.7, 1.3),
        opacity: random(0.2, 0.7),
        duration: random(3, 7),
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: random(0, 2),
      });
    });
  }, []);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
        ...style,
      }}
    >
      {Array(NUM_PARTICLES)
        .fill(0)
        .map((_, i) => (
          <span
            key={i}
            style={{
              position: 'absolute',
              left: `${random(0, 100)}%`,
              top: `${random(0, 100)}%`,
              width: random(8, 18),
              height: random(8, 18),
              borderRadius: '50%',
              background: `linear-gradient(135deg, #6366f1 60%, #a21caf 100%)`,
              filter: 'blur(2px)',
              opacity: 0.4,
            }}
          />
        ))}
    </div>
  );
}
