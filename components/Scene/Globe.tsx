
import React, { useRef, useMemo, useState, useEffect } from 'react';
import * as THREE from 'three';
import { useLoader, useFrame } from '@react-three/fiber';
import { CameraControls } from '@react-three/drei';
import { latLongToVector3 } from '../../utils/geo';
import { Resort } from '../../types';
import { JAPAN_OUTLINE_COORDS } from '../../data/japanOutline';

// Fix for Missing JSX.IntrinsicElements for React Three Fiber
declare global {
  namespace JSX {
    interface IntrinsicElements {
      group: any;
      mesh: any;
      sphereGeometry: any;
      meshPhongMaterial: any;
      meshBasicMaterial: any;
      pointLight: any;
      ringGeometry: any;
      line: any;
      bufferGeometry: any;
      lineBasicMaterial: any;
      primitive: any;
    }
  }
}

interface GlobeProps {
  resorts: Resort[];
  onResortSelect: (resort: Resort) => void;
  selectedResortId: string | null;
  cameraControlsRef: React.RefObject<CameraControls>;
  isUserInteracting: boolean;
}

export const Globe: React.FC<GlobeProps> = ({ 
  resorts, 
  onResortSelect, 
  selectedResortId,
  cameraControlsRef,
  isUserInteracting
}) => {
  const earthRef = useRef<THREE.Mesh>(null);
  const earthGroupRef = useRef<THREE.Group>(null);
  
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const lastInteractionRef = useRef<number>(performance.now());
  
  const GLOBE_RADIUS = 20;
  // Axial tilt of the Earth (approx 23.5 degrees)
  const AXIAL_TILT = 0.41; 

  // Load standard NASA texture assets for Earth
  const [colorMap, bumpMap, specularMap] = useLoader(THREE.TextureLoader, [
    'https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg',
    'https://unpkg.com/three-globe/example/img/earth-topology.png',
    'https://unpkg.com/three-globe/example/img/earth-water.png'
  ]);

  // --- Auto-Rotation Logic ---
  const AUTO_ROTATE_SPEED = 0.05;
  const IDLE_DELAY_MS = 4000;

  useFrame((_, delta) => {
    const now = performance.now();
    const hasActiveResort = !!selectedResortId;

    // Condition 1: User is manually dragging/orbiting
    // Condition 2: A resort is currently selected (we want to stay focused on it)
    if (isUserInteracting || hasActiveResort) {
      if (isAutoRotating) setIsAutoRotating(false);
      // Reset the "last interaction" timer constantly while interacting or while a resort is selected.
      // This ensures that when the user deselects, the timer starts counting from THAT moment,
      // rather than resuming immediately.
      lastInteractionRef.current = now;
    } else {
      // If idle for a while AND no resort is selected, resume rotation
      if (!isAutoRotating && now - lastInteractionRef.current > IDLE_DELAY_MS) {
        setIsAutoRotating(true);
      }
    }

    // Apply rotation if allowed
    if (isAutoRotating && earthRef.current) {
      earthRef.current.rotation.y += AUTO_ROTATE_SPEED * delta;
    }
  });

  // --- Initial View Setup ---
  useEffect(() => {
    // Only set initial view if no resort is selected and controls are ready
    if (!selectedResortId && cameraControlsRef.current) {
      // Coordinates roughly centering the Japanese archipelago
      const INITIAL_LAT = 37.0;
      const INITIAL_LON = 137.0;
      // Distance factor to show full globe with margin (Radius * 3.0)
      const INITIAL_DIST_MULT = 3.0;

      // 1. Calculate local position on sphere (no rotation yet)
      const localPos = latLongToVector3(INITIAL_LAT, INITIAL_LON, GLOBE_RADIUS);

      // 2. Account for Axial Tilt (Group rotation)
      // The earth mesh Y-rotation is 0 on mount, but the group has Z-rotation (tilt).
      // We must transform the local vector by this tilt to get the correct world direction.
      const tiltMatrix = new THREE.Matrix4().makeRotationZ(AXIAL_TILT);
      const worldTarget = localPos.clone().applyMatrix4(tiltMatrix);

      // 3. Calculate camera position
      const dir = worldTarget.clone().normalize();
      const camPos = dir.multiplyScalar(GLOBE_RADIUS * INITIAL_DIST_MULT);

      // 4. Set Camera
      cameraControlsRef.current.setLookAt(
        camPos.x, camPos.y, camPos.z,     // Camera Position
        worldTarget.x, worldTarget.y, worldTarget.z, // Target (Center of Japan)
        false // Immediate transition (no animation)
      );
    }
  }, []); // Run once on mount

  // --- Camera Focus Logic (On Select) ---
  useEffect(() => {
    const selectedResort = resorts.find(r => r.id === selectedResortId);
    
    if (selectedResort && cameraControlsRef.current && earthRef.current) {
      // 1. Calculate the local position on the sphere (unrotated)
      const localPos = latLongToVector3(selectedResort.latitude, selectedResort.longitude, GLOBE_RADIUS);

      // 2. Convert Local -> World position
      // We must account for the Earth's current rotation (y-spin) AND the tilt (parent group)
      earthRef.current.updateMatrixWorld(true); 
      const worldPos = localPos.clone().applyMatrix4(earthRef.current.matrixWorld);

      // 3. Calculate camera position
      // Move closer: Earth Radius * 1.7 to fill the screen with Japan
      const CAMERA_DISTANCE_MULT = 1.7;
      const cameraDist = GLOBE_RADIUS * CAMERA_DISTANCE_MULT;
      
      // Direction from Earth center (0,0,0) to the resort's world position
      const dir = worldPos.clone().normalize();
      const camPos = dir.multiplyScalar(cameraDist);

      // 4. Move Camera
      cameraControlsRef.current.setLookAt(
        camPos.x, camPos.y, camPos.z,     // Camera Position
        worldPos.x, worldPos.y, worldPos.z, // Target (Look at the resort)
        true // Smooth transition
      );
    }
  }, [selectedResortId, resorts, cameraControlsRef]);

  // --- Japan Outline Geometry ---
  const japanOutlineObjects = useMemo(() => {
    const material = new THREE.LineBasicMaterial({ color: "#60A5FA", linewidth: 1, opacity: 0.8, transparent: true });
    
    return JAPAN_OUTLINE_COORDS.map(coords => {
      // Lift the outline slightly off surface to prevent z-fighting (radius * 1.005)
      const points = coords.map(([lat, lon]) => latLongToVector3(lat, lon, GLOBE_RADIUS * 1.005));
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      return new THREE.Line(geometry, material);
    });
  }, []);

  // Cleanup geometries on unmount
  useEffect(() => {
    return () => {
      japanOutlineObjects.forEach(obj => obj.geometry.dispose());
      if (japanOutlineObjects.length > 0) {
        (japanOutlineObjects[0].material as THREE.Material).dispose();
      }
    };
  }, [japanOutlineObjects]);

  return (
    // Outer group applies the axial tilt
    <group ref={earthGroupRef} rotation={[0, 0, AXIAL_TILT]}>
      
      {/* Earth Mesh - Rotates on Y axis inside the tilted group */}
      <mesh ref={earthRef}>
        <sphereGeometry args={[GLOBE_RADIUS, 64, 64]} />
        <meshPhongMaterial 
          map={colorMap} 
          bumpMap={bumpMap} 
          bumpScale={0.5}
          specularMap={specularMap}
          specular={new THREE.Color('grey')}
          shininess={10}
        />

        {/* Japan Highlight Outline */}
        {japanOutlineObjects.map((obj, idx) => (
          <primitive key={`japan-outline-${idx}`} object={obj} />
        ))}

        {/* Resort Markers */}
        {resorts.map((resort) => {
          const position = useMemo(() => 
            latLongToVector3(resort.latitude, resort.longitude, GLOBE_RADIUS),
            [resort.latitude, resort.longitude]
          );

          const isSelected = selectedResortId === resort.id;

          return (
            <group key={resort.id} position={position}>
              {/* Visible Marker - Smaller size for refined look */}
              <mesh 
                onClick={(e) => {
                  e.stopPropagation();
                  onResortSelect(resort);
                }}
                onPointerOver={() => document.body.style.cursor = 'pointer'}
                onPointerOut={() => document.body.style.cursor = 'auto'}
              >
                {/* Reduced radius: 0.12 normal, 0.18 selected */}
                <sphereGeometry args={[isSelected ? 0.18 : 0.12, 16, 16]} />
                <meshBasicMaterial 
                  color={isSelected ? '#F4D03F' : '#ffffff'} 
                  toneMapped={false} 
                />
              </mesh>
              
              {/* Glow Effect - Adjusted intensity and distance for smaller markers */}
              <pointLight 
                color={isSelected ? '#F4D03F' : '#ffffff'} 
                distance={3} 
                intensity={isSelected ? 2.0 : 1.5} 
              />
            </group>
          );
        })}
      </mesh>

      {/* Atmosphere Glow */}
      <mesh scale={[1.02, 1.02, 1.02]}>
        <sphereGeometry args={[GLOBE_RADIUS, 64, 64]} />
        <meshBasicMaterial 
          color="#4299e1" 
          transparent 
          opacity={0.1} 
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
};
