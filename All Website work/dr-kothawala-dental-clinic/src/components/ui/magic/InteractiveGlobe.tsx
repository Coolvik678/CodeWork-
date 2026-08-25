"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function GlobeMesh() {
  const globeRef = useRef<THREE.Group>(null!);

  useFrame(() => {
    if (globeRef.current) {
      globeRef.current.rotation.y += 0.005;
    }
  });

  return (
    <group ref={globeRef}>
      <mesh>
        <sphereGeometry args={[2, 32, 32]} />
        <meshStandardMaterial
          color="#0d9488"
          wireframe
          transparent
          opacity={0.35}
          emissive="#10b981"
          emissiveIntensity={0.2}
        />
      </mesh>

      <mesh>
        <sphereGeometry args={[1.9, 16, 16]} />
        <meshBasicMaterial color="#0f172a" />
      </mesh>

      {[
        [1.8, 0.5, 0.8],
        [-1.6, -0.6, 1.0],
        [0.4, 1.7, -0.9],
        [-0.8, -1.5, -1.1],
      ].map((pos, idx) => (
        <mesh key={idx} position={pos as [number, number, number]}>
          <sphereGeometry args={[0.08, 12, 12]} />
          <meshBasicMaterial color="#34d399" />
        </mesh>
      ))}
    </group>
  );
}

export function InteractiveGlobe() {
  return (
    <div className="relative h-[320px] w-full max-w-sm overflow-hidden rounded-2xl border border-teal-500/20 bg-slate-950/80 backdrop-blur-md">
      <div className="absolute left-4 top-4 z-10">
        <p className="text-xs font-semibold uppercase tracking-wider text-teal-400">
          Specialist Network Map
        </p>
        <h4 className="text-sm font-bold text-white">7 Dental Consultants & Accreditations</h4>
      </div>

      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.8} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#0d9488" />
        <GlobeMesh />
      </Canvas>
    </div>
  );
}
