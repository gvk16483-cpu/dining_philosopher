import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { useSimulationStore } from '../store/simulationStore';

const STATE_COLORS = {
  thinking: { glow: '#6b8fc5', accent: '#3b82f6' },
  hungry:   { glow: '#daa520', accent: '#eab308' },
  eating:   { glow: '#4ade80', accent: '#22c55e' },
  blocked:  { glow: '#f87171', accent: '#ef4444' },
};

const CHARACTER_CONFIGS = [
  
  { name: 'Navya', gender: 'female', hairStyle: 'long', hairColor: '#2b1b17', skinColor: '#f0c8a0', outfitColor: '#60a5fa', hat: null },
  { name: 'Ashrith', gender: 'male', hairStyle: 'short', hairColor: '#3d2314', skinColor: '#e8b090', outfitColor: '#f87171', hat: 'cap' },
  { name: 'Pardhu', gender: 'male', hairStyle: 'messy', hairColor: '#4a2c6e', skinColor: '#f5deb3', outfitColor: '#4ade80', hat: 'beanie' },
  { name: 'Divya', gender: 'female', hairStyle: 'long-bun', hairColor: '#1a1a1a', skinColor: '#e8b090', outfitColor: '#c084fc', hat: null },
  { name: 'Ganesh', gender: 'male', hairStyle: 'short', hairColor: '#2b1b17', skinColor: '#d2b48c', outfitColor: '#facc15', hat: 'cone' },
  { name: 'Vamsi', gender: 'male', hairStyle: 'styled', hairColor: '#0f172a', skinColor: '#ffdfc4', outfitColor: '#f1f5f9', hat: null, glasses: null },
];

