"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Sphere, Float, Stars } from "@react-three/drei";
import * as THREE from "three";

function AnimatedSphere() {
  const sphereRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (sphereRef.current) {
      sphereRef.current.rotation.x = t * 0.1;
      sphereRef.current.rotation.y = t * 0.15;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <Sphere ref={sphereRef} args={[1, 64, 64]} scale={2.2}>
        <MeshDistortMaterial
          color="#220033"
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0.2}
          metalness={0.8}
          emissive="#b026ff"
          emissiveIntensity={0.1}
          side={THREE.DoubleSide}
        />
      </Sphere>
    </Float>
  );
}

export default function Hero3DScene() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none opacity-60 mix-blend-screen">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} color="#00d2ff" intensity={2} />
        <pointLight position={[-10, -10, -10]} color="#b026ff" intensity={2} />
        <AnimatedSphere />
        <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
      </Canvas>
    </div>
  );
}
