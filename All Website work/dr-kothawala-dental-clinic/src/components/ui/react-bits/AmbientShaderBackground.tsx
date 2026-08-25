"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function AmbientShaderMesh() {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.1;
      meshRef.current.rotation.y = Math.cos(state.clock.getElapsedTime() * 0.2) * 0.15;
    }
  });

  return (
    <mesh ref={meshRef} scale={[12, 12, 1]}>
      <planeGeometry args={[2, 2, 32, 32]} />
      <meshBasicMaterial transparent opacity={0.25} wireframe color="#0d9488" />
    </mesh>
  );
}

export function AmbientShaderBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 h-full w-full overflow-hidden bg-slate-950">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-teal-950/80 opacity-90" />

      <Canvas camera={{ position: [0, 0, 5], fov: 60 }} className="h-full w-full">
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} color="#10b981" />
        <AmbientShaderMesh />
      </Canvas>
    </div>
  );
}
