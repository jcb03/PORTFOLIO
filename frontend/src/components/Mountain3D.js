import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Cloud } from '@react-three/drei';
import * as THREE from 'three';

function Mountain() {
  const meshRef = useRef();
  
  // Create K2-inspired mountain geometry
  const geometry = useMemo(() => {
    const geo = new THREE.ConeGeometry(12, 18, 64);
    const positions = geo.attributes.position;
    
    // Add realistic mountain noise
    for (let i = 0; i < positions.count; i++) {
      const x = positions.getX(i);
      const y = positions.getY(i);  
      const z = positions.getZ(i);
      
      // Multiple noise layers for realistic terrain
      const noise1 = Math.sin(x * 0.3) * Math.cos(z * 0.3) * 0.8;
      const noise2 = Math.sin(x * 0.8) * Math.cos(z * 0.8) * 0.3;
      const noise3 = Math.sin(x * 1.5) * Math.cos(z * 1.5) * 0.1;
      
      const totalNoise = noise1 + noise2 + noise3;
      positions.setY(i, y + totalNoise);
    }
    
    geo.attributes.position.needsUpdate = true;
    geo.computeVertexNormals();
    return geo;
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      // Subtle rotation animation
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.05) * 0.1;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.2 - 3;
    }
  });

  return (
    <group>
      {/* Main mountain */}
      <mesh ref={meshRef} geometry={geometry} position={[0, -3, -8]} castShadow receiveShadow>
        <meshLambertMaterial 
          color="#8B7355"
          wireframe={false}
        />
      </mesh>
      
      {/* Snow cap */}
      <mesh position={[0, 6, -8]}>
        <coneGeometry args={[4, 6, 32]} />
        <meshLambertMaterial color="#F0F8FF" />
      </mesh>
      
      {/* Base rocks */}
      {[...Array(8)].map((_, i) => (
        <mesh 
          key={i} 
          position={[
            (Math.random() - 0.5) * 20, 
            -8 + Math.random() * 2, 
            -5 + (Math.random() - 0.5) * 10
          ]}
        >
          <boxGeometry args={[Math.random() * 2 + 0.5, Math.random() * 1 + 0.3, Math.random() * 2 + 0.5]} />
          <meshLambertMaterial color="#696969" />
        </mesh>
      ))}
    </group>
  );
}

function AnimatedClouds() {
  const cloudsRef = useRef();
  
  useFrame((state) => {
    if (cloudsRef.current) {
      cloudsRef.current.position.x = Math.sin(state.clock.elapsedTime * 0.1) * 3;
      cloudsRef.current.position.z = Math.cos(state.clock.elapsedTime * 0.08) * 2;
    }
  });

  return (
    <group ref={cloudsRef}>
      {[...Array(12)].map((_, i) => (
        <Cloud
          key={i}
          position={[
            (Math.random() - 0.5) * 30,
            4 + Math.random() * 4,
            -15 + Math.random() * 10
          ]}
          speed={0.1 + Math.random() * 0.1}
          opacity={0.6 + Math.random() * 0.3}
          color="#F0F8FF"
          segments={20}
        />
      ))}
    </group>
  );
}

function Lighting() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight 
        position={[10, 15, 5]} 
        intensity={1.2} 
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <pointLight position={[-15, 5, -10]} color="#FFB6C1" intensity={0.6} />
      <pointLight position={[15, 8, -5]} color="#87CEEB" intensity={0.4} />
      <spotLight
        position={[0, 20, 0]}
        angle={0.3}
        penumbra={1}
        intensity={0.8}
        color="#FFD700"
        target-position={[0, 0, -8]}
      />
    </>
  );
}

export default function Mountain3D() {
  return (
    <Canvas
      camera={{ position: [0, 4, 12], fov: 75 }}
      style={{ position: 'fixed', top: 0, left: 0, zIndex: 1 }}
      shadows
      gl={{ antialias: true, alpha: true }}
    >
      <Lighting />
      
      <Mountain />
      <AnimatedClouds />
      
      <Stars 
        radius={150} 
        depth={80} 
        count={8000} 
        factor={6} 
        saturation={0.2} 
        fade 
        speed={0.5}
      />
      
      <OrbitControls 
        enableZoom={false}
        enablePan={false}
        maxPolarAngle={Math.PI / 1.8}
        minPolarAngle={Math.PI / 6}
        autoRotate
        autoRotateSpeed={0.2}
      />
      
      <fog attach="fog" args={['#87CEEB', 10, 50]} />
    </Canvas>
  );
}
