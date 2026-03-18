import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useSimulationStore } from '../store/simulationStore';

export function ForkModel({ idx, heldByPhilosopher, philosopherState }) {
  const groupRef = useRef();
  const pCount = useSimulationStore(s => s.philosophers.length);

  const restAngle = ((idx + 0.5) / pCount) * Math.PI * 2 - Math.PI / 2;
  const restDist = 3.0;
  const restPos = useMemo(() => new THREE.Vector3(
    Math.cos(restAngle) * restDist,
    0.32,
    Math.sin(restAngle) * restDist
  ), [restAngle]);

  const targetPosRef = useRef(restPos.clone());
  const targetRotRef = useRef(new THREE.Euler(Math.PI / 2, 0, restAngle));

  useFrame(({ clock }) => {
    if (!groupRef.current) return;

    if (heldByPhilosopher !== null && heldByPhilosopher !== undefined) {
      const philAngle = (heldByPhilosopher / pCount) * Math.PI * 2 - Math.PI / 2;
      
      const isLeftHand = idx === heldByPhilosopher;
      
      if (philosopherState === 'eating') {
        // Bring to mouth
        const handDist = 3.6;
        const mouthHeight = 1.35;
        const offsetAngle = isLeftHand ? -0.2 : 0.2;
        
        // motion for eating
        const t = clock.elapsedTime;
        const eatingBob = Math.sin(t * 8 + heldByPhilosopher) * 0.08;

        targetPosRef.current.set(
          Math.cos(philAngle + offsetAngle) * handDist,
          mouthHeight + eatingBob,
          Math.sin(philAngle + offsetAngle) * handDist
        );
        targetRotRef.current.set(-0.8, isLeftHand ? 0.5 : -0.5, philAngle + (isLeftHand ? Math.PI : 0));
      } else {
        const handDist = 3.9;
        const offsetAngle = isLeftHand ? -0.25 : 0.25;
        
        targetPosRef.current.set(
          Math.cos(philAngle + offsetAngle) * handDist,
          0.7,
          Math.sin(philAngle + offsetAngle) * handDist
        );
        targetRotRef.current.set(-0.2, 0, philAngle + (isLeftHand ? Math.PI / 4 : -Math.PI / 4));
      }
    } else {
      targetPosRef.current.copy(restPos);
      targetRotRef.current.set(Math.PI / 2, 0, restAngle);
    }

    const lerpSpeed = 0.04;
    groupRef.current.position.lerp(targetPosRef.current, lerpSpeed);
    
    const curr = groupRef.current.rotation;
    curr.x += (targetRotRef.current.x - curr.x) * lerpSpeed;
    curr.y += (targetRotRef.current.y - curr.y) * lerpSpeed;
    curr.z += (targetRotRef.current.z - curr.z) * lerpSpeed;
  });

  const isHeld = heldByPhilosopher !== null && heldByPhilosopher !== undefined;
  const isEating = isHeld && philosopherState === 'eating';
  
  const metalColor = isEating ? '#f59e0b' : isHeld ? '#fbbf24' : '#a8a8a8';
  const emissiveColor = isEating ? '#f59e0b' : isHeld ? '#fbbf24' : '#333333';
  const emissiveIntensity = isEating ? 0.8 : isHeld ? 0.4 : 0.05;

  return (
    <group
      ref={groupRef}
      position={[restPos.x, restPos.y, restPos.z]}
      rotation={[Math.PI / 2, 0, restAngle]}
    >
      {/* Handle */}
      <mesh castShadow>
        <cylinderGeometry args={[0.025, 0.03, 0.5, 8]} />
        <meshStandardMaterial
          color={metalColor}
          emissive={emissiveColor}
          emissiveIntensity={emissiveIntensity}
          metalness={0.9}
          roughness={0.15}
        />
      </mesh>

      {/* Handle knob */}
      <mesh position={[0, -0.28, 0]} castShadow>
        <sphereGeometry args={[0.035, 8, 8]} />
        <meshStandardMaterial
          color={metalColor}
          metalness={0.9}
          roughness={0.2}
        />
      </mesh>

      {/* Prongs */}
      {[-0.04, 0, 0.04].map((offset, i) => (
        <mesh key={i} position={[offset, 0.38, 0]} castShadow>
          <cylinderGeometry args={[0.008, 0.015, 0.3, 6]} />
          <meshStandardMaterial
            color={metalColor}
            emissive={emissiveColor}
            emissiveIntensity={emissiveIntensity}
            metalness={0.9}
            roughness={0.15}
          />
        </mesh>
      ))}

      {/* Bridge connecting prongs to handle */}
      <mesh position={[0, 0.22, 0]} castShadow>
        <boxGeometry args={[0.1, 0.04, 0.02]} />
        <meshStandardMaterial
          color={metalColor}
          metalness={0.9}
          roughness={0.2}
        />
      </mesh>

      {/* Glow when held */}
      <pointLight
        position={[0, 0.2, 0]}
        color="#fbbf24"
        intensity={isHeld ? (isEating ? 2 : 1) : 0}
        distance={1.5}
        decay={2}
      />
    </group>
  );
}
