import React, { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, SoftShadows, Environment } from '@react-three/drei';
import * as THREE from 'three';
import { useSimulationStore } from '../store/simulationStore';
import { PhilosopherModel } from './PhilosopherModel';
import { ForkModel } from './ForkModel';

function WoodTable() {
  return (
    <group>
      {/* Main table surface */}
      <mesh receiveShadow position={[0, 0.15, 0]}>
        <cylinderGeometry args={[5.0, 5.2, 0.2, 64]} />
        <meshStandardMaterial color="#6b4226" roughness={0.75} metalness={0.05} />
      </mesh>
      {/* Table edge / rim */}
      <mesh receiveShadow position={[0, 0.15, 0]}>
        <torusGeometry args={[5.1, 0.12, 8, 64]} />
        <meshStandardMaterial color="#4a2e14" roughness={0.6} metalness={0.1} />
      </mesh>
      {/* Center piece / lazy susan */}
      <mesh receiveShadow position={[0, 0.28, 0]}>
        <cylinderGeometry args={[0.8, 0.8, 0.05, 32]} />
        <meshStandardMaterial color="#8B6914" roughness={0.4} metalness={0.3} />
      </mesh>
      {/* Table legs (4 legs) */}
      {[0, Math.PI/2, Math.PI, Math.PI*1.5].map((a, i) => (
        <mesh key={i} position={[Math.cos(a)*4.2, -0.7, Math.sin(a)*4.2]} castShadow>
          <cylinderGeometry args={[0.15, 0.2, 1.8, 8]} />
          <meshStandardMaterial color="#3e1f0d" roughness={0.8} />
        </mesh>
      ))}
      {/* Floor plane */}
      <mesh receiveShadow rotation={[-Math.PI/2, 0, 0]} position={[0, -1.6, 0]}>
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial color="#1a1215" roughness={0.95} />
      </mesh>
    </group>
  );
}

function Plate({ angle, state, idx }) {
  const plateDist = 3.6;
  const px = Math.cos(angle) * plateDist;
  const pz = Math.sin(angle) * plateDist;
  const foodRef = useRef();

  useFrame(({ clock }) => {
    if (foodRef.current) {
      if (state === 'eating') {
        const s = 0.5 + Math.abs(Math.sin(clock.elapsedTime * 2 + idx)) * 0.5;
        foodRef.current.scale.setScalar(s);
      } else {
        foodRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.05);
      }
    }
  });

  return (
    <group position={[px, 0.28, pz]}>
      {/* Plate */}
      <mesh receiveShadow castShadow>
        <cylinderGeometry args={[0.4, 0.42, 0.04, 24]} />
        <meshStandardMaterial color="#f5f5f0" roughness={0.3} metalness={0.05} />
      </mesh>
      {/* Plate rim */}
      <mesh position={[0, 0.01, 0]}>
        <torusGeometry args={[0.38, 0.025, 8, 24]} />
        <meshStandardMaterial color="#e8e8e0" roughness={0.3} />
      </mesh>

      {/* Food items */}
      <group ref={foodRef} position={[0, 0.06, 0]}>
        <mesh castShadow>
          <sphereGeometry args={[0.18, 12, 8]} />
          <meshStandardMaterial color="#d4a44a" roughness={0.7} />
        </mesh>
        <mesh position={[0.08, 0.05, 0.05]} castShadow>
          <sphereGeometry args={[0.06, 8, 6]} />
          <meshStandardMaterial color="#4a8c3f" roughness={0.8} />
        </mesh>
        <mesh position={[-0.06, 0.04, -0.07]} castShadow>
          <sphereGeometry args={[0.05, 8, 6]} />
          <meshStandardMaterial color="#c0392b" roughness={0.7} />
        </mesh>
      </group>
    </group>
  );
}

