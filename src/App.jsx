import React from 'react';
import { useSimulationStore } from './store/simulationStore';
import { DiningTable3D } from './components/DiningTable3D';
import { FloatingControlPanel } from './components/FloatingControlPanel';
import { FloatingNavbar } from './components/FloatingNavbar';
import { PhilosopherPopup } from './components/PhilosopherPopup';
import { FloatingExplanation } from './components/FloatingExplanation';
import { SolutionModal } from './components/SolutionModal';
import { usePhilosopherSimulation } from './hooks/usePhilosopherSimulation';
import './index.css';

function App() {
  usePhilosopherSimulation();
  const showSolution = useSimulationStore(s => s.showSolution);

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden', backgroundColor: '#050505' }}>
      <DiningTable3D />
      <FloatingNavbar />
      <FloatingControlPanel />
      <PhilosopherPopup />
      <FloatingExplanation />
      {showSolution && <SolutionModal />}
    </div>
  );
}

export default App;
