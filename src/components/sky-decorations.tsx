import { Stars } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type * as THREE from "three";
import type { SceneTheme } from "../theme";

type SkyDecorationsProps = {
  sceneTheme: SceneTheme;
};

const CloudPuff = ({
  position,
  scale,
  speed,
}: {
  position: [number, number, number];
  scale: [number, number, number];
  speed: number;
}) => {
  const cloudRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!cloudRef.current) return;

    const drift = Math.sin(clock.elapsedTime * speed) * 0.65;
    cloudRef.current.position.x = position[0] + drift;
    cloudRef.current.position.y = position[1] + Math.sin(clock.elapsedTime * speed * 0.7) * 0.08;
  });

  return (
    <group ref={cloudRef} position={position} scale={scale}>
      <mesh position={[-0.55, 0, 0]}>
        <sphereGeometry args={[0.55, 12, 12]} />
        <meshStandardMaterial color="#ffffff" roughness={0.9} />
      </mesh>
      <mesh position={[0, 0.15, 0]}>
        <sphereGeometry args={[0.75, 12, 12]} />
        <meshStandardMaterial color="#f7fbff" roughness={0.9} />
      </mesh>
      <mesh position={[0.75, -0.02, 0]}>
        <sphereGeometry args={[0.5, 12, 12]} />
        <meshStandardMaterial color="#eef7ff" roughness={0.9} />
      </mesh>
    </group>
  );
};

const Comet = ({
  start,
  delay,
  speed,
}: {
  start: [number, number, number];
  delay: number;
  speed: number;
}) => {
  const cometRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!cometRef.current) return;

    const cycle = ((clock.elapsedTime * speed + delay) % 1) * 18;
    cometRef.current.position.set(start[0] + cycle, start[1] - cycle * 0.22, start[2] + cycle * 0.08);
    cometRef.current.visible = cycle > 1.5 && cycle < 15.5;
  });

  return (
    <group ref={cometRef} position={start} rotation-z={-0.9}>
      <mesh>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial color="#ffffff" emissive="#9fe8ff" emissiveIntensity={2.2} />
      </mesh>
      <mesh position={[-0.58, 0, 0]} rotation-z={Math.PI / 2}>
        <coneGeometry args={[0.08, 1.25, 12]} />
        <meshStandardMaterial
          color="#6ee7ff"
          emissive="#38bdf8"
          emissiveIntensity={1.2}
          transparent
          opacity={0.58}
        />
      </mesh>
    </group>
  );
};

export const SkyDecorations = ({ sceneTheme }: SkyDecorationsProps) => {
  if (sceneTheme.showStars) {
    return (
      <>
        <Stars radius={52} depth={24} count={950} factor={2.6} saturation={0.2} fade speed={0.25} />
        <mesh position={[-7, 7, -14]}>
          <sphereGeometry args={[0.72, 24, 24]} />
          <meshStandardMaterial color="#f6f0c8" emissive="#f6f0c8" emissiveIntensity={0.9} />
        </mesh>
        <Comet start={[-10, 7.2, -11]} delay={0} speed={0.06} />
        <Comet start={[-8, 5.4, -15]} delay={0.45} speed={0.045} />
      </>
    );
  }

  return (
    <>
      <mesh position={[-6.5, 6.8, -12]}>
        <sphereGeometry args={[1, 24, 24]} />
        <meshStandardMaterial color="#fff0a8" emissive="#ffe58a" emissiveIntensity={1.15} />
      </mesh>
      <CloudPuff position={[-4.8, 5.6, -10]} scale={[1.35, 0.72, 0.72]} speed={0.42} />
      <CloudPuff position={[3.8, 6.2, -13]} scale={[1.7, 0.85, 0.85]} speed={0.32} />
      <CloudPuff position={[9.5, 5.4, -14]} scale={[1.2, 0.62, 0.62]} speed={0.5} />
    </>
  );
};
