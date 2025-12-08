
import React, { useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { CameraControls } from '@react-three/drei';
import * as THREE from 'three';
import { Globe } from './Globe';
import { StarsBackground } from './StarsBackground';
import { Resort } from '../../types';

// Fix for Missing JSX.IntrinsicElements for React Three Fiber
declare global {
  namespace JSX {
    interface IntrinsicElements {
      ambientLight: any;
      directionalLight: any;
    }
  }
}

interface SceneContainerProps {
  resorts: Resort[];
  onResortSelect: (resort: Resort) => void;
  selectedResort: Resort | null;
}

export const SceneContainer: React.FC<SceneContainerProps> = ({ 
  resorts, 
  onResortSelect, 
  selectedResort 
}) => {
  const cameraControlsRef = useRef<CameraControls>(null);
  const [isInteracting, setIsInteracting] = useState(false);

  return (
    <Canvas 
      camera={{ position: [0, 0, 38], fov: 45 }} 
      gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping, outputColorSpace: THREE.SRGBColorSpace }}
      className="bg-space-900"
    >
      <ambientLight intensity={0.1} />
      <directionalLight position={[50, 20, 30]} intensity={2.5} color="#fff" />
      <directionalLight position={[-10, -10, -5]} intensity={0.2} color="#4299e1" />
      
      <StarsBackground />
      
      <Globe 
        resorts={resorts} 
        onResortSelect={onResortSelect} 
        selectedResortId={selectedResort?.id || null} 
        cameraControlsRef={cameraControlsRef}
        isUserInteracting={isInteracting}
      />
      
      <CameraControls 
        ref={cameraControlsRef} 
        minDistance={25} 
        maxDistance={100} 
        dollySpeed={0.5}
        smoothTime={0.8}
        // Detect user interactions to pause auto-rotation
        onStart={() => setIsInteracting(true)}
        onEnd={() => setIsInteracting(false)}
      />
    </Canvas>
  );
};
