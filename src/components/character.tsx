import { Billboard } from "@react-three/drei";
import type { RefObject } from "react";
import { DoubleSide } from "three";
import type * as THREE from "three";
import type { ColorMode } from "../theme";

type CharacterProps = {
  characterRef: RefObject<THREE.Group>;
  colorMode: ColorMode;
};

const sunRayRotations = Array.from({ length: 12 }, (_, index) => (index * Math.PI) / 6);
const moonCraterPositions: [number, number, number][] = [
  [-0.1, 0.09, 0.035],
  [0.08, -0.04, 0.028],
  [0.02, 0.19, 0.024],
];
const faceColor = "#111827";

const Face = () => (
  <>
    <mesh position={[-0.08, 0.04, 0.04]}>
      <circleGeometry args={[0.024, 16]} />
      <meshStandardMaterial color={faceColor} side={DoubleSide} />
    </mesh>
    <mesh position={[0.08, 0.04, 0.04]}>
      <circleGeometry args={[0.024, 16]} />
      <meshStandardMaterial color={faceColor} side={DoubleSide} />
    </mesh>
    <mesh position={[0, -0.04, 0.045]} rotation={[0, 0, Math.PI]} scale={[1, 0.5, 1]}>
      <torusGeometry args={[0.085, 0.012, 8, 24, Math.PI]} />
      <meshStandardMaterial color={faceColor} side={DoubleSide} />
    </mesh>
  </>
);

export const Character = ({ characterRef, colorMode }: CharacterProps) => {
  const isLight = colorMode === "light";

  return (
    <group ref={characterRef} position={[0, 0, 1.6]}>
      <Billboard position={[0, 1.85, 0]} follow>
        {isLight ? (
          <group>
            {sunRayRotations.map((rotation) => (
              <mesh
                key={rotation}
                position={[Math.sin(rotation) * 0.35, Math.cos(rotation) * 0.35, -0.02]}
                rotation={[0, 0, -rotation]}
                castShadow
              >
                <coneGeometry args={[0.065, 0.2, 3]} />
                <meshStandardMaterial
                  color="#ffac29"
                  emissive="#ff8a00"
                  emissiveIntensity={0.16}
                  roughness={0.5}
                  side={DoubleSide}
                />
              </mesh>
            ))}
            <mesh castShadow>
              <circleGeometry args={[0.31, 48]} />
              <meshStandardMaterial
                color="#ffd35c"
                emissive="#ffb000"
                emissiveIntensity={0.2}
                roughness={0.42}
                side={DoubleSide}
              />
            </mesh>
            <Face />
          </group>
        ) : (
          <group>
            <mesh castShadow>
              <circleGeometry args={[0.32, 48]} />
              <meshStandardMaterial
                color="#d9dff4"
                emissive="#8796dc"
                emissiveIntensity={0.12}
                roughness={0.5}
                side={DoubleSide}
              />
            </mesh>
            {moonCraterPositions.map(([x, y, radius]) => (
              <mesh key={`${x}-${y}`} position={[x, y, 0.035]}>
                <circleGeometry args={[radius, 16]} />
                <meshStandardMaterial color="#aeb8df" roughness={0.62} side={DoubleSide} />
              </mesh>
            ))}
            <Face />
          </group>
        )}
      </Billboard>
    </group>
  );
};
