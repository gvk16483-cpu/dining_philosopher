import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSimulationStore } from '../store/simulationStore';
import { X, ChevronLeft, ChevronRight, Users, ListOrdered, Shuffle } from 'lucide-react';

const SOLUTIONS = [
  {
    title: 'The Problem: Deadlock',
    icon: '⚠️',
    color: '#ef4444',
    steps: [
      { text: 'All 6 philosophers pick up their LEFT fork simultaneously.', highlight: 'red' },
      { text: 'Each philosopher now waits for the RIGHT fork.', highlight: 'red' },
      { text: 'But the right fork is held by their neighbor!', highlight: 'red' },
      { text: 'Circular wait: P1→P2→P3→P4→P5→P6→P1', highlight: 'red' },
      { text: 'Result: DEADLOCK — nobody can eat, system is frozen.', highlight: 'red' },
    ],
    diagram: `
  P1 holds F1, waits F2
  P2 holds F2, waits F3
  P3 holds F3, waits F4
  P4 holds F4, waits F5
  P5 holds F5, waits F6
  P6 holds F6, waits F1  ← cycle!
    `,
  },
  {
    title: 'Solution 1: Waiter / Arbitrator',
    icon: '👨‍💼',
    color: '#22c55e',
    steps: [
      { text: 'Introduce a waiter who controls access to the table.', highlight: 'green' },
      { text: 'Rule: At most N-1 (4) philosophers can try to eat simultaneously.', highlight: 'green' },
      { text: 'This guarantees at least one philosopher can get both forks.', highlight: 'green' },
      { text: 'No circular wait is possible with this constraint.', highlight: 'green' },
      { text: 'Analogy: A semaphore initialized to N-1.', highlight: 'blue' },
    ],
    diagram: `
  Waiter allows max 4 at table:
  ✅ P1 eats (has F1, F2)
  ✅ P3 eats (has F3, F4)
  ⏳ P2 waits (waiter says wait)
  ⏳ P4 waits
  🤔 P5 thinks
    `,
  },
  {
    title: 'Solution 2: Resource Ordering',
    icon: '📊',
    color: '#3b82f6',
    steps: [
      { text: 'Number all forks 1 through 6.', highlight: 'blue' },
      { text: 'Rule: Always pick the LOWER-numbered fork first.', highlight: 'blue' },
      { text: 'P1 picks F1 then F2, P2 picks F2 then F3, ...', highlight: 'blue' },
      { text: 'P6 picks F1 then F6 (NOT F6 then F1)', highlight: 'green' },
      { text: 'This breaks the circular wait because P6 reverses order!', highlight: 'green' },
    ],
    diagram: `
  Fork ordering prevents cycle:
  P1: pick F1 → F2 ✅
  P2: pick F2 → F3 ✅
  P3: pick F3 → F4 ✅
  P4: pick F4 → F5 ✅
  P5: pick F5 → F6 ✅
  P6: pick F1 → F6 ✅ (reversed!)
    `,
  },
  {
    title: 'Solution 3: Odd-Even Strategy',
    icon: '🔀',
    color: '#a855f7',
    steps: [
      { text: 'Split philosophers into ODD and EVEN groups.', highlight: 'purple' },
      { text: 'ODD philosophers: pick LEFT fork first, then RIGHT.', highlight: 'blue' },
      { text: 'EVEN philosophers: pick RIGHT fork first, then LEFT.', highlight: 'amber' },
      { text: 'Adjacent philosophers reach for DIFFERENT forks first.', highlight: 'green' },
      { text: 'This asymmetry prevents the circular wait condition.', highlight: 'green' },
    ],
    diagram: `
  Asymmetric picking:
  P1 (odd):  LEFT → RIGHT
  P2 (even): RIGHT → LEFT
  P3 (odd):  LEFT → RIGHT
  P4 (even): RIGHT → LEFT
  P5 (odd):  LEFT → RIGHT
  P6 (even): RIGHT → LEFT
    `,
  },
];

const highlightColors = {
  red: '#fca5a5',
  green: '#86efac',
  blue: '#93c5fd',
  purple: '#c4b5fd',
  amber: '#fcd34d',
};

