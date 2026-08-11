import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Particles({ count = 5000 }) {
  const points = useRef<THREE.Points>(null);

  // Generate random positions for the particles
  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const color = new THREE.Color();

    for (let i = 0; i < count; i++) {
      // Create a large sphere of particles
      const r = 25 * Math.cbrt(Math.random());
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      // Color variation between a purplish pink and a bright cyan/white to fit the dark purple theme
      color.setHSL(0.7 + Math.random() * 0.2, 0.8, 0.6 + Math.random() * 0.4);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }
    return [positions, colors];
  }, [count]);

  useFrame((state) => {
    if (points.current) {
      // Slow constant rotation
      points.current.rotation.x = state.clock.elapsedTime * 0.05;
      points.current.rotation.y = state.clock.elapsedTime * 0.03;
      
      // Slight mouse interaction
      points.current.rotation.x += (state.mouse.y * 0.2 - points.current.rotation.x) * 0.02;
      points.current.rotation.y += (state.mouse.x * 0.2 - points.current.rotation.y) * 0.02;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

export default function ParticleBackground() {
  return (
    <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", zIndex: -20, pointerEvents: "none", backgroundColor: "#000000" }}>
      <Canvas camera={{ position: [0, 0, 15], fov: 60 }}>
        {/* Match the fog with the black background to blend the edges */}
        <fog attach="fog" args={["#000000", 10, 30]} />
        <Particles count={7000} />
      </Canvas>
    </div>
  );
}