function Chair({ angle }) {
  const dist = 5.5;
  const px = Math.cos(angle) * dist;
  const pz = Math.sin(angle) * dist;
  const facing = angle + Math.PI;

  return (
    <group position={[px, -0.3, pz]} rotation={[0, -facing + Math.PI/2, 0]}>
      <mesh castShadow position={[0, 0, 0]}>
        <boxGeometry args={[0.6, 0.08, 0.6]} />
        <meshStandardMaterial color="#3e1f0d" roughness={0.8} />
      </mesh>
      <mesh castShadow position={[0, 0.5, -0.28]}>
        <boxGeometry args={[0.55, 0.9, 0.06]} />
        <meshStandardMaterial color="#3e1f0d" roughness={0.8} />
      </mesh>
      {[[-0.25, -0.5, 0.25], [0.25, -0.5, 0.25], [-0.25, -0.5, -0.25], [0.25, -0.5, -0.25]].map((p, i) => (
        <mesh key={i} position={p} castShadow>
          <cylinderGeometry args={[0.03, 0.03, 0.9, 6]} />
          <meshStandardMaterial color="#2a1508" roughness={0.9} />
        </mesh>
      ))}
    </group>
  );
}

function OverheadLamp() {
  return (
    <group position={[0, 6, 0]}>
      <mesh>
        <coneGeometry args={[1.5, 0.8, 16, 1, true]} />
        <meshStandardMaterial color="#2a2a2a" side={THREE.DoubleSide} roughness={0.6} />
      </mesh>
      <mesh position={[0, 2, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 4, 4]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      <pointLight position={[0, -0.3, 0]} intensity={60} color="#ffe4b5" distance={20} decay={2} castShadow />
    </group>
  );
}

function ImmersiveScene() {
  const philosophers = useSimulationStore(s => s.philosophers);
  const forks = useSimulationStore(s => s.forks);

  // Fork holdership is now securely stored directly in the `forks` array as philosopher IDs
  // preventing visual bugs where an adjacent thinker claimed a fork visually.

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.15} color="#b0c4de" />
      <OverheadLamp />

      <pointLight position={[-6, 4, -6]} intensity={3} color="#4a3a6e" distance={15} decay={2} />
      <pointLight position={[6, 4, 6]} intensity={2} color="#3a5a3a" distance={15} decay={2} />

      <fog attach="fog" args={['#0a0a12', 8, 25]} />

      <WoodTable />

      {philosophers.map((_, i) => {
        const angle = (i / philosophers.length) * Math.PI * 2 - Math.PI / 2;
        return <Chair key={`chair-${i}`} angle={angle} />;
      })}

      {philosophers.map((phil, i) => {
        const angle = (i / philosophers.length) * Math.PI * 2 - Math.PI / 2;
        return <Plate key={`plate-${i}`} angle={angle} state={phil.state} idx={i} />;
      })}

      {forks.map((forkState, i) => {
        // forkState is either 'available' or the numerical ID of the philosopher holding it
        const holderId = forkState === 'available' ? null : forkState;
        const holderState = holderId !== null ? philosophers[holderId]?.state : null;
        return (
          <ForkModel
            key={`fork-${i}`}
            idx={i}
            heldByPhilosopher={holderId}
            philosopherState={holderState}
          />
        );
      })}

      {philosophers.map((phil, i) => {
        const angle = (i / philosophers.length) * Math.PI * 2 - Math.PI / 2;
        return (
          <PhilosopherModel
            key={`phil-${i}`}
            idx={i}
            state={phil.state}
            angle={angle}
          />
        );
      })}

      <OrbitControls
        target={[0, 0.8, 0]}
        enablePan={false}
        enableZoom={true}
        minDistance={0.5}
        maxDistance={8}
        minPolarAngle={Math.PI / 8}
        maxPolarAngle={Math.PI / 1.8}
        enableDamping={true}
        dampingFactor={0.05}
        rotateSpeed={0.5}
      />
    </>
  );
}

export function DiningTable3D() {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      background: '#0a0a12',
      zIndex: 0,
    }}>
      <Canvas
        shadows
        camera={{
          position: [0, 3.2, 3.5],
          fov: 80,
          near: 0.1,
          far: 100,
        }}
        gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.2 }}
        dpr={[1, 2]}
      >
        <SoftShadows samples={16} size={25} />
        <Suspense fallback={null}>
          <ImmersiveScene />
        </Suspense>
      </Canvas>
    </div>
  );
}