export function SolutionModal() {
  const { showSolution, setShowSolution } = useSimulationStore();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  if (!showSolution) return null;

  const solution = SOLUTIONS[currentSlide];

  const nextStep = () => {
    if (currentStep < solution.steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else if (currentSlide < SOLUTIONS.length - 1) {
      setCurrentSlide(currentSlide + 1);
      setCurrentStep(0);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
      setCurrentStep(SOLUTIONS[currentSlide - 1].steps.length - 1);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      zIndex: 200,
      background: 'rgba(0,0,0,0.85)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "'Inter', sans-serif",
    }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        style={{
          background: 'rgba(15, 15, 30, 0.95)',
          border: `1px solid ${solution.color}30`,
          borderRadius: '24px',
          padding: '40px',
          maxWidth: '680px',
          width: '90vw',
          maxHeight: '80vh',
          overflow: 'auto',
          boxShadow: `0 0 60px ${solution.color}15, 0 20px 60px rgba(0,0,0,0.6)`,
          position: 'relative',
        }}
      >
        {/* Close */}
        <button
          onClick={() => { setShowSolution(false); setCurrentSlide(0); setCurrentStep(0); }}
          style={{
            position: 'absolute', top: '16px', right: '16px',
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '10px',
            color: '#94a3b8',
            padding: '6px 10px',
            cursor: 'pointer',
          }}
        >
          <X size={18} />
        </button>

        {/* Slide indicator */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
          {SOLUTIONS.map((s, i) => (
            <div
              key={i}
              onClick={() => { setCurrentSlide(i); setCurrentStep(0); }}
              style={{
                flex: 1,
                height: '4px',
                borderRadius: '2px',
                background: i === currentSlide ? solution.color : 'rgba(255,255,255,0.1)',
                cursor: 'pointer',
                transition: 'all 0.3s',
              }}
            />
          ))}
        </div>

        {/* Title */}
        <div style={{ fontSize: '28px', fontWeight: 700, color: solution.color, marginBottom: '8px' }}>
          {solution.icon} {solution.title}
        </div>
        <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '28px' }}>
          Step {currentStep + 1} of {solution.steps.length} · Slide {currentSlide + 1} of {SOLUTIONS.length}
        </div>

        {/* Steps (revealed one at a time) */}
        <div style={{ marginBottom: '24px', minHeight: '200px' }}>
          <AnimatePresence mode="wait">
            {solution.steps.slice(0, currentStep + 1).map((step, i) => (
              <motion.div
                key={`${currentSlide}-${i}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px',
                  marginBottom: '14px',
                }}
              >
                <div style={{
                  width: '24px', height: '24px', borderRadius: '50%',
                  background: `${highlightColors[step.highlight]}20`,
                  border: `1px solid ${highlightColors[step.highlight]}50`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '11px', fontWeight: 700,
                  color: highlightColors[step.highlight],
                  flexShrink: 0,
                }}>
                  {i + 1}
                </div>
                <p style={{
                  fontSize: '14px', color: '#cbd5e1', lineHeight: '1.6',
                }}>
                  {step.text}
                </p>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Diagram */}
          {currentStep === solution.steps.length - 1 && (
            <motion.pre
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              style={{
                background: 'rgba(255,255,255,0.03)',
                borderRadius: '12px',
                padding: '16px 20px',
                fontSize: '12px',
                color: '#94a3b8',
                fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                lineHeight: '1.8',
                border: '1px solid rgba(255,255,255,0.05)',
                marginTop: '16px',
                whiteSpace: 'pre-wrap',
              }}
            >
              {solution.diagram.trim()}
            </motion.pre>
          )}
        </div>

        {/* Navigation */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button
            onClick={prevStep}
            disabled={currentSlide === 0 && currentStep === 0}
            style={{
              display: 'flex', alignItems: 'center', gap: '6px',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '10px',
              color: currentSlide === 0 && currentStep === 0 ? '#334155' : '#94a3b8',
              padding: '8px 16px',
              cursor: currentSlide === 0 && currentStep === 0 ? 'not-allowed' : 'pointer',
              fontSize: '13px',
            }}
          >
            <ChevronLeft size={16} /> Previous
          </button>

          <button
            onClick={nextStep}
            disabled={currentSlide === SOLUTIONS.length - 1 && currentStep === solution.steps.length - 1}
            style={{
              display: 'flex', alignItems: 'center', gap: '6px',
              background: `${solution.color}20`,
              border: `1px solid ${solution.color}40`,
              borderRadius: '10px',
              color: solution.color,
              padding: '8px 16px',
              cursor: (currentSlide === SOLUTIONS.length - 1 && currentStep === solution.steps.length - 1) ? 'not-allowed' : 'pointer',
              fontSize: '13px',
              fontWeight: 600,
            }}
          >
            Next <ChevronRight size={16} />
          </button>
        </div>
      </motion.div>
    </div>
  );
}
