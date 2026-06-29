import React, { Suspense, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Float, Preload } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import * as THREE from 'three';

// ---- Particle nebula: ~6k points in a flattened sphere, violet→cyan
// gradient, additive blend, slow drift + mouse parallax. ----
const NebulaPoints = () => {
  const ref = useRef();

  const { positions, colors } = useMemo(() => {
    const COUNT = 3200;
    const positions = new Float32Array(COUNT * 3);
    const colors = new Float32Array(COUNT * 3);
    const cInner = new THREE.Color('#22d3ee');
    const cMid = new THREE.Color('#7c5cff');
    const cOuter = new THREE.Color('#ff5cf0');

    for (let i = 0; i < COUNT; i++) {
      // spherical with a flattened y for a galactic-disc feel
      const r = Math.pow(Math.random(), 0.6) * 4.2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta) * 0.55;
      const z = r * Math.cos(phi);
      positions.set([x, y, z], i * 3);

      const t = r / 4.2;
      const col =
        t < 0.5
          ? cInner.clone().lerp(cMid, t * 2)
          : cMid.clone().lerp(cOuter, (t - 0.5) * 2);
      colors.set([col.r, col.g, col.b], i * 3);
    }
    return { positions, colors };
  }, []);

  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.04;
    ref.current.rotation.x += delta * 0.01;
    // gentle mouse parallax
    const { x, y } = state.pointer;
    ref.current.rotation.z = THREE.MathUtils.lerp(
      ref.current.rotation.z,
      x * 0.15,
      0.03
    );
    state.camera.position.x = THREE.MathUtils.lerp(
      state.camera.position.x,
      x * 0.6,
      0.03
    );
    state.camera.position.y = THREE.MathUtils.lerp(
      state.camera.position.y,
      y * 0.4,
      0.03
    );
    state.camera.lookAt(0, 0, 0);
  });

  return (
    <group rotation={[0.4, 0, 0.2]}>
      <Points ref={ref} positions={positions} colors={colors} stride={3}>
        <PointMaterial
          transparent
          vertexColors
          size={0.022}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  );
};

// Floating wireframe shapes for foreground depth
const FloatingShapes = () => (
  <>
    <Float speed={1.4} rotationIntensity={1.2} floatIntensity={1.6}>
      <mesh position={[2.6, 1.1, -1]}>
        <icosahedronGeometry args={[0.55, 0]} />
        <meshBasicMaterial color="#7c5cff" wireframe transparent opacity={0.5} />
      </mesh>
    </Float>
    <Float speed={1} rotationIntensity={1} floatIntensity={2}>
      <mesh position={[-2.8, -1.3, -0.5]}>
        <torusGeometry args={[0.45, 0.16, 16, 60]} />
        <meshBasicMaterial color="#22d3ee" wireframe transparent opacity={0.4} />
      </mesh>
    </Float>
    <Float speed={1.8} rotationIntensity={1.5} floatIntensity={1.2}>
      <mesh position={[1.4, -1.8, 0.6]}>
        <octahedronGeometry args={[0.32, 0]} />
        <meshBasicMaterial color="#ff5cf0" wireframe transparent opacity={0.45} />
      </mesh>
    </Float>
  </>
);

const NebulaCanvas = ({ active = true }) => {
  return (
    <Canvas
      className="!absolute inset-0"
      camera={{ position: [0, 0, 6], fov: 60 }}
      frameloop={active ? 'always' : 'never'}
      dpr={[1, 1.5]}
      gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
    >
      <Suspense fallback={null}>
        <NebulaPoints />
        <FloatingShapes />
        <EffectComposer disableNormalPass>
          <Bloom
            intensity={0.9}
            luminanceThreshold={0.08}
            luminanceSmoothing={0.35}
            mipmapBlur
          />
          <Vignette eskil={false} offset={0.28} darkness={0.92} />
        </EffectComposer>
      </Suspense>
      <Preload all />
    </Canvas>
  );
};

export default NebulaCanvas;
