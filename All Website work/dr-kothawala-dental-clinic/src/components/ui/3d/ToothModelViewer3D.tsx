"use client";

import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Html, Float } from "@react-three/drei";
import * as THREE from "three";
import { ZoomIn, Info, Sparkles } from "lucide-react";

function RotatableToothModel({ activeTab }: { activeTab: string }) {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    if (groupRef.current && !state.pointer.x && !state.pointer.y) {
      groupRef.current.rotation.y += 0.005;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Porcelain Crown */}
      <mesh position={[0, 0.9, 0]}>
        <cylinderGeometry args={[0.95, 0.75, 1.3, 32]} />
        <meshPhysicalMaterial
          color={activeTab === "whitening" ? "#ffffff" : "#fbf7e8"}
          roughness={0.08}
          transmission={0.2}
          thickness={0.5}
          ior={1.5}
          reflectivity={0.9}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
        {/* Crown Hotspot Label */}
        <Html position={[1.1, 0.3, 0]} distanceFactor={8}>
          <div className="flex items-center gap-1.5 rounded-full border border-[#D4AF37]/60 bg-[#05070A]/95 px-2.5 py-1 text-[10px] font-bold text-[#F5D77F] backdrop-blur-md shadow-lg whitespace-nowrap">
            <Sparkles className="h-3 w-3 text-[#D4AF37]" /> Zirconia Porcelain Crown
          </div>
        </Html>
      </mesh>

      {/* Titanium Abutment Collar */}
      <mesh position={[0, 0.15, 0]}>
        <cylinderGeometry args={[0.7, 0.5, 0.3, 32]} />
        <meshStandardMaterial color="#94a3b8" metalness={0.95} roughness={0.15} />
      </mesh>

      {/* Medical Grade Titanium Implant Fixture */}
      <mesh position={[0, -0.75, 0]}>
        <cylinderGeometry args={[0.48, 0.12, 1.5, 32]} />
        <meshStandardMaterial
          color="#64748b"
          metalness={0.9}
          roughness={0.25}
        />
        {/* Implant Hotspot Label */}
        <Html position={[-1.4, -0.4, 0]} distanceFactor={8}>
          <div className="flex items-center gap-1.5 rounded-full border border-[#D4AF37]/60 bg-[#05070A]/95 px-2.5 py-1 text-[10px] font-bold text-[#F5D77F] backdrop-blur-md shadow-lg whitespace-nowrap">
            <Info className="h-3 w-3 text-[#D4AF37]" /> Grade 5 Titanium Root Thread
          </div>
        </Html>
      </mesh>

      {/* Precision Thread Ridges */}
      {[-0.35, -0.65, -0.95, -1.25].map((yPos, idx) => (
        <mesh key={idx} position={[0, yPos, 0]}>
          <torusGeometry args={[0.45 - idx * 0.06, 0.05, 16, 32]} />
          <meshStandardMaterial color="#d4af37" metalness={0.95} roughness={0.1} />
        </mesh>
      ))}
    </group>
  );
}

export function ToothModelViewer3D() {
  const [activeTab, setActiveTab] = useState<"implant" | "whitening">("implant");

  return (
    <div className="relative h-[440px] w-full overflow-hidden rounded-3xl border border-[#D4AF37]/40 bg-gradient-to-b from-slate-950 via-[#05070A] to-slate-950 p-5 backdrop-blur-2xl shadow-2xl">
      {/* Header controls */}
      <div className="absolute left-6 top-6 z-10 flex flex-col gap-1">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-950/80 px-3 py-1 text-[10px] font-extrabold uppercase tracking-widest text-[#F5D77F] border border-[#D4AF37]/50 shadow-md backdrop-blur-md">
          <span className="h-2 w-2 rounded-full bg-[#D4AF37] animate-ping" />
          HERO 3D INTERACTIVE ANATOMY
        </span>
        <h4 className="text-base font-extrabold text-white">360° Rotatable Implant & Crown</h4>
        <p className="text-xs text-slate-400">Click & Drag to Orbit • Scroll to Zoom</p>
      </div>

      {/* Quick Option Tabs */}
      <div className="absolute right-6 top-6 z-10 flex items-center gap-2 rounded-xl border border-white/10 bg-[#05070A]/90 p-1.5 backdrop-blur-md">
        <button
          onClick={() => setActiveTab("implant")}
          className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-all cursor-pointer ${
            activeTab === "implant"
              ? "bg-[#D4AF37] text-slate-950 shadow-md shadow-amber-500/20"
              : "text-slate-400 hover:text-white"
          }`}
        >
          Titanium Implant
        </button>
        <button
          onClick={() => setActiveTab("whitening")}
          className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-all cursor-pointer ${
            activeTab === "whitening"
              ? "bg-[#D4AF37] text-slate-950 shadow-md shadow-amber-500/20"
              : "text-slate-400 hover:text-white"
          }`}
        >
          Bleached Crown
        </button>
      </div>

      {/* 3D Canvas */}
      <Canvas camera={{ position: [0, 0, 4.8], fov: 42 }} className="h-full w-full cursor-grab active:cursor-grabbing">
        <ambientLight intensity={1.2} />
        <directionalLight position={[10, 10, 10]} intensity={2.5} color="#D4AF37" />
        <directionalLight position={[-10, -10, -5]} intensity={1.5} color="#F5D77F" />
        <pointLight position={[0, 5, 0]} intensity={1.5} color="#ffffff" />
        
        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.3}>
          <RotatableToothModel activeTab={activeTab} />
        </Float>

        <OrbitControls
          enableZoom={true}
          maxDistance={7}
          minDistance={3}
          enablePan={false}
          rotateSpeed={0.8}
        />
      </Canvas>

      {/* Bottom Hint Bar */}
      <div className="absolute bottom-5 left-6 right-6 z-10 flex items-center justify-between rounded-xl border border-white/10 bg-[#05070A]/90 px-4 py-2.5 text-xs text-slate-300 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <ZoomIn className="h-4 w-4 text-[#F5D77F]" />
          <span>Full 360° Mouse & Touch Drag Orbit Controls Active</span>
        </div>
        <span className="text-[11px] font-semibold text-[#F5D77F]">10-Micron Precision</span>
      </div>
    </div>
  );
}
