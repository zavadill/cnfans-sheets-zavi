"use client"

import { Canvas, useFrame, useThree } from '@react-three/fiber' // <-- 1. Importujeme useThree
import { Environment } from '@react-three/drei'
import React, { Suspense, useRef } from 'react'
import { Group } from 'three'
import { Model } from './models/Scene'

// --- Tvoje RotatingModel komponenta (beze změny) ---
type RotatingModelProps = {
  position: [number, number, number];
  scale?: number;
  rotationSpeed?: [number, number, number];
};

const RotatingModel = ({ 
  position, 
  scale = 1, 
  rotationSpeed = [0.0005, 0.002, 0.0003] 
}: RotatingModelProps) => {
  const groupRef = useRef<Group>(null);
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.x += rotationSpeed[0];
      groupRef.current.rotation.y += rotationSpeed[1];
      groupRef.current.rotation.z += rotationSpeed[2];
    }
  });
  return (
    <group ref={groupRef} scale={scale} position={position} dispose={null} >
      <Model />
    </group>
  );
}


// --- 2. NOVÁ KOMPONENTA (Vnitřek Canvasu) ---
// Tady se děje to kouzlo
const SceneContent = () => {
  // Získáme aktuální velikost plátna
  const { size } = useThree();

  // Definujeme si breakpoint. Cokoliv pod 768px je mobil.
  const isMobile = size.width < 768;

  return (
    <Suspense fallback={null}>
      <ambientLight intensity={0.5} /> 
      <directionalLight position={[10, 10, 5]} intensity={1} /> 
      <Environment preset="city" />

      {/* --- 3. PODMÍNĚNÉ RENDEROVÁNÍ --- */}
      
      {/* První model: Změníme pozici a velikost na mobilu */}
      <RotatingModel 
        position={isMobile ? [2, 1.5, -2] : [6, 1.1, -1]} // Na mobilu uprostřed, na desktopu vpravo
        scale={isMobile ? 1.5 : 2} // Na mobilu menší
      /> 

      <RotatingModel 
        position={isMobile ? [-2, -3, -1] : [-6, -3, -2]} // Nová pozice pro mobil
        scale={isMobile ? 1.0 : 1.5} // Na mobilu ještě menší
        rotationSpeed={[0.001, -0.001, 0.0005]}
      />
      
    </Suspense>
  );
}


// --- 4. TVOJE PŮVODNÍ KOMPONENTA ---
// Teď už jen obsahuje Canvas a v něm SceneContent
const ModelScene = () => {
  return (
    <div className="absolute top-0 left-0 w-full h-full -z-10 bg-linear-to-br from-[#121212] via-blue-950 to-[#121221]">
      <Canvas 
        camera={{ position: [0, 0, 10], fov: 50 }} 
        dpr={[1, 2]} 
      >
        {/* Vložíme naši novou komponentu, která řeší logiku */}
        <SceneContent /> 
      </Canvas>
    </div>
  )
}

export default ModelScene