function CharacterFeatures({ config, y }) {
  return (
    <group position={[0, y, 0]}>
      {/* Hair */}
      {config.hairStyle === 'long' && (
        <group>
          {/* Top hair */}
          <mesh position={[0, 0.28, -0.05]} castShadow>
            <sphereGeometry args={[0.29, 16, 16, 0, Math.PI * 2, 0, Math.PI / 1.5]} />
            <meshStandardMaterial color={config.hairColor} roughness={0.8} />
          </mesh>
          {/* Back long hair */}
          <mesh position={[0, -0.1, -0.21]} castShadow>
            <cylinderGeometry args={[0.2, 0.25, 0.6, 16]} />
            <meshStandardMaterial color={config.hairColor} roughness={0.8} />
          </mesh>
        </group>
      )}
      
      {config.hairStyle === 'long-bun' && (
        <group>
          <mesh position={[0, 0.28, -0.05]} castShadow>
            <sphereGeometry args={[0.29, 16, 16, 0, Math.PI * 2, 0, Math.PI / 1.5]} />
            <meshStandardMaterial color={config.hairColor} roughness={0.8} />
          </mesh>
          {/* Bun */}
          <mesh position={[0, 0.15, -0.28]} castShadow>
            <sphereGeometry args={[0.12, 16, 16]} />
            <meshStandardMaterial color={config.hairColor} roughness={0.8} />
          </mesh>
        </group>
      )}

      {config.hairStyle === 'short' && (
        <mesh position={[0, 0.28, -0.05]} castShadow>
          <sphereGeometry args={[0.29, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial color={config.hairColor} roughness={0.8} />
        </mesh>
      )}

      {config.hairStyle === 'messy' && (
        <mesh position={[0, 0.28, -0.05]} castShadow>
          <sphereGeometry args={[0.29, 12, 12, 0, Math.PI * 2, 0, Math.PI / 1.8]} />
          <meshStandardMaterial color={config.hairColor} roughness={0.9} />
        </mesh>
      )}

      {config.hairStyle === 'styled' && ( // Vamsi
        <group>
          <mesh position={[0, 0.28, -0.05]} castShadow>
            <sphereGeometry args={[0.29, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
            <meshStandardMaterial color={config.hairColor} roughness={0.5} />
          </mesh>
          {/* Quiff/pomp */}
          <mesh position={[0, 0.35, 0.15]} rotation={[-0.2, 0, 0]} castShadow>
            <cylinderGeometry args={[0.08, 0.15, 0.2, 8]} />
            <meshStandardMaterial color={config.hairColor} roughness={0.5} />
          </mesh>
        </group>
      )}

      {/* Glasses */}
      {config.glasses === 'sunglasses' && (
        <group position={[0, 0.08, 0.27]}>
          <mesh position={[-0.12, 0, 0]} castShadow>
            <boxGeometry args={[0.16, 0.08, 0.02]} />
            <meshStandardMaterial color="#111" metalness={0.8} roughness={0.2} />
          </mesh>
          <mesh position={[0.12, 0, 0]} castShadow>
            <boxGeometry args={[0.16, 0.08, 0.02]} />
            <meshStandardMaterial color="#111" metalness={0.8} roughness={0.2} />
          </mesh>
          {/* Bridge */}
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[0.08, 0.02, 0.02]} />
            <meshStandardMaterial color="#333" />
          </mesh>
        </group>
      )}

      {/* Hats */}
      {config.hat === 'cap' && (
        <group position={[0, 0.3, 0.05]} rotation={[-0.1, 0, 0]}>
          <mesh castShadow>
            <sphereGeometry args={[0.26, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
            <meshStandardMaterial color="#ef4444" roughness={0.8} />
          </mesh>
          {/* Brim */}
          <mesh position={[0, 0, 0.18]} rotation={[0.1, 0, 0]} castShadow>
            <cylinderGeometry args={[0.25, 0.25, 0.02, 16, 1, false, 0, Math.PI]} />
            <meshStandardMaterial color="#ef4444" roughness={0.8} />
          </mesh>
        </group>
      )}
      
      {config.hat === 'beanie' && (
        <mesh position={[0, 0.3, 0.05]} rotation={[0, 0, 0.1]} castShadow>
          <sphereGeometry args={[0.25, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial color="#4a2c6e" roughness={0.9} />
        </mesh>
      )}

      {config.hat === 'cone' && (
        <mesh position={[0, 0.4, 0]} castShadow>
          <coneGeometry args={[0.25, 0.5, 12]} />
          <meshStandardMaterial color="#8B4513" roughness={0.6} />
        </mesh>
      )}
    </group>
  );
}

export function PhilosopherModel({ idx, state, angle }) {
  const groupRef = useRef();
  const headRef = useRef();
  const leftArmRef = useRef();
  const rightArmRef = useRef();
  const leftPupilRef = useRef();
  const rightPupilRef = useRef();
  const mouthRef = useRef();
  const bodyRef = useRef();
  const armsRef = useRef({ leftX: 0, leftZ: 0, rightX: 0, rightZ: 0 });

  const { hoveredPhilosopher, setHoveredPhilosopher, setSelectedPhilosopher } = useSimulationStore();
  const isHovered = hoveredPhilosopher === idx;
  const pCount = useSimulationStore(s => s.philosophers.length);

  const dist = 4.2;
  const px = Math.cos(angle) * dist;
  const pz = Math.sin(angle) * dist;
  const facingAngle = angle + Math.PI;

  const colors = useMemo(() => STATE_COLORS[state] || STATE_COLORS.thinking, [state]);
  const config = CHARACTER_CONFIGS[idx % CHARACTER_CONFIGS.length];
  
  const bodyEmissive = colors.accent;

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    const pIdx = idx * 1.3;

    if (headRef.current) {
      if (state === 'thinking') {
        headRef.current.rotation.z = Math.sin(t * 0.8 + pIdx) * 0.08;
        headRef.current.rotation.x = Math.sin(t * 0.5 + pIdx) * 0.04;
      } else if (state === 'hungry') {
        headRef.current.rotation.y = Math.sin(t * 2.0 + pIdx) * 0.25;
        headRef.current.rotation.x = Math.sin(t * 1.2 + pIdx) * 0.06 - 0.1;
      } else if (state === 'eating') {
        headRef.current.rotation.x = Math.sin(t * 3.0 + pIdx) * 0.08;
        headRef.current.rotation.z = 0;
      } else if (state === 'blocked') {
        headRef.current.rotation.z = Math.sin(t * 4.0 + pIdx) * 0.12;
        headRef.current.rotation.x = Math.sin(t * 2.0 + pIdx) * 0.05;
      }
    }

    if (leftArmRef.current && rightArmRef.current) {
      let targetLeftX = 0, targetLeftZ = 0, targetRightX = 0, targetRightZ = 0;

      if (state === 'thinking') {
        targetLeftX = -0.3 + Math.sin(t * 1.5 + pIdx) * 0.05;
        targetRightX = -0.3 + Math.sin(t * 1.5 + pIdx + 1) * 0.05;
      } else if (state === 'hungry') {
        targetLeftX = -0.8 + Math.sin(t * 2 + pIdx) * 0.15;
        targetRightX = -0.8 + Math.sin(t * 2 + pIdx + 0.5) * 0.15;
      } else if (state === 'eating') {
        targetLeftX = -1.6 + Math.sin(t * 8 + pIdx) * 0.2;
        targetRightX = -1.6 + Math.sin(t * 8 + pIdx + 1) * 0.2;
        targetLeftZ = 0.2;
        targetRightZ = -0.2;
      } else if (state === 'blocked') {
        targetLeftX = -0.6;
        targetRightX = -0.6;
        targetLeftZ = Math.sin(t * 5 + pIdx) * 0.05;
        targetRightZ = Math.sin(t * 5 + pIdx) * -0.05;
      }

      const lerpSpeed = 0.04;
      armsRef.current.leftX += (targetLeftX - armsRef.current.leftX) * lerpSpeed;
      armsRef.current.leftZ += (targetLeftZ - armsRef.current.leftZ) * lerpSpeed;
      armsRef.current.rightX += (targetRightX - armsRef.current.rightX) * lerpSpeed;
      armsRef.current.rightZ += (targetRightZ - armsRef.current.rightZ) * lerpSpeed;

      leftArmRef.current.rotation.x = armsRef.current.leftX;
      leftArmRef.current.rotation.z = armsRef.current.leftZ;
      rightArmRef.current.rotation.x = armsRef.current.rightX;
      rightArmRef.current.rotation.z = armsRef.current.rightZ;
    }

    if (leftPupilRef.current && rightPupilRef.current) {
      if (state === 'thinking') {
        const ex = Math.sin(t * 0.7 + pIdx) * 0.02;
        leftPupilRef.current.position.x = -0.12 + ex;
        rightPupilRef.current.position.x = 0.12 + ex;
      } else if (state === 'hungry') {
        const lk = Math.sin(t * 2 + pIdx) * 0.04;
        leftPupilRef.current.position.x = -0.12 + lk;
        rightPupilRef.current.position.x = 0.12 + lk;
      } else if (state === 'eating') {
        leftPupilRef.current.position.y = 0.06 - 0.02;
        rightPupilRef.current.position.y = 0.06 - 0.02;
      } else {
        leftPupilRef.current.position.x = -0.12;
        rightPupilRef.current.position.x = 0.12;
      }
    }

    if (mouthRef.current) {
      if (state === 'eating') {
        mouthRef.current.scale.y = 0.8 + Math.abs(Math.sin(t * 8 + pIdx)) * 0.8;
        mouthRef.current.scale.x = 1.2;
      } else if (state === 'blocked') {
        mouthRef.current.scale.y = 0.5;
        mouthRef.current.scale.x = 1.5;
      } else if (state === 'hungry') {
        mouthRef.current.scale.y = 0.6;
        mouthRef.current.scale.x = 0.8;
      } else {
        mouthRef.current.scale.y = 0.4;
        mouthRef.current.scale.x = 1.0;
      }
    }

    if (bodyRef.current) {
      if (state === 'hungry') {
        bodyRef.current.rotation.z = Math.sin(t * 1.5 + pIdx) * 0.03;
      } else if (state === 'blocked') {
        bodyRef.current.rotation.z = Math.sin(t * 3 + pIdx) * 0.02;
      } else {
        bodyRef.current.rotation.z = 0;
      }
    }
  });

  const eyeScaleY = state === 'eating' ? 0.5 : state === 'blocked' ? 1.3 : 0.9;
  const mouthColor = state === 'eating' ? '#e74c3c' :
                      state === 'blocked' ? '#8b0000' :
                      state === 'hungry' ? '#cd853f' : '#c97878';

  return (
    <group
      ref={groupRef}
      position={[px, 0, pz]}
      rotation={[0, -facingAngle + Math.PI / 2, 0]}
      onPointerOver={(e) => { e.stopPropagation(); setHoveredPhilosopher(idx); }}
      onPointerOut={(e) => { e.stopPropagation(); setHoveredPhilosopher(null); }}
      onClick={(e) => { e.stopPropagation(); setSelectedPhilosopher(idx); }}
    >
      {/* Body / Torso  */}
      <group ref={bodyRef}>
        <mesh position={[0, 0.65, 0]} castShadow>
          <cylinderGeometry args={[0.28, 0.38, 0.9, 16]} />
          <meshStandardMaterial
            color={config.outfitColor}
            emissive={bodyEmissive}
            emissiveIntensity={0.2}
            roughness={0.7}
            metalness={0.1}
          />
        </mesh>

        <mesh position={[0, 1.05, 0]} castShadow>
          <sphereGeometry args={[0.32, 16, 12]} />
          <meshStandardMaterial color={config.outfitColor} emissive={bodyEmissive} emissiveIntensity={0.2} roughness={0.7} />
        </mesh>

        {/* Left Arm */}
        <group position={[-0.35, 0.95, 0]} ref={leftArmRef}>
          <mesh position={[0, -0.25, 0]} castShadow>
            <cylinderGeometry args={[0.07, 0.06, 0.5, 8]} />
            <meshStandardMaterial color={config.outfitColor} emissive={bodyEmissive} emissiveIntensity={0.2} roughness={0.7} />
          </mesh>
          <mesh position={[0, -0.52, 0]} castShadow>
            <sphereGeometry args={[0.07, 8, 8]} />
            <meshStandardMaterial color={config.skinColor} roughness={0.8} />
          </mesh>
        </group>

        {/* Right Arm */}
        <group position={[0.35, 0.95, 0]} ref={rightArmRef}>
          <mesh position={[0, -0.25, 0]} castShadow>
            <cylinderGeometry args={[0.07, 0.06, 0.5, 8]} />
            <meshStandardMaterial color={config.outfitColor} emissive={bodyEmissive} emissiveIntensity={0.2} roughness={0.7} />
          </mesh>
          <mesh position={[0, -0.52, 0]} castShadow>
            <sphereGeometry args={[0.07, 8, 8]} />
            <meshStandardMaterial color={config.skinColor} roughness={0.8} />
          </mesh>
        </group>
      </group>

      {/* HEAD */}
      <group ref={headRef} position={[0, 1.45, 0]}>
        {/* Skin sphere */}
        <mesh castShadow>
          <sphereGeometry args={[0.28, 24, 24]} />
          <meshStandardMaterial color={config.skinColor} roughness={0.7} />
        </mesh>

        {/* Left Eye white */}
        <mesh position={[-0.12, 0.06, 0.24]} scale={[1, eyeScaleY, 1]}>
          <sphereGeometry args={[0.055, 12, 12]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
        {/* Left Pupil */}
        <mesh ref={leftPupilRef} position={[-0.12, 0.06, 0.29]}>
          <sphereGeometry args={[0.03, 8, 8]} />
          <meshStandardMaterial color="#1a1a1a" />
        </mesh>

        {/* Right Eye white */}
        <mesh position={[0.12, 0.06, 0.24]} scale={[1, eyeScaleY, 1]}>
          <sphereGeometry args={[0.055, 12, 12]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
        {/* Right Pupil */}
        <mesh ref={rightPupilRef} position={[0.12, 0.06, 0.29]}>
          <sphereGeometry args={[0.03, 8, 8]} />
          <meshStandardMaterial color="#1a1a1a" />
        </mesh>

        {/* Eyebrows */}
        {config.glasses !== 'sunglasses' && (
          <group>
            <mesh position={[-0.12, 0.14, 0.25]} rotation={[0, 0, state === 'blocked' ? 0.3 : state === 'hungry' ? -0.15 : 0]}>
              <boxGeometry args={[0.1, 0.02, 0.02]} />
              <meshStandardMaterial color={config.hairColor} />
            </mesh>
            <mesh position={[0.12, 0.14, 0.25]} rotation={[0, 0, state === 'blocked' ? -0.3 : state === 'hungry' ? 0.15 : 0]}>
              <boxGeometry args={[0.1, 0.02, 0.02]} />
              <meshStandardMaterial color={config.hairColor} />
            </mesh>
          </group>
        )}

        {/* Nose */}
        <mesh position={[0, -0.01, 0.27]}>
          <sphereGeometry args={[0.03, 8, 8]} />
          <meshStandardMaterial color={config.skinColor} metalness={0.1} roughness={0.9} emissive="#000" emissiveIntensity={0.1} />
        </mesh>

        {/* Mouth */}
        <mesh ref={mouthRef} position={[0, -0.1, 0.26]}>
          <sphereGeometry args={[0.04, 8, 6]} />
          <meshStandardMaterial color={mouthColor} />
        </mesh>

        {/* Features (Hair, Glasses, Hats) */}
        <CharacterFeatures config={config} y={0} />
      </group>

      {/* State glow light */}
      <pointLight
        position={[0, 1.8, 0]}
        color={colors.accent}
        intensity={isHovered ? 4 : state === 'eating' ? 2 : state === 'blocked' ? 2 : 0.5}
        distance={4}
        decay={2}
      />

      {/* Hover/state label */}
      <Html position={[0, 2.3, 0]} center distanceFactor={8} style={{ pointerEvents: 'none' }}>
        <div style={{
          background: 'rgba(5,5,10,0.85)',
          color: colors.accent,
          padding: '8px 16px',
          borderRadius: '10px',
          fontSize: '14px',
          fontWeight: '900',
          fontFamily: "'Inter', sans-serif",
          textTransform: 'uppercase',
          letterSpacing: '2px',
          whiteSpace: 'nowrap',
          border: `2px solid ${colors.accent}`,
          boxShadow: `0 0 20px ${colors.accent}40`,
          textAlign: 'center',
          lineHeight: '1.4',
        }}>
          <div style={{ fontSize: '11px', color: '#e2e8f0', marginBottom: '4px', letterSpacing: '1px' }}>{config.name}</div>
          <div style={{ textShadow: `0 0 10px ${colors.accent}` }}>{state}</div>
        </div>
      </Html>
    </group>
  );
}
