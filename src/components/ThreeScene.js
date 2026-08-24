"use client";

import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useMemo, useEffect } from 'react';
import * as THREE from 'three';
import { Environment, Float, Sphere, Line } from '@react-three/drei';

function SceneNodes() {
  const groupRef = useRef();
  const materialRef = useRef();
  
  // Create a stylized network of blood banks
  const nodes = useMemo(() => {
    const temp = [];
    for (let i = 0; i < 40; i++) {
      temp.push({
        position: [
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 20 - i * 1.5, // Spread them down the Z/Y axis for scrolling
          (Math.random() - 0.5) * 15 - i * 1.5
        ],
        scale: Math.random() * 0.5 + 0.2
      });
    }
    return temp;
  }, []);

  useFrame((state) => {
    // Smooth camera panning based on scroll
    const scrollY = window.scrollY;
    // Calculate scroll progress (roughly 0 to 1 over typical page height)
    const progress = scrollY / (document.body.scrollHeight - window.innerHeight);
    
    // Pan camera forward and slightly down
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, 5 - progress * 40, 0.05);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, 2 - progress * 10, 0.05);
    state.camera.lookAt(0, 0 - progress * 10, -10 - progress * 40);

    // Slowly rotate the entire network for a breathing effect
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.001;
    }
    
    // Pulse the material
    if (materialRef.current) {
      materialRef.current.emissiveIntensity = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.5;
    }
  });

  return (
    <group ref={groupRef}>
      {nodes.map((node, i) => (
        <Float key={i} speed={2} rotationIntensity={1} floatIntensity={2}>
          <Sphere position={node.position} scale={node.scale}>
            <meshStandardMaterial 
              ref={i === 0 ? materialRef : null}
              color="#ffffff" 
              emissive="#d32f2f" // Primary red
              emissiveIntensity={1}
              toneMapped={false}
            />
          </Sphere>
        </Float>
      ))}
      
      {/* Connecting Lines to simulate blood flow/logistics network */}
      {nodes.map((node, i) => {
        if (i > 0 && i % 2 === 0) {
          const prev = nodes[i - 1].position;
          return (
            <Line 
              key={`line-${i}`}
              points={[prev, node.position]}
              color="#0b111a" // deep professional blue
              lineWidth={1}
              transparent
              opacity={0.3}
            />
          );
        }
        return null;
      })}
    </group>
  );
}

export default function ThreeScene() {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none', background: '#f5f7fa' }}>
      <Canvas camera={{ position: [0, 2, 5], fov: 60 }} dpr={[1, 2]}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} color="#ffffff" />
        <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#d32f2f" />
        <SceneNodes />
        {/* Soft studio environment lighting */}
        <Environment preset="city" />
        {/* Fog to hide nodes in the far distance */}
        <fog attach="fog" args={['#f5f7fa', 10, 40]} />
      </Canvas>
    </div>
  );
}
