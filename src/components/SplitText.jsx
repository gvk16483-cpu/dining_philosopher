import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

const SplitText = ({ text, delay = 100, duration = 0.6, className = '' }) => {
  const ref = useRef();

  useEffect(() => {
    const chars = ref.current.querySelectorAll('.split-char');
    gsap.fromTo(
      chars,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        stagger: delay / 1000,
        duration,
        ease: 'power3.out',
      }
    );
  }, [text, delay, duration]);

  return (
    <span ref={ref} className={className}>
      {text.split('').map((char, i) => (
        <span key={i} className="split-char inline-block">
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  );
};

export default SplitText;
